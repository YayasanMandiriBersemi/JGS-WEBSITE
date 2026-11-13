'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  Send,
  Play,
  LineChart,
  MessageCircle,
  Trophy,
  X,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Award,
  Crown,
} from 'lucide-react';
import { AcademyLesson } from '@/lib/data/academy-lessons';
import { injectLiveIdrRates } from '@/lib/currency/live-idr';
import { useLiveCurrency } from '@/lib/context/LiveMarketContext';

export type JessyMood = 'happy' | 'explaining' | 'warning' | 'cheering';

interface JessyPortraitProps {
  mood?: JessyMood;
  size?: number;
  customImageSrc?: string;
  floating?: boolean;
  className?: string;
}

export function JessyPortrait({
  mood = 'happy',
  size = 96,
  customImageSrc = '/images/jessy-waifu.png',
  floating = false,
  className = '',
}: JessyPortraitProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const ringColor =
    mood === 'warning'
      ? 'border-[#EF4444]'
      : mood === 'cheering'
      ? 'border-[#10B981]'
      : 'border-[#D6A937]';

  const bgGlow =
    mood === 'warning'
      ? 'rgba(239, 68, 68, 0.28)'
      : mood === 'cheering'
      ? 'rgba(16, 185, 129, 0.30)'
      : mood === 'explaining'
      ? 'rgba(126, 34, 206, 0.28)'
      : 'rgba(214, 169, 55, 0.28)';

  const renderMoodBadgeIcon = () => {
    if (mood === 'warning') return <AlertTriangle className="w-3 h-3 text-[#EF4444]" strokeWidth={1.75} />;
    if (mood === 'cheering') return <Award className="w-3 h-3 text-[#10B981]" strokeWidth={1.75} />;
    if (mood === 'explaining') return <Sparkles className="w-3 h-3 text-[#B99AE8]" strokeWidth={1.75} />;
    return <Crown className="w-3 h-3 text-[#D6A937]" strokeWidth={1.75} />;
  };

  if (customImageSrc && !imgFailed) {
    return (
      <div
        style={{ width: size, height: size, boxShadow: `0 0 26px ${bgGlow}` }}
        className={`relative rounded-2xl overflow-hidden border-2 ${ringColor} bg-[#17131D] shrink-0 transition-all duration-300 ${
          floating ? 'animate-[bounce_4.5s_ease-in-out_infinite]' : ''
        } ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customImageSrc}
          alt="Jessy, Partner Belajar Pribadi JGS Academy"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-top"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-1 right-1 p-1 rounded-md bg-[#17131D]/90 border border-[#D6A937]/50 flex items-center justify-center"
        >
          {renderMoodBadgeIcon()}
        </span>
      </div>
    );
  }

  const accentColor =
    mood === 'warning' ? '#EF4444' : mood === 'cheering' ? '#F3E5AB' : '#D6A937';

  return (
    <div
      style={{ width: size, height: size, boxShadow: `0 0 24px ${bgGlow}` }}
      className={`relative rounded-2xl overflow-hidden border-2 border-[#D6A937]/70 bg-gradient-to-b from-[#211B2A] to-[#14101A] shrink-0 transition-all duration-300 ${className}`}
      aria-label={`Jessy Study Partner (${mood})`}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="62" r="52" fill={bgGlow} />
        <path
          d="M24 52 C20 26, 40 16, 60 16 C80 16, 100 26, 96 52 L100 105 L20 105 Z"
          fill="#1D1628"
        />
        <path d="M27 36 L22 14 L44 25 Z" fill="#17131D" stroke={accentColor} strokeWidth="2" />
        <path d="M93 36 L98 14 L76 25 Z" fill="#17131D" stroke={accentColor} strokeWidth="2" />
        <path
          d="M26 44 C26 18, 94 18, 94 44"
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M16 120 C18 92, 34 86, 60 86 C86 86, 102 92, 104 120 Z"
          fill="#120E19"
          stroke={accentColor}
          strokeWidth="1.5"
        />
        <rect x="53" y="75" width="14" height="15" rx="5" fill="#FCE5D8" />
        <path
          d="M35 46 C35 32, 85 32, 85 46 C85 68, 74 82, 60 83 C46 82, 35 68, 35 46 Z"
          fill="#FFEFE6"
        />
        <path
          d="M32 48 C34 26, 86 26, 88 48 C82 36, 74 46, 68 34 C62 48, 52 46, 46 34 C41 44, 36 44, 32 48 Z"
          fill="#20182E"
        />
        <ellipse cx="47" cy="56" rx="5" ry="5" fill="#17131D" />
        <ellipse cx="73" cy="56" rx="5" ry="5" fill="#17131D" />
        <circle cx="47" cy="56" r="3" fill="#D6A937" />
        <circle cx="73" cy="56" r="3" fill="#D6A937" />
        <rect x="38" y="50" width="18" height="12" rx="4" fill="none" stroke="#D6A937" strokeWidth="1.6" />
        <rect x="64" y="50" width="18" height="12" rx="4" fill="none" stroke="#D6A937" strokeWidth="1.6" />
        <line x1="56" y1="55" x2="64" y2="55" stroke="#D6A937" strokeWidth="1.6" />
        <path d="M55 69 Q60 74 65 69" fill="none" stroke="#C9647A" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

interface ChatMessage {
  id: string;
  sender: 'jessy' | 'user';
  text: string;
  actionTab?: 'MT5_SIM' | 'LIVE_TV' | 'JESSY_QUIZ';
  actionLabel?: string;
}

export function generateJessyMentorReply(
  rawQuestion: string,
  currentLesson: AcademyLesson,
  isId: boolean
): ChatMessage {
  const q = rawQuestion.toLowerCase();

  if (q.includes('inflasi') || q.includes('uang') || q.includes('fed') || q.includes('cpi') || q.includes('nfp') || q.includes('makro')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Sini aku jelasin simpel ya~ Bayangin harga mie ayam dulu Rp8.000, sekarang Rp15.000. Uangmu nominalnya sama, tapi tenaganya nyusut, itulah inflasi! Nah, bank sentral seperti The Fed menaikkan atau menurunkan suku bunga buat ngerem inflasi, dan setiap kali data CPI atau NFP AS keluar, harga Emas (XAUUSD) dan Dolar langsung bereaksi kencang!'
        : 'Think of inflation simply: your cash buys fewer bowls of food each year. Central banks like the Fed raise or cut interest rates around CPI & NFP releases, and Gold (XAUUSD) reacts sharply to those liquidity repricing waves!',
    };
  }

  if (q.includes('broker') || q.includes('mt5') || q.includes('aplikasi') || q.includes('book')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Jangan sampai ketuker ya kamu! Broker itu ibarat brankas/bank tempatmu daftar akun dan titip modal ($10 diubah jadi 1.000 USC). MetaTrader 5 (MT5) itu murni aplikasi kokpit buat pencet Buy/Sell dan pasang Stop Loss, sedangkan TradingView itu peta analisis tajam kita!'
        : 'Never confuse them! Your Broker is the vault holding your $10 (1,000 USC) account; MetaTrader 5 (MT5) is strictly the execution cockpit to place SL/TP orders, while TradingView is our ultra-clean charting map!',
      actionTab: 'MT5_SIM',
      actionLabel: isId ? 'Buka Slide Kokpit MT5 ->' : 'Try MT5 Cockpit Slide ->',
    };
  }

  if (q.includes('fvg') || q.includes('gap') || q.includes('ict') || q.includes('sweep') || q.includes('killzone') || q.includes('mss') || q.includes('order block')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Hihi, aku suka kamu nanya ICT! Urutan wajib kita cuma 4 langkah kok: (1) Tunggu jam Killzone (London 14–17 WIB / NY 19–22 WIB), (2) Tunggu Stop Loss orang lain disapu dulu (Liquidity Sweep), (3) Lihat dorongan kencang yang mematahkan struktur (MSS), baru (4) Antri manis di celah FVG dengan SL di balik sweep~'
        : 'Our ICT workflow stays super clean in 4 steps: (1) Killzone Time first, (2) Liquidity Sweep (BSL/SSL), (3) Displacement + MSS confirmation, and (4) Calm entry inside Fair Value Gap with SL behind the sweep!',
      actionTab: 'LIVE_TV',
      actionLabel: isId ? 'Latihan Lihat di Grafik 600px ->' : 'Spot It on 600px Chart ->',
    };
  }

  if (q.includes('stop loss') || q.includes('sl') || q.includes('kalah') || q.includes('loss') || q.includes('rugi') || q.includes('mc') || q.includes('drawdown')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Peluk dulu semangatmu~ Kena Stop Loss di JGS itu tanda kamu DISIPLIN, bukan gagal! Kalau kamu pakai 0.02 lot Cent di 1.000 USC (risiko maksimal -10 USC = Rp1.600), 1x SL cuma menghabiskan 1% nyawa, masih punya 99 nyawa lagi! Ingat batas Rem Darurat Harian: 2x SL beruntun = tutup MT5 hari itu!'
        : 'Hitting a small 1% Stop Loss (-10 USC on 1,000 USC Cent) proves discipline, never failure! Your seatbelt protected 99% of your capital. And after 2 consecutive losses in one day, our Daily Circuit Breaker locks MT5 cleanly!',
      actionTab: 'MT5_SIM',
      actionLabel: isId ? 'Uji SL Aman di Simulator MT5 ->' : 'Test Safe SL in Simulator ->',
    };
  }

  if (q.includes('$10') || q.includes('10') || q.includes('cent') || q.includes('usc') || q.includes('mulai') || q.includes('lot') || q.includes('oz')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Ini rahasia emas JGS: jangan masuk ke Akun Standar pakai $10 karena 0.01 lot = 1 oz (goyang dikit langsung MC!). Di Akun Cent yang sudah kamu cek spesifikasinya (Contract Size = 1 oz pada XAUUSDc), $10 berubah jadi 1.000 USC. Kamu bisa belajar pakai 0.01–0.02 Cent Lot dengan risiko cuma Rp1.600 per setup!'
        : 'Never put $10 into a 100 oz Standard Gold trap! Verify XAUUSDc Contract Size = 1 oz so $10 equals 1,000 USC, letting you trade calmly with 1% (10 USC = $0.10) max risk per trade!',
      actionTab: 'MT5_SIM',
      actionLabel: isId ? 'Bandingkan 1 oz vs 100 oz ->' : 'Compare 1 oz vs 100 oz ->',
    };
  }

  if (q.includes('wyckoff') || q.includes('spring') || q.includes('upthrust') || q.includes('supply') || q.includes('demand')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Keren kamu nanya metode klasik tahun 1930-an ini! Richard Wyckoff ngajarin bahwa "Composite Man" (institusi besar) mengumpulkan barang diam-diam lewat fase Accumulation lalu memancing ritel keluar lewat pancingan Spring (menembus lantai sebentar sebelum terbang naik). Sebenarnya konsep Liquidity Sweep modern di ICT itu berakar dari ide Wyckoff lho~'
        : 'Richard Wyckoff (1930s) mapped how institutional "Composite Man" operators engineer Spring & Upthrust traps during Accumulation/Distribution, which directly evolved into modern Liquidity Sweeps!',
    };
  }

  if (q.includes('elliott') || q.includes('wave') || q.includes('fibo') || q.includes('harmonic')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Gampangnya gini: Elliott Wave (1938) memetakan psikologi kerumunan pasar ke dalam 5 gelombang dorong dan 3 gelombang koreksi. Sementara Fibonacci (61.8% & 50%) dipakai sebagai penggaris diskon objektif supaya kamu nggak beli kemahalan di pucuk!'
        : 'Elliott Wave maps mass sentiment swings across 5 impulse + 3 corrective legs, while Fibonacci ratios (50% / 61.8%) pinpoint objective Discount retracements!',
    };
  }

  if (q.includes('profile') || q.includes('auction') || q.includes('order flow') || q.includes('dom') || q.includes('poc')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Auction Market Theory melihat pasar seperti rumah lelang dua arah mencari harga wajar! Point of Control (POC) adalah level harga yang paling ramai disepakati pembeli & penjual, sedangkan Depth of Market (DOM) memperlihatkan antrian Limit Order sungguhan yang sedang menunggu dieksekusi.'
        : 'Auction Market Theory treats price like a continuous two-way auction: Point of Control (POC) captures peak volume agreement while DOM shows live resting liquidity queues.',
    };
  }

  if (q.includes('robot') || q.includes('ea') || q.includes('quant') || q.includes('copy') || q.includes('hwm') || q.includes('martingale') || q.includes('kahneman')) {
    return {
      id: `j-${Date.now()}-${Math.random()}`,
      sender: 'jessy',
      text: isId
        ? 'Hati-hati ya sama janji robot "pasti profit tanpa rugi"! Robot Martingale tanpa Stop Loss menggandakan lot sampai seluruh akun rata tanah. Di JGS Quant, bot wajib lulus Real-Tick Backtest & Hard SL, sementara Copy Trading kami memakai High-Water Mark (HWM) sehingga kamu cuma bayar fee 30% saat saldo benar-benar mencetak puncak profit baru!'
        : 'Never trust no-SL Martingale bots! JGS Quant systems enforce hard Stop Losses verified via Real-Tick & Out-of-Sample audits, and Copy Trading strictly enforces High-Water Mark ($0 performance fee during drawdown recovery)!',
    };
  }

  return {
    id: `j-${Date.now()}-${Math.random()}`,
    sender: 'jessy',
    text: isId
      ? `Pertanyaan cerdas banget! Di modul "${currentLesson.title}" ini, pegang satu prinsip ini bersamaku ya: ${(currentLesson.jeyStreetRuleId || currentLesson.jeyStreetRule)} Kalau mau, yuk lihat slide Penjelasan Bahasa Santai atau coba langsung di Simulator MT5~`
      : `Love that curiosity! In "${currentLesson.title}", remember our golden rule together: ${currentLesson.jeyStreetRule} Try toggling Jessy Casual Mode or testing the 600px chart & MT5 simulator slides!`,
    actionTab: currentLesson.studio.practiceTargetTab,
    actionLabel: isId ? 'Lanjut ke Lab Praktik Modul ->' : 'Open Lesson Practice Lab ->',
  };
}

