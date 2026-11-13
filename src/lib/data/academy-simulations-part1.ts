export type SimulationVisualKind =
  | 'CANDLE_CHART'
  | 'BAR_COMPARE'
  | 'TIMELINE_CLOCK'
  | 'TABLE_SPEC'
  | 'EQUITY_CURVE';

export interface SimCandleBar {
  o: number;
  h: number;
  l: number;
  c: number;
  lbl?: string;
}

export interface ModuleSimulationVisual {
  kind: SimulationVisualKind;
  captionId: string;
  captionEn: string;
  // CANDLE_CHART
  candles?: SimCandleBar[];
  zoneLabelA?: string;
  zoneLabelB?: string;
  zoneLabelC?: string;
  // BAR_COMPARE
  bars?: Array<{ label: string; value: number; unit: string; tone: 'gold' | 'green' | 'red' | 'blue' }>;
  // TIMELINE_CLOCK
  clockSlots?: Array<{ wib: string; title: string; spreadLabel: string; status: 'SAFE' | 'DANGER' | 'NEUTRAL' }>;
  // TABLE_SPEC
  specHeaders?: [string, string, string];
  specRows?: Array<[string, string, string]>;
  // EQUITY_CURVE
  curvePoints?: Array<{ step: string; safeVal: number; recklessVal: number }>;
  curveUnit?: string;
}

export interface ModuleSimulationStep1Option {
  labelId: string;
  labelEn: string;
  feedbackId: string;
  feedbackEn: string;
}

export interface ModuleSimulationStep2Choice {
  id: string;
  labelId: string;
  labelEn: string;
  isSafe: boolean;
  riskUsc: number;
  rewardUsc: number;
  consequenceId: string;
  consequenceEn: string;
}

export interface ModuleGuidedSimulation {
  titleId: string;
  titleEn: string;
  briefingId: string;
  briefingEn: string;
  visual: ModuleSimulationVisual;
  step1: {
    questionId: string;
    questionEn: string;
    options: [ModuleSimulationStep1Option, ModuleSimulationStep1Option, ModuleSimulationStep1Option];
    correctIndex: 0 | 1 | 2;
  };
  step2: {
    promptId: string;
    promptEn: string;
    choices: [ModuleSimulationStep2Choice, ModuleSimulationStep2Choice];
  };
  step3: {
    outcomeTitleId: string;
    outcomeTitleEn: string;
    outcomeBodyId: string;
    outcomeBodyEn: string;
    jessyLineId: string;
    jessyLineEn: string;
  };
}

