import { TradeJournalItem } from '@/lib/math/journal-analytics';

export type JgsThemeMode = 'dark' | 'light';
export type JgsBeltRank = 'WHITE' | 'PURPLE' | 'GOLD' | 'BLACK';

export type MythologicalRankTier =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII';

export interface MythologicalRankDefinition {
  tier: MythologicalRankTier;
  code: string;
  name: string;
  colorName: string;
  colorHex: string;
  minModules: number;
  maxModules: number;
  requiresExam?: boolean;
  semesterScopeId: string;
  semesterScopeEn: string;
  philosophyId: string;
  philosophyEn: string;
  legacyBelt: JgsBeltRank;
}

export const MYTHOLOGICAL_RANKS: MythologicalRankDefinition[] = [
  {
    tier: 'I',
    code: 'I. SHADE OF THE ABYSS',
    name: 'SHADE OF THE ABYSS',
    colorName: 'Obsidian Slate',
    colorHex: '#64748B',
    minModules: 0,
    maxModules: 7,
    semesterScopeId: 'Semester 1-2 (0-7 Modul)',
    semesterScopeEn: 'Semesters 1-2 (0-7 Modules)',
    philosophyId: 'Bayangan Pengembara yang baru bangkit dari jebakan ritel dan memahami dasar uang.',
    philosophyEn: 'Wandering shadow awakening from retail misconceptions and mastering monetary basics.',
    legacyBelt: 'WHITE',
  },
  {
    tier: 'II',
    code: 'II. DIREWOLF STALKER',
    name: 'DIREWOLF STALKER',
    colorName: 'Frost Silver',
    colorHex: '#CBD5E1',
    minModules: 8,
    maxModules: 14,
    semesterScopeId: 'Semester 3-5 (8-14 Modul)',
    semesterScopeEn: 'Semesters 3-5 (8-14 Modules)',
    philosophyId: 'Serigala pengintai disiplin yang menguasai terminal MT5 dan tameng risiko 1.000 USC.',
    philosophyEn: 'Disciplined stalker commanding MT5 order mechanics and 1,000 USC micro capital shields.',
    legacyBelt: 'WHITE',
  },
  {
    tier: 'III',
    code: 'III. GARUDA VANGUARD',
    name: 'GARUDA VANGUARD',
    colorName: 'Amber Bronze',
    colorHex: '#D97706',
    minModules: 15,
    maxModules: 22,
    semesterScopeId: 'Semester 6-8 (15-22 Modul)',
    semesterScopeEn: 'Semesters 6-8 (15-22 Modules)',
    philosophyId: 'Penjaga langit yang mampu membaca struktur tren klasik, Supply-Demand, dan jejak Wyckoff.',
    philosophyEn: 'Sky vanguard reading classical market structure, supply-demand, and Wyckoff absorption.',
    legacyBelt: 'PURPLE',
  },
  {
    tier: 'IV',
    code: 'IV. KITSUNE ILLUSIONIST',
    name: 'KITSUNE ILLUSIONIST',
    colorName: 'Crimson Foxfire',
    colorHex: '#E11D48',
    minModules: 23,
    maxModules: 29,
    semesterScopeId: 'Semester 9-10 (23-29 Modul)',
    semesterScopeEn: 'Semesters 9-10 (23-29 Modules)',
    philosophyId: 'Rubah legenda sembilan ekor yang menembus tipuan pasar, siklus gelombang, dan lelang volume.',
    philosophyEn: 'Nine-tailed strategist seeing through market illusions, wave cycles, and volume auctions.',
    legacyBelt: 'PURPLE',
  },
  {
    tier: 'V',
    code: 'V. KRAKEN DEEP-HUNTER',
    name: 'KRAKEN DEEP-HUNTER',
    colorName: 'Abyssal Emerald',
    colorHex: '#10B981',
    minModules: 30,
    maxModules: 37,
    semesterScopeId: 'Semester 11-13 (30-37 Modul)',
    semesterScopeEn: 'Semesters 11-13 (30-37 Modules)',
    philosophyId: 'Penguasa samudra dalam yang menunggu sabar di kolam likuiditas (BSL/SSL) dan 3 gerbang konfirmasi ICT.',
    philosophyEn: 'Deep-sea hunter lying patient near BSL/SSL liquidity pools aligned with 3-gate ICT confirmations.',
    legacyBelt: 'GOLD',
  },
  {
    tier: 'VI',
    code: 'VI. WENDIGO SHADOW-SNIPER',
    name: 'WENDIGO SHADOW-SNIPER',
    colorName: 'Royal Amethyst',
    colorHex: '#9333EA',
    minModules: 38,
    maxModules: 44,
    semesterScopeId: 'Semester 14-15 (38-44 Modul)',
    semesterScopeEn: 'Semesters 14-15 (38-44 Modules)',
    philosophyId: 'Penembak jitu SOP entry layar kosong sekaligus ahli taktik Scalping, Intraday, dan Swing presisi.',
    philosophyEn: 'Precision SOP entry sniper mastering Scalping, Intraday, and Swing liquidity execution.',
    legacyBelt: 'GOLD',
  },
  {
    tier: 'VII',
    code: 'VII. LEVIATHAN SOVEREIGN',
    name: 'LEVIATHAN SOVEREIGN',
    colorName: 'Celestial Sapphire',
    colorHex: '#3B82F6',
    minModules: 45,
    maxModules: 52,
    semesterScopeId: 'Semester 16-18 (45-52 Modul)',
    semesterScopeEn: 'Semesters 16-18 (45-52 Modules)',
    philosophyId: 'Naga laut penguasa strategi berita makro (News WIB), taktik multi-pair Cent, dan data posisi COT.',
    philosophyEn: 'Ocean sovereign combining high-impact news protocols, multi-pair Cent sizing, and CFTC COT positioning.',
    legacyBelt: 'BLACK',
  },
  {
    tier: 'VIII',
    code: 'VIII. CELESTIAL OUROBOROS',
    name: 'CELESTIAL OUROBOROS',
    colorName: 'Radiant Imperial Gold',
    colorHex: '#D6A937',
    minModules: 53,
    maxModules: 60,
    requiresExam: true,
    semesterScopeId: 'Semester 19-20 (53-60 Modul + Lulus Ijazah)',
    semesterScopeEn: 'Semesters 19-20 (53-60 Modules + Final Diploma)',
    philosophyId: 'Naga kosmik abadi: kasta tertinggi grandmaster kuantitatif dan pemegang Ijazah Resmi JGS.',
    philosophyEn: 'Eternal cosmic dragon: highest quantitative grandmaster holding an Official JGS Diploma.',
    legacyBelt: 'BLACK',
  },
];

