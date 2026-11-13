'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Gamepad2,
  MoveVertical,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  ARCADE_SCENARIOS,
  type ArcadeAction,
  type PlaygroundArcadeScenario,
} from '@/lib/data/playground-arcade-scenarios';
import { useLocale } from '@/i18n/LocaleContext';
import { useLiveCurrency, useLiveMarket } from '@/lib/context/LiveMarketContext';
import { LiveKursPill } from '@/components/market/LiveKursPill';
import { GoldConfettiBurst, SpotlightCard } from '@/components/ui/LuxuryMotion';
import { JessyPortrait, type JessyMood } from '@/components/academy/JessyBuddyAssistant';

const GRADE_STORAGE_KEY = 'jgs_arcade_grades_v1';

type ReplayOutcome = 'IDLE' | 'RUNNING' | 'TP_HIT' | 'SL_HIT' | 'ENDED_OPEN' | 'WAIT_FINISHED';

function getInitialLevels(sc: PlaygroundArcadeScenario, act: ArcadeAction) {
  const entry = sc.candles[sc.decisionBarIndex].close;
  const slDist =
    act === sc.recommendedAction
      ? Math.abs(entry - sc.recommendedSlPrice)
      : sc.pipSize * 45;
  const tpDist =
    act === sc.recommendedAction
      ? Math.abs(sc.recommendedTpPrice - entry)
      : sc.pipSize * 110;

  if (act === 'BUY') {
    return {
      sl: Number((entry - Math.max(sc.pipSize * 10, slDist)).toFixed(sc.decimals)),
      tp: Number((entry + Math.max(sc.pipSize * 20, tpDist)).toFixed(sc.decimals)),
    };
  }
  if (act === 'SELL') {
    return {
      sl: Number((entry + Math.max(sc.pipSize * 10, slDist)).toFixed(sc.decimals)),
      tp: Number((entry - Math.max(sc.pipSize * 20, tpDist)).toFixed(sc.decimals)),
    };
  }
  return { sl: entry, tp: entry };
}

