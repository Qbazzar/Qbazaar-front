# Q Bazaar — Frontend (interactive design prototype)

Q Bazaar (كيو بازار) is a Qatar-based classifieds marketplace for cars, motorcycles, parts, real estate and more.
This repo is the **frontend**: a multi-page, fully clickable HTML/CSS/JS build of the
Q Bazaar Figma design (`Cvn7hexeu07FIOyJhDDCLd`, 485 frames). It covers desktop at 1440px, tablet at 744px and phone at 390px, and
follows the prototype user journeys from the Figma file.

> **What it is:** a high-fidelity, clickable prototype that you can deploy.
> **What it is not (yet):** a production app. It has **no backend and no API**. All listings, users, chats and
> numbers are fixed data inside `assets/app.js`, and "login" is simulated in `localStorage`.

| | |
|---|---|
| Repo | `github.com/Qbazzar/Qbazaar-front` (branch `main`) |
| Live (GitHub Pages) | served from `main` (`.nojekyll` present) |
| Live (VPS) | `http://187.53.139.138/` (cPanel server, IP only, see [Deployment](#deployment)) |
| Design source | Figma file `Cvn7hexeu07FIOyJhDDCLd`, offline copy `D:\Doc\figma file\QBazaar _ كيو بازار.fig` |
| Status | Design build complete and verified (see [Status](#status)) |

---

## Quick start

The pages load shared scripts, so they must be served over HTTP (`file://` won't work):

```bash
python -m http.server 8793          # from the repo root
# open http://localhost:8793/index.html
```

Any static server works (nginx, Apache, `npx serve`, VS Code Live Server). A launch config for this lives at
`D:\Doc\.claude\launch.json` (port 8793).

There is no build step and no `npm install`. What you see in the repo is what gets deployed.

---

## Architecture

Each screen is a **thin HTML shell** that boots a shared design-canvas engine on one screen id:

```html
<link rel="stylesheet" href="assets/styles.css?v=13">      <!-- design system + inlined fonts -->
<link rel="stylesheet" href="assets/responsive.css?v=16">  <!-- tablet/phone layer -->
<link rel="stylesheet" href="assets/polish.css?v=5">       <!-- shadows, hovers, toasts per design tokens -->
<link rel="stylesheet" href="assets/typo.css?v=6">         <!-- exact typography tokens -->
<script>window.__QB_SCREEN="home";</script>                 <!-- which screen this file shows -->
<script src="assets/engine.js?v=13"></script>              <!-- design-canvas runtime (React) -->
<script src="assets/app.js?v=20"></script>                 <!-- templates + fake data + logic -->
<script src="assets/…"></script>                           <!-- enhancement layers, below -->
```

| File | Role |
|---|---|
| `assets/engine.js` | Original design-canvas runtime. It renders templates with React, which is bundled inside `app.js` as data URIs (`window.__resources`), so there is no CDN dependency. |
| `assets/app.js` (590 KB) | All screen templates, the fake data and the in-page logic. `go(screen)` navigates to `<screen>.html`. |
| `assets/styles.css` (500 KB) | Full design system with `@font-face` inlined. |
| `assets/responsive.css` | Tablet (≤1000px) and phone (≤600/760px) layouts, keyed to the Figma tablet/phone frames. |
| `assets/polish.css`, `typo.css`, `typo.js` | Design-token parity: shadows, hover language, toasts, per-string typography. |
| `assets/mobilemenu.js` | Header/drawer/menu, guest header, footer accordions, seller hero, chat two-step, sheets. It holds most of the phone behaviour. |
| `assets/buynow.js` | Buy Now request page, checkout copy, payment success/failure modals, and the wallet panel. |
| `assets/chat.js`, `chatcards.js` | Messages scenario (⋯ menu, block/report) and offer/purchase cards in chat, with every state. |
| `assets/acct.js` | Settings hub on phone. |
| `assets/selects.js` | Designed dropdowns: category cascade, distance, price type, city. |
| `assets/cropper.js` | Profile photo upload + circular crop, saved to `localStorage.qbAvatar`. |
| `assets/photos.js`, `slider.js` | Fill placeholder tiles with real photos from `images/`, and drive the carousels. |
| `assets/auth.css`, `auth.js`, `logo.svg` | Standalone auth pages (they don't use the engine). |
| `images/` | 107 photos (PNG/JPEG, hash-named with no extension, ~73 MB). |

### Rules you must follow when changing the code

1. **Bump the `?v=N` query on every asset you change, in every HTML shell.** Phones cached stale JS/CSS
   and "broken on mobile" reports turned out to be cache, not code (commit `460afec`).
2. **Never `innerHTML`-wipe or remove children of engine-rendered containers.** The engine's re-render
   (morph) crashes with `insertBefore` if its nodes vanish. Hide with a CSS class and *append* foreign nodes;
   adding is safe, removing is not.
3. **The engine drops event listeners on re-render but keeps attributes.** Tag elements with
   `data-*` attributes and use **one delegated `document` listener** (see `selects.js`).
4. **Targeting engine markup uses `[style*=…]` attribute selectors.** They must match the *browser-normalised*
   inline style: colour first in shadows (`rgba(0, 0, 0, 0.08) 0px 2px 8px`), with spaces inside `rgb( , , )`.
5. **Scope design rules by page (`html[data-screen=…]`) and by media query.** Global token flips have broken
   hundreds of other nodes before.
6. **Edit text files with a UTF-8-safe tool** (node, VS Code), never PowerShell 5 `Get-Content -Raw`/`Set-Content`,
   which corrupts Arabic and emoji (mojibake).

---

## Pages (37)

| File | Screen | Notes |
|---|---|---|
| `index.html` | Home | hero search with the category cascade and distance, categories, companies, places, sliders |
| `all-categories.html` | All Categories | Figma "Category - See All" |
| `parent-category.html` | Category page | Figma "Category Page" / "category-page" |
| `category.html` | Listings (list/grid) | filter sidebar, which becomes a bottom sheet on tablet/phone |
| `product.html` | Product detail | gallery, seller card, tech data, Buy Now / Make Offer |
| `buy-now.html` | Buy Now (request) | built from the offer shell by `buynow.js` |
| `offer.html` | Make an Offer | |
| `checkout.html` | Checkout | QNB + cash, Complete Payment → success modal (`?fail=1` shows the failure modal) |
| `payment-method.html` | Payment method | |
| `financing.html` | Flexible financing | standalone page |
| `messages.html` | Messages / chat | inbox → chat two-step on phone, offer cards |
| `notifications.html` | Notifications | |
| `wishlist.html` | Favourites | |
| `saved-search.html` | Saved searches | |
| `companies.html` | Companies | |
| `seller.html`, `seller-individual.html`, `seller-organization.html` | Seller profiles | hero, filters and info as sheets on phone |
| `users.html` | Following / Followers | |
| `account.html` | Account settings | phone: settings hub → panel |
| `my-ads.html`, `sales-overview.html`, `wallet.html` | Dashboard | same account shell |
| `add-ads.html` → `preview.html` → `publish.html` | Post an ad | Preview / Add / Save draft |
| `premium.html` | Premium | |
| `login.html`, `signup.html`, `signup-verify.html`, `enter-number.html`, `enter-code.html`, `verify-identity.html`, `forgot-password.html`, `send-code.html`, `new-password.html` | Auth flow | standalone (`auth.css`/`auth.js`) |
| `auth.html` | (legacy) | redirects to `login.html` |

## Features / user journeys (all clickable)

- **Auth:** login → verify identity → home. Signup → verify → phone number → code → home. Forgot → send code → new password → login.
  Signing in sets `localStorage.qbAuth`. Logging out clears it, and the header switches to guest mode (Login / Sign Up).
- **Buying:** product → Buy Now → checkout → payment success/failure. Product → Make an Offer → the offer card in chat
  (accept / reject / counter / confirm / cancel, including expired and paid states).
- **Selling:** Add Ads (designed selects, Pickup Only default) → Preview → Publish, plus My Ads, Sales Overview and Wallet.
- **Browsing:** category cascade and distance search, list/grid, filters (bottom sheet on tablet/phone), sliders, wishlist, saved search.
- **Social:** follow a seller, followers/following, chat block/report, notifications.
- **Account:** profile photo upload with crop, language menu (country codes + radios), settings hub on phone.
- **Responsive:** every page at 1440 / 744 / 390, with the designed phone menu, footer accordions and bottom sheets.

State does **not** carry across pages (each file boots fresh) except `qbAuth` and `qbAvatar` in `localStorage`.

---

## Status

**Design build: complete.** Last work was on 2026-07-14 (commit `a5ae5bd`).

- Every desktop frame in the Figma file has a page or an in-page state. The tablet and phone layers are implemented to the
  designed frames.
- **Final verification** (`docs/superpowers/final-report.md`, plan in `final-verification-plan.md`), seven test
  batteries per page per width (colours, fonts, icons, structure, buttons, screenshots, journeys):
  - **86 / 87** page×width combos clean. The only finding is a 21px overflow on `checkout` @390, clipped and not visible.
  - **24 / 24** journey checks pass.
- `docs/superpowers/coverage-matrix.md` and `journey-map.md` are the **2026-07-11 starting inventory**. Their
  PARTIAL/MISSING counts are from before the build and have been superseded by the final report.

**Known leftovers (cosmetic):**
- Typography: about 600 per-node differences remain against the exact render. Most are same-string role collisions
  (for example "Cars" as a crumb vs. as a title).
- Seller-organisation hero on phone still needs a visual check.
- Palette tint dedup and a side-by-side view in the render gallery (nice-to-have).
- Two icons have no source geometry in the file (chart, logout), so they are hand-drawn.

---

## Deployment

The site is **static files only**. Any web server that serves a folder works.

### cPanel VPS (187.53.139.138)

**Why it didn't work before:** cPanel/WHM is installed and running, but **no cPanel account had been created**
(`/home` had no user folder) and no files were in a served folder. Requests to the bare IP go to Apache's default
vhost (`/var/www/html`), which only held cPanel's "default web page" redirect.

**Current setup (IP only, no domain):** the files go into `/var/www/html`.

```bash
# one-time: add an ssh alias (key: ~/.ssh/qbazaar_root, its .pub in the server's /root/.ssh/authorized_keys)
cat >> ~/.ssh/config <<'EOF'
Host qbazaar
  HostName 187.53.139.138
  User root
  IdentityFile ~/.ssh/qbazaar_root
  IdentitiesOnly yes
EOF

# every deploy (from Git Bash, repo root; ships the committed HEAD)
tools/deploy.sh
```

`tools/deploy.sh` backs up the target to `/root/qb-backups/`, uploads `git archive HEAD` (without `docs/` and `tools/`),
and sets permissions. `.htaccess` adds `DirectoryIndex`, gzip, cache headers, and hides `docs/`, `tools/` and `.git`.

**When a domain is ready:**
1. DNS: an `A` record for the domain (and `www`) → `187.53.139.138`.
2. WHM (`https://187.53.139.138:2087`) → *Create a New Account* with that domain, e.g. user `qbazaar`.
3. `TARGET=/home/qbazaar/public_html OWNER=qbazaar:qbazaar tools/deploy.sh`
4. WHM → *Manage AutoSSL* → run it for the user (free HTTPS).

### Troubleshooting

| Symptom | Cause / fix |
|---|---|
| cPanel "default web page" / "Great Success" page | Files are not in the folder that vhost serves. For IP use `/var/www/html`, for a domain use `/home/<user>/public_html`. |
| 403 Forbidden | Permissions or ownership. In an account, files must belong to `<user>:<user>` with dirs 755 and files 644 (the script does this). |
| 404 on `assets/…` | Upload was incomplete, or paths are wrong. Check with `curl -I http://IP/assets/app.js`. |
| Page loads but looks old or broken on phone | Browser cache. Bump `?v=` (rule 1) and hard-refresh. |
| Works locally, not on the server | Linux is case-sensitive. File names in this repo are lowercase, so keep them that way. |
| Blank page | Open DevTools → Console. The usual cause is a JS file that 404ed or was cut off during upload. |

---

## Reference kit and tooling (outside the repo)

| Path | What |
|---|---|
| `D:\Doc\q-bazaar-refs\render\` | 474 pixel-exact HTML renders of every Figma frame + `index.html` gallery. Press **H** to show prototype hotspots. |
| `D:\Doc\q-bazaar-refs\message.json` | Full decode of the `.fig` (137 MB, 78,976 nodes) |
| `D:\Doc\q-bazaar-refs\flows.json` | 4,216 prototype interactions (2,060 screen→screen edges) |
| `D:\Doc\q-bazaar-refs\final\` | Verification output: `audit.json`, `journey.json`, 87 screenshots, `gallery.html` |
| `D:\Doc\q-bazaar-refs\iconlib.json`, `design-truth.json` | Harvested icons (306) and the design palette/fonts |
| `D:\Doc\q-bazaar-refs\tools\render3.mjs` | `.fig` → HTML renderer |

The `.fig` is decoded offline (fig-kiwi + kiwi-schema ≥0.5 + fzstd). The Figma REST API was abandoned because of its rate limits.
The Node scripts (battery runner, journey walk, typography audit, appshot) live in Claude Code session scratchpads
and are not in this repo. Copy them into `tools/` if the team needs to rerun the verification.

---

## Assessment and recommendations

- **Fidelity is very high.** As a design sign-off tool, stakeholder demo and **pixel spec for developers**,
  this build is done.
- **As a codebase it is fragile.** The screens come from one 590 KB generated `app.js`, and the fidelity comes from
  runtime patch layers (`mobilemenu.js` is 72 KB of DOM patching with MutationObservers and attribute selectors). Adding real
  data or features here will get harder with every change.
- **Recommended next step:** build the production frontend in a real stack that talks to a real API (for example
  Laravel + Blade/Inertia, or a React/Next SPA on a Laravel REST API). Use this repo and `q-bazaar-refs/render`
  as the visual spec, and `flows.json` / `journey-map.md` as the navigation spec.
- **Performance:** `images/` is 73 MB (several photos are about 2.8 MB each). Convert to WebP and resize to their
  displayed size before any public launch. The auth pages and `polish.css`/`typo.css` load fonts from Google Fonts. Everything else is self-contained.

## Security to-do

- **Revoke the Figma personal access token** (it is stored in plain text in `D:\Doc\.figma-token` and in
  `D:\Doc\.claude\settings.local.json`), then delete both copies.
- On the VPS: once key login works, set `PermitRootLogin prohibit-password` (or create a sudo user) and
  change the root password that was shared during setup.

## Handoff checklist

- [ ] Read this file and `HANDOFF.ar.md`
- [ ] Get collaborator access to `Qbazzar/Qbazaar-front` and the Figma file
- [ ] Run locally (`python -m http.server 8793`) and walk the journeys above
- [ ] Get SSH access to the VPS (your own key in `authorized_keys`)
- [ ] Domain → DNS → cPanel account → `tools/deploy.sh` with `TARGET=…` → AutoSSL
- [ ] Revoke the Figma token and harden SSH
- [ ] Decide on the production stack and API contract (the backend is not started)
