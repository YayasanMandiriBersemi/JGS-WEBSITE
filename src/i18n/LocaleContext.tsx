'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Locale,
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  isValidLocale,
  localizePath
} from './config';

interface LocaleContextValue {
  locale: Locale;
  isId: boolean;
  l: (path: string) => string;
  t: <T>(idValue: T, enValue: T) => T;
  switchLocale: (nextLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  const activeLocale: Locale = useMemo(() => {
    const firstSegment = pathname.split('/')[1];
    if (isValidLocale(firstSegment)) {
      return firstSegment;
    }
    return initialLocale ?? DEFAULT_LOCALE;
  }, [pathname, initialLocale]);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale: activeLocale,
      isId: activeLocale === 'id',
      l: (path: string) => localizePath(activeLocale, path),
      t: <T,>(idValue: T, enValue: T): T => (activeLocale === 'id' ? idValue : enValue),
      switchLocale: (nextLocale: Locale) => {
        if (typeof document !== 'undefined') {
          document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
          document.documentElement.lang = nextLocale;
        }
        const target = localizePath(nextLocale, pathname);
        router.push(target);
      }
    };
  }, [activeLocale, pathname, router]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  const pathname = usePathname() || '/';
  const router = useRouter();

  if (ctx) return ctx;

  const firstSegment = pathname.split('/')[1];
  const fallbackLocale: Locale = isValidLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;

  return {
    locale: fallbackLocale,
    isId: fallbackLocale === 'id',
    l: (path: string) => localizePath(fallbackLocale, path),
    t: <T,>(idValue: T, enValue: T): T => (fallbackLocale === 'id' ? idValue : enValue),
    switchLocale: (nextLocale: Locale) => {
      if (typeof document !== 'undefined') {
        document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = nextLocale;
      }
      router.push(localizePath(nextLocale, pathname));
    }
  };
}
