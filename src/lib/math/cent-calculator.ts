export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'IDR';
export type SupportedInstrument = 'XAUUSD' | 'EURUSD' | 'GBPUSD' | 'USDJPY';
export type AccountDenomination = 'USC' | 'USD';

export interface InstrumentSpec {
  symbol: SupportedInstrument;
  name: string;
  nameId: string;
  category: 'METALS' | 'FOREX_MAJOR';
  standardContractSize: string;
  centContractSize: string;
  usdValuePerPointAtMinStandardLot: number;
  uscValuePerPointAtMinCentLot: number;
  referencePrice: number;
  typicalSpreadPoints: number;
  pointExplanation: string;
  pointExplanationId: string;
  beginnerNote: string;
  beginnerNoteId: string;
  /** Example broker symbol specs for 1.00 Lot (always verify in MT5 Specification window) */
  defaultTickSize: number;
  defaultTickValuePerStandardLotUsd: number;
  defaultTickValuePerCentLotUsc: number;
  defaultStandardUnitsPerLot: number;
  defaultCentUnitsPerLot: number;
}

export const INSTRUMENT_SPECS: Record<SupportedInstrument, InstrumentSpec> = {
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Spot Gold vs US Dollar',
    nameId: 'Emas Spot vs Dolar AS',
    category: 'METALS',
    standardContractSize: 'Example: 100 Troy Ounces per 1.00 Lot (varies by broker)',
    centContractSize: 'Example: 1 Troy Ounce or 100 oz in USC (depends on broker contract spec)',
    usdValuePerPointAtMinStandardLot: 0.01,
    uscValuePerPointAtMinCentLot: 0.01,
    referencePrice: 2650.0,
    typicalSpreadPoints: 22,
    pointExplanation:
      'Example specification: Tick Size 0.01 ($0.01 price change = 1 tick). Always check your broker’s MT5 Specification window.',
    pointExplanationId:
      'Contoh spesifikasi: Ukuran Tick 0.01 (perubahan harga $0.01 = 1 tick). Selalu periksa jendela Spesifikasi MT5 broker Anda.',
    beginnerNote:
      'Broker specifications for XAUUSD vary: some brokers set 1.00 Cent Lot to 1 oz (1 USC per 0.01 tick), while others keep 100 oz or use different minimum volumes (0.01 vs 0.10 lot).',
    beginnerNoteId:
      'Spesifikasi broker untuk XAUUSD berbeda-beda: sebagian broker menetapkan 1.00 Lot Cent sebesar 1 oz, sementara broker lain menggunakan ukuran kontrak atau volume minimum yang berbeda.',
    defaultTickSize: 0.01,
    defaultTickValuePerStandardLotUsd: 1.0,
    defaultTickValuePerCentLotUsc: 1.0,
    defaultStandardUnitsPerLot: 100,
    defaultCentUnitsPerLot: 1
  },
  EURUSD: {
    symbol: 'EURUSD',
    name: 'Euro vs US Dollar',
    nameId: 'Euro vs Dolar AS',
    category: 'FOREX_MAJOR',
    standardContractSize: 'Example: 100,000 EUR per 1.00 Standard Lot',
    centContractSize: 'Example: 1,000 EUR per 1.00 Micro/Cent Lot (broker-dependent)',
    usdValuePerPointAtMinStandardLot: 0.01,
    uscValuePerPointAtMinCentLot: 0.01,
    referencePrice: 1.085,
    typicalSpreadPoints: 12,
    pointExplanation:
      'Example 5-digit specification: Tick Size 0.00001 (10 ticks = 1 standard pip).',
    pointExplanationId:
      'Contoh spesifikasi 5-digit: Ukuran Tick 0.00001 (10 tick = 1 pip standar).',
    beginnerNote:
      'Highly liquid major currency pair. Tick value and minimum volume depend on whether your account uses standard, micro, or cent contract specifications.',
    beginnerNoteId:
      'Pasangan mata uang utama dengan likuiditas tinggi. Nilai tick dan volume minimum bergantung pada spesifikasi kontrak akun broker Anda.',
    defaultTickSize: 0.00001,
    defaultTickValuePerStandardLotUsd: 1.0,
    defaultTickValuePerCentLotUsc: 1.0,
    defaultStandardUnitsPerLot: 100000,
    defaultCentUnitsPerLot: 1000
  },
  GBPUSD: {
    symbol: 'GBPUSD',
    name: 'British Pound vs US Dollar',
    nameId: 'Pound Inggris vs Dolar AS',
    category: 'FOREX_MAJOR',
    standardContractSize: 'Example: 100,000 GBP per 1.00 Standard Lot',
    centContractSize: 'Example: 1,000 GBP per 1.00 Micro/Cent Lot (broker-dependent)',
    usdValuePerPointAtMinStandardLot: 0.01,
    uscValuePerPointAtMinCentLot: 0.01,
    referencePrice: 1.295,
    typicalSpreadPoints: 15,
    pointExplanation:
      'Example 5-digit specification: Tick Size 0.00001 (10 ticks = 1 standard pip).',
    pointExplanationId:
      'Contoh spesifikasi 5-digit: Ukuran Tick 0.00001 (10 tick = 1 pip standar).',
    beginnerNote:
      'Exhibits active volatility during the London and New York sessions. Verify your broker’s stop distance and tick value before sizing.',
    beginnerNoteId:
      'Memiliki volatilitas aktif pada sesi London dan New York. Pastikan nilai tick dan jarak stop pada broker Anda sebelum menghitung ukuran posisi.',
    defaultTickSize: 0.00001,
    defaultTickValuePerStandardLotUsd: 1.0,
    defaultTickValuePerCentLotUsc: 1.0,
    defaultStandardUnitsPerLot: 100000,
    defaultCentUnitsPerLot: 1000
  },
  USDJPY: {
    symbol: 'USDJPY',
    name: 'US Dollar vs Japanese Yen',
    nameId: 'Dolar AS vs Yen Jepang',
    category: 'FOREX_MAJOR',
    standardContractSize: 'Example: 100,000 USD per 1.00 Standard Lot',
    centContractSize: 'Example: 1,000 USD per 1.00 Micro/Cent Lot (broker-dependent)',
    usdValuePerPointAtMinStandardLot: 0.0095,
    uscValuePerPointAtMinCentLot: 0.0095,
    referencePrice: 152.4,
    typicalSpreadPoints: 13,
    pointExplanation:
      'Example 3-digit specification: Tick Size 0.001 (10 ticks = 0.01 JPY).',
    pointExplanationId:
      'Contoh spesifikasi 3-digit: Ukuran Tick 0.001 (10 tick = 0.01 JPY).',
    beginnerNote:
      'Because the quote currency is JPY, the tick value in USD or USC fluctuates with the current USDJPY exchange rate.',
    beginnerNoteId:
      'Karena mata uang kuotasi adalah JPY, nilai tick dalam USD atau USC berubah mengikuti nilai tukar USDJPY saat ini.',
    defaultTickSize: 0.001,
    defaultTickValuePerStandardLotUsd: 0.95,
    defaultTickValuePerCentLotUsc: 0.95,
    defaultStandardUnitsPerLot: 100000,
    defaultCentUnitsPerLot: 1000
  }
};

