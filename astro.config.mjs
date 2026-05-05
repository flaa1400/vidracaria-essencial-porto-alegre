import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { SITE_CONFIG } from './src/data/config';

export default defineConfig({
  site: SITE_CONFIG.domain,
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind()
  ],
});
