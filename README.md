# Hintro — Conversation Insights Dashboard

A responsive, accessible React + TypeScript dashboard for call insights and user feedback with local persistence and API-driven data.


## Live Demo

- https://hitro-assignment.vercel.app


## Project Overview

Hintro is a production-minded frontend that surfaces meeting analytics, recent call history, and a persistent feedback workflow. It demonstrates a polished dashboard experience with clear empty states, per-user data handling, accessibility considerations, and a responsive layout suitable for desktop and mobile.

Key user-facing capabilities:
- Dashboard metrics: total sessions, average duration, AI interactions, and last session label.
- Grouped recent calls by day with quick action affordances.
- Feedback flow: sidebar-triggered modal, mobile-friendly card list, and desktop history table.
- Per-user behavior: demo accounts (for example, u1 empty, u2 populated) with immediate data refresh when switching users.


## Key Highlights

- Responsive, pixel-conscious UI aligned to the design reference.
- User-scoped query cache to prevent stale data after auth switching.
- Local storage persistence for feedback history with a synchronized hook.
- Accessibility-first components: keyboard nav, focus-visible states, and ARIA semantics.
- Performance-aware bundling and route-level lazy loading.


## Features

- Responsive UI (mobile → tablet → desktop)
- Dashboard with metrics and grouped recent calls
- Sidebar navigation and mobile navbar
- Feedback system (modal, cards, desktop table)
- Local storage persistence for feedback
- Explicit empty states and populated states
- API integration (user header + mock backend support)
- Theming via CSS variables + Tailwind utility tokens
- Smooth transitions with Framer Motion
- Accessibility improvements (keyboard & ARIA)
- Performance optimizations and lazy loading guidance
- Production build verification and bundle analysis


## Tech Stack

- React (functional components + hooks)
- TypeScript
- Vite (dev & build)
- Tailwind CSS
- Zustand (persisted auth store)
- React Router
- @tanstack/react-query (data fetching & cache)
- Framer Motion (transitions)
- Axios (HTTP)
- date-fns (date/time formatting)
- lucide-react (icons)
- Axe (accessibility auditing during QA)


## Architecture & Folder Structure

```
src/
├─ api/                # Axios client + domain fetch helpers
├─ assets/             # Static images & icons
├─ components/         # UI primitives & domain components
│  ├─ dashboard/       # StatsCard, CallsList, Header, Sidebar, Skeletons
│  ├─ feedback/        # FeedbackModal, FeedbackHistoryTable, Cards
│  └─ ui/              # Button, Input, Label, etc.
├─ contexts/           # FeedbackFlowProvider
├─ hooks/              # useDashboardQueries, useFeedbackStorage, useAuthHydration
├─ layouts/            # AuthLayout, DashboardShell
├─ pages/              # DashboardPage, FeedbackHistoryPage, LoginPage
├─ providers/          # QueryProvider, AppProviders
├─ store/              # useAuthStore (Zustand)
├─ constants/          # queryKeys, storageKeys, pageShell
├─ types/              # TS domain types
└─ utils/              # formatting, grouping helpers
```

Data flow (short): RequireAuth ensures auth hydration → useDashboardQueries(userId) drives profile, dashboard, stats and sessions → UI shows skeletons / error / empty / populated states.


## User Flows

- User 1 — Empty state
  - Login as u1 → dashboard shows empty metrics and CTA to connect data / leave feedback. Feedback history shows the empty table state with a prominent Give Feedback action.

- User 2 — Populated state
  - Login as u2 → dashboard shows populated metrics and recent calls grouped by day. Feedback history shows rows with numeric ratings on desktop and star visuals on mobile.


## Time & Data Formatting

- date-fns converts and formats API timestamps for local display.
- Durations are rendered with formatDurationSeconds (for example, 1h 2m 10s).
- Last session uses a relative label (for example, 3 days ago).
- All formatting logic lives in src/utils/ for centralized changes.


## Feedback System Details

- Sidebar flow triggers the FeedbackModal (desktop) or card-based flow (mobile).
- Submissions write to local storage via useFeedbackStorage, which exposes a sync-friendly API used by the history components.
- Desktop history: full-width table with numeric rating, title, description, date, and time.
- Mobile history: stacked cards with star icons for quick scanning.


## Responsiveness & Breakpoints

- Mobile (<= 640px): stacked layout, slide-over navigation, card-based feedback history.
- Tablet (641px–1024px): increased spacing, two-column grids where appropriate.
- Desktop (>= 1024px): fixed left sidebar (262px), full-width content, desktop feedback table.


## Accessibility Improvements

- Keyboard accessible navigation and controls.
- Focus-visible styles for interactive elements.
- Proper ARIA labels and dialog semantics for modals.
- Semantic headings and landmarks for screen-reader navigation.
- Color contrast validated during QA (axe-core checks).


## Performance Optimizations

- Route-level lazy loading (pages are prepared for dynamic imports).
- Sensible React Query staleTime defaults and user-scoped cache keys.
- Memoization for expensive transforms (for example, grouping sessions by day).
- Production build analysis completed; large chunks flagged with guidance to split vendor or heavy modules.


## Environment Variables

Create a .env in the project root with these example values:

```
VITE_API_BASE_URL=https://api.example.com
VITE_PUBLIC_URL=https://hitro-assignment.vercel.app
VITE_USE_MOCK_API=true
```

- VITE_API_BASE_URL is used for API requests. When absent the app falls back to the included mock fixtures.


## Installation & Local Development

```
# Clone
git clone REPO_URL
cd hintro-assignment

# Install
npm install

# Dev server (HMR)
npm run dev

# Build for production
npm run build

# Local preview of production build
npm run preview
```


## Available Scripts

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Typecheck + produce optimized production bundles
- `npm run preview` — Serve the built dist/ locally
- `npm run lint` — Run ESLint (if configured)


## Deployment

- Deployed on Vercel: https://hitro-assignment.vercel.app
- Typical steps: connect repo to Vercel, set VITE_API_BASE_URL env var in Vercel, set build command to `npm run build`, and publish the `dist/` folder.


## QA & Final Audit

- Production build verification: `npm run build` completed successfully in the project.
- Accessibility audit: axe-core runs were performed during QA; most issues resolved. Remaining color/contrast flagged where elements are overlapped/obscured — minor.
- Responsiveness checks: validated at 375px, 768px, and 1280px.
- Pixel-refinement: spacing, sidebar width, and feedback table alignment adjusted to closely match the design reference.
- API validation: x-user-id header is injected by the auth store; queries are user-scoped to avoid stale cross-user caching.


## Future Improvements

- Add visual regression tests (Percy / Chromatic) for automated pixel-diff checks.
- Add Playwright E2E tests for cross-user flows and feedback persistence.
- Further code-splitting for heavy modules and charts.
- Centralize design tokens into a consumable package for reuse.


## Author

- Author: Your Name — Frontend Engineer
- Email: your.email@example.com
- LinkedIn / Portfolio: (add link)


---

If you want, I can also:
- Add a short CONTRIBUTING.md and CODE_OF_CONDUCT for handoff.
- Wire up a simple CI workflow for lint/test/build on PRs.
