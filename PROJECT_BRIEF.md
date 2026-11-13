# THE JEY GANG STRATEGIST (JGS) — Canonical Project Brief & Architecture Specification

**Brand:** THE JEY GANG STRATEGIST (`JGS`)  
**Tagline:** *Small Capital. Serious Strategy.*  
**Canonical Mascot Reference:** `public/images/jey-mascot.png`

---

## 1. Complete Product Requirements Document (PRD)

### 1.1 Product Vision & Mission
**THE JEY GANG STRATEGIST (JGS)** is a micro-capital trading education, risk-engineering, and quantitative trading technology ecosystem. Its mission is to democratize institutional-grade risk management, cent-lot execution math, and algorithmic trading literacy for retail traders starting with \$10–\$100.

Retail micro-capital traders fail disproportionately because standard broker contract sizes (`100,000` currency units or `100 oz` of Gold per standard lot) force catastrophic over-leveraging at the minimum `0.01` lot threshold. JGS bridges this gap by combining:
1. **Plain-English Financial Literacy**: Zero-jargon explanations paired with toggleable technical depth.
2. **Micro-Capital Risk & Cent Engineering**: Precision tools converting USD into US Cents (`1 USD = 100 USC`) so a \$25 account operates as `2,500 USC` with true fractional 0.5%–1% risk sizing.
3. **Radical Transparency & Zero Fabrication**: An uncompromising refusal to display fake equity curves, fabricated win rates, fake testimonials, or fake user counts.

### 1.2 Target Personas
1. **Complete Beginners (\$0 Demo – \$25)**: Need guided onboarding, plain-English definitions, and safe interactive simulations without intimidating textbook jargon.
2. **Micro-Capital Traders (\$10 – \$100)**: Need the Cent Account Calculator, Risk Management Lab, and Drawdown Recovery math to stop blowing small accounts on Gold (`XAUUSD`).
3. **Forex & Gold Technicians**: Need bar-by-bar historical replay scenarios (`XAUUSD` London sweeps, `EURUSD` news whipsaws) and a structured Trader Journal that measures rule discipline (`0–100%`) alongside $R$-expectancy.
4. **MT5 & Algorithmic Trading Enthusiasts**: Need clear documentation on how Expert Advisors (`EAs`) operate, why uncapped martingale grids fail, how to configure MT5 + VPS environments, and how verified broker telemetry is audited.

### 1.3 The 7 Core Ecosystem Pillars
1. **JGS Academy** (`/academy`): 4 structured tracks, 12 interactive lessons, plain-English/technical toggle, comprehension quizzes.
2. **JGS Trading Playground** (`/playground`): Historical educational scenario simulator with bar-by-bar candlestick replay and quantitative debriefs from Jey.
3. **JGS Cent Lab** (`/calculators/cent`): USD-to-USC micro-capital conversion lab comparing Standard vs. Cent survivability on `XAUUSD` and FX pairs.
4. **JGS Quant Lab** (`/quant-lab`): MT5 Expert Advisor architecture documentation, parameter dictionaries, anti-martingale safeguards, and interactive VPS setup checklist.
5. **JGS Intelligence** (`/dictionary`): Searchable 32-term trading dictionary where every term includes a plain-English translation, technical definition, worked \$50 Cent (`5,000 USC`) example, and retail trap warning.
6. **JGS Performance Center** (`/performance`): Institutional telemetry dashboard architecture defaulting strictly to an explicit `DISCONNECTED` state until verified read-only broker telemetry is linked, plus a watermarked `EDUCATIONAL SANDBOX` mode for learning metric literacy.
7. **JGS Community** (`/community` & `/copy-trading`): Syndicate risk charter, proportional copy-trading mechanics, and interactive readiness assessment.