export interface BeltRankMeta {
  rank: JgsBeltRank;
  mythTier: MythologicalRankTier;
  badgeText: string;
  labelId: string;
  labelEn: string;
  titleId: string;
  titleEn: string;
  colorName: string;
  colorHex: string;
  completedCount: number;
  nextBeltTargetLessons: number;
}

export interface OnboardingDossier {
  completedAt: string;
  capitalTier: 'DEMO' | 'MICRO_10_25' | 'BUILDER_25_100' | 'PLUS_100';
  experienceLevel: 'BEGINNER' | 'TRIED_DEMO' | 'ACTIVE_MICRO' | 'ALGO_CURIOUS';
  primaryInstrument: 'XAUUSD' | 'FOREX_MAJORS' | 'BOTH';
  primaryChallenge: 'SIZING' | 'EMOTION' | 'EXECUTION' | 'EA_SETUP';
  recommendedCapitalUsd: number;
  recommendedCapitalUsc: number;
  recommendedRiskPercent: number;
  recommendedDailyLossCapPercent: number;
  recommendedTrackSlug: string;
  recommendedTrackTitle: string;
  recommendedScenarioId: string;
  jeyPersonalBrief: string;
}

export interface SavedRiskRulePreset {
  id: string;
  name: string;
  depositUsd: number;
  accountMode: 'CENT_USC' | 'STANDARD_USD';
  instrument: 'XAUUSD' | 'EURUSD' | 'GBPUSD' | 'USDJPY';
  riskPercent: number;
  dailyMaxLossPercent: number;
  defaultStopLossPoints: number;
  createdAt: string;
}

