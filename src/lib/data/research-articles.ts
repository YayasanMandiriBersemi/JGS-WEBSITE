import type { Locale } from '@/i18n/config';

export interface ResearchSourceCitation {
  organization: string;
  title: string;
  publicationYear: string;
  url: string;
}

export interface ResearchArticle {
  slug: string;
  category: 'MARKET_MICROSTRUCTURE' | 'CONTRACT_SPECIFICATIONS' | 'RISK_SYSTEMS' | 'LIQUIDITY_CYCLES';
  categoryLabel: { id: string; en: string };
  publishedAt: string; // ISO YYYY-MM-DD
  lastReviewedAt: string; // ISO YYYY-MM-DD
  authorDesk: { id: string; en: string };
  readingMinutes: number;
  title: { id: string; en: string };
  summary: { id: string; en: string };
  keyTakeaways: { id: string[]; en: string[] };
  sections: {
    heading: { id: string; en: string };
    body: { id: string; en: string };
    technicalNote?: { id: string; en: string };
  }[];
  sources: ResearchSourceCitation[];
  relatedCalculatorHref: string;
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: 'global-fx-and-gold-session-liquidity-structure',
    category: 'LIQUIDITY_CYCLES',
    categoryLabel: {
      id: 'Siklus Likuiditas Global',
      en: 'Global Liquidity Cycles',
    },
    publishedAt: '2025-01-15',
    lastReviewedAt: '2025-02-10',
    authorDesk: {
      id: 'Meja Riset Struktur Pasar JGS Intelligence',
      en: 'JGS Intelligence Market Structure Desk',
    },
    readingMinutes: 9,
    title: {
      id: 'Distribusi Likuiditas Intraday pada Pasar Valuta Asing & Emas (XAUUSD)',
      en: 'Intraday Liquidity Distribution Across Foreign Exchange & Spot Gold (XAUUSD)',
    },
    summary: {
      id: 'Analisis berbasis data mengenai bagaimana perputaran volume antar pusat keuangan Tokyo, London, dan New York memengaruhi lebar spread, risiko slippage, dan efisiensi eksekusi ritel.',
      en: 'An evidence-based breakdown of how volume rotation across Tokyo, London, and New York financial centers shapes bid-ask spreads, slippage risk, and retail execution efficiency.',
    },
    keyTakeaways: {
      id: [
        'Volume transaksi valuta asing dan logam mulia terkonsentrasi secara signifikan pada jam tumpang tindih (overlap) sesi London dan New York (12:30–16:00 UTC).',
        'Pada jam pergantian hari server (rollover 21:00–22:30 UTC), likuiditas penyedia kuotasi menyusut sehingga spread efektif melebar dan berisiko memicu stop-loss yang terlalu rapat.',
        'Trader bermodal kecil harus memperhitungkan biaya spread sebagai persentase dari total jarak stop-loss sebelum membuka posisi.',
      ],
      en: [
        'Foreign exchange and spot precious metals turnover concentrates heavily during the London–New York session overlap (12:30–16:00 UTC).',
        'During the daily bank settlement rollover window (21:00–22:30 UTC), liquidity provider depth thins out, causing bid-ask spreads to widen and exposing tight stops.',
        'Micro-capital traders should evaluate spread cost as a percentage of total stop-loss distance prior to order execution.',
      ],
    },
    sections: [
      {
        heading: {
          id: '1. Mengapa Jam Perdagangan Menentukan Biaya Transaksi Anda',
          en: '1. Why Trading Hours Dictate Your Effective Transaction Cost',
        },
        body: {
          id: 'Meskipun pasar valuta asing dan spot emas beroperasi 24 jam sehari selama lima hari kerja, kedalaman buku order (order book depth) tidak pernah seragam sepanjang hari. Berdasarkan Survei Tiga Tahunan Bank for International Settlements (BIS), pusat keuangan di Inggris (London) dan Amerika Serikat (New York) menyumbang porsi terbesar dari perputaran transaksi global. Ketika kedua pusat ini aktif secara bersamaan, kompetisi kuotasi antar bank tier-1 umumnya menghasilkan spread bid-ask yang paling efisien di luar detik-detik rilis berita makroekonomi.',
          en: 'Although OTC foreign exchange and spot gold markets operate 24 hours a day across the five-day trading week, order book depth is far from uniform. According to the Bank for International Settlements (BIS) Triennial Central Bank Survey, trading desks in the United Kingdom (London) and the United States (New York) account for the largest share of global turnover. When both centers overlap, quote competition among liquidity providers typically produces the tightest baseline bid-ask spreads outside scheduled macroeconomic releases.',
        },
        technicalNote: {
          id: 'Rasio Biaya Spread terhadap Risiko = Lebar_Spread / Jarak_Stop_Loss. Jika spread adalah $0,30 dan stop-loss Anda $1,50, maka 20% anggaran risiko Anda langsung habis untuk membayar spread saat order dibuka.',
          en: 'Spread-to-Risk Ratio = Spread_Width / Stop_Loss_Distance. If the spread is $0.30 and your stop-loss is $1.50, 20% of your risk budget is consumed immediately upon entry.',
        },
      },
      {
        heading: {
          id: '2. Bahaya Eksekusi pada Jam Rollover Harian (21:00–22:30 UTC)',
          en: '2. Execution Hazards During the Daily Settlement Rollover (21:00–22:30 UTC)',
        },
        body: {
          id: 'Setiap hari pada penutupan sesi New York (sekitar pukul 17:00 waktu New York), bank dan agregator likuiditas melakukan proses penyelesaian harian (daily settlement/rollover) serta perhitungan biaya inap (swap). Pada rentang waktu ini, kuotasi sementara ditarik sehingga spread dapat melebar berkali-kali lipat dari kondisi normal. Posisi Sell (Short) sangat rentan terkena stop-out pada jam ini karena posisi Sell ditutup menggunakan harga Ask (Harga Bid + Spread).',
          en: 'Every trading day at the New York close (17:00 New York time), institutional liquidity providers perform daily settlement and swap accounting. During this transition window, resting liquidity temporarily withdraws and spreads can widen several multiples above normal session averages. Short positions are particularly vulnerable during rollover because a Short stop-loss triggers on the Ask price (Bid + Spread).',
        },
      },
    ],
    sources: [
      {
        organization: 'Bank for International Settlements (BIS)',
        title: 'Triennial Central Bank Survey of Foreign Exchange and Over-the-Counter (OTC) Derivatives Markets',
        publicationYear: '2022',
        url: 'https://www.bis.org/statistics/rpfx22.htm',
      },
      {
        organization: 'London Bullion Market Association (LBMA)',
        title: 'The Global Precious Metals OTC Market Guide & Clearing Statistics',
        publicationYear: '2024',
        url: 'https://www.lbma.org.uk/',
      },
    ],
    relatedCalculatorHref: '/calculators/position-size',
  },
  {
    slug: 'broker-contract-specifications-vs-account-denomination',
    category: 'CONTRACT_SPECIFICATIONS',
    categoryLabel: {
      id: 'Spesifikasi Kontrak & Broker',
      en: 'Contract & Broker Specifications',
    },
    publishedAt: '2025-01-28',
    lastReviewedAt: '2025-02-12',
    authorDesk: {
      id: 'Meja Riset Rekayasa Risiko JGS',
      en: 'JGS Risk Engineering Research Desk',
    },
    readingMinutes: 8,
    title: {
      id: 'Audit Spesifikasi Simbol MT5: Mengapa Denominasi Cent (USC) Berbeda dengan Ukuran Kontrak',
      en: 'Auditing MT5 Symbol Specifications: Why Cent Denomination (USC) Is Distinct From Contract Size',
    },
    summary: {
      id: 'Panduan teknis memeriksa parameter Contract Size, Tick Size, Tick Value, dan Volume Step di MetaTrader 5 agar trader modal mikro tidak salah menghitung eksposur lot.',
      en: 'A technical guide to inspecting Contract Size, Tick Size, Tick Value, and Volume Step inside MetaTrader 5 so micro-capital traders never miscalculate lot exposure.',
    },
    keyTakeaways: {
      id: [
        'Denominasi akun Cent (1 USD = 100 USC) hanya mengubah satuan tampilan saldo, ekuitas, dan margin di terminal.',
        'Ukuran kontrak (Contract Size), nilai tick (Tick Value), dan lot minimum ditetapkan per simbol oleh masing-masing broker, jangan pernah mengasumsikan semua akun Cent otomatis memperkecil kontrak 100 kali lipat.',
        'Jika risiko dari lot minimum broker melebihi batas risiko per transaksi Anda, posisi tersebut secara matematis harus ditolak.',
      ],
      en: [
        'Cent account denomination (1 USD = 100 USC) only changes the unit in which balance, equity, and margin are displayed.',
        'Contract Size, Tick Value, and Minimum Volume are defined per symbol by each individual broker, never assume every Cent account shrinks contract sizes by 100x.',
        'If the monetary risk generated by the broker’s minimum tradable lot exceeds your planned risk cap, the trade must be rejected.',
      ],
    },
    sections: [
      {
        heading: {
          id: '1. Membedakan Mata Uang Akun (Account Currency) dari Ukuran Kontrak (Contract Size)',
          en: '1. Separating Account Currency from Symbol Contract Size',
        },
        body: {
          id: 'Di dalam arsitektur MetaTrader 5, mata uang akun (`ACCOUNT_CURRENCY`) dan spesifikasi simbol (`SYMBOL_TRADE_CONTRACT_SIZE`) adalah dua variabel yang berdiri sendiri. Ketika Anda membuka akun Cent dengan saldo $50 USD, server broker mencatat saldo sebesar 5.000 USC. Namun, berapa besar uang yang dipertaruhkan pada 0,01 lot XAUUSD bergantung sepenuhnya pada spesifikasi simbol XAUUSD yang disediakan oleh broker tersebut. Sebagian broker menyediakan simbol khusus (misalnya `XAUUSDc` atau `XAUUSD.cent`) dengan ukuran kontrak 1 troy ons per 1,00 lot, sedangkan broker lain mungkin tetap menggunakan kontrak 100 troy ons per 1,00 lot meskipun saldonya dalam USC.',
          en: 'Within the MetaTrader 5 server architecture, account currency (`ACCOUNT_CURRENCY`) and symbol contract size (`SYMBOL_TRADE_CONTRACT_SIZE`) are independent parameters. When you fund a Cent account with $50 USD, the server displays 5,000 USC. However, the actual risk of a 0.01 lot XAUUSD order depends entirely on the symbol specification configured by that broker. Some brokers offer dedicated micro-contract symbols (e.g., `XAUUSDc` at 1 troy oz per 1.00 lot), whereas others retain the full 100 troy oz contract size even on USC-denominated accounts.',
        },
        technicalNote: {
          id: 'Cara memeriksa di MT5: Klik kanan simbol di jendela Market Watch -> pilih "Specification" -> periksa baris "Contract size", "Tick size", "Tick value", "Minimal volume", dan "Volume step".',
          en: 'How to verify in MT5: Right-click the symbol in Market Watch -> select "Specification" -> inspect "Contract size", "Tick size", "Tick value", "Minimal volume", and "Volume step".',
        },
      },
      {
        heading: {
          id: '2. Rumus Universal Penentuan Ukuran Posisi Berbasis Spesifikasi Broker',
          en: '2. Universal Broker-Specification Position Sizing Formula',
        },
        body: {
          id: 'Agar perhitungan selalu akurat di semua broker, jangan gunakan angka perkiraan tetap. Hitunglah jumlah tick pada jarak stop-loss Anda (`Jarak_Stop / Ukuran_Tick`), kalikan dengan `Nilai_Tick_Per_Lot` untuk mengetahui risiko per 1,00 lot, lalu bagi anggaran risiko Anda dengan angka tersebut. Terakhir, bulatkan ke bawah mengikuti `Volume_Step` dan periksa apakah hasilnya memenuhi `Minimal_Volume`.',
          en: 'To maintain accuracy across any broker, avoid hardcoded pip values. Calculate the number of ticks in your stop distance (`Stop_Distance / Tick_Size`), multiply by `Tick_Value_Per_Lot` to obtain the monetary risk per 1.00 lot, and divide your risk budget by that figure. Finally, floor the volume to the broker’s `Volume_Step` and verify that it meets `Minimal_Volume`.',
        },
      },
    ],
    sources: [
      {
        organization: 'MetaQuotes Software Corp.',
        title: 'MQL5 Reference: Environment State & Symbol Properties (SYMBOL_TRADE_CONTRACT_SIZE, SYMBOL_TRADE_TICK_VALUE)',
        publicationYear: '2024',
        url: 'https://www.mql5.com/en/docs/constants/environment_state/marketinfoconstants',
      },
      {
        organization: 'CME Group',
        title: 'COMEX Gold Futures & Micro Gold Contract Specifications',
        publicationYear: '2024',
        url: 'https://www.cmegroup.com/markets/metals/precious/gold.contractSpecs.html',
      },
    ],
    relatedCalculatorHref: '/calculators/cent',
  },
  {
    slug: 'quantitative-drawdown-mechanics-and-high-water-mark',
    category: 'RISK_SYSTEMS',
    categoryLabel: {
      id: 'Sistem Risiko & Audit Kuantitatif',
      en: 'Risk Systems & Quantitative Auditing',
    },
    publishedAt: '2025-02-02',
    lastReviewedAt: '2025-02-14',
    authorDesk: {
      id: 'Meja Riset Kuantitatif JGS Quant Lab',
      en: 'JGS Quant Lab Quantitative Research Desk',
    },
    readingMinutes: 10,
    title: {
      id: 'Matematika Asimetri Drawdown, Ekspektasi Sistem, dan Mekanisme High-Water Mark (HWM)',
      en: 'Drawdown Asymmetry Mathematics, System Expectancy, and High-Water Mark (HWM) Mechanics',
    },
    summary: {
      id: 'Kajian matematis mengenai mengapa pengendalian drawdown maksimum lebih krusial daripada mengejar win rate tinggi, serta cara kerja perlindungan High-Water Mark pada model bagi hasil.',
      en: 'A mathematical examination of why bounding maximum equity drawdown matters more than chasing high win rates, and how High-Water Mark accounting protects followers in performance-fee models.',
    },
    keyTakeaways: {
      id: [
        'Pemulihan dari kerugian bersifat hiperbolik: penurunan ekuitas 50% membutuhkan keuntungan +100% pada sisa modal hanya untuk kembali ke titik impas.',
        'Dalam evaluasi strategi maupun copy trading, kurva Equity (yang mencakup posisi mengambang) wajib diperiksa berdampingan dengan kurva Balance.',
        'Prinsip High-Water Mark (HWM) memastikan biaya kinerja hanya dikenakan pada rekor keuntungan bersih tertinggi yang baru, bukan pada pemulihan dari drawdown.',
      ],
      en: [
        'Drawdown recovery is hyperbolic: a 50% equity decline requires a +100% return on remaining capital merely to restore break-even.',
        'When auditing any trading strategy or copy-trading system, the Equity curve (which includes open floating positions) must be inspected alongside closed Balance.',
        'High-Water Mark (HWM) accounting ensures performance fees apply strictly to net new profit highs, never charging twice during drawdown recovery.',
      ],
    },
    sections: [
      {
        heading: {
          id: '1. Mengapa Win Rate Tanpa Rasio Risk-to-Reward Bisa Menyesatkan',
          en: '1. Why Win Rate Without Risk-to-Reward Asymmetry Is Misleading',
        },
        body: {
          id: 'Banyak materi pemasaran ritel menonjolkan klaim win rate di atas 85% tanpa menyebutkan rata-rata kerugian saat satu posisi kalah. Jika sebuah sistem menghasilkan +10 USC pada 9 transaksi menang (+90 USC), tetapi menahan satu posisi rugi tanpa stop-loss hingga -150 USC, maka ekspektasi bersihnya tetap negatif (-60 USC) meskipun win rate-nya 90%. Oleh sebab itu, Profit Factor, Maximum Equity Drawdown, dan rasio rata-rata kemenangan terhadap rata-rata kekalahan harus selalu dianalisis bersama.',
          en: 'Retail marketing frequently highlights win rates above 85% without disclosing the average loss magnitude when a trade fails. If a system earns +10 USC across 9 winning trades (+90 USC) but holds a single unhedged loser to -150 USC, net expectancy is negative (-60 USC) despite a 90% win rate. Consequently, Profit Factor, Maximum Equity Drawdown, and the payoff ratio must always be evaluated together.',
        },
        technicalNote: {
          id: 'Rumus Pemulihan Drawdown: Persentase_Pulih = ((1 / (1 - Drawdown_Desimal)) - 1) × 100%.',
          en: 'Drawdown Recovery Formula: Required_Gain_% = ((1 / (1 - Drawdown_Decimal)) - 1) × 100%.',
        },
      },
      {
        heading: {
          id: '2. Cara Kerja High-Water Mark (HWM) dalam Standar Industri Pengelolaan Dana',
          en: '2. How High-Water Mark (HWM) Accounting Works in Performance-Fee Structures',
        },
        body: {
          id: 'Dalam standar industri manajemen investasi dan copy trading berbasis kinerja, High-Water Mark (HWM) adalah puncak nilai bersih tertinggi yang pernah dicapai oleh akun setelah dikurangi biaya. Jika ekuitas akun turun di bawah puncak HWM akibat drawdown, penyedia strategi tidak berhak memungut biaya kinerja pada periode berikutnya sampai seluruh kerugian tersebut pulih sepenuhnya dan ekuitas mencetak rekor bersih baru di atas HWM.',
          en: 'In institutional asset management and performance-based copy trading, the High-Water Mark (HWM) represents the highest net equity peak an account has achieved. If account equity drops below the HWM during a drawdown period, no performance fee is charged on subsequent gains until the drawdown is completely recovered and net equity surpasses the previous HWM peak.',
        },
      },
    ],
    sources: [
      {
        organization: 'CFA Institute',
        title: 'Global Investment Performance Standards (GIPS) & High-Water Mark Fee Methodology',
        publicationYear: '2023',
        url: 'https://www.cfainstitute.org/en/ethics-standards/codes/gips-standards',
      },
      {
        organization: 'Journal of Portfolio Management',
        title: 'The Statistics of Drawdowns and Recovery Time in Quantitative Trading Systems',
        publicationYear: '2021',
        url: 'https://www.pm-research.com/content/iijpormgmt',
      },
    ],
    relatedCalculatorHref: '/copy-trading',
  },
];
