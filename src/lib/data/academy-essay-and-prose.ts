import type { AcademyLesson, AcademyTrack, LessonDiagramType } from './academy-types';
import {
  getModuleMonograph,
  type ChartDetectivePuzzle,
  type DiagramHotspotPin,
  type ModuleDeepMonograph,
  type SandboxKind,
} from './academy-monographs';
import { getEli10ModuleIntro } from './academy-eli10-citations';

export type DisciplineCluster =
  | 'MACRO'
  | 'MICROSTRUCTURE'
  | 'RISK_MATH'
  | 'WYCKOFF_TA'
  | 'AUCTION_VOLUME'
  | 'ICT_SMC'
  | 'QUANT_BEHAVIORAL';

export interface DeepLectureSection {
  sectionNumber: string;
  title: string;
  paragraphs: string[];
  learningOutcomes?: string[];
  numberedItems?: { heading: string; body: string }[];
  flashcards?: { term: string; definition: string }[];
  tableHeaders?: [string, string, string];
  tableRows?: [string, string, string][];
  photoUrl?: string;
  photoCaption?: string;
  photoCluster?: DisciplineCluster;
  sandboxKind?: SandboxKind;
  hasSvgDiagram?: boolean;
  svgCaption?: string;
  hotspots?: [DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin];
  detectivePuzzle?: ChartDetectivePuzzle;
  formulaBox?: string;
  citationFooter?: string;
  jessySignOff?: string;
}

export interface ModuleEssayExamConfig {
  slug: string;
  prompt: string;
  benchmarkAnswer: string;
  guidanceHints: [string, string, string];
  conceptKeywords: string[];
  riskKeywords: string[];
  minimumWords: number;
}

export interface EssayPillarScore {
  key: 'concept' | 'risk' | 'depth' | 'conclusion';
  label: string;
  score: number;
  max: number;
}

export interface EssayEvaluationResult {
  score: number;
  gradeLabel: 'A' | 'A-' | 'B+' | 'REVISI ARGUMEN';
  passed: boolean;
  wordCount: number;
  pillars: EssayPillarScore[];
  feedback: string;
}

function resolveCluster(trackId: string): DisciplineCluster {
  switch (trackId) {
    case 'track-01':
    case 'track-02':
    case 'track-14-cot':
    case 'track-16-news':
      return 'MACRO';
    case 'track-03':
      return 'MICROSTRUCTURE';
    case 'track-04':
    case 'track-13-pairs':
    case 'track-15-style':
    case 'track-20-comp':
      return 'RISK_MATH';
    case 'track-05':
    case 'track-06':
    case 'track-07':
    case 'track-07-snr':
      return 'WYCKOFF_TA';
    case 'track-08':
      return 'AUCTION_VOLUME';
    case 'track-09':
    case 'track-10':
    case 'track-11-conf':
    case 'track-12-entry':
      return 'ICT_SMC';
    default:
      return 'QUANT_BEHAVIORAL';
  }
}

export interface OneMinuteSummaryCard {
  step: number;
  label: string;
  body: string;
}

export function buildOneMinutePlainSummary(
  lesson: AcademyLesson,
  isId: boolean
): OneMinuteSummaryCard[] {
  const eliIntro = sanitizeProseText(getEli10ModuleIntro(lesson.slug, isId));
  const rawWhat = sanitizeProseText(isId ? lesson.studio.grassrootsWhatId : lesson.studio.grassrootsWhatEn);
  const firstSentenceWhat = (rawWhat.split(/(?<=[.!?])\s+/)[0] || rawWhat).trim();
  const analogyBody = sanitizeProseText(
    isId
      ? `${lesson.studio.analogyHeadlineId}: ${lesson.studio.analogyBodyId}`
      : `${lesson.studio.analogyHeadlineEn}: ${lesson.studio.analogyBodyEn}`
  );
  const coreMeat = sanitizeProseText(isId ? lesson.jeyStreetRuleId ?? lesson.jeyStreetRule : lesson.jeyStreetRule);
  const smallMoney = sanitizeProseText(
    isId
      ? `${lesson.microCapitalCaseStudyId?.title ?? lesson.microCapitalCaseStudy.title}: ${lesson.microCapitalCaseStudyId?.centAccountOutcome ?? lesson.microCapitalCaseStudy.centAccountOutcome}`
      : `${lesson.microCapitalCaseStudy.title}: ${lesson.microCapitalCaseStudy.centAccountOutcome}`
  );
  const jessyTenSec = sanitizeProseText(
    isId ? lesson.studio.jessyBabyExplainId : lesson.studio.jessyBabyExplainEn
  );

  return [
    {
      step: 1,
      label: isId ? '1. Pengertian Paling Gampang (1 Kalimat)' : '1. Easiest Definition (1 Sentence)',
      body: firstSentenceWhat || eliIntro,
    },
    {
      step: 2,
      label: isId ? '2. Ibarat di Kehidupan Sehari-hari' : '2. Real-Life Everyday Analogy',
      body: analogyBody,
    },
    {
      step: 3,
      label: isId ? '3. INTI DAGING yang Wajib Diingat' : '3. CORE MEAT You Must Remember',
      body: coreMeat,
    },
    {
      step: 4,
      label: isId
        ? '4. Cara Pakainya pakai Uang Rp160.000 (1.000 USC)'
        : '4. Practical Application on Rp160k ($10 = 1,000 USC)',
      body: smallMoney,
    },
    {
      step: 5,
      label: isId ? '5. Kesimpulan 10 Detik Jessy' : '5. Jessy 10-Second Takeaway',
      body: jessyTenSec,
    },
  ];
}

