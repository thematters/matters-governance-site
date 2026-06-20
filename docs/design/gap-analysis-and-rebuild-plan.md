以下為完整工作文件。

---

# Matters 治理科普站｜距離世界級的 Gap 分析 × 元件盤點 × 重 build 計畫

> 對標：Reuters Graphics（SvelteKit / d3 / Pym）、The Pudding（Onions、birthday-effect，皆 SvelteKit + 純 SVG + token 系統）
> 我們的棧：Astro 靜態 + vanilla JS + `@matters/design-system-tokens`，已部署 https://thematters.github.io/matters-governance-site/
> 本文只談設計 / 互動 / 技術手法，不重寫文案（對應批評⑦）。所有結論對應 live 站具體 class／DS 具體 token。

---

## 一、總診斷

**我們缺的不是功能，是「完成度的層次」。** v1 已經把難的東西做出來了——sticky scrollytelling 引擎（IntersectionObserver 狀態機）、5 個 vanilla 互動、12 個主題分頁——論「野心」甚至比 birthday-effect 那種純捲動頁更大（我們有拖、有判斷、有先猜再揭曉）。但 Reuters/Pudding 的世界級感不來自黑科技，而來自三個我們全面缺席的層次：

1. **單一視覺語言的徹底貫徹**：它們全站「沒有任何硬編碼數值」——色、字級、間距、圓角、陰影、動畫時長全是 token，每個元件是同一套語言的變奏。我們相反：DS token 已注入卻幾乎沒用，改造了一套平行土系變數 + magic number（`gap:40px`、六種圓角、三種近似陰影、三種按鈕語言），於是「每頁像不同人做的」。
2. **同一物件的連續變形，取代換場景**：Pudding 靠「一張圖不斷 morph（sketch→真資料、洋蔥切開→爆炸視圖）」維持一條不斷裂的敘事線；Reuters 靠「窄欄→wide→widest」單一節奏呼吸。我們是「首頁高密度互動 → 分頁退化成 h1+插畫+一串 `<p>`+一個互動框」的硬跳轉，章節之間像六個獨立小網站。
3. **每個控制項都是工藝級**：Pudding 的滑桿有訂製 thumb、`:focus` 光暈、`.ticks` 刻度、`<output>` live region、`role="switch"` ARIA、`prefers-reduced-motion` 反向預設。我們用瀏覽器原生 `input[type=range]`，且 production 上還掛著一個「互動原型待接」的紫色虛線 TODO 佔位框。

**一句話**：v1 是「能動的原型」，世界級是「token 驅動、單一節奏、無障礙工藝的成品」。我們要做的不是再加互動，而是把已有的東西用一套設計系統重新收斂 + 把敘事縫成一條線 + 把控制項升級到工藝級。地基（DS + 流程 + 滿版視覺）先於枝節（個別互動精修）。

---

## 二、逐點 Gap 分析（對應使用者 7 點 + 補充項）

### ① 體驗流程碎裂
- **現況**：首頁 `.scrolly`（sticky 雙欄狀態機）高密度，一進 `/detection`、`/moderation`、`/ranking` 立刻退化成 `<h1>` + `.page-illust` + 一串 `<p>` + 單一互動框。`.bigq` 三連結是硬跳轉到排版完全不同的頁；分頁底只有三個 `.read-more` 純文字連結，沒有「上一站／下一站／你在第幾章」的視覺化導航。首頁 sticky 本身六步 `min-height:88vh` 等距、無快慢，關鍵轉折（fp 誤殺、ring 集團）被攤平成普通步驟；狀態切換是 `transition:.55s` 的 opacity/scale 硬切，紅卡被抽走沒有「飛出畫面」的方向感。
- **世界級長怎樣**：Pudding birthday-effect 靠「**同一視覺對象不斷變形**」維持一條線（sketch histogram → 真 d3 histogram → 放大 → 標 highlight → 標準差收束）；Onions 靠「**單一閱讀欄寬 + 單一控制模板 + 單一動畫節奏**」重複，滑很多段仍覺得「同一個語言在演進」；Reuters 靠「**窄欄→wide→widest 三寬度**」呼吸（18 個 normal 文字塊只被 4 個全幅圖塊打斷），用 `.spacer` 元件做 sticky 進退場緩衝避免硬切。
- **我們要做的**：(a) 建一條跨頁的章節骨架——統一 chapter header（kicker + 章節序號 + 標題）+ prev/next + 頂部 progress（首頁已有 `#progress`，延伸到全 14 頁）。(b) 首頁 sticky 改「進度 0→1 插值」而非離散換 class：紅卡被濾掉時 `fly` 飛出、集團被一條 SVG 線串起來，關鍵轉折步驟拉長 `min-height`、加停頓。(c) 分頁不再是「插畫+段落+互動框」拼貼，改成「sticky 滿版插畫舞台 + 浮層窄欄 step」（見第三節）。

