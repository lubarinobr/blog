import type { SEOProps } from '@/types';
import type { Locale } from '@/i18n/config';

export function generateSEOTags(props: SEOProps, locale: Locale = 'pt', path: string = '') {
  const siteUrl = 'https://consultoria-exemplo.com';
  const fullUrl = `${siteUrl}${path}`;
  const imageUrl = props.image ? `${siteUrl}${props.image}` : `${siteUrl}/images/og-default.jpg`;
  
  const localeMap = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES'
  };
  
  return {
    title: props.title,
    description: props.description,
    canonical: props.canonical || fullUrl,
    openGraph: {
      title: props.title,
      description: props.description,
      url: fullUrl,
      siteName: 'Consultoria Empresarial',
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
      title: props.title,
      description: props.description,
      image: imageUrl,
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
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Consultoria Empresarial',
    url: 'https://consultoria-exemplo.com',
    logo: 'https://consultoria-exemplo.com/images/logo.png',
    description: 'Consultoria especializada em transformação digital e treinamentos corporativos',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua das Empresas, 123',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      postalCode: '01234-567',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'customer service',
      email: 'contato@consultoria-exemplo.com',
    },
    sameAs: [
      'https://linkedin.com/company/consultoria-exemplo',
      'https://twitter.com/consultoria_exemplo',
    ],
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
      name: 'Consultoria Empresarial',
    },
  };
}

export function generateArticleSchema(post: any, locale: Locale = 'pt') {
  const siteUrl = 'https://consultoria-exemplo.com';
  const localePath = locale === 'pt' ? '' : `/${locale}`;
  
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
      name: 'Consultoria Empresarial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Consultoria Empresarial',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${localePath}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    wordCount: post.content.split(' ').length,
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
      name: 'Consultoria Empresarial',
    },
    serviceType: 'Business Consulting',
    areaServed: 'Brazil',
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Consultoria Empresarial',
    url: 'https://consultoria-exemplo.com',
    description: 'Consultoria especializada em transformação digital e treinamentos corporativos',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://consultoria-exemplo.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