function getDiagramCaption(diagram: LessonDiagramType, isId: boolean): string {
  const labels: Record<LessonDiagramType, { id: string; en: string }> = {
    INFLATION_EROSION: {
      id: 'Gambar 1.1: Kurva Pengikisan Daya Beli Uang Fiat vs Ketahanan Nilai Emas & Aset Produktif',
      en: 'Figure 1.1: Fiat Purchasing Power Decay vs Hard Asset Preservation Curve',
    },
    MARKET_ECOSYSTEM: {
      id: 'Gambar 1.1: Peta Spektrum Kelas Aset Global: Kas, Obligasi, Saham, Komoditas & Likuiditas Forex',
      en: 'Figure 1.1: Global Asset Class Map: Money Market, Sovereign Debt, Equities & Spot FX',
    },
    MACRO_INTERMARKET: {
      id: 'Gambar 1.1: Jalur Transmisi The Fed (US10Y Real Yield -> Indeks Dolar DXY -> XAU/USD)',
      en: 'Figure 1.1: Federal Reserve Monetary Transmission (US10Y Real Yield -> DXY -> Gold)',
    },
    FOREX_GOLD_BASICS: {
      id: 'Gambar 1.1: Anatomi Pasangan Mata Uang & XAU/USD serta Struktur Jam Pasar Dunia',
      en: 'Figure 1.1: Currency Pair Mechanics, XAU/USD Structure & 24-Hour Global Venues',
    },
    BROKER_VS_MT5: {
      id: 'Gambar 1.1: Pemisahan Broker (Bank/Kustodian Eksekusi) vs Terminal MetaTrader 5 (Layar Grafik)',
      en: 'Figure 1.1: Custody Broker Separation (A-Book / B-Book) vs MT5 Execution Terminal',
    },
    MT5_BUTTONS: {
      id: 'Gambar 1.1: Anatomi Order Book L2, Bid-Ask Spread & Tipe Order Market/Limit di Kokpit MT5',
      en: 'Figure 1.1: L2 Order Book Microstructure, Bid-Ask Spread & Market/Limit Order Types',
    },
    GOLD_BAR_CENT: {
      id: 'Gambar 1.1: Konversi Akun Cent $10 = 1.000 USC & Pengurangan Massa Kontrak 100 oz -> 1 oz',
      en: 'Figure 1.1: $10 = 1,000 USC Cent Conversion & Contract Shrinkage (100 oz -> 1 oz)',
    },
    CONTRACT_SPEC_CHECK: {
      id: 'Gambar 1.1: Rumus Pembulatan Lot ke Bawah (Floor Rounding) & Verifikasi Margin Bebas',
      en: 'Figure 1.1: Floor Rounding Position Sizer & Free Margin Pre-Flight Inspection',
    },
    DRAWDOWN_SHIELD: {
      id: 'Gambar 1.1: Asimetri Kurva Drawdown vs Sabuk Pengaman 1% (10 USC) & Circuit Breaker 30 USC',
      en: 'Figure 1.1: Drawdown Asymmetry vs 1% (10 USC) Risk Cap & 30 USC Daily Guardrail',
    },
    TECHNICAL_HIST_MA: {
      id: 'Gambar 1.1: Anatomi Harga OHLC, Rejection Wick & Validasi Struktur Swing (HH/HL)',
      en: 'Figure 1.1: OHLC Candle Anatomy, Wick Rejection & Classical Dow Swing Sequence',
    },
    WYCKOFF_CYCLE: {
      id: 'Gambar 1.1: Siklus 4 Tahap Wyckoff (Akumulasi, Markup, Distribusi, Markdown) & Spring Trap',
      en: 'Figure 1.1: Four-Phase Wyckoff Market Cycle, Institutional Spring & UTAD Traps',
    },
    ELLIOTT_FIBO: {
      id: 'Gambar 1.1: Struktur Gelombang Impuls/Korektif & Rasio Retracement Zona Diskon-Premium',
      en: 'Figure 1.1: Wave Structure Symmetry & 50% Equilibrium Discount-Premium Ratios',
    },
    AUCTION_PROFILE: {
      id: 'Gambar 1.1: Teori Lelang (Auction Market Theory), POC, Value Area (VAH/VAL) & Delta',
      en: 'Figure 1.1: Auction Market Theory, Point of Control, Value Area & Order Flow Delta',
    },
    ICT_KILLZONE: {
      id: 'Gambar 1.1: Siklus Likuiditas Harian Asia Range, London Killzone & New York Overlap (WIB)',
      en: 'Figure 1.1: Intraday Asian Range, London Open & New York Killzone Institutional Windows',
    },
    ICT_SWEEP_BSL_SSL: {
      id: 'Gambar 1.1: Anatomi Rekayasa Likuiditas BSL/SSL Sweep (Stop Run) di Balik Puncak/Lembah Kembar',
      en: 'Figure 1.1: Buy-Side & Sell-Side Liquidity Engineering Sweep Mechanics',
    },
    ICT_MSS_FVG: {
      id: 'Gambar 1.1: Displacement Kuat, Market Structure Shift (MSS) & Zona Inefisiensi FVG / OB',
      en: 'Figure 1.1: High-Velocity Displacement, MSS Flip, Fair Value Gap & Valid Order Block',
    },
    SOP_CHECKLIST: {
      id: 'Gambar 1.1: Pipeline Eksekusi SOP 5-Gerbang: Sesi -> Sweep -> MSS/FVG -> 10 USC Floor Lot',
      en: 'Figure 1.1: 5-Gate SOP Execution Bridge: Session -> Sweep -> MSS/FVG -> 10 USC Sizing',
    },
    FAILED_AUTOPSY: {
      id: 'Gambar 1.1: Laboratorium Otopsi Kesalahan Ritel & Evaluasi Sebab Kegagalan Setup',
      en: 'Figure 1.1: Stop-Loss Autopsy Matrix & Failure Mode Root-Cause Inspection',
    },
    BEHAVIORAL_LOOP: {
      id: 'Gambar 1.1: Lingkaran Bias Emosi (Loss Aversion / FOMO) vs Protokol Disiplin Jurnal R',
      en: 'Figure 1.1: Amygdala Loss-Aversion Loop vs Objective R-Multiple Journaling Control',
    },
    QUANT_EXPECTANCY: {
      id: 'Gambar 1.1: Ekspektasi Matematis, Rasio Sharpe, Simulasi Monte Carlo & Kurva Ekuitas',
      en: 'Figure 1.1: Mathematical Expectancy, Risk-Adjusted Sharpe & Monte Carlo Variance',
    },
    MARTINGALE_VS_SL: {
      id: 'Gambar 1.1: Perbandingan Eksponensial Martingale/Grid (Bangkrut) vs Fixed 1% Hard Stop Loss',
      en: 'Figure 1.1: Exponential Martingale Ruin vs Fixed 1% Hard Stop-Loss Longevity',
    },
    COPY_TRADING_HWM: {
      id: 'Gambar 1.1: Skema Akuntansi High-Water Mark (HWM) 30% & Verifikasi Broker Transparan',
      en: 'Figure 1.1: 30% High-Water Mark Fee Accounting & Verified Broker Audit Trail',
    },
    ENTRY_CONFIRMATION_PIPELINE: {
      id: 'Gambar 1.1: Pipeline 3 Syarat Konfirmasi Entry Valid (Sweep Likuiditas, Body Close MSS & Retest FVG)',
      en: 'Figure 1.1: 3-Step Valid Entry Confirmation Pipeline (Liquidity Sweep, MSS Body Close & FVG Limit Retest)',
    },
    EMPTY_CHART_SOP_FLOW: {
      id: 'Gambar 1.1: Alur Kerja Dari Layar MT5 Kosong Hingga Eksekusi Buy/Sell Terproteksi SL 1%',
      en: 'Figure 1.1: Empty Chart to 1%-Protected MT5 Execution Standard Operating Procedure',
    },
  };
  return isId ? labels[diagram].id : labels[diagram].en;
}

