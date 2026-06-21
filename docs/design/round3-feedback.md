# 第三輪回饋（2026-06-21，使用者看部署版給）

## 🅰 章節背景系統（大改造 · 新原則）
- **原則**：每一章開頭出現圖片 → 圖片變黑 → 下面內容進場（把 hero 的 dark-on-content 模式套到**每一章**）。
- **各章 curated 底圖**（⚠️ 多數尚未進 repo，待使用者補檔）：
  - 魔高一尺 → 靜態圖 `N1-dark-underworld-reference`（待補）
  - 道高一尺 → 靜態圖 `F2-moderation-spectrum`（目前無 bg，要新增；待補）
  - 自己的帳號自己救 → `產生的圖片 5`（待補）
  - 更大的問題 → `N2-light-emergence-style-v2`（待補；目前用 light-emergence）
  - 附錄 → `crowd-lantern-high-motion-4s` 影片（✅ 已在 repo）
- DecisionBoundary（誤刪）底圖太亮妨礙文字 → **變黑一點**；確認用 HQ 非舊 robot。

## 🅱 版面/UX 修正（多數可即做，無需新素材）
- [ ] hero 影片被放大裁切 → 要全部放出來（重整瞬間全尺寸閃現；portrait 9:16 在 landscape 用 cover 裁上下）
- [ ] 紫色橫掃特效（StickyScroller sweep line）很沒意義 → 修改/移除
- [ ] Ring：① 被切到（×8 標籤 cut off）② 「ring」翻成中文語境（如「垃圾集團文」）③ 圈圈改成**貼文 mockup（迷你貼文）**
- [ ] 工具箱（光靠模型不夠）4 卡 3+1 兩列 → **同一列**
- [ ] 更大的問題 3 卡 → **同一列**
- [ ] 附錄 3 卡 → **一欄**
- [ ] 「深入：X」連結 → 給標籤/更好設計（**全部**深入連結）
- [ ] 偽陽性 feed 內捲容器右側 scrollbar → 不要瀏覽器預設（違和）→ 自訂或隱藏
- [ ] ranking 標題「同一批內容，誰會被排到第一名？」→「**誰能上首頁？是誰設計的？**」

## 🅲 內容編排
- [ ] 集團偵測（Ring）從 **魔高一尺 → 道高一尺**
- [ ] 道高一尺順序：那條門檻你會設在哪？→ 集團偵測 → 光靠模型不夠 → 首頁排序
      （⚠️ 「那條門檻」=FalsePositiveSlider 目前在第三章；移到第二章會把偽陽性招牌移出第三章——**需向使用者確認**）
- [ ] 14 主題排進首頁？目前 E2 只拉了 RingDetector/RankingSplitScreen/DecisionBoundary 三個互動 + 深入連結，**非全 14 連續 scrollytelling**。

## 🅳 其他素材
- [ ] 全部主題（start 頁）底圖 → `detection-matty-v2`（待補）

## ⏸ 暫緩
- 英文版（pending，直到中文版完全完成為止）
