'use client';

import React from 'react';
import { Crown, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

interface JeyStrategistCalloutProps {
  title?: string;
  ruleText: string;
  contextTag?: string;
  variant?: 'gold' | 'purple';
  showAvatar?: boolean;
}

export function JeyStrategistCallout({
  title,
  ruleText,
  contextTag,
  variant = 'gold',
  showAvatar = true
}: JeyStrategistCalloutProps) {
  const { isId } = useLocale();
  const displayTitle = title ?? (isId ? 'Jey Co-Pilot • Tips Strategi' : 'Jey Co-Pilot • Strategy Tip');
  const displayTag = contextTag ?? (isId ? 'Prinsip Manajemen Risiko' : 'Risk Management Principle');

  const borderClass =
    variant === 'gold'
      ? 'border-[#D6A937]/30 bg-[#17131D]'
      : 'border-[#B99AE8]/30 bg-[#17131D]';

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${borderClass}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {showAvatar && (
          <div className="relative shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-[#D6A937]/50 bg-[#08050E]">
            <img
              src="/images/jey-mascot.png"
              alt="Jey, Mascot of The Jey Gang Strategist"
              width={44}
              height={44}
              decoding="async"
              className="jgs-mascot-crop"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A937]">
              <Crown className="w-3.5 h-3.5 text-[#D6A937]" />
              {displayTitle}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#08050E] text-[#B99AE8] border border-[#B99AE8]/20">
              {displayTag}
            </span>
          </div>
          <p className="text-sm text-[#F7F4EE]/95 leading-relaxed">
            “{ruleText}”
          </p>
        </div>
        <div className="hidden lg:flex items-center justify-center shrink-0 w-9 h-9 rounded-xl bg-[#08050E] border border-[#D6A937]/25 text-[#D6A937]">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
