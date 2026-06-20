# HANDOFF — Matters 平台治理科普站（world-class 重build）

> 給接手的 design/前端 Claude。這份是自足入口：讀完即可接續，不需要前情。
> 最後更新 2026-06-20。語言一律**台灣正體中文**對外科普語氣（非個人語氣）。

## TL;DR
高互動科普網站，以 Matters.town 自身治理為案例談「**審查還是抗審查？網路平台『透明開盒』的兩難**」。TWNIC 社群計畫結案交付。受眾：一般大眾／政策利害關係人／開發者。已上線、正在從「能動的原型」重build 到「world-class」。

- **Live**：https://thematters.github.io/matters-governance-site/
- **Repo**：`~/Developer/repos/matters-governance-site`（GitHub: thematters/matters-governance-site，公開）
- **跑起來**：`pnpm install && pnpm dev` → http://localhost:4321/matters-governance-site/　｜　`pnpm build`
- **部署**：push master → GitHub Actions → Pages（base=`/matters-governance-site/`）。規劃同步 IPFS。

## 北極星（設計方向，不可偏離）
1. **電影感黑→光脊椎**：整條捲動是一場「下潛進垃圾/審查的黑暗 → 爬升到花園/抗審查的光明」的身體旅程（取自 falter-inferno 的戲劇手法）。
2. **波隆納兒童繪本 gouache 插畫**是全站最大視覺資產，UI 收斂成近黑白舞台，**所有顏色留給手繪插畫**；品牌紫 `#7258FF` 只當「可互動」信號色。
3. **同一物件連續變形 > 換場景**（Pudding）；**滿版底圖 + scrim 疊字**（Reuters）；**每個控制項工藝級**（訂製 thumb/ticks/`<output>`/ARIA）。
4. **可封存 / 無障礙是硬約束**：no-JS 仍可讀（`html.js` scoping）、`prefers-reduced-motion` 有靜態替代敘事、動效綁單一 duration token。

## 設計系統契約（最重要，別再破壞）
- 顏色/間距/陰影/圓角/字級**一律走 token**：`src/styles/ds.css`（建在 `@matters/design-system-tokens@0.3.0` 之上）。**禁止**再引入 magic number 或平行土系變數。
- 共用元件用 ds.css 既有 class：`.btn--primary/secondary/ghost`、`.board`、`.stat`、`.callout`、`.chip`、`.figure*`（互動統一殼）、`.chapter-nav`、`.full-bleed .banner`（滿版）。
- 綠/紅語意色用 DS function token（`--c-pos`/`--c-neg` → `--color-function-positive/negative`），別自訂綠紅。
- UI 字＝Noto Sans TC（已修字體 bug，勿改回經 `--font-family-ui` 的 fallback）；內文＝Noto Serif TC；數據標籤可用 `--font-mono`。
- 滿版章節頭用 `ChapterHero.astro`；分頁底用 `ChapterNav.astro`（中央章節順序）。

## 已完成（commit 對照）
- **P0 地基** `7cbacf0`：DS token 接上 + `ds.css` 共用元件層；修字體 bug；拔 detection/crowd 半成品佔位 + 死 code。
- **P1** `8ee3e08`→`253493a`：
  - hero → 滿版電影感 banner（`.banner--hero`）
  - 7 分頁頂部 → 滿版章節 banner（`ChapterHero`：detection/false-positive/ranking/censorship-resistance/crowd/moderation/history）
  - 分頁底部 → 書本式 `ChapterNav`（prev/next + 第幾章/共 10）
  - 排序互動 → Matters feed（`ArticleCard` 風：頭像+作者+時間+閱讀/留言/讚賞 icon）
- **素材 storyboard** `537b482`：`docs/design/asset-storyboard.md`（四類素材 + gpt-image/Sora prompt）。

