import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { i18n } from './src/i18n/config';
import { shouldIncludeInSitemap } from './src/utils/sitemap';

export default defineConfig({
  site: 'https://sapiensit.com',
  i18n,
  output: 'static',
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
          en: 'en-US',
          es: 'es-ES'
        }
      },
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => {
        return shouldIncludeInSitemap(page);
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  image: {
    // Configurações de otimização de imagem
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
