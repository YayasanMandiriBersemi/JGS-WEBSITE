import React from 'react';
import type { Metadata } from 'next';
import { RiskManagementCalculator } from '@/components/calculators/RiskManagementCalculator';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/calculators/drawdown',
    title:
      locale === 'id'
        ? 'Simulator Drawdown & Rasio Risk-to-Reward, JGS'
        : 'Drawdown Simulator & Asymmetric Risk-to-Reward, JGS',
    description:
      locale === 'id'
        ? 'Simulasikan kurva pemulihan drawdown non-linear, kekalahan beruntun, dan batas penghentian kerugian harian.'
        : 'Simulate nonlinear drawdown recovery curves, losing streaks, and daily loss circuit breakers.',
  });
}

export default function DrawdownCalculatorPage() {
  return <RiskManagementCalculator />;
}
