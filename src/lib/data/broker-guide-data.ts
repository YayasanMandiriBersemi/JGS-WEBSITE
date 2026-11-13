export type BrokerTierKey = 'CENT' | 'MICRO_USD' | 'RAW_ECN' | 'INDONESIA_LOCAL';

export interface BrokerProfileItem {
  id: string;
  tier: BrokerTierKey;
  name: string;
  accountType: string;
  badgeId: string;
  badgeEn: string;
  minDepositId: string;
  minDepositEn: string;
  spreadPtsNumeric: number; // for bar chart sorting/visualization
  spreadSummaryId: string;
  spreadSummaryEn: string;
  commissionId: string;
  commissionEn: string;
  leverage: string;
  mcSo: string;
  maxOrdersId: string;
  maxOrdersEn: string;
  highlightsId: string;
  highlightsEn: string;
  mandatoryRulesId?: string[];
  mandatoryRulesEn?: string[];
  warningFlagId?: string;
  warningFlagEn?: string;
  isCaution?: boolean;
}

export const BROKER_PROFILES: BrokerProfileItem[] = [
  // ======================== TAB 1: CENT ACCOUNTS ($10 / 1,000 USC) ========================
  {
    id: 'exness-standard-cent',
    tier: 'CENT',
    name: 'Exness',
    accountType: 'Standard Cent',
    badgeId: 'Pilihan #1 Overall • Dukungan Indeks Cent (USTECc)',
    badgeEn: '#1 Overall • MT5 Cent Indices Support (USTECc)',
    minDepositId: '~$10 USD (1.000 USC)',
    minDepositEn: '~$10 USD (1,000 USC)',
    spreadPtsNumeric: 20,
    spreadSummaryId: '16–25 pts ($0.16–$0.25/oz Overlap London/NY)',
    spreadSummaryEn: '16–25 pts ($0.16–$0.25/oz London/NY Overlap)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:Unlimited (default 1:2000; HMR berita 1:200–1:1000)',
    mcSo: 'MC 60% / SO 0% (Hedged Margin 0%)',
    maxOrdersId: 'MT4 s/d 1.000 posisi (50 pending); MT5 100–200 posisi',
    maxOrdersEn: 'MT4 up to 1,000 orders (50 pending); MT5 100–200 orders',
    highlightsId:
      'Satu-satunya akun Cent utama yang menyediakan USTECc (Nasdaq-100), US30c, US500c, XAGUSDc, USOILc, dan BTCUSDc di MT5. Penarikan dana instan otomatis 24 jam.',
    highlightsEn:
      'Only major Cent account offering USTECc (Nasdaq-100), US30c, US500c, XAGUSDc, USOILc, and BTCUSDc on MT5 with automated withdrawals.',
    mandatoryRulesId: [
      'Gunakan MT5 jika ingin trading Indeks/Kripto Cent (USTECc, BTCUSDc).',
      'Gunakan MT4 jika membutuhkan kapasitas layering berat di atas 200 posisi pada Emas.',
    ],
    mandatoryRulesEn: [
      'Use MT5 when trading Cent Indices or Crypto (USTECc, BTCUSDc).',
      'Use MT4 only if requiring heavy >200 concurrent gold grid orders.',
    ],
  },
  {
    id: 'roboforex-procent',
    tier: 'CENT',
    name: 'RoboForex',
    accountType: 'ProCent (MT5)',
    badgeId: 'Spread Emas Terketat 18 Pts & 1.000 Posisi MT5',
    badgeEn: 'Tightest 18-Pt Gold Cent Spread & 1,000 MT5 Orders',
    minDepositId: '$10 USD',
    minDepositEn: '$10 USD',
    spreadPtsNumeric: 18,
    spreadSummaryId: '18 pts ($0.18/oz)',
    spreadSummaryEn: '18 pts ($0.18/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:1000 Logam (1:2000 Forex)',
    mcSo: 'MC 60% / SO 30%',
    maxOrdersId: 'MT5 1.000 posisi (500 aktif + 500 pending)',
    maxOrdersEn: 'MT5 1,000 positions (500 active + 500 pending)',
    highlightsId:
      'Eksekusi MT5 cepat dengan spread rata-rata 18 pts untuk pemburu scalping M1 XAUUSD bermodal 1.000 USC.',
    highlightsEn:
      'Fast MT5 Cent execution featuring tight 18-pt gold spread ideal for 1,000 USC M1 discipline.',
    mandatoryRulesId: [
      'ATURAN 1: Wajib pilih MT5 dan JANGAN pilih MT4, karena MT4 RoboForex ProCent mengunci volume minimum 0.10 Cent Lot (10x lebih boros margin daripada 0.01 Cent Lot di MT5!).',
      'ATURAN 2: Wajib pilih simbol XAUUSD murni tanpa akhiran ".p", karena simbol XAUUSD.p adalah akun Partner Markup dengan spread melonjak +67% menjadi 30 pts ($0.30/oz)!',
    ],
    mandatoryRulesEn: [
      'RULE 1: Strictly select MT5 (NEVER MT4) because MT4 ProCent forces 0.10 Cent minimum volume (10x heavier margin than MT5 0.01 Cent lot).',
      'RULE 2: Strictly select clean XAUUSD without ".p" suffix; XAUUSD.p adds partner markup inflating spread by +67% to 30 pts ($0.30/oz).',
    ],
  },
  {
    id: 'xs-cent',
    tier: 'CENT',
    name: 'XS.com',
    accountType: 'Cent Account (MT5)',
    badgeId: 'Alternatif Eksekusi Cepat • Stop Out 10%',
    badgeEn: 'Fast MT5 Alternative • 10% Stop Out',
    minDepositId: '$0 (fleksibel)',
    minDepositEn: '$0 minimum',
    spreadPtsNumeric: 19,
    spreadSummaryId: '19 pts (1.9 pips / $0.19/oz)',
    spreadSummaryEn: '19 pts (1.9 pips / $0.19/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:2000 (HMR 1:200)',
    mcSo: 'MC 40% / SO 10% (Hedged Margin 0%, Stop Level 0)',
    maxOrdersId: 'MT5 500 open + 500 pending (1.000 total)',
    maxOrdersEn: 'MT5 500 open + 500 pending (1,000 total)',
    highlightsId:
      'Bebas biaya swap emas hingga 5 hari, Stop Level 0 untuk pemasangan SL/TP dekat harga, namun hanya menyediakan Forex & Logam tanpa Indeks Cent.',
    highlightsEn:
      '5-day swap-free Gold with Stop Level 0, ideal for close hard stops; offers FX & Metals without Cent Indices.',
  },
  {
    id: 'hfm-cent',
    tier: 'CENT',
    name: 'HFM',
    accountType: 'Cent Account',
    badgeId: 'Bebas Swap Panjang s/d 45 Hari',
    badgeEn: 'Extended 45-Day Swap-Free Holding',
    minDepositId: '$0 minimum',
    minDepositEn: '$0 minimum',
    spreadPtsNumeric: 28,
    spreadSummaryId: '25–32 pts ($0.25–$0.32/oz)',
    spreadSummaryEn: '25–32 pts ($0.25–$0.32/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:2000',
    mcSo: 'MC 50% / SO 20% (Stop Level 0.0)',
    maxOrdersId: '300 posisi',
    maxOrdersEn: '300 concurrent orders',
    highlightsId:
      'Cocok untuk swing trading berhari-hari di Akun Cent berkat jatah bebas inap (swap-free) hingga 45 hari.',
    highlightsEn:
      'Well suited for multi-day Cent swing setups thanks to generous swap-free holding windows up to 45 days.',
  },
  {
    id: 'headway-cent',
    tier: 'CENT',
    name: 'Headway',
    accountType: 'Cent Account',
    badgeId: 'Modal Mulai $1 • 290+ Instrumen',
    badgeEn: '$1 Entry • 290+ Instruments',
    minDepositId: '$1 USD',
    minDepositEn: '$1 USD',
    spreadPtsNumeric: 30,
    spreadSummaryId: '28.8–31 pts',
    spreadSummaryEn: '28.8–31 pts',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:Unlimited',
    mcSo: 'SO 0%–20%',
    maxOrdersId: 'Maks 150 posisi',
    maxOrdersEn: 'Max 150 orders',
    highlightsId:
      'Menyediakan lebih dari 290 instrumen mikro dan batas masuk rendah ($1), meskipun spread emas sedikit lebih lebar dibanding Exness/RoboForex.',
    highlightsEn:
      'Wide 290+ instrument lineup with $1 starting barrier, though gold spreads run wider than tier-1 leaders.',
  },
  {
    id: 'fbs-cent',
    tier: 'CENT',
    name: 'FBS',
    accountType: 'Cent Account',
    badgeId: '500 Posisi • Min Deposit $1–$5',
    badgeEn: '500 Order Slots • $1–$5 Deposit',
    minDepositId: '$1–$5 USD',
    minDepositEn: '$1–$5 USD',
    spreadPtsNumeric: 27,
    spreadSummaryId: '27 pts ($0.27/oz)',
    spreadSummaryEn: '27 pts ($0.27/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:500 Logam',
    mcSo: 'MC 40% / SO 20%',
    maxOrdersId: 'Maks 500 posisi',
    maxOrdersEn: 'Max 500 positions',
    highlightsId:
      'Kapasitas order longgar hingga 500 slot dan deposit rendah, meski leverage logam terbatas pada 1:500.',
    highlightsEn:
      'Generous 500-position capacity with low entry deposit, though metals leverage caps at 1:500.',
  },
  {
    id: 'vantage-cent',
    tier: 'CENT',
    name: 'Vantage',
    accountType: 'Cent Account (STP)',
    badgeId: '1.000+ CFD + NAS100 (Min $50)',
    badgeEn: '1,000+ CFDs + NAS100 ($50 Min)',
    minDepositId: 'Min $50 USD (5.000 USC)',
    minDepositEn: 'Min $50 USD (5,000 USC)',
    spreadPtsNumeric: 21,
    spreadSummaryId: 'Mulai 0.0 (STP ~21 pts)',
    spreadSummaryEn: 'From 0.0 (STP ~21 pts)',
    commissionId: 'Sesuai tipe STP',
    commissionEn: 'Standard STP structure',
    leverage: 'Hingga 1:500 / regional',
    mcSo: 'Standar regulasi multi-yurisdiksi',
    maxOrdersId: 'Standar MT4/MT5',
    maxOrdersEn: 'Standard MT4/MT5 caps',
    highlightsId:
      'Eksekusi STP bersih dengan 1.000+ CFD termasuk NAS100 Cent, namun kurang cocok untuk dompet $10 karena syarat minimal live $50.',
    highlightsEn:
      'Clean STP pricing across 1,000+ CFDs including NAS100 Cent, though requiring $50 (5,000 USC) minimum deposit.',
  },
  {
    id: 'justmarkets-cent',
    tier: 'CENT',
    name: 'JustMarkets',
    accountType: 'Standard Cent',
    badgeId: 'PERINGATAN: LIMIT 30 POSISI',
    badgeEn: 'WARNING: 30-ORDER CAP',
    minDepositId: '$10 USD',
    minDepositEn: '$10 USD',
    spreadPtsNumeric: 27,
    spreadSummaryId: '27 pts ($0.27/oz)',
    spreadSummaryEn: '27 pts ($0.27/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:3000',
    mcSo: 'Standar Cent MC / SO',
    maxOrdersId: 'DIKUNCI MAKS 30 POSISI (30/1000)',
    maxOrdersEn: 'LOCKED MAX 30 POSITIONS ONLY',
    highlightsId:
      'Spread tergolong moderat (27 pts) dengan leverage 1:3000, namun limit order terbuka sangat kecil.',
    highlightsEn:
      'Moderate 27-pt spread and high 1:3000 leverage, severely bottlenecked by hard order count cap.',
    warningFlagId:
      'PERINGATAN KERAS LAYERING M1: Kapasitas maksimal posisi terbuka dikunci hanya 30 posisi (30/1000)! Jangan dipakai untuk strategi grid atau averaging bertumpuk.',
    warningFlagEn:
      'SEVERE LAYERING WARNING: Concurrent open orders hard-capped at 30 positions max! Avoid for multi-layer M1 strategies.',
    isCaution: true,
  },

  // ======================== TAB 2: MICRO USD BRIDGE ($5-$50 NON-CENT) ========================
  {
    id: 'xm-ultralow-micro',
    tier: 'MICRO_USD',
    name: 'XM',
    accountType: 'Ultra Low Micro',
    badgeId: 'Jembatan USD Terbaik #1 • Kontrak 1 Oz Identik Cent',
    badgeEn: '#1 USD Micro Bridge • Exact 1 Oz Contract Match',
    minDepositId: '$5 USD',
    minDepositEn: '$5 USD',
    spreadPtsNumeric: 20,
    spreadSummaryId: 'Rata-rata $0.20/oz (20 pts)',
    spreadSummaryEn: 'Avg $0.20/oz (20 pts)',
    commissionId: '$0 komisi (Bebas Swap)',
    commissionEn: '$0 commission (Swap-Free)',
    leverage: '1:1000',
    mcSo: 'MC 50% / SO 20%',
    maxOrdersId: '300 posisi',
    maxOrdersEn: '300 positions',
    highlightsId:
      'Memecahkan jebakan kontrak 100x di akun USD biasa: ukuran 1 Micro Lot = 1 troy oz emas (sehingga 0.01 Micro Lot = 0.01 oz, persis seringan 0.01 Cent Lot meski saldo tampil dalam USD).',
    highlightsEn:
      'Solves the 100x Standard trap inside a pure USD wallet: 1 Micro Lot = 1 oz gold (0.01 Micro = 0.01 oz), keeping $10 risk math safe.',
    mandatoryRulesId: [
      'WAJIB pilih tipe "Ultra Low Micro" ($0.20/oz), JANGAN pilih Micro biasa yang spread emasnya mencapai $0.45/oz (45 pts)!',
    ],
    mandatoryRulesEn: [
      'Strictly open "Ultra Low Micro" ($0.20/oz average), NOT legacy Standard Micro ($0.45/oz / 45 pts spread)!',
    ],
  },
  {
    id: 'xs-micro',
    tier: 'MICRO_USD',
    name: 'XS.com',
    accountType: 'Micro Account (USD)',
    badgeId: 'Kontrak Mikro USD + Dukungan Logam & Indeks MT5',
    badgeEn: 'USD Micro Contract + Metals & Indices MT5',
    minDepositId: '$0 minimum',
    minDepositEn: '$0 minimum',
    spreadPtsNumeric: 21,
    spreadSummaryId: 'Kompetitif STP Mikro',
    spreadSummaryEn: 'Competitive Micro STP',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: 'Hingga 1:1000',
    mcSo: 'MC 40% / SO 10%',
    maxOrdersId: 'Kapasitas tinggi MT5',
    maxOrdersEn: 'High MT5 order capacity',
    highlightsId:
      'Alternatif akun mikro berdenominasi USD tanpa minimum deposit dengan cakupan logam mulia dan indeks global di MT5.',
    highlightsEn:
      'Zero-minimum USD micro account supporting both precious metals and global stock indices inside MT5.',
  },

  // ======================== TAB 3: INSTITUTIONAL RAW ECN / PRO ($200-$1,000+) ========================
  {
    id: 'exness-raw',
    tier: 'RAW_ECN',
    name: 'Exness',
    accountType: 'Raw Spread',
    badgeId: 'Biaya Efektif Emas Termurah #1 ($0.107/oz)',
    badgeEn: '#1 Lowest All-In Gold Cost ($0.107/oz)',
    minDepositId: '$200 USD',
    minDepositEn: '$200 USD',
    spreadPtsNumeric: 11,
    spreadSummaryId: 'Avg $0.037/oz + komisi $7.00 RT = $0.107/oz (10.7 pts)',
    spreadSummaryEn: 'Avg $0.037/oz + $7.00 RT comm = $0.107/oz (10.7 pts)',
    commissionId: '$7.00 RT / std lot',
    commissionEn: '$7.00 RT / std lot',
    leverage: '1:Unlimited / 1:2000',
    mcSo: 'SO 0% (WD Instan)',
    maxOrdersId: 'Unlimited praktis di MT5/MT4',
    maxOrdersEn: 'High-capacity MT4/MT5',
    highlightsId:
      'Kombinasi spread mentah ultra tipis + komisi $7 round-turn memberi total gesekan termurah untuk scalping M1 berfrekuensi tinggi.',
    highlightsEn:
      'Combines raw interbank spreads with $7 round-turn fee for benchmark institutional efficiency on high-frequency M1 gold.',
  },
  {
    id: 'exness-zero',
    tier: 'RAW_ECN',
    name: 'Exness',
    accountType: 'Zero Account',
    badgeId: 'Spread 0.0 Pts 95% Hari • Presisi Limit Order M1',
    badgeEn: '0.0 Pt Spread 95% of Day • Surgical Pending Limit',
    minDepositId: '$200 USD',
    minDepositEn: '$200 USD',
    spreadPtsNumeric: 11,
    spreadSummaryId: '0.0 pts + komisi $11.00 RT = $0.110/oz (11.0 pts)',
    spreadSummaryEn: '0.0 pts + $11.00 RT comm = $0.110/oz (11.0 pts)',
    commissionId: '$11.00 RT (emas)',
    commissionEn: '$11.00 RT (gold)',
    leverage: '1:Unlimited / 1:2000',
    mcSo: 'SO 0%',
    maxOrdersId: 'Standar Pro MT4/MT5',
    maxOrdersEn: 'Pro MT4/MT5 limits',
    highlightsId:
      'Memastikan Pending Buy/Sell Limit M1 terpicu tepat pada harga grafik tanpa distorsi spread bid-ask melebar.',
    highlightsEn:
      'Zero bid-ask gap 95% of the trading day so tight Fair Value Gap limit orders trigger precisely.',
    warningFlagId:
      'CATATAN PERAK: Hindari akun Zero untuk trading Perak (XAGUSD) karena komisi XAG di akun Zero mencapai $50/sisi ($100 RT).',
    warningFlagEn:
      'SILVER NOTICE: Avoid Zero Account for XAGUSD Silver due to heavy $50/side ($100 RT) commission structure.',
  },
  {
    id: 'exness-pro',
    tier: 'RAW_ECN',
    name: 'Exness',
    accountType: 'Pro Account (Zero Fee)',
    badgeId: 'Instant Execution • $0 Komisi',
    badgeEn: 'Instant Execution • $0 Commission',
    minDepositId: '$200 USD',
    minDepositEn: '$200 USD',
    spreadPtsNumeric: 13,
    spreadSummaryId: '11.2–15 pts ($0.112–$0.15/oz)',
    spreadSummaryEn: '11.2–15 pts ($0.112–$0.15/oz)',
    commissionId: '$0 komisi',
    commissionEn: '$0 commission',
    leverage: '1:Unlimited / 1:2000',
    mcSo: 'SO 0%',
    maxOrdersId: 'Standar Pro MT5',
    maxOrdersEn: 'Pro MT5 limits',
    highlightsId:
      'Eksekusi instan tanpa slippage negatif di kondisi normal dan tanpa komisi terpisah, mempermudah perhitungan TP/SL manual.',
    highlightsEn:
      'Supports Instant Execution mode with zero separate per-lot commission for straightforward R-multiple math.',
  },
  {
    id: 'tickmill-raw',
    tier: 'RAW_ECN',
    name: 'Tickmill',
    accountType: 'Raw Account',
    badgeId: 'Komisi Terendah $6.00 RT • Latensi 40–68ms',
    badgeEn: 'Low $6.00 RT Commission • 40–68ms Fill',
    minDepositId: '$100 USD',
    minDepositEn: '$100 USD',
    spreadPtsNumeric: 15,
    spreadSummaryId: '~$0.09/oz + komisi $6.00 RT = ~$0.15/oz (15 pts)',
    spreadSummaryEn: '~$0.09/oz + $6.00 RT comm = ~$0.15/oz (15 pts)',
    commissionId: '$6.00 RT ($3/sisi)',
    commissionEn: '$6.00 RT ($3/side)',
    leverage: 'Hingga 1:500 / 1:1000 sesuai entitas',
    mcSo: 'MC 100% / SO 30%',
    maxOrdersId: 'Standar ECN',
    maxOrdersEn: 'ECN standard',
    highlightsId:
      'Dihormati trader institusional & EA berfrekuensi tinggi karena komisi round-turn paling ringan ($6) serta eksekusi cepat 40–68ms.',
    highlightsEn:
      'Favored by systematic traders for $6 round-turn commission discipline and sub-70ms execution fills.',
  },
  {
    id: 'pepperstone-razor',
    tier: 'RAW_ECN',
    name: 'Pepperstone',
    accountType: 'Razor / Standard',
    badgeId: 'Eksekusi <30ms • Integrasi TradingView & cTrader',
    badgeEn: '<30ms Fills • Native TradingView & cTrader',
    minDepositId: 'Fleksibel ($200 direkomendasikan)',
    minDepositEn: 'Flexible ($200 recommended)',
    spreadPtsNumeric: 15,
    spreadSummaryId: 'Biaya efektif $0.15–$0.16/oz (15–16 pts)',
    spreadSummaryEn: 'All-in cost $0.15–$0.16/oz (15–16 pts)',
    commissionId: '~$7.00 RT Razor',
    commissionEn: '~$7.00 RT Razor',
    leverage: '1:30 s/d 1:500 sesuai lisensi',
    mcSo: 'Standar regulasi Tier-1',
    maxOrdersId: 'Pro ECN',
    maxOrdersEn: 'Pro ECN limits',
    highlightsId:
      'Teregulasi ketat multi-yurisdiksi (ASIC/FCA/SCB), eksekusi <30ms dan dapat langsung mengeksekusi order dari layar grafik TradingView.',
    highlightsEn:
      'Tier-1 regulated execution under 30ms with native TradingView and cTrader algorithmic connectivity.',
  },
  {
    id: 'icmarkets-raw',
    tier: 'RAW_ECN',
    name: 'IC Markets',
    accountType: 'Raw Spread (Equinix NY4)',
    badgeId: 'Server Equinix NY4 <30ms • Spesialis HFT & EA',
    badgeEn: 'Equinix NY4 <30ms • Algorithmic EA Hub',
    minDepositId: '$200 USD',
    minDepositEn: '$200 USD',
    spreadPtsNumeric: 20,
    spreadSummaryId: '$0.14/oz + $7 RT ($6 cTrader) = ~$0.20–$0.21/oz',
    spreadSummaryEn: '$0.14/oz + $7 RT ($6 cTrader) = ~$0.20–$0.21/oz',
    commissionId: '$7 MT5 / $6 cTrader RT',
    commissionEn: '$7 MT5 / $6 cTrader RT',
    leverage: 'Hingga 1:500 (Global)',
    mcSo: 'MC 100% / SO 50%',
    maxOrdersId: 'Kapasitas ECN pro',
    maxOrdersEn: 'Pro ECN capacity',
    highlightsId:
      'Infrastruktur server Equinix NY4/LD5 menjaga kedalaman likuiditas stabil bagi bot EA algoritmik dan eksekusi bebas intervensi meja.',
    highlightsEn:
      'Equinix NY4 fiber co-location ensures deep ECN order-book routing tailored for verified algorithmic EAs.',
  },

  // ======================== TAB 4: INDONESIAN REGULATED BROKERS (2026) ========================
  {
    id: 'finex-reguler',
    tier: 'INDONESIA_LOCAL',
    name: 'Finex Berjangka',
    accountType: 'Akun Reguler MT5',
    badgeId: 'Pialang Lokal Pilihan #1 • Min Deposit Rp100 Ribuan ($10)',
    badgeEn: '#1 Indonesian Local Broker • ~$10 Entry',
    minDepositId: '$10 USD (Rp100 ribuan)',
    minDepositEn: '$10 USD (~Rp100k)',
    spreadPtsNumeric: 15,
    spreadSummaryId: 'Spread emas mulai $0.14/oz ($0.15/oz all-in)',
    spreadSummaryEn: 'Gold spreads from $0.14/oz ($0.15/oz all-in)',
    commissionId: '$1.00 / 0.1–1 lot (rendah)',
    commissionEn: '$1.00 low lot fee',
    leverage: '1:500 (Forex/Logam) & 1:200 (Indeks)',
    mcSo: 'Stop Level 0 • Regulasi RI 2026',
    maxOrdersId: '78 Instrumen MT5',
    maxOrdersEn: '78 MT5 Instruments',
    highlightsId:
      'Pialang berjangka resmi Indonesia dengan batas masuk mikro ramah pelajar ($10), dukungan MT5 penuh, komisi $1 rendah, serta Stop Level 0.',
    highlightsEn:
      'Indonesian licensed futures broker offering $10 accessible minimum entry, full MT5 support, low $1 commission, and Stop Level 0.',
  },
  {
    id: 'mifx-ultraflow',
    tier: 'INDONESIA_LOCAL',
    name: 'MIFX (Monex)',
    accountType: 'Ultra Low & Standard',
    badgeId: 'Pialang Lokal Terbesar • Margin Emas 0.01 = $4.00',
    badgeEn: 'Leading Indonesian Regulated Broker',
    minDepositId: 'Rp500.000',
    minDepositEn: 'Rp500,000 (~$31)',
    spreadPtsNumeric: 22,
    spreadSummaryId: 'Kompetitif Ultra Low',
    spreadSummaryEn: 'Competitive Ultra Low tier',
    commissionId: 'Sesuai akun Ultra Low / Std',
    commissionEn: 'Tier-dependent local fee',
    leverage: 'High Leverage 1:500',
    mcSo: 'Segregated Bank Custody BI/OJK/Bappebti',
    maxOrdersId: 'MT4 / MT5 / MIFX App',
    maxOrdersEn: 'MT4 / MT5 / MIFX App',
    highlightsId:
      'Dengan fitur High Leverage 1:500, margin untuk 0.01 lot XAUUSD hanya $4.00, Forex $2.00, Nasdaq $10.00, meski XAGUSD (Perak) dikunci $50.00 per 0.01 lot.',
    highlightsEn:
      '1:500 local margin structure cuts 0.01 XAUUSD margin to $4.00 and FX to $2.00, though 0.01 XAGUSD remains $50.00.',
  },
  {
    id: 'dupoin-micro',
    tier: 'INDONESIA_LOCAL',
    name: 'Dupoin Futures',
    accountType: 'Akun Micro',
    badgeId: 'Terdaftar Resmi Indonesia',
    badgeEn: 'Licensed Indonesian Micro',
    minDepositId: '$50 USD',
    minDepositEn: '$50 USD',
    spreadPtsNumeric: 26,
    spreadSummaryId: 'Kompetitif lokal (Stop Level 30 pts)',
    spreadSummaryEn: 'Local micro pricing (30-pt Stop Level)',
    commissionId: 'Standar komisi pialang berjangka',
    commissionEn: 'Standard local futures fee',
    leverage: '1:100',
    mcSo: 'Stop Level 30 pts',
    maxOrdersId: 'Standar Mikro MT5',
    maxOrdersEn: 'MT5 Micro limits',
    highlightsId:
      'Alternatif pialang lokal terregulasi dengan akun Micro mulai $50, perhatikan jarak minimum Stop Level 30 pts saat menempatkan SL/TP.',
    highlightsEn:
      'Regulated local micro option starting at $50; remember minimum 30-pt Stop Level distance from current quotes.',
  },
  {
    id: 'hsb-investasi',
    tier: 'INDONESIA_LOCAL',
    name: 'HSB Investasi',
    accountType: 'Reguler (Khusus Modal Besar)',
    badgeId: 'Min Lot Emas/Indeks 0.10 Lot',
    badgeEn: '0.10 Min Lot Metals/Indices',
    minDepositId: 'Khusus modal menengah-besar',
    minDepositEn: 'Mid-to-large capital balance',
    spreadPtsNumeric: 25,
    spreadSummaryId: 'Kompetitif regulasi lokal',
    spreadSummaryEn: 'Local exchange pricing',
    commissionId: 'Sesuai tier akun',
    commissionEn: 'Tier fee schedule',
    leverage: 'Regulasi lokal',
    mcSo: 'Standar bursa RI',
    maxOrdersId: 'Min 0.10 lot pada emas & indeks',
    maxOrdersEn: '0.10 min lot on gold & indices',
    highlightsId:
      'Tidak ditujukan untuk modal $10–$50 karena ukuran lot minimum untuk emas dan indeks dipatok mulai 0.10 standard lot.',
    highlightsEn:
      'Designed strictly for larger funded accounts since gold and index minimums start at 0.10 standard lot.',
    warningFlagId:
      'KHUSUS MODAL BESAR: Ukuran lot minimum 0.10 pada Emas & Indeks terlalu berat bagi modal di bawah $500.',
    warningFlagEn:
      'LARGER CAPITAL ONLY: 0.10 minimum lot on Gold & Indices exceeds safe risk bounds under $500 balances.',
    isCaution: true,
  },
];