/** Clean underscores or stray code glyphs so typography remains crystal clear for beginners */
function sanitizeProseText(raw: string): string {
  return raw
    .replace(/r_riil/gi, 'Imbal Hasil Riil (r)')
    .replace(/r_real/gi, 'Real Return (r)')
    .replace(/\bBagian\s+6[AB]\b/gi, 'Aktivitas Praktik MT5')
    .replace(/▶/g, '')
    .trim();
}

export function buildDeepModuleLecture(
  lesson: AcademyLesson,
  track: AcademyTrack,
  isId: boolean,
  style: 'PEER_MENTOR' | 'INSTITUTIONAL'
): DeepLectureSection[] {
  const cluster = resolveCluster(lesson.trackId);
  const mono: ModuleDeepMonograph = getModuleMonograph(lesson.slug);
  const isInst = style === 'INSTITUTIONAL';
  const techList = lesson.technicalSections ?? [];
  const plainList = lesson.plainEnglishSections ?? [];

  const eli10Intro = sanitizeProseText(getEli10ModuleIntro(lesson.slug, isId));

  const sec1Opening = isId
    ? isInst
      ? `Secara prinsip ekonomi dan struktur mikro keuangan (${track.courseCode}), ${sanitizeProseText(lesson.studio.grassrootsWhatId)}`
      : sanitizeProseText(lesson.studio.grassrootsWhatId)
    : isInst
    ? `From first-principles market structure (${track.courseCode}): ${sanitizeProseText(lesson.studio.grassrootsWhatEn)}`
    : sanitizeProseText(lesson.studio.grassrootsWhatEn);

  const sec1History = isId
    ? `Menelusuri konteks historis dan realitas lapangannya: ${sanitizeProseText(lesson.studio.grassrootsOriginId)} Pemahaman asal-usul ini memastikan kamu melihat grafik MetaTrader 5 bukan sebagai angka acak tanpa nyawa, melainkan jejak transaksi pelaku modal nyata.`
    : `Historical and institutional lineage: ${sanitizeProseText(lesson.studio.grassrootsOriginEn)} Understanding where this mechanism emerged keeps you grounded in real liquidity flows rather than superstition.`;

  const sec1Items = plainList.map((s) => ({
    heading: sanitizeProseText(s.heading),
    body: sanitizeProseText(s.body),
  }));

  const learningOutcomes = (
    isId ? lesson.studio.learningOutcomesId : lesson.studio.learningOutcomesEn
  ).map(sanitizeProseText);

  // Unique Section 2 institutional prose per exact module slug!
  const monographSec2 = (isId ? mono.sec2InstitutionalId : mono.sec2InstitutionalEn).map(
    sanitizeProseText
  );
  const sec2TechExtras = techList.map((t) => ({
    heading: sanitizeProseText(t.heading),
    body: sanitizeProseText(t.body),
  }));

  // Unique Section 3 table & hotspots per exact module slug!
  const anatomyRows = isId ? mono.anatomyRowsId : mono.anatomyRowsEn;
  const tableHeaders: [string, string, string] = isId
    ? ['Dimensi Analisis', 'Kesalahan Umum Ritel', 'Protokol Institusional & JGS (1.000 USC)']
    : ['Analytical Dimension', 'Retail Failure Pattern', 'Institutional & JGS 1,000 USC Protocol'];

  // Unique Section 4 quantitative math per exact module slug!
  const sec4Paragraphs = [
    ...(isId ? mono.sec4QuantId : mono.sec4QuantEn).map(sanitizeProseText),
    isId
      ? `Perbandingan Dampak Lapangan, Akun Standar Tanpa Kontrol: ${sanitizeProseText(lesson.microCapitalCaseStudy.standardAccountOutcome)} Sebaliknya, pada Akun Cent Terkalibrasi JGS: ${sanitizeProseText(lesson.microCapitalCaseStudy.centAccountOutcome)}`
      : `Live Balance Contrast, Uncalibrated Account: ${sanitizeProseText(lesson.microCapitalCaseStudy.standardAccountOutcome)} Calibrated 1,000 USC JGS Account: ${sanitizeProseText(lesson.microCapitalCaseStudy.centAccountOutcome)}`,
  ];
  const formulaSpec = sanitizeProseText(isId ? mono.sec4FormulaId : mono.sec4FormulaEn);

  // Section 5 Literature & Academic Debate
  const sec5Paragraphs = isId
    ? [
        `Jangkar riset empiris modul ini merujuk pada publikasi **${lesson.studio.citation.authors} (${lesson.studio.citation.year})**, "${sanitizeProseText(lesson.studio.citation.title)}" yang diterbitkan di **${lesson.studio.citation.source}**. Inti temuan mereka menegaskan bahwa ${sanitizeProseText(lesson.studio.citation.keyInsightId)}`,
        `Di forum akademik versus meja eksekusi institusional, diskursus tajam mengemuka mengenai "${sanitizeProseText(lesson.studio.debate.topicId.replace(/^Meja Debat Akademik:\s*/i, ''))}". **Kubu Kampus**: ${sanitizeProseText(lesson.studio.debate.campusViewId)} **Kubu Praktisi Meja Eksekusi**: ${sanitizeProseText(lesson.studio.debate.practitionerViewId)}`,
        `**Sintesis Objektif THE JEY GANG STRATEGIST:** ${sanitizeProseText(lesson.studio.debate.jgsSynthesisId)}`,
      ]
    : [
        `Empirical research anchor: **${lesson.studio.citation.authors} (${lesson.studio.citation.year})**, "${sanitizeProseText(lesson.studio.citation.title)}", **${lesson.studio.citation.source}**. Core finding: ${sanitizeProseText(lesson.studio.citation.keyInsightEn)}`,
        `Academic vs Trading Floor Debate, "${sanitizeProseText(lesson.studio.debate.topicEn)}": **Scholars** argue ${sanitizeProseText(lesson.studio.debate.campusViewEn)} **Practitioners** counter ${sanitizeProseText(lesson.studio.debate.practitionerViewEn)}`,
        `**JGS Objective Synthesis:** ${sanitizeProseText(lesson.studio.debate.jgsSynthesisEn)}`,
      ];

  return [
    {
      sectionNumber: '01',
      title: isId
        ? 'Bagian 01: Pengantar & Analogi Sederhana (Paham dalam 2 Menit)'
        : 'Part 01: Plain-Language Introduction & Everyday Analogy',
      paragraphs: [eli10Intro, sec1Opening, sec1History],
      numberedItems: sec1Items,
      learningOutcomes,
      photoUrl: mono.photoUrl,
      photoCaption: isId ? mono.photoCaptionId : mono.photoCaptionEn,
      photoCluster: cluster,
      flashcards: lesson.studio.prerequisiteTerms.slice(0, 3).map((t) => ({
        term: sanitizeProseText(t.term),
        definition: sanitizeProseText(isId ? t.analogyId : t.analogyEn),
      })),
    },
    {
      sectionNumber: '02',
      title: isId
        ? 'Bagian 02: Bagaimana Mekanisme Ini Bekerja di Pasar Nyata?'
        : 'Part 02: How This Mechanism Works in Live Markets',
      paragraphs: monographSec2,
      numberedItems: sec2TechExtras,
      sandboxKind: mono.sandboxKind,
    },
    {
      sectionNumber: '03',
      title: isId
        ? 'Bagian 03: Peta Visual Interaktif & Simulasi Langsung'
        : 'Part 03: Interactive Visual Map & Live Matrix',
      paragraphs: [
        isId
          ? 'Tabel anatomi dan peta skematik interaktif di bawah merangkum perbandingan antara kebiasaan ritel, mekanisme institusional, serta protokol eksekusi modal 1.000 USC. Klik pin 1 sampai 4 pada diagram untuk membedah setiap bagian.'
          : 'Inspect the comparison matrix and interactive 4-pin schematic below. Click pins 1–4 directly on the chart to inspect mechanics and 1,000 USC protocols.',
      ],
      tableHeaders,
      tableRows: anatomyRows,
      hasSvgDiagram: true,
      svgCaption: getDiagramCaption(lesson.studio.diagramType, isId),
      hotspots: mono.hotspots,
    },
    {
      sectionNumber: '04',
      title: isId
        ? 'Bagian 04: Studi Kasus Hitungan di Modal $10 (1.000 USC)'
        : 'Part 04: Quantitative Math on a $10 (1,000 USC) Balance',
      paragraphs: sec4Paragraphs,
      formulaBox: formulaSpec,
      detectivePuzzle: mono.detective,
    },
    {
      sectionNumber: '05',
      title: isId
        ? 'Bagian 05: Bukti Jurnal Ilmiah, Debat Kampus & Catatan Jessy'
        : 'Part 05: Academic Journal Evidence, Scholarly Debate & Jessy Notes',
      paragraphs: sec5Paragraphs,
      citationFooter: `${lesson.studio.citation.authors} (${lesson.studio.citation.year}). ${lesson.studio.citation.title}. ${lesson.studio.citation.source}.`,
      jessySignOff: sanitizeProseText(
        isId ? lesson.studio.jessyBabyExplainId : lesson.studio.jessyBabyExplainEn
      ),
    },
  ];
}

