# THE JEY GANG STRATEGIST (JGS) — Complete Principal Engineering & Product Quality Audit (`JGS_PROJECT_AUDIT.md`)

**Audit Date:** 2026-11-10  
**Auditor Role:** Principal Software Engineer & Product Quality Auditor  
**Workspace:** `/Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE`  
**Audit Scope:** Full static codebase inspection, data-layer & translation audit, automated test/build execution, and headless Chrome DevTools Protocol (`CDP`) runtime verification across `24` routes and `3` viewports (`1440×900` Desktop, `768×1024` Tablet, `390×844` Mobile).  
**Code Modification Status:** **Zero source files modified during this audit.**

---

## Executive Summary

The **THE JEY GANG STRATEGIST (JGS)** platform has a strong quantitative foundation, clean TypeScript compilation (`0` errors), a passing unit test suite (`18/18` math & High-Water Mark tests), zero fabricated performance statistics, and a well-structured 6-pillar information architecture across `/id` and `/en`.

However, deep inspection of the compiled production runtime (`next build && next start`) and line-by-line review of all `63` TypeScript/React files uncovered **2 Critical (`P0`) production issues**, **5 High-Priority (`P1`) functional/localization gaps**, **6 Medium-Priority (`P2`) UX/technical issues**, and **4 Enhancement (`P3`) items** that must be addressed before public release:

1. **`[P0-01]` Production React Hydration Error (`#418`) on Localized Routes**: Mounting `LocaleProvider` in `src/app/layout.tsx` (via `headers()`/`cookies()`) while pre-rendering `src/app/[locale]/**` statically via `generateStaticParams()` causes `/en/*` page bodies to pre-render in Indonesian (`DEFAULT_LOCALE = 'id'`) at build time and re-render in English on client hydration, throwing uncaught React error `#418` in production.
2. **`[P0-02]` Missing Tailwind CSS Color Tokens Breaking Homepage Hero CTA & Accent Styling**: `EditorialHomepage.tsx` (and 3 secondary views) uses custom Tailwind classes (`bg-gold-metallic`, `text-plum-deep`, `text-gold-metallic`, `bg-plum-surface`, `text-gold-champagne`, `bg-purple-royal`, `text-ivory`) that are **not defined** in `tailwind.config.ts`. In the live browser DOM, the Homepage Hero primary `"Mulai Belajar"` / `"Start Learning"` button renders with a transparent background (`rgba(0, 0, 0, 0)`) and white text instead of solid metallic gold (`#D4AF37`) with dark plum text (`#08050E`), and the headline gold span renders in plain white.
3. **`[P1-01]` Incomplete Indonesian (`id`) Translations Across 6 Modules & Datasets**: While the Homepage, Navbar, Footer, Onboarding, Market Research (`JGS Intelligence`), EA Testing Toolkit, Copy Trading Guide, and About pages are fully bilingual, large portions of **JGS Academy** (body/case-study/quiz of 9 out of 12 lessons), **Trading Dictionary** (all 32 term definitions/examples), **Cent Lab & Position Sizing Calculator** (form labels & verdicts), **Drawdown Simulator** (form labels & tables), **Trading Playground** (all 4 scenarios & simulator controls), **Quant Lab** (pipeline stages, MQL5 parameters, and MT5 setup steps), and **Trader Journal** (form labels, validation errors, and analytics cards) remain in English when viewed on `/id/*`.

---

## Priority Classification Matrix (All Findings)