### 1.4 Functional Scope of Modules (A – L)
- **A. Home (`/`)**: Hero command deck, interactive Micro-Capital Reality Check slider (\$10–\$100 Standard vs. Cent), 7-Pillar ecosystem navigator, anti-hype manifesto.
- **B. Interactive Onboarding with Jey (`/onboarding`)**: 4-step diagnostic generating a personalized Strategy Dossier (recommended track, risk cap, cent sizing baseline, and first playground scenario).
- **C. Academy Learning Hub (`/academy`, `/academy/[slug]`)**: Multi-track curriculum with Plain-English vs. Technical toggle, inline glossary lookups, and quiz checkpoints.
- **D. Searchable Trading Dictionary (`/dictionary`)**: Real-time fuzzy/keyword search, category and difficulty filters, and 4-part educational breakdown cards.
- **E. Trading Playground (`/playground`)**: 4 deterministic historical scenarios with interactive SVG candlestick chart, step-by-step bar progression, position sizing choice, and Jey's mathematical post-mortem.
- **F. Cent Account Calculator (`/calculators/cent`)**: Multi-currency (`USD`, `EUR`, `GBP`, `IDR`) to `USC` converter, Standard vs. Cent lot comparison, over-risk trap detection, margin and streak survival calculator.
- **G. Risk Management Calculator (`/calculators/risk`)**: Position sizer, $R:R$ breakeven win-rate calculator, nonlinear Drawdown Recovery curve visualizer, and consecutive-loss decay simulator.
- **H. Trader Journal (`/journal`)**: Trade entry logger with pre-trade rule checklist, emotion tagging, real-time $R$-expectancy, JGS Discipline Score (`0–100%`), and CSV/JSON export.
- **I. EA & Quant Lab Documentation (`/quant-lab`)**: Tick-to-execution pipeline architecture, strategy profiles, risk parameter reference table, and interactive MT5/VPS setup checklist.
- **J. Verified Performance Dashboard Architecture (`/performance`)**: Explicit `DISCONNECTED` default telemetry banner, read-only verification pipeline architecture, fake-guru audit guide, and watermarked `EDUCATIONAL SANDBOX` mode.
- **K. Copy Trading Information Page (`/copy-trading`)**: Equity-proportional lot scaling calculator, latency/spread friction disclosure, and 5-question Copy Trading Risk Readiness assessment.
- **L. User Authentication Architecture (`/login`, `/register`, `/account`)**: Frictionless guest access with local persistence plus Strategist account sign-in, registration, risk preset management, and PostgreSQL/Prisma sync architecture.

---

## 2. Website Sitemap

- `/` — Home Command Deck & Interactive Micro-Capital Reality Check
- `/onboarding` — Interactive 4-Step Pathfinder with Jey
- `/academy` — JGS Academy Curriculum Hub (4 Tracks, 12 Lessons)
- `/academy/[slug]` — Interactive Lesson Reader + Plain-English Toggle + Quiz
- `/dictionary` — Searchable Trading & Quant Dictionary (32 Terms)
- `/playground` — Interactive Historical Scenario Replay Simulator
- `/calculators/cent` — JGS Cent Account Laboratory (`USD` vs `USC`)
- `/calculators/risk` — Position Size, $R:R$ Asymmetry & Drawdown Recovery Lab
- `/journal` — Structured Trader Journal & Discipline Analytics Engine
- `/quant-lab` — EA & Quant Lab Technical Documentation & MT5 Setup Checklist
- `/performance` — Verified Performance Center (`DISCONNECTED` Default + Educational Sandbox)
- `/copy-trading` — Copy Trading Mechanics, Proportional Sizing & Readiness Gate
- `/community` — JGS Syndicate Charter, Risk Rules & Community Channels
- `/login` — Strategist Sign In
- `/register` — Strategist Account Registration
- `/account` — Strategist Dossier, Saved Risk Presets & Data Sync Center
- `/api/telemetry/status` — Read-Only Telemetry Connection & Audit Status Endpoint

---

## 3. User Journey Flows