export function PlaygroundSimulator() {
  const { isId, l } = useLocale();
  const { usdIdrRate } = useLiveMarket();
  const { formatUsdToIdr } = useLiveCurrency();
  const rpPerUsc = usdIdrRate / 100;

  const [selectedId, setSelectedId] = useState<string>(ARCADE_SCENARIOS[0].id);
  const scenario = useMemo(
    () => ARCADE_SCENARIOS.find((s) => s.id === selectedId) ?? ARCADE_SCENARIOS[0],
    [selectedId]
  );

  const [action, setAction] = useState<ArcadeAction>('BUY');
  const [centLot, setCentLot] = useState<number>(0.02);
  const [slPrice, setSlPrice] = useState<number>(
    getInitialLevels(ARCADE_SCENARIOS[0], 'BUY').sl
  );
  const [tpPrice, setTpPrice] = useState<number>(
    getInitialLevels(ARCADE_SCENARIOS[0], 'BUY').tp
  );

  const [visibleBarIdx, setVisibleBarIdx] = useState<number>(scenario.decisionBarIndex);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2 | 5>(1);
  const [outcome, setOutcome] = useState<ReplayOutcome>('IDLE');
  const [confettiKey, setConfettiKey] = useState<number>(0);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);
  const [draggingHandle, setDraggingHandle] = useState<'SL' | 'TP' | null>(null);
  const [savedGrades, setSavedGrades] = useState<Record<string, 'S' | 'A' | 'B' | 'C'>>({});

  const svgRef = useRef<SVGSVGElement | null>(null);
  const decisionBar = scenario.candles[scenario.decisionBarIndex];
  const entryPrice = decisionBar.close;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(GRADE_STORAGE_KEY);
      if (raw) setSavedGrades(JSON.parse(raw) as Record<string, 'S' | 'A' | 'B' | 'C'>);
    } catch {
      // Ignore storage failures
    }
  }, []);

  function saveScenarioGrade(scId: string, grade: 'S' | 'A' | 'B' | 'C') {
    setSavedGrades((prev) => {
      const next = { ...prev, [scId]: grade };
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(GRADE_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore
        }
      }
      return next;
    });
  }

  function handleSelectScenario(id: string) {
    const nextSc = ARCADE_SCENARIOS.find((s) => s.id === id) ?? ARCADE_SCENARIOS[0];
    setSelectedId(nextSc.id);
    const defaultAct: ArcadeAction =
      nextSc.recommendedAction === 'SELL' ? 'SELL' : nextSc.recommendedAction === 'BUY' ? 'BUY' : 'BUY';
    const lvls = getInitialLevels(nextSc, defaultAct);
    setAction(defaultAct);
    setSlPrice(lvls.sl);
    setTpPrice(lvls.tp);
    setVisibleBarIdx(nextSc.decisionBarIndex);
    setIsPlaying(false);
    setOutcome('IDLE');
  }

  function handleSwitchAction(nextAct: ArcadeAction) {
    setAction(nextAct);
    const lvls = getInitialLevels(scenario, nextAct);
    setSlPrice(lvls.sl);
    setTpPrice(lvls.tp);
    setVisibleBarIdx(scenario.decisionBarIndex);
    setIsPlaying(false);
    setOutcome('IDLE');
  }

  function handleResetReplay() {
    setVisibleBarIdx(scenario.decisionBarIndex);
    setIsPlaying(false);
    setOutcome('IDLE');
  }

  // Validate SL & TP geometry cleanly in Indonesian
  const geometryError = useMemo(() => {
    if (action === 'WAIT') return null;
    if (action === 'BUY') {
      if (slPrice >= entryPrice) {
        return isId
          ? 'Untuk posisi BUY, garis Stop Loss wajib berada DI BAWAH harga Entry.'
          : 'For BUY orders, Stop Loss must stay strictly BELOW Entry.';
      }
      if (tpPrice <= entryPrice) {
        return isId
          ? 'Untuk posisi BUY, garis Take Profit wajib berada DI ATAS harga Entry.'
          : 'For BUY orders, Take Profit must sit strictly ABOVE Entry.';
      }
    } else {
      if (slPrice <= entryPrice) {
        return isId
          ? 'Untuk posisi SELL, garis Stop Loss wajib berada DI ATAS harga Entry.'
          : 'For SELL orders, Stop Loss must stay strictly ABOVE Entry.';
      }
      if (tpPrice >= entryPrice) {
        return isId
          ? 'Untuk posisi SELL, garis Take Profit wajib berada DI BAWAH harga Entry.'
          : 'For SELL orders, Take Profit must sit strictly BELOW Entry.';
      }
    }
    return null;
  }, [action, slPrice, tpPrice, entryPrice, isId]);

  // Animated Candle-by-Candle Replay Loop
  useEffect(() => {
    if (!isPlaying) return;
    const delayMs = speedMultiplier === 5 ? 160 : speedMultiplier === 2 ? 360 : 720;

    const timer = setTimeout(() => {
      const nextIdx = visibleBarIdx + 1;
      if (nextIdx >= scenario.candles.length) {
        setIsPlaying(false);
        setOutcome(action === 'WAIT' ? 'WAIT_FINISHED' : 'ENDED_OPEN');
        return;
      }

      setVisibleBarIdx(nextIdx);
      const bar = scenario.candles[nextIdx];

      if (action !== 'WAIT') {
        // Check conservative SL-first if both SL and TP touched inside the same bar
        const slTouched = action === 'BUY' ? bar.low <= slPrice : bar.high >= slPrice;
        const tpTouched = action === 'BUY' ? bar.high >= tpPrice : bar.low <= tpPrice;

        if (slTouched) {
          setIsPlaying(false);
          setOutcome('SL_HIT');
          setShakeTrigger(true);
          setTimeout(() => setShakeTrigger(false), 600);
          return;
        }
        if (tpTouched) {
          setIsPlaying(false);
          setOutcome('TP_HIT');
          setConfettiKey((k) => k + 1);
          return;
        }
      }

      if (nextIdx === scenario.candles.length - 1) {
        setIsPlaying(false);
        setOutcome(action === 'WAIT' ? 'WAIT_FINISHED' : 'ENDED_OPEN');
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isPlaying, visibleBarIdx, speedMultiplier, scenario, action, slPrice, tpPrice]);

  // Live floating/realized math
  const slPips =
    action === 'WAIT'
      ? 0
      : Math.max(1, Math.round(Math.abs(entryPrice - slPrice) / scenario.pipSize));
  const tpPips =
    action === 'WAIT'
      ? 0
      : Math.max(1, Math.round(Math.abs(tpPrice - entryPrice) / scenario.pipSize));
  const rrrVal = slPips > 0 ? Number((tpPips / slPips).toFixed(2)) : 0;

  const lotSteps = Math.max(1, Math.round(centLot / 0.01));
  const riskUsc = Number((slPips * scenario.uscPerPipAtMinCent * lotSteps).toFixed(1));
  const rewardUsc = Number((tpPips * scenario.uscPerPipAtMinCent * lotSteps).toFixed(1));
  const riskRp = Math.round(riskUsc * rpPerUsc);
  const rewardRp = Math.round(rewardUsc * rpPerUsc);

  const currentBar = scenario.candles[Math.min(visibleBarIdx, scenario.candles.length - 1)];
  const liveFloatingUsc = useMemo(() => {
    if (action === 'WAIT') return 0;
    if (outcome === 'TP_HIT') return rewardUsc;
    if (outcome === 'SL_HIT') return -riskUsc;
    const diffPips =
      action === 'BUY'
        ? (currentBar.close - entryPrice) / scenario.pipSize
        : (entryPrice - currentBar.close) / scenario.pipSize;
    return Number((diffPips * scenario.uscPerPipAtMinCent * lotSteps).toFixed(1));
  }, [action, outcome, rewardUsc, riskUsc, currentBar.close, entryPrice, scenario, lotSteps]);

  const liveFloatingRp = Math.round(liveFloatingUsc * rpPerUsc);

  // Compute Diagnostic Grade & Jessy Review once replay resolves
  const gradeReview = useMemo(() => {
    if (outcome === 'IDLE' || outcome === 'RUNNING') return null;

    let grade: 'S' | 'A' | 'B' | 'C' = 'B';
    let mood: JessyMood = 'explaining';
    let headline = '';
    let feedback = '';

    if (scenario.recommendedAction === 'WAIT') {
      if (action === 'WAIT') {
        grade = 'S';
        mood = 'cheering';
        headline = 'KEPUTUSAN DISIPLIN: MENUNGGU (RANK S)';
        feedback = scenario.coachWaitNoteId;
      } else {
        grade = outcome === 'SL_HIT' ? 'C' : 'B';
        mood = 'warning';
        headline = outcome === 'SL_HIT' ? 'STOP LOSS TERSENTUH (JEBAKAN TERBUKTI)' : 'TERLALU BERISIKO!';
        feedback =
          'Skenario ini melanggar aturan keamanan (spread Rollover / bobot kontrak 50x melebihi 1%). Di akun uang asli, memilih WAIT menyelamatkan modalmu!';
      }
    } else if (action === 'WAIT') {
      grade = 'B';
      mood = 'explaining';
      headline = 'KEPUTUSAN DISIPLIN: MENUNGGU';
      feedback = scenario.coachWaitNoteId;
    } else if (action === scenario.recommendedAction) {
      if (outcome === 'TP_HIT' && rrrVal >= 2.0 && riskUsc <= 12) {
        grade = 'S';
        mood = 'cheering';
        headline = 'TARGET TAKE PROFIT TERCAPAI (STRATEGIST RANK S!)';
        feedback = scenario.coachOptimalExplainId;
      } else if (outcome === 'TP_HIT' || liveFloatingUsc > 0) {
        grade = 'A';
        mood = 'happy';
        headline = 'ARAH TEPAT! PROFIT BERSIH TERCETAK (RANK A)';
        feedback =
          riskUsc > 15
            ? `Arah analisismu benar! Catatan kecil: perkecil ukuran lot agar risiko tetap di bawah 10 USC (1% dari modal ${formatUsdToIdr(10)}).`
            : 'Eksekusi rapi searah konfirmasi struktur pasar!';
      } else {
        grade = 'B';
        mood = 'warning';
        headline = 'STOP LOSS TERSENTUH (SL TERLALU SEMPIT)';
        feedback = `Arah sudah benar (${action}), namun Stop Loss tersapu guncangan sumbu sebelum reli. Tempatkan SL aman di luar titik sapuan ${scenario.sweepBoundaryPrice}.`;
      }
    } else {
      grade = 'C';
      mood = 'warning';
      headline = 'STOP LOSS TERSENTUH (MELAWAN KONFIRMASI)';
      feedback = `Keputusan ${action} berlawanan terhadap bukti struktur pasar. Konfirmasi sebenarnya mengarah ke ${scenario.recommendedAction}.`;
    }

    return { grade, mood, headline, feedback };
  }, [outcome, scenario, action, rrrVal, riskUsc, liveFloatingUsc]);

  useEffect(() => {
    if (gradeReview) {
      saveScenarioGrade(scenario.id, gradeReview.grade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcome]);

  // SVG Viewport & Pointer Dragging Geometry
  const shownCandles = scenario.candles.slice(0, visibleBarIdx + 1);
  const priceValues = [
    ...scenario.candles.flatMap((c) => [c.high, c.low]),
    ...(action !== 'WAIT' ? [slPrice, tpPrice] : []),
  ];
  const minP = Math.min(...priceValues);
  const maxP = Math.max(...priceValues);
  const pad = Math.max((maxP - minP) * 0.14, scenario.pipSize * 8);
  const loPrice = minP - pad;
  const hiPrice = maxP + pad;
  const svgW = 760;
  const svgH = 340;
  const chartTop = 24;
  const chartBot = svgH - 34;

  const priceToY = (p: number) =>
    chartBot - ((p - loPrice) / Math.max(0.00001, hiPrice - loPrice)) * (chartBot - chartTop);
  const yToPrice = (y: number) => {
    const clampedY = Math.max(chartTop, Math.min(chartBot, y));
    const ratio = (chartBot - clampedY) / (chartBot - chartTop);
    return Number((loPrice + ratio * (hiPrice - loPrice)).toFixed(scenario.decimals));
  };

  function handleChartPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!draggingHandle || !svgRef.current || action === 'WAIT' || outcome === 'RUNNING') return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleY = svgH / Math.max(1, rect.height);
    const svgY = (e.clientY - rect.top) * scaleY;
    const newPrice = yToPrice(svgY);

    if (draggingHandle === 'SL') {
      if (action === 'BUY' && newPrice < entryPrice - scenario.pipSize * 3) {
        setSlPrice(newPrice);
      } else if (action === 'SELL' && newPrice > entryPrice + scenario.pipSize * 3) {
        setSlPrice(newPrice);
      }
    } else {
      if (action === 'BUY' && newPrice > entryPrice + scenario.pipSize * 5) {
        setTpPrice(newPrice);
      } else if (action === 'SELL' && newPrice < entryPrice - scenario.pipSize * 5) {
        setTpPrice(newPrice);
      }
    }
  }

  function applyQuickPreset(mode: 'SWEEP_SL' | 'RR2' | 'RR3') {
    if (action === 'WAIT') return;
    if (mode === 'SWEEP_SL') {
      const safeDist = Math.max(
        scenario.pipSize * 15,
        Math.abs(entryPrice - scenario.sweepBoundaryPrice) + scenario.pipSize * 6
      );
      setSlPrice(
        Number(
          (action === 'BUY' ? entryPrice - safeDist : entryPrice + safeDist).toFixed(
            scenario.decimals
          )
        )
      );
    } else {
      const mult = mode === 'RR2' ? 2 : 3;
      const d = Math.max(scenario.pipSize * 15, Math.abs(entryPrice - slPrice)) * mult;
      setTpPrice(
        Number((action === 'BUY' ? entryPrice + d : entryPrice - d).toFixed(scenario.decimals))
      );
    }
  }

  function adjustLine(which: 'SL' | 'TP', deltaPips: number) {
    if (action === 'WAIT') return;
    const step = deltaPips * scenario.pipSize;
    if (which === 'SL') {
      setSlPrice((p) => Number((p + step).toFixed(scenario.decimals)));
    } else {
      setTpPrice((p) => Number((p + step).toFixed(scenario.decimals)));
    }
  }

  function startReplay() {
    if (geometryError) return;
    setVisibleBarIdx(scenario.decisionBarIndex);
    setOutcome('RUNNING');
    setIsPlaying(true);
  }

  const formatP = (v: number) =>
    v.toLocaleString('en-US', {
      minimumFractionDigits: scenario.decimals,
      maximumFractionDigits: scenario.decimals,
    });

  const stepX = (svgW - 110) / scenario.candles.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 space-y-8">
      <GoldConfettiBurst triggerKey={confettiKey} />

      {/* Header */}
      <div className="rounded-3xl border border-[#D6A937]/30 bg-[var(--bg-surface-1)] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D6A937]">
              <Gamepad2 className="w-4 h-4" />
              <span>{isId ? 'TRADING PLAYGROUND • CHART ARCADE JGS' : 'INTERACTIVE CHART ARCADE'}</span>
            </span>
            <LiveKursPill compact />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] text-[var(--text-ivory)]">
            {isId
              ? 'Arena Latihan Grafik Interaktif: Pasang Garis SL/TP & Putar Candle'
              : 'Interactive Chart Arcade: Drag SL/TP Lines & Replay Bars Live'}
          </h1>
          <p className="text-sm text-justify leading-[1.8] text-[var(--text-secondary)]">
            {isId
              ? 'Pilih salah satu dari 10 skenario pasar nyata, tentukan BUY / SELL / WAIT, seret garis Stop Loss dan Take Profit langsung pada grafik, lalu putar lilin demi lilin untuk melatih insting eksekusi tanpa membahayakan uang sungguhan.'
              : 'Select any of 10 realistic market setups, pick BUY / SELL / WAIT, drag Stop Loss and Take Profit lines directly on the chart, and replay candles step-by-step risk free.'}
          </p>
        </div>

        <Link href={l('/academy')} className="jgs-btn-outline text-xs shrink-0">
          <span>{isId ? 'Pelajari Teori di Academy ->' : 'Study Theory in Academy ->'}</span>
        </Link>
      </div>

      {/* 10 Visual Scenario Cards Picker */}
      <div className="space-y-3">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
          {isId ? 'PILIH 10 SKENARIO LATIHAN PASAR NYATA:' : 'CHOOSE FROM 10 MARKET SCENARIOS:'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ARCADE_SCENARIOS.map((sc) => {
            const active = sc.id === scenario.id;
            const grade = savedGrades[sc.id];
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectScenario(sc.id)}
                className={`text-left rounded-2xl border p-3.5 space-y-1.5 transition ${
                  active
                    ? 'jgs-tab-active border-[#D6A937] shadow-md'
                    : 'bg-[var(--bg-surface-1)] border-[var(--border-subtle)] hover:border-[#D6A937]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-1 font-mono text-[10px] font-bold">
                  <span className="text-[#D6A937]">{sc.numberLabel}</span>
                  {grade && (
                    <span className="rounded px-1.5 py-0.5 bg-[#10B981]/20 text-[#10B981]">
                      RANK {grade}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-[var(--text-ivory)] leading-snug line-clamp-2">
                  {isId ? sc.titleId : sc.titleEn}
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)]">
                  {sc.instrument} • {sc.timeframe}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Arcade Stage */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT (8 COLS): BRIEFING + DRAGGABLE INTERACTIVE SVG CHART + REPLAY BAR */}
        <div className={`xl:col-span-8 space-y-4 ${shakeTrigger ? 'jgs-shake' : ''}`}>
          {/* Scenario Briefing Box */}
          <SpotlightCard className="p-5 sm:p-6 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#D6A937]">
                BRIEFING SKENARIO • {scenario.instrument} ({scenario.timeframe}) • {isId ? scenario.sessionWibId : scenario.sessionWibEn}
              </span>
              <span className="rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-ivory)]">
                {isId ? scenario.difficultyLabelId : scenario.difficultyLabelEn}
              </span>
            </div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-[var(--text-ivory)]">
              {isId ? scenario.titleId : scenario.titleEn}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {isId ? scenario.briefingId : scenario.briefingEn}
            </p>
          </SpotlightCard>

          {/* Interactive Chart Canvas */}
          <div className="rounded-3xl border border-[#D6A937]/35 bg-[#0E0B14] p-4 sm:p-5 space-y-3 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="font-mono text-xs text-[#F3E5AB] font-bold">
                {action === 'WAIT'
                  ? 'KEPUTUSAN: MENUNGGU / LEWATI SETUP INI'
                  : `Entry: ${formatP(entryPrice)} | SL: ${formatP(slPrice)} (-${slPips}p) | TP: ${formatP(tpPrice)} (+${tpPips}p) | RRR 1:${rrrVal}`}
              </div>
              <div
                className={`font-mono text-xs sm:text-sm font-extrabold tabular-nums ${
                  liveFloatingUsc > 0 ? 'text-[#10B981]' : liveFloatingUsc < 0 ? 'text-[#EF4444]' : 'text-[#C7BED8]'
                }`}
              >
                P&amp;L Simulasi: {liveFloatingUsc >= 0 ? '+' : ''}{liveFloatingUsc} USC ({liveFloatingRp >= 0 ? '+' : ''}Rp{liveFloatingRp.toLocaleString('id-ID')})
              </div>
            </div>

            {action !== 'WAIT' && outcome === 'IDLE' && (
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#10B981]">
                <MoveVertical className="w-3.5 h-3.5" />
                <span>
                  {isId
                    ? 'Geser garis merah (SL) atau hijau (TP) langsung di grafik atau gunakan preset di kanan!'
                    : 'Drag green TP or red SL lines straight on canvas or use right presets!'}
                </span>
              </div>
            )}

            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-auto touch-none select-none cursor-crosshair"
              onPointerMove={handleChartPointerMove}
              onPointerUp={() => setDraggingHandle(null)}
              onPointerLeave={() => setDraggingHandle(null)}
              role="img"
              aria-label={`Interactive Arcade Chart for ${scenario.titleEn}`}
            >
              {/* Subtle price grid */}
              {[0.2, 0.4, 0.6, 0.8].map((r) => {
                const y = chartTop + r * (chartBot - chartTop);
                const pVal = yToPrice(y);
                return (
                  <g key={r}>
                    <line x1={20} x2={svgW - 85} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
                    <text x={svgW - 78} y={y + 4} fill="#8E84A4" fontSize="10" fontFamily="monospace">
                      {formatP(pVal)}
                    </text>
                  </g>
                );
              })}

              {/* Future hidden curtain */}
              {visibleBarIdx < scenario.candles.length - 1 && (
                <rect
                  x={42 + (visibleBarIdx + 1) * stepX}
                  y={chartTop}
                  width={Math.max(0, svgW - 90 - (42 + (visibleBarIdx + 1) * stepX))}
                  height={chartBot - chartTop}
                  fill="rgba(255,255,255,0.025)"
                  stroke="rgba(214,169,55,0.18)"
                  strokeDasharray="4 4"
                />
              )}

              {/* Decision bar vertical divider */}
              <line
                x1={42 + scenario.decisionBarIndex * stepX + stepX * 0.4}
                x2={42 + scenario.decisionBarIndex * stepX + stepX * 0.4}
                y1={chartTop}
                y2={chartBot}
                stroke="rgba(214,169,55,0.35)"
                strokeDasharray="3 3"
              />

              {/* Key liquidity boundary marker */}
              <line
                x1={20}
                x2={svgW - 85}
                y1={priceToY(scenario.sweepBoundaryPrice)}
                y2={priceToY(scenario.sweepBoundaryPrice)}
                stroke="rgba(245,158,11,0.45)"
                strokeDasharray="6 4"
              />

              {/* Candlesticks */}
              {shownCandles.map((bar, idx) => {
                const xc = 42 + idx * stepX + stepX * 0.4;
                const bw = Math.min(26, Math.max(10, stepX * 0.55));
                const isUp = bar.close >= bar.open;
                const fill = isUp ? '#10B981' : '#EF4444';
                const yTop = priceToY(Math.max(bar.open, bar.close));
                const yBot = priceToY(Math.min(bar.open, bar.close));
                return (
                  <g key={bar.index}>
                    <line
                      x1={xc}
                      x2={xc}
                      y1={priceToY(bar.high)}
                      y2={priceToY(bar.low)}
                      stroke={fill}
                      strokeWidth={2}
                    />
                    <rect
                      x={xc - bw / 2}
                      y={yTop}
                      width={bw}
                      height={Math.max(3, yBot - yTop)}
                      rx={2}
                      fill={fill}
                    />
                    {bar.note && (
                      <text
                        x={xc}
                        y={Math.max(14, priceToY(bar.high) - 6)}
                        textAnchor="middle"
                        fill="#F3E5AB"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {bar.note}
                      </text>
                    )}
                    <text
                      x={xc}
                      y={svgH - 10}
                      textAnchor="middle"
                      fill="#7E7494"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {bar.timeLabel}
                    </text>
                  </g>
                );
              })}

              {/* Interactive Entry / SL / TP Lines */}
              {action !== 'WAIT' && (
                <>
                  {/* Entry line */}
                  <line
                    x1={20}
                    x2={svgW - 85}
                    y1={priceToY(entryPrice)}
                    y2={priceToY(entryPrice)}
                    stroke="#D6A937"
                    strokeWidth={1.8}
                  />
                  <rect x={svgW - 82} y={priceToY(entryPrice) - 9} width={76} height={18} rx={4} fill="#D6A937" />
                  <text x={svgW - 44} y={priceToY(entryPrice) + 4} textAnchor="middle" fill="#17131D" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    ENTRY
                  </text>

                  {/* Draggable TP Line */}
                  <g
                    className="cursor-ns-resize"
                    onPointerDown={() => setDraggingHandle('TP')}
                  >
                    <line
                      x1={20}
                      x2={svgW - 85}
                      y1={priceToY(tpPrice)}
                      y2={priceToY(tpPrice)}
                      stroke="#10B981"
                      strokeWidth={2.5}
                    />
                    <rect x={svgW - 82} y={priceToY(tpPrice) - 10} width={76} height={20} rx={5} fill="#10B981" />
                    <text x={svgW - 44} y={priceToY(tpPrice) + 4} textAnchor="middle" fill="#09120F" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      TP +{tpPips}p
                    </text>
                  </g>

                  {/* Draggable SL Line */}
                  <g
                    className="cursor-ns-resize"
                    onPointerDown={() => setDraggingHandle('SL')}
                  >
                    <line
                      x1={20}
                      x2={svgW - 85}
                      y1={priceToY(slPrice)}
                      y2={priceToY(slPrice)}
                      stroke="#EF4444"
                      strokeWidth={2.5}
                    />
                    <rect x={svgW - 82} y={priceToY(slPrice) - 10} width={76} height={20} rx={5} fill="#EF4444" />
                    <text x={svgW - 44} y={priceToY(slPrice) + 4} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      SL -{slPips}p
                    </text>
                  </g>
                </>
              )}
            </svg>

            {/* Replay Controls Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                {!isPlaying ? (
                  <button
                    type="button"
                    disabled={Boolean(geometryError)}
                    onClick={startReplay}
                    className="jgs-btn-gold text-xs px-5 py-2.5 disabled:opacity-45"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isId ? 'Putar Candle Demi Candle' : 'Replay Bar by Bar'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#EF4444] text-white text-xs font-bold"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>{isId ? 'Jeda' : 'Pause'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetReplay}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#17131D] text-xs font-semibold text-[#F7F4EE] hover:border-[#D6A937]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isId ? 'Reset' : 'Reset'}</span>
                </button>
              </div>

              {/* Speed Selectors */}
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#17131D] p-1 font-mono text-xs">
                <span className="px-2 text-[10px] text-[#8E84A4]">KECEPATAN:</span>
                {([1, 2, 5] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setSpeedMultiplier(spd)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      speedMultiplier === spd
                        ? 'bg-[#D6A937] text-[#17131D]'
                        : 'text-[#BEB6CE] hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Outcome & Jessy Diagnostic Coaching Review */}
          {gradeReview && (
            <div className="rounded-3xl border-2 border-[#D6A937]/50 bg-[#17131D] p-6 space-y-4 text-[#F7F4EE] shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#10B981]">
                  {gradeReview.grade === 'S' || gradeReview.grade === 'A' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                  )}
                  <span>{gradeReview.headline}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D6A937] px-3.5 py-1 font-mono text-xs font-extrabold text-[#17131D]">
                  <Award className="w-3.5 h-3.5" />
                  <span>RANK {gradeReview.grade}</span>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <JessyPortrait mood={gradeReview.mood} size={58} />
                <div className="space-y-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937]">
                    EVALUASI PELATIH JESSY
                  </div>
                  <p className="text-sm text-[#F3EFF8] leading-relaxed">{gradeReview.feedback}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT (4 COLS): ZERO-TYPING ARCADE CONTROLS */}
        <div className="xl:col-span-4 space-y-4">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-5 sm:p-6 space-y-5">
            <div className="space-y-1 border-b border-[var(--border-subtle)] pb-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937]">
                KOKPIT KEPUTUSAN CEPAT (TANPA KETIK MANUAL)
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text-ivory)]">
                1. Pilih Arah Eksekusi
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => handleSwitchAction('BUY')}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-extrabold border flex items-center justify-center gap-2 transition ${
                  action === 'BUY'
                    ? 'bg-[#10B981] text-[#09120F] border-[#10B981]'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#10B981]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>PASANG BUY (NAIK)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchAction('SELL')}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-extrabold border flex items-center justify-center gap-2 transition ${
                  action === 'SELL'
                    ? 'bg-[#EF4444] text-white border-[#EF4444]'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#EF4444]'
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                <span>PASANG SELL (TURUN)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchAction('WAIT')}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-extrabold border flex items-center justify-center gap-2 transition ${
                  action === 'WAIT'
                    ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                    : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-ivory)] hover:border-[#D6A937]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>LEWATI / WAIT (DISIPLIN)</span>
              </button>
            </div>

            {action !== 'WAIT' && (
              <>
                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="font-mono text-xs font-bold text-[var(--text-ivory)]">
                    2. Ukuran Lot Akun Cent
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[0.01, 0.02, 0.05].map((lt) => (
                      <button
                        key={lt}
                        type="button"
                        onClick={() => setCentLot(lt)}
                        className={`py-2 rounded-xl font-mono text-xs font-bold border transition ${
                          centLot === lt
                            ? 'bg-[#D6A937] text-[#17131D] border-[#D6A937]'
                            : 'bg-[var(--bg-surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {lt.toFixed(2)} Lot
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <div className="font-mono text-xs font-bold text-[var(--text-ivory)]">
                    3. Atur Garis SL &amp; TP Cepat (Atau Seret di Grafik)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyQuickPreset('SWEEP_SL')}
                      className="px-3 py-1.5 rounded-lg border border-[#EF4444]/45 bg-[#EF4444]/10 font-mono text-[11px] font-bold text-[#FCA5A5] hover:bg-[#EF4444]/20"
                    >
                      SL di balik Wick Sweep
                    </button>
                    <button
                      type="button"
                      onClick={() => applyQuickPreset('RR2')}
                      className="px-3 py-1.5 rounded-lg border border-[#10B981]/45 bg-[#10B981]/10 font-mono text-[11px] font-bold text-[#10B981] hover:bg-[#10B981]/20"
                    >
                      TP 1:2
                    </button>
                    <button
                      type="button"
                      onClick={() => applyQuickPreset('RR3')}
                      className="px-3 py-1.5 rounded-lg border border-[#10B981]/45 bg-[#10B981]/10 font-mono text-[11px] font-bold text-[#10B981] hover:bg-[#10B981]/20"
                    >
                      TP 1:3
                    </button>
                  </div>

                  {/* Nudge Steppers */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-2.5 space-y-1.5">
                      <span className="text-[#EF4444] font-bold block">Stop Loss (-{slPips}p)</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => adjustLine('SL', -5)}
                          className="flex-1 py-1 rounded bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] font-bold"
                        >
                          -5p
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustLine('SL', 5)}
                          className="flex-1 py-1 rounded bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] font-bold"
                        >
                          +5p
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-2.5 space-y-1.5">
                      <span className="text-[#10B981] font-bold block">Take Profit (+{tpPips}p)</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => adjustLine('TP', -10)}
                          className="flex-1 py-1 rounded bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] font-bold"
                        >
                          -10p
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustLine('TP', 10)}
                          className="flex-1 py-1 rounded bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] font-bold"
                        >
                          +10p
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {geometryError && (
                  <div className="rounded-xl border border-[#EF4444]/60 bg-[#EF4444]/15 p-3 text-xs font-semibold text-[#FCA5A5]">
                    {geometryError}
                  </div>
                )}

                {/* Live Rupiah & USC Telemetry Box */}
                <div className="rounded-2xl border border-[#D6A937]/35 bg-[#D6A937]/10 p-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Rasio Risk : Reward</span>
                    <strong className="text-[var(--accent-gold)]">1 : {rrrVal}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Risiko jika Kena SL</span>
                    <strong className="text-[#EF4444]">
                      -{riskUsc} USC (-Rp{riskRp.toLocaleString('id-ID')})
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Target jika Kena TP</span>
                    <strong className="text-[#10B981]">
                      +{rewardUsc} USC (+Rp{rewardRp.toLocaleString('id-ID')})
                    </strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