export interface StrategistUserSession {
  id: string;
  email: string;
  displayName: string;
  role: 'GUEST' | 'STRATEGIST';
  signedInAt: string;
  gangId?: string;
  division?: string;
}

export interface GangRosterMember {
  fullName: string;
  gangId: string;
  beltRank: JgsBeltRank;
  beltLabel: string;
  division: string;
  joinedLabel: string;
}

export const DEFAULT_GANG_ROSTER: GangRosterMember[] = [
  {
    fullName: 'Asep Garpit',
    gangId: '2702285126',
    beltRank: 'GOLD',
    beltLabel: 'V. KRAKEN DEEP-HUNTER',
    division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Jakarta • XAUUSD Killzone'
  },
  {
    fullName: 'Alfath Muhammad',
    gangId: '2702298410',
    beltRank: 'BLACK',
    beltLabel: 'VIII. CELESTIAL OUROBOROS',
    division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Bandung • Quant & ICT Execution'
  },
  {
    fullName: 'Nadia Kusuma',
    gangId: '2702314092',
    beltRank: 'GOLD',
    beltLabel: 'VI. WENDIGO SHADOW-SNIPER',
    division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Surabaya • London Sweep Specialist'
  },
  {
    fullName: 'Rizky Pratama',
    gangId: '2702348901',
    beltRank: 'PURPLE',
    beltLabel: 'IV. KITSUNE ILLUSIONIST',
    division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Yogyakarta • Risk & Drawdown Technician'
  },
  {
    fullName: 'Dimas Saputra',
    gangId: '2702381205',
    beltRank: 'WHITE',
    beltLabel: 'II. DIREWOLF STALKER',
    division: '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Medan • 1,000 USC Survivor'
  }
];

const KEYS = {
  ONBOARDING: 'jgs_onboarding_dossier_v1',
  ACADEMY_COMPLETED: 'jgs_academy_completed_slugs_v1',
  JOURNAL_ENTRIES: 'jgs_trader_journal_entries_v1',
  RISK_PRESETS: 'jgs_saved_risk_presets_v1',
  MT5_CHECKLIST: 'jgs_mt5_setup_checklist_v1',
  USER_SESSION: 'jgs_strategist_session_v1',
  THEME_MODE: 'jgs_theme_mode_v1',
  GRADUATION_EXAM: 'jgs_academy_graduation_exam_v1',
  CASE_ASSIGNMENTS: 'jgs_academy_case_assignments_v1',
  MODULE_ESSAYS: 'jgs_academy_module_essays_v1'
};

export interface ModuleEssaySubmission {
  slug: string;
  text: string;
  score: number;
  gradeLabel: string;
  passed: boolean;
  submittedAt: string;
}

export interface SemesterTranscriptGrade {
  code: string;
  title: string;
  sks: number;
  scorePercent: number;
  letterGrade: string;
}

