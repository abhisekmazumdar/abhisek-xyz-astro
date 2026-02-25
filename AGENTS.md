# AGENTS.md

## Cursor Cloud specific instructions

This is an **Astro 5.x static site** (personal portfolio/blog for abhisek.xyz). There is no backend, database, or containerization.

### Quick reference

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves at `localhost:4321`) |
| Build | `npm run build` (outputs to `dist/`) |
| Type check | `npx astro check` |
| Preview prod build | `npm run preview` |

### Non-obvious caveats

- **No ESLint/Prettier configured.** The only lint-like check available is `npx astro check` (TypeScript diagnostics). `@astrojs/check` and `typescript` must be installed first (they are added as dependencies during setup).
- **Missing blog collection.** The `src/content/blog/` directory does not exist yet. Astro logs a warning (`[glob-loader] The base directory "/workspace/src/content/blog/" does not exist`). This is harmless — the RSS feed returns empty and the build succeeds.
- **Drupal.org API at build time.** The homepage fetches contribution credit counts from `https://new.drupal.org/jsonapi/` during SSG build. If the API is down or slow, the build takes ~10 s for the index page but still succeeds (credits default to `0`). You can override values via `DRUPAL_CREDITS_OVERRIDE` in `src/consts.ts`.
- **No environment variables required.** All config is hardcoded in `src/consts.ts`.
- **User rules mention DDEV/Drupal.** Despite `.user_rules` referencing DDEV and Drupal, this repo is a pure Node.js/Astro project — ignore DDEV/Composer/Drush guidance here.