export const CURRENCY_TO_USD_RATE: Record<SupportedCurrency, number> = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.29,
  IDR: 1 / 15800
};

// ============================================================================
// BROKER-SPECIFIC SYMBOL SPECIFICATION POSITION SIZER (WITH EXPLICIT REJECTION)
// ============================================================================

export interface BrokerSymbolPositionInput {
  equity: number;
  accountDenomination: AccountDenomination; // 'USC' or 'USD'
  riskPercentage: number;
  /** Stop-loss distance in price units (e.g. 2.50 on XAUUSD, or 0.00200 on EURUSD) */
  stopLossDistance: number;
  /** Minimum price movement step (e.g. 0.01 on XAUUSD, 0.00001 on EURUSD) */
  tickSize: number;
  /** Value of 1 tick movement for 1.00 full lot in the account denomination */
  tickValuePerLot: number;
  /** Minimum broker-allowed trade volume (e.g. 0.01) */
  minimumLot: number;
  /** Maximum broker-allowed trade volume (e.g. 100.00) */
  maximumLot: number;
  /** Broker volume step increment (e.g. 0.01) */
  volumeStep: number;
  /** Optional margin estimation fields */
  leverage?: number;
  contractUnitsPerLot?: number;
  referencePrice?: number;
}

export type PositionSizingStatus =
  | 'APPROVED'
  | 'CAPPED_AT_MAXIMUM_LOT'
  | 'REJECTED_RISK_LIMIT_EXCEEDED'
  | 'INVALID_PARAMETERS';

