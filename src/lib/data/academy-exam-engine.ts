import type {
  DynamicCaseTemplate,
  GraduationExamQuestion,
} from './academy-types';

export interface DynamicCaseQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DynamicExamQuestionItem {
  id: string;
  semesterCode: string;
  semesterTitle: string;
  reviewSlug: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function seededRand(seed: number): () => number {
  let state = Math.abs(Math.floor(seed)) || 1337;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function shuffleOptionsWithAnswer(
  correctOption: string,
  distractors: string[],
  rand: () => number
): { options: string[]; correctIndex: number } {
  const unique = [correctOption, ...distractors.filter((d) => d !== correctOption)].slice(0, 4);
  const tagged = unique.map((text, idx) => ({ text, isCorrect: idx === 0, sortKey: rand() }));
  tagged.sort((a, b) => a.sortKey - b.sortKey);
  return {
    options: tagged.map((t) => t.text),
    correctIndex: Math.max(0, tagged.findIndex((t) => t.isCorrect)),
  };
}

export function generateModuleCaseChallenge(
  formulaKind: DynamicCaseTemplate['formulaKind'],
  seed: number,
  isId: boolean
): DynamicCaseQuestion {
  const rand = seededRand(seed);

  switch (formulaKind) {
    case 'INFLATION_POWER': {
      const cashMillion = [10, 15, 20, 25][Math.floor(rand() * 4)];
      const bankRate = 1;
      const inflation = [5, 6, 7][Math.floor(rand() * 3)];
      const realDrop = inflation - bankRate;
      const lostPower = ((cashMillion * realDrop) / 100).toFixed(2);
      const ans = isId
        ? `-${realDrop}% daya beli (~Rp${lostPower} Juta hilang riil dalam 1 tahun)`
        : `-${realDrop}% purchasing power (~$${lostPower}M real value lost per year)`;
      const d1 = isId ? `+${bankRate + inflation}% lebih kaya` : `+${bankRate + inflation}% wealthier`;
      const d2 = isId ? `0% (tidak ada perubahan sama sekali)` : `0% (zero change)`;
      const d3 = isId ? `+${realDrop}% daya beli bertambah` : `+${realDrop}% stronger`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `STUDI KASUS DINAMIS: Kamu menaruh Rp${cashMillion} Juta di tabungan berimbal hasil bersih ${bankRate}%/tahun, sementara laju inflasi tercatat ${inflation}%/tahun. Berapakah perubahan daya beli riil uangmu setelah 1 tahun?`
          : `DYNAMIC CASE: You hold ${cashMillion}M units in savings paying ${bankRate}%/yr net while CPI inflation runs at ${inflation}%/yr. What is your net annual real purchasing power change?`,
        ...shuffled,
        explanation: isId
          ? `Persamaan Fisher: Bunga (${bankRate}%) − Inflasi (${inflation}%) = -${realDrop}% penurunan daya beli riil.`
          : `Fisher Rule: Nominal Yield (${bankRate}%) − Inflation (${inflation}%) = -${realDrop}% real purchasing power change.`,
      };
    }

    case 'INTERMARKET_YIELD': {
      const bondNominal = [4.0, 4.5, 5.0, 5.5][Math.floor(rand() * 4)];
      const expInflation = [2.0, 2.5, 3.0][Math.floor(rand() * 3)];
      const realYield = (bondNominal - expInflation).toFixed(1);
      const ans = isId
        ? `+${realYield}% Real Yield Positif (USD & Obligasi menarik aliran modal; berpotensi menekan Emas sementara)`
        : `+${realYield}% Positive Real Yield (attracts capital toward USD & Bonds, pressuring zero-coupon Gold short-term)`;
      const d1 = isId ? `-${(bondNominal + expInflation).toFixed(1)}% Real Yield` : `-${(bondNominal + expInflation).toFixed(1)}% Negative`;
      const d2 = isId ? `0% dan Emas wajib langsung naik +50%` : `0% guaranteeing instant +50% Gold rally`;
      const d3 = isId ? `+${(bondNominal * 2).toFixed(1)}%` : `+${(bondNominal * 2).toFixed(1)}%`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `STUDI KASUS INTERMARKET: Imbal hasil nominal obligasi AS (US10Y) berada di ${bondNominal.toFixed(1)}%, sementara ekspektasi inflasi AS turun ke ${expInflation.toFixed(1)}%. Berapakah Real Yield AS & implikasi intermarketnya?`
          : `DYNAMIC INTERMARKET CASE: Nominal US10Y Treasury Yield sits at ${bondNominal.toFixed(1)}% while inflation expectations settle at ${expInflation.toFixed(1)}%. Compute Real Yield and Gold implication:`,
        ...shuffled,
        explanation: isId
          ? `Real Yield = US10Y (${bondNominal.toFixed(1)}%) − Inflasi (${expInflation.toFixed(1)}%) = +${realYield}%.`
          : `Real Yield = US10Y (${bondNominal.toFixed(1)}%) − Inflation (${expInflation.toFixed(1)}%) = +${realYield}%.`,
      };
    }

    case 'SPREAD_COST': {
      const lots = [0.02, 0.03, 0.04, 0.05][Math.floor(rand() * 4)];
      const normalSpreadPts = [0.3, 0.4, 0.5][Math.floor(rand() * 3)];
      const multiplier = 6;
      const normalCost = (lots * normalSpreadPts * 100).toFixed(1);
      const newsCost = (lots * normalSpreadPts * multiplier * 100).toFixed(1);
      const ans = isId
        ? `Normal: ${normalCost} USC | Detik News/Rollover (6x): ${newsCost} USC langsung terpotong!`
        : `Normal: ${normalCost} USC | News/Rollover (6x): ${newsCost} USC drag instantaneously!`;
      const d1 = isId ? `Tetap ${normalCost} USC selamanya` : `Fixed at ${normalCost} USC always`;
      const d2 = `0 USC (Gratis saat NFP)`;
      const d3 = isId ? `Untung +${newsCost} USC` : `+${newsCost} USC rebate`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `STUDI KASUS MIKROSTRUKTUR: Kamu membuka ${lots.toFixed(2)} Cent lot XAUUSDc (1 oz). Saat jam Killzone normal Spread sebesar $${normalSpreadPts.toFixed(1)}, namun detik Rollover/News melebar ${multiplier}x lipat! Berapa biaya spread masuk yang langsung terbebankan?`
          : `DYNAMIC SPREAD CASE: Trading ${lots.toFixed(2)} Cent lot XAUUSDc (1 oz). Normal Killzone spread is $${normalSpreadPts.toFixed(1)}, widening ${multiplier}x at Rollover/News. Compare entry spread cost:`,
        ...shuffled,
        explanation: isId
          ? `Pada 1 oz Cent: ${lots.toFixed(2)} × $${normalSpreadPts.toFixed(1)} × 100 = ${normalCost} USC normal -> membengkak ${multiplier}x jadi ${newsCost} USC saat likuiditas tipis!`
          : `At 1 oz Cent, spread drag scales from ${normalCost} USC cleanly up 6x to ${newsCost} USC during adverse selection widenings.`,
      };
    }

