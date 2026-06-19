# 互動參考 + 網站地圖設計文件

> Matters.town 平台治理科普網站｜TWNIC 社群計畫結案站
> 受眾三軌：一般人 / 政策關係人 / 開發者
> 技術棧：Astro 靜態 + islands；招牌互動 vanilla Canvas/SVG/D3；GitHub Pages + IPFS
> 設計原則：**主頁＝高互動閱讀體驗，大量文本外連到主題分頁（hub-and-spoke）**；no-JS 也能讀到結論；無障礙；可長期封存。
> 視覺：波隆納兒童繪本插畫風（土系、低彩度、手繪 gouache），品牌紫 `#7258FF` 為「可互動」信號色。

---

## 一、精選範本短清單

依「最該照抄的」排序。每個範本一句「為何經典」＋對我們最有用的一個移植點。

| # | 名稱 | URL（可驗證） | 為何經典 | 對我們最有用的移植點 |
|---|------|------|----------|----------------------|
| 1 | **Red Blob Games — Amit Patel** | https://www.redblobgames.com | 20+ 年持續存活（2004→2026）的「重文字＋活互動＋每頁獨立 island」站，是我們三軸（重文＋互動、islands、可封存）最接近的活證明。 | **語意上色當文字↔圖橋樑**：散文中的「藍線」三字本身染藍，同色復用到圖、控制項、章節卡。比 JS hover-sync 更穩，no-JS／列印／報讀器都活。把 `#7258FF` 升級成「每個治理概念一個穩定色票，貫穿文字／圖／控制項／章節卡」。 |
| 2 | **R2D3 — A Visual Intro to ML** | https://r2d3.us/visual-intro-to-machine-learning-part-1/ | scroll-driven 狀態機的天花板：sticky 視覺舞台＋文字卡捲過，主動性降到「只剩往下捲」。 | **主頁 hero 骨架**：固定一張波隆納插畫舞台，捲動推進「偽陽性分數線從寬到嚴」，被誤殺的無辜貼文一個個變灰；`#7258FF` 標可拖曳點。低主動性、無痛帶一般讀者過核心直覺。 |
| 3 | **Parable of the Polygons** | https://ncase.me/polygons/ | 「手動→參數模擬→開放沙盒」三段難度爬升模板；個體規則→集體湧現的揭示節奏。零依賴、CC0、十年後仍可玩。 | **偽陽性分數線（05）三段爬升**：先手動拖一筆殺好內容→看整批誤殺曲線→開放沙盒調參。**集團網路圖（04）** 借「微觀規則先行、宏觀後果後揭」。 |
| 4 | **Nicky Case — Evolution of Trust** | https://ncase.me/trust/ | 治理主題血緣最近、方法論最成熟：分節按鈕推進＋第二人稱旁白＋每節嵌可玩模擬＋最後 sandbox。 | **be-the-moderator 測驗骨架**：讓讀者先當審查者做幾個判斷，用 cognitive gate 防 skim。配合 Place Your Bets（先猜再揭曉）做排序 split-screen 的記憶點。 |
| 5 | **Sam Rose — samwho.dev** | https://samwho.dev | 開發者受眾血緣最近（bloom filter／hashing／load balancing）；vanilla SVG 招牌互動、nginx 靜態、互動內嵌散文流。 | **互動內嵌散文流＋最小例子先行**：先給可直覺操作的最小互動（按 Shuffle／拖滑桿）親眼看到問題，再用文字解釋。直接套到 03 偵測、07 排序的開發者軌。 |
| 6 | **Bartosz Ciechanowski** | https://ciechanow.ski | just-in-time 互動編排的天花板：互動圖緊貼解釋它的那段文字，互動是「主動學習工具」非段尾裝飾。 | **「示意規模 vs 真實規模」教學切換**：直接做進 04 集團掃描 Ring，用 `#7258FF` 標示切換鈕可互動。`/archives/` 純文字索引＝我們「全章節索引頁」範本。 |
| 7 | **MLU-Explain（Amazon ML University）** | https://mlu-explain.github.io | 機構級系列站共用一套 design tokens 貫穿 15+ 篇；precision-recall 滑桿是門檻互動現成原型。Svelte+D3、GitHub Pages、CC-BY-SA。 | **05 偽陽性的數學＋UI 現成原型**：threshold 滑桿→混淆矩陣四象限＋precision/recall/F1 同步重算。語意換成「審查分數線→誤殺好內容 vs 漏放垃圾」。 |
| 8 | **Setosa — Explained Visually** | https://setosa.io/ev/ | 「一概念一頁、一互動定生死」的克制範本；條件機率「球掉到紅架／藍架」四格即時計數。 | **05 分數線的具象比喻**：把抽象條件機率包成生活場景（「貼文落入審查網」），拖門檻時四格即時重算，機率從資料浮現而非講公式。 |
| 9 | **ncase.me（首頁）+ Nutshell** | https://ncase.me ／ https://ncase.me/nutshell/ | 主頁＝可瀏覽磁磚牆（Play/Read/Watch）；Nutshell 行內術語點一下「就地展開」釋義氣泡。 | **全互動總覽頁＝磁磚分類**（給政策／開發者快速跳轉）；**主頁術語點一下就地淺展**（IPNS、DNS-RPZ、Ring、偽陽性…），想深入再點進章節。 |
| 10 | **Distill.pub** | https://distill.pub | 學術級互動文章的排版／無障礙／引用標準；側邊欄註解、math、可引用 bibtex、深思的長文可讀性。 | **長文可讀性與引用紀律**：政策關係人軌需要可信度——側註、一手出處外連、bibtex 式可引用區塊，正文不被技術細節淹沒。 |
| 11 | **The Pudding** | https://pudding.cool | 資料新聞 scrollytelling 的量產標竿：sticky 圖＋scroll 觸發狀態、行動裝置可用、敘事與資料嚴謹並存。 | **02 治理史編年（2018–2025）時間軸**：scroll 觸發年份節點，每捲過一年帶出一個治理事件＋插畫，行動端降級為垂直清單。 |
| 12 | **Our World in Data** | https://ourworldindata.org | 「每張圖都可獨立分享／下載／嵌入、附完整資料表」的開放資料典範。 | **12 開源與資料集軌**：每個招牌互動旁附「文字版資料表」當 a11y fallback＋開放資料下載，一石二鳥（無障礙＋開放）。 |