export interface BrokerSymbolPositionResult {
  status: PositionSizingStatus;
  isExecutable: boolean;
  validationErrors: string[];
  equity: number;
  equityUsdEquivalent: number;
  equityUscEquivalent: number;
  accountDenomination: AccountDenomination;
  riskPercentage: number;
  maxAllowedRiskAmount: number;
  maxAllowedRiskUsdEquivalent: number;
  stopLossTicks: number;
  lossPerOneFullLot: number;
  lossAtMinimumLot: number;
  minimumLotRiskPercentage: number;
  rawIdealLotSize: number;
  /**
   * Explicitly null when status is REJECTED_RISK_LIMIT_EXCEEDED or INVALID_PARAMETERS.
   * Never automatically increased to minimumLot when minimumLot exceeds the risk limit!
   */
  approvedLotSize: number | null;
  actualRiskAmount: number | null;
  actualRiskPercentage: number | null;
  unusedRiskBufferAmount: number | null;
  estimatedMarginRequired: number | null;
  estimatedFreeMargin: number | null;
  estimatedMarginLevelPercent: number | null;
  rejectionOrStatusHeadline: string;
  rejectionOrStatusExplanation: string;
}

export function convertUsdAndUsc(
  amount: number,
  from: AccountDenomination
): {
  usd: number;
  usc: number;
} {
  const safe = Number.isFinite(amount) && amount >= 0 ? amount : 0;
  if (from === 'USD') {
    return {
      usd: Number(safe.toFixed(2)),
      usc: Number((safe * 100).toFixed(2))
    };
  }
  return {
    usd: Number((safe / 100).toFixed(4)),
    usc: Number(safe.toFixed(2))
  };
}

