# Agenten-Regeln und Aufgaben

## Verwende immer diesen Stack

- Next.js 15 App Router, React 18
- TypeScript strict
- Tailwind + shadcn/ui
- IndexedDB via Dexie
- Zod für Validierung
- Vitest, Playwright

## Aufgaben-Schablonen

### Neue Tabelle in IndexedDB

Ziel: Füge eine Tabelle hinzu und migriere Daten.
Schritte:

1. `lib/db/schema.ts` aktualisieren
2. `lib/db/migrations.ts` neue Version mit `db.version(n).stores(...)`
3. Repo-Funktionen in `lib/db/repos/<name>.ts`
4. Zod-Schema definieren
5. Unit-Tests für Repo
6. E2E Smoke, falls Nutzer-Flow betroffen
   Nicht erlaubt: Breaking Migration ohne Backup-Hinweis

### Neue Komponente mit Zuständen

- Nutze shadcn primitives
- Zustände: default, loading, empty, error
- a11y: ARIA, Fokus-Management
- Story in Storybook, Tests in Vitest

### PWA Update Flow

- Erzeuge Banner bei wartendem SW
- Button „Neu laden“ triggert Skip Waiting und Reload
- E2E: simuliere neues SW und prüfe Banner

## Kritik-Prompts

- „Auditiere diese Änderung gegen die Guardrails. Finde Verstöße und biete Fixes an.“
- „Erzeuge Migrations-Plan für Dexie von vX auf vY. Liste Risiken und Rollback.“
- „Prüfe diese Komponente auf a11y und Performance. Nenne 3 konkrete Verbesserungen.“

## Benennungen

- Dateien kebab-case
- Komponenten PascalCase
- test ids: `data-testid="..."`

## Telemetrie

- Optional, lokal nur Debug-Logs. Keine externen Calls ohne Einwilligung.

````

---

## Optional: kleine Code-Snippets, die du später einbauen kannst

**Dexie Schema Grundgerüst**

```ts
// lib/db/schema.ts
import Dexie, { Table } from 'dexie';

export interface Account { id: string; type: 'bank'|'paypal'|'broker'; name: string; status: 'connected'|'error'|'pending'; }
export interface Transaction { id: string; accountId: string; date: string; merchant: string; amount: number; currency: string; category?: string; note?: string; }
export interface Category { id: string; name: string; parentId?: string; }
export interface ImportJob { id: string; createdAt: string; source: 'csv'|'pdf'; status: 'queued'|'done'|'error'; }

export class VibeDB extends Dexie {
  accounts!: Table<Account, string>;
  transactions!: Table<Transaction, string>;
  categories!: Table<Category, string>;
  imports!: Table<ImportJob, string>;

  constructor() {
    super('vibe');
    this.version(1).stores({
      accounts: 'id, type, status',
      transactions: 'id, accountId, date, category',
      categories: 'id, name',
      imports: 'id, createdAt, status'
    });
  }
}
export const db = new VibeDB();
````

**Service Worker Registrierung**

```ts
// app/register-sw.ts
export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // optional: UI Hinweis „App aktualisiert“
      });
    });
  }
}
```

**Manifest Beispiel**

```json
{
  "name": "Vibe",
  "short_name": "Vibe",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0B0F14",
  "theme_color": "#0B0F14",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```
