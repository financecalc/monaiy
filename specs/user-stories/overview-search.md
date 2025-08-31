## Story 2.1 - Global search
**As a** user  
**I want** to search across all transactions  
**so that** I can quickly find specific payments  

### Acceptance Criteria
- Given I type a keyword  
  When I press Enter  
  Then only matching transactions by purpose, counterparty, or amount are shown  

- Given I clear the search field  
  When input is empty  
  Then all transactions reappear  

### Edge Cases
1. Numeric query with decimal comma → matches amounts.  
2. Query with special chars → escaped safely.  
3. Very long query → truncated.  
4. Large dataset → completes under 100 ms.  
5. No results → show “No results found”.  

### Accessibility
- Input has label, not placeholder only.  
- Result count changes announced via aria-live.  
- Focus ring visible.  

### Telemetry
- search_opened  
- search_query_submitted {length}  
- search_results_shown {result_count}  
- search_cleared  