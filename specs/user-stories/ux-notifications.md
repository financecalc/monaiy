## Story – Notifications / toasts

**As a** user  
**I want** to see notifications (success, error, sync complete)  
**so that** I understand system feedback

### Acceptance Criteria

- Given I trigger sync  
  When it succeeds  
  Then I see “Sync complete” toast

- Given sync fails  
  When error returned  
  Then I see error toast with retry option

### Edge Cases

1. Multiple notifications → stack vertically with dismiss option
2. Notification too long → truncated with tooltip
3. Screen reader → toast announced aria-live=assertive
4. User dismisses → removed from DOM
5. Notification timeout → auto-dismiss after 5s

### Accessibility

- Toasts are aria-live regions with role=status/alert
- Dismiss button keyboard operable
- Contrast ratio for backgrounds meets AA

### Telemetry

- notification_shown {type, message_id}
- notification_dismissed {message_id}
- notification_clicked {message_id}
