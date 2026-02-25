---
title: "Rebuilding My Site with Astro"
description: "Notes on migrating my personal site to Astro 5."
pubDate: 2026-02-20
---

I recently rebuilt [abhisek.xyz](https://www.abhisek.xyz) using **Astro 5**. Here are a few takeaways from the process.

### What I like about Astro

- **Zero JS by default** — pages ship as plain HTML unless you opt into client-side interactivity.
- **Content Collections** — type-safe Markdown with schema validation makes managing content a breeze.
- **Fast builds** — the static output is lean and deploys anywhere.

### Lessons learned

1. Astro's `Image` component paired with `sharp` handles responsive images really well out of the box.
2. The `glob` loader for content collections is flexible — you can point it at any directory.
3. MDX is great when you need components inside Markdown, but plain `.md` files are perfectly fine for most content.

Overall, I am happy with the switch. The developer experience is excellent and the performance speaks for itself.