export function calculateBrokerSymbolPositionSize(
  input: BrokerSymbolPositionInput
): BrokerSymbolPositionResult {
  const validationErrors: string[] = [];

  if (!Number.isFinite(input.equity) || input.equity <= 0) {
    validationErrors.push('Account equity must be greater than 0.');
  }
  if (
    !Number.isFinite(input.riskPercentage) ||
    input.riskPercentage <= 0 ||
    input.riskPercentage > 100
  ) {
    validationErrors.push('Risk percentage must be between 0.01% and 100%.');
  }
  if (!Number.isFinite(input.stopLossDistance) || input.stopLossDistance <= 0) {
    validationErrors.push('Stop-loss distance must be greater than 0.');
  }
  if (!Number.isFinite(input.tickSize) || input.tickSize <= 0) {
    validationErrors.push('Tick size must be greater than 0.');
  }
  if (!Number.isFinite(input.tickValuePerLot) || input.tickValuePerLot <= 0) {
    validationErrors.push('Tick value per lot must be greater than 0.');
  }
  if (!Number.isFinite(input.minimumLot) || input.minimumLot <= 0) {
    validationErrors.push('Minimum lot must be greater than 0.');
  }
  if (!Number.isFinite(input.maximumLot) || input.maximumLot < input.minimumLot) {
    validationErrors.push('Maximum lot must be greater than or equal to minimum lot.');
  }
  if (!Number.isFinite(input.volumeStep) || input.volumeStep <= 0) {
    validationErrors.push('Volume step must be greater than 0.');
  }

  const converted = convertUsdAndUsc(input.equity, input.accountDenomination);

  if (validationErrors.length > 0) {
    return {
      status: 'INVALID_PARAMETERS',
      isExecutable: false,
      validationErrors,
      equity: input.equity,
      equityUsdEquivalent: converted.usd,
      equityUscEquivalent: converted.usc,
      accountDenomination: input.accountDenomination,
      riskPercentage: input.riskPercentage,
      maxAllowedRiskAmount: 0,
      maxAllowedRiskUsdEquivalent: 0,
      stopLossTicks: 0,
      lossPerOneFullLot: 0,
      lossAtMinimumLot: 0,
      minimumLotRiskPercentage: 0,
      rawIdealLotSize: 0,
      approvedLotSize: null,
      actualRiskAmount: null,
      actualRiskPercentage: null,
      unusedRiskBufferAmount: null,
      estimatedMarginRequired: null,
      estimatedFreeMargin: null,
      estimatedMarginLevelPercent: null,
      rejectionOrStatusHeadline: 'INVALID INPUT PARAMETERS',
      rejectionOrStatusExplanation: validationErrors.join(' ')
    };
  }

  const maxAllowedRiskAmount = Number(
    ((input.equity * input.riskPercentage) / 100).toFixed(4)
  );
  const maxAllowedRiskUsdEquivalent =
    input.accountDenomination === 'USD'
      ? Number(maxAllowedRiskAmount.toFixed(2))
      : Number((maxAllowedRiskAmount / 100).toFixed(4));

  const stopLossTicks = Number((input.stopLossDistance / input.tickSize).toFixed(4));
  const lossPerOneFullLot = Number((stopLossTicks * input.tickValuePerLot).toFixed(4));
  const lossAtMinimumLot = Number((lossPerOneFullLot * input.minimumLot).toFixed(4));
  const minimumLotRiskPercentage = Number(
    ((lossAtMinimumLot / input.equity) * 100).toFixed(2)
  );

  const rawIdealLotSize =
    lossPerOneFullLot > 0
      ? Number((maxAllowedRiskAmount / lossPerOneFullLot).toFixed(6))
      : 0;

  // Quantize DOWN (floor) to volumeStep so we NEVER exceed the requested risk limit
  const stepsCount = Math.floor((rawIdealLotSize + 1e-9) / input.volumeStep);
  const steppedVolume = Number((stepsCount * input.volumeStep).toFixed(6));

  // CRITICAL REQUIREMENT:
  // If a valid trade size cannot meet the requested risk limit (i.e. rawIdealLotSize < minimumLot
  // or steppedVolume < minimumLot), explicitly REJECT the trade size instead of rounding up to minimumLot!
  if (rawIdealLotSize + 1e-9 < input.minimumLot || steppedVolume + 1e-9 < input.minimumLot) {
    return {
      status: 'REJECTED_RISK_LIMIT_EXCEEDED',
      isExecutable: false,
      validationErrors: [],
      equity: input.equity,
      equityUsdEquivalent: converted.usd,
      equityUscEquivalent: converted.usc,
      accountDenomination: input.accountDenomination,
      riskPercentage: input.riskPercentage,
      maxAllowedRiskAmount,
      maxAllowedRiskUsdEquivalent,
      stopLossTicks,
      lossPerOneFullLot,
      lossAtMinimumLot,
      minimumLotRiskPercentage,
      rawIdealLotSize,
      approvedLotSize: null,
      actualRiskAmount: null,
      actualRiskPercentage: null,
      unusedRiskBufferAmount: null,
      estimatedMarginRequired: null,
      estimatedFreeMargin: null,
      estimatedMarginLevelPercent: null,
      rejectionOrStatusHeadline: 'TRADE SIZE REJECTED: EXCEEDS REQUESTED RISK LIMIT',
      rejectionOrStatusExplanation: `Your ${input.riskPercentage}% risk limit allows a maximum loss of ${maxAllowedRiskAmount.toFixed(2)} ${input.accountDenomination} (ideal volume: ${rawIdealLotSize.toFixed(4)} lots). However, under this broker specification, minimum volume (${input.minimumLot} lot) risks ${lossAtMinimumLot.toFixed(2)} ${input.accountDenomination} (${minimumLotRiskPercentage}% of equity). Trade volume is rejected rather than increased to minimum lot.`
    };
  }

  let status: PositionSizingStatus = 'APPROVED';
  let approvedLotSize = steppedVolume;

  if (approvedLotSize > input.maximumLot) {
    approvedLotSize = input.maximumLot;
    status = 'CAPPED_AT_MAXIMUM_LOT';
  }

  const stepDecimals = input.volumeStep.toString().split('.')[1]?.length ?? 2;
  approvedLotSize = Number(approvedLotSize.toFixed(Math.max(2, stepDecimals)));

  const actualRiskAmount = Number((approvedLotSize * lossPerOneFullLot).toFixed(4));
  const actualRiskPercentage = Number(((actualRiskAmount / input.equity) * 100).toFixed(2));
  const unusedRiskBufferAmount = Number(
    Math.max(0, maxAllowedRiskAmount - actualRiskAmount).toFixed(4)
  );

  // Margin estimation
  const leverage = input.leverage && input.leverage > 0 ? input.leverage : 500;
  const contractUnits =
    input.contractUnitsPerLot && input.contractUnitsPerLot > 0
      ? input.contractUnitsPerLot
      : 100;
  const refPrice =
    input.referencePrice && input.referencePrice > 0 ? input.referencePrice : 2650;

  const notionalInDenom = approvedLotSize * contractUnits * refPrice;
  const estimatedMarginRequired = Number((notionalInDenom / leverage).toFixed(2));
  const estimatedFreeMargin = Number((input.equity - estimatedMarginRequired).toFixed(2));
  const estimatedMarginLevelPercent =
    estimatedMarginRequired > 0
      ? Number(((input.equity / estimatedMarginRequired) * 100).toFixed(1))
      : null;

  return {
    status,
    isExecutable: true,
    validationErrors: [],
    equity: input.equity,
    equityUsdEquivalent: converted.usd,
    equityUscEquivalent: converted.usc,
    accountDenomination: input.accountDenomination,
    riskPercentage: input.riskPercentage,
    maxAllowedRiskAmount,
    maxAllowedRiskUsdEquivalent,
    stopLossTicks,
    lossPerOneFullLot,
    lossAtMinimumLot,
    minimumLotRiskPercentage,
    rawIdealLotSize,
    approvedLotSize,
    actualRiskAmount,
    actualRiskPercentage,
    unusedRiskBufferAmount,
    estimatedMarginRequired,
    estimatedFreeMargin,
    estimatedMarginLevelPercent,
    rejectionOrStatusHeadline:
      status === 'CAPPED_AT_MAXIMUM_LOT'
        ? `APPROVED (CAPPED AT BROKER MAX LOT ${approvedLotSize})`
        : `TRADE SIZE APPROVED: ${approvedLotSize.toFixed(Math.max(2, stepDecimals))} LOTS`,
    rejectionOrStatusExplanation: `Executes ${approvedLotSize.toFixed(Math.max(2, stepDecimals))} lots (${input.accountDenomination}), risking ${actualRiskAmount.toFixed(2)} ${input.accountDenomination} (${actualRiskPercentage}% of equity), within your ${input.riskPercentage}% (${maxAllowedRiskAmount.toFixed(2)} ${input.accountDenomination}) risk limit.`
  };
}