### ② 很多互動體驗還沒做
- **現況**：`/detection` 有一個 `.interaction-slot` 紫色虛線框，內含 badge「互動區」、`參考範本：R2D3`、狀態文字「**互動原型待接**」——一個 TODO 佔位被部署到 production（S1 致命）。實際互動 5 個型態同質（滑桿/Ring/IPFS 都是「點按鈕→看狀態切換→讀 readout」單步演示），缺 Pudding 式「可輸入、可拖、即時數值回饋的連續探索」。be-the-moderator 是最好的（有誤殺/漏放 tally），但只 6 題、無難度遞進、無分享結果。`/false-positive` 深入頁應有比首頁更進階的滑桿版本，原始碼裡卻沒有獨立實作。
- **世界級長怎樣**：Onions 每個 figure 都是可玩的微互動（滑桿一動 → store 重算 SVG path → CSS transition 補間），且「難度與參數遞增」；數值即時 tween 並用 `<output>` 播報。
- **我們要做的**：(a) 立刻拔掉 `.interaction-slot` 佔位與死 code `.hero-illust` 舊 dashed 佔位樣式——live 站不該露半成品。(b) 補齊「每個關鍵概念一個互動」，且讓 `/detection` 的 decision-boundary（R2D3 式）真正做出來或整段移除。(c) 至少一個資料驅動的連續視覺化（真實 spam 量 / 誤判率曲線），取代 hard-code 卡片。(d) be-the-moderator 加難度遞進 + 結果分享卡。

### ③ 圖片應變成滿版底圖
- **現況**：六張插畫全部 `.page-illust{width:100%;max-width:680px;margin:6px auto 28px;border-radius:14px}`——≤680px、圓角、帶陰影的「貼圖卡」，夾在 `<h1>` 和 lead 之間像論文插圖。波隆納插畫是全站最大視覺資產，被縮到最小。
- **世界級長怎樣**：Reuters hero 是 `autoCropMedia()` 算高（`100svh − caption高`）的 full-bleed，文字浮在上層；Pudding 把插畫**送進資料層**（sketch 與真實圖表交替）。DS 已有現成 `Banner` 元件：全幅底圖 `position:absolute;inset:0;object-fit:cover` + 漸層 scrim `::before`（`rgba(0,0,0,.05)→.45`）保證白字可讀。
- **我們要做的**：hero 與每個分頁頂部插畫改用 DS `Banner` pattern（滿版底圖 + scrim + 疊字）；資料密度高的插畫改 breakout 寬度或 sticky 半屏舞台。詳見第六節。

### ④ 缺響應式指示與引導 affordance
- **現況**：滑桿是 `input[type=range]{accent-color:var(--accent);height:28px}` 原生 range，無訂製 thumb、無「拖我」把手、觸控目標不足、跨瀏覽器長相不一。首頁招牌滑桿在 sticky 區外的 `.scene-wide` 獨立 section，`padding:14vh` 大留白讓互動孤立，使用者不一定知道「這裡能動手」。全站無 first-run 自動演示、無 hover/focus 微提示。手機：只有首頁 scrolly 有 `@media(max-width:720px)`；Ring 是固定 `viewBox 0 0 600 380` SVG（手機節點擠、label 疊）、ranking `.rk-cards` 固定 `width:200px`。
- **世界級長怎樣**：Pudding 訂製 range thumb（`dot.png` 圖、`:focus` 黃色光暈）、`.ticks` 刻度、`<output>` live region、`role="switch"/radiogroup` ARIA、`prefers-reduced-motion` 反向預設（`--1s:1ms` 預設關，no-preference 才開）；Reuters noUiSlider 內建 `pips`（刻度）+ `tooltips`（跟手數值）+ `connect`（填色）。常用「自動 demo 一次 → 邀請接手」。
- **我們要做的**：訂製 range thumb（≥44px 觸控、品牌紫、帶陰影），套 DS `TextField` 的 `:focus` 紫光暈（`0 0 0 3px primary-0`）；加 `.ticks`、`<output>` 即時數值、ARIA 角色；互動進場自動演示一次；Ring/split-screen 做手機堆疊版。可導入輕量套件（scrollama 統一管 step、motion one 做進退場補間）——取捨見第七節。

