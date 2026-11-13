export type SandboxKind =
  | 'INFLATION_DECAY'
  | 'ASSET_CLASSES'
  | 'FED_INTERMARKET'
  | 'ORDERBOOK_SPREAD'
  | 'DRAWDOWN_CURVE'
  | 'WYCKOFF_AUCTION'
  | 'ICT_PIPELINE'
  | 'QUANT_MONTE_CARLO';

export interface DiagramHotspotPin {
  num: 1 | 2 | 3 | 4;
  xPct: number;
  yPct: number;
  labelId: string;
  labelEn: string;
  institutionalId: string;
  institutionalEn: string;
  retailTrapId: string;
  retailTrapEn: string;
  jgsActionId: string;
  jgsActionEn: string;
}

export interface ChartDetectivePuzzle {
  scenarioId: string;
  scenarioEn: string;
  optionsId: [string, string, string];
  optionsEn: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanationId: string;
  explanationEn: string;
}

export interface ModuleDeepMonograph {
  slug: string;
  photoUrl: string;
  photoCaptionId: string;
  photoCaptionEn: string;
  sandboxKind: SandboxKind;
  sec2InstitutionalId: string[];
  sec2InstitutionalEn: string[];
  anatomyRowsId: [string, string, string][];
  anatomyRowsEn: [string, string, string][];
  sec4QuantId: string[];
  sec4QuantEn: string[];
  sec4FormulaId: string;
  sec4FormulaEn: string;
  hotspots: [DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin];
  detective: ChartDetectivePuzzle;
  essayGuidanceHintsId: [string, string, string];
  essayGuidanceHintsEn: [string, string, string];
}

const PHOTOS = {
  GOLD_VAULT: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
  TICKER_TERMINAL: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  BANK_DISTRICTS: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  USD_RESERVE: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
  DEALING_DESK: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
  MACRO_ANALYTICS: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  CANDLE_SCREEN: 'https://images.unsplash.com/photo-1642543348745-03b1219733d9?auto=format&fit=crop&w=1200&q=80',
  RISK_LEDGER: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
  EXCHANGE_FLOOR: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80',
  STAT_RESEARCH: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
  MARKET_CLOCK: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
  QUANT_SERVERS: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  AUDIT_WORKSPACE: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  GLOBAL_TIMEZONE: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=1200&q=80',
};

function makeHotspots(
  labelsId: [string, string, string, string],
  instId: [string, string, string, string],
  trapId: [string, string, string, string],
  actId: [string, string, string, string]
): [DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin] {
  const coords: [number, number][] = [
    [16, 26],
    [41, 68],
    [66, 30],
    [86, 62],
  ];
  return [0, 1, 2, 3].map((i) => ({
    num: (i + 1) as 1 | 2 | 3 | 4,
    xPct: coords[i][0],
    yPct: coords[i][1],
    labelId: labelsId[i],
    labelEn: labelsId[i],
    institutionalId: instId[i],
    institutionalEn: instId[i],
    retailTrapId: trapId[i],
    retailTrapEn: trapId[i],
    jgsActionId: actId[i],
    jgsActionEn: actId[i],
  })) as [DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin, DiagramHotspotPin];
}

