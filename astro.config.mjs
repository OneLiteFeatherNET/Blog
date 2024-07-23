import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.onelitefeather.net',
  integrations: [mdx(), sitemap(), preact(), tailwind()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"]
  },
  output: "server",
  adapter: cloudflare()
});