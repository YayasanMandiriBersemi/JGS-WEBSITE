export const DEFAULT_FALLBACK_USD_IDR = 16250;

export function formatIdrNumber(amountIdr: number): string {
  if (!Number.isFinite(amountIdr)) return 'Rp0';
  const rounded = Math.round(amountIdr);
  const absFormatted = Math.abs(rounded).toLocaleString('id-ID');
  return rounded < 0 ? `-Rp${absFormatted}` : `Rp${absFormatted}`;
}

export function formatUsdToIdr(usdAmount: number, usdIdrRate: number): string {
  const rate = Number.isFinite(usdIdrRate) && usdIdrRate > 1000 ? usdIdrRate : DEFAULT_FALLBACK_USD_IDR;
  return formatIdrNumber(usdAmount * rate);
}

export function formatUscToIdr(uscAmount: number, usdIdrRate: number): string {
  return formatUsdToIdr(uscAmount / 100, usdIdrRate);
}

const TOKEN_TO_USD: Array<[RegExp, number]> = [
  [/Rp\s?320[.,]000\b/g, 20],
  [/Rp\s?240[.,]000\b/g, 15],
  [/Rp\s?160[.,]000\b/g, 10],
  [/Rp\s?160\s?[Rr]ibu\b/g, 10],
  [/Rp\s?160rb\b/gi, 10],
  [/Rp\s?160k\b/gi, 10],
  [/Rp\s?80[.,]000\b/g, 5],
  [/Rp\s?11[.,]200\b/g, 0.7],
  [/Rp\s?9[.,]600\b/g, 0.6],
  [/Rp\s?8[.,]800\b/g, 0.55],
  [/Rp\s?7[.,]200\b/g, 0.45],
  [/Rp\s?6[.,]400\b/g, 0.4],
  [/Rp\s?5[.,]760\b/g, 0.36],
  [/Rp\s?4[.,]800\b/g, 0.3],
  [/Rp\s?4[.,]480\b/g, 0.28],
  [/Rp\s?3[.,]840\b/g, 0.24],
  [/Rp\s?3[.,]360\b/g, 0.21],
  [/Rp\s?3[.,]200\b/g, 0.2],
  [/Rp\s?2[.,]800\b/g, 0.175],
  [/Rp\s?1[.,]920\b/g, 0.12],
  [/Rp\s?1[.,]600\b/g, 0.1],
  [/Rp\s?1[.,]280\b/g, 0.08],
  [/Rp\s?1[.,]200\b/g, 0.075],
  [/Rp\s?1[.,]120\b/g, 0.07],
  [/Rp\s?1[.,]100\b/g, 0.07],
];

/**
 * Dynamically replaces static Rp160.000 / Rp1.600 educational capital benchmarks
 * in lesson prose, analogies, and exams with exact live USD/IDR conversions.
 */
export function injectLiveIdrRates(text: string, usdIdrRate: number): string {
  if (!text) return text;
  const rate = Number.isFinite(usdIdrRate) && usdIdrRate > 1000 ? usdIdrRate : DEFAULT_FALLBACK_USD_IDR;
  let result = text;
  for (const [pattern, usdVal] of TOKEN_TO_USD) {
    result = result.replace(pattern, () => formatUsdToIdr(usdVal, rate));
  }
  if (/inflasi 5%/i.test(text)) {
    result = result.replace(/Rp\s?8[.,]000\b/g, () => formatUsdToIdr(0.5, rate));
  }
  return result;
}
