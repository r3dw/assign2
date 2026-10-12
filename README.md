# DSB Assignment 2 — Mood Boards

A static hub site with three mood boards. No build step.

- `index.html` — hub
- `wright.html` — Frank Lloyd Wright / Robie House (27 artifacts)
- `deco.html` — Art Deco (28 artifacts)
- `eames.html` — Mid-Century Modern / Eames (27 artifacts)
- `credits.html` — photo credits and licenses (Wikimedia Commons)
- `img/` self-hosted photos, `assets/` CSS and JS

## Preview locally
    python3 -m http.server 8000

## Deploy to Vercel (free tier)
Import the repo as a project with framework preset **Other**, and leave the build command and output directory empty. `vercel.json` enables clean URLs (`/wright`, `/deco`, `/eames`).
