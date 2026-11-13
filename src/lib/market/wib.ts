import type {
  CalendarEventStatusId,
  MonetaryStance,
  NewsPairFilterKey,
  WibCalendarEvent,
} from './types';

/**
 * Formats an ISO timestamp strictly into Indonesian WIB readable format:
 * e.g., "Kamis, 12 November 2026 • Pukul 20:30 WIB"
 */
export function formatWibDateTime(dateInput: Date | string | number): {
  fullLabel: string;
  shortDate: string;
  timeOnly: string;
  wibDateKey: string;
} {
  const dt = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(dt.getTime())) {
    return {
      fullLabel: 'Jadwal Menunggu Update WIB',
      shortDate: '-',
      timeOnly: '-',
      wibDateKey: '',
    };
  }

  const weekday = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
  }).format(dt);
  const day = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
  }).format(dt);
  const month = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    month: 'long',
  }).format(dt);
  const year = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
  }).format(dt);
  const timeStr = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(dt)
    .replace('.', ':');

  const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const wibDateKey = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dt);

  return {
    fullLabel: `${capWeekday}, ${day} ${month} ${year} • Pukul ${timeStr} WIB`,
    shortDate: `${capWeekday}, ${day} ${month} ${year}`,
    timeOnly: `${timeStr} WIB`,
    wibDateKey,
  };
}

export function resolveWibEventStatus(
  eventIso: string,
  nowMs: number = Date.now(),
  hasActual: boolean = false
): CalendarEventStatusId {
  const evtDate = new Date(eventIso);
  if (Number.isNaN(evtDate.getTime())) return 'TERJADWAL';

  const nowKey = formatWibDateTime(nowMs).wibDateKey;
  const evtKey = formatWibDateTime(evtDate).wibDateKey;
  const tomorrowKey = formatWibDateTime(nowMs + 86400000).wibDateKey;

  if (evtKey === nowKey) {
    return evtDate.getTime() <= nowMs || hasActual
      ? 'SUDAH_RILIS_HARI_INI'
      : 'AKAN_RILIS_HARI_INI';
  }
  if (evtKey === tomorrowKey) {
    return 'JADWAL_BESOK';
  }
  return evtDate.getTime() < nowMs || hasActual ? 'SUDAH_RILIS' : 'TERJADWAL';
}

