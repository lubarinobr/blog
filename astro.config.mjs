import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { i18n } from './src/i18n/config';

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
      lastmod: new Date(),
      filter: (page) => !page.includes('404') && !page.includes('admin'),
      customPages: [
        'https://sapiensit.com/',
        'https://sapiensit.com/contact',
        'https://sapiensit.com/blog',
        'https://sapiensit.com/en/',
        'https://sapiensit.com/en/contact',
        'https://sapiensit.com/en/blog',
        'https://sapiensit.com/es/',
        'https://sapiensit.com/es/contact',
        'https://sapiensit.com/es/blog'
      ]
    }),
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    // Configurações do Vite se necessário
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
