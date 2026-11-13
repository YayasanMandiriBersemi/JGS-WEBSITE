import React from 'react';
import { notFound } from 'next/navigation';
import { isValidLocale, SUPPORTED_LOCALES } from '@/i18n/config';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { LiveMarketProvider } from '@/lib/context/LiveMarketContext';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  if (!isValidLocale(resolvedParams.locale)) {
    notFound();
  }

  return (
    <LocaleProvider initialLocale={resolvedParams.locale}>
      <LiveMarketProvider>{children}</LiveMarketProvider>
    </LocaleProvider>
  );
}
