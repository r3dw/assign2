# DSB Assignment 2 — Mood Boards

A static hub site with three mood boards. No build step.

- `public/` — the static pages, served as-is:
  - `index.html` — hub
  - `wright.html`, `deco.html`, `eames.html` — the three mood boards (27 / 29 / 27 artifacts)
  - `design-systems/` — one UI library per mood board
  - `credits.html` — photo credits and licenses (Wikimedia Commons)
  - `img/`, `assets/` — photos, CSS and JS
- `app/` — the Next.js site: `/open-house`, an Art Deco festival guide based on openhousechicago.org
  - `app/open-house/_components/` — header, hero, filterable sites browser, itineraries, events, newsletter
  - `app/globals.css` — Deco tokens and components (mirrors `/design-systems/deco`)

## Run locally
    npm install
    npm run dev          # http://localhost:3000/open-house

To preview the exact static output that Vercel serves:

    npm run build        # writes ./out
    npm run start        # serves ./out with clean URLs

## Deploy to Vercel (free Hobby plan)
Import the repo; Vercel detects Next.js. `next.config.mjs` uses `output: 'export'`, so there is no server, database or API. `vercel.json` turns on clean URLs (`/wright`, `/deco`, `/eames`, `/design-systems/deco`, `/open-house`).
