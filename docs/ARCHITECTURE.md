# JGS Technical & Telemetry Architecture

## 1. Layered Application Architecture

THE JEY GANG STRATEGIST (`JGS`) separates **pure quantitative logic**, **curated educational content**, **persistence adapters**, and **Next.js App Router presentation components**:

1. **Quantitative Math Layer (`src/lib/math/`)**:
   - Zero React or DOM dependencies.
   - `cent-calculator.ts`: Handles currency conversion (`USD`, `EUR`, `GBP`, `IDR` to `USC`), contract specification math for `XAUUSD`, `EURUSD`, `GBPUSD`, and `USDJPY`, and side-by-side Standard vs. Cent survivability analysis.
   - `risk-engine.ts`: Computes position sizing, $R$-multiple targets, breakeven win rate, nonlinear drawdown recovery curves, and consecutive-loss equity decay.
   - `journal-analytics.ts`: Computes Win Rate, Mathematical Expectancy ($R$), Profit Factor, and the JGS Discipline Score (`0–100%`) derived from pre-trade checklist adherence.

2. **Telemetry & Honesty State Machine (`src/lib/telemetry/`)**:
   - Implements a strict 3-state model:
     - `DISCONNECTED` (Default production state): Explicitly states that no live broker bridge is connected.
     - `SANDBOX_SIMULATION` (User-toggled educational mode): Clearly watermarked educational dataset allowing beginners to inspect how Equity vs. Balance divergence, Underwater Drawdown, and Profit Factor work.
     - `VERIFIED_LIVE` (Future integration target): Requires cryptographic signature and read-only investor heartbeat verification.

3. **Dual-Mode Storage Repository (`src/lib/storage/`)**:
   - Provides immediate, friction-free persistence in browser storage (`jgs-local-store.ts`) for guest users so beginners are never blocked by a signup wall, while matching the exact entity structure of `prisma/schema.prisma` for authenticated PostgreSQL synchronization.