export interface MultiPairInstrumentSpec {
  symbol: string;
  nameId: string;
  nameEn: string;
  contractNoteId: string;
  contractNoteEn: string;
  unitLabelId: string;
  unitLabelEn: string;
  uscPerUnitPer001Lot: number; // Exact USC P&L per 1 unit move at 0.01 Cent Lot
  adrUnits: number; // Average Daily Range in native unit ($ or points or pips)
  spreadUnits: number; // Spread in native units ($ or points or pips)
  recommendedMaxLayers: number;
  sessionNoteId: string;
  sessionNoteEn: string;
  warningId?: string;
  warningEn?: string;
  isDangerTrap?: boolean;
}

export const MULTI_PAIR_CENT_SPECS: MultiPairInstrumentSpec[] = [
  {
    symbol: 'XAUUSDc',
    nameId: 'Emas Spot (Cent)',
    nameEn: 'Spot Gold (Cent)',
    contractNoteId: '1 Cent Lot = 1 troy oz (0.01 lot = 0.01 oz). Gerak $1.00 = 1.00 USC.',
    contractNoteEn: '1 Cent Lot = 1 troy oz (0.01 lot = 0.01 oz). $1.00 move = 1.00 USC.',
    unitLabelId: 'USD/oz',
    unitLabelEn: 'USD/oz',
    uscPerUnitPer001Lot: 1.0,
    adrUnits: 60.0,
    spreadUnits: 0.22,
    recommendedMaxLayers: 10,
    sessionNoteId: 'Optimal di London Open (14:00 WIB) & NY Overlap (19:00–23:30 WIB). Max aman: 8–10 layer @ 0.01.',
    sessionNoteEn: 'Prime liquidity during London (14:00 WIB) & NY Overlap (19:00–23:30 WIB). Safe cap: 8–10 layers @ 0.01.',
  },
  {
    symbol: 'XAGUSDc',
    nameId: 'Perak / Silver (JEBAKAN 50X!)',
    nameEn: 'Spot Silver (50X CONTRACT TRAP!)',
    contractNoteId: '1 Cent Lot = 50 oz (0.01 lot = 0.50 oz, 50X lebih berat dari Emas!). Gerak $0.10 = 5.00 USC.',
    contractNoteEn: '1 Cent Lot = 50 oz (0.01 lot = 0.50 oz, 50X heavier than Gold!). $0.10 move = 5.00 USC.',
    unitLabelId: 'USD/oz',
    unitLabelEn: 'USD/oz',
    uscPerUnitPer001Lot: 50.0,
    adrUnits: 2.0,
    spreadUnits: 0.025,
    recommendedMaxLayers: 2,
    sessionNoteId: 'Hanya boleh 2–3 layer @ 0.01! Pada 10 layer, gerak ADR $2.00 = -1,000 USC (100% Margin Call) & spread 12.50 USC.',
    sessionNoteEn: 'Strictly cap at 2–3 layers @ 0.01! On 10 layers, a normal $2.00 daily move = -1,000 USC Margin Call.',
    warningId:
      'BAHAYA KONTRAK 50X LIPAT: 0.01 Cent Lot XAGUSDc memikul 0.50 oz Perak. Biaya spread 10 layer = 12.50 USC (nyaris 6x lebih mahal dari Emas)!',
    warningEn:
      '50X CONTRACT TRAP: 0.01 Cent Lot Silver controls 0.50 oz. 10-layer spread alone burns 12.50 USC (~6x costlier than Gold)!',
    isDangerTrap: true,
  },
  {
    symbol: 'USTECc',
    nameId: 'Indeks Nasdaq-100 (Exness MT5)',
    nameEn: 'Nasdaq-100 Index (Exness MT5)',
    contractNoteId: '1 lot = 1 unit indeks (leverage 1:400). Gerak 1 poin = 0.01 USC per 0.01 lot.',
    contractNoteEn: '1 lot = 1 index contract (1:400 lev). 1 pt move = 0.01 USC per 0.01 lot.',
    unitLabelId: 'poin',
    unitLabelEn: 'pts',
    uscPerUnitPer001Lot: 0.01,
    adrUnits: 550,
    spreadUnits: 1.1,
    recommendedMaxLayers: 10,
    sessionNoteId: 'Spread super hemat (0.11 USC per 10 layer • 0.20% ADR) saat Wall Street 20:30/21:30 WIB. Karakter one-way momentum: dilarang counter-trend layering! Gunakan ORB & pyramiding + Hard SL. (Karakter serupa berlaku pada US30c Dow Jones).',
    sessionNoteEn: 'Ultra-low 0.11 USC spread cost across 10 layers (18.18x ADR cushion). Avoid counter-trend layering on Wall St opens (20:30/21:30 WIB); trade ORB with Hard SL.',
  },
  {
    symbol: 'GBPJPYc',
    nameId: 'Pound / Yen ("The Beast")',
    nameEn: 'GBP/JPY ("The Beast")',
    contractNoteId: 'Volatilitas silang sesi London. Pada 10 layer @ 0.01 lot, ketahanan ~9.90x ADR.',
    contractNoteEn: 'High-beta London cross. At 10 layers @ 0.01 lot, balance endures ~9.90x ADR.',
    unitLabelId: 'pips',
    unitLabelEn: 'pips',
    uscPerUnitPer001Lot: 0.0673,
    adrUnits: 150,
    spreadUnits: 2.2,
    recommendedMaxLayers: 8,
    sessionNoteId: 'Fokus pergerakan paling bersih di Sesi London (14:00–17:00 WIB) untuk mengikuti ekspansi tren.',
    sessionNoteEn: 'Cleanest institutional flow during London Open (14:00–17:00 WIB).',
  },
  {
    symbol: 'EURUSDc',
    nameId: 'Euro / Dolar AS',
    nameEn: 'EUR/USD Spot FX',
    contractNoteId: 'Pasangan paling likuid dunia: 0.01 Cent Lot = 0.10 USC per pip gerak.',
    contractNoteEn: 'World deepest FX pair: 0.01 Cent Lot = 0.10 USC per pip moved.',
    unitLabelId: 'pips',
    unitLabelEn: 'pips',
    uscPerUnitPer001Lot: 0.1,
    adrUnits: 75,
    spreadUnits: 1.0,
    recommendedMaxLayers: 10,
    sessionNoteId: 'Ketahanan sangat longgar mencapai 13.33x ADR pada 10 layer @ 0.01 Cent Lot, ideal bagi pemula berlatih presisi struktur.',
    sessionNoteEn: 'Exceptionally forgiving 13.33x ADR endurance across 10 layers, great training pair for beginners.',
  },
];

