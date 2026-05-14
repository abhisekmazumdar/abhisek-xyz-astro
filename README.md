# abhisek.xyz

Personal portfolio and blog for [Abhisek Mazumdar](https://www.abhisek.xyz) — Drupal & Mautic Engineer, open-source contributor, and active Drupal community member.

## Stack

- [Astro](https://astro.build/) — static site generator
- [React](https://react.dev/) — interactive components via `@astrojs/react`
- [Tailwind CSS v4](https://tailwindcss.com/) — utility CSS via Vite plugin
- TypeScript
- Font Awesome 6 (CDN, icon set for social links)

## Project structure

```text
src/
├── assets/          # Static images (profile photo, etc.)
├── components/      # Astro components (Header, Footer, DrupalCredits, ...)
├── content/
│   ├── about.md     # Homepage bio — edit this to update the intro text
│   └── logs/        # Blog posts (Markdown / MDX)
├── layouts/         # Page shell layouts
├── lib/
│   ├── drupal-credits.ts      # Fetches per-project credit counts from Drupal.org
│   └── drupal-org-credits.ts  # Fetches org-sponsored credit breakdown from Drupal.org
├── pages/
│   ├── index.astro  # Homepage
│   └── logs/        # Blog index + post routes
├── styles/          # Global CSS
└── consts.ts        # Site-wide config — start here
```

## Configuration

All site-specific values live in `src/consts.ts`:

| Constant | Purpose |
|---|---|
| `DRUPAL_ORG_UID` | Your Drupal.org numeric user ID |
| `DRUPAL_CREDITS_PROJECTS` | Projects to highlight in the credits card (label + machine name) |
| `DRUPAL_CREDITS_OVERRIDE` | Override total or per-project counts (useful when the API is slow or down) |
| `DRUPAL_ORG_CREDITS_OVERRIDE` | Override the full org breakdown (same use case) |
| `DRUPAL_ORG_CREDITS_URL` | Link target for "View all on Drupal.org" |

## Drupal.org credits — how it works

At build time, two library functions hit the Drupal.org JSON:API:

- `getDrupalCredits` — paginates `/jsonapi/views/contribution_records/by_user` to count credits per project
- `getDrupalOrgCredits` — fetches the same endpoint with relationship includes to determine which organizations sponsored each credit, then aggregates by org name

Both use exponential backoff (up to 4 retries) to handle transient 503/429 responses from the API.

The results are passed to `<DrupalCredits>` on the homepage, which renders:
- total credit count
- highlighted project pills (configurable in `consts.ts`)
- a proportional stacked bar showing credits by sponsoring org
- a color-coded legend

Use the `*_OVERRIDE` constants to hard-code values if you want to skip the API calls during development or if the API is unreliable at deploy time.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type-check `.astro` files |

## Content

- **Bio:** edit `src/content/about.md`
- **Blog posts:** add `.md` or `.mdx` files to `src/content/logs/`; frontmatter schema is defined in `src/content.config.ts`
