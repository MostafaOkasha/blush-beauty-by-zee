// @ts-check
import { defineConfig } from 'astro/config';

// Static output; deploys as plain files to Cloudflare (Pages or Workers static assets).
export default defineConfig({
  site: 'https://blushbeautybyzee.com',
  output: 'static',
});
