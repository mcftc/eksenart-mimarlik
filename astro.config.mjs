// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// Canonical site URL. Subdomain by default; override with SITE_URL for previews.
const SITE = process.env.SITE_URL || 'https://mimarlik.eksenart.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  // 100% static output (best SEO/CWV). Content is edited via Sveltia CMS (/admin),
  // a git-based visual admin — no server runtime, no database.
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
