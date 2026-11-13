'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { RESEARCH_ARTICLES, ResearchArticle } from '@/lib/data/research-articles';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Newspaper,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export function MarketResearchHub() {
  const { isId, l } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = useMemo(
    () => [
      { id: 'ALL', label: isId ? 'Semua Kajian' : 'All Research' },
      {
        id: 'LIQUIDITY_CYCLES',
        label: isId ? 'Siklus Likuiditas' : 'Liquidity Cycles',
      },
      {
        id: 'CONTRACT_SPECIFICATIONS',
        label: isId ? 'Spesifikasi Kontrak' : 'Contract Specifications',
      },
      {
        id: 'RISK_SYSTEMS',
        label: isId ? 'Sistem Risiko & HWM' : 'Risk Systems & HWM',
      },
    ],
    [isId]
  );

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RESEARCH_ARTICLES.filter((article) => {
      if (selectedCategory !== 'ALL' && article.category !== selectedCategory) return false;
      if (!q) return true;
      const titleText = (isId ? article.title.id : article.title.en).toLowerCase();
      const summaryText = (isId ? article.summary.id : article.summary.en).toLowerCase();
      const sourceMatch = article.sources.some(
        (s) =>
          s.organization.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)
      );
      return titleText.includes(q) || summaryText.includes(q) || sourceMatch;
    });
  }, [searchQuery, selectedCategory, isId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="jgs-panel p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
          <Newspaper className="w-4 h-4" />
          <span>
            {isId
              ? 'JGS INTELLIGENCE • RISET MARKET & STRUKTUR MIKRO TERBUKA'
              : 'JGS INTELLIGENCE • OPEN MARKET STRUCTURE & RISK RESEARCH'}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE]">
          {isId
            ? 'Riset Edukasi Berbasis Data, Tanggal Publikasi & Referensi Resmi'
            : 'Educational Market Research with Verified Dates & Primary Citations'}
        </h1>
        <p className="text-sm sm:text-base text-[#BEB6CE] max-w-3xl leading-relaxed">
          {isId
            ? 'Setiap artikel di JGS Intelligence mencantumkan tanggal publikasi, tanggal tinjauan terakhir, serta kutipan sumber primer (seperti Bank for International Settlements, LBMA, CME Group, dan dokumentasi teknis MQL5). Seluruh riset ini 100% gratis tanpa paywall.'
            : 'Every article in JGS Intelligence includes explicit publication dates, review timestamps, and primary institutional citations (such as the Bank for International Settlements, LBMA, CME Group, and MQL5 technical documentation). All research is 100% free with no paywalls.'}
        </p>

        {/* Search & Category Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3">
          <div className="lg:col-span-6 relative">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isId
                  ? 'Cari topik riset atau sumber (misal: BIS, Likuiditas, Kontrak, High-Water Mark)...'
                  : 'Search research topics or citations (e.g. BIS, Liquidity, Contract Size, High-Water Mark)...'
              }
              className="jgs-input pl-10"
              aria-label={isId ? 'Cari artikel riset' : 'Search research articles'}
            />
          </div>
          <div className="lg:col-span-6 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#08050E] font-bold'
                    : 'bg-[#08050E] border border-white/10 text-[#BEB6CE] hover:text-[#F7F4EE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {filteredArticles.map((article: ResearchArticle) => (
          <article
            key={article.slug}
            className="jgs-panel p-6 sm:p-8 space-y-6 transition-all hover:border-[#D4AF37]/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-purple-royal/35 border border-purple-electric/30 text-xs font-semibold text-purple-electric">
                  {isId ? article.categoryLabel.id : article.categoryLabel.en}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#BEB6CE]">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {isId ? 'Diterbitkan:' : 'Published:'} {article.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#BEB6CE]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {article.readingMinutes} {isId ? 'menit baca' : 'min read'}
                </span>
              </div>
              <span className="text-xs text-[#F3E5AB] font-medium">
                {isId ? article.authorDesk.id : article.authorDesk.en}
              </span>
            </div>

            <div>
              <Link href={l(`/research/${article.slug}`)} className="group">
                <h2 className="font-display text-2xl font-bold text-[#F7F4EE] group-hover:text-[#F3E5AB] transition-colors">
                  {isId ? article.title.id : article.title.en}
                </h2>
              </Link>
              <p className="mt-2.5 text-sm sm:text-base text-[#BEB6CE] leading-relaxed">
                {isId ? article.summary.id : article.summary.en}
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="rounded-xl bg-[#08050E] border border-white/10 p-5 space-y-2.5">
              <div className="text-xs font-semibold text-[#D4AF37]">
                {isId ? 'Poin Temuan Utama:' : 'Key Research Takeaways:'}
              </div>
              <ul className="space-y-2">
                {(isId ? article.keyTakeaways.id : article.keyTakeaways.en).map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F4EE]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources & Read Full Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#BEB6CE]">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold text-[#F7F4EE]">
                  {isId ? 'Sumber Referensi:' : 'Primary Sources:'}
                </span>
                {article.sources.map((src, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-xs text-[#F3E5AB]"
                  >
                    {src.organization} ({src.publicationYear})
                  </span>
                ))}
              </div>

              <Link
                href={l(`/research/${article.slug}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#08050E] text-xs font-semibold hover:bg-[#F3E5AB] transition-colors shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isId ? 'Baca Kajian Lengkap' : 'Read Full Research'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
