import React from 'react';
import type { Metadata } from 'next';
import { AccountView } from '@/components/account/StrategistWorkspaceViews';
import { buildLocalizedMetadata, isValidLocale, DEFAULT_LOCALE } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  return buildLocalizedMetadata({
    locale,
    pathname: '/account',
    title:
      locale === 'id'
        ? 'Ruang Kerja Lokal & Progres Belajar, JGS'
        : 'Local Workspace & Learning Progress, JGS',
    description:
      locale === 'id'
        ? 'Pantau progres modul JGS Academy, preset kalkulator, dan catatan Jurnal Trader yang tersimpan di perangkat Anda.'
        : 'View your JGS Academy progress, saved calculator presets, and Trader Journal records stored locally.',
  });
}

export default function AccountPage() {
  return <AccountView />;
}