function parseNumericPrint(val: string): number | null {
  if (!val) return null;
  const cleaned = val.replace(/[%KMBT,\s]/gi, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveMonetaryStance(params: {
  title: string;
  country: string;
  forecast: string;
  previous: string;
  isInverseLogic: boolean;
}): {
  monetaryStance: MonetaryStance;
  stanceLabelId: string;
  stanceLabelEn: string;
  stanceExplainId: string;
  stanceExplainEn: string;
  actionBiasId: string;
  actionBiasEn: string;
} {
  const { title, country, forecast, previous, isInverseLogic } = params;
  const upper = title.toUpperCase();
  const ccy = country.toUpperCase();
  const fNum = parseNumericPrint(forecast);
  const pNum = parseNumericPrint(previous);

  let monetaryStance: MonetaryStance = 'NEUTRAL';
  if (fNum !== null && pNum !== null) {
    if (fNum > pNum) {
      monetaryStance = isInverseLogic ? 'DOVISH' : 'HAWKISH';
    } else if (fNum < pNum) {
      monetaryStance = isInverseLogic ? 'HAWKISH' : 'DOVISH';
    }
  } else if (
    ccy === 'USD' &&
    (upper.includes('CPI') || upper.includes('FOMC') || upper.includes('BOND') || upper.includes('PAYROLL'))
  ) {
    monetaryStance = 'HAWKISH';
  } else if (ccy === 'EUR' && (upper.includes('LAGARDE') || upper.includes('CPI'))) {
    monetaryStance = 'DOVISH';
  } else if (ccy === 'JPY' && (upper.includes('BOJ') || upper.includes('CPI'))) {
    monetaryStance = 'HAWKISH';
  }

  const stanceLabelId =
    monetaryStance === 'HAWKISH'
      ? `SIKAP MONETER: HAWKISH (Cenderung Ketat / Menguatkan ${ccy})`
      : monetaryStance === 'DOVISH'
        ? `SIKAP MONETER: DOVISH (Cenderung Longgar / Melemahkan ${ccy})`
        : `SIKAP MONETER: NETRAL / MENUNGGU AKTUAL ${ccy}`;

  const stanceLabelEn =
    monetaryStance === 'HAWKISH'
      ? `MONETARY STANCE: HAWKISH (Tight Policy / Bullish ${ccy})`
      : monetaryStance === 'DOVISH'
        ? `MONETARY STANCE: DOVISH (Easing Bias / Soft ${ccy})`
        : `MONETARY STANCE: NEUTRAL / DATA-DEPENDENT ${ccy}`;

  const stanceExplainId =
    monetaryStance === 'HAWKISH'
      ? `Hawkish artinya bank sentral cenderung menahan atau menaikkan suku bunga karena ekonomi/inflasi panas, sehingga mata uang ${ccy} menguat dan menekan aset non-yield sementara.`
      : monetaryStance === 'DOVISH'
        ? `Dovish artinya bank sentral condong melonggarkan suku bunga atau menyuntik likuiditas untuk menopang ekonomi, sehingga ${ccy} berpotensi melemah dan memberi angin segar pada Emas (XAUUSD) & Nasdaq.`
        : `Konsensus Forecast setara data sebelumnya sehingga pasar menunggu kejutan angka Aktual vs Forecast untuk menentukan arah Hawkish atau Dovish.`;

  const stanceExplainEn =
    monetaryStance === 'HAWKISH'
      ? `Hawkish signals tighter interest rate policy supporting ${ccy} strength while temporarily weighing on gold/risk assets.`
      : monetaryStance === 'DOVISH'
        ? `Dovish favors rate cuts or liquidity easing, weakening ${ccy} and lifting Gold (XAUUSD) & risk assets.`
        : `Consensus matches prior print; wait for actual surprise delta to confirm Hawkish or Dovish repricing.`;

  let actionBiasId = '';
  let actionBiasEn = '';
  if (ccy === 'USD') {
    if (monetaryStance === 'HAWKISH') {
      actionBiasId =
        'KOMPAS FUNDAMENTAL: FOKUS CARI SELL LIMIT XAUUSD / BUY USD DI ZONA PREMIUM (ATAU BUY LIMIT XAUUSD JIKA AKTUAL < FORECAST)';
      actionBiasEn =
        'FUNDAMENTAL COMPASS: PREPARE SELL LIMIT XAUUSD IN PREMIUM (OR BUY LIMIT XAUUSD IF ACTUAL PRINTS BELOW FORECAST)';
    } else if (monetaryStance === 'DOVISH') {
      actionBiasId =
        'KOMPAS FUNDAMENTAL EMAS: FOKUS CARI BUY LIMIT XAUUSD & NAS100 DI ZONA DISKON';
      actionBiasEn =
        'GOLD FUNDAMENTAL COMPASS: FOCUS ON BUY LIMIT XAUUSD & NAS100 IN DISCOUNT ZONES';
    } else {
      actionBiasId =
        'KOMPAS FUNDAMENTAL: PASANG BUY/SELL LIMIT HANYA DI ZONA KONFIRMASI 15 MENIT PASCA RILIS';
      actionBiasEn =
        'FUNDAMENTAL COMPASS: WAIT 15M POST-PRINT TO TRIGGER LIMIT ZONES CLEANLY';
    }
  } else if (ccy === 'GBP') {
    actionBiasId =
      monetaryStance === 'HAWKISH'
        ? 'KOMPAS POUNDSTERLING: FOKUS BUY LIMIT GBPUSD & GBPJPY DI ZONA DISKON'
        : 'KOMPAS POUNDSTERLING: WASPADA SELL LIMIT GBPUSD DI ZONA PREMIUM';
    actionBiasEn =
      monetaryStance === 'HAWKISH'
        ? 'GBP COMPASS: FOCUS ON BUY LIMIT GBPUSD & GBPJPY AT DISCOUNT'
        : 'GBP COMPASS: WATCH SELL LIMIT GBPUSD AT PREMIUM';
  } else if (ccy === 'JPY') {
    actionBiasId =
      monetaryStance === 'HAWKISH'
        ? 'KOMPAS YEN JEPANG: YEN MENGUAT -> FOKUS SELL LIMIT USDJPY & GBPJPY'
        : 'KOMPAS YEN JEPANG: YEN MELEMAH -> FOKUS BUY LIMIT USDJPY DI ZONA DISKON';
    actionBiasEn =
      monetaryStance === 'HAWKISH'
        ? 'JPY COMPASS: HAWKISH BOJ -> FOCUS SELL LIMIT USDJPY & GBPJPY'
        : 'JPY COMPASS: DOVISH YEN -> FOCUS BUY LIMIT USDJPY AT DISCOUNT';
  } else if (ccy === 'EUR') {
    actionBiasId =
      monetaryStance === 'HAWKISH'
        ? 'KOMPAS EURO: FOKUS BUY LIMIT EURUSD DI ZONA DISKON'
        : 'KOMPAS EURO: FOKUS SELL LIMIT EURUSD DI ZONA PREMIUM';
    actionBiasEn =
      monetaryStance === 'HAWKISH'
        ? 'EUR COMPASS: FOCUS BUY LIMIT EURUSD AT DISCOUNT'
        : 'EUR COMPASS: FOCUS SELL LIMIT EURUSD AT PREMIUM';
  } else {
    actionBiasId = `KOMPAS ${ccy}: TUNGGU SAPUAN LIKUIDITAS LALU EKSEKUSI LIMIT SEARAH KEJUTAN AKTUAL`;
    actionBiasEn = `${ccy} COMPASS: WAIT FOR LIQUIDITY SWEEP AND EXECUTE LIMIT ALONG ACTUAL SURPRISE`;
  }

  return {
    monetaryStance,
    stanceLabelId,
    stanceLabelEn,
    stanceExplainId,
    stanceExplainEn,
    actionBiasId,
    actionBiasEn,
  };
}

export function resolveAffectedAssets(country: string, title: string): NewsPairFilterKey[] {
  const ccy = country.toUpperCase();
  const upper = title.toUpperCase();
  const assets = new Set<NewsPairFilterKey>();

  if (ccy === 'USD') {
    assets.add('USD');
    assets.add('XAUUSD');
    assets.add('NAS100');
    assets.add('BTC');
  } else if (ccy === 'GBP') {
    assets.add('GBP');
  } else if (ccy === 'JPY') {
    assets.add('JPY');
  } else if (ccy === 'EUR') {
    assets.add('EUR');
    assets.add('XAUUSD');
  } else if (ccy === 'CNY' || ccy === 'CHF') {
    assets.add('XAUUSD');
  }

  if (
    upper.includes('FOMC') ||
    upper.includes('CPI') ||
    upper.includes('POWELL') ||
    upper.includes('BOND') ||
    upper.includes('GOLD') ||
    upper.includes('RATE')
  ) {
    assets.add('XAUUSD');
    assets.add('NAS100');
    assets.add('BTC');
  }

  return Array.from(assets);
}

export function interpretEconomicEvent(
  title: string,
  country: string,
  forecast: string = '',
  previous: string = ''
): {
  plainExplainId: string;
  plainExplainEn: string;
  compassBuySellId: string;
  compassBuySellEn: string;
  monetaryStance: MonetaryStance;
  stanceLabelId: string;
  stanceLabelEn: string;
  stanceExplainId: string;
  stanceExplainEn: string;
  actionBiasId: string;
  actionBiasEn: string;
  affectedAssets: NewsPairFilterKey[];
  isInverseLogic: boolean;
} {
  const upper = `${title} ${country}`.toUpperCase();
  const affectedAssets = resolveAffectedAssets(country, title);

  let plainExplainId = '';
  let plainExplainEn = '';
  let compassBuySellId = '';
  let compassBuySellEn = '';
  let isInverseLogic = false;

  if (upper.includes('CPI') || upper.includes('INFLATION') || upper.includes('PCE')) {
    plainExplainId =
      'Mengukur seberapa cepat kenaikan harga belanja kebutuhan konsumen & jasa. Inflasi panas mendorong bank sentral menahan suku bunga tinggi lebih lama.';
    plainExplainEn =
      'Measures consumer inflation velocity. Sticky hot prints keep central banks hawkish.';
    compassBuySellId =
      `Jika angka Aktual rilis > Forecast (Hawkish ${country}): Tunggu sapuan atas lalu Sell Limit XAUUSD / hindari Buy pucuk. Jika Aktual < Forecast (Dovish ${country}): Konfirmasi Bullish untuk Buy Limit XAUUSD & NAS100!`;
    compassBuySellEn =
      `Actual > Forecast (Hawkish ${country}): Sell Limit XAUUSD on premium bounce. Actual < Forecast (Dovish): Buy Limit XAUUSD & NAS100!`;
  } else if (upper.includes('UNEMPLOYMENT') || upper.includes('JOBLESS CLAIMS') || upper.includes('CLAIMANT')) {
    isInverseLogic = true;
    plainExplainId =
      'Menghitung jumlah warga yang menganggur atau baru mendaftar tunjangan pengangguran. PERHATIAN: angka AKTUAL LEBIH TINGGI justru berarti ekonomi melemah (Dovish)!';
    plainExplainEn =
      'Tracks unemployment rate or weekly benefit filings. NOTE inverse logic: higher actual prints signal labor softening.';
    compassBuySellId =
      `LOGIKA TERBALIK! Jika AKTUAL > FORECAST (Pengangguran Naik -> Dovish ${country}): Peluang BUY LIMIT XAUUSD & NAS100 di zona diskon! Jika AKTUAL < FORECAST: ${country} menguat -> Sell Limit XAUUSD jika ada penolakan H1.`;
    compassBuySellEn =
      `INVERSE! Actual > Forecast (More Jobless -> Dovish ${country}): Buy Limit XAUUSD & NAS100. Actual < Forecast: Stronger ${country}.`;
  } else if (
    upper.includes('NON-FARM') ||
    upper.includes('NFP') ||
    upper.includes('EMPLOYMENT CHANGE') ||
    upper.includes('PAYROLL')
  ) {
    plainExplainId =
      'Laporan jumlah penciptaan lapangan kerja baru di luar sektor pertanian. Lapangan kerja kuat memberi ruang bank sentral bersikap Hawkish.';
    plainExplainEn =
      'Monthly net payroll additions outside farming. Strong job creation reinforces hawkish policy.';
    compassBuySellId =
      `Jika AKTUAL > FORECAST: Tenaga kerja kuat (Hawkish ${country}) -> Tunggu sapuan likuiditas lalu Sell Limit XAUUSD / Buy USDJPY. Jika AKTUAL < FORECAST (Dovish): Fokus BUY LIMIT XAUUSD!`;
    compassBuySellEn =
      `Actual > Forecast: Hawkish ${country}. Actual < Forecast: Dovish repricing / Buy Limit XAUUSD.`;
  } else if (
    upper.includes('FOMC') ||
    upper.includes('FEDERAL FUNDS') ||
    upper.includes('INTEREST RATE') ||
    upper.includes('RATE DECISION') ||
    upper.includes('POWELL') ||
    upper.includes('LAGARDE') ||
    upper.includes('BAILEY') ||
    upper.includes('BOJ') ||
    upper.includes('MONETARY POLICY')
  ) {
    plainExplainId =
      'Keputusan suku bunga atau pidato pejabat Bank Sentral yang menentukan arah likuiditas dan biaya pinjaman global.';
    plainExplainEn =
      'Central bank interest rate decision or Chair remarks steering global borrowing yields.';
    compassBuySellId =
      `Nada Hawkish (Tahan/Naik Bunga): ${country} MENGUAT -> XAUUSD tertekan ke zona diskon. Nada Dovish (Siap Pangkas Bunga): ${country} MELEMAH -> Fokus BUY LIMIT XAUUSD! Wajib tunggu 15 menit pasca pidato.`;
    compassBuySellEn =
      `Hawkish: Bullish ${country} / Pressures Gold. Dovish: Weakens ${country} / Buy Limit XAUUSD. Wait 15m post speech.`;
  } else if (upper.includes('BOND') || upper.includes('AUCTION') || upper.includes('YIELD')) {
    plainExplainId =
      'Lelang obligasi pemerintah & imbal hasil (yield). Yield yang melonjak membuat Dolar lebih menarik sementara menekan harga Emas (XAUUSD).';
    plainExplainEn =
      'Sovereign bond auction & yields. Rising yields strengthen USD and pressure non-yielding Gold.';
    compassBuySellId =
      'Jika Yield hasil lelang melonjak tinggi (Hawkish USD): waspada koreksi turun XAUUSD menuju zona Buy Limit lebih dalam. Jika Yield mendingin (Dovish): Emas dan Nasdaq berpeluang menguat.';
    compassBuySellEn =
      'Higher auction yields pressure Gold into deeper Buy Limit zones; cooler yields lift Gold & Nasdaq.';
  } else if (upper.includes('OIL') || upper.includes('INVENTORIES') || upper.includes('PPI')) {
    plainExplainId =
      'Mengukur tekanan harga komoditas energi atau barang pabrikan yang menjadi sinyal awal naik-turunnya inflasi bulan depan.';
    plainExplainEn =
      'Tracks energy supply & producer prices acting as an early inflation gauge.';
    compassBuySellId =
      `Jika AKTUAL mengindikasikan inflasi panas -> Hawkish ${country}. Jika melemah -> Dovish ${country}, mendukung aset Safe Haven XAUUSD.`;
    compassBuySellEn =
      `Hot energy/producer prints favor Hawkish ${country}; soft prints favor Dovish XAUUSD support.`;
  } else if (upper.includes('RETAIL SALES') || upper.includes('HOME SALES') || upper.includes('BUILDING PERMITS') || upper.includes('GDP') || upper.includes('PMI')) {
    plainExplainId =
      'Indikator aktivitas ekonomi, daya beli masyarakat, sektor perumahan, dan ekspansi bisnis yang memengaruhi proyeksi suku bunga bank sentral.';
    plainExplainEn =
      'Macro indicator tracking consumer demand, housing momentum, and business expansion.';
    compassBuySellId =
      `Jika AKTUAL > FORECAST: Ekonomi ${country} tangguh (Hawkish). Jika AKTUAL < FORECAST: Ekonomi melambat (Dovish ${country}) -> Emas XAUUSD diuntungkan.`;
    compassBuySellEn =
      `Actual > Forecast supports ${country}; Actual < Forecast weakens ${country} and aids XAUUSD.`;
  } else {
    plainExplainId =
      `Indikator makroekonomi ${country} yang memengaruhi ekspektasi pertumbuhan, imbal hasil obligasi, serta likuiditas sesi aktif.`;
    plainExplainEn =
      `${country} macroeconomic release influencing sovereign yields and session volatility.`;
    compassBuySellId =
      `Jika AKTUAL > FORECAST: Cenderung menguatkan ${country}. Terapkan jeda aman -15m s/d +10m sekitar detik rilis sebelum memicu Limit Order.`;
    compassBuySellEn =
      `Actual > Forecast typically favors ${country}. Keep -15m/+10m spread blackout before triggering Limit entries.`;
  }

  const stance = resolveMonetaryStance({
    title,
    country,
    forecast,
    previous,
    isInverseLogic,
  });

  return {
    plainExplainId,
    plainExplainEn,
    compassBuySellId,
    compassBuySellEn,
    ...stance,
    affectedAssets,
    isInverseLogic,
  };
}

export function getPairSpecificNewsBrief(
  ev: WibCalendarEvent,
  filter: NewsPairFilterKey,
  isId: boolean
): string {
  if (filter === 'ALL') {
    return isId ? ev.compassBuySellId : ev.compassBuySellEn;
  }
  const stanceWord = ev.monetaryStance === 'HAWKISH' ? 'Hawkish' : ev.monetaryStance === 'DOVISH' ? 'Dovish' : 'Netral';
  if (filter === 'XAUUSD') {
    return isId
      ? `[Fokus XAUUSD] Stance ${stanceWord} ${ev.country}: Jika data aktual mendorong ${ev.country} menguat tajam, tunggu sapuan likuiditas ke bawah dulu (jangan tangkap pisau jatuh) baru antri Buy Limit atau ikut Sell Limit jika struktur H1 berbalik turun.`
      : `[XAUUSD Focus] ${stanceWord} ${ev.country}: Wait for post-news liquidity sweep before firing Limit orders on Gold.`;
  }
  if (filter === 'GBP') {
    return isId
      ? `[Fokus GBPUSD / GBPJPY] Rilis ${ev.country} berdampak langsung pada Poundsterling. Tunggu candle M15 menutup setelah jam ${ev.wibTimeOnly} untuk konfirmasi Limit Order.`
      : `[GBP Focus] Watch GBPUSD & GBPJPY liquidity sweeps cleanly 15m after ${ev.wibTimeOnly}.`;
  }
  if (filter === 'JPY') {
    return isId
      ? `[Fokus USDJPY / GBPJPY] Rilis berdampak pada selisih imbal hasil obligasi vs Yen Jepang. Hindari entry tepat di detik rilis karena spread Yen rentan melebar.`
      : `[JPY Focus] Impacts yield differential on USDJPY/GBPJPY; wait for spread normalization post-print.`;
  }
  if (filter === 'NAS100') {
    return isId
      ? `[Fokus NAS100 / Tech Index] Saham teknologi sensitif terhadap lonjakan US10Y Yield. Data ${ev.country} lebih lemah (Dovish) memberi dorongan kuat untuk skenario Buy Limit Nasdaq.`
      : `[NAS100 Focus] Tech multiples expand on Dovish ${ev.country} prints and cooler US10Y yields.`;
  }
  if (filter === 'BTC') {
    return isId
      ? `[Fokus BTCUSDT & Crypto] Likuiditas Dolar dan selera risiko global bergerak selaras ekspektasi The Fed. Data Dovish umumnya mengangkat Bitcoin ke zona ekspansi baru.`
      : `[BTC Focus] Dollar liquidity and Fed rate expectations drive BTC spot & ETF appetite.`;
  }
  return isId ? ev.compassBuySellId : ev.compassBuySellEn;
}