export interface AcademyGraduationExamState {
  passed: boolean;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  recipientName: string;
  passedAt: string;
  diplomaNumber: string;
  gpa?: number;
  honorsLabel?: string;
  transcriptSerial?: string;
  semesterGrades?: SemesterTranscriptGrade[];
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function generateTenDigitGangId(seedInput?: string): string {
  if (seedInput && /^\d{10}$/.test(seedInput.trim())) {
    return seedInput.trim();
  }
  const randomSix = Math.floor(100000 + Math.random() * 899999);
  return `2702${randomSix}`;
}

export function computeStrategistBelt(
  completedCountInput?: number,
  examPassedInput?: boolean
): BeltRankMeta {
  const completedCount =
    typeof completedCountInput === 'number'
      ? completedCountInput
      : loadCompletedLessonSlugs().length;
  const examPassed =
    typeof examPassedInput === 'boolean'
      ? examPassedInput
      : Boolean(loadAcademyExamState()?.passed);

  let def = MYTHOLOGICAL_RANKS[0];
  let nextTarget = 8;

  if (completedCount >= 53 && (examPassed || completedCount >= 60)) {
    def = MYTHOLOGICAL_RANKS[7];
    nextTarget = 60;
  } else if (completedCount >= 45) {
    def = MYTHOLOGICAL_RANKS[6];
    nextTarget = 53;
  } else if (completedCount >= 38) {
    def = MYTHOLOGICAL_RANKS[5];
    nextTarget = 45;
  } else if (completedCount >= 30) {
    def = MYTHOLOGICAL_RANKS[4];
    nextTarget = 38;
  } else if (completedCount >= 23) {
    def = MYTHOLOGICAL_RANKS[3];
    nextTarget = 30;
  } else if (completedCount >= 15) {
    def = MYTHOLOGICAL_RANKS[2];
    nextTarget = 23;
  } else if (completedCount >= 8) {
    def = MYTHOLOGICAL_RANKS[1];
    nextTarget = 15;
  }

  return {
    rank: def.legacyBelt,
    mythTier: def.tier,
    badgeText: def.code,
    labelId: def.code,
    labelEn: def.code,
    titleId: def.philosophyId,
    titleEn: def.philosophyEn,
    colorName: def.colorName,
    colorHex: def.colorHex,
    completedCount,
    nextBeltTargetLessons: nextTarget,
  };
}

export function loadThemeMode(): JgsThemeMode {
  if (!isBrowser()) return 'dark';
  try {
    const raw = window.localStorage.getItem(KEYS.THEME_MODE);
    return raw === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function saveThemeMode(mode: JgsThemeMode): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEYS.THEME_MODE, mode);
    document.documentElement.setAttribute('data-theme', mode);
    if (mode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    window.dispatchEvent(new CustomEvent('jgs-theme-change', { detail: mode }));
  } catch {
    // Ignore storage errors
  }
}

export function loadOnboardingDossier(): OnboardingDossier | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEYS.ONBOARDING);
    return raw ? (JSON.parse(raw) as OnboardingDossier) : null;
  } catch {
    return null;
  }
}

export function saveOnboardingDossier(dossier: OnboardingDossier): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEYS.ONBOARDING, JSON.stringify(dossier));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadCompletedLessonSlugs(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEYS.ACADEMY_COMPLETED);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleCompletedLessonSlug(slug: string): string[] {
  if (!isBrowser()) return [];
  const current = loadCompletedLessonSlugs();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
  try {
    window.localStorage.setItem(KEYS.ACADEMY_COMPLETED, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('jgs-progress-change'));
  } catch {
    // Ignore
  }
  return next;
}

export function markLessonCompleted(slug: string): string[] {
  if (!isBrowser()) return [];
  const current = loadCompletedLessonSlugs();
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  try {
    window.localStorage.setItem(KEYS.ACADEMY_COMPLETED, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('jgs-progress-change'));
  } catch {
    // Ignore
  }
  return next;
}

