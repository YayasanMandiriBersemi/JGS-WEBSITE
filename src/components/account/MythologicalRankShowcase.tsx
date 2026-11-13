'use client';

import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Crown, Lock, Shield, Sparkles } from 'lucide-react';
import {
  MYTHOLOGICAL_RANKS,
  computeStrategistBelt,
  loadAcademyExamState,
  loadCompletedLessonSlugs,
} from '@/lib/storage/jgs-local-store';
import { MotionReveal, SpotlightCard } from '@/components/ui/LuxuryMotion';

export function MythologicalRankShowcase({
  locale = 'id',
  completedSlugsOverride,
  examPassedOverride,
  compact = false,
}: {
  locale?: 'id' | 'en';
  completedSlugsOverride?: string[];
  examPassedOverride?: boolean;
  compact?: boolean;
}) {
  const isId = locale === 'id';
  const [completedCount, setCompletedCount] = useState<number>(
    completedSlugsOverride?.length ?? 0
  );
  const [examPassed, setExamPassed] = useState<boolean>(Boolean(examPassedOverride));

  useEffect(() => {
    const sync = () => {
      if (completedSlugsOverride) {
        setCompletedCount(completedSlugsOverride.length);
      } else {
        setCompletedCount(loadCompletedLessonSlugs().length);
      }
      if (typeof examPassedOverride === 'boolean') {
        setExamPassed(examPassedOverride);
      } else {
        setExamPassed(Boolean(loadAcademyExamState()?.passed));
      }
    };
    sync();
    window.addEventListener('jgs-session-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('jgs-session-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, [completedSlugsOverride, examPassedOverride]);

  const activeMeta = computeStrategistBelt(completedCount, examPassed);

  return (
    <section className="space-y-6">
      <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-gold)]">
            <Crown className="w-4 h-4" strokeWidth={1.6} />
            <span>
              {isId
                ? 'SISTEM PROGRESI 8 TAHAPAN RANK LEGENDA THE JEY GANG'
                : '8-STAGE ANCIENT MYTHOLOGICAL RANK PROGRESSION'}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[var(--text-ivory)]">
            {isId
              ? '8 Tahapan Rank Mitologi Kuno (Otomatis Naik Seiring Tuntasnya 20 Semester)'
              : '8 Ancient Mythological Ranks (Auto-Upgrading Across 20 Semesters)'}
          </h2>
          {!compact && (
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed text-justify">
              {isId
                ? 'Setiap modul yang berhasil kamu tuntaskan hingga lulus kuis dan esai di JGS Academy otomatis mengupgrade emblem dan titel rank legenda pada Kartu Anggota Collective kamu. Total terdapat 8 kasta dari Shade of the Abyss hingga pemegang Ijazah Resmi Celestial Ouroboros.'
                : 'Every module completed across the 20-Semester JGS Academy automatically upgrades your mythological emblem, philosophy tier, and downloadable Collective PNG card from Shade of the Abyss to Celestial Ouroboros.'}
            </p>
          )}
        </div>

        {/* Active User Rank Summary Badge */}
        <div className="shrink-0 rounded-2xl border border-[#D6A937]/45 bg-[var(--bg-surface-1)] px-5 py-3.5 flex items-center gap-3.5 shadow-sm">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border font-mono text-sm font-extrabold"
            style={{
              borderColor: activeMeta.colorHex,
              color: activeMeta.colorHex,
              backgroundColor: 'rgba(214, 169, 55, 0.08)',
            }}
          >
            {activeMeta.mythTier}
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              {isId ? 'RANK AKTIF KAMU SAAT INI' : 'YOUR CURRENT ACTIVE RANK'}
            </div>
            <div className="font-display text-sm sm:text-base font-extrabold text-[var(--text-ivory)]">
              {activeMeta.badgeText}
            </div>
            <div className="font-mono text-[11px] text-[var(--accent-gold)]">
              {completedCount} / 60 {isId ? 'Modul Tuntas' : 'Modules Done'} •{' '}
              {activeMeta.colorName}
            </div>
          </div>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MYTHOLOGICAL_RANKS.map((rank) => {
          const isCurrent = rank.tier === activeMeta.mythTier;
          const isUnlocked =
            rank.requiresExam
              ? completedCount >= rank.minModules && (examPassed || completedCount >= 60)
              : completedCount >= rank.minModules;

          return (
            <SpotlightCard
              key={rank.tier}
              className={`p-5 flex flex-col justify-between space-y-4 ${
                isCurrent
                  ? 'border-2 border-[#D6A937] shadow-lg'
                  : isUnlocked
                  ? 'border-[#10B981]/35'
                  : 'opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold"
                    style={{
                      borderColor: rank.colorHex,
                      color: rank.colorHex,
                      backgroundColor: 'rgba(13, 10, 18, 0.25)',
                    }}
                  >
                    <Shield className="w-3 h-3" strokeWidth={1.75} />
                    <span>{rank.colorName}</span>
                  </span>

                  {isCurrent ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#D6A937] px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#17131D]">
                      <Sparkles className="w-3 h-3" />
                      {isId ? 'AKTIF' : 'ACTIVE'}
                    </span>
                  ) : isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" strokeWidth={1.75} />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[var(--text-muted)]" strokeWidth={1.5} />
                  )}
                </div>

                <h3 className="font-display text-base font-extrabold tracking-[-0.02em] text-[var(--text-ivory)]">
                  {rank.code}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed text-justify">
                  {isId ? rank.philosophyId : rank.philosophyEn}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 font-mono text-[10px]">
                <span className="text-[var(--accent-gold)] font-semibold">
                  {isId ? rank.semesterScopeId : rank.semesterScopeEn}
                </span>
                {rank.tier === 'VIII' && (
                  <Award className="w-3.5 h-3.5 text-[#D6A937] shrink-0" strokeWidth={1.75} />
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