| ID | Priority | Category | Summary of Finding | Location |
| :--- | :---: | :--- | :--- | :--- |
| **`P0-01`** | **P0 — Critical** | Technical / Bilingual | React Hydration Mismatch (`Minified React error #418`) in production (`next start`) because `LocaleProvider` is in `src/app/layout.tsx` instead of `src/app/[locale]/layout.tsx` with `params.locale`, plus synchronous `localStorage` read in `CentLabCalculator.tsx` `useState` initializer. | `src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/i18n/LocaleContext.tsx`, `src/components/calculators/CentLabCalculator.tsx:163` |
| **`P0-02`** | **P0 — Critical** | UX / Visual Consistency | Undefined Tailwind color tokens (`gold-metallic`, `plum-deep`, `plum-surface`, `gold-champagne`, `purple-royal`, `ivory`) cause Homepage Hero primary CTA button to have transparent background (`rgba(0,0,0,0)`) and headline accent text to render white instead of gold. | `tailwind.config.ts`, `src/components/home/EditorialHomepage.tsx`, `src/components/about/AboutJgsView.tsx`, `src/components/research/*.tsx` |
| **`P1-01`** | **P1 — High** | Content / Bilingual | 9 of 12 Academy lessons (`2.1`–`4.3`, plus technical/case-study/quiz of `1.3`) lack Indonesian body (`plainEnglishSectionsId`, `technicalSectionsId`, `microCapitalCaseStudyId`, `quizId`) and fall back to English on `/id/academy/[slug]`. | `src/lib/data/academy-lessons.ts:365-890` |
| **`P1-02`** | **P1 — High** | Content / Bilingual | All 32 Trading Dictionary entries (`DICTIONARY_TERMS`) and `DICTIONARY_CATEGORY_LABELS` are English-only; `/id/dictionary` translates only the page header/search bar while all term definitions, examples, and retail traps render in English. | `src/lib/data/dictionary-terms.ts:32-586`, `src/components/dictionary/DictionaryExplorer.tsx` |
| **`P1-03`** | **P1 — High** | Content / Bilingual | Calculators (`CentLabCalculator.tsx` and `RiskManagementCalculator.tsx`) and math engine verdicts (`cent-calculator.ts`) translate only the top hero banner on `/id/calculators/*`; all form inputs, presets, verdicts, and tables remain in English. | `src/components/calculators/CentLabCalculator.tsx:365-1313`, `src/components/calculators/RiskManagementCalculator.tsx:67-390`, `src/lib/math/cent-calculator.ts` |
| **`P1-04`** | **P1 — High** | Content / Bilingual | `PlaygroundSimulator.tsx` and `PLAYGROUND_SCENARIOS` (4 scenarios), `QuantLabDocs.tsx` datasets (`quant-docs.ts`), `TraderJournalWorkspace.tsx` (form/analytics/validation), and lower sections of `PerformanceDashboard.tsx` (`telemetry-provider.ts`) render English content on `/id/*`. | `src/lib/data/playground-scenarios.ts`, `src/lib/data/quant-docs.ts`, `src/components/playground/PlaygroundSimulator.tsx`, `src/components/journal/TraderJournalWorkspace.tsx`, `src/lib/telemetry/telemetry-provider.ts` |
| **`P1-05`** | **P1 — High** | Architecture / Routes | Duplicate calculator routes: `/calculators/cent` and `/calculators/position-size` render `<CentLabCalculator />` with identical initial view; `/calculators/drawdown` and `/calculators/risk` render `<RiskManagementCalculator />` with identical initial view. | `src/app/[locale]/calculators/*/page.tsx` |
| **`P2-01`** | **P2 — Medium** | UX / Responsive | Tablet (`768px`) horizontal overflow (`scrollWidth = 776px`, `+8px` overflow) on `/id/quant-lab` and `/en/quant-lab` caused by `md:grid-cols-5` containing unbroken MQL5 function names (`SymbolInfoDouble(SYMBOL_TRADE_TICK_VALUE)`). | `src/components/quant/QuantLabDocs.tsx:91-110` |
| **`P2-02`** | **P2 — Medium** | Navigation / Bilingual | Unlocalized `<Link href="/journal">` in `RiskManagementCalculator.tsx` bypasses `l('/journal')`, causing an unnecessary `307` middleware redirect roundtrip. | `src/components/calculators/RiskManagementCalculator.tsx:353` |
| **`P2-03`** | **P2 — Medium** | Architecture / Database | `prisma/schema.prisma` exists (`142` lines), but `prisma` and `@prisma/client` are not installed in `package.json`, no migrations exist, and no API routes connect to PostgreSQL. Persistence is 100% browser `localStorage`. | `prisma/schema.prisma`, `package.json`, `src/lib/storage/jgs-local-store.ts` |
| **`P2-04`** | **P2 — Medium** | Technical / Assets | Missing `/public/favicon.ico` (or `src/app/icon.png`), causing a `404 Not Found` network error on `GET /favicon.ico` in browsers. | `public/`, `src/app/` |
| **`P2-05`** | **P2 — Medium** | Content / Dates | `EDUCATIONAL_SAMPLE_JOURNAL_ENTRIES` in `jgs-local-store.ts` uses future-dated timestamps (`2026-11-06` to `2026-11-09`) while `RESEARCH_ARTICLES` uses `2025-01` to `2025-02`. Sample journal entries should be clearly labeled as educational examples in both languages. | `src/lib/storage/jgs-local-store.ts:108-193` |
| **`P2-06`** | **P2 — Medium** | Technical / Tooling | `eslint` and `eslint-config-next` are not installed in `devDependencies`; `npm run lint` runs a custom regex scanner (`scripts/lint-check.mjs`) and `tsc --noEmit`, which does not check React Hooks exhaustive-deps or Next.js core-web-vitals rules. | `package.json`, `scripts/lint-check.mjs` |
| **`P3-01`** | **P3 — Enhancement** | Accessibility / Keyboard | Desktop navigation dropdown menus (`Learn`, `Trading Tools`, `Our Strategy`) in `Navbar.tsx` open only on `onMouseEnter`/`onMouseLeave` and cannot be expanded via keyboard (`Enter`/`Space`/`ArrowDown` or `:focus-within`). | `src/components/layout/Navbar.tsx:221-261` |
| **`P3-02`** | **P3 — Enhancement** | Testing Coverage | Vitest suite (`18` tests in `financial-engines.test.ts`) thoroughly covers `cent-calculator.ts`, `playground-engine.ts`, `risk-engine.ts`, `journal-analytics.ts`, and `telemetry-provider.ts`, but has `0` unit tests for `src/i18n/config.ts` (`localizePath`, `stripLocalePrefix`, `buildLocalizedMetadata`) or component rendering. | `src/lib/math/__tests__/financial-engines.test.ts` |
| **`P3-03`** | **P3 — Enhancement** | Documentation Sync | `PROJECT_BRIEF.md` and `docs/DESIGN_SYSTEM.md` still describe the pre-redesign 7-pillar navigation and list removed/merged component filenames (`TelemetryStatusBar.tsx`, `MicroCapitalRealityWidget.tsx`, `CandlestickReplayChart.tsx`). | `PROJECT_BRIEF.md`, `docs/DESIGN_SYSTEM.md` |
| **`P3-04`** | **P3 — Enhancement** | UX / Persistence | `TraderJournalWorkspace.tsx` `"Clear All"` / `"Hapus Semua"` button immediately wipes all local journal entries without a confirmation prompt or undo option. | `src/components/journal/TraderJournalWorkspace.tsx:209-213` |