> 排序邏輯：1–5 是「閱讀體驗骨架＋招牌互動」最該逐頁拆解的核心母範本；6–9 解決 hub-and-spoke 與微互動；10–12 補強長文可讀性、時間軸、開放資料三個專項缺口。

---

## 二、可移植模式庫

每個模式：**它解決什麼 / 哪個範本示範 / 我們怎麼用**。

### (a) 主頁＝閱讀體驗

**模式 A1：scroll-driven sticky 舞台（被動主動脈）**
- 解決：一般讀者主動性低、怕做導航決策。把「唯一要做的事」降到往下捲。
- 範本：R2D3（sticky 視覺＋文字卡捲過）、The Pudding。
- 我們：主頁 hero 用一張固定的波隆納插畫舞台，捲動推進「分數線從寬到嚴、無辜貼文逐個變灰」。捲動是主動脈，hover／拖曳是給好奇者的旁支，永不擋主線。

**模式 A2：互動緊貼敘事（just-in-time 編排）**
- 解決：互動淪為段尾裝飾、與它解釋的文字脫節。
- 範本：Ciechanowski（「讓互動圖說得更清楚」過場句後緊接嵌入）、samwho.dev。
- 我們：主頁每個招牌互動（分數線、排序 split-screen、集團網路圖）都緊貼它所解釋的那段文字嵌入。主頁不堆長文，靠互動帶讀者深入再點章節頁。

**模式 A3：讀一點→玩一點→懂一點微迴圈**
- 解決：純被動捲動學不到東西；純沙盒會溺水。
- 範本：Parable of the Polygons（讀規則→操作→看後果→恍然大悟）。
- 我們：主頁敘事設計成一連串微迴圈，每個招牌互動前用 2–4 句鋪陳概念，操作後才揭露反直覺結論（如「調高門檻＝多殺好人」）。

### (b) hub-and-spoke 導覽與文本外連

**模式 B1：主頁 ROUTE 不 RECITE**
- 解決：主頁變文章牆／長文牆。
- 範本：Red Blob（Learn/Play/Ponder/Meta 分類入口）、samwho.dev（emoji 分區瘦首頁）、Setosa（編號目錄）。
- 我們：主頁職責＝定向＋分流＋建立信任。14 章不在主頁展開，主頁用互動敘事串敘事弧線，深入內容一律外連到章節 spoke 頁。

