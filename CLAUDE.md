# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is **not an application** — it is a **reference design pack** consumed by other Next.js + shadcn/ui projects (EverEx 혁신실 backoffice services: AI-Crawler, Compass, etc.). There is no `package.json`, no build, no test suite, and no dev server in this repo. Files here are meant to be *read* or *copied into* a downstream project. Compiled `.js` / `.d.ts` artifacts are committed alongside their `.tsx` / `.ts` sources — treat the `.tsx`/`.ts` as source of truth and do not hand-edit the compiled output.

Primary entry point for users/agents coming in cold: `design-system/README.md` (the Quick Start) and `PROMPT.md` (the prompt template given to Claude Code in downstream projects).

## Repository layout (conceptual, not exhaustive)

- `foundations/` — Markdown-only design principles (colors, typography, spacing, elevation, animation). These are **documentation**, not code.
- `tokens/` — Drop-in config: `globals.css` (CSS variables), `tailwind.config.reference.ts` (reference, merge into target), `utils.ts` (`cn()` helper).
- `components/` — shadcn/ui component overrides. Diffs from vanilla shadcn are marked with `// [EverEx]` comments.
- `layout/` — Layout references (`Header`, `AdminLayout`, `PageLayout`, `LoginPage`, `ThemeToggle`). Service-specific logic is stubbed with `// [CUSTOMIZE]` markers.
- `examples/` — Full-page examples demonstrating combined patterns.
- `migration/` — `checklist.md` (19-step adoption checklist), `diff-summary.md` (token-by-token shadcn→EverEx comparison), `compass-migration.md`.
- `assets/` — Shared EverEx logo PNGs (same across all services).

## Cross-service fixed specs — DO NOT CHANGE

These values are part of the contract between services. Any change here is a breaking change for every downstream consumer:

| Item | Spec |
|------|------|
| Header height | **49px** (`py-2.5` + content + `border-b`) — sidebar heights and sticky offsets depend on this |
| Login page layout | Split panel (brand + form) via `layout/LoginPage.tsx` — customize via props only, never edit the layout |
| Primary color | Teal `173° 55% 36%` (light) / `173° 50% 42%` (dark) |
| Font | Pretendard Variable (Korean-first; Inter is explicitly rejected) |

When editing `layout/LoginPage.tsx` or `layout/Header.tsx`, preserve these specs. If a change genuinely needs to cross this line, surface it explicitly — it is a versioning decision, not a local edit.

## Conventions used in source files

- `// [EverEx]` — marks a deviation from vanilla shadcn/ui (in `components/`). When adding or editing a component override, keep these comments accurate so downstream readers can see what differs.
- `// [CUSTOMIZE]` — marks a point the downstream consumer must adapt (in `layout/`: auth hooks, routes, i18n strings, logo paths). When the service-specific bit of a reference component should not be committed as-is, leave a `// [CUSTOMIZE]` marker rather than a fake value.
- Tokens over hex: never introduce raw hex or `slate-*`/`gray-*` utility classes in component/layout source. Use semantic tokens (`bg-background`, `text-foreground`, `border-border`, etc.) so light/dark theming works through CSS-variable swap alone. The `migration/diff-summary.md` table is the canonical mapping.

## Typical edits and how to validate them

There is no build or test runner, so validation is by inspection:

- **Token changes** (`tokens/globals.css`): update the matching row in `migration/diff-summary.md` and, if semantically relevant, `foundations/01-colors.md`. Both light and dark blocks must stay in sync.
- **Component override** (`components/*.tsx`): update the "변경사항" row in `design-system/README.md` and `components/README.md` if the deviation summary changes. Keep `// [EverEx]` comments truthful.
- **Layout change** (`layout/*.tsx`): if it touches a fixed spec (header height, login split), it is almost certainly wrong — stop and confirm. Otherwise, keep `layout/README.md`'s spec table and diagrams consistent.
- **New step in adoption flow**: add to `migration/checklist.md` (numbered, phased) and, if user-facing, to `PROMPT.md`.

Do not regenerate the committed `.js` / `.d.ts` / `.d.ts.map` files by hand; if they drift from their `.tsx`/`.ts` source, flag it rather than silently "fixing" one side.

## Writing style

Documentation in this repo is **Korean-primary with English technical terms**. Match the existing voice — do not translate Korean prose to English, and do not rewrite English code identifiers to Korean. Tables, code blocks, and CSS variable names stay in English; explanatory prose stays in Korean.
