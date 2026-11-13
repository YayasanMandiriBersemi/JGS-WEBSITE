import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { LiveIntelligenceHub } from '@/components/research/LiveIntelligenceHub';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/signals',
    title:
      locale === 'id'
        ? 'Live Signal Scanner 12 Pair & Konfirmasi 1.000 USC | THE JEY GANG STRATEGIST'
        : 'Live 12-Pair Setup Scanner & 1,000 USC Cent Sizing | THE JEY GANG STRATEGIST',
    description:
      locale === 'id'
        ? 'Pemindai sinyal real-time 12 aset (XAUUSDc, Forex, Nasdaq, Kripto) tersinkron harga spot per 10 detik lengkap dengan 4 alasan konfirmasi entry dan ukuran lot Cent $10.'
        : 'Real-time 12-asset setup scanner synced every 10 seconds with 4 confirmation steps and $10 (1,000 USC) Cent risk math.',
  });
}

export default function SignalsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LiveIntelligenceHub initialTab="signals" />
    </Suspense>
  );
}
