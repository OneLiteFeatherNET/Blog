import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import cloudflare from "@astrojs/cloudflare";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.onelitefeather.net',
  integrations: [mdx(), sitemap(), preact(), robotsTxt(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  output: "server",
  adapter: cloudflare()
});