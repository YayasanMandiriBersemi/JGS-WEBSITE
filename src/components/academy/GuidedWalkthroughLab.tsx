'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  LineChart,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';
import type { AcademyLesson } from '@/lib/data/academy-types';
import {
  getModuleGuidedSimulation,
  type ModuleSimulationVisual,
} from '@/lib/data/academy-simulations';
import { LiveTradingViewXauusdTab } from '@/components/academy/Mt5VisualSimulatorPane';
import { JessyPortrait } from '@/components/academy/JessyBuddyAssistant';
import { GoldConfettiBurst } from '@/components/ui/LuxuryMotion';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';

interface GuidedWalkthroughLabProps {
  lesson: AcademyLesson;
  isId: boolean;
}

function SimulationVisualRenderer({
  visual,
  isId,
}: {
  visual: ModuleSimulationVisual;
  isId: boolean;
}) {
  if (visual.kind === 'CANDLE_CHART' && visual.candles && visual.candles.length > 0) {
    const bars = visual.candles;
    const allPrices = bars.flatMap((b) => [b.h, b.l]);
    const minP = Math.min(...allPrices);
    const maxP = Math.max(...allPrices);
    const pad = Math.max((maxP - minP) * 0.14, 0.0005);
    const lo = minP - pad;
    const hi = maxP + pad;
    const w = 680;
    const h = 230;
    const toY = (p: number) => h - 28 - ((p - lo) / Math.max(0.0001, hi - lo)) * (h - 54);
    const stepX = (w - 80) / bars.length;

    return (
      <div className="rounded-2xl border border-[#D6A937]/30 bg-[#0E0B14] p-4 space-y-2">
        <div className="font-mono text-[11px] font-bold text-[#D6A937]">
          {isId ? visual.captionId : visual.captionEn}
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label={visual.captionEn}>
          {[0.25, 0.5, 0.75].map((pct) => {
            const y = 24 + pct * (h - 54);
            return (
              <line
                key={pct}
                x1={20}
                x2={w - 20}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />
            );
          })}

          {bars.map((bar, idx) => {
            const xCenter = 48 + idx * stepX + stepX * 0.35;
            const bodyW = Math.min(30, Math.max(12, stepX * 0.48));
            const isGreen = bar.c >= bar.o;
            const yH = toY(bar.h);
            const yL = toY(bar.l);
            const yTop = toY(Math.max(bar.o, bar.c));
            const yBot = toY(Math.min(bar.o, bar.c));
            const bodyH = Math.max(3, yBot - yTop);
            const fill = isGreen ? '#10B981' : '#EF4444';

            return (
              <g key={idx}>
                <line x1={xCenter} x2={xCenter} y1={yH} y2={yL} stroke={fill} strokeWidth={2.2} />
                <rect
                  x={xCenter - bodyW / 2}
                  y={yTop}
                  width={bodyW}
                  height={bodyH}
                  rx={3}
                  fill={fill}
                />
                {bar.lbl && (
                  <text
                    x={xCenter}
                    y={Math.max(14, yH - 7)}
                    textAnchor="middle"
                    fill="#F3E5AB"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {bar.lbl}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          {visual.zoneLabelA && (
            <span className="rounded-md border border-[#10B981]/40 bg-[#10B981]/10 px-2.5 py-1 text-[#10B981]">
              {visual.zoneLabelA}
            </span>
          )}
          {visual.zoneLabelB && (
            <span className="rounded-md border border-[#D6A937]/40 bg-[#D6A937]/10 px-2.5 py-1 text-[#F3E5AB]">
              {visual.zoneLabelB}
            </span>
          )}
          {visual.zoneLabelC && (
            <span className="rounded-md border border-[#EF4444]/40 bg-[#EF4444]/10 px-2.5 py-1 text-[#FCA5A5]">
              {visual.zoneLabelC}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (visual.kind === 'BAR_COMPARE' && visual.bars) {
    const maxAbs = Math.max(...visual.bars.map((b) => Math.abs(b.value)), 1);
    return (
      <div className="rounded-2xl border border-[#D6A937]/30 bg-[#0E0B14] p-5 space-y-3">
        <div className="font-mono text-[11px] font-bold text-[#D6A937]">
          {isId ? visual.captionId : visual.captionEn}
        </div>
        <div className="space-y-3">
          {visual.bars.map((bar) => {
            const pct = Math.max(8, Math.round((Math.abs(bar.value) / maxAbs) * 100));
            const colorCls =
              bar.tone === 'green'
                ? 'bg-[#10B981]'
                : bar.tone === 'red'
                  ? 'bg-[#EF4444]'
                  : bar.tone === 'blue'
                    ? 'bg-[#60A5FA]'
                    : 'bg-[#D6A937]';
            return (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between font-mono text-xs text-[#F7F4EE]">
                  <span>{bar.label}</span>
                  <strong className="text-[#F3E5AB]">
                    {bar.value} {bar.unit}
                  </strong>
                </div>
                <div className="h-3.5 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${colorCls} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (visual.kind === 'TIMELINE_CLOCK' && visual.clockSlots) {
    return (
      <div className="rounded-2xl border border-[#D6A937]/30 bg-[#0E0B14] p-5 space-y-3">
        <div className="font-mono text-[11px] font-bold text-[#D6A937] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{isId ? visual.captionId : visual.captionEn}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {visual.clockSlots.map((slot) => (
            <div
              key={slot.wib}
              className={`rounded-xl border p-3.5 space-y-1 ${
                slot.status === 'SAFE'
                  ? 'border-[#10B981]/50 bg-[#10B981]/10'
                  : slot.status === 'DANGER'
                    ? 'border-[#EF4444]/50 bg-[#EF4444]/10'
                    : 'border-white/15 bg-white/5'
              }`}
            >
              <div className="font-mono text-xs font-extrabold text-[#F3E5AB]">{slot.wib}</div>
              <div className="text-sm font-bold text-[#F7F4EE]">{slot.title}</div>
              <div className="font-mono text-[11px] text-[#C7BED8]">{slot.spreadLabel}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'EQUITY_CURVE' && visual.curvePoints) {
    const pts = visual.curvePoints;
    const allV = pts.flatMap((p) => [p.safeVal, p.recklessVal]);
    const minV = Math.min(...allV);
    const maxV = Math.max(...allV, minV + 10);
    const w = 640;
    const h = 200;
    const toY = (v: number) => h - 32 - ((v - minV) / Math.max(1, maxV - minV)) * (h - 60);
    const toX = (idx: number) => 56 + (idx / Math.max(1, pts.length - 1)) * (w - 112);

    const safePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.safeVal)}`).join(' ');
    const recklessPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.recklessVal)}`).join(' ');

    return (
      <div className="rounded-2xl border border-[#D6A937]/30 bg-[#0E0B14] p-4 space-y-2">
        <div className="font-mono text-[11px] font-bold text-[#D6A937]">
          {isId ? visual.captionId : visual.captionEn}
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label={visual.captionEn}>
          <path d={recklessPath} fill="none" stroke="#EF4444" strokeWidth={2.5} strokeDasharray="5 5" />
          <path d={safePath} fill="none" stroke="#10B981" strokeWidth={3.5} />
          {pts.map((p, i) => (
            <g key={p.step}>
              <circle cx={toX(i)} cy={toY(p.safeVal)} r={4.5} fill="#10B981" />
              <text x={toX(i)} y={h - 10} textAnchor="middle" fill="#BEB6CE" fontSize="11">
                {p.step}
              </text>
              <text x={toX(i)} y={toY(p.safeVal) - 10} textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">
                {p.safeVal} {visual.curveUnit ?? ''}
              </text>
            </g>
          ))}
        </svg>
        <div className="flex flex-wrap gap-4 font-mono text-[11px]">
          <span className="text-[#10B981]">Garis Hijau: Disiplin SOP JGS</span>
          <span className="text-[#EF4444]">Garis Putus Merah: Ceroboh / Tanpa Rem</span>
        </div>
      </div>
    );
  }

  // Default: TABLE_SPEC
  return (
    <div className="rounded-2xl border border-[#D6A937]/30 bg-[#0E0B14] p-4 sm:p-5 space-y-3 overflow-x-auto">
      <div className="font-mono text-[11px] font-bold text-[#D6A937]">
        {isId ? visual.captionId : visual.captionEn}
      </div>
      <table className="w-full text-left border-collapse text-xs font-mono">
        {visual.specHeaders && (
          <thead>
            <tr className="border-b border-white/15 text-[#F3E5AB]">
              {visual.specHeaders.map((h) => (
                <th key={h} className="py-2 pr-4 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-white/10 text-[#F7F4EE]">
          {(visual.specRows ?? []).map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-2.5 pr-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuidedWalkthroughLab({ lesson, isId }: GuidedWalkthroughLabProps) {
  const { usdIdrRate, rpPerUsc } = useLiveCurrency();
  const tx = (s: string) => injectLiveIdrRates(s, usdIdrRate);
  const sim = getModuleGuidedSimulation(lesson);

  const [pickedStep1, setPickedStep1] = useState<number | null>(null);
  const [pickedStep2Id, setPickedStep2Id] = useState<string | null>(null);
  const [step3Executed, setStep3Executed] = useState<boolean>(false);
  const [confettiKey, setConfettiKey] = useState<number>(0);
  const [showOptionalLiveTv, setShowOptionalLiveTv] = useState<boolean>(false);

  useEffect(() => {
    setPickedStep1(null);
    setPickedStep2Id(null);
    setStep3Executed(false);
    setShowOptionalLiveTv(false);
  }, [lesson.slug]);

  const step1Correct = pickedStep1 === sim.step1.correctIndex;
  const chosenStep2 = sim.step2.choices.find((c) => c.id === pickedStep2Id) ?? null;

  function handleReset() {
    setPickedStep1(null);
    setPickedStep2Id(null);
    setStep3Executed(false);
  }

  function handleRunReplay() {
    setStep3Executed(true);
    if (step1Correct && chosenStep2?.isSafe) {
      setConfettiKey((k) => k + 1);
    }
  }

  return (
    <div className="space-y-6">
      <GoldConfettiBurst triggerKey={confettiKey} />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="space-y-1 max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-gold)]">
            {isId
              ? `AKTIVITAS 03 • SIMULASI PRAKTEK TERPANDU 3 LANGKAH: ${tx(sim.titleId)}`
              : `ACTIVITY 03 • 3-STEP GUIDED SIMULATION: ${sim.titleEn}`}
          </span>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {isId ? tx(sim.briefingId) : sim.briefingEn}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-3 py-2 text-xs font-semibold text-[var(--text-ivory)] hover:border-[#D6A937] shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D6A937]" />
          <span>{isId ? 'Ulangi Lab' : 'Reset'}</span>
        </button>
      </div>

      {/* Topic-Specific Visual Diagram / Chart */}
      <SimulationVisualRenderer visual={sim.visual} isId={isId} />

      {/* STEP 1: Topic Specific Detective Decision */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/60 p-5 space-y-3">
        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
          {isId ? 'LANGKAH 1 • DIAGNOSIS KONSEP & LOKASI' : 'STEP 1 • CONCEPT & LOCATION CHECK'}
        </div>
        <h3 className="font-display text-base sm:text-lg font-bold text-[var(--text-ivory)]">
          {isId ? tx(sim.step1.questionId) : sim.step1.questionEn}
        </h3>

        <div className="space-y-2">
          {sim.step1.options.map((opt, idx) => {
            const selected = pickedStep1 === idx;
            const isCorrect = idx === sim.step1.correctIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setPickedStep1(idx)}
                className={`w-full text-left rounded-xl border p-3.5 text-xs sm:text-sm transition ${
                  selected
                    ? isCorrect
                      ? 'border-[#10B981] bg-[#10B981]/15 text-[var(--text-ivory)]'
                      : 'border-[#EF4444] bg-[#EF4444]/15 text-[var(--text-ivory)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-[var(--text-secondary)] hover:border-[#D6A937]'
                }`}
              >
                <div className="font-semibold">{isId ? tx(opt.labelId) : opt.labelEn}</div>
                {selected && (
                  <p className="mt-1.5 text-xs opacity-90 flex items-start gap-1.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                    )}
                    <span>{isId ? tx(opt.feedbackId) : opt.feedbackEn}</span>
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Parameter & Capital Impact Decision */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/60 p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
            {isId ? 'LANGKAH 2 • KEPUTUSAN PARAMETER MODAL 1.000 USC' : 'STEP 2 • 1,000 USC RISK & PARAMETER CHOICE'}
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#10B981]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kurs Live: 1 USC = Rp{Math.round(rpPerUsc).toLocaleString('id-ID')}</span>
          </span>
        </div>

        <p className="text-sm font-semibold text-[var(--text-ivory)]">
          {isId ? tx(sim.step2.promptId) : sim.step2.promptEn}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sim.step2.choices.map((ch) => {
            const selected = pickedStep2Id === ch.id;
            const riskRp = Math.round(ch.riskUsc * rpPerUsc);
            const rewardRp = Math.round(ch.rewardUsc * rpPerUsc);
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setPickedStep2Id(ch.id)}
                className={`text-left rounded-2xl border p-4 space-y-2 transition ${
                  selected
                    ? ch.isSafe
                      ? 'border-[#10B981] bg-[#10B981]/15'
                      : 'border-[#EF4444] bg-[#EF4444]/15'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface-1)] hover:border-[#D6A937]'
                }`}
              >
                <div className="text-xs sm:text-sm font-bold text-[var(--text-ivory)]">
                  {isId ? tx(ch.labelId) : ch.labelEn}
                </div>
                <div className="font-mono text-[11px] text-[var(--text-secondary)]">
                  Risiko: {ch.riskUsc} USC (Rp{riskRp.toLocaleString('id-ID')}) • Potensi: +{ch.rewardUsc} USC (+Rp{rewardRp.toLocaleString('id-ID')})
                </div>
                {selected && (
                  <p className="text-xs text-[var(--text-ivory)] pt-1 border-t border-white/10">
                    {isId ? tx(ch.consequenceId) : ch.consequenceEn}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Replay Outcome & Jessy Coaching */}
      <div className="rounded-2xl border border-[#D6A937]/40 bg-[var(--bg-surface-1)] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent-gold)]">
              {isId ? 'LANGKAH 3 • HASIL SIMULASI & REVIEW JESSY' : 'STEP 3 • SIMULATION OUTCOME & JESSY REVIEW'}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              {isId
                ? 'Selesaikan Langkah 1 & Langkah 2 lalu tekan Putar Hasil Simulasi.'
                : 'Pick Step 1 and Step 2 above, then execute Replay.'}
            </p>
          </div>

          <button
            type="button"
            disabled={pickedStep1 === null || pickedStep2Id === null}
            onClick={handleRunReplay}
            className="jgs-btn-gold text-xs px-5 py-2.5 disabled:opacity-45 disabled:cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isId ? 'Putar Hasil Simulasi' : 'Execute Simulation'}</span>
          </button>
        </div>

        {step3Executed && (
          <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                step1Correct && chosenStep2?.isSafe
                  ? 'border-[#10B981]/50 bg-[#10B981]/10'
                  : 'border-[#EF4444]/50 bg-[#EF4444]/10'
              }`}
            >
              <div className="font-display text-base font-bold text-[var(--text-ivory)]">
                {step1Correct && chosenStep2?.isSafe
                  ? isId
                    ? tx(sim.step3.outcomeTitleId)
                    : sim.step3.outcomeTitleEn
                  : isId
                    ? 'Evaluasi Ulang! Ada Langkah FOMO / Over-Risk'
                    : 'Review Needed! FOMO or Over-Risk Choice'}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {step1Correct && chosenStep2?.isSafe
                  ? isId
                    ? tx(sim.step3.outcomeBodyId)
                    : sim.step3.outcomeBodyEn
                  : isId
                    ? 'Pastikan kamu memilih diagnosis benar di Langkah 1 dan pilihan berisiko aman <=1% di Langkah 2 sebelum melanjutkan.'
                    : 'Review Step 1 concept accuracy and Step 2 micro risk discipline.'}
              </p>
            </div>

            <div className="rounded-2xl border border-[#D6A937]/35 bg-[#17131D] p-4 flex items-center gap-4 text-[#F7F4EE]">
              <JessyPortrait mood={step1Correct && chosenStep2?.isSafe ? 'cheering' : 'warning'} size={54} />
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937]">
                  {isId ? 'CATATAN JESSY:' : 'JESSY COACHING:'}
                </div>
                <p className="text-xs text-[#F3EFF8]">
                  &ldquo;{isId ? sim.step3.jessyLineId : sim.step3.jessyLineEn}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional Full 600px Live TradingView Drawer */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-4 space-y-3">
        <button
          type="button"
          onClick={() => setShowOptionalLiveTv((v) => !v)}
          className="w-full flex items-center justify-between gap-2 text-xs font-mono font-bold text-[var(--accent-gold)]"
        >
          <span className="inline-flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            <span>
              {showOptionalLiveTv
                ? isId
                  ? 'Tutup Grafik Pasar Live TradingView 600px'
                  : 'Hide Live TradingView 600px Chart'
                : isId
                  ? 'Buka Grafik Pasar Live TradingView 600px (Opsional)'
                  : 'Open Live TradingView 600px Chart (Optional)'}
            </span>
          </span>
          {showOptionalLiveTv ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showOptionalLiveTv && (
          <div className="pt-2">
            <LiveTradingViewXauusdTab
              locale={isId ? 'id' : 'en'}
              defaultSymbol={lesson.studio.liveChartSymbol}
            />
          </div>
        )}
      </div>
    </div>
  );
}
