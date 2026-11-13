import React from 'react';
import type { Metadata } from 'next';
import { DictionaryExplorer } from '@/components/dictionary/DictionaryExplorer';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/dictionary',
    title:
      locale === 'id'
        ? 'Kamus Trading Jey, Penjelasan Istilah Trading & Kuantitatif Sederhana'
        : "Jey's Trading Dictionary, Plain-Language Trading & Quant Terminology",
    description:
      locale === 'id'
        ? 'Cari arti istilah trading seperti Akun Cent (USC), Lot, Pip, Spread, Drawdown, dan Stop-Loss dengan ilustrasi visual.'
        : 'Search trading terms like Cent Account (USC), Lot Size, Pip, Spread, Drawdown, and Stop-Loss with visual illustrations.',
  });
}

export default function DictionaryPage() {
  return <DictionaryExplorer />;
}