export const SIMULATIONS_PART_1: Record<string, ModuleGuidedSimulation> = {
  // SEM 01
  'money-history-and-inflation': {
    titleId: 'Uang Kasur Rp160.000 vs Inflasi & Proteksi Aset Produktif',
    titleEn: 'Idle Cash Erosion vs Real Asset Shield ($10 Scale)',
    briefingId: 'Simulasikan apa yang terjadi pada modal awal Rp160.000 jika didiamkan 5 tahun tergerus inflasi vs dialokasikan terukur melalui skill finansial berisiko <=1%.',
    briefingEn: 'Compare purchasing power of idle fiat cash against inflation-hedged disciplined allocation.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Daya Beli Nyata Modal Rp160.000 Selama 5 Tahun',
      captionEn: '5-Year Real Purchasing Power of Rp160,000',
      bars: [
        { label: 'Uang Kasur (0% Yield)', value: 122, unit: 'rb riil', tone: 'red' },
        { label: 'Deposito Bersih Pajak', value: 148, unit: 'rb riil', tone: 'blue' },
        { label: 'Emas + Skill Terkendali', value: 215, unit: 'rb riil', tone: 'green' },
      ],
    },
    step1: {
      questionId: 'Mengapa daya beli uang tunai Rp160.000 turun meski nominal kertasnya tetap sama?',
      questionEn: 'Why does idle cash lose real purchasing power over multi-year periods?',
      options: [
        { labelId: 'Karena jumlah uang beredar naik sejak standar emas 1971 berakhir (Inflasi)', labelEn: 'Fiat expansion after 1971 drives steady consumer inflation', feedbackId: 'Tepat! Harga barang naik sehingga pecahan uang yang sama membeli lebih sedikit barang.', feedbackEn: 'Exact! Expanding fiat credit erodes nominal cash value steadily.' },
        { labelId: 'Karena kertas rupiah menyusut ukurannya di bank', labelEn: 'Physical notes lose legal status annually', feedbackId: 'Bukan fisiknya, melainkan daya belinya terhadap barang nyata yang menyusut.', feedbackEn: 'Not physical notes, rather purchasing power versus real goods shrinks.' },
        { labelId: 'Karena pasar emas tidak pernah bergerak', labelEn: 'Gold values stay frozen indefinitely', feedbackId: 'Sebaliknya, aset keras cenderung mengimbangi inflasi jangka panjang.', feedbackEn: 'Hard assets historically reprice upward against fiat debasement.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Langkah proteksi pertama untuk belajar trading dengan Rp160.000 (1.000 USC):',
      promptEn: 'Select smart micro protection rule for Rp160,000 ($10 = 1,000 USC):',
      choices: [
        { id: 'safe', labelId: 'Latih di Akun Cent 1.000 USC (Batas Risiko 1% = 10 USC)', labelEn: 'Use 1,000 USC Cent Shield (Max 1% = 10 USC)', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Akun punya 100 nyawa belajar untuk membangun keahlian jangka panjang melawan inflasi.', consequenceEn: '100 calm practice executions preserving tuition cleanly.' },
        { id: 'risky', labelId: 'All-In di Akun Standar berharap untung cepat besok', labelEn: 'All-in Standard lot chasing overnight gains', isSafe: false, riskUsc: 1000, rewardUsc: 500, consequenceId: 'Satu ayunan $10 langsung Margin Call sebelum sempat belajar manajemen risiko!', consequenceEn: 'Immediate account wipeout on normal noise.' },
      ],
    } as never,
    step3: {
      outcomeTitleId: 'Pelindung Daya Beli Teraktifasi',
      outcomeTitleEn: 'Inflation Defense & Tuition Shield Confirmed',
      outcomeBodyId: 'Kamu memahami akar sejarah uang fiat pasca-1971 dan memilih jalur keahlian terukur dengan risiko mikro terkunci 1%.',
      outcomeBodyEn: 'Fiat erosion understood and risk strictly capped at 1% micro tuition.',
      jessyLineId: 'Mantap! Paham cara kerja uang membuatmu tidak mudah tergoda janji cepat kaya.',
      jessyLineEn: 'Spot on! Monetary literacy shields you from get-rich-quick traps.',
    },
  },
  'what-is-forex-and-gold-trading': {
    titleId: 'Peta 5 Pasar Global: Memilih Instrumen Ideal Modal 1.000 USC',
    titleEn: 'Global Markets Map: Picking the Ideal Instrument for 1,000 USC',
    briefingId: 'Bandingkan karakteristik likuiditas 5 instrumen (EURUSDc, XAUUSDc, XAGUSDc, USTECc, BTCUSDT) untuk pemula bermodal Rp160.000.',
    briefingEn: 'Audit spread cost, session liquidity, and minimum contract exposure across major global instruments.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Matriks Kecocokan Instrumen untuk Pemodal Mikro',
      captionEn: 'Micro-Capital Instrument Fit Matrix',
      specHeaders: ['Pasar / Simbol', 'Karakteristik Utama', 'Skor Kecocokan $10'],
      specRows: [
        ['EURUSDc (Valas)', 'Spread tertipis di London Open (14:00 WIB)', 'Sangat Ideal (1% = 0.05 Lot)'],
        ['XAUUSDc (Emas)', 'Tren dua arah jelas di sesi NY & London', 'Ideal (1% = 0.02 Lot)'],
        ['XAGUSDc (Perak)', 'Kontrak Cent umum 50 oz (50x lebih berat)', 'Hati-hati / Cek Spec MT5'],
      ],
    },
    step1: {
      questionId: 'Mengapa XAUUSDc dan EURUSDc memungkinkan profit baik saat harga naik maupun turun?',
      questionEn: 'Why can spot FX and Gold contracts profit cleanly during falling trends too?',
      options: [
        { labelId: 'Karena kontrak CFD menyelesaikan selisih harga dua arah (Buy maupun Sell)', labelEn: 'Two-sided CFD contracts settle price deltas both up and down', feedbackId: 'Benar! Kamu bisa mengeksekusi Sell saat arah turun dan Buy saat arah naik tanpa pinjam emas fisik.', feedbackEn: 'Exact! Short selling captures downward repricing just as cleanly as longs.' },
        { labelId: 'Karena bank selalu membayar dividen harian', labelEn: 'Because daily fixed dividends cover falling days', feedbackId: 'Keliru, profit trading berasal dari selisih arah harga entry ke exit.', feedbackEn: 'Incorrect, returns come strictly from directional price differentials.' },
        { labelId: 'Karena harga tidak pernah turun di sesi London', labelEn: 'London sessions exclusively trend upward', feedbackId: 'Salah, pasar bisa turun maupun naik setiap hari.', feedbackEn: 'Markets move symmetrically both ways every session.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pilih pasangan utama pertama yang spread-nya bersahabat dengan 1.000 USC:',
      promptEn: 'Pick cleanest micro-friendly major setup:',
      choices: [
        { id: 'safe', labelId: 'Fokus EURUSDc / XAUUSDc (0.02 Cent Lot saat Killzone)', labelEn: 'Focus EURUSDc / XAUUSDc (0.02 Cent at Killzone)', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Biaya spread tipis, risiko terukur 10 USC dengan ruang target +25 USC.', consequenceEn: 'Minimal friction and controlled +25 USC upside.' },
        { id: 'risky', labelId: 'Buka 4 pair eksotik sekaligus tengah malam', labelEn: 'Stack 4 illiquid exotic crosses at midnight', isSafe: false, riskUsc: 85, rewardUsc: 20, consequenceId: 'Spread malam melebar membengkak menggerus modal 1.000 USC sebelum harga bergerak.', consequenceEn: 'Illiquid spread widening eats equity instantly.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Peta Instrumen Terkalibrasi',
      outcomeTitleEn: 'Optimal Asset Selection Verified',
      outcomeBodyId: 'Dengan memilih aset berlikuiditas tinggi pada jam buka utama, biaya transaksi tetap minimum bagi akun Rp160.000.',
      outcomeBodyEn: 'High-liquidity selection preserves micro-capital expectancy cleanly.',
      jessyLineId: 'Cerdas! Satu instrumen yang dipahami dalam jauh lebih unggul daripada 10 chart asal.',
      jessyLineEn: 'Smart focus! Mastering one liquid ticker beats scattergun guessing.',
    },
  },
  'global-market-participants-ecosystem': {
    titleId: 'Rantai Makanan Pasar: Membaca Posisi Paus Bank vs Ritel',
    titleEn: 'Market Ecosystem Hierarchy: Sovereign Banks vs Retail Crowds',
    briefingId: 'Amati bagaimana Bank Tier-1 dan Hedge Fund menyerap tumpukan order di luar jangkauan likuiditas ritel sebelum harga meluncur.',
    briefingEn: 'Identify where institutional desks absorb trapped breakout buyers.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Jebakan Breakout Puncak oleh Institusi di Pucuk Rentang',
      captionEn: 'Institutional Liquidity Absorption Above Resistance',
      candles: [
        { o: 2980, h: 2983, l: 2979, c: 2982 },
        { o: 2982, h: 2984, l: 2981, c: 2983.5 },
        { o: 2983.5, h: 2988.5, l: 2983, c: 2982.5, lbl: 'Sapuan' },
        { o: 2982.5, h: 2983, l: 2977, c: 2978, lbl: 'MSS Turun' },
        { o: 2978, h: 2981, l: 2977.5, c: 2980.5 },
        { o: 2980.5, h: 2981, l: 2972, c: 2973 },
      ],
      zoneLabelA: 'Puncak FOMO Ritel (2988)',
      zoneLabelB: 'Retest Suplai Bank (2980.5)',
      zoneLabelC: 'Target Turun Bersih (2972)',
    },
    step1: {
      questionId: 'Siapa yang mengisi order Jual tepat saat ratusan trader ritel menekan tombol Buy Breakout di 2988?',
      questionEn: 'Who sits passively on the Ask absorbing excited retail breakout buyers at highs?',
      options: [
        { labelId: 'Institusi/Bank Likuiditas yang butuh lawan transaksi beli untuk masuk Sell besar', labelEn: 'Institutional liquidity desks pairing mass retail buys into large Shorts', feedbackId: 'Tepat sekali! Tanpa pembeli FOMO di puncak, bank besar tidak kebagian likuiditas jual tanpa menggeser harga.', feedbackEn: 'Bullseye! Institutions utilize retail breakout enthusiasm to fill mammoth short blocks.' },
        { labelId: 'Aplikasi trading rusak otomatis', labelEn: 'Software terminal glitches', feedbackId: 'Salah, ini mekanisme pasar lelang yang sah terjadi setiap hari.', feedbackEn: 'Incorrect, this is normal liquidity matching mechanics.' },
        { labelId: 'Indikator moving average menolak naik', labelEn: 'Moving averages physically cap price', feedbackId: 'Indikator tidak bisa menahan transaksi triliunan dolar.', feedbackEn: 'Indicators do not exert physical market resistance.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di mana letak posisi paling cerdas bagi strategis bermodal 1.000 USC?',
      promptEn: 'Pick safest alignment beside institutional flow:',
      choices: [
        { id: 'safe', labelId: 'Masuk Sell Limit saat harga retest ke 2980.50 pasca MSS Turun (SL 2984)', labelEn: 'Place Sell Limit at 2980.50 post Bearish MSS', isSafe: true, riskUsc: 9, rewardUsc: 26, consequenceId: 'Mengikuti arus balik bank ke 2972 menghasilkan +26 USC (+Rp4.200) bersih!', consequenceEn: 'Clean institutional delivery down to target.' },
        { id: 'risky', labelId: 'Ikut Buy di 2988 karena candle hijau terlihat sangat kuat', labelEn: 'Buy breakout highs at 2988', isSafe: false, riskUsc: 18, rewardUsc: 0, consequenceId: 'Kamu menjadi bahan bakar likuiditas pembeli puncak dan tersapu -18 USC!', consequenceEn: 'Became exit liquidity right at the sweep high.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Selaras Dengan Arus Institusi',
      outcomeTitleEn: 'Aligned With Liquidity Flow',
      outcomeBodyId: 'Kamu tidak lagi mengejar candle puncak FOMO dan memilih menunggu bukti perubahan struktur MSS.',
      outcomeBodyEn: 'Skipped retail breakout trap cleanly and followed displacement.',
      jessyLineId: 'Keren! Sekarang kamu melihat pasar dari kacamata penyedia likuiditas.',
      jessyLineEn: 'Awesome! Reading trapped buyers flips the entire game.',
    },
  },

  // SEM 02
  'macro-interest-rates-central-banks': {
    titleId: 'Simulasi Keputusan Suku Bunga The Fed: Efek Langsung ke USD & Emas',
    titleEn: 'FOMC Policy Rate Shock Simulator on USD & Gold',
    briefingId: 'The Fed mengumumkan pemangkasan suku bunga kejutan -0,50% (Dovish) jauh di bawah ekspektasi pasar. Amati arah aliran modal global!',
    briefingEn: 'Analyze sudden 50bps dovish FOMC cut across Dollar Index and Spot Gold.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Respon Cepat Aset 2 Jam Pasca Pemangkasan Bunga Kejutan',
      captionEn: '2-Hour Multi-Asset Reaction to Surprise Dovish Cut',
      bars: [
        { label: 'DXY (Indeks Dolar)', value: -1.4, unit: '%', tone: 'red' },
        { label: 'US10Y Yield Obligasi', value: -3.2, unit: '%', tone: 'blue' },
        { label: 'XAUUSD (Emas Spot)', value: 1.9, unit: '%', tone: 'green' },
      ],
    },
    step1: {
      questionId: 'Mengapa harga Emas (XAUUSD) cenderung melesat naik saat The Fed menurunkan suku bunga lebih cepat?',
      questionEn: 'Why does Gold typically rally sharply when The Fed accelerates interest rate cuts?',
      options: [
        { labelId: 'Imbal hasil kas Dolar & obligasi turun sehingga biaya peluang pegang Emas mengecil', labelEn: 'Falling real Treasury yields reduce Gold holding opportunity cost', feedbackId: '100% Akurat! Dana global berpindah dari obligasi berbunga rendah menuju Emas.', feedbackEn: 'Exact macro mechanics!' },
        { labelId: 'Karena tambang emas berhenti produksi tiap rapat FOMC', labelEn: 'Mining halts on FOMC days', feedbackId: 'Keliru, penggeraknya adalah suku bunga dan aliran modal obligasi.', feedbackEn: 'Incorrect, capital flows reprice real interest spreads.' },
        { labelId: 'Karena trader ritel kompak beli perhiasan', labelEn: 'Jewelry shoppers spike simultaneously', feedbackId: 'Penggerak instan jam berita adalah dana obligasi institusional.', feedbackEn: 'Bond and futures desks drive instant macro repricing.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Kapan waktu entry paling sehat menyikapi keputusan FOMC tersebut di 1.000 USC?',
      promptEn: 'Select disciplined execution window after FOMC:',
      choices: [
        { id: 'safe', labelId: 'Tunggu 15-30 menit badai pidato selesai lalu Buy Limit pullback searah bias naik', labelEn: 'Wait 15-30m post-presser then Buy pullbacks', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Terhindar dari jarum dua arah pidato Powell dan menangkap +30 USC (+Rp4.875).', consequenceEn: 'Dodged presser whipsaws cleanly.' },
        { id: 'risky', labelId: 'Klik Buy 1 detik sebelum pengumuman di jam 01:00 WIB', labelEn: 'Gamble pre-release market button at 01:00 WIB', isSafe: false, riskUsc: 35, rewardUsc: 10, consequenceId: 'Spread melompat 8x lipat menyapu SL sebelum arah asli berjalan!', consequenceEn: 'Opening spread expansion wiped SL instantly.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Navigasi Suku Bunga Berhasil',
      outcomeTitleEn: 'Central Bank Transmission Verified',
      outcomeBodyId: 'Kamu menghubungkan keputusan suku bunga bank sentral ke imbal hasil obligasi sebelum masuk posisi.',
      outcomeBodyEn: 'Clean linkage from FOMC yields down to bullion execution.',
      jessyLineId: 'Sempurna! Makro bikin kamu punya kompas sebelum buka grafik.',
      jessyLineEn: 'Flawless macro-to-chart workflow!',
    },
  },
  'central-banks-rates-cpi-nfp': {
    titleId: 'Bedah Kejutan Data Inflasi CPI: Aktual 3.5% vs Prediksi 3.1%',
    titleEn: 'CPI Inflation Shock Lab: 3.5% Actual vs 3.1% Forecast',
    briefingId: 'Pukul 19:30 WIB kalender ekonomi merilis CPI AS Aktual 3.5% (jauh lebih panas dari Prediksi 3.1%). Bagaimana dampaknya pada Dolar dan XAUUSD?',
    briefingEn: 'Evaluate hotter-than-expected US inflation surprise on DXY and bullion.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Matriks Deviasi CPI AS & Arah Kompas Keputusan',
      captionEn: 'US CPI Deviation & Buy/Sell Compass',
      specHeaders: ['Skenario Data', 'Respons The Fed', 'Efek DXY & XAUUSD'],
      specRows: [
        ['Aktual > Prediksi (Panas)', 'Tahan Suku Bunga Tinggi (Hawkish)', 'DXY Menguat / XAUUSD Tertekan'],
        ['Aktual = Prediksi (Sesuai)', 'Sesuai Harga Pasar', 'Gerak Dua Arah Singkat'],
        ['Aktual < Prediksi (Dingin)', 'Peluang Potong Bunga Naik', 'DXY Melemah / XAUUSD Menguat'],
      ],
    },
    step1: {
      questionId: 'Saat CPI keluar 3.5% (jauh di atas 3.1%), mengapa Dolar DXY melonjak tajam ke atas?',
      questionEn: 'Why does DXY surge immediately on a hotter CPI print?',
      options: [
        { labelId: 'Pasar langsung menghitung The Fed harus menahan suku bunga tinggi lebih lama', labelEn: 'Traders reprice higher-for-longer Fed policy rates immediately', feedbackId: 'Benar! Inflasi panas menghambat pemangkasan bunga sehingga imbal hasil USD tetap menarik.', feedbackEn: 'Spot on! Persistent inflation slows easing timelines.' },
        { labelId: 'Karena masyarakat AS makin senang belanja mahal', labelEn: 'Consumers celebrate cost spikes', feedbackId: 'Salah, bank sentral yang merespons inflasi panas dengan mengetatkan likuiditas.', feedbackEn: 'Incorrect, central bank tightening reaction lifts USD.' },
        { labelId: 'Karena emas melarang impor', labelEn: 'Gold bans currency trades', feedbackId: 'Salah, ini murni penyesuaian ekspektasi suku bunga obligasi.', feedbackEn: 'Pure sovereign bond repricing drives DXY.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Menghadapi kejutan CPI panas 3.5% setelah menit ke-15, setup mana yang selaras?',
      promptEn: 'Select post-news trade alignment:',
      choices: [
        { id: 'safe', labelId: 'Cari Retest Sell Limit XAUUSD / EURUSD searah penguatan DXY pasca konfirmasi M5', labelEn: 'Hunt post-15m Sell pullback on EURUSD / XAUUSD', isSafe: true, riskUsc: 10, rewardUsc: 28, consequenceId: 'Bergerak searah dorongan makro DXY menghasilkan +28 USC bersih.', consequenceEn: 'Rode confirmed macro flow smoothly.' },
        { id: 'risky', labelId: 'Buy XAUUSD melawan tren karena mengira inflasi pasti bikin emas langsung naik detik ini', labelEn: 'Buy Gold against surging DXY instantly', isSafe: false, riskUsc: 25, rewardUsc: 5, consequenceId: 'Dalam jangka pendek berita CPI panas justru menguatkan DXY dan menekan Gold!', consequenceEn: 'Short-term USD spike crushed counter-trend longs.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Pembacaan Kejutan Makro Akurat',
      outcomeTitleEn: 'Macro Surprise Repricing Mastered',
      outcomeBodyId: 'Kamu membedakan efek inflasi jangka pendek lewat respon suku bunga bank sentral.',
      outcomeBodyEn: 'Cleanly navigated inflation surprise repricing.',
      jessyLineId: 'Bagus! Jangan lupa cek jeda 15 menit setelah rilis berita merah.',
      jessyLineEn: 'Smart patience after CPI volatility!',
    },
  },
  'intermarket-yields-dxy-xauusd': {
    titleId: 'Kompas Intermarket: Membaca Divergensi US10Y & DXY Melawan Emas',
    titleEn: 'Intermarket Divergence: US10Y Yields vs DXY vs Gold',
    briefingId: 'Grafik XAUUSD membentuk Double Top di puncak, sementara DXY & US10Y baru saja mencetak Higher Low naik bersih.',
    briefingEn: 'Detect bearish divergence against Gold whenever DXY and US10Y confirm upward shifts.',
    visual: {
      kind: 'EQUITY_CURVE',
      captionId: 'Pergerakan Berlawanan US10Y Naik vs Tekanan XAUUSD',
      captionEn: 'Inverse Yield Headwind on Gold Trajectory',
      curvePoints: [
        { step: '14:00', safeVal: 100, recklessVal: 100 },
        { step: '16:00', safeVal: 96, recklessVal: 104 },
        { step: '18:00', safeVal: 93, recklessVal: 108 },
        { step: '20:00', safeVal: 89, recklessVal: 112 },
      ],
      curveUnit: 'Indeks',
    },
    step1: {
      questionId: 'Apa sinyal bahaya utama bagi posisi Buy XAUUSD apabila DXY dan US10Y serentak menguat menembus High?',
      questionEn: 'What does a simultaneous breakout higher in DXY and US10Y imply for XAUUSD Longs?',
      options: [
        { labelId: 'Kepala angin berat (Headwind) yang menandakan potensi XAUUSD berbalik turun', labelEn: 'Strong macro headwind signaling imminent Gold pullback', feedbackId: 'Tepat! Kurangi ukuran atau batalkan Buy XAUUSD saat kedua penggeraknya serentak naik.', feedbackEn: 'Correct! Avoid stubborn Gold longs into dual DXY + US10Y rallies.' },
        { labelId: 'Tanda Emas akan naik 3x lebih cepat', labelEn: 'Guarantees accelerated Gold breakout', feedbackId: 'Terbalik, penguatan Dolar dan Yield membatasi kenaikan Emas.', feedbackEn: 'Opposite effect on bullion valuation.' },
        { labelId: 'Tidak ada hubungan sama sekali', labelEn: 'Completely uncorrelated assets', feedbackId: 'Korelasi terbalik ini tercatat kuat di pasar obligasi & komoditas.', feedbackEn: 'Inverse real-yield linkage is historically well documented.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Tindakan bijak sebelum menekan Buy XAUUSD saat melihat DXY naik tajam:',
      promptEn: 'Apply intermarket filter discipline:',
      choices: [
        { id: 'safe', labelId: 'Batalkan rencana Buy XAUUSD, tunggu hingga DXY tertahan di Resistance & melemah lagi', labelEn: 'Skip Gold Buy until DXY stalls at resistance', isSafe: true, riskUsc: 0, rewardUsc: 15, consequenceId: 'Menyelamatkan 10 USC modal belajar dan menghindari setup counter-macro!', consequenceEn: 'Protected account cleanly from counter-macro risk.' },
        { id: 'risky', labelId: 'Tetap paksakan Buy XAUUSD karena indikator RSI menunjukkan Oversold', labelEn: 'Force Buy strictly from RSI oversold', isSafe: false, riskUsc: 15, rewardUsc: 0, consequenceId: 'RSI tetap Oversold sementara Gold jatuh lebih dalam ditekan kenaikan Yield.', consequenceEn: 'Oscillator failed cleanly against Treasury rallies.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Filter Antar-Pasar Lulus',
      outcomeTitleEn: 'Intermarket Guardrail Passed',
      outcomeBodyId: 'Dengan mengecek US10Y dan DXY, kamu menolak transaksi berlawanan arah arus modal utama.',
      outcomeBodyEn: 'Saved equity by auditing Treasury yields prior to entry.',
      jessyLineId: 'Mantap! Jangan pernah trading Emas dengan mata tertutup dari DXY.',
      jessyLineEn: 'Wise decision! Always check DXY & US10Y first.',
    },
  },

  // SEM 03
  'broker-vs-mt5-terminal': {
    titleId: 'Audit Server Broker: A-Book ECN/Cent vs B-Book & Aplikasi MT5',
    titleEn: 'Broker Server Audit: Verifying MT5 Feeds & Account Architecture',
    briefingId: 'Bandingkan dua server MT5 untuk pemodal Rp160.000: Server A hanya punya akun Standar ($1/pip), Server B memiliki akun Cent teregulasi (1.000 USC).',
    briefingEn: 'Evaluate two live MT5 server configurations under Rp160,000 practice capital.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Perbandingan Spesifikasi Server MT5 Untuk Modal $10',
      captionEn: 'MT5 Server Comparison For $10 Capital',
      specHeaders: ['Parameter', 'Server Standar', 'Server Cent JGS'],
      specRows: [
        ['Tampilan Saldo', '$10.00 USD', '1.000 USC (Cent)'],
        ['0.01 Lot XAUUSD', '1 Oz ($1.00 / $1 gerak)', '0.01 Oz (1 USC / $1 gerak)'],
        ['Ketahanan SL $5.00', 'Rugi 50% Modal Sekaligus', 'Rugi Cuma 5 USC (0,5%)'],
      ],
    },
    step1: {
      questionId: 'Mengapa aplikasi MetaTrader 5 yang sama bisa terasa sangat aman di satu broker tapi menghancurkan saldo di server lain?',
      questionEn: 'Why does the identical MT5 terminal execute safely on Cent servers yet ruin $10 Standard equity?',
      options: [
        { labelId: 'Karena MT5 cuma terminal pengirim, sedangkan ukuran kontrak & denominasi Cent diatur server Broker', labelEn: 'MT5 is solely interface software; broker servers control contract weights', feedbackId: 'Benar! Pastikan kamu memilih tipe akun Cent dan memverifikasi Contract Size.', feedbackEn: 'Correct! Contract weight comes from broker configuration.' },
        { labelId: 'Karena MT5 Android berbeda dengan MT5 PC', labelEn: 'Android apps double contract sizes', feedbackId: 'Bukan dari aplikasi perangkatnya, murni dari tipe akun brokernya.', feedbackEn: 'Platform OS does not alter server contract specs.' },
        { labelId: 'Karena warna candle hijau memengaruhi margin', labelEn: 'Chart themes alter leverage', feedbackId: 'Tentu tidak, hanya parameter kontrak server.', feedbackEn: 'Themes have zero bearing on margin.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Kamu ingin mulai latihan uang kecil Rp160.000 hari ini. Akun mana yang dipilih?',
      promptEn: 'Choose optimal MT5 account specification:',
      choices: [
        { id: 'safe', labelId: 'Pilih Server Cent Terverifikasi (Saldo tampil 1.000 USC, XAUUSDc)', labelEn: 'Open Verified Cent Account (1,000 USC Balance)', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Risiko harian terkunci 0.5%-1% sehingga belajar tenang hingga 100 percobaan.', consequenceEn: 'Clean 1% tuition control maintained.' },
        { id: 'risky', labelId: 'Buka Akun Standar $10 supaya tampak profesional memakai Dolar utuh', labelEn: 'Pick Standard USD $10 for prestige', isSafe: false, riskUsc: 500, rewardUsc: 100, consequenceId: 'Satu kesalahan kecil menghabiskan separuh akun seketika!', consequenceEn: 'Minimum 0.01 standard lot wiped half the balance immediately.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Fondasi Akun Terverifikasi',
      outcomeTitleEn: 'Cent Infrastructure Locked',
      outcomeBodyId: 'Kamu memisahkan fungsi software MT5 dari kebijakan server broker.',
      outcomeBodyEn: 'Matched practice denomination accurately to micro tuition.',
      jessyLineId: 'Tepat! Gunakan seragam yang pas ukurannya buat modalmu.',
      jessyLineEn: 'Smart start! Size matches capital cleanly.',
    },
  },
  'limit-order-book-bid-ask-slippage': {
    titleId: 'Mekanisme Ask-Bid Spread: Kenapa SL Sell Tersentuh Sebelum Candle Menyentuh Garis?',
    titleEn: 'Ask vs Bid Spread Buffer Lab: Protecting Sell Stops Correctly',
    briefingId: 'Harga Bid saat ini 3980.00, Spread saat sesi sepi melebar ke $0.60 (harga Ask di 3980.60). Kamu berencana Sell dengan puncak Resistance di 3983.00.',
    briefingEn: 'Compute exact Ask-inclusive SL protection for an intraday Sell setup.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Perbedaan Garis Bid di Grafik vs Harga Ask Aktual Eksekusi',
      captionEn: 'Bid Chart Quote vs Actual Ask Execution Level',
      bars: [
        { label: 'Harga Bid (Tampil Chart)', value: 3980.0, unit: 'USD', tone: 'blue' },
        { label: 'Harga Ask (Penutup Sell SL)', value: 3980.6, unit: 'USD', tone: 'red' },
        { label: 'SL Aman + Spread Buffer', value: 3984.2, unit: 'USD', tone: 'gold' },
      ],
    },
    step1: {
      questionId: 'Mengapa posisi SELL bisa langsung kena Stop Loss padahal ekor atas candle di layar terlihat kurang 30 poin lagi menyentuh garis merah SL?',
      questionEn: 'Why can a SHORT stop loss trigger even before visible candlesticks reach your red SL line?',
      options: [
        { labelId: 'Karena grafik MT5 default melukis harga Bid, sedangkan posisi Sell ditutup oleh harga Ask di atasnya', labelEn: 'Charts plot Bid by default while Short exits trigger on the higher Ask quote', feedbackId: '100% Benar! Mengaktifkan Ask Line di pengaturan MT5 langsung membuat lebar spread terlihat jelas.', feedbackEn: 'Spot on! Enabling MT5 Ask visibility prevents surprise stop tags.' },
        { labelId: 'Karena baterai HP lemah', labelEn: 'Phone battery throttling', feedbackId: 'Keliru, murni karena jarak Spread Ask minus Bid.', feedbackEn: 'Pure Bid-Ask spread geometry.' },
        { labelId: 'Karena Take Profit otomatis menarik Stop Loss', labelEn: 'TP pulls SL dynamically', feedbackId: 'SL dan TP diam di tempat kecuali kamu menggesernya.', feedbackEn: 'Static levels remain fixed unless adjusted.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di mana kamu menempatkan Stop Loss Sell bila puncak struktur berada di 3983.00 dan spread $0.60?',
      promptEn: 'Select safe Ask-buffered Stop Loss placement:',
      choices: [
        { id: 'safe', labelId: 'Taruh SL di 3984.20 (Puncak + Buffer Spread $1.20)', labelEn: 'Place SL at 3984.20 (Peak + Spread Buffer)', isSafe: true, riskUsc: 8, rewardUsc: 24, consequenceId: 'Posisi selamat dari sentuhan Ask saat retest pucuk dan lanjut turun sesuai rencana!', consequenceEn: 'Survived peak spread test cleanly.' },
        { id: 'risky', labelId: 'Tempelkan SL pas di angka 3983.05 agar terlihat hemat 10 pips', labelEn: 'Hug peak tightly at 3983.05', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Harga Bid cuma menyentuh 3982.50 tapi Ask melonjak ke 3983.10 memotong SL-mu duluan!', consequenceEn: 'Ask quote spiked out the tight SL before price dropped.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Buffer Spread Terpasang Aman',
      outcomeTitleEn: 'Ask-Buffered SL Mastery Confirmed',
      outcomeBodyId: 'Selalu tambahkan bantalan spread wajar di atas puncak saat memasang Stop Loss posisi Sell.',
      outcomeBodyEn: 'Spread cushion preserves tight invalidation zones cleanly.',
      jessyLineId: 'Yeay! Sekarang tidak ada lagi misteri SL tersentuh padahal belum kena garis.',
      jessyLineEn: 'No more mystery Ask-line stopouts!',
    },
  },
  'visual-tour-5-mt5-buttons': {
    titleId: 'Inspeksi Tiket MT5: Menolak Simbol Markup .p dan Memilih Tombol Tepat',
    titleEn: 'MT5 Order Ticket Lab: Suffix Audit & Stops Level Check',
    briefingId: 'Di Market Watch terdapat `XAUUSDc` (spread 18 pts, 1 oz) dan `XAUUSD.p` (markup spread 45 pts). Kamu mau pasang Buy Limit jauh di bawah harga sekarang.',
    briefingEn: 'Audit broker ticker suffixes and select proper Pending Limit execution.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Checklist Audit Kotak Market Watch & Tiket Order MT5',
      captionEn: 'MT5 Symbol Suffix & Order Ticket Check',
      specHeaders: ['Item Audit', 'Simbol XAUUSDc', 'Simbol XAUUSD.p'],
      specRows: [
        ['Contract Size', '1 (Cent Mikro)', '100 (Berat / Standar)'],
        ['Spread Rata-rata', '18 Poin', '45 Poin (Markup Tinggi)'],
        ['Keputusan', 'AMAN UNTUK 1.000 USC', 'TOLAK / JANGAN SENTUH'],
      ],
    },
    step1: {
      questionId: 'Saat harga sekarang di 3985 dan kamu ingin otomatis BELI jika nanti harga turun ke 3980, tombol order MT5 apa yang dipilih?',
      questionEn: 'Price sits at 3985 and you wish to buy automatically only if it drops to 3980. Which order fits?',
      options: [
        { labelId: 'Buy Limit di harga 3980.00', labelEn: 'Buy Limit at 3980.00', feedbackId: 'Tepat! Buy Limit artinya mengantre beli di harga lebih murah di bawah harga berjalan.', feedbackEn: 'Exact! Buy Limit enters passively below spot.' },
        { labelId: 'Buy Stop di harga 3980.00', labelEn: 'Buy Stop at 3980.00', feedbackId: 'Salah! MT5 akan menolak karena Buy Stop harus di ATAS harga sekarang.', feedbackEn: 'MT5 rejects Buy Stops set below spot.' },
        { labelId: 'Sell Market di harga 3985.00', labelEn: 'Instant Sell Market at 3985', feedbackId: 'Itu langsung membuka posisi berlawanan tanpa menunggu zona murahmu.', feedbackEn: 'Trades opposite direction immediately.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Verifikasi simbol & volume sebelum kirim tiket pada saldo Rp160.000 (1.000 USC):',
      promptEn: 'Verify ticker suffix & safe volume:',
      choices: [
        { id: 'safe', labelId: 'Pilih XAUUSDc • Contract Size 1 • Volume 0.02 + Isi SL/TP Lengkap', labelEn: 'Select XAUUSDc (Contract=1) at 0.02 with SL/TP', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Tiket masuk rapi, margin bebas di atas 95%, dan terproteksi penuh.', consequenceEn: 'Safe protected Limit order accepted.' },
        { id: 'risky', labelId: 'Pakai XAUUSD.p tanpa mengecek Contract Size & kosongkan Stop Loss', labelEn: 'Pick XAUUSD.p blindly without SL', isSafe: false, riskUsc: 600, rewardUsc: 100, consequenceId: 'Free Margin sekarat karena kontrak 100 oz dan spread awal 2.5x lebih mahal!', consequenceEn: 'Oversized 100 oz contract crushed free margin instantly.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Kokpit MT5 Dikuasai 100%',
      outcomeTitleEn: 'MT5 Specification Audit Cleared',
      outcomeBodyId: 'Kamu terbiasa mengaudit tab Specification simbol dan memasang Limit Order ber-SL utuh.',
      outcomeBodyEn: 'Clean execution hygiene verified.',
      jessyLineId: 'Rapi sekali! Cek spec selalu jadi kebiasaan strateginya anak JGS.',
      jessyLineEn: 'Clean habit! Always read MT5 Specs first.',
    },
  },

  // SEM 04
  'why-small-accounts-blow-up': {
    titleId: 'Pembuktian Matematis: Kenapa 1.000 USC Punya 100 Nyawa vs Standar 2 Nyawa',
    titleEn: 'Survival Lab: Why 1,000 USC Outlasts $10 Standard by 50x',
    briefingId: 'Uji skenario 5 kali kalah beruntun (SL $5 = 50 pips di Gold) pada modal identik Rp160.000 ($10) antara Akun Standar vs Akun Cent.',
    briefingEn: 'Stress-test a 5-trade losing streak on identical Rp160,000 capital.',
    visual: {
      kind: 'EQUITY_CURVE',
      captionId: 'Ketahanan Saldo Setelah 5x SL Beruntun (-50 Pips per Trade)',
      captionEn: 'Remaining Capital After 5 Consecutive -50 Pip Stops',
      curvePoints: [
        { step: 'Awal', safeVal: 1000, recklessVal: 1000 },
        { step: 'SL #1', safeVal: 990, recklessVal: 500 },
        { step: 'SL #2', safeVal: 980, recklessVal: 0 },
        { step: 'SL #5', safeVal: 950, recklessVal: 0 },
      ],
      curveUnit: 'USC',
    },
    step1: {
      questionId: 'Mengapa saldo Standar $10 (1.000 USC ekuivalen) habis nol total cuma dalam 2 kali salah tebak 50 pips?',
      questionEn: 'Why did $10 Standard equity evaporate in merely two 50-pip stops?',
      options: [
        { labelId: 'Karena lot terkecil 0.01 Standar bernilai $0.10/pip sehingga 50 pips = rugi $5 (50% modal per klik!)', labelEn: 'Minimum 0.01 Std lot loses $5 (50% equity) on one 50-pip stop', feedbackId: 'Betul! Dua kali kena SL 50 pips langsung 0%. Tidak ada ruang psikologis untuk strategi apa pun.', feedbackEn: 'Exact math! Zero survival room on standard lots.' },
        { labelId: 'Karena Emas bergerak terlalu lambat', labelEn: 'Because Gold lacks daily volatility', feedbackId: 'Justru Emas bisa bergerak $15-$30 sehari.', feedbackEn: 'Gold routinely moves $15-$30 intraday.' },
        { labelId: 'Karena komisi bank penarikan dana', labelEn: 'Bank withdrawal fees', feedbackId: 'Ini murni ukuran kontrak 100x terlalu besar untuk $10.', feedbackEn: 'Purely contract denomination mismatch.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pilih pengaturan untuk melindungi modal Rp160.000 agar selamat melewati badai 10x kalah beruntun:',
      promptEn: 'Configure micro survival sizing:',
      choices: [
        { id: 'safe', labelId: 'Akun Cent 1.000 USC • 0.02 Cent Lot • Risiko 10 USC (1%)' , labelEn: 'Cent 1,000 USC at 0.02 Lot (1% = 10 USC)', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Pasca 5x kalah beruntun pun modal masih utuh 95% (950 USC / Rp154rb), tinggal bangkit tenang!', consequenceEn: '95% equity intact after five straight losses!' },
        { id: 'risky', labelId: 'Naikkan leverage jadi 1:Unlimited di Akun Standar agar lot cukup', labelEn: 'Crank leverage on Standard $10', isSafe: false, riskUsc: 1000, rewardUsc: 200, consequenceId: 'Leverage tinggi cuma membuat akun lebih cepat disentuh Margin Call saat salah arah!', consequenceEn: 'Extreme leverage accelerates instant Margin Calls.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Tameng 100 Nyawa Aktif',
      outcomeTitleEn: '100-Run Tuition Shield Active',
      outcomeBodyId: 'Kamu terbebas dari jebakan lot minimum dengan mengonversi modal mikro ke satuan Cent USC.',
      outcomeBodyEn: 'Escaped forced over-risk cleanly using Cent sizing.',
      jessyLineId: 'Yes! Sekarang 5x kalah pun kamu tetap senyum tenang dan evaluasi SOP.',
      jessyLineEn: 'Five stops leave 95% capital alive to learn and compound!',
    },
  },
  'how-cent-accounts-work': {
    titleId: 'Kalkulator Floor Rounding: Kapan Harus Membulatkan Turun vs Menolak Setup',
    titleEn: 'Floor Rounding Math: When To Shrink Lots vs Reject Over-Risk Setups',
    briefingId: 'Saldo 1.000 USC (batas 1% = 10 USC). Rumus memberi hasil ideal 0.028 Cent Lot untuk SL 35 pips, lalu di setup lain hasil ideal hanya 0.007 Cent Lot untuk SL 140 pips.',
    briefingEn: 'Compute exact floored Cent lot allocation across narrow and wide stops.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Aturan Pembulatan Floor Mutlak (Batas 1% = 10 USC)',
      captionEn: 'Strict Floor Rounding Policy (10 USC Cap)',
      specHeaders: ['Hasil Rumus Lot', 'Dibulatkan Menjadi', 'Keputusan JGS'],
      specRows: [
        ['0.028 Cent Lot (SL 35p)', '0.02 Cent Lot (Risiko 7 USC)', 'SAH EKSEKUSI (< 1%)'],
        ['0.019 Cent Lot (SL 52p)', '0.01 Cent Lot (Risiko 5.2 USC)', 'SAH EKSEKUSI (< 1%)'],
        ['0.007 Cent Lot (SL 140p)', '< Minimum 0.01 (Jika dipaksa 14 USC)', 'TOLAK / LEWATI SETUP'],
      ],
    },
    step1: {
      questionId: 'Mengapa rumus menghasilkan 0.028 lot tidak boleh dibulatkan ke atas menjadi 0.03 lot?',
      questionEn: 'Why must 0.028 ideal lots NEVER round up to 0.03 lots?',
      options: [
        { labelId: 'Karena 0.03 x 35 pips = 10.5 USC, langsung melanggar plafon batas risiko 1%!', labelEn: 'Because 0.03 forces risk above your hard 10 USC (1%) cap', feedbackId: 'Tepat! Pembulatan wajib selalu KE BAWAH (Floor) sehingga batas risiko tidak pernah jebol.', feedbackEn: 'Exact mathematical discipline!' },
        { labelId: 'Karena broker hanya menerima angka genap', labelEn: 'Brokers reject odd decimal digits', feedbackId: 'Broker menerima 0.03, tetapi akuntansimu sendiri yang melanggar batas risiko.', feedbackEn: 'Brokers allow 0.03; discipline forbids exceeding 1%.' },
        { labelId: 'Karena profitnya jadi terlalu besar', labelEn: 'Returns grow excessively', feedbackId: 'Alasan utamanya menjaga plafon kerugian, bukan membatasi profit.', feedbackEn: 'Risk preservation drives Floor Rounding.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Setup kedua memberi SL lebar 140 pips (lot ideal 0.007). Keputusan paling disiplin:',
      promptEn: 'Choose action when calculated lot falls under 0.01:',
      choices: [
        { id: 'safe', labelId: 'TOLAK / Skip setup tersebut (tunggu setup lain ber-SL <=100 pips)', labelEn: 'REJECT setup and wait for tighter invalidation', isSafe: true, riskUsc: 0, rewardUsc: 20, consequenceId: 'Menjaga integritas 1% tanpa menipu diri memaksa 0.01 lot di risiko 1.4%.', consequenceEn: 'Preserved hard risk boundary cleanly.' },
        { id: 'risky', labelId: 'Geser paksa SL jadi 70 pips padahal struktur aslinya butuh 140 pips', labelEn: 'Tighten SL artificially to force 0.01 lot', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'SL palsu 70 pips tersapu noise wajar sebelum harga menuju target!', consequenceEn: 'Choked stop got wicked out unnecessarily.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Rumus Position Sizing Presisi',
      outcomeTitleEn: 'Precision Floor Rounding Verified',
      outcomeBodyId: 'Kamu tahu cara membulatkan ke bawah serta kapan harus berani berkata Tidak bila minimum lot melampaui 1%.',
      outcomeBodyEn: 'Zero forced over-risk entries under 1,000 USC budgets.',
      jessyLineId: 'Jenius matematika! Lot selalu tunduk pada jarak struktur Stop Loss.',
      jessyLineEn: 'Pure math precision! Never bend structural SL.',
    },
  },
  'circuit-breakers-and-daily-loss-limits': {
    titleId: 'Matematika Pemulihan Drawdown: Mengapa Rem 3% Harian Menyelamatkan Akun',
    titleEn: 'Non-Linear Drawdown Recovery Lab & Daily Circuit Breaker',
    briefingId: 'Lihat lonjakan usaha pemulihan ekuitas dari kerugian ringan (-10%) ke kerugian berat (-50% hingga -75%).',
    briefingEn: 'Compare exponential gain needed to recover from deep drawdowns.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Persen Profit Wajib Untuk Kembali Balik Modal (Breakeven)',
      captionEn: 'Required Recovery Return (%) To Reach Breakeven',
      bars: [
        { label: 'Drawdown -10%', value: 11.1, unit: '% balik', tone: 'green' },
        { label: 'Drawdown -30%', value: 42.9, unit: '% balik', tone: 'gold' },
        { label: 'Drawdown -50%', value: 100.0, unit: '% balik', tone: 'red' },
        { label: 'Drawdown -75%', value: 300.0, unit: '% balik', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Dari saldo Rp160.000 turun 50% menjadi Rp80.000. Berapa persen profit yang dibutuhkan agar kembali utuh menjadi Rp160.000?',
      questionEn: 'Capital dropped 50% down to Rp80,000. What gain recovers Rp160,000 cleanly?',
      options: [
        { labelId: '+100% (Harus menggandakan seluruh sisa modal Rp80.000)', labelEn: '+100% return (doubling the surviving Rp80,000)', feedbackId: 'Tepat! Inilah sebabnya Drawdown di atas 30% sangat berat dipulihkan tanpa berjudi.', feedbackEn: 'Correct! Drawdown asymmetry punishes large losses harshly.' },
        { labelId: '+50% saja sama dengan kehilangannya', labelEn: '+50% symmetrical return', feedbackId: 'Coba hitung: Rp80.000 + 50% = cuma Rp120.000, belum balik modal!', feedbackEn: '80k + 50% gives only 120k, still down -25%!' },
        { labelId: '+25% sudah cukup', labelEn: '+25% is sufficient', feedbackId: 'Masih jauh dari angka awal Rp160.000.', feedbackEn: 'Far short of original equity.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Atur Rem Darurat Harian (Circuit Breaker) agar akuntansimu selalu berada di zona pemulihan ringan:',
      promptEn: 'Set Daily Max Drawdown Circuit Breaker:',
      choices: [
        { id: 'safe', labelId: 'Kunci Stop Harian maks -3% (-30 USC / Rp4.875) -> Tutup Laptop Bila Tersentuh', labelEn: 'Lock -3% Daily Circuit Breaker (-30 USC)', isSafe: true, riskUsc: 30, rewardUsc: 60, consequenceId: 'Drawdown tertahan super ringan, cuma butuh +3,1% untuk pulih kembali ke rekor puncak!', consequenceEn: 'Account stays permanently in easy recovery territory.' },
        { id: 'risky', labelId: 'Trading terus sampai modal tinggal 50% baru berhenti', labelEn: 'Keep trading down to -50% drawdown', isSafe: false, riskUsc: 500, rewardUsc: 50, consequenceId: 'Saldo ambles ke zona +100% pemulihan dan memicu stres emosional berat.', consequenceEn: 'Steep mathematical hole undermines calm execution.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Circuit Breaker Harian Aktif',
      outcomeTitleEn: 'Daily Loss Guardrail Verified',
      outcomeBodyId: 'Kamu mengerti asimetri matematika kerugian dan membatasi kerugian harian secara mekanis.',
      outcomeBodyEn: 'Protected compounding speed via hard daily stop limits.',
      jessyLineId: 'Hebat! Rem darurat itu bukan tanda lemah, itu ciri manajer investasi pro.',
      jessyLineEn: 'Pro move! Hedge funds run strict daily drawdown limits too.',
    },
  },

  // SEM 05
  'behavioral-finance-prospect-theory': {
    titleId: 'Uji Efek Disposisi: Menahan Target +30 USC vs Panik Tutup +5 USC',
    titleEn: 'Prospect Theory Lab: Beating Premature Profit Taking',
    briefingId: 'Posisi Buy XAUUSDc kamu sudah sesuai SOP (SL -10 USC, TP +30 USC). Saat baru jalan +6 USC, muncul 1 candle merah kecil. Apa aksimu?',
    briefingEn: 'Hold bracket discipline through normal +6 USC intra-swing noise.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Godaan Panik Tutup Cepat di +6 USC Sebelum Mencapai TP +30 USC',
      captionEn: 'Temptation To Close +6 USC Early vs Letting +30 USC TP Fill',
      candles: [
        { o: 3980, h: 3983, l: 3979, c: 3982, lbl: 'Buy Entry' },
        { o: 3982, h: 3984, l: 3981.5, c: 3983 },
        { o: 3983, h: 3983.5, l: 3981.8, c: 3982.1, lbl: 'Pullback' },
        { o: 3982.1, h: 3987, l: 3982, c: 3986.5 },
        { o: 3986.5, h: 3992, l: 3986, c: 3991, lbl: 'TP Hit!' },
      ],
      zoneLabelA: 'TP Target (+30 USC)',
      zoneLabelB: 'Noise Pullback (+6 USC)',
      zoneLabelC: 'SL Terkunci (-10 USC)',
    },
    step1: {
      questionId: 'Menurut teori Prospect Theory Kahneman & Tversky, mengapa pemula sering tergoda menutup profit kecil +6 USC lebih awal tapi membiarkan minus membesar?',
      questionEn: 'What cognitive bias drives traders to snatch +6 USC prematurely yet hold large floating losses?',
      options: [
        { labelId: 'Efek Disposisi: rasa takut profit kecil hilang terasa lebih kuat daripada kesabaran menuju R:R rencana', labelEn: 'Disposition Effect / Loss Aversion warping rational asymmetric reward math', feedbackId: 'Benar! Memotong profit di 0.6R membuat sistem dengan win rate 50% malah rugi bersih!', feedbackEn: 'Exact! Premature profit-snatching destroys positive expectancy.' },
        { labelId: 'Karena broker melarang profit 1:3', labelEn: 'Brokers forbid 1:3 R:R targets', feedbackId: 'Keliru, kendalanya ada pada dopamin ketakutan manusia sendiri.', feedbackEn: 'The hurdle sits solely inside trader neurology.' },
        { labelId: 'Karena candle merah kecil pasti menandakan Crash', labelEn: 'One tiny pullback signals instant crash', feedbackId: 'Retracement normal selalu muncul sepanjang tren.', feedbackEn: 'Routine breathers happen inside every healthy impulse.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Saat melihat candle pullback kecil sementara SL tetap aman, keputusanmu:',
      promptEn: 'Select response during +6 USC minor pullback:',
      choices: [
        { id: 'safe', labelId: 'Biarkan Hard SL & Hard TP bekerja otomatis sampai +30 USC (+Rp4.875)', labelEn: 'Trust hard bracket orders cleanly toward +30 USC', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Mencapai rasio penuh 1:3 sehingga 1 kali menang menutup biaya 3 kali stop!', consequenceEn: 'Captured full +3.0R asymmetric payout!' },
        { id: 'risky', labelId: 'Panik tekan Close Manual di +6 USC padahal SL disiapkan -10 USC', labelEn: 'Panic close +6 USC manually', isSafe: false, riskUsc: 10, rewardUsc: 6, consequenceId: 'Menghancurkan R:R jadi 1:0.6! Bila besok kena SL -10 USC, saldo bersih tetap minus -4 USC.', consequenceEn: 'Expectancy flips negative (0.6R vs 1.0R risk).' },
      ],
    },
    step3: {
      outcomeTitleId: 'Efek Disposisi Berhasil Dinetralkan',
      outcomeTitleEn: 'Disposition Trap Neutralized',
      outcomeBodyId: 'Kamu membiarkan target R:R bekerja hingga selesai tanpa mengintervensi emosi di tengah jalan.',
      outcomeBodyEn: 'Let hard asymmetric brackets resolve objectively.',
      jessyLineId: 'Luar biasa! Sabar menunggu TP penuh itu kunci kenapa 40% win rate tetap kaya.',
      jessyLineEn: 'Full 3R patience wins long-term!',
    },
  },
  'tilt-neuroscience-and-cognitive-biases': {
    titleId: 'Protokol Anti-Tilt: Respon Setelah 2x Kena Stop Loss Beruntun (-20 USC)',
    titleEn: 'Anti-Tilt Protocol: Post-2-Loss Cooling Circuit',
    briefingId: 'Sesi sore ini dua kali setup bagusmu tersapu -10 USC dan -10 USC (-20 USC). Jantung mulai berdebar dan jari ingin menggandakan lot ke 0.06 untuk balas modal.',
    briefingEn: 'You took two -10 USC valid stops today and feel acute urge to double lot size.',
    visual: {
      kind: 'EQUITY_CURVE',
      captionId: 'Beda Hasil Menunggu Esok vs Balas Dendam Lot 0.06 Saat Tilt',
      captionEn: 'Cooling Down vs Tilt Martingale Spiral',
      curvePoints: [
        { step: 'Awal', safeVal: 1000, recklessVal: 1000 },
        { step: 'SL 1-2', safeVal: 980, recklessVal: 980 },
        { step: 'Trade 3', safeVal: 980, recklessVal: 920 },
        { step: 'Besok', safeVal: 1010, recklessVal: 780 },
      ],
      curveUnit: 'USC',
    },
    step1: {
      questionId: 'Mengapa dorongan mendadak menaikkan lot menjadi 0.06 usai 2 kali kalah sangat berbahaya secara neurologis?',
      questionEn: 'Why is tripling lot size immediately after two stops neurologically hazardous?',
      options: [
        { labelId: 'Kortisol menonaktifkan logika kontrol risiko dan mengubah analisis menjadi judi kejar balik modal', labelEn: 'Acute Tilt stress hormones impair risk control and fuel reckless revenge lots', feedbackId: 'Tepat! Kondisi ini dikenal sebagai Gambler Fallacy & Tilt neurokimia.', feedbackEn: 'Exact diagnosis of acute Tilt neurochemistry.' },
        { labelId: 'Karena 3 kali salah berturut-turut mustahil terjadi di matematika', labelEn: 'Three losses cannot happen probabilistically', feedbackId: 'Dalam win rate 50% sekalipun, 3-5 kali kalah berturut-turut sangat wajar terjadi!', feedbackEn: 'Even at 50% win rate, 4-loss streaks occur routinely.' },
        { labelId: 'Karena aplikasi MT5 tidak menerima perubahan lot', labelEn: 'MT5 locks volume changes', feedbackId: 'MT5 membiarkanmu memperbesar lot; dirimu sendirilah remnya.', feedbackEn: 'You are the sole safeguard.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Apa perintah wajib JGS saat melihat 2 kali rugi beruntun di hari yang sama?',
      promptEn: 'Execute anti-tilt decision rule:',
      choices: [
        { id: 'safe', labelId: 'Tutup MT5 Sekarang -> Keluar Jalan Kaki -> Lanjut Evaluasi Tenang Besok (Sisa 980 USC)', labelEn: 'Close terminal now and return fresh tomorrow (980 USC intact)', isSafe: true, riskUsc: 0, rewardUsc: 30, consequenceId: 'Selamat! Keesokan harinya dalam kondisi segar +30 USC langsung membawa akun tembus rekor 1.010 USC!', consequenceEn: 'Fresh next-day execution lifted account to new highs!' },
        { id: 'risky', labelId: 'Buka posisi balas dendam 0.06 Cent Lot langsung di bar M1', labelEn: 'Fire revenge 0.06 Cent lot on M1 chop', isSafe: false, riskUsc: 60, rewardUsc: 10, consequenceId: 'Risiko membengkak 6% per klik menggerus saldo hingga 780 USC dalam 15 menit!', consequenceEn: 'Tilt spiral shaved off 22% equity inside minutes.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Otak & Modal Selamat Dari Badai Tilt',
      outcomeTitleEn: 'Tilt Impulse Intercepted Successfully',
      outcomeBodyId: 'Menutup layar setelah 2 stop menyelamatkan lebih banyak uang dibanding indikator apa pun.',
      outcomeBodyEn: 'Saved equity cleanly by stepping away during Tilt spikes.',
      jessyLineId: 'Bangga sama kamu! Berani berhenti saat emosi panas itu level dewasa sejati.',
      jessyLineEn: 'Respect! Stepping back preserves months of gains.',
    },
  },
  'neuroscience-emotions-and-process-journal': {
    titleId: 'Audit Proses vs Hasil: Menilai Kejujuran Lencana Jurnal',
    titleEn: 'Process Score vs Random Outcome Audit Lab',
    briefingId: 'Bandingkan Trade A (Sesuai 3-Gate SOP tapi kebetulan kena SL -10 USC) vs Trade B (Asal pencet FOMO tanpa SL lalu kebetulan profit +25 USC).',
    briefingEn: 'Grade execution integrity independently from short-term random P&L.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Matriks Penilaian Jurnal Kuantitatif (Outcome Bias Filter)',
      captionEn: 'Quantitative Journal Process Grading Matrix',
      specHeaders: ['Transaksi', 'Hasil Angka', 'Nilai Proses SOP'],
      specRows: [
        ['Trade A (Tunggu Sweep+MSS+SL)', '-10 USC (Kena Stop)', 'GRADE A+ (Proses 100%)'],
        ['Trade B (Kejar Pucuk + Geser SL)', '+25 USC (Hoki)', 'GRADE F (Racun Kebiasaan)'],
        ['Fokus Evaluasi JGS', 'Pelihara Pola A', 'Hentikan Pola B Segera'],
      ],
    },
    step1: {
      questionId: 'Mengapa Trade B (+25 USC hasil FOMO tanpa SL) justru dinilai lebih berbahaya daripada Trade A (-10 USC sesuai SOP)?',
      questionEn: 'Why is a lucky rule-breaking win (+25 USC) more dangerous long term than a -10 USC SOP stop?',
      options: [
        { labelId: 'Dopamin menghadiahi kecerobohan sehingga mendorong kita mengulangi FOMO tanpa SL hingga kehancuran total', labelEn: 'Lucky dopamine rewards reinforce reckless rule breaches until catastrophic wipeout', feedbackId: 'Benar! Keberuntungan jangka pendek menyamarkan risiko kehancuran.', feedbackEn: 'Spot on diagnosis of Outcome Bias!' },
        { labelId: 'Karena angka 25 ganjil', labelEn: 'Because 25 is odd', feedbackId: 'Keliru, bahayanya terletak pada penguatan kebiasaan salah.', feedbackEn: 'Habit reinforcement is the true hazard.' },
        { labelId: 'Karena Trade A tidak dicatat', labelEn: 'Trade A gets ignored', feedbackId: 'Keduanya wajib dicatat jujur pada Kalender PnL.', feedbackEn: 'Log both truthfully.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di Kalender PnL JGS (/journal), lencana jujur mana yang kamu tempel pada Trade B (+25 USC hasil FOMO)?',
      promptEn: 'Select honest journal tag for Trade B:',
      choices: [
        { id: 'safe', labelId: 'Tempel Lencana Peringatan: "Masuk Kecepatan (FOMO)" supaya bocor terdeteksi!', labelEn: 'Tag honestly as "Entered Early (FOMO)"', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Kejujuran memutus rantai Outcome Bias dan menaikkan Skor Disiplin bulan depan di atas 85%!', consequenceEn: 'Honest logging breaks toxic habits cleanly.' },
        { id: 'risky', labelId: 'Beri label palsu "Disiplin Sesuai SOP" biar terlihat hijau bersih', labelEn: 'Falsely tag as Disciplined On SOP', isSafe: false, riskUsc: 50, rewardUsc: 25, consequenceId: 'Menipu diri sendiri di jurnal membuat kesalahan sama terulang lagi bulan depan.', consequenceEn: 'Self-deception hides recurring account leaks.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Integritas Jurnal Terjaga',
      outcomeTitleEn: 'Process-Over-Outcome Audit Cleared',
      outcomeBodyId: 'Kamu memisahkan antara nasib acak per-trade dengan kualitas kepatuhan SOP di kalender.',
      outcomeBodyEn: 'Separated random variance cleanly from repeatable edge.',
      jessyLineId: 'Kejujuran ke diri sendiri di jurnal adalah cermin juara sejati!',
      jessyLineEn: 'Honest journaling separates strategists from gamblers!',
    },
  },

  // SEM 06
  'candlestick-psychology-and-wicks': {
    titleId: 'Membaca Pertarungan Sumbu Penolakan vs Badan Candle Homma',
    titleEn: 'Reading Candlestick Buyer-Seller Pressure & Wick Rejection',
    briefingId: 'Harga XAUUSD menguji Resistance 3990.00. Dua bar M15 membentuk buntut panjang ke 3993.50 lalu menutup badan merah tegas kembali ke 3988.20.',
    briefingEn: 'Decode upper rejection wicks at key 3990 resistance levels.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Sumbu Penolakan Atas vs Penembusan Badan Penuh',
      captionEn: 'Rejection Upper Tail vs Weak Continuation',
      candles: [
        { o: 3982, h: 3986, l: 3981, c: 3985.5 },
        { o: 3985.5, h: 3989.5, l: 3985, c: 3989 },
        { o: 3989, h: 3993.5, l: 3987.5, c: 3988.2, lbl: 'Penolakan' },
        { o: 3988.2, h: 3989, l: 3984, c: 3984.5, lbl: 'Konfirmasi' },
        { o: 3984.5, h: 3986, l: 3979, c: 3980 },
      ],
      zoneLabelA: 'Wick Penolakan (3993.5)',
      zoneLabelB: 'Batas Tutup Merah (3988.2)',
      zoneLabelC: 'Target Turun (3980)',
    },
    step1: {
      questionId: 'Apa cerita sebenarnya di balik buntut atas panjang hingga 3993.50 yang menutup merah di 3988.20?',
      questionEn: 'What does a tall upper wick poking 3993.50 and closing red at 3988.20 narrate?',
      options: [
        { labelId: 'Pembeli sempat mendorong ke 3993.50 tetapi Seller raksasa memukul balik penuh sebelum candle tutup!', labelEn: 'Buyers pushed up cleanly only to get slammed back below resistance before close', feedbackId: 'Tepat! Itu bukti nyata suplai agresif di atas 3990.', feedbackEn: 'Exact price-action storytelling!' },
        { labelId: 'Tanda pembeli makin kuat tanpa hambatan', labelEn: 'Unstoppable buyer momentum', feedbackId: 'Salah, jika kuat tentu badan candle ditutup penuh dekat 3993.', feedbackEn: 'Strong buyers close near candle highs, not lows.' },
        { labelId: 'Pasar tutup mendadak', labelEn: 'Market halted suddenly', feedbackId: 'Bukan pasar tutup, melainkan pergantian dominasi di dalam sesi.', feedbackEn: 'Reflects active supply dominance.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di posisi mana Stop Loss dan Lot aman dipasang bila masuk Sell di 3986?',
      promptEn: 'Anchor Sell Stop Loss logically against the rejection wick:',
      choices: [
        { id: 'safe', labelId: 'Sell di 3986.00 dengan SL di 3994.20 (Di atas ujung ekor penolakan!) • 0.01 Lot', labelEn: 'Sell 3986 with SL safely above wick at 3994.20', isSafe: true, riskUsc: 8.2, rewardUsc: 20, consequenceId: 'Aman dari retest dan meluncur bersih ke target 3980 (+20 USC).', consequenceEn: 'Protected behind rejection tail through target delivery.' },
        { id: 'risky', labelId: 'Masuk Sell tapi taruh SL sempit di 3988.50 (di tengah sumbu)', labelEn: 'Place tight SL inside the rejection wick at 3988.50', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Retest wajar ke badan sumbu menyapu SL sebelum harga turun sesuai prediksimu!', consequenceEn: 'Retest swept SL mid-wick prior to drop.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Psikologi Candlestick Dikuasai',
      outcomeTitleEn: 'Candlestick Pressure Decoded',
      outcomeBodyId: 'Kamu membaca niat pertarungan pembeli vs penjual di balik setiap buntut candle.',
      outcomeBodyEn: 'Placed stops logically behind authentic rejection tails.',
      jessyLineId: 'Bagus! Jangan lagi tertipu beli hanya gara-gara candle hijau setengah jadi.',
      jessyLineEn: 'Nice! Always read close vs wick location.',
    },
  },
  'market-structure-support-supply': {
    titleId: 'Struktur Tren HH/HL vs Perubahan Arah Badan Candle (BOS/MSS)',
    titleEn: 'Classic Market Structure: Body Close Break vs Wick Poke',
    briefingId: 'Tren naik memiliki Higher Low terakhir di 1.0840. Satu sumbu M15 menembus tipis 1.0837 tetapi langsung menutup di 1.0843. Apa artinya?',
    briefingEn: 'Evaluate whether a 3-pip wick dip below 1.0840 flips H1 uptrend bearish.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Higher Low 1.0840 Disenggol Ekor Tanpa Penutupan Bawah',
      captionEn: 'Wick Sweep Under 1.0840 Preserving Bullish Structure',
      candles: [
        { o: 1.083, h: 1.086, l: 1.0828, c: 1.0858 },
        { o: 1.0858, h: 1.0865, l: 1.084, c: 1.0842, lbl: 'HL 1.0840' },
        { o: 1.0842, h: 1.0875, l: 1.084, c: 1.0872 },
        { o: 1.0872, h: 1.0874, l: 1.0837, c: 1.0846, lbl: 'Cuma Ekor!' },
        { o: 1.0846, h: 1.089, l: 1.0845, c: 1.0888, lbl: 'Lanjut HH' },
      ],
      zoneLabelA: 'Puncak HH Baru (1.0890)',
      zoneLabelB: 'Penutupan Aman (1.0846)',
      zoneLabelC: 'Higher Low (1.0840)',
    },
    step1: {
      questionId: 'Apakah struktur tren naik sudah resmi patah berubah turun hanya karena ekor menyentuh 1.0837?',
      questionEn: 'Did the bullish trend formally break bearish on that 1.0837 wick poke?',
      options: [
        { labelId: 'Belum! Selama badan candle menutup di atas 1.0840, itu baru sapuan likuiditas dalam tren naik', labelEn: 'No! Closing above 1.0840 preserves bullish structure after liquidity sweep', feedbackId: 'Tepat! Banyak trader terkecoh klik Sell di sini sebelum harga lanjut ke 1.0890.', feedbackEn: 'Spot on! Body closes decide valid trend breaks.' },
        { labelId: 'Sudah 100% tren turun abadi', labelEn: 'Yes, permanent downtrend locked', feedbackId: 'Salah, ekor tidak mengonfirmasi perubahan struktur.', feedbackEn: 'Fleeting wicks do not flip trend.' },
        { labelId: 'Artinya pasar akan diam sebulan', labelEn: 'Market stalls indefinitely', feedbackId: 'Pasar justru kerap melesat kencang sehabis menyapu HL.', feedbackEn: 'Reclaims often launch sharp rallies.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Setelah bar menutup kembali hijau di 1.0846 (mempertahankan HL), aksi apa yang tepat?',
      promptEn: 'Select execution upon reclaim close at 1.0846:',
      choices: [
        { id: 'safe', labelId: 'Buy EURUSDc searah tren naik (SL di bawah ekor 1.0833 = 13 pips) • 0.05 Cent Lot', labelEn: 'Buy EURUSDc with 13-pip SL safely under 1.0833 wick', isSafe: true, riskUsc: 6.5, rewardUsc: 22, consequenceId: 'Risiko cuma 6.5 USC dan langsung meluncur ke puncak baru 1.0890 (+22 USC)!', consequenceEn: 'Clean continuation trade yielded +22 USC.' },
        { id: 'risky', labelId: 'Jual cepat (Sell Market) melawan tren karena tadi sempat melihat angka 1.0837', labelEn: 'Short blindly from seeing 1.0837', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Kamu terjebak tepat di ujung bawah sebelum gelombang beli menghancurkan posisi Sell-mu.', consequenceEn: 'Got squeezed cleanly at Higher Low support.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Struktur Harga & Body Close Terjaga',
      outcomeTitleEn: 'Trend Continuity Rule Cleared',
      outcomeBodyId: 'Membedakan sapuan wick dari penutupan badan menyelamatkan arah analisismu.',
      outcomeBodyEn: 'Never flip bias on unclosed intra-bar pokes.',
      jessyLineId: 'Sipp! Tunggu penutupan candle selalu menyelamatkanmu dari jebakan palsu.',
      jessyLineEn: 'Always wait for bar closes before flipping bias!',
    },
  },
  'indicators-ma-rsi-macd-atr-lag': {
    titleId: 'Pembuktian Keterlambatan (Lagging) Moving Average vs Harga Mentah + ATR',
    titleEn: 'Proving Indicator Lag Math & Harnessing ATR Volatility Buffers',
    briefingId: 'Emas melesat dari 3970 ke 3988. Indikator EMA(20/50) baru saja membentuk sinyal Golden Cross saat harga sudah di 3987.50, sedangkan ATR menunjukkan rentang volatilitas $3.20.',
    briefingEn: 'Avoid lagging Golden Cross chasing and calibrate stops via ATR(14).',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Posisi Harga Masuk: Konfirmasi Harga Mentah vs Golden Cross EMA',
      captionEn: 'Entry Location Efficiency: Pure Price vs Lagging Crossover',
      bars: [
        { label: 'Retest FVG Diskon', value: 3975.0, unit: 'USD (Murah)', tone: 'green' },
        { label: 'Tengah Gelombang', value: 3981.0, unit: 'USD', tone: 'blue' },
        { label: 'Cross EMA20/50', value: 3987.5, unit: 'USD (Telat)', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa sinyal persilangan Golden Cross EMA(20/50) selalu muncul belakangan sesudah harga sudah naik jauh?',
      questionEn: 'Why do Moving Average crossovers systematically print late after trends run?',
      options: [
        { labelId: 'Karena rumus rata-rata menjumlahkan 20-50 candle masa lalu sebelum ikut bergerak naik', labelEn: 'Moving averages arithmetically average 20-50 trailing bars', feedbackId: 'Betul! Secantik apa pun setting-nya, ia secara matematis adalah cermin spion.', feedbackEn: 'Exact mathematical limitation!' },
        { labelId: 'Karena koneksi internet lambat', labelEn: 'Slow internet latency', feedbackId: 'Bukan jaringan internet, murni formula rata-rata historis.', feedbackEn: 'Strictly formulaic averaging lag.' },
        { labelId: 'Karena MACD menahan harga', labelEn: 'MACD caps momentum', feedbackId: 'MACD juga turunan dari EMA sehingga sama-sama lagging.', feedbackEn: 'MACD inherits the identical EMA lag.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Bila kamu tetap masuk Buy mengikuti harga saat ATR(14) = $3.20, mana cara memakai indikator yang paling waras?',
      promptEn: 'Select smart indicator application:',
      choices: [
        { id: 'safe', labelId: 'Tunggu pullback ke FVG dulu & pakai nilai ATR ($3.20) untuk menaruh SL aman 1.5x ATR ($4.80)', labelEn: 'Wait for FVG pullback and size 1.5x ATR ($4.80) stop', isSafe: true, riskUsc: 9.6, rewardUsc: 24, consequenceId: 'Tidak beli kemahalan di puncak dan SL-mu kebal guncangan volatilitas wajar!', consequenceEn: 'Discount entry + ATR-calibrated buffer cleared nicely.' },
        { id: 'risky', labelId: 'Langsung Buy di 3987.50 saat Golden Cross menyilang dengan SL ketat $1.00', labelEn: 'Buy late cross at 3987.50 with tiny $1 stop', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'SL $1 lebih kecil dari gerak normal 1 candle ($3.20) sehingga tersapu seketika saat koreksi!', consequenceEn: 'Sub-ATR stop got crushed instantly by normal pullback noise.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Indikator Dipakai Pada Tempatnya',
      outcomeTitleEn: 'Lagging Trap Eliminated',
      outcomeBodyId: 'Kamu membebaskan grafik dari kepungan sinyal telat dan memanfaatkan ATR murni sebagai penggaris risiko.',
      outcomeBodyEn: 'Clean raw chart triggers combined with objective ATR sizing.',
      jessyLineId: 'Tepat! Harga adalah raja, indikator hanyalah alat ukur pembantu.',
      jessyLineEn: 'Price leads, oscillators follow!',
    },
  },

  // SEM 07
  'support-resistance-zones-basics': {
    titleId: 'Mengubah Garis Tipis Menjadi Kotak Zona Pantul (Body-to-Wick)',
    titleEn: 'Horizontal Zone Mapping: From Fragile Hairlines to Robust Bands',
    briefingId: 'Harga berbalik tiga kali di kisaran 3970.00 - 3972.80. Bagaimana menandai batas lantai yang tahan terhadap guncangan 10 pips?',
    briefingEn: 'Construct resilient horizontal Support zones instead of thin lines.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Zona Kotak Support 3970.00 s/d 3972.80 Melindungi Order Buy',
      captionEn: 'Demand Band 3970.00 - 3972.80 Capturing Revisit Cleanly',
      candles: [
        { o: 3978, h: 3979, l: 3971.2, c: 3975 },
        { o: 3975, h: 3981, l: 3974, c: 3980 },
        { o: 3980, h: 3980.5, l: 3970.3, c: 3973.5, lbl: 'Tes Zona' },
        { o: 3973.5, h: 3983, l: 3973, c: 3982, lbl: 'Pantul!' },
      ],
      zoneLabelA: 'Target Atas (3983)',
      zoneLabelB: 'Batas Atas Kotak (3972.8)',
      zoneLabelC: 'Batas Bawah Kotak (3970.0)',
    },
    step1: {
      questionId: 'Mengapa menggambar kotak horizontal (dari penutupan badan hingga ujung ekor) lebih realistis daripada satu garis tunggal?',
      questionEn: 'Why do institutional zone boxes outperform thin single horizontal lines?',
      options: [
        { labelId: 'Karena jutaan order bank tersebar di beberapa rentang angka sekitar level kunci, bukan 1 titik desimal kaku', labelEn: 'Resting bank limit pools span realistic price bands rather than exact single ticks', feedbackId: 'Benar! Zona mencegah panik saat harga masuk beberapa pips lebih dalam ke kotak.', feedbackEn: 'Exact order-book anatomy!' },
        { labelId: 'Supaya grafik lebih penuh warna', labelEn: 'Purely aesthetic decoration', feedbackId: 'Bukan estetika, ini mencerminkan penyebaran likuiditas nyata.', feedbackEn: 'Reflects actual limit order clustering.' },
        { labelId: 'Supaya tidak usah memasang Stop Loss', labelEn: 'Eliminates Stop Loss needs', feedbackId: 'Stop Loss tetap wajib dipasang di luar sisi terjauh kotak zona.', feedbackEn: 'Stops stay anchored strictly outside the far edge.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Jika batas bawah kotak Demand adalah 3970.00, di mana letak SL yang benar?',
      promptEn: 'Anchor SL outside the horizontal band:',
      choices: [
        { id: 'safe', labelId: 'Buy Limit di tengah zona (3971.50) dengan SL di luar batas bawah (3968.50)', labelEn: 'Buy mid-zone 3971.50 with SL safely below 3968.50', isSafe: true, riskUsc: 6, rewardUsc: 22, consequenceId: 'Tersentuh rapi di 3970.30 tanpa kena SL lalu melesat naik ke 3982.50 (+22 USC)!', consequenceEn: 'Clean bounce out of zone delivered +22 USC.' },
        { id: 'risky', labelId: 'Buy di bibir atas 3972.80 dan taruh SL di 3971.80 (di tengah zona)', labelEn: 'Place SL inside the zone at 3971.80', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Harga baru mampir menguji setengah kotak sudah memotong SL-mu duluan!', consequenceEn: 'Normal zone fill tagged mid-zone stop.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Pemetaan Zona Horizontal Presisi',
      outcomeTitleEn: 'Support Zone Mapping Cleared',
      outcomeBodyId: 'Kotak zona yang baik selalu mengizinkan harga bernapas di dalamnya dengan SL jelas di luar kotak.',
      outcomeBodyEn: 'Clean zone entry paired with outer-boundary stops.',
      jessyLineId: 'Bagus! Jangan lagi pasang SL di tengah zona yang justru tempat harga mampir.',
      jessyLineEn: 'Smart placement outside zone edges!',
    },
  },
  'supply-demand-order-blocks-beginner': {
    titleId: 'Memilih Gudang Demand Segar (Fresh) vs Kotak Lama yang Keropos',
    titleEn: 'Fresh Unmitigated Demand Zone vs Heavily Tested Weak Box',
    briefingId: 'Ada dua area Demand: Kotak 1 baru sekali terbentuk dengan ledakan FVG ke atas dan BELUM pernah dikunjungi; Kotak 2 sudah dipantuli bolak-balik 4 kali dalam 3 jam.',
    briefingEn: 'Compare first-touch Fresh Origin base against 4x tapped support shelf.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Sisa Antrean Order Limit Beli Institusi Tersisa',
      captionEn: 'Remaining Institutional Bid Liquidity Depth (%)',
      bars: [
        { label: 'Kotak Fresh (0 Sentuhan)', value: 92, unit: '% utuh', tone: 'green' },
        { label: 'Kotak Tested (1x Sentuh)', value: 55, unit: '% sisa', tone: 'gold' },
        { label: 'Kotak Keropos (4x Diinjak)', value: 12, unit: '% tipis', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa Kotak Fresh (0 sentuhan sebelumnya) memiliki peluang pantulan terkuat?',
      questionEn: 'Why does an untouched Fresh origin base deliver strongest initial bounce odds?',
      options: [
        { labelId: 'Sisa antrean limit beli bank yang belum sempat terisi saat ledakan harga masih utuh menumpuk di sana', labelEn: 'Unfilled institutional limit orders remain intact until the first revisit fills them', feedbackId: 'Betul! Setelah 3-4 kali diinjak, antrean itu sudah habis dimakan penjual.', feedbackEn: 'Exact inventory depletion mechanics!' },
        { labelId: 'Karena warnanya masih baru', labelEn: 'Newest shapes automatically bounce', feedbackId: 'Bukan masalah waktu saja, melainkan belum pernah dikunjungi ulang (Unmitigated).', feedbackEn: 'Unmitigated status drives probability.' },
        { labelId: 'Karena tren selalu naik selamanya', labelEn: 'Price moves upward continuously', feedbackId: 'Pasar berputar dua arah.', feedbackEn: 'Markets cycle dynamically.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di kotak mana kamu menaruh rencana eksekusi 1% modal 1.000 USC?',
      promptEn: 'Allocate 1% risk to stronger S&D zone:',
      choices: [
        { id: 'safe', labelId: 'Eksklusif pilih Kotak Fresh dengan ledakan keluar FVG tegas (0 sentuhan)', labelEn: 'Select Fresh 0-Touch Origin Base exclusively', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Pantulan kuat sentuhan perdana memberi kemenangan bersih +30 USC (+Rp4.875)!', consequenceEn: 'Clean first-touch bounce paid +30 USC.' },
        { id: 'risky', labelId: 'Buy di Kotak ke-4 karena merasa level itu pasti selalu memantul', labelEn: 'Buy the 4th-tap depleted shelf', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Antrean beli sudah kosong sehingga harga jebol merah menembus kotak dengan cepat!', consequenceEn: 'Exhausted floor collapsed directly through stop.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Pemburu Zona Fresh Sejati',
      outcomeTitleEn: 'Fresh Supply/Demand Filter Mastered',
      outcomeBodyId: 'Kamu membuang kotak bekas yang sudah berkali-kali diuji dan fokus pada sentuhan perdana searah tren.',
      outcomeBodyEn: 'Focused risk strictly on untouched high-imbalance zones.',
      jessyLineId: 'Tepat! Zona perawan ibarat bantalan pegas paling kencang di pasar.',
      jessyLineEn: 'Fresh zones pack maximum unspent order energy!',
    },
  },
  'trendline-liquidity-vs-static-zones': {
    titleId: 'Perangkap Trendline Miring: Menjemput Likuiditas Menuju Demand Horizontal',
    titleEn: 'Diagonal Trendline Sweep Trap -> Horizontal Demand Reversal',
    briefingId: 'Ritel menarik garis trendline naik rapi selama 4 sentuhan berturut-turut. Tepat 20 pips di bawah garis miring tersebut terdapat kotak Demand Horizontal H1 segar.',
    briefingEn: 'Anticipate diagonal stop sweep flushing directly into horizontal H1 Demand.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Jebakan Garis Miring Ritel Disapu Masuk ke Kotak Demand Horizontal',
      captionEn: 'Diagonal Trendline Pool Swept Straight Into Horizontal Demand',
      candles: [
        { o: 1.086, h: 1.0875, l: 1.085, c: 1.087 },
        { o: 1.087, h: 1.0885, l: 1.0858, c: 1.088 },
        { o: 1.088, h: 1.089, l: 1.0866, c: 1.0885, lbl: 'TL Sentuh 3' },
        { o: 1.0885, h: 1.0888, l: 1.0842, c: 1.0855, lbl: 'Jebol -> Demand!' },
        { o: 1.0855, h: 1.091, l: 1.0852, c: 1.0905, lbl: 'Terbang 1:3' },
      ],
      zoneLabelA: 'Target Balik (1.0910)',
      zoneLabelB: 'Garis TL Jebol (Trap)',
      zoneLabelC: 'Demand Horizontal (1.0842)',
    },
    step1: {
      questionId: 'Mengapa mematahkan garis trendline miring justru sering berbalik arah naik kencang tepat di bawahnya?',
      questionEn: 'Why do diagonal trendline breaks routinely reverse violently downward-into-upward?',
      options: [
        { labelId: 'Karena tumpukan SL di bawah garis miring dipanen untuk mengisi order beli bank di Demand Horizontal', labelEn: 'Stop-losses parked under diagonal slopes fuel institutional fills inside underlying horizontal Demand', feedbackId: 'Benar! Order book hanya membaca harga angka tetap horizontal, bukan garis miring.', feedbackEn: 'Spot on! Order books match fixed horizontal prices solely.' },
        { labelId: 'Karena garis miring membuat pasar pusing', labelEn: 'Charts confuse algorithms', feedbackId: 'Algoritma likuiditas memang mendeteksi konsentrasi stop ritel.', feedbackEn: 'Liquidity seeking creates deliberate stop sweeps.' },
        { labelId: 'Karena semua breakout selalu gagal', labelEn: 'All breakouts fail automatically', feedbackId: 'Breakout sejati membutuhkan struktur horizontal & displacement.', feedbackEn: 'Valid horizontal displacements sustain nicely.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Harga baru saja menjebol garis trendline miring dan menyentuh kotak Demand 1.0842 lalu menutup hijau. Apa langkahmu?',
      promptEn: 'Pick execution right at Horizontal Demand reclaim:',
      choices: [
        { id: 'safe', labelId: 'Buy di Demand Horizontal (1.0855, SL 1.0837) pasca penolakan menyapu trendline', labelEn: 'Buy Horizontal Demand reclaim (1.0855, SL 1.0837)', isSafe: true, riskUsc: 9, rewardUsc: 28, consequenceId: 'Memanen bahan bakar penjual breakout yang terjebak dan meraih +28 USC!', consequenceEn: 'Captured post-trap squeeze cleanly for +28 USC!' },
        { id: 'risky', labelId: 'Ikut Sell panik saat melihat garis trendline miring baru saja ditembus ke bawah', labelEn: 'Sell panic breakdown right into Demand', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Menjual tepat di dasar gudang Demand H1 dan tergilas pantulan naik seketika!', consequenceEn: 'Shorted straight into institutional bids.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Pengguna Cerdas Peta Likuiditas',
      outcomeTitleEn: 'Trendline Liquidity Trap Avoided',
      outcomeBodyId: 'Kamu berhenti mempercayai pantulan garis diagonal buta dan mulai menunggu di level harga horizontal asli.',
      outcomeBodyEn: 'Shifted cleanly from subjective diagonals to static horizontal order levels.',
      jessyLineId: 'Wah keren banget! Kamu baru saja membaca jebakan klasik sejuta umat!',
      jessyLineEn: 'Awesome! Spotting trendline liquidity flips the trap!',
    },
  },

  // SEM 08
  'wyckoff-laws-and-composite-man': {
    titleId: 'Membaca Akal "Composite Man": Upaya Volume Besar vs Hasil Harga Datar',
    titleEn: 'Wyckoff Law #3: Effort vs Result Absorption Simulator',
    briefingId: 'Pasca tren turun panjang, candle turun di 3960 mengecil badannya (spread sempit) tetapi bar Volume tiba-tiba meledak 3x lipat dari normal.',
    briefingEn: 'Evaluate high selling volume producing near-zero downward progress.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Wyckoff Effort (Volume) vs Result (Jarak Penurunan Harga)',
      captionEn: 'Wyckoff Volume Effort vs Resulting Price Displacement',
      bars: [
        { label: 'Bar Normal Sebelumnya', value: 30, unit: 'Vol (Turun -$4)', tone: 'blue' },
        { label: 'Bar Penyerapan 3960', value: 95, unit: 'Vol (Turun -$0.5)', tone: 'green' },
        { label: 'Pantulan Berikutnya', value: 85, unit: 'Vol (Naik +$7)', tone: 'gold' },
      ],
    },
    step1: {
      questionId: 'Menurut Hukum ke-3 Wyckoff (Effort vs Result), apa arti volume jual raksasa tapi harga tidak mampu turun lebih dalam?',
      questionEn: 'What does surging volume with shrinking downward progress mean under Wyckoff Law 3?',
      options: [
        { labelId: 'Limit Buy raksasa (Composite Man) sedang menyerap seluruh panik jual publik sebagai akumulasi!', labelEn: 'Composite Man passive bids are quietly absorbing panic selling inventory', feedbackId: '100% Tepat! Ini bukti klasik penghentian tren turun sebelum akumulasi.', feedbackEn: 'Exact Wyckoff absorption readout!' },
        { labelId: 'Artinya pasar akan turun 10x lebih dalam lagi menit ini', labelEn: 'Guarantees immediate vertical crash', feedbackId: 'Salah! Bila tak ada yang menahan di 3960, volume 3x akan mencetak candle merah panjang.', feedbackEn: 'Unopposed supply would print huge red candles.' },
        { labelId: 'Artinya volume indikator rusak', labelEn: 'Broken volume meter', feedbackId: 'Ini pembacaan lelang antar pembeli dan penjual yang sangat sah.', feedbackEn: 'Authentic effort-vs-result divergence.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Langkah strategis menghadapi sinyal penyerapan (Stopping Volume) di 3960:',
      promptEn: 'Plan action around Stopping Volume:',
      choices: [
        { id: 'safe', labelId: 'Hentikan semua rencana Sell -> Tunggu fase Spring / pematahan struktur naik untuk masuk Buy', labelEn: 'Halt Shorts & await bullish Spring / structure break', isSafe: true, riskUsc: 10, rewardUsc: 32, consequenceId: 'Menghindari menjual di dasar lembah dan siap menunggangi fase markup +32 USC!', consequenceEn: 'Caught entire post-absorption markup phase.' },
        { id: 'risky', labelId: 'Tetap Sell Market di 3960 karena melihat berita kemarin masih negatif', labelEn: 'Press Sell blindly into absorption wall', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Menjual barang murah langsung ke kantong operator besar dan tersapu reli!', consequenceEn: 'Sold directly into institutional accumulation hands.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Mata Composite Man Aktif',
      outcomeTitleEn: 'Wyckoff Absorption Confirmed',
      outcomeBodyId: 'Kamu membandingkan tenaga volume dengan kemajuan candle untuk mendeteksi akumulasi.',
      outcomeBodyEn: 'Detected covert accumulation early cleanly.',
      jessyLineId: 'Wah mantap! Dari 1930 sampai 2026 hukum Wyckoff tetap jitu!',
      jessyLineEn: 'Timeless Wyckoff reading!',
    },
  },
  'wyckoff-accumulation-spring-upthrust': {
    titleId: 'Mendeteksi Fase C "Spring" Akumulasi Sebelum Reli Sign of Strength (SOS)',
    titleEn: 'Phase C Wyckoff Spring Detector & Sign of Strength Entry',
    briefingId: 'Setelah berhari-hari mendatar antara 3965-3978, harga mendadak anjlok menembus 3965 ke 3961 sekejap, lalu melesat kembali masuk ke 3969 menembus puncak kecil M15.',
    briefingEn: 'Spot authentic Wyckoff Spring reclaim and ride Sign of Strength expansion.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Rentang Akumulasi Wyckoff Fase A-E dengan Manipulasi Spring di Bawah 3965',
      captionEn: 'Wyckoff Accumulation Range & Phase C Spring Recovery',
      candles: [
        { o: 3972, h: 3977, l: 3966, c: 3968 },
        { o: 3968, h: 3976, l: 3965.5, c: 3974 },
        { o: 3974, h: 3975, l: 3961, c: 3969, lbl: 'Fase C Spring!' },
        { o: 3969, h: 3979, l: 3968, c: 3978.5, lbl: 'SOS Breakout' },
        { o: 3978.5, h: 3989, l: 3977, c: 3988 },
      ],
      zoneLabelA: 'Markup Target (3988)',
      zoneLabelB: 'Batas Kotak Atas (3978)',
      zoneLabelC: 'Jebakan Spring (3961)',
    },
    step1: {
      questionId: 'Mengapa harga perlu diturunkan sebentar di bawah dasar kotak 3965 (Fase C Spring) sebelum akhirnya melambung melewati 3978?',
      questionEn: 'What specific purpose does the Phase C Spring breakdown under 3965 accomplish?',
      options: [
        { labelId: 'Uji likuiditas akhir untuk membersihkan penjual panik dan memastikan suplai jual sudah habis total', labelEn: 'Final shakeout confirming zero remaining supply before Sign of Strength markup', feedbackId: 'Benar sekali! Inilah yang persis sama dengan Liquidity Sweep pada model ICT.', feedbackEn: 'Exact bridge between Wyckoff and ICT sweeps!' },
        { labelId: 'Karena ada kesalahan ketik di bursa', labelEn: 'Exchange pricing typo', feedbackId: 'Bukan kesalahan ketik, melainkan mekanisme pembersihan akhir.', feedbackEn: 'Intentional liquidity shakeout.' },
        { labelId: 'Untuk menyamakan harga perak', labelEn: 'Parity calibration', feedbackId: 'Tidak ada hubungan ke paritas logam lain.', feedbackEn: 'Pure accumulation phase dynamics.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Kapan titik eksekusi paling berkelas dan rendah risiko di akun 1.000 USC?',
      promptEn: 'Select highest-odds Wyckoff entry trigger:',
      choices: [
        { id: 'safe', labelId: 'Buy Limit pada Last Point of Support (LPS) di 3968 pasca Spring kembali di atas 3965 (SL 3960.5)', labelEn: 'Buy Test / LPS pullback post Spring reclaim (SL 3960.5)', isSafe: true, riskUsc: 7.5, rewardUsc: 26, consequenceId: 'Menangkap awal Fase D Sign of Strength dan memanen +26 USC (+Rp4.225) bersih!', consequenceEn: 'Clean SOS expansion delivered +26 USC!' },
        { id: 'risky', labelId: 'Buy membabi buta di 3962 saat candle merah jatuh bebas sebelum memantul', labelEn: 'Catch falling red knife blindly at 3962', isSafe: false, riskUsc: 15, rewardUsc: 0, consequenceId: 'Kalau bukan Spring asli melainkan tren turun baru, akun langsung tertabrak jatuh tanpa rem!', consequenceEn: 'No reclaim confirmation risks pure markdown continuation.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Siklus Akumulasi Dikuasai',
      outcomeTitleEn: 'Wyckoff Spring Blueprint Cleared',
      outcomeBodyId: 'Kamu menunggu bukti reclaim masuk ke rentang alih-alih menebak dasar saat merah terjun.',
      outcomeBodyEn: 'Entered cleanly on verified reclaim confirmation.',
      jessyLineId: 'Sempurna! Tunggu Spring memantul kembali baru ikut masuk!',
      jessyLineEn: 'Spring reclaim = clean green light!',
    },
  },
  'vsa-and-supply-demand-zones': {
    titleId: 'Evolusi Zona Drop-Base-Rally (DBR) + Konfirmasi Spread Volume',
    titleEn: 'Volume Spread Analysis & Drop-Base-Rally Demand Lab',
    briefingId: 'Setelah penurunan tajam (Drop), muncul satu candle Base kecil mendatar dengan volume sepi, langsung diikuti roket hijau tebal (Rally) menembus puncak lokal.',
    briefingEn: 'Evaluate DBR base quality by measuring volume and candle spread departure.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Pola Drop-Base-Rally (DBR) Mengunci Order Institusi di Kotak Base',
      captionEn: 'Classic Drop-Base-Rally Launch Leaving Fresh Demand Pocket',
      candles: [
        { o: 3990, h: 3991, l: 3982, c: 3983, lbl: 'Drop' },
        { o: 3983, h: 3984.5, l: 3982.5, c: 3984, lbl: 'Base Sempit' },
        { o: 3984, h: 3993, l: 3983.8, c: 3992.5, lbl: 'Roket Rally!' },
        { o: 3992.5, h: 3993, l: 3984.2, c: 3986, lbl: 'Pullback' },
        { o: 3986, h: 3996, l: 3985.5, c: 3995 },
      ],
      zoneLabelA: 'Target Atas (3996)',
      zoneLabelB: 'Roket Keberangkatan (3992.5)',
      zoneLabelC: 'Base Demand Asal (3982.5-3984.5)',
    },
    step1: {
      questionId: 'Mengapa Base sempit cuma 1-2 candle lalu meledak keluar sangat cepat jauh lebih berkualitas daripada konsolidasi berjam-jam?',
      questionEn: 'Why do 1-2 bar tight launch bases hold stronger unfilled demand than wide 20-bar chops?',
      options: [
        { labelId: 'Ledakan cepat membuktikan ketidakseimbangan besar sehingga sisa limit order bank di kotak Base masih penuh', labelEn: 'Explosive departure leaves high volume of unexecuted institutional bids behind', feedbackId: 'Tepat! Harga pergi terlalu cepat sehingga banyak antrean bank belum kebagian dan menunggu retest.', feedbackEn: 'Exact unfilled-order mechanism!' },
        { labelId: 'Karena gambarnya lebih kecil', labelEn: 'Visually tidier rectangle', feedbackId: 'Alasan ekonomi lelangnya adalah ketimpangan order instan.', feedbackEn: 'Reflects acute bid imbalance.' },
        { labelId: 'Supaya warna hijaunya terang', labelEn: 'Brighter chart aesthetics', feedbackId: 'Bukan masalah warna.', feedbackEn: 'Driven purely by supply-demand vacuum.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Harga baru saja turun pulang menyentuh bibir kotak Base di 3984.50. Tindakan terbaik:',
      promptEn: 'Execute around DBR launch shelf:',
      choices: [
        { id: 'safe', labelId: 'Buy Limit di 3984.50 dengan SL di bawah Base (3981.80 = 27 pips) • 0.02 Lot', labelEn: 'Buy Limit at 3984.50 (SL 3981.80)', isSafe: true, riskUsc: 5.4, rewardUsc: 21, consequenceId: 'Terisi murah di bibir gudang Demand dan melaju hingga 3995 (+21 USC)!', consequenceEn: 'Clean bounce out of DBR base yielded +21 USC.' },
        { id: 'risky', labelId: 'Sudah ikut Buy ketinggian saat candle roket di 3992.50', labelEn: 'Chased vertical launch candle at 3992.50', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Terkena pullback normal menuju 3984.20 yang langsung menghantam SL sempitmu!', consequenceEn: 'Routine pullback stopped out vertical chaser.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Gudang DBR Terbaca Tajam',
      outcomeTitleEn: 'Drop-Base-Rally Mastery Verified',
      outcomeBodyId: 'Sabar menunggu harga pulang ke Base setelah melihat ledakan Rally adalah kunci entri murah.',
      outcomeBodyEn: 'Never chase explosive rallies; bid calmly at origin base retests.',
      jessyLineId: 'Keren! Sekarang kamu beli barang di gudang pabriknya, bukan di etalase mahal!',
      jessyLineEn: 'Wholesale fills straight from the origin shelf!',
    },
  },

  // SEM 09
  'elliott-wave-mass-psychology': {
    titleId: 'Menangkap Gelombang 3 Impuls Pasca Koreksi Gelombang 2',
    titleEn: 'Elliott Impulse Lab: Positioning Cleanly After Wave 2 Resets',
    briefingId: 'Gelombang 1 naik dari 3960 ke 3980. Gelombang 2 koreksi tenang menelusuri kembali ke 3968 tanpa menembus awal 3960, lalu memecah ke atas.',
    briefingEn: 'Identify Wave 2 invalidation floor and position smoothly for Wave 3 expansion.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Gelombang 1 -> Koreksi Wave 2 -> Ekspansi Wave 3 Tercepat',
      captionEn: 'Wave 1 -> Wave 2 Reset -> High-Velocity Wave 3 Impulse',
      candles: [
        { o: 3960, h: 3972, l: 3959, c: 3971 },
        { o: 3971, h: 3980, l: 3970, c: 3979, lbl: 'Puncak W1' },
        { o: 3979, h: 3979, l: 3967.5, c: 3969, lbl: 'Lembah W2' },
        { o: 3969, h: 3986, l: 3968.5, c: 3985, lbl: 'Ledakan W3' },
        { o: 3985, h: 3999, l: 3984, c: 3998 },
      ],
      zoneLabelA: 'Ekstensi Wave 3 (3999)',
      zoneLabelB: 'Puncak W1 Ditembus (3980)',
      zoneLabelC: 'Batas Haram W2 (3960)',
    },
    step1: {
      questionId: 'Syarat mutlak aturan Elliott Wave agar hitungan Gelombang 2 tetap sah menuju ledakan Gelombang 3:',
      questionEn: 'Which non-negotiable Elliott rule keeps Wave 2 valid?',
      options: [
        { labelId: 'Gelombang 2 TIDAK BOLEH menutup melewati titik mulai Gelombang 1 (3960.00)', labelEn: 'Wave 2 may never retrace 100% below the origin of Wave 1', feedbackId: '100% Benar! Jika tembus 3960, seluruh skenario naik langsung batal otomatis.', feedbackEn: 'Exact cardinal Elliott Wave rule!' },
        { labelId: 'Gelombang 2 harus selalu lebih tinggi dari Gelombang 1', labelEn: 'Wave 2 must surpass Wave 1 high', feedbackId: 'Keliru, Wave 2 adalah koreksi turun yang lebih rendah.', feedbackEn: 'Wave 2 is a corrective pullback lower.' },
        { labelId: 'Gelombang 3 harus lebih pendek dari Wave 2', labelEn: 'Wave 3 shrinks shorter than Wave 2', feedbackId: 'Sebaliknya, Wave 3 biasanya menjadi impuls terpanjang dan terkuat.', feedbackEn: 'Wave 3 routinely expands strongest.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Jika masuk Buy pada penyelesaian koreksi Wave 2 di 3969.00, di mana batas SL objektifmu?',
      promptEn: 'Anchor objective Wave 2 Stop Loss:',
      choices: [
        { id: 'safe', labelId: 'Pasang SL aman di 3964.50 (Bawah lembah W2) mengincar TP +150 pips (1:3+ RRR)', labelEn: 'Set SL beneath W2 low at 3964.50 eyeing Wave 3', isSafe: true, riskUsc: 9, rewardUsc: 32, consequenceId: 'Menunggangi impuls Wave 3 terbersih dengan keuntungan +32 USC (+Rp5.200)!', consequenceEn: 'Clean Wave 3 expansion netted +32 USC!' },
        { id: 'risky', labelId: 'Coba-coba Sell saat Wave 3 baru saja memecah puncak 3980 karena mengira sudah mahal', labelEn: 'Fade fresh Wave 3 breakout at 3980', isSafe: false, riskUsc: 20, rewardUsc: 0, consequenceId: 'Dilindas kereta cepat Gelombang 3 yang melesat hampir lurus menuju 3999!', consequenceEn: 'Shorting into Wave 3 velocity triggered fast SL.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Psikologi Gelombang Dikuasai',
      outcomeTitleEn: 'Wave 3 Momentum Alignment Verified',
      outcomeBodyId: 'Kamu tahu cara menunggu koreksi W2 selesai dan tidak melawan impuls W3.',
      outcomeBodyEn: 'Cleanly positioned alongside primary impulse waves.',
      jessyLineId: 'Yes! Wave 3 itu surga trader tren yang sabar nunggu diskon W2.',
      jessyLineEn: 'Wave 3 momentum pays patient pullbacks cleanly!',
    },
  },
  'fibonacci-gold-ratios-and-discount': {
    titleId: 'Kalkulator Diskon 50%–61.8%: Memangkas Jarak Stop Loss Hingga Separuh',
    titleEn: 'Fibonacci Golden Pocket (<50% Discount) Efficiency Lab',
    briefingId: 'Ayunan naik H1 membentang dari 3960.00 (0%) ke 3990.00 (100%). Titik tengah Equilibrium (50%) adalah 3975.00 dan Golden Pocket (61.8%) di 3971.40.',
    briefingEn: 'Compare Risk:Reward between buying Premium (3984) vs Discount OTE (3971.50).',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Perbandingan Rasio Risk:Reward Menuju Puncak 3990.00',
      captionEn: 'Reward:Risk Comparison Targeting Same 3990 Swing High',
      bars: [
        { label: 'Beli Kemahalan (3984)', value: 0.7, unit: 'RRR', tone: 'red' },
        { label: 'Beli Ekuilibrium (3975)', value: 1.5, unit: 'RRR', tone: 'blue' },
        { label: 'Beli Golden Pocket 61.8%', value: 3.1, unit: 'RRR', tone: 'green' },
      ],
    },
    step1: {
      questionId: 'Mengapa membeli di zona Diskon 61.8% (3971.40) otomatis melipatgandakan rasio Profit vs Risiko menuju target 3990 yang SAMA?',
      questionEn: 'Why does bidding the 61.8% OTE pocket improve R:R dramatically on the identical target?',
      options: [
        { labelId: 'Karena titik masuk makin dekat ke batas SL 3965 (SL lebih pendek) dan jauh lebih panjang ke target 3990!', labelEn: 'Shorter distance to invalidation SL paired with much deeper expansion runway to highs', feedbackId: 'Tepat! Geometri harganya langsung berpihak padamu.', feedbackEn: 'Pure mathematical entry asymmetry!' },
        { labelId: 'Karena angka 61.8 merupakan nomor keberuntungan', labelEn: 'Pure lucky superstition number', feedbackId: 'Bukan takhayul, melainkan posisi matematis di sepertiga terbawah ayunan.', feedbackEn: 'Pure mathematical discount placement.' },
        { labelId: 'Karena target berubah menjadi dua kali lipat jauhnya', labelEn: 'Target doubles mysteriously', feedbackId: 'Target 3990-nya tetap sama, jarakmu mencapainya yang jauh lebih luas.', feedbackEn: 'Target remains constant; entry improves cleanly.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pasang order Buy Limit terbaik di akun 1.000 USC pada ayunan 3960-3990:',
      promptEn: 'Select optimal OTE Limit entry:',
      choices: [
        { id: 'safe', labelId: 'Tunggu sabar di Golden Pocket 61.8% (3971.50, SL 3965.50 = $6.00) -> TP 3990 (+$18.50)', labelEn: 'Anchor Limit at 61.8% Discount (3971.50)', isSafe: true, riskUsc: 6, rewardUsc: 18.5, consequenceId: 'Memberi rasio > 1:3 sangat ramah bagi 0.01 Cent Lot dengan risiko hanya Rp975!', consequenceEn: 'Clean >3R discount trade inside 1% cap!' },
        { id: 'risky', labelId: 'Kejar cepat di zona Premium 3984 (di atas 50%) dengan SL sama di 3965.50', labelEn: 'Chase Premium 3984 with wide SL at 3965.50', isSafe: false, riskUsc: 18.5, rewardUsc: 6, consequenceId: 'Risiko lebih besar daripada target profitnya (RRR terbalik 1:0.32)!', consequenceEn: 'Inverted R:R leaks equity over time.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Zona Diskon Diterapkan Presisi',
      outcomeTitleEn: 'Golden Pocket Discount Mastered',
      outcomeBodyId: 'Aturan anti-mahal: hindari membeli di atas 50% range dan biasakan menunggu penarikan diskon.',
      outcomeBodyEn: 'Filtered Premium chases cleanly out of your routine.',
      jessyLineId: 'Cerdas! Belanja di pasar keuangan sama kayak belanja baju: tunggu diskon 61.8%!',
      jessyLineEn: 'Always shop below the 50% equilibrium discount!',
    },
  },
  'harmonic-patterns-and-subjectivity-critique': {
    titleId: 'Pola Harmonik vs Bukti Objektif MSS: Melawan Bias Subjektivitas',
    titleEn: 'Objective Structure vs Subjective Pattern Fitting Critique',
    briefingId: 'Grafik tampak seperti membentuk pola Harmonik Bat pada titik D di 1.2920. Namun sejauh ini belum ada penutupan M5 bullish sama sekali dan candle merah masih deras.',
    briefingEn: 'Resist blind execution on geometric pattern points lacking MSS confirmation.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Titik Harmonik D (1.2920) Tertabrak Jebol Tanpa Konfirmasi MSS',
      captionEn: 'Harmonic D-Point Blown Through Without Bullish M5 Confirmation',
      candles: [
        { o: 1.296, h: 1.2965, l: 1.2938, c: 1.294 },
        { o: 1.294, h: 1.2945, l: 1.292, c: 1.2922, lbl: 'Titik D' },
        { o: 1.2922, h: 1.2925, l: 1.289, c: 1.2895, lbl: 'Jebol Terus!' },
        { o: 1.2895, h: 1.2902, l: 1.2875, c: 1.288 },
      ],
      zoneLabelA: 'Titik C Sebelumnya (1.2960)',
      zoneLabelB: 'Estimasi Rasio D (1.2920)',
      zoneLabelC: 'Jatuh Tanpa Rem (1.2880)',
    },
    step1: {
      questionId: 'Apa bahaya terbesar terlalu memercayai pola Harmonik/Wave secara buta tanpa menunggu konfirmasi price action?',
      questionEn: 'Why is blind Limit execution solely on harmonic ratio coordinates dangerous?',
      options: [
        { labelId: 'Rasio bisa terus bergeser (Bat berubah jadi Crab) sementara pisau merah terus memotong modalmu', labelEn: 'Pattern labels shift in hindsight while falling candles slice blind limit orders', feedbackId: '100% Benar! Peneliti menyebut ini Confirmation & Hindsight Bias.', feedbackEn: 'Exact critique of subjective pattern fitting!' },
        { labelId: 'Karena pola harmonik tidak memakai Fibonacci', labelEn: 'Harmonics ignore Fibonacci', feedbackId: 'Justru dibangun dari rasio Fibonacci tetapi tanpa validasi reaksi.', feedbackEn: 'Uses ratios yet still requires price confirmation.' },
        { labelId: 'Karena MT5 tidak bisa menggambar segitiga', labelEn: 'Platform lacks triangle tools', feedbackId: 'Bukan keterbatasan visual, melainkan keterbatasan prediktif garis statis.', feedbackEn: 'Predictive limitation, not drawing limitation.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Menghadapi titik D 1.2920 saat tren merah masih deras, apa perintah SOP JGS?',
      promptEn: 'Select strict confirmation rule at 1.2920:',
      choices: [
        { id: 'safe', labelId: 'Jadikan 1.2920 sebagai ALARM SAJA -> Hanya Buy jika M5 memantul & mematahkan Swing High terdekat', labelEn: 'Treat 1.2920 strictly as Alert awaiting bullish M5 MSS', isSafe: true, riskUsc: 0, rewardUsc: 15, consequenceId: 'Karena M5 terus jebol merah ke 1.2880, kamu selamat 100% tanpa tersentuh kerugian!', consequenceEn: 'Avoided catching a falling breakdown effortlessly!' },
        { id: 'risky', labelId: 'Pasang Buy Limit buta langsung di 1.2920 agar dapat pucuk tepat', labelEn: 'Set blind Limit Buy strictly on D coordinate', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Limit tersentuh lalu harga menembus lurus ke 1.2880 memicu Stop Loss instan.', consequenceEn: 'Blind limit became instant liquidity for breakdown flow.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Objektivitas Mengalahkan Bias Pola',
      outcomeTitleEn: 'Hindsight Bias Neutralized',
      outcomeBodyId: 'Rasio geometris hanya berfungsi sebagai zona peringatan dini; bukti konfirmasi M5 tetap wajib.',
      outcomeBodyEn: 'Always confirm location alerts with live structural breaks.',
      jessyLineId: 'Tepat! Jangan pernah tangkap pisau jatuh cuma gara-gara rasio cantik!',
      jessyLineEn: 'No catching falling knives solely for pretty geometry!',
    },
  },

  // SEM 10
  'auction-market-theory-fair-value': {
    titleId: 'Mendeteksi Rezim Balance (Datar) vs Imbalance (Tren) Sebelum Pilih Strategi',
    titleEn: 'Auction Market Theory Lab: Balance vs Imbalance Regime Switch',
    briefingId: 'Selama 6 jam sesi Asia-Pra London, Gold berputar rapat bolak-balik di antara 3978 - 3983 (Value Area). Apakah saatnya menembak breakout di tengah kotak 3980.5?',
    briefingEn: 'Diagnose Balance Value Area rotation vs true directional Imbalance discovery.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Distribusi Waktu Pasar Global Berdasarkan Auction Market Theory',
      captionEn: 'Market Time Distribution: Balanced Rotation vs Directional Trends',
      bars: [
        { label: 'Fase Balance (Datar/Lelang Adil)', value: 70, unit: '% waktu', tone: 'blue' },
        { label: 'Fase Imbalance (Tren Kuat)', value: 30, unit: '% waktu', tone: 'green' },
        { label: 'Kesalahan Ritel (Kejar Tengah)', value: 80, unit: '% loss', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa membuka posisi Breakout di tengah kotak Value Area (3980.5) selama fase Balance sangat merugikan?',
      questionEn: 'Why do breakout bets inside balanced mid-range fair value routinely fail?',
      options: [
        { labelId: 'Karena di fase Balance pembeli & penjual sudah sepakat harga 3980 wajar sehingga harga terus memantul ke tengah', labelEn: 'Balanced buyers/sellers rotate prices continually back toward Value mean', feedbackId: 'Benar! Belilah hanya di pinggir bawah (VAL) / atas (VAH), atau tunggu batas Value benar-benar tembus!', feedbackEn: 'Spot on Auction Market Theory!' },
        { labelId: 'Karena likuiditas tidak terbatas', labelEn: 'Infinite volume freezes price', feedbackId: 'Pasar hanya sedang seimbang kesepakatan.', feedbackEn: 'Price rests at perceived fair value.' },
        { labelId: 'Karena jam bursa libur', labelEn: 'Markets are closed', feedbackId: 'Bursa aktif, hanya sedang konsolidasi adil.', feedbackEn: 'Active balanced auction discovery.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Di antara pilihan ini, mana cara paling cerdas menunggangi Auction Market Theory?',
      promptEn: 'Choose optimal AMT decision inside Value Balance:',
      choices: [
        { id: 'safe', labelId: 'Tunggu harga menembus VAH 3983 disertai volume kuat (Imbalance) ATAU sapuan VAL 3978 kembali masuk', labelEn: 'Await clean Imbalance exit past 3983 or VAL sweep reclaim', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Menghindari jebakan chop di tengah 3980 dan menangkap dorongan Imbalance +25 USC!', consequenceEn: 'Dodged mid-range chop cleanly and caught Imbalance run.' },
        { id: 'risky', labelId: 'Masuk Buy/Sell bolak-balik di harga tengah 3980.5 berharap langsung tren 100 pips', labelEn: 'Force trend breakouts right at mid-range 3980.5', isSafe: false, riskUsc: 20, rewardUsc: 0, consequenceId: 'Terkoyak maju-mundur dua kali berturut-turut di tengah rentang!', consequenceEn: 'Chopped twice inside tight Value equilibrium.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Diagnosis Rezim Lelang Tepat',
      outcomeTitleEn: 'Auction Regime Classification Cleared',
      outcomeBodyId: 'Memahami Balance vs Imbalance menghindarkan akun kecil dari kematian seribu sayatan di pasar datar.',
      outcomeBodyEn: 'Clean separation between range mean-reversion and breakout Imbalance.',
      jessyLineId: 'Jenius! Jangan pakai palu tren saat pasar lagi rapat di kotak seimbang!',
      jessyLineEn: 'Respect Value equilibrium!',
    },
  },
  'volume-profile-poc-vah-val': {
    titleId: 'Peta Magnet POC vs Low Volume Node (LVN): Menaruh TP di Tempat Realistis',
    titleEn: 'Volume Profile Navigation: Targeting Across LVNs Toward POC Hubs',
    briefingId: 'Harga baru saja keluar dari VAL 3972 menembus ruang kosong LVN (3974-3980), dengan bukit POC kemarin menunggu kuat di 3983.50. Di mana sebaiknya pasang TP1?',
    briefingEn: 'Use Volume Profile POC friction and LVN acceleration gaps to place clean Take Profits.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Distribusi Volume Horizontal (Profil Pasar Kemarin)',
      captionEn: 'Horizontal Volume-at-Price Distribution Profile',
      bars: [
        { label: 'POC (Bukit Transaksi 3983.5)', value: 94, unit: 'Vol', tone: 'gold' },
        { label: 'VAH (Batas Atas 3987)', value: 48, unit: 'Vol', tone: 'blue' },
        { label: 'LVN Celah Kosong (3976)', value: 14, unit: 'Vol (Cepat)', tone: 'green' },
      ],
    },
    step1: {
      questionId: 'Mengapa harga sering melesat super cepat melewati rentang LVN (3974-3980) lalu mendadak berhenti atau berputar di POC (3983.5)?',
      questionEn: 'Why do candles fly across Low Volume Nodes yet decelerate cleanly right at POC hubs?',
      options: [
        { labelId: 'LVN punya sedikit sekali order penghadang, sedangkan POC menyimpan magnet transaksi terbanyak kemarin', labelEn: 'LVNs hold minimal resting limit friction while high-volume POCs attract heavy rebalancing', feedbackId: 'Tepat sekali! Pasang TP1 tepat sebelum bukit POC mengamankan profit sebelum macet.', feedbackEn: 'Exact market-profile delivery!' },
        { labelId: 'Karena indikator volume salah posisi', labelEn: 'Histogram flipped sideways accidentally', feedbackId: 'Bukan error, Volume Profile sengaja memetakan volume berdasarkan harga.', feedbackEn: 'Intentional price-binned liquidity mapping.' },
        { labelId: 'Karena POC adalah batas haram', labelEn: 'Hard regulatory limit', feedbackId: 'Bukan aturan resmi, murni keseimbangan minat transaksi.', feedbackEn: 'Purely market consensus.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Setelah entry Buy bersih di 3974 melewati ruang LVN, di mana lokasi TP1 yang logis?',
      promptEn: 'Select realistic TP1 relative to POC 3983.50:',
      choices: [
        { id: 'safe', labelId: 'Taruh TP1 tepat di bawah magnet POC (3983.00 = +90 pips) & geser SL ke BEP bila tembus', labelEn: 'Anchor TP1 right ahead of POC 3983.00 (+90 pips)', isSafe: true, riskUsc: 8, rewardUsc: 24, consequenceId: 'TP1 aman terkunci tepat sebelum harga memantul di dinding POC!', consequenceEn: 'Banked +24 USC neatly right before POC resistance!' },
        { id: 'risky', labelId: 'Pasang target serakah TP tunggal di 3995 menembus semua dinding POC tanpa mengamankan sebagian', labelEn: 'Demand 3995 full TP ignoring POC barrier', isSafe: false, riskUsc: 8, rewardUsc: 0, consequenceId: 'Harga berputar balik tepat di POC 3983.50 membawa trade yang tadinya +24 USC kembali ke 0!', consequenceEn: 'Gains evaporated right off the high-volume POC shelf.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Navigasi Volume Profile Tepat',
      outcomeTitleEn: 'POC & LVN Execution Verified',
      outcomeBodyId: 'Kamu mengerti jalur cepat (LVN) dan titik macet (POC) untuk penempatan TP realistis.',
      outcomeBodyEn: 'Positioned TP cleanly ahead of volume friction hubs.',
      jessyLineId: 'Mantap! Jangan tunggu harga nabrak bukit transaksi baru sadar!',
      jessyLineEn: 'Banking ahead of POC saves countless unrealized gains!',
    },
  },
  'order-flow-dom-footprint-iceberg': {
    titleId: 'Mendeteksi Iceberg Absorption di Order Flow DOM / Footprint',
    titleEn: 'Order Flow Footprint Lab: Spotting Passive Iceberg Absorption',
    briefingId: 'Ribuam order Market Sell merah terus menghantam level harga 3975.00 pada Footprint Delta (-4.200 kontrak), tetapi harga 3975.00 sama sekali tidak tembus ke bawah.',
    briefingEn: 'Decode massive aggressive Market Sell delta failing to push bid quotes lower.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Rekaman Order Flow Footprint di Level Support 3975.00',
      captionEn: 'Live Footprint Delta Inspection at 3975.00',
      specHeaders: ['Harga', 'Agresif Market Sell', 'Perilaku Buku Order'],
      specRows: [
        ['3975.50', '-1.400 Kontrak', 'Masuk cepat'],
        ['3975.00', '-4.200 Kontrak (Ekstrem!)', 'TERTAHAN ICEBERG LIMIT BUY!'],
        ['3976.20', '+2.100 Market Buy Balik', 'Penjual Terjebak Cut Loss Naik!'],
      ],
    },
    step1: {
      questionId: 'Mengapa -4.200 kontrak Market Sell di 3975.00 tetap gagal menurunkan harga ke 3974?',
      questionEn: 'How can -4,200 aggressive Market Sell contracts fail to push price beneath 3975.00?',
      options: [
        { labelId: 'Algoritma Iceberg Limit Buy institusi terus mengisi ulang antrean di 3975 tanpa henti menyerap seluruh jual', labelEn: 'Institutional Iceberg Limit Bids continuously reload at 3975 absorbing all panic supply', feedbackId: 'Tepat! Begitu penjual lelah, harga berbalik meledak karena penjual terpaksa tutup rugi.', feedbackEn: 'Exact DOM iceberg absorption reading!' },
        { labelId: 'Karena 4.200 itu angka positif', labelEn: 'Misread sell sign', feedbackId: 'Delta negatif menandakan penjual pasar agresif yang menabrak dinding limit beli.', feedbackEn: 'Negative delta confirms trapped aggressive sellers.' },
        { labelId: 'Karena koneksi DOM terputus', labelEn: 'Feed disconnection', feedbackId: 'Penyerapan nyata sering terjadi di akhir gelombang panik.', feedbackEn: 'Authentic liquidity absorption event.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Saat melihat penjual agresif terjebak (Trapped Sellers) di 3975 diikuti candle hijau balik di 3976.20:',
      promptEn: 'Act on confirmed trapped-seller reversal:',
      choices: [
        { id: 'safe', labelId: 'Buy konfirmasi di 3976.20 (SL di bawah dinding Iceberg 3973.80)', labelEn: 'Enter Long 3976.20 with SL safely under Iceberg at 3973.80', isSafe: true, riskUsc: 7.2, rewardUsc: 24, consequenceId: 'Short squeeze penjual terjebak mendorong harga naik mulus (+24 USC)!', consequenceEn: 'Short-covering surge delivered crisp +24 USC profit.' },
        { id: 'risky', labelId: 'Ikut menekan Market Sell karena melihat batang merah volume jual terlihat raksasa', labelEn: 'Sell blindly alongside trapped red delta bars', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Kamu menjadi penumpang terakhir di sisi jual tepat sebelum dinding Iceberg membalik arah!', consequenceEn: 'Caught right inside the trapped seller squeeze.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Jejak Iceberg Order Flow Terbaca',
      outcomeTitleEn: 'Iceberg Absorption Trigger Verified',
      outcomeBodyId: 'Kamu melihat perbedaan antara tekanan agresor yang terjebak melawan dinding limit pasif bank.',
      outcomeBodyEn: 'Distinguished aggressive exhaustion from passive institutional defense.',
      jessyLineId: 'Kelas atas! Ini dia rahasia di balik kenapa Order Block bisa memantul tajam!',
      jessyLineEn: 'Pure institutional microstructure insight!',
    },
  },
};
