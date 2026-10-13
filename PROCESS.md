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

### Later: the board moves to the lapis background
Once the site and the Deco design system moved to lapis blue (sections 6 and 7), I asked for the mood board to follow, so the three Deco pieces agree. The Wright board, the Eames board, the credits page, all three design systems and the website were not touched by this step, and I confirmed that with byte-identical checks.
- **Theme.** The board's page is now `#0F1F3D` with a soft blue glow, and the cards stay near-black (`#16161C`), exactly as on the site. I replaced the old fixed-position gradient with a plain one. Only the Deco theme file changed, because the shared stylesheet also drives the other two boards.
- **Things that hard-coded the old black.** The sunburst in the header was a black rectangle that would have shown on lapis. I first made it solid lapis, then noticed it sat in a slightly darker box against the page's glow, so it is now transparent with a lapis center disc. The ziggurat pattern was lapis on lapis, so it uses the lighter blue `#2B4C8C` (the same blue as the site's lapis tile). The Midnight Lapis swatch is now `#0F1F3D` to match the site and design system. The fact card's gradient and the (unused) quote card were retuned.
- **Hub.** The Art Deco board's tile is lapis, and its color strip uses the new lapis value with a thin gold outline so that chip doesn't vanish. While checking this I found an older bug: this tile's palette strip had never displayed at all, because the tile centers its content, which collapsed the strip to zero width. I fixed that too, so all three tiles now show their palettes.
- **Verification.** 27 of the 28 checks on the board pass at five screen widths, covering image loading, the lightbox, swatch copy and overflow. The one that doesn't is the browser's automatic first-load favicon request, which returns a 404 from the local test server and does not occur on the other pages. The hub tile opens the board at desktop and phone width. The 124-check website suite and the 51-check design-system suite still pass.

## 4. Tweak: Prometheus → Civic Opera House interior

I asked to replace the gilded Prometheus photo with an interior of the Chicago Civic Opera House.

- A plain search returned mostly photos of a different building (the Auditorium Building), so I searched the Civic Opera House category directly.
- Most photos in that category are exteriors. The one real interior, a gold-lit auditorium, was used (credit: Zesmeralda, CC BY-SA 2.0).
- Only that one card changed. The page diff showed a single changed line, and the other boards stayed identical.

## 5. Tweak: Broaden the Eames board to Mid-Century Modern (two attempts)

I asked to broaden the third board from "Eames" to Mid-Century Modern as a whole. The website and the other two boards were off limits, but the hub needed updating. It took two rounds.

**Attempt 1: too chair-heavy.** I first read the brief as "Mid-Century Modern, with a focus on the iconic Eames chair". I added six photos (the fiberglass rocker, the Aluminum Group, and the Saarinen Tulip, Bertoia Diamond, Jacobsen Egg and Stahl House pieces) and removed the non-chair Eames items, so eight of the 13 photos were Eames chairs. The result was still basically a chair board with a few extras, and I asked for a redo.

**Attempt 2 (current): mostly Mid-Century Modern, broadly.** Brief: use images of other iconic Mid-Century pieces, not just chairs, and keep exactly one photo of the Eames Lounge Chair and Ottoman and one of the Tulip chair.
- **Research.** I searched Commons for lamps, clocks, sideboards, benches and tables, previewed about 20 candidates on contact sheets, and kept the cleanest, most recognizable shots. Rejected: a messy Arco lamp photo (a visitor and clutter in the frame), a second Noguchi table shot, and more Eames chairs.
- **The 13 photos.** Chairs (4): the Eames Lounge Chair and Ottoman, the Eames LCW, the Saarinen Tulip chair and the Jacobsen Egg chair. Other furniture (4): the Eames Storage Unit, the Noguchi IN-50 coffee table, the Nelson Marshmallow sofa and a Wegner teak sideboard. Lighting and objects (3): the Henningsen PH Artichoke lamp, the Noguchi Akari light sculpture and the Ball wall clock. Houses (2): the Eames House and the Stahl House. A check confirms exactly one Lounge Chair photo and one Tulip photo on the board.
- **A credit caught.** The Commons record for the Ball clock photo lists "George Nelson" as the author, but that is the designer. The photo is from the Brooklyn Museum's collection, and the museum's description says the clock was designed in 1949 by Irving Harper (for George Nelson Associates). I credited the photo to the Brooklyn Museum and used Harper's design credit in the caption.
- **Name kept, "Plywood & Plastic".** Renaming would have changed the footer links on the Wright and Deco boards, which are meant to stay untouched. The kicker became "Mid-Century Modern · Eames & beyond" and the intro text was rewritten.
- **Everything else.** The swatches, fonts, patterns and Eames quotes stayed. The fact card now covers the era, the Eames pieces, the other designers and the materials. The board has 28 artifacts (13 photos, 7 swatches, 3 patterns, 2 fonts, 2 quotes, 1 fact card). I deleted the unused photo files from both attempts but kept the Eames Storage Unit file, which the Eames design-system page still uses.
- **Hub.** The board 03 tile has the new kicker and text, a collage of the Lounge Chair, the Noguchi table and the Artichoke lamp, and an updated page description. I trimmed a repetitive phrase after seeing it on screen both times ("Mid-Century Modern… Mid-century modern…").