**模式 B2：spoke 頁自成宇宙、可深連結／單獨封存**
- 解決：IPFS 內容定址下，每章必須能獨立取用。
- 範本：Red Blob（每頁獨立 deferred island bundle、plain `<a href>` 串接）、R2D3（每篇自足 scrollytelling）。
- 我們：每章一個獨立 URL、自帶完整繁中散文與結論、不依賴主頁脈絡、頂部回 hub／底部相關 spoke＋外連。

**模式 B3：三層深度模型（主敘事 / 就地展開 / 外連）**
- 解決：三受眾深度需求不同，正文易被技術細節淹沒。
- 範本：Ciechanowski（文內 Wikipedia 外連＋文末策展清單）、Nutshell（術語就地展開）。
- 我們：① 主敘事乾淨可讀（繁中科普）；② 術語點一下就地展開小釋義（IPNS／DNS-RPZ／Ring／偽陽性）；③ 治理史細節、NCC 法條原文、IPFS/ENS 規格留給文末外連與附錄。**就地展開在 no-JS 時退化成普通 in-page 錨點或直接顯示全文。**

**模式 B4：受眾分流入口**
- 解決：一般／政策／開發者同站不同需求。
- 範本：Red Blob 按 intent 分桶（Learn/Play/Ponder）。
- 我們：主頁設三條 lane —— 一般人「從這裡開始」、政策／證據 lane、開發者／實作 lane —— 同一 hub 服務三軌，不開三個站。

### (c) scrollytelling 敘事骨幹

**模式 C1：同一畫面逐層加碼（漸進揭露、絕不重畫場景）**
- 解決：資訊一次給完造成過載。
- 範本：R2D3（單切分線→加維度→決策樹→整棵樹→過擬合）。
- 我們：集團網路圖在主頁先給最簡狀態（一個帳號），捲動逐步長出整個 Ring；排序 split-screen 捲動揭開前後對照。深入操作再點進 04／07 章。

**模式 C2：章節小標當敘事節拍器／隱形進度條**
- 解決：scrollytelling 讀者迷失「我在學什麼、學到哪」。
- 範本：R2D3（First intuition / Drawing boundaries / Your first fork…）。
- 我們：主頁每個視覺狀態配一個動詞短語小標（偵測→掃描→誤殺→處置→排序→抗審查→建言），標題即進度。

**模式 C3：時間軸 scroll 觸發**
- 解決：治理史 2018–2025 八年事件需有序呈現又不堆牆。
- 範本：The Pudding、R2D3。
- 我們：02 章時間軸捲過一年帶出一個事件節點＋插畫；行動端降級為垂直年份清單（無障礙與窄螢幕同時解決）。

### (d) explorable 動手互動

**模式 D1：手動→參數模擬→開放沙盒三段爬升**
- 解決：沙盒溺水 vs 受控太淺的兩難。
- 範本：Parable of the Polygons、Evolution of Trust。
- 我們：偽陽性分數線（05）完全照搬。開放調參一定放在已被 scaffold 的後段。進階受眾可跳過手動段直接進參數模擬。

**模式 D2：Place Your Bets（先猜再揭曉）**
- 解決：互動變好玩玩具、無認知投入。
- 範本：Nicky Case 設計模式語彙。
- 我們：排序 split-screen 先讓讀者猜「哪則貼文排前面」再揭曉演算法真實排序，用認知落差製造記憶點。

**模式 D3：拖滑桿即時看權衡＋四象限重算**
- 解決：把「調一個鈕→兩指標一升一降」的取捨變肉眼可見。
- 範本：MLU-Explain（precision-recall 混淆矩陣同步）、Setosa（四格條件機率）。
- 我們：05 分數線——拖門檻時 TP/FP/FN/TN 四格與「誤殺好內容 vs 漏放垃圾」即時重算，零延遲因果感。給政策關係人看權衡最有效。

**模式 D4：比較優於切換（side-by-side）**
- 解決：要讀者記住切換前後狀態，認知負荷高。
- 範本：Red Blob（BFS vs Dijkstra vs A* 並列）。
- 我們：排序 split-screen 同時呈現「時間序 vs 演算法排序」，而非 toggle；分數線拖動時前後狀態連續變化（避免 tie 處閃爍）。

**模式 D5：可編輯矩陣／權重盤＋即時驗證**
- 解決：開發者軌要親手調參數看偵測行為改變。
- 範本：Setosa 馬可夫鏈（可編輯 transition matrix、不合法變紅、ex1/ex2/ex3 預設）。
- 我們：03 偵測技術做成可拖曳的帳號狀態轉移／特徵權重盤＋即時紅字驗證＋預設情境切換。