### ⑤ 文字框未轉成精緻卡片
- **現況**：多處「白底圓角框」與裸 `<p>`/表格（逐區點名見第四節）。`.scrolly-step p` 是白底圓角框；`/moderation` 七種處置是 inline-style `<table>`；`.toolkit` 四宮格只有 `<h3>+<p>` 無 icon；`.bigq` 純文字卡；ranking 用 `👁 5,000 💬 2 💰 1` emoji 當資料列；detection 關鍵數字（`96%→99.7%`、誤判率 `3.1%→0.13%`）埋在 `<p>` 的 `<strong>` 裡。
- **世界級長怎樣**：Reuters 把數字做成「stat 卡 + 迷你長條」；Pudding 每個 figure 是同一控制模板實例。DS 有現成 `ArticleCard`（head: avatar+作者+時間 / content: 文字+封面 / footer: meta+more）——正是「首頁排序用 Matters feed mockup」的現成元件。
- **我們要做的**：見第四節完整盤點表，逐區把白框/表格/emoji feed 升級成 token 化精緻元件。

### ⑥ 佈局/按鈕/排版/字體未統一
- **現況（最嚴重的系統性問題）**：
  - **字體（S2）**：`--font-ui: var(--font-family-ui, "Noto Sans TC"…)`，但 `--font-family-ui: PingFang TC…` 已定義，故 Noto Sans TC fallback 永不觸發。UI 文字實際吃 PingFang TC → Windows/Android 退 `system-ui`，跟 Apple 裝置完全不同字，且白載一份用不到的 webfont。
  - **DS 沒被用（S3）**：`about.Bz_Dimv9.css` 已注入完整 `--color-primary-*`、`--shadow-*`、`--space-sp*`、`.ds-text-*`，站方完全沒用，改用 `--mustard/--olive/--sage` + magic number（`gap:40px`、`padding:18px`）+ 三種手刻陰影 + 六種圓角。
  - **按鈕三套並存（B9）**：Ring/IPFS 是 pill outline、be-the-moderator 是方角 `border-radius:10px` 紅綠 outline、`.bm-next` 又是紫色實心 pill、audience-toggle 是分段控制。無 primary/secondary/ghost 階層。
  - **寬度多軌（B10）**：`.container 780 / .scene 720 / .scene-wide 1000 / .scrolly min(1080,96vw)` + 每個互動各自寬度（`.fp 860 / .ring 620 / .bm 600`），H1 尺寸首頁 40px vs 分頁吃 DS 預設不一致。
- **世界級長怎樣**：Onions/birthday-effect「沒有任何硬編碼數值」，三層 token（原始色→語意色→元件色）+ 完整 `--12px…--128px` type scale + 雙速度動畫 token；Reuters Svelte scoped CSS 每元件一 hash 不互污染。
- **我們要做的**：見第五節，全面接上 DS token，修字體矛盾、建按鈕階層、收斂 2–3 種容器寬度與一條字級階梯。

### ⑦ 文字內容之後再調
- 本次**只換殼不動文案**。所有第四節的元件升級都是「把同一段文字放進更好的容器」，不重寫一個字。Stat 卡只是把 `<p><strong>` 裡的數字抽出來放大，文字照舊。

### 補充項（我認為同等致命，使用者未列）
- **A8 死 code 上線**：`.hero-illust` 舊 `border:2px dashed var(--sage)` 佔位樣式仍在主 CSS，被 inline `<img>` 蓋過但殘留。連同 S1 佔位框，一起清。
- **A9 reduced-motion 下沒有替代敘事**：首頁 `prefers-reduced-motion` 只關了 card transition，整個故事仍依賴捲動。世界級會提供「靜態看完整故事」的退化版。要補：reduced-motion 下 sticky 改為依序展開的靜態卡片流。
- **A10 缺 mono 字體給數據標籤**：birthday-effect 用 Atlas Typewriter 給數據標籤建立層次。我們只有 Noto Sans/Serif TC，建議補一支等寬給 stat 數字/座標標籤。

