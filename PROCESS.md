# Process notes: mood boards, design systems and the Open House Chicago site

A draft record of how the project was built with Claude Code, including the tweaks I asked for and the bugs we found and fixed along the way. The final section is a starting point for "How you used the agent". Edit it in your own words.

## 1. What was built

| Piece | Where | Notes |
|---|---|---|
| Hub | `public/index.html` | Links to the three mood boards, the three design systems and the site |
| Mood boards | `public/wright.html`, `deco.html`, `eames.html` | 27, 29 and 27 artifacts (the brief asks for 25–30) |
| Design systems | `public/design-systems/*.html` | One UI library per mood board, following the six-part outline in the assignment PDF |
| Site | `app/open-house/` (Next.js) | An Art Deco festival guide based on openhousechicago.org |
| Credits | `public/credits.html` | Author and license for every photo |

**Tools:** the Wikimedia Commons API for photos, Python (plus Pillow for contact sheets) to generate the static pages, headless Chrome for screenshots, Playwright for interaction and responsive tests, Next.js 16 and React 19 for the site.

## 2. Mood boards

### Brief
Three distinct boards reachable from a hub, each with 25–30 artifacts (photos, color blocks, fonts and so on), hostable on Vercel's free tier:
1. Frank Lloyd Wright, focused on the Robie House
2. Art Deco
3. Mid-Century Modern, focused on Eames

### Approach
- **Real photos, self-hosted.** I searched Wikimedia Commons through its API, filtered to freely licensed JPEGs, and saved resized copies into the project with each photo's author and license. Self-hosting avoids hotlinking, and the credits page satisfies the CC attribution requirements.
- **Reviewed before building.** I made contact sheets of every candidate and viewed them. That caught three that didn't fit: a Japanese travel poster (not really Deco), a garish Eames lounge-chair snapshot, and a cluttered museum shot of an Eames rocker.
- **Mixed artifact types.** Each board mixes photos, color swatches, font specimens, patterns drawn as SVG, quotes and a fact card. The patterns are original drawings "in the spirit of" each movement, not copies of any real design.
- **Three genuinely different looks.** Wright is flat and horizontal, with square cards, 2px dark lines and brick, limestone and oak colors. Deco is black and gold with chamfered corners. Eames is rounded, warm and colorful.
- **Static HTML, no build step.** Pages share one masonry layout stylesheet (`base.css`) plus a theme stylesheet each. Swatches copy their hex code on click, and photos open in a lightbox.

### Problems found during review
| Problem | Cause | Fix |
|---|---|---|
| Wright fact card rendered light when it should be dark | `base.css` loaded after the theme CSS and overrode it | Load theme CSS after `base.css` |
| Some photo cards looked blank in screenshots | Lazy-loaded images below the fold weren't loaded when the screenshot fired | Re-screenshotted with images loaded and a longer wait. The files were verified intact and served correctly |
| First Deco search returned nothing for most queries | A `sed` edit failed because of macOS syntax | Re-ran the edit with the macOS form and re-ran the search |

## 3. Tweak: Chicago focus for the Art Deco board

I asked for Chicago images, naming the Carbide and Carbon Building, Chicago Board of Trade Building and Chicago Motor Club Building, while keeping the swatches and fonts and staying within 25–30 artifacts.

- **Added:** Carbide and Carbon (tower and entrance), Board of Trade (lobby and lobby doors), Motor Club (exterior and etched-glass lobby), Palmolive Building, 333 North Michigan.
- **Removed:** Chrysler lobby and façade detail, Foshay Tower, Radio City, the Miami neon sign, Napier, the Hotel Netherland panel.
- **Rejected on review:** the Elks National Memorial (the photos were of a stone urn, and the building reads neoclassical) and a doorway shot in the Motor Club that showed nothing recognizable.
- **Updated:** the board's intro text and fact card now mention Chicago, with building dates.
- **Result:** 29 artifacts. The Wright and Eames pages were verified byte-identical (by checksum) before and after.

## 4. Tweak: Prometheus → Civic Opera House interior

I asked to replace the gilded Prometheus photo with an interior of the Chicago Civic Opera House.

- A plain search returned mostly photos of a different building (the Auditorium Building), so I searched the Civic Opera House category directly.
- Most photos in that category are exteriors. The one real interior, a gold-lit auditorium, was used (credit: Zesmeralda, CC BY-SA 2.0).
- Only that one card changed. The page diff showed a single changed line, and the other boards stayed identical.

## 5. Design systems

### Brief
Each design system is a UI library built in its mood board's style, following the PDF outline: (1) color roles with contrast ratios, (2) type roles, (3) spacing and shape, (4) components, (5) control states, (6) UI states.

