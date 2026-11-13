'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  StepForward,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { LessonDiagramType } from '@/lib/data/academy-lessons';
import { JgsThemeMode, loadThemeMode } from '@/lib/storage/jgs-local-store';
import { TradingViewLiveWidget } from '@/components/charts/TradingViewLiveWidget';
import { JessyMood } from './JessyBuddyAssistant';

// ============================================================================
// 1. STEP-BY-STEP VISUAL SVG INFOGRAPHICS FOR LESSON LEFT PANE
// ============================================================================

export function LessonDiagramGraphic({
  type,
  locale,
}: {
  type: LessonDiagramType;
  locale: 'id' | 'en';
}) {
  const isId = locale === 'id';

  switch (type) {
    case 'BROKER_VS_MT5':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Broker vs MT5 diagram">
            <rect x="10" y="24" width="110" height="72" rx="10" fill="#211B2A" stroke="#B99AE8" />
            <text x="65" y="52" textAnchor="middle" fill="#B99AE8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {isId ? '1. PASAR DUNIA' : '1. GLOBAL MARKET'}
            </text>
            <text x="65" y="70" textAnchor="middle" fill="#F3EFF8" fontSize="9">
              XAUUSD / FX
            </text>

            <path d="M124 60 L150 60" stroke="#D6A937" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="154" y="20" width="112" height="80" rx="10" fill="#211B2A" stroke="#D6A937" strokeWidth="1.5" />
            <text x="210" y="46" textAnchor="middle" fill="#D6A937" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {isId ? '2. BROKER (BRANKAS)' : '2. BROKER (VAULT)'}
            </text>
            <text x="210" y="64" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold">
              $10 = 1.000 USC
            </text>
            <text x="210" y="82" textAnchor="middle" fill="#B8AFC7" fontSize="8">
              {isId ? 'Atas Nama Pribadi' : 'Your Account'}
            </text>

            <path d="M270 60 L296 60" stroke="#D6A937" strokeWidth="2" />

            <rect x="300" y="24" width="110" height="72" rx="10" fill="#211B2A" stroke="#10B981" />
            <text x="355" y="52" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {isId ? '3. MT5 (KOKPIT)' : '3. MT5 (COCKPIT)'}
            </text>
            <text x="355" y="70" textAnchor="middle" fill="#F3EFF8" fontSize="9">
              {isId ? 'Grafik + Buy / Sell' : 'Charts + Buy / Sell'}
            </text>
          </svg>
        </div>
      );

    case 'GOLD_BAR_CENT':
    case 'CONTRACT_SPEC_CHECK':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="100 oz Standard vs 1 oz Cent">
            <rect x="12" y="16" width="184" height="88" rx="10" fill="#2A1218" stroke="#EF4444" />
            <text x="104" y="40" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
              STANDAR (0.01 LOT = 1 OZ)
            </text>
            <text x="104" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="12" fontWeight="bold">
              31.1 Gram Emas Fisik
            </text>
            <text x="104" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="9">
              {isId ? 'Goyang $5 = Modal $10 Terkikis -50%' : '$5 Move = -50% of $10 Wiped!'}
            </text>

            <rect x="224" y="16" width="184" height="88" rx="10" fill="#0F2620" stroke="#10B981" />
            <text x="316" y="40" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
              CENT XAUUSDc (0.01 = 0.01 OZ)
            </text>
            <text x="316" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="12" fontWeight="bold">
              0.31 Gram (Harga Es Kopi)
            </text>
            <text x="316" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="9">
              {isId ? 'SL $5 = Cuma -10 USC (-1% Modal!)' : '$5 SL = Only -10 USC (-1% Risk!)'}
            </text>
          </svg>
        </div>
      );

    case 'ICT_KILLZONE':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 116" className="w-full h-auto" role="img" aria-label="WIB Killzone Timeline">
            <rect x="10" y="24" width="110" height="68" rx="8" fill="#1E1826" stroke="#6E657B" />
            <text x="65" y="48" textAnchor="middle" fill="#BEB6CE" fontSize="9" fontFamily="monospace">
              ASIA RANGE
            </text>
            <text x="65" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="10" fontWeight="bold">
              07:00 – 13:00 WIB
            </text>
            <text x="65" y="80" textAnchor="middle" fill="#8E84A4" fontSize="8">
              {isId ? 'Sepi / Sideways' : 'Liquidity Build'}
            </text>

            <rect x="132" y="24" width="130" height="68" rx="8" fill="#132924" stroke="#10B981" strokeWidth="1.5" />
            <text x="197" y="48" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              LONDON KILLZONE
            </text>
            <text x="197" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="10" fontWeight="bold">
              14:00 – 17:00 WIB
            </text>
            <text x="197" y="80" textAnchor="middle" fill="#6EE7B7" fontSize="8">
              {isId ? 'Sweep & Entry Utama!' : 'Optimal Sweep Window'}
            </text>

            <rect x="274" y="24" width="136" height="68" rx="8" fill="#2A2012" stroke="#D6A937" strokeWidth="1.5" />
            <text x="342" y="48" textAnchor="middle" fill="#D6A937" fontSize="9" fontFamily="monospace" fontWeight="bold">
              NY SILVER BULLET
            </text>
            <text x="342" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="10" fontWeight="bold">
              19:00 – 22:00 WIB
            </text>
            <text x="342" y="80" textAnchor="middle" fill="#F3E5AB" fontSize="8">
              {isId ? 'Puncak FVG 21–22 WIB' : 'Peak 21–22 WIB Flow'}
            </text>
          </svg>
        </div>
      );

    case 'ICT_SWEEP_BSL_SSL':
    case 'ICT_MSS_FVG':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 130" className="w-full h-auto" role="img" aria-label="ICT Sweep MSS FVG flow">
            <line x1="20" y1="84" x2="395" y2="84" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.2" />
            <text x="24" y="77" fill="#EF4444" fontSize="8.5" fontFamily="monospace">
              SSL / Asian Low Stop-Loss Pool
            </text>
            <polyline
              fill="none"
              stroke="#B99AE8"
              strokeWidth="2.5"
              points="24,64 68,78 102,112 136,72 190,36 226,64 345,20"
            />
            <circle cx="102" cy="112" r="5" fill="#EF4444" />
            <text x="112" y="118" fill="#EF4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              1. Sweep (Judas)
            </text>
            <line x1="125" y1="54" x2="250" y2="54" stroke="#10B981" strokeWidth="1.8" />
            <text x="188" y="46" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              2. MSS Break
            </text>
            <rect x="176" y="58" width="96" height="18" fill="rgba(214,169,55,0.28)" stroke="#D6A937" />
            <text x="224" y="70" textAnchor="middle" fill="#F3E5AB" fontSize="8" fontFamily="monospace" fontWeight="bold">
              3. FVG ENTRY
            </text>
          </svg>
        </div>
      );

    case 'INFLATION_EROSION':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Inflation Purchasing Power Erosion">
            <rect x="14" y="18" width="182" height="84" rx="10" fill="#2A1218" stroke="#EF4444" />
            <text x="105" y="42" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {isId ? 'TABUNGAN DIAM (RP1 JUTA)' : 'IDLE CASH SAVING'}
            </text>
            <text x="105" y="64" textAnchor="middle" fill="#F3EFF8" fontSize="11" fontWeight="bold">
              {isId ? 'Daya Beli Turun Tiap Tahun' : 'Purchasing Power Erodes'}
            </text>
            <text x="105" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="9">
              {isId ? 'Inflasi 4–6% > Bunga Bank 0.5%' : 'CPI Inflation > Saving Rate'}
            </text>

            <rect x="224" y="18" width="182" height="84" rx="10" fill="#0F2620" stroke="#10B981" />
            <text x="315" y="42" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {isId ? 'ILMU & MANAJEMEN ASET' : 'SKILLED CAPITAL STRATEGY'}
            </text>
            <text x="315" y="64" textAnchor="middle" fill="#F3EFF8" fontSize="11" fontWeight="bold">
              {isId ? 'Pahami Pasar Emas & Makro' : 'Macro & Gold Hedging'}
            </text>
            <text x="315" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="9">
              {isId ? 'Tumbuh Terukur, Bukan Spekulasi' : 'Calculated Growth'}
            </text>
          </svg>
        </div>
      );

    case 'MARKET_ECOSYSTEM':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 122" className="w-full h-auto" role="img" aria-label="Global Liquidity Food Chain">
            <rect x="10" y="20" width="118" height="82" rx="10" fill="#211B2A" stroke="#D6A937" strokeWidth="1.5" />
            <text x="69" y="46" textAnchor="middle" fill="#D6A937" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              BANK TIER-1 (LP)
            </text>
            <text x="69" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              JPM / Citi / UBS
            </text>
            <text x="69" y="82" textAnchor="middle" fill="#B8AFC7" fontSize="8">
              {isId ? 'Sumber Harga Utama' : 'Primary Liquidity'}
            </text>

            <path d="M132 61 L150 61" stroke="#D6A937" strokeWidth="2" />

            <rect x="154" y="20" width="118" height="82" rx="10" fill="#211B2A" stroke="#10B981" />
            <text x="213" y="46" textAnchor="middle" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              BROKER (A-BOOK)
            </text>
            <text x="213" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              STP / ECN Bridge
            </text>
            <text x="213" y="82" textAnchor="middle" fill="#6EE7B7" fontSize="8">
              {isId ? 'Ambil Komisi Spread' : 'Transparent Spread'}
            </text>

            <path d="M276 61 L294 61" stroke="#D6A937" strokeWidth="2" />

            <rect x="298" y="20" width="112" height="82" rx="10" fill="#211B2A" stroke="#B99AE8" />
            <text x="354" y="46" textAnchor="middle" fill="#B99AE8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              TRADER RITEL
            </text>
            <text x="354" y="65" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              MT5 + 1.000 USC
            </text>
            <text x="354" y="82" textAnchor="middle" fill="#B8AFC7" fontSize="8">
              {isId ? 'Pakai SL Disiplin' : 'Strict SL Rules'}
            </text>
          </svg>
        </div>
      );

    case 'QUANT_EXPECTANCY':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Quantitative Expectancy Formula">
            <rect x="16" y="16" width="388" height="88" rx="12" fill="#17131D" stroke="#D6A937" strokeWidth="1.5" />
            <text x="210" y="42" textAnchor="middle" fill="#D6A937" fontSize="10" fontFamily="monospace" fontWeight="bold">
              MATHEMATICAL EXPECTANCY FORMULA
            </text>
            <text x="210" y="68" textAnchor="middle" fill="#F3EFF8" fontSize="12" fontFamily="monospace" fontWeight="bold">
              E = (Win% × AvgWin) − (Loss% × AvgLoss)
            </text>
            <text x="210" y="90" textAnchor="middle" fill="#10B981" fontSize="9.5" fontFamily="monospace">
              {isId ? 'Contoh Win 45% dengan 1:2.5 R:R => +0.575R per Trade!' : '45% Win at 1:2.5 R:R => +0.575R per Trade!'}
            </text>
          </svg>
        </div>
      );

    case 'COPY_TRADING_HWM':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 122" className="w-full h-auto" role="img" aria-label="High-Water Mark Protection Curve">
            <line x1="28" y1="36" x2="395" y2="36" stroke="#D6A937" strokeDasharray="5 4" strokeWidth="1.5" />
            <text x="32" y="28" fill="#D6A937" fontSize="9" fontFamily="monospace" fontWeight="bold">
              HIGH-WATER MARK (PUNCAK SALDO TERAKHIR)
            </text>
            <polyline fill="none" stroke="#10B981" strokeWidth="2.5" points="28,84 110,36 190,74 285,36 385,18" />
            <text x="195" y="94" textAnchor="middle" fill="#FCA5A5" fontSize="8.5" fontFamily="monospace">
              {isId ? 'Masa Pemulihan: FEE $0 (Gratis!)' : 'Recovery Zone: $0 Performance Fee'}
            </text>
            <text x="348" y="54" textAnchor="middle" fill="#6EE7B7" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              {isId ? 'Puncak Baru: Fee 30%' : 'New High: 30% Fee'}
            </text>
          </svg>
        </div>
      );

    case 'MACRO_INTERMARKET':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 122" className="w-full h-auto" role="img" aria-label="US10Y Yield vs DXY vs Gold Intermarket Flow">
            <rect x="12" y="20" width="118" height="82" rx="10" fill="#211B2A" stroke="#EF4444" />
            <text x="71" y="46" textAnchor="middle" fill="#EF4444" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              US10Y YIELD ↑
            </text>
            <text x="71" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              {isId ? 'Imbal Hasil Naik' : 'Real Yields Rise'}
            </text>
            <text x="71" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="8">
              The Fed Tightens
            </text>
            <path d="M134 61 L152 61" stroke="#D6A937" strokeWidth="2" />
            <rect x="156" y="20" width="112" height="82" rx="10" fill="#211B2A" stroke="#D6A937" />
            <text x="212" y="46" textAnchor="middle" fill="#D6A937" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              DXY (USD) ↑
            </text>
            <text x="212" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              {isId ? 'Modal Masuk Dolar' : 'Capital Favors USD'}
            </text>
            <text x="212" y="84" textAnchor="middle" fill="#F3E5AB" fontSize="8">
              Liquidity Flows
            </text>
            <path d="M272 61 L290 61" stroke="#D6A937" strokeWidth="2" />
            <rect x="294" y="20" width="114" height="82" rx="10" fill="#0F2620" stroke="#10B981" />
            <text x="351" y="46" textAnchor="middle" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              XAUUSD PRESSURE
            </text>
            <text x="351" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              {isId ? 'Emas Reprice / Turun' : 'Gold Inverse Test'}
            </text>
            <text x="351" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="8">
              Inverse Correlation
            </text>
          </svg>
        </div>
      );

    case 'TECHNICAL_HIST_MA':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Price Action vs Lagging Indicator Comparison">
            <polyline fill="none" stroke="#10B981" strokeWidth="2.5" points="20,92 65,78 95,86 150,42 195,58 250,24 310,36 390,18" />
            <path d="M20 96 Q140 88 260 60 T395 44" fill="none" stroke="#B99AE8" strokeWidth="2" strokeDasharray="5 3" />
            <text x="26" y="24" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              GREEN = RAW PRICE (OHLC / HH-HL STRUCTURE, REAL TIME)
            </text>
            <text x="26" y="106" fill="#B99AE8" fontSize="9" fontFamily="monospace" fontWeight="bold">
              PURPLE DASHED = MOVING AVERAGE / RSI (LAGGING AVERAGE)
            </text>
          </svg>
        </div>
      );

    case 'WYCKOFF_CYCLE':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 126" className="w-full h-auto" role="img" aria-label="Wyckoff Accumulation Spring Schematic">
            <rect x="44" y="42" width="236" height="44" fill="rgba(214,169,55,0.08)" stroke="#D6A937" strokeDasharray="4 3" />
            <polyline fill="none" stroke="#B99AE8" strokeWidth="2.2" points="20,24 60,82 95,46 135,84 170,48 205,108 242,46 270,34 390,16" />
            <circle cx="205" cy="108" r="5" fill="#EF4444" />
            <text x="205" y="120" textAnchor="middle" fill="#EF4444" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              PHASE C: SPRING (TEST STOP POOL)
            </text>
            <text x="162" y="34" textAnchor="middle" fill="#D6A937" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              COMPOSITE MAN ACCUMULATION RANGE
            </text>
            <text x="342" y="38" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              {'PHASE D-E MARKUP ->'}
            </text>
          </svg>
        </div>
      );

    case 'ELLIOTT_FIBO':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 126" className="w-full h-auto" role="img" aria-label="Elliott Wave 5 Impulse + 3 Correction + Fib 61.8">
            <polyline fill="none" stroke="#10B981" strokeWidth="2.4" points="22,100 68,66 96,86 172,22 204,48 256,16 300,56 326,38 386,74" />
            <line x1="22" y1="84" x2="260" y2="84" stroke="#D6A937" strokeDasharray="3 3" strokeWidth="1.2" />
            <text x="68" y="58" fill="#F3EFF8" fontSize="9" fontWeight="bold">1</text>
            <text x="96" y="98" fill="#D6A937" fontSize="9" fontWeight="bold">2 (61.8%)</text>
            <text x="172" y="16" fill="#10B981" fontSize="9" fontWeight="bold">3 (Strongest)</text>
            <text x="204" y="60" fill="#F3EFF8" fontSize="9" fontWeight="bold">4</text>
            <text x="256" y="12" fill="#D6A937" fontSize="9" fontWeight="bold">5</text>
            <text x="342" y="88" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">A-B-C CORRECTIVE</text>
          </svg>
        </div>
      );

    case 'AUCTION_PROFILE':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 122" className="w-full h-auto" role="img" aria-label="Volume Profile POC VAH VAL Schematic">
            <rect x="28" y="34" width="160" height="54" fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeDasharray="4 3" />
            <rect x="28" y="54" width="235" height="12" fill="#D6A937" rx="3" />
            <rect x="28" y="38" width="130" height="10" fill="#B99AE8" rx="3" opacity="0.7" />
            <rect x="28" y="72" width="142" height="10" fill="#B99AE8" rx="3" opacity="0.7" />
            <rect x="28" y="20" width="48" height="8" fill="#6E657B" rx="2" />
            <rect x="28" y="92" width="54" height="8" fill="#6E657B" rx="2" />
            <text x="275" y="64" fill="#D6A937" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              POC (FAIR VALUE PEAK)
            </text>
            <text x="200" y="34" fill="#10B981" fontSize="8.5" fontFamily="monospace">
              VAH (70% Value Ceiling)
            </text>
            <text x="200" y="96" fill="#10B981" fontSize="8.5" fontFamily="monospace">
              VAL (70% Value Floor)
            </text>
          </svg>
        </div>
      );

    case 'BEHAVIORAL_LOOP':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Kahneman Behavioral Finance Process vs Outcome">
            <rect x="16" y="18" width="182" height="84" rx="10" fill="#2A1218" stroke="#EF4444" />
            <text x="107" y="42" textAnchor="middle" fill="#EF4444" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              AMYGDALA HIJACK (TILT)
            </text>
            <text x="107" y="64" textAnchor="middle" fill="#F3EFF8" fontSize="9.5" fontWeight="bold">
              Loss Feels 2.2x Worse!
            </text>
            <text x="107" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="8">
              {'Kahneman Prospect Theory -> Revenge'}
            </text>
            <rect x="222" y="18" width="182" height="84" rx="10" fill="#0F2620" stroke="#10B981" />
            <text x="313" y="42" textAnchor="middle" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              JGS PROCESS JOURNAL
            </text>
            <text x="313" y="64" textAnchor="middle" fill="#F3EFF8" fontSize="9.5" fontWeight="bold">
              Pre-Entry SOP Checklist
            </text>
            <text x="313" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="8">
              Process Score Separate From Luck
            </text>
          </svg>
        </div>
      );

    case 'FOREX_GOLD_BASICS':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Five Financial Asset Classes Schematic">
            <rect x="12" y="18" width="90" height="84" rx="8" fill="#211B2A" stroke="#D6A937" />
            <text x="57" y="46" textAnchor="middle" fill="#D6A937" fontSize="9" fontFamily="monospace" fontWeight="bold">
              FOREX (FX)
            </text>
            <text x="57" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              EURUSD • USDJPY
            </text>
            <text x="57" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="7.5">
              $7.5T / Hari
            </text>

            <rect x="114" y="18" width="94" height="84" rx="8" fill="#132924" stroke="#10B981" />
            <text x="161" y="46" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              COMMODITIES
            </text>
            <text x="161" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              XAUUSD • Oil
            </text>
            <text x="161" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="7.5">
              1 Troy Oz Gold
            </text>

            <rect x="220" y="18" width="90" height="84" rx="8" fill="#211B2A" stroke="#B99AE8" />
            <text x="265" y="46" textAnchor="middle" fill="#B99AE8" fontSize="9" fontFamily="monospace" fontWeight="bold">
              INDICES
            </text>
            <text x="265" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              NDX • SPX500
            </text>
            <text x="265" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="7.5">
              Equity Benchmarks
            </text>

            <rect x="322" y="18" width="86" height="84" rx="8" fill="#211B2A" stroke="#6E657B" />
            <text x="365" y="46" textAnchor="middle" fill="#F3E5AB" fontSize="9" fontFamily="monospace" fontWeight="bold">
              DERIVATIVES
            </text>
            <text x="365" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Futures / CFD
            </text>
            <text x="365" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="7.5">
              Two-Way Pricing
            </text>
          </svg>
        </div>
      );

    case 'DRAWDOWN_SHIELD':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Nonlinear Drawdown Recovery Math Curve">
            <line x1="34" y1="96" x2="392" y2="96" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
            <path d="M 38 88 Q 160 80, 260 54 T 386 14" fill="none" stroke="#EF4444" strokeWidth="2.5" />
            <circle cx="115" cy="83" r="4.5" fill="#10B981" />
            <text x="115" y="72" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              -10% =&gt; +11.1%
            </text>
            <circle cx="265" cy="53" r="4.5" fill="#D6A937" />
            <text x="245" y="42" textAnchor="middle" fill="#D6A937" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              -50% =&gt; +100%
            </text>
            <circle cx="366" cy="20" r="4.5" fill="#EF4444" />
            <text x="342" y="12" textAnchor="end" fill="#FCA5A5" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              -90% =&gt; +900% RUIN
            </text>
          </svg>
        </div>
      );

    case 'MT5_BUTTONS':
    case 'SOP_CHECKLIST':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="MT5 Order Ticket Anatomy">
            <rect x="16" y="18" width="122" height="84" rx="8" fill="#120E18" stroke="#3B82F6" />
            <text x="77" y="46" textAnchor="middle" fill="#93C5FD" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              ORDER TICKET
            </text>
            <text x="77" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Market vs Limit
            </text>
            <text x="77" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="8">
              Symbol: XAUUSDc
            </text>

            <rect x="152" y="18" width="122" height="84" rx="8" fill="#2A1218" stroke="#EF4444" />
            <text x="213" y="46" textAnchor="middle" fill="#FCA5A5" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              HARD STOP LOSS
            </text>
            <text x="213" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              1% = 10 USC Cap
            </text>
            <text x="213" y="84" textAnchor="middle" fill="#FCA5A5" fontSize="8">
              Floor Step Rounding
            </text>

            <rect x="288" y="18" width="116" height="84" rx="8" fill="#0F2620" stroke="#10B981" />
            <text x="346" y="46" textAnchor="middle" fill="#6EE7B7" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              DAILY BREAKER
            </text>
            <text x="346" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Max -3% (-30 USC)
            </text>
            <text x="346" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="8">
              Terminal Shutdown
            </text>
          </svg>
        </div>
      );

    case 'FAILED_AUTOPSY':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 120" className="w-full h-auto" role="img" aria-label="Setup Failure Autopsy Diagnostic Matrix">
            <rect x="14" y="18" width="120" height="84" rx="8" fill="#211B2A" stroke="#EF4444" />
            <text x="74" y="46" textAnchor="middle" fill="#FCA5A5" fontSize="9" fontFamily="monospace" fontWeight="bold">
              HTF CONFLICT
            </text>
            <text x="74" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Long vs Daily Bear
            </text>
            <text x="74" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="7.5">
              Counter-trend trap
            </text>

            <rect x="150" y="18" width="120" height="84" rx="8" fill="#211B2A" stroke="#D6A937" />
            <text x="210" y="46" textAnchor="middle" fill="#D6A937" fontSize="9" fontFamily="monospace" fontWeight="bold">
              INDUCEMENT
            </text>
            <text x="210" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Internal vs Major Pool
            </text>
            <text x="210" y="84" textAnchor="middle" fill="#B8AFC7" fontSize="7.5">
              Premature Entry
            </text>

            <rect x="286" y="18" width="120" height="84" rx="8" fill="#0F2620" stroke="#10B981" />
            <text x="346" y="46" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
              AUTOPSY LOG
            </text>
            <text x="346" y="66" textAnchor="middle" fill="#F3EFF8" fontSize="8.5">
              Tag Root Defect
            </text>
            <text x="346" y="84" textAnchor="middle" fill="#6EE7B7" fontSize="7.5">
              Preserve 99% Equity
            </text>
          </svg>
        </div>
      );

    case 'MARTINGALE_VS_SL':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 116" className="w-full h-auto" role="img" aria-label="Martingale blowup vs Fixed Hard SL">
            <polyline fill="none" stroke="#10B981" strokeWidth="2.5" points="20,66 100,72 180,52 260,58 340,34 400,26" />
            <polyline fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 3" points="20,66 100,56 180,50 260,68 320,104 390,108" />
            <text x="24" y="24" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              GREEN = JGS FIXED 1% SL (+Equity Safe)
            </text>
            <text x="24" y="102" fill="#EF4444" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              RED = MARTINGALE NO SL (-100% STOP OUT)
            </text>
          </svg>
        </div>
      );

    case 'ENTRY_CONFIRMATION_PIPELINE':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 148" className="w-full h-auto" role="img" aria-label="3-Step Valid Entry Confirmation: Sweep, Displacement MSS, and FVG Retracement">
            <line x1="16" y1="112" x2="404" y2="112" stroke="rgba(255,255,255,0.14)" strokeDasharray="4 4" />
            <text x="20" y="106" fill="#94A3B8" fontSize="8" fontFamily="monospace">ASIA LOW / SSL POOL</text>
            {/* Sweep + Impulse + FVG Retrace + Rally */}
            <polyline fill="none" stroke="#B99AE8" strokeWidth="2.4" points="20,76 58,96 86,80 116,130 142,84 186,32 232,68 310,20 398,14" />
            {/* Stop Hunt circle */}
            <circle cx="116" cy="130" r="5" fill="#EF4444" />
            <text x="116" y="143" textAnchor="middle" fill="#FCA5A5" fontSize="8" fontFamily="monospace" fontWeight="bold">
              1. WICK SWEEP (NO CLOSE)
            </text>
            {/* MSS line */}
            <line x1="86" y1="68" x2="210" y2="68" stroke="#D6A937" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="154" cy="68" r="3.5" fill="#D6A937" />
            <text x="150" y="20" textAnchor="middle" fill="#D6A937" fontSize="8" fontFamily="monospace" fontWeight="bold">
              2. MSS BODY CLOSE
            </text>
            {/* FVG box */}
            <rect x="174" y="60" width="96" height="18" rx="3" fill="rgba(16,185,129,0.22)" stroke="#10B981" />
            <text x="222" y="72" textAnchor="middle" fill="#6EE7B7" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
              3. FVG LIMIT ENTRY
            </text>
            {/* TP line */}
            <line x1="286" y1="22" x2="404" y2="22" stroke="#10B981" strokeDasharray="4 2" />
            <text x="345" y="16" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace" fontWeight="bold">
              TP (1:2.5 - 1:3 R:R)
            </text>
            <line x1="174" y1="133" x2="290" y2="133" stroke="#EF4444" strokeDasharray="3 2" />
            <text x="234" y="144" textAnchor="middle" fill="#FCA5A5" fontSize="7.5" fontFamily="monospace">
              SL OUTSIDE WICK (1% MAX)
            </text>
          </svg>
        </div>
      );

    case 'EMPTY_CHART_SOP_FLOW':
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 132" className="w-full h-auto" role="img" aria-label="Empty Chart to Profit Entry 4-Step Execution SOP">
            <rect x="10" y="18" width="92" height="92" rx="8" fill="#1A1525" stroke="#B99AE8" />
            <text x="56" y="42" textAnchor="middle" fill="#B99AE8" fontSize="8.5" fontFamily="monospace" fontWeight="bold">STEP 1: H1</text>
            <text x="56" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="8">Tandakan Asia</text>
            <text x="56" y="76" textAnchor="middle" fill="#F3EFF8" fontSize="8">High & Low</text>
            <text x="56" y="96" textAnchor="middle" fill="#94A3B8" fontSize="7">Kompas Arah</text>

            <path d="M104 64 L112 64" stroke="#D6A937" strokeWidth="2" />
            <rect x="114" y="18" width="92" height="92" rx="8" fill="#1A1525" stroke="#EF4444" />
            <text x="160" y="42" textAnchor="middle" fill="#FCA5A5" fontSize="8.5" fontFamily="monospace" fontWeight="bold">STEP 2: TRAP</text>
            <text x="160" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="8">Tunggu Sapuan</text>
            <text x="160" y="76" textAnchor="middle" fill="#F3EFF8" fontSize="8">Killzone M15</text>
            <text x="160" y="96" textAnchor="middle" fill="#FCA5A5" fontSize="7">Sabar Tidak Kejar</text>

            <path d="M208 64 L216 64" stroke="#D6A937" strokeWidth="2" />
            <rect x="218" y="18" width="92" height="92" rx="8" fill="#1A1525" stroke="#D6A937" />
            <text x="264" y="42" textAnchor="middle" fill="#D6A937" fontSize="8.5" fontFamily="monospace" fontWeight="bold">STEP 3: M5</text>
            <text x="264" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="8">Cek MSS + FVG</text>
            <text x="264" y="76" textAnchor="middle" fill="#F3EFF8" fontSize="8">+ Cek Berita</text>
            <text x="264" y="96" textAnchor="middle" fill="#F3E5AB" fontSize="7">Valid Confirmation</text>

            <path d="M312 64 L320 64" stroke="#10B981" strokeWidth="2" />
            <rect x="322" y="18" width="88" height="92" rx="8" fill="#0F2620" stroke="#10B981" />
            <text x="366" y="42" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">STEP 4: MT5</text>
            <text x="366" y="62" textAnchor="middle" fill="#F3EFF8" fontSize="8">Hitung Cent Lot</text>
            <text x="366" y="76" textAnchor="middle" fill="#F3EFF8" fontSize="8">Pasang SL & TP</text>
            <text x="366" y="96" textAnchor="middle" fill="#6EE7B7" fontSize="7">1% Shield Active</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="rounded-xl p-4 jgs-chart-frame border">
          <svg viewBox="0 0 420 118" className="w-full h-auto" role="img" aria-label="Institutional Structure and Risk Symmetry Schematic">
            <line x1="20" y1="84" x2="395" y2="84" stroke="rgba(255,255,255,0.14)" strokeDasharray="4 4" />
            <polyline fill="none" stroke="#B99AE8" strokeWidth="2.2" points="24,52 80,68 124,96 176,42 232,64 316,26 392,16" />
            <rect x="196" y="54" width="90" height="16" rx="3" fill="rgba(214,169,55,0.22)" stroke="#D6A937" />
            <text x="241" y="65" textAnchor="middle" fill="#F3E5AB" fontSize="8" fontFamily="monospace" fontWeight="bold">
              FAIR VALUE ENTRY
            </text>
            <circle cx="124" cy="96" r="4.5" fill="#EF4444" />
            <text x="124" y="110" textAnchor="middle" fill="#FCA5A5" fontSize="8" fontFamily="monospace" fontWeight="bold">
              LIQUIDITY SWEEP
            </text>
            <text x="330" y="42" textAnchor="middle" fill="#10B981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              1% RISK • 1:2.5 R:R
            </text>
          </svg>
        </div>
      );
  }
}

