import type { ModuleDeepMonograph, DiagramHotspotPin } from './academy-monographs-part1';

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

export const MONOGRAPHS_PART_2: Record<string, ModuleDeepMonograph> = {
  // =========================================================================
  // SEMESTER 07 (WAV-301)
  // =========================================================================
  'elliott-wave-mass-psychology': {
    slug: 'elliott-wave-mass-psychology',
    photoUrl: PHOTOS.EXCHANGE_FLOOR,
    photoCaptionId: 'Struktur Gelombang Fraktal (Ralph Nelson Elliott, 1938), Memetakan siklus emosi publik antara 5 Gelombang Impuls searah dan 3 Gelombang Koreksi.',
    photoCaptionEn: 'Elliott Wave Fractal Architecture (1938), Mapping collective sentiment swings across 5 Motive Impulses and 3 Corrective Waves.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Pada tahun 1938 lewat karyanya *The Wave Principle*, akuntan korporasi AS **Ralph Nelson Elliott** mengobservasi bahwa indeks saham Dow Jones tidak bergerak linear, melainkan berdenyut dalam siklus fraktal psikologi manusia (**5 Gelombang Impuls searah tren: 1-2-3-4-5** diikuti **3 Gelombang Koreksi berlawanan: A-B-C**). Secara perilaku massa, Gelombang 1 dimotori pembeli awal yang terinformasi; Gelombang 2 mengguncang ketakutan publik namun tidak menembus titik awal nol; sementara Gelombang 3 menjadi ledakan terkuat dan terpanjang saat dana institusi serta publik serentak masuk.',
      'Agar hitungan gelombang tidak berubah menjadi karangan imajinatif bebas (*Hindsight Bias*), Robert Prechter dan Frost mengunci **3 Hukum Mutlak Elliott Wave** yang tidak boleh dilanggar sekali pun: (1) Gelombang 2 pantang mengoreksi melebihi 100% awal Gelombang 1; (2) Gelombang 3 tidak boleh menjadi yang terpendek di antara Gelombang 1, 3, dan 5; serta (3) Gelombang 4 tidak boleh memasuki teritori puncak harga Gelombang 1 pada pasar spot.',
      'Kelemahan besar metode Elliott terletak pada *Alternation & Multiple Valid Counts*: dua analis berpengalaman dapat melabeli chart yang sama secara berlainan hingga gelombang terlanjur selesai. Oleh karena itu di JGS, Elliott Wave digunakan sebagai kompas konteks psikologi pasar ("apakah kita di awal Gelombang 3 atau ujung lelah Gelombang 5?"), BUKAN tombol menebak tanpa konfirmasi struktur SL.',
    ],
    sec2InstitutionalEn: [
      'Ralph Nelson Elliott (1938) formalized self-similar crowd cycles into 5 Motive Impulses (1-2-3-4-5) and 3 Corrective waves (A-B-C), bounded strictly by three invariant cardinal laws preventing Wave 2 full retracement, shortest Wave 3, or Wave 4 territory overlap.',
      'Because multiple valid wave counts exist live before completion, JGS relies on Elliott purely as macro cycle context alongside hard invalidation rules.',
    ],
    anatomyRowsId: [
      ['Membeli di akhir Gelombang 5 tepat ketika euforia media sosial sedang puncak-puncaknya.', 'Gelombang 5 diikuti koreksi mendalam A-B-C; desk mengambil untung kepada pembeli terakhir.', 'Hindari mengejar reli vertikal yang sudah mencetak 5 dorongan terpisah; tunggu koreksi A-B-C selesai.'],
      ['Memaksakan label "Gelombang 3 pasti naik ke $3,000" padahal titik awal Gelombang 1 sudah tertembus.', 'Bila hukum mutlak dilanggar, penghitungan otomatis gugur (Invalidated), tidak boleh dinegosiasi!', 'Jadikan batas awal Gelombang 1 atau lembah Gelombang 2 sebagai lokasi Stop Loss objektif 10 USC.'],
      ['Memakai 14 skenario alternatif gelombang sekaligus hingga ragu mengambil keputusan nyata.', 'Analis kuantitatif hanya memperhitungkan struktur berisiko simetris dengan pembatalan tunggal.', 'Gunakan hanya untuk mengidentifikasi zona masuk awal Gelombang 3 (sesudah koreksi Wave 2).'],
    ],
    anatomyRowsEn: [
      ['Buying parabolic Wave 5 extremes fueled by peak retail euphoria.', 'Wave 5 completion transitions directly into broad A-B-C structural re-pricing.', 'Avoid late breakouts past multi-leg extensions; wait calmly for corrective pullbacks.'],
      ['Holding losing Wave 2 positions even after price breaches Wave 1 origin.', 'Breaking Wave 2 invariance invalidates the thesis cleanly without negotiation.', 'Place objective 10 USC stops cleanly behind Wave 1 origin or Wave 2 pivots.'],
      ['Paralyzing execution across 6 ambiguous nested sub-counts.', 'Keep labeling clean focusing solely on Wave 2 completion toward Wave 3 momentum.', 'Validate every Wave entry strictly alongside displacement MSS + FVG geometry.'],
    ],
    sec4QuantId: [
      'Lokasi paling menguntungkan dari seluruh siklus 8-gelombang Elliott bagi modal mikro `1.000 USC ($10)` adalah **penangkapan ujung koreksi Gelombang 2 menuju permulaan Gelombang 3**! Mengapa? Karena Hukum Mutlak 1 memberimu lokasi Stop Loss eksak hanya 1 sentuhan di balik titik dasar awal Gelombang 1.',
      'Misalkan Gelombang 1 emas baru saja melonjak dari `$2,630` ke `$2,644` (`+$14`), lalu terkoreksi tenang membentuk pola tiga ayunan menuju dasar `$2,635` (potensi Gelombang 2). Kamu membuka `0,02 Cent lot` di `$2,635` dengan meletakkan SL mutlak di `$2,630` (jarak `$5` = risiko tepat `10 USC` atau `1%` ekuitas).',
      'Jika ternyata hitunganmu meleset dan `$2,630` ditembus turun, Hukum 1 menyatakan hipotesis Gelombang 3 resmi batal dan kamu keluar santai cukup menanggung `-10 USC`. Sebaliknya bila Gelombang 3 sejati meledak melampaui panjang Gelombang 1 ke `$2,658`, keuntungan mencapai `+$46 USC (+4,6R)` dengan asimetri sempurna.',
    ],
    sec4QuantEn: [
      'Entering at potential Wave 2 completion ($2,635) places exact invalidation at Wave 1 origin ($2,630 = $5.00 SL -> 0.02 lot = 10 USC), securing effortless +4.6R asymmetry if explosive Wave 3 clears $2,658.',
      'If $2,630 fractures, Cardinal Rule #1 terminates the bias cleanly for a tiny 1% cost.',
    ],
    sec4FormulaId: 'Target Konservatif Wave 3 >= 1,618 × Panjang Wave 1  |  Batas SL Mutlak Invalidation Wave 2 = Asal Awal Wave 1 (10 USC Cap)',
    sec4FormulaEn: 'Wave 3 Typical Extension >= 1.618 × Wave 1  |  Objective Wave 2 Invalidation = Origin of Wave 1 (10 USC Cap)',
    hotspots: makeHotspots(
      ['Gelombang 1 (Inisiasi Awal)', 'Gelombang 2 (Uji Koreksi & SL)', 'Gelombang 3 (Ekspansi Terkuat)', 'Koreksi A-B-C (Pendinginan)'],
      ['Pemain awal mulai mengubah arah setelah fase akumulasi berakhir.', 'Retracement dalam (sering 61,8%) yang pantang melewati titik start awal Wave 1.', 'Partisipasi institusional & momentum masif; wajib lebih panjang dari minimal salah satu.', 'Tiga kaki koreksi mereset euforia sebelum siklus berikutnya berulang fraktal.'],
      ['Menyangka koreksi Wave 2 adalah kehancuran tren lalu menjual di bawah.', 'Mengejar entry telat di puncak Wave 5 setelah 5 dorongan sudah lengkap.', 'Menggeser SL turun melewati awal Wave 1 padahal hitungan sudah gugur.', 'Mengabaikan konteks timeframe besar saat menghitung gelombang M1.'],
      ['Fokus berburu awal Wave 3 tepat sesudah pullback Wave 2 memantul.', 'Gunakan awal Wave 1 sebagai pagar batas invalidasi Stop Loss 10 USC.', 'Ambil sebagian atau penuh profit menjelang ekstensi akhir Wave 5.', 'Tunggu struktur A-B-C tuntas sebelum mencari siklus impuls berikutnya.']
    ),
    detective: {
      scenarioId: 'Sebuah analisis memprediksi XAUUSD sedang masuk awal Gelombang 3 naik, namun tiba-tiba harga jatuh menembus ke bawah titik start asal Gelombang 1. Apa yang wajib dilakukan trader berdasar Hukum Mutlak Elliott?',
      scenarioEn: 'Gold is labeled as starting bullish Wave 3, yet price breaks beneath the absolute starting point of Wave 1. What must the analyst immediately conclude?',
      optionsId: [
        'Hukum Mutlak 1 dilanggar: skenario Bullish Impulse resmi gugur dan harus dihentikan di SL tanpa menggeser batas.',
        'Gelombang 2 boleh turun menembus 200% di bawah Wave 1 asalkan RSI naik.',
        'Tetap menambah lot Buy karena angka selalu berulang.',
      ],
      optionsEn: [
        'Cardinal Rule #1 is violated cleanly, the bullish impulse count is mathematically invalidated and must stop out.',
        'Wave 2 is allowed 200% deeper retracements whenever oscillators disagree.',
        'Double lot exposure hoping Wave 1 resets.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Keindahan 3 Hukum Mutlak Elliott terletak pada kejelasan kapan kita mengakui salah secara objektif di titik invalidasi SL.',
      explanationEn: 'Right! Cardinal rules turn abstract labeling into crisp hard-stop invalidation criteria.',
    },
    essayGuidanceHintsId: [
      'Sebutkan 5 gelombang Impuls + 3 Koreksi serta 3 Hukum Mutlak Elliott Wave.',
      'Jelaskan kritik subyektivitas (*Hindsight / Multiple Counts*) dari metode Elliott jika dipakai tanpa konfirmasi.',
      'Bagaimana mengunci titik SL 10 USC di awal Wave 1 pada akun 1.000 USC agar rasio R:R optimal di Wave 3?',
    ],
    essayGuidanceHintsEn: [
      'Summarize the 5-3 wave motif and all 3 invariant cardinal laws.',
      'Discuss subjective wave-labeling pitfalls ahead of hard confirmation.',
      'Show how Wave 1 origin anchoring secures 10 USC risk against Wave 3 asymmetric expansion.',
    ],
  },

  'fibonacci-gold-ratios-and-discount': {
    slug: 'fibonacci-gold-ratios-and-discount',
    photoUrl: PHOTOS.STAT_RESEARCH,
    photoCaptionId: 'Deret Rasio Matematika Fibonacci (Leonardo da Pisa, 1202), Menggunakan batas ekuilibrium 50% guna memisahkan zona Premium (Mahal) dan Discount (Murah).',
    photoCaptionEn: 'Fibonacci Proportional Rulers (1202), Dividing Price Dealing Ranges precisely along 50% Equilibrium into Premium and Discount halves.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Diperkenalkan ke dunia Barat oleh matematikawan Italia **Leonardo Fibonacci dari Pisa (*Liber Abaci*, 1202)** lewat deret angka alami `1, 1, 2, 3, 5, 8, 13, 21, 34...`, pembagian tiap angka dengan penerusnya perlahan konvergen ke **Rasio Emas (`0,618` / `61,8%`)** serta turunannya (`0,382`, `0,786`, dan titik tengah eksak `0,50` / `50%`). Namun secara akademis murni, apakah harga saham dan emas "ajaib tunduk" pada angka keramat?',
      'Jawabannya jauh lebih membumi sekaligus jauh lebih kuat secara psikologi pasar: **Self-Fulfilling Liquidity Mechanics & Premium/Discount Dealing Ranges**. Ketika ribuan meja trading di seluruh dunia memasang penggaris persentase koreksi terhadap satu rentang ayunan (*Dealing Range High to Low*), angka `50%` secara alami menjadi titik tengah **Harga Adil (*Equilibrium*)**: di atas 50% disebut **Zona Premium** (*wilayah terlalu mahal bagi pembeli besar, cocok mencari penawaran Jual*), sementara di bawah 50% disebut **Zona Discount** (*wilayah berdiskon murah untuk mencari beli*).',
      'Dalam disiplin *Optimal Trade Entry (OTE)* dan *Auction Discount Sizing*, menggabungkan alat ukur `50%–78,6%` dengan zona FVG/Supply-Demand yang berada di paruh Discount mencegah trader membeli pucuk saat harga sudah sangat mahal (*Chasing Premium*).',
    ],
    sec2InstitutionalEn: [
      'Drawn from Leonardo Fibonacci’s 1202 Golden Ratio (61.8%, 78.6%, and 50.0% Equilibrium), institutional desks employ Fib grids not as mystical astrology, but strictly to separate Dealing Ranges into expensive Premium (>50%) and value Discount (<50%) territories.',
      'Combining OTE Discount zones (61.8%–79%) strictly alongside resting FVG/Order Block footprints transforms risk symmetry dramatically.',
    ],
    anatomyRowsId: [
      ['Membeli emas secara acak di level 61,8% Fibonacci di udara kosong tanpa struktur FVG/Support.', 'Fibonacci sekadar penggaris jarak mahal-murah; order hanya aktif bila selaras struktur nyata di dalamnya.', 'Pastikan area 61,8%–78,6% berhimpitan dengan FVG atau Order Block (Confluence) sebelum entry.'],
      ['Memaksakan BUY breakout di level 85% puncak Dealing Range (Zona Premium ekstrem).', 'Membeli di atas ekuilibrium 50% memaksa rasio Risk-to-Reward memburuk dan rentan koreksi dalam.', 'Terapkan hukum emas JGS: HANYA beli di Zona Discount (<50%) & HANYA jual di Zona Premium (>50%).'],
      ['Salah arah menarik garis Fibonacci dari kanan ke kiri hingga persentase diskon terbalik.', 'Pada tren naik, tarik dari Swing Low (100%) menuju Swing High (0%) guna membaca kedalaman diskon koreksi.', 'Kalibrasi penggaris Fib cukup tampilkan angka: 0%, 50% (Equilibrium), 61,8%, 70,5%, 78,6%, dan 100%.'],
    ],
    anatomyRowsEn: [
      ['Clicking orders blindly at floating 61.8% lines without structural footprints.', 'Fibonacci maps price valuation zones only; execution needs underlying FVG or OB liquidity.', 'Verify Discount 61.8%–78.6% aligns squarely over FVG / OB before deploying 10 USC.'],
      ['Buying breakout rallies at 88% height inside expensive Premium half.', 'Purchasing above 50% equilibrium ruins R:R symmetry and invites mean reversion stops.', 'Enforce strict discipline: Longs exclusively in Discount (<50%), Shorts strictly in Premium (>50%).'],
      ['Cluttering charts with 14 rainbow Fib levels hiding candles.', 'Excess lines induce noise paralysis.', 'Display solely key Dealing Range boundaries: 0%, 50%, 61.8%, 70.5%, 78.6%, 100%.'],
    ],
    sec4QuantId: [
      'Lihat perbedaan matematis ekstrem pada modal `1.000 USC ($10)` saat menerapkan **Filter Equilibrium 50%**. Katakan XAUUSD baru mencetak satu ayunan kenaikan impulsif dari dasar `$2,630,00 (Swing Low)` menuju puncak `$2,650,00 (Swing High)` (rentang `$20,00`, sehingga titik tengah **50% Equilibrium = `$2,640,00`**).',
      'Trader A yang ceroboh tidak tahan menunggu dan membeli jauh di zona **Premium `$2,646,00` (`75%` ketinggian ayunan)** dengan SL wajar di bawah dasar `$2,630` (jarak `$16`, ditolak aturan 1%, terpaksa menaruh SL sempit di `$2,641` lalu tersapu koreksi alami!) dan target `$2,652` hanya ber-rasio `1:1,2 R:R`.',
      'Sebaliknya, Strategist sabar menanti koreksi masuk ke **Zona Discount `61,8%–70,5%` (`$2,636,00` – `$2,637,60`)** di mana kebetulan bersarang FVG bersih! Di `$2,636,00`, jarak menuju invalidasi `$2,631,00` hanyalah **`$5,00`** (`0,02 Cent lot = 10 USC risiko`), sementara pantulan pulang ke puncak `$2,650,00` menghadiahkan **`+$28 USC (+2,8R)`**!',
    ],
    sec4QuantEn: [
      'Inside a $2,630–$2,650 Dealing Range (50% Equilibrium = $2,640), waiting patiently for Discount OTE levels ($2,636) halves SL distance down to $5.00 (0.02 lot = 10 USC risk) while elevating target asymmetry up toward +28 USC (+2.8R).',
      'Respecting Premium vs Discount transforms weak 1:1 impulses into mathematically positive long-run strategies.',
    ],
    sec4FormulaId: 'Equilibrium (50%) = (Swing High + Swing Low) ÷ 2  |  OTE Discount Zone = 61,8% s/d 78,6% Koreksi di Bawah Ekuilibrium',
    sec4FormulaEn: 'Equilibrium (50%) = (High + Low) ÷ 2  |  Discount Long Value Zone = Below Equilibrium (61.8%–78.6%)',
    hotspots: makeHotspots(
      ['Zona Premium (> 50% Mahal)', 'Garis Equilibrium 50,0%', 'Zona Discount (< 50% Murah)', 'Sweet Spot OTE (61,8%–78,6%)'],
      ['Area harga tinggi di atas rata-rata ayunan; idealnya tempat mencari peluang Jual.', 'Titik keseimbangan adil membagi dua Dealing Range menjadi wilayah mahal & murah.', 'Wilayah harga berdiskon tempat pembeli institusional mencari nilai beli asimetris.', 'Irisan Fibonacci Golden Ratio tempat FVG & Order Block sering bertahan kuat.'],
      ['Membeli tepat di Zona Premium atas saat harga hampir kehabisan tenaga naik.', 'Menaruh Limit order di angka Fibo 61,8% walau tidak ada jejak FVG atau Order Block.', 'Menggunakan terlalu banyak rasio tambahan (23,6%, 127%, 423%) yang membingungkan mata.', 'Menarik ujung penggaris Fib pada ekor acak M1 daripada ayunan struktural utama.'],
      ['Aktifkan aturan baku: NO BUY di atas 50%, NO SELL di bawah 50%.', 'Pasang alat ukur hanya dari ayunan valid berkonfirmasi Break/MSS.', 'Tunggu harga turun memasuki Discount sebelum pasang tiket 0,02 Cent lot.', 'Validasi rasio target >= 1:2,5R dengan jarak invalidasi SL <= 10 USC.']
    ),
    detective: {
      scenarioId: 'Emas baru melesat dari $2,620 ke $2,660 ($40 range). Seseorang berencana masuk posisi BUY di $2,652 dengan alasan "tren sedang kuat!". Ditinjau dari penggaris Premium/Discount 50%, letak kesalahan utamanya adalah?',
      scenarioEn: 'Gold rallies $2,620 to $2,660 ($40 range), and a trader plans a BUY limit at $2,652 citing "strong momentum." Identify the valuation flaw:',
      optionsId: [
        'Harga $2,652 berada di kedalaman Zona Premium (80% atas), membeli di sana menanggung SL sangat lebar dan amat rentan koreksi kembali ke Equilibrium ($2,640) atau Discount.',
        'Karena angka $2,652 bukan kelipatan 5.',
        'Karena Fibonacci melarang transaksi di hari Kamis.',
      ],
      optionsEn: [
        '$2,652 sits deep inside expensive Premium territory (top 80% of range), creating poor asymmetry ahead of routine retracements below $2,640.',
        '$2,652 is not divisible cleanly by 5.',
        'Fibonacci grids disable entries mid-week.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Di $2,652 kamu membeli di puncak harga mahal (Premium); tunggu koreksi di bawah garis adil $2,640 agar R:R dan keamanan 10 USC terjaga.',
      explanationEn: 'Spot on! Waiting below the $2,640 midpoint protects risk/reward symmetry and micro stop precision.',
    },
    essayGuidanceHintsId: [
      'Jelaskan mengapa rasio Fibonacci & titik tengah 50% Equilibrium berguna bukan karena mistik, melainkan pengukuran nilai Premium vs Discount.',
      'Aturan posisi mana yang berlaku di atas 50% vs di bawah 50% Dealing Range?',
      'Tunjukkan bagaimana menunggu area Discount mengoptimalkan jarak Stop Loss <= 10 USC pada akun 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Explain 50% Equilibrium Premium vs Discount valuation mechanics rationally.',
      'Contrast buying inside Discount (<50%) versus chasing expensive Premium (>50%) wings.',
      'Show numerically how waiting for OTE Discount preserves tight 10 USC Stop distances.',
    ],
  },

  'harmonic-patterns-and-subjectivity-critique': {
    slug: 'harmonic-patterns-and-subjectivity-critique',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Kritik Metodologi Pola Harmonik (Gartley, Bat, Crab), Membedah bias subyektivitas vs verifikasi statistik Andrew Lo (MIT) secara ilmiah.',
    photoCaptionEn: 'Harmonic Pattern Audit & Andrew Lo Critique, Distinguishing visual confirmation bias from out-of-sample algorithmic robustness.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Diperkenalkan pertama kali oleh H.M. Gartley (*Profits in the Stock Market*, 1935) dan diperketat rasio geometrisnya oleh Scott Carney (pola **Bat, Butterfly, Crab, Cypher**), *Harmonic Trading* merangkai lima titik ayunan `X-A-B-C-D` untuk memprediksi titik berbalik potensial (*Potential Reversal Zone / PRZ*) berdasar pertemuan rasio Fibonacci `0,618`, `0,786`, `0,886`, hingga `1,618`.',
      'Namun secara ilmiah akademis, kita wajib jujur meninjau riset terkenal Profesor **Andrew W. Lo (MIT Sloan School of Management, *Journal of Finance* 2000, *Foundations of Technical Analysis*)**: meskipun algoritma statistik non-parametrik menemukan beberapa pola klasik memberi informasi struktural tambahan melampaui acak, pola yang diukur **secara manual oleh mata manusia amat rawan terhadap Bias Konfirmasi (*Confirmation Bias*)** serta penyesuaian bebas (*Subjective Curve-Fitting*).',
      'Dalam praktiknya, seorang analis dapat terus mengubah pilihan titik awal `X` ke bar sebelah bila titik `D` tembus, sehingga di papan sejarah terlihat "selalu akurat 90%", tetapi pada waktu nyata (*Real-Time*) tanpa filter likuiditas atau konfirmasi patah struktur (MSS), menaruh order berlawanan arah secara buta di titik D sering berujung tersapu tren kencang.',
    ],
    sec2InstitutionalEn: [
      'While H.M. Gartley (1935) and Scott Carney’s Harmonic ratios seek geometric symmetry at X-A-B-C-D reversals, MIT scholar Andrew Lo (*Journal of Finance* 2000) highlights how subjective human pattern drawing suffers acute confirmation bias.',
      'Without secondary liquidity sweeps or Market Structure Shift validation, blindly setting Limit orders strictly on harmonic lines exposes $10 accounts directly to runaway momentum trains.',
    ],
    anatomyRowsId: [
      ['Langsung taruh Limit Order berlawanan arah tepat di titik 88,6% pola Bat tanpa melihat momentum.', 'Titik PRZ Harmonic sering diterabas lurus saat tren impulsif makro sedang kuat.', 'Jadikan titik D hanya sebagai zona "waspada", tunggu konfirmasi MSS/penolakan candle nyata.'],
      ['Menggeser-geser titik X di masa lalu agar huruf M/W tampak pas menempel grafik saat review.', 'Menyesuaikan gambar secara subyektif (Hindsight Calibration) merusak validitas data empiris.', 'Definisikan aturan ayunan mekanis baku sebelum menyentuh chart dan catat setiap setup gagal.'],
      ['Percaya gambar kupu-kupu di chart mengalahkan rilis berita suku bunga Bank Sentral.', 'Arus makro & buku likuiditas selalu lebih berkuasa dari geometri garis di layar.', 'Jangan entry setup pola harmonik apa pun tepat menjelang rilis data High-Impact USD.'],
    ],
    anatomyRowsEn: [
      ['Blindly fading strong rallies purely because price hits an 88.6% Bat point D.', 'Strong macro impulses blow straight through geometric lines lacking passive opposition.', 'Treat Harmonic PRZ strictly as watch zones, enter ONLY upon candle-close MSS reversal.'],
      ['Tweaking anchor swing point X retrospectively until patterns look clean.', 'Subjective hindsight refitting ruins out-of-sample expectancy accuracy completely.', 'Lock rigid mechanical swing selection rules upfront and record every false failure honestly.'],
      ['Expecting Bat/Crab geometry to outweigh scheduled Fed or CPI shocks.', 'Fundamental macro liquidity overrides visual symmetry unconditionally.', 'Step aside ahead of Tier-1 macro catalysts regardless of visual chart shapes.'],
    ],
    sec4QuantId: [
      'Uji perbandingan eksekusi rasional pada saldo `1.000 USC ($10)` saat menghadapi potensi **PRZ Pola Gartley `78,6%` di `$2,650`**. Pendekatan berisiko tinggi ialah memasang `Limit SELL` buta di `$2,650` tatkala candle M15 sedang meluncur naik vertikal dengan momentum penuh. Jika reli makro meneruskan hingga `$2,658`, trader tadi langsung tersapu `-10 USC` hanya gara-gara melawan kereta api cepat tanpa tanda berhenti!',
      'Sebaliknya, pendekatan konfirmasi ilmiah (menggabungkan objektivitas *PRZ* dengan *Price Action / ICT MSS*): tunggu harga menyentuh zona `$2,650`, lihat apakah terjadi sapuan ekor penolakan atas diikuti patah struktur naik (*MSS* turun ke `$2,647`), baru eksekusi koreksi di FVG `$2,648,50` memakai **`0,02 Cent lot`** ber-SL `$2,653,50` (jarak `$5,00` = `10 USC risiko`).',
      'Dengan cara ini, kamu menyingkirkan 60% sinyal palsu pola geometris yang diterabas tren, mempertahankan keutuhan batas `10 USC`, sambil tetap menangkap potensi penuh berbaliknya harga secara terverifikasi.',
    ],
    sec4QuantEn: [
      'Blindly placing counter-trend Limit Sells right at a 78.6% Gartley PRZ runs straight into vertical momentum trains, whereas waiting for an explicit rejection + M15 MSS confirmation saves ~60% of false stops while limiting exposure strictly to 10 USC.',
      'Pairing structural confirmation cleanly eliminates subjective curve-fitting fragility.',
    ],
    sec4FormulaId: 'Peringatan Ilmiah: Pola Geometris D = Radar Perhatian Saja  |  Syarat Klik Order = Zona D + Rejection + Struktur Berbalik (10 USC)',
    sec4FormulaEn: 'Harmonic Discipline: PRZ Point D = Alert Zone Only  |  Valid Entry = Point D + Candle Rejection / MSS (10 USC Cap)',
    hotspots: makeHotspots(
      ['Titik Asal X-A (Impuls Awal)', 'Subjektivitas Pilih Ayunan', 'Titik D (PRZ / Radar Waspada)', 'Filter MSS (Konfirmasi Balik)'],
      ['Ayunan dasar tempat seluruh rasio ekstensi harmonik dihitung ke depan.', 'Kritik Andrew Lo (MIT): pengamat manusia condong menggeser titik agar pola terlihat rapi.', 'Area pertemuan Fibonacci tempat peluang pembalikan diuji, bukan kepastian mutlak.', 'Patahnya ayunan mikro lawan arah membuktikan arus besar benar-benar mulai berbalik.'],
      ['Menebak titik D memakai Limit order buta tanpa melihat kecepatan candle yang menabraknya.', 'Mengganti anchor X sesudah harga meluncur melewati batas SL agar tampak benar.', 'Mengabaikan riset statistik out-of-sample demi percaya klaim winrate 95%.', 'Menahan rugi melewati X karena berharap pola berubah nama jadi Butterfly lalu Crab!'],
      ['Tetapkan aturan baku pemilihan Swing X-A sejak awal tanpa geser manual.', 'Jangan pernah "mengganti nama pola" saat batas Stop Loss tersentuh, cut loss tertib!', 'Wajib tunggu penolakan body/wick atau MSS di dalam PRZ sebelum masuk 0,02 lot.', 'Catat tingkat kegagalan riil di Jurnal agar bebas ilusi hindsight.']
    ),
    detective: {
      scenarioId: 'Seorang trader memprediksi pembalikan SELL pada pola Gartley di 78,6% ($2,640). Ketika harga terus naik kencang melewati titik SL $2,645, ia berdalih: "Oh ternyata ini bukan gagal, polanya berubah jadi Butterfly di $2,655!", lalu menahan loss tanpa SL. Bias ilmiah apa yang terjadi?',
      scenarioEn: 'When price slices straight past a Gartley 78.6% SL, a trader removes stops claiming "it merely morphed into a 127% Butterfly!" Identify the behavioral trap:',
      optionsId: [
        'Bias Subjektivitas & Rasionalisasi (*Moving the Goalposts*): mengubah interpretasi pola untuk membenarkan penahanan rugi yang seharusnya wajib dihentikan sesuai rencana awal.',
        'Teknik profesional agar tidak pernah mengalami Stop Loss selamanya.',
        'Aturan wajib dari riset Andrew Lo di MIT.',
      ],
      optionsEn: [
        'Rationalization Bias ("Moving the Goalposts"): morphing chart patterns retrospectively to justify violating planned Stop invalidation.',
        'A verified institutional secret guaranteeing zero losses.',
        'MIT’s recommended method for removing Hard SL limits.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Menahan rugi dengan dalih "pola bermutasi" menghancurkan akuntabilitas kuantitatif; jika SL tersentuh, hipotesis awal resmi gugur.',
      explanationEn: 'Exactly! Pattern-morphing excuses mask destructive loss-holding. Once initial invalidation hits, exit immediately at 10 USC.',
    },
    essayGuidanceHintsId: [
      'Jelaskan kritik akademis Andrew Lo (MIT, 2000) tentang bias subyektivitas & hindsight pada pengukuran pola geometris manual.',
      'Mengapa menaruh Limit Order buta di titik D (PRZ) sangat berisiko saat momentum tren besar sedang kuat?',
      'Bagaimana mengkombinasikan radar PRZ dengan syarat konfirmasi MSS & Hard SL ketat di akun 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Summarize Andrew Lo’s MIT critique regarding confirmation bias and subjective pattern fitting.',
      'Explain why blind counter-trend limits at point D fail against runaway momentum.',
      'Require clear structural rejection/MSS + rigid 10 USC invalidation before entering.',
    ],
  },

  // =========================================================================
  // SEMESTER 08 (AMT-302)
  // =========================================================================
  'auction-market-theory-fair-value': {
    slug: 'auction-market-theory-fair-value',
    photoUrl: PHOTOS.BANK_DISTRICTS,
    photoCaptionId: 'Chicago Board of Trade & Auction Market Theory (J. Peter Steidlmayer, 1986), Pasar sebagai proses lelang terbuka mencari Harga Adil (Fair Value).',
    photoCaptionEn: 'CBOT Auction Market Theory (Peter Steidlmayer), Visualizing price as an active two-way negotiation searching for Fair Value acceptance.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Diperkenalkan oleh trader lantai **Chicago Board of Trade (CBOT)** bernama **J. Peter Steidlmayer** pada pertengahan 1980-an (*Market Profile*), **Auction Market Theory (AMT)** membongkar hakikat paling jujur pasar keuangan: bursa bukanlah arena perlombaan garis lurus, melainkan **mekanisme lelang dua arah (*Two-Way Continuous Auction*)** yang berupaya memfasilitasi perdagangan sebanyak mungkin antara pembeli dan penjual.',
      'Pasar hanya berada di dalam **dua kondisi perilaku** secara bergantian: pertama, **Balance (Keseimbangan / Range Mendatar)** ketika pembeli dan penjual setuju bahwa kisaran harga saat ini adil (*Fair Value Acceptance*), membentuk kurva lonceng normal (*Bell Curve*) di mana transaksi padat terjadi di tengah; kedua, **Imbalance (Ketidakseimbangan / Tren Terarah)** ketika salah satu pihak tidak lagi sepakat sehingga harga bergerak cepat melewati level tidak disukai mencari kesepakatan baru.',
      'Ciri penolakan atau penerimaan lelang amat gamblang: jika harga menyentuh tingkat sangat tinggi lalu seketika kembali cepat meninggalkan ekor panjang tanpa waktu mengendap (**Excess / Price Rejection**), lelang menyatakan "terlalu mahal, ditolak!". Sebaliknya jika harga betah bertahan lama dan bertukar tangan dengan volume tebal di zona baru, pasar menyatakan **Penerimaan Harga (*Acceptance*)**.',
    ],
    sec2InstitutionalEn: [
      'Developed by CBOT floor pioneer Peter Steidlmayer, Auction Market Theory frames price action continuously between two states: balanced Fair Value acceptance (normal bell distribution) and sudden directional Imbalance discovery.',
      'Understanding rapid price rejection (Excess) versus time/volume Acceptance saves traders from chasing weak fake breakouts blindly.',
    ],
    anatomyRowsId: [
      ['Menerapkan strategi breakout agresif terus-menerus selama fase Balance mendatar.', '80% waktu lelang berada di keseimbangan; breakout lemah tanpa volume dari tepi Value hampir selalu pulang!', 'Dalam kondisi Balance, antri di batas ekstrem atau duduk diam menunggu Imbalance sah.'],
      ['Menganggap penembusan 5 menit di atas batas kemarin pasti berlanjut naik tanpa mengecek Acceptance.', 'Jika harga gagal menetap/membangun volume di luar area lama (*Failed Auction*), ia melesat pulang ke sisi seberang!', 'Amati apakah harga membangun Acceptance (tutup stabil + konsolidasi di atas) sebelum ikut arus baru.'],
      ['Mengira pasar wajib selalu bergerak tren kuat setiap hari agar layak ditransaksikan.', 'Lelang tenang berfungsi menyerap posisi institusi pasca-ekspansi; kesabaran diam menjaga modal.', 'Simpan anggaran 10 USC jauh-jauh saat grafik mencetak keseimbangan sempit membosankan.'],
    ],
    anatomyRowsEn: [
      ['Firing breakout trades repeatedly during tight balanced ranges.', 'Markets oscillate inside balanced Fair Value roughly 75% of the session, fading extremes.', 'Trade patiently at confirmed edges or sit flat until true Imbalance breaks range.'],
      ['Assuming a 5-minute probe beyond range bounds proves permanent breakout.', 'Without Acceptance (time + volume building outside), Failed Auctions snap rapidly back across Fair Value!', 'Require firm closes + retest Acceptance before risking 10 USC equity on breakouts.'],
      ['Believing daily balance days indicate broken market behavior.', 'Sideways rotations naturally rebalance institutional inventories after volatile swings.', 'Conserve 10 USC capital cleanly when wide trend opportunities remain absent.'],
    ],
    sec4QuantId: [
      'Mari menyaksikan kekuatan logika **Failed Auction vs Acceptance** pada akun `1.000 USC ($10)`. Misalkan sepanjang pagi hingga jam 14:00 WIB, `XAUUSDc` membangun rentang Lelang Seimbang (*Balance Box*) antara `$2,640` sampai `$2,648`. Pada pukul 14:05 WIB, harga melesat naik sejenak menyentuh `$2,651,00` tetapi tidak mampu menetap (*Rejected / Failed Auction*), dan lilin M15 menutup balik di dalam kotak pada harga `$2,646,50`.',
      'Sesuai prinsip CBOT AMT: begitu suatu pihak gagal mendapatkan penerimaan (*Acceptance*) di satu tepi lelang, **magnet utama lelang menarik harga memantul kembali menyeberangi Fair Value (`$2,644`) langsung menguji tepi seberang (`$2,640`)**!',
      'Strategist yang membaca penolakan *Failed Auction* membuka `SELL 0,02 Cent lot` di `$2,646,50` ber-SL aman di atas puncak ekor kegagalan (`$2,651,50` -> jarak `$5` = `10 USC risiko`), dan menargetkan lantai keseimbangan di `$2,640,00` (`+13 USC`) atau tepi ekstrem `$2,636` (`+21 USC / +2,1R`), bukan malah tersangkut beli breakout di puncak `$2,650`.',
    ],
    sec4QuantEn: [
      'When an upside break above a $2,640–$2,648 balanced box snaps immediately back inside ($2,646.50 close = Failed Auction Rejection), CBOT rotation laws rotate price naturally toward the opposite $2,640 floor.',
      'Entering Short 0.02 lot behind the rejected tail ($2,651.50 SL = 10 USC risk) cleanly captures +21 USC opposite-side rotation.',
    ],
    sec4FormulaId: 'Aturan Emas AMT: Failed Auction (Tolakan Tepi Atas) => Rotasi Kembali Menyeberangi Fair Value ke Tepi Seberang (Target 10–20 USC)',
    sec4FormulaEn: 'CBOT Rotation Rule: Failed Range Auction => Mean Reversion Rotation Directly Toward Opposite Value Edge',
    hotspots: makeHotspots(
      ['Keadaan Balance (Bell Curve)', 'Penerimaan Lelang (Acceptance)', 'Penolakan Cepat (Excess / Failed)', 'Imbalance (Penemuan Harga Baru)'],
      ['Pembeli dan penjual sepakat bahwa harga sekarang adil, transaksi menumpuk rata.', 'Harga bertahan cukup lama dengan volume mantap di zona luar rentang lama.', 'Sumbu ekstrem panjang yang langsung ditolak pulang menandakan zona tidak disukai.', 'Salah satu kubu menang mutlak mendorong harga mencari level kesepakatan baru.'],
      ['Memaksakan strategi trend breakout di tengah hari Balance datar.', 'Masuk posisi pada tusukan kilat tanpa menunggu bukti Acceptance (waktu + close).', 'Membeli di puncak Excess padahal ekor sudah menolak cepat turun.', 'Menahan posisi rugi berharap keseimbangan lama langsung pulih seketika pasca-Imbalance.'],
      ['Klasifikasikan setiap sesi dulu: sedang "Balance" atau "Imbalance"?', 'Tahan entri di tengah Value adil; bidik hanya batas tepi yang teruji.', 'Manfaatkan Failed Auction untuk menumpang rotasi balik dengan SL 10 USC di luar ekor.', 'Ikuti tren searah Imbalance ketika candle tutup solid diterima di luar range.']
    ),
    detective: {
      scenarioId: 'Emas berkonsolidasi di $2,640–$2,650 selama 6 jam. Tiba-tiba harga naik sesaat ke $2,653 selama 3 menit tanpa volume lanjutan lalu langsung anjlok menutup candle di dalam kotak pada $2,647. Menurut Auction Market Theory, fenomena apa yang baru saja terjadi?',
      scenarioEn: 'After 6 hours inside $2,640–$2,650, Gold pokes briefly to $2,653 for 3 minutes then drops sharply closing back at $2,647. In AMT, what happened?',
      optionsId: [
        'Failed Auction (Excess Rejection): pasar menguji harga lebih tinggi namun ditolak oleh kurangnya minat beli, mengundang rotasi turun menuju sisi bawah kotak ($2,640).',
        'Bukti sah bahwa Acceptance di atas $2,653 sudah tercapai.',
        'Garis Value Area berubah otomatis ke nol.',
      ],
      optionsEn: [
        'Failed Auction Rejection: higher pricing found zero buyer Acceptance, initiating rotation back across Fair Value toward the $2,640 opposite edge.',
        'Verified high-volume Acceptance above $2,653.',
        'Value Area mechanics disable cleanly after noon.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Itulah inti hukum lelang CBOT: bila satu sisi lelang gagal diterima, harga cenderung berputar menguji sisi seberang kotak keseimbangan!',
      explanationEn: 'Right! Failed breakouts without time/volume Acceptance frequently trigger full rotations across the balance range.',
    },
    essayGuidanceHintsId: [
      'Jelaskan definisi dua mode pasar dalam Auction Market Theory Steidlmayer (Balance vs Imbalance).',
      'Bedakan kriteria objektif antara Acceptance (Penerimaan) dan Excess / Failed Auction (Penolakan).',
      'Bagaimana menghindari jebakan False Breakout dengan memanfaatkan Failed Auction pada modal 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Contrast Balance Fair Value acceptance against directional Imbalance discovery.',
      'Differentiate sustained Acceptance versus brief Excess / Failed Auction probes.',
      'Explain avoiding fake breakout traps and protecting 10 USC limits inside AMT rotations.',
    ],
  },

  'volume-profile-poc-vah-val': {
    slug: 'volume-profile-poc-vah-val',
    photoUrl: PHOTOS.MACRO_ANALYTICS,
    photoCaptionId: 'Distribusi Volume Horizontal (Volume Profile), Memetakan Point of Control (POC), Value Area 70% (VAH/VAL), serta celah cepat Low Volume Node.',
    photoCaptionEn: 'Institutional Volume Profile Distribution, Mapping High-Volume Point of Control magnets, 70% Value Area bounds (VAH/VAL), and fast LVN air pockets.',
    sandboxKind: 'WYCKOFF_AUCTION',
    sec2InstitutionalId: [
      'Indikator volume bawaan di bawah grafik hanya menampilkan total volume **per waktu** (batang vertikal), tidak memberi tahu **di level harga mana** institusi benar-benar memperdagangkan porsi kontrak terbesar mereka. Sebaliknya, **Volume Profile (*Fixed Range / Session Profile*)** memutar histogram ke sumbu **harga horizontal**, mengungkap secara telanjang peta minat beli-jual sepanjang sesi.',
      'Terdapat empat penanda struktural wajib yang diamati meja eksekusi: (1) **Point of Control (POC)** adalah tingkat harga tunggal dengan volume transaksi terbanyak (harga paling diterima bersama oleh pasar yang kerap berfungsi sebagai *magnet* maupun tempat pantul/tahanan kunci); (2) **Value Area (VA)** menampung sekitar **70% (satu standar deviasi statistik) seluruh transaksi** hari itu, dibatasi di atas oleh **Value Area High (VAH)** dan di bawah oleh **Value Area Low (VAL)**.',
      '(3) **High Volume Node (HVN)** mencerminkan area persetujuan tebal tempat harga sering melambat dan memantul; sedangkan (4) **Low Volume Node (LVN)** adalah cekungan tipis sepi transaksi tempat harga melesat super cepat (*Price Discovery Air Pocket*). Hebatnya lagi, lokasi **LVN** pada histogram horizontal nyaris selalu berhimpitan persis dengan **Fair Value Gap (FVG)** di grafik candlestick!',
    ],
    sec2InstitutionalEn: [
      'Unlike time-axis volume bars, horizontal Volume Profile highlights exact prices attracting heaviest institutional trading: the magnetic Point of Control (POC), the 1-standard-deviation 70% Value Area (VAH to VAL), sticky HVNs, and ultra-fast Low Volume Node (LVN) air pockets.',
      'Thin LVN valleys match candle Fair Value Gaps (FVG) directly, revealing where rapid directional fills await.',
    ],
    anatomyRowsId: [
      ['Hanya melihat volume vertikal di bawah tanpa tahu level harga mana yang paling padat kontrak.', 'Histogram horizontal Volume Profile memperlihatkan persis di harga berapa kontrak terbanyak berpindah.', 'Aktifkan garis POC, VAH, & VAL sesi sebelumnya pada pemetaan TradingView Lab 600px.'],
      ['Memasang SL tepat di garis POC harian yang ramai tarik-menarik order.', 'POC bertindak sebagai pusat magnet harga bolak-balik; SL di atasnya nyaris selalu tersapu jarum.', 'Letakkan entri dekat VAH/VAL atau LVN, dengan SL aman di luar struktur ekstrem Value Area!'],
      ['Bingung membedakan area sideways lambat (HVN) dengan celah pergeseran cepat (LVN / FVG).', 'Harga melambat lama di HVN yang padat limit, namun menembus kilat melewati cekungan LVN tipis.', 'Bidik target TP sebelum terhalang bukit HVN berikutnya agar cepat tereksekusi bersih.'],
    ],
    anatomyRowsEn: [
      ['Checking bottom time bars without checking horizontal price density.', 'Price-axis Volume Profile maps exact levels hosting 70% Value Area institutional consensus.', 'Plot prior session POC, VAH, and VAL levels before active Killzone execution.'],
      ['Parking tight Stop Losses directly across magnetic POC centers.', 'Prices constantly oscillate around thick POC clusters, clipping stops resting across them.', 'Place limits cleanly near outer VAH/VAL or LVNs with Stops buffered outside extremes.'],
      ['Targeting profit lines far inside dense opposing HVN traffic jams.', 'Heavy resting HVN walls stall momentum aggressively while thin LVNs glide fast.', 'Scale Take Profit targets ahead of heavy opposing HVN / POC clusters cleanly.'],
    ],
    sec4QuantId: [
      'Mari menerapkan **Aturan 80% CBOT & LVN** di modal mikro `1.000 USC ($10)`. Misalkan Volume Profile sesi kemarin membentuk **Value Area (`70% volume`)** dari `VAL = $2,638` hingga `VAH = $2,648` dengan pusat `POC = $2,643`, dan terdapat celah tipis **LVN (`$2,646–$2,648`)** akibat kenaikan cepat kemarin sore.',
      'Pagi ini harga dibuka di atas atap kemarin (`$2,650`), lalu turun masuk ke dalam `VAH ($2,648)` melewati `LVN` dan mencetak penolakan bersih atau balik menembus lagi: jika harga berbalik masuk ke dalam Value Area (*VAH Re-entry*) dan bertahan dua periode, aturan statistik CBOT menyatakan peluang **~80% harga terdorong menelusuri seluruh Value Area menuju `POC ($2,643)` hingga `VAL ($2,638)`**!',
      'Dengan entri terstruktur di `$2,647,50` memakai **`0,02 Cent lot`** serta SL aman melampaui puncak atap di `$2,652,50` (jarak `$5` = `10 USC / 1%`), perjalanan menyeberangi Value Area ke target `$2,638,00` mengunci profit bersih **`+19 USC (+1,9R)`** atau **`+25 USC (+2,5R)`** apabila berlanjut!',
    ],
    sec4QuantEn: [
      'Applying the CBOT Value Area Rule cleanly around a $2,638–$2,648 profile: fading confirmed acceptance back beneath VAH ($2,647.50) behind a $2,652.50 stop (0.02 lot = 10 USC) maps straight across the $2,643 POC magnet toward $2,638 VAL (+19 USC / +1.9R).',
      'Targeting edges instead of clustering stops at central POC transforms entry precision.',
    ],
    sec4FormulaId: 'Value Area = 70% Distribusi Volume Sesi (VAL s/d VAH)  |  LVN (Celah Sepi) ≡ Padanan Struktural FVG (Cepat Terlewati)',
    sec4FormulaEn: 'Value Area = 70% Session Volume Bounds (VAL–VAH)  |  Low Volume Node (LVN) ≈ Candle Imbalance (FVG)',
    hotspots: makeHotspots(
      ['Point of Control (POC, Puncak Volume)', 'Value Area High / Low (VAH & VAL)', 'High Volume Node (HVN, Tembok)', 'Low Volume Node (LVN, Celah FVG)'],
      ['Tingkat harga tunggal yang paling banyak disepakati pembeli & penjual; magnet tarik harga.', 'Batas atas & bawah ruang transaksi adil yang menampung 70% volume satu standar deviasi.', 'Bukit antrean padat tempat pergerakan tren kerap melambat dan terkonsolidasi ulang.', 'Lembah tipis akibat perpindahan harga kilat, tempat struktur kerap memantul saat retest.'],
      ['Menaruh Stop Loss persis di puncak POC karena mengira itu garis support statis.', 'Masuk posisi tepat di tengah tebal HVN lalu frustrasi kena sideways panjang.', 'Mengejar arah menjauhi VAH saat harga langsung ditolak masuk lagi ke Value.', 'Menargetkan TP menembus bukit HVN tebal berlawanan tanpa mengambil profit bertahap.'],
      ['Tandai POC, VAH, & VAL hari kemarin di chart harianmu sebelum sesi buka.', 'Cari zona rejection di tepi VAH/VAL atau celah LVN sebagai titik entry ber-SL sempit.', 'Jadikan bukit POC/HVN berlawanan sebagai zona target TP realistis.', 'Kunci risiko di luar tepi ekstrem <= 10 USC (1% dari 1.000 USC).']
    ),
    detective: {
      scenarioId: 'Sebuah setup Buy memiliki entry di $2,642 dengan target TP di $2,660, namun di $2,654 berdiri POC & bukit HVN super tebal dari tiga hari terakhir. Mengapa langkah manajemen paling cerdas menaruh TP utama sedikit di bawah $2,654?',
      scenarioEn: 'A bullish setup enters at $2,642 eyeing $2,660, yet a massive multi-day POC & HVN wall rests directly at $2,654. What smart adjustment should you apply?',
      optionsId: [
        'Bukit HVN/POC padat berisi banyak order jual pasif penahan arus, mengambil TP di $2,653 mengamankan profit (+22 USC / +2,2R) sebelum momentum membentur tembok.',
        'HVN justru memaksa harga mempercepat lari dua kali lipat menembusnya.',
        'Karena target di atas $2,654 otomatis dibatalkan bursa emas.',
      ],
      optionsEn: [
        'Massive resting HVN/POC supply frequently slows or reverses approaches, securing TP just ahead at $2,653 locks +2.2R cleanly ahead of institutional resistance.',
        'Dense HVN clusters double upward acceleration.',
        'Bullion exchanges block prices over $2,654.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Mengenali tembok HVN sebelumnya membuatmu realistis mengambil profit di depan zona serap daripada tamak lalu berbalik rugi!',
      explanationEn: 'Right! Scaling profits cleanly ahead of thick multi-day POC/HVN walls protects realized R multiples systematically.',
    },
    essayGuidanceHintsId: [
      'Jelaskan arti & fungsi masing-masing dari POC, VAH, VAL (70% Value Area), HVN, serta LVN.',
      'Bagaimana kemiripan struktural antara cekungan LVN pada Volume Profile dengan Fair Value Gap (FVG)?',
      'Di mana sebaiknya menempatkan Entry, TP, dan Stop Loss 10 USC saat memanfaatkan tepi VAH/VAL?',
    ],
    essayGuidanceHintsEn: [
      'Define POC, 70% Value Area (VAH/VAL), HVN congestion, and thin LVN pockets cleanly.',
      'Explain why LVNs align closely with candlestick Fair Value Gaps.',
      'Specify exact Entry, TP ahead of HVNs, and 10 USC outer-bound SL placement.',
    ],
  },

  'order-flow-dom-footprint-iceberg': {
    slug: 'order-flow-dom-footprint-iceberg',
    photoUrl: PHOTOS.QUANT_SERVERS,
    photoCaptionId: 'Transparansi Order Flow & Depth of Market (DOM), Membaca ketimpangan Market Orders agresif versus tembok Limit Pasif (Absorption) & Iceberg Orders.',
    photoCaptionEn: 'Institutional Order Flow & DOM Execution, Auditing aggressive Market Delta imbalances hitting passive Iceberg Limit Walls.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Lilin candlestick hanya menunjukkan hasil harga akhir per menit, namun perangkat lunak tingkat institusional seperti **Depth of Market (DOM)** dan **Footprint Chart** membuka jeroan setiap candle untuk menampilkan **berapa banyak kontrak Pembeli Agresif (*Ask Market Order*) bertabrakan melawan Limit Pasif Penjual (*Resting Ask Limit*)** pada setiap tingkat tik harga!',
      'Tiga fenomena mikro Order Flow menjelaskan mengapa tren mendadak berhenti di titik misterius: (1) **Cumulative Volume Delta (CVD Divergence)**, ketika harga terus merayap mencetak High lebih tinggi sementara arus beli agresif bersih (Delta) justru melemah atau negatif; (2) **Passive Absorption Wall**, ribuan kontrak beli agresif terus memukul atap harga `$2,650`, namun harga tidak bergerak naik satu tik pun karena tembok Limit Sell institusional menyerap habis seluruh tenaga pembeli; serta (3) **Iceberg Orders**.',
      'Karena menampilkan pesanan beli `50.000 kontrak` di antrean DOM publik akan memancing trader algoritma lain berlari mendahului (*Front-Running*), bank memprogram algoritma **Iceberg / TWAP** yang hanya memperlihatkan porsi kecil `50 kontrak` di permukaan, lalu diam-diam mengisi ulang antrean otomatis ribuan kali hingga kuota institusi terpenuhi sempurna.',
    ],
    sec2InstitutionalEn: [
      'Depth of Market (DOM) and Footprint charts peer directly inside candlesticks, revealing aggressive Market Taker volume (Delta) hitting resting Limit Maker liquidity tick-by-tick.',
      'Recognizing Passive Absorption walls, Delta Divergences, and sliced Iceberg executions explains why prices stall forcefully right before crisp reversals.',
    ],
    anatomyRowsId: [
      ['Melihat candle hijau panjang lalu yakin "semua orang sedang membeli tanpa perlawanan".', 'Di balik candle tersebut, Footprint bisa mengungkap Delta Negatif akibat Limit Sell menyerap di atas!', 'Tunggu konfirmasi reaksi penolakan candle pasca sentuhan zona agar terhindar jebakan buyer trap.'],
      ['Mengira institusi raksasa menaruh order 10.000 lot sekali klik di MT5 ritel.', 'Eksekusi besar dipecah diam-diam via Iceberg Orders & algoritma TWAP demi menyamarkan jejak.', 'Jangan menebak posisi Iceberg, biarkan perubahan struktur & FVG sesudahnya membuktikan sisi menang.'],
      ['Membayar biaya ratusan dolar berlangganan feed Futures CME DOM sebelum mengerti dasar risiko.', 'Untuk eksekusi swing/intraday akun $10, pembacaan struktur + Session Liquidity sudah lebih dari cukup.', 'Pahami logika penyerapan Order Flow sebagai model mental, tanpa memaksa biaya tool mahal.'],
    ],
    anatomyRowsEn: [
      ['Viewing long green bars as unified unchecked buying strength.', 'Inside the bar, negative Footprint Delta can reveal dense hidden passive selling absorbing all market buys.', 'Require structural follow-through or reversal closes before fading apparent momentum.'],
      ['Assuming hedge funds click single visible 10,000-lot orders.', 'Desks mask true order mass continuously using automated Iceberg & TWAP slicing.', 'Track resulting structural Displacement & FVG footprints rather than hunting unverified order walls.'],
      ['Spending $150/month on live CME DOM feeds on a $10 training balance.', 'Footprint literacy serves primarily as mental intuition on micro Cent accounts without costly fees.', 'Apply DOM absorption principles practically through pure OHLC reaction & 10 USC stops.'],
    ],
    sec4QuantId: [
      'Mengapa memahami **Iceberg Absorption** secara langsung menyelamatkan rekening `1.000 USC ($10)` walaupun di MT5 kita tidak membuka jendela DOM berbayar? Karena bekas pertarungan tersebut **tercetak jelas di bentuk fisik lilin candlestick** tepat di area kunci! Ketika Emas mendorong masuk ke Supply Zone `$2,650`, tiga candle M5 berturut-turut menunjukkan volume tick sangat tinggi namun gagal menutup di atas `$2,650,50` (meninggalkan ekor-ekor atas tipis yang berjejer sama rata).',
      'Pemula pengejar breakout melihat kondisi itu lalu menekan `BUY` berharap jebol naik, padahal di belakang layar sedang berlangsung penyerapan Iceberg Ask Limit berulang! Sesaat kemudian ketika pembeli agresif kehabisan napas (*Buyer Exhaustion*), satu dorongan jual ringan menjatuhkan harga `$12,00` dengan cepat.',
      'Trader JGS tidak mengejar batas atas yang gagal menembus tersebut: ia sabar menanti satu candle impulsif turun menembus ayunan terakhir (`MSS`), lalu masuk tenang di `0,02 Cent lot` dengan risiko terukur `<= 10 USC (1%)` searah pemenang pertarungan order flow tersebut.',
    ],
    sec4QuantEn: [
      'Even without paid CME DOM terminals, passive Iceberg absorption visibly imprints high-volume stalled wicks repeatedly failing past $2,650.50 right ahead of sharp exhaustion drops.',
      'Patiently awaiting the post-absorption structural breakdown protects your 10 USC ticket cleanly.',
    ],
    sec4FormulaId: 'Sinyal Penyerapan (Absorption) = Volume Agresif Tinggi + Kemajuan Harga Terhenti (Flat Cap) -> Tunggu Break Searah Lawan (<= 10 USC)',
    sec4FormulaEn: 'Absorption Signature = Heavy Aggressive Effort + Stalled Progress -> Follow Post-Absorption Breakdown (10 USC Cap)',
    hotspots: makeHotspots(
      ['Antrean Pasif Limit (Book DOM)', 'Market Taker (Delta Imbalance)', 'Tembok Absorption (Es Berg)', 'Exhaustion & Reversal Break'],
      ['Kumpulan pesanan sabar menunggu harga yang tidak pernah menimbulkan slippage.', 'Arus perintah agresif pembentuk Delta bersih penggerak harga naik/turun.', 'Algoritma Iceberg diam-diam mengisi ulang posisi guna menahan gerak tanpa memancing reaksi.', 'Begitu pihak agresif kehabisan peluru lawan tembok, harga meluncur tajam berbalik arah.'],
      ['Mengejar entry searah Taker tepat saat menabrak dinding penyerapan di pucuk.', 'Menganggap volume tick tinggi otomatis berarti penembusan breakout sukses.', 'Menghamburkan dana bulanan menyewa software DOM mahal saat modal belajar masih $10.', 'Mencoba menebak akhir penyerapan sebelum bukti break struktur terjadi.'],
      ['Pelajari membaca jejak absorption dari sumbu penolakan beruntun + volume tinggi.', 'Jangan bayar alat mahal selama tahap 1.000 USC; manfaatkan Lab TradingView gratis.', 'Tunggu bukti struktur patah sesudah penyerapan sebelum masuk 0,02 Cent lot.', 'Lindungi selalu risiko eksekusi dengan Hard SL <= 10 USC.']
    ),
    detective: {
      scenarioId: 'Sepuluh ribu kontrak Market Buy memukul area $2,660 selama 10 menit, namun harga terus mentok tidak bergerak naik sepersen pun di $2,660.20, lalu tiba-tiba terjun bebas -$15! Fenomena Order Flow apakah yang menahan di $2,660.20?',
      scenarioEn: '10,000 aggressive Market Buy contracts smash into $2,660 for 10 minutes without pushing price a tick past $2,660.20 before plummeting -$15. Identify the Order Flow dynamic:',
      optionsId: [
        'Passive Absorption & Iceberg Sell Wall: penjual institusional diam-diam mengisi ulang limit sell di $2,660 untuk menyerap seluruh tenaga pembeli sebelum berbalik turun.',
        'Karena server internet dunia mati selama 10 menit.',
        'Karena 10.000 kontrak dianggap terlalu kecil di bursa global.',
      ],
      optionsEn: [
        'Passive Iceberg Sell Wall Absorption: institutional makers silently refilled passive offers at $2,660 absorbing every buyer ahead of sharp markdown.',
        'Global internet networks disconnected.',
        '10,000 contracts fail to register on order books.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Menyerap serangan agresif menggunakan Iceberg Limit Orders lalu membalikkan arah sesudah pembeli lelah adalah ciri klasik meja institusional.',
      explanationEn: 'Spot on! Unmoved caps amidst fierce buying reveal silent passive Iceberg sell walls absorbing exhaustively.',
    },
    essayGuidanceHintsId: [
      'Jelaskan perbedaan interaksi Market Taker (Agresif / Delta) melawan Limit Maker (Pasif) di Depth of Market.',
      'Bagaimana cara kerja Iceberg Order serta tanda Passive Absorption yang terlihat di grafik?',
      'Bagaimana mengaplikasikan wawasan penyerapan ini pada akun $10 (1.000 USC) tanpa perlu berlangganan software DOM mahal?',
    ],
    essayGuidanceHintsEn: [
      'Contrast aggressive Market Delta hitting passive Limit Maker walls inside DOM.',
      'Explain Iceberg slicing mechanics and visual exhaustion signs on price charts.',
      'Describe capturing post-absorption moves cleanly at 10 USC risk without paid feeds.',
    ],
  },

  // =========================================================================
  // SEMESTER 09 (ICT-303)
  // =========================================================================
  'ict-smc-grassroots-origin-and-ipda': {
    slug: 'ict-smc-grassroots-origin-and-ipda',
    photoUrl: PHOTOS.BANK_DISTRICTS,
    photoCaptionId: 'Kerangka Institusional ICT & SMC, Menyambungkan logika Wyckoff (1930) dan riset Universitas Princeton tentang Predatory Trading ke eksekusi intraday.',
    photoCaptionEn: 'Institutional ICT & SMC Synthesis, Bridging classical Wyckoff physics and Princeton Predatory Trading math into precision execution.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Istilah **ICT (Inner Circle Trader)** dan **SMC (Smart Money Concepts)** belakangan membanjiri media sosial bak mantra rahasia, padahal secara ilmiah finansial, sistem yang disusun **Michael J. Huddleston** ini bukanlah sihir mistis di luar ekonomi modern. Sebaliknya, konsep ICT menerjemahkan ulang **Akumulasi Wyckoff** serta teori **Lelang Pasar CBOT** menjadi aturan eksekusi jam intraday super presisi berbasis dua pilar: **Likuiditas (Liquidity)** dan **Inefisiensi Pengiriman Harga (Fair Value Gap / Imbalance)**.',
      'Pada literatur jurnal universitas bergengsi, mekanisme ini bahkan memiliki bukti matematis formal lewat makalah klasik **Markus K. Brunnermeier & Lasse Heje Pedersen (*The Journal of Finance*, 2005, *"Predatory Trading"*)**: penulis membuktikan bahwa ketika pasar mengetahui lokasi rentan likuiditas pelaku lain (misalnya titik Stop-Loss massal atau *margin calls*), pemain besar secara rasional mendorong harga menembus level rentan tersebut terlebih dahulu (*Liquidity Overshooting / Stop Hunt*) guna memanen likuiditas murah sebelum membalikkan pasar.',
      'Dengan demikian, kerangka berpikir **IPDA (*Interbank Price Delivery Algorithm*)** yang dibahas Huddleston dapat dipahami secara sehat dan rasional sebagai model mental untuk memetakan dua tujuan utama algoritma perbankan antarbank: (1) bergerak menuju kumpulan likuiditas (*Liquidity Pools* / SSL-BSL), dan (2) menyeimbangkan kembali celah ketidakseimbangan efisiensi harga (*Fair Value Gaps / Repricing*).',
    ],
    sec2InstitutionalEn: [
      'Divorced from social-media hype, Michael J. Huddleston’s ICT model synthesizes Wyckoff liquidity harvesting and Princeton finance research (Brunnermeier & Pedersen, Journal of Finance 2005 on Predatory Trading) into crisp intraday timing.',
      'Framing algorithmic delivery around just two twin objectives, sweeping crowded Stop Liquidity and rebalancing FVG inefficiencies, keeps analysis objective and verifiable.',
    ],
    anatomyRowsId: [
      ['Memuja istilah "IPDA / Algo Bank" secara mistis seolah tak butuh bukti statistik & manajemen risiko.', 'Jurnal *Journal of Finance* 2005 menjelaskan perburuan likuiditas lewat logika rasional *Predatory Trading*.', 'Perlakukan konsep ICT sebagai peta probabilitas struktural dengan wajib Stop Loss <= 10 USC!'],
      ['Mengira metode ICT baru ditemukan tahun 2022 dan menentang teori Wyckoff serta Volume Profile.', 'BSL/SSL Sweep = Wyckoff Spring/UTAD; Fair Value Gap (FVG) = Low Volume Node CBOT!', 'Hubungkan ilmu Semester 1–8 dengan bahasa eksekusi tajam Semester 9–10 secara utuh.'],
      ['Langsung klik Order saat melihat satu kotak "Order Block / FVG" di jam bebas tanpa konfirmasi lain.', 'Tidak semua kotak FVG memantul; syarat sah wajib menyertakan Jam Aktif, Sapuan, dan Displacement MSS.', 'Terapkan checklist berurutan 4 langkah sebelum menyentuh tombol MT5 XAUUSDc.'],
    ],
    anatomyRowsEn: [
      ['Treating IPDA concepts as infallible magic negating hard Stop Losses.', 'Brunnermeier & Pedersen model liquidity overshooting strictly probabilistically, stops still hit regularly!', 'Always pair ICT structures with mathematical 1% = 10 USC Stop boundaries.'],
      ['Viewing SMC as disconnected from Wyckoff or CBOT Auction Market mechanics.', 'Liquidity Sweeps mirror Wyckoff Springs while FVGs map thin LVN imbalance pockets directly.', 'Synthesize fundamental macro alignment with clean intraday liquidity setups.'],
      ['Clicking random isolated candle gaps across quiet off-peak hours.', 'Authentic institutional footprints require valid Killzone Session + Sweep + Displacement MSS alignment.', 'Enforce the 4-filter pre-entry checklist rigidly ahead of every order.'],
    ],
    sec4QuantId: [
      'Bagaimana penerapan ilmu **Brunnermeier & Pedersen + ICT** mengubah hasil akun `1.000 USC ($10)` secara drastis? Bayangkan di sesi New York harga `XAUUSDc` bergerak mendatar meninggalkan garis lantai ganda (*Equal Lows*) di `$2,640,00`. Lima puluh trader ritel memasang posisi BUY di `$2,641` dan menumpuk Stop Loss persis di `$2,639,00` (jarak sempit di bawah lantai rata).',
      'Jika kamu ikut menaruh SL di `$2,639,00`, kamu berubah menjadi penyedia likuiditas empuk (*Counterparty Fuel*) bagi manuver *Predatory Overshooting* ke `$2,638,20` yang langsung memakan `-10 USC` milikmu tepat sebelum harga melesat naik ke `$2,654`!',
      'Sebaliknya, dengan pola pikir ICT rasional: **biarkan tusukan `$2,638,20` terjadi lebih dulu**, tunggu candle balasan menutup di atas ayunan kecil (*MSS*) meninggalkan celah `FVG` di `$2,641–$2,642, baru pasang `0,02 Cent lot` dengan SL aman di bawah ujung ekor `$2,637,00` (jarak `$5` = `10 USC risiko`) memburu target `+$26 USC (+2,6R)`.',
    ],
    sec4QuantEn: [
      'Refusing to park stops alongside crowded $2,639 equal-lows avoids Predatory Overshoot sweeps down to $2,638.20, waiting cleanly for Sweep + MSS reclaim into $2,641.50 FVG secures 10 USC behind the swept extreme to harvest +26 USC (+2.6R).',
      'Patience replaces stop-hunt frustration with systematic institutional symmetry.',
    ],
    sec4FormulaId: 'Dua Tugas Harga Algoritma: (1) Jemput Pool Likuiditas (BSL/SSL) <-> (2) Seimbangkan Inefisiensi (FVG)  |  Terpadu Risk Cap 10 USC',
    sec4FormulaEn: 'Twin Price Mechanics: (1) Harvest BSL/SSL Stop Liquidity <-> (2) Rebalance FVG Gaps  |  Strict 10 USC Risk',
    hotspots: makeHotspots(
      ['Wyckoff + Princeton Predatory Roots', 'Tujuan 1: Pool Likuiditas (SL)', 'Tujuan 2: Celah Ketidakseimbangan (FVG)', 'Disiplin Risiko 1% (Wajib Tetap Ada)'],
      ['ICT bukanlah mantra tak berdasar, ia berdiri di atas ilmu pasar abad ke-20 & riset keuangan.', 'Dana besar membutuhkan titik konsentrasi stop agar dapat mengisi ukuran raksasa tanpa slippage parah.', 'Pergerakan cepat meninggalkan kekosongan transaksi (3-candle gap) yang sering diuji ulang.', 'Tidak ada model sempurna; hanya risiko tetap 10 USC yang menjamin daya tahan jangka panjang.'],
      ['Memuja konten ICT palsu yang mengklaim akurasi 100% tanpa Stop Loss.', 'Memasuki semua kotak kecil bernama Order Block pada timeframe 1 menit di luar jam sesi.', 'Melawan arah tren Harian / Makro FOMC demi meniru garis gambar media sosial.', 'Melupakan kalkulasi lot saat jarak SL melebihi batas anggaran 10 USC.'],
      ['Pelajari terjemahan akademis di balik istilah ICT agar logikamu kuat.', 'Identifikasi di mana kerumunan menaruh Stop Loss sebelum masuk posisi.', 'Gunakan konfirmasi bertingkat sebelum eksekusi order.', 'Selalu pasang Hard SL 10 USC di luar batas ekstrem Sweep.']
    ),
    detective: {
      scenarioId: 'Sebuah grup berbayar berpromosi: "Gabung kelas Smart Money kami, begitu hafal kotak FVG dan nama IPDA, tidak perlu Stop Loss karena kami paham 100% rencana algoritma bank!". Diukur dari bukti ilmiah Princeton & standar JGS, di mana letak bahayanya?',
      scenarioEn: 'A paid promoter claims: "Learn IPDA algorithm secrets and trade without Stop Losses because banks obey our FVG boxes 100%!" Spot the deception:',
      optionsId: [
        'Penyesatan fatal! Riset akademis membuktikan likuiditas bersifat probabilistik, berita mendadak maupun arus makro besar dapat menerabas FVG kapan saja tanpa peringatan; trading tanpa Hard SL menghancurkan akun.',
        'Memang benar, algoritma IPDA melarang harga menyentuh FVG lebih dari sekali.',
        'Karena hanya bank Swiss yang diizinkan memakai FVG.',
      ],
      optionsEn: [
        'Dangerous fraud! Liquidity dynamics are strictly probabilistic, unscheduled macro surprises pierce FVG levels routinely, wiping naked zero-SL balances cleanly.',
        'Algorithms legally prevent price from exceeding FVG lines.',
        'Only Swiss clearing desks utilize Fair Value Grids.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Siapa pun yang melarang Stop Loss dengan kedok "ilmu rahasia algoritma" sedang membahayakan modal siswanya. Presisi tanpa risiko tetap hanya ilusi.',
      explanationEn: 'Right! Any methodology claiming 100% predictive immunity against Stop Losses rejects empirical risk reality completely.',
    },
    essayGuidanceHintsId: [
      'Jelaskan hubungan intelektual teori ICT Michael J. Huddleston dengan metode Wyckoff & riset Predatory Trading Brunnermeier & Pedersen (2005).',
      'Apa dua tujuan utama pergerakan harga antarbank (Likuiditas vs Inefisiensi FVG)?',
      'Mengapa penguasaan istilah ICT TIDAK PERNAH menggantikan kewajiban batas risiko 10 USC (1%) pada akun 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Link Huddleston’s ICT roots rationally to Wyckoff physics and Brunnermeier & Pedersen’s Princeton research.',
      'Explain the twin price drivers: Liquidity harvesting and FVG inefficiency balancing.',
      'Emphasize why no probabilistic edge ever waives hard 10 USC (1%) SL enforcement.',
    ],
  },

  'liquidity-sweeps-vs-real-breakouts': {
    slug: 'liquidity-sweeps-vs-real-breakouts',
    photoUrl: PHOTOS.TICKER_TERMINAL,
    photoCaptionId: 'Dinamika Pool Likuiditas (BSL & SSL), Inducement & Sweep, Mengapa garis rata Equal Highs/Lows mengundang sapuan stop sebelum arah sesungguhnya dimulai.',
    photoCaptionEn: 'Institutional Liquidity Dynamics, Distinguishing external BSL/SSL Stop Sweep reversals from minor internal Inducement traps.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Membedakan **Breakout Asli (*Real Trend Continuation*)** versus **Liquidity Sweep / Stop Hunt (*False Breakout Reversal*)** merupakan keahlian yang menyaring mayoritas kerugian pemula. Dalam istilah ICT, atap ayunan historis dan garis puncak rata (*Equal Highs*) menyimpan **Buy-Side Liquidity (BSL)** berupa ribuan order *Buy Stop* pengejar breakout dan *Stop Loss* penjual; sementara lantai ayunan dan *Equal Lows* menimbun **Sell-Side Liquidity (SSL)**.',
      'Ada dua pembeda terukur di lapangan saat harga menusuk melewati garis BSL/SSL tersebut: pada **Breakout Asli**, lilin mendorong keluar membawa tubuh candle penuh tebal, mencetak penutupan kokoh (**Candle Body Close Beyond Level**) dan terus mempertahankan penerimaan nilai baru di atas batas tersebut (*Displacement Expansion*).',
      'Sebaliknya pada **Liquidity Sweep**, harga hanya menusuk sejenak menggunakan **ekor jarum tajam atau gagal menutup mantap berkelanjutan di luar batas**, lalu segera memutar balik tajam mematahkan ayunan mikro di dalam (*Market Structure Shift*). Selain pool eksternal utama, trader juga perlu mewaspadai **Inducement (IDM)**, yakni ayunan kecil internal tepat di depan Order Block/FVG utama yang sering menjadi umpan awal agar trader yang terlalu cepat masuk tersapu sebelum harga benar-benar tiba di titik origin terbaik.',
    ],
    sec2InstitutionalEn: [
      'Distinguishing genuine breakout displacement from Liquidity Sweeps hinges sharply on post-probe settlement: real breaks print energetic body closes accepting beyond boundaries, while Liquidity Sweeps pierce Equal Highs/Lows briefly via wicks before closing cleanly back inside.',
      'Respecting internal Inducement (IDM) swings stops early traders from entering premature pullbacks directly above unharvested stop fuel.',
    ],
    anatomyRowsId: [
      ['Langsung klik BUY saat sumbu candle menyentuh garis Equal Highs sebelum bar tutup.', 'Sumbu tipis di atas Equal Highs hampir pasti merupakan sapuan BSL untuk mengisi order SELL institusi!', 'Tunggu bar selesai menutup di atas atap dengan konfirmasi lanjutan atau tunggu sapuan balik.'],
      ['Memasang entri BUY tepat pada Order Block pertama di bawah ayunan minor tanpa melihat IDM di bawahnya.', 'Ayunan Inducement kecil persis di atas Order Block utama kerap disapu duluan demi menguras pembeli awal.', 'Pastikan apakah masih ada pool likuiditas segar tepat di bawah target entrismu sebelum menekan BUY.'],
      ['Menyangka semua penembusan Support pasti berbalik naik tanpa mengecek penutupan body berurutan.', 'Bila 2–3 candle body menutup solid semakin turun ke bawah Support tanpa pantulan, itu Breakout Asli!', 'Hormati penutupan body kuat; jangan mencoba menahan BUY melawan dorongan tren beruntun!'],
    ],
    anatomyRowsEn: [
      ['Firing Market Buys the instant wicks tick past flat Equal Highs.', 'Thin spikes past flat peaks routinely harvest BSL stops to fill opposing institutional Shorts.', 'Wait cleanly until decisive body closes hold past barriers without immediate snapping back.'],
      ['Entering initial pullbacks directly above tempting internal Equal Lows (Inducement).', 'Early entries sitting above obvious IDM swings routinely absorb rapid liquidation sweeps.', 'Sweep-check underneath target zones before committing 10 USC capital early.'],
      ['Attempting counter-trend buys beneath repeated heavy downward body closes.', 'Successive firm body closes driving downward reveal true breakout Displacement, not a Sweep!', 'Refuse fading confirmed structural breakdowns cleanly inside active sessions.'],
    ],
    sec4QuantId: [
      'Mari menghitung langsung bagaimana menghindar dari **Jebakan Inducement (IDM)** menyelamatkan saldo `1.000 USC ($10)`. Misalkan pada pagi sesi Asia menuju pembukaan London, Emas membentuk dasar minor di `$2,643,00` (berisi kumpulan *Inducement SSL*), sedangkan tepat `$3,50` lebih rendah di `$2,639,50` berdiri **Daily/Session Low FVG Origin**.',
      'Trader ritel tidak sabar memasang Buy Limit di `$2,643,50` dengan SL di `$2,641,50` (`-10 USC`), dan langsung terbakar saat pembukaan London pukul 14:15 WIB menjatuhkan ekor tepat ke `$2,639,50` (mengambil IDM & mengetuk `Fresh Origin FVG`) sebelum meledak naik hingga `$2,658,00`!',
      'Sebaliknya Strategist menunggu sapuan `IDM $2,643` selesai terlebih dahulu, lalu memicu entri **`0,02 Cent lot`** setelah ekor menyentuh origin bawah diikuti pantulan MSS di `$2,642,00` ber-SL aman di `$2,637,00` (`10 USC / 1%`), sukses menangkap reli mulus menuju **`+$32 USC (+3,2R)`**!',
    ],
    sec4QuantEn: [
      'Spotting an Inducement floor ($2,643) lingering right above a $2,639.50 true Liquidity Sweep origin prevents premature 10 USC stop-outs at London open, patiently letting IDM clear unlocks crisp +32 USC (+3.2R) expansion behind the genuine low.',
      'Validating Liquidity Sweeps via body close vs wick saves dozens of wasted entries.',
    ],
    sec4FormulaId: 'Breakout Asli = Body Close Solid Bertahan + Penerimaan Lanjut  |  Liquidity Sweep = Tusukan Ekor / Close Gagal Lalu Balik Cepat (MSS)',
    sec4FormulaEn: 'Genuine Breakout = Sustained Body Close Acceptance  |  Liquidity Sweep = Brief Wick Probe Snapping Inside (MSS)',
    hotspots: makeHotspots(
      ['Pool Likuiditas (BSL / SSL Rata)', 'Jebakan Inducement (IDM Internal)', 'Sapuan Ekor Palsu (Sweep Wick)', 'Breakout Solid (Displacement Body)'],
      ['Konsentrasi Stop Loss ritel persis di luar puncak/lembah yang tampak sama rata.', 'Titik balik minor di depan zona terbaik yang memancing ritel masuk terlalu cepat.', 'Penembusan pendek gagal menetap yang langsung memicu order berlawanan institusi.', 'Dorongan penuh dengan body candle besar menetap di luar garis menandakan tren lanjutan.'],
      ['Memasang SL tepat di garis Equal Highs/Lows yang bersih.', 'Membeli pullback pertama sebelum ayunan Inducement terdekat dibersihkan.', 'Langsung men-short setiap penembusan tanpa menunggu candle kembali masuk range.', 'Menebak akhir sweep saat candle jatuh beruntun menutup body penuh makin ke bawah.'],
      ['Tandakan titik BSL/SSL pada grafik TradingView sebelum masuk sesi aktif.', 'Cari selalu apakah ada IDM dekat yang rawan disapu di depan zonamu.', 'Bedakan tusukan ekor vs penutupan body kuat sebelum menyentuh MT5.', 'Taruh SL 10 USC aman di luar ujung ekor terluar Sweep, bukan pas di level rata.']
    ),
    detective: {
      scenarioId: 'Harga menjebol ke atas puncak garis Equal Highs ($2,650) hanya menyisakan sumbu panjang hingga $2,652.40 lalu di penutupan candle M15 body-nya berakhir turun di $2,648.50 (di bawah garis $2,650). Jenis pergerakan apakah itu?',
      scenarioEn: 'Gold spikes past $2,650 Equal Highs leaving a wick up to $2,652.40 while the M15 candle closes firmly back down at $2,648.50. Identify this price action:',
      optionsId: [
        'Buy-Side Liquidity (BSL) Sweep, penjual besar memakai kumpulan order Buy di atas $2,650 sebagai bahan bakar untuk mendorong turun tanpa Acceptance di atas.',
        'Breakout Bullish super valid menuju $2,750.',
        'Kesalahan kalkulator tick broker.',
      ],
      optionsEn: [
        'A textbook BSL Liquidity Sweep, institutional selling absorbed breakout buyer stops above $2,650 and snapped cleanly back beneath resistance.',
        'Confirmed bullish breakout holding upper acceptance.',
        'Broker feed tick display bug.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Ekor panjang di atas Equal Highs yang ditutup kembali di bawah batas struktur merupakan ciri khas klasik BSL Liquidity Sweep.',
      explanationEn: 'Right! Upper wick rejections failing to sustain closes above Equal Highs define BSL Liquidity Sweeps precisely.',
    },
    essayGuidanceHintsId: [
      'Bedakan lokasi pool Buy-Side Liquidity (BSL) vs Sell-Side Liquidity (SSL) dan apa isi order di dalamnya.',
      'Bagaimana cara membedakan Liquidity Sweep vs Genuine Breakout menggunakan Candle Close & Displacement?',
      'Jelaskan fungsi jebakan Inducement (IDM) dan aturan penempatan SL 10 USC di balik ekor sapuan!',
    ],
    essayGuidanceHintsEn: [
      'Differentiate BSL vs SSL stop clusters and their underlying counterparty order types.',
      'Contrast Liquidity Sweep wicks against genuine Breakout Body-Close Displacement.',
      'Explain how waiting past Inducement protects 10 USC stops safely behind extreme wicks.',
    ],
  },

  'anatomy-of-xauusd-gold': {
    slug: 'anatomy-of-xauusd-gold',
    photoUrl: PHOTOS.CANDLE_SCREEN,
    photoCaptionId: 'Tiga Sinyal Penggerak Berantai ICT, Displacement Energi Tinggi, Pergeseran Struktur (MSS), serta Penanda Celah 3-Lilin Fair Value Gap (FVG) & Order Block.',
    photoCaptionEn: 'Institutional Sequence Anatomy, Energetic Displacement, Market Structure Shift (MSS), Fair Value Gaps (FVG), and Order Blocks.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Setelah suatu kumpulan likuiditas (BSL atau SSL) disapu oleh pasar, seorang Strategist profesional pantang langsung menebak pembalikan hanya karena satu ekor panjang, ia menunggu bukti komitmen institusional yang disebut **Displacement**: yakni dorongan satu atau serangkaian lilin bertubuh besar penuh bertenaga tinggi (*High-Momentum Range Expansion*) tanpa banyak sumbu penolakan balik, membuktikan bahwa arus dana besar benar-benar membanjiri sisi pasar baru.',
      'Displacement tersebut harus cukup kuat untuk mematahkan ayunan struktur lawan terdekat, peristiwa ini dinamakan **Market Structure Shift (MSS)**. Tanpa MSS yang dipatahkan oleh penutupan body kuat, pergerakan balikan sekecil apa pun baru sekadar pantulan lemah (*Pullback Biasa*) di dalam tren lama!',
      'Tepat di tengah ledakan Displacement yang memicu MSS itu sering terbentuk celah inefisiensi tiga-candle bernama **Fair Value Gap (FVG / Imbalance)**, yakni ruang kosong harga di mana ujung High candle ke-1 tidak bersentuhan dengan ujung Low candle ke-3 karena pembeli (atau penjual) pada candle ke-2 melesat terlalu cepat. Area dasar sebelum ledakan Displacement itu pula yang disebut **Order Block (OB)**, menjadikan irisan FVG + OB lokasi *Re-Entry Limit* berpresisi tinggi.',
    ],
    sec2InstitutionalEn: [
      'Never blindly invert bias off a lone Liquidity Sweep wick; wait strictly for Institutional Displacement breaking prior opposite swings (**Market Structure Shift / MSS**) decisively.',
      'Fast Displacement inherently carves 3-candle **Fair Value Gaps (FVG)** departing origin **Order Blocks (OB)**, marking prime balanced retracement tickets.',
    ],
    anatomyRowsId: [
      ['Langsung klik lawan arah sesaat setelah ekor sapuan menyentuh Support/Resisten tanpa menunggu MSS.', 'Tanpa Displacement & MSS, harga kerap melanjutkan tren lama langsung menelan SL pembalikan!', 'Wajib lihat patah struktur MSS bermomentum penuh sebelum mencari zona FVG re-entry.'],
      ['Menandai sembarang celah 3-lilin kecil di jam sepi Asia sebagai FVG penting.', 'FVG berkualitas wajib lahir dari ledakan Displacement yang sekaligus mematahkan MSS pasca-Sweep!', 'Utamakan hanya FVG yang bertempat di Zona Discount (<50%) untuk Buy atau Premium (>50%) untuk Sell.'],
      ['Memasuki FVG dengan SL terlalu sempit pas di pinggir kotak FVG hingga tersapu retracement penuh.', 'Harga acapkali menguji 50% (*Consequent Encroachment*) FVG hingga ujung Order Block awal.', 'Taruh SL aman di belakang ujung luar Order Block / Sweep awal agar tidak kena wick retest!'],
    ],
    anatomyRowsEn: [
      ['Fading swept wicks instantaneously before prior counter-structure yields.', 'Lacking Displacement MSS, sharp sweeps routinely turn into real breakout continuations.', 'Demand energetic Displacement clearing opposing swings (MSS) first.'],
      ['Marking flat low-energy gaps during sluggish Asian consolidation as prime FVGs.', 'High-value FVGs originate specifically inside strong MSS Displacement impulses.', 'Filter strictly for FVGs overlapping proper Discount/Premium valuation halves.'],
      ['Tightening Stop Losses flush inside FVG borders rather than behind Sweep/OB.', 'Institutional entries frequently dip down to 50% FVG (Consequent Encroachment) or origin Order Blocks.', 'Anchor invalidation safely beyond the initiating OB or Sweep wick.'],
    ],
    sec4QuantId: [
      'Mari menyaksikan keterpaduan matematis urutan **Sweep -> Displacement MSS -> FVG** pada XAUUSDc `1.000 USC ($10)`: Di pukul 21:00 WIB, `Candle A` menyapu dasar SSL hingga `$2,638,50`. Kemudian pukul 21:05 WIB, **`Candle B`** melesat kuat naik dari `$2,639,30` menutup utuh di `$2,643,20`, mematahkan puncak sebelumnya di `$2,641,60` (**MSS SAH!**) dan meninggalkan celah **FVG (`$2,641,20 – $2,642,50`)** antara High candle sebelumnya dengan Low candle berikutnya.',
      'Di bar berikutnya (`21:10 WIB`), harga mendingin tenang kembali menyentuh angka tengah celah FVG di **`$2,642,00`**. Di sinilah tombol eksekusi ditekan: bukan mengejar pucuk di `$2,644`, melainkan entri tenang di `$2,642,00`!',
      'Sekarang lihat presisi jarak Stop Loss-nya: ujung ekor Sweep terbawah berada di `$2,638,50` (beri buffer `$1,00` -> SL di **`$2,637,00`**, total jarak = **`$5,00`**). Memakai **`0,02 Cent lot`** mempertaruhkan persis `10 USC (1% modal)` dengan target logis BSL di `$2,652,00` (**`+20 USC / +2R` bersih**). (Catatan: kamu bahkan dapat menyimulasikan persis skenario bar ini di **Aktivitas 03 Kokpit MT5 40-Candle**!).',
    ],
    sec4QuantEn: [
      'When Candle B surges across prior swing highs ($2,641.60 -> MSS!) leaving a crisp FVG gap ($2,641.20–$2,642.50), calm pullback fills at $2,642.00 behind the swept low ($2,637.00 SL = $5.00 risk @ 0.02 lot = 10 USC) return +20 USC (+2.0R) toward $2,652.00 targets.',
      'Every step translates cleanly into MT5 40-candle simulation mechanics inside Activity 03.',
    ],
    sec4FormulaId: 'Konfirmasi Wajib = Sweep + Displacement Body + MSS Break  |  Zona Antri = FVG + Order Block di Diskon/Premium (SL Di Luar Sweep)',
    sec4FormulaEn: 'Structural Sequence = Liquidity Sweep + Energetic MSS -> Retrace Into FVG/OB -> Bounded SL Behind Origin Sweep',
    hotspots: makeHotspots(
      ['Displacement (Energi Lilin Besar)', 'Market Structure Shift (MSS)', 'Fair Value Gap (FVG 3-Lilin)', 'Order Block (Base Origin)'],
      ['Bukti fisik dana besar mengambil kendali harga tanpa memberi celah perlawanan cepat.', 'Patahnya puncak/lembah lawan mengunci perubahan arah struktur intraday sah.', 'Celah 3 candle kosong tempat harga kerap pulang sejenak menyeimbangkan pesanan.', 'Candle terakhir berlawanan arah sebelum ledakan Displacement bermula.'],
      ['Menganggap pergerakan lambat berbatang kecil adalah sinyal Displacement sah.', 'Memasuki order counter-trend sebelum satu struktur lawan pun terpatahkan (tanpa MSS).', 'Mengejar harga jauh melampaui FVG lalu menaruh SL di udara kosong.', 'Membeli semua kotak FVG pada melawan bias Weekly/Daily tanpa filter.'],
      ['Tunggu dorongan candle solid bertubuh besar sebagai syarat Displacement.', 'Pastikan garis MSS tertembus oleh Close Body (bukan ekor saja).', 'Tarik kotak FVG 3 candle + cek irisan Discount (<50%) atau Premium (>50%).', 'Masukkan 0,02 Cent lot dengan SL aman melampaui Sweep/Order Block (<= 10 USC).']
    ),
    detective: {
      scenarioId: 'Harga menyapu lantai SSL sebentar lalu naik tipis 2 lilin kecil lemah tanpa berhasil melewati ayunan struktur turun terakhir (belum ada MSS), namun pemula langsung klik BUY berdasar FVG mikro M1. Mengapa setup ini sering gugur?',
      scenarioEn: 'Price sweeps SSL weakly via two tiny slow candles failing to break the nearest Lower High (zero MSS), yet a novice immediately buys an M1 gap. Why does this lose frequently?',
      optionsId: [
        'Tidak ada Displacement kuat maupun patah struktur (MSS); penjual masih memegang kendali penuh sehingga pembalikan kecil tadi kerap luluh melanjutkan turun.',
        'Karena grafik M1 tidak memiliki FVG secara teknis.',
        'Karena posisi BUY wajib selalu memakai lot 100 oz.',
      ],
      optionsEn: [
        'Zero institutional Displacement or Market Structure Shift (MSS) occurred, bears retain control, often crushing premature entries into continuation lows.',
        'M1 intervals prohibit structural imbalances altogether.',
        'Buy limits require 100 oz lots mechanically.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Sweep tanpa Displacement MSS bukanlah konfirmasi balik arah, selalu tuntut penutupan body mematahkan ayunan lawan terlebih dulu!',
      explanationEn: 'Right! Waiting cleanly until energetic Displacement seals a clear MSS prevents premature counter-trend entries.',
    },
    essayGuidanceHintsId: [
      'Definisikan hubungan mekanis antara Displacement, Market Structure Shift (MSS), Fair Value Gap (FVG), dan Order Block.',
      'Bagaimana cara mengidentifikasi kotak 3-candle FVG secara geometris di atas grafik candlestick?',
      'Di mana posisi Entry dan Stop Loss terbaik (skala 10 USC) sesudah MSS dan FVG terbentuk?',
    ],
    essayGuidanceHintsEn: [
      'Connect Displacement, MSS validation, 3-candle FVG imbalances, and initiating Order Blocks cleanly.',
      'Define the geometric 3-candle gap rule separating Candle 1 and Candle 3 wicks.',
      'Explain how FVG pullback entries behind origin sweeps maximize R:R inside 10 USC boundaries.',
    ],
  },

  // =========================================================================
  // SEMESTER 10 (ICT-401)
  // =========================================================================
  'trading-sessions-asian-london-ny': {
    slug: 'trading-sessions-asian-london-ny',
    photoUrl: PHOTOS.GLOBAL_TIMEZONE,
    photoCaptionId: 'Jam Likuiditas Dunia (WIB / UTC+7), Memetakan pembentukan Asian Range (07–13 WIB) serta dua jendela pembukaan emas London & New York Killzones.',
    photoCaptionEn: 'Global Liquidity Timezones (WIB / EST), Tracking Asian Accumulation bounds ahead of London (14:00 WIB) & NY (19:00 WIB) Killzones.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Salah satu prinsip paling disiplin dari Michael J. Huddleston berbunyi: **"Time Before Price, Waktu Lebih Dulu daripada Harga"**. Pola grafik FVG, Order Block, atau MSS terbaik sekalipun akan kehilangan daya dorong jika muncul pada jam likuiditas mati di mana bank-bank besar London dan New York sedang terlelap! Arus institusional bergerak sinkron mengikuti jam kerja resmi perbankan pusat keuangan dunia.',
      'Bagi trader Indonesia (zona waktu **WIB / UTC+7**), jadwal 24 jam sehari terbagi bersih menjadi empat fase: (1) **Asian Session (07:00–13:00 WIB)**, di mana Emas & pasangan Eropa umumnya berkonsolidasi tenang membentuk batas atas (**Asian High / BSL**) serta batas bawah (**Asian Low / SSL**) sebagai tangki penyimpanan likuiditas; (2) **London Open Killzone (14:00–17:00 WIB)**, pintu masuk raksasa perbankan Eropa yang sering menginisiasi *Judas Swing* menyapu salah satu sisi Asian Range.',
      '(3) **New York Open & London Overlap Killzone (19:00–22:00 / 23:00 WIB)**, puncak perputaran transaksi tersibuk dan terbersih planet bumi saat bursa ekuitas & obligasi Wall Street bergabung dengan London! Sebaliknya, pada fase **(4) Subuh Daily Rollover (04:00–05:30 WIB)** di mana bank membersihkan buku kliring harian, spread melebar liar sehingga **TERLARANG keras** menekan tombol order.',
    ],
    sec2InstitutionalEn: [
      'Following Huddleston’s cardinal rule, Time Before Price, isolates high-probability execution exclusively to active clearing opens: Asian liquidity build (07:00–13:00 WIB), London Open Killzone (14:00–17:00 WIB), and peak NY Open Killzone (19:00–22:00 WIB).',
      'Staying completely flat through Asian chop and toxic 04:00–05:30 WIB Rollover saves micro accounts from spread bleed.',
    ],
    anatomyRowsId: [
      ['Melototi grafik dan klik Buy/Sell terus dari jam 09:00 pagi hingga 02:00 subuh tanpa jeda.', 'Pergerakan bermakna hampir selalu lahir terpusat di jendela jam buka London & New York!', 'Cukup duduk fokus maksimal 1–2 jam hanya saat London Open (14–17 WIB) atau NY (19–22 WIB).'],
      ['Mengira penembusan sempit di tengah sesi Asia jam 10:00 WIB bakal langsung menjadi tren harian.', 'Asian Range bertugas mengoleksi BSL High & SSL Low untuk menjadi umpan bagi pembukaan London/NY.', 'Tandai saja kotak tertinggi-terendah 07:00–13:00 WIB, biarkan London yang memanennya!'],
      ['Trading saat subuh pukul 04:30 WIB ketika grafik terlihat "diam tenang murah".', 'Pada jam Rollover harian server bank memutus kuotasi, spread XAUUSDc dapat membengkak 5x–10x.', 'Tutup terminal jauh sebelum larut malam guna menghindari biaya gesek margin berlebih.'],
    ],
    anatomyRowsEn: [
      ['Trading impulsively across 16 random hours without session boundaries.', 'Institutional momentum clusters aggressively around London and NY Killzone clearing bells.', 'Budget focused analysis strictly to 14:00–17:00 WIB or 19:00–22:00 WIB windows.'],
      ['Chasing sleepy 10:00 AM Asian breakouts expecting multi-hour trends.', 'Asian consolidation typically traps equal borders awaiting London/NY Judas sweeps.', 'Box 07:00–13:00 WIB extremes neutrally rather than rushing mid-morning orders.'],
      ['Firing late-night market orders around 04:30 AM WIB rollover clearing.', 'Interbank clearing resets force spreads wide and trigger premature Ask stop outs.', 'Enforce strict off-hour discipline freeing mental recovery overnight.'],
    ],
    sec4QuantId: [
      'Bayangkan efek psikologis dan matematis **Fokus Jam Killzone WIB** bagi karyawan atau mahasiswa di Indonesia bermodal `1.000 USC ($10)`: selama ini pemula habis tenaga memelototi ponsel di kantor pukul 10:00 WIB (Asian Chop), ikut masuk 3 kali di kotak mendatar, lalu merugi `-25 USC` akibat spread + whipsaw pagi sebelum pergerakan sesungguhnya dimulai jam 19:30 WIB!',
      'Dengan aturan **Time Before Price JGS**: pagi dan siang bekerja atau kuliah normal dengan tenang (cukup menandai garis kotak `Asian High & Low` pukul 13:00 WIB dalam 30 detik). Lalu baru membuka Lab/MT5 santai di jam pulang kerja (**`19:00–22:00 WIB NY Killzone`**) saat likuiditas Wall Street mengalir kencang ber-spread super tipis `$0,20–$0,30`.',
      'Efisiensi berlipat ganda: nol stres kantor, biaya spread termurah harian, serta satu setup bersih `0,02 Cent lot` (`10 USC risk`) di jam NY Open punya probabilitas pencapaian target `1:2` hingga `1:3R` dalam 45–90 menit saja tanpa begadang subuh!',
    ],
    sec4QuantEn: [
      'Restricting screen focus solely to 14:00–17:00 or 19:00–22:00 WIB cuts Asian sideways chop losses cleanly to zero while executing strictly amidst minimal $0.20–$0.30 spreads.',
      'A single calm 0.02 lot NY Killzone trade (10 USC stop) captures crisp intraday structure effortlessly without workday fatigue.',
    ],
    sec4FormulaId: 'Jadwal WIB JGS: Asia (07–13 Tandai Range) -> London Killzone (14–17 WIB) -> NY Killzone (19–22 WIB) | Rollover (04–05:30 Dilarang)',
    sec4FormulaEn: 'WIB Schedule: Asia Build (07–13) -> London Open (14–17 WIB) -> NY Killzone (19–22 WIB) | Rollover Blackout (04–05:30)',
    hotspots: makeHotspots(
      ['Asian Range (07:00–13:00 WIB)', 'London Open Killzone (14–17 WIB)', 'New York Killzone (19–22 WIB)', 'Rollover Blackout (04–05:30 WIB)'],
      ['Volume tipis membentuk batas atas High (BSL) & dasar Low (SSL) sebagai pool likuiditas.', 'Sesi Eropa acapkali membuat Judas Swing menyapu satu sisi Asia untuk mengisi order besar.', 'Puncak likuiditas gabungan London-Wall Street dengan spread terendah sepanjang hari.', 'Bank melakukan rekonsiliasi saldo, likuiditas ditarik dan spread melompat sangat lebar.'],
      ['Overtrading selama konsolidasi pagi ketika pergerakan hanya mondar-mandir $3.', 'Mengejar arah sapuan palsu di menit ke-15 pembukaan London 14:15 WIB.', 'Tertarik entry berulang sesudah jam 23:30 WIB saat pergerakan mulai membeku.', 'Meninggalkan pending stop ketat melewati pergantian hari pukul 04:30 WIB.'],
      ['Tandai Asian High & Low sebagai radar tujuan likuiditas setiap pukul 13:30 WIB.', 'Amati apakah pukul 14:00–16:00 menyapu salah satu sisi lalu mencetak MSS balik.', 'Gunakan sesi nyaman malam 19:00–22:00 WIB guna eksekusi presisi 10 USC.', 'Matikan MT5 penuh pada jendela Rollover subuh.']
    ),
    detective: {
      scenarioId: 'Pukul 11:00 WIB (tengah sesi Asia), Andi bosan menunggu dan memaksa 3 kali entry scalping beruntun di range sempit emas $3 yang selalu kena Stop Loss akibat bolak-balik tanpa arah. Pelanggaran hukum ICT mana yang dilakukan Andi?',
      scenarioEn: 'At 11:00 AM WIB (mid-Asian lull), Andi takes 3 bored scalps inside a $3 choppy box and stops out three times. Identify the ICT violation:',
      optionsId: [
        'Melanggar hukum "Time Before Price": memaksakan eksekusi di jam sepi akumulasi Asian Range, jauh di luar jendela London Open (14–17 WIB) atau NY Killzone (19–22 WIB).',
        'Karena ia lupa mengganti warna lilin jadi biru.',
        'Karena modal 1.000 USC tidak boleh dipakai sebelum jam 21:00 WIB secara teknis.',
      ],
      optionsEn: [
        'Violating Time Before Price: firing orders inside dead Asian liquidity buildup well outside active London (14–17 WIB) or NY Killzone (19–22 WIB) clearing bells.',
        'Wrong candle color setup.',
        '1,000 USC terminals restrict morning clicks technically.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Di jam Asia, institusi sedang memarkir kolam likuiditas untuk dimakan oleh sesi London/New York, diam menunggu jam Killzone adalah rahasia ketenangan.',
      explanationEn: 'Right! Waiting patiently through calm Asian buildup until active Killzones eliminates forced chop losses automatically.',
    },
    essayGuidanceHintsId: [
      'Jelaskan filosofi "Time Before Price" beserta jam pasti Asian Range, London Killzone, NY Killzone, dan Rollover dalam WIB.',
      'Bagaimana peran Asian High & Asian Low bagi pembukaan London atau New York?',
      'Mengapa kedisiplinan jadwal waktu drastis melindungi saldo 1.000 USC dari overtrading & pelebaran spread?',
    ],
    essayGuidanceHintsEn: [
      'Define Time Before Price along exact WIB session hours (Asia, London, NY, Rollover).',
      'Explain why Asian High/Low boundaries act as liquidity pools for European/US clears.',
      'Show how restricting trades to Killzones lowers spread friction and preserves 10 USC limits.',
    ],
  },

  'ict-judas-swing-silver-bullet-blueprint': {
    slug: 'ict-judas-swing-silver-bullet-blueprint',
    photoUrl: PHOTOS.MARKET_CLOCK,
    photoCaptionId: 'Blueprint Lengkap 4-Langkah ICT (Judas Swing & Silver Bullet), Integrasi Waktu Killzone, Sapuan Likuiditas, Displacement MSS, serta Re-entry FVG 1% Risiko.',
    photoCaptionEn: 'The Complete 4-Step ICT Execution Blueprint, Synthesizing Killzone Clock, Judas Sweep, Displacement MSS & Discount FVG Execution.',
    sandboxKind: 'ICT_PIPELINE',
    sec2InstitutionalId: [
      'Di sinilah seluruh bangunan kurikulum dari Semester 1 hingga Semester 9 menyatu dalam satu Standar Operasional Prosedur (SOP) eksekusi terpadu: **Blueprint 4-Langkah Presisi ICT (Judas Swing & Silver Bullet)**. Istilah *"Judas Swing"* menggambarkan manuver penipuan mengkhianati tren sejati yang kerap meletus tepat di pembukaan London/New York untuk menyapu kolam likuiditas lawan terlebih dulu sebelum arah sebenarnya berjalan.',
      'Sementara itu, model **ICT Silver Bullet** berfokus pada jendela 60 menit paling aktif setiap sesi (`03:00–04:00 AM` NY / London Silver Bullet atau `10:00–11:00 AM` Waktu New York = `21:00–22:00 WIB` saat Musim Panas AS / `22:00–23:00 WIB` saat Musim Dingin AS akibat pergeseran *Daylight Saving Time / DST*), di mana trader berburu cukup **satu Fair Value Gap bersih** yang lahir tepat setelah sapuan likuiditas + MSS.',
      'Kunci keberhasilan mekanisnya bersifat ketat (Gerbang Checklist 4 Centang sebagaimana terpasang langsung pada kalkulator Position Sizer JGS): **(1) Jendela Waktu Killzone Aktif? -> (2) BSL/SSL / Asian Range sudah Tersapu? -> (3) Candle Displacement mematahkan MSS berlawanan? -> (4) Entry FVG di Zona Diskon/Premium (<50% / >50%) dengan SL di balik Sweep <= 1% (10 USC) & Target >= 1:2R?** Jika satu saja saklar belum menyala hijau, dilarang menekan klik order.',
    ],
    sec2InstitutionalEn: [
      'Combining Semesters 1–9 yields the strict 4-Switch Pre-Entry Blueprint (Judas Swing & Silver Bullet): (1) Valid Killzone / DST-adjusted 10:00–11:00 AM NY window -> (2) Verified BSL/SSL liquidity Sweep -> (3) Energetic Displacement breaking MSS -> (4) Discount/Premium FVG Entry locked <= 10 USC (1% risk).',
      'Missing even a single confirmation blocks MT5 execution categorically.',
    ],
    anatomyRowsId: [
      ['Hafal jam 22:00 WIB terus tanpa sadar AS mengalami Daylight Saving Time (DST) Maret–November.', 'Di musim panas AS, jam 10:00–11:00 New York = 21:00–22:00 WIB (maju 1 jam lebih awal!).', 'Atur zona waktu TradingView ke America/New_York sesekali guna memastikan jendela 10:00–11:00 NY tepat.'],
      ['Masuk sesaat setelah Judas Swing baru menusuk garis High/Low tanpa menunggu patah MSS balik.', 'Kadang dorongan awal bukan Judas tipuan, melainkan ekspansi tren nyata searah berita.', 'Wajib lolos 4 gerbang checklist secara berurutan; jangan lompat ke langkah ke-4 sebelum langkah ke-3 terjadi!'],
      ['Setelah masuk di FVG dengan rasio 1:2,5R, panik menutup profit terlalu cepat saat baru +4 USC.', 'Cutting winners short merusak matematika Expectancy padahal kerugian penuh dibayar 10 USC.', 'Biarkan setup 4-langkah menyentuh Target Likuiditas BSL/SSL lawan atau Break-Even sesuai rencana.'],
    ],
    anatomyRowsEn: [
      ['Assuming NY Silver Bullet sits statically at 22:00 WIB year-round despite US DST.', 'March–November Daylight Saving shifts 10:00 AM NY earlier to 21:00–22:00 WIB.', 'Check NY local clock alignment directly inside TradingView before Silver Bullet windows.'],
      ['Fading the initial Judas breakout aggressively prior to real opposite MSS breaks.', 'Failing to await MSS turns counter-trend fading into blown stops on true macro trends.', 'Respect sequential gating: Time -> Sweep -> MSS -> FVG strictly in order.'],
      ['Panicking out of validated 1:2.5R entries the instant floating profits print +4 USC.', 'Trimming winning targets short while taking full 10 USC losses kills long-run expectancy.', 'Let clean 4-Step setups unfold calmly toward mapped structural liquidity targets.'],
    ],
    sec4QuantId: [
      'Mari membedah angka lengkap satu eksekusi sempurna **ICT Silver Bullet (10:00–11:00 AM NY)** pada modal `1.000 USC ($10)` di XAUUSDc: (1) Pukul 21:05 WIB (*DST aktif -> 10:05 NY*), harga menyapu dasar Asian Low / SSL ke **`$2,638,50`** (**Lampu 1 & 2 Hijau**); (2) Pukul 21:10 WIB, candle impulsif melesat menutup di `$2,643,20`, mematahkan puncak kecil `$2,641,60` (**MSS / Lampu 3 Hijau**!) sekaligus mencetak celah **FVG (`$2,641,20 – $2,642,50`)** di paruh Diskon.',
      '(3) Pukul 21:15 WIB harga turun memeluk area FVG di **`$2,642,00`** (**Lampu 4 Hijau**!). Sekarang mari hitung posisinya: lokasi invalidasi aman berada di belakang ekor Judas Sweep `$2,638,50` (ditambah buffer spread = **`$2,637,00`** -> jarak SL = **`$5,00`**).',
      'Melalui Position Sizer JGS: `Lot = 10 USC ÷ ($5,00 × 100) = 0,02 Cent lot` (risiko tepat **`10 USC / 1,0%`**), dan Target Take Profit logis diletakkan sebelum kolam BSL atas di **`$2,652,00`** (+$10 gerak = **`+20 USC / +2,0% / 1:2 R:R`**). Bila 1 malam muncul setup seperti ini 1 kali saja, tidak perlu membuka order lain lagi semalaman!',
    ],
    sec4QuantEn: [
      'Across a textbook DST-verified NY Silver Bullet ($2,638.50 SSL Judas Sweep -> $2,643.20 Displacement MSS -> $2,642.00 Discount FVG entry with $2,637.00 outer SL = $5.00 risk @ 0.02 lot = 10 USC), riding straight toward the upper $2,652.00 pool yields +20 USC (+2.0R) effortlessly.',
      'One verified 4-step ticket beats twenty impulsive scalps cleanly.',
    ],
    sec4FormulaId: 'SOP Mutlak JGS: (1) Killzone/SB + (2) BSL/SSL Sweep + (3) Displacement MSS + (4) Discount/Premium FVG -> Lot <= 10 USC & TP >= 1:2R',
    sec4FormulaEn: 'Mandatory Gate: (1) Killzone Time + (2) Sweep + (3) Displacement MSS + (4) FVG -> 0.02 Lot (10 USC Cap) & Target >= 1:2R',
    hotspots: makeHotspots(
      ['Gerbang 1: Jam Silver Bullet / Killzone', 'Gerbang 2: Judas Swing Sweep', 'Gerbang 3: Displacement & MSS', 'Gerbang 4: Entry FVG + Risk 10 USC'],
      ['Memfilter hanya 60–180 menit emas per sesi saat buku order terisi maksimal.', 'Penipuan awal menyapu Stop Loss kerumunan sebelum arah riil terbentuk.', 'Bukti perubahan kendali kekuatan mematahkan struktur lawan.', 'Titik eksekusi paling hemat SL dengan rasio risk-reward asimetris >= 1:2R.'],
      ['Melupakan konversi Daylight Saving Time antara 21:00 vs 22:00 WIB.', 'Mengira Judas Sweep sudah selesai sebelum MSS muncul.', 'Membeli FVG yang jarak SL ke balik sweep-nya terlalu lebar tanpa mengecek lot.', 'Overtrading mencari Silver Bullet kedua setelah target utama sudah tercapai.'],
      ['Cek jam New York aktual di sudut kanan bawah chart sebelum sesi dimulai.', 'Tandai arah Judas Sweep sebagai bahan bakar likuiditas setup kita.', 'Validasi gerbang checklist di kalkulator Position Sizer + ICT Gatekeeper JGS.', 'Cukup 1–2 eksekusi berkualitas tinggi seminggu daripada memaksa tiap hari.']
    ),
    detective: {
      scenarioId: 'Saat bulan Juli (Musim Panas AS), seorang trader di Jakarta duduk membuka grafik pukul 22:15 WIB mencari setup Silver Bullet (10:00–11:00 NY), namun seluruh gerakan bersih ternyata sudah selesai satu jam sebelumnya! Mengapa ia terlambat 60 menit?',
      scenarioEn: 'In July, a Jakarta trader logs in at 22:15 WIB expecting the 10:00–11:00 AM NY Silver Bullet, only to find the entire impulse occurred an hour earlier! Explain why:',
      optionsId: [
        'Bulan Maret–November AS menerapkan Daylight Saving Time (DST), sehingga jam 10:00 AM waktu New York bergeser maju menjadi pukul 21:00–22:00 WIB!',
        'Karena Bursa New York pindah lokasi ke Tokyo tiap bulan Juli.',
        'Karena server TradingView mundur 1 jam secara acak.',
      ],
      optionsEn: [
        'US Daylight Saving Time (March–November) shifts 10:00–11:00 AM NY earlier to 21:00–22:00 WIB!',
        'New York Stock Exchange relocates operations to Tokyo during summer.',
        'TradingView shifts clocks randomly by 60 minutes.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Menghitung DST (Maret–Nov = 21:00 WIB vs Nov–Mar = 22:00 WIB) mencegah ketinggalan momen inti Silver Bullet.',
      explanationEn: 'Exactly right! Tracking US DST seasonal shifts keeps your WIB session clock synchronized to institutional NY opens.',
    },
    essayGuidanceHintsId: [
      'Sebutkan keempat syarat gerbang berurutan dalam Model Eksekusi Judas Swing & Silver Bullet secara lengkap.',
      'Jelaskan bagaimana pergeseran DST (Musim Panas vs Musim Dingin AS) menggeser jam WIB Silver Bullet.',
      'Tunjukkan cara mengkalibrasi ukuran lot 0,02 Cent serta lokasi SL di balik ekor Judas Sweep pada akun 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Enumerate all 4 consecutive prerequisites in the Judas Swing & Silver Bullet blueprint.',
      'Explain how US Daylight Saving Time shifts WIB Silver Bullet execution windows.',
      'Map exact 10 USC Stop Loss anchoring behind the Judas Sweep extreme.',
    ],
  },

  'failed-setup-autopsy-and-news-risk': {
    slug: 'failed-setup-autopsy-and-news-risk',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Ruang Otopsi Setup Gagal (Black-Box Failure Analysis), Mengaudit secara ilmiah mengapa setup ICT valid tetap dapat menyentuh Stop Loss.',
    photoCaptionEn: 'Institutional Failure Autopsy, Conducting objective black-box post-mortems on stopped setups to isolate preventable errors vs probabilistic noise.',
    sandboxKind: 'ORDERBOOK_SPREAD',
    sec2InstitutionalId: [
      'Salah satu ciri kedewasaan Strategist profesional versus penjual mimpi online adalah **kesediaan terbuka melakukan Otopsi Ilmiah atas Setup yang Kena Stop Loss**! Bahkan dana kuantitatif legendaris sekelas *Renaissance Technologies* hanya mencetak rata-rata kemenangan sedikit di atas 50%, artinya nyaris separuh dari seluruh prediksi terbaik sekalipun berakhir rugi! Ketika setup 4-Langkah ICT-mu sudah rapi namun tetap terkena SL `-10 USC`, jangan marah dan jangan mencari indikator baru.',
      'Bawa transaksi tersebut ke meja **Ruang Otopsi Kotak Hitam (*Black-Box Autopsy*)** untuk mengklasifikasikan penyebabnya ke dalam empat kategori objektif: **(1) HTF Bias Conflict** (*masuk Buy rapi di M5, tetapi lupa chart Daily/H4 baru saja menyapu atap besar dan meluncur turun kencang*); **(2) Major Macro Catalyst** (*setup teknikal cantik rontok sekejap diterjang kejutan NFP / CPI / FOMC*).',
      '**(3) Internal Inducement Trap** (*mengira sweep minor sebagai pool likuiditas sejati, padahal kolam lebih bersih persis di belakang SL-mu*); atau **(4) Pure Statistical Probability Cost** (*seluruh SOP, HTF bias, berita, & likuiditas sudah 100% sah, namun semata termasuk ke dalam ~35% kekalahan acak statistik normal*). Menyadari Kategori #4 membuatmu terbebas selamanya dari godaan Revenge Trading!',
    ],
    sec2InstitutionalEn: [
      'Even world-leading quantitative firms absorb frequent losses around 40%–45% of trades. Performing structured Black-Box Autopsies categorizes stops strictly into: (1) HTF Bias Conflict, (2) Macro Catalyst Interference, (3) Inducement Misread, or (4) Pure Probabilistic Variance Cost.',
      'Recognizing Type #4 (routine statistical cost despite flawless execution) immunizes traders against unnecessary system hopping or revenge spirals.',
    ],
    anatomyRowsId: [
      ['Kena SL -10 USC sekali saja -> langsung marah mengganti strategi ke teknik baru besok pagi.', 'Sistem probabilistik berwinrate 55% tetap menghadapi 45 kekalahan dalam 100 eksekusi sah.', 'Lakukan otopsi: jika proses sudah 100% patuh SOP, terima -10 USC sebagai biaya probabilitas wajar!'],
      ['Fokus zoom in 100% di grafik M1/M5 tanpa pernah mengecek struktur Daily (HTF) terlebih dahulu.', 'Arus Daily/Weekly mengalahkan FVG mungil M5 bagai ombak samudra menelan riak kolam.', 'Cek selalu struktur D1/H4 selama 60 detik sebelum berburu konfirmasi M5 di sesi Killzone.'],
      ['Menyalahkan "pasar jahat" ketika posisi Buy kena libas rilis CPI yang ternyata tertulis merah di kalender.', 'Berita High-Impact membatalkan pola jangka pendek saat algoritma me-reprice nilai makro baru.', 'Catat dalam otopsi sebagai *Preventable Process Error* agar ke depan selalu patuh blackout berita!'],
    ],
    anatomyRowsEn: [
      ['Abandoning a sound strategy immediately after 2 valid setups stop out.', 'A 55% statistical edge expects 45 clean losses per 100 trades mechanically.', 'Grade execution strictly on SOP compliance first; accept normal probabilistic costs calmly.'],
      ['Executing isolated M1/M5 setups blind to opposing Daily/H4 order flow.', 'Higher-timeframe institutional expansion routinely crushes counter-trend M5 gaps.', 'Audit Daily/H4 bias upfront every morning prior to dropping into Killzone charts.'],
      ['Blaming market manipulation when news releases demolish technical FVG borders.', 'High-impact prints re-price entire books instantaneously irrespective of small patterns.', 'Log news errors cleanly as Preventable Process Mistakes rather than strategy flaws.'],
    ],
    sec4QuantId: [
      'Mari mengaudit angka **Biaya Operasional Probabilistik** di akun `1.000 USC ($10)`: bayangkan selama satu bulan penuh kamu mengeksekusi **20 transaksi super disiplin** berisiko konstan `10 USC` (`1%`) dengan target `1:2,5 R:R` (`+25 USC` jika TP). Dari 20 eksekusi tersebut, **9 transaksi langsung menyentuh Stop Loss (`45% Loss Rate` -> `-90 USC`)** dan sering terasa menyakitkan bagi pemula.',
      'Namun sesudah mengotopsi ke-9 kekalahan itu dengan tenang tanpa melanggar aturan (tidak balas dendam menaikkan lot, tidak mengganti metode di minggu ke-2), ke-11 kemenangan (`55% Win Rate`) menghasilkan `11 × (+25 USC) = +275 USC`!',
      'Hasil bersih matematis akhir bulan tetap **Profit Net `+185 USC (+18,5%)`**! Angka tersebut membuktikan secara gamblang: kerugian `-10 USC` bukan tanda kegagalan strategi, ia adalah harga tiket wajib untuk membeli `11 × +25 USC` kemenangan asimetris!',
    ],
    sec4QuantEn: [
      'Across 20 strict 10 USC executions targeting 1:2.5R (+25 USC win), absorbing 9 honest Stop Losses (-90 USC) alongside 11 winners (+275 USC) nets +185 USC (+18.5%) cleanly.',
      'Clean post-trade autopsies clarify that small 1% losses function strictly as statistical business costs rather than broken methods.',
    ],
    sec4FormulaId: 'Otopsi Gagal: (A) HTF Conflict / Berita / IDM = Evaluasi Perbaikan SOP  |  (B) Proses 100% Patuh = Biaya Statistik Wajar (−10 USC)',
    sec4FormulaEn: 'Autopsy Classification: (A) HTF Conflict / News / IDM = SOP Fix Required  |  (B) Valid Process = Normal Statistical Cost (−10 USC)',
    hotspots: makeHotspots(
      ['Diagnosa 1: Konflik Tren HTF (D1/H4)', 'Diagnosa 2: Jebakan Berita Makro', 'Diagnosa 3: Salah Baca Inducement', 'Diagnosa 4: Biaya Statistik Wajar'],
      ['Setup M5 Buy rapi tertabrak gelombang jual besar dari struktur Harian/Mingguan.', 'Rilis data CPI, NFP, atau FOMC memicu gap makro melampaui zona FVG mikro.', 'Mengira sapuan kecil internal sebagai sapuan pool utama sementara kolam asli belum tersentuh.', 'Semua filter 100% benar namun masuk dalam distribusi ~40% probabilitas kalah acak.'],
      ['Membalas kekalahan dengan menaikkan lot 2x–4x lipat di jam berikutnya (Revenge).', 'Menghapus teknik bagus hanya karena 2 hari beruntun tersentuh SL -10 USC.', 'Lupa menengok kalender ekonomi saat sesi New York pukul 19:30 WIB.', 'Mengabaikan arah Daily/H4 saat bersemangat scalping M1/M5.'],
      ['Catat setiap posisi SL dalam 4 kotak diagnosis otopsi di Jurnal Tradermu.', 'Jika masuk Diagnosa 1–3, perketat checklist sebelum klik order ke depan.', 'Jika masuk Diagnosa 4, tersenyum tenang dan jaga ukuran 0,02 lot tanpa mengubah SOP.', 'Hormati batas rugi harian -30 USC jika mental mulai terasa terganggu.']
    ),
    detective: {
      scenarioId: 'Rudi melakukan 4 Checklist ICT sempurna di jam NY Killzone M5 untuk BUY (Time, SSL Sweep, MSS, Discount FVG, Risk 10 USC) tanpa ada berita merah di kalender, namun 20 menit kemudian tiba-tiba masuk order korporasi besar membuat harga menyentuh SL -10 USC. Apa vonis Otopsi paling dewasa?',
      scenarioEn: 'Rudi honors every single checklist constraint cleanly (Time, Sweep, MSS, FVG, zero news, 10 USC risk), yet an unscheduled corporate order taps his SL (-10 USC). State the mature autopsy diagnosis:',
      optionsId: [
        'Pure Probabilistic Variance Cost (Diagnosa #4): proses eksekusi sudah 100% benar; kerugian -1% diterima tenang sebagai biaya statistik bisnis tanpa balas dendam maupun ganti strategi.',
        'Harus segera menggandakan lot jadi 0,10 untuk balas dendam.',
        'Teknik ICT sudah rusak permanen hari itu dan harus ganti indikator RSI.',
      ],
      optionsEn: [
        'Normal Probabilistic Cost (#4): process execution scored 100%; accept the -1% cost calmly without revenge sizing or system hopping.',
        'Immediately quadruple volume to win the loss back overnight.',
        'Abandon institutional structure immediately in favor of oscillators.',
      ],
      correctIndex: 0,
      explanationId: 'Luar biasa! Memisahkan kualitas eksekusi (Process) dari hasil tunggal jangka pendek (Outcome) adalah kunci kestabilan jangka panjang.',
      explanationEn: 'Right! Separating execution integrity from single-trade randomness protects emotional stability across 100-trade series.',
    },
    essayGuidanceHintsId: [
      'Sebutkan keempat kategori penyebab Stop Loss dalam Ruang Otopsi (HTF Conflict, News Catalyst, Inducement, dan Probabilistic Cost).',
      'Mengapa menaikkan lot atau gonta-ganti strategi sesudah mengalami kekalahan kategori ke-4 justru merusak angka Expectancy jangka panjang?',
      'Bagaimana catatan Otopsi bekerja di samping batas rugi 10 USC/trade dan 30 USC/hari?',
    ],
    essayGuidanceHintsEn: [
      'List all 4 Black-Box Autopsy causes cleanly (HTF Conflict, News, IDM, Probabilistic Variance).',
      'Explain why altering sound strategy or scaling size after clean Type #4 stops ruins expectancy.',
      'Connect honest post-mortem journaling to daily 30 USC discipline on 1,000 USC.',
    ],
  },

  // =========================================================================
  // SEMESTER 11 (BEH-402)
  // =========================================================================
  'behavioral-finance-prospect-theory': {
    slug: 'behavioral-finance-prospect-theory',
    photoUrl: PHOTOS.STAT_RESEARCH,
    photoCaptionId: 'Teori Prospek Peraih Nobel Ekonomi (Daniel Kahneman & Amos Tversky, 1979), Mengapa otak manusia terasa 2,2 kali lebih sakit saat rugi dibanding senang saat untung.',
    photoCaptionEn: 'Prospect Theory (Nobel Laureate Daniel Kahneman & Amos Tversky, 1979), Measuring asymmetrical human pain during losses vs gains.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Ekonomi klasik dahulu menganggap manusia bertindak rasional layaknya komputer penimbang untung-rugi (*Expected Utility Theory*). Asumsi tersebut diruntuhkan secara permanen oleh psikolog **Daniel Kahneman (Peraih Nobel Ekonomi 2002) & Amos Tversky** lewat makalah bersejarah di jurnal *Econometrica* (1979): **Prospect Theory & Loss Aversion**.',
      'Melalui ratusan eksperimen empiris, Kahneman & Tversky membuktikan bahwa kurva emosi otak manusia berbentuk asimetris tajam: **rasa sakit psikologis akibat kehilangan `-100 USC` terasa sekitar `2,0 hingga 2,5 kali lebih menyakitkan` daripada rasa senang memperoleh keuntungan `+100 USC`!** Akibat cacat evolusi biologis inilah manusia cenderung **Menghindari Risiko saat sedang Untung (*Risk-Averse in Gains*)** lalu terburu-buru menutup profit lebih awal sebelum TP, sekaligus secara paradoks **Berani Mengambil Risiko Ekstrem saat sedang Rugi (*Risk-Seeking in Losses*)**!',
      'Di layar MT5 sehari-hari, *Loss Aversion Bias* berwujud langsung dalam dua penyakit kronis penghancur rekening ritel: (1) menggeser atau menghapus garis Stop Loss menjauh saat rugi karena tidak sanggup menerima kepastian sakit realisasi minus ("siapa tahu sebentar lagi balik"), dan (2) memotong profit `+5 USC` padahal target rencananya `+25 USC` hanya karena takut untung kecilnya menghilang.',
    ],
    sec2InstitutionalEn: [
      'Kahneman & Tversky’s Nobel-winning *Prospect Theory* (Econometrica, 1979) proved psychologically that financial losses sting roughly 2.2x harder than equal gains feel satisfying.',
      'This hardwired human asymmetry explains why untrained traders close winning setups prematurely yet dangerously stretch or remove Stop Losses during drawdowns.',
    ],
    anatomyRowsId: [
      ['Menutup profit di +4 USC lebih awal karena takut untung tipis itu tiba-tiba hilang berbalik turun.', '*Risk-Averse in Gains* (Kahneman): mengambil kepastian kecil walau mengorbankan R:R jangka panjang.', 'Tetapkan aturan "Set and Forget": pasang SL & TP lalu biarkan pasar menyentuh salah satu secara objektif!'],
      ['Menghapus garis SL -10 USC saat rugi menyentuh -9 USC karena otak menolak mengesahkan rasa sakit.', '*Risk-Seeking in Losses*: rela mempertaruhkan kehancuran 1.000 USC demi secuil harapan "balik modal".', 'Ikat tangan secara mekanis: pasang Hard SL sejak awal dan larang total geser SL menjauh dari harga.'],
      ['Mengira trader pro di bank tidak pernah merasakan takut maupun serakah saat memencet tombol.', 'Manusia mana pun berbiologi sama, bedanya institusi mengunci eksekutor di balik pagar SOP & batas komputer.', 'Bangun kebiasaan mekanis jurnal & Cent Lab sehingga keputusan keluar dari kepala yang tenang.'],
    ],
    anatomyRowsEn: [
      ['Cutting winners early at +4 USC fearing temporary gains evaporate.', 'Prospect Theory labels this "risk aversion in gains", crippling target asymmetry severely.', 'Enforce hands-off Set-and-Forget rules allowing price to settle planned TP or SL freely.'],
      ['Deleting Stop Losses near -9 USC refusing to realize emotional loss pain.', 'Humans turn desperately risk-seeking solely when facing certain loss realization.', 'Mandate hard non-negotiable server SL placements that NEVER widen away from entry.'],
      ['Thinking top Wall Street traders possess superhuman zero-emotion brains.', 'Institutional veterans feel identical human urges, they rely systematically on mechanical risk limits!', 'Externalize discipline via pre-entry checklists and strict Cent sizing bounds.'],
    ],
    sec4QuantId: [
      'Lihat kehancuran matematis bila kita tunduk pada dorongan **Prospect Theory** tanpa rem SOP di akun `1.000 USC ($10)`: bayangkan selama 10 transaksi, 7 kali trade berjalan ke arah benar hingga untung mengambang `+$20 USC`, tetapi karena rasa takut (*Risk-Averse in Gains*) trader memotong cepat setiap kemenangan di **`+6 USC`** (`7 × +6 = +42 USC`).',
      'Sementara pada 3 kali sisanya yang salah arah, rasa sakit *Loss Aversion* membuat trader menggeser SL jauh dari `-10 USC` hingga akhirnya pasrah menyerah cut loss manual di `-40 USC` (`3 × -40 = -120 USC`)! Walaupun akurasinya sangat hebat (**`70% Win Rate`**!), hasil akhir rekening malah **Rugi Bersih `-78 USC (-7,8%)`**!',
      'Bandingkan jika ia mendisiplinkan otaknya mengikuti **aturan JGS (TP Penuh `+20 USC` & Hard SL Tetap `-10 USC`)**: dari `70% Winrate` yang sama persis, hasilnya melambung menjadi `7 × 20 - 3 × 10 =` **`+110 USC (+11,0%)`** hanya dengan mengalahkan refleks biologis Prospect Theory!',
    ],
    sec4QuantEn: [
      'Letting Kahneman’s bias cut 7 winners short at +6 USC (+42) while dragging 3 losses out to -40 USC (-120) turns an extraordinary 70% accuracy into a devastating -78 USC net loss!',
      'Holding firm at +20 USC TP and locking non-moving -10 USC stops transforms identical setups into +110 USC gains.',
    ],
    sec4FormulaId: 'Asimetri Biologis (Kahneman) = Nyeri Rugi ≈ 2,2× Nikmat Untung  |  Penangkal JGS: Hard SL Tidak Bisa Digeser Mundur + Biarkan TP Tercapai',
    sec4FormulaEn: 'Loss Aversion Ratio ≈ 2.2× Pain Weight  |  Institutional Defense: Immutable Hard SL + Undisturbed TP Execution',
    hotspots: makeHotspots(
      ['Asimetri Nyeri 2,2x (Loss Aversion)', 'Risk-Averse Saat Untung (Cut Profit)', 'Risk-Seeking Saat Rugi (Geser SL)', 'Set-and-Forget (Kunci Disiplin)'],
      ['Kerugian terasa dua kali lebih menyakitkan daripada keuntungan dengan nominal sama.', 'Mendorong eksekutor mencabut profit terlalu dini daripada memegang target penuh.', 'Mendorong nekat menahan rugi tak terbatas demi menghindari pengakuan salah saat ini.', 'Menyerahkan eksekusi sepenuhnya ke tiket SL/TP di server MT5 tanpa sentuhan tangan lagi.'],
      ['Memindahkan garis merah Stop Loss lebih jauh saat harga mendekatinya.', 'Menutup transaksi di +3 USC dari target +25 USC karena panik melihat candle merah 1 menit.', 'Membuka posisi tanpa target TP dan SL tertulis sejak detik ke-0.', 'Merasa malu mengakui loss kecil -10 USC sehingga membiarkannya membusuk jadi -500 USC.'],
      ['Tanamkan bahwa rugi -10 USC sudah dianggap keluar sejak detik klik order ("Anggap Hangus").', 'Jauhkan layar setelah SL & TP terpasang guna meredam intervensi emosi.', 'Gunakan target profit minimal 1:2R guna mengungguli asimetri psikologis.', 'Bandingkan skor kepatuhan proses (Process Score) setiap akhir minggu.']
    ),
    detective: {
      scenarioId: 'Sepanjang bulan ini sistem Sinta tepat membaca arah market sebanyak 75% (Winrate 75%!). Namun anehnya saldonya tetap turun drastis dari 1.000 USC ke 650 USC karena tiap profit ditutup cepat di +5 USC sementara yang rugi dibiarkan lari ke -80 USC. Teori Kahneman & Tversky menjelaskan ini sebagai?',
      scenarioEn: 'Sinta achieves a 75% winrate yet drains her account from 1,000 USC down to 650 USC by closing wins at +5 USC while letting losses reach -80 USC. Name Kahneman’s diagnosis:',
      optionsId: [
        'Prospect Theory Asymmetry: ia bersikap menghindari risiko saat untung (Cut Winners Early) namun nekad mencari risiko saat rugi (Hold/Widen Losers) akibat nyeri Loss Aversion.',
        'Karena broker selalu membatasi profit maksimal 5 USC.',
        'Karena Winrate 75% terlalu tinggi secara matematis.',
      ],
      optionsEn: [
        'Prospect Theory Dysfunction: acting excessively risk-averse in gains while dangerously risk-seeking during drawdown losses due to Loss Aversion.',
        'Brokers enforce 5 USC hard profit caps.',
        '75% winrates mathematically trigger negative drift.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Itulah paradoks paling menyakitkan di dunia trading, Winrate setinggi apa pun bakal kalah telak bila memotong profit pendek dan membiarkan rugi melebar.',
      explanationEn: 'Exactly! Even 75% accuracy fails when Prospect Theory cuts winners small and allows unchecked losers to balloon.',
    },
    essayGuidanceHintsId: [
      'Jelaskan inti temuan Nobel Kahneman & Tversky (1979 Prospect Theory & Loss Aversion 2,2x).',
      'Bagaimana bias tersebut memicu dua kesalahan fatal sekaligus: memotong profit terlalu cepat DAN menggeser/menahan Stop Loss rugi?',
      'Sebutkan bukti angka konkret dampak kebiasaan ini terhadap winrate 70% vs disiplin Hard SL -10 USC di 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Summarize Kahneman & Tversky’s 1979 Prospect Theory & 2.2x Loss Aversion asymmetry.',
      'Connect those impulses directly to premature profit-taking and SL widening.',
      'Demonstrate quantitatively why immutable 10 USC stops protect positive winrates.',
    ],
  },

  'tilt-neuroscience-and-cognitive-biases': {
    slug: 'tilt-neuroscience-and-cognitive-biases',
    photoUrl: PHOTOS.RISK_LEDGER,
    photoCaptionId: 'Neurosains Otak & Hormon Stres (John Coates, Cambridge), Efek lonjakan Dopamin (FOMO/Overconfidence) dan Kortisol (Revenge Trading) saat mengalami stres finansial.',
    photoCaptionEn: 'Trading Desk Neuroscience (John Coates, Cambridge), How Dopamine surges drive FOMO overtrading and Cortisol locks down Amygdala panic.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Mantan kepala meja derivatif Wall Street yang banting setir menjadi ahli neurosains Universitas Cambridge, **Prof. John Coates** (*The Hour Between Dog and Wolf*, 2012), melakukan uji darah & hormon langsung pada trader profesional di lantai London! Penemuannya mengejutkan: ketika rentetan kemenangan terjadi, tubuh memproduksi lonjakan **Testosteron & Dopamin** berlebih yang membajak korteks rasional (*Overconfidence & Euphoria*), mendorong trader menaikkan ukuran lot sembarangan merasa diri "tak terkalahkan".',
      'Sebaliknya, saat rentetan kerugian atau volatilitas mendadak menghantam beruntun, kelenjar adrenal membanjiri darah dengan hormon stres ekstrem **Kortisol** dan memicu **"Amygdala Hijack"**, yakni pengambilalihan pusat respons ancaman purba otak (*Fight or Flight*). Dalam mode biologis inilah fungsi logika *Prefrontal Cortex* membeku sementara **Bias Kognitif** beraksi penuh: **Gambler’s Fallacy** (*"Sudah merah 4 kali, berikutnya pasti 100% hijau!"*), **Sunk Cost Fallacy** (*memaksa menahan posisi bangkrut karena sayang modal sudah terlanjur masuk*), dan **Confirmation Bias** (*hanya mau membaca komentar yang mendukung tebakan kelirunya*).',
      'Karena kegagalan tersebut bersifat **kimiawi biologis**, bukan sekadar niat, nasihat "sabarlah pakai niat" selalu gagal melawan Kortisol! Satu-satunya penyembuh ilmiah yang diakui meja prop trading dunia adalah **Pagar Interupsi Fisik & Cooldown Timer Wajib**: menutup paksa terminal MT5 selama minimal **12–24 jam** sesudah menyentuh batas rugi harian guna memberi waktu tubuh menetralisir kadar Kortisol darah.',
    ],
    sec2InstitutionalEn: [
      'Cambridge neuroscientist John Coates discovered directly on institutional trading floors how winning streaks flood Dopamine/Testosterone causing reckless Overconfidence, while losing streaks spike Cortisol and trigger Amygdala Hijack panic.',
      'Under biochemical stress, Gambler’s Fallacy and Sunk Cost traps override logic, requiring physical 24-hour terminal cool-downs to clear hormones back to rational baseline.',
    ],
    anatomyRowsId: [
      ['Setelah menang 3 setup berturut-turut (+60 USC), langsung menaikkan lot dari 0,02 menjadi 0,20 lot.', 'Lonjakan Dopamin & Testosteron memicu mabuk kesuksesan (*Overconfidence Bias*) berisiko kehancuran!', 'Tetap pertahankan batas baku risiko maksimal 1% ekuitas walau baru mencetak 10 kemenangan beruntun.'],
      ['Kena SL 2 kali berturut-turut, jantung berdebar kencang lalu masuk lagi seketika memakai lot ganda.', '*Amygdala Hijack* dipicu Kortisol melumpuhkan logika, mengarah pasti ke *Revenge Trading*!', 'Aktifkan *Revenge Cooldown*: keluar ruangan, minum air, jauhkan terminal minimal 12–24 jam!'],
      ['Berpikir: "Harga sudah 5 hari turun tanpa henti, hari ini mustahil turun lagi, wajib all-in BUY!"', '*Gambler’s Fallacy*: lemparan koin atau pasar tren makro tidak punya ingatan utang berbalik hari ini.', 'Tunggu bukti struktur berbalik (MSS), jangan menebak peluang seakan pasar wajib membalas.'],
    ],
    anatomyRowsEn: [
      ['Stepping lots 10x larger directly after winning 3 setups calmly.', 'Euphoric Dopamine surges create reckless Overconfidence directly preceding steep drawdowns.', 'Keep fixed fractional 1% sizing invariant across hot winning streaks too.'],
      ['Firing oversized instant entries within 60 seconds of taking a Stop Loss.', 'Acute Cortisol triggers Amygdala Fight-or-Flight, dismantling objective SOP checks cleanly.', 'Enforce mandatory 12–24h lockouts after hitting daily stop ceilings.'],
      ['Assuming 6 straight down days mathematically force today to reverse upward.', 'Gambler’s Fallacy attributes non-existent memory onto continuous macro trends.', 'Follow objective MSS reversals instead of betting blindly on overdue bounces.'],
    ],
    sec4QuantId: [
      'Bayangkan perjalanan nyata di akun `1.000 USC ($10)` saat terkena **Siklus Dopamin -> Kortisol**: Di minggu pertama, seorang trader disiplin sukses meraih **4 kemenangan beruntun** (`+20 USC × 4 = +80 USC`, akun berkembang ke `1.080 USC`). Namun lonjakan **Dopamin** menipu otaknya: *"Ternyata mudah sekali! Kalau aku pakai 0,10 lot, minggu depan langsung jadi $100!"*',
      'Di hari Senin minggu ke-2, ia nekat membesarkan lot menjadi `0,10 Cent lot` pada jarak SL `$5,00` (`risiko = 50 USC / 4,6% sekali tembak`). Tepat hari itu setup-nya terkena Stop Loss (`-50 USC`!). Seketika hormon **Kortisol** meledak: dalam hitungan 20 menit ia masuk lagi dua kali balas dendam memakai `0,15 lot` tanpa filter Killzone (**`-150 USC`** tambahan!), hingga dalam satu sore seluruh profit rapi sebulan PLUS modal pokok tergerus jatuh ke **`880 USC`**!',
      'Pengaman JGS memblokir skenario kehancuran tersebut di dua titik: **(1)** Aturan 1% melarang lot melonjak melampaui porsi ekuitas (`1% dari 1.080 USC = hanya 10,8 USC`!), dan **(2)** Begitu batas rugi harian `30 USC` tercapai, mode **Revenge Cooldown** langsung menutup MT5 agar otak kembali waras keesokan hari.',
    ],
    sec4QuantEn: [
      'Climbing cleanly to 1,080 USC via four calm wins often induces Dopamine Overconfidence, tempting a jump to 50 USC/trade sizing, which triggers Cortisol panic the instant one SL hits, bleeding -200 USC via unscheduled Revenge attempts.',
      'Rigid 1% scaling (10.8 USC at 1,080 equity) plus mandatory 30 USC daily shutdowns neutralize neuro-hormonal wipeouts completely.',
    ],
    sec4FormulaId: 'Pagar Anti-Tilt JGS = Lot Tetap <= 1% Ekuitas (Saat Menang Maupun Kalah) + Mandatory Cooldown 24 Jam Pada −3% Harian (−30 USC)',
    sec4FormulaEn: 'Neuro-Defense Charter = Fixed 1% Max Risk Both Ways + Mandatory 24h Cooldown Upon −3% Daily Drawdown (−30 USC)',
    hotspots: makeHotspots(
      ['Lonjakan Dopamin (Overconfidence)', 'Ledakan Kortisol (Amygdala Hijack)', 'Tiga Bias Kognitif Mematikan', 'Protokol Cooldown Fisik 24 Jam'],
      ['Keberhasilan berturut menaikkan nafsu risiko jauh melampaui aturan 1%.', 'Stres kekalahan mengaktifkan respons ancaman emosional mengalahkan korteks rasional.', 'Gambler’s Fallacy, Sunk Cost Trap, dan Confirmation Bias bekerja saat panik.', 'Satu-satunya cara ilmiah membersihkan hormon stres dari sistem darah eksekutor.'],
      ['Menjadikan grafik saldo naik tajam sebagai izin menggandakan ukuran lot 5 kali lipat.', 'Mencoba "balik modal sekarang juga" pada jam sepi setelah 2 kali rugi berturut-turut.', 'Menonton video penguat bias posisi rugi yang masih ditahan (*Confirmation Bias*).', 'Berjanji di mulut "saya kuat mental" sambil tetap menekan MT5 saat tangan gemetar.'],
      ['Kunci ukuran risiko tetap 1% meski sedang mengalami 5 kali profit berturut.', 'Kenali sinyal fisik (jantung cepat/jengkel) sebagai tanda Kortisol aktif, berdiri dari kursi!', 'Terapkan kunci MT5 penuh begitu rugi harian menyentuh -30 USC.', 'Isi kembali fokus lewat aktivitas fisik dan audit jurnal tenang esok hari.']
    ),
    detective: {
      scenarioId: 'Setelah 4 hari profit beruntun pakai 0,02 Cent lot, Edo merasa sangat percaya diri hingga menaikkan lot menjadi 0,20 lot tanpa menyalakan checklist. Ia lalu kena SL -100 USC dan langsung klik 3 posisi balas dendam berturut-turut! Jelaskan dua hormon biologis (Prof. John Coates) yang memicu runtuhnya akun Edo:',
      scenarioEn: 'After 4 green days at 0.02 lot, Edo jumps to 0.20 lot unverified, takes -100 USC loss, and fires 3 rapid revenge tickets. Identify the twin biochemical drivers (John Coates):',
      optionsId: [
        'Dopamin/Testosteron dari rentetan kemenangan memicu Overconfidence menaikkan lot 10x; lalu kerugian besar memicu Kortisol (Amygdala Hijack) sehingga meletus Revenge Trading.',
        'Hormon insulin yang turun karena telat makan siang.',
        'Kekurangan kafein saat jam pembukaan London.',
      ],
      optionsEn: [
        'Dopamine/Testosterone euphoria over winning streaks caused reckless Overconfidence; subsequent shock flooded Cortisol triggering Amygdala Revenge spirals.',
        'Lunchtime blood-sugar oscillation.',
        'Insufficient morning espresso intake.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Itu penjelasan medis eksak mengapa kemenangan panjang sering menjadi awal kehancuran paling berbahaya apabila ukuran 1% tidak dikunci.',
      explanationEn: 'Right! Recognizing how Euphoria transitions straight into Cortisol panic underscores fixed 1% caps through hot streaks too.',
    },
    essayGuidanceHintsId: [
      'Jelaskan peran Dopamin (saat rentetan untung) dan Kortisol / Amygdala Hijack (saat rentetan rugi) berdasar riset Prof. John Coates.',
      'Berikan contoh konkret salah satu bias kognitif (Gambler’s Fallacy / Sunk Cost / Confirmation Bias) yang memperparah tilt.',
      'Bagaimana menghentikan kerusakan tersebut secara mekanis pada modal 1.000 USC sebelum Revenge Trading terjadi?',
    ],
    essayGuidanceHintsEn: [
      'Explain John Coates’ biochemical model connecting Dopamine Overconfidence and Cortisol Amygdala Hijack.',
      'Illustrate Gambler’s Fallacy or Confirmation Bias escalation under stress.',
      'Explain mandatory daily 30 USC circuit-breaker cool-downs mechanically.',
    ],
  },

  'neuroscience-emotions-and-process-journal': {
    slug: 'neuroscience-emotions-and-process-journal',
    photoUrl: PHOTOS.AUDIT_WORKSPACE,
    photoCaptionId: 'Jurnal Evaluasi Berbasis Proses (Process Adherence Score vs Outcome Bias), Mengukur kualitas eksekusi independen dari kebetulan profit/rugi sesaat.',
    photoCaptionEn: 'Quantitative Process Journaling, Auditing strict SOP Process Adherence independently from random short-run Outcome P&L.',
    sandboxKind: 'DRAWDOWN_CURVE',
    sec2InstitutionalId: [
      'Para psikolog keputusan dan manajer dana terkemuka (termasuk Annie Duke, *Thinking in Bets*, serta sistem Jurnal Terpadu JGS) menemukan penghalang utama pembelajaran trader: **Outcome Bias (Resulting)**, yakni kebiasaan bodoh menilai mutu sebuah keputusan *hanya dari apakah hasil uang akhirnya hijau atau merah*!',
      'Di lapangan probabilistik, terdapat **4 Kuadran Matriks Kejujuran Proses**: (1) *Good Process + Profit* = Sempurna; (2) *Good Process + Loss (SL -10 USC)* = **Sukses Proses yang Tetap Wajib Diberi Skor 100%** karena kekalahan itu murni biaya statistik; (3) *Bad Process + Loss* = Wajar; dan paling beracun ialah (4) **Bad Process + Lucky Profit** (*melanggar SOP, tidak pasang SL, nekat Martingale di NFP namun kebetulan balik untung +50 USC*)!',
      'Mengapa Kuadran #4 menghancurkan karir trader? Karena otak mendapatkan hadiah Dopamin atas perbuatan berbahaya, memperkuat kebiasaan bunuh diri di masa mendatang hingga hari sial tiba menghancurkan seluruh akun sekaligus. Solusinya ialah memaksa setiap eksekusi dinilai lewat **Process Adherence Score (Skor Kepatuhan SOP)** pada halaman **Trader Journal JGS** sebelum melihat saldo uangnya.',
    ],
    sec2InstitutionalEn: [
      'Institutional coaches track decision hygiene across a 2×2 Process vs Outcome matrix to eliminate toxic **Outcome Bias**.',
      'A disciplined SOP trade ending in a -10 USC Stop Loss scores 100% process fidelity, while a reckless rule-breaking "lucky profit" triggers acute long-term behavioral damage if celebrated uncritically.',
    ],
    anatomyRowsId: [
      ['Merayakan profit +40 USC dari aksi melompat tanpa SL di berita NFP sebagai "keahlian hebat".', '*Bad Process + Lucky Profit* merupakan racun paling mematikan, melatih kebiasaan yang kelak membangkrutkan akun!', 'Beri nilai D/F pada jurnal untuk profit melanggar SOP; potong sementara ukuran lot jika melanggar.'],
      ['Menganggap trade patuh SOP lengkap yang kena SL -10 USC sebagai "hari terburuk yang memalukan".', '*Good Process + Unlucky Outcome* wajib diberi tepuk tangan internal & skor SOP 100%.', 'Lacak grafik skor Process Adherence (>85%) terpisah di samping kurva R-Multiple.'],
      ['Hanya menulis "Buy XAUUSD, Profit $2" tanpa mencatat alasan, Killzone, rasio R:R, atau kondisi emosi.', 'Jurnal kosong tanpa konteks proses gagal mengungkap sumber bocornya modal selama 3 bulan.', 'Gunakan form Jurnal Trader JGS guna mencatat checklist setup, emosi, & R-Multiple terukur.'],
    ],
    anatomyRowsEn: [
      ['Celebrating +40 USC lucky gains captured after deleting Stop Losses during NFP.', 'Bad Process rewarded by Lucky Profits cement lethal future blowup habits rapidly.', 'Score zero-SL lucky trades strictly as Process Failures demanding corrective reset.'],
      ['Beating yourself up emotionally over a disciplined SOP trade tapping -10 USC stop.', 'Clean Process entries ending inside probabilistic variance deserve full 100% Execution Grades.', 'Track cumulative Process Fidelity (>85%) alongside objective realized R-multiples.'],
      ['Logging bare ticket receipts ("Buy Gold +$3") omitting context and mental state.', 'Unstructured ledgers fail completely to isolate repeatable edge leaks across samples.', 'Record Killzone alignment, R-multiple, emotion tags, and failure categories per entry.'],
    ],
    sec4QuantId: [
      'Mari merancang audit 100 transaksi pada **Jurnal Trader Kuantitatif JGS** (`1.000 USC`, `1% = 10 USC`). Sebelum menatap hasil uang akhir bulan, seorang Strategist memeriksa dua metrik kembar: **R-Multiple Realisasi** (*berapa R yang dimenangkan atau dikalahkan relative ke risiko 10 USC, misal +25 USC = +2,5R, kena SL = -1,0R*) dan **Process Score (`0–100%`)** (*Killzone valid? Lot <= 1%? Ada MSS+FVG? Emosi tenang?*).',
      'Misalkan seorang peserta mendapati selama 30 trade bulan ini: 18 transaksi patuh penuh SOP (**`Process Score >= 90%`**) menghasilkan **net `+16,0R (+160 USC)`**, sedangkan 12 transaksi melanggar aturan karena bosan/FOMO (**`Process Score < 60%`**) menghasilkan **net `-13,5R (-135 USC)`**!',
      'Angka R-Multiple dalam jurnal langsung membongkar fakta menakjubkan tanpa perlu menebak: strategi intinya sudah menghasilkan `+160 USC`, seluruh masalah keuntungannya yang tampak tipis (`+25 USC net`) 100% disebabkan hanya oleh **12 entri kotor tanpa SOP**! Membuang 12 klik nakal bulan depan saja langsung melipatgandakan profit bersih 6x lipat!',
    ],
    sec4QuantEn: [
      'Separating 30 trades inside the JGS Journal shows 18 high-discipline SOP setups generating +16.0R (+160 USC), while just 12 impulsive low-Process entries leak -13.5R (-135 USC), shrinking total net profit silently to +25 USC.',
      'Deleting impulsive rule-breaks doubles portfolio compounding instantaneously without modifying your underlying strategy.',
    ],
    sec4FormulaId: 'R-Multiple Nyata = Profit/Loss (USC) ÷ Risiko Awal (10 USC)  |  Aturan Audit: Skor Proses >= 90% Lebih Penting Dari Untung Satu Hari',
    sec4FormulaEn: 'Realized R-Multiple = Net P&L (USC) ÷ Initial 1R Risk (10 USC)  |  Audit Standard: Separate Process Quality from Outcome Noise',
    hotspots: makeHotspots(
      ['Jebakan Outcome Bias (Resulting)', 'Racun Lucky Profit Tanpa SOP', 'Metrik Netral R-Multiple (1R = 10 USC)', 'Skor Kepatuhan Proses (Jurnal)'],
      ['Menyamakan hasil uang acak sekali klik dengan mutu intelektual keputusan di baliknya.', 'Menghadiahi kelalaian tidak memakai SL sehingga kesalahan berulang jauh lebih besar kelak.', 'Menstandarkan hasil untung/rugi dalam unit risiko guna membebaskan otak dari rasa uang.', 'Menilai integritas pelaksanaan 4 Checklist & pengendalian emosi pada tiap entry.'],
      ['Memuji teman yang profit besar lewat Martingale tanpa Stop Loss.', 'Meninggalkan kebiasaan mencatat Jurnal begitu sedang mengalami hari merah.', 'Mengukur keberhasilan berdasar jumlah dolar harian tanpa memperhatikan risiko awal.', 'Merasa sudah jago padahal 40% transaksinya melanggar jam Killzone.'],
      ['Audit 20–30 transaksi terakhir memakai Halaman Jurnal Trader JGS.', 'Klasifikasikan mana entri patuh proses (>=90%) vs entri FOMO (<60%).', 'Rayakan tetap setiap loss -1,0R yang sudah 100% mengikuti seluruh langkah SOP.', 'Singkirkan total transaksi kategori "FOMO / Luar Jadwal" bulan depan.']
    ),
    detective: {
      scenarioId: 'Joko nekat tidak memasang Stop Loss di tengah rilis NFP, akunnya sempat tersisa -40% mengambang lalu berbalik naik menutup +30 USC. Temannya memuji "Joko trader jenius!". Dalam evaluasi Jurnal Kuantitatif JGS, bagaimana entry ini dinilai?',
      scenarioEn: 'Joko skips Stop Losses through NFP, floats down -40%, then snaps upward into a +30 USC profit. How does quantitative Process Auditing grade this trade?',
      optionsId: [
        'Kegagalan Proses Berbahaya (*Bad Process + Lucky Outcome*): skor kepatuhan 0% karena tidak ber-SL dan menerabas berita merah, kebiasaan seperti ini hanya menunggu waktu untuk menghancurkan modal 100%.',
        'Sukses Sempurna berpredikat Grade A+ karena mencetak profit +30 USC.',
        'Joko wajib menaikkan lot menjadi 5 kali lipat pada berita NFP berikutnya.',
      ],
      optionsEn: [
        'Dangerous Process Failure (Bad Process + Lucky Outcome): scores 0% fidelity for waiving Hard SL through red macro catalysts, a ticking Margin Call habit.',
        'Grade A+ Perfection solely due to positive realized +30 USC cash.',
        'Validated permission to quintuple size ahead of future NFP volatility.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Lucky profit dari pelanggaran proses adalah jebakan psikologis paling mematikan, hanya Jurnal berorientasi proses yang menyelamatkan akun jangka panjang.',
      explanationEn: 'Right! Lucky profits won via reckless violations breed catastrophic future losses unless logged honestly as process breakdowns.',
    },
    essayGuidanceHintsId: [
      'Jelaskan bahaya Outcome Bias beserta Matriks 2×2 antara Process Quality vs Outcome Result.',
      'Mengapa "Bad Process + Lucky Profit" lebih berbahaya jangka panjang daripada "Good Process + SL -10 USC"?',
      'Bagaimana perhitungan R-Multiple dan Skor Kepatuhan SOP di Jurnal mengungkap kebocoran eksekusi pada modal 1.000 USC?',
    ],
    essayGuidanceHintsEn: [
      'Explain Outcome Bias through the 2×2 Process Quality vs Short-Term Outcome matrix.',
      'Prove why Lucky Rule-Breaking profits endanger long-run survival worse than clean 1% Stop Losses.',
      'Connect R-multiple journaling and Process Adherence scoring directly to eliminating emotional leaks.',
    ],
  },

  // =========================================================================
  // SEMESTER 12 (QNT-403)
  // =========================================================================
  'quant-finance-simons-sharpe-martingale': {
    slug: 'quant-finance-simons-sharpe-martingale',
    photoUrl: PHOTOS.QUANT_SERVERS,
    photoCaptionId: 'Matematika Kuantitatif (Ed Thorp & Jim Simons), Mengukur Expectancy, Sharpe Ratio, dan bukti probabilitas mengapa kurva Martingale pasti menemui kehancuran.',
    photoCaptionEn: 'Quantitative Expectancy & Tail-Risk Proofs, Benchmarking Ed Thorp & Jim Simons statistical rigor against deceptive Martingale grids.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Matematikawan MIT **Ed Thorp** (*Beat the Dealer / Beat the Market*) dan pendiri Renaissance Technologies **Jim Simons** (*Medallion Fund*) membuktikan bahwa pasar finansial tunduk pada hukum statistik probabilitas jangka panjang, bukan ramalan dukun. Tolok ukur paling hakiki untuk menilai suatu strategi disebut **Ekspektansi Matematis**: `E = (Win% × Rata-Rata Kemenangan) − (Loss% × Rata-Rata Kekalahan)`. Sistem ber-Winrate `40%` tetapi mengunci `1:3 R:R` menghasilkan `E = (0,40 × 3R) − (0,60 × 1R) = +0,60R` positif sangat kuat, sedangkan strategi `80% Winrate` ber-SL `5× lebih besar` dari TP justru memiliki Ekspektansi negatif!',
      'Selain Expectancy, meja institusional mengukur kualitas kurva pengembalian lewat **Profit Factor** (`Total Laba Kotor ÷ Total Rugi Kotor >= 1,5`) serta **Sharpe Ratio** buatan peraih Nobel William Sharpe yang membandingkan kelebihan profit terhadap volatilitas fluktuasinya (`Reward ÷ Risk Stability`).',
      'Di sinilah terkuak kebohongan paling populer di penjualan robot bot/EA ritel: kurva profit rata mulus ke atas **95% Winrate tanpa Stop Loss (Martingale / Grid Averaging)**. Secara distribusi probabilitas, Martingale hanya memindahkan seluruh kekalahan kecil menjadi satu peristiwa **Negatively Skewed Tail Risk**, di mana 99 kali menang receh langsung dihapus ludes oleh satu kali tren searah panjang menuju **-100% Stop Out**.',
    ],
    sec2InstitutionalEn: [
      'Following Jim Simons and Ed Thorp, quantitative viability depends strictly on positive Expectancy [E = (Win% × AvgWin) − (Loss% × AvgLoss)], robust Profit Factor, and Sharpe Ratio risk stability, never surface winrates.',
      'Martingale / Grid strategies create seductive 95% smooth climbs purely by concentrating catastrophic Negatively Skewed Tail Risk into an inevitable -100% Margin Call.',
    ],
    anatomyRowsId: [
      ['Terpikat iklan strategi atau bot pamer "Winrate 98%, grafik naik mulus garis lurus!".', 'Garis lurus tanpa pernah rugi hampir selalu menyembunyikan tahan rugi floating Martingale tanpa SL.', 'Wajib periksa Maximum Drawdown & apakah sistem memakai Hard Stop Loss di setiap posisi!'],
      ['Menilai sistem ber-Winrate 45% sebagai "strategi jelek" meski rata-rata TP-nya 2,5x lipat SL.', 'Winrate 45% pada 1:2,5R menghasilkan Expectancy +0,575R per transaksi (unggul sangat kokoh)!', 'Evaluasi strategi selalu dengan menggabungkan Winrate dan R:R ke dalam rumus Expectancy.'],
      ['Menganggap "tren searah sejauh $80 tanpa koreksi mustahil terjadi di pasar emas".', 'Distribusi pasar memiliki "Fat Tails" (ekor gemuk), kejadian ekstrem terjadi jauh lebih sering dari kurva normal!', 'Jangan pernah membuka Grid averaging tanpa Hard SL; lindungi modal 1.000 USC lewat cap 1%.'],
    ],
    anatomyRowsEn: [
      ['Trusting screenshots flashing "98% Winrate smooth straight equity lines!"', 'Smooth zero-loss climbs typically mask zero-SL Martingale/Grid averaging risks.', 'Audit historical Maximum Drawdown and verify Hard Stop Losses on every execution first.'],
      ['Dismissing a 45% winrate edge as weak despite asymmetric 1:2.5 payoffs.', '45% accuracy at 1:2.5R compounds cleanly at +0.575R positive Expectancy per trade!', 'Always evaluate edges cleanly through joint Win% × Payoff Expectancy arithmetic.'],
      ['Assuming $80 un-retraced market impulses remain statistically impossible.', 'Financial assets carry Heavy Fat Tails turning rare events into guaranteed Martingale executioners.', 'Cap unit downside rigidly via 1% Stop Losses instead of multiplying losing exposure.'],
    ],
    sec4QuantId: [
      'Mari menguji adu matematis **Strategi JGS Asimetris 1% SL** vs **Sistem Martingale Tanpa SL** di modal `1.000 USC ($10)` selama 50 transaksi: pada **Martingale**, modal memulai `0,01 Cent lot` mencari target `+10 USC`. Setiap kali harga melawan `-$5`, bot menggandakan lot `0,01 -> 0,02 -> 0,04 -> 0,08 -> 0,16 -> 0,32 -> 0,64`!',
      'Selama 45 kali gejolak normal, bot terlihat jenius mengumpulkan `+450 USC`. Namun tepat di trade ke-46 tatkala bank sentral memicu reli searah `-$35` tanpa koreksi penuh, beban tumpukan lot Martingale mencapai **`1,27 Cent lot`** dengan total kerugian mengambang melampaui **`-1.450 USC`** -> akun meledak ke **`0 USC (Margin Call total!)`**.',
      'Sekarang cek **Sistem Disiplin JGS** dengan batas rugi tunggal **`10 USC (1%)`** dan target `1:2,5R (+25 USC)` pada winrate wajar **`45%`**: `E = (0,45 × +25) − (0,55 × 10) = +11,25 − 5,50 =` **`+5,75 USC rata-rata per transaksi`**! Setelah 50 kali eksekusi tertib, saldo tumbuh bersih ke **`1.287,50 USC (+28,75%)`** dengan keamanan modal nyaris tak tersentuh kebangkrutan.',
    ],
    sec4QuantEn: [
      'Escalating losing lots blindly across a $35 trend wave balloons Martingale exposure to 1.27 cumulative Cent lots, blowing clean past 1,450 USC equity straight to Margin Call zero despite winning 45 earlier trades.',
      'By contrast, a disciplined 45% Winrate at 1:2.5R (10 USC fixed stop vs +25 USC win) compounds smoothly at +5.75 USC Expectancy per attempt (+28.75% across 50 trades).',
    ],
    sec4FormulaId: 'Expectancy (E) = (Win% × Rata2 Profit) − (Loss% × Rata2 Rugi)  |  Martingale Ruin = Negatively Skewed Fat Tail (−100% Stop Out)',
    sec4FormulaEn: 'Expectancy E = (Win% × AvgWin) − (Loss% × AvgLoss)  |  Martingale Fallacy = Eventual Fat-Tail Equity Wipeout',
    hotspots: makeHotspots(
      ['Persamaan Expectancy (Win% × R:R)', 'Rasio Sharpe (Profit ÷ Volatilitas)', 'Kurva Ilusi Martingale (95% Win)', 'Fat Tail Risk (Ledakan -100%)'],
      ['Mengukur nilai harapan rata-rata profit bersih per satu transaksi dalam jangka panjang.', 'Mengaudit apakah profit diperoleh dengan ayunan tenang atau deg-degan nyaris bangkrut.', 'Menggandakan taruhan saat kalah menukar ribuan profit mini dengan satu ledakan fatal.', 'Pergerakan ekstrem dunia nyata pasti menabrak batas margin grid tanpa SL pada akhirnya.'],
      ['Mempercayai pamer winrate tinggi tanpa memeriksa Maximum Drawdown & R:R.', 'Menjalankan EA Grid di akun real dengan alasan "sudah 3 bulan aman".', 'Membeli strategi hanya berdasar satu bulan hasil hijau tanpa melihat sampel N >= 100.', 'Melipat lot bila setup gagal guna cepat menambal kurva harian.'],
      ['Hitung Expectancy & Profit Factor jurnalmu setiap 30–100 transaksi.', 'Tolak mentah-mentah segala sistem maupun bot yang tidak mencantumkan Hard SL.', 'Jalankan simulasi Monte Carlo di Quant Lab untuk memahami variasi drawdown sehat.', 'Pertahankan selalu pagar tunggal 1% risiko (10 USC) sebagai perisai anti-ruin.']
    ),
    detective: {
      scenarioId: 'Dua robot trading diuji selama 1 tahun: Bot A punya Winrate 94% tapi memakai Grid Martingale tanpa SL; Bot B punya Winrate 46% dengan Hard SL 10 USC & TP 25 USC. Mengapa seluruh dana pensiun dan institusi memilih Bot B dan membuang Bot A?',
      scenarioEn: 'Over 12 months: EA Alpha touts 94% winrate via zero-SL Grid Martingale, while EA Beta yields 46% winrate with immutable 10 USC SL and 25 USC TP. Why do hedge funds mandate Beta over Alpha?',
      optionsId: [
        'Bot B memiliki Expectancy positif terukur (+6,1 USC/trade) dan ekor risiko terbatas (Hard SL 1%), sedangkan Bot A menyimpan Tail Risk kebangkrutan -100% akibat satu kejadian tren kuat.',
        'Karena institusi menyukai robot yang sering kalah di bawah 50%.',
        'Karena MT5 melarang winrate di atas 90% secara hukum.',
      ],
      optionsEn: [
        'Beta enforces positive bounded Expectancy (+6.1 USC/trade) with zero tail ruin, whereas Alpha guarantees eventual -100% wipeout inside prolonged fat-tail trends.',
        'Institutions dislike high accuracy artificially.',
        'MT5 restricts bots past 90% winrates.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Di dunia kuantitatif nyata, batas kerugian terjaga (*Bounded Downside / Tail Risk Control*) selalu bernilai jauh lebih tinggi daripada pamer winrate palsu.',
      explanationEn: 'Right! Institutional longevity demands strictly bounded tail losses paired with solid Expectancy above deceptive winrates.',
    },
    essayGuidanceHintsId: [
      'Tuliskan dan jelaskan komponen rumus Quantitative Expectancy serta mengapa Winrate tinggi saja bisa menyesatkan.',
      'Buktikan secara probabilistik/matematis mengapa Martingale & Grid tanpa SL memicu Negatively Skewed Tail Risk menuju -100%.',
      'Bagaimana cara menguji atau memastikan sistem di akun 1.000 USC tetap ber-Expectancy positif tanpa risiko bangkrut?',
    ],
    essayGuidanceHintsEn: [
      'Explain Quantitative Expectancy components cleanly alongside Sharpe Ratio stability.',
      'Show mathematically why zero-SL Martingale averaging concentrates fatal Fat-Tail ruin risk.',
      'Prove how bounded 1% Hard Stop sizing sustains positive long-run compounding.',
    ],
  },

  'how-expert-advisors-think-vs-martingale-danger': {
    slug: 'how-expert-advisors-think-vs-martingale-danger',
    photoUrl: PHOTOS.QUANT_SERVERS,
    photoCaptionId: 'Audit Protokol MQL5 Expert Advisor (EA), Standar pengujian ketat Real-Tick Backtest, Out-of-Sample (OOS), Walk-Forward, dan Monte Carlo Anti-Overfitting.',
    photoCaptionEn: 'MQL5 Algorithmic Validation Protocol, Enforcing Real-Tick modeling, Out-of-Sample verification, Walk-Forward checks & Monte Carlo stress tests.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Sebuah **Expert Advisor (EA / Robot Trading)** di MetaTrader 5 sejatinya bukanlah makhluk hidup yang bisa "berpikir dan membaca berita mendadak", ia hanyalah kumpulan skrip kode **MQL5** kaku (`OnInit`, `OnTick`) yang dieksekusi komputer seribu kali lebih cepat dari kedipan mata manusia sesuai persis syarat `if / else` yang diprogram pembuatnya. Di ekosistem **JGS Quant Lab**, terdapat dua arsitektur bot yang diakui sah: **(1) JGS Cent Risk Guardian EA** (robot pelindung pasif penghitung lot 1%, pencegah rollover spread, dan pemutus sirkuit harian otomatis), serta **(2) JGS Micro-Systematic EA** (robot eksekusi tembakan tunggal *Single-Shot* ber-Hard SL dan filter sesi Killzone).',
      'Namun 95% penjual bot komersial di internet menipu publik menggunakan penyakit statistik bernama **Overfitting / Curve-Fitting**: menyetel ratusan angka parameter historis ("Stop Loss 43,7 pips + Moving Average 17 dan 63") agar grafik backtest masa lalu terlihat nyaris sempurna naik lurus, padahal itu sekadar "menghafal masa lalu"! Begitu bot *overfitted* dinyalakan di kondisi pasar minggu depan (*Live Out-of-Sample*), kinerjanya langsung hancur berantakan.',
      'Untuk mencegah penipuan tersebut, sebuah kode EA baru diizinkan lolos pengujian di **JGS EA Testing Toolkit** bila memenuhi **Protokol Audit 8 Tahap**: wajib diuji pada **Every Tick Based on Real Ticks (bukan OHLC palsu!)**, menggunakan biaya Spread + Slippage nyata, dibagi tegas antara data latihan (*In-Sample*) versus data buta masa depan (**Out-of-Sample / OOS**), diuji ulang pergeseran waktu (**Walk-Forward Analysis**), serta diacak urutannya lewat **Simulasi Monte Carlo** guna menguji ketahanan drawdown terburuk.',
    ],
    sec2InstitutionalEn: [
      'Algorithmic EAs run strictly deterministic MQL5 rules (`OnTick`) carrying zero discretionary intuition, requiring two clean JGS roles: Protection Guardians (auto-lot 1% + daily locks) vs Single-Shot Killzone Execution bots.',
      'Defeating historical curve-fitting (Overfitting) mandates an uncompromising 8-stage Audit: Real-Tick spreads, strict Out-of-Sample splits, Walk-Forward stability, and 1,000-run Monte Carlo drawdown stress testing.',
    ],
    anatomyRowsId: [
      ['Membeli EA Rp500rb karena melihat video backtest MT5 mode "1-Minute OHLC / Open Prices Only" naik mulus.', 'Mode pengujian ringan OHLC tidak mensimulasikan pelebaran spread & eksekusi tick dalam bar, hasilnya palsu!', 'Audit wajib pakai mode "Every Tick Based on Real Ticks" dengan simulasi delay latency nyata.'],
      ['Memilih setting parameter terbaik ("Profit Tertinggi Tahun 2023") lalu dipasang apa adanya ke pasar sekarang.', 'Mengoptimalkan secara berlebihan disebut Curve-Fitting/Overfitting, hafal masa lalu namun gagal Out-of-Sample.', 'Uji selalu parameter di jendela waktu berbeda yang belum pernah dilihat robot (OOS & Walk-Forward).'],
      ['Memasang robot eksekusi tanpa memasang lapisan pengaman Risk Guardian (tanpa batas harian / lot fleksibel).', 'Kesalahan logika 1 baris kode (bug loop order) tanpa Risk Limit bisa menghabiskan akun dalam 30 detik.', 'Prioritaskan logika Protection EA (JGS Cent Risk Guardian) di atas segalanya pada modal 1.000 USC.'],
    ],
    anatomyRowsEn: [
      ['Trusting fast "Open Prices Only" MT5 strategy-tester graphs without Real-Tick data.', 'Bar-open modeling ignores intraday spread surges and exact intra-bar SL fills.', 'Mandate "Every Tick Based on Real Ticks" modeling including realistic latency slippage.'],
      ['Selecting hyper-tuned peak historical backtest parameters straight onto live markets.', 'In-sample maximization causes extreme Overfitting failing abruptly Out-of-Sample.', 'Validate edge durability seamlessly across unseen OOS periods and Walk-Forward chunks.'],
      ['Running unguarded execution scripts lacking hard daily loss circuit locks.', 'Single MQL5 tick-loop bugs rapidly flood oversized positions if internal guardians are absent.', 'Embed immutable max-1% volume locks and -30 USC daily shutdown checks natively.'],
    ],
    sec4QuantId: [
      'Lihat mengapa **Audit Out-of-Sample & Simulasi Monte Carlo** mencegah bencana finansial pada EA untuk modal `1.000 USC ($10)`. Bayangkan seorang developer mendapati EA miliknya meraih `+600 USC` pada data latihan 2021–2023 (**In-Sample**). Namun saat diuji pada periode rahasia 2024–2025 (**Out-of-Sample**) dengan **Every Real Tick + Delay 50ms**, performanya merosot menjadi `-120 USC` karena ternyata strateginya terlalu bergantung pada kondisi volatilitas tahun 2022 saja!',
      'Sekarang asumsikan satu EA lolos uji OOS sehat dan menghasilkan `+240 USC` per tahun dengan risiko konstan `10 USC` (1% per trade). Dengan mengacak urutan 100 trade historis tersebut sebanyak `1.000 kali` (**Monte Carlo Randomization**), komputer mengungkap kemungkinan terburuk **95th-Percentile Drawdown** dapat mencapai **11 kekalahan dalam sekelompok acak (`-110 USC` / `-11%`)** walaupun tidak satu aturan pun dilanggar!',
      'Hasil audit Monte Carlo memberi bekal krusial bagi ekuitas `1.000 USC`: pemilik akun tahu persis bahwa penurunan `-11%` masih dalam batas wajar matematika sistemnya, sehingga tidak panik mematikan robot di dasar drawdown lalu tertinggal saat sistem berbalik mencetak puncak baru.',
    ],
    sec4QuantEn: [
      'Running 1,000-iteration Monte Carlo permutation over an honest OOS-verified 10 USC strategy uncovers an expected 95th-percentile worst streak of -11% (-110 USC) even when rules stay untouched.',
      'Knowing true expected variance prevents panicking off sound quantitative tools inside normal cyclical swings.',
    ],
    sec4FormulaId: 'Syarat Lolos EA Audit JGS = Real-Tick Modeling + Uji OOS Positif + Walk-Forward Stabil + Monte Carlo Max DD < 20% + Single-Shot Hard SL',
    sec4FormulaEn: 'EA Audit Standard = Real-Tick Accuracy + Positive OOS + Walk-Forward Hold + Monte Carlo Tail DD < 20% + Single-Shot Hard SL',
    hotspots: makeHotspots(
      ['Every Real Tick Modeling (MQL5)', 'Penyakit Curve-Fitting (Overfit)', 'Uji Buta Out-of-Sample & OOS', 'Stres Test Acak Monte Carlo'],
      ['Mensimulasikan pergerakan Bid/Ask tiap mili-detik serta spread riil pasar historis.', 'Terlalu menyesuaikan rumus terhadap noise masa lalu hingga rapuh menghadapi masa depan.', 'Menguji robot di tahun yang belum pernah tersentuh sama sekali oleh proses optimasi.', 'Mengacak ribuan kombinasi urutan menang-kalah guna mengukur batas drawdown terburuk.'],
      ['Percaya grafik mulus mode backtest "Open Prices Only" yang instan 2 detik.', 'Menguji ribuan angka parameter demi mencetak satu tahun dengan profit tertinggi palsu.', 'Menyalakan robot di akun real tanpa batas maksimal kerugian per hari di kodenya.', 'Mematikan sistem tepat setelah drawdown normal -8% karena tidak pernah tes Monte Carlo.'],
      ['Pelajari kode dasar JGS Cent Risk Guardian sebagai pelindung eksekusi manualmu dulu.', 'Jalankan Protokol Audit 8 Tahap di JGS EA Testing Toolkit sebelum menyetujui robot apa pun.', 'Pastikan tidak ada modul looping Martingale/Grid berlipat ganda di dalam skrip EA.', 'Tetap batasi eksposur maksimal 1% (10 USC) per posisi otomatis.']
    ),
    detective: {
      scenarioId: 'Seorang penjual bot EA menunjukkan grafik backtest naik sempurna +800% tanpa drawdown di MT5 untuk tahun 2023. Namun saat dicek baris atas laporannya tertulis: "Modeling Quality: 25% / Open Prices Only" dan optimasi 12 parameter! Apa diagnosis audit paling tepat?',
      scenarioEn: 'An EA seller promotes a flawless +800% 2023 backtest curve marked "Open Prices Only • 25% Modeling Quality" tuned across 12 variables. Audit verdict:',
      optionsId: [
        'Terindikasi kuat Overfitting & pemodelan backtest cacat (bukan Real-Tick); besar kemungkinan hancur berantakan bila dijalankan pada data Live Out-of-Sample sesungguhnya.',
        'Jaminan keuntungan sah 800% tanpa risiko di akun Cent.',
        'Modeling 25% menandakan broker menaikkan speed komputer.',
      ],
      optionsEn: [
        'Textbook Curve-Fitting plus low-resolution Open-Price modeling, highly prone to collapsing cleanly across real-tick Out-of-Sample feeds.',
        'Certified proof of guaranteed 800% compounding.',
        'Low modeling marks superior brokerage routing.',
      ],
      correctIndex: 0,
      explanationId: 'Brilian! Audit EA sejati mewajibkan Real-Tick (>99% modeling quality), pembagian data OOS, serta batas parameter ramping agar bebas ilusi backtest.',
      explanationEn: 'Right! True quantitative validation mandates ~99% Real-Tick resolution paired with clean Out-of-Sample checks.',
    },
    essayGuidanceHintsId: [
      'Bedakan dua peran sah robot JGS (Risk Guardian EA vs Single-Shot Systematic EA) serta bahaya Overfitting / Curve-Fitting.',
      'Mengapa backtest "Open Prices Only" sering menipu dibanding "Every Tick Based on Real Ticks" + Out-of-Sample + Monte Carlo?',
      'Sebutkan syarat keamanan wajib (Hard SL, Daily Lock, Zero Martingale) bila menggunakan automasi di akun 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Contrast JGS Risk Guardian EAs vs Single-Shot Systematic bots while explaining Curve-Fitting traps.',
      'Explain why Real-Tick modeling, OOS splits, and Monte Carlo stress tests defeat fake backtests.',
      'List mandatory Hard SL and Zero-Martingale protections inside 1,000 USC EA governance.',
    ],
  },

  'transparent-copy-trading-hwm-architecture': {
    slug: 'transparent-copy-trading-hwm-architecture',
    photoUrl: PHOTOS.BANK_DISTRICTS,
    photoCaptionId: 'Tata Kelola Copy Trading High-Water Mark (HWM 30%) & Transparansi Pra-Peluncuran, Menjaga keadilan sempurna tanpa biaya saat akun belum mencetak puncak ekuitas baru.',
    photoCaptionEn: 'Institutional High-Water Mark (30% HWM) Governance, Enforcing strictly $0 performance fees during drawdown recovery until new equity highs are forged.',
    sandboxKind: 'QUANT_MONTE_CARLO',
    sec2InstitutionalId: [
      'Di seluruh industri keuangan teregulasi dunia, dari reksa dana terstruktur hingga dana lindung nilai institusional, standar paling adil bagi pembagian hasil kinerja disebut mekanisme **High-Water Mark (HWM)**. Berbeda dari layanan berbayar bulanan abal-abal ("bayar langganan Rp500rb meski akun klien rugi!") atau komisi berbasis jumlah lot (*Rebate Churning* yang mendorong manajer membuka puluhan posisi buruk demi komisi), HWM menjamin keselarasan kepentingan 100% antara pengelola strategi dan pengikut.',
      'Bagaimana cara kerja matematis **High-Water Mark (Skema JGS Pra-Peluncuran 30% HWM Fee)**? Biaya kinerja HANYA dihitung atas **Net New Profit bersih di atas Puncak Ekuitas Tertinggi sepanjang sejarah (`High-Water Mark`)** pengikut tersebut! Apabila akun pengikut mengalami penarikan kerugian (*Drawdown*) dari puncaknya, manajer **tidak menerima komisi sepeser pun (`$0 Fee`)** selama seluruh proses pemulihan sampai modal pengikut benar-benar menembus puncak sebelumnya dan mencetak keuntungan bersih baru.',
      'Lebih jauh lagi, transparansi JGS menjunjung tinggi kejujuran hukum & perlindungan pemula: seluruh materi edukasi & perangkat kalkulator kami **100% Gratis selamanya**, sedangkan fitur Copy Trading berbasis HWM tetap berstatus **Pra-Peluncuran (*Pre-Launch Educational Schema*)**, tidak terbuka menerima deposit publik, mewajibkan keselarasan pembulatan lot aman *Cent Alignment*, dan hanya akan dinilai setelah lulus standar audit performa 11 metrik serta peninjauan regulasi.',
    ],
    sec2InstitutionalEn: [
      'Across institutional asset management, **High-Water Mark (HWM)** fee models align strategist and follower incentives completely: performance fees charge 0% across drawdown losses and recoveries, triggering solely on verified net new highs past historical peaks.',
      'Crucially, JGS keeps all Academy & Calculator engines 100% free forever while holding proposed Copy Trading strictly in transparent Pre-Launch status with zero public deposits accepted.',
    ],
    anatomyRowsId: [
      ['Membayar grup berbayar bulanan mahal padahal sinyal mereka membuat modal -40%.', 'Layanan berbayar flat mendapat untung biarpun akunmu hancur, terjadi konflik kepentingan tajam!', 'Belajar mandiri gratis penuh di JGS Academy; nilai model HWM yang bebas biaya langganan awal.'],
      ['Tertipu manajer akun tanpa HWM yang menarik fee 30% tiap minggu walau akun bolak-balik rugi lalu impas lagi.', 'Tanpa High-Water Mark, pengikut dapat ditagih biaya berkali-kali atas uang pemulihan yang sama!', 'Mekanisme HWM mewajibkan puncak ekuitas tertinggi baru tercatat sah sebelum fee terhitung.'],
      ['Mengira klaim profit "Pre-Launch Copy Trading JGS" memamerkan rekaman cuan live 100%/bulan.', 'JGS menolak fabrikasi telemetri palsu: status telemetri tetap DISCONNECTED hingga terhubung API terverifikasi!', 'Gunakan kalkulator HWM di `/copy-trading` hanya sebagai simulasi edukasi transparan.'],
    ],
    anatomyRowsEn: [
      ['Paying upfront monthly subscriptions to unverified channels while balances drop -40%.', 'Flat fees reward signal promoters irrespective of subscriber account ruin.', 'Educate yourself strictly free at JGS Academy; verify true HWM incentive alignment.'],
      ['Accepting Weekly Profit-Split contracts lacking perpetual High-Water Mark ceilings.', 'Without perpetual HWM protection, churning drawdown rebounds double-charges identical capital repeatedly!', 'Enforce perpetual HWM so $0 fees deduct during every drawdown and recovery phase.'],
      ['Assuming Pre-Launch JGS disclosures imply hidden active fund solicitation.', 'JGS maintains strict DISCONNECTED telemetry honesty, never fabricating fake track records.', 'Review Copy Trading schemas strictly as Pre-Launch educational transparency simulations.'],
    ],
    sec4QuantId: [
      'Mari buktikan langsung keadilan matematis **30% High-Water Mark (HWM)** pada perjalanan saldo empat bulan milik seorang pengikut (`Modal Awal = $100` / `10.000 USC`, `HWM Awal = $100`). **Bulan 1**: Strategi tumbuh bersih ke **`$120`**. Laba bersih baru di atas HWM `$100` = `$20`. Biaya 30% HWM = `$6` -> Saldo pengikut bersih = **`$114`** (**HWM Baru naik ke `$114`**).',
      '**Bulan 2 (Fase Drawdown)**: Pasar bergejolak sehingga akun turun `-15%` menjadi **`$96,90`**. Berapakah fee bulan ini? **`$0,00 (GRATIS TOTAL!)`**, karena saldo di bawah HWM `$114`. **Bulan 3 (Masa Pemulihan)**: Sistem pulih manis `+15%` naik ke **`$111,44`**. Walau bulan 3 untung `+$14,54`, berapakah fee-nya? Tetap **`$0,00`**, karena `$111,44` belum melampaui puncak lama **`$114,00`**!',
      '**Bulan 4 (Menembus Puncak Baru)**: Akun melaju menembus `$114` naik ke **`$124,00`**. Kini keuntungan bersih yang sah melewati HWM lama hanyalah `$124,00 − $114,00 =` **`$10,00`** saja, sehingga biaya 30% hanya diambil dari selisih `$10` tersebut (**`$3,00`**), meninggalkan pengikut bersih di `$121,00` (`HWM Baru = $121,00`) tanpa pernah dikenai pungutan ganda sepeser pun!',
    ],
    sec4QuantEn: [
      'Across a 4-month trajectory starting at $100 HWM: Month 1 grows to $120 ($20 net high -> 30% fee $6 -> new $114 HWM); Month 2 drops to $96.90 ($0 fee); Month 3 recovers +15% to $111.44 ($0 fee, still beneath $114 ceiling!); Month 4 clears $124.00 (charging 30% exclusively on the $10 gain above $114 = $3 fee!).',
      'Zero double-billing ever occurs during recovery phases.',
    ],
    sec4FormulaId: 'Fee HWM = Max(0, 30% × [Ekuitas Akhir − High-Water Mark Sebelumnya])  |  Selama Ekuitas <= HWM Lama => Fee Mutlak = $0',
    sec4FormulaEn: 'Performance Fee = Max(0, 30% × [Current Equity − Perpetual HWM Ceiling])  |  Drawdown & Recovery Fee = $0',
    hotspots: makeHotspots(
      ['Puncak High-Water Mark (HWM)', 'Zona Drawdown ($0 Fee)', 'Zona Pemulihan ($0 Fee)', 'Laba Bersih Baru (30% Split)'],
      ['Garis patokan ekuitas tertinggi yang pernah membayar biaya performa sebelumnya.', 'Saat strategi mengalami penurunan sementara, tidak ada biaya sepeser pun terpotong.', 'Seluruh pertumbuhan kembali dari dasar kerugian menuju garis HWM tetap 100% gratis.', 'Hanya profit murni yang benar-benar menembus batas puncak tertinggi lama yang dihitung.'],
      ['Mengikuti akun berbayar "profit share mingguan reset ulang" tanpa HWM permanen.', 'Tertipu tangkapan layar profit palsu pada situs yang memaksa deposit cepat.', 'Membuka ukuran Cent Copy yang tidak proporsional dengan modal pribadi sendiri.', 'Lupa bahwa jasa kelola apa pun di JGS berstatus Pre-Launch tanpa pengumpulan dana publik.'],
      ['Uji mekanisme HWM interaktif pada halaman Transparansi & Copy Trading JGS.', 'Pastikan selalu mempelajari modul Academy agar mandiri terlebih dulu sebelum ikut apa pun.', 'Verifikasi telemetri terhubung objektif dan jaga status pra-peluncuran tetap jujur.', 'Siapkan argumen penutup terakhirmu guna menuntaskan 72 SKS & meraih Ijazah Resmi JGS!']
    ),
    detective: {
      scenarioId: 'Akun Copy Trading memiliki High-Water Mark (HWM) tercatat $150. Bulan ini akun sempat turun ke $120, lalu berhasil bangkit kembali ke $148. Pengelola berdalih: "Bulan ini kan naik +$28 dari $120, jadi wajib bayar fee 30% dari $28!". Benar atau salah?',
      scenarioEn: 'Under a $150 High-Water Mark, an account drops to $120 then recovers +$28 up to $148. A manager demands a 30% split off the +$28 rebound. Right or wrong?',
      optionsId: [
        'SALAH MUTLAK! Karena $148 masih di bawah HWM ($150), seluruh kenaikan +$28 masih dalam tahap pemulihan modal lama, Fee yang wajib dibayar tepat $0.',
        'Benar, karena setiap kenaikan bulanan berapapun wajib langsung dipotong 30%.',
        'Fee dihitung menjadi 60% saat masa pemulihan.',
      ],
      optionsEn: [
        'COMPLETELY WRONG! Since $148 stays beneath the $150 HWM peak, recovery rebounds carry strictly $0 fee.',
        'Correct, monthly rises trigger 30% fees irrespective of prior peaks.',
        'Recovery waves double fee percentages to 60%.',
      ],
      correctIndex: 0,
      explanationId: 'Tepat 100%! Itulah perisai sakti High-Water Mark, pengikut tidak pernah membayar komisi dua kali untuk mengembalikan uang yang sempat hilang.',
      explanationEn: 'Right! Perpetual High-Water Marks prevent double-charging during drawdown recoveries completely.',
    },
    essayGuidanceHintsId: [
      'Jelaskan definisi dan cara kerja matematis High-Water Mark (HWM) dibanding biaya langganan datar atau profit-split mingguan tanpa HWM.',
      'Berikan contoh angka perjalanan akun melewati Drawdown & Recovery untuk membuktikan kapan Fee bernilai $0 vs kapan terhitung 30%.',
      'Tegaskan sikap jujur JGS mengenai status pra-peluncuran (tidak menerima deposit) & independensi literasi trader 1.000 USC!',
    ],
    essayGuidanceHintsEn: [
      'Define perpetual High-Water Mark mechanics versus flat fees or non-HWM profit resets.',
      'Illustrate an explicit numerical drawdown & recovery example proving $0 recovery fees.',
      'Explain transparent Pre-Launch governance and independent 1,000 USC skill priority.',
    ],
  },
};
