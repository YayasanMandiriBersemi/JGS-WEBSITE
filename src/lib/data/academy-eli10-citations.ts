export interface AcademicCitationEntry {
  key: string;
  pillLabel: string;
  authors: string;
  institutionOrJournal: string;
  year: number;
  title: string;
  keyFindingId: string;
  keyFindingEn: string;
}

export const CITATION_REGISTRY: Record<string, AcademicCitationEntry> = {
  mishkin2022: {
    key: 'mishkin2022',
    pillLabel: 'Mishkin, Columbia Univ., 2022',
    authors: 'Frederic S. Mishkin',
    institutionOrJournal: 'Columbia University / Pearson Education',
    year: 2022,
    title: 'The Economics of Money, Banking, and Financial Markets (13th Ed.)',
    keyFindingId:
      'Uang fiat tidak memiliki nilai intrinsik tetap; tanpa imbal hasil riil yang mengalahkan inflasi, daya beli uang kertas terus tergerus seiring ekspansi kredit dan pasokan uang.',
    keyFindingEn:
      'Fiat currency lacks fixed intrinsic backing; without holding assets that outpace inflation, cash silently forfeits purchasing power over time.',
  },
  bis2025: {
    key: 'bis2025',
    pillLabel: 'BIS Triennial Survey, 2025',
    authors: 'Bank for International Settlements (BIS)',
    institutionOrJournal: 'BIS Monetary and Economic Department, Basel',
    year: 2025,
    title: 'Triennial Central Bank Survey of Foreign Exchange and Over-the-Counter Derivatives Markets',
    keyFindingId:
      'Pasar valuta asing global memproses triliunan dolar transaksi harian yang didominasi bank besar, lembaga keuangan, dan transaksi perdagangan lintas negara, bukan tebak-tebakan ritel.',
    keyFindingEn:
      'Global FX and OTC spot markets process trillions in daily turnover led by commercial banks, asset managers, and sovereign settlements rather than retail speculation.',
  },
  gibson_barsky: {
    key: 'gibson_barsky',
    pillLabel: 'Barsky & Summers, JPE, 1988',
    authors: 'Robert B. Barsky & Lawrence H. Summers',
    institutionOrJournal: 'Journal of Political Economy / NBER',
    year: 1988,
    title: "Gibson's Paradox and the Gold Standard",
    keyFindingId:
      'Harga relatif emas bergerak berlawanan arah terhadap imbal hasil riil (Real Interest Rates): ketika bunga riil obligasi turun atau minus, biaya peluang memegang emas ikut turun sehingga emas menguat.',
    keyFindingEn:
      'Gold tracks inversely against real interest rates; lower or negative real yields decrease the opportunity cost of holding non-yielding bullion.',
  },
  harris2003: {
    key: 'harris2003',
    pillLabel: 'Harris, Oxford Univ. Press, 2003',
    authors: 'Larry Harris',
    institutionOrJournal: 'Oxford University Press / USC Marshall School of Business',
    year: 2003,
    title: 'Trading and Exchanges: Market Microstructure for Practitioners',
    keyFindingId:
      'Pasar keuangan bekerja sebagai permainan pemindahan likuiditas antara pedagang yang sabar memasang Limit Order versus pedagang terburu-buru yang membayar spread melalui Market Order.',
    keyFindingEn:
      'Exchanges match liquidity makers who supply limit depth with impatient liquidity takers who pay bid-ask spreads via market orders.',
  },
  glosten1985: {
    key: 'glosten1985',
    pillLabel: 'Glosten & Milgrom, JFE, 1985',
    authors: 'Lawrence R. Glosten & Paul R. Milgrom',
    institutionOrJournal: 'Journal of Financial Economics',
    year: 1985,
    title: 'Bid, Ask and Transaction Prices in a Specialist Market with Heterogeneously Informed Traders',
    keyFindingId:
      'Penyedia likuiditas melebarkan jarak Bid-Ask Spread saat menghadapi ketidakpastian atau rilis berita berdampak tinggi untuk melindungi diri dari arus order yang lebih terinformasi.',
    keyFindingEn:
      'Liquidity providers widen the bid-ask spread during uncertainty or news events to protect against adverse selection from informed order flow.',
  },
  kyle1985: {
    key: 'kyle1985',
    pillLabel: 'Kyle, Econometrica, 1985',
    authors: 'Albert S. Kyle',
    institutionOrJournal: 'Econometrica',
    year: 1985,
    title: 'Continuous Auctions and Insider Trading',
    keyFindingId:
      'Institusi besar menyamarkan akumulasi order raksasa di tengah keramaian order ritel dan memanfaatkan kantong stop-loss (likuiditas terkonsentrasi) agar bisa masuk tanpa membuat harga terpeleset.',
    keyFindingEn:
      'Informed institutions disguise large order blocks within liquid retail order clusters so execution minimizes market impact cost.',
  },
  kelly1956: {
    key: 'kelly1956',
    pillLabel: 'Kelly, Bell System Journal, 1956',
    authors: 'John L. Kelly Jr.',
    institutionOrJournal: 'Bell System Technical Journal',
    year: 1956,
    title: 'A New Interpretation of Information Rate',
    keyFindingId:
      'Mempertaruhkan proporsi modal terlalu besar per percobaan justru memicu kehancuran geometris (Risk of Ruin), bahkan ketika kamu memegang strategi dengan probabilitas menang di atas 50%.',
    keyFindingEn:
      'Over-betting relative to true edge causes geometric wealth collapse even on positive-expectancy strategies; fractional risk sizing safeguards survival.',
  },
  vince1990: {
    key: 'vince1990',
    pillLabel: 'Vince, Wiley Finance, 1990',
    authors: 'Ralph Vince',
    institutionOrJournal: 'John Wiley & Sons',
    year: 1990,
    title: 'Portfolio Management Formulas: Mathematical Trading Methods',
    keyFindingId:
      'Kerugian saldo bersifat non-linear: kehilangan 50% modal menuntut keuntungan +100% hanya untuk balik modal (breakeven), sehingga membatasi kerugian per transaksi sejak awal adalah kunci ketahanan.',
    keyFindingEn:
      'Drawdowns scale asymmetrically: losing 50% requires +100% return just to recover breakeven, making strict upfront fractional loss capping essential.',
  },
  lo2000: {
    key: 'lo2000',
    pillLabel: 'Lo et al., Journal of Finance, 2000',
    authors: 'Andrew W. Lo, Harry Mamaysky & Jiang Wang',
    institutionOrJournal: 'Journal of Finance / MIT Sloan',
    year: 2000,
    title: 'Foundations of Technical Analysis: Computational Algorithms, Statistical Inference, and Empirical Implementation',
    keyFindingId:
      'Indikator statistik klasik cenderung tertinggal (lagging), sedangkan pembacaan struktur harga yang objektif mampu menangkap pergeseran rezim suplai dan permintaan jauh lebih dini.',
    keyFindingEn:
      'Conventional lagging averages react after price shifts, while objective structural price-level recognition identifies regime shifts earlier.',
  },
  wyckoff1931: {
    key: 'wyckoff1931',
    pillLabel: 'Wyckoff, Stock Market Inst., 1931',
    authors: 'Richard D. Wyckoff',
    institutionOrJournal: 'Wyckoff Associates / Stock Market Institute',
    year: 1931,
    title: 'The Richard D. Wyckoff Method of Trading and Investing',
    keyFindingId:
      'Pasar bergerak dalam siklus akumulasi, kenaikan (markup), distribusi, dan penurunan (markdown) yang dikendalikan keseimbangan usaha volume terhadap hasil pergerakan harga.',
    keyFindingEn:
      'Price transitions through accumulation, markup, distribution, and markdown cycles governed by supply-demand absorption and effort versus result.',
  },
  steidlmayer1986: {
    key: 'steidlmayer1986',
    pillLabel: 'Steidlmayer, CBOT Logic, 1986',
    authors: 'J. Peter Steidlmayer & Kevin Koy',
    institutionOrJournal: 'Chicago Board of Trade (CBOT) / Porcupine Press',
    year: 1986,
    title: 'Markets and Market Logic',
    keyFindingId:
      'Pasar keuangan merupakan sistem lelang dua arah yang terus mencari zona nilai adil (Point of Control & Value Area) saat seimbang, lalu bergerak cepat saat terjadi ketimpangan lelang.',
    keyFindingEn:
      'Financial exchanges operate as two-way auctions migrating between balanced value areas and rapid directional imbalances.',
  },
  brunnermeier2005: {
    key: 'brunnermeier2005',
    pillLabel: 'Brunnermeier & Pedersen, JoF, 2005',
    authors: 'Markus K. Brunnermeier & Lasse Heje Pedersen',
    institutionOrJournal: 'Journal of Finance',
    year: 2005,
    title: 'Predatory Trading',
    keyFindingId:
      'Ketika banyak peserta terpaksa melikuidasi posisi atau tersentuh Stop Loss secara serentak di level harga yang jelas terlihat, arus paksa tersebut memicu lonjakan harga sesaat sebelum berbalik arah.',
    keyFindingEn:
      'Predictable forced liquidation and clustered stop pools attract strategic counterparties that absorb exhausted flow before reversal.',
  },
  chordia2001: {
    key: 'chordia2001',
    pillLabel: 'Chordia et al., JoF, 2001',
    authors: 'Tarun Chordia, Richard Roll & Avanidhar Subrahmanyam',
    institutionOrJournal: 'Journal of Finance / UCLA Anderson',
    year: 2001,
    title: 'Market Liquidity and Trading Activity',
    keyFindingId:
      'Kedalaman likuiditas dan biaya eksekusi berubah drastis antar jam sesi perdagangan dan menjelang rilis data makro; masuk di jam mati membuat biaya spread melonjak tajam.',
    keyFindingEn:
      'Market depth and transaction costs vary dramatically across intraday session regimes and ahead of macro announcements.',
  },
  kahneman1979: {
    key: 'kahneman1979',
    pillLabel: 'Kahneman & Tversky, Nobel, 1979',
    authors: 'Daniel Kahneman & Amos Tversky',
    institutionOrJournal: 'Econometrica (Nobel Prize Anchor)',
    year: 1979,
    title: 'Prospect Theory: An Analysis of Decision under Risk',
    keyFindingId:
      'Manusia merasakan sakit psikologis akibat kerugian dua kali lebih tajam daripada nikmat keuntungan setara (Loss Aversion), sehingga pemula cenderung menahan posisi rugi dan memotong profit terlalu cepat.',
    keyFindingEn:
      'Human decision-makers weigh losses roughly twice as painfully as equivalent gains, prompting undisciplined averaging down on losers.',
  },
  lopez2018: {
    key: 'lopez2018',
    pillLabel: 'Lopez de Prado, Cornell / Wiley, 2018',
    authors: 'Marcos Lopez de Prado',
    institutionOrJournal: 'Cornell University / John Wiley & Sons',
    year: 2018,
    title: 'Advances in Financial Machine Learning',
    keyFindingId:
      'Menguji puluhan ribu kombinasi parameter pada data historis tanpa validasi luar sampel (Overfitting) melahirkan strategi atau robot EA palsu yang langsung hancur saat menghadapi volatilitas pasar langsung.',
    keyFindingEn:
      'Backtest overfitting turns historical statistical noise into brittle rule sets that collapse rapidly in live market regimes.',
  },
  bessembinder1992: {
    key: 'bessembinder1992',
    pillLabel: 'Bessembinder, JoF / RFS, 1992',
    authors: 'Hendrik Bessembinder',
    institutionOrJournal: 'Journal of Finance / Arizona State Univ.',
    year: 1992,
    title: 'Systematic Risk, Hedging Pressure, and Risk Premiums in Futures Markets',
    keyFindingId:
      'Ketidakseimbangan net posisi antara pelaku lindung nilai komersial dan dana spekulatif besar dalam laporan CFTC COT mencerminkan tekanan likuiditas riil yang mendorong pergeseran harga berjangka.',
    keyFindingEn:
      'Futures net positioning imbalances across commercial hedgers and large institutional funds embed predictive risk-premium pressure.',
  },
  barber2000: {
    key: 'barber2000',
    pillLabel: 'Barber & Odean, JoF, 2000',
    authors: 'Brad M. Barber & Terrance Odean',
    institutionOrJournal: 'The Journal of Finance / UC Berkeley',
    year: 2000,
    title: 'Trading Is Hazardous to Your Wealth: Overtrading and Retail Performance',
    keyFindingId:
      'Individu yang bertransaksi terlalu sering secara impulsif memperoleh imbal hasil bersih jauh paling rendah dibanding pelaku sabar akibat akumulasi spread dan kesalahan timing.',
    keyFindingEn:
      'Overactive impulsive retail traders suffer sharpest net performance drag from compounded friction and noise chasing.',
  },
};

