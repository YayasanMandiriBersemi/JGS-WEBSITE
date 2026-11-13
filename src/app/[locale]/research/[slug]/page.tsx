import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RESEARCH_ARTICLES } from '@/lib/data/research-articles';
import { ResearchArticleView } from '@/components/research/ResearchArticleView';
import { JgsVaultGatekeeper } from '@/components/account/JgsVaultGatekeeper';
import {
  buildLocalizedMetadata,
  isValidLocale,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from '@/i18n/config';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    RESEARCH_ARTICLES.map((article) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE;
  const article = RESEARCH_ARTICLES.find((a) => a.slug === resolvedParams.slug);
  if (!article) {
    return buildLocalizedMetadata({
      locale,
      pathname: `/research/${resolvedParams.slug}`,
      title: 'JGS Intelligence',
      description: 'JGS Intelligence Market Research',
    });
  }
  return buildLocalizedMetadata({
    locale,
    pathname: `/research/${resolvedParams.slug}`,
    title: `${locale === 'id' ? article.title.id : article.title.en}, JGS Intelligence`,
    description: locale === 'id' ? article.summary.id : article.summary.en,
  });
}

export default async function ResearchArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const locale = (isValidLocale(resolvedParams.locale) ? resolvedParams.locale : DEFAULT_LOCALE) as 'id' | 'en';
  const article = RESEARCH_ARTICLES.find((a) => a.slug === resolvedParams.slug);
  if (!article) {
    notFound();
  }
  return (
    <JgsVaultGatekeeper
      locale={locale}
      pillarTitleId={`JGS INTELLIGENCE // ${article.title.id}`}
      pillarTitleEn={`JGS INTELLIGENCE // ${article.title.en}`}
      pillarSummaryId={article.summary.id}
      pillarSummaryEn={article.summary.en}
      previewHighlightsId={[
        'Artikel Riset Lengkap & Sitasi Primer',
        'Studi Kasus Data Akun Cent 1,000 USC',
      ]}
      previewHighlightsEn={[
        'Full Research Brief & Primary Citations',
        '1,000 USC Cent Account Data Case Study',
      ]}
    >
      <ResearchArticleView article={article} />
    </JgsVaultGatekeeper>
  );
}
