## Story 1.3 - Import Trade Republic CSV
**As a** user  
**I want** to upload a CSV from my broker  
**so that** I can track stock transactions alongside my bank data  

### Acceptance Criteria
- Given I select a .csv file under 10 MB  
  When parsing completes successfully  
  Then the transactions appear tagged as “Trade Republic”  

- Given I select an unsupported file type  
  When I submit  
  Then I see “Only CSV or PDF supported”  

### Edge Cases
1. CSV delimiter mismatch (comma vs semicolon) → auto-detect or prompt.  
2. Thousands separators in amounts → parsed correctly.  
3. Duplicate rows → deduped, UI shows “Skipped duplicates”.  
4. Mixed currency rows → require explicit currency column.  
5. Empty file → “No transactions imported”.  

### Accessibility
- File input has visible label, keyboard activation.  
- Import progress announced via aria-live.  
- Error messages have role=alert and proper focus management.  

### Telemetry
- tr_import_started {filename, size}  
- tr_import_success {count}  
- tr_import_empty  
- tr_import_failed {error_type}  
- transaction_ingested {provider: TRADE_REPUBLIC, count}  
