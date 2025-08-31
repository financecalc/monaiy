## Story – Bulk actions (Phase 2)

**As a** user  
**I want** to select multiple transactions and apply bulk actions (tag, export)  
**so that** I can work faster with large sets

### Acceptance Criteria

- Given I select multiple transactions  
  When I choose “Add Tag”  
  Then the tag is applied to all selected transactions

- Given I select multiple transactions  
  When I choose “Export”  
  Then a CSV with those transactions is downloaded

### Edge Cases

1. No transactions selected → bulk action disabled
2. Partial failure (one tag apply fails) → error shown with retry option
3. Large selection (>1000 tx) → batch applied in background with progress indicator
4. Export with special characters → CSV correctly encoded UTF-8
5. Offline mode → export still works with local cache, tag changes queued

### Accessibility

- Multi-select accessible with checkboxes and labels
- Bulk action toolbar has role=toolbar and ARIA labels
- Progress updates announced via aria-live

### Telemetry

- bulk_action_started {action, count}
- bulk_action_success {action, count}
- bulk_action_failed {action, count, error_code}
