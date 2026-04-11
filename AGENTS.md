---
description: 
alwaysApply: true
---

AGENTS.md

This file documents how automated coding agents should operate inside this repository. It codifies build/lint/test rituals, coding conventions, and how to handle optional guidance sources (Cursor rules, Copilot rules) if they exist.

Overview

- Agents should rely on project scripts (npm/yarn/pnpm) when possible.
- When running tests, prefer deterministic, single-test runs to isolate failures.
- Adhere to the code style guidelines to keep the codebase consistent and maintainable.

Build, Lint, Test Commands

- Build
  - npm run build
  - yarn build
- Lint
  - npm run lint
  - yarn lint
  - npm run lint -- --fix (auto-fix where safe)
- Typecheck (TypeScript projects)
  - npm run typecheck
- Tests
  - npm test
  - yarn test
  - pnpm test

Running a Single Test (popular frameworks)

- Jest
  - Run a test by name (exact match or substring):
    > npm test -- -t "renders the home page"
  - Run a single test file only: (adjust path as needed)
    > npm test -- path/to/file.test.ts
- Vitest
  - Run by test name pattern:
    > npx vitest run --testNamePattern="renders the home page"
  - Run a single test file:
    > npx vitest run path/to/file.test.ts
- Mocha (example) -- if used in this repo
  - Run a single spec file:
    > npm test -- --grep "suite name" --path path/to/test.js

Code Style Guidelines

- General

  - Use TypeScript when possible; prefer explicit types over any.
  - Prefer named exports; avoid default exports unless required by the module system.
  - Keep functions small and focused; aim for single responsibility.
  - Write readable, self-documenting code; use JSDoc/TSDoc on public API.

- Imports

  - External modules first, then internal modules.
  - Use absolute imports for project paths (e.g. '@/utils/foo') and relative imports otherwise.
  - Omit file extensions for TS/JS imports when supported by the module resolver.
  - Group imports: side-effect imports first, then type imports, then value imports (optional grouping).
  - Sort individual groups alphabetically; avoid duplicate imports.
  - Avoid deep or brittle relative paths; prefer path aliases where configured.

- Formatting

  - Enforce with Prettier; align with repository's Prettier config if present.
  - Use LF line endings; 2-space indentation; trailing commas where supported (ES2017+).
  - End files with a newline; keep code within 100-120 line blocks when possible.
  - Prefer const over let where values do not change.

- Types

  - Define interfaces/types for public structures; prefer type aliases for composite shapes if clearer.
  - Avoid using any; when unknown surfaces, use unknown and narrow with type guards.
  - Use discriminated unions for robust runtime checks.
  - Export types in a dedicated types/index.ts if it improves discoverability.

- Naming Conventions

  - Variables: camelCase; constants: ALL_CAPS; functions: camelCase.
  - Types/classes: PascalCase; interfaces: IExample where appropriate.
  - Files: kebab-case; components/selectors/utils should map to folder structure well.
  - Boolean flags: prefix with is/has/can; avoid ambiguous names.

- Error Handling

  - Do not swallow errors; rethrow with context when propagating.
  - Create and throw custom error classes for domain-specific issues.
  - Return meaningful error messages and codes; include actionable hints when possible.
  - Use try/catch around I/O/network boundaries; log and escalate failures appropriately.

- Testing

  - Unit tests should be deterministic, fast, and isolated.
  - Use describe/it blocks; test name should describe expected behavior.
  - Mock external dependencies; prefer library-specific mocks over hand-wired stubs.
  - Coverage: aim for high coverage; fail CI on missing coverage thresholds if configured.

- Performance & Security

  - Avoid premature optimization; optimize hot paths with profiling if needed.
  - Do not expose secrets in logs or errors; redact in messages.

- Accessibility & UX

  - Where applicable, consider accessibility in UI components; test keyboard navigation.

- Cursor Rules (if present)
- Copilot Rules (if present)

Cursor Rules

- If a repository contains Cursor rules (e.g. .cursor/rules/ or .cursorrules), ensure agents follow them:
- Respect rule precedence; validate changes against all applicable cursor constraints.
- Do not bypass cursor constraints even for exploratory edits; document all deviations.

Copilot Rules

- If .github/copilot-instructions.md exists, follow its guidance for generated code quality, comments, and structure.
- Do not rely on Copilot to produce large, risky edits without review.
- Include explicit notes when Copilot suggestions were used and how they were validated.

Examples

- Build, lint, test sequence:

```bash
npm ci
npm run lint
npm run build
npm test
```

- Single test (Jest):

```bash
npm test -- -t "renders the home page"
```

- Single test file (Vitest):

```bash
npx vitest run path/to/file.test.ts
```

Notes

- This file is a living document; update as tooling or conventions evolve.
- If a guideline conflicts with project realities, discuss and adapt, then reflect the change here.