export const EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES: TradeJournalItem[] = [
  {
    id: 'sample-1',
    tradedAt: '2026-11-06 15:30',
    instrument: 'XAUUSD',
    accountMode: 'CENT_USC',
    direction: 'LONG',
    entryPrice: 2642.5,
    stopLoss: 2640.0,
    takeProfit: 2648.0,
    exitPrice: 2648.0,
    lotSize: 0.1,
    realizedPnl: 55.0,
    realizedRMultiple: 2.2,
    setupTag: 'London Sweep + Displacement MSS + FVG',
    emotionTag: 'DISCIPLINED',
    ruleFollowedStopLoss: true,
    ruleProperLotSize: true,
    ruleWaitedConfirmation: true,
    ruleWithinDailyLimit: true,
    notes:
      'Waited for Asian low SSL sweep and M5 Market Structure Shift (MSS) before entering inside the Fair Value Gap (0.10 Cent Lot, 25 USC risk).'
  },
  {
    id: 'sample-2',
    tradedAt: '2026-11-07 20:15',
    instrument: 'EURUSD',
    accountMode: 'CENT_USC',
    direction: 'SHORT',
    entryPrice: 1.084,
    stopLoss: 1.0855,
    takeProfit: 1.081,
    exitPrice: 1.0855,
    lotSize: 0.16,
    realizedPnl: -24.0,
    realizedRMultiple: -1.0,
    setupTag: 'NY Silver Bullet FVG',
    emotionTag: 'CALM',
    ruleFollowedStopLoss: true,
    ruleProperLotSize: true,
    ruleWaitedConfirmation: true,
    ruleWithinDailyLimit: true,
    notes:
      'Normal planned -1R stop loss hit. Kept lot size exact and did not re-enter out of frustration.'
  },
  {
    id: 'sample-3',
    tradedAt: '2026-11-08 16:05',
    instrument: 'XAUUSD',
    accountMode: 'CENT_USC',
    direction: 'LONG',
    entryPrice: 2655.0,
    stopLoss: 2652.0,
    takeProfit: 2661.0,
    exitPrice: 2651.4,
    lotSize: 0.15,
    realizedPnl: -54.0,
    realizedRMultiple: -1.2,
    setupTag: 'Unconfirmed Inducement Chase',
    emotionTag: 'FOMO',
    ruleFollowedStopLoss: false,
    ruleProperLotSize: false,
    ruleWaitedConfirmation: false,
    ruleWithinDailyLimit: true,
    notes:
      'Chased green candle before liquidity sweep and widened stop by 60 points. Logged honestly to audit FOMO leak.'
  },
  {
    id: 'sample-4',
    tradedAt: '2026-11-09 15:45',
    instrument: 'GBPUSD',
    accountMode: 'CENT_USC',
    direction: 'LONG',
    entryPrice: 1.292,
    stopLoss: 1.29,
    takeProfit: 1.297,
    exitPrice: 1.297,
    lotSize: 0.12,
    realizedPnl: 60.0,
    realizedRMultiple: 2.5,
    setupTag: 'London Killzone SSL Sweep + OB',
    emotionTag: 'DISCIPLINED',
    ruleFollowedStopLoss: true,
    ruleProperLotSize: true,
    ruleWaitedConfirmation: true,
    ruleWithinDailyLimit: true,
    notes:
      'Clean 1:2.5 R:R execution. Covered previous day losses and restored positive expectancy.'
  }
];

export function loadJournalEntries(): TradeJournalItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEYS.JOURNAL_ENTRIES);
    if (!raw) return [];
    return JSON.parse(raw) as TradeJournalItem[];
  } catch {
    return [];
  }
}

export function saveJournalEntries(entries: TradeJournalItem[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  } catch {
    // Ignore
  }
}

export function loadRiskPresets(): SavedRiskRulePreset[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEYS.RISK_PRESETS);
    return raw ? (JSON.parse(raw) as SavedRiskRulePreset[]) : [];
  } catch {
    return [];
  }
}

export function saveRiskPreset(preset: SavedRiskRulePreset): SavedRiskRulePreset[] {
  if (!isBrowser()) return [];
  const existing = loadRiskPresets();
  const next = [preset, ...existing.filter((p) => p.id !== preset.id)].slice(0, 10);
  try {
    window.localStorage.setItem(KEYS.RISK_PRESETS, JSON.stringify(next));
  } catch {
    // Ignore
  }
  return next;
}

