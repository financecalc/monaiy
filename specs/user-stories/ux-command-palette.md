## Story – Command palette

**As a** user  
**I want** to open a command palette (⌘K) with fuzzy search  
**so that** I can execute actions quickly without mouse

### Acceptance Criteria

- Given I press ⌘K (Mac) or Ctrl+K (Windows/Linux)  
  When the palette opens  
  Then I see a search input and a list of available commands

- Given I type a query  
  When commands match fuzzily  
  Then I see matching commands ranked by relevance

- Given I press Enter on a command  
  When it executes  
  Then the palette closes and a confirmation is shown

### Edge Cases

1. No commands match → “No results” displayed
2. Long command list → scrollable container
3. Error on execution → toast with error message
4. Mobile device → command palette triggered via button instead of shortcut
5. Shortcut conflict with browser → documented fallback (Alt+K)

### Accessibility

- Palette is role=dialog with focus trap and Esc to close
- Commands are buttons with labels and hints
- Search input has accessible label

### Telemetry

- command_palette_opened
- command_search_query {length, result_count}
- command_executed {command_id, success/failure}
