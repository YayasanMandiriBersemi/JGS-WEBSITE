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

function makePins4(
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

export const MONOGRAPHS_PART_4: Record<string, ModuleDeepMonograph> = {
  'support-resistance-zones-basics': {
    slug: 'support-resistance-zones-basics',
    photoUrl: PHOTOS.CANDLE_SCREEN,
    photoCaptionId: 'Zona reaksi lantai Support dan atap Resistance yang digambar sebagai pita harga (Body ke Wick).',
    photoCaptionEn: 'Institutional Support and Resistance bands shaded accurately from candle bodies to extreme tails.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Pada tingkat buku order nyata (Larry Harris, 2003), kumpulan order beli dan jual limit jarang menumpuk sempurna pada satu titik desimal tunggal. Sebaliknya, mereka menyebar ke dalam pita harga historis mulai dari batas pembukaan/penutupan badan candle hingga ke ujung sumbu ekor terjauh tempat penolakan terakhir terjadi.',
      'Pemula sering memplot 15 garis horizontal tipis tanpa memfilter kekuatan pantulannya. Zona sejati selalu ditandai oleh kecepatan harga menjauh secara impulsif saat meninggalkan lantai Support atau atap Resistance tersebut sebelumnya.',
      'Di akun mikro bermodal Rp160.000 (1.000 USC), menggunakan kotak zona membantumu menempatkan Stop Loss aman sedikit di LUAR kotak agar ayunan wajar pasar tidak langsung memicu keluar terlalu cepat.',
    ],
    sec2InstitutionalEn: [
      'Real exchange limit depth gathers across price bands bridging candle open/close pivots to rejection tails rather than razor-thin lines.',
      'Placing protective Cent Stop Losses cleanly outside full S&R bands prevents frustrating minor 2-pip shakeouts.',
    ],
    anatomyRowsId: [
      ['Menarik garis tipis satu harga lalu panik saat tertembus 2 pips.', 'Menggambar kotak zona antara ujung ekor ke tepi badan candle.', 'Letakkan SL 3 pips di luar batas terjauh kotak zona S&R.'],
      ['Membeli lantai Support yang sudah tersentuh memantul 5 kali datar.', 'Menyadari sentuhan berulang mengikis likuiditas beli & menumpuk SL.', 'Prioritaskan zona pantulan kuat pertama yang belum sering dikunjungi.'],
      ['Memenuhi layar H1 dengan belasan garis horizontal bertumpukan.', 'Menyaring cukup 2-3 area terdekat tempat harga pernah berbalik tajam.', 'Pertahankan layar bersih agar membaca MSS tetap fokus.'],
    ],
    anatomyRowsEn: [
      ['Drawing hairline single numbers easily pierced intra-bar.', 'Shading horizontal bands between wicks and bodies cleanly.', 'Position SL safely outside outer box bounds.'],
      ['Buying a flat floor tested four to five previous times.', 'Recognizing exhausted demand invites stop sweeps underneath.', 'Focus on crisp fresh departure levels instead.'],
      ['Cluttering charts with 15 overlapping horizontal scribbles.', 'Mapping only the 2-3 nearest high-impulse reaction bands.', 'Keep workspace crisp around active Killzone price.'],
    ],
    sec4QuantId: [
      'Bayangkan modal Rp160.000 (1.000 USC) menghadapi kotak Support selebar 25 pips. Pemula yang menaruh SL sempit 10 pips di tengah kotak mengalami 4x Stop Out beruntun (-40 USC / -Rp6.400) tepat sebelum harga akhirnya meluncur naik 90 pips.',
      'Dengan memperlebar jarak aman keluar kotak menjadi 40 pips lalu mengecilkan lot ke 0.02 Cent Lot (risiko maksimal Rp1.280 / 8 USC), posisi bertahan nyaman memanen target +100 pips (+Rp3.200 / +20 USC).',
      'Kotak zona menyelamatkan akun bukan lewat akurasi ajaib, melainkan dengan memberi ruang napas yang jujur.',
    ],
    sec4QuantEn: [
      'Widening a tight 10-pip middle-of-box stop outside the entire 25-pip zone and scaling lot size down to 0.02 Cent saves repeated shakeouts while capping max loss smoothly at Rp1,280.',
      'Proper structural zone width turns losing whipsaws into calm 2.5R swings.',
    ],
    sec4FormulaId: 'Zona_S_R = [Ujung_Ekor_Penolakan .. Badan_Candle_Terdekat]  |  Risk = Max Rp1.600 (10 USC)',
    sec4FormulaEn: 'Zone_SR = [Rejection_Wick_Extremum .. Body_Pivot]  |  Max_Loss = 10 USC (1%)',
    hotspots: makePins4(
      ['Lantai Support Segar', 'Atap Resistance Kuat', 'Role Reversal Flip', 'SL Aman Luar Kotak'],
      ['Area tumpukan order beli aktif dengan pantulan cepat ke atas.', 'Area distribusi penjual menahan laju reli sebelumnya.', 'Atap yang berhasil ditembus badan penuh berubah menjadi pijakan.', 'Batas invalidasi aman terhindar dari colekan ekor normal.'],
      ['Menggambar garis di area datar tak bertenaga.', 'Menjual tepat di tengah tren naik kuat tanpa konfirmasi.', 'Menganggap setiap atap selalu berbalik selamanya.', 'Menaruh SL persis pas di ujung badan lilin.'],
      ['Kotaki wick-to-body hanya di level reaksi impulsif.', 'Tunggu penolakan jelas atau sweep sebelum entry.', 'Gunakan bekas Resistance jebol sebagai pijakan M5.', 'Geser SL di belakang batas kotak dan sesuaikan Cent Lot.']
    ),
    detective: {
      scenarioId: 'Harga XAUUSD turun pelan menyentuh lantai Support ke-4 kalinya membentuk garis bawah nyaris rata sempurna. Apa risiko tersembunyi bila kamu langsung membeli?',
      scenarioEn: 'Gold drops for the fourth straight touch against a nearly flat horizontal Support floor. What hidden danger lurks beneath it?',
      optionsId: ['Tumpukan SL ritel mengundang Sweep menembus lantai lebih dulu sebelum harga benar naik', 'Lantai ke-4 dijamin tidak akan pernah jebol', 'Spread broker menjadi nol'],
      optionsEn: ['Dense retail stops parked underneath invite an institutional Liquidity Sweep before any rally', '4th bounce guarantees eternal floor immunity', 'Spreads disappear permanently'],
      correctIndex: 0,
      explanationId: 'Semakin datar dan sering disentuh, semakin rapat Stop Loss ritel menumpuk tepat di bawahnya menjadi target sapuan.',
      explanationEn: 'Flat multi-touch floors store clustered stop liquidity inviting clean stop raids before real bounces.',
    },
    essayGuidanceHintsId: [
      'Jelaskan keunggulan menandai Support/Resistance dalam bentuk kotak pita dibanding garis satu harga.',
      'Uraikan alasan lantai yang terlalu sering tersentuh justru lebih mudah ditembus dulu oleh Sweep.',
      'Tunjukkan cara menyesuaikan ukuran Cent lot modal Rp160.000 agar SL di luar kotak tetap aman Rp1.600.',
    ],
    essayGuidanceHintsEn: [
      'Explain why rectangular S&R zones outperform hair-thin horizontal lines.',
      'Clarify why repeated flat touches accumulate liquidity traps underneath.',
      'Show how Cent sizing maintains Rp1,600 stops safely beyond outer edges.',
    ],
  },
  'supply-demand-order-blocks-beginner': {
    slug: 'supply-demand-order-blocks-beginner',
    photoUrl: PHOTOS.DEALING_DESK,
    photoCaptionId: 'Jejak peluncuran harga kencang meninggalkan zona dasar Supply dan Demand institusional yang belum terisi.',
    photoCaptionEn: 'Explosive institutional departures leaving unmitigated Supply and Demand origin bases.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Ketika pelaku berkapasitas besar menggeser harga secara agresif ke luar dari keseimbangan singkat (*Base*), hukum lelang mencatat sering kali tidak semua kuota order mereka sempat terisi sebelum harga melonjak menjauh (Wyckoff, 1931). Celah ketidakseimbangan (*Imbalance*) inilah pembeda mutlak gudang Demand/Supply asli.',
      'Zona yang belum pernah diuji ulang sama sekali (*Fresh / Unmitigated Zone*) menyimpan potensi reaksi pertama terkuat. Begitu harga telah berkali-kali bolak-balik menginjak zona tersebut, persediaan antrean limit aslinya berkurang drastis.',
      'Untuk pemodal Rp160.000 - Rp500.000, memfokuskan kesabaran pada 1-2 zona Fresh searah tren utama H1 memotong 70% kekalahan dari memasang Limit di kotak acak.',
    ],
    sec2InstitutionalEn: [
      'Violent departures out of compact consolidation shelves leave unexhausted institutional limit orders anchored cleanly at the origin base.',
      'First-touch Fresh zones hold sharply higher odds than stale areas tapped repeatedly.',
    ],
    anatomyRowsId: [
      ['Melabeli kotak sideways berjarak lambat sebagai Demand Zone.', 'Memilih hanya Base dengan ledakan keluar berbadan tebal + FVG.', 'Jika keluarnya pelan lemas, hapus kotak dari grafik!'],
      ['Memasang buy limit buta pada zona yang sudah ditembus 3 kali.', 'Menandai status zona sebagai Fresh (0 sentuhan) vs Tested.', 'Eksklusif prioritaskan sentuhan pertama searah bias H1.'],
      ['Melawan tren besar harian memakai kotak M5 mikro.', 'Menyelaraskan zona S&D ke arah struktur H1/H4.', 'Pastikan Supply/Demand searah arus tren atau di batas sweep.'],
    ],
    anatomyRowsEn: [
      ['Marking sluggish flat chop as genuine institutional Demand.', 'Demanding fast explosive departure candles with FVG imbalance.', 'Delete slow weak bases immediately.'],
      ['Blindly bidding zones re-entered three times previously.', 'Labeling origin zones cleanly as Fresh vs Tested.', 'Trade solely untouched first-return zones along H1 trend.'],
      ['Buying tiny M5 Demand against fierce H1 sell waves.', 'Anchoring S&D origin plays inside macro trend context.', 'Verify higher-timeframe room to run before clicking.'],
    ],
    sec4QuantId: [
      'Pada akun modal Rp500.000 (~3.100 USC, batas 1% = Rp5.000 / 31 USC), menyortir zona dari acak ke eksklusif Fresh Drop-Base-Rally H1 memperkecil frekuensi salah eksekusi sambil mempertahankan potensi +2.5R hingga +3R (+Rp12.500 - +Rp15.000 per kemenangan).',
      'Disiplin memilih "kualitas di atas kuantitas" adalah kunci utama menjaga ketenangan eksekusi di akun mikro.',
    ],
    sec4QuantEn: [
      'Filtering setups solely for fresh untouched impulsive origins lifts average win quality cleanly on Rp500,000 micro balances (+Rp15,000 per clean +3R run on Rp5,000 risk).',
      'Quality selection protects capital better than high trade counts.',
    ],
    sec4FormulaId: 'Skor_Zona_SD = (Sentuhan_Sebelumnya == 0)  &&  (Ledakan_Imbalance_Keluar >= 2.5x Base)',
    sec4FormulaEn: 'SD_Strength = (Prior_Touches == 0)  &&  (Departure_Candle_Force >= 2.5x Base)',
    hotspots: makePins4(
      ['Kotak Base Asal (Rally/Drop)', 'Ledakan Candle Imbalance', 'Status Segar (Fresh = 0 Tap)', 'Sentuhan Pertama + M5 MSS'],
      ['Area akumulasi/distribusi singkat sebelum dorongan institusional.', 'Bukti kuat ketidakseimbangan pembeli vs penjual yang tertinggal.', 'Zona perawan menyimpan antrean tersisa paling penuh.', 'Konfluensi pantulan terbaik meminimalkan risiko fakeout.'],
      ['Base tidak memiliki candle dorongan kuat sama sekali.', 'Mengejar harga jauh melesat di tengah jalan sesudah roket.', 'Membeli zona bekas yang sudah 3-4 kali diinjak.', 'Membeli buta Limit Order melawan arus H1 tanpa konfirmasi.'],
      ['Tandai hanya base yang jelas diikuti candle berbadan besar.', 'Tunggu harga mampir pulang kembali ke bibir base dengan tenang.', 'Prioritaskan sentuhan perdana lalu buang bila sudah terpakai.', 'Validasi penutupan MSS di M5 saat harga tiba di kotak.']
    ),
    detective: {
      scenarioId: 'Dua Demand Zone muncul berdekatan: Kotak A keluar dengan 3 candle hijau raksasa dan belum pernah tersentuh sama sekali; Kotak B sudah dikunjungi bolak-balik 3 kali dalam 2 jam terakhir. Pilihanmu?',
      scenarioEn: 'Two nearby Demand Zones sit on chart: Box A exploded out via three massive green bars untouched; Box B was tapped three times already. Your pick?',
      optionsId: ['Kotak A (Fresh dengan ledakan Imbalance kuat menyimpan sisa order asli)', 'Kotak B karena lebih sering tersentuh berarti lebih aman', 'Buka order besar di keduanya sekaligus'],
      optionsEn: ['Box A (Fresh untouched origin backed by clear institutional displacement)', 'Box B because repeated touches guarantee support', 'Split heavy risk blindly across both'],
      correctIndex: 0,
      explanationId: 'Zona Fresh yang keluar dengan ledakan FVG memegang sisa minat beli terbesar pada sentuhan perdana.',
      explanationEn: 'Fresh bases with sharp imbalance departures hold strongest unexhausted limit depth on revisit.',
    },
    essayGuidanceHintsId: [
      'Terangkan ciri visual wajib Supply & Demand asli (Base singkat + Ledakan cepat Imbalance).',
      'Jelaskan mengapa zona Fresh lebih bernilai daripada zona yang sudah berkali-kali diuji.',
      'Terapkan prinsip tersebut pada simulasi modal kecil di bawah Rp1 Juta.',
    ],
    essayGuidanceHintsEn: [
      'Detail required hallmarks separating genuine S&D origins (compact base + explosive imbalance).',
      'Explain why untouched zones carry higher reliability than tested areas.',
      'Illustrate safe 1% risk allocation under Rp1,000,000 equity.',
    ],
  },
  'trendline-liquidity-vs-static-zones': {
    slug: 'trendline-liquidity-vs-static-zones',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Perangkap likuiditas pada garis Trendline miring ritel yang memicu sapuan menuju Demand Horizontal.',
    photoCaptionEn: 'Diagonal retail trendline stop pools swept cleanly straight into underlying horizontal Demand.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Sistem pencocokan bursa (Order Book Matching Engines) menyimpan pesanan Limit strictly dalam angka desimal harga horizontal, bukan fungsi garis kemiringan diagonal. Akibatnya, saat banyak trader ritel menarik trendline identik, garis miring itu berubah menjadi konsentrasi Stop Loss berderet (Brunnermeier & Pedersen, 2005).',
      'Kejadian Trendline Phantom Break menjadi setup favorit institusi: harga menembus garis miring, memancing penjual breakout ritel menekan tombol Sell tepat ketika harga masuk ke dalam zona Demand Horizontal segar di bawahnya, lalu membalik kencang.',
      'Memahami mekanisme ini menyulap kerugian beruntun di trendline menjadi keunggulan membaca peta perangkap likuiditas.',
    ],
    sec2InstitutionalEn: [
      'Limit order books operate solely across fixed numerical prices, turning visible diagonal trendlines into concentrated stop-loss targets.',
      'Waiting for retail diagonal trendlines to break downward into real horizontal Demand lets micro strategists ride reversals safely.',
    ],
    anatomyRowsId: [
      ['Langsung Buy membabi-buta di sentuhan trendline miring ke-4.', 'Mengidentifikasi baris titik pantul sebagai Trendline Liquidity pool.', 'Tunggu kolam trendline tersapu masuk zona Demand di bawahnya.'],
      ['Langsung Sell saat garis trendline jebol merah satu lilin.', 'Melihat apakah tepat di bawah trendline terdapat Fresh Demand H1.', 'Cek struktur kiri sebelum menekan Sell breakdown agar tak kena trap.'],
      ['Menggambar trendline miring berbeda-beda setiap ganti zoom layar.', 'Menggunakan angka harga statis PDH/PDL dan FVG/OB horizontal.', 'Berpegang pada level horizontal pasti yang konsisten di tiap broker.'],
    ],
    anatomyRowsEn: [
      ['Blindly buying touch #4 on retail diagonal trendlines.', 'Labeling obvious sloped touch chains as Trendline Liquidity pools.', 'Wait cleanly until stops underneath clear into lower Demand.'],
      ['Panic selling instant trendline breakdowns into nearby Demand.', 'Checking underlying horizontal zones directly below broken slopes.', 'Verify full Displacement MSS before chasing breakdowns.'],
      ['Drawing skewed diagonal slopes distorted by chart aspect zooming.', 'Anchoring orders strictly to invariant horizontal prices.', 'Keep charts pegged to clear fixed OHLC order levels.'],
    ],
    sec4QuantId: [
      'Di modal Rp160.000 (1.000 USC), menghindari hanya dua perangkap Trendline per minggu menghemat -20 USC (-Rp3.200) sekaligus membuka peluang menangkap pantulan Demand pasca-sweep menghasilkan +30 USC (+Rp4.800) pada 1% risiko.',
    ],
    sec4QuantEn: [
      'Dropping diagonal blind bounces while trading post-sweep horizontal Demand preserves +20 USC weekly and captures clean +3R expansions.',
    ],
    sec4FormulaId: 'Setup_Post_Trendline = Sweep_Garis_Miring -> Sentuh_Demand_Horizontal -> MSS_M5',
    sec4FormulaEn: 'Post_Trendline_Setup = Diagonal_Pool_Sweep -> Tap_Horizontal_Demand -> M5_MSS',
    hotspots: makePins4(
      ['Garis Trendline 3-4 Sentuhan', 'Tumpukan SL Ritel Bawah Garis', 'Kotak Demand Horizontal', 'Konfirmasi M5 Pembalik Arah'],
      ['Garis miring tampak meyakinkan menarik ribuan pengikut ritel.', 'Kumpulan Stop Loss pelindung berderet siap menjadi bahan bakar.', 'Area harga horizontal tempat limit institusi menunggu murah.', 'Pemicu masuk sah sesudah sapuan menuntaskan tugasnya.'],
      ['Membeli sentuhan ke-4 tanpa menunggu bukti kekuatan beli.', 'Mengira jebol garis miring pasti memulai tren turun jauh.', 'Melupakan adanya Demand Horizontal tepat di bawah trendline.', 'Tidak sabar menunggu penutupan candle balik M5.'],
      ['Beri label X di garis miring sebagai "Target Likuiditas".', 'Siapkan alarm sedikit di atas kotak Demand horizontal bawahnya.', 'Abaikan godaan Sell saat harga baru memecah garis miring.', 'Pasang 0.02 Cent Lot (Rp1.600) sesudah M5 MSS terbentuk naik.']
    ),
    detective: {
      scenarioId: 'EURUSD baru saja menjebol garis Support Trendline miring 4-sentuhan ke bawah langsung menyentuh kotak Demand H1 segar, lalu candle M5 langsung memantul membentuk MSS bullish. Posisi terbaik?',
      scenarioEn: 'EURUSD slices cleanly under a 4-touch diagonal support trendline straight into a fresh H1 horizontal Demand shelf, then snaps back printing M5 Bullish MSS. Best action?',
      optionsId: ['Buy di pullback FVG menuju arah naik (Trendline Liquidity baru saja disapu bersih!)', 'Sell habis-habisan karena garis trendline putus', 'Tunggu hari Minggu'],
      optionsEn: ['Buy clean FVG retest targeting highs after Trendline Liquidity was freshly raided!', 'Aggressive Sell chasing the broken trendline', 'Turn off charts all week'],
      correctIndex: 0,
      explanationId: 'Pemecahan trendline hanyalah sapuan bahan bakar menuju Demand horizontal sebelum arah tren berlanjut.',
      explanationEn: 'Broken slope cleared trapped stops straight into institutional Demand before bullish displacement fired.',
    },
    essayGuidanceHintsId: [
      'Jelaskan alasan order book tidak membaca garis kemiringan diagonal.',
      'Paparkan bagaimana Trendline Liquidity menjadi bahan bakar saat masuk ke Demand Horizontal.',
      'Uraikan langkah sabar agar tidak terjebak Sell palsu atau Buy prematur.',
    ],
    essayGuidanceHintsEn: [
      'Explain why horizontal numbers govern limit order books rather than diagonal pixel slopes.',
      'Connect broken retail trendlines directly into institutional horizontal liquidity.',
      'Describe patient M5 MSS confirmation guarding 1% equity.',
    ],
  },
  'scalping-m1-m5-precision-rules': {
    slug: 'scalping-m1-m5-precision-rules',
    photoUrl: PHOTOS.EXCHANGE_FLOOR,
    photoCaptionId: 'Eksekusi cepat berpresisi timeframe M1-M5 di jendela likuiditas terpadat London dan New York.',
    photoCaptionEn: 'Ultra-fast M1-M5 session scalping anchored strictly to lowest-spread London/NY overlaps.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Dalam disiplin eksekusi jangka pendek (Barber & Odean, 2000; Chordia et al., 2001), keberhasilan Scalping M1-M5 bertumpu pada rasio antara potensi jarak pips dengan biaya transaksi. Ketika spread melampaui 15% dari target atau SL, keunggulan matematis strategi langsung terhapus sebelum grafik sempat bergerak.',
      'Aturan operasional JGS menetapkan SL Scalping antara 20-35 pips dan target 45-90 pips (minimal 1:2 R:R), dikombinasikan larangan keras menambah lapisan minus (Anti-Layering).',
      'Pada akun Rp160.000 (1.000 USC), batas 3 transaksi harian dan rem berhenti pada 2 kali rugi menjaga modal tetap kebal terhadap gejolak emosi cepat M1.',
    ],
    sec2InstitutionalEn: [
      'Micro-timeframe scalping demands tiny spread drag, fixed 20-35 pip structural SL bands, and strict max-trade caps so overtrading never erodes returns.',
      'Banning multi-order drawdown layering maintains pure 1% fractional exposure per trade.',
    ],
    anatomyRowsId: [
      ['Membuka 8 posisi bertumpuk saat trade pertama minus (-15% risiko).', 'Membatasi strictly 1 posisi per setup dengan total max risiko Rp1.600.', 'Jika salah satu kena SL, terima dengan tenang (-10 USC).'],
      ['Scalping XAUUSDc di jam 04:30 WIB subuh saat spread melebar ekstrem.', 'Membatasi Scalping eksklusif pada London & NY Killzone.', 'Cek selalu indikator spread Market Watch sebelum klik order.'],
      ['Mengincar TP receh 5 pips sambil menanggung SL 40 pips (R:R terbalik).', 'Menjaga asimetri minimal 1:2 (SL 25 pips -> TP 55-75 pips).', 'Biarkan target tercapai atau ikuti struktur M5 secara dingin.'],
    ],
    anatomyRowsEn: [
      ['Stacking 8 Martingale layers against a losing M1 flip.', 'Locking max 1 trade unit per idea summing <= 10 USC.', 'Accept planned stops smoothly with zero retaliation.'],
      ['Scalping Gold during illiquid 04:30 WIB rollover gaps.', 'Restricting M1-M5 clicks solely inside London/NY peaks.', 'Check ask-bid spread width live before clicking.'],
      ['Risking 40 pips to scalp quick 5-pip grabs.', 'Maintaining >= 1:2 positive asymmetry (25 SL -> 55-75 TP).', 'Target clean M5 structural pools cleanly.'],
    ],
    sec4QuantId: [
      'Bandingkan ekspektasi dua gaya Scalper bermodal Rp160.000 (1.000 USC): Scalper A mengambil 2 setup bersih ber-SL 25 pips (0.04 lot = Rp1.600) ber-TP 60 pips (+Rp3.840) dengan akurasi 50% -> untung bersih +70 USC (+Rp11.200) per 10 percobaan.',
      'Scalper B melakukan 20 transaksi impulsif dengan 4x Layer minus hingga kerugian membesar melebihi 30% saldo hanya dalam satu malam berita buruk.',
    ],
    sec4QuantEn: [
      'Executing disciplined 25-pip SL / 60-pip TP M5 scalps at 0.04 Cent captures +70 USC net per 10-trade block calmly compared against catastrophic multi-layer blowups.',
    ],
    sec4FormulaId: 'Scalp_JGS = SL:[20..35 pips] | TP:[45..90 pips] | Max_Daily: 3 Trades | Risiko <= Rp1.600',
    sec4FormulaEn: 'JGS_Scalp = SL:[20..35 pips] | TP:[45..90 pips] | Daily_Cap: 3 | Risk <= 10 USC',
    hotspots: makePins4(
      ['Cek Spread Ketat (< 20 Poin)', 'Konfirmasi M5 Tutup Bersih', 'Entry 0.03-0.04 Cent Lot', 'Rem Harian 2x SL / 3 Trade'],
      ['Melindungi rasio profit agar tidak terpotong spread lebar.', 'Mencegah tertipu tusukan ekor palsu di timeframe 1 menit.', 'Mengunci rugi tepat di Rp1.600 (10 USC) pada jarak 25-33 pips.', 'Mencegah ledakan psikologi akibat kecepatan bar M1.'],
      ['Masuk di tengah jam Rollover atau 2 menit pra-NFP.', 'Membuka Buy saat candle M1 masih berkedip.', 'Memakai 0.50 lot supaya cepat balik modal.', 'Memencet tombol sampai 15 kali dalam 1 jam karena bosan.'],
      ['Pantau Market Watch sebelum masuk sesi London/NY.', 'Selalu konfirmasi arah Sweep + MSS dari M5 dulu.', 'Hitung Cent lot setiap kali mengubah jarak SL pips.', 'Tutup terminal otomatis begitu mencapai target harian.']
    ),
    detective: {
      scenarioId: 'Di modal Rp160.000 (1.000 USC), Scalper A terkena 2 kali SL beruntun (-20 USC) di sesi London sore. Apa langkah wajib sesuai protokol JGS sebelum sesi New York malam?',
      scenarioEn: 'A 1,000 USC Scalper suffers 2 consecutive stops (-20 USC / -Rp3,200) in London afternoon. According to JGS protocol, what comes next ahead of NY evening?',
      optionsId: ['Matikan MT5 untuk hari ini! Rem Daily Circuit Breaker melindungi sisa 98% saldo untuk hari esok yang tenang.', 'Langsung buka 5 Layer 0.10 lot di New York demi membalas -20 USC.', 'Hapus Stop Loss supaya bisa menahan minus selamanya.'],
      optionsEn: ['Stop trading for the day! Daily Breaker shields 98% equity calmly for tomorrow.', 'Stack five 0.10-lot revenge layers at NY open.', 'Remove Stop Losses indefinitely.'],
      correctIndex: 0,
      explanationId: 'Menghentikan aktivitas pada 2x SL menjaga ketahanan psikologis sekaligus melindungi saldo 980 USC utuh.',
      explanationEn: 'Respecting 2-loss daily breakers protects 98% of capital against emotional revenge spirals.',
    },
    essayGuidanceHintsId: [
      'Sebutkan rentang parameter SL (20-35 pips), TP (45-90 pips), dan jam terbaik Scalping WIB.',
      'Jelaskan bahaya tersembunyi kebiasaan Layering minus di akun Rp160.000.',
      'Uraikan aturan batas transaksi harian & rem beruntun agar tetap sehat mental.',
    ],
    essayGuidanceHintsEn: [
      'Detail Scalping SL (20-35 pips), TP (45-90 pips), and liquid WIB hours.',
      'Explain why multi-order drawdown layering accelerates small-account ruin.',
      'State strict daily trade limits and consecutive-stop circuit breakers.',
    ],
  },
  'intraday-m15-h1-session-mastery': {
    slug: 'intraday-m15-h1-session-mastery',
    photoUrl: PHOTOS.MARKET_CLOCK,
    photoCaptionId: 'Pengelolaan tenang ayunan intraday London/New York M15-H1 tanpa stres layar berlebihan.',
    photoCaptionEn: 'Calm set-and-alert M15/H1 intraday execution framed cleanly across London & NY sessions.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Sesi intraday harian (Andersen & Bollerslev, 1998) mendominasi sebagian besar pergerakan terarah bersih valuta asing dan emas dunia setiap hari antara pukul 14:00 hingga 23:00 WIB. Mengambil jarak Stop Loss struktural yang lebih longgar (45-80 pips) jauh mengurangi tingkat tersentuh ekor palsu dibanding scalping super pendek.',
      'Keunggulan gaya M15-H1 bagi mahasiswa dan pekerja di Indonesia ialah sifatnya yang serba selesai dalam hari yang sama (*Flat Before Sleep*), sehingga saldo terlindung total dari lonjakan *spread Rollover* subuh pukul 04:00 WIB.',
    ],
    sec2InstitutionalEn: [
      'Intraday H1/M15 setups harmonize wider 45-80 pip stops with 110-220 pip London/NY session targets while flattening before midnight WIB.',
      'Automated Limit fills paired with price alerts prevent anxious mid-swing micromanagement.',
    ],
    anatomyRowsId: [
      ['Menutup manual posisi profit di +15 pips karena takut candle berbalik.', 'Menggunakan aturan TP1 (1:2) / Breakeven + membiarkan lari ke TP2.', 'Pasang alarm + Limit order lalu hindari menatap chart tiap 1 menit.'],
      ['Memakai lot terlalu besar untuk jarak SL 70 pips (-7% per trade).', 'Menyesuaikan ukuran 0.01 atau 0.02 Cent Lot sesuai jarak 45-80 pips.', 'Gunakan Cent Calculator sebelum mengirim limit order intraday.'],
      ['Membiarkan posisi terbuka semalaman melewati jam mati 04:00 WIB.', 'Mengatur keluar atau mengamankan breakeven sebelum pukul 23:00 WIB.', 'Nikmati tidur tenang tanpa cemas memikirkan posisi terbuka.'],
    ],
    anatomyRowsEn: [
      ['Closing winning swings prematurely at +15 pips out of fear.', 'Securing partial TP1 (+2R) and moving SL to Entry cleanly.', 'Walk away post-Limit placement using price alerts.'],
      ['Keeping bloated lots on 70-pip intraday stops (-7% risk!).', 'Scaling down cleanly to 0.01-0.02 Cent lots per setup.', 'Run exact Cent Sizer before placing limits.'],
      ['Holding short-term positions carelessly through 04:00 WIB Rollover.', 'Realizing clean targets ahead of 23:00 WIB bedtimes.', 'Sleep completely unlevered overnight.'],
    ],
    sec4QuantId: [
      'Pada akun Rp160.000 (1.000 USC), jarak SL Intraday 50 pips memakai `0.02 Cent Lot` hanya mengunci risiko tepat **Rp1.600 (10 USC)**, sementara satu ayunan bersih 150 pips di sesi London/NY mendatangkan **+30 USC (+Rp4.800 / +3% akun)**. Pada modal Rp500.000 (~3.100 USC), pola sama menghasilkan **+Rp15.000** dalam 1 setup harian bersih.',
    ],
    sec4QuantEn: [
      'A clean 50-pip SL / 150-pip TP Intraday setup produces +3% net equity return cleanly per session hit while protecting every downside leg at strict 1% limits.',
    ],
    sec4FormulaId: 'Intraday_JGS = SL:[45..80 pips] | TP:[110..220 pips] | Durasi:[1-6 Jam WIB] | Risk <= 1%',
    sec4FormulaEn: 'JGS_Intraday = SL:[45..80 pips] | TP:[110..220 pips] | Duration:[1-6h WIB] | Cap = 1%',
    hotspots: makePins4(
      ['Pemetaan H1 & POI M15', 'Pending Limit + Alarm Harga', 'Manajemen Breakeven +2R', 'Selesai Tenang Sebelum 23:00 WIB'],
      ['Memberi ruang struktural 45-80 pips bebas sentilan mikro.', 'Menghindari emosi mengintervensi grafik di tengah perjalanan.', 'Mengamankan modal awal bebas risiko saat separuh jarak tercapai.', 'Bebas biaya swap serta pelebaran spread Rollover subuh.'],
      ['Mengubah rencana Intraday seenaknya mengikuti komentar forum.', 'Menonton candle M1 sepanjang sore sampai panik cut-profit.', 'Membiarkan posisi minus berhari-hari tanpa Stop Loss.', 'Masuk setup ketiga saat dua sesi sebelumnya sudah selesai.'],
      ['Lakukan 10 menit mapping jam 13:45 WIB sebelum pasar aktif.', 'Gunakan Limit Order ber-SL/TP matang dan fokus aktivitas lain.', 'Geser SL ke titik entry saat menyentuh +100 pips (+2R).', 'Catat hasil rapi dalam 3 detik di Kalender Jurnal malam hari.']
    ),
    detective: {
      scenarioId: 'Di modal Rp500.000 (3.100 USC, batas risiko 1% = 31 USC), kamu melihat setup Intraday M15 berjarak SL struktural 62 pips. Berapa Cent Lot ideal?',
      scenarioEn: 'On a Rp500,000 (~3,100 USC) account capping 1% risk (31 USC), your M15 Intraday SL measures 62 pips. Pick exact Cent Lot:',
      optionsId: ['0.05 Cent Lot (0.05 x 62 pips x 10 = tepat 31 USC / Rp5.000 aman 1%)', '0.50 Cent Lot', '1.00 Cent Lot'],
      optionsEn: ['0.05 Cent Lot (0.05 x 62 pips = 31 USC exact 1% risk)', '0.50 Cent Lot', '1.00 Cent Lot'],
      correctIndex: 0,
      explanationId: '62 pips x 0.05 Cent lot tepat menghabiskan batas aman 31 USC (Rp5.000) dengan ruang target 150 pips senilai +Rp12.000.',
      explanationEn: '0.05 Cent lot locks 62-pip stops exactly at 31 USC (1%) protecting capital cleanly.',
    },
    essayGuidanceHintsId: [
      'Bandingkan kelebihan jarak SL Intraday 45-80 pips dibanding Scalping 20-35 pips.',
      'Jelaskan teknik Set & Alert untuk mencegah gangguan emosi menutup profit terlalu dini.',
      'Tunjukkan hitungan lot aman di modal kecil Rp160rb-Rp500rb.',
    ],
    essayGuidanceHintsEn: [
      'Compare roomy 45-80 pip Intraday stops against tighter Scalp runs.',
      'Describe Set-and-Alert mechanics preventing premature panic exits.',
      'Include clear micro Cent calculation steps under Rp1,000,000.',
    ],
  },
  'swing-h4-daily-relaxed-playbook': {
    slug: 'swing-h4-daily-relaxed-playbook',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Eksekusi multi-hari timeframe H4 dan Daily mengikuti angin makro dan aliran institusi COT tanpa begadang.',
    photoCaptionEn: 'Multi-day H4 and Daily institutional swings synced calmly with macro policy and COT flows.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Gelombang pasar timeframe besar (H4 hingga Daily) mencerminkan aliran dana makro riil manajer aset dunia (Lo et al., 2000; Bessembinder, 1992). Penarikan jarak Stop Loss yang lebih lebar (120-200 pips) memungkinkan pekerja kantoran maupun mahasiswa mempertahankan posisi melewati getaran harian tanpa harus terus mengintip HP saat bekerja.',
      'Berkat hadirnya akun Cent berdesimal kecil `0.01 lot` (`0.01 oz`), jarak 150 pips hanya setara kerugian Rp2.400 (15 USC) saja, menjadikan strategi Swing kelas institusional sangat terjangkau oleh masyarakat bermodal di bawah Rp500 ribu.',
    ],
    sec2InstitutionalEn: [
      'H4/Daily setups isolate broad macro & COT trends smoothly with minimal screen maintenance, made affordable to tiny Rp320k accounts via 0.01 Cent micro units.',
      'Always verify broker Swap-Free eligibility ahead of multi-day carries.',
    ],
    anatomyRowsId: [
      ['Memegang posisi Swing memakai akun Standar bermodal Rp200 ribu.', 'Menggunakan Akun Cent 0.01 lot di mana 150 pips hanya senilai Rp2.400.', 'Pastikan akun bertipe Cent Swap-Free bila menahan transaksi > 2 hari.'],
      ['Menutup posisi Swing gara-gara koreksi kecil 1 candle M15.', 'Melihat penutupan hanya pada candle H4 (setiap 4 jam) atau Daily.', 'Matikan notifikasi noise LTF agar tidak goyah saat tren beristirahat.'],
      ['Menahan posisi Swing melawan arah Fundamental The Fed & COT.', 'Hanya menyusun Swing H4/Daily searah Radar Fundamental & CFTC COT.', 'Cek tab Fundamental & COT di Riset JGS setiap hari Minggu malam.'],
    ],
    anatomyRowsEn: [
      ['Holding 150-pip wide stops inside Standard 100 oz accounts.', 'Deploying 0.01 Cent Lots (150 pips = Rp2,400 / 15 USC safely).', 'Confirm Swap-Free account privileges beforehand.'],
      ['Closing H4 swings anxiously on tiny M15 counter-wicks.', 'Auditing structure exclusively upon completed H4/Daily closes.', 'Steer clear of micro-noise temptations mid-swing.'],
      ['Counter-trading strong Central Bank & COT divergence on Daily.', 'Aligning every multi-day swing behind Macro & COT conviction.', 'Review weekly Research HUB panels calmly every Sunday night.'],
    ],
    sec4QuantId: [
      'Untuk modal Rp320.000 ($20 = 2.000 USC), batas aman 1% = 20 USC (Rp3.200). Dengan ukuran terkecil `0.01 Cent Lot`, kamu bisa memberi jarak SL lega **160-200 pips** ($16-$20 Emas!) sekaligus membidik kolam likuiditas mingguan sejauh **450-600 pips (+45 s/d +60 USC = +Rp7.200 s/d +Rp9.600)** cukup lewat 15 menit pemetaan setiap malam.',
    ],
    sec4QuantEn: [
      'A Rp320,000 ($20 = 2,000 USC) account holds generous 160-200 pip stops on 0.01 Cent Lot peacefully under 1% equity risk while capturing +450 to +600 pip swings in 15 minutes nightly.',
    ],
    sec4FormulaId: 'Swing_JGS = SL:[120..200 pips] | TP:[300..650 pips] | Cek: 15 Menit/Hari | Akun: Cent Swap-Free',
    sec4FormulaEn: 'JGS_Swing = SL:[120..200 pips] | TP:[300..650 pips] | Audit: 15m Daily | Cent Swap-Free',
    hotspots: makePins4(
      ['Kompas H4 / Daily + Makro COT', 'SL Lebar Aman 120-200 Pips', 'Verifikasi Bebas Biaya Swap', 'Target Mingguan 300-650 Pips'],
      ['Menjamin arah gelombang besar selaras fundamental bank sentral.', 'Kebal terhadap jarum berita intraday harian yang sering mengecoh.', 'Memastikan biaya inap semalaman tidak memakan profit.', 'Memberi rasio R:R 1:3 sempurna tanpa stres menatap layar.'],
      ['Mengubah trade Scalping gagal menjadi alasan Swing.', 'Masuk 0.10 lot di H4 hingga melanggar jauh batas 1% saldo.', 'Mengecek chart tiap 5 menit selama 5 hari nonstop.', 'Masuk posisi Swing tanpa memeriksa arah laporan COT mingguan.'],
      ['Mapping rutin cukup Minggu malam dan tiap tutup candle Daily.', 'Pakai 0.01 Cent Lot pada modal Rp160rb-Rp500rb.', 'Cek label bebas swap pada spesifikasi instrumen Exness/broker.', 'Pasang alarm di level TP1 (+2R) dan tutup aplikasi dengan tenang.']
    ),
    detective: {
      scenarioId: 'Kamu seorang mahasiswa atau pekerja penuh waktu dengan modal Rp320.000 (2.000 USC) yang hanya bisa membuka grafik 15 menit di malam hari. Gaya mana paling sehat?',
      scenarioEn: 'You work full-time holding Rp320,000 (2,000 USC) with only 15 calm evening minutes daily. Which playbook fits best?',
      optionsId: ['Swing H4-Daily (0.01 Cent Lot, SL 150-180 pips risiko <= Rp2.880, target mingguan 400+ pips)', 'Scalping M1 terus-menerus diam-diam saat jam rapat kantor', 'Trading All-In saat NFP'],
      optionsEn: ['Swing H4-Daily (0.01 Cent Lot, 150-180 pip SL inside 1% cap, calm weekly 400+ pip target)', 'Secret M1 scalping during work meetings', 'All-In NFP coin flips'],
      correctIndex: 0,
      explanationId: 'Swing H4-Daily di akun Cent menyelaraskan kesibukan hidup nyata dengan keunggulan arus tren jangka menengah bebas stres.',
      explanationEn: 'H4-Daily Cent swinging harmonizes busy real-world schedules cleanly with higher-timeframe edge.',
    },
    essayGuidanceHintsId: [
      'Jelaskan profil siapa paling diuntungkan dari gaya Swing H4-Daily dan jadwal pemantauannya.',
      'Hitung persentase risiko 0.01 Cent lot pada jarak SL 150 pips untuk modal kecil.',
      'Tegaskan wajibnya menyelaraskan Swing dengan Fundamental/COT & fitur Swap-Free.',
    ],
    essayGuidanceHintsEn: [
      'Detail who benefits most from H4-Daily Swing timing.',
      'Verify exact Cent risk math on 150-pip stops under tiny deposits.',
      'Highlight Swap-Free status and Macro/COT trend alignment.',
    ],
  },
  'understanding-cpi-nfp-fomc-wib': {
    slug: 'understanding-cpi-nfp-fomc-wib',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Pengaruh langsung data Inflasi CPI, Tenaga Kerja NFP & Suku Bunga FOMC terhadap arah Dolar dan Emas.',
    photoCaptionEn: 'Translating US CPI inflation, NFP hiring, and FOMC yields straight into USD vs Gold flows.',
    sandboxKind: 'FED_INTERMARKET',
    sec2InstitutionalId: [
      'Di balik pergerakan tajam jam 19:30 / 20:30 WIB, penggerak utamanya bukan sensasi berita melainkan kalkulasi ulang biaya modal bebas risiko oleh bank investasi dunia (Mishkin, 2022). Ketika CPI atau NFP melampaui ekspektasi (*Actual > Forecast*), probabilitas suku bunga The Fed bertahan mahal naik seketika, menarik arus likuiditas kembali ke Dolar AS.',
      'Sebaliknya, saat inflasi maupun pertumbuhan pekerjaan mendingin (*Actual < Forecast*), pasar obligasi mengantisipasi pemangkasan bunga lebih cepat, menekan Real Yield turun sehingga Emas dan ekuitas teknologi mendapat dorongan naik.',
      'Melalui tab **Berita Pasar (News WIB) & Kompas Buy/Sell** di JGS, seluruh angka kompleks ini diringkas menjadi Skenario A vs Skenario B yang sangat mudah dibaca pemula.',
    ],
    sec2InstitutionalEn: [
      'Major macro spikes reprice sovereign rate expectations instantly whenever Actual readings diverge meaningfully from Consensus Forecasts.',
      'JGS News WIB Compass boils these complex prints straight into Scenario A (USD strength) vs Scenario B (Gold/FX strength).',
    ],
    anatomyRowsId: [
      ['Langsung klik hanya melihat warna angka hijau/merah tanpa lihat revisi.', 'Membaca kejutan Actual vs Forecast serta komponen pelengkap (Unemployment/Revisi).', 'Gunakan Berita sebagai kompas arah Skenario A & B sebelum sesi aktif.'],
      ['Bingung kenapa jadwal rilis AS berganti dari 19:30 ke 20:30 WIB.', 'Mengikuti transisi Daylight Saving Time Maret (19:30) vs November (20:30).', 'Cek timer hitung mundur berita WIB langsung di tab Riset & Berita JGS.'],
      ['Melawan tren besar pasca data CPI panas beruntun.', 'Menyelaraskan transaksi searah kejutan kebijakan suku bunga yang terkonfirmasi.', 'Ikuti konfirmasi arah baru 5-15 menit sesudah rilis.'],
    ],
    anatomyRowsEn: [
      ['Clicking blindly on green/red digits ignoring component revisions.', 'Evaluating Actual vs Forecast deviations alongside revision components.', 'Anchor daily directional plans smoothly around Scenario A/B maps.'],
      ['Missing why 19:30 WIB moves to 20:30 WIB every November.', 'Tracking US Daylight Saving switches automatically on JGS WIB News clock.', 'Double-check live release countdown timers before evening trades.'],
      ['Buying aggressively right into repeated hot CPI rate surprises.', 'Aligning direction with new macro surprise flows post-settlement.', 'Trade post-release confirmation smoothly along macro currents.'],
    ],
    sec4QuantId: [
      'Sebuah kejutan CPI turun -0.3% di bawah Forecast berpotensi mendorong pelemahan US10Y sebesar 10-15 bps dan menggerakkan XAUUSDc sebesar +150 hingga +350 pips sepanjang malam. Memahami arah angin ini memberi keyakinan membiarkan profit lari tenang mencapai +2.5R sampai +3.5R tanpa cepat panik menutup posisi.',
    ],
    sec4QuantEn: [
      'Unexpected -0.3% CPI cool misses routinely push US10Y down 10-15 bps, fueling 150-350 pip directional gold travel where holding +2.5R+ targets thrives.',
    ],
    sec4FormulaId: 'Kejutan_Makro = Aktual - Perkiraan_Forecast  |  Actual > Forecast => USD Kuat, Emas Tertekan',
    sec4FormulaEn: 'Macro_Surprise = Actual - Consensus_Forecast  |  Hot Beat => USD Firm, Gold Soft',
    hotspots: makePins4(
      ['Kalender Rilis CPI & NFP (WIB)', 'Selisih Actual vs Forecast', 'Skenario A: Data Panas -> USD Naik', 'Skenario B: Data Dingin -> Emas Naik'],
      ['Jadwal terpenting pergerakan bulanan jam 19:30 / 20:30 WIB.', 'Selisih ekspektasi bukan sekadar angka berdiri sendiri.', 'Mendorong yield AS naik sehingga menekan Emas/Euro sementara.', 'Membuka peluang pemangkasan bunga yang mengangkat Emas/Nasdaq.'],
      ['Mengabaikan revisi data bulan lalu saat berita NFP.', 'Mengira angka sama dengan bulan kemarin berarti tidak bergerak.', 'Membeli Emas agresif detik ke-1 saat CPI keluar sangat panas.', 'Tidak menyesuaikan jam musim dingin 20:30 WIB di bulan November.'],
      ['Cek countdown tepat di halaman Berita Pasar JGS sebelum sesi malam.', 'Catat angka ekspektasi sebelumnya agar siap membaca selisihnya.', 'Aktifkan kompas Sell XAUUSD hanya sesudah M5 turun mengonfirmasi.', 'Aktifkan kompas Buy XAUUSD hanya sesudah M5 naik mematahkan struktur.']
    ),
    detective: {
      scenarioId: 'Rilis NFP AS pukul 20:30 WIB menunjukkan lapangan kerja AS bertambah jauh lebih SEDIKIT dari Forecast (Actual 85k vs Forecast 180k) disertai naiknya angka Pengangguran. Kompas Buy/Sell yang terbentuk?',
      scenarioEn: 'At 20:30 WIB, US NFP prints sharply weaker hiring (85k vs 180k Forecast) alongside higher Unemployment. What directional compass unfolds?',
      optionsId: ['Dolar melemah -> Skenario B aktif: Fokus cari konfirmasi BUY XAUUSDc & EURUSDc pasca berita tenang', 'Dolar meroket kuat -> All-in Sell Emas segera', 'Pasar tutup sebulan penuh'],
      optionsEn: ['USD softens cleanly -> Scenario B Active: Hunt BUY XAUUSDc / EURUSDc setups post-settlement', 'USD spikes -> Instant Sell Gold', 'Exchanges shut for a month'],
      correctIndex: 0,
      explanationId: 'Pasar tenaga kerja melemah mendorong ekspektasi pelonggaran The Fed, menekan Dolar dan menyokong reli Emas serta Euro.',
      explanationEn: 'Cooling US labor conditions soften rate expectations, weighing on USD while uplifting Gold and EUR.',
    },
    essayGuidanceHintsId: [
      'Jelaskan mekanisme perbandingan Actual vs Forecast pada rilis CPI, NFP, dan FOMC.',
      'Uraikan arti Skenario A (Panas) dan Skenario B (Dingin) terhadap XAUUSD & USD.',
      'Cantumkan catatan pengingat perubahan jam musim dingin AS (19:30 -> 20:30 WIB).',
    ],
    essayGuidanceHintsEn: [
      'Explain Actual vs Forecast comparison rules across CPI, NFP, and FOMC.',
      'Separate Scenario A (Hot Beat) vs Scenario B (Cool Miss) flows cleanly.',
      'Remember US winter DST shift adjustments in Indonesian WIB time.',
    ],
  },
  'pre-news-spread-hmr-blackout': {
    slug: 'pre-news-spread-hmr-blackout',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Aturan penahanan margin tinggi HMR dan lonjakan spread sebelum rilis berita ekonomi merah.',
    photoCaptionEn: 'Broker Higher Margin Requirements (HMR) and spread widening defense 15 minutes ahead of major releases.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Model seleksi merugikan Glosten & Milgrom (1985) menjelaskan fenomena rutin tepat sebelum pengumuman data penting: seluruh penyedia likuiditas bank menarik kuotasi harga rapat mereka hingga menyisakan jarak Bid-Ask Spread melebar drastis demi melindungi diri dari transaksi kecepatan milidetik.',
      'Selain itu, broker teregulasi modern termasuk Exness menerapkan aturan **HMR (Higher Margin Requirements)** sejak 15 menit sebelum hingga 5 menit sesudah berita merah berdampak tinggi: daya ungkit (Leverage) dibatasi sementara ke sekitar `1:200`, memblokir order baru yang terlalu memaksakan margin serta melindungi sistem dari lonjakan saldo negatif.',
      'Menjadikan jendela T-15m s/d T+5m sebagai zona larangan membuka transaksi baru menyelamatkan saldo Rp160.000 dari kerugian tak terkontrol akibat slippage.',
    ],
    sec2InstitutionalEn: [
      'Asymmetric information risks force market makers wide pre-news while Exness-style HMR rules cap leverage dynamically for 20 minutes around red prints.',
      'Enforcing T-15m to T+5m order blackouts guarantees zero unexpected slippage surprises.',
    ],
    anatomyRowsId: [
      ['Memasang Buy Stop + Sell Stop jebakan berdekatan jam 19:28 WIB.', 'Mengosongkan pending order sempit dan menanti badai selesai.', 'Hapus pending order dekat harga 15 menit sebelum rilis merah.'],
      ['Kaget order tertolak pesan "Not Enough Money" akibat aturan HMR.', 'Mengetahui jendela pengurangan leverage sementara T-15m s/d T+5m.', 'Tunggu 5-10 menit sesudah pengumuman hingga leverage normal kembali.'],
      ['Menaruh Stop Loss tipis di bawah 20 pips saat rilis FOMC.', 'Memahami celah harga lompat (*Price Gap / Slippage*) saat rilis.', 'Masuk hanya sesudah spread kembali turun normal ke kisaran <25 poin.'],
    ],
    anatomyRowsEn: [
      ['Placing opposing tight Buy/Sell Stop straddles at 19:28 WIB.', 'Purging tight pending orders 15 minutes pre-announcement.', 'Stand calmly off-market ahead of extreme event risk.'],
      ['Shocked by temporary HMR leverage caps shrinking order capacity.', 'Respecting automated pre-news 1:200 HMR protection intervals.', 'Resume entries smoothly once normal leverage returns T+5m.'],
      ['Setting tight 20-pip stops through violent FOMC release ticks.', 'Acknowledging bid-ask vacuum slippage risks across macro prints.', 'Wait cleanly until spreads compress back below normal ranges.'],
    ],
    sec4QuantId: [
      'Seorang pengguna bermodal Rp160.000 (1.000 USC) yang menaruh SL 20 pips di lot `0.05` (rencana risiko 10 USC / Rp1.600) pada detik rilis NFP dapat terpeleset (*Slippage*) menutup di 90 pips (`-45 USC / -Rp7.200`) atau 4,5 kali lipat rencana awal hanya dalam 1 detik! Satu keputusan disiplin diam selama 20 menit langsung menutup kebocoran ekor tersebut.',
    ],
    sec4QuantEn: [
      'News slippage turns intended 20-pip (Rp1,600) stops instantly into -90-pip (-Rp7,200) unplanned hits inside 1 second; 20-minute blackout discipline removes this hazard completely.',
    ],
    sec4FormulaId: 'Zona_Terlarang_Order = [Jam_Rilis_Merah - 15 Menit .. Jam_Rilis_Merah + 5 Menit]',
    sec4FormulaEn: 'Order_Blackout = [HighImpact_News - 15m .. HighImpact_News + 5m]',
    hotspots: makePins4(
      ['T-15 Menit: Mulai HMR & Bersih Pending', 'Detik Rilis: Lonjakan Spread 5x', 'Risiko Slippage Tembus SL', 'T+5m: Kembalinya Spread Normal'],
      ['Aturan broker memperketat margin & menghapus leverage tak terbatas sementara.', 'Penyedia likuiditas mundur menciptakan jarak beli-jual ekstra tebal.', 'Order berhenti dieksekusi di harga tersedia pertama melewati garis merah.', 'Keadaan kembali stabil siap mengeksekusi arah tren terkonfirmasi.'],
      ['Mengira bisa mencuri untung cepat di detik ke-0 rilis.', 'Memakai pending straddle Buy/Sell Stop berharap satu arah pasti untung.', 'Bingung kenapa posisi minus jauh melebihi harga Stop Loss tertera.', 'Langsung balas dendam di menit ke-2 saat volatilitas masih kacau.'],
      ['Pasang pengingat alarm HP 20 menit sebelum NFP/CPI/FOMC.', 'Tutup atau amankan breakeven posisi dekat sebelum badai mulai.', 'Selalu sadar adanya kemungkinan celah harga di luar kendali MT5.', 'Baru lihat chart tenang di menit ke-6 sampai menit ke-15 pasca berita.']
    ),
    detective: {
      scenarioId: 'Pukul 19:25 WIB (5 menit menjelang CPI AS), spread XAUUSD di Market Watch tiba-tiba naik tajam dan fitur HMR aktif. Apa keputusan paling cerdas?',
      scenarioEn: 'At 19:25 WIB (5 minutes before US CPI), XAUUSD spreads jump steeply and HMR limits activate. Smartest move?',
      optionsId: ['Tunggu tenang di pinggir hingga minimal pukul 19:36 WIB sesudah spread kembali wajar sebelum entry', 'Pencet Buy & Sell bersamaan langsung sekarang', 'Matikan aplikasi selamanya'],
      optionsEn: ['Wait peacefully hands-off past 19:36 WIB until normal spreads and direction restore cleanly', 'Fire dual opposite Market bets right now', 'Throw away your phone'],
      correctIndex: 0,
      explanationId: 'Melewati periode blackout melindungi akun dari spread melebar dan hentakan jarum awal.',
      explanationEn: 'Respecting pre-news blackout windows protects equity from extreme friction and chaotic initial whipsaw.',
    },
    essayGuidanceHintsId: [
      'Jelaskan fenomena pelebaran spread (Glosten & Milgrom, 1985) dan aturan broker HMR sebelum berita.',
      'Uraikan bahaya nyata Slippage yang membuat kerugian membengkak melebihi angka rencana SL 1%.',
      'Tegaskan jendela waktu blackout T-15 menit sampai T+5 menit.',
    ],
    essayGuidanceHintsEn: [
      'Connect pre-news spread spikes (Glosten & Milgrom) cleanly to broker HMR caps.',
      'Detail slippage mechanics causing unplanned overshoot losses.',
      'Reinforce T-15m to T+5m execution lockout rules.',
    ],
  },
  'post-news-displacement-sniper': {
    slug: 'post-news-displacement-sniper',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Masuk dengan tenang pada pullback FVG 5-15 menit pasca rilis berita setelah lonjakan awal mereda.',
    photoCaptionEn: 'Patient post-news FVG retracement sniper entries 5-15 minutes after release turbulence.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Dalam riset struktur informasi pengumuman makroekonomi (Andersen & Bollerslev, 1998), kejutan volatilitas paling liar berhenti dalam 5 menit pertama ketika algoritma memproses teks awal, membuka jalan bagi gelombang arus pesanan institusional riil selama beberapa jam berikutnya.',
      'Taktik Sniper T+5 s/d T+15 menunggu candle M5 pertama atau kedua selesai mencetak arah Displacement bersih searah kejutan berita aktual, lalu meletakkan Pending Limit pada Fair Value Gap mundur pertama ketika biaya spread telah normal.',
      'Karena rentang candle pasca berita lebih panjang dari hari biasa, menyesuaikan ukuran lot turun (misal ke `0.01 Cent lot`) memastikan risiko tetap nyaman di bawah Rp1.600.',
    ],
    sec2InstitutionalEn: [
      'Initial algorithmic whiplash clears within 5 minutes post-release, revealing true multi-hour macro trends anchored cleanly on fresh M5 FVG pullbacks.',
      'Step down Cent volume slightly around taller post-news candles so risk never violates 1%.',
    ],
    anatomyRowsId: [
      ['Mengejar candle raksasa ke-1 saat sudah melesat +120 pips jauh.', 'Menunggu penarikan tenang kembali ke 50% FVG pasca berita.', 'Kalau tidak retest kembali dan lari terus, relakan tanpa FOMO!'],
      ['Memasukkan lot 0.05 meski jarak SL M5 berita mencapai 75 pips (-37 USC!).', 'Mengecilkan Cent Lot ke 0.01 agar jarak 75 pips tetap aman Rp1.200 (7.5 USC).', 'Hitung ulang jarak lebar candle pasca rilis di Kalkulator Cent JGS.'],
      ['Masuk melawan arah dorongan besar pasca rilis mengira "sudah ketinggian".', 'Mengikuti arah Displacement searah hasil kejutan Aktual vs Forecast.', 'Jangan pernah melawan kereta cepat berita makro di jam pertama.'],
    ],
    anatomyRowsEn: [
      ['Chasing a runaway +120-pip first bar straight at extreme peaks.', 'Waiting patiently for clean retracement into the formed M5 FVG.', 'Skip un-retested runaway rockets peacefully.'],
      ['Using wide 75-pip news stops with static 0.05 lots (-37.5 USC!).', 'Dropping down smoothly to 0.01 Cent Lot keeping 75 pips at 7.5 USC.', 'Re-calculate post-news stop widths dynamically before clicking.'],
      ['Shorting strong bullish CPI surges calling tops prematurely.', 'Trading strictly in direction of validated post-news macro displacement.', 'Never stand in front of fresh macro discovery moves.'],
    ],
    sec4QuantId: [
      'Contoh nyata di modal Rp160.000 (1.000 USC): 12 menit sesudah CPI dingin melesatkan Emas +110 pips dan menyapu low pra-berita, muncul retes ke FVG M5 berjarak SL 70 pips ($7). Mengambil **0.01 Cent Lot** hanya mempertaruhkan **7 USC (~Rp1.120)** untuk memetik kelanjutan +210 pips (**+21 USC / +Rp3.360**) dengan ketenangan penuh.',
    ],
    sec4QuantEn: [
      'Sniping a calm T+12m FVG pullback at 0.01 Cent Lot limits even a 70-pip post-news SL cleanly to 7 USC (Rp1,120) while harvesting +21 USC (+Rp3,360) expansion comfortably.',
    ],
    sec4FormulaId: 'Entry_Sniper_Berita = Spread_Normal && (T >= +5m) && (Arah_Kejutan == Displacement_M5_FVG)',
    sec4FormulaEn: 'PostNews_Entry = Spread_Normal && (T >= +5m) && (Macro_Print == M5_FVG_Displacement)',
    hotspots: makePins4(
      ['Jarum Judas Menit 0-4 (Abaikan)', 'Displacement Penutup M5 Searah Makro', 'Zona Retes FVG Pasca Berita', 'Scaling 0.01 Cent Lot SL Lebar'],
      ['Sapu likuiditas awal mengecoh pedagang menit nol.', 'Bukti arus modal institusi sungguhan mengonfirmasi arah.', 'Area murah masuk kembali sesudah penyedia likuiditas pulih.', 'Menjaga nominal risiko aman Rp1.100-Rp1.600 di rentang lebar.'],
      ['Masuk agresif saat candle masih berkedip di menit ke-2.', 'Melawan arah berita karena mengira harga "terlalu cepat naik".', 'Langsung klik di pucuk tanpa menunggu tarikan masuk FVG.', 'Memakai ukuran lot besar yang sama seperti hari tenang biasa.'],
      ['Siapkan tangan santai baru menyentuh chart jam T+6 s/d T+15 menit.', 'Bandingkan kejutan Aktual vs Forecast dengan penutupan M5.', 'Pasang Limit sabar di area FVG dengan cek spread < 25 poin.', 'Turunkan ke 0.01 Cent lot jika lebar candle menuntut SL 65-80 pips.']
    ),
    detective: {
      scenarioId: 'Lima belas menit setelah rilis berita CPI yang memicu pelemahan tajam Dolar, spread Exness Cent kembali ke 16 poin dan M5 XAUUSDc menutup kuat ke atas meninggalkan FVG bersih di bawahnya. Langkahmu?',
      scenarioEn: 'Fifteen minutes post-CPI Dollar miss, Exness Cent spreads normalize cleanly to 16 points and Gold prints clean M5 bullish displacement leaving a fresh FVG. Your step?',
      optionsId: ['Siapkan Buy Limit di zona FVG dengan SL di luar ekor berita dan lot disesuaikan agar risiko <= 10 USC (Rp1.600)', 'Segera tekan Sell melawan momentum karena candle terlihat tinggi', 'Tutup seluruh akun'],
      optionsEn: ['Stage Buy Limit inside the fresh FVG scaled carefully under 10 USC SL beneath origin sweep', 'Aggressive Sell fighting macro flow', 'Close account permanently'],
      correctIndex: 0,
      explanationId: 'Spread normal, konfirmasi arah makro, dan retes FVG pasca-release membentuk peluang berprobabilitas tinggi.',
      explanationEn: 'Normalized spreads plus aligned macro displacement and discount FVG pulls deliver crisp high-conviction execution.',
    },
    essayGuidanceHintsId: [
      'Jelaskan cara kerja News Judas Spike 0-4 menit dan mengapa T+5 s/d T+15 jauh lebih unggul.',
      'Uraikan langkah penyesuaian ukuran Cent lot terhadap jarak SL candle berita yang lebih lebar.',
      'Tegaskan pentingnya menyelaraskan arah FVG dengan hasil kejutan angka Aktual berita.',
    ],
    essayGuidanceHintsEn: [
      'Contrast 0-4 minute Judas chaos cleanly against T+5 to T+15 FVG entries.',
      'Explain scaling lots down across wider post-news stop widths.',
      'Ensure macro Actual print direction aligns strictly with M5 Displacement.',
    ],
  },
  'micro-compounding-160k-to-10m': {
    slug: 'micro-compounding-160k-to-10m',
    photoUrl: PHOTOS.GOLD_VAULT,
    photoCaptionId: 'Tangga pertumbuhan modal kecil bertahap dengan disiplin 1% fraksional tanpa mengambil jalan pintas judi.',
    photoCaptionEn: 'Disciplined multi-stage compounding ladder from Rp160,000 ($10 Cent) toward million-Rupiah equity.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Teorema Kelly (Kelly, 1956) dan kajian pengelolaan portofolio (Vince, 1990) menetapkan hukum tak terbantahkan mengenai akumulasi kekayaan majemuk: meningkatkan taruhan terlalu besar secara tiba-tiba mengundang kurva pengembalian geometris negatif akibat *Drawdown Asimetris*.',
      'Pertumbuhan berkelanjutan dari Rp160.000 (1.000 USC) menuju Rp1 Juta hingga Rp10 Juta ditempuh lewat dua mesin sehat bersama: menaikkan ukuran 1% secara otomatis hanya saat ekuitas riil bertambah, serta menambahkan tabungan disiplin pasca membuktikan ekspektasi positif melewati 50-100 catatan jurnal jujur.',
    ],
    sec2InstitutionalEn: [
      'Fractional Kelly scaling raises nominal lot weight strictly in lockstep with rising verified equity while holding downside risk locked at 1%.',
      'Proving skill across 50-100 audited tuition trades eliminates casino temptations when scaling toward Rp10,000,000.',
    ],
    anatomyRowsId: [
      ['Mencoba melipatgandakan $10 menjadi $500 dalam 3 hari lewat risiko 50%.', 'Menjaga risiko tepat 1% dan menaikkan lot perlahan saat saldo naik +50%.', 'Fokus memvalidasi sistem pada 50 transaksi pertamamu terlebih dulu.'],
      ['Menyetor seluruh uang kos Rp5 Juta di minggu pertama sebelum bisa profit.', 'Menuntaskan uji Lab Rp160.000 (1.000 USC) dan Lulus Ijazah sebelum scale-up.', 'Pisahkan 100% dana hidup dari dana latihan & compounding bertahap.'],
      ['Tidak pernah menarik hasil profit sehingga lupa menjaga mental.', 'Mencairkan rutin sebagian keuntungan ke rekening bank pada milestone.', 'Rayakan pertumbuhan nyata secara bertahap dengan disiplin dingin.'],
    ],
    anatomyRowsEn: [
      ['Betting 50% per trade attempting $10 -> $500 weekend flips.', 'Holding steady 1% risk scaling gradually every +50% equity climb.', 'Pass 50-trade sample skill proof at Rp160,000 first.'],
      ['Depositing living savings into Standard lots during month one.', 'Graduating Cent tuition cleanly before deploying saved million-Rupiah steps.', 'Quarantine personal living funds ruthlessly.'],
      ['Never withdrawing realized profits until overconfidence strikes.', 'Paying yourself scheduled milestone withdrawals consistently.', 'Lock real-world wins cleanly along growth tiers.'],
    ],
    sec4QuantId: [
      'Pada ekspektasi positif terukur `+0.575R per transaksi` (Win 45% dengan target 1:2.5), blok 50 setup valid menghasilkan +28.75R. Pada tahap Lab Rp160.000 (`1.000 USC`) hasilnya tumbuh wajar +287 USC; begitu skill terverifikasi dan modal dialokasikan sehat menjadi Rp3 Juta (`~18.750 USC`), ekspektasi yang persis sama secara mekanis menghasilkan +Rp862.500 per blok tanpa menambah satu persen pun risiko!',
    ],
    sec4QuantEn: [
      'Identical +0.575R expectancy generates +Rp862,500 per 50-trade cycle effortlessly once proven skill transfers onto Rp3,000,000 equity without lifting 1% risk caps.',
    ],
    sec4FormulaId: 'Skala_Ekuitas_Sehat = Bukti_50_Trade_Positif -> Fraksi_Konstan_1% -> Naik_Bertahap',
    sec4FormulaEn: 'Healthy_Scaling = 50Trade_Proof -> Fixed_1Pct_Kelly_Fraction -> Staged_Milestones',
    hotspots: makePins4(
      ['Tahap 1: Lab Rp160rb (1.000 USC)', 'Tahap 2: Bukti 50 Setup (+Expectancy)', 'Tahap 3: Skala Fraksional 1%', 'Withdraw Berkala & Jaga Mental'],
      ['Membangun refleks teknik & disiplin bebas tekanan utang.', 'Memvalidasi bahwa strategimu sungguh menguntungkan secara statistik.', 'Ukuran lot naik proporsional mengikuti saldo nyata secara aman.', 'Mencairkan keuntungan menjaga kestabilan psikologi jangka panjang.'],
      ['Menganggap $10 harus langsung membiayai hidup bulan depan.', 'Menyetor tabungan besar padahal Jurnal masih penuh FOMO.', 'Menaikkan lot mendadak 5x ketika sedang kalah.', 'Tidak pernah menarik profit lalu habis saat euforia berlebih.'],
      ['Jadikan 1.000 USC tempat latihan terbaik membuktikan konsistensi.', 'Audit terus hasil di Kalender PnL sebelum menaikkan nominal.', 'Gunakan Cent Calculator tiap kali saldo bertambah 25-50%.', 'Tarik 20-30% profit tiap pencapaian target ke tabungan nyata.']
    ),
    detective: {
      scenarioId: 'Akun Cent latihanmu tumbuh sehat dari 1.000 USC (Rp160.000) menjadi 1.500 USC (Rp240.000) dalam 2 bulan penuh taat SOP. Berapakah batas risiko 1% terbarumu sekarang?',
      scenarioEn: 'Your disciplined Cent account climbed smoothly from 1,000 USC (Rp160k) to 1,500 USC (Rp240k) over two months. What is your updated 1% per-trade risk allowance?',
      optionsId: ['15 USC (~Rp2.400): risiko naik proporsional mengikuti saldo baru dengan menjaga batas aman tetap 1%', 'Langsung melompat menjadi 300 USC per klik', 'Tetap 0 USC tanpa transaksi'],
      optionsEn: ['15 USC (~Rp2,400) scaling proportionally along equity while maintaining immutable 1% bounds', 'Jump recklessly straight to 300 USC per click', 'Never grow lots ever'],
      correctIndex: 0,
      explanationId: 'Prinsip Fractional Kelly menaikkan nominal risiko sejalan pertumbuhan saldo sekaligus mempertahankan pelindung persentase konstan 1%.',
      explanationEn: 'Fractional Kelly expands nominal trade allowance naturally alongside rising equity at fixed 1%.',
    },
    essayGuidanceHintsId: [
      'Uraikan perbedaan realistis antara memvalidasi skill di Rp160.000 dan membesarkan modal ke Rp10 Juta.',
      'Terangkan cara kerja Fraksi Konstan 1% (Kelly Criterion) menjaga kestabilan kurva pertumbuhan.',
      'Jelaskan bahaya penipuan pamer profit instan 1000% dalam beberapa hari.',
    ],
    essayGuidanceHintsEn: [
      'Separate initial skill validation clearly from systematic milestone scaling.',
      'Explain Fractional Kelly constant 1% geometry.',
      'Debunk reckless overnight 10x account flip myths.',
    ],
  },
  'visual-pnl-calendar-audit-sop': {
    slug: 'visual-pnl-calendar-audit-sop',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Visualisasi Kalender PnL bulanan yang memetakan performa riil serta penyebab emosi dalam 3 detik.',
    photoCaptionEn: 'Monthly Visual PnL Calendar separating legitimate system performance from FOMO leaks at a glance.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Psikologi keputusan Kahneman & Tversky (1979) membuktikan bahwa tanpa rekaman objektif, ingatan manusia secara alami melebih-lebihkan kemenangan kebetulan serta menyalahkan "nasib buruk" atas pelanggaran FOMO pribadi. Namun tabel akuntansi 25 kolom kerap memicu kelelahan (*Logging Fatigue*) yang membuat pemula menyerah di minggu pertama.',
      'Kalender Jurnal PnL Visual 3 Detik (`/journal`) di JGS menyederhanakan pencatatan menjadi tiga informasi paling vital: nilai bersih USC/Rupiah harian, gaya eksekusi, serta label jujur satu-klik status perilaku (`Disiplin Sesuai SOP`, `FOMO`, `Geser SL`, `Overtrade`).',
    ],
    sec2InstitutionalEn: [
      'Frictionless 3-second Monthly PnL Calendar tagging removes spreadsheet burnout while exposing exact emotional drawdown causes instantaneously.',
      'Tracking SOP compliance % prevents unnecessary Strategy Hopping.',
    ],
    anatomyRowsId: [
      ['Mencatat 20 kolom rumit sampai berhenti mencatat di hari kelima.', 'Menggunakan Catat Cepat 3 Detik di Kalender PnL `/journal`.', 'Cukup klik tanggal kalender tiap malam sebelum tidur (3 detik).'],
      ['Merayakan profit dari melanggar SOP (tanpa SL / overtrade).', 'Memberi tag jujur "Masuk Kecepatan (FOMO)" walau hasil kebetulan biru.', 'Pisahkan Skor Disiplin SOP dari keberuntungan hasil uang sementara.'],
      ['Menggonta-ganti indikator baru tiap akhir bulan.', 'Menganalisis warna merah di kalender sebelum menyalahkan strategi.', 'Hentikan dulu kebocoran FOMO/Overtrade minimal 60 hari berturut-turut.'],
    ],
    anatomyRowsEn: [
      ['Quitting complex 25-column logs by Friday.', 'Using fast 3-second Calendar entries cleanly every night.', 'Keep audit habits joyful and friction-free.'],
      ['Marking lucky no-SL wins proudly as clean strategy days.', 'Honesty tagging process violations regardless of lucky green dollars.', 'Separate Discipline Score strictly from short-term outcome luck.'],
      ['Switching strategies every month without root-cause data.', 'Auditing red calendar days directly by behavioral flaw.', 'Cure FOMO leaks first before changing rules.'],
    ],
    sec4QuantId: [
      'Ketika melihat Kalender PnL bulanan, apabila seluruh hari merah berasal dari label Balas Dendam (-45 USC) sedangkan seluruh hari bertanda Disiplin Sesuai SOP menghasilkan akumulasi +55 USC bersih, solusi matematis paling efisien bukan belajar indikator baru melainkan menghentikan kebiasaan balas dendam agar net bersih langsung melesat menjadi +55 USC (+Rp8.800 di modal Rp160 Ribu)!',
    ],
    sec4QuantEn: [
      'Isolating red calendar leak tags (-45 USC Tilt vs +55 USC Disciplined SOP) reveals true profitability instantly without wasteful strategy switching.',
    ],
    sec4FormulaId: 'Skor_Kepatuhan_SOP = (Hari_Patuh_SOP / Total_Hari_Trading) * 100%  |  Target >= 85%',
    sec4FormulaEn: 'Calendar_SOP_Score = (Compliant_Trades / Total_Trades) * 100%  |  Target >= 85%',
    hotspots: makePins4(
      ['Kalender Bulanan Hijau vs Merah', 'Pencatat Cepat 3 Detik', 'Skor Disiplin SOP (%)', 'Konversi Transparan USC & Rupiah'],
      ['Menampilkan ringkasan utuh kesehatan performa sepanjang satu bulan.', 'Mengatasi kelelahan mencatat lewat 4 klik ringkas.', 'Indikator kejujuran terpenting penentu kesiapan memperbesar lot.', 'Membiasakan otak melihat nilai nyata uang bukan angka abstrak.'],
      ['Mengabaikan hari rugi dan hanya mencatat hari menang saja.', 'Menyalahkan market tiap kali terkena SL padahal melanggar jam.', 'Menghabiskan waktu 30 menit mengisi Excel lalu berhenti.', 'Mengira tanggal hijau FOMO aman untuk terus diulang.'],
      ['Catat SEMUA hasil win maupun loss setiap malam tanpa terkecuali.', 'Klik tag jujur walau rasanya agak malu mengakui FOMO.', 'Kejar standar Skor Disiplin >= 85% setiap akhir minggu.', 'Evaluasi total Rupiah dan USC setiap hari Sabtu pagi.']
    ),
    detective: {
      scenarioId: 'Selama bulan ini di Kalender PnL `/journal`, Skor Disiplin SOP-mu turun ke 52% karena 4 kali menggeser garis Stop Loss saat minus. Langkah prioritas minggu depan?',
      scenarioEn: 'This month your Calendar Discipline Score dropped to 52% due to widening Stop Losses four times mid-drawdown. Priority fix next week?',
      optionsId: ['Kunci posisi pakai Hard SL di awal dan fokus mengembalikan Skor Disiplin >= 85% menggunakan 0.01 Cent Lot minimum', 'Ganti strategi ICT ke strategi acak lain tanpa mengevaluasi SL', 'Naikkan ukuran lot 4 kali lipat'],
      optionsEn: ['Restore strict 85%+ SOP compliance locking Hard Stops on minimum 0.01 Cent Lot before changing anything else', 'Switch strategies blindly next week', 'Increase lots 4x faster'],
      correctIndex: 0,
      explanationId: 'Menurunkan ukuran ke minimum dan memulihkan kepatuhan Hard SL adalah terapi tercepat memperbaiki Skor Disiplin.',
      explanationEn: 'Dropping lot size briefly while restoring immutable Hard SL stops fixes Discipline Scores immediately.',
    },
    essayGuidanceHintsId: [
      'Jelaskan mengapa pencatatan singkat Kalender 3 Detik jauh lebih efektif daripada spreadsheet panjang.',
      'Paparkan fungsi 4 tag audit jujur membedakan rugi sistem vs rugi pelanggaran emosi.',
      'Tetapkan standar minimal Skor Disiplin sebelum menambah ukuran posisi.',
    ],
    essayGuidanceHintsEn: [
      'Compare fast 3-second Calendar audits cleanly against complex abandoned sheets.',
      'Explain how 4 behavioral tags isolate process errors quickly.',
      'Identify the 85%+ SOP threshold preceding capital expansion.',
    ],
  },
  'capstone-20-semester-readiness': {
    slug: 'capstone-20-semester-readiness',
    photoUrl: PHOTOS.GOLD_VAULT,
    photoCaptionId: 'Piagam kelulusan 20 Semester (120 SKS) THE JEY GANG STRATEGIST menuju Ujian Dinamis & Ijazah Resmi.',
    photoCaptionEn: 'Culminating 20-Semester (120 Credit) Synthesis preparing candidates for Final Certification.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Di seluruh institusi pengelola kekayaan profesional maupun perusahaan prop kuantitatif, pembeda utama strategist yang bertahan puluhan tahun dari bintang sesaat adalah penguasaan utuh lintas lapisan: pemahaman mengapa kebijakan bank sentral menggerakkan harga, kesadaran mikrostruktur buku order serta spread HMR, keteguhan matematika 1% risiko, kesabaran menunggu 3 gerbang konfirmasi, dan kerendahan hati mencatat evaluasi setiap transaksi.',
      'Dengan menuntaskan seluruh 60 Modul across 20 Semester (120 SKS) pada JGS Academy, kamu membawa standar profesional tersebut dalam format yang dapat dijalankan siapa pun mulai modal Rp160.000 (1.000 USC).',
    ],
    sec2InstitutionalEn: [
      'Durable financial strategists unite macro monetary fluency, microstructure spread vigilance, bounded fractional 1% stops, objective 3-gate timing, and candid journal audits.',
      'Clearing all 60 Modules (120 SKS) proves complete mastery ready for Final Dynamic Capstone Verification.',
    ],
    anatomyRowsId: [
      ['Merasa sudah tamat belajar dan berhenti mengecek Jurnal PnL sesudah lulus.', 'Menjadikan Kalender Audit & SOP 1% sebagai budaya hidup selamanya.', 'Pertahankan integritas ilmu di setiap order MT5 nyata.'],
      ['Melupakan tameng Rp1.600 / 1% ketika modal mulai membesar ke Rp10 Juta.', 'Menerapkan persentase fraksi konstan 1% di ukuran ekuitas berapa pun.', 'Jadikan aturan 1% bagian permanen manajemen kekayaanmu.'],
      ['Tergoda menjanjikan imbal hasil tetap palsu ke orang lain.', 'Memegang teguh etika Precision Over Promises & aturan 30% High-Water Mark.', 'Jaga nama baik Rank VIII Celestial Ouroboros serta Alumni JGS.'],
    ],
    anatomyRowsEn: [
      ['Abandoning PnL Calendar tracking immediately after graduating.', 'Maintaining lifetime discipline across honest daily 3-second audits.', 'Carry complete JGS SOP mastery into every live chart.'],
      ['Discarding strict 1% fractional stops once account equity exceeds Rp10M.', 'Holding 1% risk inviolable across micro and multi-million accounts alike.', 'Defend Survival Rules through every future cycle.'],
      ['Promising fixed guaranteed monthly ROI to third-party followers.', 'Upholding Precision Over Promises & audited 30% High-Water Marks.', 'Honor Rank VIII Celestial Ouroboros & Alumni Charter.'],
    ],
    sec4QuantId: [
      'Pada tahap Ujian Kelulusan Resmi (`?tab=certification`), sistem menguji pemahamanmu melalui 20 soal acak anti-nyontek yang mewakili seluruh 20 Semester (`FIN-101` hingga `CMP-505`). Meraih skor minimal >= 80% (minimal 16/20 benar) membuka pengunduhan penuh HD PNG **Ijazah Kelulusan 20 Semester** dan **Transkrip Nilai 120 SKS** bertanda tangan **Jahseya Mochtar Mawardi**.',
    ],
    sec4QuantEn: [
      'Scoring >= 80% (16/20+) across the randomized 20-Semester Dynamic Final Exam certifies your official 120 SKS JGS Diploma and full Academic Transcript PNG downloads signed by Founder Jahseya Mochtar Mawardi.',
    ],
    sec4FormulaId: 'Syarat_Alumni_JGS = (60/60 Modul == Lulus) && (Ujian_Akhir_20_Soal >= 80%)',
    sec4FormulaEn: 'JGS_Alumni_Seal = (60/60 Modules == Cleared) && (Final_20Q_Exam >= 80%)',
    hotspots: makePins4(
      ['Fondasi Makro & Ekonomi (Sem 1-5)', 'Struktur Teknikal & ICT (Sem 6-14)', 'Taktik Gaya, Berita & COT (Sem 15-19)', 'Audit Kalender & Ijazah 120 SKS (Sem 20)'],
      ['Menguasai nilai uang, suku bunga Fed, MT5, 1.000 USC, & psikologi.', 'Membaca Support-Demand, Wyckoff, Volume Profile, hingga 3-Gerbang entry.', 'Menguasai Scalping/Intraday/Swing, HMR berita, multi-pair, & COT.', 'Menyempurnakan compounding modal kecil serta membuka Ijazah Resmi JGS.'],
      ['Mencari jalan pintas VIP berbayar sebelum paham dasar pasar.', 'Menyalin settingan robot Martingale tanpa memahami High-Water Mark.', 'Berhenti belajar saat menyentuh 10 kali Stop Loss beruntun.', 'Menjual janji untung pasti bertentangan dengan integritas JGS.'],
      ['Review Specimen Ijazah & Transkrip langsung di Portal Sertifikasi.', 'Selesaikan Ujian Dinamis 20 Soal dengan kejujuran penuh.', 'Cetak kedua dokumen resmi HD PNG bersama ID Gang milikmu.', 'Lanjutkan disiplin 1% dan Kalender PnL seumur hidup!']
    ),
    detective: {
      scenarioId: 'Selamat telah mencapai modul ke-60! Setelah lulus dan mencetak Ijazah resmi JGS Academy, prinsip manakah yang menjamin perjalanan tradingmu tetap jujur, aman, dan berkelanjutan?',
      scenarioEn: 'You reached Module 60! Post-graduation, which founding pledge keeps every live trade sustainable and ethical?',
      optionsId: ['Small Capital. Serious Strategy. Precision Over Promises. Selalu utamakan manajemen risiko 1%, konfirmasi valid, & kejujuran Jurnal PnL.', 'Memakai akun Standar all-in saat berita tanpa SL demi cepat kaya.', 'Menjual sinyal palsu dengan jaminan untung tetap.'],
      optionsEn: ['Small Capital. Serious Strategy. Precision Over Promises. Enforce 1% caps, 3-gate confirmations, & honest Calendar reviews always.', 'Over-leveraged pre-news Standard bets.', 'Guaranteeing fixed monthly ROI blindly.'],
      correctIndex: 0,
      explanationId: 'Nilai integritas, akurasi konfirmasi, dan disiplin risiko adalah warisan sejati seorang lulusan The Jey Gang Strategist.',
      explanationEn: 'Capital preservation, analytical rigor, and transparency define every JGS Academy graduate.',
    },
    essayGuidanceHintsId: [
      'Rangkum pelajaran terpentingmu lintas keempat Tahap kurikulum (Fondasi 1.000 USC, Struktur & 3-Gerbang, Gaya/Berita/COT, & Kalender Compounding).',
      'Tegaskan komitmen menjaga risiko maksimal 1% dan menjauhi FOMO berita/Martingale.',
      'Tuliskan rencana aksi pribadimu dalam 30 hari pertama pasca wisuda di JGS Academy.',
    ],
    essayGuidanceHintsEn: [
      'Synthesize your biggest takeaways across all 4 curriculum stages (1,000 USC shields, 3-Gate technicals, News/COT alignment, and PnL Calendar compounding).',
      'Reaffirm hard 1% risk caps avoiding Martingale or pre-news gambling.',
      'Outline your concrete 30-day execution roadmap post-graduation.',
    ],
  },
};
