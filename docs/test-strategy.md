# Test Strategy

## Goals
- Prevent regressions in critical flows (connect, sync, import, explore, tag)
- Enforce a11y (WCAG AA) and UX performance (<200ms interactions)
- Catch visual diffs early with automated snapshots

## Test Pyramid
1. **Unit tests** (Vitest) — pure functions, utils, hooks
2. **Component tests** (Vitest + @testing-library/react) — UI states: Empty/Loading/Success/Error
3. **E2E tests** (Playwright) — Happy Path + Edge cases on real build
4. **A11y** (axe via Playwright) — zero violation policy in core screens
5. **Visual regression** (Playwright `toHaveScreenshot`) — PR-only, stable selectors

---

## Scope & Critical Paths

### Happy Paths (E2E)
- **FinTS connect** → account listed with balance
- **PayPal sync** → new transactions visible, no duplicates
- **TR import** → CSV parsed, items appear with provider tag
- **Search & filter** → expected subset visible, clear resets
- **Tagging** → add/remove tag persists and renders
- **Budgets** → list created, totals roll up (per currency)

### Edge Cases (E2E)
- FinTS timeout / invalid credentials → error banner + retry
- PayPal 429 → backoff message
- TR invalid CSV → error state with guidance
- Search no results → empty state, clear CTA
- Offline open → cached data visible; queue tag change and sync later

---

## Unit & Component Tests (Vitest)

**Examples**
- utils/normalizers: currency formatting, date parsing
- hooks/useSearch: filter logic (case-insensitive, numeric)
- components/TransactionsTable:
  - renders skeletons when loading
  - shows empty vs. populated
  - highlights positive/negative amounts
- components/TagChips:
  - add/remove events
  - handles long names, emoji

**Commands**
```bash
npm run test:unit
````

---

## Playwright E2E

**Install**

```bash
npm i -D @playwright/test axe-playwright
npx playwright install --with-deps
```

**playwright.config.ts (essentials)**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  retries: 1,
  use: {
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } }
  ]
});
```

**Sample: Happy + Edge**

```ts
// e2e/transactions.spec.ts
import { test, expect } from '@playwright/test';

test('search filters transactions (happy)', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Suche').click();
  await page.keyboard.type('Rewe');
  await expect(page.getByRole('row')).toContainText('REWE');
});

test('search shows empty state when no results (edge)', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Suche').fill('zzzz-not-found');
  await expect(page.getByText('Keine Umsätze gefunden')).toBeVisible();
});
```

---

## Accessibility (axe via Playwright)

**Example**

```ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('dashboard has no a11y violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page, undefined, {
    detailedReport: true,
    detailedReportOptions: { html: true }
  });
});
```

Policy: **0 violations** on core screens (Dashboard, Transactions, Connect).

---

## Visual Regression

Use Playwright’s `toHaveScreenshot()` with stable containers.

```ts
test('transactions table visual', async ({ page }) => {
  await page.goto('/transactions');
  const table = page.locator('[data-testid="transactions-table"]');
  await expect(table).toHaveScreenshot('transactions-table.png', { maxDiffPixels: 100 });
});
```

Guidelines:

* Mask dynamic content (dates, balances) with CSS or `mask` option
* Run on CI with deterministic viewport & fonts
* Only for PR branches; store snapshots in repo

---

## CI Integration (GitHub Actions)

**Jobs**

1. `lint`: eslint + prettier check + typecheck
2. `unit`: vitest (coverage gate, e.g., statements ≥ 80%)
3. `build`: next build
4. `e2e`: start preview → run Playwright (happy + edge)
5. `a11y`: axe checks on key pages
6. `visual`: screenshot tests (PR only)

Artifacts on failure: traces, screenshots, videos, axe reports.

---

## Quality Gates

* ESLint: no warnings
* Prettier: clean
* Typecheck: clean
* Unit/Component coverage: **≥80% statements/branches**
* E2E: all happy + selected edge pass
* a11y: **0 violations** core pages
* Visual: no diffs beyond threshold

---

## Ownership & Reporting

* Test owners per folder (`CODEOWNERS`).
* CI posts summary to PR with:

  * Coverage %
  * E2E pass/fail + links to traces
  * a11y violations (if any)
  * Visual diff links