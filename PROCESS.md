# Process notes: mood boards, design systems and the Open House Chicago site

A draft record of how the project was built with Claude Code, including the tweaks I asked for and the bugs we found and fixed along the way. The final section is a starting point for "How you used the agent". Edit it in your own words.

## 1. What was built

| Piece | Where | Notes |
|---|---|---|
| Hub | `public/index.html` | Links to the three mood boards, the three design systems and the site |
| Mood boards | `public/wright.html`, `deco.html`, `eames.html` | 27, 29 and 28 artifacts (the brief asks for 25–30) |
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

## 5. Tweak: Broaden the Eames board to Mid-Century Modern

I asked to broaden the third board from "Eames" to Mid-Century Modern as a whole, while keeping the focus on the iconic Eames chairs. The website and the other two boards were off limits, but the hub needed updating.

- **Kept the board's name, "Plywood & Plastic."** It still describes the Eames chairs (molded plywood, plastic shells), and renaming it would have changed the footer links on the Wright and Deco boards, which are meant to stay untouched. The kicker became "Mid-Century Modern · The Eames chair" and the intro text was rewritten.
- **Chairs lead.** Eight of the 13 photos are Eames chairs: Lounge Chair and Ottoman, LCW, DCW, molded plastic shell armchairs, wire chair on an Eiffel base, La Chaise, plus two new ones, the fiberglass rocking chair and the Aluminum Group.
- **Five photos give the wider movement:** the Saarinen Tulip chair, the Bertoia Diamond Chair, the Jacobsen Egg chair, the Stahl House (Case Study House No. 22) and the Eames House. I searched Commons for Saarinen, Bertoia, Wegner, Jacobsen, Noguchi, Nelson and Case Study houses, previewed about 20 candidates on a contact sheet, and chose the cleanest, most recognizable shots with clear licenses. Others looked good but didn't make it (the Wegner Wishbone chair, the Womb chair, the Noguchi table, the Nelson Marshmallow sofa, the TWA Flight Center).
- **Removed:** the Eames Storage Unit, the plywood coffee table, the Elephant toy, a second Eames House view, and a second red LCW. They were non-chair items or near-duplicates. I deleted the unused image files, but kept the Storage Unit file because the Eames design-system page still uses it.
- **Swatches, fonts, patterns and quotes stayed.** The "Eames House" fact card became a broader "Mid-Century Modern" card (era, Eames chair dates, other designers, houses).
- **Result:** 28 artifacts (13 photos, 7 swatches, 3 patterns, 2 fonts, 2 quotes, 1 fact card). The credits page gained six photos and lost four.
- **Hub:** the board 03 tile has the new kicker and text, a new count (28 artifacts), a collage that now includes the Egg chair, and an updated page description. I also trimmed one repetitive phrase after seeing it on screen ("Mid-Century Modern… Mid-century modern at its most sociable").

**Verification:** all 28 cards render with every image loaded at five widths (1440, 1024, 768, 390 and 320px), with no horizontal overflow. At desktop and phone width, the lightbox opens with caption and credit and closes with Escape, and a swatch click copies its hex. The hub tile links to the board at desktop and phone width. The Wright and Deco boards are byte-identical to before, `app/` has no changes in git, and the full 124-check website suite still passes. Two test hiccups turned out not to be site bugs: the swatch check ran before the asynchronous clipboard call finished, and a first-load 404 from the local test server did not reproduce.

## 6. Design systems

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

## 7. The site: Open House Chicago (Art Deco)

### Brief
Build a page from the style I picked (Art Deco), based on openhousechicago.org, using only HTML, CSS and Next.js, responsive, and verified at different screen sizes.

### Research
I took a real screenshot of the official page and read its text. Structure to follow: header with a colored nav band, hero with the dates and "Plan your OHC weekend", neighborhood areas, 2026 sites, itineraries, events, "More from CAC", newsletter, footer. (The page also shows an email pop-up and a cookie banner, which I deliberately left out.)

### Decisions
- **Static export.** The project became a Next.js app with `output: 'export'`. The existing static pages moved into `public/` unchanged, and the new page is the route `/open-house`. No server, database or API.
- **Plain CSS.** No Tailwind. The Deco tokens and components are copied from the Deco design system, so the site and the system match.
- **Real content, honestly labeled.** Sites, neighborhoods (with counts), itineraries and events come from the official page. Only 16 of the 200+ sites are listed, each linking to its official page. The footer says it's a student redesign, not affiliated with the Chicago Architecture Center, and gives the date the content was copied.
- **Deco tiles on every site card.** The hero shows a brass elevator door from the Carbide and Carbon Building lobby, and the Board of Trade photo appears only in that site's details dialog. All 16 site cards use generated Deco pattern tiles. I searched Wikimedia Commons for real photos of each site (search only, nothing downloaded): 8 of 16 had usable photos and 8 had none, so a half-photo grid would have looked uneven. We kept the consistent tiles instead.
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

