export interface ScenarioCandle {
  index: number;
  timeLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  annotation?: string;
}

export interface ScenarioDecisionOption {
  id: string;
  label: string;
  actionType: 'LONG' | 'SHORT' | 'STAND_ASIDE';
  subtitle: string;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  stopLossPoints: number;
  rewardToRisk: number;
  isOptimalChoice: boolean;
  standard25UsdOutcome: {
    lotSize: string;
    riskPercentForced: number;
    resultUsd: string;
    accountImpactSummary: string;
  };
  cent2500UscOutcome: {
    lotSize: string;
    riskPercentExact: number;
    resultUsc: string;
    resultR: string;
    accountImpactSummary: string;
  };
  jeyDebrief: string;
}

export interface PlaygroundScenario {
  id: string;
  code: string;
  title: string;
  instrument: 'XAUUSD' | 'EURUSD' | 'GBPUSD';
  timeframe: 'M15' | 'M5';
  sessionContext: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'STRATEGIST';
  briefing: string;
  keyLevelPrice: number;
  keyLevelLabel: string;
  decisionBarIndex: number; // Candles up to decisionBarIndex are shown initially; remaining candles play out on execution
  candles: ScenarioCandle[];
  options: ScenarioDecisionOption[];
}

export const PLAYGROUND_SCENARIOS: PlaygroundScenario[] = [
  {
    id: 'london-gold-sweep',
    code: 'SCENARIO 01',
    title: 'XAUUSD London Open Liquidity Sweep & Reclaim',
    instrument: 'XAUUSD',
    timeframe: 'M15',
    sessionContext: 'London Open (07:30 UTC) • Asian High Liquidity Pool at $2,650.00',
    difficulty: 'BEGINNER',
    briefing:
      'During the Asian session, Gold consolidated tightly below $2,650.00. As London opens, a sudden spike pierces $2,651.80 (180 points above Asian High) and immediately closes back inside the range at $2,649.20 with a long upper rejection wick. Retail breakout buyers are now trapped at the top. What is your play on a $25 (2,500 USC) account?',
    keyLevelPrice: 2650.0,
    keyLevelLabel: 'Asian Session High ($2,650.00 Liquidity Pool)',
    decisionBarIndex: 5,
    candles: [
      { index: 0, timeLabel: '06:15', open: 2646.5, high: 2648.2, low: 2646.0, close: 2647.8, annotation: 'Asian Range consolidation' },
      { index: 1, timeLabel: '06:30', open: 2647.8, high: 2649.8, low: 2647.2, close: 2649.4, annotation: 'Testing $2,650 Asian High' },
      { index: 2, timeLabel: '06:45', open: 2649.4, high: 2649.9, low: 2647.5, close: 2648.1, annotation: 'Equal highs formed below $2,650' },
      { index: 3, timeLabel: '07:00', open: 2648.1, high: 2649.7, low: 2647.9, close: 2649.5, annotation: 'London Open compression' },
      { index: 4, timeLabel: '07:15', open: 2649.5, high: 2651.8, low: 2649.1, close: 2650.4, annotation: 'Spike above $2,650 triggers retail Buy Stops' },
      { index: 5, timeLabel: '07:30', open: 2650.4, high: 2651.6, low: 2648.6, close: 2648.9, annotation: 'DECISION BAR: Rejection close back below $2,650.00!' },
      { index: 6, timeLabel: '07:45', open: 2648.9, high: 2649.6, low: 2646.4, close: 2646.8, annotation: 'Bearish displacement traps breakout buyers' },
      { index: 7, timeLabel: '08:00', open: 2646.8, high: 2647.3, low: 2644.2, close: 2644.5, annotation: 'Momentum expansion toward Asian Low' },
      { index: 8, timeLabel: '08:15', open: 2644.5, high: 2645.1, low: 2642.4, close: 2642.7, annotation: 'Target reached at $2,642.90 (+2.0R)' }
    ],
    options: [
      {
        id: 'opt-short-reclaim',
        label: 'Execute SHORT on Confirmed Sweep Reclaim (1% Risk)',
        actionType: 'SHORT',
        subtitle: 'Entry: $2,648.90 • Stop Loss: $2,651.90 (300 pts) • Take Profit: $2,642.90 (600 pts / 1:2 R:R)',
        entryPrice: 2648.9,
        stopLoss: 2651.9,
        takeProfit: 2642.9,
        stopLossPoints: 300,
        rewardToRisk: 2.0,
        isOptimalChoice: true,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot (Minimum Forced)',
          riskPercentForced: 12.0,
          resultUsd: '+$6.00 USD (but risked 12% of account!)',
          accountImpactSummary:
            'Even though the trade won, risking $3.00 (12%) on a $25 Standard account violates risk management.'
        },
        cent2500UscOutcome: {
          lotSize: '0.08 Cent Lots (24 USC Risk)',
          riskPercentExact: 0.96,
          resultUsc: '+48.00 USC (+$0.48 USD)',
          resultR: '+2.00R',
          accountImpactSummary:
            'Textbook execution. You waited for the 07:30 candle to close back inside the range, placed your stop above the sweep wick (300 pts), and sized at 0.08 Cent Lots for <1% risk.'
        },
        jeyDebrief:
          'Crown-level patience. You let impatient retail traders buy the $2,651.80 wick, waited for the 15-minute body to close back below $2,650.00, and captured a clean +2.0R move down to the Asian low.'
      },
      {
        id: 'opt-fomo-long',
        label: 'Chase LONG Breakout Hopes at $2,648.90',
        actionType: 'LONG',
        subtitle: 'Entry: $2,648.90 • Stop Loss: $2,645.90 (300 pts) • Take Profit: $2,654.90',
        entryPrice: 2648.9,
        stopLoss: 2645.9,
        takeProfit: 2654.9,
        stopLossPoints: 300,
        rewardToRisk: 2.0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot',
          riskPercentForced: 12.0,
          resultUsd: '-$3.00 USD (-12.0% Account Hit)',
          accountImpactSummary:
            'Stopped out in 15 minutes, losing 12% of your $25 Standard account on a single fakeout.'
        },
        cent2500UscOutcome: {
          lotSize: '0.08 Cent Lots',
          riskPercentExact: 0.96,
          resultUsc: '-24.00 USC (-$0.24 USD)',
          resultR: '-1.00R',
          accountImpactSummary:
            'The direction was wrong because the sweep wick already rejected $2,650, BUT your Cent sizing kept the loss to a harmless -0.96%.'
        },
        jeyDebrief:
          'Notice two lessons here: (1) Price already swept $2,650 and closed back inside, buying after a failed breakout puts you on the wrong side of institutional order flow. (2) Even when wrong, the Cent Account lost only -0.96% instead of -12%.'
      },
      {
        id: 'opt-pass',
        label: 'Stand Aside, Wait for Next Session',
        actionType: 'STAND_ASIDE',
        subtitle: 'No position opened • Capital preserved at 100%',
        stopLossPoints: 0,
        rewardToRisk: 0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.00 Lots',
          riskPercentForced: 0,
          resultUsd: '$0.00 (0%)',
          accountImpactSummary: 'On a $25 Standard Account, passing is actually smart because 0.01 lot would have forced 12% risk.'
        },
        cent2500UscOutcome: {
          lotSize: '0.00 Cent Lots',
          riskPercentExact: 0,
          resultUsc: '0.00 USC (0.00R)',
          resultR: '0.00R',
          accountImpactSummary: 'Capital preserved, though you missed a confirmed A+ liquidity sweep setup.'
        },
        jeyDebrief:
          'Standing aside never loses money. If a setup is unclear to you in real time, passing is always superior to guessing.'
      }
    ]
  },
  {
    id: 'cpi-news-whipsaw',
    code: 'SCENARIO 02',
    title: 'EURUSD High-Impact US CPI Release & Spread Expansion Trap',
    instrument: 'EURUSD',
    timeframe: 'M5',
    sessionContext: '12:30 UTC US CPI Release • Spread Widens from 10 pts to 65 pts',
    difficulty: 'BEGINNER',
    briefing:
      'US Consumer Price Index (CPI) data is releasing in 60 seconds. EURUSD is sitting at 1.0850. Your terminal shows the spread jumping from 1.0 pip (10 points) to 6.5 pips (65 points), and liquidity in the order book is razor-thin. A friend messages you to "put a massive trade right before the candle explodes." What is your decision?',
    keyLevelPrice: 1.085,
    keyLevelLabel: 'Pre-CPI Equilibrium (1.08500)',
    decisionBarIndex: 4,
    candles: [
      { index: 0, timeLabel: '12:10', open: 1.0848, high: 1.0852, low: 1.0846, close: 1.085, annotation: 'Pre-news low volume drift' },
      { index: 1, timeLabel: '12:15', open: 1.085, high: 1.0853, low: 1.0848, close: 1.0849, annotation: 'Banks pulling resting liquidity' },
      { index: 2, timeLabel: '12:20', open: 1.0849, high: 1.0851, low: 1.0847, close: 1.085, annotation: 'Compression before CPI' },
      { index: 3, timeLabel: '12:25', open: 1.085, high: 1.0852, low: 1.0849, close: 1.085, annotation: 'Spread widens to 65 points!' },
      { index: 4, timeLabel: '12:30', open: 1.085, high: 1.0892, low: 1.0812, close: 1.0846, annotation: 'DECISION BAR: 80-pip two-way whipsaw candle!' },
      { index: 5, timeLabel: '12:35', open: 1.0846, high: 1.086, low: 1.0825, close: 1.083, annotation: 'Post-release volatility settling' },
      { index: 6, timeLabel: '12:40', open: 1.083, high: 1.0836, low: 1.081, close: 1.0815, annotation: 'True directional flow emerges 15m after news' },
      { index: 7, timeLabel: '12:45', open: 1.0815, high: 1.082, low: 1.0798, close: 1.0802, annotation: 'Clean post-news continuation' }
    ],
    options: [
      {
        id: 'opt-stand-aside-cpi',
        label: 'Stand Aside During News, Wait 15 Minutes for Spread & Structure to Normalize',
        actionType: 'STAND_ASIDE',
        subtitle: 'Zero exposure during the 12:30 UTC release spike • Avoid 65-point spread & slippage',
        stopLossPoints: 0,
        rewardToRisk: 0,
        isOptimalChoice: true,
        standard25UsdOutcome: {
          lotSize: '0.00 Lots',
          riskPercentForced: 0,
          resultUsd: '$0.00 Saved from Whipsaw',
          accountImpactSummary: 'Avoided an instant two-way stop-out caused by the 80-pip whipsaw candle.'
        },
        cent2500UscOutcome: {
          lotSize: '0.00 Cent Lots',
          riskPercentExact: 0,
          resultUsc: '0.00 USC (100% Capital Intact)',
          resultR: '0.00R (Saved -1.8R Slippage Loss)',
          accountImpactSummary:
            'Notice candle #4 (12:30): price spiked up 42 pips to 1.0892 AND crashed down 38 pips to 1.0812 in the same 5 minutes! Both Buyers and Sellers got wiped out.'
        },
        jeyDebrief:
          'Elite risk discipline. Look at the 12:30 candle: it wicked 420 points UP and 380 points DOWN inside the same 5-minute bar while spreads widened 6x. Sitting on your hands during initial news seconds is a superpower.'
      },
      {
        id: 'opt-gamble-long-cpi',
        label: 'Market BUY at 12:30 Release Hoping for an Upward Rocket',
        actionType: 'LONG',
        subtitle: 'Entry filled with slippage at 1.0858 • Stop Loss: 1.0838 (200 pts)',
        entryPrice: 1.0858,
        stopLoss: 1.0838,
        takeProfit: 1.0898,
        stopLossPoints: 200,
        rewardToRisk: 2.0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot',
          riskPercentForced: 11.2,
          resultUsd: '-$2.80 USD (Slipped 80 pts past SL!)',
          accountImpactSummary: 'Spread + slippage caused a -11.2% account loss in 12 seconds.'
        },
        cent2500UscOutcome: {
          lotSize: '0.12 Cent Lots',
          riskPercentExact: 1.4,
          resultUsc: '-34.00 USC (-1.36R with slippage)',
          resultR: '-1.36R',
          accountImpactSummary:
            'Even with a Stop Loss, fast news slippage filled your exit 70 points worse than planned, costing -1.36R instead of -1.0R.'
        },
        jeyDebrief:
          'Gambling on the first second of a CPI release turns trading into a coin toss with negative odds because widened spreads and slippage work against you on both entry and exit.'
      },
      {
        id: 'opt-gamble-short-cpi',
        label: 'Market SELL at 12:30 Release Hoping for a Crash',
        actionType: 'SHORT',
        subtitle: 'Entry at 1.0845 • Stop Loss: 1.0865 (200 pts)',
        entryPrice: 1.0845,
        stopLoss: 1.0865,
        takeProfit: 1.0805,
        stopLossPoints: 200,
        rewardToRisk: 2.0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot',
          riskPercentForced: 11.0,
          resultUsd: '-$2.75 USD (Stopped out on upper wick before drop!)',
          accountImpactSummary:
            'Even though EURUSD eventually dropped, the initial upper wick to 1.0892 stopped you out first!'
        },
        cent2500UscOutcome: {
          lotSize: '0.12 Cent Lots',
          riskPercentExact: 1.35,
          resultUsc: '-33.00 USC (-1.32R)',
          resultR: '-1.32R',
          accountImpactSummary:
            'The hardest lesson in news gambling: being right about the eventual direction (down) and STILL losing money because the initial spike hunted your stop first.'
        },
        jeyDebrief:
          'You actually guessed the eventual direction right (EURUSD went down to 1.0802), yet you still lost! Why? Because the first 10 seconds spiked up to 1.0892 and triggered your Stop Loss before dropping. Wait 15 minutes after high-impact news.'
      }
    ]
  },
  {
    id: 'twenty-dollar-survival-test',
    code: 'SCENARIO 03',
    title: 'The $20 Account Survival Test: Normal Pullback vs. Over-Risk Ruin',
    instrument: 'XAUUSD',
    timeframe: 'M15',
    sessionContext: 'New York Session Bullish Pullback • $20 Capital (2,000 USC)',
    difficulty: 'INTERMEDIATE',
    briefing:
      'You have $20 of trading capital. Gold is in a clear New York uptrend and pulls back to a structural demand zone at $2,635.00. To place your Stop Loss safely below the swing low at $2,632.00, you need a 300-point ($3.00) stop distance. Price will dip 220 points into the zone before rallying +750 points to $2,642.50. How do you size this trade?',
    keyLevelPrice: 2635.0,
    keyLevelLabel: 'Bullish Demand Zone ($2,635.00 / Invalidation $2,632.00)',
    decisionBarIndex: 3,
    candles: [
      { index: 0, timeLabel: '13:00', open: 2630.0, high: 2634.5, low: 2629.8, close: 2634.2, annotation: 'Impulse rally from $2,630' },
      { index: 1, timeLabel: '13:15', open: 2634.2, high: 2639.0, low: 2634.0, close: 2638.6, annotation: 'Break of Structure above $2,636' },
      { index: 2, timeLabel: '13:30', open: 2638.6, high: 2638.9, low: 2636.2, close: 2636.5, annotation: 'Controlled pullback begins' },
      { index: 3, timeLabel: '13:45', open: 2636.5, high: 2636.8, low: 2634.8, close: 2635.0, annotation: 'DECISION BAR: Price taps $2,635.00 demand zone' },
      { index: 4, timeLabel: '14:00', open: 2635.0, high: 2635.4, low: 2632.8, close: 2634.9, annotation: 'Deep test to $2,632.80 (holds above $2,632.00 SL!)' },
      { index: 5, timeLabel: '14:15', open: 2634.9, high: 2638.2, low: 2634.7, close: 2637.9, annotation: 'Bullish engulfing confirmation out of zone' },
      { index: 6, timeLabel: '14:30', open: 2637.9, high: 2640.8, low: 2637.5, close: 2640.5, annotation: 'Trend continuation break' },
      { index: 7, timeLabel: '14:45', open: 2640.5, high: 2643.0, low: 2640.1, close: 2642.6, annotation: '750-point target hit at $2,642.50 (+2.5R)' }
    ],
    options: [
      {
        id: 'opt-structural-300pt-stop',
        label: 'Place Full 300-Point Structural Stop at $2,632.00 with Cent Lot Sizing',
        actionType: 'LONG',
        subtitle: 'Entry: $2,635.00 • Stop Loss: $2,632.00 (300 pts) • Take Profit: $2,642.50 (750 pts / 1:2.5 R:R)',
        entryPrice: 2635.0,
        stopLoss: 2632.0,
        takeProfit: 2642.5,
        stopLossPoints: 300,
        rewardToRisk: 2.5,
        isOptimalChoice: true,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot',
          riskPercentForced: 15.0,
          resultUsd: '+$7.50 (after surviving -11% floating panic)',
          accountImpactSummary:
            'On a $20 Standard account, 0.01 lot forced a 15% risk ($3.00). During the dip to $2,632.80, you were down -11% of your entire account!'
        },
        cent2500UscOutcome: {
          lotSize: '0.07 Cent Lots (21 USC Risk)',
          riskPercentExact: 1.05,
          resultUsc: '+52.50 USC (+2.50R)',
          resultR: '+2.50R',
          accountImpactSummary:
            'Because your 300-point stop sat safely at $2,632.00 and only risked 21 USC (1.05%), the dip to $2,632.80 caused zero emotional panic and delivered +2.50R.'
        },
        jeyDebrief:
          'Look at candle #4 (14:00): price dipped to $2,632.80 (220 points below entry) before rallying 750 points. Your structural 300-point stop kept you in the trade, and Cent sizing kept your stress near zero.'
      },
      {
        id: 'opt-tight-100pt-stop',
        label: 'Squeeze Stop Loss Tight to 100 Points ($2,634.00) to Trade a Bigger Lot',
        actionType: 'LONG',
        subtitle: 'Entry: $2,635.00 • Stop Loss: $2,634.00 (100 pts) • Take Profit: $2,642.50',
        entryPrice: 2635.0,
        stopLoss: 2634.0,
        takeProfit: 2642.5,
        stopLossPoints: 100,
        rewardToRisk: 7.5,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.02 Standard Lots',
          riskPercentForced: 10.0,
          resultUsd: '-$2.00 USD (Wicked out before rally!)',
          accountImpactSummary: 'Stopped out at $2,634.00 right before price rallied to your exact $2,642.50 target.'
        },
        cent2500UscOutcome: {
          lotSize: '0.20 Cent Lots',
          riskPercentExact: 1.0,
          resultUsc: '-20.00 USC (-1.00R)',
          resultR: '-1.00R',
          accountImpactSummary:
            'Placing your stop inside the demand zone at $2,634.00 just to inflate your lot size to 0.20 caused you to get wicked out at 14:00 before the +750pt rally.'
        },
        jeyDebrief:
          'The classic "fake high R:R" mistake! Squeezing a Gold stop to 100 points in the middle of a demand zone gets hunted almost every time. Respect market structure first, then calculate the lot size.'
      }
    ]
  },
  {
    id: 'revenge-spiral-breaker',
    code: 'SCENARIO 04',
    title: 'GBPUSD Late-Session Revenge Trade vs. Daily Circuit Breaker',
    instrument: 'GBPUSD',
    timeframe: 'M15',
    sessionContext: '16:45 UTC London Close Chop • Currently at -2.0R on the Day',
    difficulty: 'STRATEGIST',
    briefing:
      'You already took two disciplined -1.0R losses earlier today (-2.0% total on your 5,000 USC account). It is now 16:45 UTC (London is closing, volume is dying, and price is chopping sideways inside a messy 120-point range). You feel the urge to risk 4% on one big trade to "finish the day green." What do you do?',
    keyLevelPrice: 1.295,
    keyLevelLabel: 'Mid-Range Chop Zone (1.29500, No Clear Structure)',
    decisionBarIndex: 4,
    candles: [
      { index: 0, timeLabel: '15:45', open: 1.2945, high: 1.2958, low: 1.2942, close: 1.2955, annotation: 'Overlapping choppy candle' },
      { index: 1, timeLabel: '16:00', open: 1.2955, high: 1.2959, low: 1.2941, close: 1.2944, annotation: 'Immediate reversal inside range' },
      { index: 2, timeLabel: '16:15', open: 1.2944, high: 1.2956, low: 1.2942, close: 1.2953, annotation: 'Wicks on both sides' },
      { index: 3, timeLabel: '16:30', open: 1.2953, high: 1.2957, low: 1.2943, close: 1.2948, annotation: 'Volume drying up at London close' },
      { index: 4, timeLabel: '16:45', open: 1.2948, high: 1.2955, low: 1.2945, close: 1.2951, annotation: 'DECISION BAR: Dead mid-range chop at -2R daily PnL' },
      { index: 5, timeLabel: '17:00', open: 1.2951, high: 1.2964, low: 1.2936, close: 1.294, annotation: 'Stop-hunt wick both ways!' },
      { index: 6, timeLabel: '17:15', open: 1.294, high: 1.2952, low: 1.2935, close: 1.2949, annotation: 'Continued directionless chop' }
    ],
    options: [
      {
        id: 'opt-circuit-breaker-lock',
        label: 'Activate 2-Loss Daily Circuit Breaker, Close Terminal & Log Journal',
        actionType: 'STAND_ASIDE',
        subtitle: 'Lock in the planned -2.0% day • Protect 98.0% of account equity for tomorrow’s London Open',
        stopLossPoints: 0,
        rewardToRisk: 0,
        isOptimalChoice: true,
        standard25UsdOutcome: {
          lotSize: '0.00 Lots',
          riskPercentForced: 0,
          resultUsd: '$0.00 Additional Loss',
          accountImpactSummary: 'Stopped a tilt spiral before it could destroy the account.'
        },
        cent2500UscOutcome: {
          lotSize: '0.00 Cent Lots',
          riskPercentExact: 0,
          resultUsc: '0.00 USC (98% Equity Preserved)',
          resultR: '0.00R (+100% Discipline Score)',
          accountImpactSummary:
            'Look at candle #5 (17:00): price wicked both 1.2964 and 1.2936 to hunt anyone trading late-day chop. Walking away saved your week.'
        },
        jeyDebrief:
          'This is what separates a JGS Strategist from a retail gambler. Closing the terminal down -2R on a choppy day keeps your weekly expectancy intact, one +2.5R winner tomorrow erases today completely.'
      },
      {
        id: 'opt-revenge-double-down',
        label: 'Force a 4% Risk Revenge BUY in the Middle of Chop to "Get Back to Green"',
        actionType: 'LONG',
        subtitle: 'Oversized 4x lot • Entry: 1.2951 • Stop Loss: 1.2938 (130 pts)',
        entryPrice: 1.2951,
        stopLoss: 1.2938,
        takeProfit: 1.2977,
        stopLossPoints: 130,
        rewardToRisk: 2.0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.04 Standard Lots',
          riskPercentForced: 20.8,
          resultUsd: '-$5.20 USD (-20.8% on top of earlier losses!)',
          accountImpactSummary: 'Account now in deep drawdown from a single emotional click.'
        },
        cent2500UscOutcome: {
          lotSize: '0.76 Cent Lots (4% Risk)',
          riskPercentExact: 4.0,
          resultUsc: '-200.00 USC (-4.0R Loss)',
          resultR: '-4.00R',
          accountImpactSummary:
            'You turned a normal -2R business day into a -6R hole by trading low-liquidity London close chop with 4x your normal risk.'
        },
        jeyDebrief:
          'Never increase your lot size when you are already losing on the day, and never force trades after London closes. Protect your capital when the market offers low quality.'
      }
    ]
  },
  {
    id: 'ict-ny-silver-bullet-fvg',
    code: 'SCENARIO 05',
    title: 'XAUUSD ICT NY Silver Bullet: SSL Sweep + MSS + FVG Entry (1,000 USC)',
    instrument: 'XAUUSD',
    timeframe: 'M5',
    sessionContext: 'NY Silver Bullet Window (10:00–11:00 EST / 21:00–22:00 WIB) • 1,000 USC ($10) Account',
    difficulty: 'STRATEGIST',
    briefing:
      'At 21:05 WIB (10:05 EST), Gold sweeps Sell-Side Liquidity (SSL) below $2,640.00, then prints an energetic Displacement candle upward breaking the M5 swing high (MSS at $2,642.50) and leaving a crisp Fair Value Gap (FVG) between $2,641.00 and $2,642.20. Price has just pulled back into $2,641.80 inside the Discount zone. Execute using your 1,000 USC ($10) rules!',
    keyLevelPrice: 2641.8,
    keyLevelLabel: 'Discount FVG Zone ($2,641.00–$2,642.20 after SSL Sweep)',
    decisionBarIndex: 5,
    candles: [
      { index: 0, timeLabel: '20:50', open: 2642.4, high: 2643.1, low: 2640.2, close: 2640.5, annotation: 'Equal Lows resting at $2,640.00 (SSL Pool)' },
      { index: 1, timeLabel: '20:55', open: 2640.5, high: 2641.6, low: 2639.9, close: 2641.2, annotation: 'Consolidation ahead of Silver Bullet open' },
      { index: 2, timeLabel: '21:00', open: 2641.2, high: 2641.4, low: 2638.6, close: 2639.4, annotation: 'Judas Swing sweeps SSL below $2,640!' },
      { index: 3, timeLabel: '21:05', open: 2639.4, high: 2644.1, low: 2639.3, close: 2643.8, annotation: 'Displacement + MSS breaks $2,642.50 high, leaves FVG!' },
      { index: 4, timeLabel: '21:10', open: 2643.8, high: 2644.6, low: 2642.6, close: 2642.9, annotation: 'Shallow pullback begins from Premium' },
      { index: 5, timeLabel: '21:15', open: 2642.9, high: 2643.0, low: 2641.4, close: 2641.8, annotation: 'DECISION BAR: Clean retest inside Discount FVG ($2,641.80)!' },
      { index: 6, timeLabel: '21:20', open: 2641.8, high: 2645.2, low: 2641.5, close: 2644.9, annotation: 'Institutional FVG defense pushes higher' },
      { index: 7, timeLabel: '21:25', open: 2644.9, high: 2648.4, low: 2644.5, close: 2648.0, annotation: 'BSL Target hit at $2,647.80 (+2.4R)!' }
    ],
    options: [
      {
        id: 'opt-silver-bullet-fvg-buy',
        label: 'Execute BUY Inside FVG Discount (0.04 Cent Lots • 1% / 10 USC Risk)',
        actionType: 'LONG',
        subtitle: 'Entry: $2,641.80 • SL: $2,639.30 (250 pts / 10 USC) • TP: $2,647.80 (600 pts / +24 USC)',
        entryPrice: 2641.8,
        stopLoss: 2639.3,
        takeProfit: 2647.8,
        stopLossPoints: 250,
        rewardToRisk: 2.4,
        isOptimalChoice: true,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot (Minimum Forced)',
          riskPercentForced: 25.0,
          resultUsd: '+$6.00 USD (but risked $2.50 = 25% of a $10 account!)',
          accountImpactSummary:
            'Even though the ICT setup won, risking 25% per setup on Standard lots destroys $10 capital the first time a Silver Bullet fails.'
        },
        cent2500UscOutcome: {
          lotSize: '0.04 Cent Lots (10.0 USC Risk = 1.0%)',
          riskPercentExact: 1.0,
          resultUsc: '+24.00 USC Net Profit (+2.4% on 1,000 USC)',
          resultR: '+2.40R (Silver Bullet S-Rank)',
          accountImpactSummary:
            'Every rule aligned: Killzone Time (21:15 WIB), SSL Sweep, Displacement MSS, and Discount FVG sized safely on 0.04 Cent lots.'
        },
        jeyDebrief:
          'Text-book Michael J. Huddleston Silver Bullet execution! Time Before Price + Liquidity Sweep + MSS + FVG in Discount, protected by 1% (10 USC) Cent sizing.'
      },
      {
        id: 'opt-counter-sell-premature',
        label: 'Counter-Trend SELL Thinking "Gold Is Overbought" Without MSS',
        actionType: 'SHORT',
        subtitle: 'Entry: $2,641.80 • SL: $2,644.30 (250 pts) • Fights active Displacement trend',
        entryPrice: 2641.8,
        stopLoss: 2644.3,
        takeProfit: 2636.8,
        stopLossPoints: 250,
        rewardToRisk: 2.0,
        isOptimalChoice: false,
        standard25UsdOutcome: {
          lotSize: '0.01 Standard Lot',
          riskPercentForced: 25.0,
          resultUsd: '-$2.50 USD (-25% wiped in 10 minutes)',
          accountImpactSummary: 'Severe loss from fighting institutional order flow.'
        },
        cent2500UscOutcome: {
          lotSize: '0.04 Cent Lots',
          riskPercentExact: 1.0,
          resultUsc: '-10.00 USC (-1.0R)',
          resultR: '-1.00R',
          accountImpactSummary:
            'Candle #6 expanded directly to $2,645.20, stopping out any counter-trend short inside an institutional FVG.'
        },
        jeyDebrief:
          'Never sell into a fresh Discount FVG right after an SSL sweep and bullish Displacement. Follow the Market Structure Shift instead.'
      }
    ]
  }
];
