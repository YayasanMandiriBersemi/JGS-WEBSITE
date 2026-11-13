export interface QuantPipelineStage {
  step: string;
  title: string;
  latencyTarget: string;
  description: string;
  safeguardImplemented: string;
}

export interface QuantParameterSpec {
  parameterName: string;
  dataType: 'double' | 'int' | 'bool' | 'string';
  defaultCentValue: string;
  safeMicroRange: string;
  plainEnglishPurpose: string;
  misconfigurationWarning: string;
}

export interface Mt5SetupStep {
  id: string;
  stepNumber: number;
  title: string;
  locationInMt5: string;
  instructions: string;
  verificationCheck: string;
}

export const QUANT_PIPELINE_STAGES: QuantPipelineStage[] = [
  {
    step: 'STAGE 01',
    title: 'Tick Ingestion & Spread Gatekeeper',
    latencyTarget: '< 0.5 ms',
    description:
      'On every incoming SymbolInfoTick() event, the engine compares live (Ask - Bid) against MaxSpreadPoints and validates broker trade server connection status.',
    safeguardImplemented: 'Blocks all entries during rollover spread widening or news liquidity vacuums.'
  },
  {
    step: 'STAGE 02',
    title: 'Daily High-Water Equity Circuit Breaker',
    latencyTarget: '< 0.5 ms',
    description:
      'Evaluates AccountInfoDouble(ACCOUNT_EQUITY) plus closed daily PnL against the 00:00 UTC equity anchor.',
    safeguardImplemented:
      'If intraday drawdown reaches DailyLossLimitPercent (e.g. -3.0%), the EA enters Hard Lock State until the next server day.'
  },
  {
    step: 'STAGE 03',
    title: 'Session & Structural Signal Engine',
    latencyTarget: '1.2 ms',
    description:
      'Verifies active UTC killzone window (London / NY Overlap) and evaluates bar-close displacement and ATR volatility bounds.',
    safeguardImplemented: 'Evaluates only on confirmed candle close (Bar[1]) to eliminate mid-candle repainting.'
  },
  {
    step: 'STAGE 04',
    title: 'Dynamic Cent Lot Sizer',
    latencyTarget: '0.4 ms',
    description:
      'Computes exact volume from SymbolInfoDouble(SYMBOL_TRADE_TICK_VALUE), structural Stop Loss distance in points, and RiskPercent.',
    safeguardImplemented:
      'Clamps output between SYMBOL_VOLUME_MIN and MaxLotCeiling; strictly forbids Martingale lot multiplication.'
  },
  {
    step: 'STAGE 05',
    title: 'Server-Side Order Execution & Audit Tagging',
    latencyTarget: '8 – 35 ms (VPS to Broker)',
    description:
      'Dispatches CTrade order with attached server-side Stop Loss, Take Profit, Deviation tolerance, and isolated MagicNumber.',
    safeguardImplemented:
      'If a position is detected without a server-side Stop Loss due to network interruption, emergency modification or liquidation runs immediately.'
  }
];

