import React from 'react';
import type { Metadata } from 'next';
import { CentLabCalculator } from '@/components/calculators/CentLabCalculator';
import { buildLocalizedMetadata, DEFAULT_LOCALE, isValidLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return buildLocalizedMetadata({
    locale,
    path: '/tools/cent-lab',
    titleId: 'JGS Cent Lab, Mode Pemula & Kalkulator Spesifikasi Simbol MT5',
    titleEn: 'JGS Cent Lab, Beginner Mode & MT5 Symbol Specification Calculator',
    descriptionId:
      'Konversi USD ke USC (Cent), ukur ketahanan akun dengan Account Health Bar, dan hitung ukuran lot berdasarkan spesifikasi kontrak broker MT5 secara gratis.',
    descriptionEn:
      'Convert USD to USC (Cent), check your Account Health Bar, and compute exact lot sizes using MT5 broker contract specifications for free.',
  });
}

export default function ToolsCentLabPage() {
  return <CentLabCalculator />;
}
