export type LessonDiagramType =
  | 'INFLATION_EROSION'
  | 'MARKET_ECOSYSTEM'
  | 'MACRO_INTERMARKET'
  | 'FOREX_GOLD_BASICS'
  | 'BROKER_VS_MT5'
  | 'MT5_BUTTONS'
  | 'GOLD_BAR_CENT'
  | 'CONTRACT_SPEC_CHECK'
  | 'DRAWDOWN_SHIELD'
  | 'TECHNICAL_HIST_MA'
  | 'WYCKOFF_CYCLE'
  | 'ELLIOTT_FIBO'
  | 'AUCTION_PROFILE'
  | 'ICT_KILLZONE'
  | 'ICT_SWEEP_BSL_SSL'
  | 'ICT_MSS_FVG'
  | 'SOP_CHECKLIST'
  | 'FAILED_AUTOPSY'
  | 'BEHAVIORAL_LOOP'
  | 'QUANT_EXPECTANCY'
  | 'MARTINGALE_VS_SL'
  | 'COPY_TRADING_HWM'
  | 'ENTRY_CONFIRMATION_PIPELINE'
  | 'EMPTY_CHART_SOP_FLOW';

export interface LessonQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PrerequisiteGlossaryItem {
  term: string;
  analogyId: string;
  analogyEn: string;
}

export interface AcademicCitation {
  authors: string;
  year: string;
  title: string;
  source: string;
  keyInsightId: string;
  keyInsightEn: string;
}

export interface AcademicDebateBox {
  topicId: string;
  topicEn: string;
  campusViewId: string;
  campusViewEn: string;
  practitionerViewId: string;
  practitionerViewEn: string;
  jgsSynthesisId: string;
  jgsSynthesisEn: string;
}

export interface DynamicCaseTemplate {
  formulaKind:
    | 'INFLATION_POWER'
    | 'INTERMARKET_YIELD'
    | 'SPREAD_COST'
    | 'CENT_LOT_SIZING'
    | 'DRAWDOWN_RECOVERY'
    | 'FIBO_DISCOUNT'
    | 'ICT_RRR_TARGET'
    | 'QUANT_EXPECTANCY'
    | 'HWM_FEE';
  hintId: string;
  hintEn: string;
}

export interface LessonStudioMetadata {
  diagramType: LessonDiagramType;
  grassrootsWhatId: string;
  grassrootsWhatEn: string;
  grassrootsOriginId: string;
  grassrootsOriginEn: string;
  prerequisiteTerms: PrerequisiteGlossaryItem[];
  sksCredits: number;
  learningOutcomesId: string[];
  learningOutcomesEn: string[];
  citation: AcademicCitation;
  debate: AcademicDebateBox;
  caseTask: DynamicCaseTemplate;
  openingHookId: string;
  openingHookEn: string;
  moduleOutcomeId: string;
  moduleOutcomeEn: string;
  analogyHeadlineId: string;
  analogyHeadlineEn: string;
  analogyBodyId: string;
  analogyBodyEn: string;
  practiceMissionId: string;
  practiceMissionEn: string;
  practiceTargetTab: 'MT5_SIM' | 'LIVE_TV' | 'JESSY_QUIZ';
  liveChartSymbol: string;
  jessyBabyExplainId: string;
  jessyBabyExplainEn: string;
  bonusQuizId: LessonQuizQuestion;
  bonusQuizEn: LessonQuizQuestion;
  youtube: {
    videoId: string;
    title: string;
    channelName: string;
    keyTakeawayId: string;
    keyTakeawayEn: string;
    timestamps: { time: string; topicId: string; topicEn: string }[];
  };
}

export interface AcademyTrack {
  id: string;
  courseCode: string;
  sksCredits: number;
  trackNumber: string;
  slug: string;
  title: string;
  titleId?: string;
  subtitle: string;
  subtitleId?: string;
  targetAudience: string;
  targetAudienceId?: string;
  learningOutcome: string;
  learningOutcomeId?: string;
  academicSummaryId: string;
  academicSummaryEn: string;
  estimatedMinutes: number;
}

export interface AcademyLesson {
  slug: string;
  trackId: string;
  lessonNumber: string;
  title: string;
  titleId?: string;
  durationMinutes: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'QUANT';
  summary: string;
  summaryId?: string;
  studio: LessonStudioMetadata;
  plainEnglishSections: {
    heading: string;
    body: string;
  }[];
  plainEnglishSectionsId?: {
    heading: string;
    body: string;
  }[];
  technicalSections: {
    heading: string;
    body: string;
    formulaOrSpec?: string;
  }[];
  technicalSectionsId?: {
    heading: string;
    body: string;
    formulaOrSpec?: string;
  }[];
  microCapitalCaseStudy: {
    title: string;
    standardAccountOutcome: string;
    centAccountOutcome: string;
  };
  microCapitalCaseStudyId?: {
    title: string;
    standardAccountOutcome: string;
    centAccountOutcome: string;
  };
  jeyStreetRule: string;
  jeyStreetRuleId?: string;
  relatedTerms: string[];
  quiz: LessonQuizQuestion;
  quizId?: LessonQuizQuestion;
}

export interface GraduationExamQuestion {
  id: string;
  semesterCode: string;
  levelTag: string;
  reviewSlug: string;
  questionId: string;
  questionEn: string;
  optionsId: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationId: string;
  explanationEn: string;
}
