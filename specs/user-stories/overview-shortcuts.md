## Story 2.3 - Keyboard shortcuts

**As a** user  
**I want** to navigate via keyboard  
**so that** I can work faster without the mouse

### Acceptance Criteria

- Given the app is focused  
  When I press Cmd+K or Ctrl+K  
  Then the command palette opens with focus in search field

- Given the palette is open  
  When I select a command with Arrow + Enter  
  Then it executes and the palette closes

### Edge Cases

1. Non-English keyboard layouts → combos still work.
2. System-reserved keys → not overridden.
3. Screen reader active → no focus trap.
4. Repeated keydown → only one action fires.
5. Mobile device → alternative gesture provided.

### Accessibility

- Palette has role=dialog with focus trap.
- Commands have accessible names.
- Execution result announced via aria-live.

### Telemetry

- shortcut_used {key_combo}
- command_executed {command_id, success}
- command_failed {command_id, error_code}
