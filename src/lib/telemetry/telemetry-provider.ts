export type TelemetryConnectionState = 'DISCONNECTED' | 'SANDBOX_SIMULATION' | 'VERIFIED_LIVE';

export interface TelemetryMetricDefinition {
  id: string;
  label: string;
  formula: string;
  plainEnglish: string;
  healthyBenchmark: string;
  redFlagWarning: string;
  sandboxSampleValue: string;
}

export interface TelemetrySystemState {
  connectionStatus: TelemetryConnectionState;
  isLiveVerified: boolean;
  statusHeadline: string;
  statusDescription: string;
  adapterProtocol: string;
  lastHeartbeatIso: string | null;
  verificationSteps: {
    stepNumber: number;
    title: string;
    detail: string;
    status: 'READY_IN_ARCHITECTURE' | 'AWAITING_BROKER_FEED';
  }[];
  metricDefinitions: TelemetryMetricDefinition[];
  sandboxEquityPoints: {
    sessionLabel: string;
    balanceUsc: number;
    equityUsc: number;
    drawdownPct: number;
  }[];
}

export function getDefaultTelemetrySystemState(): TelemetrySystemState {
  return {
    connectionStatus: 'DISCONNECTED',
    isLiveVerified: false,
    statusHeadline: 'LIVE BROKER TELEMETRY: DISCONNECTED',
    statusDescription:
      'JGS enforces a zero-fabrication policy. No live MT5 investor account or third-party verification bridge (Myfxbook / FXBlue / Read-Only Investor API) is currently linked to this public deployment. Live performance numbers are never synthesized or mocked.',
    adapterProtocol: 'MT5 Read-Only Investor Bridge v1 (Signed Snapshot Schema)',
    lastHeartbeatIso: null,
    verificationSteps: [
      {
        stepNumber: 1,
        title: 'Read-Only MT5 Investor Password Provisioning',
        detail:
          'Master trading credentials remain air-gapped on the execution VPS. Only a read-only Investor credential is used by the telemetry worker.',
        status: 'READY_IN_ARCHITECTURE'
      },
      {
        stepNumber: 2,
        title: 'Equity vs. Balance Divergence Auditing',
        detail:
          'Every snapshot records both closed Balance and floating Equity simultaneously so open drawdown cannot be hidden behind closed-trade screenshots.',
        status: 'READY_IN_ARCHITECTURE'
      },
      {
        stepNumber: 3,
        title: 'Cryptographic Snapshot Signing & Public Heartbeat',
        detail:
          'Snapshots are signed with HMAC-SHA256 and verified before rendering on the public Performance Center.',
        status: 'AWAITING_BROKER_FEED'
      }
    ],
    metricDefinitions: [
      {
        id: 'max-drawdown',
        label: 'Max Floating Drawdown (%)',
        formula: '(Peak Equity - Trough Equity) / Peak Equity × 100',
        plainEnglish:
          'The deepest drop from an account peak to its lowest floating point, including open losing trades, not just closed trades.',
        healthyBenchmark: '< 15% on micro-capital Cent strategies',
        redFlagWarning:
          'If a trader shows a straight line up in Balance while Equity dips 60% below it, they are holding losing trades without a stop loss (Martingale/Grid trap).',
        sandboxSampleValue: '8.4% (Educational Example)'
      },
      {
        id: 'profit-factor',
        label: 'Profit Factor',
        formula: 'Gross Winning Trades ($) ÷ Gross Losing Trades ($)',
        plainEnglish:
          'How many dollars/cents a strategy makes for every 1 unit it loses. A Profit Factor of 1.80 means $1.80 earned per $1.00 lost.',
        healthyBenchmark: '1.45 – 2.40 over 100+ verified trades',
        redFlagWarning:
          'Claims of Profit Factor > 10.0 over a few days almost always indicate someone refusing to close losing positions.',
        sandboxSampleValue: '1.78 (Educational Example)'
      },
      {
        id: 'expectancy-r',
        label: 'Mathematical Expectancy (R)',
        formula: '(Win Rate × Avg Win R) - (Loss Rate × Avg Loss R)',
        plainEnglish:
          'The average R-multiple gained per trade over a large sample size. Even a 42% win rate is highly profitable with a 1:2.5 Risk-to-Reward ratio.',
        healthyBenchmark: '+0.25R to +0.65R per trade',
        redFlagWarning:
          'A "95% win rate" paired with an average loss of -12R has a negative expectancy and eventually blows the account on a single streak.',
        sandboxSampleValue: '+0.38R (Educational Example)'
      },
      {
        id: 'recovery-factor',
        label: 'Recovery Factor',
        formula: 'Net Profit (%) ÷ Max Drawdown (%)',
        plainEnglish:
          'Measures whether the return earned actually justified the drawdown risk taken to achieve it.',
        healthyBenchmark: '> 2.0 over a multi-month cycle',
        redFlagWarning:
          'Making +20% profit while suffering a -45% floating drawdown (Recovery Factor 0.44) means risk was poorly controlled.',
        sandboxSampleValue: '2.65 (Educational Example)'
      }
    ],
    sandboxEquityPoints: [
      { sessionLabel: 'Wk 1', balanceUsc: 5000, equityUsc: 5000, drawdownPct: 0.0 },
      { sessionLabel: 'Wk 2', balanceUsc: 5150, equityUsc: 5110, drawdownPct: 0.8 },
      { sessionLabel: 'Wk 3', balanceUsc: 5080, equityUsc: 4960, drawdownPct: 3.7 },
      { sessionLabel: 'Wk 4', balanceUsc: 5340, equityUsc: 5310, drawdownPct: 0.6 },
      { sessionLabel: 'Wk 5', balanceUsc: 5210, equityUsc: 4890, drawdownPct: 8.4 },
      { sessionLabel: 'Wk 6', balanceUsc: 5520, equityUsc: 5490, drawdownPct: 0.5 },
      { sessionLabel: 'Wk 7', balanceUsc: 5790, equityUsc: 5740, drawdownPct: 0.9 },
      { sessionLabel: 'Wk 8', balanceUsc: 6120, equityUsc: 6120, drawdownPct: 0.0 }
    ]
  };
}
