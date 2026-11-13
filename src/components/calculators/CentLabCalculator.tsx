'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  SupportedCurrency,
  SupportedInstrument,
  AccountDenomination,
  INSTRUMENT_SPECS,
  calculateCentComparison,
  calculateBrokerSymbolPositionSize,
  convertUsdAndUsc
} from '@/lib/math/cent-calculator';
import {
  calculateRiskMetrics,
  calculateRequiredRecoveryGainPercent
} from '@/lib/math/risk-engine';
import {
  saveRiskPreset,
  loadRiskPresets,
  SavedRiskRulePreset
} from '@/lib/storage/jgs-local-store';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { useLocale } from '@/i18n/LocaleContext';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  XOctagon,
  BookmarkPlus,
  ArrowRight,
  ArrowLeftRight,
  ShieldAlert,
  TrendingDown,
  Gauge,
  Sliders,
  Info,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  Sparkles
} from 'lucide-react';

interface BrokerSymbolQuickPreset {
  id: string;
  labelId: string;
  labelEn: string;
  badgeId: string;
  badgeEn: string;
  equity: number;
  accountDenomination: AccountDenomination;
  riskPercentage: number;
  stopLossDistance: number;
  tickSize: number;
  tickValuePerLot: number;
  minimumLot: number;
  maximumLot: number;
  volumeStep: number;
  leverage: number;
  contractUnitsPerLot: number;
  referencePrice: number;
}

const BROKER_SYMBOL_PRESETS: BrokerSymbolQuickPreset[] = [
  {
    id: 'xauusd-cent-1000usc',
    labelId: 'Modal $10 (1.000 USC) • XAUUSD Cent Mikro',
    labelEn: '$10 Capital (1,000 USC) • XAUUSD Micro Cent',
    badgeId: 'AMAN • 0.04 LOT',
    badgeEn: 'SAFE • 0.04 LOT',
    equity: 1000,
    accountDenomination: 'USC',
    riskPercentage: 1.0,
    stopLossDistance: 2.5,
    tickSize: 0.01,
    tickValuePerLot: 1.0,
    minimumLot: 0.01,
    maximumLot: 100.0,
    volumeStep: 0.01,
    leverage: 500,
    contractUnitsPerLot: 1,
    referencePrice: 2650.0
  },
  {
    id: 'xauusd-cent-2500usc',
    labelId: 'Modal $25 (2.500 USC) • XAUUSD Cent Mikro',
    labelEn: '$25 Capital (2,500 USC) • XAUUSD Micro Cent',
    badgeId: 'AMAN • 0.10 LOT',
    badgeEn: 'SAFE • 0.10 LOT',
    equity: 2500,
    accountDenomination: 'USC',
    riskPercentage: 1.0,
    stopLossDistance: 2.5,
    tickSize: 0.01,
    tickValuePerLot: 1.0,
    minimumLot: 0.01,
    maximumLot: 100.0,
    volumeStep: 0.01,
    leverage: 500,
    contractUnitsPerLot: 1,
    referencePrice: 2650.0
  },
  {
    id: 'xauusd-std-25usd-reject',
    labelId: 'Modal $25 Akun Standar USD (Jebakan Lot Minimum)',
    labelEn: '$25 Standard USD Account (Min Lot Trap)',
    badgeId: 'DITOLAK • OVER-RISK',
    badgeEn: 'REJECTS OVER-RISK',
    equity: 25,
    accountDenomination: 'USD',
    riskPercentage: 1.0,
    stopLossDistance: 2.5,
    tickSize: 0.01,
    tickValuePerLot: 1.0,
    minimumLot: 0.01,
    maximumLot: 100.0,
    volumeStep: 0.01,
    leverage: 500,
    contractUnitsPerLot: 100,
    referencePrice: 2650.0
  },
  {
    id: 'eurusd-cent-5000usc',
    labelId: 'Modal $50 (5.000 USC) • EURUSD Cent',
    labelEn: '$50 Capital (5,000 USC) • EURUSD Cent',
    badgeId: 'AMAN • 0.33 LOT',
    badgeEn: 'SAFE • 0.33 LOT',
    equity: 5000,
    accountDenomination: 'USC',
    riskPercentage: 1.0,
    stopLossDistance: 0.0015,
    tickSize: 0.00001,
    tickValuePerLot: 1.0,
    minimumLot: 0.01,
    maximumLot: 100.0,
    volumeStep: 0.01,
    leverage: 500,
    contractUnitsPerLot: 1000,
    referencePrice: 1.085
  }
];

