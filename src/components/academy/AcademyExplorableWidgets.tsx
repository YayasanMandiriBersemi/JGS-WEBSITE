'use client';

import React, { useMemo, useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  Crosshair,
  HelpCircle,
  Sliders,
  X,
} from 'lucide-react';
import type {
  ChartDetectivePuzzle,
  DiagramHotspotPin,
  SandboxKind,
} from '@/lib/data/academy-monographs';
import { CITATION_REGISTRY } from '@/lib/data/academy-eli10-citations';
import type { LessonDiagramType } from '@/lib/data/academy-types';
import { LessonDiagramGraphic } from '@/components/academy/Mt5VisualSimulatorPane';
import { JessyPortrait } from '@/components/academy/JessyBuddyAssistant';
import { cleanText } from '@/lib/utils';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';

export type PhotoClusterType =
  | 'MACRO'
  | 'MICROSTRUCTURE'
  | 'RISK_MATH'
  | 'WYCKOFF_TA'
  | 'AUCTION_VOLUME'
  | 'ICT_SMC'
  | 'QUANT_BEHAVIORAL';

// ============================================================================
// 1. SAFE PURE-REACT INLINE TEXT & ACADEMIC CITATION PILL RENDERER
// ============================================================================

function InlineCitationBadge({ citKey, isId }: { citKey: string; isId: boolean }) {
  const [open, setOpen] = useState(false);
  const entry = CITATION_REGISTRY[citKey];
  if (!entry) return null;

  return (
    <span className="relative inline-block align-baseline mx-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-md border border-[#D6A937]/45 bg-[#D6A937]/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent-gold)] hover:bg-[#D6A937]/20 transition align-middle"
      >
        <BookMarked className="w-3 h-3 shrink-0" strokeWidth={1.6} />
        <span>[{entry.pillLabel}]</span>
      </button>
      {open && (
        <span
          role="dialog"
          aria-label={entry.title}
          className="absolute left-0 bottom-full mb-2 z-40 w-72 sm:w-80 rounded-xl border border-[#D6A937]/50 bg-[#16121F] p-3.5 shadow-2xl text-left text-xs text-[#F4F0FA] block"
        >
          <span className="flex items-start justify-between gap-2 pb-1.5 border-b border-white/10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D6A937]">
              {entry.institutionOrJournal} • {entry.year}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              aria-label="Close citation"
              className="text-[#A89FBA] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
          <span className="block font-display font-bold text-[#F4F0FA] mt-1.5 leading-snug">
            {entry.title}
          </span>
          <span className="block font-mono text-[10px] text-[#A89FBA] mt-0.5">
            {entry.authors}
          </span>
          <span className="block text-[11.5px] leading-relaxed text-[#D8D1E6] mt-2">
            {isId ? entry.keyFindingId : entry.keyFindingEn}
          </span>
        </span>
      )}
    </span>
  );
}

