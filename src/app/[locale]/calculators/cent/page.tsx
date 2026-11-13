import React from 'react';
import type { Metadata } from 'next';
import { CentLabCalculator } from '@/components/calculators/CentLabCalculator';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/calculators/cent',
    title:
      locale === 'id'
        ? 'JGS Cent Lab, Kalkulator Akun Cent (USC), Spesifikasi Broker & Margin'
        : 'JGS Cent Lab, Cent Account (USC), Broker Specification & Margin Calculator',
    description:
      locale === 'id'
        ? 'Konversi USD ke USC dan hitung ukuran lot secara akurat berdasarkan spesifikasi simbol broker Anda.'
        : 'Convert USD to USC and calculate exact lot volume using your broker’s symbol specifications.',
  });
}

export default function CentCalculatorPage() {
  return <CentLabCalculator />;
}