export interface WibSessionScheduleItem {
  id: string;
  startMinutesWib: number;
  endMinutesWib: number;
  windowWib: string;
  zoneBadgeId: string;
  zoneBadgeEn: string;
  tone: 'red' | 'amber' | 'green' | 'gold';
  spreadRange: string;
  focusPairs: string;
  ruleId: string;
  ruleEn: string;
}

export const WIB_24H_TIMELINE: WibSessionScheduleItem[] = [
  {
    id: 'rollover',
    startMinutesWib: 240, // 04:00
    endMinutesWib: 365, // 06:05
    windowWib: '04:00 – 06:05 WIB',
    zoneBadgeId: 'ZONA MERAH • Rollover & Daily Break',
    zoneBadgeEn: 'RED ZONE • Rollover & Bank Reset',
    tone: 'red',
    spreadRange: '50 – 150+ pts',
    focusPairs: 'Tutup Terminal (Stand Aside)',
    ruleId: 'Stop Level naik 100% dan likuiditas mengering. Dilarang membuka posisi atau layer baru!',
    ruleEn: 'Stop levels double while liquidity dries up. Strictly no new entries or grid additions!',
  },
  {
    id: 'asia',
    startMinutesWib: 420, // 07:00
    endMinutesWib: 810, // 13:30
    windowWib: '07:00 – 13:30 WIB',
    zoneBadgeId: 'ZONA KUNING • Sesi Asia / Tokyo',
    zoneBadgeEn: 'AMBER ZONE • Asian Range / Tokyo',
    tone: 'amber',
    spreadRange: '30 – 40 pts',
    focusPairs: 'USDJPYc & Tandai Asian Range XAUUSDc',
    ruleId: 'Tandai High & Low Sesi Asia sebagai kolam likuiditas BSL/SSL yang siap disapu saat London buka.',
    ruleEn: 'Mark Asian High & Low liquidity boundaries anticipating London Killzone sweeps.',
  },
  {
    id: 'london',
    startMinutesWib: 840, // 14:00
    endMinutesWib: 1110, // 18:30
    windowWib: '14:00 – 18:30 WIB',
    zoneBadgeId: 'ZONA HIJAU • Sesi London Open',
    zoneBadgeEn: 'GREEN ZONE • London Open Killzone',
    tone: 'green',
    spreadRange: '20 – 25 pts ($0.20–$0.25/oz)',
    focusPairs: 'XAUUSDc, GBPJPYc, EURUSDc',
    ruleId: 'Likuiditas bank Eropa mengalir deras dan spread mengetat. Ideal eksekusi Judas Swing & MSS + FVG.',
    ruleEn: 'Deep European order flow cuts spread tightly; prime window for Judas Sweeps and MSS + FVG entries.',
  },
  {
    id: 'overlap',
    startMinutesWib: 1140, // 19:00
    endMinutesWib: 1410, // 23:30
    windowWib: '19:00 – 23:30 WIB',
    zoneBadgeId: 'ZONA EMAS • Overlap London – New York',
    zoneBadgeEn: 'GOLDEN ZONE • London – NY Overlap',
    tone: 'gold',
    spreadRange: '16 – 20 pts ($0.16–$0.20/oz)',
    focusPairs: 'XAUUSDc, XAGUSDc, USTECc / US30c (Wall St 20:30/21:30)',
    ruleId: 'Spread harian terketat dan volume puncak dunia! Optimal untuk scalping presisi 0.01–0.02 Cent Lot.',
    ruleEn: 'Daily minimum spreads alongside peak global volume, optimal M1 execution window for 1,000 USC discipline.',
  },
  {
    id: 'news-hmr',
    startMinutesWib: 1170, // 19:30 / 20:30 highlight alert
    endMinutesWib: 1235,
    windowWib: '19:30 / 20:30 WIB',
    zoneBadgeId: 'ZONA MERAH BERITA • CPI / NFP / FOMC',
    zoneBadgeEn: 'RED NEWS SPIKE • CPI / NFP / FOMC',
    tone: 'red',
    spreadRange: '50 – 200+ pts + HMR 1:200',
    focusPairs: 'Semua Pair USD & XAUUSDc (15m sebelum – 5m sesudah)',
    ruleId: 'Aturan HMR memangkas leverage ke 1:200 otomatis selama 15 menit sebelum hingga 5 menit sesudah rilis berita. Jangan kejar candle detik ke-1!',
    ruleEn: 'High Margin Requirement (HMR) cuts leverage to 1:200 automatically 15m prior through 5m post release. Stand clear of instant slippage spikes!',
  },
];

