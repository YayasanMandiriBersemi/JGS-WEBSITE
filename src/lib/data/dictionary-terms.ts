export type DictionaryCategory =
  | 'CENT_AND_CAPITAL'
  | 'RISK_AND_SIZING'
  | 'EXECUTION_AND_ORDERS'
  | 'MARKET_STRUCTURE'
  | 'GOLD_AND_FX'
  | 'MT5_AND_QUANT';

export type DictionaryIllustrationType =
  | 'CENT_DIVISIBILITY'
  | 'SPREAD_MECHANICS'
  | 'LIQUIDITY_SWEEP'
  | 'ASYMMETRIC_RR'
  | 'DRAWDOWN_CLIFF'
  | 'ORDER_TYPES'
  | 'EQUITY_VS_BALANCE';

export interface DictionaryTerm {
  slug: string;
  term: string;
  category: DictionaryCategory;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'QUANT';
  plainEnglish: string;
  technicalDefinition: string;
  centAccountExample: string;
  retailTrap: string;
  relatedTerms: string[];
  illustrationType: DictionaryIllustrationType;
  calculatorLink?:
    | '/calculators/cent'
    | '/calculators/position-size'
    | '/calculators/risk'
    | '/playground'
    | '/quant-lab';
}

export const DICTIONARY_CATEGORY_LABELS: Record<DictionaryCategory, string> = {
  CENT_AND_CAPITAL: 'Cent & Capital Math',
  RISK_AND_SIZING: 'Risk & Sizing',
  EXECUTION_AND_ORDERS: 'Execution & Orders',
  MARKET_STRUCTURE: 'Market Structure',
  GOLD_AND_FX: 'Gold & Forex',
  MT5_AND_QUANT: 'MT5 & Quant'
};

