# 素材 Storyboard ＋ 生成 Prompt 清單

> 工具：靜圖＝**gpt-image**（gpt-image-1）；動畫＝**Sora**（image-to-video）。
> 風格母本：波隆納兒童繪本、手繪 gouache、紙張顆粒、土系低彩 + 品牌紫 `#7258FF` 當「可互動」信號色、黑（垃圾/審查）↔光（花園/抗審查）二元。
> prompt 正文用英文（對 image model 較穩），情境註解用中文。**每個 gpt-image prompt 結尾接「§0 通用風格段」。**
> 尺寸結論：現有圖全是 1200px、且 moderation/scale/seed/robot/good-card 是 1:1 —— 滿版 banner 偏糊或裁壞，需處理（見 §1）。

---

## §0 通用風格段（STYLE BLOCK — append to every gpt-image prompt）

```
STYLE: Bologna-style children's-book illustration, hand-painted gouache with visible
brushstrokes and paper-grain texture, soft matte finish, naive gentle rounded figures,
warm earthy low-saturation palette — mustard yellow, olive green, sage, terracotta,
ochre — on a soft cream paper ground. Soft directional natural light, flat picture-book
composition. ABSOLUTELY NO text, no letters, no numbers, no logos, no watermark, no UI.
DUALITY: the "spam / censorship" side is cool desaturated near-black and grey, with small
mischievous round ink-blob creatures (dark blobs with tiny eyes); the "open / garden" side
is warm sunlit greens and golds, full of life. A single violet accent (#7258FF) may appear
ONLY as a tiny marker of a human or interactive element. Leave calm empty space at top and
bottom of the frame for cropping.
```

gpt-image 參數慣例：
- **滿版 banner / hero**：`size:"1536x1024"`、`quality:"high"`。hero 與 og 另做 ~2× 放大（Real-ESRGAN 之類）到 ≥2400px。
- **方形 spot 場景**：`size:"1024x1024"`、`quality:"high"`。
- **可去背小物件**：`size:"1024x1024"`、`background:"transparent"`、`output:"png"`（或 webp）。
- 構圖守則：滿版會用 `object-fit:cover` 裁掉**上下**、保留左右滿幅 → **主體放畫面中央橫帶，上下留可裁空氣**。

Sora（image-to-video）通用設定：
- 以對應 gpt-image 靜圖當**首格 / reference image**；動作**極輕、可無縫循環、不切鏡、主體不位移**，只做「呼吸式」微動。
- 產 ~4s @ ≥720p，剪成 **2s 無縫 loop**；輸出 mp4(H.264) +（可選）webm。
- 網頁用 `muted autoplay loop playsinline`、靜圖當 `poster`、`prefers-reduced-motion` 退回靜圖。
- prompt 範式：`Subtle 2-second seamless loop. <motion>. Camera locked, no cuts, no zoom; the gouache painting gently breathes; everything else stays perfectly still.`

---

## §1 尺寸/比例要改（FIX — 重生或放大既有圖）

| ID | 檔案 | 現況 | 問題 | 處置 |
|---|---|---|---|---|
| F1 | `hero.jpg` | 1200×800 (3:2) | 86vh 滿版在 1440px+ 螢幕偏糊 | 重生 `1536x1024` ＋ 2× 放大到 ~2400 |
| F2 | `moderation.jpg` | **1200×1200 (1:1)** | 當滿版 banner 被裁壞 | **必改**：重生 `1536x1024` 橫幅（見 N-spectrum 構圖） |
| F3 | `detection.jpg` | 1200×800 | 解析度偏低 | 重生 `1536x1024`（同場景） |
| F4 | `false-positive.jpg` | 1200×800 | 同上 | 重生 `1536x1024` |
| F5 | `ranking.jpg` | 1200×800 | 同上 | 重生 `1536x1024` |
| F6 | `censorship-resistance.jpg` | 1200×800 | 同上 | 重生 `1536x1024` |
| F7 | `crowd.jpg` | 1200×800 | 同上 | 重生 `1536x1024` |
| F8 | `history`(dns-rpz/banner) | 1200×800 | 同上＋這頁是高潮，值得重畫 | 重生 `1536x1024`（見 DNS 構圖） |
| F9 | `og.jpg` | 1200×800 | OG 規格是 1.91:1 | 重生/重裁 `1200×630` |