export function loadStrategistSession(): StrategistUserSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEYS.USER_SESSION);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StrategistUserSession;
    if (!parsed.gangId) {
      parsed.gangId = '2702285126';
    }
    if (!parsed.division) {
      parsed.division = '1,000 USC MICRO-CAPITAL STRATEGIST';
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveStrategistSession(session: StrategistUserSession | null): void {
  if (!isBrowser()) return;
  try {
    if (!session) {
      window.localStorage.removeItem(KEYS.USER_SESSION);
    } else {
      const normalized: StrategistUserSession = {
        ...session,
        gangId: session.gangId ? generateTenDigitGangId(session.gangId) : generateTenDigitGangId(),
        division: session.division ?? '1,000 USC MICRO-CAPITAL STRATEGIST'
      };
      window.localStorage.setItem(KEYS.USER_SESSION, JSON.stringify(normalized));
    }
    window.dispatchEvent(new CustomEvent('jgs-session-change'));
  } catch {
    // Ignore
  }
}

export function getLiveGangRoster(): GangRosterMember[] {
  const session = loadStrategistSession();
  const belt = computeStrategistBelt();
  if (!session) {
    return DEFAULT_GANG_ROSTER;
  }
  const currentUserEntry: GangRosterMember = {
    fullName: session.displayName,
    gangId: session.gangId ?? '2702285126',
    beltRank: belt.rank,
    beltLabel: belt.badgeText,
    division: session.division ?? '1,000 USC MICRO-CAPITAL STRATEGIST',
    joinedLabel: 'Verified Gang Member • Active Session'
  };
  const filteredDefaults = DEFAULT_GANG_ROSTER.filter(
    (m) =>
      m.gangId !== currentUserEntry.gangId &&
      m.fullName.toLowerCase() !== currentUserEntry.fullName.toLowerCase()
  );
  return [currentUserEntry, ...filteredDefaults];
}

export function loadMt5Checklist(defaultIds: string[] = ['mt5-step-1']): string[] {
  if (!isBrowser()) return defaultIds;
  try {
    const raw = window.localStorage.getItem(KEYS.MT5_CHECKLIST);
    return raw ? (JSON.parse(raw) as string[]) : defaultIds;
  } catch {
    return defaultIds;
  }
}

export function saveMt5Checklist(stepIds: string[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEYS.MT5_CHECKLIST, JSON.stringify(stepIds));
  } catch {
    // Ignore
  }
}

export function loadAcademyExamState(): AcademyGraduationExamState | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEYS.GRADUATION_EXAM);
    return raw ? (JSON.parse(raw) as AcademyGraduationExamState) : null;
  } catch {
    return null;
  }
}

export function saveAcademyExamState(state: AcademyGraduationExamState | null): void {
  if (!isBrowser()) return;
  try {
    if (!state) {
      window.localStorage.removeItem(KEYS.GRADUATION_EXAM);
    } else {
      window.localStorage.setItem(KEYS.GRADUATION_EXAM, JSON.stringify(state));
    }
    window.dispatchEvent(new CustomEvent('jgs-progress-change'));
  } catch {
    // Ignore
  }
}

export function loadCompletedCaseSlugs(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEYS.CASE_ASSIGNMENTS);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function markCaseTaskCompleted(slug: string): string[] {
  if (!isBrowser()) return [];
  const current = loadCompletedCaseSlugs();
  if (current.includes(slug)) return current;
  const next = [...current, slug];
  try {
    window.localStorage.setItem(KEYS.CASE_ASSIGNMENTS, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('jgs-progress-change'));
  } catch {
    // Ignore
  }
  return next;
}

export function loadModuleEssays(): Record<string, ModuleEssaySubmission> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(KEYS.MODULE_ESSAYS);
    return raw ? (JSON.parse(raw) as Record<string, ModuleEssaySubmission>) : {};
  } catch {
    return {};
  }
}

export function saveModuleEssaySubmission(
  entry: ModuleEssaySubmission
): Record<string, ModuleEssaySubmission> {
  if (!isBrowser()) return {};
  const existing = loadModuleEssays();
  const prevBest = existing[entry.slug];
  const nextEntry =
    prevBest && prevBest.passed && prevBest.score > entry.score && !entry.passed
      ? prevBest
      : entry;
  const next = { ...existing, [entry.slug]: nextEntry };
  try {
    window.localStorage.setItem(KEYS.MODULE_ESSAYS, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('jgs-progress-change'));
  } catch {
    // Ignore
  }
  return next;
}