export function RichFormattedText({
  text,
  className = '',
  isId = true,
}: {
  text: string;
  className?: string;
  isId?: boolean;
}) {
  const { usdIdrRate } = useLiveCurrency();
  if (!text) return null;
  const sanitized = injectLiveIdrRates(cleanText(text), usdIdrRate);

  // Tokenize [[cite:key]], **bold**, `code`, and single *accent*
  const tokenRegex =
    /(\[\[cite:[a-zA-Z0-9_]+\]\]|\*\*[^*\n]+?\*\*|`[^`\n]+?`|\*[^\s*\n][^*\n]*?[^\s*\n]\*|\*[^\s*\n]\*)/g;
  const parts = sanitized.split(tokenRegex);

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        if (part.startsWith('[[cite:') && part.endsWith(']]')) {
          const citKey = part.slice(7, -2);
          return <InlineCitationBadge key={idx} citKey={citKey} isId={isId} />;
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <mark
              key={idx}
              className="bg-[#D6A937]/25 text-inherit font-bold px-1.5 py-0.5 rounded border-b-2 border-[#D6A937]"
            >
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <code
              key={idx}
              className="mx-0.5 rounded px-1.5 py-0.5 font-mono text-[0.88em] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-[var(--accent-gold)]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return (
            <span key={idx} className="font-medium text-[var(--accent-gold)]">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </span>
  );
}

// ============================================================================
// 2. EDITORIAL PHOTO PLATE + BESPOKE MULTI-LAYER CLUSTER DIAGRAM FALLBACK
// ============================================================================

function ClusterVectorDiagram({
  cluster,
  caption,
  isId,
}: {
  cluster: PhotoClusterType;
  caption: string;
  isId: boolean;
}) {
  const clusterTitleMap: Record<PhotoClusterType, { id: string; en: string }> = {
    MACRO: { id: 'ARUS LIKUIDITAS MAKRO • BANK SENTRAL -> REAL YIELD -> EMAS', en: 'MACRO LIQUIDITY ENGINE • FED -> REAL YIELDS -> GOLD' },
    MICROSTRUCTURE: { id: 'MIKROSTRUKTUR BROKER -> TERMINAL MT5 -> BUKU ORDER L2', en: 'BROKER CUSTODY -> MT5 TERMINAL -> L2 ORDER BOOK' },
    RISK_MATH: { id: 'ARSITEKTUR AKUN CENT ($10 = 1.000 USC • 1% CAP = 10 USC)', en: 'CENT ARCHITECTURE ($10 = 1,000 USC • 1% CAP = 10 USC)' },
    WYCKOFF_TA: { id: 'SIKLUS WYCKOFF: AKUMULASI -> SPRING -> MARKUP', en: 'WYCKOFF AUCTION CYCLE: ACCUMULATION -> SPRING -> MARKUP' },
    AUCTION_VOLUME: { id: 'PETA LELANG VOLUME PROFILE • VAH / POC / VAL', en: 'AUCTION MARKET PROFILE • VAH / POINT OF CONTROL / VAL' },
    ICT_SMC: { id: 'PIPELINE EKSEKUSI ICT • KILLZONE -> SWEEP -> MSS -> FVG', en: 'ICT EXECUTION BRIDGE • KILLZONE -> SWEEP -> MSS -> FVG' },
    QUANT_BEHAVIORAL: { id: 'SINTESIS KUANTITATIF • EKSPEKTASI POSITIF & HWM 30%', en: 'QUANT SYNTHESIS • POSITIVE EXPECTANCY & 30% HWM' },
  };
  const heading = isId ? clusterTitleMap[cluster].id : clusterTitleMap[cluster].en;

  return (
    <div className="jgs-chart-frame relative w-full p-5 sm:p-6">
      <svg viewBox="0 0 640 190" className="w-full h-auto" role="img" aria-label={caption}>
        <line x1="24" y1="42" x2="616" y2="42" stroke="rgba(214,169,55,0.2)" strokeWidth="1" />
        <line x1="24" y1="95" x2="616" y2="95" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="24" y1="148" x2="616" y2="148" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="24" y="26" fill="#D6A937" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold" letterSpacing="1.2">
          {heading}
        </text>
        {cluster === 'RISK_MATH' ? (
          <>
            <rect x="28" y="64" width="160" height="72" rx="8" fill="rgba(239,68,68,0.14)" stroke="#EF4444" />
            <text x="44" y="92" fill="#FCA5A5" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">0.01 STD = 1.00 OZ</text>
            <text x="44" y="114" fill="#E5E7EB" fontSize="10" fontFamily="Inter, sans-serif">$10 → Habis seketika</text>
            <path d="M196 100 L248 100" stroke="#D6A937" strokeWidth="2" markerEnd="url(#arr)" />
            <rect x="256" y="64" width="168" height="72" rx="8" fill="rgba(214,169,55,0.14)" stroke="#D6A937" />
            <text x="272" y="92" fill="#F3E5AB" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">$10 = 1.000 USC</text>
            <text x="272" y="114" fill="#E5E7EB" fontSize="10" fontFamily="Inter, sans-serif">0.01 Cent = 0.01 oz</text>
            <rect x="448" y="64" width="164" height="72" rx="8" fill="rgba(16,185,129,0.14)" stroke="#10B981" />
            <text x="464" y="92" fill="#6EE7B7" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">1% RISK = 10 USC</text>
            <text x="464" y="114" fill="#E5E7EB" fontSize="10" fontFamily="Inter, sans-serif">100 Nyawa Belajar</text>
          </>
        ) : (
          <>
            <path
              d="M36 142 L116 112 L176 128 L236 156 L310 92 L386 106 L484 56 L596 44"
              fill="none"
              stroke="#D6A937"
              strokeWidth="2.5"
            />
            <rect x="216" y="138" width="44" height="26" rx="4" fill="rgba(245,158,11,0.18)" stroke="#F59E0B" />
            <text x="200" y="176" fill="#FBBF24" fontSize="9.5" fontFamily="JetBrains Mono, monospace">SWEEP / LIQUIDITY</text>
            <rect x="330" y="88" width="108" height="22" rx="4" fill="rgba(16,185,129,0.18)" stroke="#10B981" />
            <text x="336" y="102" fill="#6EE7B7" fontSize="9.5" fontFamily="JetBrains Mono, monospace">VALUE / FVG ENTRY</text>
            <circle cx="596" cy="44" r="5" fill="#10B981" />
          </>
        )}
      </svg>
    </div>
  );
}

export function EditorialPhotoPlate({
  photoUrl,
  caption,
  isId,
  cluster = 'MACRO',
}: {
  photoUrl: string;
  caption: string;
  isId: boolean;
  cluster?: PhotoClusterType;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)]">
      {!imgFailed && photoUrl ? (
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-[#0D0A12]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoUrl}
            alt={caption}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover object-center brightness-95 transition-transform duration-700 hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0A12]/70 via-transparent to-transparent" />
        </div>
      ) : (
        <ClusterVectorDiagram cluster={cluster} caption={caption} isId={isId} />
      )}
      <figcaption className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 py-3 text-xs leading-relaxed text-[var(--text-secondary)]">
        <span className="font-mono font-semibold text-[var(--accent-gold)] mr-2">
          {isId ? 'ILUSTRASI MODUL:' : 'VISUAL CONTEXT:'}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

// ============================================================================
// 3. INTERACTIVE HOTSPOT DIAGRAM VIEWER (4 CLICKABLE PINS OVER SVG)
// ============================================================================

export function HotspotDiagramViewer({
  diagramType,
  locale,
  hotspots,
  caption,
}: {
  diagramType: LessonDiagramType;
  locale: 'id' | 'en';
  hotspots: [DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin];
  caption?: string;
}) {
  const isId = locale === 'id';
  const [activePinNum, setActivePinNum] = useState<1 | 2 | 3 | 4>(1);
  const activePin = useMemo(
    () => hotspots.find((h) => h.num === activePinNum) ?? hotspots[0],
    [hotspots, activePinNum]
  );

  return (
    <div className="my-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5">
        <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--accent-gold)] font-semibold">
          <Crosshair className="h-3.5 w-3.5" />
          {isId ? 'SKEMA INTERAKTIF, KLIK PIN 1–4 PADA DIAGRAM' : 'INTERACTIVE SCHEMATIC, CLICK PINS 1–4'}
        </span>
        <div className="flex items-center gap-1.5">
          {hotspots.map((pin) => {
            const isActive = pin.num === activePinNum;
            return (
              <button
                key={pin.num}
                type="button"
                onClick={() => setActivePinNum(pin.num)}
                className={`h-6 w-6 rounded-full font-mono text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-[var(--accent-gold)] text-[#0E0D14] scale-110 shadow'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--text-ivory)]'
                }`}
                aria-label={isId ? `Buka Pin ${pin.num}: ${pin.labelId}` : `Inspect Pin ${pin.num}: ${pin.labelEn}`}
              >
                {pin.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Relative Canvas Container Holding SVG Schematic + 4 Hotspot Pins */}
      <div className="relative w-full bg-[#09080E]">
        <LessonDiagramGraphic type={diagramType} locale={locale} />
        <div className="pointer-events-none absolute inset-0">
          {hotspots.map((pin) => {
            const isActive = pin.num === activePinNum;
            return (
              <button
                key={pin.num}
                type="button"
                onClick={() => setActivePinNum(pin.num)}
                style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%` }}
                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center rounded-full font-mono text-xs font-extrabold transition-all focus:outline-none ${
                  isActive
                    ? 'z-20 h-8 w-8 bg-[#D4AF37] text-[#09080D] ring-4 ring-[#D4AF37]/40 scale-110 shadow-lg'
                    : 'z-10 h-7 w-7 bg-[#15131E]/95 text-[#F6F1E7] border border-[#D4AF37]/70 hover:bg-[#D4AF37] hover:text-[#09080D]'
                }`}
                aria-label={isId ? `Titik ${pin.num}: ${pin.labelId}` : `Pin ${pin.num}: ${pin.labelEn}`}
              >
                {pin.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pin Breakdown */}
      <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[#0E0D14] font-mono text-xs font-extrabold">
              {activePin.num}
            </span>
            <h4 className="font-display text-sm sm:text-base font-bold text-[var(--text-ivory)]">
              {isId ? activePin.labelId : activePin.labelEn}
            </h4>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            {isId ? `Pin ${activePin.num} dari 4` : `Pin ${activePin.num} of 4`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-sky-400 font-semibold mb-1">
              {isId ? 'Mekanisme Institusional' : 'Institutional Mechanism'}
            </p>
            <p className="text-[var(--text-ivory)]">
              {isId ? activePin.institutionalId : activePin.institutionalEn}
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/25 bg-rose-500/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-rose-400 font-semibold mb-1">
              {isId ? 'Jebakan Klasik Ritel' : 'Retail Failure Trap'}
            </p>
            <p className="text-[var(--text-ivory)]">
              {isId ? activePin.retailTrapId : activePin.retailTrapEn}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-400 font-semibold mb-1">
              {isId ? 'Protokol Eksekusi 1.000 USC' : '1,000 USC Action Protocol'}
            </p>
            <p className="text-[var(--text-ivory)]">
              {isId ? activePin.jgsActionId : activePin.jgsActionEn}
            </p>
          </div>
        </div>

        {caption ? (
          <p className="mt-3 text-[11px] font-mono text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-2.5">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================================
// 4. INTERACTIVE BRILLIANT-STYLE EXPLORABLE CONCEPT SANDBOXES (8 KINDS)
// ============================================================================

export function ExplorableConceptSandbox({
  kind,
  isId,
}: {
  kind: SandboxKind;
  isId: boolean;
}) {
  // 1. INFLATION_DECAY
  const [years, setYears] = useState(15);
  const [inflationRate, setInflationRate] = useState(5);

  // 2. ASSET_CLASSES
  const [selectedAsset, setSelectedAsset] = useState<'CASH' | 'BOND' | 'EQUITY' | 'CRYPTO' | 'GOLD'>('GOLD');

  // 3. FED_INTERMARKET
  const [realYield, setRealYield] = useState(1.2);

  // 4. ORDERBOOK_SPREAD
  const [centLots, setCentLots] = useState(0.02);
  const [isRollover, setIsRollover] = useState(false);

  // 5. DRAWDOWN_CURVE
  const [ddPct, setDdPct] = useState(25);

  // 6. WYCKOFF_AUCTION
  const [wyckoffPhase, setWyckoffPhase] = useState<'ACCUM' | 'MARKUP' | 'DISTRIB' | 'MARKDOWN'>('ACCUM');

  // 7. ICT_PIPELINE
  const [ictSession, setIctSession] = useState<'ASIA' | 'LONDON' | 'NEW_YORK' | 'DEAD'>('LONDON');
  const [chkSweep, setChkSweep] = useState(true);
  const [chkFvg, setChkFvg] = useState(false);
  const [chkDiscount, setChkDiscount] = useState(true);

  // 8. QUANT_MONTE_CARLO
  const [winRate, setWinRate] = useState(45);
  const [rrRatio, setRrRatio] = useState(2.2);
  const [riskPerTradePct, setRiskPerTradePct] = useState(1);

  return (
    <div className="my-6 rounded-xl border border-[var(--accent-gold)]/35 bg-[var(--bg-elevated)] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border-subtle)]">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
          <Sliders className="h-4 w-4" />
          {isId ? 'SIMULASI KONSEP INTERAKTIF (BRILLIANT LAB)' : 'INTERACTIVE CONCEPT SANDBOX'}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          {isId ? 'Geser Kontrol Untuk Menguji Hubungan Sebab-Akibat' : 'Manipulate Parameters Live'}
        </span>
      </div>

      {kind === 'INFLATION_DECAY' && (() => {
        const purchasingPower = Math.round(1000 / Math.pow(1 + inflationRate / 100, years));
        const purchasingPct = Math.round((purchasingPower / 1000) * 100);
        const lostUsd = 1000 - purchasingPower;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)] mb-1">
                  <span>{isId ? 'Horizon Waktu' : 'Time Horizon'}</span>
                  <strong className="text-[var(--accent-gold)]">{years} {isId ? 'Tahun' : 'Yrs'}</strong>
                </span>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)] mb-1">
                  <span>{isId ? 'Laju Inflasi Riil Tahunan' : 'Annual Real Inflation'}</span>
                  <strong className="text-rose-400">{inflationRate}% / {isId ? 'thn' : 'yr'}</strong>
                </span>
                <input
                  type="range"
                  min={2}
                  max={10}
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full accent-rose-400"
                />
              </label>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                <span className="text-[var(--text-secondary)]">
                  {isId ? 'Sisa Daya Beli $1,000 Tunai Nominal:' : 'Remaining Purchasing Power of $1,000 Cash:'}
                </span>
                <span className="text-base font-bold text-rose-400">
                  ${purchasingPower} ({purchasingPct}%)
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-rose-500 transition-all duration-300"
                  style={{ width: `${purchasingPct}%` }}
                />
              </div>
              <p className="mt-2.5 text-xs text-[var(--text-secondary)]">
                {isId
                  ? `Uang kertas Anda secara nominal tetap tertulis $1,000, tetapi Anda diam-diam kehilangan barang setara $${lostUsd} setelah ${years} tahun karena suplai mata uang fiat berkembang.`
                  : `Nominal cash still reads $1,000, yet you silently forfeit $${lostUsd} of real purchasing power over ${years} years.`}
              </p>
            </div>
          </div>
        );
      })()}

      {kind === 'ASSET_CLASSES' && (() => {
        const specs = {
          CASH: {
            titleId: 'Kas Fiat / Tabungan Konvensional',
            titleEn: 'Fiat Cash / Savings',
            hedge: isId ? 'Negatif (Terkikis Inflasi)' : 'Negative (Inflation Eroded)',
            minSize: '$1',
            liquidity: isId ? 'Tinggi, hasil riil minus' : 'Instant, negative real return',
            verdictId: 'Bagus untuk dana darurat, buruk untuk bertumbuh jangka panjang.',
            verdictEn: 'Good for emergency reserves; fails long-term purchasing power.',
          },
          BOND: {
            titleId: 'Obligasi Negara (US Treasury / SBN)',
            titleEn: 'Government Bonds',
            hedge: isId ? 'Tergantung Real Yield' : 'Real Yield Sensitive',
            minSize: 'Rp1 Juta / $1,000',
            liquidity: isId ? 'Jam Pasar Obligasi' : 'Bond Market Hours',
            verdictId: 'Tulang punggung imbal hasil tetap; mengalahkan emas saat Real Yield naik tajam.',
            verdictEn: 'Institutional yield anchor; competes against non-yielding Gold when real yields climb.',
          },
          EQUITY: {
            titleId: 'Saham & Indeks Kapitalisasi Besar',
            titleEn: 'Equities & Equity Indices',
            hedge: isId ? 'Pertumbuhan Produktif' : 'Productive Cashflow Hedge',
            minSize: '$50 - $500+',
            liquidity: isId ? 'Hanya jam buka bursa (8 jam)' : 'Exchange Session Only',
            verdictId: 'Ideal untuk akumulasi dividen jangka panjang, memiliki risiko gap pembukaan bursa.',
            verdictEn: 'Strong compounding engine, subject to overnight cash session gaps.',
          },
          CRYPTO: {
            titleId: 'Aset Kripto (BTC / Altcoins)',
            titleEn: 'Cryptocurrencies',
            hedge: isId ? 'Beta Tinggi Likuiditas Global' : 'High-Beta Liquidity Asset',
            minSize: '$10',
            liquidity: '24/7',
            verdictId: 'Volatilitas ekstrem; sering memicu over-trading pada akun kecil tanpa filter.',
            verdictEn: 'Extreme weekend gap volatility; dangerous for undisciplined small balances.',
          },
          GOLD: {
            titleId: 'XAU/USD Emas Spot (Akun Cent 1.000 USC)',
            titleEn: 'Spot Gold XAU/USD (1,000 USC Cent)',
            hedge: isId ? 'Penyimpan Nilai & Likuiditas 23 Jam' : 'Monetary Anchor • 23h Deep Liquidity',
            minSize: '$10 = 1.000 USC (1 oz)',
            liquidity: isId ? '23 Jam/Hari, Spread Ketat di London/NY' : '23h/Day, Tight London/NY Depth',
            verdictId: 'Laboratorium belajar paling presisi: bebas manipulasi emiten tunggal & bisa dikalibrasi persis 1% (10 USC).',
            verdictEn: 'Optimal learning asset: macro-driven integrity with exact 1% (10 USC) micro risk control.',
          },
        }[selectedAsset];

        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['CASH', 'BOND', 'EQUITY', 'CRYPTO', 'GOLD'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSelectedAsset(k)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
                    selectedAsset === k
                      ? 'bg-[var(--accent-gold)] text-[#0E0D14]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Kelas Aset' : 'Asset Class'}
                </p>
                <p className="font-semibold text-[var(--text-ivory)] mt-0.5">
                  {isId ? specs.titleId : specs.titleEn}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Akses Modal Mikro' : 'Micro Capital Access'}
                </p>
                <p className="font-mono font-semibold text-[var(--accent-gold)] mt-0.5">{specs.minSize}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Sifat Proteksi' : 'Macro Behavior'}
                </p>
                <p className="font-semibold text-[var(--text-ivory)] mt-0.5">{specs.hedge}</p>
              </div>
              <div className="sm:col-span-3 border-t border-[var(--border-subtle)] pt-2.5 text-[var(--text-secondary)]">
                <strong className="text-[var(--text-ivory)]">{isId ? 'Catatan Strategis:' : 'Strategic Note:'}</strong>{' '}
                {isId ? specs.verdictId : specs.verdictEn}
              </div>
            </div>
          </div>
        );
      })()}

      {kind === 'FED_INTERMARKET' && (() => {
        const isBullGold = realYield < 0.5;
        const isNeutral = realYield >= 0.5 && realYield <= 1.7;
        const dxyTone = realYield > 1.7 ? (isId ? 'DXY Menguat Kuat' : 'DXY Strong Rally') : realYield < 0.5 ? (isId ? 'DXY Tertekan Melemah' : 'DXY Weakening') : (isId ? 'DXY Konsolidasi Seimbang' : 'DXY Range-Bound');
        const goldTone = isBullGold ? (isId ? 'XAU/USD Bullish Struktural (Biaya Peluang Emas Rendah)' : 'XAU/USD Structural Bullish') : isNeutral ? (isId ? 'XAU/USD Dua Arah Mengikuti Likuiditas Killzone' : 'XAU/USD Two-Way Liquidity Rotation') : (isId ? 'XAU/USD Tertekan, Wajib Waspada Fake Breakout Long' : 'XAU/USD Headwind, Avoid Blind Long Chasing');
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)] mb-1.5">
                <span>{isId ? 'Simulasi Imbal Hasil Riil Obligasi AS 10-Thn (TIPS Real Yield)' : 'US 10Y TIPS Real Yield Simulator'}</span>
                <strong className={realYield >= 1.5 ? 'text-rose-400' : 'text-emerald-400'}>
                  {realYield >= 0 ? `+${realYield.toFixed(1)}%` : `${realYield.toFixed(1)}%`}
                </strong>
              </span>
              <input
                type="range"
                min={-1.0}
                max={3.5}
                step={0.1}
                value={realYield}
                onChange={(e) => setRealYield(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">1. {isId ? 'Dampak Dolar AS (DXY)' : 'US Dollar Index (DXY)'}</p>
                <p className="font-semibold text-[var(--text-ivory)] mt-1">{dxyTone}</p>
              </div>
              <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">2. {isId ? 'Reaksi XAU/USD (Emas)' : 'XAU/USD Gold Impact'}</p>
                <p className={`font-semibold mt-1 ${isBullGold ? 'text-emerald-400' : isNeutral ? 'text-[var(--accent-gold)]' : 'text-rose-400'}`}>
                  {goldTone}
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {kind === 'ORDERBOOK_SPREAD' && (() => {
        const spreadPts = isRollover ? 1.85 : 0.25;
        const spreadUscCost = Number((centLots * spreadPts * 100).toFixed(2));
        const pctEquityCost = Number(((spreadUscCost / 1000) * 100).toFixed(2));
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex-1 min-w-[200px]">
                <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)] mb-1">
                  <span>{isId ? 'Ukuran Eksekusi Akun Cent (1 oz/lot)' : 'Cent Account Lot Size'}</span>
                  <strong className="text-[var(--accent-gold)]">{centLots.toFixed(2)} Cent Lot</strong>
                </span>
                <input
                  type="range"
                  min={0.01}
                  max={0.1}
                  step={0.01}
                  value={centLots}
                  onChange={(e) => setCentLots(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRollover(false)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold ${
                    !isRollover ? 'bg-emerald-500 text-[#09080D]' : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isId ? 'Sesi London/NY ($0.25 Spread)' : 'London/NY ($0.25 Spread)'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRollover(true)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold ${
                    isRollover ? 'bg-rose-500 text-white' : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isId ? 'Jam Rollover 04:00 ($1.85 Spread)' : 'Rollover Gap ($1.85)'}
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Biaya Spread Seketika Saat Klik Buy/Sell' : 'Immediate Spread Toll at Entry'}
                </p>
                <p className="font-mono text-lg font-bold text-[var(--text-ivory)]">
                  -{spreadUscCost} USC <span className="text-xs font-normal text-[var(--text-secondary)]">({pctEquityCost}% {isId ? 'dari 1.000 USC' : 'of 1,000 USC'})</span>
                </p>
              </div>
              <p className={`font-semibold ${pctEquityCost > 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {pctEquityCost > 1
                  ? isId
                    ? 'BAHAYA! Biaya spread saja sudah melampaui jatah rugi 1% (10 USC).'
                    : 'DANGER: Spread cost alone exceeds your 1% (10 USC) trade budget.'
                  : isId
                  ? 'AMAN, Biaya gesekan spread tetap jauh di bawah batas 10 USC.'
                  : 'HEALTHY, Execution friction remains safely within 1,000 USC tolerance.'}
              </p>
            </div>
          </div>
        );
      })()}

      {kind === 'DRAWDOWN_CURVE' && (() => {
        const reqGainPct = Number(((ddPct / (100 - ddPct)) * 100).toFixed(1));
        const remEq = Math.round(1000 * (1 - ddPct / 100));
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="flex justify-between text-xs font-mono text-[var(--text-ivory)] mb-1">
                <span>{isId ? 'Simulasi Penurunan Ekuitas (Drawdown)' : 'Simulated Account Drawdown'}</span>
                <strong className="text-rose-400">-{ddPct}% ({isId ? `Sisa ${remEq} USC` : `${remEq} USC left`})</strong>
              </span>
              <input
                type="range"
                min={5}
                max={80}
                step={5}
                value={ddPct}
                onChange={(e) => setDdPct(Number(e.target.value))}
                className="w-full accent-rose-400"
              />
            </label>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Profit yang Dibutuhkan Untuk Balik Modal (BEP)' : 'Gain Required Just to Recover Breakeven'}
                </p>
                <p className="font-mono text-2xl font-extrabold text-[var(--accent-gold)] mt-1">+{reqGainPct}%</p>
              </div>
              <div className="text-[var(--text-secondary)] leading-relaxed">
                {ddPct <= 10 ? (
                  <span className="text-emerald-400 font-medium">
                    {isId
                      ? 'Dengan batas risiko JGS 1% (10 USC), butuh 10 kali salah berturut-turut untuk mencapai drawdown 10%, dan hanya perlu +11.1% untuk pulih penuh.'
                      : 'With JGS 1% (10 USC) caps, even a 10% drawdown only needs +11.1% recovery.'}
                  </span>
                ) : (
                  <span className="text-rose-400 font-medium">
                    {isId
                      ? `Perhatikan asimetri matematika: kehilangan ${ddPct}% modal menuntut Anda mencetak +${reqGainPct}% keuntungan pada sisa ekuitas ${remEq} USC hanya untuk kembali ke titik nol.`
                      : `Notice the harsh asymmetry: losing ${ddPct}% requires +${reqGainPct}% gain on your remaining ${remEq} USC balance merely to break even.`}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {kind === 'WYCKOFF_AUCTION' && (() => {
        const phases = {
          ACCUM: {
            label: isId ? 'Fase A/B: Akumulasi & Spring' : 'Accumulation & Spring',
            inst: isId ? 'Institusi menyerap panik jual ritel di bawah support tanpa mengerek harga ke atas.' : 'Smart Money absorbs retail panic below support without bidding price up.',
            retail: isId ? 'Ritel putus asa dan melakukan cut loss atau ikut Sell saat support patah sesaat.' : 'Retail panics out or chases breakdown shorts on false support break.',
            jgs: isId ? 'Tunggu bukti Reclaim kembali ke atas Value Area + konfirmasi struktur baru (MSS).' : 'Wait for reclaim back inside Value Area + structural shift.',
          },
          MARKUP: {
            label: isId ? 'Fase C/D: Markup Ekspansi' : 'Markup & Imbalance Expansion',
            inst: isId ? 'Harga keluar dari keseimbangan POC mencari likuiditas baru di harga premium.' : 'Price expands cleanly out of POC balance toward higher equilibrium.',
            retail: isId ? 'Ritel baru berani mengejar Buy di pucuk ketika harga sudah bergerak jauh.' : 'Retail chases extended green candles at premium levels.',
            jgs: isId ? 'Jangan kejar harga! Bidik pullback ke celah FVG / zona diskon dengan risiko maksimal 10 USC.' : 'Never chase; wait for balanced discount retracement capping stop at 10 USC.',
          },
          DISTRIB: {
            label: isId ? 'Fase E: Distribusi & UTAD' : 'Distribution & UTAD Trap',
            inst: isId ? 'Institusi melempar kontrak jual kepada kerumunan pembeli yang euforia menembus pucuk.' : 'Composite Man distributes inventory into euphoric breakout buyers.',
            retail: isId ? 'Ritel mengira tren akan naik selamanya dan menumpuk posisi Buy berlot besar.' : 'Retail over-leverages breakout longs expecting endless rallies.',
            jgs: isId ? 'Waspadai sapuan puncak ganda (BSL Sweep) yang gagal mempertahankan penutupan candle.' : 'Watch for failed highs (BSL sweep) rejecting back beneath resistance.',
          },
          MARKDOWN: {
            label: isId ? 'Fase Markdown: Penurunan Terarah' : 'Markdown Phase',
            inst: isId ? 'Likuiditas beli habis; harga turun cepat menuju kantong permintaan di bawah.' : 'Bids pull back; price reprices rapidly into lower value shelves.',
            retail: isId ? 'Ritel melakukan Buy Average Down / Martingale melawan tren turun tanpa Stop Loss.' : 'Retail keeps averaging down losing buys without stops.',
            jgs: isId ? 'Ikuti arah struktur turun hanya saat koreksi menyentuh zona Premium, patuhi circuit breaker 30 USC.' : 'Respect bearish market structure; halt immediately if 30 USC daily cap triggers.',
          },
        }[wyckoffPhase];

        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['ACCUM', 'MARKUP', 'DISTRIB', 'MARKDOWN'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setWyckoffPhase(p)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold ${
                    wyckoffPhase === p
                      ? 'bg-[var(--accent-gold)] text-[#0E0D14]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-ivory)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 space-y-2 text-xs">
              <p className="font-display font-bold text-sm text-[var(--accent-gold)]">{phases.label}</p>
              <p className="text-[var(--text-ivory)]"><strong>{isId ? 'Manuver Institusi:' : 'Institutional Move:'}</strong> {phases.inst}</p>
              <p className="text-rose-400"><strong>{isId ? 'Perilaku Ritel:' : 'Retail Mistake:'}</strong> {phases.retail}</p>
              <p className="text-emerald-400"><strong>{isId ? 'Eksekusi 1.000 USC:' : 'JGS Action:'}</strong> {phases.jgs}</p>
            </div>
          </div>
        );
      })()}

      {kind === 'ICT_PIPELINE' && (() => {
        const sessionValid = ictSession === 'LONDON' || ictSession === 'NEW_YORK';
        const score = (sessionValid ? 40 : 0) + (chkSweep ? 25 : 0) + (chkFvg ? 20 : 0) + (chkDiscount ? 15 : 0);
        const go = score >= 80 && sessionValid;
        return (
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap gap-2">
              {([
                ['ASIA', '10:00 WIB (Asia Range)'],
                ['LONDON', '14:30 WIB (London Killzone)'],
                ['NEW_YORK', '19:30 WIB (New York Killzone)'],
                ['DEAD', '03:45 WIB (Dead Zone)'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIctSession(key)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold ${
                    ictSession === key
                      ? 'bg-[var(--accent-gold)] text-[#0E0D14]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChkSweep((v) => !v)}
                className={`rounded-lg border p-2.5 text-left font-medium transition-colors ${
                  chkSweep ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-ivory)]' : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {chkSweep ? '[AKTIF] ' : '[MATI] '} 1. BSL / SSL Sweep
              </button>
              <button
                type="button"
                onClick={() => setChkFvg((v) => !v)}
                className={`rounded-lg border p-2.5 text-left font-medium transition-colors ${
                  chkFvg ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-ivory)]' : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {chkFvg ? '[AKTIF] ' : '[MATI] '} 2. Displacement MSS + FVG
              </button>
              <button
                type="button"
                onClick={() => setChkDiscount((v) => !v)}
                className={`rounded-lg border p-2.5 text-left font-medium transition-colors ${
                  chkDiscount ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-ivory)]' : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                {chkDiscount ? '[AKTIF] ' : '[MATI] '} 3. Zona Diskon / Premium (&lt;50%)
              </button>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono font-bold text-sm text-[var(--text-ivory)]">
                {isId ? 'Skor Validitas Setup:' : 'Setup Readiness:'} {score}/100
              </span>
              <span className={`font-semibold ${go ? 'text-emerald-400' : 'text-amber-400'}`}>
                {go
                  ? isId
                    ? 'LAYAK EKSEKUSI (Kunci Risiko <= 10 USC via Floor Lot)'
                    : 'APPROVED, Size via Floor Rounding <= 10 USC'
                  : isId
                  ? 'NO TRADE, Tunggu Killzone aktif & seluruh konfirmasi lengkap'
                  : 'NO TRADE, Missing Killzone time or structural trigger'}
              </span>
            </div>
          </div>
        );
      })()}

      {kind === 'QUANT_MONTE_CARLO' && (() => {
        const w = winRate / 100;
        const l = 1 - w;
        const evR = Number((w * rrRatio - l * 1).toFixed(2));
        const evUscPerTrade = Number((evR * (1000 * (riskPerTradePct / 100))).toFixed(1));
        const ruinDanger = riskPerTradePct >= 5 || evR <= 0;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <label>
                <span className="flex justify-between text-[var(--text-ivory)] mb-1">
                  <span>Winrate</span>
                  <strong className="text-[var(--accent-gold)]">{winRate}%</strong>
                </span>
                <input type="range" min={25} max={75} value={winRate} onChange={(e) => setWinRate(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
              </label>
              <label>
                <span className="flex justify-between text-[var(--text-ivory)] mb-1">
                  <span>Reward : Risk</span>
                  <strong className="text-[var(--accent-gold)]">1 : {rrRatio.toFixed(1)}</strong>
                </span>
                <input type="range" min={1.0} max={4.0} step={0.2} value={rrRatio} onChange={(e) => setRrRatio(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
              </label>
              <label>
                <span className="flex justify-between text-[var(--text-ivory)] mb-1">
                  <span>{isId ? 'Risiko / Trade' : 'Risk / Trade'}</span>
                  <strong className={riskPerTradePct > 2 ? 'text-rose-400' : 'text-emerald-400'}>{riskPerTradePct}%</strong>
                </span>
                <input type="range" min={1} max={10} step={1} value={riskPerTradePct} onChange={(e) => setRiskPerTradePct(Number(e.target.value))} className="w-full accent-rose-400" />
              </label>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">
                  {isId ? 'Ekspektasi Matematis (Expectancy / Trade)' : 'Statistical Expectancy per Trade'}
                </p>
                <p className={`font-mono text-xl font-bold mt-0.5 ${evR > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {evR > 0 ? `+${evR}R` : `${evR}R`} ({evUscPerTrade >= 0 ? `+${evUscPerTrade}` : evUscPerTrade} USC / trade)
                </p>
              </div>
              <div className="text-[var(--text-secondary)]">
                {ruinDanger ? (
                  <span className="text-rose-400 font-semibold">
                    {isId
                      ? 'RISIKO BANGKRUT TINGGI: Entah ekspektasi negatif atau ukuran risiko terlalu besar mengundang badai drawdown fatal saat kalah 6x beruntun.'
                      : 'HIGH RUIN RISK: Negative EV or excessive bet sizing amplifies consecutive-loss ruin.'}
                  </span>
                ) : (
                  <span className="text-emerald-400 font-semibold">
                    {isId
                      ? `PROBABILITAS SEHAT: Dengan 1.000 USC dan risiko ${riskPerTradePct}%, keunggulan statistik bekerja konsisten melampaui 50 transaksi.`
                      : `HEALTHY EDGE: At ${riskPerTradePct}% per trade, statistical expectancy compounds safely over 50+ sample size.`}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ============================================================================
// 5. 15-SECOND MARKET DETECTIVE MINI CHALLENGE (MID-LESSON DIAGNOSTIC)
// ============================================================================

export function ChartDetectiveMiniChallenge({
  puzzle,
  isId,
}: {
  puzzle: ChartDetectivePuzzle;
  isId: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const options = isId ? puzzle.optionsId : puzzle.optionsEn;
  const isRight = selected === puzzle.correctIndex;

  return (
    <div className="my-6 rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-500/10 via-[var(--bg-surface)] to-[var(--bg-elevated)] p-5">
      <div className="flex items-start gap-3.5 mb-4">
        <div className="hidden sm:block shrink-0 rounded-full border border-[var(--accent-gold)]/40 bg-[#12101A] p-1">
          <JessyPortrait mood={selected === null ? 'explaining' : isRight ? 'cheering' : 'warning'} size={48} />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent-gold)]">
            <HelpCircle className="h-3.5 w-3.5" />
            {isId ? 'TANTANGAN 15 DETIK: DETEKTIF PASAR BARENG JESSY' : '15-SECOND CHECK: MARKET DETECTIVE WITH JESSY'}
          </span>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--text-ivory)]">
            {isId ? puzzle.scenarioId : puzzle.scenarioEn}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => {
          const picked = selected === idx;
          const correct = idx === puzzle.correctIndex;
          let tone =
            'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-ivory)] hover:border-[var(--accent-gold)]';
          if (selected !== null) {
            if (correct) {
              tone = 'border-emerald-500/50 bg-emerald-500/15 text-[var(--text-ivory)] font-semibold';
            } else if (picked) {
              tone = 'border-rose-500/50 bg-rose-500/15 text-rose-300';
            } else {
              tone = 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] opacity-60';
            }
          }
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(idx)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-xs sm:text-sm transition-all ${tone}`}
            >
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current font-mono text-[11px] font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {selected !== null && correct ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : null}
            </button>
          );
        })}
      </div>

      {selected !== null ? (
        <div
          className={`mt-4 rounded-lg border p-3.5 text-xs leading-relaxed ${
            isRight
              ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-ivory)]'
              : 'border-amber-500/40 bg-amber-500/10 text-[var(--text-ivory)]'
          }`}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] mb-1 text-[var(--accent-gold)]">
            {isRight
              ? isId
                ? 'DIAGNOSIS TEPAT, JESSY SETUJU'
                : 'EXACT DIAGNOSIS, VERIFIED'
              : isId
              ? 'PEMBEDAAN JESSY, PERHATIKAN LOGIKA INI'
              : 'CORRECTION, INSPECT THE MECHANISM'}
          </p>
          <p>{isId ? puzzle.explanationId : puzzle.explanationEn}</p>
        </div>
      ) : null}
    </div>
  );
}
