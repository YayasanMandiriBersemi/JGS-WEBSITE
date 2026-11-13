/** Strip accidental em-dashes, double hyphens, and leaked meta-text cleanly before render. */
export function sanitizeHumanText(input: string | null | undefined): string {
  if (!input) return '';
  return input
    .replace(/\s*\u2014\s*/g, ', ')
    .replace(/\u2014/g, ', ')
    .replace(/\(\s*Zero AI Slop\s*\)/gi, '')
    .replace(/Zero AI Slop/gi, '')
    .replace(/\bAkar Rumput\b/gi, 'Dari Ritel ke Institusional')
    .replace(/\s+,\s+/g, ', ')
    .trim();
}

export const cleanText = sanitizeHumanText;
