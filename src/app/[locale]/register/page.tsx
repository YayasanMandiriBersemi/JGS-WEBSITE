import React from 'react';
import type { Metadata } from 'next';
import { RegisterView } from '@/components/account/StrategistWorkspaceViews';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/register',
    title:
      locale === 'id'
        ? 'Klaim Gang Member ID Gratis, Member of The Jey Gang'
        : 'Claim Free Gang Member ID, Member of The Jey Gang',
    description:
      locale === 'id'
        ? 'Daftar gratis dalam 10 detik untuk klaim 10-Digit Gang Member ID dan membuka Riset Market, Strategi ICT/EA, serta Audit Performa.'
        : 'Register free in 10 seconds to claim your 10-Digit Gang Member ID and unlock Market Research, ICT/EA Strategy, and Performance Audits.',
  });
}

export default function RegisterPage() {
  return <RegisterView />;
}