### (e) 微互動與漸進揭露

**模式 E1：行內就地展開術語**
- 解決：深度內容跳頁打斷閱讀線。
- 範本：Nutshell（`[:詞](#章節)` 點擊就地展開、可巢狀）。
- 我們：極簡 vanilla island 復刻「點擊→展開→可巢狀」，無須引入 nutshell.js。no-JS 退化成錨點連結。

**模式 E2：行內 SVG 微圖例**
- 解決：圖例與正文脫節。
- 範本：Red Blob（句子裡塞 `<svg width=3em height=1em>` 微圖示）。
- 我們：文字提到「一個垃圾集團」「偽陽性」時，實際視覺 token 行內出現，在字詞層強化 hub-and-spoke。

**模式 E3：cognitive gate 控制 skim**
- 解決：unsupervised skimming 造成困惑、降低理解。
- 範本：Evolution of Trust（按鈕分節推進，必須動手才能繼續）。
- 我們：主頁關鍵互動段用「動一下才往下」的 gate；但 gate 要可被鍵盤觸發、no-JS 時自動解除（不能鎖死閱讀）。

### (f) 字體排印與長文可讀性

**模式 F1：文字砍到只剩鷹架（克制體量）**
- 範本：Setosa（標題＋一行定義＋短散文穿插）、samwho.dev。
- 我們：主頁與每段互動旁的文字＝�bones only，長論證外連章節。每段 2–4 句、單欄、無側欄。

**模式 F2：學術級長文排版與引用**
- 範本：Distill.pub、Our World in Data。
- 我們：政策／開發者軌章節頁採側註（margin notes）、可引用區塊、一手出處外連集中文末。CJK 排版：合適行高（1.7–1.9）、繁中標點擠壓、避免西文式 hover-only 資訊。

**模式 F3：受眾切換語域**
- 解決：第二人稱口語適合一般人，對政策／開發者顯不嚴謹。
- 範本：Evolution of Trust（第二人稱）對照 Distill（學術）。
- 我們：按 lane 切換語域——一般人軌親切第二人稱，政策軌嚴謹引用，開發者軌技術直述。別全站一個調。

### (g) 無障礙與可封存

**模式 G1：漸進增強（互動是 enhancement，不是唯一形態）**
- 解決：ciechanow.ski／Setosa／R2D3 關 JS 即崩塌的反面教材。
- 範本：Red Blob（prerendered SVG/Canvas 在靜態 HTML，JS 只升級為互動）、samwho.dev（55 個真實 `<p>` 無 JS 可讀完）。
- 我們：每個 island 先 server-render 靜態 SVG/插畫＋一句文字結論，JS 載入後才升級可操作版。Astro 靜態正好做島外靜態後援。**硬性要求：no-JS 時每章讀得到結論、主頁讀得到導言＋14 章目錄。**

**模式 G2：每個招牌互動配文字版資料表 fallback**
- 解決：Canvas 對報讀器是像素黑盒；samwho.dev 互動區 no-JS 時是空洞。
- 範本：Our World in Data（圖附資料表）。
- 我們：每個招牌互動旁附 DOM 文字結論＋可下載資料表，同時當 a11y fallback、SEO、開放資料（呼應 12 章），一石三鳥。

**模式 G3：原生控制項＋鍵盤路徑**
- 解決：自製 widget 漏掉平台鍵盤慣例（Red Blob 自承）。
- 範本：Red Blob 建議用 styled `<input type=range>`／button。
- 我們：滑桿用原生 `<input type=range>`、按鈕用原生 `<button>`；每個互動有鍵盤路徑與 aria 標籤。

**模式 G4：prefers-reduced-motion 尊重**
- 我們：scroll 動畫、變灰過場、粒子流都要在 `prefers-reduced-motion` 時降級為靜態終態。

**模式 G5：touch 人因（控制項放圖下方）**
- 範本：Red Blob（控制項在圖下方，手指不擋圖；隱形大命中區 `pointer-events:all`）。
- 我們：分數線滑桿、be-the-moderator 按鈕放圖下方；加大 touch 命中區；固定像素 Canvas 改響應式（避開 Setosa width=1100、R2D3 散布圖矩陣窄螢幕崩的坑）。