// ============================================================================
// 2. TAB A: REALISTIC 40-CANDLE VISUAL MT5 COCKPIT & LIQUIDITY SIMULATOR
// ============================================================================

interface SimCandle {
  index: number;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const SANDBOX_CANDLES: SimCandle[] = [
  // Bars 0-21: Asian Consolidation + Pre-NY Equilibrium around $2,640.00 - $2,644.60
  { index: 0, label: '18:55', open: 2642.8, high: 2643.6, low: 2641.9, close: 2642.3 },
  { index: 1, label: '19:00', open: 2642.3, high: 2643.1, low: 2641.2, close: 2641.6 },
  { index: 2, label: '19:05', open: 2641.6, high: 2642.4, low: 2640.4, close: 2640.9 },
  { index: 3, label: '19:10', open: 2640.9, high: 2642.2, low: 2639.9, close: 2641.8 },
  { index: 4, label: '19:15', open: 2641.8, high: 2643.4, low: 2641.4, close: 2643.0 },
  { index: 5, label: '19:20', open: 2643.0, high: 2644.1, low: 2642.5, close: 2643.6 },
  { index: 6, label: '19:25', open: 2643.6, high: 2644.5, low: 2642.8, close: 2643.1 },
  { index: 7, label: '19:30', open: 2643.1, high: 2643.7, low: 2641.8, close: 2642.0 },
  { index: 8, label: '19:35', open: 2642.0, high: 2642.6, low: 2640.6, close: 2641.1 },
  { index: 9, label: '19:40', open: 2641.1, high: 2641.9, low: 2639.8, close: 2640.3 }, // Equal Low 1 (SSL Pool)
  { index: 10, label: '19:45', open: 2640.3, high: 2641.8, low: 2640.1, close: 2641.5 },
  { index: 11, label: '19:50', open: 2641.5, high: 2642.9, low: 2641.0, close: 2642.6 },
  { index: 12, label: '19:55', open: 2642.6, high: 2643.8, low: 2642.1, close: 2643.3 },
  { index: 13, label: '20:00', open: 2643.3, high: 2643.9, low: 2642.4, close: 2642.7 },
  { index: 14, label: '20:05', open: 2642.7, high: 2643.2, low: 2641.5, close: 2641.8 },
  { index: 15, label: '20:10', open: 2641.8, high: 2642.4, low: 2640.5, close: 2640.9 },
  { index: 16, label: '20:15', open: 2640.9, high: 2641.7, low: 2639.8, close: 2640.4 }, // Equal Low 2 (Dense SSL Pool)
  { index: 17, label: '20:20', open: 2640.4, high: 2641.6, low: 2640.0, close: 2641.2 },
  { index: 18, label: '20:25', open: 2641.2, high: 2642.5, low: 2640.9, close: 2642.1 },
  { index: 19, label: '20:30', open: 2642.1, high: 2642.6, low: 2641.1, close: 2641.4 },
  { index: 20, label: '20:35', open: 2641.4, high: 2641.8, low: 2640.2, close: 2640.6 },
  { index: 21, label: '20:40', open: 2640.6, high: 2641.0, low: 2639.7, close: 2639.9 },
  // Bars 22-26: Judas SSL Sweep ($2,638.40) -> Displacement MSS -> Pullback Into Shaded FVG ($2,642.00)
  { index: 22, label: '20:45', open: 2639.9, high: 2640.4, low: 2638.4, close: 2639.4 }, // Sweep SSL wick!
  { index: 23, label: '20:50', open: 2639.4, high: 2641.9, low: 2638.9, close: 2641.5 }, // Reclaim
  { index: 24, label: '20:55', open: 2641.5, high: 2644.8, low: 2641.3, close: 2644.3 }, // Institutional Displacement + FVG!
  { index: 25, label: '21:00', open: 2644.3, high: 2644.6, low: 2642.7, close: 2643.1 },
  { index: 26, label: '21:05', open: 2643.1, high: 2643.4, low: 2641.4, close: 2642.0 }, // DECISION BAR inside FVG!
  // Bars 27-39: 13 Playable Forward Candles Expanding to $2,653.40
  { index: 27, label: '21:10', open: 2642.0, high: 2644.4, low: 2641.5, close: 2644.0 },
  { index: 28, label: '21:15', open: 2644.0, high: 2645.9, low: 2643.4, close: 2645.5 },
  { index: 29, label: '21:20', open: 2645.5, high: 2646.8, low: 2644.9, close: 2646.3 },
  { index: 30, label: '21:25', open: 2646.3, high: 2647.1, low: 2645.2, close: 2645.7 },
  { index: 31, label: '21:30', open: 2645.7, high: 2648.2, low: 2645.5, close: 2647.8 },
  { index: 32, label: '21:35', open: 2647.8, high: 2649.3, low: 2647.2, close: 2648.9 },
  { index: 33, label: '21:40', open: 2648.9, high: 2649.6, low: 2648.1, close: 2648.4 },
  { index: 34, label: '21:45', open: 2648.4, high: 2650.5, low: 2648.0, close: 2650.1 },
  { index: 35, label: '21:50', open: 2650.1, high: 2651.4, low: 2649.5, close: 2651.1 },
  { index: 36, label: '21:55', open: 2651.1, high: 2652.1, low: 2650.6, close: 2651.8 },
  { index: 37, label: '22:00', open: 2651.8, high: 2652.9, low: 2651.2, close: 2652.5 },
  { index: 38, label: '22:05', open: 2652.5, high: 2653.4, low: 2651.9, close: 2653.0 },
  { index: 39, label: '22:10', open: 2653.0, high: 2653.9, low: 2652.4, close: 2653.4 },
];

interface VisualMt5TerminalSimulatorProps {
  locale: 'id' | 'en';
  onJessyReaction?: (mood: JessyMood, note: string) => void;
}

export function VisualMt5TerminalSimulator({
  locale,
  onJessyReaction,
}: VisualMt5TerminalSimulatorProps) {
  const isId = locale === 'id';

  const [contractMode, setContractMode] = useState<'CENT_1OZ' | 'STD_100OZ'>('CENT_1OZ');
  const [lotSize, setLotSize] = useState<number>(0.02);
  const [activeOrder, setActiveOrder] = useState<{
    direction: 'BUY' | 'SELL';
    entryPrice: number;
    slPrice: number;
    tpPrice: number;
  } | null>({
    direction: 'BUY',
    entryPrice: 2642.0,
    slPrice: 2637.0,
    tpPrice: 2652.0,
  });

  // Editable SL/TP before or during active order
  const [slPrice, setSlPrice] = useState<number>(2637.0);
  const [tpPrice, setTpPrice] = useState<number>(2652.0);
  const [visibleBarCount, setVisibleBarCount] = useState<number>(27); // starts showing 0..26 (40-candle sequence)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const decisionBar = SANDBOX_CANDLES[26];
  const currentBar = SANDBOX_CANDLES[Math.min(SANDBOX_CANDLES.length - 1, visibleBarCount - 1)];

  // Multiplier per $1 price move:
  // In 1 oz Cent (XAUUSDc), tickValuePerLot = 100 USC per $1 move * 0.01 = 1 USC per $1 move for 0.01?
  // Wait: contract = 1 oz => 1.00 lot = 1 oz => $1 move = 100 USC ($1.00)! So 0.02 Cent Lot = $0.02 USD = 2 USC per $1 gold move!
  // On a $5 SL drop: 0.02 Cent lot loses 2 USC * 5 = 10 USC (exactly 1.0% of 1,000 USC!!).
  // In 100 oz Standard trap on 1,000 USC ($10): 0.02 lot = 2 oz => $1 move = 200 USC => $5 SL = 1,000 USC (100% MARGIN CALL!).
  const uscPerDollarPerLot = contractMode === 'CENT_1OZ' ? 100 : 10000;
  const startingBalanceUsc = 1000;

  // Auto-play step animation
  useEffect(() => {
    if (!isPlaying) return;
    if (visibleBarCount >= SANDBOX_CANDLES.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisibleBarCount((c) => Math.min(SANDBOX_CANDLES.length, c + 1));
    }, 550);
    return () => clearTimeout(timer);
  }, [isPlaying, visibleBarCount]);