---

## 三、體驗流程重設計（針對「碎裂」）

### 3-1 首頁：一條從鉤子到收束的連續 scrollytelling

核心原則（抄 Pudding）：**同一個 feed 實例從頭活到尾，用進度 0→1 插值改變狀態，而非切換不同區塊。** 偽陽性滑桿是「同一條 feed 繼續活著並交出控制權給你」，不是新 section。每場轉場用 `.spacer` 緩衝塊（抄 Reuters）避免硬切。

| 場 | 視覺狀態（sticky 舞台） | 互動／引導 | 轉場手法 |
|---|---|---|---|
| **0 開場鉤子** | 滿版插畫 hero（DS Banner，scrim 疊大標 + kicker），底部 `.scroll-hint` 向下箭頭 bob | 無，純引導下滑 | 捲動時 hero 插畫 `scale(1→1.05)` + 文字 fade，交棒給 feed 舞台 |
| **1 正常** | feed 全綠卡，穩定流動（同一 `<FeedItem>` 實例 ×N） | 無 | — |
| **2 淹沒** | 紅卡（垃圾）以 `fly-in` 由下湧入、綠卡被擠，進度插值控制紅卡密度 0→1 | 無 | 紅卡數量隨 scroll progress 連續增加，非一次全變 |
| **3 過濾** | 一條 SVG「分界線」掃過，紅卡 `fly-out` 飛出畫面（有方向感），綠卡留下 | 無 | 線掃過用 `draw` transition，紅卡 stagger 飛出 |
| **4 誤殺（高潮，放慢）** | 少數綠卡被誤判成紅、跟著飛出，鏡頭「推近」一張被誤殺的綠卡，標 `誤殺` | 出現第一個 `<output>` 數字：當前誤判率 | 此步 `min-height` 拉長、加停頓；被誤殺卡用 `scale` 強調再飛出 |
| **5 交棒給你（滑桿）** | feed 不消失，上方浮出訂製滑桿（thumb 自動晃一下 demo），分界線跟滑桿即時移動 | **可拖**：拖滑桿 → 分界線移動 → 綠紅誤判即時重算，`<output>` 跟手顯示誤殺/漏放數 | feed 與滑桿是同一舞台，無區塊切換 |
| **6 集團 Ring** | feed 中數張卡被一條 SVG 線串成環（抄 Onions「爆炸視圖」`translate(x,y)`：集團攤開） | hover/點節點看關聯 | 卡片原地用 transform 聚成環，非換 DOM |
| **7 收束 / 更大問題** | 鏡頭拉遠回到插畫情緒，三張「章節入口卡」（非純文字 `.bigq`） | 章節卡 hover 升起、連到分頁 | fade 回插畫色票，progress 條到底 |

關鍵：**全程一條視覺線（feed→滑桿→Ring 都是同一舞台的變形）**，progress 條與章節指示讓使用者隨時知道「在敘事的哪一段」。

### 3-2 分頁：從「拼貼」變「縮小版的同一條線」

分頁不再是 `h1 + 置中插畫 + 一串 <p> + 互動框`。改成統一模板：

1. **章節 hero**：DS Banner 滿版插畫 + scrim 疊 kicker（第幾章/共幾章）+ 標題（取代 `.page-illust` 貼圖）。
2. **sticky 半屏舞台 + 浮層窄欄 step**：插畫或互動圖 `position:sticky` 當底，科普文字以 `ds-text-article-body-regular` 窄欄（單一 measure ~640–720px）浮過——抄 birthday-effect。
3. **互動用統一 `<Figure>` 殼**（抄 Onions）：`.controls.top`（標題列 + 底線）→ SVG 舞台 → `.controls.bottom`（控制列）。5 個互動全套同殼 = 視覺一致 = 不碎裂。
4. **章節導航**：頂部統一 chapter header + progress，底部 prev/next（取代三個裸 `.read-more`），讓 14 主題像一本書的章節而非散頁。

---

## 四、逐區元件盤點（最重要｜對應批評⑤）