**模式 G6：boring stable tooling＋自託管資產**
- 範本：Red Blob（只用 esbuild、無重框架；「這 build tool 十年後還能跑嗎？」）；R2D3 反例（jQuery+Backbone+停運 CDN）。
- 我們：vanilla Canvas/SVG/D3、固定 D3 版本、所有字型／插畫／script 自託管、移除第三方 widget（無 Twitter/分析 CDN），命名空間化每個 island 的 SVG id 避免碰撞。確保 IPFS pin 後十年仍 HTTP 200。

---

## 三、我們的網站地圖（sitemap）

報告 14 章 → 站台頁面映射原則：**招牌互動章獨立成頁；輕量章按主題合併；方法論與附錄收進「關於／資料」。**

```
網站根 /
│
├── /  ［主頁＝高互動閱讀體驗・hub］
│     招牌互動：可探索插畫 hero + 偽陽性分數線（精簡版）+ 集團網路圖（漸進長出）+ 排序 split-screen（精簡版）
│     內容：互動敘事串 14 章敘事弧線（導論→偵測→處置→排序→抗審查→建言）；只放鷹架文字
│     受眾分流：三條 lane 入口（一般人「從這裡開始」/ 政策・證據 / 開發者・實作）
│     外連：每個敘事節點用 #7258FF「深入第N章 →」連到對應 spoke
│     no-JS：讀得到導言 + 14 章目錄 + 每招牌互動的靜態結論
│
├── /start  ［全章節索引頁＝樸素 archives 等價物・磁磚牆］
│     ncase.me 磁磚分類；給政策關係人/開發者快速跳轉；按 lane 與章序雙重分組
│
├── 章節 spoke 頁 ───────────────────────────────────────────────
│
│  ├── /intro  ［導論］← 報告 01
│  │     招牌互動：三悖論互動圖（透明開盒兩難的 trade-off 切換）
│  │     合併：把 00 方法 的精華摘要置頂，完整方法論連到 /about
│  │     外連：← 主頁；→ /detection、/about
│  │
│  ├── /history  ［治理史編年 2018–2025］← 報告 02
│  │     招牌互動：scroll 觸發時間軸（The Pudding 式），每年一事件節點＋插畫
│  │     no-JS/窄螢幕：垂直年份清單
│  │     外連：→ /dns-rpz（10 事件深連結）、/ncc（11 合規）
│  │
│  ├── /detection  ［偵測技術 + 集團掃描 Ring］← 報告 03 + 04 合併
│  │     招牌互動①：可編輯特徵權重盤／狀態轉移（Setosa 馬可夫式，開發者軌）
│  │     招牌互動②：垃圾集團網路圖（個體規則→集體湧現，含「示意 vs 真實規模」切換 Ciechanowski 式）
│  │     合併理由：偵測（怎麼抓）與 Ring（抓到什麼結構）是同一條技術敘事
│  │     外連：→ /false-positive（抓錯的代價）、/data（12 開源資料集）
│  │
│  ├── /false-positive  ［偽陽性］← 報告 05 ★旗艦
│  │     招牌互動：偽陽性分數線（手動拖一筆→參數模擬整批誤殺曲線→開放沙盒）
│  │              + 混淆矩陣四象限即時重算（MLU/Setosa 式）
│  │     三段爬升（Polygons 式）；具象比喻「貼文落入審查網」
│  │     外連：← /detection；→ /actions（誤殺後怎麼處置）
│  │
│  ├── /moderation  ［七種處置 + be-the-moderator］← 報告 06
│  │     招牌互動：be-the-moderator 測驗（Evolution of Trust 式分節推進＋第二人稱旁白）
│  │     內容：七種處置手段的後果可視化
│  │     外連：← /false-positive；→ /ranking
│  │
│  ├── /ranking  ［首頁排序］← 報告 07 ★旗艦
│  │     招牌互動：排序 split-screen（Place Your Bets 先猜再揭曉；side-by-side 時間序 vs 演算法）
│  │     外連：→ /crowd（08 群眾協力如何影響排序）、/data
│  │
│  ├── /crowd  ［群眾協力］← 報告 08
│  │     招牌互動：協力機制流程互動圖（輕量 SVG）
│  │     外連：← /ranking；→ /moderation
│  │
│  ├── /censorship-resistance  ［抗審查 IPFS/IPNS/ENS + DNS-RPZ 事件］← 報告 09 + 10 合併
│  │     招牌互動：內容定址 vs 位址定址對照互動（拖一個 CID 看抗審查路徑）
│  │              + DNS-RPZ 事件時間線（從 /history 深連結進來）
│  │     合併理由：09 是抗審查機制、10 是抗審查實戰事件，同一主題的「原理＋案例」
│  │     開發者軌：IPFS/ENS 技術規格外連
│  │     外連：→ /ncc（合規張力）、/data
│  │
│  ├── /ncc  ［NCC 合規］← 報告 11
│  │     招牌互動：法條原文就地展開（Nutshell 式）；合規地圖
│  │     政策軌：法條一手出處外連、可引用區塊
│  │     外連：← /history、/censorship-resistance；→ /conclusion
│  │
│  ├── /data  ［開源與資料集］← 報告 12
│  │     內容：每個招牌互動的資料表下載入口（a11y fallback ＋ 開放資料雙用）
│  │     開發者軌主場：原始碼 repo、CID、授權說明
│  │     外連：被 /detection、/ranking、/false-positive 反向連入
│  │
│  ├── /conclusion  ［結論建言］← 報告 13
│  │     招牌互動：建言對三受眾的分軌呈現（切換 lane 看不同 takeaway）
│  │     外連：← 全站；→ /about、/data
│  │
│  └── /about  ［關於・方法・附錄］← 報告 00 + 附錄
│        內容：完整方法論、資料來源、致謝、授權（CC0/CC-BY-SA）、IPFS/ENS 取用說明
│        信任區塊（Polygons 式頁尾）：審稿致謝、一手出處、TWNIC 計畫資訊
│
└── 全站共用 ──────────────────────────────────────────────────
      導覽：極簡（主頁 / 全章節索引 / 關於 / 受眾切換 / RSS・社群）
      章節間：上一章／下一章線性動線 + 回 hub
      語意色票：每概念一色貫穿文字／圖／控制項／卡片；#7258FF 專留「可互動」信號
```

