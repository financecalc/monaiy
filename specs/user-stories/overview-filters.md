## Story 2.2 - Transaction filters
**As a** user  
**I want** to filter transactions by provider and category  
**so that** I can narrow down my view  

### Acceptance Criteria
- Given multiple providers  
  When I select “PayPal”  
  Then only PayPal transactions are shown  

- Given I select both provider and category  
  When I apply filters  
  Then results satisfy both filters  

### Edge Cases
1. Filter returns 0 rows → show empty state with “Clear filters”.  
2. Rapid toggling → last selection wins.  
3. Persist filters across reload → URL query/local storage.  
4. Category not present → still apply filter, show “0 results”.  
5. Mobile viewport → filter accessible and usable.  

### Accessibility
- Filter controls are keyboard operable and grouped.  
- Screen reader announces filter change + result count.  
- Focus returns correctly after closing filter menu.  

### Telemetry
- filter_applied {provider, category, count}  
- filter_cleared  
- filter_persisted {enabled}  