> 提醒：若你還留著當初的原始 prompt，**最省事＝把原 prompt 的 size 改成 1536×1024 重生一次**即可；沒留的話用下面 §3 的重寫場景 prompt。F3–F7 視覺已可用，可排在 F1/F2/F8 之後。

---

## §2 需要新圖片（NEW — 目前沒有的場景）

| ID | 用途 / 位置 | 尺寸 |
|---|---|---|
| N1 | **下潛暗幕背景**：scrollytelling「潛入垃圾暗處」整段滿版底 | 1536×1024（暗） |
| N2 | **重見光明背景**：scrollytelling「爬升到花園」整段滿版底（曝光泛白） | 1536×1024（亮） |
| N3 | **NCC 法遵** 章節 banner（天秤 / 規則）—— 把舊 `scale.jpg` 概念橫幅化 | 1536×1024 |
| N4 | **資料開源** 章節 banner（種子 / 公開資料盤）—— 舊 `seed.jpg` 橫幅化 | 1536×1024 |
| N5 | **結論** 章節 banner（花園成熟 / 從種子到花） | 1536×1024 |
| N6 | **垃圾卡生物**（紅）＋**誤殺卡**（灰）——配對既有 `good-card.jpg`，給首頁 sticky feed | 1024×1024 ×2 |
| N7 | 首頁「更大的問題」三張**章節入口卡縮圖**（抗審查 / 排序 / DNS 封網）——可由 banner 裁，或新生 | 1024×1024 ×3 |

---

## §3 一到兩秒動畫（ANIM — Sora image-to-video，2s 無縫 loop）

| ID | 來源靜圖 | 動作（Sora prompt 重點） |
|---|---|---|
| A1 | hero | hero 微呼吸：花園樹葉與草輕搖、澆水機器人灑出細小水珠、左側暗處墨團生物緩緩漂浮脈動、一張內容卡從上方慢慢飄落、機器人眨一次眼 |
| A2 | N1 暗幕 | 黑色垃圾墨團自畫面**下緣緩緩湧升**淹沒（章節「吞噬」轉場用）；可倒放當退場 |
| A3 | N2 亮幕 | 曙光自上方漫入、整體**曝光緩緩拉亮泛白**，花朵與葉片輕綻（重見光明的生理釋放） |
| A4 | 垃圾怪 spot | spam 墨團生物原地**輕輕晃動、分裂出一個小分身又併回**（集團 Ring 用） |
| A5 | detection robot | 機器人拿放大鏡**左右緩慢掃視**、鏡片微微反光、眨一次眼 |
| A6 | crowd | 群眾手中**燈籠火光輕輕搖曳忽明忽暗**、暖光呼吸 |
| A7 | history/DNS | 高潮：一道**閘門/暗影自兩側合攏遮黑網域**（被封），隨即下方數個 **IPFS 節點亮起微光**串連（內容續存） |

> 落地優先：A1（hero）＞ A2/A3（黑光轉場脊椎）＞ A5/A6（章節點綴）＞ A4/A7。每支都要有靜圖 poster 與 reduced-motion 退路。

---

## §4 小物件（OBJECT — 可去背 spot，transparent png）

| ID | 物件 | 用途 |
|---|---|---|
| O1 | 掃把＋小黑屋（一扇半開的暗門） | moderation「打掃·小黑屋」工具卡 |
| O2 | 一隻手把標籤貼到卡片上 | 「人工標記」工具卡 |
| O3 | 一個被重新校正的齒輪/模型方塊（沾到污點又被擦亮） | 「重新訓練」工具卡 |
| O4 | 一盞提燈 | 「群眾守望」工具卡 ＆ scroll 提示裝飾 |
| O5 | 綠色「正常」小生物（友善圓臉） | 首頁 feed 綠卡（搭 N6 紅/灰） |
| O6 | 一束相連的發光節點（網狀） | IPFS 定址 demo / 抗審查 |
| O7 | 手繪向下箭頭 | hero「往下捲」提示 |
| 既有可重用 | 捕蟲網、垃圾怪、分類木盤、天秤、種子 | 偽陽性 / spam 符號 / 打標籤 / 法遵 / 結論 |

---

## §5 逐項 gpt-image prompt（接 §0 風格段）

