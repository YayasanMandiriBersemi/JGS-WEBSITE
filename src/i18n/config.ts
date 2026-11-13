import type { Metadata } from 'next';

export type Locale = 'id' | 'en';

export const SUPPORTED_LOCALES: readonly Locale[] = ['id', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'id';
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const SITE_BASE_URL = 'https://jgs.trading';

export function isValidLocale(value: string | undefined | null): value is Locale {
  return value === 'id' || value === 'en';
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isValidLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/^\/(id|en)(?=\/|$)/, '');
  return cleaned === '' ? '/' : cleaned;
}

export function localizePath(locale: Locale, targetPath: string): string {
  if (!targetPath) return `/${locale}`;
  if (targetPath.startsWith('http://') || targetPath.startsWith('https://') || targetPath.startsWith('#')) {
    return targetPath;
  }
  const stripped = stripLocalePrefix(targetPath.startsWith('/') ? targetPath : `/${targetPath}`);
  return stripped === '/' ? `/${locale}` : `/${locale}${stripped}`;
}

export function buildLocalizedMetadata(options: {
  locale: Locale;
  pathname?: string;
  path?: string;
  title?: string;
  description?: string;
  titleId?: string;
  titleEn?: string;
  descriptionId?: string;
  descriptionEn?: string;
}): Metadata {
  const {
    locale,
    pathname,
    path,
    title: directTitle,
    description: directDescription,
    titleId,
    titleEn,
    descriptionId,
    descriptionEn
  } = options;
  const rawPath = pathname ?? path ?? '/';
  const cleanPath = stripLocalePrefix(rawPath);
  const idUrl = cleanPath === '/' ? `${SITE_BASE_URL}/id` : `${SITE_BASE_URL}/id${cleanPath}`;
  const enUrl = cleanPath === '/' ? `${SITE_BASE_URL}/en` : `${SITE_BASE_URL}/en${cleanPath}`;
  const currentUrl = locale === 'id' ? idUrl : enUrl;

  const title = directTitle ?? (locale === 'id' ? titleId : titleEn) ?? 'THE JEY GANG STRATEGIST (JGS)';
  const description =
    directDescription ??
    (locale === 'id' ? descriptionId : descriptionEn) ??
    'Small Capital. Serious Strategy.';

  return {
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        id: idUrl,
        en: enUrl,
        'x-default': idUrl
      }
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'THE JEY GANG STRATEGIST (JGS)',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website'
    }
  };
}
