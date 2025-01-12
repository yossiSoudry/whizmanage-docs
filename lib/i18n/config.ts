// lib/i18n/config.ts
export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'he'] as const,
  } as const
  
  export type Locale = typeof i18n['locales'][number]