# Tech Stack

## Zielbild

PWA ohne Backend. Alle Daten lokal in IndexedDB. Fokus auf Offline-first, Performance, einfache Wartung, saubere DX.

## Frontend

- **Next.js 15, App Router**
  - Routen unter `app/`
  - Revalidierungen über Client-Cache, keine Server Actions nötig
- **React 18**
- **TypeScript strict**
  - `"strict": true`, keine `any`, `noImplicitAny`: true
- **TailwindCSS + shadcn/ui**
  - Design Tokens über Tailwind Theme
  - Komponenten als Primitives plus ein paar Composites

## Datenhaltung

- **IndexedDB via Dexie**
  - Vorteile: Transaktionen, Indizes, Migrations
  - Schema unter `lib/db/schema.ts`
  - Repositories unter `lib/db/repos/*`
  - Versioning: `db.version(1).stores({...})`, Migrationen pro Version
  - Backup: Export nach JSON, optional verschlüsselt mit WebCrypto
  - Konfliktstrategie: da keine Serverquelle, nur lokale Konflikte bei Migration und Import

## Validierung

- **Zod**
  - Ein- und Ausgabe-Schemas
  - Gatekeeper vor Writes in IndexedDB

## State und Queries

- **Lightweight state**
  - UI State: lokal per React
  - Datenzugriff: Repo-Funktionen, ggf. SWR oder TanStack Query für Cache und Re-Fetch Simulation bei Imports

## Styling und Design

- Tailwind Utility-first
- shadcn/ui als primitives
- Fokus auf a11y: Fokusreihenfolge, ARIA, Kontrast AA

## Tests

- **Vitest + Testing Library** für Komponenten und Utils
- **Playwright** für E2E:
  - Offline Szenarien
  - Install Prompt
  - Update Flow
  - IndexedDB Smoke

## Qualität

- **ESLint** (typescript-eslint)
- **Prettier**
- **EditorConfig**
- **Pre-commit Hooks** optional

## PWA

- `public/manifest.json` mit Icons
- `public/sw.js` oder `app/worker.ts` je nach Setup
- Caching-Strategien siehe `specs/pwa.md`

## Security und Privacy

- Keine Server-Calls. Daten bleiben lokal
- Optionaler Export verschlüsselt mit WebCrypto AES-GCM
- Clipboard, File System Access, Notifications nur nach expliziter Einwilligung

## Performance Budgets

- LCP < 2.5 s auf 4G
- Initial JS < 180 kB gzipped
- Bilder responsiv und lazy
- Dexie Queries unter 50 ms P95 bei 10k Transaktionen

## Entscheidungs-Alternativen

- Dexie statt raw `idb` wegen Migrations und DX
- Keine Redux. Kein globaler Store für Datenobjekte, nur Repos
- Keine Server Actions, da kein Backend

## Versions- und Tooling-Notizen

- Node LTS
- pnpm Workspaces optional
