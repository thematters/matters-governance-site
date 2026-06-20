# 第二輪回饋 roadmap（2026-06-20）

> 使用者一次給的大批回饋。依「快修 / 大改造 / 素材 / 待定」分類並排序。完成打勾。

## 🟢 快修（contained，我先做）
- [ ] **E1 拿掉受眾切換**：移除 header 的「一般／政策／開發者」三鍵（AudienceToggle）。
- [ ] **A 全螢幕 hero**：hero 改 100svh（現在 86vh + cover 把圖下半部切掉）；底圖用生成圖。
- [ ] **D3 決策邊界把手太大**：縮小拖曳把手 + 加動態 hint（脈動）讓人知道可拖。
- [ ] **D2 偽陽性滑桿沒切齊**：thumb 與軌道垂直對齊修正。
- [ ] **D8 治理史時間軸**：點點與時間軸沒對齊，修。

## 🔴 大改造（需聚焦步驟，逐項做）
- [ ] **A2 底圖固定＋漸變離場（全站 banner 模式）**：hero 與**每一個章節頁**的底圖要「固定在後、內容捲過它、底圖漸淡離場（parallax/fade），不是只改裁切高度」；裁切（切到主體）也要一併解。實作：banner 改 `position:fixed/sticky` 全螢幕底層 + 內容不透明圖層捲過 + GSAP 隨捲動 fade。← 與 D1 的 hero 一起做。
- [ ] **D1 首頁意象太陽春 → 玻璃感社群 feed**（核心）：把 sticky scrollytelling 改成「半透明玻璃圖層、模仿社群平台頁面」；文章＝貼文圖層，捲動時貼文 scroll 進出、有好有壞，講「怎麼揪出壞的、誤刪怎麼辦」。
- [ ] **E2 14 頁併進首頁**：所有互動頁拉進首頁做成一條連續 scrollytelling；中間要有休息點、旁邊要有跳章導引（chapter rail）。←最大架構改造。
- [ ] **B 最後一塊大的：黑/光電影脊椎**：用 dark-flood / light-emergence 圖+影片當下潛暗幕／重見光明背景 + 章節吞噬式轉場。
- [ ] **D4 集團掃描（RingDetector）太陽春**：視覺升級。
- [ ] **D5 換你當版主（BeModerator，moderation）**：改成更像「社群網站卡片」佈局；按鈕更成熟；**結果與卡片分離、移到外部**。
- [ ] **D6 守望相助（crowd）**：參考使用者原文（「猩猩打掃強大」段）；做一張 **feedback loop 示意圖**（群眾打掃資料→訓練新模型→模型也打掃→一路成長）；數據更新到最新。
- [ ] **D7 熱門排序對照**：本體很棒；把「時間序 vs 演算法序」兩欄**重新設計成像真的首頁 feed**。

## 🖼 素材 drop-in（小，分批做）
- [ ] 工具卡換手繪小物件（broom/label-hand/gear/lantern PNG）
- [ ] bigq 章節縮圖（card-censorship-resistance / card-ranking / card-dns-rpz）
- [ ] feed 卡片生物（spam-card-red / false-positive-card-grey / good-card）→ 與 D1 一起做
- [ ] 集團用 spam-blob 影片、IPFS 節點圖（glowing-ipfs-nodes）、hero 向下箭頭（down-arrow）

## ⚠️ 待定 / 需使用者
- **A 影片解析度不足**：Sora 影片是 720p，全螢幕 hero 會略糊。code 端：保留高解析 poster（hero.jpg 2400×1600，不播放時清晰）；要更清晰需 Sora 重生 1080p。建議：動作很細微，720p 當 ambient 背景可接受；或重生。
- **hero 7 版本選版**：目前 hero-everyone-moves-loop。
- **D6 原文**：需要使用者把「猩猩打掃」那篇原文給我（或指路），才能精準引用。

## 建議執行順序
1. 快修全做（本輪起）
2. **D1 玻璃感 feed**（核心意象，影響最大）
3. **E2 14 頁併首頁 + chapter rail**（架構，建立在 D1 之上）
4. B 黑/光脊椎（在新 feed 上加暗幕/轉場）
5. D4/D5/D7 各互動重設計 + 素材 drop-in
6. D6（等原文）、D8、收尾