**F1 / hero — 剖面世界（橫幅重生）**
```
A wide cross-section cutaway of a "content world" like a doll's house seen from the side,
painted edge to edge. LEFT: a dark desaturated void where black ink-blob spam creatures pour
in, a girl in a mustard coat swings a butterfly net to catch them. CENTER-TOP: a sunny garden
terrace where people calmly read books, write, and use a laptop while a small round white robot
waters flowers with a can. CENTER: a cozy control room with a magnifying-glass robot watching a
screen showing a cluster/network chart. LOWER FLOOR: a worker sweeps and pulls a cart of
discarded cards. RIGHT: a small crowd of gentle figures. Balanced left-dark to right-light.
Keep important elements in the central horizontal band; leave air top and bottom.
```

**F2 / moderation — 嚴厲度光譜（橫幅，修 1:1）**
```
A horizontal "spectrum of severity" scene reading left to right: on the far left a friendly
figure gently SWEEPS a few dark spam blobs with a broom (mild). Moving right, the actions grow
firmer — sorting blobs into trays, a blob placed behind a small half-open dark door ("quiet
room"), and on the far right a sealed dark box (most severe, but reversible-looking, not
violent). A soft gradient of mood from warm/light on the left to cool/dark on the right.
```

**F8 / history — DNS-RPZ 封網高潮**
```
A dramatic but gentle scene: a glowing little website-house in a warm garden, suddenly a large
shadowy GATE swings shut across the road that leads to it, cutting it off from a line of visitors
(the domain is blocked). Below ground, several small glowing networked nodes still hold copies of
the house's light, connected by faint threads (content survives on a distributed network). Mood:
cool shadow above, hopeful warm glow persisting below.
```

**N1 / 下潛暗幕背景**
```
A full-frame atmospheric background of descending into a quiet dark underworld of spam: a deep
field of cool near-black and charcoal with soft paper texture, scattered small dark ink-blob
creatures with tiny eyes drifting, faint falling content-cards turning grey, a single distant
violet pinpoint of light far below. Oppressive but soft, lots of negative dark space, no figures
in focus. Designed as a full-bleed scrolling backdrop.
```

**N2 / 重見光明背景**
```
A full-frame atmospheric background of emerging into light: a warm garden bursting upward into
bright sunlit greens and golds, soft overexposed white glow at the top as if walking out into
daylight, flowers and leaves opening, gentle motes of light. Hopeful, airy, lots of luminous
space, no figures in focus. Designed as a full-bleed scrolling backdrop, brighter toward the top.
```

**N3 / NCC 法遵（天秤）**
```
A wide calm scene: a hand-painted balance scale standing in a quiet garden, one pan holding a
small dark spam blob, the other holding a tiny glowing seedling of free expression, the beam
nearly level. A folded paper rulebook rests beside it. Measured, fair, neutral mood.
```

**N4 / 資料開源（種子盤）**
```
A wide scene: an open wooden tray of labelled seed compartments (a dataset made public), gentle
hands sharing a handful of glowing seeds outward to several smaller pots. Some compartments are
covered with a cloth (kept private/sensitive). Generous, open, careful mood.
```

**N5 / 結論（從種子到花園）**
```
A wide scene of a garden that has matured: the same small website-house now surrounded by
flourishing plants, people tending it together, a few dark spam blobs still drifting at the
edges but contained, soft golden late-afternoon light. Resolved, warm, quietly hopeful.
```

**N6a / 垃圾卡生物（紅）**
```
A single content card seen straight-on, but it is a mischievous spam creature: the card has a
small round dark ink-blob face with tiny eyes and a sly grin, edges slightly ragged, in a cool
desaturated red-grey. Centered, simple, on a soft cream ground.
```

**N6b / 誤殺卡（灰）**
```
A single friendly content card with a gentle rounded face that has been mistakenly greyed-out —
desaturated to grey, a small surprised/sad expression, as if wrongly swept away. Centered,
simple, on a soft cream ground.
```

**O1–O4 工具卡小物件（transparent，1024²）**
```
O1: a small broom sweeping one dark spam blob toward a half-open dark "quiet room" door.
O2: a gentle hand pressing a paper label onto a content card.
O3: a small model-cube/gear that was stained by an ink blob and is now being polished clean.
O4: a single warm glowing paper lantern.
(each: single centered object, hand-painted gouache spot illustration, transparent background)
```

