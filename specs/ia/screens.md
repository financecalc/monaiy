## Konten

### Bank-Verbindungen

* **Content:** Verknüpfte Banken (FinTS), „Bank verbinden“, letzter Sync, Fehlerprotokoll
* **States:** Empty, Loading (OAuth/FinTS-Handshake/TAN), Success, Error (inkl. Retry)

### PayPal

* **Content:** „Jetzt synchronisieren“, letzter Sync, Limit-Hinweise (429), Protokoll
* **States:** Empty (nicht verbunden), Loading, Success (n neue), Empty (0 neue), Error

### Broker-Import

* **Content:** Upload (.csv/.pdf), Import-Historie mit Größe/Typ/Datum/Status
* **States:** Empty (keine Uploads), Uploading, Parsing, Persisting, Success, Error

## Umsätze

### Alle Umsätze

* **Content:** Tabelle (Datum, Empfänger, Betrag, Konto, Tags), Paginator/Infinite Scroll
* **States:** Empty (keine Daten), Loading (Skeletons), Success, Error

### Detailansicht

* **Content:** Metadaten (Buchungs-/Wertstellung), Kategorie/Tags, Anbieter, Rohdaten-JSON
* **States:** Collapsed, Loading (expand), Success, Empty (keine Zusatzdaten), Error

### Suche & Filter

* **Content:** Global Search (/), Filterchips (Konto/Anbieter/Kategorie/Zeitraum)
* **States:** AllVisible, Loading (Query/Filter), Success (Treffer > 0), Empty (0 Treffer), Error

### Tags (Manuelles Tagging)

* **Content:** Tag-Chips an Zeilen, „Tag hinzufügen“, „Tag entfernen“, Auto-Suggest
* **States:** Ready, Loading (Speichern), Success, Error (Validierung/Netz/DB)

### Mehrfachauswahl (Phase 2)

* **Content:** Checkboxen, Toolbar (Taggen, Export), Auswahl-Zähler, Fortschrittsindikator
* **States:** NoneSelected, Selecting, ActionChoose, Loading, Success, PartialError, Error

## Analysen

### Monatsübersicht

* **Content:** Einnahmen/Ausgaben/Netto je Monat, einfache Charts, Zeitraumwahl
* **States:** Empty (keine Daten), Loading, Success, Error

### Budgets

* **Content:** Listen mit Budgetbetrag, Fortschritt, Warnung bei Überschreitung
* **States:** NoLists, Creating, HasLists, OverBudget, Editing, Error

### Wiederkehrend (Phase 2)

* **Content:** Erkannte Serien (Gegenpartei, Intervall, nächstes Datum), Korrekturaktionen
* **States:** Empty (keine erkannt), Loading, Success, Error

## Einstellungen

### Präferenzen

* **Content:** Sprache/Region, Währung, Theme/Dark Mode, Nummern-/Datumsformat
* **States:** Ready (Form), Saving, Success, Error

### Sicherheit & Datenschutz

* **Content:** Datenexport (CSV/JSON), Daten löschen, Hinweise, Versionsinfo
* **States:** Empty (noch kein Export), Loading, Success, Error

### Barrierefreiheit & Sprache

* **Content:** Schriftgröße, Kontrastmodus, Screenreader-Hinweise, RTL-Umschaltung
* **States:** Ready, Saving, Success, Error

## Systemweit

### Befehlspalette

* **Content:** Suchfeld, Trefferliste, Shortcuts, Beschreibung je Command
* **States:** Closed, Open, Loading (Fuzzy), Ready, Empty, Executing, Success, Error

### Benachrichtigungen

* **Content:** Toast-Stack mit Typ (Info/Erfolg/Fehler), CTA (Retry)
* **States:** Idle, Shown, AutoDismissed, Dismissed, Clicked

### Offline-Modus

* **Content:** Offline-Hinweis, Caching-Status, Sync-Queue, „Bei Online synchronisieren“
* **States:** Online, Offline, CacheReady, Empty (kein Cache), Queueing, Syncing, Success, PartialError, Error