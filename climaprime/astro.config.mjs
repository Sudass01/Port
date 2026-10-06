// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { company } from './src/config/company.ts';

// A URL pública do site vem de src/config/company.ts (company.url).
// Ela alimenta canonical, Open Graph, sitemap.xml e robots.txt.
export default defineConfig({
  site: company.url,
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
