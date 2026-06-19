// @ts-check
import { defineConfig } from 'astro/config';

// 部署備註:
// - GitHub Pages「專案站」需設 base，例如 base: '/platform-governance'
//   並把站內連結改用 import.meta.env.BASE_URL 前綴。
// - 自有網域 / IPFS 部署則 base 留空（預設）。
export default defineConfig({
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
