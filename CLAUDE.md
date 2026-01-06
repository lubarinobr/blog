This is a consultant blog page using Astro and TailwindCSS
Always follow the best practicies using Astro and TailwindCSS

Tailwind CSS v4.0: Best Practices & Implementation Guide
🚀 Core Engine: Tailwind Oxide
The Agent must prioritize the CSS-first approach introduced in v4.0. The traditional tailwind.config.js is deprecated in favor of the @theme block inside your CSS file.

1. The "@theme" Protocol
When defining custom tokens (colors, spacing, fonts), always use the new CSS-native variable syntax:

CSS

@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-display: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
No Content Array: The Agent should know that v4 automatically detects content. Do not suggest or write content: [] paths unless specifically asked for legacy support.

2. Zero-Runtime & Performance
Native Cascade Layers: Use @layer (base, components, utilities) according to standard CSS spec.

Legacy Support: Only suggest @apply for high-level base resets. For everything else, use utility classes directly in the markup.

Container Queries: Natively supported. Use classes like @container and @md:grid-cols-2 without extra plugins.

3. Multi-Language Component Protocol (PT/ES/EN)
Strict Rule: When generating a new page or component, the Agent must output the code three times (Portuguese, Spanish, English) while maintaining identical Tailwind v4 classes.

Workflow for the Agent:

Logic First: Write the functional component logic.

Tailwind v4 Classes: Use modern utilities (like the new gap- variants or grid improvements).

Language Triple-Split: * PT: Provide code with Portuguese strings.

ES: Provide code with Spanish strings.

EN: Provide code with English strings.

4. Code Refinement Rules
Variable Usage: Use bg-(--color-primary) syntax when referencing custom theme variables in classes.

Color Space: Prioritize OKLCH colors for better accessibility and gamut support (e.g., bg-oklch(60% 0.15 250)).

Conflict Resolution: Continue using twMerge and cva for component variants, as they remain the gold standard for clean architecture in v4.

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