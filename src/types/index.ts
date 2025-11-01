import type { Locale } from '@/i18n/config';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: Date;
  category: string;
  tags: string[];
  cover: string;
  canonical?: string;
  draft?: boolean;
  locale: Locale;
  readingTime: number;
  slug: string;
  author?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  price?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  photo?: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  honeypot?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
}
