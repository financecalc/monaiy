# PWA Architektur – Vibe

## Ziele
- Installierbar auf iOS, Android, Desktop
- Offline voll nutzbar
- Updates ohne Bruch, klare Update-Kommunikation

## Manifest
Datei: `public/manifest.json`
- name, short_name, description
- start_url: "/"
- display: "standalone"
- background_color, theme_color
- icons in 192, 512, maskable

## Service Worker
Datei: `public/sw.js` oder `app/sw.ts` build-targeted
- Registrierung im Client: `navigator.serviceWorker.register('/sw.js')`
- Empfohlen: Workbox Routen-Helfer

### Caching-Strategien
- HTML Routen: Network-first mit Fallback auf Cache
- Static assets (`_next/static`, Fonts, Icons): Cache-first mit Versionierung
- API-ähnliche lokale Files wie Imports: Stale-while-revalidate
- Dexie Daten: nicht im SW cachen, Daten sind bereits lokal in IndexedDB

### Offline Szenarien
- Startseite offline: vorgerenderte Shell im Cache
- Fehleranzeige bei Import ohne Datei
- Fallback-Page `/offline`

### Update Flow
- SW hört auf `updatefound`
- UI zeigt Banner „Update verfügbar. Neu laden?“
- Klick führt zu `registration.waiting.postMessage({ type: 'SKIP_WAITING' })` und `window.location.reload()`

### Sicherheit
- Nur über HTTPS
- CSP empfehlen:
  - `default-src 'self'`
  - `script-src 'self' 'wasm-unsafe-eval'`
  - `style-src 'self' 'unsafe-inline'` für Tailwind dev, in prod möglichst ohne
- Keine externen Tracker ohne Einwilligung

## IndexedDB Richtlinien
- Tabellen:
  - `accounts` by `id`, Index: `type+status`
  - `transactions` by `id`, Index: `date`, `accountId`, `category`
  - `categories` by `id`, Index: `name`
  - `imports` by `id`, Index: `createdAt`
- Migrationen:
  - Jede Version dokumentieren in `lib/db/migrations.ts`
  - Datenbereinigung in onUpgrade Schritt
- Backups:
  - Export: Auswahl screen → JSON Datei
  - Import: Zusammenfassung vor Commit, Konflikte lösen per „Replace“ oder „Skip“

## Tests für PWA
- E2E:
  - Offline Modus: `context.setOffline(true)`
  - Install Prompt sichtbar
  - SW Registrierung ok
  - Update Banner erscheint nach neuem Build
- Unit:
  - Dexie Repos mit In-Memory Adapter testen