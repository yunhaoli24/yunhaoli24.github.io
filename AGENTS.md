# Repository Guidelines

This repo is a Nuxt 4 portfolio. Keep changes focused, typed, and easy to review. Favor small PRs that ship safely.

## Project Structure & Module Organization

- `app/app.vue` is the main page shell; sections and data live here until factored out.
- `app/components` holds reusable UI
- `app/assets/css/tailwind.css` provides global styles; `public/` serves static files at the root path.
- `nuxt.config.ts` is the source of truth for modules, color mode, and build config; `components.json` tracks the shadcn-nuxt design tokens. Avoid editing `node_modules/`; lockfile is `pnpm-lock.yaml`.

## Build, Test, and Development Commands

- `pnpm install` (pnpm 10+) to install deps.
- `pnpm dev` to run Nuxt locally with HMR at the default port.
- `pnpm lint` runs oxlint (type-aware, auto-fix) and oxfmt; use before commits to keep diffs clean.
- `pnpm build` generates the production bundle; `pnpm preview` serves the built output for a final check.
- `pnpm generate` emits a static build when needed for static hosting.

## Coding Style & Naming Conventions

- Use TypeScript and `<script setup lang="ts">`; prefer `const`, typed objects, and explicit props/emits.
- Indent with 2 spaces; keep imports sorted logically: Vue/Nuxt, third-party, then local.
- Components use PascalCase filenames; composables or helpers use camelCase. Co-locate small section-specific components under `app/components/` before adding new folders.
- Styling is Tailwind-first; merge conditional classes with `cn(...)` to avoid duplicates. Keep class lists readable (group by layout, color, state).
- When building components, rely on the UI primitives in `components/ui`; do not modify them—create thin wrappers if you need new variants or behaviors.

## Testing Guidelines

- No automated test harness is present yet. Manually verify UI flows via `pnpm dev` and browser inspection.
- When adding tests, prefer Vitest + Nuxt test utils; place specs under `tests/` mirroring the source path. Keep fixtures small and deterministic.
- Document any manual checks (browsers, viewport sizes, dark mode) in the PR description.

## Commit & Pull Request Guidelines

- Commit messages should be short, imperative, and scope-oriented (e.g., `feat: add project badges`, `chore: tighten lint config`).
- PRs need a concise summary, linked issue (if any), and screenshots/gifs for UI changes. Note what was manually tested and whether `pnpm lint`/`pnpm build` were run.
- Keep diffs focused; split unrelated refactors. Add inline comments when decisions are non-obvious.
