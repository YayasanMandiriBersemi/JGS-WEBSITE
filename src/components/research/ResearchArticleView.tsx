'use client';

import React from 'react';
import Link from 'next/link';
import { ResearchArticle } from '@/lib/data/research-articles';
import { useLocale } from '@/i18n/LocaleContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  FileText,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export function ResearchArticleView({ article }: { article: ResearchArticle }) {
  const { isId, l } = useLocale();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={l('/research')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BEB6CE] hover:text-[#D4AF37]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>
            {isId ? 'Kembali ke JGS Intelligence' : 'Back to JGS Intelligence Research'}
          </span>
        </Link>
        <span className="px-3 py-1 rounded-md bg-purple-royal/35 border border-purple-electric/30 text-xs font-semibold text-purple-electric">
          {isId ? article.categoryLabel.id : article.categoryLabel.en}
        </span>
      </div>

      {/* Article Header & Metadata */}
      <article className="jgs-panel p-6 sm:p-8 space-y-6">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#BEB6CE]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              {isId ? 'Tanggal Publikasi:' : 'Published:'} {article.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {isId ? 'Terakhir Ditinjau:' : 'Last Reviewed:'} {article.lastReviewedAt}
            </span>
            <span className="text-[#F3E5AB] font-medium">
              {isId ? article.authorDesk.id : article.authorDesk.en}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F7F4EE]">
            {isId ? article.title.id : article.title.en}
          </h1>
          <p className="text-base text-[#BEB6CE] leading-relaxed">
            {isId ? article.summary.id : article.summary.en}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="rounded-xl bg-[#08050E] border border-[#D4AF37]/30 p-5 space-y-3">
          <h2 className="text-sm font-bold text-[#D4AF37]">
            {isId ? 'Ringkasan Temuan Utama' : 'Executive Summary & Key Takeaways'}
          </h2>
          <ul className="space-y-2.5">
            {(isId ? article.keyTakeaways.id : article.keyTakeaways.en).map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#F7F4EE]/90">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {article.sections.map((sec, idx) => (
            <section
              key={idx}
              className="rounded-xl bg-[#08050E]/60 border border-white/10 p-6 space-y-3"
            >
              <h2 className="font-display text-xl font-bold text-[#F3E5AB]">
                {isId ? sec.heading.id : sec.heading.en}
              </h2>
              <p className="text-sm sm:text-base text-[#F7F4EE]/90 leading-relaxed">
                {isId ? sec.body.id : sec.body.en}
              </p>
              {sec.technicalNote && (
                <div className="mt-3 p-4 rounded-lg bg-[#120B1E] border border-purple-electric/30 text-xs sm:text-sm text-purple-electric">
                  <strong className="block mb-1 text-[#F3E5AB]">
                    {isId ? 'Catatan Teknis:' : 'Technical Specification Note:'}
                  </strong>
                  {isId ? sec.technicalNote.id : sec.technicalNote.en}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Primary Citations & Sources */}
        <div className="rounded-xl bg-[#08050E] border border-white/15 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
            <FileText className="w-4 h-4" />
            <span>
              {isId
                ? 'REFERENSI & SUMBER PRIMER YANG DIVERIFIKASI'
                : 'VERIFIED PRIMARY SOURCES & INSTITUTIONAL CITATIONS'}
            </span>
          </div>
          <div className="space-y-2.5">
            {article.sources.map((src, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg bg-white/[0.03] border border-white/10"
              >
                <div>
                  <div className="text-xs font-bold text-[#F3E5AB]">
                    {src.organization} ({src.publicationYear})
                  </div>
                  <div className="text-xs text-[#BEB6CE]">{src.title}</div>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:underline shrink-0"
                >
                  <span>{isId ? 'Sumber Resmi' : 'Official Source'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Related Calculator Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-[#170E28] to-[#0B0714] border border-[#D4AF37]/35">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-[#D4AF37] shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-[#F7F4EE]">
                {isId
                  ? 'Terapkan Temuan Riset Ini Secara Praktis'
                  : 'Apply This Research in Our Free Interactive Tools'}
              </h3>
              <p className="text-xs text-[#BEB6CE]">
                {isId
                  ? 'Uji perhitungan spesifikasi simbol dan manajemen risiko menggunakan kalkulator gratis JGS.'
                  : 'Test symbol specifications and risk management directly inside our free calculators.'}
              </p>
            </div>
          </div>
          <Link
            href={l(article.relatedCalculatorHref)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#08050E] text-xs font-semibold hover:bg-[#F3E5AB] shrink-0"
          >
            <span>{isId ? 'Buka Tools Terkait' : 'Open Related Tool'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