## 待辦（接手就做，已排優先序）
**P1 剩餘**
1. **首頁 feed 連續化**：sticky 改進度 0→1 插值、紅卡 `fly-out`、誤殺高潮放慢、集團用線串。→ **改用 GSAP ScrollTrigger + Flip + SplitText**（見下方「技術決定」）。
2. 把剩餘白底框/表格/emoji 列 → DS 元件：moderation 七處置→**嚴厲度光譜卡**、toolkit→**工具卡(icon+hover)**、bigq→**章節入口卡**、detection 數字（96%→99.7%、3.1%→0.13%）→**Stat 卡**。
3. `reduced-motion` 靜態替代敘事（sticky 退成依序展開的靜態卡片流）。

**P2 互動工藝 + 動態**
4. 滑桿工藝化：訂製 thumb（≥44px、紫、陰影）+ ticks + `<output>` + ARIA + 進場 demo。
5. detection 決策邊界互動（R2D3 式可拖分界線）；false-positive 進階滑桿（雙軸誤判率曲線，d3-scale 算、vanilla 畫 SVG）。
6. be-moderator / IPFS 加 Toast 回饋；be-moderator 加難度遞進 + 結果分享卡。
7. 手機重做 Ring / split-screen 堆疊版（目前固定 viewBox 會擠）。
8. **動態插畫**：AI 兩秒微動畫（Sora）+ 可選 ambient 音訊（黑→光聲音敘事，含靜音鈕）。

## 技術決定（2026-06-20 更新）
- **動效改採 GSAP**（先前計畫寫 scrollama+motion one，已反轉）：北極星是 falter 等級電影感，需 ScrollTrigger(pin/scrub)、Flip(集團攤開/卡片 morph)、SplitText(標題浮現)、ScrollSmoother(lerp 重量感)。GSAP 現已全面免費。裝官方 skill：`npx skills add https://github.com/greensock/gsap-skills`。
- **守則**：GSAP 只做漸進增強（no-JS 仍可讀）、lazy-load、reduced-motion 退靜態、單一 duration token。d3 只用來算數學（scale/extent/bin），DOM 用 vanilla 畫 SVG。
- 不用 three.js/WebGL/Lottie（過重，三範例皆 0 個）。

## 素材 pipeline
- 插畫＝**使用者用 gpt-image 自生**，動畫＝**Sora**。完整 prompt 與規格在 `docs/design/asset-storyboard.md`。
- 現有圖全是 1200px（滿版偏糊）、moderation 是 1:1（裁壞）→ 優先重生 `1536×1024`。新圖換進 `public/illustrations/<slug>.jpg`（同名覆蓋）。動畫放 `public/illustrations/anim/`，用 `<video muted autoplay loop playsinline poster=靜圖>` + reduced-motion 退 poster。

## 檔案地圖
- 版面：`src/layouts/BaseLayout.astro`（nav/progress/og/字體）
- 樣式：`src/styles/global.css`（基底）、`src/styles/ds.css`（**設計系統層，主戰場**）、`src/styles/story.css`（scrolly）
- 元件：`src/components/`（`StickyScroller`、`FalsePositiveSlider`、`RingDetector`、`RankingSplitScreen`、`BeModerator`、`AddressingDemo`、`ChapterHero`、`ChapterNav`、`AudienceToggle`）
- 頁面：`src/pages/*.astro`（14 主題）+ `en/`
- 內容母本：`docs/report/`（14 章報告，公開 OK）
- 設計文件：`docs/design/`（`gap-analysis-and-rebuild-plan.md` 完整 gap+元件盤點+P0/P1/P2、`asset-storyboard.md`、`scrollytelling-storyboard.md`、`interactive-references-and-ia.md`）

## 給人類的開放決策
- [ ] 確認採用 GSAP（反轉先前 scrollama+motion one）
- [ ] AI 動畫：使用者自生（已有 prompt）vs 接 Sora API 批次
- [ ] ambient 音訊敘事要不要做（P2 可選）
- [ ] 文案最後再潤（本輪只換殼不動文字）