export interface Eli10IntroEntry {
  id: string;
  en: string;
}

export const MODULE_ELI10_INTROS: Record<string, Eli10IntroEntry> = {
  'money-history-and-inflation': {
    id: 'Bayangkan kamu menabung uang jajan Rp50.000 di dalam celengan ayam selama 10 tahun. Dulu uang itu bisa membeli semangkuk bakso untuk lima orang, tetapi sekarang paling cukup untuk satu setengah porsi saja! Uangnya sama sekali tidak dicuri tikus karena jumlah lembar dan angkanya tetap sama, melainkan daya belinya yang diam-diam menguap akibat jumlah uang kertas yang beredar terus bertambah [[cite:mishkin2022]].',
    en: 'Imagine stuffing a $50 bill inside a piggy bank for ten years. The printed number stayed $50, yet it only buys half as many groceries today because circulating fiat supply silently expanded [[cite:mishkin2022]].',
  },
  'what-is-forex-and-gold-trading': {
    id: 'Pernahkah kamu menukar uang Rupiah dengan Ringgit atau Dolar di bandara sebelum liburan? Jika iya, sebenarnya kamu sudah menyentuh prinsip dasar Forex! Setiap negara berdagang lintas benua dan terus saling menukar mata uang serta emas standar dunia bernilai triliunan dolar setiap hari [[cite:bis2025]]. Bukan mesin judi angka, melainkan meja penukaran ekonomi dunia tempat selisih kurs bergerak mengikuti kebutuhan nyata.',
    en: 'Have you ever exchanged local cash for foreign bills at an airport counter before a trip? That everyday swap sits at the heart of global Forex and Spot Gold, where banks and nations settle trillions in cross-border flows every day [[cite:bis2025]].',
  },
  'global-market-participants-ecosystem': {
    id: 'Bayangkan pasar keuangan itu seperti pasar induk raksasa. Di sana ada **truk kontainer grosir** (bank sentral & dana pensiun dunia), **pedagang perantara** (bank investasi), sampai **pembeli tas belanja kecil** seperti kita! [[cite:bis2025]] [[cite:harris2003]] Kalau pembeli kecil nekad berdiri menghadang laju truk kontainer tanpa tahu arah beloknya, pasti langsung tersenggol jatuh.',
    en: 'Picture global financial markets as a giant wholesale dock where massive freight trucks, central banks and pension funds, deliver liquidity alongside tiny retail shoppers [[cite:bis2025]] [[cite:harris2003]]. Stepping right in front of a freight truck without reading its turn signal is how beginners get run over.',
  },
  'macro-interest-rates-central-banks': {
    id: 'Anggap saja Bank Sentral (seperti The Fed Amerika atau Bank Indonesia) itu pemegang keran air utama ekonomi. Saat mereka memutar keran suku bunga lebih ketat agar inflasi tidak mendidih, air pinjaman menjadi mahal sehingga dolar menguat; sebaliknya saat keran dibuka, uang beredar deras [[cite:mishkin2022]]. Emas bereaksi cepat terhadap seberapa mahal imbal hasil memegang uang tunai dibandingkan menyimpan emas [[cite:gibson_barsky]].',
    en: 'Think of a Central Bank as the master water valve of the economy. Tightening interest rates raises borrowing costs and strengthens currency yields, directly changing how attractive non-yielding Gold looks next to bonds [[cite:mishkin2022]] [[cite:gibson_barsky]].',
  },
  'central-banks-rates-cpi-nfp': {
    id: 'Setiap awal bulan ada hari "pengumuman rapor ekonomi" paling ramai sedunia, seperti data harga belanja warga (**CPI**) dan jumlah lowongan kerja Amerika (**NFP**). Satu menit sebelum rapor dibuka, semua toko di pasar grosir menahan napas sehingga jarak harga beli dan jual tiba-tiba melebar tajam [[cite:glosten1985]]. Masuk posisi beberapa detik sebelum pengumuman rapor persis seperti melempar uang di tengah angin puting beliung.',
    en: 'Monthly releases like CPI inflation and Non-Farm Payrolls act as macroeconomic report cards. Seconds before numbers print, liquidity providers pull resting quotes and widen spreads sharply to avoid getting picked off [[cite:glosten1985]].',
  },
  'intermarket-yields-dxy-xauusd': {
    id: 'Emas (**XAU/USD**) tidak pernah menari sendirian; ia terhubung tali tak kasatmata ke imbal hasil surat utang pemerintah AS (**US10Y**) dan indeks Dolar (**DXY**). Bayangkan timbangan dua sisi: ketika imbal hasil bersih obligasi Dolar memberi bunga tinggi di atas inflasi, orang memilih Dolar dan emas ikut turun; ketika bunga bersihnya merosot, emas berkilau lagi [[cite:gibson_barsky]] [[cite:mishkin2022]].',
    en: 'Gold never dances alone, it sits opposite US Treasury real yields and the US Dollar Index on an economic seesaw. When inflation-adjusted bond yields surge, non-yielding gold cools; when real yields compress, bullion shines [[cite:gibson_barsky]].',
  },
  'broker-vs-mt5-terminal': {
    id: 'Banyak pemula mengira aplikasi **MetaTrader 5 (MT5)** adalah tempat mereka menyetor uang, padahal salah! Anggap saja **Broker** adalah dompet bank & jembatan resminya tempat uangmu `$10 (1.000 USC)` disimpan, sedangkan **MT5** hanyalah **stik PS atau layar TV kemudinya** yang terhubung ke server broker [[cite:harris2003]]. Mengganti aplikasi MT5 tidak pernah memindahkan saldomu dari brankas broker.',
    en: 'Many beginners confuse MetaTrader 5 with their actual broker. Think of your Broker as the licensed custody bank holding your $10 (1,000 USC), while MT5 is merely the steering wheel screen displaying quotes and sending orders [[cite:harris2003]].',
  },
  'limit-order-book-bid-ask-slippage': {
    id: 'Pernah lihat rak antrean penukaran valas di mal? Selalu ada dua papan harga: harga **Ask** (kalau kamu mau beli sekarang) selalu sedikit lebih tinggi dari harga **Bid** (kalau kamu mau jual sekarang), selisih tipis itu disebut **Spread** [[cite:harris2003]] [[cite:glosten1985]]. Sementara **Slippage** terjadi kalau di keramaian pasar stok di rak harga itu sudah habis diborong orang sepersekian detik lebih dulu.',
    en: 'Like any currency booth at a mall, quotes always show a slightly higher Ask price to buy now and a lower Bid price to sell now, the gap between them is the Spread [[cite:harris2003]] [[cite:glosten1985]].',
  },
  'visual-tour-5-mt5-buttons': {
    id: 'Pertama kali membuka layar MT5 memang terasa seperti duduk di kokpit pesawat terbang penuh tombol angka asing. Tenang saja, kamu sebenarnya cuma butuh menguasai 5 tombol utama: **Market Watch** (daftar barang), **Lot Volume** (seberapa berat belanjaan), **Stop Loss** (rem otomatis), **Take Profit** (kasir ambil untung), dan tombol **Buy / Sell** [[cite:harris2003]]. Kita akan bedah satu per satu pelan-pelan.',
    en: 'Opening MT5 for the first time feels like sitting in an airplane cockpit, yet disciplined trading only relies on five controls: Market Watch, Lot Volume, Stop Loss safety brake, Take Profit target, and Buy/Sell triggers [[cite:harris2003]].',
  },
  'why-small-accounts-blow-up': {
    id: 'Kenapa hampir 9 dari 10 pemula bermodal $10 langsung habis di minggu pertama? Bukan karena tebakannya selalu bodoh, tetapi karena mereka memakai akun Standar (`1 lot = 100 oz emas`). Itu ibarat anak SD disuruh memikul **batangan emas 31,1 gram utuh**, emas goyang $10 saja (hal biasa dalam sehari!), pundaknya langsung patah terkena Margin Call [[cite:kelly1956]] [[cite:vince1990]].',
    en: 'Why do 90% of $10 beginners blow up inside week one? Because standard accounts force a minimum 0.01 lot equal to 1 full troy oz of gold, a routine $10 intraday dip immediately exceeds mathematical ruin bounds [[cite:kelly1956]] [[cite:vince1990]].',
  },
  'how-cent-accounts-work': {
    id: 'Solusi paling jenius bagi modal `$10` bernama **Akun Cent (`USC`)**! Saat uang `$10` masuk, sistem memecahnya seperti menukar satu lembar uang ratusan ribu menjadi **1.000 keping koin ratusan** (`1.000 USC`), sekaligus mengecilkan berat kontrak emas 100x lipat (`1 Cent Lot = 1 oz`) [[cite:kelly1956]]. Dengan `0.01 Cent Lot`, sekali salah analisis ruginya paling cuma `10 USC`, setara harga sebungkus es kopi!',
    en: 'The Cent Account solves the small-balance problem brilliantly: your $10 splits into 1,000 USC coins while shrinking gold contract weight 100x (`1 Cent Lot = 1 oz`) [[cite:kelly1956]]. A 1% mistake costs just 10 USC, roughly the price of a snack!',
  },
  'circuit-breakers-and-daily-loss-limits': {
    id: 'Kalau main basket lalu kakimu mulai kram, pelatih pintar menyuruhmu duduk ke bangku cadangan, bukan memaksa lempar bola tiga angka sambil emosi! Di JGS, **Daily Circuit Breaker 3% (30 USC)** adalah sakelar pemutus listrik otomatis: bila rugi 3 kali berturut-turut hari ini (`-30 USC`), matikan MT5 agar emosi tidak membakar modal [[cite:vince1990]] [[cite:kahneman1979]].',
    en: 'When your legs cramp during a match, smart coaches pull you to the bench instead of forcing wild shots. Our 30 USC (3%) Daily Circuit Breaker cuts MT5 off after three losses before emotional drawdown spirals [[cite:vince1990]].',
  },
  'candlestick-psychology-and-wicks': {
    id: 'Setiap batang **Candlestick** sebenarnya adalah foto hasil duel tarik tambang antara tim pembeli (Bulls) dan tim penjual (Bears) selama periode tertentu. **Ekor panjang (Wick)** di atas atau bawah ibarat bekas jejak sepatu saat salah satu tim sempat mendorong garis terlalu jauh lalu langsung didorong balik beramai-ramai [[cite:wyckoff1931]].',
    en: 'Every candlestick records a tug-of-war round between buyers and sellers. Long rejection wicks mark footprints where one side pushed too far out of balance only to get slammed back swiftly [[cite:wyckoff1931]].',
  },
  'market-structure-support-supply': {
    id: 'Bayangkan grafik harga naik seperti orang mendaki anak tangga ke lantai dua. Selama kaki terus membuat **anak tangga baru lebih tinggi (Higher High & Higher Low)**, tren masih sehat naik; tetapi begitu anak tangga penopangnya jebol, arah angin telah bergeser [[cite:lo2000]]. Jangan pernah menghafal pola gambar tanpa melihat di anak tangga mana kamu berdiri!',
    en: 'Think of trending price like climbing stairs cleanly upward: as long as buyers carve Higher Lows and Higher Highs, momentum stays intact, until a key step fractures structurally [[cite:lo2000]].',
  },
  'indicators-ma-rsi-macd-atr-lag': {
    id: 'Banyak pemula menaruh 6 indikator warna-warni di layar dengan harapan bisa meramal masa depan. Padahal rata-rata hitung seperti Moving Average & RSI itu mirip **kaca spion mobil**, berguna melihat jalan yang BARU SAJA kita lewati beberapa detik lalu, bukan kaca depan untuk melihat lubang di hadapanmu [[cite:lo2000]].',
    en: 'Layering five glowing indicators turns charts into Christmas trees. Classical averages like MA and RSI behave like a car rear-view mirror, they reflect where price has already traveled rather than predicting structural hurdles ahead [[cite:lo2000]].',
  },
  'wyckoff-laws-and-composite-man': {
    id: 'Richard Wyckoff mengajak kita membayangkan seluruh bank besar di dunia bekerja seperti satu tokoh fiksi jenius bernama **Composite Man**. Dia tidak pernah berteriak di keramaian: dia pelan-pelan memborong barang bagus di gudang bawah saat semua orang bosan, lalu menjualnya di pucuk saat semua orang baru ikut mengantre [[cite:wyckoff1931]] [[cite:kyle1985]].',
    en: 'Wyckoff framed institutional order flow as one patient strategist, the Composite Man, quietly accumulating inventory in boredom before distributing it into late retail euphoria [[cite:wyckoff1931]] [[cite:kyle1985]].',
  },
  'wyckoff-accumulation-spring-upthrust': {
    id: 'Pernah lihat harga tiba-tiba menembus lantai Support ke bawah cuma beberapa menit, membuat pemula panik *cut-loss*, lalu detik berikutnya malah terbang roket ke atas? Wyckoff menamakannya **Spring** (jebakan pegas), dan versi terbaliknya di atas atap disebut **Upthrust (UTAD)** [[cite:wyckoff1931]] [[cite:brunnermeier2005]]. Mereka menjemput antrean jualmu dulu sebelum berangkat naik!',
    en: 'Ever watched price pierce clean below support just long enough to trigger panic stops before rocketing upward? Wyckoff termed that deceptive dip a Spring, collecting resting liquidity before genuine markup [[cite:wyckoff1931]] [[cite:brunnermeier2005]].',
  },
  'vsa-and-supply-demand-zones': {
    id: 'Kalau kamu memukul bola dengan tenaga raksasa (Volume meledak besar), tapi bolanya malah cuma bergeser 2 sentimeter (Candle pendek tanpa jarak), berarti di balik tembok itu ada raksasa yang menahan dan menyerap semua pukulanmu [[cite:wyckoff1931]]. Prinsip **Effort vs Result** inilah yang membedakan zona *Supply-Demand* asli dengan coretan kotak sembarangan.',
    en: 'If massive trading volume hammers price yet the candle closes barely moving, hidden institutional limit orders just absorbed the punch, the classic Wyckoff Effort-vs-Result imbalance inside genuine Supply and Demand zones [[cite:wyckoff1931]].',
  },
  'elliott-wave-mass-psychology': {
    id: 'Kerumunan manusia di pasar bergerak seperti ombak di pantai dalam siklus optimisme dan ketakutan yang berulang [[cite:lo2000]]. Masalahnya, menghitung ombak Elliott di tengah jalan sangat mudah menipu mata sendiri: dua orang melihat gambar sama bisa menggambar 5 skenario berbeda kecuali ditopang aturan struktur dan batas risiko objektif.',
    en: 'Crowds cycle through waves of optimism and hesitation, yet manual wave counting often invites hindsight bias unless anchored to strict structural invalidation and fixed risk budgets [[cite:lo2000]].',
  },
  'fibonacci-gold-ratios-and-discount': {
    id: 'Bayangkan kamu ingin membeli sepatu idaman seharga Rp1 juta. Apakah kamu lebih suka membelinya saat harganya naik ke atas normal (**Zona Premium**), atau menunggu toko memberi kupon potongan setengah harga di bawah 50% (**Zona Diskon**)? Rasio retracement di bawah garis keseimbangan 50% membantu kita tidak pernah memburu barang kemahalan [[cite:steidlmayer1986]].',
    en: 'Would you rather buy sneakers marked up above retail, or wait calmly for a 50%-plus clearance discount? Dividing every dealing range into Premium and Discount prevents you from chasing expensive tops [[cite:steidlmayer1986]].',
  },
  'harmonic-patterns-and-subjectivity-critique': {
    id: 'Di media sosial bertebaran pola sayap kelelawar dan kupu-kupu penuh garis warna. Ilmu ekonomi mengingatkan kita agar kritis: gambar simetri tidak pernah menggerakkan harga, yang menggerakkan harga adalah siapa yang terperangkap likuiditas di ujung titik pembalikan dan seberapa ketat batas ruginya [[cite:lo2000]] [[cite:kelly1956]].',
    en: 'Geometric wing drawings fill social media feeds, yet shapes never push markets, trapped counterparties and objective risk ratios do. Stay skeptical of subjective geometry without liquidity logic [[cite:lo2000]].',
  },
  'auction-market-theory-fair-value': {
    id: 'Anggap saja bursa global bekerja persis seperti **pasar lelang ikan pagi hari**. Saat pembeli dan penjual sepakat ikan tuna wajar seharga Rp80.000/kg, transaksi menumpuk tenang di satu titik (Nilai Adil); tetapi begitu badai datang dan tangkapan langka, lelang berpacu mencari kesepakatan harga baru [[cite:steidlmayer1986]].',
    en: 'Organized markets behave just like an early-morning fish auction: prices linger peacefully around Fair Value when buyers and sellers agree, then sprint rapidly whenever unexpected imbalances appear [[cite:steidlmayer1986]].',
  },
  'volume-profile-poc-vah-val': {
    id: 'Jika grafik biasa hanya melihat waktu dari kiri ke kanan, **Volume Profile** menumpuk balok ke samping untuk menunjukkan di lantai harga mana kerumunan terbesar paling banyak bertransaksi (**Point of Control / POC**) [[cite:steidlmayer1986]]. Level sepi volume (**LVN**) sering dilompati cepat oleh harga karena hampir tidak ada yang berdebat di sana.',
    en: 'Volume Profile rotates histogram bars sideways to expose the exact price shelf where heavy two-way volume clustered (**POC**) and empty low-volume pockets price slices smoothly through [[cite:steidlmayer1986]].',
  },
  'order-flow-dom-footprint-iceberg': {
    id: 'Pernah lihat daftar pesanan di kasir restoran online secara langsung? **Order Flow / Footprint** mengintip bagian dalam tubuh lilin untuk membedakan pembeli agresif (`Market Buy`) dengan antrean penunggu (`Limit Sell`) termasuk order **Iceberg** raksasa yang membagi pesanannya menjadi ratusan potongan kecil [[cite:harris2003]] [[cite:kyle1985]].',
    en: 'Order Flow & Footprint tools peer straight inside candles to track aggressive buyers colliding with hidden Limit Iceberg walls split stealthily by large institutions [[cite:harris2003]] [[cite:kyle1985]].',
  },
  'ict-smc-grassroots-origin-and-ipda': {
    id: 'Metodologi ICT bukan sihir yang jatuh dari langit, ia merangkai ilmu likuiditas klasik, siklus sesi bank, dan ketidakseimbangan lelang ke dalam kerangka membaca kapan algoritma antar-bank memburu kantong stop-loss sebelum menyalurkan ekspansi harga [[cite:kyle1985]] [[cite:brunnermeier2005]].',
    en: 'ICT / Smart Money methodology synthesizes classical auction logic, session timing, and stop-pool mechanics to spot when interbank delivery engines sweep retail stops prior to directional expansion [[cite:kyle1985]] [[cite:brunnermeier2005]].',
  },
  'liquidity-sweeps-vs-real-breakouts': {
    id: 'Pernahkah garis harga baru menembus puncak sedikit saja, kamu langsung klik *Buy* takut ketinggalan, eh 3 menit kemudian malah jatuh menabrak Stop Loss-mu? Di situlah kolam **Buy-Side Liquidity (BSL)** disapu bersih untuk mengisi order jual institusi sebelum harga benar-benar bergerak [[cite:brunnermeier2005]] [[cite:kyle1985]].',
    en: 'Ever bought a fresh breakout only for price to reverse minutes later into your Stop Loss? Institutions frequently sweep obvious Equal Highs/Lows to fill size off trapped retail stops [[cite:brunnermeier2005]].',
  },
  'anatomy-of-xauusd-gold': {
    id: 'Emas (**XAU/USD**) itu ibarat mobil balap F1: tenaganya besar dan jalurnya mulus saat jalanan ramai (**London & New York**), tetapi bisa terpeleset hebat jika kamu memacu gas di gang sepi jam 04:00 pagi saat spread bank melebar [[cite:chordia2001]] [[cite:bis2025]]. Di modul ini kita bedah karakter harian sang raja komoditas.',
    en: 'Spot Gold behaves like a Formula-1 chassis: silky and responsive along peak London/New York liquidity, yet treacherous during 04:00 WIB rollover gaps or sudden macro news spikes [[cite:chordia2001]] [[cite:bis2025]].',
  },
  'trading-sessions-asian-london-ny': {
    id: 'Pasar uang dan emas memang buka nyaris 24 jam, tetapi bukan berarti semua jam layak ditekan tombol! Seperti warung makan, ada **jam sepi** (Asia pagi, cuma pasang patokan rentang), **jam ramai pembeli Eropa** (London Killzone `14:00 WIB`), dan **jam puncak dunia** (Overlap NY `19:00 WIB`) saat spread paling murah [[cite:chordia2001]].',
    en: 'Even a 23-hour gold market has prime shifts and dead hours: Asian sessions build quiet liquidity benchmarks, London opens European institutional flow, and NY Overlap offers tightest spreads [[cite:chordia2001]].',
  },
  'ict-judas-swing-silver-bullet-blueprint': {
    id: 'Bayangkan pemain basket pura-pura melangkah ke kiri untuk mengecoh penjaga (**Judas Swing**), lalu berlari kencang ke arah berlawanan tepat di ring kosong (**Market Structure Shift + FVG**). Di sini kita merakit cetak biru lengkap 5 gerbang disiplin, sebelum satu pun klik dikirim ke broker 1.000 USC [[cite:brunnermeier2005]] [[cite:kelly1956]].',
    en: 'Just like a basketball head-fake draws defenders the wrong way (**Judas Swing**), London/NY openings often fake one side to grab stops before exploding through a clean **MSS + Fair Value Gap** [[cite:brunnermeier2005]].',
  },
  'failed-setup-autopsy-and-news-risk': {
    id: 'Dokter bedah paling hebat selalu mempelajari penyebab kegagalan operasi agar tidak terulang, bukan bersembunyi di balik cerita sukses saja! Di ruang **Otopsi SL**, kita membedah 3 sebab utama Stop Loss tersentuh, apakah kamu melanggar jam berita **CPI/NFP** [[cite:glosten1985]], salah zona Diskon, atau terkena nasib statistik normal 1% [[cite:vince1990]].',
    en: 'Great pilots audit every hard landing instead of hiding them. Inside our Stop-Loss Autopsy lab we separate breaking news spread shocks [[cite:glosten1985]] and chases from clean 1% statistical losses [[cite:vince1990]].',
  },
  'behavioral-finance-prospect-theory': {
    id: 'Hadiah Nobel Ekonomi Kahneman & Tversky membuktikan satu rahasia otak manusia: rasa perih kehilangan uang Rp100.000 terasa **dua kali lebih menyakitkan** daripada senangnya mendapat Rp100.000 [[cite:kahneman1979]]. Itulah kenapa tanpa rencana tertulis, pemula nekad membiarkan kerugian membengkak berharap "pasti balik".',
    en: 'Nobel laureates Kahneman & Tversky demonstrated why losing $10 feels roughly twice as painful psychologically as winning $10, explaining why untrained traders cling to losers hoping for a miracle [[cite:kahneman1979]].',
  },
  'tilt-neuroscience-and-cognitive-biases': {
    id: 'Saat dua kali berturut-turut tersentuh Stop Loss, bagian otak bernama **Amygdala** menyalakan alarm bahaya seperti dikejar harimau, dan mematikan bagian logika matematika! Dalam kondisi **Tilt**, tangan memencet lot 5x lebih besar untuk balas dendam, bukan karena ada peluang nyata [[cite:kahneman1979]] [[cite:kelly1956]].',
    en: 'Two consecutive losses trigger an amygdala threat response, a biological state gamers call Tilt, hijacking rational risk rules into oversized revenge clicks [[cite:kahneman1979]].',
  },
  'neuroscience-emotions-and-process-journal': {
    id: 'Cara membedakan pemain profesional dari penjudi hanya satu: profesional menilai kualitas keputusan lewat **buku catatan proses**, bukan hasil akhir satu lemparan dadu! Kadang keputusan salah tetap untung sementara karena kebetulan, dan keputusan terbaik bisa rugi 1%, mencatat metrik `R-multiple` melatih otak tetap dingin [[cite:kahneman1979]] [[cite:vince1990]].',
    en: 'Professionals grade process quality via structured journals rather than single-trade luck: recording rules followed and exact R-multiples separates genuine skill from dangerous outcome bias [[cite:kahneman1979]].',
  },
  'quant-finance-simons-sharpe-martingale': {
    id: 'Bagaimana ahli matematika kelas dunia menilai strategi terbaik? Bukan dari grafik mulus hasil menyembunyikan rugi, melainkan dari **Ekspektasi Positif** dikombinasikan dengan **Sharpe Ratio** (untung per unit guncangan) tanpa pernah menyentuh penggandaan lot Martingale yang meledak diam-diam [[cite:kelly1956]] [[cite:lopez2018]].',
    en: 'Quantitative funds evaluate edges by combining positive expectancy and volatility-adjusted Sharpe stability across large sample sizes, never through hidden Martingale tail risk [[cite:kelly1956]] [[cite:lopez2018]].',
  },
  'how-expert-advisors-think-vs-martingale-danger': {
    id: 'Robot trading (**Expert Advisor / EA**) itu tidak punya perasaan bosan, tetapi jika di dalamnya diisi perintah melipatgandakan lot setiap kali salah (**Martingale Grid**), robot "win rate 99%" itu cuma menunggu satu hari tren emas lurus tanpa koreksi untuk menghabiskan 100% saldomu sekaligus [[cite:vince1990]] [[cite:lopez2018]].',
    en: 'Trading bots execute relentlessly without emotion, yet coding Martingale grid recovery creates ticking time bombs: "99% win-rate" equity curves routinely vaporize during one uninterrupted trend day [[cite:lopez2018]].',
  },
  'transparent-copy-trading-hwm-architecture': {
    id: 'Bayangkan kamu menitipkan kelola kebun kepada ahli kebun dengan perjanjian adil **High-Water Mark (HWM)**: pengelola baru berhak atas pembagian hasil **30%** hanya dari rekor panen tertinggi BARU di atas puncak lamamu, bukan dari uang yang sekadar pulih setelah kemarau [[cite:kelly1956]] [[cite:vince1990]]. Inilah arsitektur akuntansi paling jujur bagi calon *follower* maupun pengelola dana.',
    en: 'Imagine hiring a skilled steward under a strict High-Water Mark fee rule: performance sharing (30%) activates strictly on net new equity peaks above your prior highest water mark, never double-charging during drawdown recovery [[cite:vince1990]].',
  },
  'wick-sweep-vs-displacement-close': {
    id: 'Bayangkan kamu melihat garis finish lomba lari: kalau seorang pelari cuma menjulurkan jarinya melewati garis lalu ditarik mundur, itu namanya **Wick Sweep** (jebakan pemburu Stop Loss)! Tetapi kalau seluruh badannya lari menembus garis sampai bel candle berbunyi menutup, itulah **Displacement Close** asli [[cite:harris2003]].',
    en: 'An intrabar wick probing past resistance is just a fake hand reaching out to grab stops; real conviction requires a full candle body closing decisively past structure [[cite:harris2003]].',
  },
  'three-step-confirmation-formula': {
    id: 'Membuka brankas butuh tiga putaran kunci berurutan: **(1) Sweep** jemput antrean stop-loss ritel, **(2) Displacement MSS** patahkan struktur dengan badan penuh, dan **(3) FVG Retest** masuk tenang di harga diskon [[cite:kyle1985]]. Lewat satu langkah saja berarti dilarang masuk!',
    en: 'Think of valid entries as a three-tumbler vault lock: first Sweep stops, second Displace through MSS, third Fill quietly inside the FVG pullback [[cite:kyle1985]].',
  },
  'multi-timeframe-alignment-entry': {
    id: 'Pakai dua kacamata terpisah supaya tidak pusing: **H1 & M15** adalah peta jalan tol besar pemberi arah utama, sedangkan **M5** adalah kaca pembesar saat belok mencari Stop Loss paling tipis di dalam zona [[cite:lo2000]].',
    en: 'Assign clear roles so charts never fight each other: H1/M15 serve as your highway compass, while M5/M1 exclusively time razor-thin entry triggers [[cite:lo2000]].',
  },
  'empty-chart-session-mapping-sop': {
    id: 'Sebelum toko pasar London buka jam 14:00 WIB, jalankan ritual 10 menit dari layar polos: cek kalender berita merah, garisi High/Low kemarin (PDH/PDL), dan bungkus rentang Asia 07-13 WIB dalam satu kotak rapi [[cite:chordia2001]].',
    en: 'Turn blank screens into calm certainty ten minutes before London Open: check red news clocks, plot PDH/PDL magnets, and box 07-13 WIB Asian range [[cite:chordia2001]].',
  },
  'limit-vs-market-sl-tp-execution': {
    id: 'Jangan taruh Stop Loss mepet badan lilin cuma demi pamer rasio 1:20! Taruh SL aman di **belakang ujung ekor Sweep + 2-3 pips spread**, lalu perkecil **Cent Lot**-nya di kalkulator supaya kerugianmu tetap pas 10 USC [[cite:kelly1956]].',
    en: 'Never squeeze tight arbitrary stops inside active noise! Tuck SL cleanly behind the sweep wick and scale down Cent lot volume to hold max loss steady at 10 USC [[cite:kelly1956]].',
  },
  'five-valid-vs-five-rushed-entries': {
    id: 'Kalau detak jantungmu kencang bilang "cepet klik sebelum terbang!", itu tanda **Jebakan Rushed FOMO**! Setup sah ala JGS selalu tenang, muncul di Killzone, dan lulus 5 dari 5 kotak checklist [[cite:kahneman1979]].',
    en: 'Whenever your pulse races screaming "click before it runs away!", you are staring at a rushed FOMO trap rather than a calm 5/5 verified SOP trade [[cite:kahneman1979]].',
  },
  'gold-cent-vs-silver-50x-trap': {
    id: 'Hati-hati terkecoh harga murah Perak ($30)! Di banyak akun Cent MT5, **XAUUSDc Emas** berbobot `1 oz` per lot, sementara **XAGUSDc Perak** berbobot **`50 oz`** (50 kali lipat!). Selalu klik Specification sebelum menekan tombol order [[cite:vince1990]].',
    en: 'Don’t let cheap nominal Silver quotes fool your $10 balance: Gold XAUUSDc commonly scales to 1 oz per Cent lot while Silver XAGUSDc packs 50 oz leverage [[cite:vince1990]].',
  },
  'nasdaq-ustec-momentum-playbook': {
    id: 'Siang hari indeks **Nasdaq (USTECc)** sering kalem, lalu meledak kencang tepat saat bel bursa saham Wall Street buka jam **20:30 atau 21:30 WIB**! Diam dulu 15 menit awal biarkan kerumunan awal tersapu baru masuk konfirmasi kedua.',
    en: 'US Tech (USTECc) explodes to life right when Wall Street equity bells ring at 20:30/21:30 WIB: watch the chaotic first 15 minutes hands-off before trading the Opening Range sweep.',
  },
  'fx-pairs-and-crypto-cent-tactics': {
    id: 'Kenali medan tempur tiap aset: **EURUSDc** ber-spread paling rapat dunia [[cite:bis2025]], **GBPJPYc** berdesimal 0.01 di pagi-sore, **BTCUSDc** hidup 24/7 berspread tebal. Dan ingat, Buy EURUSD bersama Buy XAUUSD berarti melipatgandakan taruhan terhadap USD!',
    en: 'Match strategy to asset behavior: tight-spread EURUSDc majors, swift 2-decimal GBPJPYc crosses, and wide-spread 24/7 BTCUSDc, never double hidden USD exposure accidentally [[cite:bis2025]].',
  },
  'reading-macro-fundamental-bias': {
    id: 'Angin musim mendorong layar kapal lebih cepat: tanyakan tiap awal minggu apakah The Fed sedang **Hawkish** (menahan bunga = USD kuat / Emas tertekan) atau **Dovish** (memotong bunga = USD melemah / Emas bersinar) [[cite:gibson_barsky]] [[cite:mishkin2022]].',
    en: 'Ask weekly whether Central Banks lean Hawkish (firm yields lifting currency strength) or Dovish (falling real yields fueling non-yielding Gold rallies) [[cite:gibson_barsky]] [[cite:mishkin2022]].',
  },
  'cftc-cot-vs-retail-sentiment': {
    id: 'Laporan **CFTC COT** tiap hari Jumat menguak posisi kontrak resmi bank & hedge fund [[cite:bessembinder1992]]. Bila mayoritas ritel (>65%) menumpuk posisi berlawanan dengan arus dana institusi COT, bersiaplah menghindari jebakan kerumunan ritel!',
    en: 'Weekly CFTC COT disclosures reveal where large institutions position futures capital [[cite:bessembinder1992]]. Whenever >65% of retail crowds oppose COT funds, hunt trades strictly beside institutional whales!',
  },
  'macro-cot-technical-fusion': {
    id: 'Tiga lampu hijau sebelum menekan tombol: **Fundamental** jelaskan MENGAPA harga melaju, **CFTC COT** buktikan SIAPA berada di belakangnya, dan **3-Gerbang M5** tentukan KAPAN masuk murahnya, dengan risiko tetap terkunci 1% (10 USC / Rp1.600) [[cite:lopez2018]] [[cite:kelly1956]].',
    en: 'Three green lights align cleanly: Macro policy supplies WHY, COT reveals WHO backs it, and M5 3-Gate technicals pinpoint WHEN, while risk stays locked safely at 1% (10 USC) [[cite:lopez2018]].',
  },
  'support-resistance-zones-basics': {
    id: 'Jangan pernah gambar garis setipis benang! Anggap Support itu **kasur lantai** dan Resistance itu **bantalan atap** berbentuk kotak pita harga [[cite:harris2003]] tempat harga berulang kali memantul.',
    en: 'Never draw razor-thin S&R lines! Treat Support like a wide floor mattress and Resistance like a cushioned ceiling box capturing turning zones [[cite:harris2003]].',
  },
  'supply-demand-order-blocks-beginner': {
    id: 'Lihat kotak kecil tenang sesaat sebelum roket harga meledak naik cepat? Di gudang asal itulah bank besar belum kebagian semua barangnya (**Fresh Demand**) sehingga sering dijemput lagi pasca retest [[cite:wyckoff1931]].',
    en: 'See a quiet shelf right before price shoots sky-high? Unfilled big-bank orders often sit quietly inside that launch base waiting cleanly for one return visit [[cite:wyckoff1931]].',
  },
  'trendline-liquidity-vs-static-zones': {
    id: 'Buku order bank hanya mengerti angka datar (horizontal), bukan garis miring diagonal! Jadi garis Trendline yang rapih disambung ritel 4 kali sering dijebol turun dulu memanen Stop Loss sebelum naik beneran [[cite:brunnermeier2005]].',
    en: 'Exchange order books execute strictly on flat numerical bids and asks, turning obvious sloped retail trendlines into easy liquidity sweeps before true climbs resume [[cite:brunnermeier2005]].',
  },
  'scalping-m1-m5-precision-rules': {
    id: 'Tim serba cepat **Scalping M1-M5**: kunci aturan emas ini! Pakai SL **20-35 pips**, target **45-90 pips**, main hanya saat spread tipis di London/NY, maksimal 3 kali klik sehari, dan dilarang keras layer saat minus [[cite:barber2000]] [[cite:chordia2001]].',
    en: 'Fast M1-M5 scalping thrives strictly inside tight London/NY spreads using 20-35 pip stops, 45-90 pip targets, max 3 setups daily, and zero losing layers [[cite:barber2000]].',
  },
  'intraday-m15-h1-session-mastery': {
    id: 'Gaya **Intraday M15-H1** paling santai buat mayoritas kolektif: cukup pasang Limit + Alarm harga dengan **SL lega 45-80 pips** (`0.02 Cent Lot = Rp1.600`), bidik ayunan sesi London/NY **110-220 pips**, lalu tidur nyenyak sebelum jam 23:00 WIB!',
    en: 'Intraday H1/M15 lets you pair calm 45-80 pip structural stops with 110-220 pip London/NY targets using set-and-forget Limit orders before bedtime.',
  },
  'swing-h4-daily-relaxed-playbook': {
    id: 'Kerja kantor atau sibuk kuliah? **Swing H4-Daily** cukup dicek 15 menit malam! Pakai `0.01 Cent lot` ber-SL **120-200 pips** (~Rp2.400 di modal Rp320rb) pada akun bebas Swap untuk memanen gelombang besar **300-650 pips** [[cite:lo2000]].',
    en: 'Busy daytime jobs suit H4-Daily Swing setups effortlessly: hold wide 120-200 pip stops calmly at 0.01 Cent Lots capturing 300-650 pip macro runs inside Swap-Free accounts [[cite:lo2000]].',
  },
  'understanding-cpi-nfp-fomc-wib': {
    id: 'Cara paling simpel baca berita CPI, NFP & FOMC pukul **19:30 / 20:30 WIB**: kalau angka Aktual **lebih tinggi (Panas)** dari perkiraan, Dolar menguat (Emas tertekan); kalau **lebih rendah (Dingin)**, Dolar melunak dan Emas menguat [[cite:mishkin2022]]!',
    en: 'Reading US CPI, NFP, & FOMC releases cleanly: hotter-than-forecast beats boost USD yields (pressuring Gold), while cooler misses relieve USD and buoy Gold [[cite:mishkin2022]]!',
  },
  'pre-news-spread-hmr-blackout': {
    id: 'Aturan keselamatan nomor satu saat berita merah: 15 menit sebelum sampai 5 menit sesudah rilis, **lepas tangan dari tombol Buy/Sell!** Spread melebar drastis dan aturan HMR memangkas leverage sementara [[cite:glosten1985]].',
    en: 'Hold hands off mouse cleanly from T-15 minutes to T+5 minutes across red CPI/NFP news: thin books spike spreads sharply while HMR shrinks temporary leverage [[cite:glosten1985]].',
  },
  'post-news-displacement-sniper': {
    id: 'Biarin aja detik ke-0 berita menipu pedagang buru-buru! Kita masuk santai di menit ke-6 sampai 15 pasca berita saat spread sudah normal dan muncul candle Displacement meninggalkan kotak FVG searah hasil makro [[cite:chordia2001]].',
    en: 'Let minute-zero spikes wipe hurried crowds; snipe clean directional Displacement FVG pullbacks calmly 5-15 minutes later once spreads cool down [[cite:chordia2001]].',
  },
  'micro-compounding-160k-to-10m': {
    id: 'Modal **Rp160.000 (1.000 USC)** bukan buat judi *flipping* semalam jadi Rp10 Juta, melainkan laboratorium pembuktian skill 50-100 transaksi pertama! Setelah kurva jurnalmu terbukti positif, fraksi tetap **1%** membawamu naik bertahap ke jutaan tanpa stres [[cite:kelly1956]] [[cite:vince1990]].',
    en: 'Rp160,000 ($10 = 1,000 USC) proves repeatable skill over 50-100 clean setups first; steady 1% Fractional Kelly math compounds equity peacefully afterward without ruin [[cite:kelly1956]].',
  },
  'visual-pnl-calendar-audit-sop': {
    id: 'Lupakan tabel Excel 25 kolom yang bikin malas! Pakai **Kalender Jurnal PnL Visual 3 Detik** di `/journal`: cukup klik tanggal hari ini, catat hasil USC/Rupiah, dan pilih tag jujur `Patuh SOP` vs `FOMO` untuk menutup kebocoran emosimu [[cite:kahneman1979]].',
    en: 'Ditch bloated 25-column spreadsheets: JGS Visual PnL Calendar logs daily USC/Rupiah tallies and honest SOP-vs-FOMO tags inside three effortless seconds [[cite:kahneman1979]].',
  },
  'capstone-20-semester-readiness': {
    id: 'Selamat telah menaklukkan seluruh **20 Semester (60 Modul / 120 SKS)**! Kamu kini menguasai lengkap tameng modal kecil `Rp160.000 = 1.000 USC`, konfirmasi 3-Gerbang anti-fakeout, berita WIB, data COT, dan Kalender PnL siap menyabet Rank VIII & Ijazah Resmi!',
    en: 'Congratulations mastering all 20 Semesters (60 Modules / 120 Credits)! From $10 Cent risk engineering to 3-gate timing, macro news, COT alignment, and PnL Calendar mastery, enter Final Certification ready!',
  },
};

export function getEli10ModuleIntro(slug: string, isId: boolean): string {
  const entry = MODULE_ELI10_INTROS[slug] ?? MODULE_ELI10_INTROS['money-history-and-inflation'];
  return isId ? entry.id : entry.en;
}
