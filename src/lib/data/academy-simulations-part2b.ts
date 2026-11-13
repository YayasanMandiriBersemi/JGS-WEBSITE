import type { ModuleGuidedSimulation } from './academy-simulations-part1';

export const SIMULATIONS_PART_2B: Record<string, ModuleGuidedSimulation> = {
  // SEM 16
  'understanding-cpi-nfp-fomc-wib': {
    titleId: 'Kuis Kompas News: Logika Terbalik Initial Jobless Claims & NFP WIB',
    titleEn: 'Macro News Compass Drill: Decoding Inverse Jobless Claims & NFP',
    briefingId: 'Kamis pukul 19:30 WIB rilis US Initial Jobless Claims: Prediksi 215K, Aktual melompat tinggi menjadi 248K (makin banyak pelamar pengangguran di AS!).',
    briefingEn: 'Interpret 248K Jobless Claims vs 215K Forecast accurately in real time.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Kompas Pembacaan Berita Merah AS (19:30 / 20:30 WIB)',
      captionEn: 'US High-Impact News Compass Matrix',
      specHeaders: ['Indikator', 'Jika Aktual > Prediksi', 'Dampak DXY & XAUUSD'],
      specRows: [
        ['US CPI / Inflasi', 'Harga barang masih panas -> Bunga lama', 'DXY NAIK / Gold TURUN'],
        ['NFP (Pekerjaan Baru)', 'Tenaga kerja kuat -> Ekonomi tangguh', 'DXY NAIK / Gold TURUN'],
        ['Jobless Claims (Pengangguran)', 'MAKIN BANYAK PENGANGGURAN (LOGIKA TERBALIK!)', 'DXY TURUN / Gold NAIK!'],
      ],
    },
    step1: {
      questionId: 'Saat US Initial Jobless Claims keluar lebih TINGGI (248K vs 215K prediksi), mengapa Indeks Dolar DXY justru MELEMAH dan XAUUSDc NAIK?',
      questionEn: 'Why does a higher-than-expected 248K Initial Jobless Claims print weaken USD and lift Gold?',
      options: [
        { labelId: 'Karena naiknya klaim pengangguran berarti ekonomi melemah sehingga memicu peluang The Fed memotong suku bunga!', labelEn: 'Higher jobless filings signal labor cooling, pushing The Fed toward earlier rate cuts', feedbackId: 'Tepat 100%! Jangan tertipu warna angka lebih besar, pahami arti ekonominya.', feedbackEn: 'Exact inverse jobless reading!' },
        { labelId: 'Karena dolar selalu naik saat angka lebih besar dari prediksi', labelEn: 'Higher numbers always lift USD', feedbackId: 'Itu jebakan terbalik terbesar bagi pemula di setiap Kamis malam!', feedbackEn: 'Classic Thursday night inverse-logic trap!' },
        { labelId: 'Karena data Kamis malam tidak pernah menggerakkan pasar', labelEn: 'Claims carry zero volatility', feedbackId: 'Lonjakan tajam >25K di Jobless Claims rutin memicu reli 100+ pips.', feedbackEn: 'Large claims surprises move FX and Gold rapidly.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pasca kejutan 248K selesai menyapu jarum 10 menit pertama di jam 19:40 WIB, arah mana yang dicari?',
      promptEn: 'Select aligned direction post-10m volatility calm:',
      choices: [
        { id: 'safe', labelId: 'Cari Retest BUY XAUUSDc / EURUSDc di FVG M5 searah pelemahan DXY dengan SL aman 1%', labelEn: 'Seek clean post-spike BUY FVG retest on XAUUSDc / EURUSDc', isSafe: true, riskUsc: 10, rewardUsc: 26, consequenceId: 'Terhindar dari jebakan terbalik dan meraih lanjutan reli Emas +26 USC!', consequenceEn: 'Clean macro follow-through gained +26 USC.' },
        { id: 'risky', labelId: 'Klik SELL XAUUSDc seketika karena melihat angka 248K lebih besar dari 215K', labelEn: 'Short Gold purely seeing 248 > 215', isSafe: false, riskUsc: 15, rewardUsc: 0, consequenceId: 'Melawan arah makro langsung terkena sapuan naik!', consequenceEn: 'Faded genuine dovish Gold momentum!' },
      ],
    },
    step3: {
      outcomeTitleId: 'Logika Berita Ekonomi Terkuasai',
      outcomeTitleEn: 'Inverse News Compass Cleared',
      outcomeBodyId: 'Memahami apakah berita tersebut kabar baik atau buruk bagi suku bunga menyelamatkanmu dari arah terbalik.',
      outcomeBodyEn: 'Decoded macro meaning rather than raw color cues.',
      jessyLineId: 'Wah keren! Sekarang kamu nggak bakal kejebak Jobless Claims Kamis malam lagi!',
      jessyLineEn: 'No more Thursday night inverse-claim mistakes!',
    },
  },
  'pre-news-spread-hmr-blackout': {
    titleId: 'Simulasi Dampak HMR & Spread 6x Saat Menekan Order di Menit Rilis Berita',
    titleEn: 'HMR Leverage Squeeze & Spread Expansion Survival Simulation',
    briefingId: 'Pukul 19:29 WIB (1 menit sebelum NFP). Leverage akun sementara diturunkan broker lewat protokol HMR dan spread XAUUSDc melebar dari 18 poin menjadi 110 poin.',
    briefingEn: 'Observe why minute-zero straddles blow micro 1,000 USC balances cleanly.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Lonjakan Biaya Spread & Margin Saat Menit Rilis Berita Merah (WIB)',
      captionEn: 'Live Pre-News Spread & Margin Cost Spike',
      bars: [
        { label: 'Sesi Normal (15:00 WIB)', value: 18, unit: 'poin spread', tone: 'green' },
        { label: 'Blackout HMR (19:29 WIB)', value: 110, unit: 'poin spread', tone: 'red' },
        { label: 'Pasca Tenang (19:45 WIB)', value: 22, unit: 'poin spread', tone: 'blue' },
      ],
    },
    step1: {
      questionId: 'Mengapa memasang jaring jebakan Buy Stop + Sell Stop tepat jam 19:29 WIB pada modal Rp160.000 hampir pasti berakhir rugi ganda?',
      questionEn: 'Why do minute-zero news straddle traps fail brutally on micro accounts?',
      options: [
        { labelId: 'Spread raksasa + jarum whipsaw mengaktifkan Buy Stop DAN Sell Stop berurutan dengan slippage jauh di luar SL!', labelEn: 'Extreme spread widening + two-way whipsaws fill both sides at slipped worst prices', feedbackId: 'Benar sekali! Ditambah aturan HMR yang menahan free margin akun kecil.', feedbackEn: 'Exact HMR + whipsaw autopsy!' },
        { labelId: 'Karena MT5 otomatis mengganti simbol ke EURUSD', labelEn: 'Terminals switch tickers randomly', feedbackId: 'Simbol tetap sama, spread & volatilitas instan yang merusak harga eksekusi.', feedbackEn: 'Spreads and liquidity vacuums distort fills.' },
        { labelId: 'Karena profit dibatasi 1% oleh internet', labelEn: 'Bandwidth caps profits', feedbackId: 'Bukan bandwidth, murni tipisnya order book penyedia likuiditas.', feedbackEn: 'Thin news-minute books cause slippage.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Jam menunjukkan 19:25 WIB jelang rilis CPI. Tindakan wajib strategis JGS:',
      promptEn: 'Enforce JGS Pre-News Blackout Rule:',
      choices: [
        { id: 'safe', labelId: 'Kosongkan posisi berisiko / Tunggu lewat -15 menit s/d +10 menit sampai spread kembali normal 22 poin', labelEn: 'Stand completely flat across -15m/+10m until spreads normalize', isSafe: true, riskUsc: 0, rewardUsc: 25, consequenceId: 'Akun 1.000 USC selamat 100% dari badai whipsaw dan siap masuk di harga wajar pukul 19:45!', consequenceEn: 'Preserved full equity cleanly past initial release noise.' },
        { id: 'risky', labelId: 'Pasang Buy Stop + Sell Stop berjarak 20 poin di atas dan bawah harga sekarang pukul 19:29 WIB', labelEn: 'Deploy tight pre-news straddle stops at 19:29', isSafe: false, riskUsc: 32, rewardUsc: 0, consequenceId: 'Kedua jaring terseret spread & slippage sekaligus memotong -32 USC (-Rp5.200)!', consequenceEn: 'Double whipsaw triggered severe negative slippage.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Tameng Blackout Berita Berfungsi',
      outcomeTitleEn: 'HMR Spread Shield Verified',
      outcomeBodyId: 'Menghormati aturan jeda -15m/+10m membuang penyebab kerugian terbesar trader ritel di hari berita.',
      outcomeBodyEn: 'Bypassed release slippage seamlessly.',
      jessyLineId: 'Cerdas! Menit ke-0 itu arena taruhan, menit ke-15 itu arena strategis!',
      jessyLineEn: 'Minute-zero belongs to gamblers; minute-15 belongs to us!',
    },
  },
  'post-news-displacement-sniper': {
    titleId: 'Taktik Sniper Pasca Berita 19:45 WIB: Memanfaatkan Sapuan Awal & FVG',
    titleEn: 'Post-News Sniper Entry: Trading 15 Minutes After Red Whipsaw',
    briefingId: 'Pada pukul 19:30 WIB rilis NFP sempat menyapu atas ke 3992 sekejap, namun pukul 19:42 WIB candle M5 menutup merah deras turun hingga 3977 meninggalkan FVG di 3983-3986.',
    briefingEn: 'Enter smoothly on post-NFP bearish displacement pullback once spreads calm.',
    visual: {
      kind: 'CANDLE_CHART',
      captionId: 'Whipsaw 19:30 Menipu Naik -> Displacement Asli Turun Membentuk FVG 3984',
      captionEn: 'Post-News Whipsaw High Reversal Into Clean Bearish FVG',
      candles: [
        { o: 3984, h: 3992, l: 3983, c: 3985, lbl: '19:30 Spike' },
        { o: 3985, h: 3986, l: 3976.5, c: 3977, lbl: '19:40 Arah Asli!' },
        { o: 3977, h: 3985, l: 3976.8, c: 3984, lbl: 'Retest FVG' },
        { o: 3984, h: 3984.5, l: 3969, c: 3970, lbl: 'Lanjut Turun' },
      ],
      zoneLabelA: 'Puncak Tipuan 19:30 (3992)',
      zoneLabelB: 'Sell Limit FVG Tenang (3984.5)',
      zoneLabelC: 'Target Bawah Bersih (3970)',
    },
    step1: {
      questionId: 'Mengapa menunggu FVG pasca berita pukul 19:45 WIB memberi rasio menang jauh lebih tinggi dibanding menebak di 19:30?',
      questionEn: 'Why do post-news FVG retests yield sharply higher accuracy than minute-zero trades?',
      options: [
        { labelId: 'Arah dana institusional yang asli sudah terkonfirmasi menutup badan M5 dan spread kembali tipis normal', labelEn: 'Real institutional direction is firmly stamped via body closes under calm spreads', feedbackId: 'Betul 100%! Kamu tinggal menjemput harga diskon searah tren berita baru.', feedbackEn: 'Spot on post-news sniper discipline!' },
        { labelId: 'Karena berita sudah berakhir hari itu', labelEn: 'Market freezes afterwards', feedbackId: 'Justru tren pasca berita sering meluncur berjam-jam sepanjang sesi NY!', feedbackEn: 'Post-news flows regularly trend across the entire NY afternoon.' },
        { labelId: 'Karena broker memberi bonus', labelEn: 'Rebates apply after 19:45', feedbackId: 'Bukan bonus, murni keunggulan konfirmasi dan spread normal.', feedbackEn: 'Strictly superior spread and structural clarity.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Atur eksekusi Sniper pasca berita pada akun Rp160.000 (1.000 USC):',
      promptEn: 'Deploy clean post-news Limit:',
      choices: [
        { id: 'safe', labelId: 'Pasang Sell Limit di FVG 3984.50 (SL aman 3989.50 = 50p) • 0.02 Lot menuju 3970 (+29 USC)', labelEn: 'Sell Limit 3984.50, 50p SL, eyeing 3970 (+29 USC)', isSafe: true, riskUsc: 10, rewardUsc: 29, consequenceId: 'Terisi tenang dengan spread 20 poin dan meluncur +145 pips (+29 USC / +Rp4.700)!', consequenceEn: 'Clean zero-slippage post-news trade delivered +29 USC!' },
        { id: 'risky', labelId: 'Sudah duluan Sell Market di ujung lembah 3977.00 tanpa menunggu pullback FVG', labelEn: 'Chase bottom blindly at 3977.00', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Tersapu tarikan balik wajar ke 3984.50 sebelum harga turun membuahkan hasil.', consequenceEn: 'Pulled right out by normal FVG rebalance.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Sniper Pasca-Berita Berhasil',
      outcomeTitleEn: 'Post-News Sniper Execution Verified',
      outcomeBodyId: 'Sabar membiarkan badai reda lalu memetik FVG arah sebenarnya memberi hasil tertinggi dalam seminggu.',
      outcomeBodyEn: 'Captured clean directional expansion after initial noise settled.',
      jessyLineId: 'Taktik idaman nih! Aman dari slippage, dapet tren kenceng pula!',
      jessyLineEn: 'Calm spreads + big directional velocity!',
    },
  },

  // SEM 17
  'gold-cent-vs-silver-50x-trap': {
    titleId: 'Uji Bobot Kontrak: XAUUSDc (1 Oz) vs Jebakan Perak XAGUSDc (50 Oz)',
    titleEn: 'Metal Contract Trap Audit: Gold Cent 1 oz vs Silver 50 oz Multiplier',
    briefingId: 'Pada akun 1.000 USC (batas 1% = 10 USC), 0.01 lot XAUUSDc menggerakkan $0.01 per $1 gerak emas. Namun di server yang sama, 1 lot XAGUSDc bernilai 50 oz sehingga 0.01 lot = 0.5 oz!',
    briefingEn: 'Compute equity risk difference between 0.01 Cent Gold vs 0.01 Cent Silver.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Perbandingan Spesifikasi Nyata Emas vs Perak pada 0.01 Cent Lot',
      captionEn: 'Actual Risk Exposure on Identical 0.01 Cent Volume',
      specHeaders: ['Pasangan Logam', 'Isi 0.01 Cent Lot', 'Rugi Saat Harga Gerak $0.50'],
      specRows: [
        ['XAUUSDc (Emas 1 oz/lot)', '0.01 troy ounce', '0.5 USC (Rp81 • Super Ringan!)'],
        ['XAGUSDc (Perak 50 oz/lot)', '0.50 troy ounce (50x!)', '25 USC (Rp4.060 • Langsung 2.5%!)'],
        ['Aturan Keselamatan JGS', 'Wajib cek Spec dulu', 'Hindari XAG bila SL > $0.20'],
      ],
    },
    step1: {
      questionId: 'Mengapa memakai volume SAMA (0.02 Cent Lot) pada Perak XAGUSDc bisa 50 kali lebih cepat menghabiskan modal dibanding XAUUSDc?',
      questionEn: 'Why can identical 0.02 lot clicks blow accounts dramatically faster on Silver vs Gold?',
      options: [
        { labelId: 'Karena Contract Size XAGUSDc sering 50x lebih berat (50 oz) daripada XAUUSDc (1 oz) sehingga gerak kecil bernilai besar', labelEn: 'Silver contracts commonly weigh 50 oz/lot versus Gold 1 oz/lot on Cent servers', feedbackId: '100% Tepat! Selalu periksa kotak Specification di MT5 sebelum berpindah instrumen.', feedbackEn: 'Exact Contract Specification insight!' },
        { labelId: 'Karena perak berwarna abu-abu', labelEn: 'Metal color variance', feedbackId: 'Bukan warna logam, melainkan ukuran Contract Size resmi.', feedbackEn: 'Strictly contract multiplier math.' },
        { labelId: 'Karena leverage perak 1:2', labelEn: 'Fixed 1:2 leverage', feedbackId: 'Bukan leverage semata, melainkan nilai per dolar pergerakan (tick value).', feedbackEn: 'Tick exposure scales directly with oz weight.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Saldo 1.000 USC (maks 10 USC risiko) dengan kebutuhan SL Silver $0.40. Apa keputusan benar?',
      promptEn: 'Handle Silver setup needing $0.40 stop on 1,000 USC:',
      choices: [
        { id: 'safe', labelId: 'TOLAK XAGUSDc ($0.40 x 0.5 oz = 20 USC = 2%!) -> Pindah fokus ke XAUUSDc 0.02 Lot!', labelEn: 'Reject overweight Silver trade -> Trade 0.02 Gold safely', isSafe: true, riskUsc: 10, rewardUsc: 26, consequenceId: 'Menghindari jebakan 50x Silver dan mengeksekusi XAUUSDc aman 1% (+26 USC)!', consequenceEn: 'Dodged 50x Silver over-risk and earned +26 USC safely.' },
        { id: 'risky', labelId: 'Paksakan 0.04 Cent Lot XAGUSDc karena mengira harganya cuma $46 masih murah', labelEn: 'Size 0.04 Silver blindly', isSafe: false, riskUsc: 80, rewardUsc: 20, consequenceId: 'Satu tarikan napas Silver $0.40 membabat 80 USC (8% saldo) dalam hitungan menit!', consequenceEn: 'Unchecked 50x contract shredded 8% equity instantaneously.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Jebakan Kontrak 50x Terhindari',
      outcomeTitleEn: 'Silver 50x Trap Bypassed Cleanly',
      outcomeBodyId: 'Membiasakan cek Contract Size setiap kali buka pair baru menjaga keamanan 1% tetap utuh.',
      outcomeBodyEn: 'Verified exact symbol weights before sizing lots.',
      jessyLineId: 'Mantap! Banyak pemula kaget pas main Silver, sekarang kamu sudah kebal duluan!',
      jessyLineEn: 'Contract awareness protects you permanently!',
    },
  },
  'nasdaq-ustec-momentum-playbook': {
    titleId: 'Playbook Indeks AS (Nasdaq / USTEC): Aturan Sabar Bel Buka 20:30–20:45 WIB',
    titleEn: 'Nasdaq / USTEC Cash Open Playbook (20:30-20:45 WIB Opening Range)',
    briefingId: 'Pukul 20:30 WIB bel pembukaan bursa saham Wall Street berbunyi. 10 menit pertama Nasdaq melompat naik-turun liar 65 poin menyapu High dan Low malam sebelumnya.',
    briefingEn: 'Wait past the 20:30-20:45 WIB Opening Range noise before entering Nasdaq.',
    visual: {
      kind: 'TIMELINE_CLOCK',
      captionId: 'Jadwal Eksekusi Indeks Nasdaq (USTEC) / US30 Malam Hari WIB',
      captionEn: 'US Equity Cash Open Sequence (WIB)',
      clockSlots: [
        { wib: '20:30 - 20:45 WIB', title: '15 Menit Bel Buka (Opening Range)', spreadLabel: 'Liars & Whipsaw', status: 'DANGER' },
        { wib: '20:45 - 22:30 WIB', title: 'Puncak Tren Bersih Wall Street', spreadLabel: 'Struktur FVG Jelas', status: 'SAFE' },
        { wib: '03:45 WIB', title: 'Tutup Posisi Pra-Rollover', spreadLabel: 'Bebas Swap', status: 'NEUTRAL' },
      ],
    },
    step1: {
      questionId: 'Mengapa aturan emas JGS melarang menekan tombol pada pukul 20:30–20:45 WIB di USTEC / US30?',
      questionEn: 'Why remain completely hands-off on NAS100 across 20:30-20:45 WIB?',
      options: [
        { labelId: 'Untuk membiarkan antrean pembukaan saham kas Wall Street selesai bertabrakan sebelum tren asli terbentuk jam 20:45', labelEn: 'Cash equity opening imbalances create erratic Judas spikes until 20:45 Range settles', feedbackId: '100% Benar! Begitu pukul 20:45 Opening Range High/Low selesai, arah Nasdaq jadi sangat rapi.', feedbackEn: 'Exact Wall Street cash-open blueprint!' },
        { labelId: 'Karena bursa Nasdaq tutup jam 20:30', labelEn: 'Nasdaq closes at 20:30', feedbackId: 'Justru pukul 20:30 WIB adalah detik pembukaan bursa saham AS.', feedbackEn: '20:30 WIB marks the exact NYSE opening bell.' },
        { labelId: 'Karena nilai poin selalu berubah acak', labelEn: 'Ticks randomize nightly', feedbackId: 'Volatilitas awal yang menyapu kedua sisi adalah sebab utamanya.', feedbackEn: 'Initial opening stop runs cause rapid reversals.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pukul 20:50 WIB batas bawah Opening Range tersapu ke bawah lalu M5 menutup kuat balik naik disertai FVG. Aksi:',
      promptEn: 'Execute post-20:45 Opening Range reversal:',
      choices: [
        { id: 'safe', labelId: 'Masuk Buy Limit di FVG M5 (Cek Tick Value USTECc agar SL 50 poin tetap <= 10 USC)', labelEn: 'Buy post-20:45 FVG pullback with verified <=10 USC SL', isSafe: true, riskUsc: 9, rewardUsc: 27, consequenceId: 'Menghindar dari guncangan 20:30 dan menunggangi reli Wall Street hingga +150 poin (+27 USC)!', consequenceEn: 'Smooth cash-open continuation hit +27 USC!' },
        { id: 'risky', labelId: 'Langsung Sell Market pukul 20:31 detik pertama saat candle merah menyentuh bawah', labelEn: 'Panic sell 20:31 minute-one opening dip', isSafe: false, riskUsc: 15, rewardUsc: 0, consequenceId: 'Itu hanyalah sapuan Judas pembukaan sebelum Nasdaq berbalik melesat ke atas!', consequenceEn: 'Opening dip reversed immediately onto squeeze highs.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Jam Emas Nasdaq Dikuasai',
      outcomeTitleEn: 'Opening Range Equity Filter Cleared',
      outcomeBodyId: 'Menunggu 15 menit pertama membuat jadwal malam pekerja di USTEC jauh lebih akurat.',
      outcomeBodyEn: 'Clean 20:45 WIB opening discipline verified.',
      jessyLineId: 'Mantap! Jam 20:45 WIB habis makan malam langsung panen rapi di Nasdaq!',
      jessyLineEn: '20:45 WIB patience conquers Nasdaq whipsaws!',
    },
  },
  'fx-pairs-and-crypto-cent-tactics': {
    titleId: 'Korelasi Pair Anti-USD (EURUSD + GBPUSD + XAUUSD) & Spread Akhir Pekan Kripto',
    titleEn: 'USD Correlation Risk Cap & Crypto Weekend Spread Protection',
    briefingId: 'Kamu sudah punya posisi aktif Buy XAUUSDc berisiko 1% (10 USC). Sekarang muncul sinyal Buy bagus di EURUSDc dan GBPUSDc pada menit yang sama.',
    briefingEn: 'Prevent silent 3x correlated USD over-exposure across XAU, EUR, and GBP.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Beban Risiko Dolar Nyata Jika Ketiga Pair Anti-USD Dibuka 1% Bersamaan',
      captionEn: 'True Aggregate Risk Exposure Across Correlated XXX/USD Longs',
      bars: [
        { label: 'Buka XAU saja (1.0%)', value: 1.0, unit: '% risiko nyata', tone: 'green' },
        { label: 'Bagi 0.5% XAU + 0.5% EUR', value: 1.0, unit: '% risiko aman', tone: 'blue' },
        { label: 'Buka Penuh 3 Pair (1% x 3)', value: 3.0, unit: '% BAHAYA USD!', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa membuka penuh 1% Buy XAUUSDc, 1% Buy EURUSDc, dan 1% Buy GBPUSDc bersamaan sangat berisiko saat berita AS muncul?',
      questionEn: 'Why is stacking full 1% Long risks simultaneously on XAUUSD, EURUSD, and GBPUSD risky?',
      options: [
        { labelId: 'Semuanya sama-sama bertaruh USD melemah! Bila DXY mendadak melonjak, ketiganya kena SL bersamaan (-3% sekaligus!)', labelEn: 'All three short USD simultaneously; one USD spike wipes all three stops (-3%) together!', feedbackId: '100% Tepat! Itu risiko tunggal terselubung bukan diversifikasi.', feedbackEn: 'Exact hidden correlation trap!' },
        { labelId: 'Karena MT5 melarang lebih dari 2 jendela', labelEn: 'Terminal window cap', feedbackId: 'MT5 membolehkannya, pengelolaan risiko kita yang wajib mengendalikannya.', feedbackEn: 'Margin engines allow stacking; portfolio math forbids it.' },
        { labelId: 'Karena ketiga pair bergerak ke arah berlawanan', labelEn: 'Inverse pair coupling', feedbackId: 'Justru korelasi ketiganya searah positif kuat terhadap pelemahan Dolar.', feedbackEn: 'Strongly positively correlated opposite DXY.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Jika kamu tetap ingin mengambil sinyal EURUSDc saat XAUUSDc sudah berjalan:',
      promptEn: 'Adjust correlated allocation safely:',
      choices: [
        { id: 'safe', labelId: 'Fokus 1 setup terbaik (XAUUSDc saja 1%) ATAU pecah jadi 0,5% + 0,5% (total tetap 10 USC)', labelEn: 'Cap aggregate Anti-USD exposure strictly at 1% (0.5% + 0.5%)', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Portofolio aman di bawah 1% sekalipun DXY mendadak berbalik!', consequenceEn: 'Total USD exposure remained comfortably bounded inside 1%.' },
        { id: 'risky', labelId: 'Ambil ketiga pair masing-masing 1% penuh karena merasa simbolnya berbeda', labelEn: 'Take 1% on each assuming diversification', isSafe: false, riskUsc: 30, rewardUsc: 10, consequenceId: 'Satu lonjakan tak terduga DXY membabat ketiga posisi sekaligus (-30 USC / -3%)!', consequenceEn: 'Sudden Dollar rally hit all 3 correlated trades simultaneously.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Manajemen Korelasi Portofolio Lulus',
      outcomeTitleEn: 'USD Correlation Guard Cleared',
      outcomeBodyId: 'Kamu mengerti cara membagi kuota risiko pada pair berkorelasi dan mengecek spread kripto akhir pekan.',
      outcomeBodyEn: 'Managed cross-pair exposure under strict single-idea risk limits.',
      jessyLineId: 'Pintar banget! Simbol beda tapi lawannya sama-sama USD itu satu perahu lho!',
      jessyLineEn: 'Different tickers, same USD boat: cap total exposure!',
    },
  },

  // SEM 18
  'reading-macro-fundamental-bias': {
    titleId: 'Menggunakan Radar Fundamental Live Sebagai Filter Arah Harian',
    titleEn: 'Fundamental Bias Filter: Pairing Yield Direction With Chart Execution',
    briefingId: 'Pada tab Radar Bias Fundamental Live, US10Y turun tajam dan skor Emas XAUUSD mencetak +78 (Strong Bullish). Hari ini di M15 muncul dua pilihan: setup Buy tipis & setup Sell counter-trend.',
    briefingEn: 'Weight M15 opportunities dynamically alongside real-time Fundamental Bias.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Skor Bias Fundamental Real-Time Sebelum Membuka Grafik M15',
      captionEn: 'Live Macro Conviction Score Matrix (-100 to +100)',
      bars: [
        { label: 'XAUUSD (Emas Spot)', value: 78, unit: 'Bullish', tone: 'green' },
        { label: 'EURUSD (Euro/USD)', value: 42, unit: 'Moderat', tone: 'blue' },
        { label: 'DXY (Indeks Dolar)', value: -48, unit: 'Bearish', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa setup Buy searah Bias Fundamental +78 jauh lebih sering menembus TP2 daripada setup Sell melawan fundamental?',
      questionEn: 'Why do setups aligned with a +78 Macro Bullish score hit full TP2 targets far more reliably?',
      options: [
        { labelId: 'Karena arus modal obligasi dan bank sentral memberi "angin buritan" yang memperpanjang dorongan naik', labelEn: 'Institutional capital and sovereign bond flows fuel extended directional legs', feedbackId: '100% Benar! Mengikuti angin makro membuat rasio R:R 1:3 jauh lebih realistis.', feedbackEn: 'Exact macro tailwind principle!' },
        { labelId: 'Karena indikator fundamental menggantikan Stop Loss', labelEn: 'Macro bias removes SL needs', feedbackId: 'SL tetap mutlak dipasang pada setiap setup.', feedbackEn: 'Always retain strict Hard Stops.' },
        { labelId: 'Karena harga tidak pernah koreksi saat fundamental naik', labelEn: 'Prices rise in straight vertical lines', feedbackId: 'Koreksi FVG tetap terjadi sebagai titik entri murah searah makro.', feedbackEn: 'Intraday pullbacks supply ideal entry discounts.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Menghadapi skor Emas +78 Bullish di Radar Live, rencana eksekusi mana yang dipilih?',
      promptEn: 'Align daily execution behind +78 Gold bias:',
      choices: [
        { id: 'safe', labelId: 'Fokus HANYA mencari diskon Buy FVG M5/M15 pasca sweep bawah mengincar TP2 1:3', labelEn: 'Focus solely on post-sweep Bullish FVG discounts toward 1:3', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Angin buritan makro mendorong harga melesat lancar tembus TP2 (+30 USC)!', consequenceEn: 'Macro tailwind swept setup cleanly through +30 USC TP2.' },
        { id: 'risky', labelId: 'Cari Sell pucuk melawan tren +78 hanya mengandalkan divergensi kecil M5', labelEn: 'Fade +78 Bullish macro bias strictly from small M5 stall', isSafe: false, riskUsc: 10, rewardUsc: 0, consequenceId: 'Pantulan jual hanya bertahan sebentar sebelum arus beli institusional menembus puncak!', consequenceEn: 'Counter-macro fade got steamrolled swiftly.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Berlayar Searah Angin Makro',
      outcomeTitleEn: 'Macro Tailwind Alignment Mastered',
      outcomeBodyId: 'Memeriksa tab Bias Fundamental sebelum membuka grafik memangkas risiko berhadapan dengan tren utama.',
      outcomeBodyEn: 'Filtered against counter-macro traps cleanly.',
      jessyLineId: 'Enak kan kalau anginnya dorong dari belakang? Nggak perlu ngoyo lawan badai!',
      jessyLineEn: 'Trading with macro winds behind you feels effortless!',
    },
  },
  'cftc-cot-vs-retail-sentiment': {
    titleId: 'Detektor Divergensi COT Asli: 220rb Kontrak Long Institusi vs Jebakan Ritel',
    titleEn: 'Live CFTC COT Contrarian Detector: Funds Long vs Retail Short Crowd',
    briefingId: 'Data API CFTC resmi pekan ini mencatat Hedge Fund di COMEX memegang 74% posisi Long Emas (+220rb kontrak) sementara spekulan ritel 72% sibuk menahan Short berharap emas jatuh.',
    briefingEn: 'Apply live official CFTC Futures positioning against crowded retail sentiment.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Perbandingan Data Posisi Resmi CFTC (Emas COMEX #088691)',
      captionEn: 'Official CFTC Futures Positioning Ratio (COMEX Gold)',
      bars: [
        { label: 'Institusi COT Long', value: 74, unit: '% Long', tone: 'green' },
        { label: 'Ritel Kecil Short', value: 72, unit: '% Short', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Mengapa divergensi ekstrem (>65% ritel bertaruh lawan arah mayoritas Hedge Fund COT) menjadi sinyal peringatan besar?',
      questionEn: 'Why is extreme divergence (>65% retail opposing heavy institutional CFTC longs) so decisive?',
      options: [
        { labelId: 'Ritel yang terjebak rugi Short di atas akan terpaksa Cut Loss (berubah jadi Buy) yang justru mendorong harga naik lebih tinggi!', labelEn: 'Trapped retail Shorts rushing to cover create forced Buy pressure accelerating institutional uptrends', feedbackId: '100% Akurat! Inilah bahan bakar Short Squeeze klasik yang bisa dibaca dari data publik CFTC.', feedbackEn: 'Exact Short-Squeeze COT mechanics!' },
        { labelId: 'Karena laporan CFTC memaksa harga diam', labelEn: 'Reports freeze prices', feedbackId: 'Laporan tiap akhir pekan ini merangkum posisi nyata kontrak berjangka aktif.', feedbackEn: 'Reflects active futures liquidity exposure.' },
        { labelId: 'Karena ritel selalu benar melawan Hedge Fund', labelEn: 'Retail crowds consistently outsmart COMEX desks', feedbackId: 'Secara statistik historis, kerumunan ritel paling berat berada di sisi salah saat divergensi ekstrem.', feedbackEn: 'Extreme retail crowding heavily aligns with turning exhaustion.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Melihat Institusi COT 74% Long dan Ritel 72% Short di Gold, keputusan trading terbaik minggu ini:',
      promptEn: 'Align with live CFTC institutional skew:',
      choices: [
        { id: 'safe', labelId: 'Ikuti sisi Hedge Fund (cari Buy FVG di bawah sapuan SSL) dan JANGAN ikut kerumunan ritel menebak puncak Sell', labelEn: 'Align beside COT Fund Longs on SSL sweep pullbacks', isSafe: true, riskUsc: 10, rewardUsc: 28, consequenceId: 'Menunggangi short-squeeze ritel menghasilkan +28 USC mulus!', consequenceEn: 'Caught institutional momentum cleanly.' },
        { id: 'risky', labelId: 'Ikut 72% kerumunan ritel terus-menerus membuka posisi Sell karena harga terasa "sudah terlalu tinggi"', labelEn: 'Join 72% retail shorts guessing tops', isSafe: false, riskUsc: 20, rewardUsc: 0, consequenceId: 'Terkena dua kali Stop Loss beruntun saat harga mencetak rekor baru!', consequenceEn: 'Fading institutional longs triggered consecutive stopouts.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Navigasi Data CFTC COT Resmi Berhasil',
      outcomeTitleEn: 'Official CFTC Positioning Cleared',
      outcomeBodyId: 'Kamu tahu cara memeriksa laporan publik CFTC tiap minggu agar tidak berada di kerumunan yang salah.',
      outcomeBodyEn: 'Used authentic government futures data to filter trade bias.',
      jessyLineId: 'Bayangin, data resmi pemerintah AS ini gratis tapi banyak yang malas baca! Keren kamu sudah paham!',
      jessyLineEn: 'Free official CFTC reports give massive clarity!',
    },
  },
  'macro-cot-technical-fusion': {
    titleId: 'Simulasi Fusi Triad Lengkap: Makro (+78) + COT (74% Long) + 3-Gate M5',
    titleEn: 'Complete Triad Fusion Lab: Macro + COT + Technical Confirmation',
    briefingId: 'Semua lapisan sejajar hari ini: Bias Fundamental Bullish (+78), COT Hedge Fund Long (74%), plus M5 London Killzone menyapu SSL 3972 lalu menutup MSS naik + FVG.',
    briefingEn: 'Execute full Institutional Triad alignment under 1,000 USC risk shield.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Checklist Lengkap Fusi Triad Institusional JGS',
      captionEn: 'Full 3-Layer Institutional Alignment Verification',
      specHeaders: ['Lapisan Analisis', 'Hasil Verifikasi Hari Ini', 'Nilai Konfirmasi'],
      specRows: [
        ['1. Bias Makro Live', 'US10Y Turun & Emas Bullish (+78)', 'SAH (Angin Naik)'],
        ['2. Laporan CFTC COT', 'Hedge Fund 74% Long vs 72% Ritel Short', 'SAH (Dukungan Dana)'],
        ['3. Teknikal 3-Gerbang', 'London Sweep -> M5 MSS -> FVG 3976.50', 'SAH EKSEKUSI 1%'],
      ],
    },
    step1: {
      questionId: 'Mengapa tingkat keyakinan eksekusi melonjak drastis saat Ketiga Pilar (Makro + COT + 3-Gate M5) selaras 100%?',
      questionEn: 'Why does combining Macro + COT + 3-Gate M5 elevate execution conviction significantly?',
      options: [
        { labelId: 'Alasan fundamental, aliran dana berjangka, dan timing presisi mikro semuanya menunjuk ke satu pintu yang sama', labelEn: 'Fundamental backdrop, futures positioning, and intraday entry timing converge synchronously', feedbackId: 'Tepat! Tetap kunci risiko maksimal 1% karena pasar tidak pernah 100% pasti, hanya probabilitas unggul.', feedbackEn: 'Exact probabilistic institutional convergence!' },
        { labelId: 'Karena tidak mungkin kena Stop Loss selamanya', labelEn: 'Guarantees 100% win rate forever', feedbackId: 'Hati-hati! Tidak ada kepastian 100% di pasar, disiplin 1% SL tetap wajib.', feedbackEn: 'Risk sizing stays mandatory regardless of score.' },
        { labelId: 'Karena boleh memakai lot 10x lipat', labelEn: 'Allows 10x leverage violations', feedbackId: 'Risiko maksimal tetap konsisten di <=1% per setup.', feedbackEn: 'Never breach 1% capital limits.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Kirim order Fusi Triad pada 1.000 USC dengan disiplin ukuran maksimal:',
      promptEn: 'Deploy verified Triad ticket cleanly:',
      choices: [
        { id: 'safe', labelId: 'Buy Limit 3976.50 • SL 3971.50 (50p) • 0.02 Cent Lot (10 USC = 1%) • Target +30 USC (1:3)', labelEn: 'Buy Limit 3976.50, 0.02 Cent Lot, 10 USC SL aiming +30 USC', isSafe: true, riskUsc: 10, rewardUsc: 30, consequenceId: 'Terisi mulus dan menuntaskan +30 USC (+Rp4.875) dengan ketenangan penuh!', consequenceEn: 'Textbook Triad alignment achieved full +30 USC target!' },
        { id: 'risky', labelId: 'Merasa sudah terlalu yakin 100% lalu naikkan risiko jadi 15% (150 USC / 0.30 Lot)', labelEn: 'Bet 15% account size out of overconfidence', isSafe: false, riskUsc: 150, rewardUsc: 300, consequenceId: 'Melanggar konstitusi risiko! Bila kebetulan muncul berita tak terduga, sekali SL memangkas 15% akun.', consequenceEn: 'Overconfidence violates strict 1% longevity math.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Triad Institusional Tereksekusi Sempurna',
      outcomeTitleEn: 'Triad Institutional Fusion Cleared',
      outcomeBodyId: 'Keyakinan tinggi + ukuran lot tetap 1% = kombinasi terkuat pertumbuhan akun jangka panjang.',
      outcomeBodyEn: 'Balanced high-conviction analysis with invariant 1% risk caps.',
      jessyLineId: 'Luar biasa! Makro + COT + M5 presisi, tinggal jaga 1% tetap sakral!',
      jessyLineEn: 'Macro + COT + 3-Gate timing at strict 1% risk = unstoppable!',
    },
  },

  // SEM 19
  'quant-finance-simons-sharpe-martingale': {
    titleId: 'Pembuktian Ledakan Martingale vs Expectancy Positif Ber-SL Tetap',
    titleEn: 'Expectancy Lab: Proving Exponential Martingale Ruin vs Fixed 1% Math',
    briefingId: 'Sistem A (Fixed 1% SL, Win Rate 45%, R:R 1:2.5) vs Sistem B (Martingale 0.01 -> 0.02 -> 0.04 -> 0.08 -> 0.16 tanpa SL). Lihat apa yang terjadi saat muncul 6 candle tren tanpa koreksi!',
    briefingEn: 'Stress-test Fixed 1% Expectancy against exponential Martingale lot doubling.',
    visual: {
      kind: 'EQUITY_CURVE',
      captionId: 'Kurva Ekuitas Saat Terjadi 1 Tren Kuat Tanpa Koreksi (800 Pips)',
      captionEn: 'Equity Impact Across an 800-Pip One-Way Macro Trend',
      curvePoints: [
        { step: 'Bulan 1', safeVal: 1040, recklessVal: 1080 },
        { step: 'Bulan 2', safeVal: 1090, recklessVal: 1150 },
        { step: 'Bulan 3', safeVal: 1135, recklessVal: 1210 },
        { step: 'Tren 800p', safeVal: 1115, recklessVal: 0 },
      ],
      curveUnit: 'USC',
    },
    step1: {
      questionId: 'Mengapa sistem Martingale/Grid tampak mulus hijau 3 bulan lalu mendadak turun ke 0 USC pada Bulan ke-4?',
      questionEn: 'Why do zero-SL Martingale accounts hold steady profits for months before abrupt zeroing?',
      options: [
        { labelId: 'Karena penggandaan lot eksponensial menanggung kerugian tak terbatas saat pasar tren lurus tanpa pullback', labelEn: 'Exponential doubling absorbs uncapped drawdown until one trend breaches 100% margin', feedbackId: 'Benar! Rumus Expectancy positif wajib membatasi kerugian terburuk dengan Hard SL.', feedbackEn: 'Exact mathematical tail-risk autopsy!' },
        { labelId: 'Karena profitnya melebihi kapasitas komputer', labelEn: 'Database integer overflow', feedbackId: 'Margin habis nyata akibat penumpukan floating minus eksponensial.', feedbackEn: 'Exponential floating drawdown drains margin completely.' },
        { labelId: 'Karena win rate 45% pasti rugi', labelEn: '45% win rate guarantees loss', feedbackId: 'Dengan R:R 1:2.5, win rate 45% justru menghasilkan Expectancy super positif (+0.575R per trade)!', feedbackEn: 'At 1:2.5 R:R, 45% win rate produces strong positive expectancy!' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Pilih arsitektur sistem kuantitatif yang diizinkan berjalan di modal belajar & portofolionya JGS:',
      promptEn: 'Select institutional quantitative risk policy:',
      choices: [
        { id: 'safe', labelId: 'Fixed Fractional 1% Hard SL (Expectancy = (0.45 x 2.5) - 0.55 = +0.575R bersih/trade!)', labelEn: 'Fixed 1% Hard Stop Expectancy (+0.575R expected edge)', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Bertahan mulus melewati tren ekstrem 800 pips (-2% max) lalu lanjut bertumbuh positif!', consequenceEn: 'Survived black-swan trend with 98% equity intact!' },
        { id: 'risky', labelId: 'Aktifkan Grid Martingale 2.0x tanpa Stop Loss mengejar win rate 92%', labelEn: 'Deploy 2x Martingale grid chasing 92% win rate', isSafe: false, riskUsc: 1000, rewardUsc: 80, consequenceId: 'Margin Call 100% pada tren kejut FOMC bulan keempat; seluruh hasil 3 bulan hilang total!', consequenceEn: 'One un-retraced FOMC trend erased entire 4-month equity.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Ilusi Martingale Terbongkar',
      outcomeTitleEn: 'Positive Expectancy Model Verified',
      outcomeBodyId: 'Win rate tinggi tanpa Hard SL hanyalah bom waktu; Expectancy jangka panjang dibangun di atas batas rugi tetap.',
      outcomeBodyEn: 'Embraced bounded-loss asymmetric expectancy over high-winrate illusions.',
      jessyLineId: 'Selamat! Kamu baru saja menyelamatkan tabunganmu dari jutaan iklan bot "anti-loss"!',
      jessyLineEn: 'You just immunized yourself against toxic zero-SL bot hype!',
    },
  },
  'how-expert-advisors-think-vs-martingale-danger': {
    titleId: 'Audit 8 Gerbang MQL5 EA: Overfitting Strategy Tester vs Monte Carlo + Guardian',
    titleEn: 'EA Audit Lab: Exposing Curve-Fitted Backtests vs Walk-Forward Integrity',
    briefingId: 'Sebuah robot dijual dengan hasil Strategy Tester 99% menang selama 4 bulan, memakai mode "Open Prices Only" dan tanpa uji Out-of-Sample. Apakah layak dipercaya?',
    briefingEn: 'Audit suspiciously smooth EA backtest metrics against institutional 8-step validation.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Checklist Audit Algoritma EA Institusional JGS',
      captionEn: 'JGS 8-Stage Algorithmic Verification Standard',
      specHeaders: ['Tahap Pengujian', 'Backtest Penjual Abal-Abal', 'Standar Kuantitatif JGS'],
      specRows: [
        ['Presisi Data Tick', 'Open Prices Only (Halus Palsu)', 'Every Tick Based On Real Ticks'],
        ['Uji Data Baru (OOS)', 'Dioptimasi penuh di 4 bulan sama', 'Walk-Forward Out-of-Sample >5 Tahun'],
        ['Uji Acak Stres', 'Nol Monte Carlo / Tanpa Slippage', '1.000x Monte Carlo + Variasi Spread'],
      ],
    },
    step1: {
      questionId: 'Mengapa backtest "Open Prices Only" selama 4 bulan sangat berbahaya jika dijadikan patokan membeli Expert Advisor?',
      questionEn: 'Why are 4-month "Open Prices Only" MT5 backtests unreliable for real-money trading?',
      options: [
        { labelId: 'Mengabaikan ayunan spread/wick di dalam bar serta sangat mudah dihafalkan parameternya (Overfitting)', labelEn: 'Ignores intra-bar spread/wick triggers and severely overfits brief parameter noise', feedbackId: '100% Tepat! Uji nyata wajib Real-Tick + Out-of-Sample + Monte Carlo + Guardian 3% daily stop.', feedbackEn: 'Exact quantitative validation audit!' },
        { labelId: 'Karena 4 bulan terlalu lama', labelEn: '4 months is overly exhaustive', feedbackId: 'Justru minimal audit sistem butuh 5-10 tahun melintasi beragam rezim ekonomi.', feedbackEn: 'Robust audits demand multi-year diverse regimes.' },
        { labelId: 'Karena EA tidak bekerja di PC', labelEn: 'Desktop terminals block EAs', feedbackId: 'Secara teknis berjalan lancar, masalahnya pada kevalidan statistik parameternya.', feedbackEn: 'Statistical generalization is the decisive flaw.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Jika kamu memakai alat bantu EA di akun Cent 1.000 USC, peran apa yang paling sehat?',
      promptEn: 'Assign legitimate quantitative EA architecture:',
      choices: [
        { id: 'safe', labelId: 'Jadikan EA sebagai Risk Guardian otomatis (Auto-hitung 1% lot + Hard Stop + Kunci rugi harian 3%)', labelEn: 'Deploy EA strictly as automated Risk Guardian (1% sizing + 3% lock)', isSafe: true, riskUsc: 10, rewardUsc: 25, consequenceId: 'Menghilangkan kesalahan jari & over-lot emosional di MT5 sekaligus lulus uji OOS!', consequenceEn: 'Eliminated fat-finger sizing slips cleanly.' },
        { id: 'risky', labelId: 'Instal EA backtest 4 bulan tanpa paham cara kerjanya langsung pada modal tabungan', labelEn: 'Run opaque curve-fitted EA live unchecked', isSafe: false, riskUsc: 1000, rewardUsc: 100, consequenceId: 'Begitu rezim pasar berubah di minggu pertama live, parameter Overfit hancur seketika!', consequenceEn: 'Overfitted curve broke abruptly under live spread variation.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Audit Algoritmik Lulus Sempurna',
      outcomeTitleEn: 'EA & Risk Guardian Audit Passed',
      outcomeBodyId: 'Kamu mengerti bahaya Overfitting dan memanfaatkan automasi paling aman sebagai pelindung risiko.',
      outcomeBodyEn: 'Verified Real-Tick, Walk-Forward, and Risk Guardian priorities.',
      jessyLineId: 'Mantap! Jangan tertipu screenshot ijo MT5 sebelum cek Real-Tick & Monte Carlo!',
      jessyLineEn: 'Always demand Real-Tick + Out-of-Sample proof!',
    },
  },
  'transparent-copy-trading-hwm-architecture': {
    titleId: 'Simulasi High-Water Mark (HWM) 30%: Komisi Adil Tanpa Potongan Ganda',
    titleEn: 'High-Water Mark (HWM) 30% Fee Audit Across Drawdown & Recovery',
    briefingId: 'Modal awal 1.000 USC tumbuh menjadi 1.200 USC (rekor HWM 1.200). Bulan berikutnya turun rugi ke 950 USC, lalu pulih kembali naik ke 1.200 USC, dan akhirnya tembus 1.400 USC.',
    briefingEn: 'Compute exact 30% HWM Performance Fees across growth -> drawdown -> recovery -> new peak.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Rekap Perhitungan Fee Adil Sistem High-Water Mark (HWM = Rekor Puncak)',
      captionEn: 'Transparent 30% High-Water Mark Fee Ledger',
      specHeaders: ['Periode Saldo', 'Status HWM (Puncak)', 'Fee 30% Yang Sah Dibayar'],
      specRows: [
        ['1.000 -> 1.200 USC', 'Rekor HWM Baru = 1.200', '30% x 200 = 60 USC'],
        ['1.200 -> 950 -> 1.200 USC', 'Masa Pemulihan (<= 1.200)', '0 USC! (HARAM POTONG FEE!)'],
        ['1.200 -> 1.400 USC', 'Tembus Rekor Baru (1.400)', '30% x 200 Baru = 60 USC'],
      ],
    },
    step1: {
      questionId: 'Saat saldo pemodal jatuh dari 1.200 ke 950 USC lalu berhasil memulih kembali ke 1.200 USC, berapa Performance Fee HWM yang sah?',
      questionEn: 'When equity recovers from 950 back up to its previous 1,200 USC peak, what HWM fee applies?',
      options: [
        { labelId: 'Rp0 (0 USC)! Karena saldo hanya kembali menambal kerugian lama, belum mencetak keuntungan bersih baru di atas HWM 1.200', labelEn: '$0 (0 USC) strictly, because recovery has not generated new profit above 1,200 HWM', feedbackId: 'Tepat 100%! HWM melindungi investor agar pengelola tidak memungut fee ganda atas profit yang pernah dibayar.', feedbackEn: 'Exact High-Water Mark fairness law!' },
        { labelId: '30% x 250 = 75 USC dari pemulihan 950 ke 1.200', labelEn: 'Charge 30% on 950 -> 1,200 recovery', feedbackId: 'Itu pencurian terselubung bila dilakukan tanpa High-Water Mark!', feedbackEn: 'Charging recovery fees double-taxes losses unfairly.' },
        { labelId: '50% tetap bulanan', labelEn: '50% flat monthly charge', feedbackId: 'Sistem transparan hanya memungut atas Net New High.', feedbackEn: 'Fairness relies strictly on Net New High watermarks.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Setelah kembali ke 1.200 USC dan akhirnya tumbuh mencetak puncak baru 1.400 USC, hitung fee sah 30% HWM:',
      promptEn: 'Verify exact fee on Net New High (1,200 -> 1,400 USC):',
      choices: [
        { id: 'safe', labelId: 'Cuma 30% x (1.400 - 1.200) = 60 USC! Investor tetap mengantongi 140 USC bersih baru!', labelEn: '30% x 200 Net New Profit = 60 USC cleanly', isSafe: true, riskUsc: 0, rewardUsc: 140, consequenceId: 'Transparan 100%: investor memperoleh +140 USC bersih tanpa biaya siluman saat drawdown!', consequenceEn: 'Clean aligned incentive without double-charging.' },
        { id: 'risky', labelId: 'Ikut Copy Trading sistem pembagian komisi harian tanpa HWM & memakai multiplier lot tak seimbang', labelEn: 'Join opaque daily fee copy pool lacking HWM', isSafe: false, riskUsc: 150, rewardUsc: 50, consequenceId: 'Saldo terpotong biaya setiap ada kenaikan sesaat meski portofolio keseluruhan masih minus.', consequenceEn: 'Unfair reset fees drained capital steadily.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Audit Kejujuran High-Water Mark Lulus',
      outcomeTitleEn: 'HWM Fee Architecture Cleared',
      outcomeBodyId: 'Kamu mengerti standar integritas industri pengelolaan modal yang melindungi pemodal kecil maupun besar.',
      outcomeBodyEn: 'Verified exact High-Water Mark alignment mechanics.',
      jessyLineId: 'Adil banget kan sistem HWM?! Itulah standar etika finansial kelas JGS.',
      jessyLineEn: 'Pure transparency with zero hidden drawdown penalties!',
    },
  },

  // SEM 20
  'micro-compounding-160k-to-10m': {
    titleId: 'Peta Jalan Pertumbuhan Bertahap: Rp160.000 -> Rp1 Juta -> Rp10 Juta',
    titleEn: 'Staged Micro Compounding Roadmap: Rp160k -> Rp1M -> Rp10M Milestone',
    briefingId: 'Bandingkan pertumbuhan konsisten 1% risiko proporsional (lot ikut naik perlahan seiring saldo tembus 2.000 -> 5.000 USC) vs mencoba melompat Rp160rb jadi Rp10 Juta dalam 7 hari.',
    briefingEn: 'Plot sustainable compounding milestones versus 7-day all-in blowup.',
    visual: {
      kind: 'EQUITY_CURVE',
      captionId: 'Kurva Pertumbuhan Realistis 1% Proporsional vs Impian All-In 7 Hari',
      captionEn: 'Compounding Trajectory: Proportional Discipline vs All-In Gambling',
      curvePoints: [
        { step: 'Bulan 1-3 (Skill)', safeVal: 160, recklessVal: 160 },
        { step: 'Bulan 6 (Topup+Growth)', safeVal: 1200, recklessVal: 450 },
        { step: 'Bulan 12', safeVal: 4200, recklessVal: 0 },
        { step: 'Tahun 2', safeVal: 10500, recklessVal: 0 },
      ],
      curveUnit: 'Ribu Rp',
    },
    step1: {
      questionId: 'Mengapa fase 3 bulan pertama dengan Rp160.000 (1.000 USC) difokuskan membuktikan Konsistensi Proses dulu sebelum menambah ukuran modal?',
      questionEn: 'Why dedicate the first 90 days on 1,000 USC solely to proving process stability before scaling?',
      options: [
        { labelId: 'Memastikan keahlian & disiplin SOP sudah hijau konsisten agar ketika modal membesar, kebiasaan baik ikut berlipat ganda!', labelEn: 'Verify repeatable edge on cheap tuition so added savings scale sound habits cleanly', feedbackId: '100% Tepat! Mengisi modal besar saat kebiasaan masih berantakan hanya memperbesar kerugian.', feedbackEn: 'Exact capital-scaling wisdom!' },
        { labelId: 'Karena 1.000 USC tidak bisa ditarik', labelEn: 'Cent funds cannot withdraw', feedbackId: 'Akun Cent bebas ditarik kapan pun; tujuannya adalah membangun fondasi skill bebas stres.', feedbackEn: 'Withdrawals work freely; focus lies on skill formation.' },
        { labelId: 'Supaya menunggu inflasi selesai', labelEn: 'Wait out global inflation', feedbackId: 'Justru membangun skill di 90 hari pertama mempercepat langkahmu bertahun ke depan.', feedbackEn: 'Early discipline compounds into long-term velocity.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Saat 1.000 USC berhasil berkembang sehat menjadi 2.000 USC (Rp325rb+), bagaimana ukuran lotmu?',
      promptEn: 'Adjust position risk proportionally at 2,000 USC:',
      choices: [
        { id: 'safe', labelId: 'Pertahankan tepat 1% (20 USC/setup) -> Batas risiko naik perlahan otomatis selaras pertambahan ekuitas', labelEn: 'Keep fixed 1% (20 USC) so Cent lot grows calmly with equity', isSafe: true, riskUsc: 20, rewardUsc: 60, consequenceId: 'Setiap kemenangan +3R langsung memberi +60 USC sambil mempertahankan 100 nyawa tetap utuh!', consequenceEn: 'Smooth compounding accelerated gains safely with 100-life protection!' },
        { id: 'risky', labelId: 'Merasa sudah jago lalu ubah risiko per klik dari 1% jadi 25% mengejar Rp10 Juta bulan ini juga', labelEn: 'Jump risk immediately to 25% chasing instant Rp10M', isSafe: false, riskUsc: 500, rewardUsc: 600, consequenceId: 'Dua kali kalah beruntun menghapus kerja keras berbulan-bulan kembali ke titik nol!', consequenceEn: 'Two quick losses reset months of compounding progress.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Peta Jalan Rp160rb -> Rp10 Juta Terkunci',
      outcomeTitleEn: 'Proportional Scaling Roadmap Cleared',
      outcomeBodyId: 'Kecepatan sesungguhnya datang dari konsistensi 1% yang digabung tabungan produktif bertahap.',
      outcomeBodyEn: 'Steady proportional scaling beats volatile shortcuts every single year.',
      jessyLineId: 'Pelan tapi pasti menuju 8 digit tanpa serangan jantung! Semangat terus!',
      jessyLineEn: 'Steady proportional compounding builds enduring wealth!',
    },
  },
  'visual-pnl-calendar-audit-sop': {
    titleId: 'Audit Kalender PnL 3 Detik: Membedakan Masalah Strategi vs Kebocoran Emosi',
    titleEn: 'Monthly Visual PnL Calendar Diagnostic: Finding Emotional Leaks Fast',
    briefingId: 'Lihat rekap Kalender PnL bulan Novembermu (/journal): Tanggal Hijau (`Disiplin SOP`) = +85 USC. Tanggal Merah (`Balas Dendam` & `Geser SL`) = -95 USC. Hasil bersih bulan ini = -10 USC.',
    briefingEn: 'Diagnose a -10 USC monthly net ledger split cleanly by honest audit badges.',
    visual: {
      kind: 'BAR_COMPARE',
      captionId: 'Otopsi Kalender PnL: Sumbangan Trade SOP vs Pelanggaran Emosi',
      captionEn: 'Monthly Calendar Audit: Clean SOP Execution vs Emotional Breaches',
      bars: [
        { label: 'Trade Disiplin Sesuai SOP', value: 85, unit: '+USC', tone: 'green' },
        { label: 'Pelanggaran FOMO / Balas Dendam', value: -95, unit: 'USC', tone: 'red' },
      ],
    },
    step1: {
      questionId: 'Melihat data Kalender PnL tersebut (+85 USC dari SOP vs -95 USC dari pelanggaran emosi), apa akar masalah sesungguhnya?',
      questionEn: 'With +85 USC generated by SOP trades vs -95 USC burned on Tilt breaches, what needs fixing?',
      options: [
        { labelId: 'Strategimu SUDAH menguntungkan (+85 USC)! Cukup hentikan FOMO & Balas Dendam agar bulan depan langsung bersih hijau!', labelEn: 'The technical system already works (+85 USC)! Eliminating Tilt leaks turns next month sharply profitable', feedbackId: '100% Tepat! Banyak trader gonta-ganti indikator bertahun-tahun padahal sumber bocornya cuma emosi.', feedbackEn: 'Exact behavioral diagnosis!' },
        { labelId: 'Harus segera ganti strategi baru yang win rate 99%', labelEn: 'Abandon current system immediately', feedbackId: 'Gonta-ganti sistem membuang edge +85 USC yang sudah terbukti bekerja.', feedbackEn: 'Strategy jumping discards verified positive expectancy.' },
        { labelId: 'Kalender jurnal tidak ada gunanya', labelEn: 'Drop journaling altogether', feedbackId: 'Tanpa lencana jujur kalender, kamu tak akan sadar strategi aslimu sebenarnya untung.', feedbackEn: 'Visual audit proves exactly where equity leaks.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Langkah perbaikan konkret bulan depan berdasarkan hasil otopsi Kalender PnL:',
      promptEn: 'Apply calendar diagnostic upgrade:',
      choices: [
        { id: 'safe', labelId: 'Pertahankan 100% strategi sama -> Pakai tombol "Catat Cepat 3 Detik" + Stop otomatis setelah 2x SL', labelEn: 'Keep proven SOP setups -> Enforce strict 2-SL daily circuit breaker', isSafe: true, riskUsc: 10, rewardUsc: 85, consequenceId: 'Kebocoran -95 USC menghilang dan bulan berikutnya akun mencetak +85 USC (+Rp13.800 pada 1.000 USC)!', consequenceEn: 'Plugging emotional leaks preserved clean +85 USC profit!' },
        { id: 'risky', labelId: 'Bongkar seluruh sistem belajar strategi acak baru dari awal tanpa menyentuh kebiasaan Tilt', labelEn: 'Switch technical strategies while ignoring Tilt', isSafe: false, riskUsc: 95, rewardUsc: 20, consequenceId: 'Strategi baru tetap dirusak oleh kebiasaan Balas Dendam dan Geser SL yang sama!', consequenceEn: 'Unresolved Tilt ruins every new strategy identically.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Kebocoran Akun Terdeteksi Dalam 3 Detik',
      outcomeTitleEn: 'Calendar Leak Audit Verified',
      outcomeBodyId: 'Kalender PnL Jujur membuatmu berhenti menyalahkan strategi yang baik dan langsung memotong kebiasaan bocor.',
      outcomeBodyEn: 'Isolated behavioral drag cleanly from verified technical expectancy.',
      jessyLineId: 'Ohhh ternyata strategiku udah bagus, cuma jarinya yang suka FOMO ya! Hebat banget!',
      jessyLineEn: 'Seeing +85 SOP vs -95 Tilt changes everything!',
    },
  },
  'capstone-20-semester-readiness': {
    titleId: 'Simulasi Sidang Akhir Strategist: Menggabungkan Seluruh Konstitusi JGS (120 SKS)',
    titleEn: '20-Semester Capstone Simulation: Complete JGS Strategist Readiness',
    briefingId: 'Ujian Akhir Kehormatan sebelum membuka Sidang Ijazah 120 SKS: Kamu dihadapkan pada situasi pasar nyata dengan godaan profit cepat melanggar aturan SOP.',
    briefingEn: 'Pass the final integrity simulation uniting all 20 Semesters ahead of your Final Exam.',
    visual: {
      kind: 'TABLE_SPEC',
      captionId: 'Konstitusi Abadi Strategist Lulusan THE JEY GANG STRATEGIST',
      captionEn: 'Graduating Strategist Constitution Summary (120 SKS)',
      specHeaders: ['Pilar JGS', 'Standar Minimum Kelulusan', 'Sertifikasi Rank VIII'],
      specRows: [
        ['Risiko & Ukuran', 'Selalu <= 1% Risiko + Floor Rounding Cent', 'AKTIF'],
        ['Konfirmasi & Waktu', 'Killzone WIB + Sweep -> MSS -> FVG + Bebas News', 'AKTIF'],
        ['Integritas & Evaluasi', 'Hard SL Wajib + Audit Jujur Kalender + High-Water Mark', 'CELESTIAL OUROBOROS'],
      ],
    },
    step1: {
      questionId: 'Apa makna sebenarnya dari motto resmi kami: "Small Capital. Serious Strategy. Precision Over Promises"?',
      questionEn: 'What does "Small Capital. Serious Strategy. Precision Over Promises." genuinely embody?',
      options: [
        { labelId: 'Modal kecil Rp160.000 layak diperlakukan dengan disiplin matematika institusi tanpa iming-iming kaya instan!', labelEn: 'Even $10 equity deserves institutional risk math and verified precision without fake hype!', feedbackId: '100% Sempurna! Kamu siap melangkah menuju Sidang Ujian Akhir 20 Semester.', feedbackEn: 'Exact JGS graduating philosophy!' },
        { labelId: 'Modal kecil harus memakai lot maksimal supaya cepat jadi besar', labelEn: 'Micro balances must maximize leverage quickly', feedbackId: 'Kebalikannya: modal kecil justru membutuhkan strategi paling disiplin dan serius.', feedbackEn: 'Small capital thrives strictly on serious precision.' },
        { labelId: 'Berjanji profit 100% pasti tiap hari', labelEn: 'Guarantee 100% daily payouts', feedbackId: 'Precision Over Promises berarti fokus pada eksekusi presisi, bukan janji palsu.', feedbackEn: 'We focus cleanly on execution precision over hype.' },
      ],
      correctIndex: 0,
    },
    step2: {
      promptId: 'Komitmen terakhirmu sebelum menerima kunci Ujian Kelulusan Dinamis & Ijazah bertanda tangan Jahseya Mochtar Mawardi:',
      promptEn: 'Seal your Capstone Strategist oath:',
      choices: [
        { id: 'safe', labelId: 'Selalu pakai Hard SL <=1%, tunggu 3-Gerbang Konfirmasi WIB, & jujur di Kalender PnL!', labelEn: 'Commit strictly to <=1% Hard Stops, 3-Gate WIB alignment, & honest audits!', isSafe: true, riskUsc: 10, rewardUsc: 35, consequenceId: 'Selamat!! Kamu menuntaskan seluruh Simulasi Praktik 60 Modul! Masuk ke Aktivitas 04 & Ujian Akhir!', consequenceEn: 'All 60 Module Simulations cleared! Proceed cleanly to Graduation Exam!' },
        { id: 'risky', labelId: 'Sekali-sekali lepas SL tidak masalah asal lagi merasa sangat yakin', labelEn: 'Remove stops occasionally when feeling confident', isSafe: false, riskUsc: 1000, rewardUsc: 50, consequenceId: 'Satu pengecualian lepas SL adalah pintu masuk menghancurkan kerja keras bertahun-tahun!', consequenceEn: 'Single exception risks catastrophic drawdown.' },
      ],
    },
    step3: {
      outcomeTitleId: 'Kandidat Siap Sidang Ijazah 120 SKS',
      outcomeTitleEn: '20-Semester Strategist Readiness Cleared',
      outcomeBodyId: 'Seluruh 60 simulasi dari Sejarah Uang hingga Manajemen Risiko Institusional telah kamu kuasai dengan sempurna.',
      outcomeBodyEn: 'Every single simulation across 20 Semesters is mastered.',
      jessyLineId: 'Selamat!! Aku bangga banget sama perjalanan belajarmu dari nol sampai sini!',
      jessyLineEn: 'So proud of your growth from Day 1 through Capstone 20.3!',
    },
  },
};
