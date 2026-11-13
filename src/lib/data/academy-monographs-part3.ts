import type { ModuleDeepMonograph } from './academy-monographs-part1';

const PHOTOS = {
  GOLD_VAULT: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80',
  TICKER_TERMINAL: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
  DEALING_DESK: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
  MACRO_ANALYTICS: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  CANDLE_SCREEN: 'https://images.unsplash.com/photo-1642543348745-03b1219733d9?auto=format&fit=crop&w=1200&q=80',
  EXCHANGE_FLOOR: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80',
  MARKET_CLOCK: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
  AUDIT_WORKSPACE: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
};

function makePins(
  labels: [string, string, string, string],
  inst: [string, string, string, string],
  trap: [string, string, string, string],
  act: [string, string, string, string]
): ModuleDeepMonograph['hotspots'] {
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
    labelId: labels[i],
    labelEn: labels[i],
    institutionalId: inst[i],
    institutionalEn: inst[i],
    retailTrapId: trap[i],
    retailTrapEn: trap[i],
    jgsActionId: act[i],
    jgsActionEn: act[i],
  })) as ModuleDeepMonograph['hotspots'];
}

export const MONOGRAPHS_PART_3: Record<string, ModuleDeepMonograph> = {
  'wick-sweep-vs-displacement-close': {
    slug: 'wick-sweep-vs-displacement-close',
    photoUrl: PHOTOS.CANDLE_SCREEN,
    photoCaptionId: 'Perbandingan visual sumbu penolakan likuiditas versus penutupan badan penuh candle M5/M15.',
    photoCaptionEn: 'Institutional rejection wicks versus clean displacement candle body closes on M5/M15.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Di meja transaksi antarbank, lonjakan cepat melewati garis tinggi atau rendah yang kasat mata sering dirancang untuk memicu kumpulan Stop Loss ritel (Buy Stops dan Sell Stops) menjadi suplai likuiditas bagi pesanan Limit besar milik institusi. Proses penyerapan itu terlihat secara langsung di grafik sebagai ekor sumbu panjang (*Wick Sweep*) ketika penawaran berlawanan segera menarik harga kembali masuk ke rentang asal sebelum waktu penutupan candle berakhir.',
      'Sebaliknya, ketika institusi benar-benar membalik atau mendorong tren harga ke tingkat keseimbangan baru, pesanan agresif mengosongkan kedalaman buku order bertingkat sehingga candle M5 atau M15 selesai menutup **badan penuhnya (Body Close)** di seberang level kunci. Penutupan badan utuh inilah yang dibaca secara kuantitatif oleh Larry Harris (2003) sebagai perubahan nyata arus bersih penawaran dan permintaan.',
      'Bagi akun mikro 1.000 USC, membedakan tusukan ekor sementara dari penutupan badan candle langsung memangkas kekalahan akibat *false breakout*. Menunggu hitungan detik penutupan bar M5 sebelum menekan tombol adalah bentuk proteksi termurah namun paling berdampak dalam eksekusi harian.',
    ],
    sec2InstitutionalEn: [
      'Microstructure liquidity providers frequently absorb forced breakout and stop-loss orders resting just beyond obvious highs/lows, leaving extended rejection wicks inside unfinished candles.',
      'Genuine institutional displacement clears resting order depth decisively so M5/M15 candle bodies lock cleanly past key swing boundaries at bar close.',
    ],
    anatomyRowsId: [
      ['Klik Buy detik kedua candle menembus Resistance sebelum candle tutup.', 'Menunggu penutupan badan penuh minimal M5 dan memeriksa struktur penolakan.', 'Aktifkan timer hitung mundur candle di MT5 dan larang klik di tengah bar.'],
      ['Menganggap semua jarum panjang berarti sinyal berbalik tanpa melihat konteks.', 'Membedakan jarum di area ramai Stop Pool (PDH/Asian High) vs di tengah noise.', 'Validasi ekor panjang HANYA ketika menyentuh level kolam likuiditas penting.'],
      ['Masuk tanpa melihat jarak rasio badan terhadap keseluruhan tinggi candle.', 'Mengukur proporsi badan (Body >= 55%) dan ada tidaknya Fair Value Gap.', 'Wajibkan minimal satu candle Displacement berbadan padat sebelum mencari retest.'],
    ],
    anatomyRowsEn: [
      ['Clicking mid-candle breakout impulses.', 'Waiting strictly for clean M5/M15 closes.', 'Watch candle countdowns and lock clicks until zero.'],
      ['Trading random middle-range wicks.', 'Anchoring wick scans cleanly to major stop boundaries.', 'Verify wicks pierced PDH/PDL or Asian poles first.'],
      ['Accepting sluggish doji closes as displacement.', 'Demanding energetic >= 55% body expansion.', 'Confirm fresh imbalance gap creation post-close.'],
    ],
    sec4QuantId: [
      'Mari menguji dampak matematis kesabaran menunggu *Body Close* selama 20 hari kerja bursa. Misalkan seorang pemula mengeksekusi rata-rata 4 fakeout ekor per minggu masing-masing berujung -10 USC (-40 USC/minggu). Dalam satu bulan (4 minggu), kebocoran akibat tidak sabar memakan -160 USC atau -16% ekuitas awal tanpa kontribusi keuntungan apa pun.',
      'Dengan memberlakukan aturan biner *Candle Close Confirmation*, 75% sinyal palsu otomatis tereliminasi sebelum order dikirim. Menghemat 12 kekalahan x 10 USC menyelamatkan +120 USC modal kerja dan menjaga rasio ketahanan mental di bawah Daily Circuit Breaker 3%.',
      'Ketahanan jangka panjang di akun $10 (1.000 USC) dibangun bukan dari kecepatan klik jari, melainkan kejelian menyaring data candle yang benar-benar telah selesai dikonfirmasi waktu.',
    ],
    sec4QuantEn: [
      'Eliminating three premature fakeout clicks per week saves 120 USC monthly on a 1,000 USC account, protecting equity well inside Daily Circuit Breaker thresholds.',
      'Bar-close discipline turns chaotic intraday whipsaw losses into preserved buying power for verified setups.',
    ],
    sec4FormulaId: 'Syarat_Valid_Breakout = Close_Body_Luar_Level  DAN  Rasio_Body_Candle >= 55%',
    sec4FormulaEn: 'Valid_Breakout = Body_Closed_Beyond_Level  AND  Candle_Body_Pct >= 55%',
    hotspots: makePins(
      ['Kolam Stop Loss (PDH / Asian High)', 'Wick Sweep Pemburu Ritel', 'Displacement Body Close M5', 'Entry Zona FVG Pasca Close'],
      ['Konsentrasi antrean Stop Buy atau Breakouts menumpuk persis di garis jelas.', 'Pesanan limit institusional menyerap lonjakan sehingga menyisakan sumbu panjang.', 'Dorongan berbadan penuh menutup tegas mematahkan swing lawan.', 'Masuk aman saat harga kembali menguji celah nilai wajar sesudah konfirmasi.'],
      ['Memasang Buy Stop pas di garis jelas atau klik tengah bar hijau.', 'Langsung Buy saat harga menusuk puncak tipis tanpa melihat penolakan.', 'Mengejar entry terlambat saat harga sudah lari 80 poin tanpa koreksi.', 'Menaruh SL terlalu dekat dengan badan candle bukan di luar ujung sweep.'],
      ['Tandai level jelas sebagai sasaran Sweep, bukan pemicu entry langsung.', 'Tunggu penutupan M5; jika hanya ekor panjang, bersiap cari pembalikan arah.', 'Konfirmasi badan penuh mematahkan struktur sebelum menarik rencana FVG.', 'Atur lot 0.02 Cent sehingga SL di belakang sweep tetap 10 USC.']
    ),
    detective: {
      scenarioId: 'XAUUSD menyentuh tipis puncak Asia 14:15 WIB sebesar +4 poin lalu 2 menit tersisa sebelum bar M5 tutup harga melorot menutup badan merah di bawah puncak Asia. Apa status pergerakan ini?',
      scenarioEn: 'XAUUSD pierces Asian High +4 pips intra-bar before M5 closes bearish cleanly beneath the level. Classify this event:',
      optionsId: ['Wick Liquidity Sweep (Sapuan Sumbu Pemburu Stop Loss)', 'Displacement Bullish Breakout Valid', 'Rollover Spread Glitch'],
      optionsEn: ['Valid Wick Liquidity Sweep (Stop Hunt)', 'Confirmed Bullish Displacement Breakout', 'Rollover Quote Glitch'],
      correctIndex: 0,
      explanationId: 'Karena badan candle gagal menutup di atas level struktur dan meninggalkan sumbu atas, kejadian tersebut sah diklasifikasikan sebagai Liquidity Sweep.',
      explanationEn: 'Failure to close candle bodies above resistance leaves a classic stop-hunt wick sweep.',
    },
    essayGuidanceHintsId: [
      'Bedakan proses penjemputan likuiditas (ekor tanpa body close) melawan perpindahan keseimbangan asli (Displacement Body Close).',
      'Sebutkan konsekuensi matematis bila masuk terburu-buru di tengah candle pada akun 1.000 USC.',
      'Tutup dengan aturan praktis menunggu hitung mundur penutupan candle M5/M15.',
    ],
    essayGuidanceHintsEn: [
      'Contrast intra-bar wick rejections cleanly against completed M5/M15 candle body closes.',
      'Quantify drawdown leakage from mid-bar fakeouts on a 1,000 USC balance.',
      'End with a clear bar-close execution rule.',
    ],
  },
  'three-step-confirmation-formula': {
    slug: 'three-step-confirmation-formula',
    photoUrl: PHOTOS.DEALING_DESK,
    photoCaptionId: 'Kerangka tiga gerbang konfirmasi berurutan sebelum menempatkan posisi limit di pasar berjangka dan spot.',
    photoCaptionEn: 'Sequential three-gate institutional verification workflow preceding Limit execution.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Di tingkat analisis arus pesanan (Albert Kyle, 1985), pelaku besar bervolume raksasa menghadapi masalah klasik biaya dampak (*Market Impact Cost*): mereka tidak bisa langsung membeli puluhan ribu lot sekaligus di tengah pasar tipis tanpa mendorong harga melompat melawan diri sendiri.',
      'Karena itu, pergerakan institusional hampir selalu terurai ke dalam tiga fase bertahap: Fase 1 (*Liquidity Sweep*) menjaring kumpulan order berlawanan dari Stop Loss ritel; Fase 2 (*Displacement MSS*) memicu pergeseran struktur secara impulsif; Fase 3 (*Fair Value Gap Retest*) mengembalikan harga ke diskon untuk mengisi sisa pesanan secara senyap.',
      'Mengubah alur logika institusi ini menjadi daftar periksa 3 langkah berurutan melindungi mahasiswa dan praktisi ritel agar tidak pernah mengklik "hanya karena bentuk FVG-nya bagus" di area tak bernyawa.',
    ],
    sec2InstitutionalEn: [
      'Large execution engines manage market impact sequentially: harvesting clustered opposite stops first, shifting structure decisively, then filling remaining tranches across Fair Value retracements.',
      'Requiring all three gates sequentially prevents beginners from clicking isolated noise patterns outside real liquidity pools.',
    ],
    anatomyRowsId: [
      ['Membeli FVG acak di tengah sesi datar tanpa ada kolam tersapu.', 'Hanya memvalidasi FVG yang lahir langsung sesudah Sweep likuiditas.', 'Coret FVG mana pun yang tidak didahului sapuan batas High/Low sebelumnya.'],
      ['Masuk lawan arah tepat sesudah Sweep sebelum swing terdekat patah (no MSS).', 'Menuntut Displacement Close melampaui swing terakhir sebagai bukti pengalihan.', 'Tahan klik sampai MSS resmi tercetak menutup di chart M5/M15.'],
      ['Mengejar harga dengan Market Execution jauh di atas FVG.', 'Mengembalikan kesabaran memakai Limit Order di batas 50% FVG untuk SL tipis.', 'Jika harga terlanjur pergi jauh meninggalkan FVG, relakan dan tunggu peluang baru.'],
    ],
    anatomyRowsEn: [
      ['Trading unanchored FVG noise inside choppy midday ranges.', 'Requiring prior obvious Liquidity Sweep ignition.', 'Discard standalone FVGs lacking swept stop pools.'],
      ['Front-running reversals before MSS breaks.', 'Demanding full Displacement MSS confirmation first.', 'Stay patient until clean M5/M15 structure breaks.'],
      ['Market-chasing far outside FVG boundaries.', 'Queuing Limit fills calmly back inside FVG equilibrium.', 'Cancel missed setups rather than paying stretched stops.'],
    ],
    sec4QuantId: [
      'Mari kita buktikan keunggulan rasio R:R dari Gerbang ke-3 (Retest FVG). Jika harga baru saja berbalik arah menempuh 60 pips saat MSS tertutup, trader FOMO yang langsung menekan Market Buy di pucuk harus menaruh SL 65 pips dengan sisa target ke resistance berikutnya cuma 55 pips (R:R 0,85x, tidak layak!).',
      'Sebaliknya, trader JGS yang sabar memasang Buy Limit mundur 30 pips ke area FVG memangkas jarak Stop Loss menjadi 35 pips sembari memperlebar jarak Take Profit menjadi 85 pips (+2,4R). Dengan ukuran 10 USC (1%) tetap di akun 1.000 USC, kemenangan satu setup 3-Gerbang menyetor +24 USC bersih.',
      'Kesempurnaan urutan Sweep -> MSS -> FVG menyatukan akurasi psikologis sekaligus keunggulan matematika dalam satu garis order.',
    ],
    sec4QuantEn: [
      'Waiting for FVG retracements halves structural Stop distances (from ~65 pips down to ~35 pips) while lifting achievable targets above +2.4R for crisp asymmetric returns on 10 USC risk.',
      'Clean three-gate execution enforces mathematical R:R discipline effortlessly.',
    ],
    sec4FormulaId: 'Eksekusi_Sah = Sweep_Likuiditas  &&  Displacement_MSS  &&  Retest_FVG_Diskon (Min 1:2,5 R:R)',
    sec4FormulaEn: 'Execute_Valid = Liquidity_Sweep  &&  Displacement_MSS  &&  Discount_FVG_Fill (Min 1:2.5 R:R)',
    hotspots: makePins(
      ['1. Sapuan Kolam SSL/BSL', '2. Displacement Mematahkan MSS', '3. Zona Limit Fair Value Gap', '4. Target Likuiditas Lawan >= 1:2.5'],
      ['Menguras likuiditas Stop Loss ritel sebelum mesin arah bergerak.', 'Badan candle penuh merobohkan struktur lama meninggalkan jejak ketidakseimbangan.', 'Area optimal masuk saat harga kembali mengambil order yang tertinggal.', 'Realisasi keuntungan penuh di puncak/lembah likuiditas berlawanan.'],
      ['Masuk sebelum kolam tersapu saat ritel masih ramai menebak.', 'Menahan posisi rugi berlawanan sesudah MSS tercipta tegas.', 'Tidak sabar menunggu retest lalu mengejar harga di ujung ekstrem.', 'Menutup profit terlalu dini di +0.5R karena takut rugi.'],
      ['Tunggu sapuan melampaui Asian Low/High atau swing signifikan.', 'Tandai swing penghubung terakhir dan pastikan tertutup melewati badan.', 'Letakkan Buy/Sell Limit tepat di mulut FVG dengan SL di belakang sweep.', 'Targetkan kolam berlawanan minimal 2.5x jarak risiko 10 USC.']
    ),
    detective: {
      scenarioId: 'XAUUSD baru saja menyapu Asian High jam 14:20 WIB dan turun cepat meninggalkan FVG bearish sambil mematahkan swing low M5 dengan badan penuh. Harga sekarang naik perlahan menyentuh FVG tersebut. Langkahmu?',
      scenarioEn: 'At 14:20 WIB Gold sweeps Asian High, displaces cleanly breaking M5 swing low with bearish FVG, and now pulls up into the FVG. Your move?',
      optionsId: ['Aktifkan Sell Limit di area FVG dengan SL di belakang ujung sweep atas (10 USC max risk)', 'Langsung Buy mengejar pantulan kenaikan', 'Menunggu hingga besok tanpa sebab'],
      optionsEn: ['Deploy FVG Sell entry with 10 USC structural SL beyond the sweep tail', 'Market Buy expecting instant upward breakout', 'Ignore completed 3-Gate confirmation'],
      correctIndex: 0,
      explanationId: 'Ketiga syarat (Sweep Asian High -> Displacement Bearish MSS -> Retest FVG) lengkap terpenuhi di jendela Killzone London.',
      explanationEn: 'All three confirmation gates clicked neatly inside active London liquidity.',
    },
    essayGuidanceHintsId: [
      'Uraikan urutan kronologis 3 gerbang konfirmasi (Sweep, MSS, FVG) dan fungsi masing-masing.',
      'Jelaskan alasan matematis menunggu Retest FVG memperbaiki rasio risiko 10 USC.',
      'Berikan contoh keputusan penolakan apabila salah satu dari tiga syarat tidak muncul.',
    ],
    essayGuidanceHintsEn: [
      'Detail chronological roles across Gate 1 Sweep, Gate 2 Displacement MSS, and Gate 3 FVG fill.',
      'Explain why FVG pullbacks compress stops and expand R:R ratios.',
      'State clearly when to reject incomplete triggers.',
    ],
  },
  'multi-timeframe-alignment-entry': {
    slug: 'multi-timeframe-alignment-entry',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Sinkronisasi layar peta H1/M15 bersama jendela pelatuk mikro M5 untuk menjaga keselarasan arus likuiditas.',
    photoCaptionEn: 'Multi-timeframe workspace aligning HTF H1/M15 maps cleanly with LTF M5 confirmation triggers.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Dalam kajian multifraktal time-series keuangan (Lo, Mamaysky & Wang, 2000), deret harga pada skala menit merupakan getaran internal yang menumpang di atas siklus gelombang tren skala jam dan harian. Kesalahan paling umum pemula ialah membuka grafik 1-menit tanpa konteks sehingga menganggap koreksi kecil sebagai pembalikan arah global.',
      'Meja eksekusi sistematis menetapkan tugas eksklusif tiap jendela waktu: **H1** membaca struktur tren harian dan magnet likuiditas utama (*HTF Bias*); **M15** menandai zona ketertarikan sesi (*POI / FVG / OB*); sedangkan **M5** dipakai khusus mencari konfirmasi 3-Gerbang hanya sesudah harga mampir ke zona M15.',
      'Pembagian tugas ketat ini menghemat 80% energi mental dan mencegah kebiasaan melompat-lompat timeframe secara panik ketika trade sedang berjalan.',
    ],
    sec2InstitutionalEn: [
      'Financial time series operate fractally: micro bar fluctuations orbit broader hourly liquidity flows.',
      'Assigning distinct duties to H1 (Bias), M15 (Session POI), and M5 (Confirmation Trigger) removes contradictory signals cleanly.',
    ],
    anatomyRowsId: [
      ['Menganalisis tren langsung dari grafik M1 lalu bingung arah tiap 10 menit.', 'Membuka H1 lebih dulu menetapkan arah harian, baru M15 menandai kotak tunggu.', 'Lakukan pemetaan atas-ke-bawah (Top-Down) H1 -> M15 -> M5 setiap hari.'],
      ['Mengambil setup counter-trend di M5 meski H1 sedang kuat naik menanjak.', 'Menahan entry M5 searah arus utama H1 begitu harga menyentuh zona diskon.', 'Prioritaskan transaksi searah tren H1 dan abaikan perlawanan kecil.'],
      ['Memakai SL lebar H1 sehingga 0.01 lot pun hampir menembus 20 USC.', 'Menunggu konfirmasi MSS M5 di dalam POI H1 guna menyempitkan SL.', 'Kecilkan SL secara struktural lewat presisi LTF dengan tetap menjaga 10 USC.'],
    ],
    anatomyRowsEn: [
      ['Diagnosing trend straight off chaotic M1 screens.', 'Start calmly on H1 bias -> M15 zones -> M5 entries.', 'Maintain strict strict Top-Down workflow order.'],
      ['Counter-trading dominant H1 rallies for tiny M5 scalps.', 'Aligning M5 displacement exclusively with H1 bias.', 'Reject counter-HTF noise setups immediately.'],
      ['Holding bloated 120-pip H1 stops on 1,000 USC equity.', 'Refining structural entries inside M5 confirmations.', 'Refine SL distance without changing 10 USC risk caps.'],
    ],
    sec4QuantId: [
      'Perhatikan efisiensi modal pada akun 1.000 USC lewat penyelarasan MTF: sebuah zona Demand H1 memiliki lebar 100 pips. Jika langsung Buy di batas atas H1, risiko maksimal 10 USC hanya mengizinkan ukuran sangat kaku atau memaksa melanggar batas 1%.',
      'Namun saat menunggu harga menyentuh kotak H1 lalu turun ke M5 menemukan Sweep + MSS dengan lebar SL cuma 33 pips, kamu bisa memasang **0.03 Cent Lot** ($0.03/pip) tepat berisiko 9,9 USC! Jika target kembali ke puncak H1 sejauh 115 pips tercapai, imbal hasil melonjak menjadi **+34,5 USC (+3,45R)** hanya dari perbaikan keselarasan timeframe.',
      'Multi-Timeframe bukanlah teknik memprediksi masa depan, melainkan seni membeli tiket asuransi lebih murah ke arah kereta utama yang sama.',
    ],
    sec4QuantEn: [
      'Refining a 100-pip H1 demand area into a clean 33-pip M5 confirmation cuts SL distance by 67% while keeping risk fixed at ~10 USC, boosting reward potential past +3.4R cleanly.',
      'MTF precision acts like discounted entry insurance along the dominant HTF directional path.',
    ],
    sec4FormulaId: 'Rasio_Profit_M5 = Target_H1_Likuiditas / Jarak_SL_M5_Terkalibrasi (>= 3,0x)',
    sec4FormulaEn: 'MTF_Asymmetry = HTF_Liquidity_Target / Refined_LTF_Stop (>= 3.0R)',
    hotspots: makePins(
      ['Kompas Tren Utama H1', 'Kotak POI Sesi M15', 'Pemicu M5 Sweep + MSS', 'Target Puncak Likuiditas H1'],
      ['Menentukan bias utama harian apakah fokus Buy di diskon atau Sell di premium.', 'Zona penentu di mana kita menyalakan alarm menunggu harga tiba.', 'Pelatuk mikro ber-SL tipis yang baru dicari setelah harga masuk POI M15.', 'Tujuan akhir pencairan keuntungan di area High/Low signifikan H1.'],
      ['Membalik bias hanya karena dua lilin merah kecil di M1.', 'Memasang order di tengah ruang kosong jauh dari kotak POI M15.', 'Melihat M5 sepanjang hari meski harga masih sangat jauh dari zona.', 'Menutup profit terlalu cepat sebelum mencapai sasaran H1.'],
      ['Tentukan bias H1 di awal hari dan jangan ganti sampai struktur H1 patah.', 'Pasang price alert TradingView tepat di bibir kotak M15.', 'Buka M5 hanya ketika alert berbunyi mencari Sweep + MSS searah.', 'Kelola posisi santai menuju puncak/lembah H1 dengan risiko tetap 1%.']
    ),
    detective: {
      scenarioId: 'Struktur H1 XAUUSD membentuk Higher High stabil naik ke atas. Harga sekarang turun masuk ke dalam FVG Discount M15. Di M5 muncul sapuan ekor bawah tipis lalu candle M5 berikutnya menutup kuat naik menembus high lokal. Keputusanmu?',
      scenarioEn: 'H1 XAUUSD prints clean bullish Higher Highs. Price drops into an M15 Discount FVG, where M5 sweeps a micro low and closes strongly bullish breaking local swing. Your decision?',
      optionsId: ['Valid Confluence MTF! Pasang rencana Buy searah H1 dengan SL di luar sweep M5 (1% risk)', 'Langsung Sell karena melihat penurunan turun ke M15', 'Menghapus grafik H1 selamanya'],
      optionsEn: ['High-conviction MTF Confluence! Prepare 1% risk Bullish FVG entry targeting H1 Highs', 'Sell aggressively reacting to the pullback', 'Delete H1 timeframes'],
      correctIndex: 0,
      explanationId: 'Bias H1, zona M15, dan konfirmasi pemicu M5 seluruhnya selaras searah arus naik dengan SL tipis terukur.',
      explanationEn: 'All three timeframe horizons align harmoniously supporting crisp asymmetric long risk.',
    },
    essayGuidanceHintsId: [
      'Jelaskan pembagian peran terpisah antara H1 (Kompas), M15 (Zona Tunggu), dan M5 (Pelatuk).',
      'Terangkan dampak positif penyempitan jarak SL terhadap perolehan Cent Lot dan R:R pada akun 1.000 USC.',
      'Tegaskan aturan larangan masuk M5 bila berlawanan dengan bias utama H1.',
    ],
    essayGuidanceHintsEn: [
      'Outline distinct analytical roles assigned cleanly across H1, M15, and M5.',
      'Quantify how refined M5 stops expand R:R on micro 1,000 USC sizing.',
      'Reaffirm strict prohibition on counter-HTF M5 triggers.',
    ],
  },
  'empty-chart-session-mapping-sop': {
    slug: 'empty-chart-session-mapping-sop',
    photoUrl: PHOTOS.MARKET_CLOCK,
    photoCaptionId: 'Daftar periksa pra-sesi terstruktur 10 menit sebelum bel sesi London Open berbunyi di WIB.',
    photoCaptionEn: 'Structured 10-minute blank-chart mapping routine conducted calmly ahead of London Open WIB.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Dalam lingkungan trading profesional, keputusan yang dilakukan secara reaktif saat grafik bergerak liar memiliki tingkat kesalahan kognitif tertinggi. Penelitian likuiditas intraday (Chordia, Roll & Subrahmanyam, 2001) menegaskan bahwa arus transaksi harian paling konsisten beredar di sekitar batas harian sebelumnya dan pembukaan sesi utama.',
      'SOP Layar Kosong JGS membagi pekerjaan persiapan menjadi ritual standar 10 menit pukul **13:45 WIB**: pertama buka kalender ekonomi mengecek jadwal berita berdampak tinggi (CPI/NFP/FOMC) beserta zona Rollover; kedua beri garis **PDH & PDL** kemarin; ketiga kotak batas **Asian Range 07:00–13:00 WIB**; keempat tetapkan dua skenario *If-Then*.',
      'Hasilnya, begitu sesi London atau New York aktif, kamu tidak lagi bingung menebak garis mana yang penting, cukup duduk santai memantau apakah salah satu batas tersebut disapu.',
    ],
    sec2InstitutionalEn: [
      'Reactive mid-session charting invites cognitive overload; systematic pre-session mapping locks clean boundary anchors before peak liquidity arrives.',
      'Checking news clocks, PDH/PDL extremes, and 07-13 WIB Asian boxes standardizes daily readiness inside ten calm minutes.',
    ],
    anatomyRowsId: [
      ['Membuka MT5 lalu langsung pasang 12 garis fibo, RSI, dan trendline acak.', 'Hanya memplot 4 tingkat likuiditas kunci plus jam rilis berita.', 'Pertahankan layar bersih agar pola Sweep dan MSS terlihat jernih.'],
      ['Lupa mengecek kalender lalu terkena lonjakan spread berita CPI mendadak.', 'Mencatat blackout 15 menit sebelum-sesudah berita merah setiap siang.', 'Hentikan eksekusi baru di menit berita merah sampai spread normal kembali.'],
      ['Memasuki sesi tanpa skenario sehingga panik ikut-ikutan candle bergerak.', 'Menuliskan skenario A (jika sapu atas) dan B (jika sapu bawah).', 'Bertindak murni saat kondisi A atau B terjadi; tidak ada = tidak klik.'],
    ],
    anatomyRowsEn: [
      ['Cluttering blank screens with 12 overlapping oscillators.', 'Limiting plots to 4 liquidity boundaries plus news blackouts.', 'Maintain clean visual focus strictly around candles and pools.'],
      ['Ignoring CPI/FOMC event clocks before London Open.', 'Recording strict 15-minute macro event guardrails beforehand.', 'Hold clicks safely outside high-impact news release spikes.'],
      ['Reacting blindly to real-time candles without if-then plans.', 'Writing clear Scenario A & Scenario B triggers by 13:45 WIB.', 'Execute strictly when Scenario A or B materializes.'],
    ],
    sec4QuantId: [
      'Mari mengukur penghematan biaya gesekan (friction cost) lewat rutinitas 10 menit sebelum sesi. Seorang pemula tanpa SOP memencet 15 transaksi acak seminggu di luar Killzone dan di menit rilis berita. Jika selisih spread melebar rata-rata 2x lipat saat berita, biaya spread ekstra + SL terburu-buru menguras sekitar -65 USC per minggu.',
      'Memakai checklist pra-sesi menyaring frekuensi ke maksimal 3–5 setup sangat jernih per minggu dengan spread London/NY termurah. Akun Cent 1.000 USC langsung memperoleh efisiensi biaya eksekusi >60% dan stabilitas psikologis penuh.',
      'Disiplin bukan soal keberanian menahan rasa takut, melainkan kualitas persiapan sebelum pertandingan dimulai.',
    ],
    sec4QuantEn: [
      'Filtering out unscheduled off-hour noise and news spread spikes slashes weekly transaction friction by over 60% on a 1,000 USC account.',
      'Calm 10-minute morning planning transforms chaotic screen-watching into deterministic execution.',
    ],
    sec4FormulaId: 'SOP_PraSesi = [Kalender_Berita, Garis_PDH_PDL, Kotak_Asia_07_13, Batas_Max_30_USC]',
    sec4FormulaEn: 'PreFlight_SOP = [Red_News_Check, PDH_PDL_Levels, Asian_07_13_Box, Max_30_USC_Daily_Cap]',
    hotspots: makePins(
      ['1. Audit Kalender Makro Merah', '2. Garis Batas Kemarin (PDH/PDL)', '3. Kotak Asian Range (07–13 WIB)', '4. Rencana Skenario A & B'],
      ['Mengidentifikasi jendela berita berdampak tinggi agar tidak tergelincir spread.', 'Magnet likuiditas antarhari di mana ribuan SL menginap tertuju.', 'Batas akumulasi pagi Asia yang paling kerap disapu saat London open.', 'Rencana eksekusi biner sebelum satu candle sesi aktif bergerak.'],
      ['Membuka MT5 2 menit menjelang NFP tanpa sadar ada berita besar.', 'Memasang order di tengah kisaran kemarin jauh dari PDH maupun PDL.', 'Trading agresif bolak-balik di dalam kotak Asia jam 10 pagi yang sempit.', 'Mengubah arah opini tiap 10 menit karena tidak menulis rencana awal.'],
      ['Tulis jam blackout berita merah di catatan tempel sebelah laptop.', 'Tandai persis titik tertinggi & terendah kemarin di timeframe H1.', 'Tarik garis kotak 07:00 sampai 13:00 WIB dan tunggu satu ujung tersapu.', 'Eksekusi hanya apabila skenario tertulis terpenuhi lengkap di Killzone.']
    ),
    detective: {
      scenarioId: 'Kamu baru menyalakan laptop jam 13:50 WIB dan melihat di kalender ekonomi akan rilis CPI AS jam 19:30 WIB, serta Asian Low sangat dekat dengan PDL kemarin. Apa hal terpenting sebelum siap trading di sesi London?',
      scenarioEn: 'You open a fresh blank chart at 13:50 WIB noticing CPI macro news schedules at 19:30 WIB and Asian Low resting tightly beside Yesterday Low (PDL). Your pre-session step?',
      optionsId: ['Tandai berita merah 19:30 WIB, garisi area tumpukan Asian Low + PDL sebagai magnet sweep utama, dan siapkan rencana konfirmasi M5 di sesi London.', 'Langsung Buy sekarang di jam 13:50 WIB sebelum lihat apa pun', 'Hapus seluruh kalender ekonomi'],
      optionsEn: ['Flag 19:30 WIB news guardrails, highlight the double Asian Low + PDL liquidity magnet, and wait cleanly inside London Killzone', 'Immediately click Market Buy blindly at 13:50 WIB', 'Disable Stop Losses before CPI'],
      correctIndex: 0,
      explanationId: 'Menyatukan kesadaran waktu berita dengan konfluensi dua kolam likuiditas (Asian Low + PDL) menyiapkan target eksekusi bersih tanpa menebak.',
      explanationEn: 'Combining macro timing awareness with stacked PDL/Asian Low liquidity creates crisp clarity ahead of London Open.',
    },
    essayGuidanceHintsId: [
      'Susun 4 tahapan urutan pemetaan layar kosong secara sistematis sejak 13:45 WIB.',
      'Jelaskan fungsi spesifik PDH/PDL dan kotak Asian Range sebagai target likuiditas, bukan garis beli/jual instan.',
      'Sertakan protokol pemeriksaan kalender berita merah & batas risiko harian.',
    ],
    essayGuidanceHintsEn: [
      'Sequence all 4 pre-flight steps starting calmly at 13:45 WIB.',
      'Clarify why PDH/PDL and Asian Range frame liquidity sweeps rather than blind touch entries.',
      'Include red-news blackout checks and daily loss protection.',
    ],
  },
  'limit-vs-market-sl-tp-execution': {
    slug: 'limit-vs-market-sl-tp-execution',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Konfigurasi presisi panel order MT5: Pending Limit di area FVG, Stop Loss di luar ekor sweep, & TP struktural.',
    photoCaptionEn: 'Precision MT5 order geometry: Pending Limit in FVG discount, Sweep-protected SL, and R:R targets.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Mengetahui di mana harus masuk tidak berarti apa-apa apabila mekanika pesanan di terminal MT5 gagal menerjemahkan batas risiko. Menurut studi eksekusi order (*Harris, 2003*), *Limit Order* memberikan kontrol harga penuh tanpa membayar selisih slippage mengejar bar, sedangkan *Market Order* sebaiknya dibatasi pada konfirmasi matang di kondisi spread ketat.',
      'Kesalahan paling fatal pada penempatan Stop Loss ialah menaruh garis merah terlalu mepet di angka bulat atau badan candle demi memamerkan rasio R:R 1:15 semu. Ayunan noise normal sering menyapu SL sempit tersebut beberapa detik sebelum harga bergerak sesuai arah analisamu.',
      'Hukum matematika fraksi Kelly (1956) mengajarkan solusi elegan: jangan memotong SL ke dalam area rawan sentuhan noise! Letakkan Stop Loss secara objektif **di belakang ekor terjauh Sweep + buffer spread 2-3 pips**, lalu perkecil ukuran Cent Lot di MT5 agar kerugian nominalnya tetap tepat **10 USC (1%)**.',
    ],
    sec2InstitutionalEn: [
      'Resting Limit orders capture clean FVG fill pricing without emotional chase slippage, while Market fills require strict spread calm.',
      'Positioning SL cleanly behind true structural sweep tails plus minor spread buffer stops noise shakeouts, simply dial Cent lot volume down to preserve constant 10 USC loss.',
    ],
    anatomyRowsId: [
      ['Mengejar harga jauh melampaui FVG dengan Market Buy karena takut ketinggalan.', 'Memasang Pending Buy Limit tepat di batas FVG dan membiarkan pasar datang.', 'Gunakan Pending Limit; jika tidak terjemput sebelum arah tercapai, batalkan.'],
      ['Memasang SL tipis 6 pips tepat di badan FVG demi rasio R:R fantastis.', 'Menempatkan SL di luar ujung ekor Sweep + 2-3 pips ruang spread.', 'Selalu hormati titik invalidasi asli di ujung ekor Sweep, bukan SL angan-angan.'],
      ['Mempertahankan lot tetap 0.05 walau jarak SL melebar menjadi 60 pips (-30 USC).', 'Menyesuaikan lot menjadi 0.01 atau 0.02 setiap kali jarak SL struktural berubah.', 'Hitung ulang Cent Lot via rumus (10 USC / jarak SL) sebelum klik kirim.'],
    ],
    anatomyRowsEn: [
      ['Market-chasing stretched candles late past FVG.', 'Staging Limit orders calmly at discounted FVG boundaries.', 'Let price return cleanly to your Limit price or cancel neatly.'],
      ['Squeezing tight 6-pip vanity stops inside active spreads.', 'Placing stops safely outside sweep tails plus buffer.', 'Respect true swing invalidation points always.'],
      ['Keeping static 0.05 lots across widened structural stops.', 'Recomputing Cent lot dynamically per setup SL distance.', 'Keep nominal risk strictly <= 10 USC per setup.'],
    ],
    sec4QuantId: [
      'Mari kita hitung secara akurat di akun 1.000 USC ($10). Skenario A memakai SL sempit 10 pips (100 poin) berlot `0.10` namun kena sapuan noise normal sebanyak 5 kali beruntun (-50 USC) karena posisi tidak punya ruang bernapas.',
      'Skenario B menaruh SL struktural yang benar di balik ekor Sweep berjarak 50 pips (500 poin) plus buffer 3 pips = **50 pips**, lalu mengecilkan lot ke **`0.02 Cent Lot`**. Nilai kerugian jika salah tetap persis sama (**0.02 x 50 pips x 10 USC = 10 USC**!), tetapi peluang selamat melewati getaran normal hingga memanen TP +125 pips (**+25 USC / +2.5R**) melonjak tajam.',
      'Bukan lebar jarak pips yang membuatmu rugi besar, melainkan kegagalan menyesuaikan ukuran lot terhadap jarak pips tersebut.',
    ],
    sec4QuantEn: [
      'Dropping Cent lot size cleanly to 0.02 on a safe 50-pip behind-wick Stop Loss preserves identical 10 USC max risk while eliminating frustrating noise stop-outs before +2.5R TP.',
      'Never compromise structural Stop safety to force static oversized lot volume.',
    ],
    sec4FormulaId: 'Cent_Lot_Aman = Floor_0.01( 10_USC / (Jarak_SL_Pips_Struktural x Nilai_Pip_Cent) )',
    sec4FormulaEn: 'Safe_Cent_Lot = Floor_0.01( 10_USC / (Structural_SL_Pips x Cent_Pip_Value) )',
    hotspots: makePins(
      ['Batas Pending Limit di FVG', 'Stop Loss Luar Ekor Sweep', 'Kalkulator Pengunci 10 USC', 'Target Take Profit Pool Lawan'],
      ['Harga diskon ideal setelah patah struktur MSS terkonfirmasi.', 'Titik batal mutlak di belakang jarum terjauh ditambah napas spread.', 'Menyeimbangkan jarak pips terhadap besaran Cent Lot agar tetap 1%.', 'Likuiditas jelas di ujung seberang memberikan >= 1:2,5 R:R.'],
      ['Memencet Buy instan jauh di pucuk saat FVG tertinggal jauh.', 'Menaruh SL tepat di garis pembuka lilin hingga tersentuh noise.', 'Memakai ukuran lot konstan 0.05 tanpa peduli lebar jarak SL.', 'Menutup profit terlalu cepat di tengah jalan karena panik.'],
      ['Isi harga Limit pada panel Pending Order MT5 tanpa terburu-buru.', 'Geser garis SL beberapa poin di luar sumbu tertinggi/terendah.', 'Masukkan angka jarak ke kalkulator JGS sebelum konfirmasi order.', 'Set TP otomatis ke kolam lawan dan biarkan order bekerja mandiri.']
    ),
    detective: {
      scenarioId: 'Jarak aman di balik ekor Sweep pada setup XAUUSDc terukur 400 poin (40 pips / $4 gerak Emas). Agar rugi maksimal terkunci 10 USC ($0.10) pada akun Cent 1.000 USC, berapa lot tepat di MT5?',
      scenarioEn: 'Your safe behind-the-wick Stop Loss measures 400 points ($4.00 Gold move). To lock max loss precisely at 10 USC ($0.10) on a 1,000 USC account, pick the correct Cent lot:',
      optionsId: ['0.02 Cent Lot (Floor dari 0.025 -> rugi max 8 USC <= 10 USC aman!)', '0.20 Cent Lot (rugi 80 USC)', '1.00 Cent Lot penuh'],
      optionsEn: ['0.02 Cent Lot (Floor of 0.025 -> max loss 8 USC safely <= 10 USC!)', '0.20 Cent Lot (80 USC loss)', '1.00 full Cent Lot'],
      correctIndex: 0,
      explanationId: '0.02 Cent Lot = 0.02 oz; dikalikan gerak $4 memberi risiko $0.08 = 8 USC, masuk sempurna di bawah batas 1% (10 USC).',
      explanationEn: '0.02 oz x $4 move = $0.08 (8 USC), honoring the hard 1% risk limit safely via floor rounding.',
    },
    essayGuidanceHintsId: [
      'Bandingkan keunggulan memasang Pending Limit di FVG vs risiko mengejar pakai Market Execution.',
      'Jelaskan lokasi penempatan Stop Loss yang logis (luar ekor + buffer) dan hubungannya dengan ukuran Cent Lot.',
      'Tunjukkan contoh hitungan konkret mempertahankan risiko 10 USC walau jarak SL berubah.',
    ],
    essayGuidanceHintsEn: [
      'Compare disciplined FVG Pending Limit fills against hurried Market chases.',
      'Explain behind-wick structural Stop Loss placement alongside Cent lot adjustments.',
      'Demonstrate exact 10 USC sizing preservation across wider structural SL gaps.',
    ],
  },
  'five-valid-vs-five-rushed-entries': {
    slug: 'five-valid-vs-five-rushed-entries',
    photoUrl: PHOTOS.EXCHANGE_FLOOR,
    photoCaptionId: 'Audit lapangan membedakan lima setup SOP matang dari lima pola transaksi impulsif paling umum.',
    photoCaptionEn: 'Field inspection dividing five clean textbook SOP setups from five common impulsive FOMO traps.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Sebagian besar kehancuran portofolio ritel bukan disebabkan oleh kurangnya ilmu analisis grafik, melainkan oleh fenomena *Overtrading* dan *Action Bias*. Riset terkenal oleh **Brad Barber & Terrance Odean (2000)** terhadap puluhan ribu rekening membuktikan bahwa peserta yang paling agresif dan sering memencet transaksi justru mencatat pengembalian bersih terburuk.',
      'Membedakan **5 Setup Sah** vs **5 Jebakan Rushed** melatih otak mengenali gejala bahaya: menyentuh tombol di menit berita CPI/NFP, memaksa klik di jam mati Asia/Rollover, melompati konfirmasi MSS, mengejar lilin vertikal tanpa FVG, dan menggandakan lot ketika sedang marah (Revenge Trading).',
      'Dengan menuntut kesempurnaan checklist 5/5 gerbang sebelum mengirim order, kamu menukar kesibukan berisik dengan ketenangan terukur ala desk institusi.',
    ],
    sec2InstitutionalEn: [
      'Barber & Odean (2000) proved hyperactive retail turnover destroys returns via compound spread friction and impulse error.',
      'Running an unforgiving 5/5 SOP filter cures overtrading cleanly while retaining only asymmetric institutional setups.',
    ],
    anatomyRowsId: [
      ['Menerima setup bernilai 3/5 checklist dengan alasan "siapa tahu rezeki".', 'Mendiskualifikasi langsung setup mana pun di bawah 5/5 checklist.', 'Tolak tegas entry tak lengkap dan catat di jurnal sebagai "Disiplin Skip".'],
      ['Merayakan profit kebetulan dari entry tanpa Stop Loss atau pre-news gamble.', 'Mengaudit kualitas proses terpisah dari hasil acak jangka pendek.', 'Beri nilai D pada kemenangan FOMO agar otak tidak ketagihan melanggar SOP.'],
      ['Terus memaksa masuk sesudah dua SL beruntun akibat dorongan balas dendam.', 'Mematikan terminal begitu kerugian harian menyentuh -3% (-30 USC).', 'Hormati Daily Circuit Breaker untuk menjaga kejernihan esok hari.'],
    ],
    anatomyRowsEn: [
      ['Taking incomplete 3/5 setups "just in case".', 'Enforcing 5/5 mandatory binary pre-trade gatekeeping.', 'Log skipped imperfect setups proudly as disciplined wins.'],
      ['Celebrating lucky no-SL wins as strategy proof.', 'Grading process obedience separately from luck.', 'Grade lucky rule breaks honestly as process failures.'],
      ['Overriding consecutive stop limits to win money back fast.', 'Shutting MT5 firmly at -30 USC (-3%) Daily Breaker.', 'Step away cleanly until emotion resets next session.'],
    ],
    sec4QuantId: [
      'Mari simulasikan dua akun identik 1.000 USC selama satu kuartal (12 minggu): Akun A mengambil 5 setup bersih per minggu (60 total setup) pada win rate 50% dan R:R 1:2,5 dengan risiko tetap 10 USC. Ekspektasi per trade = (0,50 x 25 USC) - (0,50 x 10 USC) = +7,5 USC. Total pertumbuhan bersih = **+450 USC (+45%)**.',
      'Akun B mengambil 5 setup bersih yang sama PLUS 5 jebakan FOMO terburu-buru tiap minggu (win rate FOMO hanya 20%, rata-rata rugi penuh 10 USC). Setiap minggu akun B kehilangan tambahan -30 USC dari FOMO, memangkas bersih hasil akhir hampir habis menuju impas atau negatif meski ilmu grafiknya sama persis!',
      'Keunggulan bukan datang dari menemukan lebih banyak sinyal, melainkan dari menghapus transaksi buruk secara kejam.',
    ],
    sec4QuantEn: [
      'Adding just 5 unconfirmed impulsive clicks weekly erases nearly +450 USC of legitimate quarter profits down toward flatline despite identical chart knowledge.',
      'Deleting impulsive setups elevates Expectancy immediately without altering strategy mechanics.',
    ],
    sec4FormulaId: 'Net_Expectancy = Expectancy_Setup_Sah  -  Kebocoran_Overtrading_FOMO',
    sec4FormulaEn: 'True_Performance = Valid_Setup_Expectancy  -  Impulsive_FOMO_Drag',
    hotspots: makePins(
      ['Sah #1: Asia Sweep + London MSS', 'Jebakan #1: Klik Tengah Candle', 'Sah #2: NY Pullback ke FVG', 'Jebakan #2: Entry Jelang CPI/NFP'],
      ['Konfirmasi komplet di jam likuiditas terdalam menghasilkan +2.5R.', 'Sumbu berbalik menelan order terburu-buru sebelum penutupan bar.', 'Harga menghormati celah nilai wajar sesudah patah struktur arah.', 'Pelebaran spread ekstrem menghantam kedua sisi SL bersamaan.'],
      ['Melewatkan konfirmasi karena ragu sesudah garis sudah jelas.', 'Menekan market buy ketika lilin baru berjalan 20 detik.', 'Takut tertinggal kereta lalu membeli di luar zona diskon FVG.', 'Bertaruh arah angka ekonomi merah 2 menit sebelum pengumuman.'],
      ['Eksekusi 0.02 Cent Lot tenang saat seluruh 5 syarat checklist terpenuhi.', 'Kunci tangan di atas meja hingga penghitung detik candle mencapai nol.', 'Taruh Limit Order sabar di FVG atau biarkan kesempatan lewat.', 'Berdiri jauh di pinggir lapangan 15 menit sebelum dan sesudah berita merah.']
    ),
    detective: {
      scenarioId: 'Minggu lalu kamu melanggar SOP masuk Sell jelang rilis berita CPI AS tanpa MSS, dan kebetulan harga jatuh memberi +18 USC. Sementara kemarin setup London SOP lengkapmu kena SL bersih -10 USC. Mana yang lebih bernilai bagi pertumbuhan jangka panjangmu?',
      scenarioEn: 'Last week you broke SOP gambling pre-CPI blindly and got lucky winning +18 USC. Yesterday a textbook 5/5 London setup took a clean -10 USC stop. Which reflects genuine strategic edge?',
      optionsId: ['Setup London -10 USC (Valid SOP, proses terukur menghasilkan konsistensi jangka panjang vs judi beruntung)', 'Gamble pre-CPI +18 USC karena menghasilkan uang tunai lebih banyak', 'Keduanya harus digabung tanpa Stop Loss'],
      optionsEn: ['Yesterday -10 USC textbook SOP setup (repeatable institutional process vs hazardous lucky variance)', 'The pre-CPI lucky win because profit settles everything', 'Disable stops on future news events'],
      correctIndex: 0,
      explanationId: 'Mengapresiasi proses SOP yang dapat diulang (Process Adherence) menjaga kamu jauh dari kebiasaan berjudi yang menghancurkan modal saat keberuntungan berbalik.',
      explanationEn: 'Rewarding repeatable process discipline over lucky rule-breaking prevents catastrophic future tail ruin.',
    },
    essayGuidanceHintsId: [
      'Bandingkan ciri utama 5 setup valid SOP melawan 5 pola jebakan terburu-buru.',
      'Rujuk temuan Barber & Odean (2000) mengapa aktivitas berlebih merusak imbal hasil bersih.',
      'Jelaskan bagaimana cara menilai transaksi agar terbebas dari Outcome Bias.',
    ],
    essayGuidanceHintsEn: [
      'Contrast hallmarks separating textbook SOP fills from five signature FOMO traps.',
      'Reference Barber & Odean (2000) regarding overtrading friction losses.',
      'Distinguish Process Quality strictly from random short-term Outcome Bias.',
    ],
  },
  'gold-cent-vs-silver-50x-trap': {
    slug: 'gold-cent-vs-silver-50x-trap',
    photoUrl: PHOTOS.GOLD_VAULT,
    photoCaptionId: 'Audit spesifikasi kontrak MT5 antara Emas (1 oz/lot Cent) dan Perak (jebakan 50 oz/lot Cent).',
    photoCaptionEn: 'MT5 specification comparison exposing 1 oz Gold vs 50 oz Silver Cent leverage jumps.',
    sandboxKind: 'ASSET_CLASSES',
    sec2InstitutionalId: [
      'Dalam kontrak berjangka dan CFD logam mulia, ukuran satu lot standar untuk Emas adalah 100 troy oz sedangkan untuk Perak jauh lebih besar mencapai 5.000 troy oz mengikuti standar bursa COMEX. Ketika broker menurunkan skala menjadi Akun Cent (1/100), Emas (XAUUSDc) berubah ringan menjadi **1 troy oz per 1.00 Cent lot**, namun banyak server mempertahankan Perak (XAGUSDc) di **50 troy oz per 1.00 Cent lot**.',
      'Akibat asimetri bobot tersembunyi ini, pemula yang terbiasa memasang 0.02 lot pada XAUUSDc tanpa membaca spesifikasi lalu meniru ukuran 0.02 lot yang sama pada XAGUSDc sebenarnya memikul bobot kontrak 1 troy oz Perak penuh ditambah selisih spread persentase yang lebih lebar.',
      'Menurut hukum pengelolaan portofolio Ralph Vince (1990), kesalahan verifikasi nilai per tick merupakan jalur paling cepat menuju kebangkrutan yang tidak disadari sebelum posisi sempat dievaluasi.',
    ],
    sec2InstitutionalEn: [
      'COMEX standard ratios (100 oz Gold vs 5,000 oz Silver) frequently translate onto Cent accounts as 1 oz XAUUSDc versus heavy 50 oz XAGUSDc contracts.',
      'Failing to inspect MT5 Specification values triggers accidental multi-fold over-leveraging whenever beginners switch metals casually.',
    ],
    anatomyRowsId: [
      ['Meniru persis 0.02 lot dari XAUUSDc langsung ke XAGUSDc tanpa cek spek.', 'Membuka tab Market Watch -> Specification memeriksa Contract Size lebih dulu.', 'Wajib cek Contract Size dan hitung ulang via Kalkulator Cent tiap ganti aset.'],
      ['Tertipu harga murah $32 Perak mengira volatilitasnya lebih ringan dari Emas.', 'Menghitung nilai pergerakkan $1 Perak pada 50 oz vs $1 Emas pada 1 oz.', 'Fokuskan latihan pemula $10 pada XAUUSDc sampai paham penuh risiko XAGUSDc.'],
      ['Mengabaikan persentase rasio Spread Perak saat sesi Asia yang tipis.', 'Mengukur jarak spread relatif terhadap rata-rata harian ATR aset.', 'Eksekusi logam hanya di jam sibuk London/NY dan cek spread sebelum klik.'],
    ],
    anatomyRowsEn: [
      ['Copying 0.02 Gold lot blindly onto XAGUSDc orders.', 'Auditing Market Watch -> Specification units before every new symbol.', 'Recalculate exact Cent Risk via calculator prior to order confirmation.'],
      ['Assuming $32 Silver carries gentler tick volatility than $2,700 Gold.', 'Evaluating true $1 move dollar exposure across 50 oz units.', 'Keep initial $10 learning anchored cleanly on XAUUSDc.'],
      ['Overlooking wider proportional Silver spreads during thin Asian hours.', 'Measuring spread friction relative to intraday ATR bounds.', 'Restrict commodity runs cleanly to tight London/NY liquidity.'],
    ],
    sec4QuantId: [
      'Mari kita hitung persis angka dolar dan sen di layar akun 1.000 USC ($10). Pada XAUUSDc (`Contract Size = 1 oz`), transaksi minimum `0.01 Cent lot` berjarak SL $10 ($2.700 ke $2.690) menghasilkan kerugian tepat `0.01 x $10 = $0.10 = 10 USC` (persis 1% batas aman).',
      'Kini bandingkan dengan broker yang memakai XAGUSDc (`Contract Size = 50 oz`): pada ukuran paling kecil `0.01 Cent lot` (setara 0.50 oz Perak), apabila Perak bergerak berlawanan $0.40 saja (hal yang sangat biasa dalam satu hari bursa!), kerugianmu mencapai `0.50 x $0.40 = $0.20 = 20 USC (2%)`, atau jika Perak melonjak $1,00 kerugian menyentuh **50 USC (5%)** dalam satu posisi!',
      'Oleh sebab itu, XAUUSDc secara teknis jauh lebih cocok bagi akun mikro $10 daripada XAGUSDc sebelum ekuitas meningkat di atas $50 (5.000 USC).',
    ],
    sec4QuantEn: [
      'While 0.01 XAUUSDc safely absorbs a generous $10 Gold swing for just 10 USC risk, 0.01 lot on a 50 oz XAGUSDc contract hits -50 USC (-5%) on a routine $1 Silver spike.',
      'Until equity exceeds 5,000 USC ($50), Gold Cent contracts offer vastly superior position-sizing granularity.',
    ],
    sec4FormulaId: 'Risiko_Kontrak = Lot_Cent  x  Contract_Size_Cent  x  Jarak_SL_Harga',
    sec4FormulaEn: 'True_Risk_USC = Cent_Lot  x  Cent_Contract_Size  x  SL_Price_Move',
    hotspots: makePins(
      ['Label Emas XAUUSDc (1 oz)', 'Tab MT5 Specification', 'Jebakan Kontrak Perak 50 oz', 'Kalkulator Verifikasi Lot'],
      ['Membagi bobot emas bersih sehingga 0.01 lot ramah bagi akun $10.', 'Menu wajib di Market Watch memperlihatkan Contract Size asli broker.', 'Perbandingan 50 kali unit Perak melipatgandakan dampak fluktuasi dolar.', 'Alat JGS memvalidasi apakah 0.01 lot tetap aman <= 10 USC.'],
      ['Langsung entry Pair logam baru karena tergiur harga dolar yang lebih kecil.', 'Tidak pernah membuka menu Properties/Specification satu kali pun.', 'Memasang 0.05 lot di XAGUSDc yang bisa menghabiskan 25% modal sekejap.', 'Memakai tebakan mental tanpa mengecek perbedaan ukuran kontrak.'],
      ['Pertahankan 100 latihan pertamamu di XAUUSDc agar hitungan konsisten.', 'Klik kanan pair di MT5 -> pilih Specification tiap kali pindah simbol.', 'Gunakan batas keras JGS: tolak instrumen jika min 0.01 melampaui 1% SL.', 'Simulasikan selalu di Kalkulator Risiko JGS sebelum eksekusi nyata.']
    ),
    detective: {
      scenarioId: 'Seorang teman menyarankanmu memakai XAGUSDc dengan alasan "Perak harganya $30 jauh lebih aman buat modal $10 daripada Emas $2.700". Setelah mengecek MT5 Specification, ternyata 1 Cent Lot Perak bernilai 50 oz. Jawaban koreksimu?',
      scenarioEn: 'A friend claims $30 Silver is safer than $2,700 Gold for a $10 balance, yet MT5 Specification shows 1 Cent Lot XAGUSDc = 50 oz. Correct analysis:',
      optionsId: ['Salah besar: bobot kontrak 50 oz membuat 0.01 lot Perak jauh lebih sensitif dan berisiko melebihi batas 1% (10 USC) dibanding 1 oz Emas.', 'Benar sekali: harga $30 pasti 90x lebih kecil risikonya daripada emas.', 'Perak tidak butuh Stop Loss sama sekali.'],
      optionsEn: ['Incorrect: 50 oz Silver contracts carry disproportionate nominal dollar risk per move that quickly breaches 1% caps on $10 balances.', 'True: lower nominal price always means lower risk.', 'Silver ignores margin calls.'],
      correctIndex: 0,
      explanationId: 'Risiko nyata ditentukan oleh Contract Size x Gerak Dolar, bukan sekadar harga nominal aset per unitnya.',
      explanationEn: 'True positional risk equals Lot x Contract Size x Price Move, never nominal quote price alone.',
    },
    essayGuidanceHintsId: [
      'Bandingkan langsung Contract Size antara XAUUSDc (1 oz) vs XAGUSDc (50 oz) pada akun 1.000 USC.',
      'Berikan contoh hitungan kerugian nyata bila salah mengambil ukuran 0.01 lot pada SL normal Perak.',
      'Jelaskan SOP mengecek Specification MT5 sebelum memindahkan fokus ke pair baru.',
    ],
    essayGuidanceHintsEn: [
      'Contrast 1 oz XAUUSDc vs 50 oz XAGUSDc unit specifications directly.',
      'Quantify dollar exposure gaps across routine Gold vs Silver swings.',
      'Detail mandatory MT5 Contract Specification auditing before entering new pairs.',
    ],
  },
  'nasdaq-ustec-momentum-playbook': {
    slug: 'nasdaq-ustec-momentum-playbook',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Lonjakan aktivitas pembukaan bursa Wall Street (20:30 / 21:30 WIB) penggerak utama indeks Nasdaq USTECc.',
    photoCaptionEn: 'New York cash equity opening bell surge governing USTECc / Nasdaq intraday liquidity.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Berbeda dengan pasangan valuta asing yang cair sejak pagi London, indeks saham teknologi Amerika (**Nasdaq 100 / USTECc**) didominasi kapitalisasi saham raksasa yang bursa tunainya berada di New York. Penelitian aktivitas intraday **Andersen & Bollerslev (1998)** mendokumentasikan ledakan volume terbesar setiap hari tepat saat bel bursa AS dibuka (20:30 WIB pada musim panas DST, atau 21:30 WIB pada musim dingin).',
      'Pada 5 sampai 15 menit pertama setelah bel berbunyi, jutaan pesanan penyeimbangan portofolio institusional dan order ritel malam sebelumnya menyerbu pasar bersama-sama (*Opening Auction Imbalance*). Kondisi tersebut kerap melahirkan ayunan sapuan tajam dua arah ke atas lalu ke bawah.',
      'Oleh karena itu, taktik profesional di indeks AS selalu membiarkan rentang 15 menit pertama mencetak batas tertinggi dan terendahnya lebih dulu (*Opening Range*) sebagai umpan Sweep sebelum menangkap arah bersih sesudahnya.',
    ],
    sec2InstitutionalEn: [
      'US Tech index volume remains comparatively thin until the NYSE/NASDAQ Cash Equity Opening Bell unleashes overnight institutional imbalances.',
      'Allowing the initial 15 minutes to carve clear liquidity boundaries transforms chaotic bell whipsaw into high-precision ICT sweeps.',
    ],
    anatomyRowsId: [
      ['Langsung klik Buy tepat detik 20:30:01 WIB begitu bel bursa saham berbunyi.', 'Menunggu 10-15 menit pertama selesai membentuk kotak Opening Range.', 'Taruh kedua tangan lepas mouse sejak 20:28 hingga 20:45 WIB.'],
      ['Memakai jarak SL tipis 5-10 poin indeks pada volatilitas Nasdaq yang kencang.', 'Mengukur jarak SL alami 40-70 poin di luar struktur lalu mengecilkan lot.', 'Verifikasi nilai 1 poin indeks USTECc di akun Cent sebelum order.'],
      ['Memegang posisi indeks menembus akhir pekan saat bursa saham AS libur penuh.', 'Menutup eksekusi intraday sebelum penutupan pasar AS guna hindari gap.', 'Kelola posisi bersih di dalam jendela 20:45–23:00 WIB bagi pekerja/mahasiswa.'],
    ],
    anatomyRowsEn: [
      ['Firing Market orders on second 20:30:01 right as NY equity bell hits.', 'Observing hands-off during opening 15-minute volatility.', 'Wait cleanly until 20:45 WIB for Opening Range High/Low formation.'],
      ['Setting tiny 5-point stops inside volatile USTEC bursts.', 'Sizing stops proportionally (40-70 pts) via minimum Cent volumes.', 'Confirm broker point multipliers carefully before clicking.'],
      ['Holding leveraged index trades carelessly over weekend exchange gaps.', 'Capturing clean 20:45-23:00 WIB cash-session swings and flattening out.', 'Keep evening index runs clean and closed before midnight WIB.'],
    ],
    sec4QuantId: [
      'Perhatikan perbedaan perhitungan indeks CFD antar broker di terminal MT5: sebagian server memberi nilai 1.00 lot USTEC = $1 per 1 poin gerak indeks (berarti `0.01 Cent lot` setara $0.0001 per poin? Tidak, sering kali minimum step indeks adalah 0.1 atau $0.01 per poin!). Oleh sebab itu menguji `1 klik demo / Specification` sangat krusial.',
      'Misalkan satu kontrak minimum `0.01` memakan 0,02 USC per 1 poin gerak USTEC. Bila SL struktural berada di jarak 60 poin indeks di luar ujung sapuan bel pembukaan, risiko tepat = 60 x 0,02 = 1,2 USC (atau bila tick 10x lebih besar = 12 USC). Mengecek kelipatan *Tick Value* langsung menghindari kejutan minus di layar.',
      'Untuk karyawan atau mahasiswa yang baru pulang sore hari, jendela `20:30–22:30 WIB` di Nasdaq memberikan satu siklus bersih per hari tanpa perlu menatap layar sejak pagi.',
    ],
    sec4QuantEn: [
      'Because CFD broker contract sizes on USTEC vary widely (ranging from 1x to 10x index point values), auditing exact MT5 Tick Value guarantees your structural 50-point Stop stays bounded safely inside 10 USC.',
      'Its 20:30-22:30 WIB evening rhythm suits busy students and professionals effortlessly.',
    ],
    sec4FormulaId: 'Risiko_Indeks_USC = Lot_Cent  x  Jarak_SL_Poin_Indeks  x  Nilai_Tick_Per_Poin',
    sec4FormulaEn: 'Index_Risk_USC = Cent_Lot  x  Index_Point_Stop_Distance  x  Verified_Tick_Value',
    hotspots: makePins(
      ['Bel Wall Street (20:30 / 21:30 WIB)', 'Kotak 15 Menit Awal (Opening Range)', 'Sapuan Judas & MSS M5', 'Target Ekspansi Nyaman Malam WIB'],
      ['Gelombang volume saham Apple/Nvidia/Microsoft masuk bursa secara serentak.', 'Rentang awal yang menampung Stop Loss pemicu awal dari kedua arah.', 'Konfirmasi arah bersih sesudah satu ujung Opening Range tersapu.', 'Ekspansi teratur menuju likuiditas sesi sebelumnya hingga 22:30 WIB.'],
      ['Entry tepat detik pembukaan terlempar spread & candle liar dua arah.', 'Menganggap breakout menit ke-4 pasti menjadi tren permanen.', 'Memakai ukuran lot asal-asalan tanpa cek kontrak indeks broker.', 'Trading terus hingga dini hari meski target harian sudah tercapai.'],
      ['Siapkan alarm 20:45 WIB sesudah guncangan 15 menit pertama mereda.', 'Gambar batas High dan Low dari 3 candle M5 pembukaan pertama.', 'Tunggu satu sisi disapu lalu ambil retracement FVG berisiko 1%.', 'Ambil 1 setup paling bersih per malam lalu tutup terminal tenang.']
    ),
    detective: {
      scenarioId: 'Saat waktu musim panas (Summer DST AS), jam 20:30 WIB bel saham New York berbunyi dan USTEC melesat naik lalu turun menyapu tajam dalam 6 menit pertama. Apa tindakan terbaik?',
      scenarioEn: 'During US Summer DST, the 20:30 WIB Wall Street bell fires violent two-sided spikes across the opening 6 minutes on USTEC. What is your disciplined SOP move?',
      optionsId: ['Biarkan 10–15 menit pertama mencetak batas High & Low (Opening Range) lalu tunggu konfirmasi Sweep + MSS setelah 20:45 WIB', 'Ikut pencet Buy dan Sell bergantian di tengah lonjakan 6 menit tersebut', 'Tutup akun karena indeks terlalu cepat'],
      optionsEn: ['Wait patiently 10-15 minutes to define the Opening Range High/Low, then hunt clean post-20:45 WIB Sweep + MSS triggers', 'Fire frantic Buy/Sell flips during the first 6 minutes', 'Avoid stops completely'],
      correctIndex: 0,
      explanationId: 'Menghindari 15 menit pembukaan bursa menjauhkanmu dari whipsaw pembukaan dan mengubahnya menjadi target likuiditas Opening Range.',
      explanationEn: 'Letting the first 15 minutes pass filters opening imbalance chaos into a crisp tradeable benchmark.',
    },
    essayGuidanceHintsId: [
      'Jelaskan alasan volume utama Nasdaq memuncak saat jam 20:30/21:30 WIB dan pengaruh Daylight Saving Time.',
      'Uraikan strategi menunggu 15 menit Opening Range sebelum mengeksekusi USTECc.',
      'Sebutkan pentingnya memverifikasi nilai poin indeks pada broker sebelum menentukan jarak SL.',
    ],
    essayGuidanceHintsEn: [
      'Explain why NY cash equity open (20:30/21:30 WIB) governs Nasdaq momentum.',
      'Describe the 15-minute Opening Range wait discipline.',
      'Emphasize checking broker index Tick Value before ordering.',
    ],
  },
  'fx-pairs-and-crypto-cent-tactics': {
    slug: 'fx-pairs-and-crypto-cent-tactics',
    photoUrl: PHOTOS.DEALING_DESK,
    photoCaptionId: 'Adaptasi karakter EURUSDc, GBPJPYc, dan pasar 24 jam BTCUSDc sesuai jadwal sesi & korelasi USD.',
    photoCaptionEn: 'Tailoring Cent sizing and decimals across liquid EURUSDc, volatile GBPJPYc, and 24/7 BTCUSDc.',
    sandboxKind: 'ASSET_CLASSES',
    sec2InstitutionalId: [
      'Survei Bank Sentral Dunia BIS (2025) mencatat pasangan **EUR/USD** tetap merajai omzet likuiditas harian valas global, sehingga biaya *Bid-Ask Spread* di akun mana pun selalu paling tipis dan ramah bagi presisi teknikal. Sebaliknya, pasangan silang seperti **GBPJPY** menggabungkan dua mata uang bervolatilitas tinggi yang aktif sejak sesi Asia pagi (07:00 WIB) hingga penutupan London.',
      'Sementara itu, CFD aset kripto seperti **BTCUSDc** beroperasi 24 jam penuh tujuh hari seminggu termasuk Sabtu dan Minggu. Namun trader akun mikro wajib menyadari bahwa struktur CFD kripto ritel kerap membawa *spread* jauh lebih lebar dan risiko likuidasi akhir pekan bila Stop Loss diletakkan terlalu sempit.',
      'Selain perbedaan desimal pip (4 desimal di EURUSD vs 2 desimal di GBPJPY), bahaya terbesar trading multi-pair ialah **Korelasi Tersembunyi**: membuka Buy EURUSD dan Buy XAUUSD bersamaan melipatgandakan taruhan pelemahan Dolar menjadi risiko 2% tersembunyi.',
    ],
    sec2InstitutionalEn: [
      'BIS data places EUR/USD at the pinnacle of global liquidity with tightest spreads, while GBP/JPY combines Tokyo-London momentum swings and BTC/USD introduces wide 24/7 CFD spreads.',
      'Watch JPY 2-decimal pip scaling carefully and never stack correlated USD exposures concurrently above 1.5% risk.',
    ],
    anatomyRowsId: [
      ['Buy EURUSDc dan Buy XAUUSDc serentak mengira risikonya masing-masing 1% terpisah.', 'Mengakui keduanya bergerak berlawanan Dolar AS sehingga risiko menyatu.', 'Pilih hanya satu chart paling bersih saat berita USD mendekat atau bagi 0,5% + 0,5%.'],
      ['Salah mengira 20 pips di GBPJPY sama letak desimalnya dengan 0.0020.', 'Mengetahui 1 pip pasangan JPY berada di desimal kedua (0.01).', 'Gunakan kalkulator pair spesifik sebelum memasukkan angka jarak SL ke MT5.'],
      ['Memasang SL super tipis di BTCUSDc akhir pekan tanpa memperhitungkan lebar spread CFD.', 'Mengukur besaran spread live di Market Watch sebelum mengatur batas SL.', 'Longgarkan SL kripto dan kecilkan lot sesuai struktur volatilitasnya.'],
    ],
    anatomyRowsEn: [
      ['Longing EURUSD and Gold simultaneously believing risk remains isolated.', 'Recognizing unified inverse USD correlation risk exposure.', 'Select solely the highest-grade setup or halve size to 0.5% each.'],
      ['Mistaking Yen 0.01 pip location for standard 0.0001 FX pairs.', 'Adjusting decimal conversions accurately for JPY crosses.', 'Confirm exact MT5 point precision via calculator first.'],
      ['Running tight FX stops on wide-spread weekend BTCUSD CFD quotes.', 'Checking live crypto Ask-Bid gap before deploying weekend risk.', 'Widen structural stops and step lot volume down for Bitcoin.'],
    ],
    sec4QuantId: [
      'Mari menguji perbedaan bobot pip pada akun 1.000 USC ($10) antara EURUSDc dan GBPJPYc. Di EURUSDc, jarak SL struktural 20 pips (200 poin) pada lot minimum `0.05 Cent Lot` ($0.005/pip) hanya berisiko `20 x $0.005 = $0.10 = 10 USC`! Itulah sebabnya EURUSD terasa sangat presisi dan pemaaf bagi pelajar.',
      'Bandingkan dengan mengabaikan korelasi: jika kamu mengambil Buy EURUSD (-10 USC risk), Buy GBPUSD (-10 USC risk), dan Buy XAUUSD (-10 USC risk) pada pukul 19:25 WIB, satu rilis NFP AS yang menguatkan Dolar secara tak terduga akan langsung membakar **-30 USC (-3% ekuitas)** dalam satu menit lewat tiga pintu sekaligus.',
      'Menjadi strategis multi-pair sejati artinya memilih satu instrumen terbaik hari itu berdasarkan jadwal sesi aktif dan korelasi bersih, bukan membuka posisi di semua layar bersamaan.',
    ],
    sec4QuantEn: [
      'Stacking three USD-short trades simultaneously exposes 30 USC (-3%) to a single surprise US NFP dollar spike; isolating just one pristine 10 USC EURUSD or XAUUSD trade keeps drawdown locked cleanly at 1%.',
      'Always tailor lot volume and decimal scaling to the asset class actively on screen.',
    ],
    sec4FormulaId: 'Eksposur_USD_Gabungan = Risiko_Pair_A + Risiko_Pair_B (Jika Searah USD, Batasi <= 1,5%)',
    sec4FormulaEn: 'Combined_USD_Exposure = PairA_Risk + PairB_Risk (Keep Same-Direction Risk <= 1.5%)',
    hotspots: makePins(
      ['EURUSDc: Spread Terketat Dunia', 'GBPJPYc: Aktif Pagi-Sore (0.01)', 'BTCUSDc: 24/7 Lebar Spread', 'Tameng Korelasi USD Gabungan'],
      ['Likuiditas BIS terbesar menjaga gesekan transaksi serendah mungkin.', 'Pasangan silang lincah sejak sesi Tokyo hingga penutupan London.', 'Pergerakan kontinu akhir pekan dengan jarak spread CFD lebih tebal.', 'Mencegah dua posisi berbeda pair meledak bersamaan oleh satu berita USD.'],
      ['Menganggap pergerakan EURUSD membosankan lalu over-leverage lot besar.', 'Keliru memasukkan angka Stop Loss Yen 100x terlalu dekat atau jauh.', 'Memaksa scalping ketat di hari Minggu saat spread kripto sedang lebar.', 'Masuk Buy EURUSD + Buy Gold serentak dengan masing-masing 1% full risk.'],
      ['Latih presisi SL 15-25 pips di EURUSDc saat London & New York.', 'Pastikan skala 0.01 saat mengukur jarak pips pada GBPJPYc.', 'Periksa lebar spread Ask-Bid BTCUSD sebelum menyalakan limit order.', 'Ambil hanya 1 setup paling meyakinkan per arah Dolar AS.']
    ),
    detective: {
      scenarioId: 'Jam 15:00 WIB kamu sudah punya posisi Buy XAUUSDc terbuka berisiko 10 USC (1%). Tiba-tiba melihat setup bagus juga untuk Buy EURUSDc berisiko 10 USC. Apa risiko tersembunyi jika kamu ambil keduanya?',
      scenarioEn: 'You already hold an open Buy XAUUSDc trade risking 10 USC (1%), then spot an attractive Buy EURUSDc setup risking another 10 USC. What hidden danger arises?',
      optionsId: ['Korelasi ganda melawan Dolar AS: bila berita atau arus uang mendadak menguatkan USD, kedua posisi berpotensi kena Stop Loss serentak (-20 USC = -2%).', 'Broker langsung membekukan aset.', 'EURUSD dan Emas tidak berhubungan dengan USD.'],
      optionsEn: ['Double correlated USD-short exposure: any sudden USD bounce can stop out both trades simultaneously for a -20 USC (-2%) loss.', 'Brokers freeze EURUSD automatically.', 'Zero USD linkage exists between Gold and Euro.'],
      correctIndex: 0,
      explanationId: 'Kedua instrumen sama-sama melawan USD di penyebutnya (/USD), sehingga arah makro USD mendadak memukul keduanya bersamaan.',
      explanationEn: 'Both quotes share USD as counter-currency, stacking directional Dollar downside exposure silently.',
    },
    essayGuidanceHintsId: [
      'Bandingkan karakter operasional EURUSDc (spread ketat), GBPJPYc (tempo tinggi/desimal 0.01), dan BTCUSDc (24/7 spread lebar).',
      'Jelaskan bahaya korelasi tersembunyi ketika Buy EURUSD dan Buy XAUUSD terbuka serentak.',
      'Tetapkan aturan pengelolaan risiko portofolio agar eksposur Dolar gabungan tetap terjaga.',
    ],
    essayGuidanceHintsEn: [
      'Contrast operational traits of EURUSDc, GBPJPYc (0.01 decimal), and 24/7 BTCUSDc.',
      'Explain hidden USD directional correlation risk across simultaneous Longs.',
      'State portfolio risk caps limiting correlated trades strictly.',
    ],
  },
  'reading-macro-fundamental-bias': {
    slug: 'reading-macro-fundamental-bias',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Radar makroekonomi menautkan selisih suku bunga bank sentral dan imbal hasil obligasi riil US10Y.',
    photoCaptionEn: 'Macroeconomic divergence scoring linking sovereign central bank policy paths to US10Y real yields.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Di meja hedge fund makro global, pergerakan tren multi-minggu pada mata uang dan logam mulia tidak dipicu oleh pola grafik semata, melainkan oleh **Divergensi Kebijakan Moneter** (Mishkin, 2022). Ketika satu bank sentral menahan atau menaikkan suku bunga karena inflasi membandel (**Hawkish**) sementara bank sentral negara lain mulai memangkas suku bunga (**Dovish**), modal institusional bermigrasi ke imbal hasil lebih tinggi.',
      'Untuk Emas (**XAUUSD**), studi terkenal *Gibson Paradox* oleh Barsky & Summers (1988) menjelaskan korelasi terbalik konsisten terhadap **Imbal Hasil Riil Obligasi AS (US10Y dikurangi inflasi)**: setiap kali imbal hasil riil turun karena bank sentral siap melonggarkan bunga, biaya peluang memegang emas tanpa kupon ikut turun sehingga permintaan institusi terdorong naik.',
      'Menerjemahkan data ini menjadi skor sederhana **-100 hingga +100** memberi kompas jelas sebelum menyentuh chart M15: kamu berhenti membuang amunisi melawan arah angin utama.',
    ],
    sec2InstitutionalEn: [
      'Medium-term FX and bullion regimes flow steadily toward widening real interest rate differentials rather than short-term technical fluctuations alone.',
      'Converting policy tone (Hawkish vs Dovish) plus CPI surprises into directional -100 to +100 biases stops beginners from stepping blindly in front of macro trains.',
    ],
    anatomyRowsId: [
      ['Menebak warna merah/hijau tepat 1 detik sebelum rilis NFP di kalender.', 'Memantau perubahan arah tren kebijakan suku bunga bank sentral antar minggu.', 'Gunakan Fundamental sebagai kompas arah mingguan, bukan taruhan judi berita.'],
      ['Terus memaksakan Sell Emas saat bank sentral berbalik Dovish & Yield turun.', 'Memeriksa tren US10Y & sikap The Fed lebih dulu sebelum membuat bias mingguan.', 'Selaraskan setup teknikal hanya saat arah struktur searah angin makro atau di batas ekstrem.'],
      ['Bingung membaca kalimat panjang pidato gubernur bank sentral.', 'Menggunakan Radar Skor Fundamental -100 s/d +100 di menu Riset JGS.', 'Lakukan audit mingguan tiap Senin pagi memilih 2 aset dengan divergensi paling bersih.'],
    ],
    anatomyRowsEn: [
      ['Betting red/green dots 1 second prior to NFP headlines.', 'Scoring medium-term Hawkish vs Dovish rate divergence consistently.', 'Apply macro bias as a multi-day trend compass, never a headline gamble.'],
      ['Forcing Shorts into Bullion while US Real Yields tumble.', 'Tracking US10Y real rate trends prior to weekly charting.', 'Favor setups aligned behind clear capital-flow divergence.'],
      ['Drowning inside complex central-bank speeches.', 'Inspecting clean -100..+100 scores on JGS Research Hub.', 'Pick pairs exhibiting cleanest monetary contrast weekly.'],
    ],
    sec4QuantId: [
      'Mari kita uji contoh penerapan **Persamaan Fisher** pada Radar Bias Emas: seandainya Yield nominal obligasi 10 Tahun AS turun dari `4,40%` menjadi `3,90%` sementara ekspektasi inflasi CPI bertahan di `2,90%`, maka Imbal Hasil Riil turun tajam dari `+1,50%` ke hanya `+1,00%` (turun -50 bps).',
      'Bagi pengelola dana pensiun bernilai miliaran dolar, penurunan 50 basis poin bunga bersih obligasi meningkatkan daya tarik alokasi Emas secara drastis. Pada periode pelonggaran riil tersebut, trader yang hanya memfilter **setup Buy M5 searah bias +70 Radar Fundamental** mengalami rasio keberhasilan Sweep-to-TP jauh lebih konsisten ketimbang mencoba menangkap pucuk Sell melawan arus.',
      'Menyatukan alasan makro (mengapa institusi membeli) ke atas layar teknikal menjadikan setiap entri terasa kokoh dan tenang.',
    ],
    sec4QuantEn: [
      'When nominal US10Y drops from 4.40% to 3.90% against steady 2.90% inflation, Real Yields squeeze down -50 bps toward +1.00%, powering sustained institutional XAUUSD demand.',
      'Trading aligned with fundamental compass tailwinds noticeably reduces stop-out frequency.',
    ],
    sec4FormulaId: 'Bias_Fundamental = (Arah_Bunga_Fed_Hawkish_vs_Dovish) + (Momentum_Real_Yield_US10Y)',
    sec4FormulaEn: 'Macro_Bias_Score = Central_Bank_Rate_Path_Diff + Real_Yield_Momentum',
    hotspots: makePins(
      ['Nada Bank Sentral (Hawkish vs Dovish)', 'Kejutan Inflasi CPI & NFP', 'Kurva Obligasi Riil US10Y', 'Kompas Mingguan -100..+100'],
      ['Penentu biaya uang jangka panjang memicu arus modal miliaran dolar.', 'Mengubah perkiraan pasar kapan bank sentral menaikkan/memangkas suku bunga.', 'Jangkar terkuat bagi Emas & Dolar AS di meja investasi dunia.', 'Merangkum data rumit ke skor siap pakai di halaman Riset JGS.'],
      ['Bertaruh nekat di menit perilisan angka CPI saat spread melebar tajam.', 'Mengabaikan tren suku bunga dan terus melawan arus selama berminggu-minggu.', 'Mengira angka berita masa lalu selalu sama hasilnya tanpa cek ekspektasi.', 'Meninggalkan manajemen risiko hanya karena merasa yakin dengan satu pidato.'],
      ['Cek perbandingan nada The Fed vs ECB/BoE tiap awal minggu.', 'Tunggu 15 menit pasca rilis CPI/NFP agar struktur teknikal terbentuk tenang.', 'Amati apakah US10Y naik atau turun saat mengevaluasi arah XAUUSD.', 'Padukan bias skor positif tinggi dengan konfirmasi 3-Gerbang di Killzone.']
    ),
    detective: {
      scenarioId: 'Data inflasi CPI AS melandai lebih rendah dari ekspektasi dan The Fed memberi sinyal siap memangkas suku bunga dua kali tahun ini, menyebabkan Yield US10Y terjun tajam. Kompas bias fundamental apa yang terbentuk bagi Dolar AS (DXY) dan Emas (XAUUSD)?',
      scenarioEn: 'US CPI inflation cools faster than expected while the Fed signals imminent rate cuts, dragging US10Y yields lower. What fundamental bias emerges for DXY vs XAUUSD?',
      optionsId: ['DXY melemah (Bearish USD) & XAUUSD menguat (Bullish Emas) karena turunnya imbal hasil riil obligasi AS', 'DXY meroket ke rekor tertinggi & Emas jatuh ke nol', 'Tidak berpengaruh sama sekali pada pasar uang'],
      optionsEn: ['USD turns Bearish while XAUUSD turns Bullish due to falling real US yields', 'DXY surges to record highs while Gold collapses', 'Macro shifts have zero market impact'],
      correctIndex: 0,
      explanationId: 'Sinyal pemangkasan bunga Dovish menekan imbal hasil obligasi AS sehingga Dolar melemah dan biaya peluang memegang Emas berkurang.',
      explanationEn: 'Dovish yield compression reduces USD carry attractiveness and boosts non-yielding Gold demand.',
    },
    essayGuidanceHintsId: [
      'Jelaskan konsep perbedaan sikap Hawkish vs Dovish antar bank sentral (Policy Divergence).',
      'Hubungkan perubahan imbal hasil riil US10Y dengan kompas pergerakan XAUUSD & DXY.',
      'Terangkan cara memanfaatkan bias makro sebagai penyaring harian tanpa berjudi detik berita.',
    ],
    essayGuidanceHintsEn: [
      'Differentiate Hawkish tightening vs Dovish easing monetary policy divergence.',
      'Connect US10Y real yields cleanly into DXY and XAUUSD macro direction.',
      'Explain how macro scores guide daily chart directional bias without pre-news gambling.',
    ],
  },
  'cftc-cot-vs-retail-sentiment': {
    slug: 'cftc-cot-vs-retail-sentiment',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Pengawasan laporan CFTC Commitments of Traders (COT) terhadap akumulasi dana institusi versus posisi ritel.',
    photoCaptionEn: 'Monitoring weekly CFTC COT large-fund futures positioning vs trapped retail sentiment extremes.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Salah satu keunggulan pasar berjangka AS yang paling transparan bagi analis kuantitatif ialah penerbitan mingguan **Commitments of Traders (COT) Report** oleh otoritas **CFTC**. Setiap lembaga pengelola aset dan hedge fund wajib melaporkan total kontrak bersih Long vs Short yang mereka tahan melewati ambang batas pelaporan federal.',
      'Riset akademis **Hendrik Bessembinder (1992)** membuktikan ketidakseimbangan net posisi pelaku institusional di pasar komoditas dan mata uang menyimpan kandungan informasi struktural atas tekanan premi risiko berjangka. Ketika Hedge Fund terus menambah net posisi beli selama beberapa pekan, tren dasar cenderung bertahan kokoh.',
      'Sebaliknya, indeks sentimen akun ritel di broker sering kali berkerumun secara emosional (>65% hingga 80% berada di sisi merugi yang salah) karena kebiasaan *Loss Aversion* menahan rugi terlalu lama. Benturan ekstrem antara arus COT Institusi dengan kerumunan Ritel ini dikenal di JGS sebagai **Institutional Divergence Alert**.',
    ],
    sec2InstitutionalEn: [
      'Weekly US CFTC COT filings reveal legally audited net futures exposure held by Hedge Funds and Commercials across Gold, FX, and Equity indices.',
      'Tracking divergences where >65% of retail traders crowd opposite growing COT Fund positioning alerts strategists to classic retail squeeze traps.',
    ],
    anatomyRowsId: [
      ['Membuka posisi hanya karena mayoritas grup chat ritel berkata "harga sudah kemahalan".', 'Mengecek rasio COT Non-Commercial dan posisi kerumunan ritel secara objektif.', 'Tolak ikut kerumunan saat sentimen satu arah ritel menembus >65% lawan COT.'],
      ['Memakai rilis Jumat sore COT sebagai pemicu scalping 5 menit Senin pagi.', 'Memperlakukan perubahan mingguan COT sebagai kompas arus besar institusi.', 'Gunakan arah bersih COT untuk memvalidasi setup Killzone H1/M15 minggu berjalan.'],
      ['Mengabaikan pergeseran Weekly Change (apakah kontrak bertambah atau berkurang).', 'Membaca Net Position DAN Delta mingguan dana hedge fund.', 'Catat perubahan akumulasi COT tiap akhir pekan di tab Riset JGS.'],
    ],
    anatomyRowsEn: [
      ['Fading rallies simply because social media crowds call price "too high".', 'Cross-checking CFTC Non-Commercial shifts vs broker Retail positioning.', 'Avoid crowding >65% retail extremes running opposite Fund accumulation.'],
      ['Using weekly COT reports as a noisy 5-minute entry button.', 'Applying weekly COT momentum as an institutional macro directional filter.', 'Pair COT conviction cleanly with H1/M15 Killzone sweeps.'],
      ['Reading cumulative totals while ignoring Weekly Delta shifts.', 'Evaluating both Net % Bias and Week-over-Week contract changes.', 'Review COT divergence shifts inside JGS Research every weekend.'],
    ],
    sec4QuantId: [
      'Mari membaca angka nyata di panel COT: anggap saja pada XAUUSD kontrak terbuka Non-Commercial Hedge Fund menunjukkan **+245.000 Net Long** (naik +18.000 kontrak dibanding minggu lalu), sementara sentimen ritel tercatat **72% Retail Short** karena menganggap harga emas terlalu tinggi.',
      'Selisih ekstrem posisi institusional vs ritel mencapai lebih dari 40 poin persentase (**Divergence Alert Terpicu!**). Secara statistik lelang, kumpulan 72% trader ritel yang terus memasang Sell di pasar naik menaruh Stop Loss tepat di atas setiap puncak lokal (`BSL`). Algoritma likuiditas tinggal menyapu deretan Stop Loss tersebut ke atas untuk terus mendorong tren Long institusi.',
      'Kamu tinggal menunggu sapuan koreksi kecil ke bawah (Sweep + Bullish MSS) lalu memihak di sisi gajah (+245k Long Funds) berisiko aman 10 USC.',
    ],
    sec4QuantEn: [
      'When Funds pile +18,000 weekly contracts into +245,000 Net Longs while 72% of retail accounts crowd Short, trapped retail Buy-Stops above local peaks systematically fuel upside expansion.',
      'Joining the institutional side post-MSS protects small accounts from endless squeeze burnouts.',
    ],
    sec4FormulaId: 'Divergence_Alert = (Ritel_Dominan_Arah_X > 65%)  DAN  (COT_Funds_Net_Delta Berlawanan_Arah)',
    sec4FormulaEn: 'Divergence_Alert = (Retail_Crowd > 65%)  AND  (COT_Fund_Delta_Opposes_Retail)',
    hotspots: makePins(
      ['Non-Commercial (Hedge Fund)', 'Commercials (Produsen / Hedger)', 'Retail Sentiment (>65% Ekstrem)', 'Sinyal Peringatan Divergence'],
      ['Kelompok pencari tren bermodal besar paling menentukan arah aliran COT.', 'Perusahaan tambang atau bank eksportir pengunci nilai di area ekstrem.', 'Akun ritel kecil yang kerap terjebak menumpuk di sisi melawan tren.', 'Lampu hijau untuk mencari konfirmasi teknikal searah gajah institusi.'],
      ['Meniru posisi Commercials secara mentah tanpa paham mereka sedang hedging.', 'Mengikuti mayoritas 75% suara forum ritel menebak pucuk pembalikan.', 'Masuk membabi-buta hari Senin tanpa menunggu konfirmasi teknikal MSS.', 'Melupakan Stop Loss karena mengira posisi COT tidak pernah koreksi.'],
      ['Pantau terus perubahan mingguan Net Long/Short kelompok Non-Commercial.', 'Perhatikan apakah arus spekulatif besar menguat beberapa minggu beruntun.', 'Lihat persentase berlawanan di Radar Retail vs COT halaman Riset JGS.', 'Cari Sweep likuiditas di M15/M5 searah COT dengan risiko tetap 1%.']
    ),
    detective: {
      scenarioId: 'Laporan CFTC COT Jumat lalu memperlihatkan Large Speculators menambah posisi Net Short pada EUR/USD secara signifikan tiga pekan berturut-turut, namun pagi ini 71% akun ritel sedang memasang posisi Buy berharap pantulan naik. Bagaimana sikapmu?',
      scenarioEn: 'Three consecutive weekly COT filings show Hedge Funds increasing Net Shorts in EUR futures while 71% of retail accounts buy hoping for a bottom bounce. Your stance?',
      optionsId: ['Waspada Retail Trap! Tolak Buy impulsif dan fokus mencari konfirmasi Sweep atas -> Bearish MSS -> Sell FVG searah arus COT Institusi.', 'Ikut Buy segera bersama 71% ritel sebelum harganya lari jauh.', 'Menghapus grafik EURUSD dan berjudi koin.'],
      optionsEn: ['High-alert Institutional Divergence! Avoid counter-trend Buy traps and focus strictly on Bearish Killzone MSS setups aligned with COT funds.', 'Join the 71% retail Long crowd immediately.', 'Flip a coin instead.'],
      correctIndex: 0,
      explanationId: 'Bila mayoritas ritel >65% terkumpul melawan arus kenaikan kontrak bersih Hedge Fund di COT, probabilitas terbaik berada di sisi arus institusi setelah konfirmasi teknikal.',
      explanationEn: 'Overcrowded retail bottom-picking opposite steady COT short accumulation creates heavy downward squeeze fuel.',
    },
    essayGuidanceHintsId: [
      'Jelaskan fungsi data mingguan CFTC COT serta perbedaan pemain Non-Commercial (Hedge Fund) vs Ritel.',
      'Uraikan mekanisme mengapa sentimen ritel >65% berlawanan COT menjadi sinyal jebakan likuiditas.',
      'Tunjukkan cara memadukan info COT dengan konfirmasi teknikal 3-Gerbang sebelum entry.',
    ],
    essayGuidanceHintsEn: [
      'Explain official CFTC COT weekly tracking of Large Fund vs Retail positioning.',
      'Detail why >65% opposite retail extremes become contrarian squeeze fuel.',
      'Demonstrate integrating COT bias cleanly into Killzone MSS timing.',
    ],
  },
  'macro-cot-technical-fusion': {
    slug: 'macro-cot-technical-fusion',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Penyatuan tiga pilar konfluensi: Fundamental Makro, Posisi Institusi CFTC COT, & Timing 3-Gerbang M5.',
    photoCaptionEn: 'Institutional Triad confluence aligning Macro Drivers, COT Positioning, and 3-Gate Execution.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Dalam arsitektur dana kuantitatif modern (Lopez de Prado, 2018), keandalan sebuah sinyal meningkat drastis bukan karena satu indikator teknikal rumit, melainkan ketika **fitur lintas disiplin** mengonfirmasi hipotesis yang sama. Strategi makro membutuhkan **alasan nilai** (Fundamental), **bukti arus uang nyata** (CFTC COT), dan **titik eksekusi efisien** (Teknikal 3-Gerbang).',
      'Ketiadaan salah satu pilar membuat analis rentan: teknikal tanpa makro mudah tergilas perubahan kebijakan The Fed mendadak; makro tanpa teknikal membuat trader masuk di posisi buruk dengan Stop Loss terlampau lebar untuk saldo $10.',
      'Penilaian berjenjang JGS (**Grade A+ Triad** -> **Grade B Teknikal Bersih** -> **Skip Tolak Kontradiksi**) membawa ketertiban kelas institusional langsung ke terminal MT5 Cent milikmu.',
    ],
    sec2InstitutionalEn: [
      'Multi-factor fusion cuts false-positive drawdowns sharply when Fundamental Policy, COT Positioning, and Killzone Liquidity Triggers concur.',
      'Separating setups clearly into Grade A+, Grade B, and Skip enforces crisp capital allocation discipline.',
    ],
    anatomyRowsId: [
      ['Langsung mengambil risiko 10% saldo saat ketiga pilar Triad sepakat menyala.', 'Menjaga batas konstitusi tetap 1% (10 USC) bahkan pada setup Grade A+ terbaik.', 'Kunci ukuran lot lewat kalkulator agar tail risk makro tidak pernah melumpuhkan.'],
      ['Memaksakan transaksi saat sinyal teknikal kecil bertabrakan keras melawan Makro + COT.', 'Menurunkan status ke "Skip" dan membiarkan pasar memilih arah jelas terlebih dulu.', 'Fokuskan eksekusi harian pada aset berkeyakinan sejajar tertinggi di Riset JGS.'],
      ['Mencatat entry hanya berdasar "garis FVG bagus" tanpa rekam jejak makro & COT.', 'Mencatat status skor Fundamental & COT bersama gambar chart di jurnal.', 'Gunakan tab Sinyal & Riset Strategi JGS sebelum membuka MT5 setiap hari.'],
    ],
    anatomyRowsEn: [
      ['Breaching 1% risk caps because an A+ Triad setup "cannot lose".', 'Enforcing immutable 1% (10 USC) limits across every trade tier.', 'Protect survival ruthlessly against unexpected macro tail shocks.'],
      ['Forcing counter-trend technical trades colliding against Macro + COT trends.', 'Marking contradictory setups explicitly as Skip.', 'Allocate scarce energy strictly toward aligned asset trends.'],
      ['Skipping macro/COT notes inside post-trade journaling.', 'Recording full Triad score alongside screenshot proofs.', 'Verify alignment daily inside JGS Research Hub.'],
    ],
    sec4QuantId: [
      'Mari kita buktikan angka Expectancy peningkatan kualitas filter Triad pada akun 1.000 USC. Jika strategi teknikal murni menghasilkan win rate `40%` dengan rata-rata reward `1:2,5`, nilai Expectancy = `(0,40 x 2,5R) - (0,60 x 1R) = +0,40R` per transaksi.',
      'Dengan membuang setup berlawanan arah Fundamental & COT memakai saringan Triad JGS hingga akurasi naik konservatif menjadi `52%` pada target `1:2,5` tetap, Expectancy melonjak menjadi `(0,52 x 2,5R) - (0,48 x 1R) = +0,82R`, artinya **pertumbuhan ekuitas lebih dari dua kali lipat** tanpa menambah satu sen pun risiko kerugian per trade!',
      'Inilah puncak rekayasa finansial bagi pemodal kecil: tingkatkan ketajaman penyaringanmu, pertahankan sabuk pengaman `10 USC` tidak tergoyahkan.',
    ],
    sec4QuantEn: [
      'Filtering setups via Macro + COT alignment to lift conservative win rates from 40% to 52% at 1:2.5 R:R more than doubles mathematical Expectancy from +0.40R to +0.82R, while holding risk frozen at 10 USC.',
      'Superior filtering delivers exponential growth without enlarging account drawdown exposure.',
    ],
    sec4FormulaId: 'Expectancy_Triad = (WinRate_Terfilter x 2,5R) - (LossRate x 1,0R)  |  Risk_Tetap = 1% (10 USC)',
    sec4FormulaEn: 'Triad_Expectancy = (Filtered_WinRate x 2.5R) - (LossRate x 1.0R)  |  Cap = 1% (10 USC)',
    hotspots: makePins(
      ['Lapisan 1: Kompas Fundamental (WHY)', 'Lapisan 2: Arus COT Institusi (WHO)', 'Lapisan 3: Pemicu M5 Killzone (WHEN)', 'Konstitusi Abadi: 1% Risk Cap'],
      ['Kebijakan suku bunga & US10Y memberi dorongan tren multi-minggu.', 'Laporan mingguan CFTC membuktikan modal besar berada di sisi kita.', 'Sweep + MSS + FVG menyempitkan Stop Loss di jam likuiditas optimal.', 'Menjaga akun $10 kebal bahkan bila kejutan geopolitik menghantam.'],
      ['Mencari konfirmasi gambar acak tanpa mempedulikan tren bunga dunia.', 'Berdiri bersama kerumunan 75% ritel melawan posisi dana institusional.', 'Klik Buy/Sell di luar jam Killzone sebelum konfirmasi Displacement MSS.', 'Melanggar aturan risiko ke 25% karena yakin sinyal A+ pasti menang.'],
      ['Audit Radar Fundamental di awal minggu sebelum menandai chart.', 'Verifikasi tidak ada benturan tajam terhadap arah aliran COT di Riset JGS.', 'Tunggu sabar di H1/M15 dan eksekusi hanya di konfirmasi M5 Killzone.', 'Selalu tekan tombol Calculate Lot sebelum mengirim pesanan ke broker.']
    ),
    detective: {
      scenarioId: 'Skor Fundamental Emas berada di +78 (Bullish, Fed Dovish & US10Y turun), Hedge Fund di COT terus menimbun Net Long (+210k), sentimen ritel terjebak 69% Short, DAN di London Open M5 XAUUSD baru saja Sweep Asian Low + Bullish MSS menyentuh FVG. Peringkat & besaran risikomu?',
      scenarioEn: 'Gold Fundamental reads +78 Bullish, COT Funds accumulate +210k Net Longs while 69% Retail hold Shorts, AND London Open M5 just completed Asian Low Sweep + Bullish MSS inside an FVG. Grade & risk?',
      optionsId: ['Grade A+ Institutional Triad! Eksekusi tenang dengan risiko TETAP 1% (10 USC) dan SL struktural di bawah sweep.', 'Grade A+ berarti boleh bertaruh 50% saldo (500 USC) sekaligus.', 'Tolak karena semua syarat terlalu sempurna.'],
      optionsEn: ['Grade A+ Institutional Triad! Execute cleanly keeping immutable 1% (10 USC) structural risk protection.', 'Grade A+ authorizes an all-in 500 USC (50%) gamble.', 'Reject immediately.'],
      correctIndex: 0,
      explanationId: 'Keselarasan 3 pilar memberi keyakinan kualitas setup tertinggi (Grade A+), namun disiplin 1% risk wajib dijaga demi keamanan jangka panjang.',
      explanationEn: 'Full Triad alignment earns an A+ grade while hard 1% risk protection remains permanently non-negotiable.',
    },
    essayGuidanceHintsId: [
      'Uraikan peran komplementer antara Fundamental (Mengapa), COT (Siapa), dan Teknikal 3-Gerbang (Kapan).',
      'Jelaskan kriteria pembagian setup Grade A+, Grade B, dan Skip.',
      'Tegaskan alasan kuantitatif menjaga batas risiko tetap 1% (10 USC) meski pada setup Grade A+ terbaik.',
    ],
    essayGuidanceHintsEn: [
      'Describe complementary synergy across Macro Policy (Why), COT Positioning (Who), and 3-Gate Execution (When).',
      'Distinguish Grade A+, Grade B, and Skip setup decision rules.',
      'Justify keeping risk strictly pinned at 1% (10 USC) even on Grade A+ setups.',
    ],
  },
};