function renderJessyFormatted(text: string, usdIdrRate: number) {
  if (!text) return null;
  const interpolated = injectLiveIdrRates(text, usdIdrRate);
  const parts = interpolated.split(/(\*\*[^*\n]+?\*\*|`[^`\n]+?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#F7F4EE]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={idx} className="px-1 py-0.5 rounded bg-black/30 font-mono text-[0.9em] text-[#D6A937]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

interface JessyStudyBuddyDrawerProps {
  locale: 'id' | 'en';
  currentLesson: AcademyLesson;
  moodOverride?: JessyMood;
  warningMessage?: string | null;
  onJumpToTab?: (tab: 'MT5_SIM' | 'LIVE_TV' | 'JESSY_QUIZ') => void;
}

export function JessyStudyBuddyDrawer({
  locale,
  currentLesson,
  moodOverride,
  warningMessage,
  onJumpToTab,
}: JessyStudyBuddyDrawerProps) {
  const isId = locale === 'id';
  const { usdIdrRate } = useLiveCurrency();
  const [questionInput, setQuestionInput] = useState('');
  const [customMessages, setCustomMessages] = useState<ChatMessage[]>([]);

  const activeMood: JessyMood = moodOverride ?? 'explaining';

  const suggestedPrompts = useMemo(
    () =>
      isId
        ? [
            'Jessy, gimana cara mulai dari $10?',
            'Apa bedanya Broker sama MT5?',
            'Apa itu FVG (Fair Value Gap)?',
            'Kenapa Martingale & HWM itu penting?',
          ]
        : [
            'Jessy, how do I start safely with $10?',
            'Difference between a Broker and MT5?',
            'Explain Fair Value Gap (FVG) simply!',
            'Why do Martingale & HWM matter?',
          ],
    [isId]
  );

  function handleSendQuestion(e: React.FormEvent) {
    e.preventDefault();
    const clean = questionInput.trim();
    if (!clean) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: clean };
    const replyMsg = generateJessyMentorReply(clean, currentLesson, isId);
    setCustomMessages((prev) => [...prev, userMsg, replyMsg]);
    setQuestionInput('');
  }

  function handleQuickPrompt(prompt: string) {
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: prompt };
    const replyMsg = generateJessyMentorReply(prompt, currentLesson, isId);
    setCustomMessages((prev) => [...prev, userMsg, replyMsg]);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#D6A937]/35 bg-[#17131D] p-4 flex items-center gap-4">
        <JessyPortrait mood={activeMood} size={80} />
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-base font-bold text-[#F7F4EE]">Jessy</span>
            <span className="rounded-full bg-[#D6A937]/15 border border-[#D6A937]/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#D6A937]">
              JGS PERSONAL STUDY PARTNER
            </span>
          </div>
          <p className="text-xs text-[#BEB6CE] leading-relaxed">
            {warningMessage
              ? warningMessage
              : isId
              ? 'Aku siap bantu kamu pelan-pelan pakai bahasa sehari-hari, tanyakan apa saja tanpa sungkan ya!'
              : 'Ask me anything in plain everyday language, I’ll guide every step cleanly with you!'}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E84A4]">
          {isId ? 'KLIK PERTANYAAN CEPAT UNTUK JESSY:' : 'QUICK QUESTIONS FOR JESSY:'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handleQuickPrompt(p)}
              className="rounded-xl border border-white/10 bg-[#0E0B14] px-3 py-1.5 text-xs text-[#BEB6CE] hover:border-[#D6A937]/50 hover:text-[#D6A937] transition-all text-left"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0E0B14] p-4 space-y-3 max-h-64 overflow-y-auto">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D6A937] shrink-0 mt-1" />
          <div className="rounded-xl rounded-tl-none bg-[#17131D] border border-[#D6A937]/25 p-3 text-xs text-[#F7F4EE] leading-relaxed space-y-2">
            <p>{renderJessyFormatted(isId ? currentLesson.studio.jessyBabyExplainId : currentLesson.studio.jessyBabyExplainEn, usdIdrRate)}</p>
            {onJumpToTab && (
              <button
                type="button"
                onClick={() => onJumpToTab(currentLesson.studio.practiceTargetTab)}
                className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#D6A937] hover:underline"
              >
                {currentLesson.studio.practiceTargetTab === 'LIVE_TV' ? (
                  <LineChart className="w-3.5 h-3.5" />
                ) : currentLesson.studio.practiceTargetTab === 'MT5_SIM' ? (
                  <Play className="w-3.5 h-3.5" />
                ) : (
                  <Trophy className="w-3.5 h-3.5" />
                )}
                <span>{isId ? 'Buka Lab Praktik Modul Ini ->' : 'Open Lesson Practice Tab ->'}</span>
              </button>
            )}
          </div>
        </div>

        {customMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'jessy' && (
              <MessageCircle className="w-4 h-4 text-[#B99AE8] shrink-0 mt-1" />
            )}
            <div
              className={`rounded-xl p-3 text-xs leading-relaxed max-w-[88%] space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-[#D6A937] text-[#17131D] font-semibold rounded-tr-none'
                  : 'bg-[#17131D] border border-white/10 text-[#F7F4EE] rounded-tl-none'
              }`}
            >
              <p>{msg.sender === 'jessy' ? renderJessyFormatted(msg.text, usdIdrRate) : msg.text}</p>
              {msg.actionTab && msg.actionLabel && onJumpToTab && (
                <button
                  type="button"
                  onClick={() => onJumpToTab(msg.actionTab!)}
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#D6A937] hover:underline"
                >
                  <span>{msg.actionLabel}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendQuestion} className="flex items-center gap-2">
        <input
          type="text"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder={
            isId
              ? 'Tulis pertanyaanmu ke Jessy (mis: Apa bedanya Broker sama MT5?)...'
              : 'Ask Jessy anything (e.g. What is Fair Value Gap?)...'
          }
          className="jgs-themed-input flex-1 px-3.5 py-2 rounded-xl text-xs"
        />
        <button
          type="submit"
          aria-label={isId ? 'Kirim pertanyaan ke Jessy' : 'Send question to Jessy'}
          className="jgs-btn-gold py-2.5 px-4 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

interface InlineJessyBabyExplainButtonProps {
  locale: 'id' | 'en';
  lesson: AcademyLesson;
}

export function InlineJessyBabyExplainBox({ locale, lesson }: InlineJessyBabyExplainButtonProps) {
  const isId = locale === 'id';
  const { usdIdrRate } = useLiveCurrency();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#D6A937]/50 bg-[#D6A937]/10 px-4 py-3 text-left transition-all duration-300 hover:bg-[#D6A937]/20 active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <JessyPortrait mood={open ? 'explaining' : 'happy'} size={44} />
          <div>
            <span className="font-display text-sm font-bold text-[#D6A937] block">
              {isId ? 'Jessy, Jelasin Pakai Bahasa Bayi!' : 'Jessy, Explain Like I’m New!'}
            </span>
            <span className="text-[11px] text-[var(--text-secondary)]">
              {open
                ? isId
                  ? 'Klik untuk tutup cerita santai Jessy'
                  : 'Click to collapse Jessy’s plain story'
                : isId
                ? 'Klik 1x biar aku jelasin pakai bahasa sehari-hari (0% jargon)'
                : 'Click for a zero-jargon everyday story from Jessy'}
            </span>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-[#D6A937] shrink-0" />
      </button>

      {open && (
        <div className="rounded-2xl border border-[#D6A937]/40 bg-[#14101A] p-4 flex items-start gap-3.5 transition-all duration-300">
          <JessyPortrait mood="explaining" size={56} />
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D6A937]">
              JESSY STUDY NOTE // ZERO-JARGON VERSION
            </span>
            <p className="text-xs sm:text-sm text-[#F7F4EE] leading-relaxed">
              {renderJessyFormatted(isId ? lesson.studio.jessyBabyExplainId : lesson.studio.jessyBabyExplainEn, usdIdrRate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// GLOBAL FLOATING "BINGUNG? TANYA JESSY~" SLIDE-OVER DRAWER (TASK 6)
// ============================================================================

interface GlobalFloatingJessyDrawerProps {
  locale: 'id' | 'en';
  currentLesson: AcademyLesson;
  activeSlideIndex?: number;
  moodOverride?: JessyMood;
  warningMessage?: string | null;
  onJumpToSlide?: (slideNumber: number) => void;
  controlledOpen?: boolean;
  onControlledOpenChange?: (open: boolean) => void;
  hideFloatingButton?: boolean;
}

export function GlobalFloatingJessyDrawer({
  locale,
  currentLesson,
  activeSlideIndex,
  moodOverride = 'happy',
  warningMessage,
  onJumpToSlide,
  controlledOpen,
  onControlledOpenChange,
  hideFloatingButton = false,
}: GlobalFloatingJessyDrawerProps) {
  const isId = locale === 'id';
  const [internalOpen, setInternalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (next: boolean) => {
    setInternalOpen(next);
    onControlledOpenChange?.(next);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const slideContextNote = useMemo(() => {
    if (!activeSlideIndex) {
      return isId
        ? `Kamu lagi belajar modul ${currentLesson.lessonNumber}: "${currentLesson.title}". Ada istilah atau rumus yang bikin bingung? Tanyakan ke aku pakai bahasa sehari-hari ya~`
        : `Studying module ${currentLesson.lessonNumber}: "${currentLesson.title}". Ask anything in plain everyday words!`;
    }
    const labelsId = [
      '01. Diktat Kuliah Mendalam (Dari Ritel ke Institusional)',
      '02. Video Perkuliahan (Bahasa Indonesia)',
      '03. Laboratorium Pasar (Live Chart 600px & Kokpit MT5)',
      '04. Kuis Konsep & Ujian Esai Pemahaman (2 SKS)',
    ];
    const label = labelsId[activeSlideIndex - 1] ?? `Aktivitas 0${activeSlideIndex}`;
    return isId
      ? `Kamu lagi di ${label} pada Modul ${currentLesson.lessonNumber}. Bingung? Aku siap jelasin pelan-pelan buat kamu.`
      : `You are on Activity ${activeSlideIndex} of Module ${currentLesson.lessonNumber}. Ask me anything simply!`;
  }, [activeSlideIndex, currentLesson.lessonNumber, currentLesson.title, isId]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Strictly Pinned to Bottom-Right Corner Outside Classroom & Hidden When Docked */}
      {!isOpen && !hideFloatingButton && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={isId ? 'Bingung? Tanya Jessy!' : 'Confused? Ask Jessy!'}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 bg-[#17131D]/95 border-2 border-[#D6A937] shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#F3E5AB]/70 bg-[#211B2A] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jessy-waifu.png"
              alt="Jessy, Study Partner Floating Avatar"
              className="w-full h-full object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#17131D] animate-pulse"
            />
          </div>
          <div className="text-left leading-tight">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[#F3E5AB]">
              JGS Mentor
            </div>
            <div className="text-xs font-bold text-[#F7F4EE] group-hover:text-[#D6A937] transition-colors">
              {isId ? 'Bingung? Tanya Jessy~' : 'Ask Jessy~'}
            </div>
          </div>
        </button>
      )}

      {/* Slide-Over Mentor Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end bg-black/65 backdrop-blur-sm">
          <div
            className="w-full max-w-md h-full bg-[#17131D] border-l border-[#D6A937]/40 shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={isId ? 'Ruang Tanya Jessy' : 'Ask Jessy Drawer'}
          >
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#14101A]">
              <div className="flex items-center gap-3 min-w-0">
                <JessyPortrait mood={moodOverride} size={52} />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-[#F7F4EE]">
                      Jessy • JGS Academy
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <p className="text-[11px] text-[#BEB6CE] truncate">
                    {currentLesson.lessonNumber}, {currentLesson.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={isId ? 'Tutup Drawer Jessy' : 'Close Jessy Drawer'}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#BEB6CE] hover:text-[#F7F4EE]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <div className="rounded-xl border border-[#D6A937]/30 bg-[#211B2A]/70 p-3.5 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#D6A937]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isId ? 'Konteks Materi Aktif' : 'Current Lesson Focus'}</span>
                </div>
                <p className="text-xs text-[#F7F4EE] leading-relaxed">{slideContextNote}</p>
              </div>

              <JessyStudyBuddyDrawer
                locale={locale}
                currentLesson={currentLesson}
                moodOverride={moodOverride}
                warningMessage={warningMessage}
                onJumpToTab={
                  onJumpToSlide
                    ? (tab) => {
                        setIsOpen(false);
                        if (tab === 'MT5_SIM' || tab === 'LIVE_TV') onJumpToSlide(3);
                        else onJumpToSlide(4);
                      }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