1. **Beginner Discovery Flow**: `/` (tests \$25 slider in Reality Check) $\rightarrow$ `/onboarding` (completes 4-step Jey diagnostic) $\rightarrow$ `/calculators/cent` (inspects `2,500 USC` sizing) $\rightarrow$ `/academy/why-small-accounts-blow-up` (reads Plain-English lesson & passes quiz).
2. **Micro-Trader Execution Loop**: `/calculators/risk` (calculates 1% risk lot size & checks drawdown recovery) $\rightarrow$ `/playground` (replays London Open Gold Sweep bar-by-bar) $\rightarrow$ `/journal` (logs trade + 4-rule discipline checklist & inspects $R$-expectancy).
3. **Quant & Verification Audit Flow**: `/quant-lab` (reviews EA tick pipeline & completes MT5 setup checklist) $\rightarrow$ `/performance` (verifies `DISCONNECTED` state & learns how read-only telemetry works) $\rightarrow$ `/copy-trading` (completes 5-question readiness assessment).

---

## 4. Design System & Design Tokens

- **Backgrounds**:
  - Midnight Plum Canvas: `#09060F`
  - Obsidian Velvet Surface 1: `#110B1C`
  - Deep Aubergine Surface 2: `#191129`
  - Elevated Surface 3: `#231838`
  - Subtle Glass: `rgba(17, 11, 28, 0.78)` with `backdrop-filter: blur(16px)`
- **Brand Accents**:
  - Metallic Crown Gold: `#D4AF37`
  - Champagne Gold Highlight: `#F3E5AB`
  - Royal Purple: `#7E22CE`
  - Mascot Lavender Accent: `#A882DD`
- **Typography**:
  - Ivory Primary: `#F7F4EE`
  - Secondary Muted Lavender-Grey: `#B8B0C8`
  - Technical Label Slate: `#7E7494`
  - Fonts: `Space Grotesk` (Display), `Plus Jakarta Sans` (Body), `JetBrains Mono` (Tabular Financial Figures)
- **Semantic Status**:
  - Disciplined / Profit: `#10B981`
  - Caution / Sandbox / Margin Alert: `#F59E0B`
  - Over-Risk / Stop-Out / Rule Breach: `#EF4444`
- **Mascot Governance**: `public/images/jey-mascot.png` is used selectively in the Home Hero framing, Onboarding Wizard, and compact "Jey's Street Rule" callouts—never as cartoon wallpaper or cluttered gimmicks.

---

## 5. Component Architecture

- `src/components/layout/` — `Navbar.tsx`, `Footer.tsx`, `TelemetryStatusBar.tsx`
- `src/components/brand/` — `JeyStrategistCallout.tsx`, `StatusBadge.tsx`
- `src/components/home/` — `MicroCapitalRealityWidget.tsx`
- `src/components/onboarding/` — `OnboardingWizard.tsx`
- `src/components/academy/` — `AcademyHub.tsx`, `LessonInteractiveView.tsx`
- `src/components/dictionary/` — `DictionaryExplorer.tsx`
- `src/components/playground/` — `PlaygroundSimulator.tsx`, `CandlestickReplayChart.tsx`
- `src/components/calculators/` — `CentLabCalculator.tsx`, `RiskManagementCalculator.tsx`
- `src/components/journal/` — `TraderJournalWorkspace.tsx`
- `src/components/quant/` — `QuantLabDocs.tsx`
- `src/components/performance/` — `PerformanceDashboard.tsx`
- `src/components/copy-trading/` — `CopyTradingGuide.tsx`
- `src/lib/math/` — `cent-calculator.ts`, `risk-engine.ts`, `journal-analytics.ts`
- `src/lib/data/` — `academy-lessons.ts`, `dictionary-terms.ts`, `playground-scenarios.ts`, `quant-docs.ts`
- `src/lib/storage/` — `jgs-local-store.ts`
- `src/lib/telemetry/` — `telemetry-provider.ts`