**O5 / 綠色正常生物 ＆ O6 IPFS 節點 ＆ O7 向下箭頭**
```
O5: a single friendly green content-card creature with a calm rounded smiling face, centered.
O6: a cluster of small glowing nodes connected by gentle threads, like a tiny distributed network.
O7: a simple hand-drawn downward arrow / chevron, gouache brushstroke, inviting to scroll.
(each: centered spot, transparent background)
```

---

## §6 落地對照（產出後接哪裡）

- F1/A1 → `index.astro` hero（`.banner--hero`，靜圖 poster + 影片 loop）
- N1/A2、N2/A3 → 首頁 `StickyScroller` 黑→光段落背景與轉場
- F2–F8 → 各 `ChapterHero`（`public/illustrations/<slug>.jpg` 直接替換同名檔）
- N3/N4/N5 → 給 `ncc` / `data` / `conclusion` 補 `ChapterHero`（目前這三頁無 banner）
- N6/O5 → `StickyScroller` 綠/紅/誤殺 feed 卡
- O1–O4 → `toolkit` 工具卡 icon；O6 → IPFS demo；O7 → hero scroll 提示
- A4 → Ring 集團；A5 → detection；A6 → crowd；A7 → history 高潮

> 動畫一律：`<video muted autoplay loop playsinline poster=靜圖>` + `@media (prefers-reduced-motion: reduce)` 只顯示 poster。檔案放 `public/illustrations/anim/`，mp4 為主、webm 備援、單支建議 < 1.5MB。

---

## §7 2026-06-20 產出清單

> 2026-06-20 style-v2 校正：`light-emergence`、`ncc`、`data`、`conclusion`、`dns-rpz/banner`、`card-ranking`、`card-dns-rpz` 與 O1–O7 已改用原始成功插畫作 reference 重新生成，降低亮度、飽和度與 3D icon 感，回到米紙顆粒、低彩度 gouache 與留白構圖。

### 靜態圖

- F1: `public/illustrations/hero.jpg`，2400×1600
- F2: `public/illustrations/moderation.jpg`，1536×1024
- F3: `public/illustrations/detection.jpg`，1536×1024
- F4: `public/illustrations/false-positive.jpg`，1536×1024
- F5: `public/illustrations/ranking.jpg`，1536×1024
- F6: `public/illustrations/censorship-resistance.jpg`，1536×1024
- F7: `public/illustrations/crowd.jpg`，1536×1024
- F8: `public/illustrations/dns-rpz.jpg` 與 `public/illustrations/banner.jpg`，1536×1024
- F9: `public/illustrations/og.jpg`，1200×630
- N1: `public/illustrations/dark-flood.jpg`，1536×1024
- N2: `public/illustrations/light-emergence.jpg`，1536×1024
- N3: `public/illustrations/ncc.jpg`，1536×1024
- N4: `public/illustrations/data.jpg`，1536×1024
- N5: `public/illustrations/conclusion.jpg`，1536×1024
- N6: `public/illustrations/spam-card-red.jpg` 與 `public/illustrations/false-positive-card-grey.jpg`，1024×1024
- N7: `public/illustrations/card-censorship-resistance.jpg`、`public/illustrations/card-ranking.jpg`、`public/illustrations/card-dns-rpz.jpg`，1024×1024

### 小物件

- O1: `public/illustrations/objects/broom-quiet-room.png`
- O2: `public/illustrations/objects/label-hand-card.png`
- O3: `public/illustrations/objects/polished-model-gear.png`
- O4: `public/illustrations/objects/paper-lantern.png`
- O5: `public/illustrations/objects/friendly-green-card-creature.png`
- O6: `public/illustrations/objects/glowing-ipfs-nodes.png`
- O7: `public/illustrations/objects/down-arrow.png`

### 動畫

- A1c: `public/illustrations/anim/hero-everyone-moves-loop.mp4` 與 `.webm`
- A2c: `public/illustrations/anim/dark-flood-high-motion-4s.mp4` 與 `.webm`
- A3c: `public/illustrations/anim/light-emergence-high-motion-4s.mp4` 與 `.webm`
- A4c: `public/illustrations/anim/spam-blob-high-motion-4s.mp4` 與 `.webm`
- A5c: `public/illustrations/anim/detection-robot-high-motion-4s.mp4` 與 `.webm`
- A6c: `public/illustrations/anim/crowd-lantern-high-motion-4s.mp4` 與 `.webm`
- A7c: `public/illustrations/anim/dns-rpz-high-motion-4s.mp4` 與 `.webm`
