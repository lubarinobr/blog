import type { BlogPost } from '@/types';

export interface InternalLink {
  text: string;
  url: string;
  description?: string;
  category?: string;
}

export const internalLinks: Record<string, InternalLink[]> = {
  'estratégia digital': [
    {
      text: 'Transformação Digital',
      url: '/blog/transformacao-digital',
      description: 'Guia completo sobre transformação digital empresarial',
      category: 'Estratégia Digital'
    },
    {
      text: 'Gestão de Projetos Ágil',
      url: '/blog/gestao-projetos-agil',
      description: 'Metodologias ágeis para gestão de projetos',
      category: 'Gestão'
    }
  ],
  'transformação digital': [
    {
      text: 'Estratégia Digital para Empresas',
      url: '/blog/estrategia-digital-empresas',
      description: 'Como implementar estratégia digital eficaz',
      category: 'Estratégia Digital'
    },
    {
      text: 'Gestão de Projetos Ágil',
      url: '/blog/gestao-projetos-agil',
      description: 'Metodologias ágeis para transformação',
      category: 'Gestão'
    }
  ],
  'consultoria': [
    {
      text: 'Nossos Serviços',
      url: '/#services',
      description: 'Conheça nossos serviços de consultoria SapiensIT',
      category: 'Serviços'
    },
    {
      text: 'Entre em Contato',
      url: '/contact',
      description: 'Fale conosco para uma consultoria personalizada SapiensIT',
      category: 'Contato'
    }
  ],
  'treinamentos': [
    {
      text: 'Treinamentos Corporativos',
      url: '/#trainings',
      description: 'SapiensIT - Capacitação especializada para equipes',
      category: 'Treinamentos'
    },
    {
      text: 'Metodologias Ágeis',
      url: '/blog/gestao-projetos-agil',
      description: 'Aprenda sobre gestão ágil de projetos',
      category: 'Gestão'
    }
  ],
  'automação': [
    {
      text: 'Processos Automatizados',
      url: '/blog/estrategia-digital-empresas#automação',
      description: 'SapiensIT - Como automatizar processos empresariais',
      category: 'Estratégia Digital'
    }
  ],
  'inovação': [
    {
      text: 'Cultura de Inovação',
      url: '/blog/transformacao-digital#inovação',
      description: 'SapiensIT - Como criar uma cultura de inovação',
      category: 'Transformação Digital'
    }
  ]
};

export function findInternalLinks(text: string): InternalLink[] {
  const foundLinks: InternalLink[] = [];
  const lowerText = text.toLowerCase();
  
  Object.entries(internalLinks).forEach(([keyword, links]) => {
    if (lowerText.includes(keyword)) {
      foundLinks.push(...links);
    }
  });
  
  return foundLinks;
}

export function generateRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== currentPost.slug && 
      post.locale === currentPost.locale &&
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => {
      const aScore = calculateRelevanceScore(currentPost, a);
      const bScore = calculateRelevanceScore(currentPost, b);
      return bScore - aScore;
    })
    .slice(0, limit);
  
  return relatedPosts;
}

function calculateRelevanceScore(currentPost: BlogPost, candidatePost: BlogPost): number {
  let score = 0;
  
  // Same category gets high score
  if (currentPost.category === candidatePost.category) {
    score += 10;
  }
  
  // Common tags get points
  const commonTags = currentPost.tags.filter(tag => candidatePost.tags.includes(tag));
  score += commonTags.length * 3;
  
  // Recent posts get slight boost
  const daysDiff = (new Date().getTime() - candidatePost.date.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff < 30) {
    score += 2;
  }
  
  return score;
}

export function addInternalLinksToContent(content: string, locale: string = 'pt'): string {
  let enhancedContent = content;
  
  Object.entries(internalLinks).forEach(([keyword, links]) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = enhancedContent.match(regex);
    
    if (matches && matches.length > 0) {
      // Only add link to first occurrence to avoid over-linking
      const firstMatch = matches[0];
      const link = links[0]; // Use first link for the keyword
      const linkText = `<a href="${link.url}" title="${link.description}" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">${firstMatch}</a>`;
      
      enhancedContent = enhancedContent.replace(
        new RegExp(`\\b${firstMatch}\\b`),
        linkText
      );
    }
  });
  
  return enhancedContent;
}

export function generateBreadcrumbLinks(path: string, locale: string = 'pt'): Array<{name: string, url: string}> {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: Array<{name: string, url: string}> = [];
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    let name = segment;
    
    // Customize names for better UX
    switch (segment) {
      case 'blog':
        name = 'Blog';
        break;
      case 'contact':
        name = 'Contato';
        break;
      case 'en':
        name = 'English';
        break;
      case 'es':
        name = 'Español';
        break;
      default:
        // Capitalize first letter
        name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }
    
    breadcrumbs.push({
      name,
      url: currentPath
    });
  });
  
  return breadcrumbs;
}
