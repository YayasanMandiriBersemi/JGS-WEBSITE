'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DICTIONARY_TERMS,
  DICTIONARY_CATEGORY_LABELS,
  DictionaryCategory,
  DictionaryIllustrationType,
} from '@/lib/data/dictionary-terms';
import { JeyStrategistCallout } from '@/components/brand/JeyStrategistCallout';
import { useLocale } from '@/i18n/LocaleContext';
import {
  Search,
  BookOpen,
  AlertTriangle,
  Coins,
  Cpu,
  ArrowRight,
  RotateCcw,
  Link2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

const DICTIONARY_CATEGORY_LABELS_ID: Record<DictionaryCategory, string> = {
  CENT_AND_CAPITAL: 'Akun Cent & Modal',
  RISK_AND_SIZING: 'Risiko & Ukuran Lot',
  EXECUTION_AND_ORDERS: 'Eksekusi & Jenis Order',
  MARKET_STRUCTURE: 'Struktur Market',
  GOLD_AND_FX: 'Emas & Forex',
  MT5_AND_QUANT: 'MT5 & Sistem Quant',
};

interface TermIndonesianCopy {
  termId?: string;
  analogyId: string;
  analogyEn: string;
  plainId: string;
  techId: string;
  exampleId: string;
  trapId: string;
}

const TERM_ID_TRANSLATIONS: Record<string, TermIndonesianCopy> = {
  'cent-account': {
    termId: 'Cent Account (Akun Cent)',
    analogyId:
      'Ibarat menukar uang kertas $10 menjadi 1.000 keping koin 1 sen agar kamu bisa berlatih mengatur porsi risiko secara presisi tanpa takut modal langsung habis.',
    analogyEn:
      'Like breaking a $10 bill into 1,000 one-cent coins so you can size positions with fine precision instead of risking half your wallet on one trade.',
    plainId:
      'Akun broker uang asli yang menampilkan saldo dalam satuan US Cents (1 USD = 100 USC). Ukuran kontrak, nilai tick, dan lot minimum tetap bergantung pada spesifikasi simbol broker.',
    techId:
      'Denominasi akun ritel di mana 1 USD = 100 USC. Banyak broker memasangkan akun Cent dengan kontrak mikro (mis. 1 oz XAUUSD per 1.00 lot), namun wajib selalu memeriksa jendela Specification di MT5.',
    exampleId:
      'Deposit $50 akan tampil sebagai 5.000 USC di MT5. Pada kontrak Cent mikro, risiko 1% (50 USC = $0,50) dengan jarak Stop-Loss 250 poin mengizinkan ukuran posisi 0.20 lot Cent.',
    trapId:
      'Menganggap semua akun Cent otomatis memperkecil ukuran kontrak 100x di semua simbol tanpa mengecek spesifikasi simbol MT5 terlebih dahulu.',
  },
  usc: {
    termId: 'USC (US Cents / Sen Dolar)',
    analogyId:
      'Satuan "Sen" di layar MT5 kamu: setiap 100 USC nilainya sama persis dengan $1.00 Dolar AS.',
    analogyEn:
      'The "cents" unit on your MT5 screen: every 100 USC equals exactly $1.00 US Dollar.',
    plainId:
      'Kode mata uang di MetaTrader 5 untuk sen Dolar Amerika Serikat (100 USC = $1,00 USD).',
    techId:
      'Satuan mata uang dasar akun bernilai 1/100 dari 1 USD. Seluruh angka Profit/Loss, Margin, dan Equity di terminal ditampilkan dalam USC.',
    exampleId:
      'Pada akun $50 (5.000 USC), profit +125,00 di MT5 berarti +125 USC (setara +$1,25 USD atau pertumbuhan +2,5% dari modal $50 Anda).',
    trapId:
      'Menyamakan satuan saldo USC dengan ukuran kontrak lot dan langsung membuka posisi tanpa menghitung nilai tick di kalkulator.',
  },
  'lot-size': {
    termId: 'Lot Size (Ukuran Volume)',
    analogyId:
      'Ibarat pedal gas mobil: semakin besar angka Lot yang kamu pasang, semakin kencang uangmu bertambah atau berkurang setiap harga bergerak 1 poin.',
    analogyEn:
      'Like the gas pedal of a car: the larger your lot size, the faster your money moves up or down with every single tick.',
    plainId:
      'Pengali volume transaksi yang menentukan berapa besar uang yang untung atau rugi setiap kali harga bergerak satu tick/poin.',
    techId:
      'Satuan volume kontrak di MT5. Pada akun standar FX, 1.00 lot = 100.000 unit mata uang dasar (atau 100 oz pada XAUUSD standar). Pada akun Cent, periksa Contract Size di MT5.',
    exampleId:
      'Di akun 5.000 USC ($50) dengan kontrak emas mikro, jika jarak Stop-Loss 250 poin dan batas risiko 1% (50 USC), maka Lot Size yang aman adalah 0.20 lot.',
    trapId:
      'Memakai ukuran lot yang selalu sama di setiap transaksi tanpa memperhitungkan lebar jarak Stop-Loss.',
  },
  'stop-loss': {
    termId: 'Stop Loss (SL / Batas Rugi Otomatis)',
    analogyId:
      'Sabuk pengaman dan rem otomatis di server broker yang langsung menutup posisimu jika arah pasar berlawanan dengan rencanamu.',
    analogyEn:
      'Your automatic airbag stored on the broker server that closes the trade the moment your setup is invalidated.',
    plainId:
      'Harga keluar otomatis yang disimpan di server broker untuk menutup transaksi dan membatasi kerugian saat analisis Anda salah.',
    techId:
      'Parameter order pelindung di sisi server yang melikuidasi posisi terbuka pada harga pasar ketika harga menyentuh titik invalidasi.',
    exampleId:
      'Anda Buy XAUUSD di $2.650,00 pada akun 5.000 USC dengan Stop Loss di $2.647,50 (250 poin) dan 0.20 lot Cent. Kerugian terburuk terkunci di ~50 USC (1%).',
    trapId:
      'Menggeser Stop Loss semakin jauh saat harga mendekatinya, sehingga rugi kecil -1% berubah menjadi bencana -30%.',
  },
  'take-profit': {
    termId: 'Take Profit (TP / Target Untung Otomatis)',
    analogyId:
      'Garis finis otomatis yang langsung mengamankan keuntunganmu ke dalam saldo begitu harga menyentuh target.',
    analogyEn:
      'An automatic finish line that locks in your gains the moment price reaches your target.',
    plainId:
      'Harga target otomatis di mana broker menutup posisi Anda dalam keadaan untung dan mengunci profit ke saldo akun.',
    techId:
      'Order limit keluar di sisi server yang merealisasikan profit saat harga Bid (untuk Sell: Ask) menyentuh level target.',
    exampleId:
      'Merisikokan 50 USC dengan Stop Loss 250 poin, lalu memasang Take Profit sejauh 500 poin (rasio 1:2) untuk mengantongi +100 USC (+2%) secara otomatis.',
    trapId:
      'Memasang target Take Profit terlalu jauh tanpa dasar struktur market sehingga harga berbalik arah sebelum sempat terkunci.',
  },
  'r-multiple': {
    termId: 'R-Multiple (Kelipatan Risiko 1R)',
    analogyId:
      'Mengukur hasil trading bukan dari jumlah dolarnya, melainkan dari "berapa kali lipat dari taruhan risikomu" (1R = 1 unit risiko).',
    analogyEn:
      'Measuring results as multiples of your initial risk unit (1R) rather than raw dollar amounts.',
    plainId:
      'Cara mengukur untung dan rugi sebagai kelipatan dari risiko awal Anda (1R) agar fokus pada kualitas keputusan, bukan emosi uang.',
    techId:
      'Profit atau rugi terealisasi dibagi risiko moneter awal pada jarak Stop-Loss: R = PnL / Risiko_Awal.',
    exampleId:
      'Pada akun 5.000 USC dengan risiko 1%, maka 1R = 50 USC. Transaksi yang menghasilkan +125 USC adalah kemenangan +2.5R; terkena SL penuh adalah -1.0R.',
    trapId:
      'Bangga profit "$10" padahal sempat menahan floating minus -$40 tanpa Stop Loss (rasio hasil terhadap risiko hanya 0.25R).',
  },
  'risk-to-reward': {
    termId: 'Risk-to-Reward Ratio (Rasio R:R)',
    analogyId:
      'Perbandingan antara uang yang kamu pertaruhkan vs potensi hasil yang kamu incar. Di rasio 1:2, 1 kali menang sudah menutup 2 kali kalah.',
    analogyEn:
      'Comparing what you risk losing to what you stand to gain. At 1:2 R:R, one win pays for two losses.',
    plainId:
      'Perbandingan antara potensi keuntungan yang diincar dibandingkan batas kerugian jika terkena Stop-Loss.',
    techId:
      'Rasio jarak target profit (TP - Entry) terhadap jarak risiko (Entry - SL). Rasio 1:2 hanya membutuhkan win rate 33,33% untuk impas.',
    exampleId:
      'Merisikokan 50 USC (1R) untuk mengincar 125 USC (2.5R) menghasilkan R:R 1:2.5. Menang 4 kali saja dari 10 trade sudah menghasilkan bersih +4.0R (+200 USC).',
    trapId:
      'Mengambil posisi dengan Stop Loss lebar 400 poin demi mengejar profit tipis 100 poin (rasio terbalik), di mana 1 kali kalah menghapus 4 kemenangan.',
  },
  drawdown: {
    termId: 'Drawdown (Penurunan dari Puncak Saldo)',
    analogyId:
      'Kedalaman lubang saat akunmu turun dari titik tertingginya. Semakin dalam lubangnya (misal -50%), kamu butuh tenaga 2x lipat (+100%) hanya untuk memanjat kembali ke permukaan.',
    analogyEn:
      'How deep your account has fallen from its peak. Fall into a -50% hole and you must climb +100% just to get back to ground level.',
    plainId:
      'Persentase penurunan ekuitas akun dari titik tertinggi (peak) ke titik terendah sebelum berhasil mencetak rekor baru.',
    techId:
      'Penurunan peak-to-trough pada Equity: (Peak_Equity - Trough_Equity) / Peak_Equity. Pemulihan modal bersifat non-linear.',
    exampleId:
      'Jika akun 5.000 USC turun ke 4.500 USC, akun mengalami drawdown 10% dan membutuhkan profit +11,1% (+500 USC) untuk kembali ke 5.000 USC.',
    trapId:
      'Membiarkan drawdown melewati 40%–50%, di mana pemulihan membutuhkan profit +67% hingga +100% dan memicu kepanikan emosional.',
  },
  expectancy: {
    termId: 'Mathematical Expectancy (Ekspektasi Matematis)',
    analogyId:
      'Rata-rata nilai R yang kamu hasilkan per transaksi dalam jangka panjang, kompas utama apakah strategimu benar-benar punya keunggulan.',
    analogyEn:
      'Your average net R-multiple per trade over a large sample, the true test of whether your strategy has a mathematical edge.',
    plainId:
      'Rata-rata kelipatan R atau nominal yang diharapkan per transaksi setelah menjalankan puluhan hingga ratusan kali eksekusi.',
    techId:
      'E = (Win_Rate × Rata2_Menang_R) - (Loss_Rate × Rata2_Kalah_R). Strategi dengan E > 0 memiliki keunggulan matematis positif.',
    exampleId:
      'Dengan win rate 45%, rata-rata menang +2.2R, dan rata-rata kalah -1.0R, Expectancy = (0.45 × 2.2) - (0.55 × 1.0) = +0.44R per transaksi.',
    trapId:
      'Membuang strategi yang memiliki ekspektasi positif +0.40R hanya karena baru mengalami 3 kali loss berturut-turut yang wajar secara statistik.',
  },
  pip: {
    termId: 'Pip (Percentage in Point)',
    analogyId:
      'Satuan langkah standar untuk mengukur gerak harga mata uang Forex (1 pip biasanya setara dengan 10 poin terkecil di MT5).',
    analogyEn:
      'The standard walking step used to measure Forex price movement (1 pip equals 10 MT5 points on 5-digit quotes).',
    plainId:
      'Satuan standar pengukur perubahan harga pada pasangan Forex (biasanya digit desimal ke-4, atau 10 poin di MT5).',
    techId:
      'Pada kuotasi FX 5 digit (mis. EURUSD 1.08500), 1 pip = 0.00010 (10 poin). Pada pasangan JPY 3 digit (mis. 152.400), 1 pip = 0.010 (10 poin).',
    exampleId:
      'Pada EURUSD dengan 0.25 lot Cent, Stop-Loss 20 pip (200 poin) merisikokan tepat 50 USC (1% dari akun 5.000 USC).',
    trapId:
      'Tertukar antara Pip dan Poin MT5 sehingga salah memasukkan angka 10x lipat di kalkulator lot.',
  },
  point: {
    termId: 'Point / Tick Size (Satuan Terkecil MT5)',
    analogyId:
      'Angka digit paling ujung kanan di harga MT5, satuan yang muncul saat kamu menarik penggaris Crosshair di grafik.',
    analogyEn:
      'The very last digit on the right of an MT5 price quote, the exact unit measured by the MT5 Crosshair ruler.',
    plainId:
      'Perubahan harga satu digit terkecil yang ditampilkan di sisi paling kanan kuotasi harga MetaTrader 5.',
    techId:
      'Di MT5 (SYMBOL_TRADE_TICK_SIZE), penggaris Crosshair mengukur jarak dalam Points. Pada XAUUSD (2 desimal), 100 poin = gerak $1,00.',
    exampleId:
      'Pada 0.01 lot Cent XAUUSD mikro, 1 poin MT5 = 0.01 USC. Maka jarak 250 poin ($2,50 gerak emas) = 2.50 USC pada 0.01 lot.',
    trapId:
      'Salah membaca angka penggaris MT5 di Emas dan mengira "250" berarti $250, padahal artinya 250 poin ($2,50).',
  },
  spread: {
    termId: 'Spread (Selisih Harga Beli & Jual)',
    analogyId:
      'Biaya tol masuk pasar: selisih tipis antara harga beli (Ask) dan harga jual (Bid) yang membuat posisimu mulai sedikit minus saat baru dibuka.',
    analogyEn:
      'The market entry toll: the small gap between the Buy price (Ask) and Sell price (Bid) when you open a trade.',
    plainId:
      'Selisih kecil antara harga Beli instan (Ask) dan harga Jual instan (Bid) di pasar.',
    techId:
      'Spread = Ask - Bid. Merupakan biaya transaksi langsung yang dapat melebar saat pergantian sesi harian (rollover) atau rilis berita besar.',
    exampleId:
      'Jika Bid XAUUSD 2650.00 dan Ask 2650.20, maka spread adalah 20 poin. Pada 0.10 lot Cent, biaya spread adalah 2.00 USC.',
    trapId:
      'Melakukan scalping dengan Stop-Loss terlalu sempit (mis. 30 poin) saat spread mencapai 20 poin, sehingga posisi mudah tersapu spread.',
  },
  leverage: {
    termId: 'Leverage (Daya Ungkit Margin)',
    analogyId:
      'Fasilitas uang jaminan dari broker agar kamu tidak perlu mengunci seluruh modalmu saat membuka posisi, bukan alasan untuk memperbesar lot sembarangan!',
    analogyEn:
      'Collateral efficiency from the broker so your whole balance is not locked as margin, never an excuse to oversize lots!',
    plainId:
      'Daya beli dari broker yang memungkinkan Anda membuka posisi tanpa harus mengunci seluruh saldo akun sebagai jaminan.',
    techId:
      'Rasio nilai nosional kontrak terhadap jaminan margin awal (mis. 1:500 membutuhkan margin 0,2%). Leverage memengaruhi Margin, BUKAN nilai per poin.',
    exampleId:
      'Dengan leverage 1:500 di akun 5.000 USC, membuka 0.10 lot Cent Emas hanya menahan ~53 USC sebagai margin dan menyisakan 4.947 USC Free Margin.',
    trapId:
      'Mengira leverage tinggi otomatis membuat risiko per poin lebih besar, atau sebaliknya menyalahgunakan sisa margin untuk membuka puluhan posisi sekaligus.',
  },
  margin: {
    termId: 'Margin & Free Margin (Jaminan & Sisa Ruang)',
    analogyId:
      'Margin adalah uang deposito sementara yang ditahan selama posisi masih terbuka; Free Margin adalah sisa napas akunmu.',
    analogyEn:
      'Margin is the temporary deposit locked while a trade is open; Free Margin is your remaining breathing room.',
    plainId:
      'Margin adalah dana jaminan sementara saat transaksi terbuka; Free Margin adalah sisa ekuitas yang masih bebas di akun Anda.',
    techId:
      'Used Margin = Nilai_Kontrak / Leverage. Free Margin = Equity - Used Margin. Margin Level (%) = (Equity / Used Margin) × 100.',
    exampleId:
      'Dengan Equity 5.000 USC dan Used Margin 53 USC, Margin Level Anda berada di atas 9.400%, sangat aman dari risiko Stop-Out.',
    trapId:
      'Membuka lot terlalu besar hingga Margin Level jatuh di bawah 100% dan memicu penutupan paksa (Stop-Out) oleh broker.',
  },
  equity: {
    termId: 'Equity vs. Balance (Nilai Bersih vs Saldo Tertutup)',
    analogyId:
      'Balance adalah uang dari transaksi yang sudah ditutup; Equity adalah nilai uangmu yang SEBENARNYA detik ini setelah dihitung dengan posisi yang masih berjalan.',
    analogyEn:
      'Balance is history from closed trades; Equity is what your account is truly worth right now including open floating positions.',
    plainId:
      'Balance adalah total saldo dari transaksi yang sudah selesai; Equity adalah nilai bersih akun Anda saat ini termasuk untung/rugi posisi yang masih terbuka.',
    techId:
      'Equity = Balance + Floating_Profit - Floating_Loss. Seluruh audit risiko profesional selalu mengukur Equity, bukan sekadar Balance.',
    exampleId:
      'Balance tertulis 5.000 USC, tetapi ada posisi terbuka yang sedang minus -150 USC. Maka Equity asli Anda saat ini adalah 4.850 USC.',
    trapId:
      'Tertipu tangkapan layar yang memamerkan "Balance" besar padahal menyembunyikan floating loss raksasa di kolom Equity.',
  },
  xauusd: {
    termId: 'XAUUSD (Emas Spot vs Dolar AS)',
    analogyId:
      'Kode simbol internasional untuk memperdagangkan harga 1 Troy Ounce emas murni terhadap Dolar Amerika Serikat.',
    analogyEn:
      'The global ticker symbol for trading 1 Troy Ounce of spot gold priced in US Dollars.',
    plainId:
      'Simbol instrumen untuk trading harga 1 Troy Ounce emas terhadap Dolar AS (USD).',
    techId:
      'Kontrak spot logam mulia dengan volatilitas tinggi terutama saat pembukaan sesi London (14:00 WIB) dan sesi New York (19:30–23:00 WIB).',
    exampleId:
      'Pada akun Cent 5.000 USC, jarak Stop-Loss 250 poin ($2,50) di XAUUSD dengan risiko 1% (50 USC) menghasilkan ukuran 0.20 lot Cent.',
    trapId:
      'Masuk posisi XAUUSD tepat saat rilis berita CPI atau NFP tanpa memperhitungkan pelebaran spread dan slippage.',
  },
  'liquidity-sweep': {
    termId: 'Liquidity Sweep (Sapuan Likuiditas / Stop Hunt)',
    analogyId:
      'Saat harga sengaja menusuk sedikit melewati batas atas/bawah yang mencolok untuk memicu order ritel, lalu berbalik arah dengan cepat.',
    analogyEn:
      'When price briefly pokes past an obvious high or low to trigger resting orders before snapping back inside the range.',
    plainId:
      'Ketika harga menembus sesaat di atas titik tertinggi atau di bawah titik terendah yang ramai sebelum berbalik arah.',
    techId:
      'Pergerakan melewati swing high/low yang menyapu likuiditas order stop, diikuti penolakan cepat (rejection wick) dan penutupan body candle kembali di dalam area.',
    exampleId:
      'Harga emas menusuk 120 poin di atas batas tertinggi sesi Asia saat London buka, lalu menutup kembali di dalam kotak dengan risiko terukur.',
    trapId:
      'Memasang Stop-Loss persis di angka bulat yang mudah ditebak, atau ikut-ikutan Buy di pucuk ekor candle karena panik ketinggalan (FOMO).',
  },
  'break-of-structure': {
    termId: 'Break of Structure (BOS / Patah Struktur)',
    analogyId:
      'Konfirmasi bahwa tren benar-benar berlanjut karena body candle (bukan cuma ekor tipis) berhasil tutup melewati puncak atau lembah sebelumnya.',
    analogyEn:
      'Confirmation that a trend is genuinely continuing because a full candle body closes past the prior structural high or low.',
    plainId:
      'Kondisi ketika body candle berhasil ditutup melewati batas tertinggi atau terendah penting, mengonfirmasi kelanjutan tren.',
    techId:
      'Konfirmasi struktur tren saat body candle menutup melampaui swing high (tren naik) atau swing low (tren turun) sebelumnya.',
    exampleId:
      'Setelah terjadi BOS naik di EURUSD M15, Anda menyiapkan Buy Limit saat harga koreksi dengan risiko 50 USC (1%).',
    trapId:
      'Menganggap ekor candle 1 menit sebagai Break of Structure sebelum candle 15 menit atau 1 jam benar-benar selesai ditutup.',
  },
  'asian-range': {
    termId: 'Asian Session Range (Kotak Sesi Asia)',
    analogyId:
      'Area konsolidasi tenang yang terbentuk pada pagi hari (jam bursa Tokyo) sebelum bank-bank besar London dan New York mulai bertransaksi.',
    analogyEn:
      'The quiet consolidation box formed during Tokyo morning hours before London and New York liquidity arrives.',
    plainId:
      'Rentang harga tertinggi hingga terendah yang terbentuk selama jam pasar Asia sebelum sesi Eropa/London dibuka.',
    techId:
      'Rentang konsolidasi antara 00:00 UTC hingga 06:30 UTC (07:00–13:30 WIB) yang batas atas dan bawahnya sering menjadi titik likuiditas sesi London.',
    exampleId:
      'Menandai batas High dan Low sesi Asia pada XAUUSD membantu Anda tidak terjebak bolak-balik di tengah pasar yang sepi.',
    trapId:
      'Buka-tutup posisi berkali-kali di dalam rentang sempit sesi Asia hingga rugi -4R sebelum pergerakan utama hari itu dimulai.',
  },
  'limit-order': {
    termId: 'Buy Limit / Sell Limit (Order Antre Harga Diskon)',
    analogyId:
      'Memasang pesanan otomatis di harga yang lebih murah (untuk Buy) atau lebih mahal (untuk Sell) agar kamu tidak perlu mengejar harga di pucuk.',
    analogyEn:
      'Setting a patient pending order at a better discount price so you never have to chase moving candles.',
    plainId:
      'Order tertunda (pending order) yang menunggu harga kembali ke level yang lebih menguntungkan sebelum posisi dibuka.',
    techId:
      'Order beli di bawah harga Ask saat ini (Buy Limit) atau jual di atas harga Bid saat ini (Sell Limit), dieksekusi pada harga yang diminta atau lebih baik.',
    exampleId:
      'Harga emas di $2.652. Anda memasang Buy Limit di $2.646 dengan SL $2.643,50 (250 poin) dan 0.20 lot Cent tanpa harus menatap layar terus-menerus.',
    trapId:
      'Membatalkan Limit Order yang sudah rapi lalu mengejar harga pasar secara impulsif hingga jarak Stop-Loss membengkak dua kali lipat.',
  },
  'stop-order': {
    termId: 'Buy Stop / Sell Stop (Order Tembus Momentum)',
    analogyId:
      'Order otomatis yang baru aktif jika harga benar-benar menembus level tertentu dengan dorongan momentum.',
    analogyEn:
      'A pending order placed ahead of price that triggers only if momentum breaks through your level.',
    plainId:
      'Order tertunda di depan harga saat ini yang hanya akan terbuka apabila harga bergerak menembus level tersebut.',
    techId:
      'Order pasar bersyarat yang aktif saat Ask menyentuh level di atas harga (Buy Stop) atau Bid menyentuh level di bawah harga (Sell Stop).',
    exampleId:
      'Memasang Sell Stop di bawah level support yang patah dengan ukuran 0.15 lot Cent yang sudah dihitung sebelumnya.',
    trapId:
      'Memasang jebakan Buy Stop dan Sell Stop 1 menit sebelum berita besar, di mana pelebaran spread memicu keduanya sekaligus.',
  },
  slippage: {
    termId: 'Slippage (Selip Harga Eksekusi)',
    analogyId:
      'Ketika pasar bergerak super cepat saat berita besar sehingga order atau Stop-Loss kamu tereksekusi bergeser beberapa poin dari harga yang diminta.',
    analogyEn:
      'When fast-moving markets fill your order a few points away from your requested price because liquidity is thin.',
    plainId:
      'Perbedaan antara harga eksekusi yang Anda minta dengan harga aktual yang didapat saat pasar bergerak sangat cepat.',
    techId:
      'Selisih antara harga order dan harga fill aktual ketika market order atau stop order dieksekusi di tengah likuiditas tipis.',
    exampleId:
      'Saat rilis berita NFP, Stop-Loss 200 poin mengalami selip 60 poin tambahan, mengubah rencana rugi 50 USC menjadi 65 USC (-1.3R).',
    trapId:
      'Menahan posisi lot besar tepat saat pengumuman suku bunga atau CPI dengan asumsi harga tidak mungkin mengalami slippage.',
  },
  'expert-advisor': {
    termId: 'Expert Advisor (EA / Robot Trading MT5)',
    analogyId:
      'Program otomatis di dalam MT5 yang mengeksekusi aturan strategi dan batas risiko secara disiplin 100% sesuai kode tanpa emosi.',
    analogyEn:
      'An automated program inside MT5 that executes rule-based setups and risk limits with zero human emotion.',
    plainId:
      'Perangkat lunak otomasi (.ex5) yang berjalan di MetaTrader 5 untuk menjalankan strategi berbasis aturan dan manajemen risiko.',
    techId:
      'Modul MQL5 terkompilasi pada grafik MT5 yang memproses event OnTick() dan OnTimer() untuk mengelola order serta circuit breaker.',
    exampleId:
      'Menjalankan EA berbasis aturan pada akun Cent 5.000 USC dengan pengaturan RiskPercent = 1.0% dan DailyLossLimit = 3.0%.',
    trapId:
      'Membeli robot "kotak hitam" yang menjanjikan profit pasti namun mematikan fitur Stop-Loss.',
  },
  martingale: {
    termId: 'Martingale / Uncapped Grid (Lipat Ganda Lot Tanpa Batas)',
    analogyId:
      'Metode judi berbahaya yang terus melipatgandakan ukuran lot setiap kali posisi sedang rugi tanpa Stop-Loss, terlihat mulus di awal namun berakhir Margin Call.',
    analogyEn:
      'A dangerous gambling scheme that doubles lot size during losing streaks without a stop loss, smooth until a single trend wipes the account.',
    plainId:
      'Metode berisiko tinggi yang menggandakan ukuran lot saat rugi atau terus menambah posisi minus tanpa batas Stop-Loss.',
    techId:
      'Progresi ukuran posisi eksponensial (Lot_n = Lot_0 × k^n) saat harga bergerak berlawanan. Menghasilkan risiko kehancuran modal (tail-risk ruin) 100%.',
    exampleId:
      'Mulai dari 0.05 lot Cent lalu menggandakan 7 kali saat emas tren kuat akan mencapai 6.40 lot Cent dan menghabiskan akun 5.000 USC dalam hitungan jam.',
    trapId:
      'Terpikat grafik Balance yang tampak naik lurus 30 hari tanpa menyadari EA tersebut menahan puluhan posisi floating minus.',
  },
  'magic-number': {
    termId: 'Magic Number (Nomor Identitas Order MT5)',
    analogyId:
      'Label nomor KTP khusus pada setiap order EA agar robot tersebut hanya mengelola posisinya sendiri dan tidak mengganggu posisi manualmu.',
    analogyEn:
      'A unique ID tag stamped on an EA’s orders so it never interferes with your manual trades or other bots.',
    plainId:
      'Nomor identitas unik yang disematkan oleh Expert Advisor MT5 pada transaksinya agar tidak bentrok dengan transaksi manual atau EA lain.',
    techId:
      'Identifier bilangan bulat (ORDER_MAGIC) pada order MQL5 untuk memfilter kepemilikan posisi per strategi.',
    exampleId:
      'Memberikan Magic Number 880101 pada EA sesi London XAUUSD agar tidak menutup posisi manual EURUSD Anda.',
    trapId:
      'Menjalankan dua EA berbeda di akun yang sama dengan Magic Number yang identik sehingga saling menutup order.',
  },
  vps: {
    termId: 'VPS (Virtual Private Server)',
    analogyId:
      'Komputer cloud yang menyala 24 jam nonstop di dekat server broker supaya MT5 dan EA kamu tetap berjalan meski laptop di rumah dimatikan.',
    analogyEn:
      'A 24/7 cloud computer near the broker server that keeps your MT5 and risk guards active while your laptop is off.',
    plainId:
      'Komputer virtual di cloud yang menjaga terminal MT5 dan EA tetap aktif 24 jam tanpa tergantung koneksi internet rumah.',
    techId:
      'Mesin virtual jarak jauh dengan latensi jaringan rendah (1–5 ms ke server broker) guna menjamin eksekusi EA tanpa terputus.',
    exampleId:
      'Menjalankan terminal MT5 akun 5.000 USC di VPS memastikan pembatas kerugian harian (circuit breaker) tetap bekerja 24 jam.',
    trapId:
      'Menjalankan EA otomatis di laptop pribadi yang tiba-tiba masuk mode Sleep saat masih ada posisi terbuka.',
  },
  'profit-factor': {
    termId: 'Profit Factor (Rasio Total Untung vs Total Rugi)',
    analogyId:
      'Total seluruh uang kemenangan dibagi total seluruh uang kekalahan. Nilai di atas 1.50 menunjukkan mesin strategimu sehat.',
    analogyEn:
      'Total gross money won divided by total gross money lost. A score above 1.50 over 100+ trades shows a healthy edge.',
    plainId:
      'Perbandingan total keuntungan kotor dibagi total kerugian kotor selama periode pengujian.',
    techId:
      'Rasio Gross Profit terhadap Gross Loss: PF = Σ(Winning_PnL) / |Σ(Losing_PnL)|. Nilai 1.0 adalah impas; > 1.5 menunjukkan keunggulan yang sehat.',
    exampleId:
      'Dari 40 transaksi di akun 5.000 USC, total profit adalah +1.800 USC dan total loss -1.000 USC. Profit Factor = 1.80 (bersih +800 USC).',
    trapId:
      'Percaya pada klaim "Profit Factor 50" dari 6 transaksi, yang biasanya terjadi karena posisi minus belum ditutup.',
  },
  'recovery-factor': {
    termId: 'Recovery Factor (Faktor Pemulihan)',
    analogyId:
      'Total profit bersih dibagi drawdown terdalam yang pernah dialami, mengukur apakah keuntunganmu sepadan dengan guncangan risikonya.',
    analogyEn:
      'Total net profit divided by worst drawdown, tells you whether the return was worth the bumpy ride.',
    plainId:
      'Total keuntungan bersih dibagi dengan penurunan (drawdown) terbesar yang pernah terjadi pada akun.',
    techId:
      'Recovery Factor = Net_Profit / Max_Drawdown. Mengevaluasi efisiensi modal terhadap risiko penurunan puncak-ke-lembah.',
    exampleId:
      'Menghasilkan profit +1.200 USC (+24%) dengan maksimum drawdown hanya -400 USC (-8%) menghasilkan Recovery Factor sehat sebesar 3.0.',
    trapId:
      'Merayakan profit +20% padahal akun sempat nyaris habis tergerus drawdown -60% (Recovery Factor buruk 0.33).',
  },
  'daily-loss-limit': {
    termId: 'Daily Loss Limit (Rem Darurat Harian / Circuit Breaker)',
    analogyId:
      'Aturan wajib "tutup layar dan berhenti trading hari ini" jika akunmu sudah rugi 2%–3% dalam sehari agar hari buruk tidak menghancurkan modalmu.',
    analogyEn:
      'Your mandatory "close the laptop for today" rule (2%–3% daily loss) that stops one bad day from wrecking your account.',
    plainId:
      'Batas maksimal kerugian harian (biasanya 2% hingga 3% dari ekuitas) yang menghentikan seluruh aktivitas trading sampai hari berikutnya.',
    techId:
      'Ambang batas risiko intraday di mana penurunan -N% dari ekuitas awal hari mengunci eksekusi order manual maupun EA.',
    exampleId:
      'Pada akun 5.000 USC dengan batas harian 3% (150 USC) dan risiko 1% per trade (50 USC), tiga kali loss beruntun otomatis menghentikan trading hari itu.',
    trapId:
      'Melanggar batas harian setelah dua kali kalah lalu menaikkan lot demi "balas dendam sebelum tidur".',
  },
  'revenge-trading': {
    termId: 'Revenge Trading (Trading Balas Dendam)',
    analogyId:
      'Masuk posisi asal-asalan dengan lot besar tepat setelah mengalami Stop-Loss karena didorong rasa kesal ingin cepat balik modal.',
    analogyEn:
      'Firing an oversized, unplanned trade right after a loss out of frustration to "win your money back immediately."',
    plainId:
      'Membuka posisi baru secara emosional dan tanpa rencana sesaat setelah mengalami kerugian karena marah atau frustrasi.',
    techId:
      'Kegagalan disiplin eksekusi akibat loss aversion di mana trader mengabaikan aturan setup dan melipatgandakan risiko pasca-kerugian.',
    exampleId:
      'Rugi terukur -50 USC (-1R), lalu 10 detik kemudian langsung klik Buy 0.60 lot Cent (-3R risiko) tanpa analisis.',
    trapId:
      'Merasa pasar "berutang" mengembalikan uang Anda pada candle 5 menit berikutnya.',
  },
  fomo: {
    termId: 'FOMO (Fear Of Missing Out / Takut Ketinggalan)',
    analogyId:
      'Melompat masuk ke kereta yang sudah melaju kencang di ujung rel, beli di pucuk karena panik melihat candle hijau panjang.',
    analogyEn:
      'Jumping onto a speeding train after it has already left the station, buying the very top of a giant candle out of panic.',
    plainId:
      'Mengejar harga yang sudah terbang jauh melewati titik entry aman karena takut kehilangan momen.',
    techId:
      'Masuk posisi setelah harga bergerak jauh dari level invalidasi struktural, sehingga jarak Stop-Loss terlalu lebar dan R:R rusak.',
    exampleId:
      'Harga emas sudah terbang 450 poin dari area support. Membeli di pucuk memaksa Stop-Loss 500 poin dan merusak matematika risiko.',
    trapId:
      'Membeli di harga pasar tepat saat trader institusi sedang melakukan aksi ambil untung (Take Profit).',
  },
  'partial-close': {
    termId: 'Partial Close (Ambil Untung Sebagian / Scaling Out)',
    analogyId:
      'Mengamankan separuh keuntunganmu ke kantong saat target pertama tercapai, lalu membiarkan sisanya berjalan bebas risiko.',
    analogyEn:
      'Banking half your profit at the first target while letting the remaining half ride with a risk-free stop loss.',
    plainId:
      'Menutup sebagian volume posisi saat sudah profit di target pertama, dan membiarkan sisa volume berjalan dengan Stop-Loss di titik impas.',
    techId:
      'Membagi volume lot terbuka ke beberapa level Take Profit (mis. tutup 50% di +1.5R, geser SL ke breakeven untuk sisa 50%).',
    exampleId:
      'Membuka 0.20 lot Cent di akun 5.000 USC memungkinkan Anda menutup 0.10 lot di +1.5R dan menahan 0.10 lot sisanya, hal yang mustahil dilakukan jika terjebak di 0.01 lot akun Standar.',
    trapId:
      'Menutup 90% posisi saat baru untung tipis +0.2R, tetapi membiarkan 100% posisi saat rugi menyentuh -1.0R penuh.',
  },
  'bsl-ssl': {
    termId: 'BSL & SSL (Buy-Side & Sell-Side Liquidity)',
    analogyId:
      'Kolam tempat Stop-Loss trader ritel menumpuk (di atas puncak kembar BSL & di bawah lembah kembar SSL), incaran favorit institusi sebelum harga berbalik.',
    analogyEn:
      'Pools of clustered retail Stop-Loss orders resting right above old highs (BSL) or below old lows (SSL) before reversal.',
    plainId:
      'Area kumpulan order Stop-Loss di atas swing high (BSL) atau di bawah swing low (SSL) yang sering "disapu" terlebih dahulu oleh pergerakan harga besar.',
    techId:
      'BSL adalah likuiditas buy-stop di atas Equal Highs; SSL adalah likuiditas sell-stop di bawah Equal Lows atau Low sesi Asia/London.',
    exampleId:
      'Di akun 1,000 USC ($10), tunggu XAUUSD menyapu Asian Low (SSL) lalu berbalik naik sebelum membuka Buy 0.02 lot Cent.',
    trapId:
      'Menaruh Stop Loss persis di puncak/dasar garis rapi (Equal Highs/Lows) atau langsung FOMO ikut breakout palsu.',
  },
  'fair-value-gap': {
    termId: 'Fair Value Gap (FVG / Zona Ketidakseimbangan)',
    analogyId:
      'Celah kosong akibat harga melaju terlalu ngebut dalam 3 candle, sering menjadi tempat harga mampir kembali (jemput order) sebelum lanjut terbang.',
    analogyEn:
      'An institutional price gap left when price sprints forward too fast, acting like a magnet where price retests before continuing.',
    plainId:
      'Ketidakseimbangan antara sumbu candle ke-1 dan candle ke-3 akibat dorongan harga cepat; sering dipakai sebagai zona entry pullback.',
    techId:
      'Inefisiensi harga 3-candle saat terjadi Displacement. Area antara wick high candle 1 dan wick low candle 3 pada setup bullish.',
    exampleId:
      'Di akun 1,000 USC ($10), pasang Buy Limit 0.02 lot Cent di area FVG M5 setelah SSL tersapu, dengan risiko tepat 10 USC (1%).',
    trapId:
      'Masuk di sembarang FVG kecil tanpa menunggu adanya Sapuan Likuiditas (BSL/SSL) dan jam Killzone.',
  },
  'order-block': {
    termId: 'Order Block (OB)',
    analogyId:
      'Jejak kaki candle berlawanan terakhir tepat sebelum institusi besar menghentak harga, ibarat halte bus tempat order besar parkir.',
    analogyEn:
      'The last opposing candle right before a huge institutional explosion, marking where big money parked orders.',
    plainId:
      'Candle berlawanan terakhir sebelum pergerakan eksplosif yang menembus struktur market; berfungsi sebagai zona pantulan saat harga retest.',
    techId:
      'Bullish Order Block adalah candle turun (down-close) terakhir sebelum Displacement naik yang menghasilkan Market Structure Shift (MSS).',
    exampleId:
      'Memasang Buy 0.02 lot Cent pada zona OB H1/M15 di akun 1,000 USC dengan target +25 USC (+2.5R).',
    trapId:
      'Menganggap setiap candle merah biasa sebagai Order Block tanpa memeriksa apakah ia menyebabkan sapuan likuiditas dan Displacement.',
  },
  'market-structure-shift': {
    termId: 'Market Structure Shift (MSS / Pergeseran Struktur)',
    analogyId:
      'Lampu hijau konfirmasi bahwa tim pembeli (atau penjual) baru saja mengalahkan pertahanan lawan secara telak, tanda arah mulai berubah.',
    analogyEn:
      'The clear green light showing buyers or sellers just shattered the opposing team’s defense with decisive force.',
    plainId:
      'Momen saat harga menembus titik ayunan (swing high/low) terdekat dengan tenaga kuat setelah menyapu likuiditas.',
    techId:
      'Perubahan struktur harga terkonfirmasi ketika body candle Displacement menembus pivot struktural lawan pasca-sweep BSL/SSL.',
    exampleId:
      'Menunggu body candle M5 menutup tegas di atas lower-high sebelum Buy 0.02 lot Cent pada akun 1,000 USC.',
    trapId:
      'Mengira tusukan ekor candle tipis (wick) di jam sepi sudah merupakan pergantian tren yang sah.',
  },
  inducement: {
    termId: 'Inducement (IDM / Umpan Pemancing Ritel)',
    analogyId:
      'Puncak/lembah kecil yang sengaja dibentuk sebagai "umpan pancing" agar trader tidak sabaran masuk duluan sebelum harga menjemput FVG asli di bawahnya.',
    analogyEn:
      'A bait swing sitting right in front of the real Order Block/FVG to trap impatient traders before tapping the true zone.',
    plainId:
      'Titik likuiditas internal di depan Order Block utama yang bertugas memancing trader ritel masuk terlalu dini agar Stop-Loss mereka tersapu.',
    techId:
      'Minor swing liquidity di depan Point of Interest (POI) HTF yang disapu sebelum mitigasi FVG/OB utama terjadi.',
    exampleId:
      'Melewati pantulan pertama yang mencurigakan dan sabar menunggu IDM tersapu menghemat peluru 10 USC di akun 1,000 USC.',
    trapId:
      'Langsung Buy di support kecil pertama yang belum memancing Stop Loss siapa pun.',
  },
  killzone: {
    termId: 'ICT Killzone (Jam Emas Institusi • Time Before Price)',
    analogyId:
      'Jam buka kantor institusi global (London 14–17 WIB & NY 19–22 WIB). Di luar jam ini pasar ibarat toko tutup, sepi dan sering menjebak.',
    analogyEn:
      'The specific daily hours (London & NY open) when big banks trade. Outside them, the shop is half-closed and choppy.',
    plainId:
      'Jendela waktu khusus berdurasi 2–3 jam (London Killzone 14–17 WIB & NY Killzone 19–22 WIB) di mana volatilitas bersih XAUUSD terjadi.',
    techId:
      'Fase pengiriman likuiditas algoritmik berdasarkan waktu New York EST: London Open (02:00–05:00 EST) dan NY Open (07:00–10:00 EST).',
    exampleId:
      'Mengecek JGS Pre-Flight Check agar akun 1,000 USC hanya aktif di jam London/NY dan terhindar dari spread Rollover (04:00 WIB).',
    trapId:
      'Maksa cari posisi di siang bolong Asia atau tepat saat server broker pergantian hari (Rollover 04:00–05:30 WIB).',
  },
  'silver-bullet': {
    termId: 'ICT Silver Bullet (Jendela 1 Jam Presisi)',
    analogyId:
      'Satu jam paling padat peluang (terutama pukul 21:00–22:00 WIB) di mana kamu cukup cari 1 kali sapuan likuiditas + 1 FVG bersih lalu selesai.',
    analogyEn:
      'A focused 1-hour algorithmic sprint (10–11 AM EST / 21–22 WIB) where you hunt one clean liquidity sweep into an FVG.',
    plainId:
      'Model eksekusi ICT selama 60 menit (NY AM 21:00–22:00 WIB) yang membidik target likuiditas terdekat menggunakan retracement FVG.',
    techId:
      'Siklus pengiriman harga spesifik pada pukul 10:00–11:00 EST (21:00–22:00 WIB) dengan syarat syarat sweep likuiditas -> FVG.',
    exampleId:
      'Cocok untuk pekerja Indonesia: fokus 1 jam pukul 21:00–22:00 WIB dengan 0.02 lot Cent di akun 1,000 USC ($10).',
    trapId:
      'Memaksakan FVG palsu saat harga sedang datar menunggu rilis berita FOMC jam 02:00 WIB.',
  },
  'judas-swing': {
    termId: 'Judas Swing (Gerakan Pengkhianat Pembukaan Sesi)',
    analogyId:
      'Gerak tipuan cepat ke arah berlawanan tepat saat pasar London/NY dibuka untuk menipu trader pengejar breakout sebelum berbalik 180 derajat.',
    analogyEn:
      'A deceptive fake opening breakout designed to trap breakout chasers before snapping in the real direction.',
    plainId:
      'Ekspansi harga palsu pada awal sesi untuk menyapu BSL atau SSL terdekat sebelum pergerakan arah harian sebenarnya dimulai.',
    techId:
      'Manipulasi pembukaan sesi (AMD: Accumulation → Manipulation → Distribution) yang menciptakan false breakout sementara.',
    exampleId:
      'Mengamati XAUUSD loncat palsu ke atas Asian High pukul 14:15 WIB lalu jatuh menembus struktur sebelum Sell 0.02 lot Cent.',
    trapId:
      'Terpancing ikut Buy tepat saat candle hijau pertama sesi London melesat melewati resistance.',
  },
  displacement: {
    termId: 'Displacement (Dorongan Harga Eksplosif)',
    analogyId:
      'Ibarat mobil sport yang langsung menginjak gas penuh hingga ban berdecit, ciri khas uang institusi benar-benar masuk ke pasar.',
    analogyEn:
      'Like a sports car slamming the gas pedal from zero, leaving zero doubt big money just entered the market.',
    plainId:
      'Serangkaian candle berukuran besar dan penuh tenaga ke satu arah dengan sumbu kecil yang menciptakan Fair Value Gap (FVG).',
    techId:
      'Pengiriman harga berkecepatan tinggi yang membuktikan ketidakseimbangan order institusional dan memvalidasi Market Structure Shift.',
    exampleId:
      'Hanya mengeluarkan peluru risiko 1% (10 USC pada akun 1,000 USC) jika terlihat Displacement tegas, bukan candle ragu-ragu.',
    trapId:
      'Menyebut candle kecil bertumpuk-tumpuk sebagai Displacement.',
  },
  'premium-discount': {
    termId: 'Premium vs. Discount (Aturan Zona 50% Equilibrium)',
    analogyId:
      'Jangan beli barang di mal saat harga lagi mahal (zona atas 50% / Premium), dan jangan jual saat lagi obral murah (zona bawah 50% / Discount).',
    analogyEn:
      'Never buy items in the expensive upper half (Premium), and never sell in the bargain lower half (Discount).',
    plainId:
      'Membagi rentang harga dari Low ke High di titik tengah 50%: hanya cari Buy di bawah 50% (Discount) dan Sell di atas 50% (Premium).',
    techId:
      'Pengukuran Fib 0%–50%–100% pada dealing range aktif: Equilibrium berada di 50%, Discount di 0%–50%, Premium di 50%–100%.',
    exampleId:
      'Menunggu XAUUSD masuk ke bawah 50% Discount mempersempit Stop Loss sehingga lot 0.02 Cent sanggup memberi R:R 1:3 (+30 USC).',
    trapId:
      'Klik Buy di zona 90% Premium hanya karena takut ketinggalan kereta.',
  },
};

function TermIllustrationSVG({ type }: { type: DictionaryIllustrationType }) {
  switch (type) {
    case 'CENT_DIVISIBILITY':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Cent lot divisibility illustration"
        >
          <rect
            x={8}
            y={12}
            width={145}
            height={50}
            rx={6}
            fill="#1A0D16"
            stroke="#EF4444"
            strokeOpacity={0.45}
          />
          <text x={18} y={32} fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
            STD 0.01 LOT = 1 OZ
          </text>
          <text x={18} y={48} fill="#BEB6CE" fontSize="9" fontFamily="monospace">
            $2.50 Move = -$2.50 (10%)
          </text>
          <path d="M162 37 L196 37" stroke="#D6A937" strokeWidth={1.5} strokeDasharray="3 2" />
          <text
            x={179}
            y={29}
            textAnchor="middle"
            fill="#D6A937"
            fontSize="8"
            fontFamily="monospace"
          >
            SPEC CHECK
          </text>
          <rect
            x={205}
            y={12}
            width={147}
            height={50}
            rx={6}
            fill="#0F1B1D"
            stroke="#10B981"
            strokeOpacity={0.55}
          />
          <text
            x={215}
            y={32}
            fill="#10B981"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            MICRO CENT SPEC = 25 USC
          </text>
          <text x={215} y={48} fill="#F7F4EE" fontSize="9" fontFamily="monospace">
            1.0% Risk ($0.25)
          </text>
        </svg>
      );
    case 'SPREAD_MECHANICS':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Bid Ask Spread illustration"
        >
          <line
            x1={20}
            x2={340}
            y1={24}
            y2={24}
            stroke="#EF4444"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <text x={24} y={18} fill="#EF4444" fontSize="9" fontFamily="monospace">
            ASK (BUY ENTRY / SHORT EXIT): 2650.20
          </text>
          <line x1={20} x2={340} y1={52} y2={52} stroke="#10B981" strokeWidth={1.5} />
          <text x={24} y={66} fill="#10B981" fontSize="9" fontFamily="monospace">
            BID (CHART LINE / LONG EXIT): 2650.00
          </text>
          <rect
            x={255}
            y={26}
            width={78}
            height={24}
            rx={4}
            fill="#17131D"
            stroke="#D6A937"
            strokeOpacity={0.4}
          />
          <text
            x={294}
            y={41}
            textAnchor="middle"
            fill="#D6A937"
            fontSize="9"
            fontFamily="monospace"
          >
            20 PT SPREAD
          </text>
        </svg>
      );
    case 'LIQUIDITY_SWEEP':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Liquidity Sweep wick vs body close"
        >
          <line
            x1={15}
            x2={345}
            y1={32}
            y2={32}
            stroke="#D6A937"
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />
          <text x={20} y={26} fill="#D6A937" fontSize="9" fontFamily="monospace">
            ASIAN HIGH LIQUIDITY ($2650.00)
          </text>
          <line x1={190} x2={190} y1={8} y2={62} stroke="#EF4444" strokeWidth={2} />
          <rect x={180} y={36} width={20} height={20} fill="#EF4444" rx={2} />
          <text x={210} y={20} fill="#F3E5AB" fontSize="9" fontFamily="monospace">
            ← Rejection Wick
          </text>
          <text x={210} y={50} fill="#10B981" fontSize="9" fontFamily="monospace">
            ← Body Closes Inside
          </text>
        </svg>
      );
    case 'ASYMMETRIC_RR':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Asymmetric Risk to Reward ratio"
        >
          <rect x={16} y={22} width={85} height={30} rx={4} fill="#1A0D16" stroke="#EF4444" />
          <text
            x={58}
            y={41}
            textAnchor="middle"
            fill="#EF4444"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            -1.0R RISK
          </text>
          <rect x={112} y={14} width={232} height={46} rx={5} fill="#0F1B1D" stroke="#10B981" />
          <text
            x={228}
            y={41}
            textAnchor="middle"
            fill="#10B981"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            +2.5R TARGET REWARD (28.6% BREAKEVEN)
          </text>
        </svg>
      );
    case 'DRAWDOWN_CLIFF':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Nonlinear drawdown recovery cliff"
        >
          <polyline
            fill="none"
            stroke="#EF4444"
            strokeWidth={2}
            points="20,60 90,56 160,48 230,32 300,10"
          />
          <circle cx={90} cy={56} r={3} fill="#10B981" />
          <text x={70} y={48} fill="#10B981" fontSize="8" fontFamily="monospace">
            -10% → +11%
          </text>
          <circle cx={230} cy={32} r={3} fill="#F59E0B" />
          <text x={185} y={24} fill="#F59E0B" fontSize="8" fontFamily="monospace">
            -50% → +100%
          </text>
          <circle cx={300} cy={10} r={3.5} fill="#EF4444" />
          <text x={275} y={26} fill="#EF4444" fontSize="8" fontFamily="monospace">
            -80% → +400%
          </text>
        </svg>
      );
    case 'ORDER_TYPES':
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Limit vs Stop order geometry"
        >
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth={2}
            points="20,58 75,34 115,52 175,16"
          />
          <circle cx={115} cy={52} r={4} fill="#D6A937" />
          <text x={35} y={68} fill="#D6A937" fontSize="9" fontFamily="monospace">
            BUY LIMIT (Pullback Entry)
          </text>
          <line x1={205} x2={340} y1={28} y2={28} stroke="#B99AE8" strokeDasharray="3 3" />
          <circle cx={275} cy={28} r={4} fill="#B99AE8" />
          <text x={212} y={48} fill="#B99AE8" fontSize="9" fontFamily="monospace">
            BUY STOP (Breakout Entry)
          </text>
        </svg>
      );
    case 'EQUITY_VS_BALANCE':
    default:
      return (
        <svg
          viewBox="0 0 360 74"
          className="w-full h-auto"
          role="img"
          aria-label="Equity vs Balance divergence"
        >
          <polyline
            fill="none"
            stroke="#D6A937"
            strokeWidth={2}
            points="20,54 120,42 220,30 330,18"
          />
          <polyline
            fill="none"
            stroke="#EF4444"
            strokeWidth={2}
            strokeDasharray="4 3"
            points="20,54 120,48 220,58 330,66"
          />
          <text x={24} y={24} fill="#D6A937" fontSize="9" fontFamily="monospace">
            GOLD = CLOSED BALANCE
          </text>
          <text x={180} y={68} fill="#EF4444" fontSize="9" fontFamily="monospace">
            RED = FLOATING EQUITY DIVERGENCE
          </text>
        </svg>
      );
  }
}

