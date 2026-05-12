# Hintro — Frontend assignment

Production-oriented React dashboard with authentication, call insights, and a full feedback flow aligned with the provided Figma file. The UI talks to a configurable REST API (mock backend supported).

## Tech stack

| Area | Choice |
|------|--------|
| Runtime | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'` + `@theme` tokens in `src/index.css`) |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| Client state | Zustand (auth session id only) |
| Forms | React Hook Form |
| HTTP | Axios (`src/api/client.ts`) |
| Animation | Framer Motion |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (ships with Node)

## Setup

1. **Clone** the repository and enter the project directory.

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment**

   Copy `.env.example` to `.env` and adjust if needed:

   ```bash
   cp .env.example .env
   ```

   | Variable | Purpose |
   |----------|---------|
   | `VITE_API_BASE_URL` | Base URL for REST APIs (no trailing slash). Default points at the hosted mock backend. |

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open the URL printed in the terminal (typically `http://localhost:5173`).

5. **Production build**

   ```bash
   npm run build
   npm run preview   # optional local preview of dist/
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck + optimized production bundle |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint across the repo |

## Architecture overview

```
src/
├── api/              # Axios client + domain modules (auth, call sessions)
├── components/
│   ├── dashboard/    # Shell, sidebar, stats, calls list, skeletons, errors
│   ├── feedback/     # Feedback modals, history table/cards, storage-backed UI
│   ├── layout/       # Auth gate, route fallbacks
│   └── ui/           # Button, Input, Label, etc.
├── constants/        # Storage keys, nav config, shared layout tokens (`pageShell`)
├── contexts/         # Feedback modal API (provider + hook split for Fast Refresh)
├── hooks/            # Auth hydration, dashboard queries, feedback storage/history/modal
├── layouts/          # Auth layout wrapper (login)
├── pages/            # Route-level screens (lazy-loaded from `routes/lazyPages.tsx`)
├── routes/           # Router definition + lazy imports
├── store/            # Zustand auth store (persisted user id)
├── types/            # Shared TS types
└── utils/            # Formatting, grouping, cn helper
```

**Data flow (dashboard)**

1. `RequireAuth` waits for persisted auth hydration, then redirects to `/login` if no user id.
2. `useDashboardQueries` fetches profile, dashboard payload, stats, and recent sessions when authenticated.
3. UI switches between skeletons, error banner + retry, empty states, or populated content.

**Feedback**

- Flow state lives in `useFeedbackModal` (wrapped by `FeedbackFlowProvider`).
- Submissions append to `localStorage` via `useFeedbackStorage` (versioned JSON shape).
- Modals use focus trap + ESC; routes do not own feedback state.

## Assumptions

1. **Auth model** — Assignment-style login: selecting user **`u1`** / **`u2`** drives API fixtures (empty vs populated dashboard). Email/password are validated client-side only; there is no real credential exchange.
2. **API** — Endpoints match the mock backend contract (`/api/auth/profile`, `/api/auth/dashboard`, `/api/call-sessions/stats`, `/api/call-sessions?limit=10`). Swap `VITE_API_BASE_URL` for another compatible server.
3. **Persistence** — Auth user id is persisted (Zustand persist). Feedback entries are persisted locally for the history view.
4. **Design** — Layout and feedback UI follow the linked Figma file; spacing tokens are centralized where practical (`PAGE_SHELL_CLASS`, feedback components).

## Deployment

Typical static hosting for a Vite SPA:

1. Set `VITE_API_BASE_URL` in the hosting provider’s environment **at build time** (Vite inlines `import.meta.env` variables).

2. Build:

   ```bash
   npm ci
   npm run build
   ```

3. Deploy the **`dist/`** directory.

4. **SPA routing** — Configure the host to serve `index.html` for unknown paths (fallback), so `/login` and `/feedback-history` work on refresh.

Examples:

- **Vercel / Netlify** — Connect repo; set env var; build command `npm run build`; publish `dist`.
- **NGINX** — `try_files $uri $uri/ /index.html;` for the site root.

## Quality & audits (final polish)

| Topic | Notes |
|-------|--------|
| **Responsive** | Shared page shell: `px-5 md:px-10 lg:px-[83px]` for dashboard + feedback history. Mobile nav title truncates; tablet login uses slightly wider max width. |
| **Motion** | Route transitions respect `prefers-reduced-motion` via Framer’s `useReducedMotion`. |
| **A11y** | Invalid inputs set `aria-invalid`; error banner uses `aria-live="assertive"`; loading states expose `role="status"` / `aria-busy` where relevant; modal feedback flow retains focus trap + dialog semantics. |
| **Bundle** | Lazy-loaded routes (`DashboardPage`, `FeedbackHistoryPage`, `LoginPage`) split chunks; main bundle still includes shared vendors (React, TanStack Query, Framer Motion). Further splits would require additional lazy boundaries or manual chunk config in Vite. |
| **Re-renders** | `groupCallSessionsByDay` runs inside `useMemo` keyed on session list reference from React Query. |

## License

Private / assignment use unless otherwise specified by the author.