抄寫來源優先序：**React CSS Module > impl.css > spec.md**（DS repo 路徑見最後）。轉抄時記得補 DS 漏發的 spacing fallback：`--space-sp20:20px; --space-sp24:24px; --space-sp48:48px;`，否則 layout 會塌。

| # | 現有區塊／class | 問題 | 目標精緻元件 | DS token / 元件來源 |
|---|---|---|---|---|
| 1 | `/detection` `.interaction-slot`「互動原型待接」 | TODO 佔位上 production | **刪除或做成真互動**（R2D3 decision-boundary） | — |
| 2 | `.hero-illust` 舊 dashed 佔位樣式 | 死 code | **刪除** | — |
| 3 | 首頁 `.hero-illust` 實圖 + 六張 `.page-illust` 貼圖 | ≤680px 論文插圖 | **HeroImage / SectionBanner（滿版底圖+疊字）** | `Banner.module.css`：`.ds-banner` bg + scrim `::before` |
| 4 | ranking `.rk-card`（`👁5,000 💬2 💰1` emoji 列） | emoji 統計、非真實感 | **Matters feed mockup（演算法序 vs 時間序對照）** | `ArticleCard.module.css`：`.ds-article-card` head/content/footer，avatar+標題+meta icon+排序徽章 |
| 5 | 首頁 sticky 綠/紅卡 feed（21 張小卡換 class） | 離散狀態機、像示意圖 | **FeedItem（同 ArticleCard 殼）+ function 語意色** | `ArticleCard` + `--color-function-positive #5C9969 / negative #C85C41`（取代自訂綠紅） |
| 6 | `.scrolly-step p`（白底圓角框 ×6） | 正中「白底圓角框」批評 | **Step 卡（kicker+編號+icon）或文字疊 sticky 視覺上** | `.board` + `--shadow-shadow1`；字 `.ds-text-system-body1` |
| 7 | `/moderation` 七種處置 inline `<table>` | 死板表格（lead 卻說「光譜」） | **嚴厲度光譜卡片列（從『打掃』到『註銷』漸層條）** | `.board` 卡 + `--color-function-*` 漸層 + `--space-sp*` |
| 8 | detection 關鍵數字埋 `<p><strong>`（`96%→99.7%`、`3.1%→0.13%`） | 數字無張力 | **Stat 卡（大數字 + 迷你前後對比長條）** | `ds-text-system-money-semibold`(36px) + `--color-function-*` + mono 標籤 |
| 9 | `.toolkit` 四宮格（`<h3>+<p>` 無 icon） | 無 icon/無互動入口 | **工具卡（icon + hover 升起 + 連深入頁）** | `.board` + `--shadow-shadow1` hover `--shadow-dropdown-new` |
| 10 | `.bigq` 三純文字連結卡 | 純文字 | **章節入口卡（縮圖/代表色）** | `.board` + 代表色 `--color-primary-*` |
| 11 | 各互動按鈕三套（pill outline / 方角 / 紫實心） | 無階層 | **統一 Button 階層** | `components/buttons/normal/impl.css`：`.ds-btn--primary/secondary/tertiary` |
| 12 | 偽陽性滑桿 `input[type=range]`（原生） | 無 affordance | **訂製 thumb + ticks + `<output>` + ARIA** | `TextField.module.css` focus 光暈 + 自訂 thumb |
| 13 | be-the-moderator 操作無回饋 | 缺即時反饋 | **Toast（每次判擋/放彈回饋）** | `Toast.module.css`：`.ds-toast--positive/negative` |
| 14 | 集團 Ring SVG 帳號圖 | 固定 viewBox、手機擠 | **Avatar ring variants + responsive 堆疊** | `Avatar.module.css`：ring（architect=lime / civic-liker=purple / both 雙環） |
| 15 | `.lead` / `blockquote`（手刻引言） | 與 DS 無關 | **Callout（board + 左側紫邊條）** | `.board` + `border-left:4px var(--brand-purple)` |
| 16 | meta 標籤 / `.wip` 黃 pill | 散落 | **Chip/Badge** | `.chip{radius 4px; --color-primary-100 底}` |

---

## 五、設計系統統一（對應批評⑥）

落地路徑：照 DS 官方範例 `apps/page-templates/`（vanilla Astro + vendored tokens）當母版。

