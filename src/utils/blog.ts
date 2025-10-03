import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export async function getAllPosts(locale: Locale = 'pt'): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  try {
    const blogDir = await import.meta.glob('/src/content/blog/**/index.*.mdx', { eager: true });
    
    for (const path in blogDir) {
      const post = blogDir[path] as any;
      const frontmatter = post.frontmatter;
      
      if (frontmatter.draft) continue;
      if (frontmatter.locale !== locale) continue;
      
      const slug = extractSlugFromPath(path);
      
      // Get the raw content for reading time calculation
      const rawContent = post.default ? post.default.toString() : '';
      
      posts.push({
        id: slug,
        title: frontmatter.title,
        description: frontmatter.description,
        content: rawContent,
        date: new Date(frontmatter.date),
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        cover: frontmatter.cover || '/images/blog/default.jpg',
        canonical: frontmatter.canonical,
        draft: frontmatter.draft || false,
        locale: frontmatter.locale,
        readingTime: calculateReadingTime(rawContent),
        slug
      });
    }
    
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, locale: Locale = 'pt'): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts(locale);
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function getPostsByCategory(category: string, locale: Locale = 'pt'): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export async function getPostsByTag(tag: string, locale: Locale = 'pt'): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export async function getRecentPosts(count: number = 5, locale: Locale = 'pt'): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, count);
}

export async function getAllCategories(locale: Locale = 'pt'): Promise<string[]> {
  const posts = await getAllPosts(locale);
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).sort();
}

export async function getAllTags(locale: Locale = 'pt'): Promise<string[]> {
  const posts = await getAllPosts(locale);
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags).sort();
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], count: number = 3): BlogPost[] {
  const related = allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, count);
  
  return related;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function extractSlugFromPath(path: string): string {
  const match = path.match(/\/blog\/([^\/]+)\//);
  return match ? match[1] : '';
}

export function generateTableOfContents(content: string): Array<{id: string, text: string, level: number}> {
  const headings = content.match(/^(#{2,3})\s+(.+)$/gm);
  if (!headings) return [];
  
  return headings.map(heading => {
    const match = heading.match(/^(#{2,3})\s+(.+)$/);
    if (!match) return null;
    
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    return { id, text, level };
  }).filter(Boolean) as Array<{id: string, text: string, level: number}>;
}
