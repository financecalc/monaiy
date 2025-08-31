## Story – Performance baseline

**As a** user  
**I want** UI interactions to respond in <200ms  
**so that** the app feels instantaneous

### Acceptance Criteria

- Given I click on navigation  
  When the new view loads  
  Then response time is under 200ms for UI interactions (excluding data sync)

- Given I search transactions  
  When results are filtered  
  Then results update in under 200ms

### Edge Cases

1. Large dataset (>10k tx) → queries still complete within threshold
2. Slow device (mobile) → degrade gracefully with skeletons, still interactive
3. Background sync in progress → no UI blocking
4. Heavy animations → disabled on prefers-reduced-motion
5. Network offline → UI remains snappy with cached data

### Accessibility

- Respects `prefers-reduced-motion`
- No performance optimizations that break screen reader timing

### Telemetry

- ui_interaction_latency {action, duration_ms}
- perf_threshold_exceeded {action, duration_ms}