**Verification.** All 28 cards render with every image loaded at five widths (1440, 1024, 768, 390 and 320px) with no horizontal overflow, and at desktop and phone width the lightbox and swatch copy work. The hub tile links to the board at desktop and phone width. The Wright and Deco boards are byte-identical to before, `app/` has no changes in git, and the full 124-check website suite still passes. Two things looked like bugs but were not: some cards appeared blank in one full-page screenshot (they were lazy-loaded images not yet painted; scrolling through the page showed all 13 render), and a first-load 404 from the local test server did not reproduce.

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

### Update: Eames system follows the broadened board
After the Eames board became mostly Mid-Century Modern (section 5), I asked for its design-system page to match. Only the content changed; the tokens (palette, type, radii, shadow) already matched the board's swatches.
- **Header and text samples:** the kicker and footer now read "Mid-Century Modern · Eames & beyond", and the intro says it is built for the Mid-Century board. The type samples were rewritten ("mid-century" as display, "Furniture & Lighting" as heading, a body line about curves, materials and color, and "Mid-1940s to 1960s" as the label).
- **Components use the wider collection:** the example cards are the PH Artichoke Lamp and the Marshmallow Sofa, the detail panel is the sofa, the list rows are an Eames LCW chair, a Noguchi coffee table and the sofa, the radios are Seating / Tables / Lighting, the tabs are Furniture / Lighting / Houses, and the filter chips are All / Eames / Beyond Eames.
- **A thumbnail choice:** I first used the Noguchi table for a card, but its wide photo cropped to just the table's base in a 76px square, so I switched to the Artichoke lamp, whose tall photo crops cleanly.
- **A path bug avoided:** my generator for these pages still wrote to the old project root from before the move into `public/`. I fixed the path before running it, so no stray folder was created. The hub's design-system tile label became "Mid-Century · Eames & beyond".
- **Verification:** the 51-check design-system suite passes for all three systems, the page has no horizontal overflow at desktop and phone width, and both thumbnails load. The Wright and Deco design systems, all three boards, the credits page and `app/` are unchanged (byte-identical checks and a clean git status).

### Update: Deco system moves to the lapis background
When the site's background changed to lapis (section 7, "Tweak: lapis background"), the Deco design system changed with it, so the system still documents what the site uses. The Background role is now `#0F1F3D`; the Surface role stays near-black `#16161C`. The color-role ratios are computed from the real values, and text on the new background is 12.9:1, muted text 6.4:1 and the gold border and accent 6.8:1, all passing. The page's gradient, its intro text and the hub's Deco design-system tile (including its color dot) were updated too. The Wright and Eames systems are byte-identical, and the 51-check design-system suite still passes.

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

### Tweak: lapis background (mockup first)
I asked what the site would look like on lapis blue instead of black, and asked for a mockup before any change.
- **First opinion, with numbers.** I computed contrast before suggesting anything: ivory, gold and muted text all passed on lapis, but a few things needed work (the emerald and ruby bands lose punch, the lapis pattern tile would vanish into a lapis page, and cards separate less). I recommended a deeper blue than the swatch, `#0F1F3D`.
- **Mockup without touching files.** I served the built site and injected the new colors into the browser only, then made side-by-side before/after screenshots at desktop and phone width. A git check confirmed no project file changed.
- **My first mockup didn't work.** I had made the cards a lighter blue (`#172C55`). You said they clashed, and looking again, the blue card bodies under the emerald, ruby and gold tiles were busy, and the black "onyx" tile looked out of place.
- **Second mockup: three alternatives.** Charcoal-black `#16161C` (today's card color), ink navy `#0A1328` and true black `#0C0C10`, shown against the previous blue. All three kept text at 6.3:1 or better. I recommended the charcoal-black: strong separation, the cleanest framing of the tiles, and the least code to change, and you chose it (option A).
- **Applied.** The page background is `#0F1F3D` with a soft blue glow at the top, and the cards stay `#16161C`. I also changed the top strip and footer to a deeper navy `#0A1530`, the "alt" sections to a translucent navy, the "More from CAC" tiles to a lighter lapis `#244680`, and the lapis pattern tile to `#2B4C8C` so it stays visible. I replaced the old gradient (which used `background-attachment: fixed`) with a plain one.
- **Hub.** The "Your site" card and the Deco design-system tile are lapis to match the pages they open. The Art Deco mood board's tile stayed black at first, because the board hadn't changed yet; it moved to lapis in the next step (section 3).
- **Verification.** The 124-check website suite, the 51-check design-system suite and the dev-mode console check all pass, and I looked at screenshots of the real built pages (site, design system, hub) at desktop and phone width. The three mood boards, the credits page and the Wright and Eames design systems are byte-identical to before.

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
- **Mid-Century dates written from memory.** The fact card and captions give dates for the Eames LCW (1945–46), Eames House (1949), Storage Unit (1949–50) and Lounge Chair (1956), the Noguchi table (1940s), Nelson's Marshmallow sofa (1956), the Tulip chair (1956), the Egg chair (1958), the PH Artichoke lamp (1958) and the Stahl House (1960). Please verify them. The Ball clock's 1949 date comes from the Brooklyn Museum's description.
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