### 三受眾分流策略

| 受眾 | 入口 | 動線 | 語域 | 主要頁 |
|------|------|------|------|--------|
| 一般人 | 主頁「從這裡開始」lane | 跟主頁 scroll 主敘事線性走完→點旗艦章 | 第二人稱口語、繪本插畫主導 | / → /false-positive → /moderation → /ranking |
| 政策關係人 | 主頁「政策・證據」lane／`/start` | 非線性跳章，重證據與權衡 | 嚴謹、側註、可引用、一手出處 | /history → /ncc → /censorship-resistance → /conclusion |
| 開發者 | 主頁「開發者・實作」lane／`/start` | 直達技術章，重可調參數與資料 | 技術直述、code/規格外連 | /detection → /ranking → /censorship-resistance → /data |

> 合併決策摘要：03+04→/detection（技術敘事連貫）；09+10→/censorship-resistance（原理＋案例）；00+附錄→/about。其餘 11 個內容章各自獨立成頁（旗艦章 05、07 投入全互動；06、08 中等；其餘輕量圖文）。

---

## 四、主頁「閱讀體驗」架構提案（段落級 wireframe）

主頁＝一條乾淨的捲動主敘事線（R2D3 sticky 舞台 ＋ Polygons 微迴圈），由上到下串起三支柱（垃圾審查 → 排序演算法 → 抗審查），每段以 `#7258FF`「read more →」外連章節。**主頁不堆長文。**

