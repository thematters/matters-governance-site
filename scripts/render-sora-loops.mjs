#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = process.cwd();
const manifestPath = path.join(root, 'docs/design/sora-animation-jobs.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

const args = new Set(process.argv.slice(2));
const argValue = (name) => {
  const prefix = `${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
};

const selectedIds = (argValue('--job') || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const actions = {
  plan: args.has('--plan') || process.argv.length <= 2,
  prepare: args.has('--prepare'),
  run: args.has('--run'),
};

const selectedJobs = manifest.jobs.filter((job) => {
  if (!selectedIds.length) return job.status !== 'needs-source';
  return selectedIds.includes(job.id);
});

if (!selectedJobs.length) {
  throw new Error(`No jobs selected. Available jobs: ${manifest.jobs.map((job) => job.id).join(', ')}`);
}

function rel(...segments) {
  return path.join(root, ...segments);
}

function jobSize(job) {
  return job.size || manifest.defaults.size;
}

function parseSize(size) {
  const match = /^(\d+)x(\d+)$/.exec(size);
  if (!match) {
    throw new Error(`Invalid video size: ${size}`);
  }
  return { width: match[1], height: match[2] };
}

function jobReferencePath(job) {
  return rel(manifest.defaults.referenceDir, `${job.id}-${job.slug}-${jobSize(job)}.jpg`);
}

function jobRawPath(job, videoId) {
  return rel(manifest.defaults.rawDir, `${job.id}-${job.slug}-${videoId}.mp4`);
}

function jobOutputPath(job, extension) {
  return rel(manifest.defaults.outputDir, `${job.slug}.${extension}`);
}

function printPlan() {
  console.log(`Sora loop plan from ${path.relative(root, manifestPath)}`);
  console.log(`Default render: ${manifest.defaults.model}, ${manifest.defaults.size}, ${manifest.defaults.seconds}s`);
  console.log(`Final loop trim: ${manifest.defaults.loopSeconds}s`);
  console.log('');

  for (const job of selectedJobs) {
    console.log(`${job.id} ${job.slug}`);
    console.log(`  status: ${job.status}`);
    console.log(`  source: ${job.source || '(missing)'}`);
    console.log(`  reference: ${path.relative(root, jobReferencePath(job))}`);
    console.log(`  output: ${path.relative(root, jobOutputPath(job, 'mp4'))}`);
    console.log(`  notes: ${job.notes}`);
    console.log('');
  }

  if (!args.has('--accept-cost')) {
    console.log('Network rendering is disabled unless you pass --run --accept-cost.');
  }
}

async function runCommand(command, commandArgs) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function prepareReference(job) {
  if (!job.source) {
    throw new Error(`${job.id} has no source image yet`);
  }

  const source = rel(job.source);
  if (!existsSync(source)) {
    throw new Error(`${job.id} source not found: ${job.source}`);
  }

  const reference = jobReferencePath(job);
  await mkdir(path.dirname(reference), { recursive: true });
  const { width, height } = parseSize(jobSize(job));

  await runCommand('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    source,
    '-vf',
    `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},setsar=1`,
    '-frames:v',
    '1',
    '-q:v',
    '2',
    reference,
  ]);

  console.log(`Prepared ${path.relative(root, reference)}`);
  return reference;
}

async function createVideo(job, referencePath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const image = new Blob([await readFile(referencePath)], { type: 'image/jpeg' });
  const form = new FormData();
  form.set('model', job.model || manifest.defaults.model);
  form.set('prompt', job.prompt);
  form.set('size', jobSize(job));
  form.set('seconds', job.seconds || manifest.defaults.seconds);
  form.set('input_reference', image, path.basename(referencePath));

  const response = await fetch('https://api.openai.com/v1/videos', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Create video failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function retrieveVideo(videoId) {
  const response = await fetch(`https://api.openai.com/v1/videos/${videoId}`, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`Retrieve video failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function downloadVideo(job, videoId) {
  const response = await fetch(`https://api.openai.com/v1/videos/${videoId}/content`, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`Download video failed: ${response.status} ${await response.text()}`);
  }

  const rawPath = jobRawPath(job, videoId);
  await mkdir(path.dirname(rawPath), { recursive: true });
  await writeFile(rawPath, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${path.relative(root, rawPath)}`);
  return rawPath;
}

async function pollVideo(video) {
  let current = video;
  while (current.status === 'queued' || current.status === 'in_progress') {
    const progress = Number.isFinite(current.progress) ? `${current.progress}%` : 'unknown progress';
    console.log(`${current.id} ${current.status} ${progress}`);
    await new Promise((resolve) => setTimeout(resolve, 15000));
    current = await retrieveVideo(current.id);
  }

  if (current.status !== 'completed') {
    throw new Error(`Video ${current.id} ended with status ${current.status}: ${JSON.stringify(current.error || {})}`);
  }

  return current;
}

async function encodeLoop(job, rawPath) {
  await mkdir(rel(manifest.defaults.outputDir), { recursive: true });
  const mp4Path = jobOutputPath(job, 'mp4');
  const webmPath = jobOutputPath(job, 'webm');
  const duration = String(job.loopSeconds || manifest.defaults.loopSeconds);

  await runCommand('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    rawPath,
    '-t',
    duration,
    '-an',
    '-vf',
    'fps=24,scale=1280:720:flags=lanczos,format=yuv420p',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '25',
    '-movflags',
    '+faststart',
    mp4Path,
  ]);

  await runCommand('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    rawPath,
    '-t',
    duration,
    '-an',
    '-vf',
    'fps=24,scale=1280:720:flags=lanczos',
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '37',
    webmPath,
  ]);

  console.log(`Wrote ${path.relative(root, mp4Path)}`);
  console.log(`Wrote ${path.relative(root, webmPath)}`);
}

async function main() {
  printPlan();

  if (actions.run && !args.has('--accept-cost')) {
    throw new Error('Refusing to call the paid Videos API without --accept-cost');
  }

  if (!actions.prepare && !actions.run) return;

  for (const job of selectedJobs) {
    if (job.status === 'needs-source') {
      console.log(`Skipping ${job.id}; source image is not ready`);
      continue;
    }

    const reference = await prepareReference(job);
    if (!actions.run) continue;

    const created = await createVideo(job, reference);
    console.log(`Started ${job.id}: ${created.id}`);
    const completed = await pollVideo(created);
    const rawPath = await downloadVideo(job, completed.id);
    await encodeLoop(job, rawPath);
  }
}

try {
  await main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