1. **Re-vendor token**：把 `tokens/dist/tokens.css` 放到 `src/styles/vendor/tokens.css`，`global.css` 第一行 `@import`。**勿** import `freewrite.css`（七日書專用）。
2. **建語意別名層**（照抄 page-templates `global.css` 的 `:root`）：`--ink / --brand-purple / --font-ui|reading`，全站只引用別名不直接寫色號。

### 統一規範

- **字體（修 S2）**：UI 字族做單一決策——讓 `--font-family-ui` 直接指 `"Noto Sans TC"`（既然已 `<link>` 載入），或反之移除 webfont 改吃系統字。二擇一，全站一個來源、跨平台一致。內文用 `.ds-text-article-body-regular`（17px/1.75 Serif）；UI 用 `.ds-text-system-body2-*`；補一支 mono 給數據標籤（A10）。
- **字級**：廢除散落 font-size（`12.5px–40px`），全套 `.ds-text-*` utility class。H1 統一（首頁與分頁同級）。
- **間距**：廢除 magic number，全用 `--space-sp0…sp32`（8pt grid）。**務必補** `--space-sp20/24/48` fallback（DS 漏發但自身元件有引用）。
- **色彩**：綠/紅 feed、判擋/放改吃 `--color-function-positive/negative/warn/heart`（取代 `--mustard/--olive/--sage`）；互動 hover/press 用 `--color-primary-700/800`；品牌色 canonical = `--color-brand-new-purple #7258FF` + `--color-brand-new-green #C3F432`（legacy green 是 bug，勿用）。
- **陰影**：三套手刻 → `--shadow-shadow1`（卡片）、`--shadow-dropdown-new`（浮層）、`--shadow-collection`（土系內嵌質感）。
- **圓角**：六種散落 → 站內補別名 `--radius-pill:999px; --radius-card:8px; --radius-chip:4px;`（DS 無 radius token，對齊其元件事實慣例）。
- **容器寬度**：四軌 → 收斂 2–3 種 token（如 `--col-read:680px` 內文、`--col-wide:1000px` 圖、`--col-full:100vw` 滿版）。

### 要建的站內共用元件（放 `global.css` + 各 `.astro` scoped `<style>`）

`Section`（eyebrow+title+lead，直接 cp page-templates）、`Button`（DS 三階層）、`Card/Board`、`FeedItem`（ArticleCard）、`Avatar`（含 ring）、`HeroImage`（Banner）、`Stat`、`Callout`、`Toast`、`Field`（滑桿/輸入）、`Chip`、`Figure`（互動統一殼，第三節 3-2）。

---

## 六、滿版底圖與視覺升級（對應批評③）

**哪些插畫該變 full-bleed：**
- **首頁 hero**（`hero.jpg`）→ 100vw 滿版底圖 + 大標/kicker 疊字（場 0）。
- **12 分頁章節頂部插畫**（detection/ranking/moderation/censorship-resistance/false-positive.jpg…）→ 每頁 chapter Banner 滿版 + 章節序號疊字。
- **資料密度高的插畫** → 不必滿版，改 breakout 寬度或進入資料層（抄 Pudding：sketch 與真圖交替）。

**怎麼疊字保持可讀（抄 DS Banner + Reuters）：**
- scrim `::before`：`linear-gradient(rgba(0,0,0,.05)→.45)` 蓋在圖上、文字之下，保證任何圖都壓得住白字。
- `object-fit:cover` + Reuters `autoCropMedia` 算高邏輯：高度 = `100svh − caption高`，`resize` 重算，避免切到 caption。
- **明暗處理**：淺色插畫區域加深 scrim 或文字加 `text-shadow`；可在文字側放方向性漸層（一側深一側透）。
- **克制**：滿版只給 hero 與章節入口（抄 Onions「別硬追滿版底圖」），內文與互動仍收在單一 measure 置中欄，避免全幅轟炸。

---

## 七、互動套件與引導（對應批評②④）

### 套件取捨

