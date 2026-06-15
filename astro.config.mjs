import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://vidroessencialportoalegre.com.br',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind()
  ],
});
