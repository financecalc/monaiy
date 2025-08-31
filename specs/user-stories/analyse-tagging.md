## Story 3.1 - Manual tagging

**As a** user  
**I want** to assign tags to transactions  
**so that** I can analyze expenses by category

### Acceptance Criteria

- Given a transaction is visible  
  When I assign tag “Groceries”  
  Then it shows a tag chip and persists

- Given multiple tags exist  
  When I remove one  
  Then others remain

### Edge Cases

1. Duplicate tag names → merge or prevent.
2. Tags with emoji/special chars → rendered safely.
3. Very long tags → truncated with tooltip.
4. Bulk tagging → succeeds per item.
5. Offline tagging → queued for sync.

### Accessibility

- Tag chips are buttons with accessible remove action.
- Keyboard operable tag add/remove.
- Color distinctions supplemented with text.

### Telemetry

- tag_created {name}
- tag_assigned {transaction_id, tag}
- tag_removed {transaction_id, tag}
- tag_assignment_failed {reason}