// ============================================================================
// MANDATORY ANALYTICAL ESSAY EXAM GENERATOR & ANTI-LEAK EVALUATOR
// ============================================================================

export function getModuleEssayExam(
  lesson: AcademyLesson,
  track: AcademyTrack,
  isId: boolean
): ModuleEssayExamConfig {
  const cluster = resolveCluster(lesson.trackId);
  const mono = getModuleMonograph(lesson.slug);

  const clusterConcepts: Record<DisciplineCluster, string[]> = {
    MACRO: ['inflasi', 'daya beli', 'bunga', 'us10y', 'real yield', 'dxy', 'fed', 'fomc', 'cpi', 'nfp', 'fiat', 'bretton', 'emas', 'likuiditas', 'inflation', 'yield', 'liquidity'],
    MICROSTRUCTURE: ['broker', 'a-book', 'b-book', 'mt5', 'spread', 'bid', 'ask', 'slippage', 'order book', 'limit', 'market order', 'rollover', 'likuiditas', 'eksekusi', 'stop loss', 'adverse'],
    RISK_MATH: ['cent', 'usc', '1000', '1.000', '1 oz', '100 oz', 'floor', 'drawdown', 'recover', 'imbalance', '1%', '10 usc', '30 usc', 'lot', 'margin call', 'martingale', 'risk of ruin', 'leverage', 'kelly'],
    WYCKOFF_TA: ['candlestick', 'dow', 'wyckoff', 'spring', 'akumulasi', 'distribusi', 'composite man', 'elliott', 'fibonacci', 'struktur', 'hh', 'hl', 'lagging', 'diskon', 'discount', 'liquidity'],
    AUCTION_VOLUME: ['lelang', 'auction', 'poc', 'value area', 'vah', 'val', 'lvn', 'volume profile', 'keseimbangan', 'ketidakseimbangan', 'imbalance', 'order flow', 'fair value', 'delta'],
    ICT_SMC: ['ict', 'smc', 'killzone', 'london', 'new york', 'bsl', 'ssl', 'sweep', 'sapuan', 'inducement', 'displacement', 'mss', 'fvg', 'fair value gap', 'order block', 'ipda', 'diskon', 'premium'],
    QUANT_BEHAVIORAL: ['kahneman', 'tversky', 'prospect', 'loss aversion', 'outcome bias', 'amygdala', 'expectancy', 'sharpe', 'profit factor', 'martingale', 'grid', 'overfitting', 'monte carlo', 'hwm', 'high-water mark', 'ea'],
  };

  const titleTokens = lesson.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4);

  const anatomyTerms = mono.anatomyRowsId
    .flatMap((r) => r[0].toLowerCase().split(/\s+/))
    .filter((w) => w.length >= 4);

  const conceptKeywords = Array.from(
    new Set([...clusterConcepts[cluster], ...titleTokens, ...anatomyTerms])
  );

  const riskKeywords = [
    '10 usc',
    '1.000 usc',
    '1000 usc',
    '1%',
    '1 oz',
    '100 oz',
    'stop loss',
    'sl',
    'risiko',
    'risk',
    'lot',
    '0.01',
    '0.02',
    'drawdown',
    'margin',
    'spread',
    '30 usc',
    'circuit breaker',
    'floor',
    'modal',
    'ekuitas',
    'equity',
  ];

  const prompt = isId
    ? `KASUS UJIAN ESAI MODUL ${lesson.lessonNumber} (${track.courseCode}, ${lesson.title}): Bayangkan terminal MT5 berada di hadapanmu dengan modal $10 (1.000 USC), dan situasi nyata menguji prinsip bab ini ("${sanitizeProseText(lesson.microCapitalCaseStudy.standardAccountOutcome)}"). Jelaskan dengan bahasamu sendiri: (1) mengapa mayoritas pemula gagal pada situasi tersebut, (2) bagaimana mekanisme institusionalnya bekerja, dan (3) bagaimana kamu menjaga batas risiko 1% (10 USC) serta keputusan eksekusi yang tepat. (Minimal 30 kata bermakna)`
    : `MODULE ${lesson.lessonNumber} ANALYTICAL ESSAY (${track.courseCode}, ${lesson.title}): Suppose you face a live situation testing this chapter ("${sanitizeProseText(lesson.microCapitalCaseStudy.standardAccountOutcome)}") on a $10 (1,000 USC) account. Explain in your own words: (1) why retail habits fail here, (2) the institutional mechanic at play, and (3) how you enforce the 1% (10 USC) limit and concrete execution action. (Min. 30 substantive words)`;

  const benchmarkAnswer = isId
    ? `Standar Analisis Chief Strategist (${lesson.lessonNumber} ${lesson.title}): Pertama, trader ritel gagal karena bereaksi terhadap ilusi harga jangka pendek tanpa memahami struktur di baliknya (${sanitizeProseText(mono.sec2InstitutionalId[0])}). Kedua, dari sudut manajemen modal $10 = 1.000 USC (kontrak 1 oz), ${sanitizeProseText(mono.sec4FormulaId)} sehingga volatilitas normal tidak menghancurkan margin lewat pembulatan lot ke bawah (Floor Rounding). Ketiga, keputusan operasional yang sah adalah memverifikasi syarat struktural & jendela waktu terlebih dahulu, memasang Hard Stop Loss di titik invalidasi objektif dengan eksposur <= 10 USC, dan berhenti bila limit rugi harian 30 USC tersentuh.`
    : `Chief Strategist Benchmark (${lesson.lessonNumber} ${lesson.title}): Retail traders fail by reacting emotionally without verifying institutional mechanics (${sanitizeProseText(mono.sec2InstitutionalEn[0])}). On a $10 = 1,000 USC Cent account (1 oz contract), ${sanitizeProseText(mono.sec4FormulaEn)} ensures normal price noise never breaches the 1% (10 USC) risk floor via Floor Rounding. Disciplined execution waits for structural confirmation, fixes Hard SL at objective invalidation, and halts at the 30 USC daily stop.`;

  return {
    slug: lesson.slug,
    prompt,
    benchmarkAnswer,
    guidanceHints: isId ? mono.essayGuidanceHintsId : mono.essayGuidanceHintsEn,
    conceptKeywords,
    riskKeywords,
    minimumWords: 30,
  };
}