    case 'CENT_LOT_SIZING': {
      const balanceUsc = [1000, 1500, 2000, 2500, 3000][Math.floor(rand() * 5)];
      const riskBudget = balanceUsc * 0.01;
      const slDollars = [4, 5, 6, 7, 8][Math.floor(rand() * 5)];
      const rawLot = riskBudget / (slDollars * 100);
      const flooredLot = Math.floor(rawLot * 100) / 100;
      const actualRisk = Math.round(flooredLot * slDollars * 100);
      const ans =
        flooredLot < 0.01
          ? isId
            ? `TOLAK TRADE (NO TRADE) karena 0.01 lot berisiko ${slDollars} USC (> 1% batas)`
            : `REJECT TRADE because minimum 0.01 lot exceeds 1% cap`
          : isId
          ? `${flooredLot.toFixed(2)} Cent lot (Pembulatan ke bawah: risiko aktual ${actualRisk} USC <= ${riskBudget} USC)`
          : `${flooredLot.toFixed(2)} Cent lot (Floored down: actual risk ${actualRisk} USC <= ${riskBudget} USC max)`;
      const upLot = (flooredLot + 0.02).toFixed(2);
      const giantLot = (flooredLot + 0.1).toFixed(2);
      const d1 = isId ? `${upLot} Cent lot (bulat ke atas)` : `${upLot} Cent lot (rounded up)`;
      const d2 = isId ? `${giantLot} Standar lot (100 oz)` : `${giantLot} Standard lot`;
      const d3 = `1.00 lot penuh tanpa Stop Loss`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS HITUNGAN LOT DINAMIS: Saldo Akun Cent kamu sebesar ${balanceUsc.toLocaleString('id-ID')} USC (XAUUSDc Contract Size 1 oz). Batas risiko maksimal 1% (${riskBudget} USC) dan Stop Loss berjarak $${slDollars}. Berapa volume lot sah sesuai aturan Floor Rounding JGS?`
          : `DYNAMIC SIZING CASE: Your Cent Account holds ${balanceUsc} USC on 1 oz XAUUSDc. With strict 1% risk cap (${riskBudget} USC max) and a $${slDollars} Stop Loss distance, what exact step-floored lot complies?`,
        ...shuffled,
        explanation: isId
          ? `Rumus JGS: ${riskBudget} USC / ($${slDollars} × 100) = ${rawLot.toFixed(4)} lot -> dibulatkan ke bawah step 0.01 menjadi ${flooredLot.toFixed(2)} lot!`
          : `Exact math: ${riskBudget} / (${slDollars} × 100) = ${rawLot.toFixed(4)} -> floored downward cleanly to ${flooredLot.toFixed(2)} lot!`,
      };
    }

    case 'DRAWDOWN_RECOVERY': {
      const ddPct = [20, 40, 50, 60][Math.floor(rand() * 4)];
      const remPct = 100 - ddPct;
      const recoveryNeeded = ((ddPct / remPct) * 100).toFixed(1).replace(/\.0$/, '');
      const ans = isId
        ? `+${recoveryNeeded}% keuntungan wajib dicetak dari sisa modal ${remPct}% hanya untuk impas balik!`
        : `+${recoveryNeeded}% gain needed strictly from remaining ${remPct}% equity to break even!`;
      const d1 = `+${ddPct}% saja (sama besar dengan kerugiannya)`;
      const d2 = `+${Math.round(ddPct / 2)}% saja`;
      const d3 = `+10% dalam 1 hari`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS MATEMATIKA DRAWDOWN: Akun seorang pemula terlanjur merugi -${ddPct}% (tersisa ${remPct}% dari saldo awal) akibat melepas Stop Loss. Berapa persen keuntungan dari sisa modal tersebut yang mutlak dibutuhkan sekadar kembali impas ke 100%?`
          : `DYNAMIC DRAWDOWN CASE: A careless account dropped -${ddPct}% down to ${remPct}% of initial equity. What exact comeback return on remaining capital restores break-even?`,
        ...shuffled,
        explanation: isId
          ? `Rumus non-linear: ${ddPct}% / (100% − ${ddPct}%) = ${ddPct}/${remPct} = +${recoveryNeeded}%!`
          : `Asymmetric formula: ${ddPct} / (100 − ${ddPct}) = +${recoveryNeeded}%!`,
      };
    }

    case 'FIBO_DISCOUNT': {
      const low = [2580, 2600, 2620][Math.floor(rand() * 3)];
      const span = [40, 60, 80][Math.floor(rand() * 3)];
      const high = low + span;
      const eq50 = low + span * 0.5;
      const disc618 = Number((high - span * 0.618).toFixed(1));
      const badPrem = Number((high - span * 0.2).toFixed(1));
      const ans = isId
        ? `Equilibrium 50% = $${eq50} | Zona Diskon Phi 61,8% ≈ $${disc618} (Area sehat untuk antri Buy FVG)`
        : `50% Equilibrium = $${eq50} | 61.8% Phi Discount ≈ $${disc618} (Clean FVG Buy pocket)`;
      const d1 = isId ? `Beli mahal di $${badPrem} (Zona Premium 20%)` : `Chase Premium zone $${badPrem}`;
      const d2 = `Harus beli di $${high + 15}`;
      const d3 = `Equilibrium = $${low}`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS UKUR DISKON FIBONACCI: Emas XAUUSDc melesat bullish Displacement + MSS dari dasar $${low} hingga puncak $${high} (rentang $${span}). Di harga berapakah batas tengah Equilibrium 50% serta level diskon Fibonacci 61,8% untuk mencari Buy FVG?`
          : `DYNAMIC FIBONACCI CASE: Gold rallied cleanly from Swing Low $${low} to Swing High $${high} ($${span} range). Compute 50% Equilibrium and 61.8% Discount Buy coordinates:`,
        ...shuffled,
        explanation: isId
          ? `Equilibrium = $${low} + 0.5×$${span} = $${eq50}; Diskon 61,8% = $${high} − 0.618×$${span} = $${disc618}!`
          : `Equilibrium = $${eq50}; 61.8% Retracement = $${high} − 0.618×$${span} = $${disc618}!`,
      };
    }

    case 'ICT_RRR_TARGET': {
      const slDist = [4, 5, 6, 8][Math.floor(rand() * 4)];
      const rrr = [2, 2.5, 3][Math.floor(rand() * 3)];
      const riskUsc = 10;
      const tpDist = slDist * rrr;
      const profitUsc = riskUsc * rrr;
      const ans = isId
        ? `Jarak Target TP: $${tpDist} dari Entry -> Menghasilkan +${profitUsc} USC (+${rrr}R terhadap risiko 10 USC!)`
        : `TP Distance: $${tpDist} away -> Captures +${profitUsc} USC (+${rrr}R vs 10 USC risk!)`;
      const d1 = isId ? `Jarak TP $${slDist / 2} menghasilkan +2 USC` : `$${slDist / 2} target (+2 USC)`;
      const d2 = `TP bebas tanpa target rasio`;
      const d3 = isId ? `Profit ${riskUsc} USC sama dengan SL` : `+$${riskUsc} 1:1 only`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS TARGET R:R EKSEKUSI: Di dalam Killzone NY, kamu masuk di FVG dengan batas SL di balik Sweep berjarak $${slDist} (risiko tepat 10 USC / 1% dari 1.000 USC). Jika membidik rasio Risk-to-Reward 1 : ${rrr}, berapa jarak harga TP & hasil profit bersihnya dalam USC?`
          : `DYNAMIC R:R EXECUTION CASE: Inside NY Killzone your valid FVG trade risks 10 USC (1% of 1,000 USC) across a $${slDist} sweep stop distance. Targeting 1 : ${rrr} R:R, calculate TP travel & net USC gain:`,
        ...shuffled,
        explanation: isId
          ? `Target jarak = ${rrr} × $${slDist} = $${tpDist}; Imbalan profit = ${rrr} × 10 USC = +${profitUsc} USC (+${rrr}R).`
          : `TP distance = ${rrr} × $${slDist} = $${tpDist}; net USC return = +${profitUsc} USC (+${rrr}R).`,
      };
    }

    case 'QUANT_EXPECTANCY': {
      const winPct = [40, 45, 50][Math.floor(rand() * 3)];
      const rrrWin = [2.5, 3.0][Math.floor(rand() * 2)];
      const expR = Number(((winPct / 100) * rrrWin - (1 - winPct / 100) * 1).toFixed(3));
      const net100 = (expR * 100).toFixed(1).replace(/\.0$/, '');
      const ans = isId
        ? `+${expR}R per transaksi -> Surplus Bersih +${net100}R melintasi 100 eksekusi disiplin!`
        : `+${expR}R per trade -> +${net100}R total surplus over 100 trades!`;
      const d1 = isId ? `Rugi -${winPct}R karena Win Rate <= 50%` : `-${winPct}R net loss`;
      const d2 = `0.000R persis impas`;
      const d3 = `-10.0R pasti MC`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS QUANT EXPECTANCY: Sebuah sistem kuantitatif diuji dalam 100 transaksi dengan Win Rate ${winPct}% serta target konsisten R:R 1 : ${rrrWin} (menang +${rrrWin}R, kalah -1R). Hitunglah nilai Mathematical Expectancy per trade dan proyeksi total dalam 100 trade!`
          : `DYNAMIC EXPECTANCY CASE: A quant strategy executes 100 disciplined trades at ${winPct}% Win Rate and strict 1 : ${rrrWin} Payoff Ratio (+${rrrWin}R win, -1R stop). Calculate Mathematical Expectancy per trade & 100-trade projection:`,
        ...shuffled,
        explanation: isId
          ? `E = (${winPct}% × ${rrrWin}R) − (${100 - winPct}% × 1R) = +${expR}R per transaksi × 100 = +${net100}R!`
          : `E = (${winPct}% × ${rrrWin}) − (${100 - winPct}% × 1) = +${expR}R/trade -> +${net100}R over 100 executions!`,
      };
    }

    case 'HWM_FEE':
    default: {
      const hwm = [1400, 1600, 1800][Math.floor(rand() * 3)];
      const dip = hwm - 250;
      const newHigh = hwm + [200, 300, 400][Math.floor(rand() * 3)];
      const netSurplus = newHigh - hwm;
      const fee = Math.round(netSurplus * 0.3);
      const ans = isId
        ? `Fee 30% = $${fee} (dihitung HANYA atas $${netSurplus} profit bersih baru di atas HWM $${hwm}; fase pemulihan dari $${dip} bebas fee $0!)`
        : `$${fee} exact Fee (30% strictly on $${netSurplus} new net high above $${hwm} HWM; recovery from $${dip} is $0!)`;
      const wrongTotalGain = Math.round((newHigh - dip) * 0.3);
      const d1 = `$${wrongTotalGain} (30% dari seluruh kenaikan dari lembah $${dip})`;
      const d2 = `$${Math.round(newHigh * 0.3)} (30% dari seluruh saldo $${newHigh})`;
      const d3 = `$0 selamanya`;
      const shuffled = shuffleOptionsWithAnswer(ans, [d1, d2, d3], rand);
      return {
        prompt: isId
          ? `TUGAS COPY TRADING HWM: Follower memiliki rekor High-Water Mark (HWM) di $${hwm}. Saldo sempat turun ke $${dip}, lalu reli kuat hingga mencetak rekor baru $${newHigh}. Berapa Performance Fee (30%) yang SAH dikenakan sistem HWM JGS?`
          : `DYNAMIC HWM CASE: Follower’s High-Water Mark sits at $${hwm}. Equity dips to $${dip}, then surges cleanly to $${newHigh}. Calculate exact 30% Performance Fee under pure High-Water Mark accounting:`,
        ...shuffled,
        explanation: isId
          ? `Fee HWM = 30% × max(0, $${newHigh} − $${hwm}) = 30% × $${netSurplus} = $${fee}. Masa pulih $${dip} -> $${hwm} berbiaya $0!`
          : `Fee = 30% × max(0, $${newHigh} − $${hwm}) = $${fee}. Recovery up to $${hwm} incurs $0 double fee!`,
      };
    }
  }
}

export function generateDynamicFinalExam(
  isId: boolean,
  nonce: number
): DynamicExamQuestionItem[] {
  const rand = seededRand(nonce || Date.now());
  const c1 = generateModuleCaseChallenge('INFLATION_POWER', nonce + 101, isId);
  const c2 = generateModuleCaseChallenge('INTERMARKET_YIELD', nonce + 202, isId);
  const c3 = generateModuleCaseChallenge('SPREAD_COST', nonce + 303, isId);
  const c4 = generateModuleCaseChallenge('CENT_LOT_SIZING', nonce + 404, isId);
  const c5 = generateModuleCaseChallenge('ICT_RRR_TARGET', nonce + 505, isId);
  const c7 = generateModuleCaseChallenge('FIBO_DISCOUNT', nonce + 707, isId);
  const c11 = generateModuleCaseChallenge('DRAWDOWN_RECOVERY', nonce + 1111, isId);
  const c12a = generateModuleCaseChallenge('QUANT_EXPECTANCY', nonce + 1212, isId);
  const c12b = generateModuleCaseChallenge('HWM_FEE', nonce + 1313, isId);

  const staticConceptQ = (
    id: string,
    code: string,
    titleId: string,
    titleEn: string,
    slug: string,
    promptId: string,
    promptEn: string,
    ansId: string,
    ansEn: string,
    wrongId: string[],
    wrongEn: string[],
    expId: string,
    expEn: string
  ): DynamicExamQuestionItem => {
    const sh = shuffleOptionsWithAnswer(
      isId ? ansId : ansEn,
      isId ? wrongId : wrongEn,
      rand
    );
    return {
      id,
      semesterCode: code,
      semesterTitle: isId ? titleId : titleEn,
      reviewSlug: slug,
      prompt: isId ? promptId : promptEn,
      options: sh.options,
      correctIndex: sh.correctIndex,
      explanation: isId ? expId : expEn,
    };
  };

  const q12 = Math.floor(rand() * 2) === 0 ? c12a : c12b;

  return [
    {
      id: 'exam-fin-101',
      semesterCode: 'FIN-101',
      semesterTitle: isId ? 'Fondasi Uang & Pasar Global' : 'Foundations of Money & Markets',
      reviewSlug: 'money-history-and-inflation',
      prompt: `[FIN-101] ${c1.prompt}`,
      options: c1.options,
      correctIndex: c1.correctIndex,
      explanation: c1.explanation,
    },
    {
      id: 'exam-eco-102',
      semesterCode: 'ECO-102',
      semesterTitle: isId ? 'Makroekonomi & Intermarket' : 'Macro & Intermarket',
      reviewSlug: 'intermarket-yields-dxy-xauusd',
      prompt: `[ECO-102] ${c2.prompt}`,
      options: c2.options,
      correctIndex: c2.correctIndex,
      explanation: c2.explanation,
    },
    {
      id: 'exam-mic-103',
      semesterCode: 'MIC-103',
      semesterTitle: isId ? 'Mikrostruktur & Broker MT5' : 'Microstructure & MT5',
      reviewSlug: 'limit-order-book-bid-ask-slippage',
      prompt: `[MIC-103] ${c3.prompt}`,
      options: c3.options,
      correctIndex: c3.correctIndex,
      explanation: c3.explanation,
    },
    {
      id: 'exam-rsk-201',
      semesterCode: 'RSK-201',
      semesterTitle: isId ? 'Matematika Risiko & Cent USC' : 'Risk Math & 1,000 USC Cent',
      reviewSlug: 'how-cent-accounts-work',
      prompt: `[RSK-201] ${c4.prompt}`,
      options: c4.options,
      correctIndex: c4.correctIndex,
      explanation: c4.explanation,
    },
    {
      id: 'exam-psy-202',
      semesterCode: 'PSY-202',
      semesterTitle: isId ? 'Psikologi Emosi Pemula & Jurnal' : 'Trading Psychology & Journal',
      reviewSlug: 'circuit-breakers-and-daily-loss-limits',
      prompt: `[PSY-202] Mengapa Nobel Kahneman & Tversky *Prospect Theory* plus Rem Darurat 2x SL penting dicegah? ${c11.prompt}`,
      options: c11.options,
      correctIndex: c11.correctIndex,
      explanation: c11.explanation,
    },
    staticConceptQ(
      'exam-tec-203',
      'TEC-203',
      'Analisis Teknikal Klasik',
      'Classical Technical Analysis',
      'indicators-ma-rsi-macd-atr-lag',
      '[TEC-203] Mengapa persilangan indikator seperti Moving Average & RSI disebut bersifat LAGGING secara matematis, dan indikator manakah yang sah dipakai mengukur volatilitas SL?',
      '[TEC-203] Why are Moving Average & RSI mathematically lagging, and which gauge measures pure volatility safely for SL buffers?',
      'Indikator merata-ratakan harga penutupan masa lalu sehingga selalu bereaksi telat; ATR (Average True Range) mengukur lebar volatilitas bar secara objektif.',
      'Moving indicators smooth past closing bars creating lag; ATR strictly measures true volatility ranges objectively.',
      [
        'Indikator meramal masa depan 100% akurat dan RSI mengukur spread broker.',
        'Semua indikator menggunakan data tahun depan.',
        'Garis Moving Average menghapus risiko Margin Call secara otomatis.',
      ],
      [
        'Indicators predict next week accurately.',
        'Moving averages cancel Margin Calls permanently.',
        'Indicators track bank account passwords.',
      ],
      'Indikator tren terbuat dari harga masa lalu, gunakan harga mentah untuk arah dan ATR sekadar mengukur jarak volatilitas!',
      'Oscillators lag completed historical closes; preserve ATR solely for volatility awareness.'
    ),
    staticConceptQ(
      'exam-snr-204',
      'SNR-204',
      'Zona Support, Resistance & Trendline',
      'Support, Resistance & Trendline Liquidity',
      'trendline-liquidity-vs-static-zones',
      '[SNR-204] Mengapa Support-Resistance wajib digambar berupa kotak pita dan mengapa garis Trendline miring 4-sentuhan sering dijebol turun dulu?',
      '[SNR-204] Why shade Support/Resistance as horizontal boxes and why do neat 4-touch diagonal Trendlines break lower first?',
      'Buku order memproses limit di pita harga horizontal; garis miring menumpuk kumpulan Stop Loss ritel (*Trendline Liquidity*) yang kerap disapu masuk ke Demand Horizontal di bawahnya.',
      'Limit order books trade fixed horizontal price bands; diagonal lines stack predictable retail stops (*Trendline Liquidity*) frequently raided into lower horizontal Demand.',
      [
        'Karena garis miring dilarang tampil di MetaTrader 5.',
        'Karena sentuhan lantai ke-5 menjamin harga naik selamanya tanpa batas.',
        'Karena order book bursa beroperasi memakai sudut derajat layar monitor.',
      ],
      [
        'Because MT5 bans diagonal shapes.',
        'Because fifth flat touches never fail mathematically.',
        'Because exchange limit matching runs on pixel angles.',
      ],
      'Hormati angka harga horizontal di kotak pita serta waspadai sapuan likuiditas sepanjang garis miring.',
      'Respect horizontal price bands and treat crowded diagonal slopes as stop-loss liquidity targets.'
    ),
    staticConceptQ(
      'exam-wyc-301',
      'WYC-301',
      'Metode Wyckoff & Supply-Demand',
      'Wyckoff & Supply/Demand',
      'wyckoff-accumulation-spring-upthrust',
      '[WYC-301] Pada skema Wyckoff Accumulation, manuver tipuan tajam di Fase C yang menusuk tipis lantai range lalu cepat berbalik ke atas dan berhubungan langsung dengan ICT Liquidity Sweep disebut:',
      '[WYC-301] Inside Wyckoff Accumulation, which Phase C trap briefly pierces the lower range floor to sweep stops before snapping upward?',
      'The Spring (atau UTAD/Upthrust pada puncak Distribusi), memanfaatkan kepanikan penjual demi mengisi akumulasi Composite Man.',
      'The Spring (mirroring UTAD Upthrust at distribution tops), harvesting panicked stops cleanly for Composite Man fills.',
      [
        'Golden Cross 200 SMA.',
        'Daily Rollover Margin Wipe.',
        'Sunday Weekend Gap.',
      ],
      [
        'Golden Cross SMA 200.',
        'Daily Rollover closeout.',
        'Weekend fee hike.',
      ],
      'Wyckoff Phase C Spring tahun 1930-an adalah fondasi sejarah bagi manuver sapuan likuiditas modern.',
      'Wyckoff’s Phase C Spring is the historical precursor directly behind Liquidity Sweeps.'
    ),
    {
      id: 'exam-wav-302',
      semesterCode: 'WAV-302',
      semesterTitle: isId ? 'Elliott Wave & Fibonacci' : 'Waves & Fibonacci',
      reviewSlug: 'fibonacci-gold-ratios-and-discount',
      prompt: `[WAV-302] ${c7.prompt}`,
      options: c7.options,
      correctIndex: c7.correctIndex,
      explanation: c7.explanation,
    },
    staticConceptQ(
      'exam-amt-303',
      'AMT-303',
      'Auction Market & Volume Profile',
      'Auction Market & Volume Profile',
      'volume-profile-poc-vah-val',
      '[AMT-303] Dalam Volume Profile & Auction Market Theory (Peter Steidlmayer), sekitar 70% aktivitas transaksi wajar berkumpul di antara VAH & VAL mengelilingi POC. Apa sifat area tipis Low Volume Node (LVN)?',
      '[AMT-303] Across Steidlmayer’s Volume Profile (~70% VAH–VAL around POC), how does price behave inside a thin Low Volume Node (LVN)?',
      'Area bervolume tipis tempat harga melaju cepat mencari kesepakatan nilai baru, kerap berimpit persis dengan area Imbalance / FVG!',
      'A low-liquidity speed lane through which price travels swiftly toward the next Value hub, matching FVG voids cleanly!',
      [
        'Tempat paling macet membuat harga tertidur 5 hari.',
        'Titik pengenaan denda komisi ganda.',
        'Area terlarang pada akhir pekan saja.',
      ],
      [
        'The slowest horizontal congestion trap.',
        'Extra commission penalty band.',
        'Sunday-only line.',
      ],
      'Cekungan tipis LVN mencerminkan celah pergeseran harga secepat Fair Value Gap pada grafik lilin.',
      'Thin LVNs align closely with directional Imbalance / Fair Value Gap discovery pockets.'
    ),
    staticConceptQ(
      'exam-ict-304',
      'ICT-304',
      'Fondasi Prinsip Pertama ICT & SMC',
      'First Principles of ICT & SMC',
      'ict-smc-grassroots-origin-and-ipda',
      '[ICT-304] Menurut riset *Predatory Trading* (Brunnermeier & Pedersen, *Journal of Finance* 2005) & model Michael J. Huddleston, urutan 4 prasyarat lengkap eksekusi ICT yang sah adalah:',
      '[ICT-304] Combining Brunnermeier & Pedersen (*Journal of Finance* 2005) with Huddleston’s blueprint, what 4-Step sequence MUST confirm BEFORE pressing BUY/SELL?',
      '1. Killzone Time -> 2. Sapuan Likuiditas (BSL/SSL Sweep) -> 3. Displacement & Patah Struktur (MSS) -> 4. Entry di FVG zona Diskon/Premium ber-SL balik Sweep (1% Risiko).',
      '1. Killzone Window -> 2. BSL/SSL Sweep -> 3. Displacement & MSS -> 4. Discount/Premium FVG Entry with SL behind Sweep (1% Risk).',
      [
        '1. Jam bebas subuh -> 2. Tanpa SL -> 3. Lipat lot Martingale -> 4. Menebak arah NFP.',
        '1. Masuk di FVG sembarang -> 2. Abaikan Sweep & MSS.',
        '1. Ikut candle hijau terbesar -> 2. Taruh SL pas di garis Double Bottom.',
      ],
      [
        '1. Off-hour Rollover -> 2. Zero SL -> 3. Double lots repeatedly.',
        '1. Blind FVG -> 2. Ignore Sweep & MSS.',
        '1. Chase huge green bars blindly.',
      ],
      'Seluruh 4 prasyarat Time, Sweep, Displacement MSS, & Value Gap harus menyatu rapi di bawah batas risiko 1%.',
      'All four sequential criteria must align peacefully beneath fixed 1% stops.'
    ),
    {
      id: 'exam-kzn-401',
      semesterCode: 'KZN-401',
      semesterTitle: isId ? 'Blueprint Eksekusi ICT Killzones' : 'ICT Killzones Blueprint',
      reviewSlug: 'ict-judas-swing-silver-bullet-blueprint',
      prompt: `[KZN-401] ${c5.prompt}`,
      options: c5.options,
      correctIndex: c5.correctIndex,
      explanation: c5.explanation,
    },
    staticConceptQ(
      'exam-cnf-402',
      'CNF-402',
      'Konfirmasi Anti-Fakeout 3-Gerbang',
      '3-Gate Entry Confirmation',
      'three-step-confirmation-formula',
      '[CNF-402] Mengapa tusukan ekor (Wick Sweep) di tengah candle yang belum menutup dilarang dijadikan sinyal breakout, dan 3 gerbang berurutan apakah yang wajib muncul sebelum entry?',
      '[CNF-402] Why must mid-bar Wick Sweeps never trigger breakout orders, and what 3 sequential gates validate entry?',
      'Wick Sweep menandakan penyerapan order limit (Harris, 2003); entry hanya sah bila lengkap berurutan: 1. Liquidity Sweep -> 2. Body Close Displacement MSS -> 3. Retest Zona FVG/OB.',
      'Wick Sweeps show institutional limit absorption; wait strictly for sequential: 1. Liquidity Sweep -> 2. Full-Body MSS -> 3. Fair Value Gap Retest.',
      [
        'Langsung Market Order tengah candle sebelum tutup demi mendapat harga tercepat.',
        'Memakai garis RSI & Stochastic silang di jam Rollover subuh.',
        'Membeli tepat di atas puncak Equal High tanpa melihat MSS.',
      ],
      [
        'Market-ordering mid-bar before M5 closes.',
        'Crossing oscillators during 04:00 WIB Rollover.',
        'Buying directly above Equal Highs pre-MSS.',
      ],
      'Menunggu M5 Body Close + urutan Sweep -> MSS -> FVG menyaring hampir seluruh fakeout ritel.',
      'Waiting cleanly for bar close + Sweep -> MSS -> FVG eliminates premature fakeout fills.'
    ),
    staticConceptQ(
      'exam-exe-403',
      'EXE-403',
      'SOP Eksekusi Layar Kosong & SL Luar Ekor',
      'Blank-Chart SOP & Structural Stops',
      'limit-vs-market-sl-tp-execution',
      '[EXE-403] Saat meletakkan garis Stop Loss struktural di luar ujung ekor Sweep pada jarak lebih lebar (misal 50 pips vs 15 pips) dengan modal Rp160.000 (1.000 USC), bagaimana cara mengunci risiko tetap Rp1.600 (10 USC / 1%)?',
      '[EXE-403] When tucking structural Stop Loss safely past a wide sweep wick (50 pips vs 15 pips) on 1,000 USC ($10), how do you keep max risk locked at 10 USC (1%)?',
      'Tetap pertahankan SL aman di luar ekor Sweep + buffer spread, lalu kecilkan ukuran Cent Lot di MT5 via rumus (10 USC / jarak SL) sehingga rugi nominal tetap <= 10 USC.',
      'Keep the safe behind-wick SL plus spread buffer, and adjust Cent Lot downward in MT5 so dollar exposure remains <= 10 USC.',
      [
        'Paksa tarik SL super sempit 5 pips di depan badan candle agar lot tetap besar.',
        'Hapus Stop Loss lalu biarkan floating minus tanpa batas.',
        'Gandakan lot menjadi 0.50 agar cepat menyentuh Take Profit.',
      ],
      [
        'Squeeze SL tightly inside spreads just to keep large lot volumes.',
        'Disable Stop Loss altogether.',
        'Double lots randomly expecting instant bounce.',
      ],
      'Menyesuaikan ukuran Cent Lot mengikuti jarak SL struktural melindungi posisi dari guncangan noise.',
      'Scaling Cent volume proportionally around structural Stop distance avoids premature noise sweeps.'
    ),
    staticConceptQ(
      'exam-sty-404',
      'STY-404',
      'Playbook Scalping, Intraday & Swing',
      'Scalping, Intraday & Swing Playbook',
      'intraday-m15-h1-session-mastery',
      '[STY-404] Mana pembagian jarak SL & larangan yang tepat membedakan gaya Scalping M1-M5, Intraday M15-H1, dan Swing H4-Daily di JGS?',
      '[STY-404] Which SL range and integrity rule accurately contrasts JGS Scalping, Intraday, and Swing styles?',
      'Scalping (SL 20-35 pips, max 3 trade & no layer minus); Intraday (SL 45-80 pips di London/NY); Swing (SL 120-200 pips cek malam di Cent Swap-Free) serta terlarang mengubah trade minus jadi Swing paksa!',
      'Scalping uses 20-35 pip stops + no losing layers; Intraday holds 45-80 pip session SL; Swing holds 120-200 pip Swap-Free Cent SL, never morphing failed scalps into forced hope swings!',
      [
        'Scalping memakai SL 200 pips sambil membuka 15 Layer Martingale saat minus.',
        'Mengubah posisi Scalping minus tanpa SL menjadi Swing jangka panjang.',
        'Hanya boleh pakai akun Standar 100 oz pada modal Rp160.000.',
      ],
      [
        'Stacking 15 Martingale losing scalp layers calmly.',
        'Deleting scalp stops into hope swings.',
        'Using 100 oz Standard lots on Rp160,000.',
      ],
      'Hormati jarak SL sesuai horizon yang direncanakan sebelum entry tanpa berganti gaya di tengah minus.',
      'Pre-select one horizon matching your schedule and protect structural SL sizing immutably.'
    ),
    staticConceptQ(
      'exam-nws-501',
      'NWS-501',
      'Strategi Berita Makro (CPI, NFP, FOMC WIB)',
      'Macro News Protocol (CPI, NFP, FOMC)',
      'post-news-displacement-sniper',
      '[NWS-501] Menjelang rilis data CPI/NFP pukul 19:30 / 20:30 WIB, apa aturan blackout HMR & spread serta kapan waktu masuk Sniper paling sehat pasca berita?',
      '[NWS-501] Ahead of 19:30/20:30 WIB US CPI/NFP news, what defines the HMR blackout window and optimal post-news Sniper fill?',
      'Lepas tangan sejak T-15 menit s/d T+5 menit akibat pelebaran spread (Glosten & Milgrom) & pangkas leverage HMR; baru cari Displacement FVG searah hasil Aktual 5-15 menit sesudah spread pulih normal.',
      'Hold off orders from T-15m to T+5m guarding against Glosten-Milgrom wide spreads and HMR leverage caps; enter aligned post-news FVG displacements 5-15m later once spreads calm.',
      [
        'Pasang perangkap Buy Stop + Sell Stop mepet tepat jam 19:29 WIB berharap untung ganda.',
        'Klik Market Buy 2 detik sebelum pengumuman angka keluar.',
        'Menutup akun selamanya setiap hari Jumat.',
      ],
      [
        'Arm tight 10-pip straddle traps right at 19:29 WIB.',
        'Click blindly 2 seconds before Actual prints.',
        'Delete MT5 every Friday.',
      ],
      'Kesabaran 10 menit pasca rilis memberi kepastian arah makro sekaligus menghindari slippage ekstrem.',
      'Waiting cleanly 5-15 minutes avoids release-second slippage and exploits genuine macro follow-through.'
    ),
    staticConceptQ(
      'exam-mkt-502',
      'MKT-502',
      'Taktik Multi-Pair Akun Rp160 Ribu (1.000 USC)',
      'Multi-Pair Cent Playbook',
      'gold-cent-vs-silver-50x-trap',
      '[MKT-502] Jebakan spesifikasi kontrak apakah yang membuat pemula modal Rp160.000 sering terbakar cepat di XAGUSDc (Perak) atau pair Yen vs XAUUSDc (Emas)?',
      '[MKT-502] What hidden MT5 Specification pitfall traps $10 beginners shifting casually from XAUUSDc onto XAGUSDc Silver or Yen crosses?',
      'Tidak mengecek MT5 Specification: XAGUSDc kerap bernilai 50 oz per Cent Lot (50x lebih berat dari 1 oz XAUUSDc), pair JPY berskala pip 0.01, dan pair searah USD menggandakan risiko.',
      'Skipping MT5 Specification checks: Silver XAGUSDc frequently embeds 50 oz per Cent Lot (50x Gold weight), JPY uses 0.01 pips, and correlated pairs double USD bets silently.',
      [
        'Karena Perak harganya lebih murah ($30) sehingga otomatis lebih aman tanpa cek Specification.',
        'Karena USTEC tenang dan membeku saat Wall Street buka jam 20:30/21:30 WIB.',
        'Karena GBPJPY selalu memakai pip di desimal keempat sama persis seperti EURUSD.',
      ],
      [
        'Cheaper $30 Silver quotes reduce dollar exposure automatically.',
        'USTEC freezes completely during New York cash openings.',
        'JPY crosses place pips cleanly at the 4th decimal like EURUSD.',
      ],
      'Selalu audit Contract Size, desimal pip, dan korelasi USD sebelum menekan tombol order di aset baru.',
      'Always verify broker Contract Size, decimals, and USD exposure prior to trading unfamiliar assets.'
    ),
    staticConceptQ(
      'exam-cot-503',
      'COT-503',
      'Fundamental Makro, CFTC COT & Triad Fusion',
      'Macro Policy, CFTC COT & Triad Fusion',
      'cftc-cot-vs-retail-sentiment',
      '[COT-503] Laporan mingguan pemerintah AS (CFTC COT) mencatat Hedge Fund terus menambah Net Long Emas secara signifikan, sementara 75% akun ritel menumpuk posisi Sell. Keputusan Triad JGS terbaik adalah:',
      '[COT-503] US CFTC COT data reports Large Hedge Funds adding sharply to Gold Net Longs while 75% of retail crowds hold losing Shorts. What executes cleanly under JGS Triad fusion?',
      'Mengakui adanya Divergence Kontrarian (75% Ritel berpotensi kena Short Squeeze), lalu menunggu Sweep koreksi bawah + Bullish MSS + FVG di Killzone untuk Buy searah institusi (risiko tetap 1%).',
      'Flag overcrowded retail Shorts risking a Squeeze, align macro/COT bullishly, and trigger strictly on confirmed Killzone Liquidity Sweep + Bullish MSS + FVG Buy entries at 1% risk.',
      [
        'Ikut berdesakan menumpuk Sell bersama 75% kerumunan ritel.',
        'Langsung All-In Buy risiko 50% saldo tanpa Stop Loss karena COT sudah sepakat.',
        'Menghapus seluruh grafik teknikal karena COT dipakai untuk scalping 10 detik.',
      ],
      [
        'Join the 75% retail herd selling into institutional accumulation.',
        'Go All-In 50% balance Long with zero Stop Loss.',
        'Replace charts permanently using weekly COT figures for 10-second scalping.',
      ],
      'Fusi Triad menyatukan alasan Makro + aliran COT + timing 3-Gerbang di bawah proteksi permanen 1% saldo.',
      'Institutional Triad unites Macro Drivers, COT institutional direction, and 3-Gate timing beneath strict 1% risk caps.'
    ),
    {
      id: 'exam-qnt-504',
      semesterCode: 'QNT-504',
      semesterTitle: isId ? 'Quant Finance, EA & HWM' : 'Quant Finance, EA & HWM',
      reviewSlug: 'transparent-copy-trading-hwm-architecture',
      prompt: `[QNT-504] ${q12.prompt}`,
      options: q12.options,
      correctIndex: q12.correctIndex,
      explanation: q12.explanation,
    },
    staticConceptQ(
      'exam-cmp-505',
      'CMP-505',
      'Compounding Modal Kecil & Audit Kalender PnL',
      'Micro Compounding & PnL Calendar Audit',
      'visual-pnl-calendar-audit-sop',
      '[CMP-505] Pada peta perkembangan Rp160.000 menuju Rp10 Juta dan penggunaan Kalender Jurnal PnL (`/journal`), hal apakah yang membuktikan trader siap memperbesar lot secara sehat?',
      '[CMP-505] Across micro scaling (Rp160k -> Rp10M) and Visual PnL Calendar auditing (/journal), what proves readiness to scale position weights safely?',
      'Mencatatkan pertumbuhan saldo nyata melewati sampel 50+ trade dengan Skor Disiplin SOP Kalender >= 85% lalu menyesuaikan lot secara proporsional di batas risiko konstan 1% (Fractional Kelly).',
      'Proving sustained net growth across 50+ logged Calendar trades keeping SOP Discipline >= 85%, then scaling Fractional Kelly 1% position sizes organically.',
      [
        'Menang beruntung satu kali pakai 100% All-In berlabel FOMO.',
        'Meninggalkan pencatatan jurnal agar tidak terbebani kesalahan.',
        'Menaikkan lot 5x lipat tepat sesudah mengalami 3 hari berturut-turut merah.',
      ],
      [
        'One lucky 100% FOMO gamble.',
        'Stopping all trade audits permanently.',
        'Multiplying lots 5x after three consecutive red calendar days.',
      ],
      'Integritas proses + matematika 1% konstan membawa pertumbuhan modal paling tahan uji waktu.',
      'Verified Calendar discipline paired with fixed 1% Kelly scaling yields resilient real-world growth.'
    ),
  ];
}