// ============================================================================
// HIGH-WATER MARK (HWM) & PERFORMANCE FEE SIMULATION ENGINE (30% PROPOSED FEE)
// ============================================================================

export interface HighWaterMarkPeriodReturnInput {
  periodLabel: string;
  netProfitOrLoss: number;
}

export interface HighWaterMarkScheduleInput {
  initialEquity: number;
  feeRatePercent?: number; // Default 30%
  periodNetReturnsBeforeFee: HighWaterMarkPeriodReturnInput[];
}

export interface HighWaterMarkPeriodStep {
  periodIndex: number;
  periodLabel: string;
  startingEquity: number;
  netProfitOrLoss: number;
  endingEquityBeforeFee: number;
  highWaterMarkBefore: number;
  eligibleNewProfitAboveHwm: number;
  performanceFeeCharged: number;
  endingEquityAfterFee: number;
  highWaterMarkAfter: number;
  feeApplied: boolean;
}

export interface HighWaterMarkScheduleResult {
  periods: HighWaterMarkPeriodStep[];
  totalFeesCharged: number;
  finalNetEquity: number;
  finalHighWaterMark: number;
}

export function simulateHighWaterMarkFeeSchedule(
  input: HighWaterMarkScheduleInput
): HighWaterMarkScheduleResult {
  const feePct = input.feeRatePercent ?? 30;
  let currentEquity = Math.max(0, Number(input.initialEquity.toFixed(2)));
  let currentHwm = currentEquity;
  let totalFees = 0;
  const periods: HighWaterMarkPeriodStep[] = [];

  input.periodNetReturnsBeforeFee.forEach((period, idx) => {
    const startEq = currentEquity;
    const netDelta = Number(period.netProfitOrLoss.toFixed(2));
    const endingBeforeFee = Math.max(0, Number((startEq + netDelta).toFixed(2)));
    const hwmBefore = currentHwm;

    const eligibleNewProfit = Math.max(0, Number((endingBeforeFee - hwmBefore).toFixed(2)));
    const feeCharged =
      eligibleNewProfit > 0 ? Number(((eligibleNewProfit * feePct) / 100).toFixed(2)) : 0;
    const endingAfterFee = Number((endingBeforeFee - feeCharged).toFixed(2));
    const hwmAfter = eligibleNewProfit > 0 ? endingAfterFee : hwmBefore;

    totalFees = Number((totalFees + feeCharged).toFixed(2));
    currentEquity = endingAfterFee;
    currentHwm = hwmAfter;

    periods.push({
      periodIndex: idx + 1,
      periodLabel: period.periodLabel,
      startingEquity: startEq,
      netProfitOrLoss: netDelta,
      endingEquityBeforeFee: endingBeforeFee,
      highWaterMarkBefore: hwmBefore,
      eligibleNewProfitAboveHwm: eligibleNewProfit,
      performanceFeeCharged: feeCharged,
      endingEquityAfterFee: endingAfterFee,
      highWaterMarkAfter: hwmAfter,
      feeApplied: feeCharged > 0
    });
  });

  return {
    periods,
    totalFeesCharged: totalFees,
    finalNetEquity: currentEquity,
    finalHighWaterMark: currentHwm
  };
}

