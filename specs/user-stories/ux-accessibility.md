## Story – Accessibility & i18n
**As a** user  
**I want** the app to meet WCAG AA and support locale formatting  
**so that** it is usable by everyone  

### Acceptance Criteria
- Given I use a screen reader  
  When I navigate  
  Then all controls have accessible labels and correct roles  

- Given I set locale to German  
  When amounts are displayed  
  Then numbers and dates follow “de-DE” format  

### Edge Cases
1. RTL language (Arabic/Hebrew) → layout flips correctly  
2. Currency with no decimals (JPY) → displayed correctly  
3. High contrast mode → UI usable and meets contrast ratio  
4. Missing translation → fallback to English with warning in logs  
5. Dynamic locale switch → UI updates without reload  

### Accessibility
- WCAG 2.1 AA baseline  
- Keyboard-only navigation possible  
- Focus indicators visible  

### Telemetry
- locale_changed {from, to}  
- a11y_audit_failed {element_id, issue}  
- a11y_shortcut_used  