  // Evaluate active trade outcome across visible playback bars (bars >= 5)
  const simulationOutcome = useMemo(() => {
    if (!activeOrder) {
      return {
        status: 'IDLE' as const,
        pnlUsc: 0,
        exitPrice: currentBar.close,
        riskPct: Number(
          (
            (Math.abs(decisionBar.close - slPrice) * lotSize * uscPerDollarPerLot) /
            startingBalanceUsc *
            100
          ).toFixed(1)
        ),
        riskUsc: Number(
          (Math.abs(decisionBar.close - slPrice) * lotSize * uscPerDollarPerLot).toFixed(1)
        ),
      };
    }

    const playbackBars = SANDBOX_CANDLES.slice(27, visibleBarCount);
    const { direction, entryPrice } = activeOrder;

    for (const bar of playbackBars) {
      if (direction === 'BUY') {
        if (bar.low <= slPrice) {
          const pnl = -Math.abs(entryPrice - slPrice) * lotSize * uscPerDollarPerLot;
          return {
            status: 'SL_HIT' as const,
            pnlUsc: Number(pnl.toFixed(1)),
            exitPrice: slPrice,
            riskPct: Number(((Math.abs(pnl) / startingBalanceUsc) * 100).toFixed(1)),
            riskUsc: Number(Math.abs(pnl).toFixed(1)),
          };
        }
        if (bar.high >= tpPrice) {
          const pnl = Math.abs(tpPrice - entryPrice) * lotSize * uscPerDollarPerLot;
          return {
            status: 'TP_HIT' as const,
            pnlUsc: Number(pnl.toFixed(1)),
            exitPrice: tpPrice,
            riskPct: Number(
              (
                (Math.abs(entryPrice - slPrice) * lotSize * uscPerDollarPerLot) /
                startingBalanceUsc *
                100
              ).toFixed(1)
            ),
            riskUsc: Number(
              (Math.abs(entryPrice - slPrice) * lotSize * uscPerDollarPerLot).toFixed(1)
            ),
          };
        }
      } else {
        // SELL
        if (bar.high >= slPrice) {
          const pnl = -Math.abs(slPrice - entryPrice) * lotSize * uscPerDollarPerLot;
          return {
            status: 'SL_HIT' as const,
            pnlUsc: Number(pnl.toFixed(1)),
            exitPrice: slPrice,
            riskPct: Number(((Math.abs(pnl) / startingBalanceUsc) * 100).toFixed(1)),
            riskUsc: Number(Math.abs(pnl).toFixed(1)),
          };
        }
        if (bar.low <= tpPrice) {
          const pnl = Math.abs(entryPrice - tpPrice) * lotSize * uscPerDollarPerLot;
          return {
            status: 'TP_HIT' as const,
            pnlUsc: Number(pnl.toFixed(1)),
            exitPrice: tpPrice,
            riskPct: Number(
              (
                (Math.abs(slPrice - entryPrice) * lotSize * uscPerDollarPerLot) /
                startingBalanceUsc *
                100
              ).toFixed(1)
            ),
            riskUsc: Number(
              (Math.abs(slPrice - entryPrice) * lotSize * uscPerDollarPerLot).toFixed(1)
            ),
          };
        }
      }
    }

    const diff =
      direction === 'BUY'
        ? currentBar.close - entryPrice
        : entryPrice - currentBar.close;
    const floatingPnl = diff * lotSize * uscPerDollarPerLot;
    return {
      status: 'OPEN' as const,
      pnlUsc: Number(floatingPnl.toFixed(1)),
      exitPrice: currentBar.close,
      riskPct: Number(
        (
          (Math.abs(entryPrice - slPrice) * lotSize * uscPerDollarPerLot) /
          startingBalanceUsc *
          100
        ).toFixed(1)
      ),
      riskUsc: Number(
        (Math.abs(entryPrice - slPrice) * lotSize * uscPerDollarPerLot).toFixed(1)
      ),
    };
  }, [activeOrder, visibleBarCount, slPrice, tpPrice, lotSize, uscPerDollarPerLot, currentBar.close, decisionBar.close]);

