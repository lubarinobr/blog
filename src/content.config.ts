import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    cover: z.string().optional(),
    canonical: z.string().optional(),
    draft: z.boolean().optional().default(false),
    locale: z.enum(['pt', 'en', 'es']).default('pt'),
  }),
});

export const collections = {
  blog,
};
