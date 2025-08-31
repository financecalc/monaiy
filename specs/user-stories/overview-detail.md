## Story – Transaction detail view

**As a** user  
**I want** to expand a transaction row and see metadata and raw data preview  
**so that** I can understand the full context of the transaction

### Acceptance Criteria

- Given I click on a transaction row  
  When the row expands  
  Then I see additional fields (booking date, value date, category, provider, tags) and raw transaction JSON

- Given I collapse the row  
  When I click again  
  Then the row closes and the list view is restored

### Edge Cases

1. Transaction has missing metadata → show placeholder “N/A”
2. Very long purpose string → truncated with “show more” link
3. Raw JSON invalid → display error fallback, not broken UI
4. User expands multiple rows → only one expanded at a time
5. Keyboard focus → expansion works via Enter/Space

### Accessibility

- Row expansion operable via keyboard (Enter/Space)
- Expanded section has role=region with labelledby transaction id
- Raw JSON preview has monospaced font, screen reader accessible

### Telemetry

- transaction_detail_opened {transaction_id}
- transaction_detail_closed {transaction_id}