  const currentEquityUsc = Math.max(0, Number((startingBalanceUsc + simulationOutcome.pnlUsc).toFixed(1)));

  // Trigger Jessy reactive feedback
  function notifyContractSwitch(nextMode: 'CENT_1OZ' | 'STD_100OZ') {
    setContractMode(nextMode);
    if (nextMode === 'STD_100OZ' && onJessyReaction) {
      onJessyReaction(
        'warning',
        isId
          ? 'AWAS! Kamu baru saja menyalakan simbol 100 oz Standard! Pada modal $10 (1.000 USC), jarak SL $5 langsung menyedot -100% akun (Margin Call)!'
          : 'WARNING! You selected the 100 oz Standard contract! On $10 (1,000 USC), a $5 stop immediately wipes -100%!'
      );
    } else if (nextMode === 'CENT_1OZ' && onJessyReaction) {
      onJessyReaction(
        'happy',
        isId
          ? 'Bagus! Simbol XAUUSDc (Kontrak 1 oz Cent) aktif, sekarang risiko SL $5 pakai 0.02 Lot cuma 10 USC (1% modal)!'
          : 'Nice! XAUUSDc (1 oz Cent) selected, now your $5 Stop Loss at 0.02 lot risks just 10 USC (1%)!'
      );
    }
  }

