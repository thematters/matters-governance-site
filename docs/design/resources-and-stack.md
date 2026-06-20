# 資源索引 ＋ 技術棧結論（第二輪大修前）

## 一、線上資源（使用者提供）
| 類 | 連結 | 用途 |
|---|---|---|
| 前期雛形 | https://thematters.github.io/platform-governance/ | 豆泥所作雛形，視覺/敘事參考 |
| 簡報 | mashbean.net/decks/twigf-2026-matters/ ・ g0v-summit-2026-matters/ ・ Prof-Hu-Class-0526 | 對外論述、圖表、金句 |
| 守望相助隊 | https://community-watch.matters.town | 守望隊產品本體（D5/D6 參考真實 UI） |
| 救生員帳號 | https://matters.town/a/7efv6nddfd25 | 海巡 bot 帳號 |
| 數據 | https://observablehq.com/@matters-tech | 真實量化資料（⚠️ 需權限，暫無法讀；要的話請匯出 CSV/JSON 給我） |
| Agent 分析文件 | spam-detection-scaffold/docs/{MODEL_UPDATE_REPORT, ARTICLE_MOMENT_ABUSE_REPORT, PROGRESS_REPORT, SPAM_ROADMAP}.md | **真實數據來源**（公開 repo，我可 fetch；做互動時取數） |
| 服務 repo | spam-detection-scaffold / community-watch / matters-spam-dataset / spam-detection-serverless / matters-coastguard-bot / platform-governance | 偵測/守望/資料集/海巡 bot 等 |
| 核心 repo | matters-web / matters-server / matters-oss | 平台本體（matters-web 的 feed/卡片 UI 可當 D1/D7 的真實版型參考） |

## 二、本機素材地圖（materials/，gitignore）
- **D6 守望相助原文** → `個人文字撰寫可參考/Matters 守望相助隊幕後—猩猩，打掃，強大！…pdf`（做 D6 引用＋feedback loop 用）
- 演算法筆記 → `個人文字撰寫可參考/對抗濫用內容的演算法筆記/…md`
- 治理/排序報告 → `個人文字撰寫可參考/matters-moderation-ranking-report-20260530.md`
- 治理史時間線 → `運營整理/Matters 治理史時間線.docx.txt`、`運營社區治理歷史回溯.docx.txt`（D8 時間軸數據）
- 內部訪談 → `內部訪談資料/*.transcript.md`（敏感，僅作事實核對、不逐字公開）
- 影片/圖素材 → `sora-renders` / `sora-inputs` / `generated-assets`（已導入 public/）

## 三、技術棧結論：**不用裝新套件**
`gsap@3.15` 已內含全部 plugin（Webflow 收購後全免費），本機 `node_modules/gsap/dist/` 已有：
- **ScrollTrigger**（scrub/pin，骨幹，已用）
- **ScrollSmoother**（平滑捲動＋parallax）→ E2 連續長 scrollytelling 的「重量感」
- **Observer**（統一 scroll/touch/pointer）→ E2 章節 snap / 休息點
- **ScrollToPlugin** → 章節 rail 跳轉
- **Flip**（版面變形動畫，已用於集團聚攏）→ D1 玻璃貼文進出、D5 卡片
- **MorphSVGPlugin**（SVG 形變）→ D6 feedback loop 圖、D7 對照
- **MotionPathPlugin**（沿路徑運動）→ D1 貼文沿路徑 scroll 進出
- **Draggable / SplitText** → 拖曳 / 逐字

外加 **CSS `backdrop-filter: blur()`** 做玻璃感（D1，零套件）。

> 結論：GSAP 全家桶 + CSS backdrop-filter 就能做完 D1/E2/B 與所有互動重設計。**不引入 Lenis/scrollama/d3/motion**（GSAP 已覆蓋、且維持可封存、輕量）。唯一可能補的是做真資料圖表時的 `d3-scale`（只算數學），到時再說。
