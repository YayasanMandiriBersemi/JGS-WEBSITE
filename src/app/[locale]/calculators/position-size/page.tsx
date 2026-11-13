import React from 'react';
import type { Metadata } from 'next';
import { PositionSizeGatekeeperView } from '@/components/calculators/PositionSizeGatekeeperView';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/calculators/position-size',
    title:
      locale === 'id'
        ? 'Kalkulator Position Sizing & Pre-Entry ICT Gatekeeper, JGS'
        : 'Position Sizing Calculator & Pre-Entry ICT Confirmation Gatekeeper, JGS',
    description:
      locale === 'id'
        ? 'Hitung ukuran lot presisi berbasis spesifikasi simbol MT5 sekaligus verifikasi 4 checklist konfirmasi ICT/SMC (Killzone, Sweep BSL/SSL, MSS, FVG).'
        : 'Calculate exact lot size from MT5 symbol specs while passing the 4-step Pre-Entry ICT/SMC Confirmation Gatekeeper (Killzone, Liquidity Sweep, MSS, FVG).',
  });
}

export default function PositionSizeCalculatorPage() {
  return <PositionSizeGatekeeperView />;
}