---

## AUDIT 1: PROJECT STRUCTURE

### 1.1 Application Routes Inventory
The Next.js 15 App Router (`src/app/`) contains **25 localized page routes** under `src/app/[locale]/` and **1 API route** (`src/app/api/telemetry/status/route.ts`), compiling into **80 static prerendered pages** (`40` for `/id` and `40` for `/en`):

| Route Pattern | Source File | Rendered Component | Static Paths (`/id` + `/en`) | Status |
| :--- | :--- | :--- | :---: | :--- |
| `/` | [`src/middleware.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/middleware.ts) | `307 Temporary Redirect` $\rightarrow$ `/id` (or `NEXT_LOCALE` cookie) | Dynamic Middleware | Functional |
| `/[locale]` | [`src/app/[locale]/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/page.tsx) | [`EditorialHomepage`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/home/EditorialHomepage.tsx) | `2` (`/id`, `/en`) | Functional (has `P0-02` styling bug) |
| `/[locale]/learn` | [`src/app/[locale]/learn/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/learn/page.tsx) | [`LearnHubView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/about/AboutJgsView.tsx#L218-L306) | `2` | Functional |
| `/[locale]/academy` | [`src/app/[locale]/academy/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/academy/page.tsx) | [`AcademyHub`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/academy/AcademyHub.tsx) | `2` | Functional |
| `/[locale]/academy/[slug]` | [`src/app/[locale]/academy/[slug]/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/academy/[slug]/page.tsx) | [`LessonInteractiveView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/academy/LessonInteractiveView.tsx) | `24` (`12` slugs × `2`) | Partial ID translation (`P1-01`) |
| `/[locale]/dictionary` | [`src/app/[locale]/dictionary/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/dictionary/page.tsx) | [`DictionaryExplorer`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/dictionary/DictionaryExplorer.tsx) | `2` | Partial ID translation (`P1-02`) |
| `/[locale]/onboarding` | [`src/app/[locale]/onboarding/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/onboarding/page.tsx) | [`OnboardingWizard`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/onboarding/OnboardingWizard.tsx) | `2` | Functional |
| `/[locale]/tools` | [`src/app/[locale]/tools/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/tools/page.tsx) | [`TradingToolsHubView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/about/AboutJgsView.tsx#L308-L407) | `2` | Functional |
| `/[locale]/calculators/cent` | [`src/app/[locale]/calculators/cent/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/calculators/cent/page.tsx) | [`CentLabCalculator`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/CentLabCalculator.tsx) | `2` | Partial ID translation (`P1-03`) |
| `/[locale]/calculators/position-size` | [`src/app/[locale]/calculators/position-size/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/calculators/position-size/page.tsx) | [`CentLabCalculator`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/CentLabCalculator.tsx) | `2` | Duplicate view of `/calculators/cent` (`P1-05`) |
| `/[locale]/calculators/drawdown` | [`src/app/[locale]/calculators/drawdown/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/calculators/drawdown/page.tsx) | [`RiskManagementCalculator`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/RiskManagementCalculator.tsx) | `2` | Partial ID translation (`P1-03`) |
| `/[locale]/calculators/risk` | [`src/app/[locale]/calculators/risk/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/calculators/risk/page.tsx) | [`RiskManagementCalculator`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/RiskManagementCalculator.tsx) | `2` | Duplicate view of `/calculators/drawdown` (`P1-05`) |
| `/[locale]/playground` | [`src/app/[locale]/playground/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/playground/page.tsx) | [`PlaygroundSimulator`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/playground/PlaygroundSimulator.tsx) | `2` | Partial ID translation (`P1-04`) |
| `/[locale]/journal` | [`src/app/[locale]/journal/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/journal/page.tsx) | [`TraderJournalWorkspace`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/journal/TraderJournalWorkspace.tsx) | `2` | Partial ID translation (`P1-04`) |
| `/[locale]/research` | [`src/app/[locale]/research/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/research/page.tsx) | [`MarketResearchHub`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/research/MarketResearchHub.tsx) | `2` | Complete & Bilingual |
| `/[locale]/research/[slug]` | [`src/app/[locale]/research/[slug]/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/research/[slug]/page.tsx) | [`ResearchArticleView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/research/ResearchArticleView.tsx) | `6` (`3` slugs × `2`) | Complete & Bilingual |
| `/[locale]/strategy` | [`src/app/[locale]/strategy/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/strategy/page.tsx) | [`OurStrategyHubView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/about/AboutJgsView.tsx#L409-L492) | `2` | Complete & Bilingual |
| `/[locale]/quant-lab` | [`src/app/[locale]/quant-lab/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/quant-lab/page.tsx) | [`QuantLabDocs`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/quant/QuantLabDocs.tsx) | `2` | Partial ID translation (`P1-04`) & Tablet overflow (`P2-01`) |
| `/[locale]/ea-testing` | [`src/app/[locale]/ea-testing/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/ea-testing/page.tsx) | [`EaTestingToolkit`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/quant/EaTestingToolkit.tsx) | `2` | Complete & Bilingual |
| `/[locale]/copy-trading` | [`src/app/[locale]/copy-trading/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/copy-trading/page.tsx) | [`CopyTradingGuide`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/copy-trading/CopyTradingGuide.tsx) | `2` | Complete & Bilingual |
| `/[locale]/performance` | [`src/app/[locale]/performance/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/performance/page.tsx) | [`PerformanceDashboard`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/performance/PerformanceDashboard.tsx) | `2` | Lower metric cards English-only (`P1-04`) |
| `/[locale]/about` | [`src/app/[locale]/about/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/about/page.tsx) | [`AboutJgsView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/about/AboutJgsView.tsx) | `2` | Complete & Bilingual |
| `/[locale]/community` | [`src/app/[locale]/community/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/community/page.tsx) | [`CommunityView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/account/StrategistWorkspaceViews.tsx#L36-L165) | `2` | Complete & Bilingual |
| `/[locale]/account` | [`src/app/[locale]/account/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/account/page.tsx) | [`AccountView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/account/StrategistWorkspaceViews.tsx#L167-L334) | `2` | Local-storage workspace only |
| `/[locale]/login` | [`src/app/[locale]/login/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/login/page.tsx) | [`LoginView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/account/StrategistWorkspaceViews.tsx#L336-L473) | `2` | Local-storage mock profile only |
| `/[locale]/register` | [`src/app/[locale]/register/page.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/register/page.tsx) | [`RegisterView`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/account/StrategistWorkspaceViews.tsx#L475-L617) | `2` | Local-storage mock profile only |
| `/api/telemetry/status` | [`src/app/api/telemetry/status/route.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/api/telemetry/status/route.ts) | JSON GET Handler | Dynamic API | Functional (`DISCONNECTED` state) |

### 1.2 Installed Dependencies Inspection (`package.json`)
- **Production Dependencies (`4`)**:
  - `next`: declared `^15.1.6` (resolved `15.5.29` in `node_modules`)
  - `react`: `^19.0.0`
  - `react-dom`: `^19.0.0`
  - `lucide-react`: `^0.468.0`
- **Development Dependencies (`9`)**:
  - `@types/node` (`^22.10.2`), `@types/react` (`^19.0.2`), `@types/react-dom` (`^19.0.2`), `autoprefixer` (`^10.4.20`), `postcss` (`^8.4.49`), `tailwindcss` (`^3.4.17`), `typescript` (`^5.7.2`), `vitest` (`^2.1.8`).
- **Dependency Audit Findings**:
  - Zero bloated or unused third-party UI/chart libraries—all charts are lightweight deterministic SVGs.
  - Neither `prisma` nor `@prisma/client` is installed in `package.json` despite `prisma/schema.prisma` being present (`P2-03`).
  - Neither `eslint` nor `eslint-config-next` is installed (`P2-06`).

### 1.3 Current Database Architecture Reality Check
- [`prisma/schema.prisma`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/prisma/schema.prisma) defines a clean relational schema for PostgreSQL (`User`, `OnboardingProfile`, `AcademyProgress`, `JournalEntry`, `RiskPreset`, `PerformanceAccount`, `PerformanceSnapshot`, `AuditVerificationLog`).
- **Architectural Status (`P2-03`)**: There is **no active database connection or backend persistence layer**. All user data is persisted exclusively in browser `localStorage` via [`src/lib/storage/jgs-local-store.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/storage/jgs-local-store.ts). While the UI in [`StrategistWorkspaceViews.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/account/StrategistWorkspaceViews.tsx#L317-L331) honestly discloses that profiles and journals operate in *"Local-First Privacy Mode (localStorage)"*, the Prisma schema is currently a blueprint rather than an active runtime integration.

### 1.4 Bilingual Implementation Inspection
- **Routing & Middleware**: [`src/middleware.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/middleware.ts) intercepts unprefixed paths, checks the `NEXT_LOCALE` cookie, defaults to `id`, and issues a `307` redirect to `/id/...` or `/en/...`.
- **Context Provider Defect (`P0-01`)**: [`LocaleProvider`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/i18n/LocaleContext.tsx) is mounted in [`src/app/layout.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/layout.tsx) instead of [`src/app/[locale]/layout.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/layout.tsx). Because `[locale]` pages use `generateStaticParams()`, Next.js pre-renders `<main>` at build time when `usePathname()` is `'/'` and `initialLocale` is `'id'`. When a user loads `/en` in production, the server sends Indonesian HTML inside `<main>` which then hydrates to English on the client, throwing **React Hydration Error `#418`**.

---

## AUDIT 2: FUNCTIONALITY TESTING

Each module was tested for interactive state transitions, mathematical accuracy, persistence, and bilingual behavior:

| Module | Route(s) | Functional Verdict | What Works | What Is Incomplete / Broken |
| :--- | :--- | :---: | :--- | :--- |
| **1. Homepage** | `/id`, `/en` | **PARTIAL (`P0-02`)** | 4-Persona User Journey Selector switches tabs & updates recommended step cards; interactive Broker Contract Specification & Position Sizing preview recalculates lot size and rejects over-risk setups in real time. | **Visual bug (`P0-02`)**: Unmapped Tailwind classes (`bg-gold-metallic`, `text-plum-deep`, `text-gold-metallic`) make the Hero primary CTA button background transparent (`rgba(0,0,0,0)`) and the headline accent text white instead of gold. |
| **2. ID / EN Language Switch** | Global (`Navbar` & `Footer`) | **PARTIAL (`P0-01`, `P1-01..04`)** | Clicking `ID` or `EN` updates `NEXT_LOCALE` cookie, updates `document.documentElement.lang`, and navigates to the matching `/id/...` or `/en/...` path. | Direct loads on `/en/*` trigger React Hydration Error `#418` (`P0-01`) because build-time static HTML rendered `'id'`. Additionally, 6 modules retain English body text on `/id/*` (`P1-01`–`P1-04`). |
| **3. JGS Academy** | `/id/academy`, `/id/academy/[slug]` | **PARTIAL (`P1-01`)** | Path filtering (`ALL`, `BEGINNER`, `INTERMEDIATE`, `QUANT`), track filtering, keyword search, `localStorage` lesson completion toggling, Plain-Language vs. Technical mode toggle, and interactive quiz grading all work. | Only Lessons `1.1` and `1.2` are fully translated into Indonesian. Lesson `1.3` is missing Indonesian technical/case-study/quiz sections, and Lessons `2.1` through `4.3` (`9` lessons) render English lesson bodies, case studies, and quizzes on `/id/academy/[slug]`. |
| **4. Trading Dictionary** | `/id/dictionary`, `/en/dictionary` | **PARTIAL (`P1-02`)** | Real-time search, category pills, difficulty filters, custom SVG diagrams (`7` illustration types), and related-term deep-linking all work. | All `32` dictionary terms in [`dictionary-terms.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/dictionary-terms.ts) are English-only. On `/id/dictionary`, only the page header and UI chrome are in Indonesian. |
| **5. Cent Lab** | `/id/calculators/cent` | **PARTIAL (`P0-01`, `P1-03`)** | Bidirectional `USD <-> USC` converter, 4 quick-load equity buttons, 4 broker preset loaders, 9-parameter Broker Symbol Specification Position Sizer, Margin Estimator, Drawdown Simulator, Side-by-Side Standard vs. Cent matrix, and `localStorage` preset saving all compute accurately. | Synchronous `loadRiskPresets()` in `useState` initializer risks hydration mismatch (`P0-01`). All calculator section titles, form labels, and engine verdicts below the top banner are English-only on `/id/calculators/cent` (`P1-03`). |
| **6. Position Sizing Calculator** | `/id/calculators/position-size` | **PARTIAL (`P1-03`, `P1-05`)** | Mathematical engine ([`calculateBrokerSymbolPositionSize`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/math/cent-calculator.ts#L228-L405)) accurately floors volume to `volumeStep` and explicitly rejects trades when `minimumLot` risk exceeds the user's risk cap. | Renders `<CentLabCalculator />` identically to `/calculators/cent` without scrolling to or isolating Section 2 (`Position Sizer`), making `/calculators/position-size` a duplicate page (`P1-05`). |
| **7. Drawdown Simulator** | `/id/calculators/drawdown`, `/id/calculators/risk` | **PARTIAL (`P1-03`, `P1-05`, `P2-02`)** | Interactive R:R slider, breakeven win rate math, 10-loss streak comparison table, and nonlinear drawdown recovery table (`-10%` to `-80%`) work accurately. | Duplicate of `/calculators/risk` (`P1-05`); unlocalized `<Link href="/journal">` on line 353 (`P2-02`); body labels/tables are English-only on `/id/calculators/drawdown` (`P1-03`). |
| **8. Trading Playground** | `/id/playground` | **PARTIAL (`P1-04`)** | 4 historical scenarios (`XAUUSD`, `EURUSD`, `GBPUSD`), SVG candlestick chart with dynamic Entry/SL/TP lines, bar-by-bar replay (`Step +1 Candle`), Custom Order (`BUY`/`SELL`/`WAIT`) geometry validation, and S/A/B/C/D/F decision grading all work. | All 4 scenarios in [`playground-scenarios.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/playground-scenarios.ts) and the simulator control panels/verdicts in [`PlaygroundSimulator.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/playground/PlaygroundSimulator.tsx) are English-only on `/id/playground`. |
| **9. JGS Intelligence** | `/id/research`, `/id/research/[slug]` | **COMPLETE** | Category filtering, keyword search, empty-state reset, full article reader, key findings, methodology disclosures, publication/review dates, and clickable primary source citations (`BIS`, `LBMA`, `CME Group`, `MetaQuotes`) work in both `/id` and `/en`. | Minor: uses `purple-royal` class in a decorative blur (`P0-02`). |
| **10. Quant Lab & EA Testing** | `/id/quant-lab`, `/id/ea-testing` | **PARTIAL (`P1-04`, `P2-01`)** | `EaTestingToolkit.tsx` (`/id/ea-testing`) is 100% functional and fully bilingual (interactive 6-point backtest audit checklist + spread/slippage friction simulator). `QuantLabDocs.tsx` (`/id/quant-lab`) persists MT5 setup checklist steps in `localStorage`. | In `QuantLabDocs.tsx` (`/id/quant-lab`), data items from [`quant-docs.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/quant-docs.ts) are English-only (`P1-04`), and the 5-column pipeline grid overflows by `8px` on `768px` tablet screens (`P2-01`). |
| **11. Trader Journal** | `/id/journal` | **PARTIAL (`P1-04`, `P3-04`)** | Pre-hydration skeleton loader, trade entry form with LONG/SHORT SL geometry validation, automatic R-multiple calculation, 4-rule discipline score, emotional leak detection, Academy lesson recommendations, search/emotion filtering, empty state, and CSV export (with formula-injection sanitization) all work. | Form labels, validation error messages, sample journal notes, and analytics card labels below the header are English-only on `/id/journal` (`P1-04`). `"Clear All"` has no confirmation dialog (`P3-04`). |
| **12. Performance Center** | `/id/performance` | **PARTIAL (`P1-04`)** | Honest pre-launch `OFFLINE / DISCONNECTED` default state, complete 11-metric verification schema (fully bilingual), and toggleable watermarked Educational Example chart work as designed. | Lower sections reading from [`telemetry-provider.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/telemetry/telemetry-provider.ts) (`verificationSteps` and `metricDefinitions` in Sections 3 & 4 of `PerformanceDashboard.tsx`) are English-only on `/id/performance` (`P1-04`). |
| **13. Copy Trading Info** | `/id/copy-trading` | **COMPLETE** | Pre-launch banner (no execution/deposit buttons), 8-pillar disclosure grid, interactive **30% High-Water Mark (HWM)** 4-period fee simulator, interactive Master-to-Follower proportional lot scaling calculator, and 5-question risk readiness checklist work in both `/id` and `/en`. | None — complete and verified. |

---

## AUDIT 3: TECHNICAL QUALITY

All technical checks defined in [`package.json`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/package.json) were executed directly against the workspace:

### 3.1 Command Execution Results
1. **TypeScript Check (`npm run typecheck` $\rightarrow$ `tsc --noEmit`)**:
   - **Result**: **PASS (`0` errors)**.
2. **Linter & Security Check (`npm run lint` $\rightarrow$ `node scripts/lint-check.mjs && tsc --noEmit`)**:
   - **Result**: **PASS (`63` TypeScript/React files scanned, `0` errors, `0` warnings)**.
   - **Audit Note (`P2-06`)**: `scripts/lint-check.mjs` checks for `dangerouslySetInnerHTML`, `eval()`, `console.log`, missing `<img alt>`, missing `<button type>`, and leaked server env vars, but standard `eslint` / `eslint-config-next` is not installed.
3. **Unit Test Suite (`npm run test` $\rightarrow$ `vitest run`)**:
   - **Result**: **PASS (`1` test file, `18/18` tests passing in `512ms`)**.
   - **Tested Engines**: Bidirectional USD/USC conversion, Broker Symbol Specification Position Sizer (including minimum-lot rejection guard, volumeStep flooring, maximumLot capping, and invalid input handling), Cent vs. Standard comparator, Trading Playground simulation engine, Risk & Drawdown nonlinear recovery engine, Trader Journal analytics engine, Telemetry anti-fabrication guard, and the **30% High-Water Mark (HWM)** fee schedule simulator.
4. **Production Build (`npm run build` $\rightarrow$ `next build`)**:
   - **Result**: **PASS (`80/80` static pages generated, shared First Load JS `103 kB`)**.
5. **Broken Imports & Missing Assets**:
   - **Broken Imports**: `0` broken module imports across all `63` source files.
   - **Image Assets**: `/public/images/jey-mascot.png` loads with `200 OK` (`naturalWidth > 0`) on every page where referenced.
   - **Missing Favicon (`P2-04`)**: Headless Chrome network audit recorded `404 Not Found` for `http://127.0.0.1:3014/favicon.ico` because neither `public/favicon.ico` nor `src/app/icon.*` exists.
6. **Browser Console Errors (`CDP Runtime.exceptionThrown`)**:
   - **Production Hydration Error (`P0-01`)**: In `next start`, headless Chrome recorded `Minified React error #418` (`Hydration failed because the server rendered HTML didn't match the client`) when hydrating statically generated routes where server-rendered locale/state diverged from client hydration.

---

## AUDIT 4: USER EXPERIENCE (DESKTOP, TABLET, MOBILE)

Headless Chrome CDP tested all `24` routes across three viewports:
- **Desktop**: `1440×900`
- **Tablet**: `768×1024`
- **Mobile**: `390×844`

### 4.1 Layout & Viewport Overflow Results
- **Desktop (`1440×900`)**: `0` horizontal overflows across all `24` routes (`scrollWidth === 1440`).
- **Mobile (`390×844`)**: `0` horizontal overflows across all `24` routes (`scrollWidth === 390`).
- **Tablet (`768×1024`) (`P2-01`)**: `23/24` routes have `0` overflow; **`/id/quant-lab` (and `/en/quant-lab`) overflows by `8px` (`scrollWidth = 776px` on a `768px` viewport)** because the 5-stage pipeline grid uses `grid-cols-1 md:grid-cols-5` ([`QuantLabDocs.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/quant/QuantLabDocs.tsx#L91)) and contains long unbroken MQL5 identifiers (`AccountInfoDouble(ACCOUNT_EQUITY)`, `SymbolInfoDouble(SYMBOL_TRADE_TICK_VALUE)`). Changing `md:grid-cols-5` to `lg:grid-cols-5` (or adding `break-words`) resolves this completely.

### 4.2 Visual Consistency & Design Token Defect (`P0-02`)
- **Undefined Tailwind Color Classes**: [`tailwind.config.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/tailwind.config.ts#L12-L29) namespaces brand colors under `jgs.*` (`bg-jgs-gold`, `text-jgs-ivory`, etc.), whereas [`EditorialHomepage.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/home/EditorialHomepage.tsx) uses un-namespaced classes (`bg-gold-metallic`, `text-plum-deep`, `text-gold-metallic`, `bg-plum-surface`, `text-gold-champagne`, `bg-purple-royal`, `text-ivory`).
- **Measured DOM Impact on `/id` and `/en`**:
  - Hero Primary CTA (`<Link href="/id/academy" className="... bg-gold-metallic text-plum-deep">`): Computed `backgroundColor` is `rgba(0, 0, 0, 0)` (transparent) and computed `color` is `rgb(247, 244, 238)` (white) instead of solid `#D4AF37` gold background with `#08050E` dark text.
  - Hero Headline Accent (`<span className="text-gold-metallic">Bukan dari modal.</span>`): Computed `color` is `rgb(247, 244, 238)` (white) instead of `#D4AF37` metallic gold.

### 4.3 Navigation, Accessibility, & Interactive States
- **Navigation Clarity**: The 6-pillar navigation (`Learn`, `Trading Tools`, `Market Research`, `Our Strategy`, `Performance`, `About JGS`) plus visible `ID | EN` toggle is clean and intuitive.
- **Keyboard Accessibility (`P3-01`)**: A `"Skip to main content"` / `"Lewati ke konten utama"` link is present in [`src/app/layout.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/layout.tsx#L50-L55), and all form inputs have explicit `<label htmlFor="...">` bindings. However, desktop navbar dropdowns in [`Navbar.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/layout/Navbar.tsx#L221-L261) rely solely on `onMouseEnter`/`onMouseLeave` and cannot be opened via keyboard focus/keys.
- **Loading, Empty, & Validation States**:
  - **Loading State**: [`TraderJournalWorkspace.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/journal/TraderJournalWorkspace.tsx#L328-L336) renders an animated skeleton pulse before `localStorage` hydration completes.
  - **Empty States**: Implemented with reset actions in `AcademyHub.tsx`, `DictionaryExplorer.tsx`, `MarketResearchHub.tsx`, and `TraderJournalWorkspace.tsx`.
  - **Validation & Error States**: Implemented with `role="alert"` banners in `CentLabCalculator.tsx` (invalid broker specs & minimum-lot risk rejection), `PlaygroundSimulator.tsx` (invalid SL/TP geometry), `TraderJournalWorkspace.tsx` (invalid LONG/SHORT stop-loss geometry), and `StrategistWorkspaceViews.tsx` (`LoginView` / `RegisterView`).

---

## AUDIT 5: CONTENT QUALITY & FINANCIAL ACCURACY

### 5.1 Financial Claims, Fake Statistics, & Performance Honesty
- **Zero Fake Statistics or Testimonials**: A full-text audit across all `63` source files confirmed **zero** fabricated user counts, **zero** fake testimonials, **zero** fake live profit popups, and **zero** unsupported claims (`"90% of traders"`, `"95% of Gold EAs"`, and universal `"100x smaller cent contracts"` have been completely eliminated).
- **Cent Account & Broker Specification Accuracy**:
  - Across `EditorialHomepage.tsx`, `CentLabCalculator.tsx`, `Academy` Lesson `1.2`, `Dictionary` (`cent-account`, `usc`, `lot-size`), `Research` Article `02`, and `CopyTradingGuide.tsx`, the platform explicitly and accurately states that **Cent denomination (`1 USD = 100 USC`) is an account balance unit conversion and does NOT automatically guarantee that contract size is 100× smaller**—contract size, tick size, tick value, and minimum lot depend on each broker's MT5 symbol specification.
- **Performance & Copy Trading Pre-Launch Honesty**:
  - `/id/performance` and `/api/telemetry/status` default strictly to `DISCONNECTED / PRE-LAUNCH` with `isLiveVerified: false`.
  - `/id/copy-trading` explicitly states that copy trading is **NOT ready for public launch**, disables all deposit/payment/execution functionality, and presents the proposed **30% performance fee on eligible net new profits above a High-Water Mark (HWM)** as subject to legal review and broker/platform fee rules.
- **Source Citations in Market Research (`JGS Intelligence`)**:
  - All 3 research articles in [`research-articles.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/research-articles.ts) include explicit publication dates (`publishedAt`), review dates (`lastReviewedAt`), methodology disclosures, and clickable primary source URLs (`Bank for International Settlements (BIS) Triennial Central Bank Survey`, `London Bullion Market Association (LBMA)`, `CME Group`, and `MetaQuotes MQL5 Reference`).

### 5.2 Bilingual Completeness Audit (`ID` vs `EN`)
- **English (`EN`) Completeness**: **100% Complete** across all `25` routes, `12` Academy lessons, `32` Dictionary terms, `4` Playground scenarios, `3` Research articles, and all calculators/tools.
- **Indonesian (`ID`) Completeness (`P1-01` – `P1-04`)**:
  - **100% Translated to Indonesian**: Homepage (`EditorialHomepage.tsx`), Navbar (`Navbar.tsx`), Footer (`Footer.tsx`), Onboarding Wizard (`OnboardingWizard.tsx`), Market Research Hub & 3 Articles (`MarketResearchHub.tsx`, `ResearchArticleView.tsx`, `research-articles.ts`), EA Testing Toolkit (`EaTestingToolkit.tsx`), Copy Trading Information (`CopyTradingGuide.tsx`), About & Pillar Hubs (`AboutJgsView.tsx`), Community & Account/Auth views (`StrategistWorkspaceViews.tsx`), Academy Hub (`AcademyHub.tsx`), and Academy Lessons `1.1` & `1.2`.
  - **Partially Translated (Header in Indonesian, Body/Data in English)**:
    1. **JGS Academy (`academy-lessons.ts`)**: Lesson `1.3` (missing `technicalSectionsId`, `microCapitalCaseStudyId`, `quizId`) and Lessons `2.1`, `2.2`, `2.3`, `3.1`, `3.2`, `3.3`, `4.1`, `4.2`, `4.3` (missing `plainEnglishSectionsId`, `technicalSectionsId`, `microCapitalCaseStudyId`, `quizId`).
    2. **Trading Dictionary (`dictionary-terms.ts`)**: All `32` terms (`plainEnglish`, `technicalDefinition`, `centAccountExample`, `retailTrap`) and `DICTIONARY_CATEGORY_LABELS`.
    3. **Cent Lab & Position Sizer (`CentLabCalculator.tsx`, `cent-calculator.ts`)**: Sections 1–4 form labels, quick presets, and position sizing engine verdict strings.
    4. **Drawdown & Risk Calculator (`RiskManagementCalculator.tsx`)**: Form labels, metric cards, streak table headers, and nonlinear drawdown recovery copy.
    5. **Trading Playground (`PlaygroundSimulator.tsx`, `playground-scenarios.ts`)**: All `4` historical scenarios (`briefing`, candle `annotation`s, `options`, `jeyDebrief`) and simulator controls.
    6. **Quant Lab (`QuantLabDocs.tsx`, `quant-docs.ts`)**: `QUANT_PIPELINE_STAGES`, `QUANT_PARAMETER_SPECS` descriptions/warnings, and `MT5_SETUP_STEPS` instructions.
    7. **Trader Journal (`TraderJournalWorkspace.tsx`)**: Analytics strip labels, trade entry form labels, validation errors, and sample ledger notes.
    8. **Performance Center (`PerformanceDashboard.tsx`, `telemetry-provider.ts`)**: Sections 1 & 2 (11-metric schema & educational chart) are translated, but Sections 3 & 4 (`verificationSteps` and `metricDefinitions` from `telemetry-provider.ts`) are English-only.

---

## Recommended Fixes (Actionable Engineering Roadmap)

### Phase A — Fix P0 Critical Issues First
1. **Resolve Production Hydration Mismatch (`P0-01`)**:
   - Move `<LocaleProvider initialLocale={locale}>` into [`src/app/[locale]/layout.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/app/[locale]/layout.tsx) using `const { locale } = await params;` so static build-time pre-rendering (`generateStaticParams`) always renders `/id/*` with `initialLocale="id"` and `/en/*` with `initialLocale="en"`.
   - In [`LocaleContext.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/i18n/LocaleContext.tsx), add a `useEffect` that synchronizes `document.documentElement.lang = activeLocale`.
   - In [`CentLabCalculator.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/CentLabCalculator.tsx#L163), initialize `presets` to `[]` and load `loadRiskPresets()` inside a `useEffect`.
2. **Add Missing Brand Color Tokens to `tailwind.config.ts` (`P0-02`)**:
   - Add `plum: { deep: '#08050E', surface: '#120B1E', elevated: '#1A102B' }`, `gold: { metallic: '#D4AF37', champagne: '#F3E5AB' }`, `purple: { royal: '#7E22CE' }`, `lavender: { accent: '#A882DD' }`, and `ivory: '#F7F4EE'` to `theme.extend.colors` in [`tailwind.config.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/tailwind.config.ts) so every button, badge, and headline accent in `EditorialHomepage.tsx`, `AboutJgsView.tsx`, and `MarketResearchHub.tsx` renders with its intended metallic gold and midnight plum styling.

### Phase B — Resolve P1 High-Priority Localization & Route Duplication Gaps
3. **Complete Indonesian (`id`) Datasets & Component Strings (`P1-01` – `P1-04`)**:
   - Add Indonesian translations (`plainEnglishSectionsId`, `technicalSectionsId`, `microCapitalCaseStudyId`, `quizId`) for Lessons `1.3` and `2.1`–`4.3` in [`academy-lessons.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/academy-lessons.ts).
   - Add localized Indonesian fields to [`dictionary-terms.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/dictionary-terms.ts), [`playground-scenarios.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/playground-scenarios.ts), [`quant-docs.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/data/quant-docs.ts), and [`telemetry-provider.ts`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/lib/telemetry/telemetry-provider.ts).
   - Localize the remaining English form labels, table headers, and validation messages in [`CentLabCalculator.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/CentLabCalculator.tsx), [`RiskManagementCalculator.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/calculators/RiskManagementCalculator.tsx), [`PlaygroundSimulator.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/playground/PlaygroundSimulator.tsx), and [`TraderJournalWorkspace.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/journal/TraderJournalWorkspace.tsx).
4. **Differentiate Calculator Sub-Routes (`P1-05`)**:
   - Pass an `initialSection` or `mode` prop to `<CentLabCalculator mode="position-size" />` on `/calculators/position-size` and `<RiskManagementCalculator mode="drawdown" />` on `/calculators/drawdown` so each dedicated tool route highlights its primary calculator immediately at the top of the viewport.

### Phase C — Resolve P2 & P3 Polish Items
5. **Fix Tablet Overflow on `/quant-lab` (`P2-01`)**: Change `md:grid-cols-5` to `lg:grid-cols-5` and add `break-words` on [`QuantLabDocs.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/quant/QuantLabDocs.tsx#L91).
6. **Localize `/journal` Link in `RiskManagementCalculator.tsx` (`P2-02`)**: Change `href="/journal"` to `href={l('/journal')}` at line 353.
7. **Add Favicon (`P2-04`)**: Add `src/app/icon.png` or `public/favicon.ico` to eliminate the `404` on `/favicon.ico`.
8. **Keyboard-Accessible Navbar Dropdowns (`P3-01`)**: Add `onFocus`/`onKeyDown` (`Enter`/`Escape`) support to dropdown triggers in [`Navbar.tsx`](file:///Users/jahseyamochtarmawardi/Downloads/JGS-WEBSITE/src/components/layout/Navbar.tsx).