export function CentLabCalculator() {
  const { isId, l } = useLocale();
  const { formatUsdToIdr, formatUscToIdr } = useLiveCurrency();

  // Dual Mode State: Beginner (default) vs Pro MT5 Full Specifications
  const [showAdvancedMt5, setShowAdvancedMt5] = useState<boolean>(false);

  // 1. Bidirectional Cent <-> USD Converter State
  const [converterUsdInput, setConverterUsdInput] = useState<number>(10);
  const [converterUscInput, setConverterUscInput] = useState<number>(1000);

  // 2. Broker-Specific Symbol Specification Position Sizer State
  const [equity, setEquity] = useState<number>(1000);
  const [accountDenomination, setAccountDenomination] = useState<AccountDenomination>('USC');
  const [riskPercentage, setRiskPercentage] = useState<number>(1.0);
  const [stopLossDistance, setStopLossDistance] = useState<number>(2.5);
  const [tickSize, setTickSize] = useState<number>(0.01);
  const [tickValuePerLot, setTickValuePerLot] = useState<number>(1.0);
  const [minimumLot, setMinimumLot] = useState<number>(0.01);
  const [maximumLot, setMaximumLot] = useState<number>(100.0);
  const [volumeStep, setVolumeStep] = useState<number>(0.01);

  // Margin Estimator Inputs
  const [leverage, setLeverage] = useState<number>(500);
  const [contractUnitsPerLot, setContractUnitsPerLot] = useState<number>(1);
  const [referencePrice, setReferencePrice] = useState<number>(2650.0);

  // 3. Drawdown Simulator & Side-by-Side Comparison State
  const [customDrawdownTestPct, setCustomDrawdownTestPct] = useState<number>(20);
  const [rewardToRiskRatio, setRewardToRiskRatio] = useState<number>(2.0);
  const [dailyMaxLossPercent, setDailyMaxLossPercent] = useState<number>(3.0);

  // 4. Side-by-Side Comparison Matrix State
  const [depositAmount, setDepositAmount] = useState<number>(10);
  const [depositCurrency, setDepositCurrency] = useState<SupportedCurrency>('USD');
  const [instrument, setInstrument] = useState<SupportedInstrument>('XAUUSD');
  const [stopLossPoints, setStopLossPoints] = useState<number>(250);

  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [presets, setPresets] = useState<SavedRiskRulePreset[]>([]);

  useEffect(() => {
    setPresets(loadRiskPresets());
  }, []);

  // Handlers for Bidirectional USD <-> USC Converter
  function handleUsdConverterChange(val: number) {
    const safeVal = Number.isFinite(val) && val >= 0 ? val : 0;
    setConverterUsdInput(safeVal);
    const conv = convertUsdAndUsc(safeVal, 'USD');
    setConverterUscInput(conv.usc);
  }

  function handleUscConverterChange(val: number) {
    const safeVal = Number.isFinite(val) && val >= 0 ? val : 0;
    setConverterUscInput(safeVal);
    const conv = convertUsdAndUsc(safeVal, 'USC');
    setConverterUsdInput(conv.usd);
  }

  function handleQuickModalSelect(usdAmount: number) {
    handleUsdConverterChange(usdAmount);
    setDepositCurrency('USD');
    setDepositAmount(usdAmount);
    if (accountDenomination === 'USC') {
      setEquity(usdAmount * 100);
    } else {
      setEquity(usdAmount);
    }
  }

  function applyBrokerPreset(preset: BrokerSymbolQuickPreset) {
    setEquity(preset.equity);
    setAccountDenomination(preset.accountDenomination);
    setRiskPercentage(preset.riskPercentage);
    setStopLossDistance(preset.stopLossDistance);
    setTickSize(preset.tickSize);
    setTickValuePerLot(preset.tickValuePerLot);
    setMinimumLot(preset.minimumLot);
    setMaximumLot(preset.maximumLot);
    setVolumeStep(preset.volumeStep);
    setLeverage(preset.leverage);
    setContractUnitsPerLot(preset.contractUnitsPerLot);
    setReferencePrice(preset.referencePrice);
    const usdEq = preset.accountDenomination === 'USC' ? preset.equity / 100 : preset.equity;
    handleUsdConverterChange(usdEq);
    setDepositAmount(usdEq);
  }

  // Compute Broker-Specific Position Size (with strict rejection rule)
  const brokerSizingResult = useMemo(
    () =>
      calculateBrokerSymbolPositionSize({
        equity,
        accountDenomination,
        riskPercentage,
        stopLossDistance,
        tickSize,
        tickValuePerLot,
        minimumLot,
        maximumLot,
        volumeStep,
        leverage,
        contractUnitsPerLot,
        referencePrice
      }),
    [
      equity,
      accountDenomination,
      riskPercentage,
      stopLossDistance,
      tickSize,
      tickValuePerLot,
      minimumLot,
      maximumLot,
      volumeStep,
      leverage,
      contractUnitsPerLot,
      referencePrice
    ]
  );

  // Compute Drawdown & Streak Simulation
  const drawdownMetrics = useMemo(
    () =>
      calculateRiskMetrics({
        accountBalance: equity > 0 ? equity : 1000,
        accountUnit: accountDenomination,
        riskPercent: riskPercentage > 0 ? riskPercentage : 1.0,
        stopLossPoints:
          brokerSizingResult.stopLossTicks > 0 ? brokerSizingResult.stopLossTicks : 250,
        rewardToRiskRatio,
        dailyMaxLossPercent,
        pointValuePerMinLot: tickValuePerLot * minimumLot
      }),
    [
      equity,
      accountDenomination,
      riskPercentage,
      brokerSizingResult.stopLossTicks,
      rewardToRiskRatio,
      dailyMaxLossPercent,
      tickValuePerLot,
      minimumLot
    ]
  );

  const customRecoveryNeededPct = useMemo(
    () => calculateRequiredRecoveryGainPercent(customDrawdownTestPct),
    [customDrawdownTestPct]
  );

  // Compute Side-by-Side Comparison Matrix
  const comparisonResult = useMemo(
    () =>
      calculateCentComparison({
        depositAmount,
        depositCurrency,
        instrument,
        stopLossPoints,
        riskPercent: riskPercentage > 0 ? riskPercentage : 1.0,
        leverage
      }),
    [depositAmount, depositCurrency, instrument, stopLossPoints, riskPercentage, leverage]
  );

  // Account Health Bar computation (visualizes survival buffer per trade & 5-loss resilience)
  const accountHealth = useMemo(() => {
    const effectiveRiskPct = brokerSizingResult.isExecutable
      ? (brokerSizingResult.actualRiskPercentage ?? riskPercentage)
      : brokerSizingResult.minimumLotRiskPercentage;

    // Health score out of 100: 0.5-1% risk = 95% health, 2% = 82%, 3% = 65%, >=5% = <40%
    const healthScore = Math.max(
      8,
      Math.min(100, Math.round(100 - Math.max(0, effectiveRiskPct - 0.5) * 16))
    );

    const remainingAfter5LossesPct = Number(
      (Math.pow(1 - Math.min(0.95, effectiveRiskPct / 100), 5) * 100).toFixed(1)
    );

    if (!brokerSizingResult.isExecutable) {
      return {
        score: Math.min(25, healthScore),
        tone: 'danger' as const,
        label: isId
          ? 'Kritis, Lot Minimum Broker Melampaui Batas Risiko'
          : 'Critical, Broker Min Lot Exceeds Risk Cap',
        barColor: 'bg-[#EF4444]',
        remainingAfter5LossesPct
      };
    }

    if (effectiveRiskPct <= 1.5) {
      return {
        score: healthScore,
        tone: 'healthy' as const,
        label: isId
          ? 'Sangat Sehat, Pertahanan Modal Kuat'
          : 'Optimal Health, Strong Capital Defense',
        barColor: 'bg-[#10B981]',
        remainingAfter5LossesPct
      };
    }

    if (effectiveRiskPct <= 2.5) {
      return {
        score: healthScore,
        tone: 'moderate' as const,
        label: isId
          ? 'Waspada, Risiko Menengah per Transaksi'
          : 'Moderate, Watch Consecutive Loss Streaks',
        barColor: 'bg-[#D6A937]',
        remainingAfter5LossesPct
      };
    }

    return {
      score: healthScore,
      tone: 'danger' as const,
      label: isId
        ? 'Agresif, Rawan Drawdown Dalam Jika Loss Beruntun'
        : 'Aggressive, High Drawdown Vulnerability',
      barColor: 'bg-[#EF4444]',
      remainingAfter5LossesPct
    };
  }, [brokerSizingResult, riskPercentage, isId]);

  // Dynamic Jey Co-Pilot Tip based on user's current state
  const dynamicJeyTip = useMemo(() => {
    if (!brokerSizingResult.isExecutable) {
      return {
        title: isId
          ? 'Jey Co-Pilot • Peringatan Pelindung Modal'
          : 'Jey Co-Pilot • Capital Guard Alert',
        tag: isId ? 'JANGAN DIPAKSA ENTRY' : 'DO NOT FORCE ENTRY',
        variant: 'purple' as const,
        text: isId
          ? `Pada modal ${equity.toLocaleString()} ${accountDenomination}, lot terkecil broker (${minimumLot} lot) akan merisikokan ${brokerSizingResult.minimumLotRiskPercentage}% dari saldo kamu. Jangan pernah membulatkan lot ke atas! Gunakan akun Cent (USC) atau perkecil jarak Stop-Loss hanya jika sesuai struktur market.`
          : `On ${equity.toLocaleString()} ${accountDenomination} equity, the broker's minimum lot (${minimumLot}) would risk ${brokerSizingResult.minimumLotRiskPercentage}% of your balance. Never round up to force a trade! Switch to a Cent account (USC) instead.`
      };
    }

    if (riskPercentage <= 1.0) {
      return {
        title: isId ? 'Jey Co-Pilot • Disiplin Strategist' : 'Jey Co-Pilot • Strategist Discipline',
        tag: isId ? 'ZONA AMAN 1% RISK' : '1% SAFE ZONE',
        variant: 'gold' as const,
        text: isId
          ? `Pilihan cerdas! Dengan risiko ${riskPercentage}% (${brokerSizingResult.maxAllowedRiskAmount.toFixed(1)} ${accountDenomination} / $${brokerSizingResult.maxAllowedRiskUsdEquivalent.toFixed(2)} USD), kamu masih menyimpan ${accountHealth.remainingAfter5LossesPct}% modal meskipun mengalami 5 kali loss berturut-turut.`
          : `Smart discipline! At ${riskPercentage}% risk (${brokerSizingResult.maxAllowedRiskAmount.toFixed(1)} ${accountDenomination} / $${brokerSizingResult.maxAllowedRiskUsdEquivalent.toFixed(2)} USD), you preserve ${accountHealth.remainingAfter5LossesPct}% of your capital even after 5 consecutive losses.`
      };
    }

    if (riskPercentage <= 2.0) {
      return {
        title: isId ? 'Jey Co-Pilot • Catatan Ukuran Lot' : 'Jey Co-Pilot • Sizing Note',
        tag: isId ? 'BATAS DISIPLIN HARIAN' : 'DAILY CAP REMINDER',
        variant: 'gold' as const,
        text: isId
          ? `Risiko ${riskPercentage}% per trade masih terukur untuk akun mikro, tetapi pastikan kamu berhenti trading hari ini jika sudah terkena 2 hingga 3 kali Stop-Loss berturut-turut.`
          : `A ${riskPercentage}% risk per trade is manageable, but enforce a strict daily halt if you hit 2 to 3 consecutive stop-outs.`
      };
    }

    return {
      title: isId ? 'Jey Co-Pilot • Peringatan Risiko Tinggi' : 'Jey Co-Pilot • High Risk Warning',
      tag: isId ? 'KURANGI RISIKO KE 1%–2%' : 'DIAL BACK TO 1%–2%',
      variant: 'purple' as const,
      text: isId
        ? `Merisikokan ${riskPercentage}% dalam satu posisi membuat akunmu cepat terkuras saat market sedang choppy. Geser slider risiko kembali ke 1% agar mentalmu tetap tenang.`
        : `Risking ${riskPercentage}% on a single setup drains your psychological and financial buffer quickly during choppy sessions. Dial your risk slider back toward 1%.`
    };
  }, [brokerSizingResult, equity, accountDenomination, minimumLot, riskPercentage, accountHealth, isId]);

  function handleSavePreset() {
    const newPreset: SavedRiskRulePreset = {
      id: `preset-${Date.now()}`,
      name: `${instrument} • $${comparisonResult.depositUsd} (${comparisonResult.depositUsc} USC) @ ${riskPercentage}%`,
      depositUsd: comparisonResult.depositUsd,
      accountMode: accountDenomination === 'USC' ? 'CENT_USC' : 'STANDARD_USD',
      instrument,
      riskPercent: riskPercentage,
      dailyMaxLossPercent: Number((riskPercentage * 3).toFixed(1)),
      defaultStopLossPoints:
        brokerSizingResult.stopLossTicks > 0
          ? Math.round(brokerSizingResult.stopLossTicks)
          : stopLossPoints,
      createdAt: new Date().toISOString()
    };
    const next = saveRiskPreset(newPreset);
    setPresets(next);
    setSavedNotice(
      isId
        ? 'Preset risiko berhasil disimpan di browser Anda.'
        : 'Saved to your Strategist Risk Presets.'
    );
    setTimeout(() => setSavedNotice(null), 3500);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Clean Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6A937]">
            <Calculator className="w-4 h-4" />
            <span>
              {isId
                ? 'JGS CENT LAB • MODE PEMULA & SPESIFIKASI LENGKAP MT5'
                : 'JGS CENT LAB • BEGINNER & PRO MT5 SPECIFICATION ENGINE'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE] tracking-tight">
            {isId
              ? 'Hitung Ukuran Lot & Kesehatan Akun Sebelum Buka Posisi'
              : 'Calculate Exact Lot Size & Account Health Before Every Trade'}
          </h1>
          <p className="text-sm sm:text-base text-[#BEB6CE] leading-relaxed">
            {isId
              ? 'Mulai dengan memilih modal kecil ($10 / 1.000 USC) dan batas risiko di bawah ini. Ingin mengatur ukuran kontrak, nilai tick, dan margin sesuai broker MT5 Anda? Aktifkan Mode Spesifikasi MT5 Lengkap kapan saja.'
              : 'Start by selecting your micro-capital balance ($10 / 1,000 USC) and risk limit below. Need custom contract sizes, tick values, and margin checks for your MT5 broker? Toggle Full MT5 Specifications anytime.'}
          </p>
          <div className="pt-1">
            <LiveKursPill />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button type="button" onClick={handleSavePreset} className="jgs-btn-gold text-xs">
            <BookmarkPlus className="w-4 h-4" />
            <span>{isId ? 'Simpan Preset Risiko' : 'Save Sizing Preset'}</span>
          </button>
          <Link href={l('/playground')} className="jgs-btn-outline text-xs">
            <span>{isId ? 'Latihan di Playground' : 'Test in Playground'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-[#0F1B1D] border border-[#10B981]/50 text-xs font-medium text-[#10B981] flex items-center justify-between">
          <span>[OK] {savedNotice}</span>
          <Link href={l('/account')} className="underline">
            {isId ? 'Lihat di Ruang Kerja →' : 'View in Workspace →'}
          </Link>
        </div>
      )}

      {/* Gold Physical Weight & Coffee Price Analogy Bar */}
      <div className="rounded-2xl border border-[#D6A937]/35 bg-gradient-to-r from-[#17131D] via-[#1C1427] to-[#17131D] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D6A937] font-bold">
              {isId
                ? 'ANALOGI MANUSIA // BERAT FISIK EMAS & HARGA KOPI'
                : 'PLAIN-HUMAN ANALOGY // PHYSICAL GOLD WEIGHT & COFFEE COST'}
            </span>
            <h2 className="font-display text-xl font-bold text-[#F7F4EE] mt-0.5">
              {isId
                ? 'Kenapa 0.01 Lot Standar Membunuh Akun $10, Sedangkan 0.01 Lot Cent Aman?'
                : 'Why 0.01 Standard Lot Crushes $10 Capital While 0.01 Cent Lot Survives'}
            </h2>
          </div>
          <span className="font-mono text-[11px] rounded-full border border-white/10 bg-[#08050E] px-3 py-1 text-[#BEB6CE]">
            1 Troy Oz = 31.1035 Gram Emas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/35 bg-red-950/20 p-4 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-red-400">
                0.01 Lot STANDAR (100 oz / lot)
              </span>
              <span className="text-red-300 font-bold">≈ 31.1 Gram Emas Fisik</span>
            </div>
            <p className="text-xs text-[#BEB6CE] leading-relaxed">
              {isId
                ? `Sama dengan memikul 1 batang emas 31.1 gram! Setiap harga XAUUSD gerak $10, saldomu goyang $10 (${formatUsdToIdr(10)}). Akun $10 langsung habis (Margin Call) sebelum sempat bernapas.`
                : 'Equivalent to trading 31.1 grams (1 full troy oz) of physical gold! A $10 price swing in XAUUSD wipes out your entire $10 balance instantly.'}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/35 bg-emerald-950/20 p-4 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-emerald-400">
                0.01 Lot CENT MIKRO (1 oz / lot)
              </span>
              <span className="text-emerald-300 font-bold">≈ 0.31 Gram Emas (Harga Kopi)</span>
            </div>
            <p className="text-xs text-[#BEB6CE] leading-relaxed">
              {isId
                ? `Setara keping emas mungil 0.31 gram! Pada akun 1,000 USC ($10), risiko 1% = 10 USC ($0.10 / ${formatUscToIdr(10)}), lebih murah dari segelas es kopi, sehingga kamu bisa bertahan 100 kali setup.`
                : 'Equivalent to a tiny 0.31 gram gold flake! On a 1,000 USC ($10) account, 1% risk is 10 USC ($0.10), less than a cup of coffee, letting you survive dozens of setups cleanly.'}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PRIMARY WORKSPACE: BEGINNER MODE + ACCOUNT HEALTH BAR + PRO MT5 TOGGLE
      ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Beginner Controls + Expandable Pro MT5 Spec */}
        <div className="lg:col-span-7 rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 sm:p-8 space-y-8">
          {/* Step 1: Modal Size Quick Selector ($10 / 1.000 USC default friendly) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D6A937]">
                  {isId ? 'Langkah 1 • Pilih Modal Anda' : 'Step 1 • Choose Your Capital'}
                </span>
                <h2 className="font-display text-xl font-bold text-[#F7F4EE] mt-0.5">
                  {isId
                    ? 'Modal Awal & Konversi Otomatis USD ↔ USC (Cent)'
                    : 'Starting Capital & Instant USD ↔ USC (Cent) Conversion'}
                </h2>
              </div>
              <span className="text-xs font-mono text-[#B99AE8] bg-[#08050E] px-2.5 py-1 rounded-lg">
                $1 USD = 100 USC
              </span>
            </div>

            {/* Friendly Quick Modal Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[10, 25, 50, 100].map((usdAmt) => {
                const isSelected = Math.abs(converterUsdInput - usdAmt) < 0.01;
                return (
                  <button
                    key={usdAmt}
                    type="button"
                    onClick={() => handleQuickModalSelect(usdAmt)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#D6A937]/15 border-[#D6A937] text-[#F7F4EE]'
                        : 'bg-[#0E0B14] border-white/[0.07] text-[#BEB6CE] hover:border-white/20'
                    }`}
                  >
                    <div className="font-display font-bold text-base text-[#F7F4EE]">
                      ${usdAmt}
                    </div>
                    <div className="font-mono text-xs text-[#D6A937]">
                      {(usdAmt * 100).toLocaleString()} USC
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clean Bidirectional Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center pt-1">
              <div className="sm:col-span-5">
                <label htmlFor="conv-usd-input" className="jgs-label text-xs">
                  {isId ? 'Modal dalam Dolar (USD $)' : 'Capital in US Dollars (USD $)'}
                </label>
                <input
                  id="conv-usd-input"
                  type="number"
                  min={0}
                  step="any"
                  value={converterUsdInput}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    handleUsdConverterChange(v);
                    setEquity(accountDenomination === 'USC' ? v * 100 : v);
                  }}
                  className="jgs-input text-base font-bold text-[#F7F4EE]"
                />
              </div>

              <div className="sm:col-span-1 flex items-center justify-center pt-5">
                <ArrowLeftRight className="w-4 h-4 text-[#D6A937]" />
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="conv-usc-input" className="jgs-label text-xs">
                  {isId ? 'Saldo Akun Cent MT5 (USC ¢)' : 'MT5 Cent Account Balance (USC ¢)'}
                </label>
                <input
                  id="conv-usc-input"
                  type="number"
                  min={0}
                  step="any"
                  value={converterUscInput}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    handleUscConverterChange(v);
                    setEquity(accountDenomination === 'USC' ? v : v / 100);
                  }}
                  className="jgs-input text-base font-bold text-[#D6A937]"
                />
              </div>
            </div>

            {/* Account Type Switch (Cent USC vs Standard USD) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#BEB6CE]">
                {isId ? 'Jenis Akun yang Digunakan:' : 'Active Account Denomination:'}
              </span>
              <div className="inline-flex rounded-xl bg-[#0E0B14] p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setAccountDenomination('USC');
                    setEquity(converterUscInput);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    accountDenomination === 'USC'
                      ? 'bg-[#D6A937] text-[#08050E]'
                      : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
                  }`}
                >
                  {isId ? 'Akun Cent (USC), Direkomendasikan' : 'Cent Account (USC), Recommended'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountDenomination('USD');
                    setEquity(converterUsdInput);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    accountDenomination === 'USD'
                      ? 'bg-[#D6A937] text-[#08050E]'
                      : 'text-[#BEB6CE] hover:text-[#F7F4EE]'
                  }`}
                >
                  {isId ? 'Akun Standar (USD)' : 'Standard Account (USD)'}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Risk Slider & Stop Loss Distance */}
          <div className="space-y-5 pt-6 border-t border-white/[0.07]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B99AE8]">
                {isId ? 'Langkah 2 • Atur Batas Risiko' : 'Step 2 • Set Your Risk Limit'}
              </span>
              <h3 className="font-display text-lg font-bold text-[#F7F4EE] mt-0.5">
                {isId
                  ? 'Berapa Persen Modal yang Siap Anda Risikokan jika Terkena Stop-Loss?'
                  : 'How Much Capital Will You Risk If Stop-Loss Is Hit?'}
              </h3>
            </div>

            {/* Risk Percentage Slider */}
            <div className="p-5 rounded-xl bg-[#0E0B14] space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="spec-risk-pct" className="text-sm font-medium text-[#F7F4EE]">
                  {isId ? 'Batas Risiko per Transaksi' : 'Risk Limit per Trade'}
                </label>
                <div className="text-right">
                  <span className="font-mono text-xl font-bold text-[#D6A937]">
                    {riskPercentage.toFixed(1)}%
                  </span>
                  <span className="block font-mono text-xs text-[#BEB6CE]">
                    = {brokerSizingResult.maxAllowedRiskAmount.toFixed(2)} {accountDenomination} ($
                    {brokerSizingResult.maxAllowedRiskUsdEquivalent.toFixed(2)} USD)
                  </span>
                </div>
              </div>

              <input
                id="spec-risk-pct"
                type="range"
                min={0.5}
                max={5.0}
                step={0.25}
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(Number(e.target.value))}
                className="w-full accent-[#D6A937] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-[#8E84A4] font-mono">
                <span>0.5% ({isId ? 'Konservatif' : 'Conservative'})</span>
                <span className="text-[#10B981]">1.0% ({isId ? 'Ideal JGS' : 'JGS Ideal'})</span>
                <span>2.0% ({isId ? 'Batas Maks' : 'Max Cap'})</span>
                <span className="text-[#EF4444]">5.0% ({isId ? 'Bahaya' : 'High Risk'})</span>
              </div>
            </div>

            {/* Stop-Loss Distance Slider & Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="spec-sl-distance" className="jgs-label text-xs">
                  {isId
                    ? 'Jarak Stop-Loss (Satuan Harga, mis. $2.50 di Emas)'
                    : 'Stop-Loss Distance (Price Units, e.g. $2.50 on Gold)'}
                </label>
                <input
                  id="spec-sl-distance"
                  type="number"
                  min={0.0001}
                  step="any"
                  value={stopLossDistance}
                  onChange={(e) => setStopLossDistance(Number(e.target.value))}
                  className="jgs-input font-mono"
                />
              </div>

              <div>
                <label htmlFor="spec-equity" className="jgs-label text-xs">
                  {isId
                    ? `Ekuitas Akun Saat Ini (${accountDenomination})`
                    : `Current Account Equity (${accountDenomination})`}
                </label>
                <input
                  id="spec-equity"
                  type="number"
                  min={1}
                  step="any"
                  value={equity}
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="jgs-input font-mono"
                />
              </div>
            </div>
          </div>

          {/* Toggle Button for Pro MT5 Full Specifications */}
          <div className="pt-4 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={() => setShowAdvancedMt5(!showAdvancedMt5)}
              aria-expanded={showAdvancedMt5}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#0E0B14] hover:bg-[#14101D] border border-[#B99AE8]/25 text-left transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#B99AE8]" />
                <div>
                  <span className="block text-sm font-semibold text-[#F7F4EE]">
                    {showAdvancedMt5
                      ? isId
                        ? 'Tutup Spesifikasi MT5 Lengkap'
                        : 'Hide Full MT5 Specifications'
                      : isId
                      ? 'Buka Spesifikasi MT5 Lengkap'
                      : 'Open Full MT5 Specifications'}
                  </span>
                  <span className="block text-xs text-[#BEB6CE]">
                    {isId
                      ? 'Atur Tick Size, Tick Value per Lot, Lot Minimum/Maksimum, Volume Step, & Margin'
                      : 'Configure Tick Size, Tick Value per Lot, Min/Max Lot, Volume Step, & Margin'}
                  </span>
                </div>
              </div>
              {showAdvancedMt5 ? (
                <ChevronUp className="w-4 h-4 text-[#D6A937] shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#D6A937] shrink-0" />
              )}
            </button>

            {/* Expandable Pro MT5 Panel */}
            {showAdvancedMt5 && (
              <div className="mt-4 p-5 rounded-xl bg-[#0E0B14] border border-white/[0.08] space-y-5">
                {/* Quick Broker Spec Presets */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#BEB6CE] block">
                    {isId
                      ? 'Muat Cepat Preset Spesifikasi Simbol Broker:'
                      : 'Quick-Load Sample Broker Symbol Specifications:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BROKER_SYMBOL_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyBrokerPreset(preset)}
                        className="text-left p-2.5 rounded-lg bg-[#17131D] border border-white/10 hover:border-[#D6A937] transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-medium text-[#F7F4EE] truncate">
                            {isId ? preset.labelId : preset.labelEn}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                              preset.id.includes('reject')
                                ? 'bg-[#EF4444]/20 text-[#EF4444]'
                                : 'bg-[#10B981]/20 text-[#10B981]'
                            }`}
                          >
                            {isId ? preset.badgeId : preset.badgeEn}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="spec-tick-size" className="jgs-label text-xs">
                      {isId ? 'Ukuran Tick (Tick Size)' : 'Tick Size (Min Price Step)'}
                    </label>
                    <input
                      id="spec-tick-size"
                      type="number"
                      step="any"
                      value={tickSize}
                      onChange={(e) => setTickSize(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="spec-tick-value" className="jgs-label text-xs">
                      {isId
                        ? `Nilai Tick per 1.00 Lot (${accountDenomination})`
                        : `Tick Value per 1.00 Lot (${accountDenomination})`}
                    </label>
                    <input
                      id="spec-tick-value"
                      type="number"
                      step="any"
                      value={tickValuePerLot}
                      onChange={(e) => setTickValuePerLot(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="spec-min-lot" className="jgs-label text-xs">
                      {isId ? 'Lot Minimum' : 'Minimum Lot'}
                    </label>
                    <input
                      id="spec-min-lot"
                      type="number"
                      step="any"
                      value={minimumLot}
                      onChange={(e) => setMinimumLot(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="spec-max-lot" className="jgs-label text-xs">
                      {isId ? 'Lot Maksimum' : 'Maximum Lot'}
                    </label>
                    <input
                      id="spec-max-lot"
                      type="number"
                      step="any"
                      value={maximumLot}
                      onChange={(e) => setMaximumLot(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="spec-vol-step" className="jgs-label text-xs">
                      {isId ? 'Step Volume' : 'Volume Step'}
                    </label>
                    <input
                      id="spec-vol-step"
                      type="number"
                      step="any"
                      value={volumeStep}
                      onChange={(e) => setVolumeStep(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>
                </div>

                {/* Margin Estimator Inputs */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="spec-leverage" className="jgs-label text-xs">
                      Leverage
                    </label>
                    <select
                      id="spec-leverage"
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="jgs-input font-mono"
                    >
                      <option value={100}>1 : 100</option>
                      <option value={200}>1 : 200</option>
                      <option value={500}>1 : 500</option>
                      <option value={1000}>1 : 1000</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="spec-contract-units" className="jgs-label text-xs">
                      {isId ? 'Ukuran Kontrak / Lot' : 'Contract Size / Lot'}
                    </label>
                    <input
                      id="spec-contract-units"
                      type="number"
                      step="any"
                      value={contractUnitsPerLot}
                      onChange={(e) => setContractUnitsPerLot(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="spec-ref-price" className="jgs-label text-xs">
                      {isId ? 'Harga Aset' : 'Asset Price'}
                    </label>
                    <input
                      id="spec-ref-price"
                      type="number"
                      step="any"
                      value={referencePrice}
                      onChange={(e) => setReferencePrice(Number(e.target.value))}
                      className="jgs-input font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Live Position Verdict + Visual Account Health Bar + Jey Co-Pilot */}
        <div className="lg:col-span-5 space-y-5">
          {/* Primary Verdict Card */}
          <div
            className={`rounded-2xl p-6 sm:p-7 border space-y-6 ${
              brokerSizingResult.status === 'REJECTED_RISK_LIMIT_EXCEEDED' ||
              brokerSizingResult.status === 'INVALID_PARAMETERS'
                ? 'bg-[#17131D] border-[#EF4444]/60'
                : 'bg-[#17131D] border-[#D6A937]/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#BEB6CE]">
                {isId ? 'Rekomendasi Ukuran Lot' : 'Recommended Position Size'}
              </span>
              {brokerSizingResult.isExecutable ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isId ? 'Sesuai Batas Risiko' : 'Risk-Compliant'}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] text-xs font-semibold">
                  <XOctagon className="w-3.5 h-3.5" />
                  {isId ? 'Ditolak, Melebihi Risiko' : 'Rejected, Over Risk'}
                </span>
              )}
            </div>

            {brokerSizingResult.isExecutable && brokerSizingResult.approvedLotSize !== null ? (
              <div className="space-y-1">
                <div className="font-mono text-4xl sm:text-5xl font-bold text-[#D6A937] tabular-nums">
                  {brokerSizingResult.approvedLotSize.toFixed(2)}{' '}
                  <span className="text-lg font-sans font-semibold text-[#F7F4EE]">
                    {accountDenomination === 'USC'
                      ? isId
                        ? 'Lot Cent'
                        : 'Cent Lots'
                      : isId
                      ? 'Lot Standar'
                      : 'Standard Lots'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#10B981] font-medium">
                  {isId
                    ? `Risiko Aktual jika kena SL: ${brokerSizingResult.actualRiskAmount?.toFixed(
                        2
                      )} ${accountDenomination} (${brokerSizingResult.actualRiskPercentage}% dari ekuitas)`
                    : `Actual Stop-Out Risk: ${brokerSizingResult.actualRiskAmount?.toFixed(
                        2
                      )} ${accountDenomination} (${brokerSizingResult.actualRiskPercentage}% of equity)`}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#EF4444]">
                  {isId ? 'DITOLAK, JANGAN EKSEKUSI' : 'REJECTED: DO NOT EXECUTE'}
                </div>
                <p className="text-xs text-[#F3E5AB] leading-relaxed">
                  {isId
                    ? `Aturan Proteksi JGS: Lot minimum broker (${minimumLot} lot) menghasilkan kerugian ${brokerSizingResult.lossAtMinimumLot.toFixed(
                        2
                      )} ${accountDenomination} (${
                        brokerSizingResult.minimumLotRiskPercentage
                      }% dari ekuitas), melampaui batas risiko ${riskPercentage}% Anda.`
                    : `JGS Protection Rule: Minimum broker volume (${minimumLot} lot) risks ${brokerSizingResult.lossAtMinimumLot.toFixed(
                        2
                      )} ${accountDenomination} (${
                        brokerSizingResult.minimumLotRiskPercentage
                      }% of equity), violating your ${riskPercentage}% cap.`}
                </p>
              </div>
            )}

            {/* Visual Account Health Bar */}
            <div className="p-4 rounded-xl bg-[#0E0B14] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#F7F4EE]">
                  <HeartPulse className="w-4 h-4 text-[#D6A937]" />
                  {isId ? 'Account Health Bar (Ketahanan Modal)' : 'Account Health Bar'}
                </span>
                <span className="font-mono font-bold text-[#F3E5AB]">
                  {accountHealth.score}/100
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#17131D] overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${accountHealth.barColor}`}
                  style={{ width: `${accountHealth.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#BEB6CE]">
                <span>{accountHealth.label}</span>
                <span className="font-mono text-[#F7F4EE]">
                  {isId
                    ? `Sisa modal 5x loss: ${accountHealth.remainingAfter5LossesPct}%`
                    : `After 5 losses: ${accountHealth.remainingAfter5LossesPct}%`}
                </span>
              </div>
            </div>

            {/* Clean Summary Metrics */}
            <div className="space-y-2 text-xs border-t border-white/[0.07] pt-4">
              <div className="flex justify-between py-1">
                <span className="text-[#8E84A4]">
                  {isId ? 'Ekuitas Setara:' : 'Converted Equity:'}
                </span>
                <span className="font-mono text-[#F7F4EE]">
                  {brokerSizingResult.equityUscEquivalent.toLocaleString()} USC ($
                  {brokerSizingResult.equityUsdEquivalent.toFixed(2)} USD)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8E84A4]">
                  {isId ? 'Jarak Stop-Loss (Ticks):' : 'Stop-Loss Ticks:'}
                </span>
                <span className="font-mono text-[#F7F4EE]">
                  {brokerSizingResult.stopLossTicks} Ticks
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8E84A4]">
                  {isId
                    ? `Kerugian pada Lot Minimum (${minimumLot}):`
                    : `Loss at Minimum Lot (${minimumLot}):`}
                </span>
                <span
                  className={`font-mono ${
                    brokerSizingResult.minimumLotRiskPercentage > riskPercentage
                      ? 'text-[#EF4444] font-bold'
                      : 'text-[#10B981]'
                  }`}
                >
                  {brokerSizingResult.lossAtMinimumLot.toFixed(2)} {accountDenomination} (
                  {brokerSizingResult.minimumLotRiskPercentage}%)
                </span>
              </div>
              {brokerSizingResult.isExecutable &&
                brokerSizingResult.estimatedMarginRequired !== null && (
                  <div className="flex justify-between py-1">
                    <span className="text-[#8E84A4]">
                      {isId
                        ? `Estimasi Margin Terpakai (1:${leverage}):`
                        : `Estimated Margin Used (1:${leverage}):`}
                    </span>
                    <span className="font-mono text-[#D6A937]">
                      {brokerSizingResult.estimatedMarginRequired.toFixed(2)} {accountDenomination}
                    </span>
                  </div>
                )}
            </div>
          </div>

          {/* Dynamic Jey Co-Pilot Callout */}
          <JeyStrategistCallout
            title={dynamicJeyTip.title}
            contextTag={dynamicJeyTip.tag}
            ruleText={dynamicJeyTip.text}
            variant={dynamicJeyTip.variant}
            showAvatar={true}
          />
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: SIDE-BY-SIDE STANDARD (USD) VS CENT (USC) COMPARATOR
      ===================================================================== */}
      <section className="rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D6A937]">
              {isId
                ? 'Perbandingan Langsung • Mengapa Akun Cent Penting untuk Modal Kecil'
                : 'Side-by-Side Comparison • Why Cent Accounts Matter for Small Capital'}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? `Modal $${comparisonResult.depositUsd} di Akun Standar USD vs Akun Cent (${comparisonResult.depositUsc.toLocaleString()} USC)`
                : `$${comparisonResult.depositUsd} on Standard USD vs. Cent Account (${comparisonResult.depositUsc.toLocaleString()} USC)`}
            </h2>
          </div>

          {/* Instrument Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(INSTRUMENT_SPECS) as SupportedInstrument[]).map((sym) => (
              <button
                key={sym}
                type="button"
                onClick={() => setInstrument(sym)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  instrument === sym
                    ? 'bg-[#D6A937] text-[#08050E]'
                    : 'bg-[#0E0B14] text-[#BEB6CE] hover:text-[#F7F4EE]'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Standard USD Account Outcome */}
          <div className="rounded-xl p-5 bg-[#0E0B14] border border-white/[0.07] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#BEB6CE]">
                {isId ? 'Akun Standar (USD)' : 'Standard Account (USD)'}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  comparisonResult.standardAnalysis.isOverRiskTrap
                    ? 'bg-[#EF4444]/15 text-[#EF4444]'
                    : 'bg-[#10B981]/15 text-[#10B981]'
                }`}
              >
                {comparisonResult.standardAnalysis.isOverRiskTrap
                  ? isId
                    ? 'Rawan Over-Risk'
                    : 'Over-Risk Trap'
                  : isId
                  ? 'Ukuran Lot Valid'
                  : 'Compliant'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.05]">
                <span className="text-[#8E84A4]">{isId ? 'Saldo Akun:' : 'Account Balance:'}</span>
                <span className="text-[#F7F4EE]">{comparisonResult.standardAnalysis.balanceDisplay}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.05]">
                <span className="text-[#8E84A4]">
                  {isId ? 'Lot Sesuai Risiko:' : 'Risk-Compliant Lot:'}
                </span>
                <span
                  className={
                    comparisonResult.standardAnalysis.approvedLotSizeOrNull === null
                      ? 'text-[#EF4444] font-bold'
                      : 'text-[#F7F4EE]'
                  }
                >
                  {comparisonResult.standardAnalysis.approvedLotSizeOrNull === null
                    ? isId
                      ? 'DITOLAK (< 0.01 Lot)'
                      : 'REJECTED (< 0.01 Min)'
                    : `${comparisonResult.standardAnalysis.approvedLotSizeOrNull.toFixed(2)} Lot`}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8E84A4]">
                  {isId ? 'Jika Dipaksa Buka 0.01 Lot:' : 'If Forced at 0.01 Min Lot:'}
                </span>
                <span className="text-[#EF4444] font-bold">
                  -${comparisonResult.standardAnalysis.actualRiskAmount.toFixed(2)} USD (
                  {comparisonResult.standardAnalysis.actualRiskPercentOfAccount}%)
                </span>
              </div>
            </div>
          </div>

          {/* Cent USC Account Outcome */}
          <div className="rounded-xl p-5 bg-[#0E0B14] border border-[#10B981]/35 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981]">
                {isId ? 'Akun Cent (USC)' : 'Cent Account (USC)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981]">
                {isId ? 'Presisi Mikro Aktif' : 'Micro Precision Active'}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/[0.05]">
                <span className="text-[#8E84A4]">{isId ? 'Saldo Akun:' : 'Account Balance:'}</span>
                <span className="text-[#D6A937]">{comparisonResult.centAnalysis.balanceDisplay}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.05]">
                <span className="text-[#8E84A4]">
                  {isId ? 'Lot Cent Direkomendasikan:' : 'Approved Cent Volume:'}
                </span>
                <span className="text-[#D6A937] font-bold">
                  {comparisonResult.centAnalysis.approvedLotSizeOrNull === null
                    ? isId
                      ? 'DITOLAK (< 0.01 Lot)'
                      : 'REJECTED (< 0.01 Min)'
                    : `${comparisonResult.centAnalysis.approvedLotSizeOrNull.toFixed(2)} Cent Lot`}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8E84A4]">
                  {isId ? 'Risiko Aktual jika Kena SL:' : 'Actual Stop-Out Loss:'}
                </span>
                <span className="text-[#10B981] font-bold">
                  -{comparisonResult.centAnalysis.actualRiskAmount.toFixed(2)} USC (-$
                  {comparisonResult.centAnalysis.actualRiskUsdEquivalent.toFixed(2)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTERACTIVE DRAWDOWN RECOVERY SIMULATOR
      ===================================================================== */}
      <section className="rounded-2xl bg-[#17131D] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B99AE8]">
              <TrendingDown className="w-4 h-4 text-[#D6A937]" />
              {isId
                ? 'Simulasi Ketahanan Drawdown & Kekalahan Beruntun'
                : 'Drawdown Recovery & Losing Streak Stress-Tester'}
            </span>
            <h2 className="font-display text-2xl font-bold text-[#F7F4EE] mt-1">
              {isId
                ? 'Mengapa Menjaga Drawdown Tetap Kecil Jauh Lebih Mudah daripada Memulihkannya'
                : 'Why Preventing Deep Drawdowns Is Easier Than Recovering From Them'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between">
              <label htmlFor="dd-slider" className="text-sm font-medium text-[#BEB6CE]">
                {isId ? 'Simulasikan Penurunan Saldo (Drawdown):' : 'Simulate Account Drawdown:'}
              </label>
              <span className="font-mono text-2xl font-bold text-[#EF4444]">
                -{customDrawdownTestPct}%
              </span>
            </div>

            <input
              id="dd-slider"
              type="range"
              min={5}
              max={85}
              step={5}
              value={customDrawdownTestPct}
              onChange={(e) => setCustomDrawdownTestPct(Number(e.target.value))}
              className="w-full accent-[#D6A937] cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#0E0B14]">
                <div className="text-xs text-[#8E84A4]">
                  {isId ? 'Sisa Saldo Akun' : 'Remaining Equity'}
                </div>
                <div className="font-mono text-lg font-bold text-[#F7F4EE] mt-1">
                  {((equity * (100 - customDrawdownTestPct)) / 100).toFixed(0)}{' '}
                  {accountDenomination}
                </div>
                <div className="text-xs text-[#BEB6CE] mt-0.5">
                  {100 - customDrawdownTestPct}% {isId ? 'dari modal awal' : 'of starting capital'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0B14] border border-[#D6A937]/30">
                <div className="text-xs text-[#D6A937]">
                  {isId ? 'Profit untuk Kembali Impas' : 'Gain Needed to Break Even'}
                </div>
                <div className="font-mono text-xl font-bold text-[#D6A937] mt-1">
                  +{customRecoveryNeededPct}%
                </div>
                <div className="text-xs text-[#BEB6CE] mt-0.5">
                  {isId ? 'Dari sisa modal yang ada' : 'On remaining capital'}
                </div>
              </div>
            </div>
          </div>

          {/* 6-Step Losing Streak Table */}
          <div className="lg:col-span-7 overflow-x-auto">
            <div className="text-xs font-semibold text-[#F3E5AB] mb-3">
              {isId
                ? `Simulasi 6 Kekalahan Beruntun: Disiplin Anda (${riskPercentage}% Risiko) vs Trader Agresif (5% Risiko)`
                : `6-Consecutive Loss Simulation: Your ${riskPercentage}% Rule vs. Aggressive 5% Risk`}
            </div>
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-white/10 text-[#8E84A4]">
                  <th className="py-2.5 pr-3">{isId ? 'Loss Ke-' : 'Streak'}</th>
                  <th className="py-2.5 px-3">
                    {isId ? `Saldo Anda (${riskPercentage}%)` : `Your Equity (${riskPercentage}%)`}
                  </th>
                  <th className="py-2.5 px-3">{isId ? 'Drawdown Anda' : 'Your Drawdown'}</th>
                  <th className="py-2.5 px-3">
                    {isId ? 'Saldo Agresif (5%)' : 'Aggressive (5%)'}
                  </th>
                  <th className="py-2.5 pl-3">
                    {isId ? 'Drawdown (5%)' : 'Drawdown (5%)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {drawdownMetrics.streakSimulation.slice(0, 6).map((step) => (
                  <tr key={step.lossNumber}>
                    <td className="py-2.5 pr-3 text-[#BEB6CE]">#{step.lossNumber}</td>
                    <td className="py-2.5 px-3 text-[#10B981] font-semibold">
                      {step.remainingBalanceFixedPercent.toLocaleString()} {accountDenomination}
                    </td>
                    <td className="py-2.5 px-3 text-[#F3E5AB]">-{step.drawdownFixedPercent}%</td>
                    <td className="py-2.5 px-3 text-[#BEB6CE]">
                      {step.remainingBalanceAggressive5Percent.toLocaleString()}{' '}
                      {accountDenomination}
                    </td>
                    <td className="py-2.5 pl-3 text-[#EF4444] font-semibold">
                      -{step.drawdownAggressive5Percent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