### Tweaks after review (images)
Image changes I asked for once I could see the page:
- **Board of Trade card now uses a Deco tile.** It was the only site card with a real photo, which looked odd next to 15 pattern tiles. It now gets a ruby-and-gold sunburst like the others. I kept its photo in the details dialog, since that isn't part of the card grid.
- **Hero image, first swap:** from the Carbide and Carbon tower to the Chrysler Building elevator door. I checked the crop in screenshots at desktop and phone widths.
- **Hero image, second swap (the Chrysler door is in New York):** that photo worked against the site's Chicago focus, so it had to go. I first looked for the C. D. Peacock "Peacock Doors" in the Palmer House Hilton, and found good freely licensed photos (Tony Hisgett, Spock1801, Spatms). I flagged a style problem: the plaque credits Louis Comfort Tiffany, a swirling peacock design in an Art Nouveau style, and the web sources disagreed about the doors' date, so they were not a safe fit for an Art Deco site. I then searched Commons for Chicago Deco elevators and lobbies, and previewed the Carbide and Carbon Building lobby photos plus a Medinah Athletic Club elevator lobby (rejected: its ornament is Italianate, not Deco). The brass elevator door in the Carbide and Carbon lobby (1929) won: it keeps the elevator-door idea, is gold with a Deco pattern, is in Chicago, and is a 3:4 portrait that fits the hero frame with no cropping. Credit: w_lemay, CC BY-SA 2.0. It has new alt text and a caption naming the building.
- **Hub "Your site" thumbnail changed to match the hero** each time. The collage tile for the Art Deco board on the hub still starts with the Carbide and Carbon tower, since it belongs to the board, not the site. After each regeneration I confirmed the three mood boards stayed byte-identical. The credits page gained the new photo's row.

All of these were rechecked with the full test suite and the dev-mode console check.

## 8. Bug reported after review: hydration error

While reviewing in the dev server I got a React console error: *"A tree hydrated but some attributes of the server rendered HTML didn't match the client properties."*

- **Cause:** the sunburst tiles compute ray coordinates with `Math.cos` and `Math.sin`. The server (Node) and the browser differ in the last floating-point digits (for example `...163.73066958946413` against `...163.73066958946418`), so React saw mismatched HTML.
- **Why my tests missed it:** React reports hydration mismatches only in development mode, and I had been testing the production build.
- **Fix:** round the coordinates to two decimals in `DecoTile.js` (and `Hero.js`, which used the same math).
- **Verification:** I added a dev-mode console check, confirmed it reproduces the exact error when the fix is removed, then confirmed it is clean with the fix in place at desktop and phone widths, including after using the filters, saving a card and opening My OHC. The full 124-check production suite still passes.

## 9. Deployment: Vercel stopped updating

After I pushed the hero and thumbnail changes, the Vercel site still showed the old images.

- **Diagnosis:** The repo was fine. The commit contained both changes, local `main` matched GitHub, and a clean checkout of the commit built correctly with the new hero. Reading the live site's headers showed it had been built at 9:04 PM Central, before the last two commits (9:43 and 9:51 PM). It also still had the old Board of Trade photo card, so neither of those commits had become a live deployment.
- **Cause:** An `"outputDirectory": "out"` line I had added to `vercel.json` while answering "will this structure work on Vercel?". I added it to be safe, without being able to test it on Vercel. The first deployment worked without it, so Vercel detects the static export on its own, and the override most likely broke the build (Vercel keeps serving the last successful deployment when a build fails). I never saw the build log, but removing the line fixed it.
- **Fix:** Removed that line from `vercel.json`. The rest of the file (clean URLs and cache headers) is unchanged.
- **Lesson:** An untested "just in case" setting on a platform I couldn't reach caused the failure, and I had called it harmless. I now treat deployment config changes as untested until a deploy confirms them.

## 10. Known limits and things to double-check

- **Vercel clean URLs (resolved).** Confirmed on the live site after deployment: `/`, `/wright`, `/deco`, `/eames`, `/credits`, `/design-systems/deco` and `/open-house` all load without `.html`.
- **Tech stack.** The assignment PDF's tech stack lists Next.js and Tailwind. The mood boards and design systems are plain static HTML, and only the site is Next.js, with no Tailwind (per the instruction to use only HTML, CSS and Next.js). Check with your instructor whether this satisfies the requirement.
- **Mid-Century dates written from memory.** The new fact card gives dates for the Eames chairs (LCW and DCW 1945–46, fiberglass shell 1950, wire chair 1951, Lounge Chair 1956, Aluminum Group 1958), Bertoia Diamond (1952), Saarinen Tulip (1956), Jacobsen Egg (1958), the Eames House (1949) and the Stahl House (1960). Please verify them.
- **The Eames design-system page was not changed.** Its header still reads "Mid-Century Modern · Charles & Ray Eames" and it still uses the Storage Unit photo, which is fine but no longer matches the board's new kicker.
- **Facts written from memory.** Please verify the Robie House facts (design 1908, completed 1910, UNESCO listing 2019, owned by the University of Chicago), the two Wright quotes' original sources, and the Chicago building dates on the Deco board.
- **A blank-card artifact never fully confirmed.** Some Eames photo cards showed blank in an early screenshot. The files were verified intact and served correctly, but I did not see the lower half of that page rendered in a later screenshot.
- **The sample is small.** Only 16 of 200+ sites, 10 of 28 neighborhoods, and 3 events are shown. The "View all" buttons go to the official site.
- **Demo behavior.** Saved items, the newsletter form and filters reset on reload and send nothing anywhere.
- **Content freshness.** Festival details were copied on October 12, 2026 and may change.

## 11. How the agent was used (draft, edit in your own words)

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
- Added an untested `outputDirectory` setting to `vercel.json` and called it harmless. It most likely broke Vercel's builds, so the site stopped updating until the line was removed (section 9).

**Where to add your own decisions:** why you chose Art Deco for the site, what people see first on each page, how users know what's clickable, and what each state (empty, loading, error, success) tells them.
