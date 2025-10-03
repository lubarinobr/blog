/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly SITE_NAME: string;
  readonly CONTACT_EMAIL: string;
  readonly PHONE: string;
  readonly GOOGLE_ANALYTICS_ID?: string;
  readonly PLAUSIBLE_DOMAIN?: string;
  readonly CONTACT_WEBHOOK_URL?: string;
  readonly LINKEDIN_URL?: string;
  readonly TWITTER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

