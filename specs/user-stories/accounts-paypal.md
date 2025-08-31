## Story 1.2 - Sync PayPal transactions

**As a** user  
**I want** to fetch my PayPal transactions  
**so that** I have an overview of my payments in one dashboard

### Acceptance Criteria

- Given I have linked PayPal  
  When I click “Sync PayPal”  
  Then new PayPal transactions from the last 90 days appear without duplicates

- Given there are no new transactions  
  When I sync  
  Then I see a message “Up to date”

### Edge Cases

1. No new transactions → show “Up to date”.
2. API rate limited (429) → backoff + “Try again later”.
3. Date filter mismatch (UTC vs local) → normalize
4. Partial page results → pagination continues until complete.
5. Non-EUR transactions → display with correct currency symbol.

### Accessibility

- Button labeled “Sync PayPal” with aria-label.
- Transactions container has aria-busy during sync.
- Toast messages aria-live=polite and dismissible by keyboard.

### Telemetry

- paypal_sync_started
- paypal_sync_success {count}
- paypal_sync_empty
- paypal_sync_failed {error_code}
- transaction_ingested {provider: PAYPAL, count}
