## Bewertung der Navigationslabels (Laien-Tauglichkeit)

- **Konten** (statt „Accounts“) – klar & gebräuchlich ✅
- **Umsätze** (statt „Transactions“) – im deutschsprachigen Banking etabliert ✅
- **Analysen** (statt „Insights“) – weniger abstrakt, besser verständlich ✅
- **Einstellungen** – Standard in iOS/Android ✅
- **Tags** vs. **Kategorien** – _Konfliktpotenzial_: Für Laien ist „Kategorie“ intuitiver; „Tags“ ist flexibler. **Empfehlung:** „Kategorien (Tags)“ als kombiniertes Label im UI erklären.
- **Mehrfachauswahl** (statt „Bulk Actions“) – deutlich einfacher ✅
- **Befehlspalette** – technischer Begriff; als sekundäre Bezeichnung „Schnellbefehle (⌘K)“ nutzen ✅
- **Benachrichtigungen**, **Offline-Modus**, **Reaktionszeit** – selbsterklärend ✅

### Einfache Alternativen (DE / EN)

- Konten / Accounts
- Umsätze / Transactions
- Analysen / Insights
- Einstellungen / Settings
- Kategorien (Tags) / Categories (Tags)
- Mehrfachauswahl / Multi-select
- Schnellbefehle (⌘K) / Command Palette
- Benachrichtigungen / Notifications
- Offline-Modus / Offline mode

## Heuristik-Check (Nielsen) & Mobile-Guidelines

- **Sichtbarkeit des Systemstatus**: Offline-Badge, Sync-Toasts, Lade-Skeletons – ✔️ vorhanden.
- **Übereinstimmung mit der realen Welt**: „Umsätze“, „Konten“, „Budgets“ – ✔️ domänennah.
- **Benutzerkontrolle & Freiheit**: „Abbrechen“, „Wiederholen“, Undo bei Tagging – **Achten:** überall anbieten.
- **Konsistenz & Standards**: Einheitliche Begriffe (nicht „Account“/„Konto“ mischen) – **Achten:** Glossar einhalten.
- **Fehlervermeidung**: Dateityp-Check, Größenlimit beim Upload – ✔️ eingeplant.
- **Wiedererkennung statt Erinnerung**: Filterchips sichtbar halten – ✔️.
- **Flexibilität & Effizienz**: Shortcuts, Schnellbefehle – ✔️, aber **Fallback** für Mobile nötig.
- **Ästhetik & minimalistisches Design**: Kürze Labels, klare Hierarchie – ✔️.
- **Hilfe & Dokumentation**: Inline-Hilfen (i-Icon) für FinTS-Felder – **Empfehlung**.

**iOS/Android UX-Guidelines**

- **Bottom-Tab max. 5 Einträge** (Mobile): „Konten“, „Umsätze“, „Analysen“, „Einstellungen“ – ✔️, „Systemweit“ bleibt global.
- **Buttons = Verben** („Verbinden“, „Synchronisieren“, „Hochladen“) – ✔️.
- **A11y**: Touch-Ziele ≥44 pt/48 dp, Kontrast AA, Fokus sichtbar – **Achten:** in UI-Kit verankern.
- **Gesten**: Alternative zur Befehlspalette (Floating Action Button) – **Empfehlung**.

## Inkonsistenzen & Navigationsfallen

- **„Tags“ vs. „Kategorien“** – doppeltes Konzept möglich → **Klar regeln** (Tags als freie Labels, „Kategorie“ = 1 Pflichtfeld?).
- **„Analysen“ vs. „Budgets“** – Budgets sind Teil der Analysen, aber eigener Task-Flow → **okay**, getrennt lassen.
- **„Reaktionszeit“ als Menüpunkt** – kein Menüpunkt, sondern **Leitlinie** → nicht navigierbar darstellen.
- **Befehlspalette als Item** – eher **Shortcut-Feature** als eigener Screen → nicht in Hauptnavigation aufnehmen.

## Benennungsrichtlinien (Kurz)

- Deutsch zuerst, englischer Begriff nur in Klammern wenn verbreitet.
- Einheitliche Terminologie quer durch App & Docs.
- Buttons als Verben, Menüs als Nomen.
- Maximal 2 Wörter pro Label.
- Keine Abkürzungen außer allgemein verständlichen (CSV, PDF).