export const QUANT_PARAMETER_SPECS: QuantParameterSpec[] = [
  {
    parameterName: 'InpRiskPercentPerTrade',
    dataType: 'double',
    defaultCentValue: '1.0',
    safeMicroRange: '0.25 – 1.50',
    plainEnglishPurpose: 'Percentage of current account Equity risked at the full Stop Loss distance.',
    misconfigurationWarning: 'Setting above 3.0% exposes the account to rapid drawdown during normal losing streaks.'
  },
  {
    parameterName: 'InpDailyMaxDrawdownPct',
    dataType: 'double',
    defaultCentValue: '3.0',
    safeMicroRange: '2.0 – 4.0',
    plainEnglishPurpose: 'Hard daily circuit breaker. Halts new trades and closes open exposure if daily equity drops by this percentage.',
    misconfigurationWarning: 'Never set to 0 or 100; the daily circuit breaker is your primary protection against abnormal market black swans.'
  },
  {
    parameterName: 'InpMaxSpreadPoints',
    dataType: 'int',
    defaultCentValue: '28 (XAUUSD) / 16 (EURUSD)',
    safeMicroRange: '15 – 35',
    plainEnglishPurpose: 'Maximum allowed Bid-Ask spread in MT5 points before the EA is permitted to open a position.',
    misconfigurationWarning: 'Setting too high (> 60 points) allows entries during illiquid rollover hours.'
  },
  {
    parameterName: 'InpAllowMartingaleOrGrid',
    dataType: 'bool',
    defaultCentValue: 'false (Hardcoded Locked)',
    safeMicroRange: 'false ONLY',
    plainEnglishPurpose: 'JGS Quant architecture permanently disables averaging-down and lot-doubling grids.',
    misconfigurationWarning: 'Any third-party EA with Martingale enabled will eventually suffer a 100% Margin Call.'
  },
  {
    parameterName: 'InpSessionStartUTC / InpSessionEndUTC',
    dataType: 'string',
    defaultCentValue: '"07:00" to "16:30"',
    safeMicroRange: 'London & NY Active Hours',
    plainEnglishPurpose: 'Restricts new trade entries to liquid institutional sessions in UTC time.',
    misconfigurationWarning: 'Ensure you match the offset between your broker Market Watch time (often GMT+2/+3) and UTC.'
  },
  {
    parameterName: 'InpMagicNumber',
    dataType: 'int',
    defaultCentValue: '770101',
    safeMicroRange: 'Any unique 6-digit integer',
    plainEnglishPurpose: 'Isolates EA orders from manual trades or other chart instances.',
    misconfigurationWarning: 'If running on two charts simultaneously, assign a distinct Magic Number to each chart.'
  }
];

export const MT5_SETUP_STEPS: Mt5SetupStep[] = [
  {
    id: 'mt5-step-1',
    stepNumber: 1,
    title: 'Verify Cent Account Server & USC Denomination',
    locationInMt5: 'MT5 -> Navigator -> Accounts & Trade Tab',
    instructions:
      'Log into your broker Cent server in MetaTrader 5. Confirm that the Trade tab displays your balance in USC (e.g., $25 deposit displays as 2,500.00 USC) and that you have selected the Cent symbol suffix (e.g., XAUUSDc or XAUUSD.m) in Market Watch.',
    verificationCheck: 'Balance shows in USC and chart symbol matches the Cent contract specification.'
  },
  {
    id: 'mt5-step-2',
    stepNumber: 2,
    title: 'Place Compiled EA (.ex5) in MQL5 Experts Directory',
    locationInMt5: 'File -> Open Data Folder -> MQL5 -> Experts',
    instructions:
      'Open the MT5 Data Folder, copy the verified .ex5 file into MQL5/Experts, return to the MT5 Navigator panel, right-click "Expert Advisors," and click "Refresh."',
    verificationCheck: 'EA appears under Navigator -> Expert Advisors with a clean icon.'
  },
  {
    id: 'mt5-step-3',
    stepNumber: 3,
    title: 'Configure Terminal Algorithmic Permissions',
    locationInMt5: 'Tools -> Options -> Expert Advisors',
    instructions:
      'Check "Allow algorithmic trading" and ensure "Disable algorithmic trading when the account has been changed" is checked as a safety precaution so an EA never accidentally fires on a Standard account if you switch logins.',
    verificationCheck: 'Top toolbar "Algo Trading" button shows a green play icon.'
  },
  {
    id: 'mt5-step-4',
    stepNumber: 4,
    title: 'Attach to Correct Timeframe & Load Verified .set Preset',
    locationInMt5: 'Chart Window (M15) -> EA Properties -> Inputs Tab',
    instructions:
      'Open a clean M15 chart of the target instrument, drag the EA onto the chart, open the Inputs tab, click "Load," and select the JGS Micro-Cent .set file. Verify InpRiskPercentPerTrade is <= 1.0% and InpDailyMaxDrawdownPct is <= 3.0%.',
    verificationCheck: 'Top-right corner of the chart displays the blue graduation cap icon as active.'
  },
  {
    id: 'mt5-step-5',
    stepNumber: 5,
    title: 'Verify VPS Uptime & Broker Server Latency',
    locationInMt5: 'Bottom-Right Connection Status Bar',
    instructions:
      'If running unattended, host MT5 on a dedicated VPS with < 15 ms ping to your broker server. Never rely on a home laptop that sleeps when the lid closes.',
    verificationCheck: 'Bottom-right status bar shows green connection bars and ping < 20 ms.'
  }
];
