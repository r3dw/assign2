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

## Design Choices

### Background
I am a bit of an architecture buff and I really like the Chicago Architecture 
Center's annual Open House Chicago weekend, which is coming up this weekend. I 
have been pouring over these pages trying to plan what I want to see since I will
have to measure out my time carefully to allow me time to do homework. One thing 
that bothered me was how boring the page was, so I decided to use it as my insipration
for this project and give it a little glow-up. 

### Website Style
After building the mood boards, I preferred the Wright-inspired look, but since 
I had to reduce the number of sites and more of them fit the Art Deco asthetic, 
I opted to go with that design style instead.

### Placeholder Cards
Claude could not find copyright-free images for all the 2026 Sites section; he
found only seven, so rather than have a mix of images and placeholders, I opted 
for all placeholders. In an ideal situation, I would get permission to use the 
images from the CAC. 



