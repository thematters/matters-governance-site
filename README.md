# Matters 平台治理科普網站

> 審查還是抗審查？網路平台「透明開盒」的兩難 — TWNIC 社群計畫結案網站
> 以 Matters.town 自身 2018–2025 的治理史為案例，科普垃圾審查、排序演算法與抗審查。

完整施作規劃見 [`PLAN.md`](./PLAN.md)。

## 開發

```bash
npm install
npm run dev      # 本機開發 http://localhost:4321
npm run build    # 產出靜態站到 dist/
npm run preview  # 預覽 build 結果
```

需求：Node 18+（開發機為 v22）。

## 結構

```
src/
  layouts/BaseLayout.astro     版型：導覽、進度條、頁尾、受眾切換、i18n
  components/
    AudienceToggle.astro       漸進揭露：一般／政策／開發者三層深度
    Cite.astro                 可展開引註（完全引用的基礎元件）
    Timeline.astro             治理事件→服務升級 時間軸（複用）
    InteractionSlot.astro      互動 island 佔位框
  data/
    timeline.json              真實治理史時間線（2018–2025）
    sources.json               證據庫 stub（主張→出處）
  styles/
    tokens.css                 vendored from thematters/design-system @ 97f8634（勿手改）
    global.css                 波隆納土系色場 + 品牌紫當互動信號色
  pages/
    index.astro                首頁／可探索插畫 hub（hero 待接插畫）
    shen-cha.astro             審查（完整範本：垃圾偵測方法 6 節）
    kang-shen-cha.astro        抗審查（IPFS／IPNS／ENS）
    pai-xu.astro               首頁排序
    guan-li-yuan.astro         管理員手段（七種處置）
    shi-jian-xian.astro        時間軸（完整）
    yan-shen.astro             延伸（DNS-RPZ／NCC／資料集／英文）
    en/index.astro             英文版（P3）
```

## 設計約定

- **語氣**：對外科普的中性語氣（非個人語氣）。豆泥既有文章是「內容素材」，不是語氣範本。
- **受眾分層**：用 `AudienceToggle` 切換 `<html data-audience>`，以 CSS 顯示／隱藏 `.layer-policy` `.layer-dev`，不做三個版本。
- **完全引用**：可揭露的主張都用 `<Cite>` 標出處；敏感參數依 PLAN §12 的「可公開集」處理。
- **視覺**：大色場走土系插畫；`--accent`（Matters 品牌紫 #7258FF）只當「可點／可拖／可展開」的信號色。
- **互動**：純 Canvas／SVG／D3 為主，可存檔、無障礙；hub 用分層圖＋SVG 熱區，不用 WebGL。

## 部署

- 預設無 `base`，適合自有網域 / IPFS。
- 若上 GitHub Pages 專案站，於 `astro.config.mjs` 設 `base`，站內連結改用 `import.meta.env.BASE_URL`。
- 規劃同步部署到 IPFS（呼應抗審查主題）。

## 狀態

骨架階段（P0）。內容多為真實但精簡的版本，`InteractionSlot` 為互動待接點。
`materials/`（原始材料，含敏感訪談）已 gitignore。