export const MONOGRAPHS_PART_1: Record<string, ModuleDeepMonograph> = {
  // =========================================================================
  // SEMESTER 01 (FIN-101)
  // =========================================================================
  'money-history-and-inflation': {
    slug: 'money-history-and-inflation',
    photoUrl: PHOTOS.GOLD_VAULT,
    photoCaptionId: 'Dokumentasi Emas Batangan Cadangan Bank Sentral, Jangkar nilai sebelum pelepasan Sistem Bretton Woods pada 15 Agustus 1971.',
    photoCaptionEn: 'Central Bank Gold Bullion Vaults, Hard reserve backing prior to the 1971 closing of the Bretton Woods window.',
    sandboxKind: 'INFLATION_DECAY',
    sec2InstitutionalId: [
      'Di tingkat bank sentral dan perbendaharaan negara (Treasury Desk), penciptaan uang modern bekerja melalui dua jalur terpisah: basis moneter (Bank Reserves) yang dicetak bank sentral, serta uang giral kredit (Broad Money M2) yang diperluas bank komersial lewat pemberian pinjaman berbasis cadangan fraksional. Ketika ekspansi kredit melebihi pertumbuhan produktivitas barang nyata, terlalu banyak unit mata uang mengejar volume barang yang stagnan, memicu depresiasi daya beli yang disebut inflasi.',
      'Pasca penutupan jendela penukaran emas Bretton Woods pada tahun 1971 (era Nixon Shock), tidak ada lagi jangkar fisik seberat 31,1 gram per $35 yang membatasi pencetakan dolar atau rupiah. Setiap mata uang nasional berubah menjadi kewajiban kepercayaan tanpa jaminan logam (Pure Fiat), sehingga manajer kekayaan institusional mengukurnya bukan dari nominal rekening, melainkan Imbal Hasil Riil (r) = Suku Bunga Nominal (i) minus Laju Inflasi (π).',
      'Implikasi langsung bagi struktur aset global sangat jelas: aset langka berpasokan inelastis seperti Emas Spot (XAUUSD) maupun properti produktif secara historis mengalami revaluasi naik jangka panjang terhadap mata uang kertas. Itulah sebabnya memahami mekanisme uang fiat adalah syarat logis pertama sebelum menyentuh satu tombol pun di terminal trading.',
    ],
    sec2InstitutionalEn: [
      'Institutional treasuries distinguish sharply between bank reserves created by central banks and broad credit expansion (M2 velocity). Once post-1971 fiat currency floated without $35/oz gold convertibility, purchasing power became governed cleanly by the Fisher Real Return relationship.',
      'Consequently, scarcity-constrained hard assets such as Spot Gold (XAUUSD) continuously reprice upward against long-term fiat supply growth, turning financial literacy into essential purchasing-power defense.',
    ],
    anatomyRowsId: [
      ['Mengira angka saldo Rp10 juta di ATM berarti nilai riilnya utuh.', 'Treasury mengukur Imbal Hasil Riil setelah dipotong laju inflasi CPI tahunan.', 'Pisahkan dana hidup di bank; latih literasi aset hanya dengan $10 (1.000 USC) terisolasi.'],
      ['Menganggap inflasi hanya isu belanja dapur tanpa kaitan ke grafik XAUUSD.', 'Penurunan daya beli fiat jangka panjang mendorong revaluasi struktural harga emas.', 'Gunakan chart bulanan XAUUSD di Lab 600px untuk mengamati kenaikan harga sejak 1971.'],
      ['Masuk pasar finansial tergiur janji cepat kaya menutupi gaji yang tergerus.', 'Dana institusi menjaga modal lewat rasio return terukur terhadap volatilitas inflasi.', 'Targetkan kurva belajar konsisten 1% risiko per setup, bukan tebak-tebakan jackpot.'],
    ],
    anatomyRowsEn: [
      ['Assuming unchanged nominal cash keeps full value.', 'Desks discount every nominal return by annual CPI inflation.', 'Isolate $10 (1,000 USC) tuition capital completely away from emergency cash.'],
      ['Ignoring gold repricing history post-1971.', 'Hard-asset bullion tracks cumulative monetary base growth.', 'Inspect multi-decade Monthly XAUUSD expansion inside TradingView 600px Lab.'],
      ['Chasing unrealistic monthly ROI to beat living costs.', 'Institutions pair inflation protection with bounded downside caps.', 'Execute micro 1% risk caps instead of emotional speculation.'],
    ],
    sec4QuantId: [
      'Mari menguji hitungan Persamaan Fisher secara konkret pada kasus penabung pemula versus alokasi laboratorium mikro JGS. Bayangkan seorang karyawan menyimpan Rp20.000.000 pada rekening tabungan berbunga bersih 1,0% per tahun, sementara inflasi tahunan keranjang konsumsi berada di level 5,5%. Dalam satu tahun kalender, nominal saldo bertumbuh menjadi Rp20.200.000, namun daya beli riil terhadap barang berkurang -4,5% atau hilang sekitar Rp900.000 per tahun secara senyap.',
      'Dalam rentang 5 tahun majemuk tanpa penyesuaian alokasi, selisih bunga bersih -4,5% mengikis kekuatan belanja Rp20 juta menjadi setara ~Rp15,92 juta hari ini. Menyadari hal ini sering membuat pemula panik lalu menyetor seluruh tabungan ke instrumen spekulatif berisiko 100%, sebuah kesalahan fatal dari ekstrem pasif ke ekstrem ceroboh.',
      'Standar JGS Academy mengambil jalur tengah yang terkalibrasi secara kuantitatif: simpan 99% dana kehidupan secara aman sambil mengambil dana belajar mikro $10 USD (~Rp160.000) untuk dikonversi menjadi 1.000 USC. Dengan membatasi risiko riset maksimal 10 USC (1% / Rp1.600) pada 0,02 Cent lot, biaya eksperimen belajarmu sepenuhnya terkunci.',
    ],
    sec4QuantEn: [
      'Quantifying the Fisher Rule on Rp20M yielding 1.0% net amidst 5.5% CPI inflation shows an invisible -4.5% annual erosion, compounding to roughly 20% purchasing power decay over five quiet years.',
      'Rather than jumping recklessly with rent money, JGS allocates strictly $10 USD converted into 1,000 USC (10 USC risk per experiment) as structured market tuition.',
    ],
    sec4FormulaId: 'Imbal Hasil Riil (r) = Suku Bunga Nominal (i) − Laju Inflasi (π)  |  Contoh: 1,0% − 5,5% = −4,5% per tahun',
    sec4FormulaEn: 'Real Return (r) = Nominal Yield (i) − CPI Inflation (π)  |  Example: 1.0% − 5.5% = −4.5% annual loss',
    hotspots: makeHotspots(
      ['Jangkar Emas Bretton Woods 1944', 'Pemutusan Emas Nixon Shock 1971', 'Erosi Tabungan Pasif vs CPI', 'Isolasi Dana Riset 1.000 USC'],
      ['44 negara mengikat Dolar ke 1 oz emas ($35/oz) guna menjaga stabilitas kurs global.', 'Tanpa jaminan emas fisik, ekspansi uang fiat ditentukan murni oleh kebijakan bank sentral.', 'Tabungan di bawah laju CPI mengalami pertumbuhan negatif meski saldo nominal naik tipis.', 'Mengalokasikan $10 ke akun Cent memisahkan edukasi pasar dari dana kebutuhan hidup.'],
      ['Mengira nilai uang kertas modern selalu sama kuat dari masa ke masa.', 'Tidak memahami mengapa harga XAUUSD naik dari $35 menuju ribuan dolar.', 'Tergoda investasi bodong bunga tetap 20%/bulan karena takut inflasi.', 'Mentransfer uang belanja bulanan ke broker tanpa batas risiko.'],
      ['Bandingkan imbal hasil riil sebelum memilih instrumen penyimpanan kekayaan.', 'Amati chart Monthly XAUUSD untuk membuktikan revaluasi komoditas pasca-1971.', 'Hitung perubahan daya beli riil dengan Persamaan Fisher setiap tahun.', 'Batasi dana praktik awal maksimal $10 = 1.000 USC dengan 1% risiko.']
    ),
    detective: {
      scenarioId: 'Seorang mahasiswa menaruh seluruh dana darurat Rp15 juta ke akun Standar Forex demi "melawan inflasi 6%" karena merasa bunga bank 1% terlalu lambat. Apa cacat logika utamanya?',
      scenarioEn: 'A student puts their entire Rp15M emergency fund into a Standard FX account "to beat 6% inflation." Spot the core structural flaw:',
      optionsId: [
        'Menggabungkan dana darurat kehidupan ke dalam instrumen leveraged tanpa mengerti risiko kontrak.',
        'Memilih inflasi 6% sebagai angka acuan tahunan.',
        'Menghitung bunga tabungan bank sebesar 1% per tahun.',
      ],
      optionsEn: [
        'Deploying irreplaceable emergency cash into leveraged speculation without position sizing.',
        'Using 6% as a CPI reference rate.',
        'Checking a 1% net bank yield.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Pendidikan pasar finansial harus melindungi dana kebutuhan hidup terlebih dahulu; praktik leverage cukup memakai dana terisolasi mikro 1.000 USC.',
      explanationEn: 'Spot on! Protect essential reserves first and restrict market training to strictly bounded micro capital.',
    },
    essayGuidanceHintsId: [
      'Jelaskan hubungan kausal antara pelepasan Standar Emas tahun 1971 (Uang Fiat) dengan erosi daya beli inflasi.',
      'Sertakan konsep Imbal Hasil Riil dibanding suku bunga tabungan nominal.',
      'Mengapa $10 (1.000 USC) dengan batas risiko 1% adalah alternatif belajar yang rasional dibanding mempertaruhkan tabungan hidup?',
    ],
    essayGuidanceHintsEn: [
      'Explain how post-1971 Fiat dynamics interact with CPI purchasing power erosion.',
      'Compare nominal savings yields cleanly against Real Returns.',
      'Conclude why isolating $10 (1,000 USC) at 1% risk protects real household wealth.',
    ],
  },

  'what-is-forex-and-gold-trading': {
    slug: 'what-is-forex-and-gold-trading',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Terminal Multi-Aset Institusi, Memantau lintas pasangan Forex (EURUSD), Komoditas Emas (XAUUSD), dan Indeks Saham Nasdaq.',
    photoCaptionEn: 'Multi-Asset Trading Desk, Monitoring Spot FX pairs, XAUUSD Gold bullion contracts, and US Equity Indices simultaneously.',
    sandboxKind: 'ASSET_CLASSES',
    sec2InstitutionalId: [
      'Setiap kelas aset di pasar finansial global beroperasi di atas infrastruktur penyelesaian (Clearing House) dan spesifikasi kontrak yang berbeda. Pasar Forex spot tidak memiliki gedung bursa tunggal, ia merupakan jaringan OTC (Over-the-Counter) antarbank 24 jam yang menyelesaikan transaksi harian melampaui $7,5 triliun lewat sistem CLS (Continuous Linked Settlement) dengan pasangan utama seperti EURUSD.',
      'Sementara itu, Komoditas Emas Dunia (XAUUSD) dipatok berdasarkan patokan LBMA London dalam satuan 1 troy ounce (31,1035 gram) terhadap Dolar AS, sedangkan Indeks Saham seperti USTEC (Nasdaq 100) serta SPX500 (S&P 500) mencerminkan kapitalisasi gabungan emiten Bursa NYSE dan Nasdaq. Di tingkat ritel MT5, aset tersebut dipaketkan ke dalam kontrak CFD (Contract for Difference) dua arah tanpa kewajiban menyimpan batang emas fisik di rumah.',
      'Membedakan nilai setiap tik (Tick Value) antar kelas aset merupakan keterampilan teknis vital di meja eksekusi: satu poin pergerakan EURUSD tidak sama nilai dolarnya dengan satu dolar pergerakan harga per ounce emas di XAUUSD maupun satu poin pergerakan indeks Nasdaq.',
    ],
    sec2InstitutionalEn: [
      'Global finance divides execution infrastructure across OTC interbank CLS Foreign Exchange clearing ($7.5T daily), LBMA Spot Gold pricing (per 31.1035g troy oz), exchange-listed Equity Indices (S&P 500, Nasdaq 100), and CFD/Futures derivatives.',
      'Professional desks calculate exact tick values independently per asset class before pressing Buy or Sell, never assuming 0.01 lot carries uniform volatility across EURUSD, XAUUSD, and USTEC.',
    ],
    anatomyRowsId: [
      ['Menganggap simbol EURUSD, XAUUSD, dan BTCUSD memiliki gerak & biaya lot identik.', 'Setiap kelas aset memiliki jam puncak likuiditas, volatilitas harian (ATR), dan Tick Value berlainan.', 'Fokuskan latihan awal hanya pada 1 simbol berlikuiditas tinggi (XAUUSDc 1 oz) sebelum melebar.'],
      ['Mengira harga XAUUSD bergerak acak terpisah dari pasar komoditas fisik.', 'Kontrak spot/CFD XAUUSD mengacu ketat ke patokan 1 troy ounce emas fisik LBMA London.', 'Gunakan konversi 1 Cent lot = 1 oz sehingga nilai $1 gerak emas selalu terukur tepat 100 USC.'],
      ['Membuka banyak instrumen (EURUSD + Gold + Nasdaq) bersamaan dalam satu waktu.', 'Korelasi USD menyebabkan tiga posisi berlawanan dolar justru melipatgandakan risiko 3x lipat!', 'Kunci total risiko aktif maksimal 1 setup x 1% (10 USC) tanpa menumpuk pasangan USD serentak.'],
    ],
    anatomyRowsEn: [
      ['Assuming EURUSD, XAUUSD, and USTEC move identically per 0.01 lot.', 'Tick size, daily ATR range, and session catalysts vary drastically across asset pillars.', 'Master 1 instrument thoroughly (XAUUSDc) before diversifying tickers.'],
      ['Thinking CFDs require taking physical bar delivery.', 'Spot CFDs mirror price movement two-way without metal vaulting logistics.', 'Verify 1 oz XAUUSDc contract weight vs 100 oz Standard units upfront.'],
      ['Stacking correlated USD trades simultaneously.', 'Opening EURUSD Buy alongside XAUUSD Buy doubles single-factor USD risk.', 'Isolate risk exposure cleanly at 1% (10 USC) across active uncorrelated sessions.'],
    ],
    sec4QuantId: [
      'Mari membandingkan beban finansial lintas tiga instrumen populer pada akun Cent $10 (1.000 USC). Pada XAUUSDc dengan spesifikasi kontrak 1 troy ounce per 1.00 lot, pergerakan harga emas sebesar $5,00 dengan ukuran 0,02 lot menghasilkan perubahan saldo tepat 0,02 × $5,00 × 100 USC = 10 USC (1% ekuitas).',
      'Bandingkan jika kamu membuka instrumen Indeks Saham teknologi tanpa memeriksa Contract Size, atau membuka kontrak EURUSD dengan jarak SL 25 pips: di EURUSD Cent (1.000 unit per 1.00 Cent lot atau bervariasi per broker hingga 100.000 unit cent), nilai per pip berbeda jauh dengan emas sehingga mengecek jendela Specification di MT5 adalah kewajiban mutlak sebelum klik Order.',
      'Kesalahan klasik pemula ialah membuka posisi Buy EURUSD sekaligus Buy XAUUSD dengan masing-masing risiko 1%. Ketika Dolar AS tiba-tiba menguat akibat data NFP, kedua posisi tersebut rontok serentak dan menggandakan kerugian riil menjadi -20 USC (-2%) karena keduanya memiliki faktor penyebut Dolar AS (USD).',
    ],
    sec4QuantEn: [
      'On 1,000 USC equity, 0.02 lot XAUUSDc (1 oz Spec) loses strictly 10 USC (1%) across a $5.00 stop loss, whereas checking contract multipliers independently prevents surprise leverage shocks on FX or Nasdaq tickers.',
      'Crucially, holding parallel USD-denominated long positions doubles concentrated macro factor exposure simultaneously.',
    ],
    sec4FormulaId: 'Eksposur Terpadu = Jumlah Posisi Searah USD × Risiko Individu  |  XAUUSDc (1 oz): 0,02 lot × SL $5 = 10 USC (1%)',
    sec4FormulaEn: 'Aggregate USD Risk = Correlated Positions × Unit Risk  |  1 oz XAUUSDc: 0.02 lot × $5 SL = 10 USC (1%)',
    hotspots: makeHotspots(
      ['Pasar Valas OTC ($7,5T/Hari)', 'Komoditas Spot Emas (1 Troy Oz)', 'Indeks Saham Kapitalisasi Besar', 'Kontrak CFD Dua Arah di MT5'],
      ['Transaksi valuta asing antarbank berlangsung 24 jam dari Sydney ke New York.', 'Harga XAUUSD mencerminkan harga 31,1 gram emas murni dalam Dolar AS.', 'Nasdaq & S&P 500 mengukur kinerja kumpulan ratusan perusahaan raksasa.', 'CFD memungkinkan analisa tren naik maupun turun tanpa penyimpanan fisik aset.'],
      ['Masuk ke semua pasangan mata uang secara acak sepanjang hari.', 'Salah membaca kontrak 100 oz Standar untuk modal $10.', 'Mentradingkan indeks saham volatilitas ekstrem di jam pembukaan NYSE.', 'Menahan posisi CFD ber-leverage tinggi tanpa Hard Stop Loss.'],
      ['Pilih satu instrumen utama selama fase pembelajaran awal.', 'Pastikan memilih akhiran simbol Cent (XAUUSDc) di Market Watch MT5.', 'Cek tab Specification untuk memastikan ukuran kontrak & jam pasar.', 'Kunci risiko tetap 1% (10 USC) sebelum menyentuh tombol eksekusi.']
    ),
    detective: {
      scenarioId: 'Seorang trader modal 1.000 USC membuka posisi BUY EURUSD risiko 1% DAN posisi BUY XAUUSDc risiko 1% di menit yang sama. Mengapa portofolionya sebenarnya sedang mengambil risiko 2% tersembunyi?',
      scenarioEn: 'A 1,000 USC trader opens simultaneous 1% BUY setups on EURUSD and XAUUSDc. Why does this create hidden 2% correlated risk?',
      optionsId: [
        'Keduanya mengandalkan pelemahan Dolar AS (USD sebagai penyebut), saat USD menguat, keduanya rugi serentak.',
        'Karena komisi broker langsung berlipat sepuluh kali lipat.',
        'Karena EURUSD dan XAUUSDc hanya buka pada hari Minggu malam.',
      ],
      optionsEn: [
        'Both trades short the US Dollar simultaneously; any sudden USD rally sweeps both stops together.',
        'Broker swap triples instantaneously.',
        'Both markets open only on weekends.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! EURUSD dan XAUUSD sama-sama berlawanan arah dengan indeks USD (DXY), sehingga menumpuknya sama dengan menggandakan risiko pada satu sentimen makro yang sama.',
      explanationEn: 'Exactly right! Parallel positions against USD share single-factor macro exposure.',
    },
    essayGuidanceHintsId: [
      'Bedakan karakteristik struktural antara Forex, Komoditas Emas (XAUUSD), Indeks Saham, dan kontrak CFD.',
      'Jelaskan bahaya korelasi searah USD bila membuka beberapa pasangan aset sekaligus.',
      'Bagaimana cara memverifikasi spesifikasi kontrak sebelum memasang risiko 1% (10 USC) di MT5?',
    ],
    essayGuidanceHintsEn: [
      'Contrast structural clearing characteristics across FX, XAUUSD Commodities, Equities, and CFDs.',
      'Explain how simultaneous USD correlation silently doubles risk exposure.',
      'Describe checking Contract Specifications before sizing a 10 USC trade.',
    ],
  },

  'global-market-participants-ecosystem': {
    slug: 'global-market-participants-ecosystem',
    photoUrl: PHOTOS.BANK_DISTRICTS,
    photoCaptionId: 'Distrik Finansial Global, Tempat Bank Sentral, Bank Tier-1, dan manajer aset institusional mengarahkan arus likuiditas dunia.',
    photoCaptionEn: 'Global Financial Hub, Sovereign central banks, Tier-1 liquidity dealers, and pension funds routing institutional order flow.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Memahami grafik harga menuntut pemahaman tentang siapa sebenarnya yang memiliki tenaga menggerakkan harga ribuan poin. Di puncak piramida berdiri Bank Sentral (The Fed, ECB, BoJ, Bank Indonesia) yang tidak mengejar profit harian, melainkan menjaga mandat stabilitas inflasi, lapangan kerja, dan kurs nasional melalui operasi pasar terbuka serta suku bunga acuan.',
      'Tepat di bawahnya beroperasi jajaran Bank Tier-1 (JPMorgan Chase, Citigroup, UBS, Deutsche Bank, HSBC) yang menjadi Pembuat Pasar Utama (Primary Liquidity Providers). Mereka mengeksekusi aliran valuta untuk korporasi raksasa multinasional seperti Apple atau Toyota yang wajib menukar miliaran dolar hasil ekspor tanpa memperdulikan garis indikator RSI ritel.',
      'Sementara itu, kelompok Hedge Funds spekulatif dan Dana Pensiun raksasa (BlackRock, Citadel) membutuhkan likuiditas besar untuk masuk keluar pasar. Karena order mereka raksasa, mereka terpaksa menunggu zona di mana banyak trader ritel menaruh pesanan berlawanan (kumpulan Stop Loss), sehingga ritel yang masuk tanpa membaca jejak arus uang kerap menjadi penyedia likuiditas (Counterparty) bagi eksekusi institusional.',
    ],
    sec2InstitutionalEn: [
      'Price moves because sovereign central banks mandate monetary stability, Tier-1 dealers intermediate corporate multi-billion FX hedging, and large funds hunt dense counterparty pools rather than retail oscillator crosses.',
      'Recognizing where you stand as a tiny retail participant teaches humility: never fight central-bank catalysts or park stops directly where crowds cluster.',
    ],
    anatomyRowsId: [
      ['Mengira harga digerakkan oleh garis tren gambar tangan trader ritel.', 'Harga digerakkan kebutuhan likuiditas korporasi global, dana pensiun, & kebijakan moneter.', 'Selaraskan setup kecilmu mengikuti arah arus sesi aktif institusi (London/NY), bukan melawannya.'],
      ['Berpikir Bank Sentral melakukan trading jangka pendek mencari untung harian.', 'Bank Sentral menargetkan stabilitas harga, nilai tukar, & inflasi makro berdasar mandat hukum.', 'Pantau pengumuman FOMC dan pidato gubernur bank sentral sebelum menjadwalkan entry.'],
      ['Memasang order tepat di garis High/Low rata seperti mayoritas peserta ritel.', 'Institusi butuh banyak counterparty untuk mengisi blok besar di atas/bawah titik rata tersebut.', 'Tunggu sapuan likuiditas kerumunan selesai sebelum mengukur entry risiko 10 USC.'],
    ],
    anatomyRowsEn: [
      ['Assuming retail lines steer price direction.', 'Tier-1 commercial flow and macro policy dictate deep market direction.', 'Trade cleanly alongside liquid institutional sessions rather than fighting macro trends.'],
      ['Imagining central banks scalp 5-minute swings.', 'Central banks intervene purely to defend currency stability and inflation anchors.', 'Clear open positions ahead of unscheduled policy speeches or FOMC votes.'],
      ['Clustering stops tightly beside obvious equal highs/lows.', 'Large dealers require retail stop pools to absorb institutional fills without slippage.', 'Wait until stop pools clear cleanly before deploying a 10 USC position.'],
    ],
    sec4QuantId: [
      'Dari kacamata kuantitatif, ukuran modal 1.000 USC ($10) dibandingkan dengan volume harian Bank Tier-1 ($7,5 triliun) berarti pangsa eksposur kita secara statistik nol persen terhadap perubahan harga dunia. Namun keunggulan tersembunyi modal kecil justru terletak pada kelincahan eksekusi nol slippage: order 0,02 Cent lot terisi seketika pada satu harga tanpa menggeser order book sama sekali.',
      'Sebaliknya, dana kelolaan $500 juta tidak bisa menekan tombol Market Buy dengan sekali klik karena akan menyapu habis likuiditas dan merugikan harga rata-rata mereka sendiri. Mereka harus memecah order (Order Splitting) serta memancing kerumunan ritel untuk menyediakan sisi jual/beli berlawanan selama bermenit-menit atau berhari-hari.',
      'Dengan memahami asimetri ukuran ini, tugas kita di akun 1.000 USC bukanlah berusaha "mengalahkan pasar", melainkan menjadi penumpang kecil yang tenang: membiarkan paus institusional bertarung menentukan arah di sesi London/New York, lalu menumpang arus bersih dengan risiko terbatas 10 USC per setup.',
    ],
    sec4QuantEn: [
      'A 1,000 USC ($10) micro account enjoys zero market-impact slippage, unlike multi-billion institutional funds forced to split massive orders around retail liquidity pockets.',
      'Our advantage is agility: waiting quietly outside equilibrium chop until institutional bias commits cleanly, then entering with strictly 10 USC at stake.',
    ],
    sec4FormulaId: 'Keunggulan Ritel Mikro = 0% Market Impact Slippage + Kebebasan Memilih Tidak Entry Saat Pasar Kotor (10 USC Cap)',
    sec4FormulaEn: 'Micro Trader Edge = Zero Execution Slippage Impact + Complete Selectivity to Stay Flat Until Clean Momentum',
    hotspots: makeHotspots(
      ['Mandat Bank Sentral (Macro)', 'Bank Tier-1 Liquidity Dealers', 'Hedging Korporasi & Hedge Fund', 'Posisi Cerdas Ritel (1.000 USC)'],
      ['Menetapkan suku bunga & menjaga nilai uang, bukan berjudi harian.', 'Menyediakan kuotasi Bid/Ask global antarbank melalui jaringan prime brokerage.', 'Memindahkan triliunan aset lintas batas & mencari likuiditas besar.', 'Memiliki kelincahan nol slippage untuk menumpang arus besar secara selektif.'],
      ['Melawan tren besar sesaat setelah pengumuman suku bunga bank sentral.', 'Menganggap spread melebar sebagai kecurangan tanpa paham mekanisme dealer.', 'Menaruh stop loss seragam tepat di area kerumunan ritel.', 'Overtrading setiap jam seakan wajib bertarung terus menerus.'],
      ['Hormati jadwal kebijakan moneter sebelum menyentuh MT5.', 'Pilih broker teregulasi transparan dengan eksekusi XAUUSDc 1 oz.', 'Tunggu reaksi selesai sapuan di area likuiditas utama.', 'Manfaatkan hak istimewa ritel: diam jika belum ada setup berisiko <= 10 USC.']
    ),
    detective: {
      scenarioId: 'Sebuah perusahaan otomotif Jepang wajib menukar $500 juta Dolar hasil penjualan AS menjadi Yen secara rutin tiap akhir kuartal. Mengapa order ini menjadi katalis riil penggerak kurs USDJPY dibanding indikator RSI ritel?',
      scenarioEn: 'A Japanese exporter converts $500M quarterly receipts into Yen regardless of RSI levels. Why does this shape price structure?',
      optionsId: [
        'Arus pertukaran riil korporasi bernilai ratusan juta dolar wajib melewati dealer antarbank tanpa mempedulikan indikator osilator.',
        'Karena perusahaan otomotif selalu membaca grup sinyal Telegram.',
        'Karena pasar FX tutup setiap akhir kuartal.',
      ],
      optionsEn: [
        'Mandatory real commercial FX settlement shifts interbank inventory directly regardless of technical oscillators.',
        'Corporations follow retail Telegram signal chats.',
        'Global FX suspends quarterly settlements.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Permintaan valuta nyata dari perdagangan internasional dan aliran modal obligasi menggerakkan inventori Bank Tier-1 secara riil.',
      explanationEn: 'Spot on! Real institutional capital and trade flows re-price interbank inventory directly.',
    },
    essayGuidanceHintsId: [
      'Jelaskan hierarki peran antara Bank Sentral, Bank Tier-1, Korporasi/Hedge Fund, dan trader ritel.',
      'Mengapa institusi besar membutuhkan kumpulan likuiditas ritel, sementara trader mikro punya keunggulan kelincahan?',
      'Bagaimana mengaplikasikan pengetahuan ekosistem ini untuk menjaga risiko 10 USC di akun 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Map roles cleanly across Central Banks, Tier-1 Dealers, Funds, and Retail accounts.',
      'Contrast institutional block execution needs with retail zero-slippage agility.',
      'Connect participant behavior directly to selective 10 USC trading discipline.',
    ],
  },

  // =========================================================================
  // SEMESTER 02 (ECO-102)
  // =========================================================================
  'macro-interest-rates-central-banks': {
    slug: 'macro-interest-rates-central-banks',
    photoUrl: PHOTOS.USD_RESERVE,
    photoCaptionId: 'Kebijakan Suku Bunga Bank Sentral, Instrumen Federal Reserve (FOMC) mengatur biaya modal global dan kekuatan Dolar AS.',
    photoCaptionEn: 'Federal Reserve Policy Architecture, Setting benchmark short-term rates governing global USD funding costs.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Suku bunga acuan bank sentral (seperti Federal Funds Rate oleh FOMC AS) adalah "harga sewa uang" di seluruh sistem keuangan global. Mengacu pada Kaidah Taylor (John B. Taylor, Stanford 1993), ketika inflasi inti memanas melampaui target 2%, komite moneter menaikkan suku bunga kebijakan untuk mengerem laju kredit (sikap Hawkish); sebaliknya, saat pengangguran naik menuju resesi, mereka memangkas bunga guna menyuntikkan likuiditas murah (sikap Dovish).',
      'Pasar antarbank tidak sekadar bereaksi pada keputusan kenaikan atau penurunan 25 basis poin hari itu saja, melainkan pada *Forward Guidance* serta *Dot Plot* proyeksi enam hingga dua belas bulan ke depan. Modal global berpindah menuju mata uang dengan imbal hasil riil lebih tinggi untuk memperoleh pengembalian bebas risiko pada obligasi pemerintahnya.',
      'Akibatnya, perbedaan selisih suku bunga antarnegara (*Interest Rate Differential* misalnya Fed Funds Rate versus suku bunga ECB atau Bank of Japan) menjadi mesin jangka panjang pembentuk tren ratusan hingga ribuan pips pada pasangan Forex seperti EURUSD dan USDJPY, serta mempengaruhi daya saing biaya peluang memegang emas.',
    ],
    sec2InstitutionalEn: [
      'Benchmark policy rates set the global risk-free hurdle rate via Taylor Rule balancing between inflation containment (Hawkish hikes) and employment stabilization (Dovish cuts).',
      'Institutional currency trends track widening Interest Rate Differentials and forward-rate expectations (SOFR futures) months ahead of headline news.',
    ],
    anatomyRowsId: [
      ['Menebak EURUSD naik hanya karena harga terlihat sudah turun terlalu rendah.', 'Tren Forex berbulan-bulan didorong selisih imbal hasil suku bunga The Fed vs ECB.', 'Selaraskan bias mingguanmu dengan kebijakan moneter terkini bank sentral terkait.'],
      ['Mengira kenaikan bunga hanya berdampak pada cicilan KPR lokal.', 'Fed Funds Rate menaikkan daya tarik Dolar AS dan menekan aset tanpa bunga jangka pendek.', 'Hindari menahan posisi Buy Emas agresif tepat saat FOMC bersikap sangat Hawkish.'],
      ['Masuk pasar 1 menit sebelum pengumuman keputusan FOMC pukul 01:00/02:00 WIB.', 'Pernyataan kalimat pers sering memicu whipsaw dua arah ekstrem yang menyapu SL ketat.', 'Kosongkan posisi mikro 1.000 USC menjelang keputusan FOMC dan evaluasi sesudahnya.'],
    ],
    anatomyRowsEn: [
      ['Buying falling currency pairs purely because they look cheap.', 'Multi-month FX trends track widening Central Bank Interest Rate Differentials.', 'Align trade direction with prevailing monetary regime stances.'],
      ['Dismissing benchmark interest rates as non-trading metrics.', 'Higher real policy yields raise USD demand and test zero-coupon bullion.', 'Avoid aggressive Gold longs into unexpected Hawkish FOMC surprises.'],
      ['Holding open micro stops through FOMC rate decisions.', 'Forward-guidance wording whipsaws both sides within milliseconds.', 'Flatten exposure 30m prior to protect 1% = 10 USC capital cleanly.'],
    ],
    sec4QuantId: [
      'Bayangkan selisih suku bunga acuan AS berada di 4,75% sementara Bank of Japan masih bertahan di 0,25% (selisih +4,50% untuk Dolar AS). Dana institusi meminjam Yen murah untuk menempatkannya pada surat utang berdenominasi USD (*Carry Trade*), yang secara konsisten mendorong tren kenaikan struktural USDJPY sepanjang kuartal.',
      'Sekarang bayangkan trader mikro bermodal $10 (1.000 USC) mencoba melakukan counter-trend SELL USDJPY berkali-kali tanpa arah dasar makro hanya karena indikator overbought berteriak. Walau setiap SL dibatasi 10 USC, tiga kali mencoba melawan arah moneter langsung memangkas batas rugi harian -30 USC (-3%).',
      'Disiplin JGS membalikkan kondisi tersebut: gunakan analisis makro sebagai filter arah ("jangan menantang angin badai FOMC"), dan simpan peluru risiko 10 USC (0,02 Cent lot) hanya untuk setup yang selaras dengan aliran suku bunga atau setelah konferensi pers FOMC mereda.',
    ],
    sec4QuantEn: [
      'A wide +4.50% policy spread attracts institutional carry capital away from low-yielding currencies, punishing unhedged retail counter-trend bets repeatedly.',
      'Using macro alignment as an upfront direction filter conserves your 10 USC (1%) bullets exclusively for high-probability aligned structural swings.',
    ],
    sec4FormulaId: 'Selisih Suku Bunga (Spread Makro) = Bunga Negara Basis − Bunga Negara Kuotasi  |  Biaya Whipsaw FOMC = Hingga 3–5× Jarak SL Normal',
    sec4FormulaEn: 'Policy Rate Differential = Base Central Bank Rate − Quote Rate  |  FOMC Whipsaw Guard = Flatten Ahead of Release',
    hotspots: makeHotspots(
      ['Mandat Kaidah Taylor (Inflasi vs Kerja)', 'Siklus Hawkish (Naikkan Bunga)', 'Siklus Dovish (Longgarkan Kredit)', 'Forward Guidance & Dot Plot'],
      ['Keseimbangan matematis suku bunga guna menjaga inflasi dekat 2% tanpa resesi.', 'Mengetatkan likuiditas agar dolar menguat dan kredit berlebihan mendingin.', 'Menurunkan biaya pinjaman guna menopang pemulihan ekonomi & aset berisiko.', 'Proyeksi tertulis komite bank sentral yang langsung di-price in pasar berjangka.'],
      ['Mengira harga tidak peduli dengan pidato gubernur bank sentral.', 'Entry besar-besaran saat pidato FOMC berharap tebak arah beruntung.', 'Membeli aset berlawanan dengan tren selisih suku bunga kuartalan.', 'Menyimpan Stop Loss tanpa mengantisipasi pelebaran spread saat jam pengumuman.'],
      ['Cek kalender keputusan suku bunga mingguan setiap Senin pagi.', 'Pahami istilah Hawkish vs Dovish dalam bahasa sederhana.', 'Kosongkan posisi aktif 15–30 menit sebelum FOMC dirilis.', 'Sesuaikan bias setup 10 USC dengan arah suku bunga riil terkini.']
    ),
    detective: {
      scenarioId: 'Inflasi AS melonjak kembali ke 4,2%, jauh di atas target 2%, sementara Ketua The Fed berpidato tegas akan mempertahankan suku bunga tinggi lebih lama ("Higher for Longer"). Bagaimana reaksi logis awal Dolar & risiko trading XAUUSDc?',
      scenarioEn: 'US CPI spikes to 4.2% well above 2%, prompting Hawkish "Higher for Longer" rhetoric. Identify the institutional implication:',
      optionsId: [
        'Dolar AS berpotensi menguat karena imbal hasil menarik modal, sehingga setup BUY Emas berisiko tinggi bila melawan arus makro.',
        'Dolar AS pasti nol nilainya dalam 10 menit.',
        'Semua trader diwajibkan membuka lot 100 oz tanpa Stop Loss.',
      ],
      optionsEn: [
        'USD draws capital via sustained high yields, placing aggressive Gold longs against institutional macro pressure.',
        'US Dollar collapses instantaneously to zero.',
        'Traders must double position sizes during speech volatility.',
      ],
      correctIndex: 0,
      explanationId: 'Benar! Sikap Hawkish menarik aliran dana ke USD; tetap sabar dan jangan paksa setup berlawanan tanpa struktur konfirmasi penuh.',
      explanationEn: 'Right! Hawkish rate expectations favor USD strength and demand elevated discipline on Gold setups.',
    },
    essayGuidanceHintsId: [
      'Jelaskan perbedaan mekanisme kebijakan Hawkish vs Dovish berdasar mandat bank sentral (Taylor Rule).',
      'Mengapa Forward Guidance sering menggerakkan pasar lebih keras daripada angka bunga berjalan?',
      'Bagaimana langkah konkret melindungi modal 1.000 USC pada hari rilis keputusan suku bunga FOMC?',
    ],
    essayGuidanceHintsEn: [
      'Explain Hawkish tightening vs Dovish easing mechanics.',
      'Why does Forward Guidance matter alongside the benchmark headline rate?',
      'Outline exact 1,000 USC defense steps ahead of FOMC announcements.',
    ],
  },

  'central-banks-rates-cpi-nfp': {
    slug: 'central-banks-rates-cpi-nfp',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Meja Analisis Data Ekonomi, Mengukur deviasi antara angka Forecast konsensus Bloomberg dan Actual rilis CPI, PCE, maupun NFP.',
    photoCaptionEn: 'Macroeconomic Release Analytics, Evaluating consensus Forecast vs Actual variance across CPI, PCE, GDP, and Non-Farm Payrolls.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Pasar bergerak bukan karena suatu berita "bagus" atau "buruk" secara absolut, melainkan karena **kejutan deviasi statistik** antara angka Konsensus (*Forecast*) yang sudah tercermin di harga versus angka Aktual (*Actual*) yang muncul pukul 19:30/20:30 WIB. Bila pasar memperkirakan inflasi CPI bulanan +0,3% dan hasil aktual persis +0,3%, pergerakan sering mereda karena skenario itu sudah diantisipasi sebelumnya.',
      'Lima indikator makro utama memegang peringkat dampak paling kuat bagi pasar global: (1) CPI & Core PCE sebagai acuan inflasi resmi pilihan The Fed; (2) Non-Farm Payrolls (NFP) & tingkat pengangguran sebagai pengukur kekuatan tenaga kerja AS; (3) Produk Domestik Bruto (GDP); (4) Purchasing Managers Index (PMI) manufaktur dan jasa yang lebih maju membaca perlambatan bisnis; serta (5) Retail Sales.',
      'Di dalam mikrostruktur meja penyedia likuiditas saat detik rilis berita berlabel merah ("High Impact"), algoritma pembuat pasar secara otomatis melebarkan gap antara harga Bid dan Ask serta mengurangi kedalaman buku order selama 10 hingga 60 detik guna melindungi diri dari eksekusi berkecepatan tinggi (*Latency Arbitrage*).',
    ],
    sec2InstitutionalEn: [
      'Markets reprice exclusively around the surprise delta separating Consensus Forecasts from Actual prints across Core CPI/PCE, NFP Payrolls, GDP, and PMI business surveys.',
      'For 10 to 60 seconds around release timestamps, liquidity algorithms pull passive limit depth and widen Bid-Ask spreads rapidly.',
    ],
    anatomyRowsId: [
      ['Membuka posisi tebak-tebakan 2 menit sebelum NFP pukul 19:30 WIB agar cuan cepat.', 'Penyedia likuiditas melebarkan spread & slippage beberapa detik menjelang rilis aktual.', 'Gunakan Live Economic Calendar di Lab 600px; tahan entry hingga 15–30 menit pasca rilis.'],
      ['Hanya membandingkan angka aktual bulan ini dengan bulan lalu (Previous).', 'Institusi menilai kejutan berdasar jarak Aktual vs Konsensus Pasar (Forecast).', 'Cek selalu selisih Forecast vs Actual serta revisi data bulan sebelumnya.'],
      ['Panik masuk mengejar candle lonjakan pertama di menit ke-1 sesudah CPI keluar.', 'Lonjakan awal kerap merupakan whipsaw penyapuan buku order sebelum arah riil terbentuk.', 'Tunggu satu candle penutupan M15 bersih lalu ukur SL aman max 10 USC (1%).'],
    ],
    anatomyRowsEn: [
      ['Gambling market orders 2 minutes before NFP prints.', 'Liquidity algorithms intentionally widen spreads during uncertain macro headlines.', 'Check the Live Economic Calendar first; stand aside 15-30m post-release.'],
      ['Comparing Actual solely against Previous month.', 'Markets had already discounted Consensus Forecast ahead of time.', 'Track Forecast surprise deviation alongside prior-month revisions.'],
      ['Chasing initial 60-second spike candles.', 'Initial burst often reflects thin-book liquidity clearing before steady trend pricing.', 'Await clean 15-minute stabilization while strictly maintaining a 10 USC hard cap.'],
    ],
    sec4QuantId: [
      'Mari menghitung dampak nyata selip (*Slippage*) berita merah pada akun Cent 1.000 USC ($10). Katakan kamu memasang Buy 0,04 Cent lot XAUUSDc 3 menit sebelum data CPI rilis dengan rencana Stop Loss aman $2,50 di bawah harga masuk (direncanakan rugi 0,04 × $2,50 × 100 = 10 USC atau tepat 1%).',
      'Namun saat angka CPI keluar melesat di atas ekspektasi, harga emas jatuh terjun bebas melompati tingkat Stop Loss-mu tanpa ada likuiditas penawar hingga harga terbuka kembali $6,00 lebih rendah! Karena sifat *Stop Order* saat gap likuiditas tipis, eksekusi SL mengalami slippage ke jarak -$6,00 sehingga kerugian nyata membengkak menjadi 0,04 × $6,00 × 100 = 24 USC (2,4%, lebih dari dua kali lipat rencana risiko!).',
      'Aturan baku THE JEY GANG STRATEGIST mencegah risiko tak terkendali ini: dilarang membuka setup baru 15 menit menjelang dan sesudah rilis berita USD High Impact merah (CPI, NFP, FOMC, Core PCE). Menunggu pasar tenang 20 menit menjaga seluruh kalkulasi lot 10 USC tetap presisi 1%.',
    ],
    sec4QuantEn: [
      'If CPI surprises sharply and price gaps $6.00 past your planned $2.50 stop at 0.04 Cent lot, actual slippage multiplies a budgeted 10 USC loss into 24 USC immediately.',
      'Honoring a strict 15-minute blackout buffer around red-tier USD prints ensures exact 1% stop execution fidelity.',
    ],
    sec4FormulaId: 'Kerugian Slippage = Ukuran Lot Cent × Jarak Gap Eksekusi × 100 USC  |  Contoh: 0,04 lot × Gap $6,00 = −24 USC (−2,4% Ekuitas)',
    sec4FormulaEn: 'News Slippage Loss = Cent Lot × Execution Gap ($) × 100 USC  |  Example: 0.04 lot × $6.00 Gap = −24 USC',
    hotspots: makeHotspots(
      ['Konsensus (Forecast) Terukur', 'Kejutan Deviasi (Actual)', 'Pelebaran Spread Detik Rilis', 'Jendela Stabilisasi M15 (+20m)'],
      ['Ekspektasi konsensus ekonom sudah masuk ke harga sebelum berita rilis.', 'Selisih antara Actual dan Forecast memicu re-pricing kontrak seketika.', 'Pembuat pasar menarik order limit sementara mencegah adverse selection.', 'Setelah buku order pulih normal, arah fundamental sejati baru mengalir rapi.'],
      ['Berjudi klik Buy + Sell berbarengan menjelang berita rilis.', 'Mengira garis merah SL kebal terhadap loncatan gap harga (Slippage).', 'Mengejar ekor panjang candle di detik pertama berita.', 'Melupakan revisi data bulan lalu pada kolom Previous.'],
      ['Pantau Kalender Ekonomi Live sebelum membuka MT5 setiap hari.', 'Jangan sentuh tombol eksekusi +/- 15 menit dari rilis CPI/NFP/FOMC.', 'Tutup atau kurangi eksposur bila tidak punya bantalan struktural.', 'Kembali beraksi hanya sesudah spread normal dengan risiko tetap <= 10 USC.']
    ),
    detective: {
      scenarioId: 'Data CPI inti AS diramalkan (Forecast) turun ke 2,9%, tetapi saat dirilis angka Aktual keluar persis 2,9%. Mengapa pasar tidak langsung terbang +$40 seperti perkiraan banyak grup pemula?',
      scenarioEn: 'Core CPI Consensus Forecast stood at 2.9% and Actual printed exactly 2.9%. Why did Gold fail to rocket +$40?',
      optionsId: [
        'Angka sudah sesuai ekspektasi ("Already Priced In"), sehingga tidak ada kejutan deviasi yang memaksa desk institusi mengubah portofolio mendadak.',
        'Karena server bursa emas lupa memproses angka bulan itu.',
        'Karena angka CPI hanya berlaku untuk saham teknologi.',
      ],
      optionsEn: [
        'The outcome was Already Priced In, zero surprise deviation meant institutional books needed no abrupt repricing.',
        'Gold clearing centers paused processing.',
        'CPI applies exclusively to technology equities.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Harga sudah mencerminkan konsensus Forecast sebelum berita dibacakan, kekuatan penggerak sesungguhnya ialah elemen kejutan (Surprise Delta).',
      explanationEn: 'Correct! Markets move primarily on surprises separating Actual prints from priced Consensus.',
    },
    essayGuidanceHintsId: [
      'Jelaskan konsep "Forecast vs Actual" (priced in) pada kalender ekonomi makro.',
      'Terangkan mekanisme terjadinya pelebaran spread dan slippage saat berita merah (NFP/CPI) dirilis.',
      'Bagaimana hal tersebut bisa membuat risiko terencana 10 USC jebol jika nekat entry sebelum berita, dan apa tindakan tepatmu?',
    ],
    essayGuidanceHintsEn: [
      'Define Forecast vs Actual surprise mechanics in macroeconomic pricing.',
      'Explain why liquidity pulls and slippage blow through planned micro stops.',
      'State your 15-minute blackout rule around red USD releases on 1,000 USC.',
    ],
  },

  'intermarket-yields-dxy-xauusd': {
    slug: 'intermarket-yields-dxy-xauusd',
    photoUrl: PHOTOS.DEALING_DESK,
    photoCaptionId: 'Korelasi Antar-Pasar (Intermarket Desk), Memantau konfluensi Imbal Hasil Obligasi AS 10 Tahun (US10Y), DXY, dan Spot XAUUSD.',
    photoCaptionEn: 'Institutional Intermarket Desk, Tracking US10Y Treasury yields, DXY Dollar Index strength, and Spot XAUUSD inversely.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Tidak ada instrumen pasar yang hidup terisolasi di pulau sendiri. Analisis Antar-Pasar (*Intermarket Analysis*) membaca arus rotasi modal antar 4 pilar: Obligasi Negara (US10Y), Mata Uang (Indeks Dolar DXY), Komoditas (Emas XAUUSD), dan Ekuitas (S&P 500). Obligasi Treasury AS bertenor 10 Tahun berfungsi sebagai tolok ukur imbal hasil "bebas risiko" dunia; saat imbal hasil riil obligasi AS melesat naik, manajer aset memperoleh kupon tinggi dalam Dolar AS sehingga daya tarik menyimpan emas tanpa kupon (*zero-yielding bullion*) cenderung tertekan sementara.',
      'Riset akademis terkenal oleh Dirk G. Baur & Brian M. Lucey (2010) membuktikan bahwa emas memegang peran ganda yang unik: berfungsi sebagai pelindung nilai stabil (*Hedge*) atas pelemahan mata uang jangka panjang, sekaligus berperan sebagai tempat berlindung (*Safe Haven*) saat gejolak krisis ekstrem saham.',
      'Kunci praktik meja institusional adalah mengecek **konfirmasi divergensi antar-pasar**: misalnya apabila Indeks Dolar AS (DXY) menembus puncak tinggi baru (*Higher High*), tetapi imbal hasil US10Y mulai melemah sementara XAUUSD menolak mencetak dasar terendah baru (*Bullish SMT Divergence*), sinyal tersebut mengisyaratkan kekuatan Dolar mulai jenuh di mata aliran modal besar.',
    ],
    sec2InstitutionalEn: [
      'Global institutional desks cross-reference four rotating asset pillars: US10Y Real Treasury Yields, DXY Dollar Index, XAUUSD Gold, and S&P 500 Equities.',
      'Monitoring cross-asset confirmation and SMT divergences reveals when a DXY rally lacks real yield backing, alerting Gold analysts early before sharp reversals.',
    ],
    anatomyRowsId: [
      ['Menganalisa grafik XAUUSD seorang diri tanpa melihat US10Y & DXY.', 'Dana besar memutar modal antara Obligasi Treasury AS (imbal hasil riil), USD, dan Emas.', 'Tampilkan simbol TVC:US10Y di Lab 600px untuk memverifikasi dukungan makro sebelum eksekusi.'],
      ['Mengira korelasi negatif DXY vs XAUUSD berlaku 100% statis setiap menit.', 'Saat kepanikan krisis geopolitik (Safe Haven), Dolar DAN Emas dapat diborong naik bersamaan!', 'Selalu cek apakah narasi saat ini sedang "Yield-Driven" atau "Crisis Safe-Haven".'],
      ['Memaksakan sinyal BUY Emas ketika US10Y + DXY sama-sama melesat naik kencang.', 'Arus berlawanan dari obligasi menciptakan hambatan struktural berat pada logam mulia.', 'Lewatkan setup kontras makro guna menghemat amunisi 10 USC untuk setup konfluensi penuh.'],
    ],
    anatomyRowsEn: [
      ['Charting XAUUSD blindly without checking US10Y yields and DXY.', 'Cross-asset flows link Real Treasury yields directly to opportunity costs on bullion.', 'Cross-check TVC:US10Y alongside XAUUSD inside Activity 03 TradingView Lab.'],
      ['Assuming DXY/Gold inverse correlation never shifts.', 'During severe systemic panics, Safe-Haven demand lifts both USD and Gold concurrently.', 'Separate yield-driven regimes from acute geopolitical safe-haven bids.'],
      ['Forcing XAUUSD longs into surging US10Y + DXY breakouts.', 'Fighting synchronized Treasury yield strength severely cuts setup win probability.', 'Pass low-confluence macro countertrades to preserve 10 USC risk equity.'],
    ],
    sec4QuantId: [
      'Mari menguji perhitungan Imbal Hasil Riil (*Real Yield*) pada skenario antar-pasar berikut: misalkan imbal hasil nominal Obligasi Pemerintah AS 10 Tahun (US10Y) bertengger di 4,50%, sementara ekspektasi inflasi jangka panjang pasar (*5Y5Y Breakeven Inflation*) turun ke 2,20%. Ini menghasilkan Real Yield positif +2,30%.',
      'Secara portofolio institusional, imbal hasil riil bersih +2,30% atas obligasi paling likuid di planet bumi meningkatkan biaya peluang memegang aset tanpa bunga. Bila DXY ikut menanjak menyusul kenaikan Real Yield ini, peluang keberhasilan setup BUY XAUUSD melawan tren turun jangka pendek menurun drastis.',
      'Pada modal $10 (1.000 USC), menjaga aturan konfluensi antar-pasar sangat menguntungkan statistik jangka panjang: alih-alih nekat "menangkap pisau jatuh" BUY emas sebanyak 4 kali (menghabiskan 4 × 10 USC = -40 USC), trader JGS memilih menunggu DXY mencapai zona resisten HTF atau melihat US10Y melandai sebelum mengambil satu setup presisi ber-SL 10 USC (1%).',
    ],
    sec4QuantEn: [
      'When nominal US10Y holds 4.50% against 2.20% breakeven inflation (+2.30% positive real yield), opportunity costs rise directly against zero-coupon bullion.',
      'Skipping counter-trend Gold entries while DXY & US10Y rally together preserves multiple 10 USC bullets for clean aligned setups.',
    ],
    sec4FormulaId: 'Real Yield AS = Imbal Hasil Nominal US10Y − Ekspektasi Inflasi Pasar  |  Konfluensi Ideal Buy XAUUSD: US10Y Turun + DXY Melemah',
    sec4FormulaEn: 'US Real Yield = Nominal US10Y Yield − Breakeven Inflation  |  Aligned Gold Long Regime: Cooling Yields + Weakening DXY',
    hotspots: makeHotspots(
      ['Imbal Hasil Obligasi (US10Y)', 'Aliran Modal Indeks Dolar (DXY)', 'Biaya Peluang Emas (XAUUSD)', 'Mode Krisis (Safe Haven Bid)'],
      ['Jangkar bebas risiko global; kenaikan tajam menarik dana keluar dari aset non-bunga.', 'Mengukur kekuatan relatif USD terhadap 6 mata uang utama dunia.', 'Harga emas berbalik tertekan jika imbal hasil riil obligasi AS melesat tinggi.', 'Saat krisis ekuitas parah, Emas & USD terkadang sama-sama diburu sebagai pelindung.'],
      ['Membeli Emas terus-menerus walau US10Y + DXY sedang breakout menguat.', 'Menganggap korelasi DXY-Gold kaku 100% tanpa cek mode krisis.', 'Mengabaikan grafik obligasi saat trading komoditas logam mulia.', 'Melipatgandakan lot karena yakin emas "sudah murah" di tengah rally Real Yield.'],
      ['Pantau simbol TVC:US10Y sejenak sebelum sesi London/NY di Lab 600px.', 'Konfirmasi arah DXY tidak berlawanan keras dengan setup Emas 10 USC-mu.', 'Pelajari perbedaan Safe Haven (riset Baur & Lucey) dari periode inflasi biasa.', 'Tetap jaga Stop Loss 1% walaupun konfluensi makro sudah searah.']
    ),
    detective: {
      scenarioId: 'US10Y Yield melonjak tajam dari 4,1% ke 4,45% menyusul data tenaga kerja AS yang super kuat, dan DXY menembus High mingguan. Seorang pemula tetap memaksa BUY XAUUSD berkali-kali. Mengapa ia melawan arus besar?',
      scenarioEn: 'US10Y surges from 4.1% to 4.45% while DXY breaks weekly highs, yet a beginner keeps aggressively buying XAUUSD. What institutional error occurred?',
      optionsId: [
        'Ia melawan kenaikan Real Yield & kekuatan Dolar AS yang secara langsung menekan harga emas berbiaya kupon nol.',
        'Karena pasar obligasi tidak ada hubungannya dengan mata uang USD.',
        'Karena XAUUSD selalu naik jika US10Y melonjak 100 bps dalam sehari.',
      ],
      optionsEn: [
        'He is fighting rising Real Treasury Yields & DXY momentum that heighten opportunity cost on zero-coupon Gold.',
        'Bond yields have zero macro link to the US Dollar.',
        'Gold is mechanically forced upward whenever yields spike sharply.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Kenaikan tajam imbal hasil obligasi AS menarik arus dana ke USD dan meningkatkan opportunity cost menahan emas.',
      explanationEn: 'Right! Rising US real yields strengthen USD demand and directly pressure non-yielding bullion short-term.',
    },
    essayGuidanceHintsId: [
      'Jelaskan hubungan kausal antara US10Y Real Yield, Indeks Dolar (DXY), dan XAUUSD.',
      'Bagaimana konsep Safe Haven (Baur & Lucey, 2010) bisa mengubah korelasi normal saat krisis?',
      'Bagaimana konfluensi intermarket melindungi akun 1.000 USC agar tidak membuang anggaran risiko 10 USC melawan tren besar?',
    ],
    essayGuidanceHintsEn: [
      'Connect US10Y Real Yield flows to DXY and XAUUSD opportunity costs.',
      'Explain why extreme crises temporarily alter normal Safe-Haven correlations.',
      'Describe how intermarket filtering prevents wasting 10 USC stops against macro pressure.',
    ],
  },

  // =========================================================================
  // SEMESTER 03 (MIC-103)
  // =========================================================================
  'broker-vs-mt5-terminal': {
    slug: 'broker-vs-mt5-terminal',
    photoUrl: PHOTOS.EXCHANGE_FLOOR,
    photoCaptionId: 'Jembatan Eksekusi Pialang Global, Memisahkan lembaga kustodian Broker teregulasi, mesin antarmuka MetaTrader 5, dan platform analisis TradingView.',
    photoCaptionEn: 'Brokerage Execution Infrastructure, Separating regulated financial custody, MT5 execution terminal, and TradingView mapping.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Salah satu kesalahpahaman paling berbahaya bagi pemula ialah mencampuradukkan tiga entitas terpisah menjadi satu istilah "aplikasi trading": (1) Broker/Pialang teregulasi adalah lembaga keuangan resmi tempat dompet uangmu ($10) disimpan terpisah (*Segregated Account*) dan tempat spesifikasi kontrak XAUUSDc diterbitkan; (2) MetaTrader 5 (MT5) buatan MetaQuotes hanyalah kokpit kemudi teknis pengirim tombol Buy/Sell yang tidak memegang uang nasabah sedikit pun.',
      '(3) TradingView merupakan peta navigasi analitik kelas dunia untuk membaca grafik real-time, mengukur zona harga, dan mengecek kalender ekonomi. Di balik dapur eksekusi broker modern, dikenal dua model perutean: model **A-Book (STP/ECN)** yang meneruskan order nasabah ke penyedia likuiditas antarbank demi komisi spread murni, serta model **B-Book (Dealing Desk)** yang menampung transaksi internal nasabah di buku sendiri.',
      'Karena potensi konflik kepentingan di B-Book yang tidak teregulasi ketat, verifikasi kredibilitas lisensi tier-1, kejelasan spread & komisi, serta uji penarikan dana (*Withdrawal Test*) berskala kecil sebelum mempercayakan saldo besar menjadi protokol due-diligence wajib bagi seluruh anggota JGS.',
    ],
    sec2InstitutionalEn: [
      'Novices frequently blur three distinct systems: the Regulated Broker (financial custody and liquidity routing via A-Book STP/ECN bridges or B-Book desks), MetaTrader 5 (pure order transmission cockpit), and TradingView (analytical charting canvas).',
      'Mandatory institutional hygiene starts by isolating funds strictly in regulated custody and testing clean small withdrawals early before scaling.',
    ],
    anatomyRowsId: [
      ['Menyetor uang langsung ke situs palsu bertuliskan "Deposit Aplikasi MT5/TradingView".', 'MetaQuotes (MT5) dan TradingView tidak menerima deposit dana ritel; hanya Broker resmi pemegang rekening.', 'Login MT5 hanya memakai server & kredensial terbitan Broker teregulasi resmi.'],
      ['Tidak peduli apakah pialang memakai server A-Book transparan atau Dealing Desk abal-abal.', 'Pialang tidak berlisensi dapat memanipulasi kuotasi atau menahan penarikan profit nasabah.', 'Verifikasi lisensi regulator tier-1 dan lakukan uji penarikan kecil di awal.'],
      ['Mengira grafik di TradingView 100% identik selisih koma angkanya dengan MT5 broker.', 'Setiap broker mengambil umpan harga LP sedikit berbeda (biasa selisih $0,1–$0,5 pada Emas).', 'Eksekusi akhir SL & Entry wajib mengacu harga Bid/Ask aktual di terminal MT5 brokermu.'],
    ],
    anatomyRowsEn: [
      ['Attempting to deposit cash into fake apps claiming to be MT5 wallets.', 'MT5 is strictly execution software; regulated brokers handle all segregated client funds.', 'Only connect official broker-issued trading server credentials into MT5.'],
      ['Ignoring broker regulation and A-Book vs B-Book execution disclosures.', 'Unregulated B-Books face sharp conflicts of interest against profitable accounts.', 'Audit regulatory oversight early and run clean test withdrawals.'],
      ['Expecting zero feed delta between TradingView charts and live MT5 quotes.', 'Minor $0.10–$0.50 Gold spread/feed variance naturally occurs across LP feeds.', 'Always read exact Bid/Ask pricing off MT5 before placing SL/TP brackets.'],
    ],
    sec4QuantId: [
      'Bayangkan skenario biaya tersembunyi di akun Cent $10 (1.000 USC): dua broker sama-sama menawarkan simbol XAUUSDc 1 oz, tetapi Broker X menarik Spread mengambang rata-rata $0,25 + komisi setara 1 USC, sedangkan Broker Y yang tidak transparan mematok Spread kaku $0,95 di jam tenang London.',
      'Apabila kamu membuka transaksi 0,02 Cent lot, biaya masuk instan pada Broker X adalah 0,02 × $0,25 × 100 = 0,50 USC (hanya 5% dari anggaran risiko 10 USC), meninggalkan ruang 9,50 USC bersih untuk Stop Loss struktur. Sebaliknya, pada Broker Y yang ber-spread mahal, biaya gesek masuk memotong hampir 2 USC langsung saat tombol diklik!',
      'Dalam jangka panjang 100 kali transaksi belajar, selisih biaya gesek mikrostruktural tersebut menentukan apakah kurva hasilmu mulus atau habis dimakan ongkos transaksi, sekaligus menegaskan pentingnya memilih broker teregulasi transparan dengan spesifikasi 1 oz XAUUSDc yang bersih.',
    ],
    sec4QuantEn: [
      'Comparing $0.25 vs $0.95 execution spread across 100 micro 0.02 Cent lot executions exposes massive transaction-cost drag against a strict 10 USC risk ceiling.',
      'Transparent A-Book specs preserve ~95% of your 10 USC stop allocation purely for structural invalidation room.',
    ],
    sec4FormulaId: 'Biaya Masuk Instan = Lot Cent × Spread ($) × 100 USC  |  0,02 lot × Spread $0,25 = 0,50 USC (Efisien 95%)',
    sec4FormulaEn: 'Instant Friction Cost = Cent Lot × Spread ($) × 100 USC  |  0.02 lot × $0.25 Spread = 0.50 USC Drag',
    hotspots: makeHotspots(
      ['Pasar Likuiditas Antarbank', 'Broker Resmi (Brankas Dana)', 'TradingView (Peta Analitik)', 'MT5 Terminal (Kokpit Order)'],
      ['Tempat harga Bid & Ask global dibentuk terus-menerus oleh lembaga keuangan.', 'Pialang berizin yang menyimpan dana $10 terpisah serta meneruskan order A-Book.', 'Platform grafik profesional berzona waktu WIB guna memetakan struktur & FVG.', 'Perangkat eksekusi murni di ponsel/PC tempat menaruh SL, TP, dan lot 0,02 Cent.'],
      ['Tertipu penipu media sosial yang menyamar sebagai admin "Deposit MT5".', 'Membuka akun di broker bodong tanpa regulasi demi bonus deposit 200%.', 'Mentradingkan garis TradingView tanpa mengecek spread aktual di MT5.', 'Memakai MT5 untuk berjudi tanpa mengerti jenis order dan Hard Stop Loss.'],
      ['Pahami bahwa likuiditas asli berada di luar aplikasi.', 'Uji penarikan dana kecil sejak dini pada broker pilihanmu.', 'Gunakan Lab 600px TradingView untuk memetakan area likuiditas.', 'Eksekusi 0,02 Cent lot XAUUSDc di MT5 wajib memakai SL <= 10 USC.']
    ),
    detective: {
      scenarioId: 'Seseorang mengaku dari "Admin MetaTrader 5 Pusat" memintamu mentransfer $100 ke rekening pribadi untuk membuka profit saldo MT5. Berdasar struktur industri broker, mengapa ini 100% penipuan?',
      scenarioEn: 'Someone claiming to be "MT5 Official Support" asks for a bank transfer to unlock MT5 profits. Why is this guaranteed fraud?',
      optionsId: [
        'MetaQuotes (pembuat MT5) hanya pembuat software terminal, mereka tidak pernah memegang dana atau meminta transfer nasabah.',
        'Karena transfer bank hanya bisa dilakukan hari Sabtu.',
        'Karena MT5 hanya mendukung transaksi Bitcoin.',
      ],
      optionsEn: [
        'MetaQuotes develops software terminals only, they never hold custody of client funds or process transfers.',
        'Bank transfers settle strictly on weekends.',
        'MT5 supports crypto wallets exclusively.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Dana nasabah hanya dikelola oleh Broker teregulasi atas nama pribadi nasabah sendiri melalui portal resmi, bukan oleh software MT5 maupun TradingView.',
      explanationEn: 'Spot on! Regulated brokers, never terminal software providers, handle client deposits and withdrawals via official portals.',
    },
    essayGuidanceHintsId: [
      'Pisahkan dengan jelas fungsi Pasar Global, Broker teregulasi, TradingView, dan MetaTrader 5.',
      'Jelaskan perbedaan mekanisme perutean A-Book (STP/ECN) dengan konflik kepentingan pada B-Book tidak transparan.',
      'Bagaimana hal tersebut berdampak pada biaya spread & perlindungan saldo $10 (1.000 USC)?',
    ],
    essayGuidanceHintsEn: [
      'Separate Global Markets, Regulated Brokers, TradingView, and MT5 cleanly.',
      'Contrast A-Book STP routing with unregulated B-Book conflicts.',
      'Connect broker selection and spread hygiene directly to protecting $10 equity.',
    ],
  },

  'limit-order-book-bid-ask-slippage': {
    slug: 'limit-order-book-bid-ask-slippage',
    photoUrl: PHOTOS.QUANT_SERVERS,
    photoCaptionId: 'Arsitektur Buku Order Elektronik, Mesin pencocokan Bid, Ask, Limit Order pasif, dan eksekusi agresif di pusat data keuangan.',
    photoCaptionEn: 'Electronic Matching Engine Infrastructure, Processing Limit Order Books, Bid/Ask spreads, and execution latency.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Dalam buku teks mikrostruktur pasar karya Larry Harris (*Trading and Exchanges*, Oxford University Press 2003) dan Maureen O’Hara (*Market Microstructure Theory*, Cornell), harga di grafik terbentuk oleh antrean dua kubu: **Maker (Limit Order Pasif)** yang memarkir penawaran beli (**Bid**) maupun jual (**Ask**) pada tingkat harga tertentu dan menyediakan likuiditas; serta **Taker (Market Order Agresif)** yang mengonsumsi antrean terdepan karena menginginkan eksekusi seketika.',
      'Setiap kali kamu menekan `BUY BY MARKET` di MT5, ordermu membayar harga Ask tertinggi di sisi penjual, sedangkan bila menutupnya atau menekan `SELL BY MARKET`, eksekusi terjadi pada harga Bid di sisi pembeli. Selisih kedua kutub inilah yang tampak sebagai Spread. Saat kamu memasang `Buy Limit` atau `Sell Limit`, kamu berdiri sabar di buku order menunggu harga datang menyentuhmu tanpa membayar spread tambahan akibat terburu-buru.',
      'Mengapa pada jam subuh 04:00–05:30 WIB (*Daily Rollover*) atau detik berita besar spread bisa melonjak 5x lipat? Menurut model pemilihan merugikan (*Adverse Selection*, Glosten & Milgrom), pembuat pasar khawatir bertabrakan dengan pemain yang memiliki informasi lebih cepat saat buku menipis, sehingga mereka otomatis menarik penawaran dekat dan melebarkan spread sebagai perisai risiko.',
    ],
    sec2InstitutionalEn: [
      'As demonstrated by Larry Harris (Oxford) and Maureen O’Hara (Cornell), price discovers equilibrium across passive Limit Order Makers (posting Bid/Ask inventory) and impatient Market Order Takers crossing the spread.',
      'During illiquid rollover hours or macro releases, Glosten-Milgrom adverse selection compels liquidity providers to pull tight quotes, widening spreads drastically.',
    ],
    anatomyRowsId: [
      ['Mengira harga grafik satu garis tunggal sehingga bingung mengapa posisi baru terbuka langsung minus.', 'Semua posisi dibuka pada satu sisi (Ask untuk Buy) dan dinilai penutupannya di sisi lawan (Bid).', 'Pahami bahwa minus awal kecil hanyalah ongkos Spread masuk; hindari entry saat spread > $0,50.'],
      ['Memakai Market Order di detik pembukaan sesi tipis atau subuh 04:30 WIB.', 'Buku order Limit tipis memaksa Market Order menyapu antrean harga jauh (Slippage mahal).', 'Terapkan Limit Order di area struktur atau masuk saat kedalaman Killzone normal.'],
      ['Heran Stop Loss tersentuh walau ekor candle tampak belum menyentuh angka di grafik Bid.', 'Grafik MT5 default menggambar harga Bid; posisi SELL ditutup oleh garis Ask (Bid + Spread)!', 'Selalu tambahkan penyangga spread di luar ekor SL agar tidak tersapu lebar Ask rollover.'],
    ],
    anatomyRowsEn: [
      ['Confusing single chart price with two-sided Bid/Ask execution.', 'Longs enter at Ask and liquidate at Bid; Shorts enter Bid and liquidate Ask.', 'Expect small initial negative Spread drag and avoid widening rollover periods.'],
      ['Firing Market Orders into thin overnight order books.', 'Thin limit depth pushes aggressive market fills down distant rungs (Slippage).', 'Deploy Limit orders neatly at validated zones during liquid trading windows.'],
      ['Wondering why Short SL triggered slightly above visible Bid wicks.', 'Default MT5 charts plot Bid pricing while Short positions liquidate on the Ask line!', 'Always add a clear spread buffer beyond structural invalidation highs.'],
    ],
    sec4QuantId: [
      'Mari menguji anatomi Bid vs Ask secara konkret pada posisi SELL XAUUSDc 0,03 Cent lot di modal 1.000 USC ($10). Katakan harga pasar berada di Bid `$2,645.00` / Ask `$2,645.30` (Spread normal `$0,30`). Kamu menaruh Stop Loss tepat di garis struktur tertinggi Bid `$2,648.00`.',
      'Saat pasar bergerak tenang di siang/malam Killzone, harga harus menembus Bid `$2,647.70` agar Ask menyentuh SL `$2,648.00`. Namun bayangkan jika posisi dibiarkan terbuka melewati pergantian hari pukul 04:30 WIB ketika Spread melebar menjadi `$2,20`: walau harga Bid hanya naik menyentuh `$2,645.80` (jauh $2,20 di bawah garis struktur!), garis Ask melompat ke `$2,648.00` dan langsung menutup Stop Loss-mu sebesar `0,03 × $3,00 × 100 = 9 USC`!',
      'Pengetahuan mekanisme *Bid-Ask Margin Buffer* ini sangat vital bagi pemilik akun $10: selalu beri nafas penyangga minimal 2× spread di atas struktur untuk posisi SELL, serta tutuplah atau hindari perdagangan intra-hari melintasi jam rollover 04:00–05:30 WIB.',
    ],
    sec4QuantEn: [
      'Because Short Stop Losses trigger off the Ask line (Bid + Spread), an overnight $2.20 spread spike triggers a $2,648.00 stop even while visible Bid candles stay peacefully at $2,645.80.',
      'Adding strict spread buffers above Sell highs and shutting down before 04:00 WIB rollover guards every 10 USC micro ticket cleanly.',
    ],
    sec4FormulaId: 'Trigger SL BUY = Harga Bid <= SL  |  Trigger SL SELL = Harga Ask (Bid + Spread) >= SL  |  Buffer Wajib = Struktur ± (2 × Spread)',
    sec4FormulaEn: 'BUY SL Triggers on Bid <= SL  |  SELL SL Triggers on Ask (Bid + Spread) >= SL  |  Add 2× Spread Buffer',
    hotspots: makeHotspots(
      ['Sisi Bid (Pembeli Tertinggi)', 'Sisi Ask (Penjual Terendah)', 'Limit Order vs Market Order', 'Pelebaran Adverse Selection'],
      ['Harga terbaik pembeli pasif, tempat order SELL terbuka dan BUY ditutup.', 'Harga penawaran penjual terbaik, tempat order BUY dibuka dan SELL ditutup.', 'Limit menunggu harga di buku order; Market menyapu antrean seketika.', 'Saat risiko berita/rollover naik, LP menjauhkan kuotasi Bid-Ask untuk melindungi inventori.'],
      ['Lupa mengaktifkan garis Ask di pengaturan chart MT5.', 'Memasang SL Short tepat 1 pip di atas High tanpa menghitung lebar Spread.', 'Mengira semua order tereksekusi tanpa celah di detik likuiditas kering.', 'Masuk posisi tepat di jendela subuh 04:30 WIB ketika spread melar 6 kali.'],
      ['Aktifkan "Ask Price Line" di properti chart MT5 untuk transparansi penuh.', 'Berikan penyangga spread minimal $0,50–$1,00 di luar ekor SL.', 'Utamakan Limit Order di zona FVG guna menghindari slippage Market Order.', 'Jaga kerugian maksimal tetap <= 10 USC dengan eksekusi hanya di jam likuid.']
    ),
    detective: {
      scenarioId: 'Trader A membuka posisi SELL Emas pukul 22:00 WIB dengan SL di $2,650.00. Pukul 04:15 WIB (jam rollover), candle tertingginya di layar Bid cuma $2,648.20, namun SL $2,650.00 kena! Mengapa bukan "broker curang"?',
      scenarioEn: 'A Short gold trade set SL at $2,650.00 stops out at 04:15 WIB rollover even though Bid candles peaked at $2,648.20. Explain why:',
      optionsId: [
        'Posisi SELL ditutup oleh harga Ask (Bid + Spread); saat rollover spread melebar $1,80+ sehingga Ask ($2,648.20 + $1,80) menyentuh $2,650.00.',
        'Karena grafik MT5 terbalik otomatis setelah tengah malam.',
        'Karena 1 lot Cent mendadak berubah menjadi 100 lot Standar.',
      ],
      optionsEn: [
        'Short positions close on the Ask line (Bid + Spread); a $1.80+ rollover spread pushed Ask cleanly past $2,650.00.',
        'MT5 charts invert automatically past midnight.',
        'Cent lot sizes multiply to Standard mid-trade.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Itu mekanisme normal Limit Order Book saat rollover: selalu nyalakan Ask Line di MT5 dan hindari menahan setup ketat melintasi 04:00 WIB.',
      explanationEn: 'Spot on! Enabling the Ask Line and avoiding thin overnight rollover prevents surprise Ask-triggered stops.',
    },
    essayGuidanceHintsId: [
      'Bedakan mekanisme transaksi Bid vs Ask dan perbedaan Limit Order (Maker) vs Market Order (Taker).',
      'Mengapa Adverse Selection menyebabkan pelebaran spread drastis di jam rollover atau news?',
      'Bagaimana hal tersebut memengaruhi lokasi aman Stop Loss agar batas rugi 10 USC di 1.000 USC tidak tersapu prematur?',
    ],
    essayGuidanceHintsEn: [
      'Distinguish Bid/Ask execution lines and Maker Limit vs Taker Market mechanics.',
      'Explain why Glosten-Milgrom adverse selection widens spreads during thin rollover windows.',
      'Connect Ask-line buffers directly to protecting a 10 USC stop placement.',
    ],
  },

  'visual-tour-5-mt5-buttons': {
    slug: 'visual-tour-5-mt5-buttons',
    photoUrl: PHOTOS.DEALING_DESK,
    photoCaptionId: 'Kokpit MetaTrader 5, Verifikasi ukuran kontrak 1 oz pada XAUUSDc, penggunaan Margin Terpakai, serta kunci Hard Stop Loss sebelum order.',
    photoCaptionEn: 'MetaTrader 5 Execution Terminal, Auditing 1 oz XAUUSDc contract specs, Free Margin health, and hard Stop Loss protection.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Sebagian besar kecelakaan akun pemula terjadi bukan karena salah memprediksi arah tren, melainkan buta membaca lima angka kesehatan akun di tab Trade terminal MetaTrader 5: **Balance** (saldo transaksi tertutup), **Equity** (nilai akun hidup termasuk profit/rugi mengambang saat ini), **Margin** (uang jaminan sementara yang dikunci broker saat posisi terbuka), **Free Margin** (sisa ruang napas yang tersedia), serta **Margin Level (%)** = (Equity ÷ Margin) × 100%.',
      'Apabila seorang trader membuka lot terlalu besar atau menahan posisi rugi tanpa Stop Loss hingga Equity terus menukik dan rasio **Margin Level** jatuh ke ambang **Stop Out** (umumnya 20%–50% tergantung ketentuan broker), mesin otomatis pialang akan langsung menutup paksa seluruh posisi tersebut guna mencegah saldo akun menjadi negatif (*Margin Call / Stop Out*).',
      'Sebelum menekan tombol `BUY` atau `SELL` di MT5, inspeksi **Specification Simbol** (`Contract Size = 1` pada Cent vs `100` pada Standar, `Volume Step = 0.01`, jam perdagangan, serta biaya *Swap* inap) merupakan SOP pra-penerbangan yang membedakan operator pesawat berlisensi dari penumpang yang menekan tombol kemudi secara acak.',
    ],
    sec2InstitutionalEn: [
      'Terminal survival relies on reading five MT5 balance indicators accurately: Balance, live Equity, locked Margin, Free Margin, and Margin Level % = (Equity / Margin) × 100%.',
      'Opening oversized lots without a hard Stop Loss drops Margin Level toward automated Stop Out triggers cleanly, making Symbol Specification verification mandatory ahead of any order.',
    ],
    anatomyRowsId: [
      ['Melihat angka Balance saja dan merasa tenang walau posisi terbuka rugi mengambang besar.', 'Broker menilai kesehatan nyatamu secara real-time dari Equity & Free Margin, bukan Balance.', 'Jaga posisi selalu memakai Hard Stop Loss sehingga Equity & Balance hampir tidak pernah jauh terpisah.'],
      ['Mengira "Leverage 1:2000" otomatis berarti risiko per trade ikut berlipat ganda.', 'Leverage hanya mengecilkan jaminan Margin awal; risiko riil 100% dikendalikan oleh Lot × Jarak SL!', 'Gunakan leverage tinggi secara bijak hanya untuk keringanan Margin, sambil mengunci Lot di 1% risiko.'],
      ['Langsung klik tombol Market Order baru mengisi SL dan TP belakangan (kalau sempat).', 'Lonjakan kilat 5 detik pasca klik bisa terjadi sebelum jarimu sempat mengedit angka Stop Loss.', 'Isi kolom Stop Loss & Take Profit di tiket MT5 SEBELUM jari menekan Buy/Sell!'],
    ],
    anatomyRowsEn: [
      ['Watching Balance exclusively while ignoring large floating losses.', 'MT5 risk monitors live Equity and Margin Level % continuously, not closed Balance.', 'Cap every trade upfront with a hard SL so floating Equity draws stay bounded cleanly under 1%.'],
      ['Confusing high Leverage with mandatory risk multiplication.', 'Leverage reduces locked Margin deposit requirements; true risk equals Lot × SL distance!', 'Keep leverage purely for margin cushion while strictly sizing Volume to 10 USC max loss.'],
      ['Firing blind market tickets and adding Stop Loss manually later.', 'Sudden millisecond spikes hit unprotected accounts faster than manual post-entry edits.', 'Populate exact Stop Loss coordinates BEFORE pressing Buy or Sell.'],
    ],
    sec4QuantId: [
      'Mari mengaudit neraca kokpit MT5 untuk modal $10 (1.000 USC) dengan Leverage 1:500 pada XAUUSDc 1 oz (harga emas `$2,650`). Nilai nosional kontrak 0,02 Cent lot adalah `0,02 × $2,650 = $53 USD` (setara `5.300 USC`). Dengan leverage 1:500, broker mengunci jaminan **Margin** hanya sebesar `5.300 USC ÷ 500 = 10,60 USC`.',
      'Artinya kamu masih memegang **Free Margin** ekstra longgar sebesar `1.000 - 10,60 = 989,40 USC` dengan **Margin Level** di angka sangat sehat `9.433%`! Jarak ke Stop Out masih ratusan dolar jauhnya, dan karena kamu sudah mengisi kotak **Hard Stop Loss** selebar $5 (`−10 USC`), posisi akan otomatis ditutup tertib pada sisa Equity `990 USC` jauh sebelum menyentuh bahaya Margin Call.',
      'Sekarang bandingkan bila seorang pemula ceroboh membuka `0,10 lot` di Akun Standar 100 oz atau `2,00 Cent lot` di akun `1.000 USC`: jaminan Margin langsung tersedot separuh dan Margin Level anjlok menuju Stop Out dalam hitungan menit.',
    ],
    sec4QuantEn: [
      'At 1:500 leverage on $2,650 XAUUSDc (1 oz Cent), 0.02 lot carries 5,300 USC notional weight, locking just 10.60 USC Margin and preserving 989.40 USC Free Margin (~9,433% Margin Level).',
      'Attaching a $5 Hard Stop Loss caps downside squarely at 10 USC (leaving 990 USC healthy Equity), eliminating Margin Call risk altogether.',
    ],
    sec4FormulaId: 'Margin Terkunci = (Lot × Contract Size × Harga) ÷ Leverage  |  Margin Level (%) = (Equity ÷ Margin) × 100%',
    sec4FormulaEn: 'Required Margin = (Lots × Contract Size × Price) ÷ Leverage  |  Margin Level % = (Equity ÷ Margin) × 100%',
    hotspots: makeHotspots(
      ['Audit Tab Specification Simbol', 'Perbedaan Balance vs Equity', 'Margin Terkunci & Free Margin', 'Wajib Isi SL Sebelum Klik'],
      ['Menampilkan ukuran kontrak tepat (1 oz Cent vs 100 oz Standar) serta Volume Step.', 'Equity mencerminkan kekayaan hidup yang menjadi patokan robot Stop Out pialang.', 'Leverage tinggi meringankan jaminan Margin sementara; bukan pemicu risiko bila Lot aman.', 'Hard SL tertanam langsung pada server broker walau HP atau internetmu terputus.'],
      ['Asal ketik 0.01 di XAUUSD Standar tanpa membaca halaman Contract Size.', 'Mengira angka Balance yang tinggi menandakan akun kebal Margin Call.', 'Menambah lapisan posisi ("averaging") ketika Margin Level menyentuh 150%.', 'Menunda pasang Stop Loss sampai berbalik arah menembus batas emosi.'],
      ['Verifikasi kata "Contract Size: 1" sebelum bertransaksi XAUUSDc.', 'Selalu pantau Equity dan persentase Margin Level di atas 1.000%.', 'Kunci rasio risiko 1% = 10 USC dengan slider kokpit MT5.', 'Jangan pernah klik Buy/Sell dengan kolom Stop Loss masih kosong (0.00000).']
    ),
    detective: {
      scenarioId: 'Sebuah akun berisi Balance 1.000 USC, tetapi trader membuka banyak posisi tanpa SL sehingga Floating Rugi membesar ke -920 USC (Equity tinggal 80 USC, Margin terkunci 200 USC -> Margin Level 40%). Apa yang seketika terjadi di MT5?',
      scenarioEn: 'Balance displays 1,000 USC, but floating losses drop live Equity to 80 USC against 200 USC locked Margin (40% Margin Level). What triggers next?',
      optionsId: [
        'Mesin otomatis pialang mengeksekusi Stop Out dengan menutup paksa posisi guna menyelamatkan saldo dari minus.',
        'Broker menaikkan saldo Balance secara gratis ke 2.000 USC.',
        'Aplikasi MT5 memperbesar target Take Profit secara otomatis.',
      ],
      optionsEn: [
        'Automated broker liquidation (Stop Out) force-closes active trades to halt further Equity losses.',
        'Broker gifts free credit up to 2,000 USC.',
        'Take Profit stretches automatically downward.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat! Stop Out bertumpu pada rasio Equity terhadap Margin. Gunakan selalu Hard SL 10 USC agar tidak pernah mendekati zona Stop Out!',
      explanationEn: 'Right! Stop Out fires purely off live Equity / Margin %. Attaching hard 10 USC stops prevents liquidation permanently.',
    },
    essayGuidanceHintsId: [
      'Jelaskan hubungan fungsional antara Balance, live Equity, Margin, Free Margin, dan rasio Stop Out.',
      'Mengapa leverage tinggi tidak berbahaya jika ukuran lot dikunci berdasar Stop Loss, namun mematikan bila over-lot?',
      'Sebutkan minimal 3 pengecekan di MT5 Specification & Order Ticket sebelum menekan tombol Buy/Sell pada modal 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Define Balance vs live Equity, Margin, Free Margin, and Margin Level % Stop Out triggers.',
      'Separate leverage margin elasticity from lot-based Stop Loss exposure.',
      'List exact pre-execution MT5 Specification and Ticket checks for 1,000 USC.',
    ],
  },

  // =========================================================================
  // SEMESTER 04 (RSK-201)
  // =========================================================================
  'why-small-accounts-blow-up': {
    slug: 'why-small-accounts-blow-up',
    photoUrl: PHOTOS.RISK_LEDGER,
    photoCaptionId: 'Kalibrasi Berat Kontrak Fisik Emas, Membandingkan beban 1 Batang Emas 31,1 Gram pada kontrak Standar vs Keping Mikro 0,31 Gram pada Cent.',
    photoCaptionEn: 'Physical Gold Mass Analogy, Comparing a full 31.1g Gold Bar on 0.01 Standard lots against a calm 0.31g Cent unit.',
    sandboxKind: 'INFLATION_DECAY',
    sec2InstitutionalId: [
      'Secara fisik dan matematis, penyebab kehancuran massal akun pemula bermodal $10 bukanlah kurangnya kemampuan membaca grafik, melainkan ketidakcocokan struktural (**Contract Granularity Mismatch**) antara ukuran kontrak broker dengan besar modal. Pada Akun Standar pada umumnya, `1,00 Lot` Emas merepresentasikan **100 troy ounce** (sekitar `3,11 kilogram` emas batangan fisik!).',
      'Konsekuensinya sangat kejam: ukuran paling mikro yang bisa diketik pemula di Akun Standar adalah `0,01 lot`, yang tetap mengendalikan **1 troy ounce penuh (31,1 gram emas seharga ~$2.650+)**. Pada berat 1 ounce tersebut, setiap kenaikan atau penurunan harga emas di dunia sebesar `$1,00` menggerakkan saldo rekeningmu langsung sebesar **`$1,00`**.',
      'Sementara di pasar Emas dunia, ayunan harga normal harian (*Average True Range*) berkisar antara **$18 hingga $35 per hari**. Artinya pada akun Standar bermodal `$10` menggunakan ukuran lot terkecil `0,01`, guncangan normal emas dalam satu atau dua jam saja (`$10`) sudah menyedot habis **100% seluruh modal**, tidak peduli seakurat apa analisismu.',
    ],
    sec2InstitutionalEn: [
      'Retail $10 accounts blow up not from bad chart instincts, but from a mathematical Contract Granularity Mismatch: 0.01 Standard lot still commands 1 full 31.1g Troy Ounce ($1 balance swing per $1 gold move).',
      'Since XAUUSD fluctuates $18–$35 daily via routine noise, $10 equity on a Standard account experiences fatal 100% variance inside normal market breathing.',
    ],
    anatomyRowsId: [
      ['Deposit $10 ke Akun Standar karena mengira "0,01 lot kan sudah ukuran paling kecil!".', '0,01 Standar masih memikul beban 1 oz penuh ($1/poin), setara 100% modal dalam ayunan $10.', 'Wajib konversi $10 menjadi 1.000 USC di Akun Cent berspesifikasi 1 oz per 1,00 Cent lot.'],
      ['Memasang Stop Loss super sempit $0,50 di Akun Standar demi memaksa risiko di bawah $1.', 'SL $0,50 langsung tersapu kebisingan normal spread + micro-wick dalam 30 detik.', 'Pada XAUUSDc Cent 0,02 lot, beri Stop Loss struktural wajar selebar $5,00 namun risiko tetap 10 USC!'],
      ['Merasa diri "tidak berbakat" setelah akun $10 habis 3 kali di minggu pertama.', 'Kamu hanya memasukkan mesin truk 31 kg ke dalam bagasi motor, bukan salah pengemudinya.', 'Ukur ulang seluruh simulasi menggunakan Lab Cent $10 = 1.000 USC sebelum menilai kemampuanmu.'],
    ],
    anatomyRowsEn: [
      ['Assuming 0.01 Standard lot is small enough for $10 equity.', '0.01 Standard lot exposes $10 accounts to $1 per $1 move, fatal amidst daily $25 ATR swings.', 'Route $10 cleanly into 1,000 USC Cent accounts featuring 1 oz per 1.00 lot sizing.'],
      ['Cramping micro $0.50 stops onto Standard accounts.', 'Sub-$1 stops get harvested immediately by normal Bid/Ask oscillation.', 'At 0.02 Cent lot, grant $5.00 of true structural breathing room for just 10 USC risk!'],
      ['Blaming personal discipline for Standard contract wipeouts.', 'No strategy survives structural position-sizing ratios above 50% equity per setup.', 'Benchmark skill strictly after matching contract weight to 1,000 USC denominations.'],
    ],
    sec4QuantId: [
      'Mari menguji angka riil pada situasi persis yang sering dialami pemula: Modal = `$10,00 USD`. Skenario A menggunakan Akun Standar (Contract Size = 100 oz), dan kamu menemukan setup emas XAUUSD bagus yang secara wajar membutuhkan jarak Stop Loss struktural selebar **`$5,00`** di bawah ayunan harga terbaru.',
      'Pada Skenario A (Akun Standar 0,01 lot): `0,01 × 100 oz × $5,00 = $5,00` kerugian, sekali salah tebak langsung menghancurkan **50% total rekening**! Jika ditambah spread dan 2 kali setup berturut-turut, saldo `$10` habis nol besar dalam sehari.',
      'Sekarang putar saklar ke Skenario B (**Akun Cent JGS: $10 = 1.000 USC, Contract Size = 1 oz**): dengan jarak Stop Loss leluasa yang persis sama **`$5,00`**, volume **`0,02 Cent lot`** menanggung kerugian hanya `0,02 × 1 oz × $5,00 × 100 USC = 10 USC ($0,10 / Rp1.600)` atau tepat **1,0% dari total modal**, memberimu **100 nyawa percobaan belajar**.',
    ],
    sec4QuantEn: [
      'Comparing an identical $5.00 structural Stop Loss on $10 equity: 0.01 Standard lot risks -$5.00 (-50% ruinous hit), whereas 0.02 Cent XAUUSDc risks strictly 10 USC (-1.0%, leaving 990 USC).',
      'That 50x mechanical compression transforms a $10 casino gamble into a calm 100-attempt institutional training lab.',
    ],
    sec4FormulaId: 'Beban Standar 0,01 Lot = 1 Troy Oz (31,1g) → SL $5 = −50% Modal  |  Beban Cent 0,02 Lot = 0,02 Oz (0,62g) → SL $5 = −1% (10 USC)',
    sec4FormulaEn: '0.01 Std (31.1g) $5 SL = −50% Equity  |  0.02 Cent (0.62g) $5 SL = −1% Equity (10 USC)',
    hotspots: makeHotspots(
      ['Standar 100 Oz (31,1g di 0,01 Lot)', 'Batas Volatilitas Emas Harian ($25)', 'Konversi Akun Cent ($10 -> 1.000 USC)', 'SL Struktur $5 = 10 USC (1%)'],
      ['Spesifikasi kontrak baku ritel memaksa ukuran terkecil memikul 1 full ounce emas.', 'XAUUSD berfluktuasi rata-rata $20+/hari, jauh melampaui ketahanan saldo $10.', 'Memecah dolar ke sen dengan kontrak 1 oz membuka presisi lot 50× lebih halus.', 'Memberi ruang struktur wajar tanpa pernah melewati batas bahaya 1% ekuitas.'],
      ['Menganggap "0,01 lot" selalu aman di segala jenis akun dan modal.', 'Memperkecil Stop Loss menjadi $0,40 di Standar sehingga terus terpicu noise.', 'Membiarkan floating loss melampaui $5 berharap harga akan berbalik sendiri.', 'Mengulangi deposit $10 berulang-ulang di Akun Standar yang salah wadah.'],
      ['Jangan pernah pakai Akun Standar 100 oz bila modalmu di bawah $500–$1.000.', 'Pastikan memilih tipe Akun Cent dengan akhiran simbol "c" (XAUUSDc).', 'Konversikan $10 ke 1.000 USC pada kalkulator Cent Lab JGS.', 'Kunci risiko di 10 USC/trade dengan 0,02 Cent lot pada SL $5.']
    ),
    detective: {
      scenarioId: 'Rino baru deposit $10 ke Akun Standar dan membuka ukuran lot paling kecil 0,01 di XAUUSD dengan jarak Stop Loss tipis $4,00. Mengapa satu SL langsung membuat rekeningnya hampir hancur (-40%)?',
      scenarioEn: 'Rino deposits $10 into a Standard account and enters the smallest 0.01 XAUUSD lot with a tight $4.00 Stop Loss. Why does 1 loss lose -40%?',
      optionsId: [
        'Karena 0,01 Standar (kontrak 100 oz) tetap mengendalikan 1 oz penuh ($1 per $1 gerak emas -> SL $4 = -$4 atau -40% dari $10).',
        'Karena hari itu bunga bank sentral naik.',
        'Karena komputer Rino belum terhubung ke TradingView.',
      ],
      optionsEn: [
        'Because 0.01 Standard lot on a 100 oz contract still carries 1 full ounce ($1/pt -> $4 SL = -$4 or -40% wiped).',
        'Central bank rates shifted mid-day.',
        'TradingView wasn’t linked.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Kontrak 100 oz pada Akun Standar tidak cocok untuk modal $10; ia butuh wadah Akun Cent 1 oz (1.000 USC) agar SL $4/5 hanya bernilai 1%.',
      explanationEn: 'Exactly! 100 oz Standard contracts mechanically crush $10 balances, requiring 1 oz Cent denomination.',
    },
    essayGuidanceHintsId: [
      'Bandingkan hitungan berat kontrak antara 100 oz Akun Standar (0,01 lot = 1 oz) vs 1 oz Akun Cent.',
      'Jelaskan dampak ayunan normal ATR XAUUSD harian terhadap modal $10 bila memakai Akun Standar.',
      'Hitung tepat mengapa $10 = 1.000 USC dengan 0,02 Cent lot mampu memberi ruang SL $5 hanya seharga 10 USC (1%).',
    ],
    essayGuidanceHintsEn: [
      'Contrast 100 oz Standard vs 1 oz Cent contract sizing mathematics explicitly.',
      'Connect daily XAUUSD ATR ranges directly to Standard account ruin.',
      'Prove numerically why 0.02 Cent lot limits a $5 stop to 10 USC (1% of 1,000 USC).',
    ],
  },

  'how-cent-accounts-work': {
    slug: 'how-cent-accounts-work',
    photoUrl: PHOTOS.RISK_LEDGER,
    photoCaptionId: 'Presisi Rekayasa Posisi Mikro, Membulatkan ukuran lot ke bawah (Floor Step) agar risiko aktual tidak pernah melewati pagar 1% (10 USC).',
    photoCaptionEn: 'Precision Micro Position Sizing, Flooring raw calculated lots to compliant broker steps so risk never breaches 10 USC.',
    sandboxKind: 'INFLATION_DECAY',
    sec2InstitutionalId: [
      'Di meja manajemen risiko institusional maupun mesin `risk-engine.ts` milik THE JEY GANG STRATEGIST, jumlah lot **TIDAK PERNAH** dipilih dari kebiasaan pribadi ("biasa pakai 0,05 lot biar cepat untung"). Sebaliknya, volume adalah hasil turunan matematis yang selalu berubah mengikuti jarak Stop Loss struktural: `Lot Ideal = Anggaran Risiko ÷ (Jarak SL × Tick Value per 1 Lot)`.',
      'Kaidah kedua yang kerap dilanggar kalkulator amatir adalah **Aturan Pembulatan ke Bawah (*Floor Step Rounding*)**. Apabila hasil hitungan matematis menghasilkan angka ideal `0,028 Cent lot` dengan ketetapan `Volume Step = 0,01` dan batas minimum broker `0,01`, meja JGS **DILARANG Keras** membulatkannya ke atas menjadi `0,03 lot`, karena membulatkan ke atas memicu pelanggaran batas risiko di atas `1%`!',
      'Lebih tegas lagi, bila jarak Stop Loss yang dituntut struktur pasar ternyata terlalu lebar (misalnya `$15,00`) sementara batas `10 USC` menuntut `0,006 lot` yang berada di bawah ukuran minimum broker `0,01`, algoritma penilai JGS secara tegas memproduksi keputusan **`REJECT TRADE / PASS`**: lebih baik tidak mengambil setup hari ini daripada melanggar batas minimum 1%.',
    ],
    sec2InstitutionalEn: [
      'Professional desks never enter static habit lots; volume derives strictly backwards from structural SL invalidation distance: Lot = Risk Budget ÷ (SL Distance × Contract Tick Value).',
      'Moreover, strict Floor Step Rounding ensures ideal fractional lots round downward cleanly, or trigger an explicit Trade Rejection if even the minimum broker lot breaches 1%.',
    ],
    anatomyRowsId: [
      ['Selalu memakai lot tetap 0,05 apa pun lebar jarak Stop Loss-nya (bisa $2 atau $12).', 'Mengunci anggaran risiko tetap 1% (10 USC) lalu mengecilkan lot ketika jarak SL makin lebar.', 'Gunakan kalkulator Position Sizer JGS untuk membalik rumus dari SL ke ukuran lot pasti.'],
      ['Membulatkan hasil kalkulator 0,028 lot ke atas menjadi 0,03 agar "tampak genap".', 'Pembulatan ke atas diam-diam mendorong kerugian aktual menembus 1,07% melewati aturan SOP.', 'Terapkan Floor Step Rounding menjadi 0,02 lot sehingga risiko riil <= 1,00% selalu terjaga.'],
      ['Memaksa masuk 0,01 lot minimum walau risikonya saat SL lebar menjadi 25 USC (2,5%).', 'Jika minimum lot melanggar pagar batas risiko portofolio, posisi otomatis ditolak oleh sistem.', 'Jangan memaksa setup ber-SL $15 pada akun 1.000 USC; cari struktur M5/M15 ber-SL $3–$5.'],
    ],
    anatomyRowsEn: [
      ['Trading a rigid fixed lot regardless of Stop Loss distance.', 'Keeping dollar/cent risk constant at 1% while shrinking lot size inversely as SL widens.', 'Compute volume backwards from Stop invalidation via JGS Position Sizer.'],
      ['Rounding 0.028 ideal lots upward to 0.03.', 'Upward rounding quietly breaches hard risk caps past 1% portfolio mandates.', 'Enforce Floor Step Rounding downward to 0.02 so risk stays strictly <= 1.00%.'],
      ['Forcing minimum 0.01 lot even when wide SL creates 2.5% equity exposure.', 'Institutional risk guardians reject trades whenever minimum volume breaches capital bounds.', 'Pass oversized $15 setups on 1,000 USC until tight $3–$5 structural invalidation forms.'],
    ],
    sec4QuantId: [
      'Mari menguji dua kasus penghitungan langsung di kokpit Cent 1.000 USC (`Risk Cap 1% = 10 USC`, `Tick Value XAUUSDc 1 oz = 100 USC per $1 per 1.00 lot`, `Volume Step = 0,01`). Kasus 1: Setup M5 memiliki jarak Stop Loss selebar **`$3,60`**. Hitungannya adalah `Lot Ideal = 10 USC ÷ ($3,60 × 100) = 0,0277 lot`. Dengan aturan **Floor Step Rounding**, dibulatkan turun ke **`0,02 Cent lot`**, menjadikan risiko nyata hanya `0,02 × $3,60 × 100 = 7,20 USC (0,72%)`.',
      'Kasus 2 (Penolakan Sistem / Trade Reject): Sebuah setup struktur besar H4 memaksa penempatan Stop Loss selebar **`$14,00`** dari harga entry saat ini. Hitungannya menghasilkan `10 USC ÷ ($14,00 × 100) = 0,0071 lot`. Karena angka `0,0071` berada di bawah `Min Lot Broker = 0,01`, membuka `0,01 lot` akan memicu risiko `14 USC (1,4%)`.',
      'Keputusan Strategist sejati pada Kasus 2 bukanlah memaksakan masuk atau mendekatkan SL secara emosional ke garis sembarangan, melainkan bersabar menunggu harga masuk lebih dalam (*Refinement*) atau mencari peluang di jendela sesi selanjutnya agar `Lot >= 0,01` tanpa melampaui `10 USC`.',
    ],
    sec4QuantEn: [
      'On a $3.60 SL at 1,000 USC (10 USC risk ceiling), raw ideal sizing equals 0.0277 lots, which Floor Rounding lowers safely to 0.02 Cent lots (actual risk 7.20 USC / 0.72%).',
      'On a wide $14.00 H4 SL yielding 0.0071 lots (< 0.01 broker floor), JGS explicitly rejects entry until multi-timeframe refinement trims SL distance cleanly.',
    ],
    sec4FormulaId: 'Lot Presisi = Floor_0.01 [ Risiko Maks (USC) ÷ (Jarak SL ($) × Contract Size × 100) ]  |  Jika Hasil < 0,01 -> REJECT SETUP',
    sec4FormulaEn: 'Safe Lot = Floor_0.01 [ Max Risk (USC) ÷ (SL Distance × Contract Spec × 100) ]  |  If < 0.01 -> REJECT ENTRY',
    hotspots: makeHotspots(
      ['Anggaran Risiko Tetap (10 USC)', 'Jarak Invalidation SL Objektif', 'Floor Rounding ke Bawah (0,01)', 'Protokol Penolakan (Trade Reject)'],
      ['Selalu menentukan jumlah maksimal kerugian di depan (1% ekuitas), bukan menebak potensi cuan.', 'Diambil murni dari struktur teknikal (di belakang Sweep), bukan asal 10 pips.', 'Membulatkan ke kelipatan turun menjamin risiko nyata tidak pernah bocor melebihi batas.', 'Melindungi aturan 1% dengan berani berkata TIDAK jika lot minimum melampaui anggaran.'],
      ['Menentukan lot dulu ("pakai 0,10 saja") lalu menggeser-geser SL supaya tidak seram.', 'Menaruh SL super rapat tanpa struktur demi memaksakan lot besar.', 'Membulatkan hasil kalkulator ke atas karena tidak sabar.', 'Memaksa masuk walau kalkulator memperingatkan OVER_MINIMUM_LOT_RISK.'],
      ['Ukur SL struktural dulu di grafik TradingView sebelum hitung lot.', 'Gunakan kalkulator Position Sizer JGS agar perhitungan Floor otomatis berjalan.', 'Jika risiko <= 0,01 lot saja masih > 10 USC, tunggu koreksi lebih dekat atau skip.', 'Catat setiap persentase risiko aktual (<= 1%) di Jurnal Trader.']
    ),
    detective: {
      scenarioId: 'Modalmu 1.000 USC dengan batas risiko ketat 1% (10 USC). Kalkulator menghitung Lot Ideal = 0,019 Cent lot pada SL $5,26. Mana keputusan yang sah menurut standar kuantitatif JGS?',
      scenarioEn: 'On 1,000 USC equity capped strictly at 1% (10 USC), position formula yields 0.019 Cent lots on a $5.26 SL. Which execution strictly preserves risk rules?',
      optionsId: [
        'Membulatkan ke bawah (Floor Rounding) ke 0,01 Cent lot (risiko nyata 5,26 USC = 0,53%, aman di bawah batas 1%).',
        'Membulatkan ke atas ke 0,02 Cent lot agar bulat (risiko jadi 10,52 USC / 1,05%).',
        'Memakai 0,10 Cent lot lalu berdoa tidak kena SL.',
      ],
      optionsEn: [
        'Floor round downward strictly to 0.01 Cent lot (actual risk 5.26 USC = 0.53%, cleanly beneath 1% cap).',
        'Round upward to 0.02 Cent lot (breaching risk ceiling at 10.52 USC).',
        'Enter 0.10 Cent lot ignoring limits.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Prinsip Floor Rounding menjamin eksposur risiko aktual selalu <= target batas atas (1,00%), tidak pernah membengkak walau 0,05%.',
      explanationEn: 'Exactly! Downward step flooring ensures actual exposure stays strictly beneath your maximum risk mandate.',
    },
    essayGuidanceHintsId: [
      'Jelaskan alur rumus terbalik Position Sizing (memulai dari Risk Cap & Jarak SL objektif, baru memperoleh ukuran lot).',
      'Mengapa JGS mewajibkan Pembulatan ke Bawah (Floor Rounding) dan kapan sistem harus menolak posisi (REJECT)?',
      'Beri contoh konkret angka SL di akun Cent XAUUSDc 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Derive volume backwards from Risk Budget and objective SL distance.',
      'Explain mandatory Floor Rounding and minimum-lot Trade Rejection rules.',
      'Demonstrate exact XAUUSDc 1,000 USC numerical math cleanly.',
    ],
  },

  'circuit-breakers-and-daily-loss-limits': {
    slug: 'circuit-breakers-and-daily-loss-limits',
    photoUrl: PHOTOS.RISK_LEDGER,
    photoCaptionId: 'Sekring Pengaman Bursa & Portofolio, Kurva eksponensial pemulihan drawdown serta rem batas rugi harian (Daily Loss Circuit Breaker).',
    photoCaptionEn: 'Institutional Drawdown Circuit Breakers, Enforcing non-linear loss caps and daily portfolio lockouts before tilt takes hold.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Dalam arsitektur dana lindung nilai (*Hedge Funds*) maupun prop-trading desk profesional, risiko terberat bukan kekalahan satu transaksi, melainkan fenomena **Non-Linear Drawdown Asymmetry**: secara matematis, untuk memulihkan kerugian `-10%` hanya butuh keuntungan `+11,1%`; kehilangan `-25%` menuntut profit `+33,3%`; kehilangan `-50%` mewajibkan mencetak `+100%` pengembalian; dan kejatuhan `-90%` menuntut keajaiban `+900%` sekadar untuk pulang ke modal awal!',
      'Lebih jauh, teoretikus Ed Thorp dan J.L. Kelly (1956) melalui **Kelly Criterion** membuktikan bahwa bertaruh melewati titik ukuran optimal (*Over-Betting*) secara paradoks langsung menurunkan tingkat pertumbuhan geometrik jangka panjang menuju nol dan melambungkan **Risk of Ruin** (*probabilitas kebangkrutan*) walaupun sistem tersebut sebenarnya memiliki winrate positif!',
      'Karena otak manusia mengalami kemerosotan logika sesudah dua hingga tiga kali rugi beruntun (*Revenge Mode / Tilt*), institusi memasang **Rem Sirkuit Harian Otomatis (*Daily Circuit Breaker*)**: bila ekuitas turun `3%` (`30 USC`) atau mengalami 2–3 kali rugi beruntun pada hari tersebut, terminal wajib ditutup paksa hingga sesi esok hari.',
    ],
    sec2InstitutionalEn: [
      'Drawdown recovery math is mercilessly nonlinear: -10% demands +11.1% recovery, -50% demands +100%, and -90% demands +900% just to return to starting equity.',
      'Combining Fractional Kelly sizing with an automatic 3% (30 USC) Daily Loss Circuit Breaker eliminates Risk of Ruin statistically across long streaks.',
    ],
    anatomyRowsId: [
      ['Menganggap "rugi -50% tinggal cari cuan +50% besok biar balik modal".', 'Matematika persentase membuat kerugian -50% wajib dibalas keuntungan +100% hanya untuk impas!', 'Cegah drawdown mencapai >10% melalui disiplin batas rugi 1% per trade.'],
      ['Setelah kena 2 kali SL beruntun, langsung lipat ukuran lot agar sekali balik modal.', 'Memperbesar lot di tengah drawdown menggandakan probabilitas kehancuran (Risk of Ruin).', 'Pasang Rem Darurat Harian: 3 kali SL (30 USC) = Tutup MT5 24 jam penuh.'],
      ['Mengira sistem profit 60% winrate mustahil mengalami 6 kali kalah beruntun.', 'Dalam 100 transaksi acak pada winrate 60%, peluang mengalami 5–6 loss beruntun nyaris pasti terjadi!', 'Pastikan modal tahan 10–15 kekalahan beruntun tanpa goyang berkat batas risiko 1%.'],
    ],
    anatomyRowsEn: [
      ['Thinking -50% losses only need +50% gains to recover.', 'Asymmetric compounding turns -50% hits into mandatory +100% recovery hills.', 'Keep losses strictly below 10% total variance via 1% unit sizing.'],
      ['Doubling volume directly after two consecutive losses.', 'Accelerating size mid-drawdown triggers steep geometric Risk of Ruin decay.', 'Lock out MT5 automatically at -3% daily equity (30 USC) or 3 straight SLs.'],
      ['Underestimating normal losing streaks in profitable edges.', 'Even a healthy 55% edge routinely yields 6+ straight losses over 100 trades.', '1% per-trade sizing ensures 6 straight stops leave 94% capital ready calmly.'],
    ],
    sec4QuantId: [
      'Buktikan sendiri ketidakseimbangan kurva Drawdown pada saldo `1.000 USC`: apabila kamu melanggar aturan lalu rugi `-50%` sehingga ekuitas tersisa `500 USC`, untuk sekadar kembali ke angka `1.000 USC`, akun `500 USC` tersebut wajib mencetak profit `500 ÷ 500 = +100%` penuh! Jika kerugian dibiarkan menyentuh `-80%` (sisa `200 USC`), maka target impas meledak ke `800 ÷ 200 = +400%`!',
      'Sekarang bandingkan dengan pelindung akun JGS (`1% Risiko = 10 USC per trade`, `Rem Harian = 30 USC`). Katakan kamu mengalami pekan paling apes dengan 6 kali kalah beruntun sesuai distribusi probabilitas statistik normal pada winrate 50%!',
      'Setelah 6 kekalahan tertib tersebut, modal 1.000 USC masih utuh di angka **`941 USC`** (turun hanya `-5,9%`). Berapa keuntungan yang dibutuhkan dari `941 USC` agar pulang ke `1.000 USC`? Hanya **`+6,27%`**, cukup terjawab oleh 3 transaksi winning rasio `1:2 R:R` secara santai!',
    ],
    sec4QuantEn: [
      'Dropping from 1,000 USC to 500 USC (-50%) forces a daunting +100% doubling climb back to breakeven. By contrast, capping 6 straight worst-case losses at 1% leaves 941 USC equity (-5.9%) needing only a calm +6.27% recovery!',
      'Pairing 1% sizing with a 30 USC daily lockout protects compounding elasticity permanently.',
    ],
    sec4FormulaId: 'Rasio Pemulihan Wajib = Drawdown% ÷ (100% − Drawdown%)  |  -50% Butuh +100%  |  -5,9% (6 Loss @ 1%) Butuh +6,27%',
    sec4FormulaEn: 'Required Recovery % = Drawdown% ÷ (1 − Drawdown%)  |  −50% Demands +100%  |  −5.9% Needs Only +6.27%',
    hotspots: makeHotspots(
      ['Zona Aman 1% (-1% to -5%)', 'Titik Bahaya Tengah (-25% -> +33%)', 'Tebing Kehancuran (-50% -> +100%)', 'Rem Darurat Harian (-30 USC)'],
      ['Pemulihan hampir linier (+6% s/d +11%) tanpa membebani psikologi otak.', 'Kurva mulai menanjak lebih curam dan mengikis kepercayaan diri eksekutor.', 'Menuntut pelipatgandaan modal dua kali lipat sekadar kembali ke angka awal.', 'Memutus rantai amarah balas dendam secara mekanis sebelum mencapai zona -25%.'],
      ['Memakai lot 5%–10% saat baru mulai memahami sistem.', 'Menaikkan target lot sesudah mengalami drawdown tengah.', 'Menghapus Stop Loss karena takut melihat angka -50% terealisasi.', 'Terus trading pukul 23:30 WIB saat kepala panas sesudah 3 kali SL.'],
      ['Kunci maksimum risiko tepat di 1% (10 USC) per ide setup.', 'Turunkan lot jadi setengahnya bila drawdown mingguan mencapai -5%.', 'Hormati Hard SL sebagai biaya operasional bisnis.', 'Tutup paksa aplikasi MT5 ketika batas -30 USC tercapai dalam 1 hari.']
    ),
    detective: {
      scenarioId: 'Doni nekat risiko besar sehingga akun Cent 1.000 USC miliknya merosot -60% tersisa 400 USC. Ia yakin "besok cukup cari untung +60% lagi biar kembali 1.000 USC!". Mengapa hitungan Doni salah fatal?',
      scenarioEn: 'Doni loses -60% down from 1,000 to 400 USC and thinks "+60% return restores 1,000 USC!" Catch the math flaw:',
      optionsId: [
        'Dari 400 USC, kenaikan +60% hanya menghasilkan 640 USC! Doni wajib mencetak profit +150% (lebih dari dua kali lipat!) hanya untuk balik impas ke 1.000 USC.',
        'Karena broker memotong pajak 60% saat modal turun.',
        'Karena 400 USC otomatis kembali ke 1.000 USC awal bulan.',
      ],
      optionsEn: [
        '+60% on 400 USC recovers only to 640 USC! He actually needs +150% returns cleanly just to reach breakeven 1,000 USC.',
        'Brokers charge a 60% recovery surcharge.',
        'Balances reset monthly.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Itu hukum kejam matematika persentase non-linear: menjaga batas kerugian awal jauh lebih mudah daripada mendaki tebing +150%!',
      explanationEn: 'Right! Nonlinear math means defending initial equity beats attempting extreme +150% recovery climbs.',
    },
    essayGuidanceHintsId: [
      'Tunjukkan secara numerik mengapa penurunan -50% memaksa pertumbuhan +100% hanya untuk balik impas.',
      'Jelaskan konsep Over-Betting pada Kelly Criterion serta hubungan Daily Circuit Breaker dengan psikologi emosi.',
      'Berapa batas kerugian per transaksi & per hari yang kamu terapkan pada saldo 1.000 USC serta tindakan saat batas harian tercapai?',
    ],
    essayGuidanceHintsEn: [
      'Demonstrate nonlinear recovery math numerically (-50% -> +100%).',
      'Explain Kelly Criterion over-betting risk and Daily Circuit Breaker psychology.',
      'Specify exact 10 USC per-trade and 30 USC daily lockout enforcement.',
    ],
  },

  // =========================================================================
  // SEMESTER 05 (TEC-202)
  // =========================================================================
  'candlestick-psychology-and-wicks': {
    slug: 'candlestick-psychology-and-wicks',
    photoUrl: PHOTOS.CANDLE_SCREEN,
    photoCaptionId: 'Visualisasi Harga Batang Lilin (OHLC), Warisan catatan perdagangan beras Munehisa Homma (Sakata, abad ke-18) dan Hukum Tren Charles Dow.',
    photoCaptionEn: 'OHLC Candlestick Psychology, Synthesizing 1750s Sakata rice-market footprints with Charles Dow’s 1900 market cycle laws.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Sebelum munculnya grafik digital, pedagang beras legendaris Jepang **Munehisa Homma (Sakata, tahun 1750-an)** menemukan bahwa harga komoditas berjangka di Bursa Dojima lebih mencerminkan ketakutan dan keserakahan pelaku daripada nilai fisik panen hari itu. Empat angka **OHLC** (*Open, High, Low, Close*) pada satu lilin candlestick merangkum seluruh pertempuran antara pembeli agresif vs penjual agresif pada rentang waktu tertentu.',
      'Dua hal krusial yang sering disalahpahami ritel tentang candlestick: pertama, **Body Lilin** menunjukkan selisih neto antara harga pembukaan dan penutupan, body solid besar tanpa ekor tebal menandakan dominasi mutlak salah satu kubu (*Institutional Displacement*); kedua, **Ekor Panjang (*Wick / Shadow*)** adalah bukti fisik **Penolakan Harga Agresif (*Liquidity Rejection*)** di mana pihak lawan menginjak rem dan membalikkan pasar dari titik ekstrem.',
      'Melengkapi catatan mikro Homma, editor pendiri *The Wall Street Journal* **Charles Dow (1900)** merumuskan struktur makro pasar yang tetap abadi satu abad kemudian: sebuah tren hanya dinilai sehat selama mengkonfirmasi diri melintasi tiga fase (*Akumulasi Awal, Partisipasi Publik, dan Distribusi Akhir*) serta harga baru dianggap sah saat penutupan candle mengunci arahnya.',
    ],
    sec2InstitutionalEn: [
      'Originated by Sakata rice trader Munehisa Homma (1750s) and framed macro-structurally by Charles Dow (1900), candlesticks visualize real-time liquidity exhaustion via body displacement vs extreme wick rejection.',
      'Crucially, valid candle anatomy confirmation requires waiting for bar close, never guessing mid-candle flips before settlement settles.',
    ],
    anatomyRowsId: [
      ['Menghafal puluhan nama pola lilin tunggal (Hammer, Shooting Star) di tengah pasar sepi.', 'Pola candlestick yang sama bermakna berbeda total bergantung lokasi likuiditas & tren HTF!', 'Baca pesan penolakan wick HANYA saat terbentuk tepat di area Liquidity / Struktur kunci.'],
      ['Masuk posisi BUY di tengah lilin hijau M15 saat waktu candle masih tersisa 9 menit lagi.', 'Sebelum candle tutup (Close), arus jual akhir bar kerap menarik seluruh body menjadi ekor merah atas!', 'Tunggu sampai detik penutupan candle (Candle Close Confirmation) sebelum menghitung risiko SL.'],
      ['Mengabaikan ukuran wick dan hanya menatap warna merah/hijau keseluruhan.', 'Ekor bawah yang sangat panjang menandakan pembelian pasif institusional menyerap tekanan jual ritel.', 'Letakkan Stop Loss aman di belakang ujung terjauh ekor penolakan tersebut.'],
    ],
    anatomyRowsEn: [
      ['Memorizing 30 isolated candle pattern names anywhere on charts.', 'Identical shapes signal opposite probabilities depending on higher-timeframe structure.', 'Read rejection wicks strictly at pre-marked Liquidity or Support/Supply boundaries.'],
      ['Buying a large live M15 green bar 9 minutes before close.', 'End-of-bar institutional counterflows frequently turn live green bodies into upper traps.', 'Wait cleanly until bar Close locks actual OHLC settlement before firing risk.'],
      ['Tracking bar color purely without assessing wick tails.', 'Long lower tails expose aggressive institutional absorption soaking up forced retail sales.', 'Place Stop invalidation clearly behind the outer extreme of the absorption tail.'],
    ],
    sec4QuantId: [
      'Bayangkan skenario klasik pada lilin M15 `XAUUSDc`: di pukul 20:08 WIB (sisa 7 menit sebelum penutupan lilin), harga memompa hijau besar naik `+$4,50` menembus garis atap kemarin. Pemula tanpa kesabaran langsung menekan `BUY` 0,03 Cent lot dengan harapan menyambar cuan lanjutan.',
      'Tujuh menit kemudian saat bar menutup pukul 20:15 WIB, ternyata arus jual institusional membanjiri puncak tersebut dan menghempaskan harga kembali turun `-$6,00` ke bawah harga pembukaan bar! Lilin yang tadi hijau kokoh berubah drastis menjadi *Upper Rejection Pinbar / Shooting Star* merah gelap, dan trader agresif tadi sudah terkena SL atau tersangkut rugi `-15 USC`.',
      'Aturan disiplin Charles Dow & Homma di akun 1.000 USC sederhana: **wajib menunggu penutupan candle (`Candle Close Confirmation`)**. Membiarkan waktu 7 menit habis membuatmu melihat pesan jujur ekor penolakan itu gratis tanpa membuang satu sen pun dari anggaran `10 USC`.',
    ],
    sec4QuantEn: [
      'Firing an entry mid-bar 7 minutes before M15 settlement exposes your 10 USC stop to complete wick reversal traps whenever institutional sales absorb the temporary spike.',
      'Awaiting official Candle Close confirmation reveals the completed footprint at zero financial cost.',
    ],
    sec4FormulaId: 'Anatomi Eksekusi Bersih = Lokasi Struktur Kunci + Penolakan Wick + Wajib Konfirmasi Candle Close (SL di Luar Ujung Ekor)',
    sec4FormulaEn: 'Valid Footprint Rule = Key Structural Level + Clear Wick Absorption + Mandatory Bar Close Confirmation',
    hotspots: makeHotspots(
      ['Open (Harga Pembukaan Sesi)', 'High (Puncak Penolakan Atas)', 'Low (Sapuan Ekor Bawah)', 'Close (Vonis Akhir Bar)'],
      ['Garis acuan awal tarung pembeli vs penjual pada periode waktu tersebut.', 'Ujung terjauh pembeli; ekor atas panjang menandakan pasokan jual kuat beraksi.', 'Ujung terjauh penjual; ekor bawah panjang membuktikan penyerapan beli aktif.', 'Angka penentu sahih siapa pemenang mutlak periode lilin tersebut.'],
      ['Entry sebelum Close walau waktu bar baru berjalan separuh jalan.', 'Memasang SL pas di tengah body lilin, bukan di luar ekor ekstrem.', 'Membaca Hammer di tengah sideways sempit sepi likuiditas.', 'Melupakan kerangka hukum tren besar Charles Dow saat membaca candle kecil.'],
      ['Selalu tunggu detik 00:00 penutupan candle di timeframe eksekusi.', 'Baca rasio ukuran ekor vs body sebagai peta penolakan order.', 'Pasang garis SL 10 USC di luar ujung ekor terluar guna terhindar sweep lanjutan.', 'Gabungkan sinyal candlestick dengan sesi aktif London/NY saja.']
    ),
    detective: {
      scenarioId: 'Sebuah candle M15 Emas sempat hijau penuh pukul 14:37 WIB, lalu dalam 8 menit terakhir anjlok tajam menyisakan ekor atas panjang dan menutup merah di bawah pembukaan. Apa makna objektif bar yang baru tutup itu?',
      scenarioEn: 'An M15 candle surged green mid-bar then slammed down into a red close leaving a tall upper wick. What did market footprints prove?',
      optionsId: [
        'Terjadi penolakan keras oleh pasokan jual (Supply) institusional di puncak atas yang menyerap pembeli pengejar breakout.',
        'Sinyal wajib BUY lebih besar lagi karena harga sempat naik tinggi.',
        'Candlestick tidak berlaku pada sesi London Open.',
      ],
      optionsEn: [
        'Aggressive overhead supply absorbed breakout buyers, rejecting higher prices convincingly at close.',
        'A guaranteed BUY signal solely from early intraday high spikes.',
        'Candlesticks invalidate automatically during London hours.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Itulah alasan mutlak menunggu Candle Close, ekor atas panjang membongkar jebakan pembeli di menit awal.',
      explanationEn: 'Right! Waiting for settlement prevents chasing fleeting mid-bar traps.',
    },
    essayGuidanceHintsId: [
      'Jelaskan filosofi OHLC dari Munehisa Homma dan apa arti fungsional ekor (wick) dibanding solid body.',
      'Kaitkan dengan syarat konfirmasi penutupan harga (Candle Close Confirmation) dari Charles Dow Theory.',
      'Mengapa menunggu Close dan menempatkan SL di luar ekor menyelamatkan ekuitas 1.000 USC (batas 10 USC)?',
    ],
    essayGuidanceHintsEn: [
      'Connect Munehisa Homma’s OHLC battle footprints and Charles Dow Close confirmation rules.',
      'Contrast solid displacement bodies versus absorption wicks.',
      'Explain how placing 10 USC invalidation stops outside wick extremes guards micro equity.',
    ],
  },

  'market-structure-support-supply': {
    slug: 'market-structure-support-supply',
    photoUrl: PHOTOS.EXCHANGE_FLOOR,
    photoCaptionId: 'Struktur Ayunan Pasar (Swing Structure), Pemetaan rantai Higher High / Higher Low (Tren Naik) serta Break of Structure yang sah.',
    photoCaptionEn: 'Classical Swing Architecture, Tracing Higher High / Higher Low uptrend continuations vs Break of Structure pivots.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Sebelum memasuki strategi kompleks, kerangka analisis struktural Charles Dow menetapkan definisi paling objektif arah pergerakan pasar: tren naik (*Bullish Uptrend*) sah **hanya** selama grafik terus mencetak rangkaian puncak lebih tinggi (**Higher High / HH**) dan lembah yang juga tidak mau turun menembus lembah sebelumnya (**Higher Low / HL**). Begitu lembah Higher Low penahan terakhir dipatahkan ke bawah dengan penutupan badan lilin utuh, tren naik tersebut secara struktural terhenti (*Change of Character / Break of Structure*).',
      'Banyak pemula tersesat oleh pola grafik buku teks tradisional (*Head & Shoulders*, *Double Top*, *Symmetrical Triangle*) karena mengira bentuk segitiga di layar itu sendiri yang menggerakkan harga! Padahal di meja institusi, area **Support & Resistance** sejatinya merupakan zona memori harga historis, bukan garis tipis satu piksel.',
      'Lebih krusial lagi: setiap garis puncak tinggi rata (*Double Top*) maupun lembah dasar rata (*Double Bottom*) yang digambar persis sama di seluruh layar trader ritel justru menarik ribuan order Stop Loss pada titik identik, menjadikannya magnet alami penjemputan likuiditas sebelum pergerakan struktur sejati terjadi.',
    ],
    sec2InstitutionalEn: [
      'Dow structure remains completely objective: Bullish flows preserve consecutive Higher Highs and Higher Lows, while decisive candle-body closes below the defending Higher Low signal structural breakdown.',
      'Support and Resistance behave as thick memory zones rather than razor-thin single lines, and ultra-neat Double Tops/Bottoms reliably cluster retail stops into obvious sweep targets.',
    ],
    anatomyRowsId: [
      ['Menggambar Support/Resistance sebagai garis tipis dan menempatkan SL persis 1 poin di belakangnya.', 'Zona Supply/Demand memiliki ketebalan area akibat sebaran antrean Limit Order institusi.', 'Perlakukan S&R sebagai zona pita dan letakkan SL 10 USC aman melampaui zona luar tersebut.'],
      ['Langsung SELL melawan tren Bullish murni hanya karena melihat puncak terlihat tinggi.', 'Mengikuti rangkaian HH/HL sampai terjadi pergeseran struktur (Break of Structure) nyata jauh lebih aman.', 'Selama Higher Low bertahan utuh, prioritaskan mencari setup BUY koreksi dibanding menebak puncak.'],
      ['Mempercayai pola "Double Bottom / Double Top" sebagai tembok baja yang mustahil ditembus.', 'Justru di bawah garis Double Bottom menumpuk ribuan SL posisi Buy ritel yang mengundang sapuan.', 'Tunggu harga menembus garis rata tersebut lalu berbalik naik sebelum mempertimbangkan entri.'],
    ],
    anatomyRowsEn: [
      ['Drawing hairline 1-tick Support lines for ultra-tight Stop placement.', 'Liquidity pools and historical order blocks occupy thick bands rather than single ticks.', 'Buffer invalidation stops outside outer zone boundaries cleanly.'],
      ['Shorting strong HH/HL rallies blindly calling them "too expensive".', 'Trends persist statistically until opposing flow breaks defending Higher Lows cleanly.', 'Side with confirmed structure until clear structural shift closes confirm change.'],
      ['Trusting neat retail Double Bottoms as unbreakable concrete floors.', 'Neat flat lows concentrate dense stop clusters inviting deliberate sweep excursions.', 'Await stop clearing and structural reclaim before risking 10 USC equity.'],
    ],
    sec4QuantId: [
      'Bayangkan `XAUUSDc` bergerak naik dalam struktur rapi `HH1 ($2,640) -> HL1 ($2,632) -> HH2 ($2,654) -> HL2 ($2,644)`. Selama harga bertahan di atas lembah pertahanan `HL2 ($2,644)`, kerangka tren naik masih resmi berlaku.',
      'Trader tanpa pemahaman struktur sering tergoda menebak puncak (*Pick the Top*) dengan terus-menerus menjual di `$2,648`, `$2,652`, dan `$2,656`, menghabiskan 3 kali Stop Loss berturut-turut sebesar `-30 USC` (batas harian jebol!). Sebaliknya, Strategist menunggu koreksi sehat mendekati wilayah `HL2 ($2,644)` atau zona reaksi sebelumnya agar jarak invalidasi menuju bawah `$2,640` selebar `$4,00` cukup dikalibrasi pakai `0,02 Cent lot` (risiko hanya `8 USC` / `0,8%`) dengan target `HH3 ($2,662 -> +36 USC / +4,5R)`!',
      'Struktur harga bukan sekadar garis estetika, ia adalah pengukur **Risk-to-Reward Asimetris**: tahu pasti titik invalidasi (di mana analisis otomatis salah) sehingga satu keberhasilan dapat menutupi tiga kerugian kecil sekaligus.',
    ],
    sec4QuantEn: [
      'Across a steady HH/HL sequence, waiting for pullback entries near defending Higher Lows narrows invalidation cleanly to ~$4.00 (0.02 lot = 8 USC risk) while targeting asymmetric +36 USC rallies.',
      'Clear structural invalidation removes guesswork completely from position sizing.',
    ],
    sec4FormulaId: 'Validasi Tren Naik = Penutupan di Atas HH Sebelumnya + Lembah HL Bertahan  |  R:R Asimetris = Target Struktur ÷ Jarak Invalidation HL',
    sec4FormulaEn: 'Valid Bullish Structure = Closes Above Prior HH + Defending HL Unbroken  |  Target R:R >= 1:2.5',
    hotspots: makeHotspots(
      ['Lembah Pengunci Struktur (HL)', 'Zona Memori Support (Pita Tebal)', 'Jebakan Garis Rata (Double Bottom)', 'Konfirmasi Break of Structure'],
      ['Titik penopang utama tren; patahnya titik ini oleh close body mengubah bias tren.', 'Kumpulan order beli historis tersebar sebagai zona, bukan satu harga tipis.', 'Puncak/Lembah rata mengundang Stop-Loss pool yang kerap disapu sekilas sebelum melaju.', 'Penutupan badan candle melampaui struktur lama menandai masuknya arus besar baru.'],
      ['Menebak puncak berulang kali di tengah tren HH/HL yang masih kokoh.', 'Menempatkan SL tepat di angka rata Double Bottom/Top tanpa penyangga.', 'Menganggap satu tusukan wick sebentar sebagai patah struktur penuh.', 'Masuk posisi di tengah-tengah ruang tanpa lokasi invalidasi struktural.'],
      ['Gambar zona pita Support/Resistance memakai blok area, bukan garis 1 piksel.', 'Ikuti arah HH/HL dan cari invalidasi jelas di balik HL untuk lot 10 USC.', 'Jangan kejar harga jauh di puncak HH; tunggu koreksi sehat ke zona keseimbangan.', 'Gunakan konfirmasi penutupan body saat mengidentifikasi patah struktur (BOS/MSS).']
    ),
    detective: {
      scenarioId: 'Harga Emas naik dari $2,620 ke $2,645 lalu koreksi ke $2,635 (HL) dan mencetak puncak baru $2,658 (HH). Lalu turun sebentar menguji $2,637 dan mantul. Apakah tren naik sudah berubah jadi Bearish?',
      scenarioEn: 'Gold rallies $2,620 -> $2,645 -> $2,635 (HL) -> $2,658 (HH), then pulls into $2,637 before rebounding. Did the trend flip Bearish?',
      optionsId: [
        'Belum! Lembah penopang Higher Low ($2,635) belum terpatahkan sama sekali, turun ke $2,637 masih merupakan retracement naik sehat.',
        'Sudah Bearish total karena turun -$21 dari puncak.',
        'Tren otomatis hancur setiap harga turun 3 candle merah.',
      ],
      optionsEn: [
        'No! Defending Higher Low ($2,635) remains intact, $2,637 reflects healthy pullback retention inside an uptrend.',
        'Yes, any -$21 retracement guarantees a bear crash.',
        'Three red candles reverse weekly trends automatically.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Selama Higher Low penahan tidak ditembus penutupan body ke bawah, struktur tren naik masih terjaga.',
      explanationEn: 'Right! Uptrends persist objectively until key defending Higher Lows surrender cleanly.',
    },
    essayGuidanceHintsId: [
      'Jelaskan definisi objektif HH/HL pada uptrend serta kapan struktur berubah (Break of Structure).',
      'Mengapa zona Support/Resistance diperlakukan sebagai pita tebal dan apa bahaya garis rata Double Bottom/Top?',
      'Bagaimana menentukan titik Stop Loss 10 USC berdasarkan invalidasi HL pada modal 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Define HH/HL structural trend retention vs clear Break of Structure closes.',
      'Explain why clean flat lines become liquidity magnets compared to buffered zones.',
      'Anchor 10 USC invalidation stops strictly beneath objective HL structure.',
    ],
  },

  'indicators-ma-rsi-macd-atr-lag': {
    slug: 'indicators-ma-rsi-macd-atr-lag',
    photoUrl: PHOTOS.STAT_RESEARCH,
    photoCaptionId: 'Bedah Matematis Indikator Teknikal, Memisahkan fungsi ukur volatilitas (ATR) dari jebakan indikator pengikut harga (Lagging MA, RSI, MACD).',
    photoCaptionEn: 'Quantitative Indicator Dissection, Separating forward risk volatility gauges (ATR) from lagging price derivatives (MA, RSI, MACD).',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Banyak pemula memandang garis **Moving Average (SMA/EMA)**, **RSI**, **MACD**, maupun **Bollinger Bands** sebagai bola kristal peramal masa depan, padahal secara aljabar murni, seluruh indikator tersebut merupakan transformasi tertinggal (**Lagging Mathematical Derivatives**) dari data harga OHLC yang SUDAH selesai terjadi! Moving Average periode 20 hanyalah penjumlahan harga penutupan 20 bar masa lalu dibagi 20.',
      'Persilangan *"Golden Cross"* antara EMA 50 dan EMA 200 baru muncul bermenit-menit atau berhari-hari **sesudah** pergerakan harga utama menempuh separuh perjalanan! Dan pada osilator **RSI** (*Relative Strength Index*), angka "Overbought > 70" di tengah tren kuat tidak berarti harga wajib turun, di tren makro kencang, RSI dapat bertahan di zona 75–85 sementara pemula yang menjual terus terkena Stop Out.',
      'Dari seluruh jajaran indikator klasik, satu alat ukur yang dihargai tinggi di meja kuantitatif profesional justru ialah **Average True Range (ATR)** buatan J. Welles Wilder (1978). ATR tidak mencoba meramal arah naik/turun, melainkan mengukur secara objektif **"berapa dolar rata-rata jarak ayunan liar suatu aset saat ini"** sebagai kalibrator jarak aman Stop Loss agar tidak tersapu volatilitas alami.',
    ],
    sec2InstitutionalEn: [
      'Moving Averages, RSI, MACD, and Bollinger Bands compute lagging averages strictly over past closed candles, making crossover signals structurally late during abrupt shifts and misleading ("Overbought traps") inside strong trends.',
      'By contrast, institutional desks utilize Average True Range (ATR) objectively to scale Stop Loss distances safely beyond normal noise.',
    ],
    anatomyRowsId: [
      ['Langsung SELL saat RSI menyentuh angka 75 ("katanya Overbought pasti turun!").', 'Di tren institusional kuat, RSI > 70 justru membuktikan momentum pembeli dominan bertahan lama.', 'Jangan jadikan RSI/Stochastic alasan tunggal entry; utamakan struktur HH/HL & liquidity.'],
      ['Memasang 6 indikator menumpuk hingga lilin candlestick nyaris tidak kelihatan di layar.', 'Setiap indikator memakai input OHLC sama, menumpuk 6 indikator sekadar menciptakan ilusi konfirmasi.', 'Bersihkan chart; pakai Struktur Harga + opsional ATR untuk mengkalibrasi nafas volatilitas SL.'],
      ['Menaruh Stop Loss konstan 20 pips di segala cuaca baik sepi Asia maupun liar New York.', 'Volatilitas ATR berubah sepanjang hari; SL terlalu sempit di sesi liar pasti tersapu noise.', 'Pastikan jarak Stop Loss > 1× hingga 1,5× nilai ATR terkini sebelum menghitung lot 10 USC.'],
    ],
    anatomyRowsEn: [
      ['Selling every RSI > 70 reading blindly calling it Overbought.', 'Strong institutional momentum stays extended over RSI 70+ across prolonged rallies.', 'Filter all setups with structural price action and macro bias before consulting momentum.'],
      ['Cluttering 6 overlapping OHLC indicators simultaneously.', 'Stacking derived indicators generates collinear false confidence rather than independent proof.', 'Keep pure OHLC charts clean and reserve quantitative ATR cleanly for risk sizing.'],
      ['Locking rigid tight Stop Losses when intraday volatility expands.', 'Fixed tiny stops under 1× current ATR get chopped routinely during NY surges.', 'Set invalidation wider than structural swings + volatility buffer, reducing lot to keep 10 USC steady.'],
    ],
    sec4QuantId: [
      'Mari menggabungkan **Average True Range (ATR)** ke manajemen modal `1.000 USC ($10)` guna menghindari Stop Loss yang tercekik. Misalkan di sesi Asia tenang nilai **ATR(14)** M15 emas hanya **`$1,40`**, namun saat London-NY overlap aktif, **ATR(14)** meluas menjadi **`$3,80`** per 15 menit.',
      'Seorang trader kaku memaksa pasang SL selebar `$1,20` terus di segala sesi. Karena `$1,20` jauh lebih kecil daripada nafas normal satu lilin saat ini (`$3,80`), ia terus tersapu rugi `-10 USC` beruntun meski arah prediksinya akhirnya benar!',
      'Strategist JGS membaca `ATR(14) = $3,80`, lalu menempatkan Stop Loss struktural sedikit di luar jangkauan `1,3 × ATR = $5,00`. Kemudian menghitung mundur `10 USC ÷ ($5,00 × 100) = 0,02 Cent lot`! Hasilnya: jarak Stop Loss punya nafas leluasa terhadap kebisingan volatilitas tinggi, sementara risiko finansialnya tetap terkunci persis di **`10 USC (1%)`**.',
    ],
    sec4QuantEn: [
      'When active session ATR(14) expands from $1.40 to $3.80 per M15 bar, placing a tight $1.20 stop loses repeatedly to routine bar noise.',
      'Scaling SL safely to 1.3× ATR ($5.00) while stepping volume cleanly down to 0.02 Cent lot guarantees full noise protection within an identical 10 USC (1%) loss budget.',
    ],
    sec4FormulaId: 'Batas Nafas SL Minimum >= 1,2 × ATR(14)  |  Lot Adaptif Volatilitas = 10 USC ÷ (SL Berbasis ATR × 100)',
    sec4FormulaEn: 'Volatility SL Floor >= 1.2 × ATR(14)  |  Adaptive Lot = 10 USC ÷ (ATR Stop Distance × 100)',
    hotspots: makeHotspots(
      ['Lagging MA Crossover (Terlambat)', 'Jebakan "Overbought" RSI > 70', 'Ilusi Konfirmasi Multi-Indikator', 'Kalibrasi Nafas SL dengan ATR'],
      ['Rata-rata harga lampau bergerak jauh di belakang real-time action.', 'Mengukur kecepatan gerak bukan berarti memprediksi titik berbalik arah.', 'Memakai 5 rumus berbeda atas satu set data harga menciptakan bias ganda.', 'Mengukur rata-rata rentang tinggi-rendah guna menyesuaikan ukuran posisi aman.'],
      ['Masuk telat di puncak gerakan saat Golden Cross baru menyala.', 'Melawan tren kuat terus-menerus hanya gara-gara jarum Stochastic jenuh beli.', 'Menutup chart dengan garis penuh warna hingga lupa struktur ayunan.', 'Mengabaikan pelebaran volatilitas saat memasang Stop Loss ketat.'],
      ['Gunakan struktur murni + penutupan candle sebagai sinyal primer.', 'Hindari menyalahkan indikator, pahami keterbatasan rumus belakangnya.', 'Pantau ATR untuk memastikan jarak SL > fluktuasi normal bar.', 'Kecilkan lot secara otomatis saat ATR melebar agar risiko tetap 10 USC.']
    ),
    detective: {
      scenarioId: 'Tren naik XAUUSD melaju kencang dan RSI menyentuh angka 78. Tiga pemula segera membuka posisi SELL bersamaan tanpa melihat break struktur apa pun. Apa jebakan klasik yang baru saja mereka injak?',
      scenarioEn: 'Gold rallies aggressively while RSI enters 78, prompting three novices to open unconfirmed short trades. Identify their trap:',
      optionsId: [
        'Mengira "Overbought RSI" berarti harga wajib langsung turun, padahal tren kuat bisa menahan RSI > 70 sangat lama hingga menyapu seluruh SL counter-trend.',
        'Karena indikator RSI hanya bekerja di hari Rabu.',
        'Karena angka 78 terlalu rendah untuk menjual.',
      ],
      optionsEn: [
        'Treating Overbought RSI as automatic reversal proof despite strong momentum holding RSI above 70 across prolonged runs.',
        'RSI stops computing cleanly outside mid-week.',
        'RSI 78 indicates strong short exhaustion only on Bitcoin.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Indikator oscillator hanya pengukur momentum lampau; tanpa Break of Structure nyata, menjual karena RSI tinggi amat berbahaya.',
      explanationEn: 'Right! Oscillators lag strong flows; counter-trend entries require structural shifts rather than high oscillator readings.',
    },
    essayGuidanceHintsId: [
      'Buktikan secara sederhana mengapa Moving Average & RSI bersifat lagging terhadap data harga OHLC lampau.',
      'Jelaskan bahaya langsung melawan tren hanya karena sinyal "Overbought / Oversold".',
      'Bagaimana memanfaatkan ATR secara konstruktif untuk menentukan jarak aman SL & lot di akun 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Explain mathematically why Moving Averages & RSI lag raw OHLC prints.',
      'Illustrate counter-trend Overbought traps clearly.',
      'Demonstrate scaling 10 USC Stop distances dynamically via ATR readings.',
    ],
  },

  // =========================================================================
  // SEMESTER 06 (WYC-203)
  // =========================================================================
  'wyckoff-laws-and-composite-man': {
    slug: 'wyckoff-laws-and-composite-man',
    photoUrl: PHOTOS.BANK_DISTRICTS,
    photoCaptionId: 'Teori Kolektif Pasar Richard D. Wyckoff (1930-an), Mengamati seluruh transaksi raksasa sebagai satu aktor tunggal "Composite Man" melalui 3 Hukum Fisika Pasar.',
    photoCaptionEn: 'Richard D. Wyckoff Methodology (1930s), Framing collective institutional campaigns via the Composite Man and 3 market physics laws.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Pada era tahun 1930-an di Wall Street, **Richard D. Wyckoff** menerbitkan kursus pasar legendaris yang hingga hari ini masih diajarkan di program sertifikasi Chartered Market Technician (CMT). Wyckoff memperkenalkan kerangka berpikir paling brilian bagi analisis arus institusi: pandanglah seluruh pergerakan besar yang dilakukan bank, fund manager, dan pembuat pasar sebagai satu tokoh tunggal di balik layar bernama **"Composite Man"**.',
      'Tokoh imajiner ini merencanakan kampanye akumulasi secara tenang ketika publik panik menjual, lalu menggiring pasar naik melalui **3 Hukum Dasar Fisika Pasar Wyckoff**: (1) **Law of Supply and Demand** (bila permintaan melampaui pasokan, harga naik; bila pasokan berlebih, harga jatuh), (2) **Law of Cause and Effect** (seberapa besar dorongan tren naik *Effect* sebanding lurus dengan lamanya konsolidasi pengumpulan barang *Cause* sebelum breakout), dan (3) **Law of Effort vs Result** (membandingkan tenaga Volume terhadap hasil jarak candle).',
      'Ketika terjadi divergensi antara *Effort vs Result*, misalnya Volume transaksi meledak sangat raksasa tetapi jarak kemajuan candle sangat tipis, itu pertanda keras Composite Man sedang menyerap pasokan lawan secara diam-diam di zona putar balik tren.',
    ],
    sec2InstitutionalEn: [
      'Wyckoff unified institutional price behavior under one strategic persona, the Composite Man, operating through 3 laws: Supply & Demand imbalance, Cause & Effect accumulation breadth, and Effort (Volume) vs Result (Candle Spread).',
      'Massive volume accompanied by shrinking net candle progression flags hidden institutional absorption turning prevailing momentum.',
    ],
    anatomyRowsId: [
      ['Mencari breakout naik besar hanya dari konsolidasi sempit berdurasi 15 menit.', 'Hukum Cause & Effect menuntut fase akumulasi sebanding untuk menyuplai tren besar.', 'Ukur lebar range konsolidasi sebelum mematok target rasio 1:3 R:R.'],
      ['Tidak memerhatikan keselarasan antara besarnya Volume terhadap panjang tubuh candle.', 'Volume raksasa + candle doji/sempit = sinyal keras penyerapan (Absorption) institusional.', 'Waspadai tanda Effort vs Result di level batas tinggi/rendah agar terhindar jebakan.'],
      ['Mengira harga jatuh murni karena "bandar jahat" secara personal menargetkan akunmu.', 'Composite Man beroperasi secara objektif mengakumulasi barang murah dari penjualan emosional publik.', 'Jadilah pengamat tenang perilaku Composite Man dengan batas risiko tetap 10 USC.'],
    ],
    anatomyRowsEn: [
      ['Expecting multi-day vertical rallies off brief 15-minute consolidations.', 'Law of Cause & Effect requires proportional accumulation breadth to fuel extended markups.', 'Match TP expansion expectations reasonably to underlying base range durations.'],
      ['Ignoring mismatches between Volume surges and tiny candle bodies.', 'Ultra-high Effort producing zero net Result signals silent institutional limit absorption.', 'Respect extreme Effort/Result divergences at structural boundaries.'],
      ['Personalizing sudden stops as broker vendettas against $10 tickets.', 'Composite institutional flows systematically harvest panicked liquidity into inventories.', 'Align execution beside Composite absorption rather than selling panic troughs.'],
    ],
    sec4QuantId: [
      'Mari menghubungkan Hukum Kedua (*Cause and Effect*) dan Ketiga (*Effort vs Result*) ke strategi akun mikro `1.000 USC ($10)`. Misalkan sepanjang pukul 07:00 sampai 13:30 WIB, Emas bergerak mendatar tenang membentuk kotak akumulasi berlebar `$6,00` (*Cause* selama 6,5 jam berturut-turut) sementara volume transaksi meningkat diam-diam tanpa menembus bawah kotak secara permanen.',
      'Pemula yang bosan mulai masuk keluar acak di tengah kotak (*Chop*), membuang 3 kali Stop Loss sempit seharga `-30 USC` karena terombang-ambing antara batas atas & bawah kotak. Sebaliknya, siswa Wyckoff sadar semakin lama fase *Cause* matang tanpa jebol turun, potensi dorongan *Effect* keluar dari kotak kelak dapat mencapai `$12–$18`.',
      'Saat konfirmasi keluar kotak muncul bersama candle dorongan bersih, satu transaksi **`0,02 Cent lot`** ber-SL `$4,50` (`9 USC / 0,9%`) mampu mengincar target `Effect` di `+$22 USC (+2,4R)` tanpa harus membuang amunisi selama jam mendatar yang membosankan.',
    ],
    sec4QuantEn: [
      'During calm 6-hour Asian accumulation ranges, rushing trades mid-box burns multiple 10 USC bullets inside sideways noise; waiting patiently for validated Effect breakout releases clean +2.4R asymmetric expansion.',
      'Proportional Cause builds the fuel enabling clean 10 USC-protected structural targets.',
    ],
    sec4FormulaId: 'Target Efek Berbanding Lurus dengan Panjang Akumulasi (Cause)  |  Anomali Absorption: Volume Tinggi + Candle Sempit',
    sec4FormulaEn: 'Trend Expansion (Effect) ∝ Consolidation Duration (Cause)  |  Absorption Divergence: High Effort + Tiny Result',
    hotspots: makeHotspots(
      ['Tokoh Kolektif Composite Man', 'Hukum 1: Supply vs Demand', 'Hukum 2: Cause vs Effect', 'Hukum 3: Effort vs Result'],
      ['Metafora Wyckoff agar publik membaca niat akumulasi dana raksasa di grafik.', 'Ketidakseimbangan order agresif melawan inventori pasif menjadi motor perubahan harga.', 'Makin lebar fase persiapan mendatar (Cause), makin jauh potensi tren (Effect).', 'Volume besar + kemajuan harga kecil menandai pergantian tangan institusi.'],
      ['Trading aktif di tengah-tengah kisaran konsolidasi sempit tanpa konfirmasi.', 'Mengabaikan lonjakan volume tidak normal di pucuk kenaikan.', 'Mengira target 1:5 R:R bisa didapat dari akumulasi 20 menit.', 'Melawan arah sesudah ketidakseimbangan Supply/Demand menembus batas range.'],
      ['Latih mata membedakan fase sideways akumulasi vs fase Markup.', 'Tahan jari selama fase sideways agar biaya 10 USC tetap utuh.', 'Periksa tanda penyerapan Effort vs Result pada batas range kunci.', 'Ikut bergerak searah breakout berkonfirmasi setelah akumulasi selesai.']
    ),
    detective: {
      scenarioId: 'Setelah reli panjang 3 hari, Emas mencetak candle dengan Volume terbesar bulan ini tepat di area puncak, namun ukuran tubuh candle-nya amat sempit (hampir Doji) lalu harga langsung meluncur turun. Hukum Wyckoff mana yang bekerja?',
      scenarioEn: 'After a 3-day rally, Gold prints the month’s highest volume bar right at resistance yet forms a tiny narrow-range body before dropping sharply. Which Wyckoff Law signaled this turn?',
      optionsId: [
        'Hukum 3 (Effort vs Result): Volume raksasa gagal menghasilkan kemajuan harga naik karena pasokan institusi menyerap penuh seluruh pembeli ritel.',
        'Hukum 1 saja tanpa adanya peranan pembeli sama sekali.',
        'Karena pasar mengabaikan volume di hari Jumat.',
      ],
      optionsEn: [
        'Law 3 (Effort vs Result Divergence): Massive volume failed to advance price upward because institutional selling absorbed retail demand completely.',
        'Law 1 alone with zero buyer presence.',
        'Market ignores Friday volume mechanically.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat sekali! Volume luar biasa (Effort) yang menghasilkan kemajuan harga mini (Result) merupakan jejak klasik pergantian tangan Composite Man.',
      explanationEn: 'Exactly right! Divergence between extreme Volume effort and stalled candle spread flags institutional absorption.',
    },
    essayGuidanceHintsId: [
      'Jelaskan konsep "Composite Man" dan ringkaskan secara tepat 3 Hukum Dasar Wyckoff.',
      'Bagaimana anomali Effort (Volume) vs Result (Spread candle) menyingkap distribusi/akumulasi institusional?',
      'Mengapa menghormati hukum Cause & Effect menghindari overtrading di tengah range demi menjaga saldo 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Explain the Composite Man concept and summarize all 3 foundational Wyckoff Laws.',
      'Show how high-volume Effort stalling into narrow Result reveals absorption.',
      'Explain how patience inside accumulation ranges saves 1,000 USC stops from chop.',
    ],
  },

  'wyckoff-accumulation-spring-upthrust': {
    slug: 'wyckoff-accumulation-spring-upthrust',
    photoUrl: PHOTOS.GOLD_VAULT,
    photoCaptionId: 'Anatomi Fase Wyckoff (Fase A hingga E), Bagaimana penembusan palsu Fase C ("Spring") membersihkan posisi lemah sebelum tren Markup meluncur.',
    photoCaptionEn: 'Wyckoff Accumulation Phases A–E, Engineering Phase C Spring stop-clears to fuel clean Phase D/E institutional Markups.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Richard Wyckoff memetakan peta jalan lengkap bagaimana institusi mengisi jutaan lembar kontrak tanpa menaikkan harga sendiri terlalu cepat melalui **Skema Akumulasi 5 Fase (Phase A–E)**: dimulai dari berhentinya tren turun lewat kepanikan *Selling Climax* dan pantulan otomatis (*Phase A*), berlanjut membangun koridor keseimbangan perdagangan untuk menyerap stok berbulan-bulan (*Phase B*).',
      'Puncak rekayasa manipulasi likuiditas muncul tepat di **Phase C** melalui manuver terkenal bernama **Wyckoff Spring** (pada akumulasi beli) maupun **UTAD / Upthrust After Distribution** (pada distribusi jual): harga sengaja didorong menembus sedikit di bawah garis Support kotak *Phase B* guna memicu kepanikan jual trader Breakout dan mengeksekusi kumpulan Stop Loss posisi Long ritel!',
      'Begitu seluruh pihak penjual terpaksa membuang barang murah ke kantong Composite Man, harga dengan cepat melesat masuk kembali ke dalam kotak dan menembus atap range (*Sign of Strength / Phase D*) lalu menguji kembali (*Last Point of Support / Phase E*). Titik balik inilah cikal bakal asli berabad-abad sebelum era modern menamainya *"Liquidity Sweep / Judas Swing"*.',
    ],
    sec2InstitutionalEn: [
      'Wyckoff’s A–E accumulation engine halts downtrends cleanly (Phase A), absorbs inventory through prolonged ranges (Phase B), engineers a sharp deceptive Shakeout piercing bottom Support known as the Spring (Phase C) to clear weak retail holders, and launches Phase D–E Markups.',
      'The Phase C Wyckoff Spring is virtually identical mechanically to modern ICT Stop Hunt / SSL Liquidity Sweeps.',
    ],
    anatomyRowsId: [
      ['Langsung klik SELL ketika melihat harga jebol tipis ke bawah garis Support kotak sideways.', 'Seringkali itu merupakan Wyckoff Phase C "Spring" untuk menjemput stok terakhir sebelum terbang!', 'Jangan kejar breakout jebol dasar; tunggu apakah harga menutup lemah atau cepat memantul balik.'],
      ['Memasang SL tepat persis di garis dasar kotak Phase B yang sangat rata dan bersih.', 'Garis dasar rata hampir selalu menjadi sasaran pengujian "Spring" demi menguji pasokan jual tersisa.', 'Berikan ruang di luar potensi Spring atau tunggu masuk di Phase D (LPS pullback pasca-Spring).'],
      ['Menyangka konsep Wyckoff kuno bertentangan dengan Smart Money Concepts (SMC) modern.', 'Spring Wyckoff (1930) dan SSL Sweep/MSS ICT adalah fenomena likuiditas institusi yang persis sama!', 'Integrasikan penglihatan siklus besar Wyckoff dengan presisi entry intraday ICT.'],
    ],
    anatomyRowsEn: [
      ['Shorting immediately the instant price dips underneath flat Phase B support.', 'Phase C Springs intentionally pierce lower floors to harvest panic liquidity before upward markups.', 'Refuse blind breakout chasing; require sustained breakdown acceptance or await reclaim.'],
      ['Parking Buy stops flush beneath ultra-clean Phase B range lows.', 'Flat trading boundaries routinely test Spring traps before marking up.', 'Either place stops beneath extreme Spring tails or wait cleanly for Phase D LPS pullbacks.'],
      ['Treating Wyckoff Springs and ICT Sweeps as competing doctrines.', 'Huddleston’s SSL Sweep + MSS replicates Phase C Spring mechanics with intraday session timers.', 'Combine macro Wyckoff structural phases with tight 10 USC intraday ICT timing.'],
    ],
    sec4QuantId: [
      'Perhatikan perbedaan hasil finansial di akun `1.000 USC ($10)` saat menghadapi **Phase C Spring**. Misalkan Emas bergerak datar selama sesi Asia-pra-London di antara batas bawah `$2,640` dan atap `$2,648`. Trader Breakout ritel melihat lilin mematahkan `$2,640` ke `$2,638,20` langsung menekan `SELL` 0,03 lot ber-SL di `$2,642` (`-11,4 USC`), sementara trader Support awal yang membeli terlalu cepat sudah kena SL di `$2,639`!',
      'Dalam lima menit, Composite Man menyerap penuh penjualan di `$2,638,20` (*Spring*), dan harga melompat keras kembali ke `$2,645` (*Sign of Strength / Phase D*) lalu koreksi tenang (*Last Point of Support / LPS*) ke `$2,642,00`. Kedua trader awal sebelumnya sudah rugi akibat masuk sebelum Fase C selesai!',
      'Murid JGS menunggu Spring & Reclaim di `$2,642,00` selesai dulu, memasang SL aman di bawah dasar Spring (`$2,637,50` -> jarak `$4,50`) memakai **`0,02 Cent lot`** (`risiko tepat 9 USC / 0,9%`), dan mengincar atap Phase E di `$2,654` (`+24 USC / +2,67R`).',
    ],
    sec4QuantEn: [
      'Retail support buyers at $2,640 and breakdown sellers at $2,638 both suffer immediate whipsaws during a textbook Phase C Spring down to $2,638.20.',
      'Awaiting Phase D Sign-of-Strength confirmation to enter cleanly at $2,642.00 LPS (SL $2,637.50 @ 0.02 lot = 9 USC) safely harvests +24 USC (+2.67R) toward Phase E targets.',
    ],
    sec4FormulaId: 'Entry Aman = Pasca-Spring (Fase C) + Penembusan Balik SOS (Fase D) di Koreksi LPS  |  SL Di Bawah Ekor Spring <= 10 USC',
    sec4FormulaEn: 'High-Probability Entry = Post-Spring Reclaim + SOS Break at Phase D LPS Retest  |  SL Outside Spring Low <= 10 USC',
    hotspots: makeHotspots(
      ['Fase A: Selling Climax (Rem Tren)', 'Fase B: Akumulasi Koridor Datar', 'Fase C: Spring (Sapuan Palsu)', 'Fase D–E: SOS & Pullback LPS'],
      ['Lonjakan jual panik ekstrem menghentikan jatuhnya tren berbulan-bulan.', 'Rentang lebar membangun stok barang institusional selama berminggu/berjam.', 'Penembusan singkat di bawah Support untuk menguras seluruh tangan lemah.', 'Harga meledak naik menembus atap range dan memberi koreksi entri teraman (LPS).'],
      ['Mengira Selling Climax adalah titik tengah penurunan dan terus menjual di dasar.', 'Bosan lalu overtrading di tengah bolak-balik Fase B.', 'Ikut menjual breakout tepat di ujung terbawah Spring Fase C.', 'Mengejar entry tinggi di puncak Fase E saat markup sudah terlalu jauh.'],
      ['Identifikasi tanda klimaks tanpa terburu-buru entry lawan tren.', 'Tandai batas atas/bawah Fase B dan tahan eksekusi hingga Fase C terlihat.', 'Jadikan Spring sebagai sinyal waspada bersiap membeli setelah masuk balik kotak.', 'Masuk 0,02 Cent lot di retest LPS ber-SL aman di bawah ekor Spring.']
    ),
    detective: {
      scenarioId: 'Setelah berkonsolidasi di koridor $2,630–$2,640 selama 4 jam, Emas menusuk turun sekejap ke $2,628 lalu langsung menyembur naik menutup bar kuat di $2,642 menembus atap! Bagian manakah dalam Skema Wyckoff yang baru saja berlangsung?',
      scenarioEn: 'After 4 hours of consolidation between $2,630 and $2,640, Gold dips briefly to $2,628 then launches upward closing solidly at $2,642 above range resistance. Name the exact Wyckoff mechanics:',
      optionsId: [
        'Fase C (Spring Shakeout) di $2,628 yang segera memicu Fase D (Sign of Strength / Markup) menembus atap $2,640.',
        'Fase akhir Distribusi menuju $2,500.',
        'Sinyal bahwa volume tidak memiliki pengaruh apa pun.',
      ],
      optionsEn: [
        'Phase C Spring shakeout at $2,628 immediately triggering Phase D Sign-of-Strength markup above $2,640.',
        'Terminal Distribution prelude into a bear collapse.',
        'Proof that range liquidity plays zero role.',
      ],
      correctIndex: 0,
      explanationId: 'Luar biasa! Tusukan bawah singkat yang cepat memantul menembus atap adalah anatomi klasik Spring -> Sign of Strength menuju Markup.',
      explanationEn: 'Spot on! Rapid shakeout followed by strong breakout reclamation captures the exact Phase C -> Phase D transition.',
    },
    essayGuidanceHintsId: [
      'Uraikan secara berurutan fungsi masing-masing Fase A, B, C (Spring), D, dan E dalam Skema Akumulasi Wyckoff.',
      'Jelaskan mengapa trader breakout ritel hampir selalu menjadi korban dari Fase C Spring.',
      'Di titik fase manakah entry 10 USC paling aman serta di mana penempatan SL strukturalnya?',
    ],
    essayGuidanceHintsEn: [
      'Trace sequential mechanics from Phase A through B, C (Spring), D, and E.',
      'Explain how retail breakdown sellers become liquidity fuel during Phase C Springs.',
      'Specify optimal LPS entry timing and behind-Spring SL sizing on 1,000 USC.',
    ],
  },

  'vsa-and-supply-demand-zones': {
    slug: 'vsa-and-supply-demand-zones',
    photoUrl: PHOTOS.CANDLE_SCREEN,
    photoCaptionId: 'Volume Spread Analysis (Tom Williams VSA) & Zona Supply-Demand, Membaca bekas dorongan cepat institusional pada formasi Rally-Base-Drop dan Drop-Base-Rally.',
    photoCaptionEn: 'Volume Spread Analysis (VSA) & Institutional Supply/Demand, Tracking sharp order imbalances from Origin Base candles.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Pada akhir dekade 1980-an, mantan trader sindikasi pasar profesional **Tom Williams** menyempurnakan karya Wyckoff dengan menciptakan **Volume Spread Analysis (VSA)**, membaca relasi tiga variabel pada setiap bar tunggal: *Volume* (minat partisipasi), *Spread* (rentang jarak High ke Low lilin), dan *Closing Position* (lokasi harga penutupan di ujung atas, tengah, atau bawah lilin).',
      'Dari pemahaman VSA itulah berkembang konsep modern **Zona Supply and Demand (*Origin Imbalance Zones*)** berpola **DBR (*Drop-Base-Rally*)** dan **RBD (*Rally-Base-Drop*)**. Mengapa sebuah area *Base* kecil yang langsung ditinggalkan oleh ledakan dua candle panjang meninggalkan bekas penolakan kuat ketika harga kembali berkunjung kelak?',
      'Karena kecepatan ledakan keberangkatan menandakan pasokan order institusional di area Base tersebut **belum sempat terisi habis seluruhnya (*Unfilled Resting Limit Orders*)** sebelum harga terbang menjauh! Saat harga turun pulang menyentuh zona DBR tersebut untuk pertama kalinya (*Fresh First Tap*), sisa antrean Limit Buy raksasa langsung aktif menyerap dan memantulkan harga.',
    ],
    sec2InstitutionalEn: [
      'Tom Williams’ VSA inspects Spread, Volume, and Close position per bar, directly illuminating modern Supply & Demand creation: sharp violent departures (RBD / DBR) prove unfilled institutional limit orders still rest inside the Base.',
      'High-probability entries target strictly the fresh First Tap back into unmitigated origin bases backed by clear departure displacement.',
    ],
    anatomyRowsId: [
      ['Menandai setiap kotak mendatar apa saja sebagai Supply/Demand meski kepergiannya lambat.', 'Zona valid wajib ditinggalkan secara eksplosif (*Strong Departure*) tanpa berlama-lama di area dasar.', 'Hanya tandai Base yang melahirkan minimal 2 candle besar searah menjauh cepat.'],
      ['Membeli terus di zona Demand yang sudah diuji bolak-balik 4–5 kali.', 'Setiap kunjungan mengurangi sisa unfilled limit orders; di sentuhan ke-4 zona hampir jebol!', 'Prioritaskan *Fresh Zone* (Sentuhan Pertama / Kedua) saja guna menjaga rasio menang.'],
      ['Menerapkan VSA pada pasar kripto ilegal sepi volume tanpa mempertimbangkan sesi.', 'Pada Forex/Gold spot, pakai volume tick broker besar saat London/New York aktif.', 'Padukan reaksi penolakan VSA dengan lokasi Fresh Base DBR/RBD sebelum entry 10 USC.'],
    ],
    anatomyRowsEn: [
      ['Labeling every flat stall a Supply/Demand zone despite sluggish exits.', 'Authentic origin bases launch explosive multi-candle departures evidencing unfilled order flow.', 'Filter bases exclusively for rapid high-displacement breakouts away from origin.'],
      ['Buying aging Demand zones on their 4th or 5th repeated retest.', 'Each revisit consumes remaining passive institutional orders until the floor fractures.', 'Favor fresh untouched First-Tap revisits to sustain favorable asymmetric expectancy.'],
      ['Evaluating tick-volume spikes during dead midnight liquidity hours.', 'Tick volume accurately mirrors participation density mainly inside busy institutional windows.', 'Pair VSA high-volume rejection clues inside London/NY sessions around fresh Bases.'],
    ],
    sec4QuantId: [
      'Mari menguji keunggulan matematika memilih **Fresh First-Tap Demand (`DBR`)** dibanding zona usang (*Tested 4x Zone*) di akun Cent `1.000 USC ($10)`. Katakan muncul Base DBR dari `$2,640,00` hingga `$2,643,50` yang ditinggalkan reli eksplosif menuju `$2,665` (tanpa pernah disentuh balik sekali pun selama 5 jam).',
      'Saat harga akhirnya pulang menyentuh atap Base di `$2,643,50` (*Fresh First Tap*), jarak ke dasar terluar Base (`$2,639,00` + spread buffer `$0,50` = `$2,638,50`) adalah `$5,00`. Memasang `0,02 Cent lot` hanya mengambil `10 USC (1%)`, sedangkan pantulan cepat dari sisa *unfilled orders* menuju `$2,658,50` menghasilkan **`+30 USC (+3,0R)`**.',
      'Sebaliknya, pemula yang menunggu zona tersebut sampai ditembus-sentuh 4 kali di malam harinya masih memaksa entry di zona yang stok order institusinya sudah habis terkonsumsi, mengakibatkan kerugian SL `-10 USC` berulang yang seharusnya dapat dihindari.',
    ],
    sec4QuantEn: [
      'A Fresh First-Tap DBR return into $2,643.50 (outer base invalidation $2,638.50 = $5.00 SL -> 0.02 Cent lot = 10 USC) intercepts remaining resting orders cleanly to capture +30 USC (+3.0R).',
      'Skipping heavily mitigated 4th-tap zones preserves micro risk equity against structural breakdown.',
    ],
    sec4FormulaId: 'Kualitas Zona Supply/Demand = Kecepatan Kepergian (Departure) + Kesegaran (Fresh Tap <= 2×)  |  Risk Cap = SL Di Luar Ekor Base <= 10 USC',
    sec4FormulaEn: 'Zone Quality Grade = Explosive Departure Momentum + Unmitigated Freshness (Tap #1)  |  Bounded SL <= 10 USC',
    hotspots: makeHotspots(
      ['VSA Climax (Effort + Spread)', 'Base Asal (DBR / RBD Origin)', 'Kepergian Eksplosif (Imbalance)', 'Fresh First Tap (Unfilled Orders)'],
      ['Volume tinggi dengan ekor penolakan tajam menunjukkan perlawanan aktif di ujung.', 'Zona sempit tempat order raksasa berkumpul sebelum melesat menjauh.', 'Bukti visual ketidakseimbangan mutlak karena sisa order belum terisi.', 'Kunjungan balik perdana di mana sisa antrean Limit masih segar menunggu dipicu.'],
      ['Memasuki Base yang sudah disentuh-tembus berkali-kali sebelumnya.', 'Mengabaikan lemahnya kecepatan kepergian candle keluar dari kotak.', 'Meletakkan SL terlalu mepet di tengah kotak Base.', 'Membeli Supply/Demand saat berita CPI atau FOMC tepat rilis 1 menit lagi.'],
      ['Cari minimal 2 candle besar bersih meninggalkan zona dasar.', 'Prioritaskan sentuhan pertama setelah zona lahir (Fresh Unmitigated).', 'Pasang SL di luar batas terluar zona + buffer spread ($0,50).', 'Pastikan risiko jarak SL tersebut terhitung <= 10 USC sebelum entry.']
    ),
    detective: {
      scenarioId: 'Sebuah zona Demand di $2,630–$2,633 sudah pernah memantulkan harga sebanyak 4 kali seharian ini. Saat harga kembali turun kesana untuk ke-5 kalinya, pemula kembali entry BUY all-in. Mengapa peluang pantulan kali ini jauh lebih lemah?',
      scenarioEn: 'A Demand box at $2,630–$2,633 has already bounced price four times today. Why does buying the 5th revisit carry steep breakdown risk?',
      optionsId: [
        'Sisa order beli institusi (*Unfilled Limit Orders*) di kotak tersebut terus berkurang tiap kali disentuh hingga kini habis terkonsumsi, sangat rawan jebol turun.',
        'Karena makin sering disentuh, zona Demand makin sakral tidak bisa ditembus.',
        'Karena harga hanya boleh naik maksimal 4 kali dalam seminggu.',
      ],
      optionsEn: [
        'Repeated visits progressively consume remaining institutional Limit Buy orders until structural inventory exhausts, increasing breakdown failure.',
        'More retests magically strengthen resting orders indefinitely.',
        'Daily moves lock after 4 reversals mechanically.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Di buku order, tiap sentuhan menghabiskan likuiditas tersisa, Fresh First-Tap selalu punya daya pantul paling kuat.',
      explanationEn: 'Spot on! Just like mining finite inventory, each touch absorbs available limit orders, leaving fresh untouched zones highest probability.',
    },
    essayGuidanceHintsId: [
      'Jelaskan 3 variabel utama analisis bar dalam Volume Spread Analysis (VSA) Tom Williams.',
      'Mengapa zona DBR/RBD dengan keberangkatan eksplosif meninggalkan sisa unfilled limit orders?',
      'Kaitkan hukum kesegaran zona (*Fresh First Tap*) dan batas SL di luar Base untuk melindungi akun 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Explain Volume, Spread, and Close position inside Tom Williams’ VSA model.',
      'Show how explosive base departures reveal unmitigated resting institutional limit orders.',
      'Connect First-Tap zone freshness and outer-base SL calibration to 10 USC survival.',
    ],
  },
};
