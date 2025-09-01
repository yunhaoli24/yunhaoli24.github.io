# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Nuxt 4 application source.
  - `pages/`: File‑based routes (e.g., `index.vue`, `blog/[...slug].vue`).
  - `components/`, `layouts/`, `assets/scss/`: UI building blocks and styles.
- `content/`: Markdown content for the blog (rendered via `@nuxt/content`).
- `public/`: Static files served as‑is (e.g., images, `favicon.ico`).
- `nuxt.config.ts`, `uno.config.ts`: App and UnoCSS configuration.
- `.nuxt/`, `.output/`, `dist/`: Generated/build artifacts (do not edit).

## Build, Test, and Development Commands
- `pnpm i`: Install dependencies (pnpm is enforced via `only-allow`).
- `pnpm dev`: Start Nuxt dev server with HMR.
- `pnpm build`: Production build.
- `pnpm preview`: Preview the production build locally.
- `pnpm generate`: Pre‑render static site (useful for static hosting).
- `pnpm start`: Run the built server from `.output/`.
- `pnpm lint`: Lint and auto‑fix with ESLint.
- `pnpm ghpage`: Build with GitHub Pages preset.

## Coding Style & Naming Conventions
- Language: TypeScript + Vue 3 (Nuxt 4). Indent 2 spaces.
- ESLint: `@antfu/eslint-config` with Nuxt plugin. Run `pnpm lint` before PRs.
- Components: PascalCase (e.g., `ContentSearch.vue`). Pages may be single‑word; route via file name.
- Styles: SCSS in `app/assets/scss`; utility classes via UnoCSS.
- Imports/paths: Use Nuxt aliases (e.g., `~/components/...`).

## Testing Guidelines
- No test suite is configured yet. If contributing tests, prefer:
  - Unit: Vitest + Vue Test Utils under `tests/unit/`.
  - E2E: Playwright under `tests/e2e/`.
  - Name files `*.spec.ts`; add `pnpm test` script in `package.json`.

## Commit & Pull Request Guidelines
- Commits: Follow Conventional Commits when possible (e.g., `feat(search): add highlighting`, `fix(layout): header class`) to match history.
- PRs: Include clear description, screenshots for UI changes, steps to verify, and link related issues. Ensure `pnpm lint` passes and builds succeed.

## Security & Configuration Tips
- Secrets: Use `.env.local` for local variables; never commit secrets.
- Content: Place posts in `content/blog/` using Markdown with front‑matter.
- Deployment: For GitHub Pages, use `pnpm ghpage` or CI with `generate`.
