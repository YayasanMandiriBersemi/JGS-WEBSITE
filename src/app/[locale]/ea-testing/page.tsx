import React from 'react';
import type { Metadata } from 'next';
import { EaTestingToolkit } from '@/components/quant/EaTestingToolkit';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/ea-testing',
    title:
      locale === 'id'
        ? 'EA Testing Toolkit, Panduan & Simulator Audit Backtest MT5'
        : 'EA Testing Toolkit, MT5 Backtest Quality & Friction Stress-Tester',
    description:
      locale === 'id'
        ? 'Audit kualitas backtest Strategy Tester MT5 dan uji ketahanan ekspektasi sistem terhadap pelebaran spread dan slippage.'
        : 'Audit MT5 Strategy Tester backtest integrity and stress-test strategy expectancy against spread widening and slippage.',
  });
}

export default async function EaTestingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';

  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId="EA TESTING TOOLKIT // AUDIT BACKTEST & SIMULASI MARTINGALE"
      pillarTitleEn="EA TESTING TOOLKIT // BACKTEST INTEGRITY & STRESS-TESTER"
      pillarSummaryId="Daftar periksa audit Strategy Tester MT5 (Real Ticks vs 1-Min OHLC), uji stres friksi spread/slippage, dan perbandingan fatalnya robot Martingale pada akun 1,000 USC."
      pillarSummaryEn="MT5 Strategy Tester audit checklist (Real Ticks vs 1-Min OHLC), spread/slippage friction stress-tester, and Martingale blow-up anatomy on 1,000 USC."
      previewHighlightsId={[
        'Skoring Integritas Backtest MT5 (100 Poin)',
        'Simulator Friksi Spread & Slippage Realistis',
        'Simulasi Fatalnya Grid Martingale di Akun 1,000 USC',
        'Audit Out-of-Sample & Curve-Fitting',
      ]}
      previewHighlightsEn={[
        'MT5 Backtest Integrity Scorer (100 Points)',
        'Spread Widening & Slippage Friction Simulator',
        'Martingale Grid Destruction Anatomy (1,000 USC)',
        'Out-of-Sample & Curve-Fitting Audit',
      ]}
    >
      <EaTestingToolkit />
    </JgsVaultGatekeeper>
  );
}