// ============================================================================
// EXAMPLE STANDARD VS MICRO/CENT CONTRACT COMPARATOR
// ============================================================================

export interface CentComparisonInput {
  depositAmount: number;
  depositCurrency: SupportedCurrency;
  instrument: SupportedInstrument;
  stopLossPoints: number;
  riskPercent: number;
  leverage: number;
}

export interface AccountExecutionAnalysis {
  accountMode: 'STANDARD_USD' | 'CENT_USC';
  balanceDisplay: string;
  balanceNumeric: number;
  unitLabel: 'USD' | 'USC';
  targetRiskAmount: number;
  targetRiskUsdEquivalent: number;
  rawIdealLotSize: number;
  executableLotSize: number;
  approvedLotSizeOrNull: number | null;
  actualRiskAmount: number;
  actualRiskUsdEquivalent: number;
  actualRiskPercentOfAccount: number;
  minPossibleLotRiskPercent: number;
  isOverRiskTrap: boolean;
  isBelowBrokerMinLot: boolean;
  marginRequiredInUnit: number;
  survivableConsecutiveLossesTo25PercentDrawdown: number;
  verdictTitle: string;
  verdictDetail: string;
}

export interface CentComparisonResult {
  depositUsd: number;
  depositUsc: number;
  instrumentSpec: InstrumentSpec;
  stopLossPoints: number;
  stopLossDollarMoveOnGoldOrPips: string;
  riskPercent: number;
  leverage: number;
  standardAnalysis: AccountExecutionAnalysis;
  centAnalysis: AccountExecutionAnalysis;
  jeyStreetRule: string;
}