  function handleExecuteOrder(dir: 'BUY' | 'SELL') {
    setVisibleBarCount(27);
    setIsPlaying(false);
    if (dir === 'BUY') {
      const safeSl = slPrice < decisionBar.close ? slPrice : 2637.0;
      const safeTp = tpPrice > decisionBar.close ? tpPrice : 2652.0;
      setSlPrice(safeSl);
      setTpPrice(safeTp);
      setActiveOrder({
        direction: 'BUY',
        entryPrice: decisionBar.close,
        slPrice: safeSl,
        tpPrice: safeTp,
      });
    } else {
      const safeSl = slPrice > decisionBar.close ? slPrice : 2647.0;
      const safeTp = tpPrice < decisionBar.close ? tpPrice : 2634.0;
      setSlPrice(safeSl);
      setTpPrice(safeTp);
      setActiveOrder({
        direction: 'SELL',
        entryPrice: decisionBar.close,
        slPrice: safeSl,
        tpPrice: safeTp,
      });
    }
    if (onJessyReaction) {
      if (contractMode === 'STD_100OZ' || simulationOutcome.riskPct > 3) {
        onJessyReaction(
          'warning',
          isId
            ? 'Hati-hati! Risikonya di atas 3% modal. Kecilkan Lot atau pastikan memakai XAUUSDc 1 oz!'
            : 'Careful! Trade risk exceeds 3%. Reduce lot size or ensure 1 oz XAUUSDc!'
        );
      } else {
        onJessyReaction(
          'happy',
          isId
            ? `Order ${dir} terkirim! Sekarang klik "Jalankan Candle Berikutnya" untuk melihat pergerakan candle!`
            : `${dir} order filled! Press "Play Next Candles" to step through live price action!`
        );
      }
    }
  }