---

## 6. Recommended Technology Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS 3.4 + CSS Custom Properties
- **Icons**: `lucide-react`
- **Charts**: Custom deterministic SVG financial chart components (Candlestick Replay, Drawdown Recovery Curve, Sandbox Equity Curve)
- **Database & ORM**: PostgreSQL + Prisma ORM (`prisma/schema.prisma`) paired with a local-first browser repository (`jgs-local-store.ts`)
- **Testing**: Vitest unit test suite (`src/lib/math/__tests__/financial-engines.test.ts`)

---

## 7. Database Architecture Proposal

Defined in `prisma/schema.prisma` with the following core entities:
- `User` (id, email, displayName, passwordHash, role)
- `OnboardingProfile` (userId, capitalTier, experienceLevel, primaryInstrument, primaryChallenge, recommendedRiskPercent, recommendedTrackSlug)
- `AcademyProgress` (userId, lessonSlug, completed, quizScore, completedAt)
- `JournalEntry` (userId, instrument, accountType, direction, entryPrice, stopLoss, takeProfit, exitPrice, lotSize, realizedPnl, realizedRMultiple, setupTag, emotionTag, 4 rule booleans, notes, tradedAt)
- `RiskPreset` (userId, name, capitalUsd, useCentAccount, riskPercentPerTrade, dailyMaxLossPercent, defaultInstrument)
- `PerformanceAccount`, `PerformanceSnapshot`, `AuditVerificationLog` (strictly read-only telemetry models with `connectionStatus` defaulting to `DISCONNECTED`)

---

## 8. Security Considerations

1. **Zero Client Secret Exposure**: Sensitive variables (`DATABASE_URL`, `AUTH_SECRET`, `MT5_TELEMETRY_INGEST_SECRET`) are strictly server-only and never prefixed with `NEXT_PUBLIC_`.
2. **Read-Only Telemetry Isolation**: Web servers never hold master MT5 trading credentials; telemetry architecture only accepts signed read-only snapshots.
3. **Anti-Fabrication Runtime Guard**: The telemetry provider enforces `connectionStatus: 'DISCONNECTED'` by default. Any educational preview metrics require an explicit user toggle and render a high-contrast `EDUCATIONAL SANDBOX — NOT LIVE PERFORMANCE` watermark.
4. **Numeric Input Sanitization**: All financial calculators clamp inputs to safe bounds and guard against `NaN`, `Infinity`, and division by zero.
5. **HTTP Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 9. Development Phases

- **Phase 1**: Canonical Documentation (`PROJECT_BRIEF.md`, `docs/`) & Project Scaffolding
- **Phase 2**: Design Tokens, Layout Shell, Pure Financial Math Engines & Domain Datasets
- **Phase 3**: Home, Jey Interactive Onboarding, Academy Learning Hub & Trading Dictionary
- **Phase 4**: Cent Account Calculator, Risk Management Calculator, Historical Playground & Trader Journal
- **Phase 5**: EA & Quant Lab Docs, Verified Performance Center, Copy Trading, Community & Auth Flows
- **Phase 6**: Unit Testing (Vitest), TypeScript Verification, Production Build & Browser QA

---

## 10. Testing & Acceptance Criteria

1. **Mathematical Accuracy**: Unit tests verify USD-to-USC conversion (`1 USD = 100 USC`), `XAUUSD` and FX pip/point values, Standard vs. Cent `0.01` lot risk trap detection, nonlinear drawdown recovery math ($50\%$ drawdown $\rightarrow +100\%$ gain), $R:R$ breakeven win rate, and journal $R$-expectancy.
2. **Anti-Fabrication Compliance**: Zero fake stats, testimonials, or fabricated live equity curves anywhere in the codebase; `/performance` defaults to `DISCONNECTED`.
3. **Build & Type Safety**: `npm run test`, `npm run typecheck`, and `npm run build` succeed with zero errors.
