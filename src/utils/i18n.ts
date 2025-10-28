import type { Locale } from '@/i18n/config';

// Cache para traduções
const translationCache = new Map<string, any>();

export async function getTranslations(locale: Locale, namespace: string) {
  const cacheKey = `${locale}-${namespace}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }
  
  try {
    // Importação dinâmica dos arquivos JSON
    const translations = await import(`../i18n/locales/${locale}/${namespace}.json`);
    const result = translations.default;
    translationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn(`Translation not found for ${locale}/${namespace}`);
    return {};
  }
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'en' || firstSegment === 'es') {
    return firstSegment;
  }
  
  return 'pt';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove any existing locale prefix from the path
  const cleanPath = path.replace(/^\/(en|es)/, '') || '/';
  
  if (locale === 'pt') {
    return cleanPath;
  }
  
  return `/${locale}${cleanPath}`;
}

export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const localeMap = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES'
  };
  
  return new Intl.DateTimeFormat(localeMap[locale], options).format(date);
}

export function getAlternateLocales(currentLocale: Locale, currentPath: string) {
  const locales = ['pt', 'en', 'es'] as const;
  
  return locales.map(locale => ({
    locale,
    path: getLocalizedPath(currentPath, locale)
  }));
}