### Approach
- **One shared structure, three token files.** `ds.css` holds the component library and reads every value from design tokens. `ds-wright.css`, `ds-deco.css` and `ds-eames.css` supply each style's palette, type, radii, borders and shadows, plus a few style-specific overrides.
- **Contrast computed, not guessed.** I wrote a small WCAG contrast calculator and checked the palettes before building, so the ratios shown on the pages are real.
- **Components work.** Tabs (including arrow keys), filter chips that filter a list, a toggle, a modal, a detail panel, checkboxes and radios are all functional. The control-states row shows rest, hover, focus, pressed, selected and disabled side by side.
- **Own content, not lorem ipsum.** Cards and rows use items from each board (the Robie House living room, the Carbide and Carbon Building, the LCW chair).
- **Accent reserved for the primary action.** Cherokee red (Wright), gold (Deco) and orange (Eames) mark the main action only. Selected states use inverted fills plus a check mark, so they never rely on color alone.

### Fixes
| Problem | Fix |
|---|---|
| Eames orange (`#E2701F`) gave only 4.26:1 with white button text | Deepened the accent to `#B84F0C` (5.05:1). The mood board swatch keeps the original orange, and the page says so |
| Eames border (`#CFC3AB`) was 1.5:1, too faint for form fields | Darkened to `#8C7C66` (3.5:1) |
| Eames focus ring was only 4.25:1 against the page | Darkened to `#176168` (6.2:1) |
| Type samples collided with their spec labels in the narrow column | Stacked the specs under each sample |
| "Feedback roles" heading sat tight against the swatches above, and the fourth swatch wrapped alone | Added spacing and a four-column swatch row |
| Deco intro text was left-aligned in a centered header | `ds.css` loaded later and overrode the centering. Raised the selector's specificity |
| Filter chips didn't hide list rows (found by browser tests) | `display:flex` on rows overrode the `hidden` attribute. Added a global `[hidden]{display:none}` rule |
| One 404 in the console on first load | The browser's automatic favicon request. Added an inline empty favicon |

### Verification
51 automated browser checks (Playwright) at desktop and phone widths: tabs and arrow keys, chip filtering, toggle, panel, modal with Escape, focus rings, 44px tap targets, no horizontal overflow, no console errors. All pass after the fixes above. The hub gained a "Design systems" row linking all three.

Note: a plain local Python server doesn't support clean URLs, so `/design-systems/wright` returned a 404 there. The `.html` form works locally, and the clean form is handled by `vercel.json` when deployed.

## 6. The site: Open House Chicago (Art Deco)

### Brief
Build a page from the style I picked (Art Deco), based on openhousechicago.org, using only HTML, CSS and Next.js, responsive, and verified at different screen sizes.

### Research
I took a real screenshot of the official page and read its text. Structure to follow: header with a colored nav band, hero with the dates and "Plan your OHC weekend", neighborhood areas, 2026 sites, itineraries, events, "More from CAC", newsletter, footer. (The page also shows an email pop-up and a cookie banner, which I deliberately left out.)

### Decisions
- **Static export.** The project became a Next.js app with `output: 'export'`. The existing static pages moved into `public/` unchanged, and the new page is the route `/open-house`. No server, database or API.
- **Plain CSS.** No Tailwind. The Deco tokens and components are copied from the Deco design system, so the site and the system match.
- **Real content, honestly labeled.** Sites, neighborhoods (with counts), itineraries and events come from the official page. Only 16 of the 200+ sites are listed, each linking to its official page. The footer says it's a student redesign, not affiliated with the Chicago Architecture Center, and gives the date the content was copied.
- **Photos only where they're accurate.** The Carbide and Carbon tower appears in the hero and the Board of Trade has its real photo (it is an OHC site). The other sites use generated Deco pattern tiles rather than implying photos of places I had none for.
- **Interactions (all faked, nothing saved):** filter sites by search text, neighborhood and day, "saved only" toggle, details dialog, save sites, itineraries and events into a "My OHC" panel with a live counter, newsletter form with error, sending and success states, and a mobile menu.

### Data verification (a mistake caught)
The official page's text lists "Saturday only" and "Sunday only" labels *before* each site's name. Read naively, that assigns them to the wrong site. I re-read the page's actual card structure and corrected the mapping: Central Park Theater, the Arts Club and the Cliff Dwellers Club are Saturday only; Chicago Loop Synagogue and Kam Isaiah Israel are Sunday only; the Board of Trade has no restriction.

I also tested outbound links. Two architecture.org paths returned 404, so all "official site" links point to working openhousechicago.org pages instead.

### Responsive testing
Tested at 320, 390, 768, 1024, 1440 and 1920px. Checks per size: no horizontal overflow, no element wider than the screen, correct number of site columns (1 / 1 / 2 / 3 / 4 / 4), menu button shown or hidden at the right width, tap targets at least 44px, fonts loaded, no console errors. Plus interaction tests at phone and desktop size and a keyboard-only pass (skip link, Tab to search, visible focus rings). Final result: **124 of 124 checks pass**.