  function applySweepPreset() {
    setSlPrice(2637.5); // Safe behind Sweep Low $2,638.50!
    setTpPrice(2651.0); // Clean 1:2 RRR (+2.0R)
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, direction: 'BUY', slPrice: 2637.5, tpPrice: 2651.0 });
    }
    if (onJessyReaction) {
      onJessyReaction(
        'explaining',
        isId
          ? 'Pas banget! Garis merah SL ($2,637.50) diletakkan aman di bawah ekor sapuan SSL ($2,638.50), dengan target TP 1:2 RRR di $2,651.00!'
          : 'Clean ICT placement! Red SL sits behind the Sweep Low wick ($2,637.50) targeting 1:2 RRR at $2,651.00!'
      );
    }
  }

  // Price bounds for Full-Width 40-Candle Interactive SVG (920x380)
  const minP = 2634;
  const maxP = 2655;
  const mapY = (p: number) => 338 - ((Math.max(minP, Math.min(maxP, p)) - minP) / (maxP - minP)) * 305;
  const visibleCandles = SANDBOX_CANDLES.slice(0, visibleBarCount);

  return (
    <div className="space-y-4">
      {/* MT5 Account Header Bar */}
      <div className="rounded-xl border border-[#D6A937]/30 bg-[#0E0B14] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2 font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[#F3E5AB]">Exness-MT5Trial / Cent</span>
          <span className="text-[#8E84A4]">•</span>
          <span className="text-[#F7F4EE]">
            Saldo: <strong className="text-[#D6A937]">{currentEquityUsc.toLocaleString()} USC</strong>{' '}
            (${(currentEquityUsc / 100).toFixed(2)})
          </span>
        </div>

        {/* Contract Switch to teach 1 oz vs 100 oz visually! */}
        <div className="inline-flex rounded-lg bg-[#17131D] p-0.5 border border-white/10">
          <button
            type="button"
            onClick={() => notifyContractSwitch('CENT_1OZ')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
              contractMode === 'CENT_1OZ'
                ? 'bg-[#10B981] text-[#08050E]'
                : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
            }`}
          >
            XAUUSDc (1 oz Cent)
          </button>
          <button
            type="button"
            onClick={() => notifyContractSwitch('STD_100OZ')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all ${
              contractMode === 'STD_100OZ'
                ? 'bg-red-600 text-white'
                : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
            }`}
          >
            XAUUSD (100 oz Trap)
          </button>
        </div>
      </div>

      {/* Warning banner if user tests 100 oz Standard or > 3% risk */}
      {(contractMode === 'STD_100OZ' || simulationOutcome.riskPct > 3) && (
        <div className="rounded-xl border border-red-500/45 bg-red-950/25 px-4 py-2.5 flex items-center gap-2.5 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          <span>
            {contractMode === 'STD_100OZ'
              ? isId
                ? `BAHAYA KONTRAK 100 OZ: Risiko SL saat ini ${simulationOutcome.riskPct}% (${simulationOutcome.riskUsc} USC), akun $10 bisa Margin Call!`
                : `100 OZ CONTRACT TRAP: Current SL risk is ${simulationOutcome.riskPct}% (${simulationOutcome.riskUsc} USC), $10 Margin Call risk!`
              : isId
              ? `Peringatan JGS: Risiko ${simulationOutcome.riskPct}% melebihi batas aman 1%–2%. Turunkan Lot ke 0.02!`
              : `JGS Alert: ${simulationOutcome.riskPct}% risk exceeds safe 1%–2% budget. Lower Lot to 0.02!`}
          </span>
        </div>
      )}

      {/* Interactive 280px Candlestick Chart with Live Entry / SL / TP Lines */}
      <div className="rounded-2xl border border-white/10 jgs-chart-frame p-3 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-[10px] font-mono">
          <span className="text-[#BEB6CE]">
            {contractMode === 'CENT_1OZ' ? 'XAUUSDc • M5' : 'XAUUSD (100 oz) • M5'} • Price:{' '}
            <strong className="text-[#F3E5AB]">${currentBar.close.toFixed(2)}</strong>
          </span>
          <span
            className={`font-bold px-2 py-0.5 rounded ${
              simulationOutcome.pnlUsc >= 0
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            {simulationOutcome.status === 'TP_HIT'
              ? `TP HIT! +${simulationOutcome.pnlUsc} USC`
              : simulationOutcome.status === 'SL_HIT'
              ? `SL HIT! ${simulationOutcome.pnlUsc} USC`
              : `Floating P&L: ${simulationOutcome.pnlUsc >= 0 ? '+' : ''}${simulationOutcome.pnlUsc} USC`}
          </span>
        </div>

        <svg viewBox="0 0 920 380" className="w-full h-[300px] sm:h-[380px] select-none">
          {/* Price Grid Lines */}
          {[2635, 2639, 2642, 2646, 2650, 2654].map((price) => {
            const y = mapY(price);
            return (
              <g key={price}>
                <line x1="28" y1={y} x2="848" y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <text x="856" y={y + 4} fill="#8E84A4" fontSize="10" fontFamily="monospace">
                  ${price}
                </text>
              </g>
            );
          })}

          {/* Highlighted BSL / SSL Liquidity Pool & Sweep Zone */}
          <line
            x1="28"
            y1={mapY(2639.8)}
            x2="580"
            y2={mapY(2639.8)}
            stroke="#EF4444"
            strokeDasharray="5 4"
            strokeWidth="1.4"
            opacity="0.7"
          />
          <rect
            x="448"
            y={mapY(2639.9)}
            width="64"
            height={Math.max(12, mapY(2638.2) - mapY(2639.9))}
            rx="4"
            fill="rgba(239, 68, 68, 0.16)"
            stroke="#EF4444"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <text x="195" y={mapY(2639.8) - 6} fill="#FCA5A5" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
            RETAIL EQUAL LOWS (SSL STOP POOL)
          </text>
          <text x="480" y={mapY(2638.2) + 12} textAnchor="middle" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
            SSL LIQUIDITY SWEEP
          </text>

          {/* Shaded ICT Fair Value Gap (FVG Zone $2,641.20 - $2,642.50) */}
          <rect
            x="512"
            y={mapY(2642.5)}
            width="324"
            height={Math.max(12, mapY(2641.2) - mapY(2642.5))}
            fill="rgba(214, 169, 55, 0.16)"
            stroke="rgba(214, 169, 55, 0.45)"
            strokeWidth="1"
          />
          <text x="520" y={mapY(2642.5) + 13} fill="#F3E5AB" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
            FAIR VALUE GAP (FVG ENTRY ZONE)
          </text>

          {/* 40-Candle XAUUSDc Sequence */}
          {visibleCandles.map((c, idx) => {
            const x = 44 + idx * 20;
            const isBull = c.close >= c.open;
            const color = isBull ? '#10B981' : '#EF4444';
            const yHigh = mapY(c.high);
            const yLow = mapY(c.low);
            const yTop = mapY(Math.max(c.open, c.close));
            const yBot = mapY(Math.min(c.open, c.close));
            return (
              <g key={c.index}>
                <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={color} strokeWidth="1.8" />
                <rect
                  x={x - 5}
                  y={yTop}
                  width="10"
                  height={Math.max(3, yBot - yTop)}
                  rx="1.5"
                  fill={color}
                />
                {idx % 4 === 0 && (
                  <text x={x} y="366" textAnchor="middle" fill="#8E84A4" fontSize="9" fontFamily="monospace">
                    {c.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Adjustable Entry Line (Blue) */}
          {activeOrder && (
            <g>
              <line
                x1="28"
                y1={mapY(activeOrder.entryPrice)}
                x2="848"
                y2={mapY(activeOrder.entryPrice)}
                stroke="#3B82F6"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />
              <rect x="34" y={mapY(activeOrder.entryPrice) - 11} width="112" height="18" rx="4" fill="#1D4ED8" />
              <text x="90" y={mapY(activeOrder.entryPrice) + 2} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                {activeOrder.direction} ${activeOrder.entryPrice.toFixed(1)}
              </text>
            </g>
          )}

          {/* Adjustable Stop Loss Line (Red) */}
          <g>
            <line
              x1="28"
              y1={mapY(slPrice)}
              x2="848"
              y2={mapY(slPrice)}
              stroke="#EF4444"
              strokeWidth="2.2"
            />
            <rect x="698" y={mapY(slPrice) - 11} width="142" height="18" rx="4" fill="#B91C1C" />
            <text x="769" y={mapY(slPrice) + 2} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              SL ${slPrice.toFixed(1)} (-{simulationOutcome.riskPct}%)
            </text>
          </g>

          {/* Adjustable Take Profit Line (Green) */}
          <g>
            <line
              x1="28"
              y1={mapY(tpPrice)}
              x2="848"
              y2={mapY(tpPrice)}
              stroke="#10B981"
              strokeWidth="2.2"
            />
            <rect x="698" y={mapY(tpPrice) - 11} width="142" height="18" rx="4" fill="#047857" />
            <text x="769" y={mapY(tpPrice) + 2} textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              TP ${tpPrice.toFixed(1)}
            </text>
          </g>
        </svg>
      </div>

      {/* Play Next Candles + SL/TP Preset Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={visibleBarCount >= SANDBOX_CANDLES.length}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#D6A937] px-3.5 py-2 font-mono text-xs font-bold text-[#17131D] hover:bg-[#F3E5AB] disabled:opacity-40 transition-all active:scale-[0.98]"
          >
            <Play className="w-3.5 h-3.5" />
            <span>
              {isPlaying
                ? isId
                  ? 'Berjalan...'
                  : 'Playing...'
                : isId
                ? 'Play Next Candle'
                : 'Play Next Candle'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setVisibleBarCount((c) => Math.min(SANDBOX_CANDLES.length, c + 1))}
            disabled={visibleBarCount >= SANDBOX_CANDLES.length}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-[#0E0B14] px-3 py-2 font-mono text-xs text-[#F7F4EE] hover:border-[#D6A937] disabled:opacity-40"
          >
            <StepForward className="w-3.5 h-3.5 text-[#D6A937]" />
            <span>+1 Bar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setVisibleBarCount(27);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-[#0E0B14] px-3 py-2 font-mono text-xs text-[#BEB6CE] hover:text-[#F7F4EE]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <button
          type="button"
          onClick={applySweepPreset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#D6A937]/45 bg-[#D6A937]/10 px-3 py-2 font-mono text-[11px] font-semibold text-[#D6A937] hover:bg-[#D6A937]/20 transition-all"
        >
          <Target className="w-3.5 h-3.5" />
          <span>{isId ? 'Preset SL Sweep & TP 1:2 RRR' : 'Preset Sweep SL & 1:2 TP'}</span>
        </button>
      </div>

      {/* Sliders for Drag/Adjusting Lot, SL Line, and TP Line */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-white/10 bg-[#0E0B14] p-4">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px] text-[#BEB6CE]">
            <span>{isId ? 'Lot Cent' : 'Lot Size'}</span>
            <strong className="text-[#D6A937]">{lotSize.toFixed(2)} lot</strong>
          </div>
          <input
            type="range"
            min={0.01}
            max={0.1}
            step={0.01}
            value={lotSize}
            onChange={(e) => setLotSize(Number(e.target.value))}
            className="w-full accent-[#D6A937] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px] text-[#BEB6CE]">
            <span>{isId ? 'Garis SL Merah' : 'Red SL Line'}</span>
            <strong className="text-red-400">${slPrice.toFixed(1)}</strong>
          </div>
          <input
            type="range"
            min={2634}
            max={2648}
            step={0.5}
            value={slPrice}
            onChange={(e) => setSlPrice(Number(e.target.value))}
            className="w-full accent-[#EF4444] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[10px] text-[#BEB6CE]">
            <span>{isId ? 'Garis TP Hijau' : 'Green TP Line'}</span>
            <strong className="text-emerald-400">${tpPrice.toFixed(1)}</strong>
          </div>
          <input
            type="range"
            min={2634}
            max={2654}
            step={0.5}
            value={tpPrice}
            onChange={(e) => setTpPrice(Number(e.target.value))}
            className="w-full accent-[#10B981] cursor-pointer"
          />
        </div>
      </div>

      {/* Genuine MT5 Buy / Sell Execution Ticket Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleExecuteOrder('SELL')}
          className="rounded-xl bg-red-600 hover:bg-red-500 text-white py-3 px-4 font-mono text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all active:scale-[0.98]"
        >
          <span>SELL BY MARKET</span>
          <span className="text-[10px] opacity-85 font-normal">Bid $2,641.80 • Lot {lotSize.toFixed(2)}</span>
        </button>

        <button
          type="button"
          onClick={() => handleExecuteOrder('BUY')}
          className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 font-mono text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all active:scale-[0.98]"
        >
          <span>BUY BY MARKET</span>
          <span className="text-[10px] opacity-85 font-normal">Ask $2,642.05 • Lot {lotSize.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 3. TAB B: LIVE REAL-MARKET TRADINGVIEW CHART (XAUUSD) + MISSIONS
// ============================================================================

export function LiveTradingViewXauusdTab({
  locale,
  defaultSymbol = 'OANDA:XAUUSD',
}: {
  locale: 'id' | 'en';
  defaultSymbol?: string;
}) {
  const isId = locale === 'id';
  const tvCalendarRef = useRef<HTMLDivElement | null>(null);
  const [themeMode, setThemeMode] = useState<JgsThemeMode>('dark');
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [activeFeed, setActiveFeed] = useState<string>(defaultSymbol);

  useEffect(() => {
    setActiveFeed(defaultSymbol);
  }, [defaultSymbol]);

  useEffect(() => {
    setThemeMode(loadThemeMode());
    const syncTheme = () => setThemeMode(loadThemeMode());
    window.addEventListener('jgs-theme-change', syncTheme);
    return () => window.removeEventListener('jgs-theme-change', syncTheme);
  }, []);

  // Load Economic Calendar widget script cleanly & force injected iframe to full 600px height
  useEffect(() => {
    if (activeFeed !== 'ECONOMIC_CALENDAR') return;
    const container = tvCalendarRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '600px';
    widgetDiv.style.minHeight = '600px';
    container.appendChild(widgetDiv);

    const enforceIframeHeight = () => {
      const iframe = container.querySelector('iframe');
      if (iframe) {
        iframe.setAttribute('height', '600');
        iframe.setAttribute('width', '100%');
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.minHeight = '600px';
        iframe.style.display = 'block';
        iframe.style.border = '0';
      }
    };

    const observer = new MutationObserver(enforceIframeHeight);
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.type = 'text/javascript';
    script.async = true;
    script.text = JSON.stringify({
      width: '100%',
      height: '600',
      colorTheme: themeMode === 'light' ? 'light' : 'dark',
      isTransparent: false,
      locale: isId ? 'id' : 'en',
      importanceFilter: '0,1',
      currencyFilter: 'USD,EUR,GBP,JPY',
    });
    container.appendChild(script);

    return () => observer.disconnect();
  }, [themeMode, isId, activeFeed]);

  const feedOptions = [
    { key: 'OANDA:XAUUSD', labelId: 'Emas XAUUSD', labelEn: 'Gold XAUUSD' },
    { key: 'FX:EURUSD', labelId: 'Forex EURUSD', labelEn: 'FX EURUSD' },
    { key: 'NASDAQ:NDX', labelId: 'NASDAQ (NDX)', labelEn: 'NASDAQ (NDX)' },
    { key: 'BITSTAMP:BTCUSD', labelId: 'Bitcoin BTCUSD', labelEn: 'Bitcoin BTCUSD' },
    { key: 'TVC:US10Y', labelId: 'Obligasi US10Y', labelEn: 'US10Y Yield' },
    { key: 'ECONOMIC_CALENDAR', labelId: 'Kalender Ekonomi Live', labelEn: 'Live Economic Calendar' },
  ];

  const missions = [
    {
      id: 'm1',
      labelId: 'Misi 1: Cek waktu bawah (WIB), apakah harga sedang di Asia, London (14–17 WIB), atau New York (19–22 WIB)?',
      labelEn: 'Mission 1: Inspect lower clock, is market inside Asia, London, or New York Killzone?',
    },
    {
      id: 'm2',
      labelId: 'Misi 2: Gunakan toolbar kiri TradingView untuk menandai titik High (BSL) & Low (SSL) terdekat.',
      labelEn: 'Mission 2: Mark the nearest swing High (BSL) and Low (SSL) using left drawing tools.',
    },
    {
      id: 'm3',
      labelId: 'Misi 3: Cek apakah ada celah FVG / struktur harga atau berita USD merah di Kalender Ekonomi Live!',
      labelEn: 'Mission 3: Check for fresh FVG imbalances or high-impact releases on Live Calendar!',
    },
  ];

  const toggleMission = (id: string) => {
    setCompletedMissions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const tradingViewExternalUrl =
    activeFeed === 'ECONOMIC_CALENDAR'
      ? 'https://www.tradingview.com/economic-calendar/'
      : `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(activeFeed)}`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#D6A937]/35 bg-[#0E0B14] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isId ? 'PILIH PASAR LIVE / KALENDER EKONOMI (FULL 600PX)' : 'CHOOSE LIVE MARKET / ECONOMIC CALENDAR (600PX)'}
          </span>
          <span className="font-mono text-[10px] text-[#10B981]">
            {completedMissions.length} / 3 {isId ? 'MISI SELESAI' : 'DONE'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {feedOptions.map((feed) => {
            const isSelected = activeFeed === feed.key;
            return (
              <button
                key={feed.key}
                type="button"
                onClick={() => setActiveFeed(feed.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isSelected
                    ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                    : 'bg-[#17131D] text-[#BEB6CE] border-white/10 hover:border-[#D6A937]/50'
                }`}
              >
                {isId ? feed.labelId : feed.labelEn}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 pt-1">
          {missions.map((m) => {
            const done = completedMissions.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMission(m.id)}
                className={`w-full text-left rounded-lg border px-3 py-2 text-xs flex items-start gap-2 transition-all ${
                  done
                    ? 'border-[#10B981]/45 bg-[#0F1B1D] text-[#F7F4EE]'
                    : 'border-white/10 bg-[#17131D] text-[#BEB6CE] hover:border-[#D6A937]/40'
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    done ? 'text-[#10B981]' : 'text-[#8E84A4]'
                  }`}
                />
                <span>{isId ? m.labelId : m.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GIANT 600PX FULL-WIDTH Real-Time TradingView Widget, Zero 150px Collapse */}
      {activeFeed === 'ECONOMIC_CALENDAR' ? (
        <div
          ref={tvCalendarRef}
          className="tradingview-widget-container w-full rounded-2xl overflow-hidden border border-[#D6A937]/35 bg-[#17131D] shadow-2xl"
        />
      ) : (
        <TradingViewLiveWidget
          symbol={activeFeed}
          interval="15"
          theme={themeMode === 'light' ? 'light' : 'dark'}
          height={600}
          locale={locale}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)]">
        <span>
          {activeFeed === 'ECONOMIC_CALENDAR'
            ? isId
              ? 'Feed Live: TradingView Kalender Ekonomi High-Impact'
              : 'Live Feed: TradingView High-Impact Economic Calendar'
            : isId
              ? `Data Grafik Real-Time: ${activeFeed} (M15 • Zona Waktu WIB • Height 600px)`
              : `Real-Time Chart Feed: ${activeFeed} (M15 • WIB Timezone • Height 600px)`}
        </span>
        <a
          href={tradingViewExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#D6A937] hover:underline"
        >
          <span>{isId ? 'Buka Layar Penuh di TradingView' : 'Open Full Screen on TradingView'}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