export interface Mt5SetupStepItem {
  stepNum: string;
  titleId: string;
  titleEn: string;
  summaryId: string;
  summaryEn: string;
  checklistId: string[];
  checklistEn: string[];
  mockScreenTitle: string;
  mockScreenLines: string[];
}

export const MT5_SETUP_STEPS: Mt5SetupStepItem[] = [
  {
    stepNum: '01',
    titleId: 'Langkah 01: Daftar Personal Area Resmi (Tanpa Markup .p) & Verifikasi KTP/SIM',
    titleEn: 'Step 01: Register Official Personal Area & Verify ID',
    summaryId:
      'Buka situs resmi broker (Exness / RoboForex / XS) tanpa melalui tautan afiliasi bermarkup. Lengkapi verifikasi identitas KTP/SIM serta swafoto agar fitur penarikan berjalan otomatis.',
    summaryEn:
      'Open an official Personal Area directly on Exness, RoboForex, or XS without markup links and complete KYC verification for seamless withdrawals.',
    checklistId: [
      'Pastikan URL berada pada domain resmi broker.',
      'Unggah foto KTP/SIM yang terang tanpa pantulan cahaya.',
      'Catat PIN / keamanan 2FA di catatan pribadi offline.',
    ],
    checklistEn: [
      'Confirm the official broker HTTPS domain before typing credentials.',
      'Upload clear national ID photos with zero glare.',
      'Enable 2FA security on withdrawals.',
    ],
    mockScreenTitle: 'PERSONAL AREA // VERIFIED KYC',
    mockScreenLines: [
      'Status Identitas : TERVERIFIKASI (KTP)',
      'Status Domisili  : TERVERIFIKASI',
      'Akun Markup .p   : NONAKTIF (SPREAD BERSIH)',
    ],
  },
  {
    stepNum: '02',
    titleId: 'Langkah 02: Buat Akun "Standard Cent" (Exness/XS) atau "ProCent" di MT5',
    titleEn: 'Step 02: Open Standard Cent / ProCent on MT5',
    summaryId:
      'Masuk menu "Buka Akun Baru" -> pilih tipe Akun Cent berplatform MetaTrader 5 (MT5), atur mata uang akun persis ke USC (US Cent), dan catat 3 kredensial server.',
    summaryEn:
      'Click Open New Account -> pick MetaTrader 5 (MT5) Cent tier, set account currency strictly to USC (US Cent), and store your 3 server credentials.',
    checklistId: [
      'Platform: WAJIB pilih MetaTrader 5 (MT5).',
      'Mata Uang: Pilih USC (US Cent), bukan USD standar!',
      'Leverage: 1:1000 atau 1:2000 (atau 1:Unlimited sesuai syarat saldo).',
      'Catat Nomor Login MT5, Password Trading & Nama Server (mis: Exness-MT5Real14).',
    ],
    checklistEn: [
      'Platform: Select MetaTrader 5 (MT5).',
      'Currency: Set strictly to USC (US Cent), never USD Standard!',
      'Store MT5 Login ID, Trading Password & exact Server Name (e.g. Exness-MT5Real14).',
    ],
    mockScreenTitle: 'NEW ACCOUNT // MT5 CENT SPEC',
    mockScreenLines: [
      'Account Type  : Standard Cent (Real)',
      'Platform      : MetaTrader 5 (MT5)',
      'Currency      : USC (1 USD = 100 USC)',
      'MT5 Server    : Exness-MT5Real14',
      'Login ID      : 148092341',
    ],
  },
  {
    stepNum: '03',
    titleId: 'Langkah 03: Deposit $10 USD & Konversi Otomatis Menjadi 1.000 USC',
    titleEn: 'Step 03: Fund $10 USD -> Auto-Converts to 1,000 USC',
    summaryId:
      'Lakukan deposit belajar awal cukup $10 (~Rp160.000) via QRIS/Virtual Account/E-Wallet lokal resmi di dalam Personal Area. Saldo MT5 akan langsung terbaca 1.000 USC.',
    summaryEn:
      'Deposit an initial $10 learning amount inside the Personal Area. Your MT5 terminal balance immediately displays as 1,000.00 USC.',
    checklistId: [
      'Gunakan uang dingin belajar, cukup $10 saja.',
      'Pastikan tujuan transfer tepat masuk ke nomor akun Cent MT5.',
      'Verifikasi angka Balance berubah menjadi 1,000.00 USC.',
    ],
    checklistEn: [
      'Use strictly disposable tuition capital ($10 is plenty).',
      'Confirm destination ID matches your new USC MT5 account.',
      'Verify terminal Balance displays 1,000.00 USC.',
    ],
    mockScreenTitle: 'WALLET CONVERSION PREVIEW',
    mockScreenLines: [
      'Deposit Masuk  : $10.00 USD',
      'Kurs Konversi  : 1 USD = 100 USC',
      'MT5 Balance    : 1,000.00 USC',
      '1% Max Risk    : 10.00 USC / Setup',
    ],
  },
  {
    stepNum: '04',
    titleId: 'Langkah 04: Unduh Aplikasi MetaTrader 5 (MT5) & Login ke Server Broker',
    titleEn: 'Step 04: Install MT5 App & Connect Broker Server',
    summaryId:
      'Instal MetaTrader 5 resmi di HP/Laptop. Buka Settings / Manage Accounts -> ketuk tombol tanda tambah (+) -> ketik nama broker -> pilih Server persis sama -> masukkan Login ID & Password.',
    summaryEn:
      'Open Settings / Manage Accounts in official MetaTrader 5 -> tap (+) -> search broker name -> select the exact Server string -> sign in with Login ID & Trading Password.',
    checklistId: [
      'Buka Settings -> Manage Accounts -> ketuk tanda +.',
      'Ketik nama broker (mis. Exness Technologies / RoboForex) lalu pilih Server persis Langkah 02.',
      'Masukkan Login MT5 + Trading Password -> cek sinyal hijau terhubung.',
    ],
    checklistEn: [
      'Open Settings -> Manage Accounts -> tap (+).',
      'Search broker name and match the exact Server string from Step 02.',
      'Sign in using your MT5 Login ID + Trading Password.',
    ],
    mockScreenTitle: 'MT5 MOBILE // LOGIN EXISTING ACCOUNT',
    mockScreenLines: [
      'Broker  : Exness Technologies Ltd',
      'Server  : Exness-MT5Real14  [CONNECTED]',
      'Login   : 148092341',
      'Balance : 1,000.00 USC • 1:2000',
    ],
  },
  {
    stepNum: '05',
    titleId: 'Langkah 05: Tiga Setting Wajib di MT5 Sebelum Klik Buy/Sell',
    titleEn: 'Step 05: 3 Mandatory MT5 Pre-Flight Settings',
    summaryId:
      'Sebelum menekan tombol order pertama kali pada saldo 1.000 USC, wajib aktifkan ketiga pengaturan ini agar terhindar dari salah pilih simbol atau kaget terkena spread.',
    summaryEn:
      'Before placing your first trade on a 1,000 USC Cent Account, configure all three terminal settings to guarantee exact symbol & spread visibility.',
    checklistId: [
      'WAJIB 1: Tambahkan simbol berakhiran huruf "c" (XAUUSDc, USTECc, EURUSDc) di Market Watch, JANGAN klik simbol tanpa huruf "c" (atau pada RoboForex hindari akhiran ".p")!',
      'WAJIB 2: Aktifkan "Show Ask Price Line" di Chart Properties (F8 / Pengaturan Grafik) agar tahu persis jarak Ask saat posisi Sell menyentuh Take Profit.',
      'WAJIB 3: Munculkan Kolom "Spread" di jendela Market Watch (klik kanan -> Columns -> Spread) untuk memastikan tidak entry saat spread melebar.',
    ],
    checklistEn: [
      'SETTING 1: Add Cent-suffixed symbols ending in "c" (XAUUSDc, USTECc, EURUSDc) to Market Watch.',
      'SETTING 2: Enable "Show Ask Price Line" inside Chart Properties (F8) so SELL Take Profits stay transparent.',
      'SETTING 3: Display the real-time "Spread" column in Market Watch before pulling any trigger.',
    ],
    mockScreenTitle: 'MT5 MARKET WATCH // VERIFIED CONFIG',
    mockScreenLines: [
      'XAUUSDc  | Bid 2894.20 | Ask 2894.39 | Spd: 19',
      'USTECc   | Bid 21450.5 | Ask 21451.6 | Spd: 11',
      'EURUSDc  | Bid 1.08420 | Ask 1.08430 | Spd: 10',
      'Chart F8 : [x] Show Ask Line  | Lot: 0.01 Cent',
    ],
  },
];