### Fixes
| Problem | Fix |
|---|---|
| Top-bar links ("Mood boards", "Art Deco board") shorter than a comfortable tap target | Gave them a 44px minimum height |
| Details dialog on a phone cut off its buttons, and the tall photo pushed them off screen | Capped the photo height, made the buttons wrap sensibly |
| Gold "Sunday only" badge disappeared into the gold bottom step of the pyramid tiles | Moved the pyramid up so the bottom band stays clear |
| "MY OHC" wrapped onto two lines on phones | No-wrap on header buttons |
| Nav wrapped to two rows at 768px | Tightened spacing at tablet widths (now one row at 701, 768, 820 and 1024px) |
| Page background looked washed out in full-page screenshots, and `background-attachment: fixed` is unreliable on iOS | Replaced it with a plain background |
| Favicon 404 on first load | Added an icon through Next's `app/icon.svg` |
| Two failures in my own tests | One looked for the word "Saved", but the browser reports "SAVED" because the CSS uppercases it. The other raced against React removing the dialog title after the dialog closed. Fixed the tests, not the site |

## 7. Bug reported after review: hydration error

While reviewing in the dev server I got a React console error: *"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."*

- **Cause:** the sunburst tiles compute ray coordinates with `Math.cos` and `Math.sin`. The server (Node) and the browser differ in the last floating-point digits (for example `...163.73066958946413` against `...163.73066958946418`), so React saw mismatched HTML.
- **Why my tests missed it:** React reports hydration mismatches only in development mode, and I had been testing the production build.
- **Fix:** round the coordinates to two decimals in `DecoTile.js` (and `Hero.js`, which used the same math).
- **Verification:** I added a dev-mode console check, confirmed it reproduces the exact error when the fix is removed, then confirmed it is clean with the fix in place at desktop and phone widths, including after using the filters, saving a card and opening My OHC. The full 124-check production suite still passes.

## 8. Known limits and things to double-check

- **Vercel clean URLs are untested.** I tested the exported `out/` folder locally with clean URLs, but not on Vercel itself. After deploying, confirm `/wright`, `/deco` and `/design-systems/deco` load without `.html`. If they don't, change the hub links to the `.html` form.
- **Tech stack.** The assignment PDF's tech stack lists Next.js and Tailwind. The mood boards and design systems are plain static HTML, and only the site is Next.js, with no Tailwind (per the instruction to use only HTML, CSS and Next.js). Check with your instructor whether this satisfies the requirement.
- **Facts written from memory.** Please verify the Robie House facts (design 1908, completed 1910, UNESCO listing 2019, owned by the University of Chicago), the two Wright quotes' original sources, and the Chicago building dates on the Deco board.
- **A blank-card artifact never fully confirmed.** Some Eames photo cards showed blank in an early screenshot. The files were verified intact and served correctly, but I did not see the lower half of that page rendered in a later screenshot.
- **The sample is small.** Only 16 of 200+ sites, 10 of 28 neighborhoods, and 3 events are shown. The "View all" buttons go to the official site.
- **Demo behavior.** Saved items, the newsletter form and filters reset on reload and send nothing anywhere.
- **Content freshness.** Festival details were copied on October 12, 2026 and may change.

## 9. How the agent was used (draft, edit in your own words)

**What I directed:**
- The three styles and their focus (Wright and the Robie House, Art Deco, Eames).
- The Chicago-focused rework of the Deco board, naming the buildings, and the instruction to keep swatches and fonts and not touch the other two boards.
- Replacing the Prometheus photo with the Civic Opera House interior.
- The design-system outline (by supplying the PDF), the choice of Open House Chicago as the basis for the site, the Art Deco style for it, the HTML/CSS/Next.js constraint, and the request to verify it at multiple sizes.
- Reviewing the running site myself and reporting the console error.

**What the agent proposed or decided:**
- Using real, openly licensed photos from Wikimedia Commons instead of generated images.
- The names and moods of the boards, the palettes, and which fonts to pair.
- Splitting design systems into shared components plus per-style tokens.
- The Next.js static-export structure (existing HTML in `public/`).
- Writing the browser test suites.

**Where the agent was wrong or needed correcting:**
- Misread the "Saturday only" labels on the official site, caught by checking the page structure.
- Ran tests only on the production build, which missed the hydration error. I caught it in dev and the agent fixed it and added a dev-mode check.
- Initial Eames contrast values didn't meet accessibility thresholds, caught by computing them.

**Where to add your own decisions:** why you chose Art Deco for the site, what people see first on each page, how users know what's clickable, and what each state (empty, loading, error, success) tells them.