export function DictionaryExplorer() {
  const { isId, l } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DictionaryCategory | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'QUANT'
  >('ALL');
  // Expandable rows state, first 2 terms expanded by default so beginners immediately see how it works
  const [expandedSlugs, setExpandedSlugs] = useState<string[]>(['cent-account', 'lot-size']);

  function toggleExpand(slug: string) {
    setExpandedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DICTIONARY_TERMS.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'ALL' && item.difficulty !== selectedDifficulty) return false;
      if (!q) return true;
      const idCopy = TERM_ID_TRANSLATIONS[item.slug];
      return (
        item.term.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.plainEnglish.toLowerCase().includes(q) ||
        item.technicalDefinition.toLowerCase().includes(q) ||
        (idCopy &&
          ((idCopy.termId && idCopy.termId.toLowerCase().includes(q)) ||
            idCopy.analogyId.toLowerCase().includes(q) ||
            idCopy.plainId.toLowerCase().includes(q) ||
            idCopy.techId.toLowerCase().includes(q)))
      );
    });
  }, [query, selectedCategory, selectedDifficulty]);

  function handleSelectRelatedTerm(slug: string) {
    const target = DICTIONARY_TERMS.find((t) => t.slug === slug);
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
    setQuery(target ? target.term : slug);
    setExpandedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }

  function handleReset() {
    setQuery('');
    setSelectedCategory('ALL');
    setSelectedDifficulty('ALL');
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Clean Breathing Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D6A937]">
          <BookOpen className="w-4 h-4" />
          <span>
            {isId
              ? 'KAMUS TRADING INTERAKTIF JEY • ANALOGI PEMULA & DEFINISI MT5'
              : "JEY'S INTERACTIVE DICTIONARY • BEGINNER ANALOGIES & MT5 SPECS"}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F4EE] tracking-tight">
          {isId
            ? 'Pahami Istilah Trading Lewat Analogi Sehari-hari'
            : 'Understand Trading Terms Through Bite-Sized Analogies'}
        </h1>
        <p className="text-sm sm:text-base text-[#BEB6CE] max-w-3xl leading-relaxed">
          {isId
            ? 'Pindai daftar istilah di bawah ini untuk membaca analogi singkat yang ramah pemula. Klik baris istilah mana saja untuk membuka definisi teknis MT5, ilustrasi visual, dan contoh perhitungan akun Cent.'
            : 'Scan the list below for quick, beginner-friendly analogies. Click any row to expand technical MT5 definitions, visual diagrams, and concrete Cent account examples.'}
        </p>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3">
          <div className="lg:col-span-7 relative">
            <Search className="w-4 h-4 text-[#D6A937] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isId
                  ? 'Cari istilah (misal: Cent, USC, Lot, Pip, Spread, Drawdown, Martingale)...'
                  : 'Search terminology (e.g. Cent, USC, Lot, Pip, Spread, Drawdown, Martingale)...'
              }
              className="jgs-input pl-10 font-sans"
              aria-label={isId ? 'Cari kamus trading' : 'Search trading dictionary'}
            />
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-1.5">
            {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'QUANT'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#D6A937] text-[#08050E]'
                    : 'bg-[#17131D] text-[#BEB6CE] hover:text-[#F7F4EE]'
                }`}
              >
                {diff === 'ALL'
                  ? isId
                    ? 'Semua'
                    : 'All'
                  : diff === 'BEGINNER'
                  ? isId
                    ? 'Pemula'
                    : 'Beginner'
                  : diff === 'INTERMEDIATE'
                  ? isId
                    ? 'Menengah'
                    : 'Intermediate'
                  : isId
                  ? 'Quant / MT5'
                  : 'Quant'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[#B99AE8]/20 text-[#F7F4EE] border border-[#B99AE8]/40'
                : 'bg-[#17131D] text-[#BEB6CE] hover:text-[#F7F4EE]'
            }`}
          >
            {isId
              ? `Semua Kategori (${DICTIONARY_TERMS.length})`
              : `All Categories (${DICTIONARY_TERMS.length})`}
          </button>
          {(Object.keys(DICTIONARY_CATEGORY_LABELS) as DictionaryCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#B99AE8]/20 text-[#F7F4EE] border border-[#B99AE8]/40'
                  : 'bg-[#17131D] text-[#BEB6CE] hover:text-[#F7F4EE]'
              }`}
            >
              {isId ? DICTIONARY_CATEGORY_LABELS_ID[cat] : DICTIONARY_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Expand All / Collapse All */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#BEB6CE]">
        <span>
          {isId ? 'Menampilkan ' : 'Showing '}
          <strong className="text-[#D6A937]">{filteredTerms.length}</strong>{' '}
          {isId
            ? `dari ${DICTIONARY_TERMS.length} istilah`
            : `of ${DICTIONARY_TERMS.length} terms`}
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              setExpandedSlugs(
                expandedSlugs.length === filteredTerms.length
                  ? []
                  : filteredTerms.map((t) => t.slug)
              )
            }
            className="text-[#B99AE8] hover:text-[#F7F4EE] font-medium"
          >
            {expandedSlugs.length === filteredTerms.length
              ? isId
                ? 'Tutup Semua Detail Teknis'
                : 'Collapse All Technical Details'
              : isId
              ? 'Buka Semua Detail Teknis'
              : 'Expand All Technical Details'}
          </button>

          {(query || selectedCategory !== 'ALL' || selectedDifficulty !== 'ALL') && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#D6A937] hover:underline font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isId ? 'Reset Filter' : 'Reset Filters'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Scannable Expandable List */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-2xl bg-[#17131D] border border-white/[0.08] p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-[#D6A937] mx-auto opacity-80" />
          <h2 className="font-display text-xl font-bold text-[#F7F4EE]">
            {isId
              ? `Tidak Ada Istilah yang Cocok dengan "${query}"`
              : `No Trading Terms Matched "${query}"`}
          </h2>
          <p className="text-sm text-[#BEB6CE] max-w-md mx-auto">
            {isId
              ? 'Coba kata kunci yang lebih umum seperti "Lot", "Stop", "Cent", "Spread", atau "EA".'
              : 'Try a broader keyword such as "Lot", "Stop", "Cent", "Spread", or "EA".'}
          </p>
          <button type="button" onClick={handleReset} className="jgs-btn-gold text-xs">
            {isId
              ? `Tampilkan Semua ${DICTIONARY_TERMS.length} Istilah`
              : `Show All ${DICTIONARY_TERMS.length} Terms`}
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.07] rounded-2xl bg-[#17131D] border border-white/[0.08] overflow-hidden">
          {filteredTerms.map((item) => {
            const isExpanded = expandedSlugs.includes(item.slug);
            const idCopy = TERM_ID_TRANSLATIONS[item.slug];
            const displayTerm = isId && idCopy?.termId ? idCopy.termId : item.term;
            const analogyText = isId
              ? (idCopy?.analogyId ?? item.plainEnglish)
              : (idCopy?.analogyEn ?? item.plainEnglish);
            const plainText = isId ? (idCopy?.plainId ?? item.plainEnglish) : item.plainEnglish;
            const techText = isId
              ? (idCopy?.techId ?? item.technicalDefinition)
              : item.technicalDefinition;
            const exampleText = isId
              ? (idCopy?.exampleId ?? item.centAccountExample)
              : item.centAccountExample;
            const trapText = isId ? (idCopy?.trapId ?? item.retailTrap) : item.retailTrap;

            const diffBadgeLabel =
              item.difficulty === 'BEGINNER'
                ? isId
                  ? 'Pemula'
                  : 'Beginner'
                : item.difficulty === 'INTERMEDIATE'
                ? isId
                  ? 'Menengah'
                  : 'Intermediate'
                : 'Quant / MT5';

            return (
              <div key={item.slug} className="transition-colors hover:bg-white/[0.015]">
                {/* Scannable Summary Row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.slug)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="font-display text-lg sm:text-xl font-bold text-[#F7F4EE]">
                        {displayTerm}
                      </h2>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#0E0B14] text-[#BEB6CE]">
                        {isId
                          ? DICTIONARY_CATEGORY_LABELS_ID[item.category]
                          : DICTIONARY_CATEGORY_LABELS[item.category]}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#D6A937]/15 text-[#D6A937]">
                        {diffBadgeLabel}
                      </span>
                    </div>

                    {/* Bite-sized Beginner Analogy */}
                    <p className="text-sm sm:text-base text-[#F3E5AB]/95 leading-relaxed">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#D6A937] mr-1.5">
                        <Sparkles className="w-3.5 h-3.5 inline" />
                        {isId ? 'Analogi Singkat:' : 'Quick Analogy:'}
                      </span>
                      {analogyText}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#B99AE8] pt-1">
                    <span className="hidden sm:inline">
                      {isExpanded
                        ? isId
                          ? 'Tutup'
                          : 'Close'
                        : isId
                        ? 'Detail MT5'
                        : 'MT5 Spec'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#D6A937]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expandable Technical & MT5 Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 space-y-5 bg-[#0E0B14]/70 border-t border-white/[0.05]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                      {/* Left: Plain Explanation + Technical MT5 Definition */}
                      <div className="lg:col-span-7 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-[#D6A937] mb-1">
                            {isId
                              ? 'Penjelasan Bahasa Sederhana'
                              : 'Plain-Language Definition'}
                          </div>
                          <p className="text-sm text-[#F7F4EE] leading-relaxed">{plainText}</p>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-[#B99AE8] flex items-center gap-1.5 mb-1">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>
                              {isId
                                ? 'Definisi Teknis & Spesifikasi MT5'
                                : 'Technical & MT5 Specification'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#BEB6CE] leading-relaxed">
                            {techText}
                          </p>
                        </div>
                      </div>

                      {/* Right: SVG Schematic Diagram */}
                      <div className="lg:col-span-5 rounded-xl jgs-chart-frame p-3">
                        <TermIllustrationSVG type={item.illustrationType} />
                      </div>
                    </div>

                    {/* Concrete Cent Example & Common Mistake */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#17131D] space-y-1">
                        <div className="text-xs text-[#10B981] font-semibold flex items-center gap-1.5">
                          <Coins className="w-3.5 h-3.5" />
                          <span>
                            {isId
                              ? 'Contoh Nyata pada Akun Cent $50 (5.000 USC)'
                              : 'Concrete $50 (5,000 USC) Cent Example'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#F7F4EE]/90 leading-relaxed">
                          {exampleText}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#17131D] space-y-1">
                        <div className="text-xs text-[#EF4444] font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>
                            {isId ? 'Kesalahan Umum Pemula' : 'Common Beginner Pitfall'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#F7F4EE]/90 leading-relaxed">
                          {trapText}
                        </p>
                      </div>
                    </div>

                    {/* Related Terms & Direct Tool Link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      {item.relatedTerms.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs text-[#8E84A4] inline-flex items-center gap-1 mr-1">
                            <Link2 className="w-3.5 h-3.5 text-[#D6A937]" />
                            {isId ? 'Terkait:' : 'Related:'}
                          </span>
                          {item.relatedTerms.map((relSlug) => {
                            const relObj = DICTIONARY_TERMS.find((t) => t.slug === relSlug);
                            return (
                              <button
                                key={relSlug}
                                type="button"
                                onClick={() => handleSelectRelatedTerm(relSlug)}
                                className="px-2.5 py-1 rounded-lg bg-[#17131D] text-xs text-[#F3E5AB] hover:text-[#D6A937] transition-colors"
                              >
                                {relObj ? relObj.term : relSlug}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {item.calculatorLink && (
                        <Link
                          href={l(
                            item.calculatorLink === '/calculators/cent'
                              ? '/tools/cent-lab'
                              : item.calculatorLink
                          )}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A937] hover:underline"
                        >
                          <span>
                            {isId ? 'Coba di Lab Interaktif' : 'Try in Interactive Lab'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Jey Co-Pilot Callout */}
      <JeyStrategistCallout
        title={isId ? 'Jey Co-Pilot • Cara Belajar Efektif' : 'Jey Co-Pilot • How to Learn Fast'}
        contextTag={isId ? 'TIPS PEMULA' : 'BEGINNER TIP'}
        ruleText={
          isId
            ? `Kamu tidak perlu menghafal seluruh ${DICTIONARY_TERMS.length} istilah sekaligus. Pahami dulu fondasi akun Cent (USC, Lot Size, Stop-Loss, Drawdown), lalu pelajari konsep ICT inti seperti BSL/SSL, MSS, dan Fair Value Gap (FVG).`
            : `You do not need to memorize all ${DICTIONARY_TERMS.length} terms at once. Master four foundational concepts first (Cent USC, Lot Size, Stop-Loss, Drawdown), then apply core ICT concepts like BSL/SSL, MSS, and Fair Value Gap (FVG).`
        }
        showAvatar={true}
      />
    </div>
  );
}