export const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    slug: 'cent-account',
    term: 'Cent Account',
    category: 'CENT_AND_CAPITAL',
    difficulty: 'BEGINNER',
    plainEnglish:
      'A real-money broker account where your balance is denominated in US Cents (1 USD = 100 USC). Contract size, tick value, and minimum lot depend on the broker’s symbol specifications.',
    technicalDefinition:
      'A retail brokerage account denomination where 1 USD equals 100 USC. While many brokers pair Cent accounts with micro-scaled symbol contracts (e.g. 1,000 currency units or 1 oz XAUUSD per 1.00 Cent Lot), contract size is not universally 100x smaller across all brokers, always verify the MT5 symbol specification.',
    centAccountExample:
      'Depositing $50 USD credits 5,000 USC to your MT5 terminal. If your broker uses a micro-scaled Cent Gold contract (1 oz/lot), risking 1% (50 USC = $0.50 USD) on a 250-point stop allows a 0.20 lot position.',
    retailTrap:
      'Assuming every Cent account automatically shrinks contract size 100x on all symbols without checking the broker’s MT5 Symbol Specification first.',
    relatedTerms: ['usc', 'lot-size', 'partial-close', 'margin'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'usc',
    term: 'USC (US Cents)',
    category: 'CENT_AND_CAPITAL',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The currency code shown in MetaTrader 5 for United States Cents (100 USC = $1.00 USD).',
    technicalDefinition:
      'Account base currency unit representing 1/100th of a US Dollar. All PnL, Margin, and Equity metrics inside the terminal display in USC.',
    centAccountExample:
      'On a $50 account (5,000 USC), a trade showing +125.00 profit in MT5 equals +125 USC (+$1.25 USD, or a +2.5% gain on your $50 capital).',
    retailTrap:
      'Confusing USC balance units with contract size and entering a lot size without verifying the symbol’s Tick Value and Minimum Lot in the Position Sizing Calculator.',
    relatedTerms: ['cent-account', 'lot-size', 'equity'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'lot-size',
    term: 'Lot Size (Volume)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The trade volume multiplier that controls how much money you gain or lose for every tick or point price moves.',
    technicalDefinition:
      'Contract volume unit in MT5. On a standard FX contract, 1.00 lot = 100,000 base units (or 100 oz on standard XAUUSD). On Cent accounts, contract size per 1.00 lot varies by broker symbol specification (often 1,000 FX units or 1 oz XAUUSD on micro-cent symbols, though some brokers keep standard contract sizes).',
    centAccountExample:
      'On a 5,000 USC ($50) account with a micro-scaled Cent Gold contract, if your stop loss is 250 points away and you want to risk 1% (50 USC), your calculated Lot Size is 0.20 lots.',
    retailTrap:
      'Using the same fixed lot size on every trade regardless of stop-loss distance or broker symbol contract specifications.',
    relatedTerms: ['cent-account', 'stop-loss', 'point', 'partial-close'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'stop-loss',
    term: 'Stop Loss (SL)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'An automatic safety exit price stored on the broker server that closes your trade if your idea is proven wrong.',
    technicalDefinition:
      'A server-side protective order parameter that liquidates an open position at market when price reaches a predefined invalidation threshold.',
    centAccountExample:
      'You buy XAUUSD at $2,650.00 on your 5,000 USC account with a Stop Loss at $2,647.50 (250 points) and 0.20 Cent Lots. Your worst-case loss is capped at ~50 USC (1%).',
    retailTrap:
      'Moving your Stop Loss further away when price approaches it, turning a planned -1% scratch into a -30% account disaster.',
    relatedTerms: ['take-profit', 'lot-size', 'r-multiple', 'slippage'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'take-profit',
    term: 'Take Profit (TP)',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'BEGINNER',
    plainEnglish:
      'An automatic target price where the broker locks in your gains and closes your winning trade.',
    technicalDefinition:
      'A server-side limit exit order attached to an open position that realizes profit once Bid (for Shorts: Ask) reaches the specified price level.',
    centAccountExample:
      'Risking 50 USC with a 250-point Stop Loss, you place your Take Profit 500 points away (1:2 R:R) to automatically bank +100 USC (+2%).',
    retailTrap:
      'Setting unrealistically distant Take Profit targets without taking partial profits at structural liquidity pools.',
    relatedTerms: ['stop-loss', 'risk-to-reward', 'partial-close'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'r-multiple',
    term: 'R-Multiple (1R)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Measuring your wins and losses as multiples of your initial risk (1R) instead of stressing over raw dollar amounts.',
    technicalDefinition:
      'Realized profit or loss divided by initial monetary risk at stop-loss distance: R = PnL / Initial_Risk.',
    centAccountExample:
      'On a 5,000 USC account with 1% risk, 1R = 50 USC. A trade that makes +125 USC is a +2.5R winner; a full stop-out is -1.0R.',
    retailTrap:
      'Bragging about making "$10 profit" without realizing you risked $40 of floating drawdown (a terrible 0.25R return on risk) to get it.',
    relatedTerms: ['risk-to-reward', 'expectancy', 'stop-loss'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'risk-to-reward',
    term: 'Risk-to-Reward Ratio (R:R)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'How much profit you stand to make compared to how much you risk losing if stopped out.',
    technicalDefinition:
      'The ratio of target reward distance (TP - Entry) to stop risk distance (Entry - SL). A 1:2 R:R requires only a 33.33% win rate to break even.',
    centAccountExample:
      'Risking 50 USC (1R) to target 125 USC (2.5R) gives a 1:2.5 Risk-to-Reward ratio. Even winning just 4 out of 10 trades nets +4.0R (+200 USC).',
    retailTrap:
      'Taking setups where the Stop Loss is 400 points wide for a tiny 100-point target (inverted 4:1 risk), where one loss erases four wins.',
    relatedTerms: ['r-multiple', 'expectancy', 'take-profit'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'drawdown',
    term: 'Drawdown (Max & Floating)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The percentage drop from your highest account peak down to the lowest point before reaching a new high.',
    technicalDefinition:
      'Peak-to-trough decline in account Equity: (Peak_Equity - Trough_Equity) / Peak_Equity. Recovery requires a nonlinearly larger percentage gain.',
    centAccountExample:
      'If a 5,000 USC account drops to 4,500 USC, it is in a 10% drawdown and needs an +11.1% gain (+500 USC) to return to 5,000 USC.',
    retailTrap:
      'Letting drawdown exceed 40%–50%, where mathematical recovery requires +67% to +100% gains and psychological pressure causes total ruin.',
    relatedTerms: ['recovery-factor', 'equity', 'daily-loss-limit'],
    illustrationType: 'DRAWDOWN_CLIFF',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'expectancy',
    term: 'Mathematical Expectancy',
    category: 'MT5_AND_QUANT',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'The average R-multiple or amount you expect to make per trade over a large sample of trades.',
    technicalDefinition:
      'E = (Win_Rate × Average_Win_R) - (Loss_Rate × Average_Loss_R). Any strategy with E > 0 grows capital over time when paired with controlled risk.',
    centAccountExample:
      'With a 45% win rate, +2.2R average win, and -1.0R average loss, Expectancy = (0.45 × 2.2) - (0.55 × 1.0) = +0.44R (+22 USC per trade on a 50 USC risk unit).',
    retailTrap:
      'Abandoning a profitable +0.40R expectancy strategy just because it experienced a normal 3-trade losing streak.',
    relatedTerms: ['r-multiple', 'risk-to-reward', 'profit-factor'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'pip',
    term: 'Pip (Percentage in Point)',
    category: 'GOLD_AND_FX',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The standard unit for measuring price changes in Forex pairs (usually the 4th decimal place, or 10 MT5 points).',
    technicalDefinition:
      'On 5-digit FX quotes (e.g. EURUSD 1.08500), 1 pip = 0.00010 (10 points). On JPY pairs (3-digit quotes, e.g. 152.400), 1 pip = 0.010 (10 points).',
    centAccountExample:
      'On EURUSD with 0.25 Cent Lots, a 20-pip (200-point) Stop Loss risks exactly 50 USC (1% of a 5,000 USC account).',
    retailTrap:
      'Confusing Pips with MT5 Points and typing a 10x wrong number into a lot size calculator.',
    relatedTerms: ['point', 'spread', 'lot-size'],
    illustrationType: 'SPREAD_MECHANICS',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'point',
    term: 'Point / Tick Size (MT5 Minimum Unit)',
    category: 'GOLD_AND_FX',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The smallest single-digit price change shown on the far right of an MT5 price quote.',
    technicalDefinition:
      'In MetaTrader 5 (SYMBOL_TRADE_TICK_SIZE), the Crosshair tool measures distance in Points/Ticks. On XAUUSD (2 decimal places), 100 points = $1.00 move. On EURUSD (5 decimal places), 10 points = 1 pip.',
    centAccountExample:
      'At 0.01 Cent Lot on XAUUSD, 1 MT5 Point = 0.01 USC. Therefore, 250 Points ($2.50 Gold move) = 2.50 USC at 0.01 Cent Lot.',
    retailTrap:
      'Misreading the MT5 Crosshair ruler on Gold and thinking "250" means 250 dollars instead of 250 points ($2.50).',
    relatedTerms: ['pip', 'xauusd', 'lot-size'],
    illustrationType: 'SPREAD_MECHANICS',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'spread',
    term: 'Spread (Bid-Ask Gap)',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The small difference between the instant Buy price (Ask) and Sell price (Bid) charged by the liquidity venue.',
    technicalDefinition:
      'Spread = Ask - Bid. Represents the immediate transaction cost of market entry and widens during illiquid rollover hours or high-impact news.',
    centAccountExample:
      'If XAUUSD Bid is 2650.00 and Ask is 2650.20, the spread is 20 points. On a 0.10 Cent Lot trade, the spread cost is 2.00 USC.',
    retailTrap:
      'Scalping with tiny 30-point stops when the spread itself is 20 points, meaning almost 70% of your stop is eaten by spread immediately.',
    relatedTerms: ['slippage', 'pip', 'point'],
    illustrationType: 'SPREAD_MECHANICS',
    calculatorLink: '/playground'
  },
  {
    slug: 'leverage',
    term: 'Leverage',
    category: 'CENT_AND_CAPITAL',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Broker buying power that lets you open positions without tying up your entire account balance as collateral.',
    technicalDefinition:
      'The ratio of notional contract exposure to required initial margin (e.g., 1:500 requires 0.2% margin). Leverage affects Margin Required, NOT point value.',
    centAccountExample:
      'At 1:500 leverage on a 5,000 USC account, opening 0.10 Cent Lots on Gold requires only ~53 USC of margin, leaving 4,947 USC as Free Margin.',
    retailTrap:
      'Thinking higher leverage forces higher risk, or conversely, using high free margin to open 10 overlapping trades at once.',
    relatedTerms: ['margin', 'lot-size', 'cent-account'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'margin',
    term: 'Margin & Free Margin',
    category: 'CENT_AND_CAPITAL',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Margin is the temporary deposit locked while a trade is open; Free Margin is the remaining cushion available in your account.',
    technicalDefinition:
      'Used Margin = Notional_Value / Leverage. Free Margin = Equity - Used Margin. Margin Level (%) = (Equity / Used Margin) × 100.',
    centAccountExample:
      'With 5,000 USC Equity and 53 USC Used Margin on a Gold trade, your Margin Level is over 9,400%, nowhere near a broker stop-out.',
    retailTrap:
      'Opening oversized lots until Margin Level drops below 100%, triggering an automatic Broker Stop-Out at the worst possible price.',
    relatedTerms: ['leverage', 'equity', 'cent-account'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'equity',
    term: 'Equity vs. Balance',
    category: 'MT5_AND_QUANT',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Balance is your account total from closed trades; Equity is what your account is ACTUALLY worth right now including open trades.',
    technicalDefinition:
      'Equity = Balance + Floating_Profit - Floating_Loss. All institutional risk checks and drawdown audits measure Equity, never Balance alone.',
    centAccountExample:
      'Your Balance says 5,000 USC, but you have an open trade down -150 USC. Your true Equity is 4,850 USC.',
    retailTrap:
      'Trusting a guru screenshot showing a high "Balance" while hiding a massive negative floating loss in Equity.',
    relatedTerms: ['drawdown', 'martingale', 'margin'],
    illustrationType: 'EQUITY_VS_BALANCE',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'xauusd',
    term: 'XAUUSD (Spot Gold)',
    category: 'GOLD_AND_FX',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The ticker symbol for trading 1 Troy Ounce of Gold priced in US Dollars.',
    technicalDefinition:
      'Over-the-counter spot precious metal CFD. High intraday volatility during London Open (07:00 UTC) and NY Open (12:30–16:00 UTC).',
    centAccountExample:
      'On a 5,000 USC Cent Account, a 250-point ($2.50) stop loss on XAUUSD at 1% risk (50 USC) equals 0.20 Cent Lots.',
    retailTrap:
      'Trading XAUUSD during US CPI or Non-Farm Payroll (NFP) releases without understanding spread expansion and slippage.',
    relatedTerms: ['point', 'liquidity-sweep', 'asian-range'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'liquidity-sweep',
    term: 'Liquidity Sweep (Stop Hunt)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'When price briefly pokes above an obvious high or below an obvious low to trigger retail orders before reversing.',
    technicalDefinition:
      'An excursion beyond a swing high/low that taps resting stop-market and breakout orders, followed by immediate rejection and candle closure back inside the range.',
    centAccountExample:
      'Gold spikes 120 points above the Asian session high at London Open, closes back inside the box, and provides a high-R:R entry with a 220-point stop.',
    retailTrap:
      'Placing your Stop Loss at the exact same obvious penny as everyone else, or buying the top of the sweep wick out of FOMO.',
    relatedTerms: ['break-of-structure', 'asian-range', 'fomo'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'break-of-structure',
    term: 'Break of Structure (BOS)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'When price firmly closes a full candle body past a key high or low, confirming the trend is continuing.',
    technicalDefinition:
      'Confirmation of trend continuation occurs when a candle body (not merely a wick) closes beyond the prior structural swing high (in an uptrend) or swing low (in a downtrend).',
    centAccountExample:
      'After a bullish BOS on 15m EURUSD, you place a Buy Limit on the pullback risking 50 USC (1%) for a +110 USC (+2.2R) continuation target.',
    retailTrap:
      'Treating a thin 1-minute wick as a Break of Structure before the 15-minute or 1-hour candle has actually closed.',
    relatedTerms: ['liquidity-sweep', 'limit-order', 'fomo'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'asian-range',
    term: 'Asian Session Range',
    category: 'GOLD_AND_FX',
    difficulty: 'BEGINNER',
    plainEnglish:
      'The high-to-low price box formed during the Tokyo trading hours before London banks open.',
    technicalDefinition:
      'The consolidation range established between 00:00 UTC and 06:30 UTC, whose upper and lower boundaries frequently serve as liquidity pools for the London session.',
    centAccountExample:
      'Marking the Asian High and Low on XAUUSD helps you avoid getting chopped inside the box and prepare a 50 USC risk setup when London sweeps one side.',
    retailTrap:
      'Over-trading 5 times inside a tight 80-point Asian range and losing -4R before the real move of the day even begins.',
    relatedTerms: ['liquidity-sweep', 'xauusd', 'break-of-structure'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'limit-order',
    term: 'Buy Limit / Sell Limit',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'BEGINNER',
    plainEnglish:
      'A pending order that waits for price to come back to a better discount price before entering.',
    technicalDefinition:
      'An order to buy below current market Ask (Buy Limit) or sell above current market Bid (Sell Limit), guaranteeing execution at the specified price or better.',
    centAccountExample:
      'Gold is at $2,652. You set a Buy Limit at $2,646 with SL $2,643.50 (250 pts) and 0.20 Cent Lots, risking 50 USC without needing to stare at the chart.',
    retailTrap:
      'Canceling your patient Limit Order to chase price at market, doubling your stop distance and ruining your R:R.',
    relatedTerms: ['stop-order', 'stop-loss', 'take-profit'],
    illustrationType: 'ORDER_TYPES',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'stop-order',
    term: 'Buy Stop / Sell Stop',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'BEGINNER',
    plainEnglish:
      'A pending order placed ahead of price that triggers only if momentum breaks through your level.',
    technicalDefinition:
      'A conditional market order triggered when Ask reaches a level above price (Buy Stop) or Bid reaches a level below price (Sell Stop). Subject to slippage during news.',
    centAccountExample:
      'Setting a Sell Stop below a structural support breakdown with a pre-sized 0.15 Cent Lot position.',
    retailTrap:
      'Placing Buy Stop and Sell Stop straddles 1 minute before CPI news, where spread widening triggers both orders and stops both out simultaneously.',
    relatedTerms: ['limit-order', 'slippage', 'spread'],
    illustrationType: 'ORDER_TYPES',
    calculatorLink: '/playground'
  },
  {
    slug: 'slippage',
    term: 'Slippage',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'When fast-moving markets fill your order or Stop Loss a few points away from your requested price.',
    technicalDefinition:
      'The difference between expected execution price and actual fill price when market orders or stop orders execute through thin order-book liquidity.',
    centAccountExample:
      'During NFP news, a 200-point stop loss slips by 60 extra points, turning a planned 50 USC loss into a 65 USC (-1.3R) loss.',
    retailTrap:
      'Holding high-leverage scalps directly through Red-Folder macroeconomic releases assuming your Stop Loss cannot slip.',
    relatedTerms: ['spread', 'stop-order', 'stop-loss'],
    illustrationType: 'SPREAD_MECHANICS',
    calculatorLink: '/playground'
  },
  {
    slug: 'expert-advisor',
    term: 'Expert Advisor (EA)',
    category: 'MT5_AND_QUANT',
    difficulty: 'BEGINNER',
    plainEnglish:
      'An automated trading software program (.ex5) that runs inside MetaTrader 5 to execute rules-based strategies.',
    technicalDefinition:
      'An MQL5 compiled module attached to a chart that processes OnTick() and OnTimer() events to manage algorithmic order placement and risk controls.',
    centAccountExample:
      'Running a JGS EA on a 5,000 USC Cent Account configured with RiskPercent = 1.0 and DailyLossLimit = 3.0%.',
    retailTrap:
      'Buying a "black-box" EA that hides its logic and disables Stop Losses.',
    relatedTerms: ['magic-number', 'vps', 'martingale'],
    illustrationType: 'EQUITY_VS_BALANCE',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'martingale',
    term: 'Martingale / Uncapped Grid',
    category: 'MT5_AND_QUANT',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A dangerous gambling method that doubles lot size every time a trade loses or adds losing trades without a stop loss.',
    technicalDefinition:
      'Exponential position-sizing progression (Lot_n = Lot_0 × k^n) during adverse price excursions. Produces high short-term win rates followed by inevitable tail-risk ruin.',
    centAccountExample:
      'Starting at 0.05 Cent Lots and doubling 7 times during a Gold trend reaches 6.40 Cent Lots, wiping out a 5,000 USC account in hours.',
    retailTrap:
      'Being seduced by a smooth 30-day Balance graph without realizing the bot is using Martingale averaging.',
    relatedTerms: ['equity', 'drawdown', 'expert-advisor'],
    illustrationType: 'EQUITY_VS_BALANCE',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'magic-number',
    term: 'Magic Number (MT5)',
    category: 'MT5_AND_QUANT',
    difficulty: 'QUANT',
    plainEnglish:
      'A unique ID tag that an MT5 Expert Advisor attaches to its trades so it never touches your manual trades or other bots.',
    technicalDefinition:
      'An integer identifier (ORDER_MAGIC) assigned to MQL5 orders allowing algorithmic strategies to filter and manage only their own positions.',
    centAccountExample:
      'Assigning Magic Number 880101 to an XAUUSD session EA so it manages its 0.15 Cent Lot position independently of your manual EURUSD trade.',
    retailTrap:
      'Running two EAs on the same account with the same Magic Number, causing them to close or modify each other’s orders.',
    relatedTerms: ['expert-advisor', 'vps'],
    illustrationType: 'ORDER_TYPES',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'vps',
    term: 'VPS (Virtual Private Server)',
    category: 'MT5_AND_QUANT',
    difficulty: 'BEGINNER',
    plainEnglish:
      'A 24/7 cloud computer located near the broker data center that keeps your MT5 and EAs running even when your laptop is off.',
    technicalDefinition:
      'A dedicated remote Windows/Linux virtual machine with low network latency (typically 1–5 ms ping to London LD4 or NY4 broker servers) ensuring uninterrupted EA uptime.',
    centAccountExample:
      'Hosting your 5,000 USC MT5 terminal on a VPS ensures your EA’s daily equity circuit breaker and trailing stops work 24 hours a day.',
    retailTrap:
      'Running an automated EA on a home laptop that goes into Sleep Mode while a trade is open.',
    relatedTerms: ['expert-advisor', 'magic-number', 'slippage'],
    illustrationType: 'ORDER_TYPES',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'profit-factor',
    term: 'Profit Factor',
    category: 'MT5_AND_QUANT',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'Total money won divided by total money lost. Anything above 1.50 over 100 trades shows strong edge.',
    technicalDefinition:
      'Ratio of Gross Profit to Gross Loss: PF = Σ(Winning_PnL) / |Σ(Losing_PnL)|. A value of 1.0 is breakeven; > 1.5 indicates robust risk-adjusted edge.',
    centAccountExample:
      'Over 40 trades on a 5,000 USC account, winning trades total +1,800 USC and losing trades total -1,000 USC. Profit Factor = 1.80 (+800 USC net).',
    retailTrap:
      'Believing a screenshot with a "Profit Factor of 50" over 6 trades, which just means the trader hasn’t closed their open losing trades yet.',
    relatedTerms: ['expectancy', 'recovery-factor', 'equity'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/quant-lab'
  },
  {
    slug: 'recovery-factor',
    term: 'Recovery Factor',
    category: 'MT5_AND_QUANT',
    difficulty: 'QUANT',
    plainEnglish:
      'Total profit divided by the worst drawdown suffered. It tells you if the profit was worth the stress.',
    technicalDefinition:
      'Recovery Factor = Net_Profit / Max_Drawdown. Evaluates capital efficiency and resilience against peak-to-trough equity drops.',
    centAccountExample:
      'Earning +1,200 USC (+24%) while never exceeding a -400 USC (-8%) drawdown produces a healthy Recovery Factor of 3.0.',
    retailTrap:
      'Celebrating a +20% gain that required surviving a -60% near-death drawdown (a terrible 0.33 Recovery Factor).',
    relatedTerms: ['drawdown', 'profit-factor', 'equity'],
    illustrationType: 'DRAWDOWN_CLIFF',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'daily-loss-limit',
    term: 'Daily Loss Limit (Circuit Breaker)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Your hard daily "stop trading" limit (typically 2% to 3% of your account) that prevents one bad day from blowing your account.',
    technicalDefinition:
      'An intraday risk threshold where reaching -N% of opening daily equity halts all manual and automated order execution until the next trading day.',
    centAccountExample:
      'On a 5,000 USC account with a 3% daily cap (150 USC) and 1% risk per trade (50 USC), three losses in one day lock the terminal until tomorrow.',
    retailTrap:
      'Ignoring your daily limit after two losses and increasing lot size to "get back to green before bed."',
    relatedTerms: ['revenge-trading', 'drawdown', 'stop-loss'],
    illustrationType: 'DRAWDOWN_CLIFF',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'revenge-trading',
    term: 'Revenge Trading',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Entering an unplanned, emotional trade immediately after a loss out of anger or frustration.',
    technicalDefinition:
      'A behavioral execution failure triggered by loss aversion where a trader bypasses setup criteria and inflates position size after an adverse outcome.',
    centAccountExample:
      'Losing -50 USC (-1R) on a valid setup, then immediately clicking Buy with 0.60 Cent Lots (-3R risk) on a random candle.',
    retailTrap:
      'Thinking the market "owes you your money back" on the very next 5-minute candle.',
    relatedTerms: ['daily-loss-limit', 'fomo', 'drawdown'],
    illustrationType: 'DRAWDOWN_CLIFF',
    calculatorLink: '/playground'
  },
  {
    slug: 'fomo',
    term: 'FOMO (Fear Of Missing Out)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Chasing a fast-moving candle late after the safe entry point has already passed.',
    technicalDefinition:
      'Entering a trend expansion after price has already traveled significantly away from structural invalidation, resulting in degraded R:R and high pullback risk.',
    centAccountExample:
      'Gold already rallied 450 points from support. Buying at the top forces a 500-point stop loss instead of a 200-point stop, ruining the trade math.',
    retailTrap:
      'Market-buying big impulsive candles right as institutional traders are taking profit into your buy order.',
    relatedTerms: ['liquidity-sweep', 'revenge-trading', 'limit-order'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'partial-close',
    term: 'Partial Close (Scaling Out)',
    category: 'EXECUTION_AND_ORDERS',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'Closing half of your trade in profit at your first target while letting the other half run with a risk-free Stop Loss.',
    technicalDefinition:
      'Dividing an open lot volume across multiple Take Profit tiers (e.g., 50% closed at +1.5R, stop moved to breakeven on remaining 50% targeting +3R).',
    centAccountExample:
      'Opening 0.20 Cent Lots on a 5,000 USC account lets you close 0.10 Cent Lots at +1.5R and trail the remaining 0.10 Cent Lot, impossible if stuck at 0.01 lot on a Standard account.',
    retailTrap:
      'Closing 90% of a winning trade at +0.2R while always taking 100% of losses at -1.0R.',
    relatedTerms: ['cent-account', 'lot-size', 'take-profit'],
    illustrationType: 'CENT_DIVISIBILITY',
    calculatorLink: '/calculators/cent'
  },
  {
    slug: 'bsl-ssl',
    term: 'BSL & SSL (Buy-Side & Sell-Side Liquidity)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'Pools of clustered retail Stop-Loss orders resting right above old highs (BSL) or right below old lows (SSL) where institutions find counterparty fills.',
    technicalDefinition:
      'Buy-Side Liquidity (BSL) represents buy-stop orders placed above swing highs (short traders SL + breakout buyers). Sell-Side Liquidity (SSL) represents sell-stop orders placed below swing lows (long traders SL + breakdown sellers).',
    centAccountExample:
      'Wait for XAUUSD to spike 50 points below the Asian Low (SSL sweep) on a 1,000 USC account before looking for a bullish MSS + FVG Buy entry with 0.02 Cent Lot.',
    retailTrap:
      'Placing your own Stop Loss directly at obvious Equal Highs or Equal Lows without waiting for the sweep.',
    relatedTerms: ['judas-swing', 'market-structure-shift', 'inducement'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'fair-value-gap',
    term: 'Fair Value Gap (FVG / Imbalance)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A three-candle price gap where candle 1 high and candle 3 low do not overlap, leaving an institutional "price magnet" that often gets retested for entry.',
    technicalDefinition:
      'A 3-candle liquidity void created by rapid displacement where buy or sell orders were filled one-sidedly. Price frequently retraces into this inefficiency (0.5 Consequent Encroachment) before continuing the trend.',
    centAccountExample:
      'After an XAUUSD displacement up during New York Silver Bullet, enter a 0.02 Cent Lot Buy Limit inside the M5 FVG on a 1,000 USC account with a tight 250-point Stop Loss (10 USC / 1%).',
    retailTrap:
      'Blindly trading every tiny FVG on a 1-minute chart without waiting for a prior Liquidity Sweep and Killzone alignment.',
    relatedTerms: ['displacement', 'order-block', 'silver-bullet'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'order-block',
    term: 'Order Block (OB)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'The final opposing candle just before a massive institutional price explosion, marking where smart money stacked major orders.',
    technicalDefinition:
      'In ICT methodology, a bullish Order Block is the last down-close candle preceding an energetic up-displacement that breaks structure (MSS), serving as a high-probability mitigation zone on retest.',
    centAccountExample:
      'Risking 10 USC (1% of 1,000 USC) at the open of an H1/M15 bullish Order Block after London SSL is swept, aiming for +25 USC (+2.5R) back to Equal Highs.',
    retailTrap:
      'Drawing random consolidation candles and calling them an Order Block without confirming Displacement + MSS.',
    relatedTerms: ['fair-value-gap', 'market-structure-shift', 'displacement'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'market-structure-shift',
    term: 'Market Structure Shift (MSS)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'The clear turning point when price decisively breaks through a prior swing high or low with strong momentum, confirming buyers or sellers just took control.',
    technicalDefinition:
      'A structural change of character where an opposing swing pivot is violated by energetic candle body closes (Displacement) immediately following a BSL/SSL liquidity sweep.',
    centAccountExample:
      'Wait for XAUUSD M5 body close above the lower-high before buying the pullback on your 1,000 USC account, cutting premature counter-trend stop-outs in half.',
    retailTrap:
      'Confusing a thin candle wick poking above resistance during low Asian liquidity for a genuine institutional MSS.',
    relatedTerms: ['displacement', 'bsl-ssl', 'fair-value-gap'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'inducement',
    term: 'Inducement (IDM)',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A shallow "bait" swing high or low sitting in front of the real Order Block/FVG, designed to trap early retail traders before tapping the true institutional zone.',
    technicalDefinition:
      'Internal range liquidity engineered ahead of a higher-timeframe Point of Interest (POI). Once retail buyers/sellers enter too early and put stops behind IDM, price sweeps them directly into the real FVG/OB.',
    centAccountExample:
      'Skipping the first shallow bounce and placing your 0.02 Cent Lot limit below the IDM low protects your 10 USC risk budget from unnecessary early SL hits.',
    retailTrap:
      'Entering on the first minor support before Inducement is swept.',
    relatedTerms: ['bsl-ssl', 'order-block', 'judas-swing'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'killzone',
    term: 'ICT Killzone (Time Before Price)',
    category: 'GOLD_AND_FX',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Specific 2-to-3 hour windows each day (London & New York open) when bank algorithms inject real volume and clean Gold setups unfold.',
    technicalDefinition:
      'Predefined intraday algorithmic delivery windows anchored to New York EST: London Killzone (02:00–05:00 EST / 14:00–17:00 WIB) and New York Killzone (07:00–10:00 EST / 19:00–22:00 WIB).',
    centAccountExample:
      'Using the JGS Pre-Flight Check clock so your 1,000 USC account only takes trades inside London/NY Killzones instead of bleeding spread in quiet Asian sideways chop.',
    retailTrap:
      'Overtrading random M5 patterns during slow afternoon lulls or broker Rollover (04:00–05:30 WIB).',
    relatedTerms: ['silver-bullet', 'judas-swing', 'spread'],
    illustrationType: 'SPREAD_MECHANICS',
    calculatorLink: '/playground'
  },
  {
    slug: 'silver-bullet',
    term: 'ICT Silver Bullet',
    category: 'GOLD_AND_FX',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A high-precision 1-hour trading window (especially NY 10:00–11:00 AM EST / 21:00–22:00 WIB) where you hunt a sweep followed immediately by a clean FVG setup.',
    technicalDefinition:
      'Michael J. Huddleston’s time-based algorithmic model occurring during three daily 60-minute windows (London 03–04 EST, NY AM 10–11 EST, NY PM 14–15 EST) targeting the nearest liquidity draw via an intra-window FVG.',
    centAccountExample:
      'Focusing strictly on 21:00–22:00 WIB lets working Indonesian traders execute one clean 0.02 Cent Lot XAUUSD FVG trade on 1,000 USC capital without watching charts 12 hours a day.',
    retailTrap:
      'Forcing an FVG inside the Silver Bullet hour even when price is flat or already hit the daily target earlier.',
    relatedTerms: ['killzone', 'fair-value-gap', 'bsl-ssl'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'judas-swing',
    term: 'Judas Swing',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A deceptive early breakout at London or New York open engineered specifically to trick retail traders into buying highs or selling lows right before reversal.',
    technicalDefinition:
      'An engineered counter-bias expansion occurring near Midnight/London/NY opens designed to sweep opposing BSL or SSL pools before true daily expansion begins.',
    centAccountExample:
      'Watching XAUUSD spike upward at 14:15 WIB to take Asian Highs (BSL), failing with a bearish MSS down, then entering 0.02 Cent Lot Sell safely.',
    retailTrap:
      'Buying the very top of a fast opening candle thinking "London breakout has started!"',
    relatedTerms: ['bsl-ssl', 'killzone', 'market-structure-shift'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'displacement',
    term: 'Displacement',
    category: 'MARKET_STRUCTURE',
    difficulty: 'INTERMEDIATE',
    plainEnglish:
      'A sudden burst of large, full-bodied candles moving decisively in one direction, leaving zero doubt that big institutional money just stepped on the gas.',
    technicalDefinition:
      'High-momentum institutional price delivery characterized by consecutive large-body candles with minimal wicks that generate Fair Value Gaps and confirm a Market Structure Shift.',
    centAccountExample:
      'Only committing your 10 USC (1%) trade budget after seeing clear Displacement leave an FVG, avoiding choppy sideways drift.',
    retailTrap:
      'Mistaking sluggish, overlap-heavy candles for institutional Displacement.',
    relatedTerms: ['fair-value-gap', 'market-structure-shift', 'order-block'],
    illustrationType: 'LIQUIDITY_SWEEP',
    calculatorLink: '/playground'
  },
  {
    slug: 'premium-discount',
    term: 'Premium vs. Discount (50% Equilibrium)',
    category: 'RISK_AND_SIZING',
    difficulty: 'BEGINNER',
    plainEnglish:
      'Never buy expensive stuff above 50% of the range (Premium), and never sell cheap stuff below 50% (Discount), always wait for price to reach the bargain zone.',
    technicalDefinition:
      'Dividing a dealing range from Swing Low (0%) to Swing High (100%) using a Fibonacci 50% midpoint: entries below 50% reside in Discount (optimal for longs) while entries above 50% reside in Premium (optimal for shorts).',
    centAccountExample:
      'Waiting for XAUUSD to pull back below the 50% Discount midpoint before entering your 0.02 Cent Lot Buy shrinks Stop-Loss distance and improves R:R from 1:1.2 to 1:3.0.',
    retailTrap:
      'Clicking Buy at the 90% Premium extreme just because momentum looks green.',
    relatedTerms: ['fair-value-gap', 'risk-to-reward', 'fomo'],
    illustrationType: 'ASYMMETRIC_RR',
    calculatorLink: '/calculators/position-size'
  }
];
