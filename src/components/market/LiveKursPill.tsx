'use client';

import React from 'react';
import { useLiveMarket } from '@/lib/context/LiveMarketContext';

interface LiveKursPillProps {
  compact?: boolean;
  className?: string;
}

export function LiveKursPill({ compact = false, className = '' }: LiveKursPillProps) {
  const { usdIdrRate, tenUsdInIdr, usdIdrStatus } = useLiveMarket();

  const oneUsdFormatted = Math.round(usdIdrRate).toLocaleString('id-ID');
  const tenUsdFormatted = Math.round(tenUsdInIdr).toLocaleString('id-ID');

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-[#D6A937]/40 bg-[#17131D]/90 px-3 py-1 font-mono text-[11px] font-bold text-[#F3E5AB] shadow-sm ${className}`}
      title={`Kurs USD/IDR Live (${usdIdrStatus})`}
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${
          usdIdrStatus === 'LIVE' ? 'bg-[#10B981] animate-pulse' : 'bg-[#F59E0B]'
        }`}
      />
      {compact ? (
        <span className="whitespace-nowrap">
          KURS: $1 = Rp{oneUsdFormatted}
        </span>
      ) : (
        <span className="whitespace-nowrap">
          LIVE KURS: $1 = Rp{oneUsdFormatted} • $10 (1.000 USC) = Rp{tenUsdFormatted}
        </span>
      )}
    </div>
  );
}