export function calculateCentComparison(input: CentComparisonInput): CentComparisonResult {
  const safeDeposit = Math.max(1, Number.isFinite(input.depositAmount) ? input.depositAmount : 25);
  const rateToUsd = CURRENCY_TO_USD_RATE[input.depositCurrency] ?? 1.0;
  const depositUsd = Number((safeDeposit * rateToUsd).toFixed(2));
  const depositUsc = Number((depositUsd * 100).toFixed(0));

  const stopLossPoints = Math.max(10, Math.min(10000, Math.round(input.stopLossPoints || 250)));
  const riskPercent = Math.max(0.1, Math.min(25, Number(input.riskPercent || 1.0)));
  const leverage = Math.max(10, Math.min(2000, Math.round(input.leverage || 500)));
  const spec = INSTRUMENT_SPECS[input.instrument] ?? INSTRUMENT_SPECS.XAUUSD;

  // 1. Example Standard Contract Specification (USD)
  const targetRiskUsd = Number(((depositUsd * riskPercent) / 100).toFixed(2));
  const riskAtMinStandardLotUsd = Number(
    (stopLossPoints * spec.usdValuePerPointAtMinStandardLot).toFixed(2)
  );
  const rawStandardLots =
    riskAtMinStandardLotUsd > 0 ? (targetRiskUsd / riskAtMinStandardLotUsd) * 0.01 : 0;
  const roundedStandardLots = Math.floor((rawStandardLots + 1e-9) * 100) / 100;
  const isStandardBelowMin = roundedStandardLots < 0.01;
  const executableStandardLots = isStandardBelowMin
    ? 0.01
    : Number(roundedStandardLots.toFixed(2));
  const actualStandardRiskUsd = Number(
    ((executableStandardLots / 0.01) * riskAtMinStandardLotUsd).toFixed(2)
  );
  const actualStandardRiskPercent = Number(((actualStandardRiskUsd / depositUsd) * 100).toFixed(2));
  const minStandardLotRiskPercent = Number(
    ((riskAtMinStandardLotUsd / depositUsd) * 100).toFixed(2)
  );
  const isStandardTrap =
    isStandardBelowMin ||
    actualStandardRiskPercent > riskPercent * 1.35 ||
    actualStandardRiskPercent > 3.0;

  const notionalPerMinStandardLotUsd =
    spec.symbol === 'XAUUSD' ? spec.referencePrice * 1 : 1000;
  const standardMarginRequired = Number(
    (((executableStandardLots / 0.01) * notionalPerMinStandardLotUsd) / leverage).toFixed(2)
  );

  const stdStreaksTo25Pct =
    actualStandardRiskPercent > 0
      ? Math.max(0, Math.floor(25 / actualStandardRiskPercent))
      : 0;

  const standardAnalysis: AccountExecutionAnalysis = {
    accountMode: 'STANDARD_USD',
    balanceDisplay: `$${depositUsd.toFixed(2)} USD`,
    balanceNumeric: depositUsd,
    unitLabel: 'USD',
    targetRiskAmount: targetRiskUsd,
    targetRiskUsdEquivalent: targetRiskUsd,
    rawIdealLotSize: Number(rawStandardLots.toFixed(4)),
    executableLotSize: executableStandardLots,
    approvedLotSizeOrNull: isStandardBelowMin ? null : executableStandardLots,
    actualRiskAmount: actualStandardRiskUsd,
    actualRiskUsdEquivalent: actualStandardRiskUsd,
    actualRiskPercentOfAccount: actualStandardRiskPercent,
    minPossibleLotRiskPercent: minStandardLotRiskPercent,
    isOverRiskTrap: isStandardTrap,
    isBelowBrokerMinLot: isStandardBelowMin,
    marginRequiredInUnit: standardMarginRequired,
    survivableConsecutiveLossesTo25PercentDrawdown: stdStreaksTo25Pct,
    verdictTitle: isStandardBelowMin
      ? 'REJECTED: EXCEEDS RISK LIMIT'
      : isStandardTrap
        ? 'EXCEEDS TARGET RISK'
        : 'EXECUTABLE WITHIN RISK CAP',
    verdictDetail: isStandardBelowMin
      ? `REJECTED: Your ${riskPercent}% risk limit is $${targetRiskUsd.toFixed(2)}, whereas 0.01 lot under this 100-oz/100k specification risks $${actualStandardRiskUsd.toFixed(2)} (${actualStandardRiskPercent}% of equity).`
      : `Your capital supports ${executableStandardLots.toFixed(2)} lots at ${actualStandardRiskPercent}% risk under this contract specification.`
  };

  // 2. Example Cent Micro-Contract Specification (USC)
  const targetRiskUsc = Number(((depositUsc * riskPercent) / 100).toFixed(2));
  const riskAtMinCentLotUsc = Number(
    (stopLossPoints * spec.uscValuePerPointAtMinCentLot).toFixed(2)
  );
  const rawCentLots =
    riskAtMinCentLotUsc > 0 ? (targetRiskUsc / riskAtMinCentLotUsc) * 0.01 : 0;
  const roundedCentLots = Math.floor((rawCentLots + 1e-9) * 100) / 100;
  const isCentBelowMin = roundedCentLots < 0.01;
  const executableCentLots = isCentBelowMin ? 0.01 : Number(roundedCentLots.toFixed(2));
  const actualCentRiskUsc = Number(
    ((executableCentLots / 0.01) * riskAtMinCentLotUsc).toFixed(2)
  );
  const actualCentRiskUsd = Number((actualCentRiskUsc / 100).toFixed(4));
  const actualCentRiskPercent = Number(((actualCentRiskUsc / depositUsc) * 100).toFixed(2));
  const minCentLotRiskPercent = Number(((riskAtMinCentLotUsc / depositUsc) * 100).toFixed(2));
  const isCentTrap =
    isCentBelowMin || (actualCentRiskPercent > riskPercent * 1.35 && actualCentRiskPercent > 2.5);

  const centMarginRequiredUsc = Number(
    (((executableCentLots / 0.01) * notionalPerMinStandardLotUsd) / leverage).toFixed(2)
  );

  const centStreaksTo25Pct =
    actualCentRiskPercent > 0
      ? Math.max(0, Math.floor(25 / actualCentRiskPercent))
      : 0;

  const centAnalysis: AccountExecutionAnalysis = {
    accountMode: 'CENT_USC',
    balanceDisplay: `${depositUsc} USC ($${depositUsd.toFixed(2)})`,
    balanceNumeric: depositUsc,
    unitLabel: 'USC',
    targetRiskAmount: targetRiskUsc,
    targetRiskUsdEquivalent: Number((targetRiskUsc / 100).toFixed(2)),
    rawIdealLotSize: Number(rawCentLots.toFixed(4)),
    executableLotSize: executableCentLots,
    approvedLotSizeOrNull: isCentBelowMin ? null : executableCentLots,
    actualRiskAmount: actualCentRiskUsc,
    actualRiskUsdEquivalent: actualCentRiskUsd,
    actualRiskPercentOfAccount: actualCentRiskPercent,
    minPossibleLotRiskPercent: minCentLotRiskPercent,
    isOverRiskTrap: isCentTrap,
    isBelowBrokerMinLot: isCentBelowMin,
    marginRequiredInUnit: centMarginRequiredUsc,
    survivableConsecutiveLossesTo25PercentDrawdown: centStreaksTo25Pct,
    verdictTitle: isCentBelowMin
      ? 'REJECTED: STOP TOO WIDE FOR EQUITY'
      : 'APPROVED WITHIN RISK CAP',
    verdictDetail: isCentBelowMin
      ? `REJECTED: Even under this micro-contract specification, 0.01 lot risks ${actualCentRiskUsc} USC (${actualCentRiskPercent}%), exceeding your ${riskPercent}% cap.`
      : `Executes at ${executableCentLots.toFixed(2)} lots, risking ${actualCentRiskUsc.toFixed(2)} USC ($${actualCentRiskUsd.toFixed(2)} USD), ${actualCentRiskPercent}% of equity.`
  };

  const stopLossDollarMoveOnGoldOrPips =
    spec.symbol === 'XAUUSD'
      ? `$${(stopLossPoints / 100).toFixed(2)} Gold price move (${stopLossPoints} ticks)`
      : `${(stopLossPoints / 10).toFixed(1)} Pips (${stopLossPoints} ticks)`;

  const jeyStreetRule = isStandardBelowMin
    ? `Always check your broker's contract specification (Contract Size, Tick Value, and Minimum Lot) in MT5. On a $${depositUsd} balance, a 100-oz XAUUSD contract at 0.01 minimum lot exceeds a ${riskPercent}% risk limit, whereas a micro/cent contract specification allows ${executableCentLots.toFixed(2)} lots at ${actualCentRiskPercent}% risk.`
    : `With $${depositUsd} equity, verify both your account denomination (USD vs USC) and the broker's contract size per lot before executing.`;

  return {
    depositUsd,
    depositUsc,
    instrumentSpec: spec,
    stopLossPoints,
    stopLossDollarMoveOnGoldOrPips,
    riskPercent,
    leverage,
    standardAnalysis,
    centAnalysis,
    jeyStreetRule
  };
}
