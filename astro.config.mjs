import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blushbeautybyzee.com',
  output: 'static',
  // Never inline scripts: the CSP in public/_headers only allows 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
});
