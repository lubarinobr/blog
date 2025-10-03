export const i18n = {
  defaultLocale: 'pt',
  locales: ['pt', 'en', 'es'],
  routing: {
    prefixDefaultLocale: false
  }
};

export const locales = {
  pt: {
    label: 'Português',
    dir: 'ltr',
    lang: 'pt-BR'
  },
  en: {
    label: 'English',
    dir: 'ltr',
    lang: 'en-US'
  },
  es: {
    label: 'Español',
    dir: 'ltr',
    lang: 'es-ES'
  }
} as const;

export type Locale = keyof typeof locales;
