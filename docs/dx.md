# Developer Experience (DX)

This document standardizes local tooling and CI gates for the project.

## 1) Pre-commit: lint / format / test

### JavaScript/TypeScript (Next.js)

We use **Husky** + **lint-staged**.

**Install**

```bash
npm i -D husky lint-staged prettier eslint typescript vitest @vitest/coverage-v8
npx husky init
```

**package.json**

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx --max-warnings=0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run --coverage",
    "test:unit": "vitest run",
    "build": "next build"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

**.husky/pre-commit**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔎 Running lint-staged…"
npx lint-staged

echo "🧪 Running fast tests (unit/components)…"
npm run test:unit
```

> Tip: keep pre-commit fast; full E2E runs in CI.

### Python (FinTS service)

Use `pre-commit` framework with **black**, **ruff**, **mypy**.

**services/fints_service/.pre-commit-config.yaml**

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.8.0
    hooks:
      - id: black
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.6.9
    hooks:
      - id: ruff
        args: ['--fix']
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.11.1
    hooks:
      - id: mypy
        additional_dependencies: ['types-requests']
```

**Setup**

```bash
pip install pre-commit
pre-commit install
```

---

## 2) CI Gates (GitHub Actions)

**.github/workflows/ci.yml (summary)**

- Node: install, **eslint**, **prettier check**, **typecheck**, **vitest** (unit/components), **build**
- Python: **ruff**, **black --check**, **mypy**, **pytest** (if added)
- E2E: **Playwright** on ephemeral Next.js build
- a11y: **axe**/playwright checks
- Visual regression: Playwright `toHaveScreenshot()` (PR branches only)

Key gates:

- ❌ Fail on ESLint warnings (`--max-warnings=0`)
- ❌ Fail on `format:check` mismatch
- ❌ Fail on type errors
- ❌ Fail on unit or E2E test errors
- ❌ Fail on a11y violations (configured threshold = 0)

See CI file below for full content.

---

## 3) Commit / PR conventions

- **Conventional Commits** (feat, fix, chore, docs, refactor, test, perf, ci)
- PRs must have:
  - Summary & scope
  - Screenshots (UI changes)
  - Tests (unit/E2E) and a11y notes
  - i18n impact
  - Security impact (secrets, tokens)
  - Performance impact (TTI, interaction latency)

- Always update **CHANGELOG.md** via PR with a new entry under **Unreleased**.

---

## 4) Changelog policy

- Format: **Keep a Changelog**, **SemVer**
- Sections: Added / Changed / Fixed / Removed / Security / Deprecated
- Release: Move items from **Unreleased** → **\[x.y.z] - YYYY-MM-DD** when tagging

````

---

### `.github/PULL_REQUEST_TEMPLATE.md`
```markdown
## Summary
<!-- What & why? Link issues/tickets. -->

## Scope
- [ ] Frontend (Next.js)
- [ ] Backend (API routes)
- [ ] Python FinTS service
- [ ] DB/Prisma schema
- [ ] Tests / CI

## Screenshots / Demos
<!-- Before/After, GIFs, or storybook links. -->

## Tests
- [ ] Unit tests added/updated
- [ ] Component tests added/updated
- [ ] Playwright E2E (happy + edge) included
- [ ] Visual regression snapshots updated (if UI changed)

## Accessibility (WCAG AA)
- [ ] Keyboard operable & focus states
- [ ] aria-* labels/roles
- [ ] Color contrast meets AA
- [ ] `prefers-reduced-motion` respected

## Internationalization
- [ ] Strings localized
- [ ] Currency/date formatting checked
- [ ] RTL-safe (if applicable)

## Security / Privacy
- [ ] No secrets/PII in logs
- [ ] Token handling server-side only
- [ ] GDPR impact (export/delete) considered

## Performance
- [ ] Interaction <200ms on target devices (measured)
- [ ] No blocking long tasks on main thread
- [ ] Code-splitting/chunking considered

## Telemetry
- [ ] Events added/updated (names, payloads)
- [ ] Schemas documented and validated

## Checklist
- [ ] CHANGELOG.md updated (Unreleased)
- [ ] Docs updated (README / docs/)
- [ ] Migrations safe (if any)

### Notes for Reviewer
<!-- Anything that helps review faster: risky areas, how to test locally, flags, follow-ups. -->
````
