## Story 3.2 - Monthly expense summary

**As a** user  
**I want** to see monthly totals (income, expenses, net)  
**so that** I can understand my financial health

### Acceptance Criteria

- Given transactions exist  
  When I open dashboard  
  Then totals for income, expenses, and net are displayed

- Given no transactions exist  
  When I open dashboard  
  Then “No data yet” appears

### Edge Cases

1. All amounts 0 → display 0 with currency.
2. Multi-currency → totals per currency, no auto-conversion in MVP.
3. Future-dated transactions → excluded.
4. Very large values → formatted safely.
5. Only income or only expenses → missing category shows 0.

### Accessibility

- Summary cards have headings for SR navigation.
- Screen readers read figures with context.
- Contrast for positive/negative meets WCAG AA.

### Telemetry

- summary_viewed {month}
- summary_values_computed {expense_total, income_total, net, currency_mode}
