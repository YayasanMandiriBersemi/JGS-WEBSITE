import { JgsBeltRank } from '@/lib/storage/jgs-local-store';

export interface GangCardExportOptions {
  fullName: string;
  gangId: string;
  beltRank: JgsBeltRank;
  beltBadgeText: string;
  division?: string;
  variant?: 'dark' | 'light';
}

export interface TradingConstitutionExportOptions {
  fullName: string;
  gangId: string;
  startingCapitalLabel: string;
  maxRiskPerTradeLabel: string;
  maxDailyLossesLabel: string;
  mandatorySetupRule: string;
  isId: boolean;
}

export interface GraduationDiplomaExportOptions {
  recipientName: string;
  gangId: string;
  scorePercent: number;
  gradeLabel: string;
  diplomaNumber: string;
  issuedDate: string;
  isId: boolean;
}

export interface AcademicTranscriptExportOptions {
  recipientName: string;
  gangId: string;
  gpa: number;
  honorsLabel: string;
  transcriptSerial: string;
  issuedDate: string;
  semesterGrades: {
    code: string;
    title: string;
    sks: number;
    scorePercent: number;
    letterGrade: string;
  }[];
  isId: boolean;
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: CanvasTextAlign = 'left'
): number {
  ctx.textAlign = align;
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function fitFontToWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  startSizePx: number,
  minSizePx: number,
  fontWeight: string,
  fontFamily: string,
  maxWidth: number
): number {
  let size = startSizePx;
  while (size > minSizePx) {
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }
    size -= 2;
  }
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  return size;
}

function drawVectorCrown(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string
): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-14, 10);
  ctx.lineTo(-16, -6);
  ctx.lineTo(-7, 2);
  ctx.lineTo(0, -12);
  ctx.lineTo(7, 2);
  ctx.lineTo(16, -6);
  ctx.lineTo(14, 10);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(-14, 12, 28, 3);
  ctx.restore();
}

