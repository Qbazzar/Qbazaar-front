# Q Bazaar — Multi-Page Interactive Export

A faithful, **fully-interactive** export of the *Q Bazaar* marketplace design as a
single project with **one HTML file per screen** (24 screens). Every page runs the
**original design-canvas engine**, so all the original behaviour works exactly like
the source file — favourites, tabs, dropdowns, list/grid switch, chat, sliders,
filters — while buttons that jump to another screen now navigate between the
separate `.html` files.

## How to run

The pages load shared scripts, so serve the folder over HTTP (don't use `file://`):

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static server works (nginx, `npx serve`, Live Server, etc.).

## How it works

Each page is a thin shell that boots the shared engine on the right screen:

```html
<link rel="stylesheet" href="assets/styles.css">
<script>window.__QB_SCREEN="product";</script>   <!-- which screen this file shows -->
<script src="assets/engine.js"></script>          <!-- the original DCLogic + React runtime -->
...
<script src="assets/app.js"></script>              <!-- template + data/logic, injected & booted -->
```

- **`assets/styles.css`** — the full design system + all fonts (inlined `@font-face`).
- **`assets/engine.js`** — the original design-canvas runtime (React is bundled inside `app.js` as data URIs).
- **`assets/app.js`** — the original screen template plus the app logic/data. The only
  change from the source is the `go(screen)` function: instead of switching screens
  in-place it navigates to that screen's `.html` file. All other interactions are the
  original code, untouched.
- **`assets/photos.js`** — fills every design placeholder (`.qb-ph`) with a real photo
  from `images/`. It reads each placeholder's caption ("car photo", "brake kit",
  "tires", "villa photo"…), maps it to a category, and sets a matching photo as a
  `cover` background. Runs after each render, so it also fills cards created on
  interaction. It also powers the **product-page image gallery**: the `‹ ›` arrows
  cycle through related photos and update the `x/N` counter. To go back to the
  original hatched placeholders, remove this one `<script>` from the pages.
- **`images/`** — the photo library used to fill placeholders (cars, motorcycles,
  scooters, bikes, campers, car parts, real estate, product shots, …).
- **`assets/slider.js`** — turns every `.qb-slider` row (Recommended for you, Best
  Selling) into a working carousel: prev/next arrows, clickable dots that track the
  scroll position, and drag/scroll. Runs after each render.
- **`assets/mobilemenu.js`** — on phones (≤760px), hides the header's icon cluster and
  shows a hamburger that opens a slide-in **navigation drawer** (Home, Categories,
  Favorites, Messages, Saved Search, My Ads, Sales Overview, Account Settings, Wallet,
  Log Out + Add Ads), matching the Figma mobile "Menu" screens. Desktop is unchanged.
- **`assets/responsive.css`** — responsive layer loaded after `styles.css`. Guards
  against horizontal overflow, tightens button heights, restacks the scattered
  "Find Places" location pills into a wrapped row on phones, and tunes tablet/mobile
  spacing. The base design already flex-wraps, so every page adapts down to ~375px.
- **Toasts across pages** — actions that navigate (send offer, publish an ad, log in,
  …) show their toast on the current page before navigating, so it isn't lost to the
  page reload. In-page actions (follow, block, report, filters) toast normally.
- **Header avatar menu** now includes **Followers**, opening the Users
  (Following / Followers) page.
- **`assets/chatcards.js`** — renders the **Offer / Purchase request** cards inside
  the chat (Flow 286). Chat messages encoded as `QBCARD|kind|status|…` markers become
  rich cards covering every state (pending, accepted, rejected, countered, expired,
  cancelled, paid, waiting). Pending cards have working Accept / Reject / Counter /
  Confirm / Decline / Cancel buttons that move the card to the matching state.

Because it is the original engine, in-page state (open menus, active tab, list vs.
grid, chat messages, selected filters…) behaves identically to the source. State does
not persist across a navigation (each file boots fresh on its own screen) — that is the
expected trade-off of splitting one app into separate pages.

## The 24 screens

| File | Screen |
|------|--------|
| `index.html` | Home |
| `all-categories.html` | All Categories |
| `parent-category.html` | Parent Category |
| `category.html` | Category listings (list / grid) |
| `product.html` | Product detail |
| `offer.html` | Make an Offer |
| `checkout.html` | Checkout |
| `preview.html` | Preview an Ad |
| `publish.html` | Publish / promote an Ad |
| `seller.html` | Seller profile |
| `seller-individual.html` | Seller (Individual) |
| `seller-organization.html` | Seller (Organization) |
| `messages.html` | Messages / chat |
| `wishlist.html` | Wishlist |
| `saved-search.html` | Saved Searches |
| `companies.html` | Companies |
| `sales-overview.html` | Sales Overview |
| `payment-method.html` | Payment Method |
| `notifications.html` | Notifications |
| `auth.html` | Sign in |
| `users.html` | Users |
| `account.html` | Account / settings |
| `add-ads.html` | Add / create an Ad |
| `premium.html` | Premium |

## Notes

- Listing photos are intentional **placeholder tiles** (hatched boxes with a caption) —
  that is how the source design was authored, not a missing asset.
- The logo, icons, and fonts are all inlined; there are **no external network requests**.
