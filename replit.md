# Powerline Penpals

## Overview

Powerline Penpals is an interactive story-map web application that explores energy poverty across Canada. Users navigate a stylized map of Canada, selecting regions to read letters from fictional characters experiencing energy challenges. Each region presents a branching narrative where players make tone choices, action decisions, and budget tradeoffs through a "Warmth Wallet" mini-simulator. The app tracks cumulative impact across four dimensions (Warmth, Reliability, Affordability, Agency) and awards collectible "stamps" for completed regions.

This is a primarily client-side narrative experience with a lightweight Express backend. The story content is defined in static data structures on the frontend, not fetched from a database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: React useState for local game state; TanStack React Query available for server data but minimally used currently
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS v4
- **Animations**: Framer Motion for letter transitions, map interactions, and progress bars
- **Styling**: Tailwind CSS with custom dark theme (dark slate/charcoal background, ice blue primary, amber accent). Three font families: Inter (sans), Lora (serif for letter content), Caveat (handwriting style)
- **Key custom components**:
  - `MapController` - Canada SVG map with clickable regions and persona cards
  - `LetterInterface` - Letter reading/response UI with phased progression (reading → choices → wallet → done)
  - `WarmthWallet` - Budget tradeoff simulator with cost constraints
  - `ImpactMeter` - Four-axis progress visualization (warmth/reliability/affordability/agency)
  - `CanadaSVG` - Dynamic SVG map loader from public directory

### Backend
- **Framework**: Express 5 on Node.js with TypeScript (tsx runner)
- **Architecture**: Minimal REST API structure. Routes registered in `server/routes.ts` (currently empty). The app is primarily client-driven with story data embedded in the frontend.
- **Static serving**: Production builds served from `dist/public` with SPA fallback
- **Dev server**: Vite dev server integrated as middleware with HMR via `server/vite.ts`

### Data Layer
- **Story Data**: Defined as TypeScript objects in `client/src/lib/story-data.ts`. Four regions (north, city, rural, medical), each with letters, choices, wallet events, and impact values.
- **Database**: PostgreSQL configured via Drizzle ORM (`drizzle.config.ts`), but the schema (`shared/schema.ts`) currently only has a Zod impact schema — no Drizzle table definitions yet. The database is provisioned but essentially unused.
- **Storage**: `server/storage.ts` has an empty `MemStorage` class — storage interface is a stub ready for implementation.
- **Schema management**: `drizzle-kit push` for database migrations when tables are added.

### Build System
- **Development**: `tsx server/index.ts` runs the Express server with Vite middleware for HMR
- **Production build**: Custom `script/build.ts` that runs Vite build for client and esbuild for server, outputting to `dist/`. Server bundle uses CommonJS format (`dist/index.cjs`).
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Game State Architecture
- All game state (current region, current letter, completed regions, budgets, impact stats) is managed in the `Home` page component via React useState
- Impact stats use a -5 to +5 range per dimension, normalized to 0-100% for display
- Each region has its own budget that depletes based on Warmth Wallet decisions
- No persistence — game state resets on page refresh (database could be used to add save functionality)

## External Dependencies

### Infrastructure
- **PostgreSQL**: Database provisioned via `DATABASE_URL` environment variable, managed with Drizzle ORM and drizzle-kit. Currently has no tables defined.
- **Replit**: Platform-specific plugins for dev banner, cartographer, runtime error overlay, and meta images. These only activate in development on Replit.

### Key NPM Packages
- **framer-motion**: Core animation library for all UI transitions
- **wouter**: Lightweight client-side routing
- **@tanstack/react-query**: Server state management (available but lightly used)
- **drizzle-orm / drizzle-zod**: ORM and schema validation (configured but minimal usage)
- **shadcn/ui ecosystem**: Radix UI primitives, class-variance-authority, tailwind-merge, clsx
- **react-day-picker, embla-carousel-react, recharts, react-resizable-panels, vaul, input-otp, cmdk**: UI component dependencies from shadcn/ui (many not actively used in the current app)
- **connect-pg-simple / express-session**: Session management (available but not currently wired up)

### Static Assets
- Canada SVG map loaded from `/canada-map.svg` in the public directory
- Paper texture PNG used for letter backgrounds
- Google Fonts: Caveat, Inter, Lora loaded via CDN