export function downloadGangIdCardPng(options: GangCardExportOptions): void {
  if (typeof document === 'undefined') return;
  const {
    fullName,
    gangId,
    beltRank,
    beltBadgeText,
    division = '1,000 USC MICRO-CAPITAL STRATEGIST',
    variant = 'dark'
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const isLight = variant === 'light';
  const bgPrimary = isLight ? '#F6F3EC' : '#0E0B14';
  const textPrimary = isLight ? '#17131D' : '#F3EFF8';
  const textSecondary = isLight ? '#574E63' : '#B8AFC7';
  const goldAccent = isLight ? '#9A6B13' : '#D6A937';
  const purpleAccent = isLight ? '#6B46A8' : '#B99AE8';

  ctx.fillStyle = bgPrimary;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createRadialGradient(540, 280, 40, 540, 460, 680);
  grad.addColorStop(0, isLight ? 'rgba(154, 107, 19, 0.14)' : 'rgba(214, 169, 55, 0.22)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Luxury Metallic Centurion Surface Fill
  const cardGrad = ctx.createLinearGradient(70, 90, 1010, 1260);
  if (isLight) {
    cardGrad.addColorStop(0, '#FFFFFF');
    cardGrad.addColorStop(0.55, '#F9F6EF');
    cardGrad.addColorStop(1, '#EFE6D0');
  } else {
    cardGrad.addColorStop(0, '#1B1526');
    cardGrad.addColorStop(0.5, '#0F0C16');
    cardGrad.addColorStop(1, '#231A33');
  }

  ctx.fillStyle = cardGrad;
  ctx.strokeStyle = goldAccent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(70, 90, 940, 1170, 36);
  ctx.fill();
  ctx.stroke();

  // Subtle Gold Micro-Grid Guilloche Texture Clipped Inside Card
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(70, 90, 940, 1170, 36);
  ctx.clip();
  ctx.strokeStyle = isLight ? 'rgba(154, 107, 19, 0.06)' : 'rgba(214, 169, 55, 0.065)';
  ctx.lineWidth = 1;
  for (let gx = 90; gx <= 1000; gx += 48) {
    ctx.beginPath();
    ctx.moveTo(gx, 90);
    ctx.lineTo(gx, 1260);
    ctx.stroke();
  }
  for (let gy = 110; gy <= 1250; gy += 48) {
    ctx.beginPath();
    ctx.moveTo(70, gy);
    ctx.lineTo(1010, gy);
    ctx.stroke();
  }
  ctx.restore();

  // Inner Double Hairline Frame (Centurion Border Detail)
  ctx.strokeStyle = isLight ? 'rgba(154, 107, 19, 0.25)' : 'rgba(214, 169, 55, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(102, 122, 876, 1106, 24);
  ctx.stroke();

  // Top Header Text + Circular Crown Seal
  ctx.textAlign = 'left';
  ctx.fillStyle = goldAccent;
  fitFontToWidth(
    ctx,
    'OFFICIAL MEMBER OF THE JEY GANG',
    24,
    18,
    'bold',
    '"Space Grotesk", sans-serif',
    660
  );
  ctx.fillText('OFFICIAL MEMBER OF THE JEY GANG', 140, 188);

  ctx.fillStyle = textSecondary;
  fitFontToWidth(
    ctx,
    'THE JEY GANG STRATEGIST • Precision Over Promises.',
    21,
    15,
    'italic',
    'Georgia, serif',
    660
  );
  ctx.fillText('THE JEY GANG STRATEGIST • Precision Over Promises.', 140, 224);

  // Circular Crown Seal (Top Right, Vector Crown Emblem)
  ctx.save();
  ctx.beginPath();
  ctx.arc(892, 196, 44, 0, Math.PI * 2);
  ctx.fillStyle = isLight ? '#EFE6D0' : '#17131D';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = goldAccent;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(892, 196, 36, 0, Math.PI * 2);
  ctx.lineWidth = 1;
  ctx.stroke();
  drawVectorCrown(ctx, 892, 196, 1.05, goldAccent);
  ctx.restore();
  ctx.textAlign = 'left';

  // Gold Metallic EMV Chip Vector (Right below divider on left)
  const chipGrad = ctx.createLinearGradient(140, 286, 242, 360);
  chipGrad.addColorStop(0, '#F3E5AB');
  chipGrad.addColorStop(0.5, '#D6A937');
  chipGrad.addColorStop(1, '#9A6B13');
  ctx.fillStyle = chipGrad;
  ctx.strokeStyle = isLight ? '#7A5410' : '#F3E5AB';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(140, 286, 102, 74, 14);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = 'rgba(23, 19, 29, 0.35)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(140, 311);
  ctx.lineTo(176, 311);
  ctx.moveTo(140, 335);
  ctx.lineTo(176, 335);
  ctx.moveTo(206, 311);
  ctx.lineTo(242, 311);
  ctx.moveTo(206, 335);
  ctx.lineTo(242, 335);
  ctx.stroke();
  ctx.strokeRect(176, 296, 30, 54);

  // Dynamic Width Belt Badge Pill (positioned cleanly next to EMV chip, NEVER clips!)
  const beltColor =
    beltRank === 'BLACK' || beltRank === 'GOLD'
      ? goldAccent
      : beltRank === 'PURPLE'
      ? purpleAccent
      : textPrimary;
  const pillText = `● ${beltBadgeText}`;
  fitFontToWidth(ctx, pillText, 20, 14, 'bold', 'monospace', 605);
  const measuredPillTextW = ctx.measureText(pillText).width;
  const pillWidth = Math.min(672, Math.max(300, Math.ceil(measuredPillTextW) + 56));

  ctx.fillStyle = isLight ? '#EFE6D0' : '#17131D';
  ctx.strokeStyle = beltColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(268, 295, pillWidth, 56, 28);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = beltColor;
  ctx.fillText(pillText, 296, 330);

  // Divider Line
  ctx.strokeStyle = isLight ? '#E2D9C5' : 'rgba(214, 169, 55, 0.22)';
  ctx.beginPath();
  ctx.moveTo(140, 388);
  ctx.lineTo(940, 388);
  ctx.stroke();

  // Main Statement: "[Full Name] is a part of the jey gang"
  ctx.fillStyle = textPrimary;
  ctx.font = 'bold 54px "Space Grotesk", sans-serif';
  const statementText = `${fullName.trim() || 'Asep Garpit'} is a part of the jey gang`;
  const nextY = drawWrappedText(ctx, statementText, 140, 480, 800, 70);

  // Sub-Statement
  ctx.fillStyle = goldAccent;
  fitFontToWidth(
    ctx,
    '“Here’s where strategist champions are made.”',
    34,
    24,
    'italic',
    'Georgia, serif',
    800
  );
  ctx.fillText('“Here’s where strategist champions are made.”', 140, nextY + 34);

  // Metadata Box
  const metaTop = 760;
  ctx.fillStyle = isLight ? '#FFFFFF' : '#120D1A';
  ctx.strokeStyle = isLight ? '#D9CEB8' : 'rgba(214, 169, 55, 0.42)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(140, metaTop, 800, 325, 22);
  ctx.fill();
  ctx.stroke();

  // Left Metadata Column
  ctx.font = 'bold 19px monospace';
  ctx.fillStyle = textSecondary;
  ctx.fillText('GANG MEMBER ID', 180, metaTop + 62);
  ctx.fillStyle = goldAccent;
  const formattedGangId = `GANG MEMBER ID: #${gangId}`;
  fitFontToWidth(ctx, formattedGangId, 26, 17, 'bold', 'monospace', 345);
  ctx.fillText(formattedGangId, 180, metaTop + 106);

  // Right Metadata Column (Wrapped cleanly within 355px)
  ctx.font = 'bold 19px monospace';
  ctx.fillStyle = textSecondary;
  ctx.fillText('MYTHOLOGICAL RANK', 550, metaTop + 62);
  ctx.fillStyle = textPrimary;
  fitFontToWidth(ctx, beltBadgeText, 22, 15, 'bold', 'monospace', 355);
  drawWrappedText(ctx, beltBadgeText, 550, metaTop + 102, 355, 28);

  // Horizontal Separator inside Metadata Box
  ctx.strokeStyle = isLight ? '#E2D9C5' : 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(180, metaTop + 170);
  ctx.lineTo(900, metaTop + 170);
  ctx.stroke();

  ctx.font = 'bold 19px monospace';
  ctx.fillStyle = textSecondary;
  ctx.fillText('STRATEGIST DIVISION', 180, metaTop + 216);
  ctx.fillStyle = textPrimary;
  fitFontToWidth(ctx, division, 26, 18, 'bold', '"Space Grotesk", sans-serif', 720);
  ctx.fillText(division, 180, metaTop + 260);

  // Footer Seal
  ctx.fillStyle = textSecondary;
  fitFontToWidth(
    ctx,
    'OFFICIAL MEMBER OF THE JEY GANG • PRECISION OVER PROMISES',
    19,
    14,
    'normal',
    'monospace',
    800
  );
  ctx.fillText('OFFICIAL MEMBER OF THE JEY GANG • PRECISION OVER PROMISES', 140, 1170);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const safeName = (fullName || 'strategist').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.download = `jgs-gang-member-id-${safeName}-${gangId}.png`;
  link.href = dataUrl;
  link.click();
}

export function downloadTradingConstitutionPng(options: TradingConstitutionExportOptions): void {
  if (typeof document === 'undefined') return;
  const {
    fullName,
    gangId,
    startingCapitalLabel,
    maxRiskPerTradeLabel,
    maxDailyLossesLabel,
    mandatorySetupRule,
    isId
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#17131D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#211B2A';
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(64, 80, 952, 1760, 36);
  ctx.fill();
  ctx.stroke();

  // Header
  ctx.textAlign = 'left';
  drawVectorCrown(ctx, 134, 157, 0.72, '#D6A937');
  ctx.fillStyle = '#D6A937';
  fitFontToWidth(
    ctx,
    'THE JEY GANG STRATEGIST // PERSONAL RISK CONSTITUTION',
    24,
    16,
    'bold',
    'monospace',
    800
  );
  ctx.fillText('THE JEY GANG STRATEGIST // PERSONAL RISK CONSTITUTION', 158, 165);

  const mainTitle = isId ? 'KONSTITUSI DISIPLIN TRADING SAYA' : 'MY $10 TRADING CONSTITUTION';
  ctx.fillStyle = '#F3EFF8';
  fitFontToWidth(ctx, mainTitle, 52, 34, 'bold', '"Space Grotesk", sans-serif', 840);
  ctx.fillText(mainTitle, 120, 238);

  const quoteLine = '“Mulai dari paham. Bukan dari modal. Small Capital. Serious Strategy.”';
  ctx.fillStyle = '#B8AFC7';
  fitFontToWidth(ctx, quoteLine, 26, 18, 'italic', 'Georgia, serif', 840);
  ctx.fillText(quoteLine, 120, 288);

  const rules = [
    {
      num: 'PASAL 01 // MODAL & KONTRAK',
      title: isId ? 'Modal Mikro & Spesifikasi Simbol' : 'Micro Capital & Contract Spec',
      value: startingCapitalLabel
    },
    {
      num: 'PASAL 02 // BATAS RISIKO & SESI KILLZONE',
      title: isId ? 'Jendela Waktu & Risiko Maksimum' : 'Execution Window & Max Risk',
      value: maxRiskPerTradeLabel
    },
    {
      num: 'PASAL 03 // REM DARURAT HARIAN (CIRCUIT BREAKER)',
      title: isId ? 'Batas Loss Harian Wajib Tutup MT5' : 'Daily Loss Lockout Rule',
      value: maxDailyLossesLabel
    },
    {
      num: 'PASAL 04 // KONFIRMASI EKSEKUSI WAJIB (ICT / SMC)',
      title: isId ? 'Syarat Mutlak Sebelum Klik Buy/Sell' : 'Mandatory Pre-Entry Checklist',
      value: mandatorySetupRule
    }
  ];

  let yCursor = 355;
  for (const r of rules) {
    ctx.fillStyle = '#17131D';
    ctx.strokeStyle = 'rgba(214, 169, 55, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(120, yCursor, 840, 265, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#D6A937';
    fitFontToWidth(ctx, r.num, 20, 15, 'bold', 'monospace', 760);
    ctx.fillText(r.num, 160, yCursor + 50);

    ctx.fillStyle = '#B8AFC7';
    fitFontToWidth(ctx, r.title, 24, 18, 'normal', '"Space Grotesk", sans-serif', 760);
    ctx.fillText(r.title, 160, yCursor + 90);

    ctx.fillStyle = '#F3EFF8';
    ctx.font = 'bold 28px "Space Grotesk", sans-serif';
    drawWrappedText(ctx, r.value, 160, yCursor + 144, 760, 40);

    yCursor += 298;
  }

  // Signature Footer Box
  ctx.fillStyle = '#17131D';
  ctx.strokeStyle = '#B99AE8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(120, 1565, 840, 215, 22);
  ctx.fill();
  ctx.stroke();

  const memberLine = `${fullName.trim() || 'Asep Garpit'} is a part of the jey gang`;
  ctx.fillStyle = '#F3EFF8';
  fitFontToWidth(ctx, memberLine, 30, 20, 'bold', '"Space Grotesk", sans-serif', 760);
  ctx.fillText(memberLine, 160, 1628);

  ctx.fillStyle = '#D6A937';
  ctx.font = 'italic 24px Georgia, serif';
  ctx.fillText('“Here’s where strategist champions are made.”', 160, 1672);

  const footerMeta = `GANG MEMBER ID: #${gangId} • SIGNED UNDER JGS RISK CHARTER`;
  ctx.fillStyle = '#B99AE8';
  fitFontToWidth(ctx, footerMeta, 21, 14, 'bold', 'monospace', 760);
  ctx.fillText(footerMeta, 160, 1732);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `jgs-trading-constitution-${gangId}.png`;
  link.href = dataUrl;
  link.click();
}

export function downloadGraduationDiplomaPng(options: GraduationDiplomaExportOptions): void {
  if (typeof document === 'undefined') return;
  const {
    recipientName,
    gangId,
    scorePercent,
    gradeLabel,
    diplomaNumber,
    issuedDate,
    isId
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Prestigious Obsidian Midnight Plum & Burnished Gold Certificate Palette
  ctx.fillStyle = '#14101A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle Radial Illumination Behind Emblem & Seal
  const radial = ctx.createRadialGradient(960, 620, 80, 960, 620, 960);
  radial.addColorStop(0, 'rgba(214, 169, 55, 0.14)');
  radial.addColorStop(0.55, 'rgba(126, 34, 206, 0.08)');
  radial.addColorStop(1, 'rgba(20, 16, 26, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Double Gold Filigree Outer Borders
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 6;
  ctx.strokeRect(56, 56, 1808, 1238);

  ctx.strokeStyle = 'rgba(243, 229, 171, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(82, 82, 1756, 1186);

  // Ornamental Corner Accents
  const corners: [number, number, number, number][] = [
    [56, 56, 1, 1],
    [1864, 56, -1, 1],
    [56, 1294, 1, -1],
    [1864, 1294, -1, -1]
  ];
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 4;
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * 52);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx + dx * 52, cy);
    ctx.stroke();
  }

  // Top Header, Crowned JGS Gold Sigil & Academy Title
  ctx.textAlign = 'center';
  drawVectorCrown(ctx, 960, 140, 1.35, '#D6A937');

  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#F3E5AB';
  ctx.fillText('THE JEY GANG STRATEGIST ACADEMY', 960, 202);

  const mainHeading = isId
    ? 'IJAZAH KELULUSAN & SERTIFIKAT KOMPETENSI STRATEGI TRADING'
    : 'OFFICIAL DIPLOMA OF MARKET LITERACY & RISK MASTERY';
  ctx.fillStyle = '#FFFFFF';
  fitFontToWidth(ctx, mainHeading, 44, 28, 'bold', '"Space Grotesk", sans-serif', 1560);
  ctx.fillText(mainHeading, 960, 266);

  const subHeading = isId
    ? 'THE JEY GANG STRATEGIST // 20 SEMESTER • 60 MODUL • 120 SKS LULUS RESMI'
    : 'THE JEY GANG STRATEGIST // 20 SEMESTERS • 60 MODULES • 120 CREDITS GRADUATE';
  ctx.fillStyle = '#B8AFC7';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(subHeading, 960, 306);

  // Hairline Gold Divider
  ctx.strokeStyle = 'rgba(214, 169, 55, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(460, 342);
  ctx.lineTo(1460, 342);
  ctx.stroke();

  // Presented To Text
  ctx.fillStyle = '#D6A937';
  ctx.font = 'italic 28px Georgia, serif';
  ctx.fillText(
    isId ? 'Dengan bangga menganugerahkan sertifikat kompetensi ini kepada:' : 'This Official Diploma is proudly presented to:',
    960,
    402
  );

  // Recipient Name (Centered & Auto-fitted)
  const cleanName = recipientName.trim() || 'Asep Garpit';
  ctx.fillStyle = '#F3E5AB';
  fitFontToWidth(ctx, cleanName, 76, 42, 'bold', 'Georgia, serif', 1480);
  ctx.fillText(cleanName, 960, 492);

  // Recipient Underline + Gang Member ID
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(520, 520);
  ctx.lineTo(1400, 520);
  ctx.stroke();

  ctx.fillStyle = '#B99AE8';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(`GANG MEMBER ID: #${gangId} • PART OF THE JEY GANG COLLECTIVE`, 960, 560);

  // Accountability Statement
  const statement = isId
    ? 'Diberikan sebagai bukti kelulusan resmi dan pertanggungjawaban ilmu penuh setelah menuntaskan seluruh 20 Semester (60 Modul Kuliah • 120 SKS) JGS Academy Dari Ritel ke Institusional serta lulus Ujian Dinamis & Ujian Esai Analitis dalam Makroekonomi, Mikrostruktur & MT5, Risiko Modal Mikro 1.000 USC, Wyckoff, Volume Profile, ICT/SMC, Konfirmasi Entry, Gaya Scalping/Intraday/Swing, Berita Makro, COT Institusi, Quant EA, & Compounding Modal Kecil.'
    : 'Awarded in recognition of verified mastery upon completing all 20 Semesters (60 Modules • 120 Credits) of the JGS Academy Financial & Quantitative Encyclopedia (From Retail Foundations to Institutional Precision) and passing the Dynamic & Analytical Essay Examination spanning Macroeconomics, Microstructure & MT5, 1,000 USC Risk Physics, Wyckoff, ICT/SMC, Entry Confirmation, Multi-Style Execution, Macro News, COT Flows, MQL5, & Micro Compounding.';
  ctx.fillStyle = '#F3EFF8';
  ctx.font = '26px "Space Grotesk", sans-serif';
  const afterStatementY = drawWrappedText(ctx, statement, 960, 635, 1380, 40, 'center');

  // Dynamic Exam Score & Grade Pill (zero overflow guaranteed)
  const scorePillLabel = `SKOR KELULUSAN: ${scorePercent}/100 • PREDIKAT: ${gradeLabel} • ${diplomaNumber}`;
  fitFontToWidth(ctx, scorePillLabel, 21, 14, 'bold', 'monospace', 1420);
  const pillW = Math.min(1500, Math.ceil(ctx.measureText(scorePillLabel).width) + 84);
  const pillY = Math.max(afterStatementY + 28, 790);

  ctx.fillStyle = '#211B2A';
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(960 - pillW / 2, pillY, pillW, 58, 29);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#D6A937';
  ctx.textAlign = 'center';
  ctx.fillText(scorePillLabel, 960, pillY + 36);

  // Bottom Row: Left = Date & Verification, Center = Gold Wax Seal, Right = Founder Signature
  const bottomY = 1135;

  // Left: Issue Metadata
  ctx.textAlign = 'left';
  ctx.fillStyle = '#B8AFC7';
  ctx.font = 'bold 18px monospace';
  ctx.fillText(isId ? 'TANGGAL PENERBITAN' : 'DATE ISSUED', 170, bottomY - 24);
  ctx.fillStyle = '#F3EFF8';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillText(issuedDate, 170, bottomY + 14);
  ctx.fillStyle = '#D6A937';
  ctx.font = '18px monospace';
  ctx.fillText('Small Capital. Serious Strategy.', 170, bottomY + 52);

  // Center: Official Metallic Gold Wax Seal
  const sealX = 960;
  const sealY = 1095;
  // Ribbon Tails
  ctx.fillStyle = '#9A6B13';
  ctx.beginPath();
  ctx.moveTo(sealX - 36, sealY + 45);
  ctx.lineTo(sealX - 58, sealY + 135);
  ctx.lineTo(sealX - 24, sealY + 112);
  ctx.lineTo(sealX - 2, sealY + 135);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(sealX + 36, sealY + 45);
  ctx.lineTo(sealX + 2, sealY + 135);
  ctx.lineTo(sealX + 24, sealY + 112);
  ctx.lineTo(sealX + 58, sealY + 135);
  ctx.closePath();
  ctx.fill();

  // Concentric Gold Seal Disc
  const sealGrad = ctx.createRadialGradient(sealX - 20, sealY - 20, 12, sealX, sealY, 92);
  sealGrad.addColorStop(0, '#F3E5AB');
  sealGrad.addColorStop(0.65, '#D6A937');
  sealGrad.addColorStop(1, '#8C6214');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 84, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#14101A';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 70, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#14101A';
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('PRECISION OVER', sealX, sealY - 22);
  drawVectorCrown(ctx, sealX - 32, sealY + 1, 0.55, '#14101A');
  ctx.font = 'bold 26px Georgia, serif';
  ctx.fillText('JGS', sealX + 12, sealY + 10);
  ctx.font = 'bold 11px monospace';
  ctx.fillText('VERIFIED GRADUATE', sealX, sealY + 34);

  // Right: Stylized Vector Handwritten Signature of Jahseya Mochtar Mawardi
  ctx.save();
  ctx.strokeStyle = '#F3E5AB';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  // "J" Flourish & "ahseya" cursive stroke
  ctx.moveTo(1375, bottomY - 96);
  ctx.bezierCurveTo(1415, bottomY - 120, 1448, bottomY - 72, 1396, bottomY - 34);
  ctx.bezierCurveTo(1366, bottomY - 12, 1384, bottomY - 62, 1425, bottomY - 56);
  ctx.bezierCurveTo(1445, bottomY - 52, 1465, bottomY - 66, 1485, bottomY - 52);
  ctx.bezierCurveTo(1505, bottomY - 40, 1525, bottomY - 74, 1542, bottomY - 50);
  // "M. Mawardi" cursive crest
  ctx.moveTo(1556, bottomY - 46);
  ctx.bezierCurveTo(1572, bottomY - 96, 1595, bottomY - 82, 1592, bottomY - 48);
  ctx.bezierCurveTo(1602, bottomY - 82, 1626, bottomY - 76, 1628, bottomY - 46);
  ctx.bezierCurveTo(1648, bottomY - 36, 1682, bottomY - 58, 1732, bottomY - 48);
  ctx.stroke();

  // Signature Underline Flourish
  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1355, bottomY - 14);
  ctx.lineTo(1755, bottomY - 14);
  ctx.stroke();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F3E5AB';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('JAHSEYA MOCHTAR MAWARDI', 1555, bottomY + 22);

  ctx.fillStyle = '#B8AFC7';
  ctx.font = '17px "Space Grotesk", sans-serif';
  ctx.fillText('Founder & Chief Strategist, The Jey Gang Strategist', 1555, bottomY + 52);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const safeName = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.download = `jgs-academy-diploma-${safeName}-${gangId}.png`;
  link.href = dataUrl;
  link.click();
}

export function downloadAcademicTranscriptPng(options: AcademicTranscriptExportOptions): void {
  if (typeof document === 'undefined') return;
  const {
    recipientName,
    gangId,
    gpa,
    honorsLabel,
    transcriptSerial,
    issuedDate,
    semesterGrades,
    isId,
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Prestige Dark Plum University Transcript Backdrop
  ctx.fillStyle = '#120E19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#D6A937';
  ctx.lineWidth = 5;
  ctx.strokeRect(48, 48, 1824, 1254);
  ctx.strokeStyle = 'rgba(243, 229, 171, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(68, 68, 1784, 1214);

  // Header Crest & Title
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D6A937';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillText('THE JEY GANG STRATEGIST ACADEMY // OFFICE OF THE REGISTRAR', 960, 128);

  const heading = isId
    ? 'TRANSKRIP NILAI AKADEMIK RESMI (20 SEMESTER • 120 SKS)'
    : 'OFFICIAL 20-SEMESTER ACADEMIC TRANSCRIPT (120 CREDITS)';
  ctx.fillStyle = '#FFFFFF';
  fitFontToWidth(ctx, heading, 36, 22, 'bold', '"Space Grotesk", sans-serif', 1620);
  ctx.fillText(heading, 960, 182);

  // Student Summary Strip
  const cleanName = recipientName.trim() || 'JGS Graduate';
  ctx.fillStyle = '#211B2A';
  ctx.strokeStyle = 'rgba(214, 169, 55, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(108, 212, 1704, 112, 16);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#B8AFC7';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(isId ? 'NAMA MAHASISWA / ALUMNI:' : 'STUDENT NAME:', 142, 248);
  ctx.fillStyle = '#F3E5AB';
  fitFontToWidth(ctx, cleanName, 30, 20, 'bold', 'Georgia, serif', 560);
  ctx.fillText(cleanName, 142, 286);
  ctx.fillStyle = '#B99AE8';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(`GANG MEMBER ID: #${gangId} • SERIAL: ${transcriptSerial}`, 142, 312);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 28px monospace';
  ctx.fillText(`IPK / GPA: ${gpa.toFixed(2)} / 4.00`, 1776, 258);
  ctx.fillStyle = '#D6A937';
  ctx.font = 'bold 20px monospace';
  ctx.fillText(`${honorsLabel} • TOTAL: 120 SKS`, 1776, 298);

  // Two-Column 20-Semester Course Grade Table (10 Left, 10 Right)
  const leftCols = semesterGrades.slice(0, 10);
  const rightCols = semesterGrades.slice(10, 20);

  const renderHalfTable = (
    rows: AcademicTranscriptExportOptions['semesterGrades'],
    startX: number
  ) => {
    const colW = 832;
    const rowH = 69;
    const startY = 348;

    // Header bar
    ctx.fillStyle = '#282133';
    ctx.fillRect(startX, startY, colW, 42);
    ctx.fillStyle = '#D6A937';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('KODE / COURSE', startX + 16, startY + 26);
    ctx.textAlign = 'right';
    ctx.fillText('SKS • SCORE • GRADE', startX + colW - 16, startY + 26);

    rows.forEach((row, idx) => {
      const y = startY + 48 + idx * rowH;
      ctx.fillStyle = idx % 2 === 0 ? '#191321' : '#14101A';
      ctx.fillRect(startX, y, colW, rowH - 6);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(startX, y, colW, rowH - 6);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#D6A937';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(row.code, startX + 16, y + 23);

      ctx.fillStyle = '#F3EFF8';
      const titleClean = row.title.replace(/^Semester \d+\s*\([^)]+\):\s*/i, '');
      fitFontToWidth(ctx, titleClean, 14, 11, 'bold', '"Space Grotesk", sans-serif', 540);
      ctx.fillText(titleClean, startX + 16, y + 48);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#B8AFC7';
      ctx.font = '14px monospace';
      ctx.fillText(`${row.sks} SKS • ${row.scorePercent}%`, startX + colW - 88, y + 40);

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillText(row.letterGrade, startX + colW - 18, y + 42);
    });
  };

  renderHalfTable(leftCols, 108);
  renderHalfTable(rightCols, 980);

  // Bottom Seal & Jahseya Mochtar Mawardi Signature
  const bottomY = 1190;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#B8AFC7';
  ctx.font = 'bold 17px monospace';
  ctx.fillText(isId ? `DITERBITKAN: ${issuedDate}` : `DATE ISSUED: ${issuedDate}`, 120, bottomY - 12);
  ctx.fillStyle = '#D6A937';
  ctx.font = '16px monospace';
  ctx.fillText('Small Capital. Serious Strategy. • Precision Over Promises.', 120, bottomY + 22);

  // Official Center Disc
  ctx.fillStyle = '#D6A937';
  ctx.beginPath();
  ctx.arc(960, bottomY - 10, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#14101A';
  ctx.textAlign = 'center';
  drawVectorCrown(ctx, 960, bottomY - 24, 0.5, '#14101A');
  ctx.font = 'bold 20px Georgia, serif';
  ctx.fillText('JGS', 960, bottomY + 10);

  // Founder Cursive Signature Right
  ctx.save();
  ctx.strokeStyle = '#F3E5AB';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(1410, bottomY - 65);
  ctx.bezierCurveTo(1450, bottomY - 90, 1480, bottomY - 50, 1435, bottomY - 25);
  ctx.bezierCurveTo(1470, bottomY - 40, 1525, bottomY - 55, 1565, bottomY - 35);
  ctx.bezierCurveTo(1605, bottomY - 20, 1665, bottomY - 52, 1730, bottomY - 32);
  ctx.stroke();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#F3E5AB';
  ctx.font = 'bold 20px "Space Grotesk", sans-serif';
  ctx.fillText('JAHSEYA MOCHTAR MAWARDI', 1570, bottomY + 8);
  ctx.fillStyle = '#B8AFC7';
  ctx.font = '15px "Space Grotesk", sans-serif';
  ctx.fillText('Founder & Chief Strategist, The Jey Gang Strategist', 1570, bottomY + 34);

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  const safeName = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  link.download = `jgs-academy-transcript-${safeName}-${gangId}.png`;
  link.href = dataUrl;
  link.click();
}
