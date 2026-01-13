# SapiensIT Blog - Project Guidelines for AI Assistants

## Project Overview

This is a **consultant blog** and **landing page** built with **Astro** and **Tailwind CSS v4.0**. The site is focused on corporate consulting, training, and has an integrated multilingual blog system.

**Site URL:** https://sapiensit.com

## Tech Stack

- **Framework:** Astro v5.16+ (SSG - Static Site Generation)
- **UI Components:** React (Islands architecture)
- **Styling:** Tailwind CSS v4.1+ with `@tailwindcss/vite`
- **Content:** MDX for blog posts
- **Language:** TypeScript
- **i18n:** Custom implementation with 3 locales (pt, en, es)

## Key Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Content
npm run new:post "Title" [locale]  # Create new blog post (locale: pt|en|es)
```

## Project Structure

```
src/
├── components/      # Reusable Astro/React components
├── content/         # MDX blog posts organized by slug
│   └── blog/        # Blog posts (slug/index.[locale].mdx)
├── i18n/            # i18n configuration and translations
│   └── locales/     # Translation JSON files (pt/, en/, es/)
├── layouts/         # Base layouts (BaseLayout.astro)
├── pages/           # File-based routing
├── styles/          # Global CSS with Tailwind
├── types/           # TypeScript definitions
└── utils/           # Helper functions
```

## Critical Guidelines

### 🌐 Multi-Language Protocol (MANDATORY)

**When creating ANY new page, component with text, or content:**

1. **Triple Output Required:** Provide versions in Portuguese (PT), Spanish (ES), and English (EN)
2. **Code Consistency:** Keep JSX/HTML structure identical; only change text strings, alt tags, aria-labels
3. **Tailwind Classes:** Must be exactly the same across all language versions
4. **Display Order:** Always follow PT → ES → EN sequence
5. **Contextual Translation:** Do NOT translate literally - preserve idioms and cultural nuances

### 🎨 Tailwind CSS v4.0 Rules

1. **CSS-First Approach:** Use `@theme` block in CSS instead of `tailwind.config.js`
   ```css
   @import "tailwindcss";
   
   @theme {
     --color-primary: #3b82f6;
     --font-display: "Inter", sans-serif;
   }
   ```

2. **No Content Array:** v4 auto-detects content - do NOT suggest `content: []` paths

3. **Variable Syntax:** Use `bg-(--color-primary)` for custom theme variables

4. **Color Space:** Prefer OKLCH colors for accessibility (e.g., `bg-oklch(60% 0.15 250)`)

5. **Native CSS Features:** Use `@layer` (base, components, utilities) per CSS spec

6. **Container Queries:** Use native `@container` and `@md:grid-cols-2` without plugins

### 📝 Blog Post Structure

Posts are stored in `src/content/blog/[slug]/index.[locale].mdx`

**Required Frontmatter:**
```yaml
---
title: "Post Title"
description: "SEO description"
date: 2024-01-15
category: "Category"
locale: "pt"  # pt, en, or es
---
```

**Optional Frontmatter:**
- `tags`: Array of tags
- `cover`: Image URL
- `canonical`: Canonical URL
- `draft`: Boolean (if true, hidden in build)

### 🔍 SEO Implementation

The project auto-includes:
- Open Graph & Twitter Cards
- Schema.org (Organization, Article, Breadcrumb)
- Canonical URLs with hreflang for i18n
- Sitemap at `/sitemap-index.xml`

### ⚡ Performance Targets

- Lighthouse: 95+ in all categories
- LCP < 2.5s | FID < 100ms | CLS < 0.1

## Deployment

The project is deployed to **Netlify** (see `netlify.toml`).

## Documentation (docs/)

The `docs/` folder contains essential project documentation:

### `docs/template_post.md`
**Template for LinkedIn Post Generation**
- Provides a structured prompt/template for AI-assisted content creation
- Designed for converting blog articles into high-engagement LinkedIn posts
- Includes:
  - Hook (provocative question or impactful statement)
  - Problem description
  - Solution presentation
  - Benefits (3 bullet points)
  - CTA (Call to Action)
  - Hashtag guidelines (5-7 relevant hashtags)
- **Style guidelines:** Professional but accessible, short paragraphs, moderate emoji use
- **Important:** Never start with "Olá a todos" - go straight to the customer pain point

### `docs/IMPLEMENTATION_SUMMARY.md`
**Complete Implementation Reference for Language Detection**
- Full summary of the automatic language detection system
- Detection priority order: URL params → localStorage → Browser language → Default (pt)
- Files modified: `BaseLayout.astro`, `src/utils/i18n.ts`
- Testing scenarios and troubleshooting guide
- SEO configuration with hreflang tags
- Performance impact analysis (~2KB inline JS, <5ms execution)

### `docs/LANGUAGE_DETECTION.md`
**Technical Guide for i18n System**
- How automatic language detection works
- Supported locales: `pt` (default), `en`, `es`
- localStorage key: `preferred-locale`
- Utility functions: `switchToLocale()`, `clearLocalePreference()`
- Browser compatibility and graceful degradation
- Testing instructions and future enhancement ideas

## Root Documentation Files

- `BRAND_VOICE_AND_CONTENT_GUIDE.md` - Content writing guidelines and brand voice
- `QUICK_START.md` - Quick start guide for developers
- `README.md` - Complete project documentation
- `TRANSLATION_STRINGS_REFERENCE.md` - Reference for all translation strings

## Common Tasks

### Adding Translations
1. Edit files in `src/i18n/locales/[locale]/`
2. Use `getTranslations()` utility in components

### Using Translations in Components
```astro
---
import { getTranslations } from '@/utils/i18n';
const t = await getTranslations('pt', 'common');
---
<h1>{t.nav.home}</h1>
```

### Conflict Resolution
Use `twMerge` and `cva` for component variants - they remain the gold standard for v4.
