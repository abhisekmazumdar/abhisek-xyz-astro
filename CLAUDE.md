# CLAUDE.md

This is a personal portfolio and blog site for Abhisek Mazumdar (abhisek.xyz), built with Astro. It showcases professional identity, Drupal.org contribution stats fetched at build time, and short-form blog posts ("logs").

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
npx astro check   # TypeScript type-check (no separate lint/test runner)
```

## Project Structure

```
src/
├── assets/          # Profile photo + blog post images
├── components/      # Astro + React components
│   └── ui/          # Shadcn/Radix UI primitives
├── content/
│   ├── about.md     # Homepage bio — edit here to update intro text
│   └── logs/        # Blog posts (*.md files)
├── layouts/         # Page shell (DefaultLayout.astro)
├── lib/             # Drupal.org API client (drupal-credits.ts, drupal-org-credits.ts)
├── pages/           # Astro routes (index, logs/[...slug], rss.xml)
├── styles/          # global.css — Tailwind + CSS variables (dark mode)
└── consts.ts        # Site-wide config: Drupal UID, highlighted projects, credit overrides
```

## Tech Stack

- **Astro 6** — static site generator
- **React 19** — interactive components (MobileNav)
- **TypeScript** — strict mode; path alias `@/*` → `src/*`
- **Tailwind CSS v4** — via Vite plugin
- **MDX + Markdown** — content via `@astrojs/mdx`; image captions via rehype plugin
- **Radix UI / Shadcn** — accessible component primitives in `src/components/ui/`
- **Vercel Analytics** — passive; no config needed locally

## Adding Blog Posts

Create a `.md` file in `src/content/logs/` with this frontmatter:

```yaml
---
title: "Post title"
description: "Short summary"
pubDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD  # optional
coverImage: ../../assets/logs/image.jpg  # optional
coverImageCaption: "Caption text"  # optional
---
```

For image captions in post body, use: `![alt](src "Caption")` — the rehype plugin renders this as `<figure><figcaption>`.

## Drupal.org API Integration

Contribution credits are fetched at **build time** (not runtime) via `src/lib/drupal-credits.ts` and `src/lib/drupal-org-credits.ts`. Config is in `src/consts.ts`:

- `DRUPAL_ORG_UID` — Drupal.org user ID
- `DRUPAL_CREDITS_PROJECTS` — projects to highlight on the homepage
- `DRUPAL_CREDITS_OVERRIDE` / `DRUPAL_ORG_CREDITS_OVERRIDE` — hardcoded fallback values for when the API is unavailable

Both fetchers use exponential backoff (4 retries) for 503/429 responses. Build succeeds even if the API is down.

## Content Collections

Schemas are defined in `src/content.config.ts` using Zod. The `logs` collection validates frontmatter; invalid frontmatter causes a build error.

## Key Notes

- No ESLint, Prettier, or test runner configured — `npx astro check` is the only automated check available.
- The `src/content/blog/` directory doesn't exist by design (RSS returns empty); the warning during build is harmless.
- Dark mode is CSS-variable-based, toggled via `[data-theme="dark"]` on the root element.
- Mobile breakpoints: 680px and 560px.
- `.astro/`, `dist/`, `.cache/` are gitignored — never commit build artifacts.
