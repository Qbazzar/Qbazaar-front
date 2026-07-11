# QBazaar Full-Coverage Extension — Design Spec

**Date:** 2026-07-11
**Source of truth:** Figma file `Cvn7hexeu07FIOyJhDDCLd` ("QBazaar | كيو بازار"), last modified 2026-07-06.
**Scope:** All 485 top-level frames on the "Website" page.

## Goal

The interactive HTML app in this repo matches the current Figma file completely:
every screen, every state, at the three designed widths — phone 390px, tablet
744px, desktop 1440px — as **one responsive app** (one URL per logical screen,
layout adapts per breakpoint), with navigation that follows the file's
**prototype flows / user journeys** exactly.

## Inventory (from Figma API audit, 2026-07-11)

| Group | Count | Notes |
|---|---|---|
| Desktop screens (1440w) | 130 | Original site + new post-June flows: auth (Login, Signup, Verify, Enter Code/Number, Forget/Reset/New Password, Verify Identity), Buy Now, Checkout (address saved / edit / done / error), Make an Offer, buyer/seller offer-message screens, Wallet, Home variants |
| Phone screens (390w) | 103 | Designed phone layouts for every screen — all new |
| Tablet screens (744w) | 104 | Designed tablet layouts for every screen — all new |
| Small frames | 148 | ~76 "Flow NNN" prototype-annotation frames + loose components (buttons, cards, icons). Reference material only — they are pieces of screens, not deliverables |

The existing app (24 HTML shells + shared engine `assets/app.js` /
`styles.css`) covers most of the 130 desktop frames via in-page states; its
current mobile/tablet behavior is hand-guessed and must be replaced by the
designed layouts.

## Architecture (unchanged, extended)

Keep the proven pattern: one thin HTML shell per logical screen booting the
shared design-canvas engine (`assets/engine.js`) with templates + logic in
`assets/app.js`, design system in `assets/styles.css`, breakpoint layer in
`assets/responsive.css`, helpers (`photos.js`, `slider.js`, `chatcards.js`,
`mobilemenu.js`). New screens = new shells + new templates in the same style.

## Phases

### Phase 1 — Reference kit + coverage matrix + journey map
- Fetch full node JSON for all 485 frames (batched `/v1/files/:key/nodes`)
  into `D:\Doc\q-bazaar-refs\nodes\` (outside the repo).
- Render reference PNGs of all 485 frames (`/v1/images`, scale 1) into
  `D:\Doc\q-bazaar-refs\png\`. These are the implementation spec and the
  verification ground truth. Oversized frames that Figma refuses to render are
  recorded and re-fetched at reduced scale.
- **Flow extraction:** collect `flowStartingPoints` plus every node's
  prototype interactions (`transitionNodeID` / `interactions`) across the
  fetched subtrees → `flows.json` (edge list: source node → destination
  frame → trigger). Combined with the 76 "Flow NNN" annotation frames, this
  becomes the **user-journey map**: named journeys (auth, buy-now → checkout,
  make-offer ↔ chat, publish-ad, account management) with the exact
  screen-to-screen wiring the app must implement.
- **Coverage matrix:** every frame → existing page/state → status
  COVERED / PARTIAL / MISSING, kept in `docs/superpowers/coverage-matrix.md`
  and updated as phases complete.
- Figma token is used read-only; user should revoke it when we're done.

### Phase 2 — New desktop screens (~25 frames)
Auth flow, Buy Now → Checkout flow, Make an Offer, new buyer/seller message
screens, Wallet, updated Home variants. Each wired into the journey map's
navigation (e.g. header Login button → Login → Verify → Home).

### Phase 3 — Tablet layer (104 frames)
Per-screen CSS at ~744px matching the tablet designs (replacing guessed
shrink behavior). Tablet-specific navigation patterns (designed Menu screen)
included.

### Phase 4 — Phone layer (103 frames)
Per-screen CSS at ~390px matching the phone designs; replace the invented
hamburger drawer with the designed Menu / Menu-Not-Registered screens; phone
navigation follows the phone journey wiring.

### Phase 5 — Verification loop
Puppeteer screenshots of every page at 390/744/1440 compared against the
reference PNGs; **flow walk**: script clicks through each named journey and
asserts the navigation graph matches `flows.json`. Fix and repeat. Final
deliverable: coverage report with per-screen ✓.

## Decisions & constraints

- One responsive app, not per-device pages (user decision 2026-07-11).
- Prototype flows are a first-class deliverable, not an afterthought
  (user request 2026-07-11: "don't forget the flow and the user journey").
- Fidelity bar: match the designed widths closely (spacing, type, structure);
  fluid behavior between breakpoints is our judgment, biased to the nearest
  design.
- Small/component frames are implemented only as parts of the screens that
  use them.
- RTL/Arabic content preserved exactly as designed.
- No new frameworks; extend the existing engine.

## Error handling

- Figma API 429s → exponential backoff; failed PNG renders → retry at
  scale 0.5, else logged in the matrix as "no reference image".
- Screens whose reference data is ambiguous get flagged in the matrix for
  user review rather than silently guessed.

## Testing

Phase 5 is the test harness; additionally each phase ends with a
spot-check of 3–5 screens against PNGs before moving on.