| 套件 | 用途 | 取捨 | 結論 |
|---|---|---|---|
| **scrollama** | 統一管 sticky step 進度（純 IntersectionObserver，無 GSAP） | 我們已手刻 IO 狀態機，scrollama 提供 progress 0→1 + offset 統一管理，工程量小 | **採用**：取代手刻 `rootMargin:-45%`，補進度插值 |
| **motion one** | 進退場補間（卡片 fly/scale、stagger）、數字 tween | 輕量（~5KB）、Web Animations API、好降級、無 React 依賴 | **採用**：feed 卡片飛出/集團攤開/Stat 數字跑分 |
| **GSAP ScrollTrigger** | 重型 pin/timeline | 強但重、授權考量、Reuters/Pudding 皆**未用** | **不採用**：sticky+transform 已足夠 |
| **Lenis** | 平滑捲動 | 改變原生捲動手感、與無障礙/暈眩有張力 | **不採用**（或僅桌機 opt-in） |
| **D3（d3-scale/d3-array）** | 只做數學（scale/extent/bin），DOM 交給 vanilla 寫 SVG | Pudding/Reuters 都這樣用 | **採用**：誤判率曲線/分佈即時重算 |
| three.js/WebGL/Lottie | — | 三範例皆 0 個，過重 | **不採用** |

**無障礙/封存共通**：所有動效綁單一 `--duration` token + 包進 `@media (prefers-reduced-motion: no-preference)`，抄 Pudding 反向預設（`--1s:1ms` 預設關，no-preference 才開）。reduced-motion 下提供靜態替代敘事（A9）。

### 缺的互動清單 + 每個的 affordance/引導/響應式

| 互動 | 補的 affordance | 引導 | 響應式指示 |
|---|---|---|---|
| 偽陽性滑桿 | 訂製 thumb（≥44px、紫、陰影）+ `:focus` 光暈 + `.ticks` + `connect` 填色 + `<output>` 跟手數值 + `role="slider"/aria-label` | 進場 thumb 自動晃一下 demo；`← 寬鬆／嚴格 →` 標籤 | 手機 thumb 加大、ticks 簡化 |
| be-the-moderator | `role="radiogroup"`、判擋/放後彈 Toast；tally 用 `<output>` | 難度遞進 + 結果分享卡（補②） | 按鈕橫排→直排 |
| 集團 Ring | 節點 `cursor:pointer`、hover 高亮關聯、`aria-label` | 自動演示一次「集團攤開」 | 手機改堆疊版（非固定 viewBox） |
| 排序 split-screen | 「先猜」低保真 → 揭曉時同圖 morph 成真資料（draw transition），非並排硬切 | 拖/點猜，揭曉按鈕 | `.rk-cards` 改流體寬，單欄 fallback |
| IPFS 定址對照 | 三按鈕統一 DS Button、砍節點後 Toast + 即時重繪 | 演示一次 | 按鈕橫排→直排 |
| **新增** decision-boundary（detection，接掉 S1 佔位） | 可拖分界線、資料點即時分類、`<output>` 準確率 | R2D3 式自動 demo | 手機簡化點數 |
| **新增** 深入頁進階滑桿（false-positive） | 雙軸（閾值 × 流量）即時誤判率曲線（D3 算 scale，vanilla 畫 SVG） | — | — |

---

## 八、優先級分期計畫

**原則：地基（設計系統 + 體驗流程 + 滿版視覺）先於枝節（個別互動精修）。** 先消滅使用者點名最重的 ⑥①⑤③。

### P0 — 止血 + 地基（live 站不該露半成品 + DS 接上）
交付：
1. **拔半成品**：刪 `/detection` `.interaction-slot` 佔位（S1）、刪死 code `.hero-illust` dashed 樣式（A8）。
2. **接上 DS token**：re-vendor `tokens.css` + 建語意別名層 + 補 `--space-sp20/24/48` fallback；**修字體矛盾 S2**（UI 字族單一決策）。
3. **建共用元件骨架**：`Button`（三階層）、`Card/Board`、`Section`、`Figure`（互動統一殼）、`Stat`、`Callout`、`Chip`——先有殼，內容照舊（不動文案）。
> 完成即消滅 ⑥（字體/按鈕/間距/色/陰影/圓角統一）與 ⑦（只換殼）。

