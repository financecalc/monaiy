# Finance Dashboard & Expense Tracker with Multi-Bank Integration

## Goal

Build a modern finance app (Web-PWA) that consolidates bank accounts in one interface. Users can manage their finances from a central dashboard, track and analyse their expenses. 
Focus: lightning-fast UX (Superhuman-style, <200ms latency and keyboard-first, everything has shortcuts and focus on command palette ⌘K), multi-integration (FinTS, TradeRepublic CSV, Paypal), offline support.

## Non-Goals

Not a full accounting suite

Not a tax declaration or DATEV export tool

Not for corporate ERP/Accounting integrations (e.g. DATEV, SAP)

Not designed for automated payment execution (e.g. bulk transfers)

No for crypto assets

Not for trading

## Users

Consumers with multiple accounts (checking, savings, credit card), seeking transparency

## Happy Path

User opens the app in the browser and logs in

Clicks “Connect Bank” → Chooses a bank/paypal → enters credentials/uploads csv/logs into paypal depending on the bank

Users sees a list of transctions, grouped by bank account.

User is able to search and filter the transactions (⌘K or “/”)

User can assign transactions to different expense tags

User can analyze expenses and income by tag

User returns later and sees updated data after automatic refresh

## Metrics (MVP)

Time-to-first-account: from signup to first bank data visible (<3 min)

Number of connected providers per user

Import technical success rate (error-free CSV/PDF uploads)

Sync latency: time from click to transactions displayed (<10s for PayPal, <30s for FinTS)

Median time from login to insight (e.g. chart view)

## Hard Constraints

Security: all data is stored on the client device, local database

Performance: UI response time <200ms (mock data for offline fallback)

Offline support: PWA must start without network and show last known data

Idempotency: transactions must not be stored twice → rely on externalId or hashing