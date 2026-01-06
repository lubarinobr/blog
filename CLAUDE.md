This is a consultant blog page using Astro and TailwindCSS
Always follow the best practicies using Astro and TailwindCSS

# Tailwind CSS v3.4: Best Practices & Maintenance Guide

## 🎯 Objective

This document serves as a technical reference for developing, maintaining, and scaling projects using Tailwind CSS v3.4. It prioritizes maintainability, performance, and a smooth future upgrade path.

---

## 1. Code Style & Developer Experience (DX)

* **Automatic Sorting:** The `prettier-plugin-tailwindcss` is **mandatory**. Classes must be sorted according to the official Tailwind order to prevent duplicates and improve scannability.
* **Logical Grouping:** When reviewing or writing classes, follow this hierarchy:
1. **Layout** (`flex`, `grid`, `relative`, `z-index`)
2. **Box Model** (`width`, `height`, `margin`, `padding`)
3. **Typography** (`text-`, `font-`, `leading-`)
4. **Visuals** (`bg-`, `border-`, `shadow-`, `opacity-`)
5. **Interactivity/States** (`hover:`, `focus:`, `dark:`, `animate-`)



## 2. Abstraction & Componentization Strategy

* **Avoid Global `@apply`:** Do not use `@apply` to create "custom classes" in CSS files for high-level components. This defeats the purpose of utility-first CSS and makes debugging harder.
* **Framework-Level Abstraction:** Abstraction should happen at the component level (React, Vue, Svelte, Blade).
* **Variant Management:** Use the **CVA (Class Variance Authority)** library to define UI component variants (e.g., primary, secondary, ghost).
* **Conflict Resolution:** Use `tailwind-merge` to handle class merges and overrides safely without style collisions.

## 3. Configuration & Design Tokens (`tailwind.config.js`)

* **Extend vs. Override:** Always use `theme.extend` to add new values. Overriding the root `theme` key will remove all default Tailwind values (like spacing or colors).
* **CSS Variables (Modern Approach):** Map your theme to native CSS variables for easier maintenance and dynamic theming.
```javascript
// tailwind.config.js
extend: {
  colors: {
    brand: {
      primary: 'var(--brand-primary)',
      secondary: 'var(--brand-secondary)',
    }
  }
}

```


* **Core Plugins:** Utilize official plugins for specific needs:
* `@tailwindcss/typography`: For CMS/Markdown content.
* `@tailwindcss/forms`: For standardized form styling.



## 4. Performance & Anti-Patterns

* **Precise Content Scanning:** Ensure the `content` array points only to relevant source files. Never include `node_modules` or large build folders.
* **No Dynamic Class Names:** **Never** use string interpolation to generate classes (e.g., `text-${color}-500`). Tailwind's static analysis cannot find these.
* *Correction:* Use a lookup object: `const themeStyles = { red: 'text-red-600', blue: 'text-blue-600' };`


* **Arbitrary Values:** Use `-[value]` (e.g., `top-[117px]`) sparingly. If a value is used more than twice, promote it to the config file.

## 5. Future-Proofing for v4.0

* **Modern CSS Properties:** Prefer CSS Logical Properties (e.g., `ps-4` instead of `pl-4`) to support RTL layouts.
* **Container Queries:** Start using `@tailwindcss/container-queries` for components that need to be responsive based on their parent size rather than the viewport.

---

## Scalable Component Example (Gold Standard)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const cardVariants = cva(
  'rounded-lg border p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border-slate-200 shadow-sm',
        flat: 'bg-slate-50 border-transparent',
        outline: 'bg-transparent border-slate-800',
      },
      padding: {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export function Card({ className, variant, padding, ...props }) {
  return (
    <div 
      className={twMerge(cardVariants({ variant, padding }), className)} 
      {...props} 
    />
  );
}

```

---

### Instructions for the AI Agent

1. **Refactoring:** If you see hardcoded class strings for variants, suggest a refactor using `CVA`.
2. **Linting:** Always sort classes in your responses according to the Prettier Tailwind plugin logic.
3. **Conflict Check:** When providing code that accepts a `className` prop, always wrap the output in `twMerge()`.
4. **No @apply:** Discourage the use of `@apply` unless it's for base HTML element resets.

Entendido, peço desculpas pela confusão. Você quer o **bloco de texto técnico** para copiar e colar nas instruções (System Prompt/Custom Instructions) do seu Agent, garantindo que ele siga esse comportamento de tradução automática.

Aqui está o trecho em **Markdown** para você adicionar às instruções do seu Agent:

---

### 🌐 Multi-Language Content Generation Protocol (PT/ES/EN)

**Rule:** Every time a request is made to create, design, or scaffold a new page, component with text, or content structure, you **must** provide the create the page in three languages: **Portuguese (PT)**, **Spanish (ES)**, and **English (EN)**.

**Implementation Guidelines:**

1. **Tabbed or Sectional Output:** Organize the response clearly by language. Use headers or separate blocks for each version.
2. **Contextual Accuracy:** Do not just translate literally. Ensure that idioms, technical terms (especially Tailwind/Dev terms), and cultural nuances are preserved in each language.
3. **Code Consistency:** * Keep the **JSX/HTML structure identical** across all three versions.
* The only elements that should change are the **text strings**, `alt` tags, `aria-labels`, and metadata.
* Maintain Tailwind CSS classes exactly the same in all versions to ensure visual parity.


4. **Order of Display:** Always follow the sequence:
* 1. Portuguese (PT)


* 2. Spanish (ES)


* 3. English (EN)





**Instructional Trigger:** Whenever the user says "Create a page", "Build a screen", or "Generate a section", this protocol activates automatically.

---