```
┌─ [00] 頁首導覽（sticky 細條，scroll 時縮小）────────────────────
│   左：站名/logo  中：受眾切換（一般/政策/開發者，預設一般）
│   右：全章節索引・關於・RSS    no-JS：純 <a> 連結列
│
├─ [01] HERO — 可探索插畫舞台 ──────────────────────────────────
│   波隆納風 gouache 大插畫：一座「內容廣場」，貼文小卡漂浮。
│   一行標語（台味雙關勾子）+ 一句副標：「按住任一張貼文，看它如何被審查」
│   微互動：hover/長按一張貼文→#7258FF 高亮＋就地展開一句它的命運
│   ↓ 持續「往下捲」提示（reduced-motion 時靜態箭頭）
│   no-JS：靜態插畫 + 標語 + 「往下讀」錨點
│
├─ [02] 鉤子段：透明開盒的兩難（接 01 導論）────────────────────
│   2–3 句鷹架文字：平台治理為何是個悖論。
│   微互動：三悖論小切換圖（toggle 看每個悖論的兩難）
│   read more →《導論》/intro
│
├─ [03] 支柱一 · 垃圾審查 ── sticky 舞台開始 ────────────────────
│  [03a] 偵測：文字鋪陳「平台怎麼抓垃圾」
│        漸進揭露：插畫舞台先一個帳號，捲動長出一個垃圾集團 Ring
│        read more →《偵測技術》/detection
│  [03b] ★偽陽性分數線（招牌·主頁精簡版）
│        過場句：「但抓得越嚴，誤殺越多——拖拖看。」
│        互動：sticky 舞台變成分數線，#7258FF 拖把手；
│              拖嚴→無辜貼文逐個變灰，旁邊四格(TP/FP/FN/TN)即時重算
│        微迴圈：拖完才揭露結論「調高門檻＝多殺好人」
│        read more →《偽陽性》/false-positive（含三段爬升沙盒）
│  [03c] 處置：一句帶過七種處置 + be-the-moderator 勾子
│        read more →《七種處置》/moderation
│
├─ [04] 支柱二 · 排序演算法 ─────────────────────────────────────
│   過場句：「就算沒被刪，你看到的順序也被決定了。」
│   ★排序 split-screen（招牌·主頁精簡版）：
│     Place Your Bets：先讓讀者猜哪則排前面（點選）→揭曉演算法排序
│     side-by-side：左「時間序」右「演算法序」同時呈現
│   read more →《首頁排序》/ranking
│
├─ [05] 支柱三 · 抗審查 ─────────────────────────────────────────
│   過場句：「如果平台被要求下架呢？內容還能活著嗎？」
│   微互動：內容定址 vs 位址定址對照（拖一個 CID 看它在 IPFS 上的抗審查路徑）
│   read more →《抗審查》/censorship-resistance
│
├─ [06] 治理史時間軸（敘事弧線的「這一切怎麼來的」）──────────────
│   scroll 觸發橫向/縱向時間軸：2018→2025，捲過一年浮現一個事件節點＋插畫
│   no-JS/窄螢幕：垂直年份清單（純文字事件 + 連結）
│   read more →《治理史編年》/history
│
├─ [07] 收束：結論建言（三受眾分軌 takeaway）──────────────────
│   依頂部受眾切換顯示不同一句話 takeaway（一般/政策/開發者）
│   read more →《結論建言》/conclusion
│
├─ [08] 全章節索引磁磚牆（archives 出口）──────────────────────
│   14 章縮圖卡矩陣（每卡＝該章招牌互動截圖 + 標題 + 一句台味標語）
│   按 lane 與章序雙重分組；deep-link 友善
│
└─ [09] 頁尾信任區塊（Polygons 式）────────────────────────────
    TWNIC 計畫資訊・一手資料來源・審稿致謝・授權(CC0/CC-BY-SA)
    IPFS/ENS 取用入口・開放資料下載・社群連結・RSS
```

### 工程實作備註（交付用）

- **sticky 舞台技術**：IntersectionObserver/scrollama 風格綁定 scroll 進度→island 狀態；每個 scroll 狀態須容忍快速捲動與回捲、不 scroll-jack（標準捲動，無劫持）。
- **島外靜態後援**：每個招牌 island 在 Astro 構建時 SSR 一張靜態 SVG/插畫 + 結論文字；JS hydrate 後升級為互動。`<noscript>` 與島外 DOM 皆含結論。
- **語意色票系統**：建一組 design tokens，每章/每概念一穩定色，CSS 變數貫穿散文 `<span>`、SVG fill、`<input>` accent-color、章節卡邊框。`#7258FF` **只**用於「可互動」信號，不參與內容配色。
- **控制項**：滑桿 `<input type=range>`、按鈕 `<button>`，原生為主、styled 外觀；放圖下方；加大 touch 命中區；全鍵盤可達 + aria。
- **就地展開**：vanilla island，no-JS 退化為 in-page 錨點或直接顯示。
- **reduced-motion**：所有 scroll 動畫/變灰/粒子在 `prefers-reduced-motion` 降級靜態終態。
- **深連結錨點**：主頁每段給 id（#detection、#false-positive…），章節頁可被反向 deep-link。

---

## 五、反模式與取捨

### 明確要避免的反模式

