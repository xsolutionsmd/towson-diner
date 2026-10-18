# Towson Diner reconstruction blueprint

Observed October 18, 2026, before implementation. Reference: [Sunday in Brooklyn](https://www.sundayinbrooklyn.com/), [Menus](https://www.sundayinbrooklyn.com/menus/) and [About/FAQ](https://www.sundayinbrooklyn.com/about/). Original implementation; no reference code, identity or images copied.

## Evidence method and limits

Ordinary T3 browser inspection: rendered desktop/mobile pages, computed styles, measured DOM layout, real Breakfast category click/hash/active-panel readback and mobile navigation open/close. REA did not run. Its rejected helper remains untouched. Derek's October 18 standard policy makes browser/devtools inspection the fallback without a repair wait; this supersedes the earlier build-only waiver framing. Private captures are retained with the project evidence, including the earlier Home/Menu desktop/mobile images and this round's observations. The earlier home-desktop capture has an unloaded hero; the fresh live browser showed the photograph and is the usable evidence for that role.

## Reproducible layout

| Component | Observed reference | Towson implementation |
|---|---|---|
| Desktop masthead | White full-width band, hero begins at y≈177 at 1280px. Centered 300×85 identity above quiet nav at y≈130. | Cream band, centered two-line red serif text identity, 176px opening height; four page links and Order online. |
| Scrolled masthead | Compact horizontal identity/navigation, about 76px tall. | Fixed compact variant after opening masthead passes; reserve opening space to avoid content shift. |
| Main photo | Full viewport width; 1280×720 at desktop, 390×422 mobile. Cover crop, edge-positioned previous/next controls. | Home 16:9 desktop and near-square mobile; manual waffle/burger/neon gallery, no autoplay/counter. Menu 280px desktop/190px phone adaptation for quick access. |
| Editorial content | Centered column, ~900px outer width; narrow body copy, serif title, generous 75–100px vertical spacing. | 900px outer / 650px reading column, 80–100px section spacing; centered story/visit blocks, simple rules and photographic spreads. |
| Menu | ~634px text column at 1280; category links 12px/18px Inconsolata, active green underline. Group headings 34.5px/38px; body 15px/22.5px; spacious text rows. No item photographs. | 680px menu column, 15–16px local monospace body, 30–34px group headings. Red underline, warm green secondary accents. Every source ID appears as its own text row, including repeated products with different placements/prices. |
| Mobile navigation | ~78px header, 176×50 identity; menu panel occupies viewport, vertically stacked links; toggle changes to close. | 88px header, inset wordmark, consistent SVG toggle; full-height cream panel with large links and order CTA, Escape/keyboard/focus return. |
| About/FAQ | Broad place photo followed by centered information sections and small section links. | Separate About/Visit URLs using the same broad place image and centered editorial rhythm; no unrelated FAQ/reservation controls. |

Two typography families only: Georgia for identity/editorial headings and a local monospace stack for navigation, body and menu. This approximates the reference's serif identity and Inconsolata without remote font loading. Palette: cream #faf7ef, ink #252b24, diner red #a32925, deep green #315846. Small uppercase navigation with measured tracking; no decorative ordinals, badges, illustrations or card grids. Hover/focus underlines and 160–220ms opacity/color transitions; reduced-motion removes transitions and smooth scroll. No entrance animation that hides initial content.

## Pages, assets and company rationale

- Home: authentic waffle gallery first, breakfast all day, since-1957 introduction, full-menu/order actions and concise address/visit section. Facts from [profile](company-profile.md), [offerings](offerings.md), [sources S1/S2/S4](sources.md).
- Menu: all six source menus and all 432 IDs from [menu.json](menu.json). Default Breakfast, category/hash navigation, optional group select and all-menu search. Keep source names/prices; no inferred ingredients or stale stock flags. One pricing/availability note directs visitors to Toast. Empty prices remain “See online options,” never fabricated.
- About: since 1957, on-premises baking and all-day breakfast supported by official history. Attribute the 1994 family-operation history to the restaurant's published account; do not assert current ownership. Use place imagery rather than a weak documentary dessert photo.
- Visit: exact address/phone/email, existing directions/inquiries, seven-day copy and call for today's hours. No 24-hour/open-now claims or openingHours schema.

| Original SHA prefix | Derivative / placement | Crop and factual constraint |
|---|---|---|
| 9f30787d692c | waffle.webp, Home/menu gallery | Preserve strawberries/cream; real official image, not a named variant promise. |
| a087a3e63c31 | burger.webp, Home/menu gallery | Generic burger/fries scene; no unsupported exact product association. Mobile crop favors burger. |
| 225aa3dddd04 | neon.webp, Home gallery/About hero | Crop lower/right pedestrian away; retain entrance, neon and sign. |
| ca3e3ddaa72e | facade.webp, Visit hero | Remove excess parking foreground, preserve entrance/flag. |
| 4d1cbd658513 | interior.webp, About spread | Crop TV/top and foreground patrons; retain booths/chrome. |

Full source mapping and source-page links live in [media.md](media.md). All library sheets and primary originals inspected before selection. Logo source inspected; clean text identity avoids thin edge fragments and preserves masthead clarity. No menu-item photo variation in this reconstruction.

## Behavior and integration boundaries

Separate static HTML entries at `/`, `/menu/`, `/about/`, `/visit/`; normal links provide direct load/reload/history. Menu category links update the URL hash and active underline/panel; group selection narrows within a category. Search matches names across all menus, updates an accessible result message and exposes clear reset/no-results actions. URL query/hash restore state on load/back. The full source remains present in HTML for source-ID reconciliation and progressive fallback; filtering hides rows rather than discarding them. Gallery previous/next wraps, updates descriptive alt text, and never starts automatically.

Navigation open state locks background scrolling, makes main/footer inert, traps focus and restores the toggle on close. At narrow widths links wrap inside padded containers; native search/select/buttons get full usable widths at 320px and 200% text. Meaningful focus rings remain visible. Images use local responsive derivatives, explicit dimensions and lazy loading below the fold.

The verified Toast link is the primary ordering action. Checkout, payment, stock, modifiers and fulfillment remain with Toast. Phone/email invoke device applications; directions open Maps; inquiries link the existing hosted page. No local form, cart, accounts, reservations, datastore or custom API. See [API contract](../docs/API.md). Runtime `/health`, `/version.json`, noindex and real missing-route 404 remain the existing nginx contract; production/container verification belongs to the following integration stage. External-service error/success states and private server internals are unobserved, not simulated.

## Refinement

Astra performed the authorized refinement fallback after Claude reported its API rate limit and was stopped/revoked. The accepted composition, imagery, typography and text-only menu remain. A compact Order link now sits beside the mobile navigation toggle, making the verified primary action available before scrolling; it hides while the full navigation is open. The menu's source-observation date stays in the KB, while the visitor sees one concise current-price/availability link. Actual desktop/mobile comparison and 320px/200% text checks confirmed containment; no additional design cycle or REA attempt occurred.