/** Detect keyboard-smash gibberish such as "hbwebhejb vbhjevbew..." or meaningless tokens */
function isGibberishSubmission(words: string[]): boolean {
  if (words.length === 0) return true;
  const alphaWords = words.filter((w) => /[a-z]/i.test(w));
  if (alphaWords.length < Math.max(8, Math.floor(words.length * 0.45))) return true;

  let totalLetters = 0;
  let totalVowels = 0;
  let totalWeight = 0;
  for (const w of alphaWords) {
    const cleanW = w.replace(/[^a-z]/gi, '');
    totalLetters += cleanW.length;
    totalVowels += (cleanW.match(/[aeiou]/gi) ?? []).length;
    totalWeight += 1;
  }

  const avgLen = totalWeight > 0 ? totalLetters / totalWeight : 0;
  const vowelRatio = totalLetters > 0 ? totalVowels / totalLetters : 0;

  // Normal Indonesian/English prose averages 4.2 - 7.8 chars per word and 33% - 48% vowels.
  if (vowelRatio < 0.22 || vowelRatio > 0.68 || avgLen > 10.5 || avgLen < 2.2) {
    return true;
  }

  // Must contain at least 3 genuine structural connector / trading terms
  const sanityLexicon = new Set([
    'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'karena', 'sehingga', 'agar',
    'maka', 'jika', 'bila', 'dengan', 'tidak', 'harus', 'wajib', 'risiko', 'modal',
    'harga', 'pasar', 'akun', 'lot', 'stop', 'loss', 'usc', 'emas', 'spread', 'broker',
    'the', 'and', 'for', 'with', 'that', 'this', 'because', 'therefore', 'market', 'risk',
    'price', 'account', 'limit', 'avoid', 'stop', 'must', 'wait', 'capital', 'liquidity',
  ]);
  const recognizableCount = alphaWords.filter((w) => sanityLexicon.has(w)).length;
  return recognizableCount < 3;
}