| 反模式 | 出處教訓 | 我們的對策 |
|--------|----------|-----------|
| **scroll-jacking（劫持捲動）** | R2D3 狀態機節流沒調好，觸控板/手機黏滯、過頭、回捲錯位 | 標準捲動、無 sticky 鎖死；每狀態容忍快速捲動與回捲；節流調校；窄螢幕簡化視覺 |
| **WebGL/Canvas 濫用為唯一載體** | ciechanow.ski 純 WebGL、Setosa AngularJS、R2D3 純 D3 注入——關 JS 即空白，canvas 對報讀器是黑盒 | 漸進增強；招牌互動優先 vanilla SVG（可索引/封存/報讀），只在「大量即時粒子」（如封包流動）才務實用 Canvas，且必附文字/SVG 退化版 |
| **mystery-meat 導覽** | 關鍵資訊藏在 hover（行動裝置無 hover） | 關鍵知識點絕不藏 hover；hover 只承載「可選深一層」；深度用就地展開或點進章節 |
| **無 no-JS fallback** | samwho.dev 互動區 no-JS 是空洞；R2D3 圖全空白 | 硬性要求：每章 no-JS 讀得到結論、主頁讀得到導言＋目錄；每招牌互動配靜態圖＋文字結論 |
| **連結腐朽（link rot）** | R2D3 依賴已停運 maxcdn html5shiv、Twitter widgets | 全資產自託管、移除第三方 widget/分析 CDN、固定 D3 版本、`Cool URIs don't change`（舊頁保留至新頁就緒） |
| **互動 ≠ 思考（好玩玩具）** | Nicky Case 警告：hands-on 無認知投入＝白做 | 每個招牌互動用 Place Your Bets/微迴圈逼讀者先預測、再揭曉、形成自己的模型 |
| **沙盒溺水** | 開放調參是最深學習也最易過載 | 沙盒一律放 scaffold 過的後段；前面用受控小例子鋪墊 |
| **過度上色** | Red Blob 自承色彩超過幾種即失效 | 每圖配色定量；`#7258FF` 嚴格保留為互動信號，不與內容色競爭 |
| **iframe-per-互動** | Polygons 的 iframe 共享狀態難、a11y/焦點破碎、窄螢幕被裁 | 用 Astro islands（同頁元件）而非 iframe，保留模組化避開 a11y/RWD 痛點 |
| **固定像素寬不響應** | Setosa `viewport width=1100`、R2D3 散布圖矩陣窄螢幕崩 | 全 RWD + touch 友善拖曳；響應式 Canvas/SVG |
| **完美主義拖垮期程** | samwho.dev 每篇 1–3 月、ciechanow.ski 每篇數月 | 分級投入：只在旗艦章（05 偽陽性、07 排序、06 be-moderator、04 集團/09 抗審查）做全互動，其餘輕量 SVG/插畫；在 TWNIC 期限內結案 |

### 因「可封存／IPFS／無障礙」做的取捨

1. **互動深度 vs 封存性**：放棄「JS-only 視覺奇觀」，換取 no-JS 可讀、十年後 WebGL 棄用仍可取用。代價是招牌互動要做兩套（靜態後援＋互動升級），工時增加——用 Astro 島外 SSR 攤平此成本。
2. **框架便利 vs 長期維護**：放棄重框架運行時，選 vanilla + esbuild/Astro 靜態。代價是部分互動要手刻，但換得「這 build tool 十年後還能跑嗎」的確定性。
3. **自製 widget 美觀 vs 無障礙**：優先原生 `<input>/<button>`＋styled 外觀，犧牲部分視覺自由，換鍵盤慣例與報讀器相容。
4. **動畫魅力 vs reduced-motion**：所有動效須有靜態終態，犧牲部分「驚艷感」換可及性。
5. **資料開放 = a11y fallback 雙用**：把每個互動的資料表同時當無障礙退化、SEO、開放資料下載（呼應 12 章）——這是正和取捨，無犧牲。
6. **插畫授權必須提早確認**：波隆納 gouache 風素材與字型的開放性（CC0/CC-BY）須在製作前確認，否則封存與多語翻譯會被授權卡住（Polygons 能被 18 語翻譯正因 CC0）。
7. **單一報告型 vs 作品集型 hub**：我們是 14 章有先後邏輯的單一報告（非並列作品集），故在 Red Blob/samwho 的並列卡片之上再加一層敘事線與進度感，讓讀者知道章節有閱讀順序——這是我們比所有範本都要多做的一層 scaffolding。

---

*範本 URL 皆為製作時可開啟驗證的真實網址；技術選擇（Astro 靜態 + islands + vanilla Canvas/SVG/D3 + GitHub Pages/IPFS）已由 Red Blob Games（2004→2026 持續存活）與 MLU-Explain（Svelte+D3+GitHub Pages+CC 授權）兩個活站背書其可行性與可封存性。*
