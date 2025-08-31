## Story 1.1 - Connect a bank via FinTS

**As a** user  
**I want** to connect my bank account via secure FinTS login  
**so that** I can import transactions automatically

### Acceptance Criteria

- Given I am logged in  
  When I provide BLZ, login, PIN, and FinTS URL  
  Then my bank account appears in the accounts list with current balance

- Given I provide invalid credentials  
  When the login fails  
  Then I see an error banner with a retry option

- Given I already added a bank account
  Then my bank account appears again after login

### Edge Cases

1. Provider returns success but balance endpoint fails → account shell shows “balance unavailable” with retry.
2. User connects the same bank twice → duplicate prevented by unique key.
3. FinTS server times out (>30s) → UI shows “Timeout, try again”.
4. TAN challenge required but not implemented → message: “Not supported in MVP”.
5. PIN locked after multiple wrong attempts → error “Account locked”.

### Accessibility

- “Connect Bank” button has role=button, accessible label, and visible focus.
- Status messages announced via aria-live=polite.
- Error banner has role=alert and dismissible via keyboard.

### Telemetry

- fints_connect_started {blz}
- fints_connect_success {account_id}
- fints_connect_failed {error_code}
- account_upserted {provider: FINTS, account_id, dedup=true|false}