### P1 — 流程縫合 + 滿版視覺（消滅碎裂與貼圖）
交付：
1. **跨頁章節骨架**：統一 chapter header + progress（延伸到 14 頁）+ prev/next，取代裸 `.read-more`（治①）。
2. **滿版視覺**：hero 與分頁頂部插畫改 DS `Banner`（滿版+scrim+疊字）（治③）。
3. **分頁去拼貼**：套「sticky 半屏舞台 + 浮層窄欄 step + `<Figure>` 殼」模板（治①⑤）。
4. **首頁 feed 連續化**：導入 scrollama + motion one，sticky 改進度插值、紅卡 fly-out、關鍵轉折放慢；綠/紅卡改 `FeedItem`（ArticleCard 殼）+ function 語意色。
5. **ranking 做 Matters feed mockup**（ArticleCard），emoji 列 → 真實 feed item（治⑤點名項）。
6. **reduced-motion 靜態替代敘事**（A9）。

### P2 — 互動精修（affordance + 補齊 + 工藝）
交付：
1. **滑桿工藝化**：訂製 thumb + ticks + `<output>` + ARIA + 進場 demo（治④）。
2. **接掉 detection 互動**：做 R2D3 decision-boundary（治②）。
3. **補 false-positive 深入頁進階滑桿**（D3 算 scale + vanilla SVG 誤判率曲線）（治②）。
4. **操作回饋**：be-the-moderator/IPFS 加 Toast；be-the-moderator 加難度遞進 + 結果分享卡。
5. **手機重做**：Ring/split-screen responsive 堆疊版（治④）。
6. **逐區卡片升級收尾**：moderation 嚴厲度光譜、toolkit 工具卡、detection Stat 卡、bigq 章節入口卡、Avatar ring（治⑤剩餘項）。

---

**DS 關鍵檔案速查**（供 implementer）：Token 源 `packages/tokens/dist/tokens.css`；Button vanilla `components/buttons/normal/impl.{css,html}`；可轉抄 CSS Modules `packages/react/src/components/{ArticleCard,Avatar,Banner,Dialog,Toast,TextField,Button}/<Name>.module.css`；Astro 母版 `apps/page-templates/{about-page,activity-landing}/`；消費指南 `docs/consume.md`（§A vendored）。Storybook 對照視覺 `https://thematters.github.io/design-system/`。
---

## 九、falter-inferno 電影感敘事疊加（另一份背景拆解，與上述整合）

falter-inferno.at 本質是「瀏覽器當放映機的 WebGL 短片」（three.js + 22 shader）。不抄技術，抄導演思維。6 個可移植手法：

1. **捲動儀式化為「下潛→爬升」**：開場明確「往下」指示，滑動＝潛入垃圾暗處，觸底後反轉向上向光（花園在上）。→ 我們的黑/光脊椎，與第三節「連續 scrollytelling」合流。
2. **lerp 阻尼給捲動重量 + 章節轉場做成「吞噬」鏡頭**（黑色垃圾從下緣淹滿→退去露花園）。→ 對應第七節 motion one；轉場別用淡入淡出。
3. **音訊第二敘事線**：暗處 ambient pad → 進花園 crossfade 到明亮主題（Howler.js）；需開/靜音切換。→ 新增，列 P2（可選）。
4. **光當主角**：暗幕近黑底 + 一束 spotlight 打亮垃圾怪一角、大量留黑；走向花園曝光拉高泛白。明暗對比＞配色。→ 強化第六節的明暗處理。
5. **手繪逐格動畫讓插畫活起來**（它用 sprite sheet + 235 frame）＝使用者的「AI 兩秒動畫」：image-to-video 微動迴圈（葉搖、垃圾怪飄、機器人眨眼），muted autoplay + reduced-motion 退靜圖。→ 列 P1/P2（先靜圖上線、再換動態）。
6. **UI 收斂成黑白舞台**，顏色全留給手繪；顯示字高瘦 condensed 全大寫、內文小而字距寬。→ 與第五節一致（但我們維持品牌紫為互動信號）。

### 整合
- **P1 滿版視覺**：除 DS Banner 滿版+scrim，加入「黑/光段落」明暗節奏（暗段近黑、光段明亮），讓 hero→暗→光的旅程成立。
- **P2 動態**：插畫 AI 兩秒迴圈（hero + 黑/光大段背景 + 場景轉場）＋可選 ambient 音訊敘事線（含靜音鈕）。
- 全程守紀律：reduced-motion 退靜圖/靜態敘事、動效綁單一 duration token、可封存。

---
*本文件彙整兩份背景分析：Reuters/Pudding/design-system gap workflow（`w6y7o9kxy`）＋ falter-inferno 敘事拆解。2026-06-20。*
