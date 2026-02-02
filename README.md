# Personal Finance App

Starter for a personal finance app (Angular 21) — budgets, saving pots, transactions, recurring bills.

## Stack

- **Angular 21** (standalone, signals, SSR)
- **Chart.js** (ng2-charts) for budget charts
- **ESLint + Prettier** for code quality
- **Nx** for build and lint

## Setup

```bash
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` / `nx serve finance-app` | Dev server |
| `npm run build` / `nx build finance-app` | Production build |
| `npm run lint` / `nx run finance-app:lint` | Lint (ESLint + Prettier) |
| `npm test` / `nx test finance-app` | Unit tests |

## Project structure

- `src/app/core/` — auth, guards, SEO
- `src/app/features/` — auth (login), overview (placeholder)
- Login required; authenticated users are redirected to Overview.

## First commit

Initial setup: Angular 21, ESLint, Prettier, Chart.js, SEO, auth flow (login/overview guards).