/** Detect copy-paste of prompt text or repeated sentences */
function getPromptOverlapRatio(answerWords: string[], promptText: string): number {
  if (answerWords.length < 10) return 0;
  const promptWords = promptText
    .toLowerCase()
    .replace(/[^a-z0-9\s%$.-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
  if (promptWords.length < 4) return 0;

  const promptTrigrams = new Set<string>();
  for (let i = 0; i <= promptWords.length - 3; i++) {
    promptTrigrams.add(`${promptWords[i]} ${promptWords[i + 1]} ${promptWords[i + 2]}`);
  }

  let matchedTrigrams = 0;
  const totalTrigrams = Math.max(1, answerWords.length - 2);
  for (let i = 0; i <= answerWords.length - 3; i++) {
    const tri = `${answerWords[i]} ${answerWords[i + 1]} ${answerWords[i + 2]}`;
    if (promptTrigrams.has(tri)) {
      matchedTrigrams++;
    }
  }
  return matchedTrigrams / totalTrigrams;
}

function makeFailResult(
  score: number,
  wordCount: number,
  conceptScore: number,
  feedback: string,
  isId: boolean
): EssayEvaluationResult {
  return {
    score,
    gradeLabel: 'REVISI ARGUMEN',
    passed: false,
    wordCount,
    pillars: [
      {
        key: 'concept',
        label: isId ? '1. Pemahaman Konsep & Mekanisme Inti' : '1. Core Concept & Mechanics',
        score: conceptScore,
        max: 40,
      },
      {
        key: 'risk',
        label: isId ? '2. Integrasi Disiplin Risiko 1.000 USC' : '2. 1,000 USC Risk Discipline',
        score: 0,
        max: 25,
      },
      {
        key: 'depth',
        label: isId ? '3. Kedalaman Analisis Sebab-Akibat' : '3. Causal Depth & Reasoning',
        score: 0,
        max: 20,
      },
      {
        key: 'conclusion',
        label: isId ? '4. Ketegasan Kesimpulan Eksekusi' : '4. Strategic Decision Clarity',
        score: 0,
        max: 15,
      },
    ],
    feedback,
  };
}

export function evaluateModuleEssay(
  rawText: string,
  config: ModuleEssayExamConfig,
  isId: boolean
): EssayEvaluationResult {
  const clean = rawText.trim();
  const words = clean
    .toLowerCase()
    .replace(/[^a-z0-9\s%$.-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;
  const uniqueRatio = wordCount > 0 ? new Set(words).size / wordCount : 0;
  const lowered = clean.toLowerCase();

  // 1. Word count minimum check
  if (wordCount < config.minimumWords) {
    return makeFailResult(
      Math.min(35, Math.round((wordCount / config.minimumWords) * 32)),
      wordCount,
      Math.min(12, Math.floor(wordCount / 2)),
      isId
        ? `Jawabanmu baru ${wordCount} kata (syarat minimum ${config.minimumWords} kata analisis bermakna). Belum Lulus: uraikan mekanisme institusional serta kaitan batas risiko 1% = 10 USC dengan bahasamu sendiri, atau gunakan 3 Petunjuk Berpikir di bawah.`
        : `Your draft has ${wordCount} words (${config.minimumWords} substantive words required). Develop the causal mechanism and connect it to the 1% = 10 USC cap using the 3 Guided Hints below.`,
      isId
    );
  }

  // 2. Anti-repetition check
  if (uniqueRatio < 0.36) {
    return makeFailResult(
      15,
      wordCount,
      5,
      isId
        ? 'Terdeteksi pengulangan kata berlebihan. Tulis ulang analisis asli dengan kalimat argumen yang bervariasi dan runtut.'
        : 'Excessive word repetition detected. Rewrite with clear, original reasoning.',
      isId
    );
  }

  // 3. Anti-gibberish / keyboard smash filter
  if (isGibberishSubmission(words)) {
    return makeFailResult(
      10,
      wordCount,
      0,
      isId
        ? 'Teks terdeteksi sebagai susunan karakter acak / non-substantif (0 poin sintesis). Mohon tulis argumen analitis yang nyata menggunakan kalimat Indonesia atau Inggris yang jelas.'
        : 'Submission detected as random/non-substantive text (0 synthesis points). Write a real analytical response in clear Indonesian or English.',
      isId
    );
  }

  // 4. Anti copy-paste question prompt guard
  const promptOverlap = getPromptOverlapRatio(words, config.prompt);
  if (promptOverlap > 0.38) {
    return makeFailResult(
      20,
      wordCount,
      5,
      isId
        ? 'Terdeteksi penyalinan teks soal ke kotak jawaban! Evaluasi menolak salinan soal. Susun analisis memakai kalimatmu sendiri dan ikuti 3 Petunjuk Berpikir di bawah.'
        : 'Prompt copy-paste detected! Rephrase the causal explanation and risk defense in your own words.',
      isId
    );
  }

  // Pillar 1: Concept & Core Institutional Mechanics (40 pts)
  const conceptHits = config.conceptKeywords.filter((kw) => lowered.includes(kw)).length;
  const conceptScore = Math.min(40, Math.round(conceptHits === 0 ? 6 : 10 + conceptHits * 6));

  // Pillar 2: Risk Discipline & 1,000 USC Integration (25 pts)
  const riskHits = config.riskKeywords.filter((kw) => lowered.includes(kw)).length;
  const riskScore = Math.min(25, Math.round(riskHits === 0 ? 3 : 7 + riskHits * 4.5));

  // Pillar 3: Causal Reasoning Depth (20 pts)
  const causalTokens = [
    'karena',
    'sehingga',
    'akibatnya',
    'dampaknya',
    'oleh karena itu',
    'maka',
    'sebab',
    'agar',
    'supaya',
    'sedangkan',
    'namun',
    'jika',
    'apabila',
    'artinya',
    'berarti',
    'menghindari',
    'because',
    'therefore',
    'consequently',
    'which',
    'causes',
    'prevents',
    'means',
    'whereas',
  ];
  const causalHits = causalTokens.filter((tk) => lowered.includes(tk)).length;
  const lengthBonus = Math.min(7, Math.floor((wordCount - config.minimumWords) / 8) * 2);
  const depthScore = Math.min(20, (causalHits === 0 ? 3 : 6) + causalHits * 3 + lengthBonus);

  // Pillar 4: Strategic Execution Conclusion (15 pts)
  const decisionTokens = [
    'hindari',
    'tunggu',
    'batasi',
    'eksekusi',
    'jangan',
    'wajib',
    'harus',
    'pastikan',
    'verifikasi',
    'hitung',
    'stop',
    'tutup',
    'tolak',
    'tetapkan',
    'keputusan',
    'kesimpulan',
    'strategi',
    'disiplin',
    'avoid',
    'wait',
    'cap',
    'execute',
    'enforce',
    'verify',
    'reject',
    'protect',
    'decision',
  ];
  const decisionHits = decisionTokens.filter((tk) => lowered.includes(tk)).length;
  const conclusionScore = Math.min(15, decisionHits === 0 ? 3 : 6 + decisionHits * 3);

  const totalScore = Math.min(100, conceptScore + riskScore + depthScore + conclusionScore);
  const passed = totalScore >= 75;
  const gradeLabel: EssayEvaluationResult['gradeLabel'] =
    totalScore >= 90 ? 'A' : totalScore >= 83 ? 'A-' : passed ? 'B+' : 'REVISI ARGUMEN';

  const missingHints: string[] = [];
  if (conceptScore < 26) {
    missingHints.push(
      isId
        ? 'jelaskan mekanisme inti modul dengan istilah teknis yang relevan'
        : 'explain the module’s core institutional mechanism'
    );
  }
  if (riskScore < 16) {
    missingHints.push(
      isId
        ? 'kaitkan dengan batas risiko 1% / 10 USC atau kontrak 1 oz Cent'
        : 'connect the trade plan to 1% / 10 USC risk limits and 1 oz Cent units'
    );
  }
  if (depthScore < 13) {
    missingHints.push(
      isId
        ? 'perjelas alur sebab-akibat ("karena -> sehingga -> dampaknya")'
        : 'strengthen explicit cause-and-effect reasoning'
    );
  }
  if (conclusionScore < 10) {
    missingHints.push(
      isId
        ? 'tutup dengan keputusan eksekusi konkret (hindari / tunggu / wajib SL)'
        : 'finish with an actionable execution rule (wait / cap / hard SL)'
    );
  }

  const feedback = passed
    ? isId
      ? `LULUS UJIAN ESAI (Skor ${totalScore}/100 • Mutu ${gradeLabel})! Argumenmu mengaitkan mekanisme institusional, batas risiko 1.000 USC, logika sebab-akibat, dan keputusan eksekusi dengan presisi. Jawaban Benchmark Chief Strategist kini resmi terbuka di bawah.`
      : `PASSED (Score ${totalScore}/100 • Grade ${gradeLabel})! Your explanation unites institutional theory, 1,000 USC risk architecture, and disciplined execution. The Chief Strategist Benchmark Comparison is now unlocked below.`
    : isId
    ? `BELUM LULUS, Skor ${totalScore}/100 (Syarat minimal lulus 75 / B+). Yang perlu kamu perkuat: ${missingHints.join('; ')}. Jawaban Benchmark tetap terkunci sampai argumenmu lulus, gunakan 3 Petunjuk Berpikir Terpandu di bawah lalu kirim ulang!`
    : `NOT YET PASSED, Score ${totalScore}/100 (minimum 75 / B+ required). Strengthen: ${missingHints.join('; ')}. Benchmark Answer stays locked until you pass, inspect the 3 Guided Thinking Hints below and revise!`;

  return {
    score: totalScore,
    gradeLabel,
    passed,
    wordCount,
    pillars: [
      {
        key: 'concept',
        label: isId ? '1. Pemahaman Konsep & Mekanisme Inti' : '1. Core Concept & Mechanics',
        score: conceptScore,
        max: 40,
      },
      {
        key: 'risk',
        label: isId ? '2. Integrasi Disiplin Risiko 1.000 USC' : '2. 1,000 USC Risk Discipline',
        score: riskScore,
        max: 25,
      },
      {
        key: 'depth',
        label: isId ? '3. Kedalaman Analisis Sebab-Akibat' : '3. Causal Depth & Reasoning',
        score: depthScore,
        max: 20,
      },
      {
        key: 'conclusion',
        label: isId ? '4. Ketegasan Kesimpulan Eksekusi' : '4. Strategic Decision Clarity',
        score: conclusionScore,
        max: 15,
      },
    ],
    feedback,
  };
}
