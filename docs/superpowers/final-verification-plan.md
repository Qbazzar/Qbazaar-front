# Final Verification Plan — "Test Everything, Everywhere"

User mandate (2026-07-12): the closing phase must test every pixel, icon,
color, font, div/structure, and button, on every page, at every width.

Ground truth: the exact-render pages in `D:\Doc\q-bazaar-refs\render\`
(generated 1:1 from the .fig) and `message.json` (raw design data).

## Test batteries (all run at 390 / 744 / 1440 on all 27+ pages)

### 1. Color audit — "كل لون"
- Extract the design palette from message.json: every SOLID fill/stroke color
  used on visible nodes (already known: ~F38057 orange, 212121/333 ink,
  A19F9F/787878 grays, EDEDED lines, 3DBE64 green, FF0000, F9F9F9 bg...).
- Crawl every page: census every computed `color`, `backgroundColor`,
  `borderColor` on visible elements.
- FAIL any color not in the design palette (tolerance ΔE ≤ 3 per channel ±3).

### 2. Typography audit — "كل نوع خط"
- Design text styles from message.json TEXT nodes: (family, size, weight)
  triples — Poppins 400/500/600 at 12–64, Story Script 64, Montserrat, Acme,
  IBM Plex Sans Arabic, Cairo, Inter.
- Census every rendered text node's computed font triple; FAIL foreign
  families or sizes not present in the design set (±1px).

### 3. Icon audit — "كل أيقونة" (extends tools/audit-icons.mjs)
- Existing: zero-size / oversized / broken.
- Add: every inline SVG's path signature hashed and matched against
  iconlib.json signatures (harvested from the fig) — flags hand-drawn
  lookalikes; emoji-as-icon detection (any pictographic codepoint in leaves).

### 4. Structure audit — "كل ديف ومكان وستركشر"
- Per page × width: capture the layout tree (tag, box x/y/w/h rounded to 4px,
  order) of landmark regions (header, hero, cards grid, footer) and diff
  against the exact-render page's tree for the matching design frame.
- Horizontal overflow, offscreen elements, zero-height visible containers.

### 5. Button audit — "كل بوتون"
- Census every button/link-button: height, radius, font, bg/hover pair
  (hover simulated via :hover rule inspection), FAIL non-token values
  (heights outside {36,44,48,52,56,64}, radius outside {8,10,12,16,999}).

### 6. Pixel screenshots — "كل بكسل"
- Full-page screenshot of every page at the 3 widths into
  q-bazaar-refs/final/<page>-<w>.png plus a side-by-side HTML gallery
  (app | design render) for human review.
- Where a page has an exact matching design frame at that width, run a
  pixelmatch diff on the shared header/footer bands (the flow content varies
  legitimately with responsive reflow; bands are comparable).

### 7. Journey walk — flows
- Scripted click-through asserting URLs/states:
  guest → signup → verify → number → code → home(signed-in) → product →
  buy-now → send → messages → chat card confirm → checkout →
  Complete Payment → success modal → back to home → log out.
- Filter sheets, selects (cat/dist/price/city), messages two-step nav,
  seller Filter/Info sheets, footer accordions, language popup.

## Output
`docs/superpowers/final-report.md`: per-page × per-width table of the 7
batteries (pass/fail + finding list), plus the updated coverage-matrix with
every frame's final status. Nothing is declared DONE until every battery
passes or the finding is explicitly user-approved.

## Known tooling constraints
- Screenshot only BEFORE any mutating evaluate (app renderer quirk);
  interaction states verified via DOM assertions instead.
- [style*=] selectors must use browser-normalised serialisation.
