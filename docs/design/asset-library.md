# Asset Library

Last organized: 2026-06-20

## Public Assets

Website-ready files stay under `public/illustrations/`. These paths are stable API for the Astro pages, so do not rename them without updating page references in the same change.

Active animation files under `public/illustrations/anim/`:

- `hero-everyone-moves-loop`
- `dark-flood-high-motion-4s`
- `light-emergence-high-motion-4s`
- `spam-blob-high-motion-4s`
- `detection-robot-high-motion-4s`
- `crowd-lantern-high-motion-4s`
- `dns-rpz-high-motion-4s`

Old public hero animation experiments were archived out of `public/illustrations/anim/` so the folder only contains production candidates.

## Materials Layout

`materials/` is ignored by git because it contains internal and sensitive source material. The local layout is:

- `materials/visual/current/generated/matty-v2/`: accepted current generated source PNGs.
- `materials/visual/references/matty/`: Matty official avatar reference.
- `materials/插畫視覺風格/`: original successful illustration style references.
- `materials/sora-inputs/`: active Sora sources and prepared reference frames.
- `materials/archive/visual-generation/`: superseded image generation batches.
- `materials/archive/public-illustration-variants/`: old public animation exports removed from the live public folder.
- `materials/archive/sora-inputs/`: old Sora reference frames and edited hero sources.
- `materials/archive/sora-renders/raw/`: raw Sora API downloads kept as provenance.

## Archive Policy

- Keep the accepted visual source batch under `materials/visual/current/generated/<batch-name>/`.
- Move rejected or superseded generation batches to `materials/archive/visual-generation/`.
- Keep current website assets in `public/illustrations/`; archive unused public variants instead of leaving them next to production files.
- `scripts/render-sora-loops.mjs` skips jobs marked `archived` when running without an explicit `--job`.
- Mass-move logs go to `/Volumes/Seagate/iCloud-Documents-Surgery/logs/`.

## Latest Archive Run

The 2026-06-20 cleanup moved 53 items:

- 4 image generation batch directories
- 12 old public hero animation files
- 17 old 1280x720 Sora reference frames
- 2 legacy hero edit inputs
- 17 raw Sora render downloads
- 1 Matty official avatar reference into the visual references tree
