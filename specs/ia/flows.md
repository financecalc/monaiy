### 1) FinTS: Bank verbinden

```mermaid
stateDiagram-v2
  [*] --> Empty: keine Verbindung
  Empty --> Loading: Klick "Bank verbinden"
  Loading --> TAN_Required: TAN erforderlich?
  TAN_Required --> Loading: TAN eingeben
  Loading --> Success: Konto & Saldo geladen
  Loading --> Error: ungültig | Timeout
  Error --> Loading: Retry
  Success --> [*]
```

### 2) PayPal Sync

```mermaid
stateDiagram-v2
  [*] --> Ready
  Ready --> Loading: Klick "Sync PayPal"
  Loading --> Success: neue Transaktionen (0..n)
  Loading --> Empty: keine neuen Transaktionen
  Loading --> Error: 429 | API-Fehler
  Error --> Loading: Retry (Backoff)
  Success --> Ready
  Empty --> Ready
```

### 3) Broker-Import (CSV/PDF)

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Uploading: Datei wählen
  Uploading --> Parsing: Upload OK
  Parsing --> Deduping: Daten geparst
  Deduping --> Persisting: Duplikate gefiltert
  Persisting --> Success: n importiert
  Uploading --> Error: >10MB | Typ nicht erlaubt
  Parsing --> Error: Format ungültig
  Persisting --> Error: DB-Fehler
  Error --> Idle: schließen/Retry
  Success --> Idle
```

### 4) Suche & Filter

```mermaid
stateDiagram-v2
  [*] --> AllVisible
  AllVisible --> Loading: Query/Filter setzen
  Loading --> Success: Treffer > 0
  Loading --> Empty: Treffer = 0
  Loading --> Error: Abfragefehler
  Empty --> AllVisible: Query/Filter löschen
  Success --> AllVisible: Query/Filter löschen
  Error --> Loading: Retry
```

### 5) Transaktions-Detailansicht

```mermaid
stateDiagram-v2
  [*] --> Collapsed
  Collapsed --> Loading: Zeile expandieren
  Loading --> Success: Metadaten + Raw JSON
  Loading --> Empty: keine Zusatzdaten
  Loading --> Error: Fetch/Parsing-Fehler
  Success --> Collapsed: einklappen
  Empty --> Collapsed: schließen
  Error --> Collapsed: schließen/Retry
```

### 6) Manuelles Tagging (einzelne Transaktion)

```mermaid
stateDiagram-v2
  [*] --> Ready
  Ready --> Loading: Tag hinzufügen/entfernen
  Loading --> Success: gespeichert
  Loading --> Error: Validierung/Netz/DB
  Error --> Loading: Retry
  Success --> Ready
```

### 7) Mehrfachauswahl (Bulk Actions, Phase 2)

```mermaid
stateDiagram-v2
  [*] --> NoneSelected
  NoneSelected --> NoneSelected: Aktion ohne Auswahl (disabled)
  NoneSelected --> Selecting: Checkbox aktiv
  Selecting --> ActionChoose: "Tag" | "Export"
  ActionChoose --> Loading: bestätigen
  Loading --> Success: abgeschlossen
  Loading --> PartialError: teilweise fehlgeschlagen
  Loading --> Error: komplett fehlgeschlagen
  PartialError --> Selecting: Details/Retry
  Success --> Selecting: Auswahl behalten/clearen
  Error --> Selecting: Retry/Abbruch
```

### 8) Budgets

```mermaid
stateDiagram-v2
  [*] --> NoLists
  NoLists --> Creating: "Neue Liste" + Budget
  Creating --> Success: Liste angelegt
  Creating --> Error: Validierung/DB
  Success --> HasLists
  HasLists --> Editing: Tags zuordnen
  Editing --> HasLists: gespeichert
  Editing --> Error: Speichern fehlgeschlagen
  HasLists --> OverBudget: Ausgaben > Budget
  OverBudget --> HasLists: Anpassung unter Limit
```

### 9) Befehlspalette (⌘K/Ctrl+K)

```mermaid
stateDiagram-v2
  [*] --> Closed
  Closed --> Open: Shortcut/Knopf
  Open --> Loading: Tippen -> Fuzzy
  Loading --> Empty: keine Treffer
  Loading --> Ready: Trefferliste
  Ready --> Executing: Enter auf Command
  Executing --> Success: Aktion ok, schließt
  Executing --> Error: Fehlertoast
  Empty --> Open: Query ändern
  Error --> Open: offen/zu
  Success --> Closed
```

### 10) Offline-Modus (Cache & Sync)

```mermaid
stateDiagram-v2
  [*] --> Online
  Online --> Offline: Verbindung verloren
  Offline --> CacheReady: Cache vorhanden
  Offline --> Empty: kein Cache
  CacheReady --> Queueing: Offline-Änderungen
  Queueing --> CacheReady: lokal gespeichert
  Offline --> Online: wieder online
  Online --> Syncing: Queue senden
  Syncing --> Success: alles synchron
  Syncing --> PartialError: einige fehlgeschlagen
  Syncing --> Error: Sync fehlgeschlagen
  PartialError --> Online: Rest in Queue
  Success --> Online
  Error --> Online: Retry Backoff
```

### 11) Benachrichtigungen / Toasts

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Shown: showToast(type,msg)
  Shown --> AutoDismissed: Timeout
  Shown --> Dismissed: Klick "X"
  Shown --> Clicked: CTA (z. B. Retry)
  Clicked --> Idle: Aktion triggert anderen Flow
  AutoDismissed --> Idle
  Dismissed --> Idle
```
