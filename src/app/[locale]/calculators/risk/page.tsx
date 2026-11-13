import React from 'react';
import type { Metadata } from 'next';
import { RiskManagementCalculator } from '@/components/calculators/RiskManagementCalculator';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/calculators/risk',
    title:
      locale === 'id'
        ? 'Kalkulator Manajemen Risiko & Pemulihan Drawdown, JGS'
        : 'Risk Management & Drawdown Recovery Calculator, JGS',
    description:
      locale === 'id'
        ? 'Hitung rasio Risk-to-Reward, win rate impas, dan batas kerugian harian.'
        : 'Calculate Risk-to-Reward ratios, breakeven win rates, and daily loss limits.',
  });
}

export default function RiskCalculatorPage() {
  return <RiskManagementCalculator />;
}
