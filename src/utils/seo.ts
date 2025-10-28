import type { SEOProps } from '@/types';
import type { Locale } from '@/i18n/config';

export function generateSEOTags(props: SEOProps, locale: Locale = 'pt', path: string = '') {
  const siteUrl = 'https://sapiensit.com';
  const fullUrl = `${siteUrl}${path}`;
  const imageUrl = props.image ? `${siteUrl}${props.image}` : `${siteUrl}/images/og-default.jpg`;
  
  const localeMap = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES'
  };

  // SEO-optimized title with brand and keywords
  const seoTitle = props.title.includes('SapiensIT') 
    ? props.title 
    : `${props.title} | SapiensIT - Transformação Digital`;

  // Enhanced description with call-to-action
  const seoDescription = props.description.length > 150 
    ? props.description.substring(0, 147) + '...'
    : props.description;
  
  return {
    title: seoTitle,
    description: seoDescription,
    canonical: props.canonical || fullUrl,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: fullUrl,
      siteName: 'SapiensIT - Transformação Digital',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: props.title,
        },
      ],
      locale: localeMap[locale],
      type: props.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      image: imageUrl,
      creator: '@consultoria_empresarial',
      site: '@consultoria_empresarial',
    },
    robots: {
      index: !props.noindex,
      follow: true,
    },
    other: {
      'article:published_time': props.publishedTime,
      'article:modified_time': props.modifiedTime,
      'article:author': props.author,
      'article:tag': props.tags?.join(', '),
      'article:section': props.tags?.[0] || 'Consultoria',
      'keywords': props.tags?.join(', ') + ', sapiensit, transformação digital, treinamentos corporativos, consultoria',
      'author': 'SapiensIT',
      'revisit-after': '7 days',
      'rating': 'general',
      'distribution': 'global',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SapiensIT',
    alternateName: 'SapiensIT Consultoria',
    url: 'https://sapiensit.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://consultoria-exemplo.com/images/logo.png',
      width: 200,
      height: 200
    },
    description: 'SapiensIT - Consultoria especializada em transformação digital, estratégia empresarial e treinamentos corporativos para impulsionar o crescimento das empresas',
    foundingDate: '2020-01-01',
    numberOfEmployees: '10-50',
    industry: 'Business Consulting',
    serviceArea: {
      '@type': 'Country',
      name: 'Brazil'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua das Empresas, 123',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01234-567',
      addressCountry: 'BR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9999',
        contactType: 'customer service',
        email: 'contato@consultoria-exemplo.com',
        availableLanguage: ['Portuguese', 'English', 'Spanish'],
        areaServed: 'BR'
      },
      {
        '@type': 'ContactPoint',
        telephone: '+55-11-99999-9998',
        contactType: 'sales',
        email: 'vendas@consultoria-exemplo.com',
        availableLanguage: ['Portuguese', 'English', 'Spanish'],
        areaServed: 'BR'
      }
    ],
    sameAs: [
      'https://linkedin.com/company/sapiensit',
      'https://twitter.com/sapiensit',
      'https://facebook.com/sapiensit',
      'https://instagram.com/sapiensit'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Consultoria',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Transformação Digital',
            description: 'SapiensIT - Consultoria em transformação digital para empresas'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Treinamentos Corporativos',
            description: 'SapiensIT - Treinamentos especializados para equipes corporativas'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

export function generatePersonSchema(name: string, role: string, bio: string, photo: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: bio,
    image: photo,
    worksFor: {
      '@type': 'Organization',
      name: 'SapiensIT',
    },
  };
}

export function generateArticleSchema(post: any, locale: Locale = 'pt') {
  const siteUrl = 'https://sapiensit.com';
  const localePath = locale === 'pt' ? '' : `/${locale}`;
  const wordCount = post.content ? post.content.split(' ').length : 0;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.cover ? `${siteUrl}${post.cover}` : `${siteUrl}/images/og-default.jpg`,
    datePublished: post.date.toISOString(),
    dateModified: post.date.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'SapiensIT',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 200,
        height: 200
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'SapiensIT',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 200,
        height: 200
      },
      sameAs: [
        'https://linkedin.com/company/sapiensit',
        'https://twitter.com/sapiensit'
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${localePath}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES',
    isAccessibleForFree: true,
    genre: 'Business',
    about: {
      '@type': 'Thing',
      name: post.category,
      description: `Artigos sobre ${post.category.toLowerCase()}`
    },
    mentions: post.tags?.map((tag: string) => ({
      '@type': 'Thing',
      name: tag
    })) || [],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'h3']
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'SapiensIT',
    },
    serviceType: 'Business Consulting',
    areaServed: 'Brazil',
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SapiensIT',
    url: 'https://sapiensit.com',
    description: 'SapiensIT - Consultoria especializada em transformação digital e treinamentos corporativos',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sapiensit.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é transformação digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Transformação digital é o processo de integração de tecnologia digital em todas as áreas de uma empresa, mudando fundamentalmente como ela opera e entrega valor aos clientes.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo leva para implementar uma estratégia digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O tempo de implementação varia de 3 a 12 meses, dependendo do tamanho da empresa e da complexidade dos processos. Começamos com um diagnóstico detalhado para definir o cronograma ideal.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quais são os benefícios da consultoria em transformação digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os principais benefícios incluem: aumento da eficiência operacional, melhoria na experiência do cliente, redução de custos, tomada de decisão baseada em dados e maior competitividade no mercado.'
        }
      },
      {
        '@type': 'Question',
        name: 'Oferecem treinamentos para equipes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, oferecemos treinamentos corporativos personalizados em transformação digital, ferramentas de gestão, metodologias ágeis e capacitação técnica para equipes de todos os níveis.'
        }
      }
    ]
  };
}

export function generateBreadcrumbListSchema(items: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
