# monaiy

Modern finance tracker with focus on fast ux

## Tech Stack

- Next.js 15 - App Router, RSC wo sinnvoll
- TypeScript strict
- TailwindCSS + shadcn/ui
- IndexedDB via Dexie für Datenhaltung
- Zod für Validierung
- Playwright für E2E
- Vitest + Testing Library für Komponenten
- ESLint + Prettier als Baseline

## Quickstart

```bash
pnpm i
pnpm dev
```

## Scripts

- `dev` - lokale Entwicklung
- `build` - Produktionsbuild
- `lint` - Linting
- `test` - Unit/Component Tests
- `e2e` - Playwright E2E

## Ordner

- `app/` Routen und Screens
- `components/` UI auf App-Ebene
- `lib/db/` Dexie Schema, Migrations, Repositories
- `lib/pwa/` Service Worker, Workbox Helfer, update flow
- `styles/` Tailwind und globale Styles
- `public/` Icons, manifest.json, sw\.js

## Datenmodell kurz

- `accounts`, `transactions`, `categories`, `imports`
- Versionierung der DB über Dexie-Schema
- Export/Import als verschlüsselte JSON-Datei optional

## Ziele

- Start unter 2.5 s auf 4G
- App als PWA installierbar
- Voll nutzbar offline
