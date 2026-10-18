# Design brief
Research, bounded assets and reference inspected October 18, 2026. Page/content sufficiency accepted for the landing build.

## Visitor job and primary action
Find a meal, order through the existing Toast service, or plan a visit. Order online is the primary action; a readable menu and call/directions are immediate supporting actions. Sources [S1][S4][S5].

## Content plan
- `/`: concise breakfast/all-day dining introduction, real company hero photography, menu and order links, short history/visit prompts.
- `/menu/`: all 432 unique Toast items across six menus, grouped and navigable. Current source in menu.json. Omit contradictory ingredient descriptions; one concise pricing/availability note.
- `/about/`: sourced since-1957 history, business-published on-site baking and real place imagery. No invented owner quote or claim.
- `/visit/`: verified address, phone/email, Maps directions, seven-day service and call for current dining hours. Optional original hosted inquiry link.
- Actual image mapping is accepted below; Sol selects and optimizes the corresponding original files. No fabricated menu photos or form success states.

## Template site
Selected reference, inspected October 18, 2026: **https://www.sundayinbrooklyn.com/**, with `/menus/` and `/about/`. Media gate passed with 31 verified files, 12 shortlisted and complete 432-ID menu mapping. Selection followed the landing capability decision and inspection of the authentic waffle/burger assets.

The reference demonstrates a premium neighborhood restaurant presentation: large editorial food photography, a centered wordmark and quiet navigation, generous white space, restrained serif identity/headlines with Inconsolata menu/body type, a compact header after scrolling, and clear category tabs. Its TO GO link leads to Toast; the same verified external service boundary fits this business.

Inspected desktop at 1280/1440 and mobile at 390 CSS pixels. Opened the mobile navigation, observed its full-height link panel, switched menu to Breakfast and verified active state/hash/content replacement. Inspected the About/FAQ layout too. Desktop/mobile captures are retained with private reference evidence; Derek authorized browser-only reconstruction on October 18 after the REA helper launch was rejected; Sol must perform focused browser analysis and its own populated implementation checks. Do not claim REA ran.

Runner-up: https://www.bubbys.com/ and `/menus/`, inspected desktop/mobile. Strong diner fit and Toast action, but denser navigation, decorative treatment and mixed display type are less suitable for the restrained typography constraint and available media.

Reference menu has **no per-item food photos**. Main and Abdul retain a text menu. Its broad photo gallery above the menu is allowed; use actual Towson Diner images. After normal final delivery, a separately reviewed Derek-only menu-photo variation is required for defensible item matches.

Adapt closely: masthead proportions, wide hero/photo crop, compact scrolled header, menu tab rhythm/underline, generous menu rows, centered editorial story/visit blocks and lightweight transitions. Replace ALL identity, photos, text, links, and decorative illustrations; no competitor assets/code. Use Towson's red/cream instead of the reference's green/blue accents. Use the actual diner wordmark or a faithful clean text treatment rather than the reference logo.

Intentional changes: four separate primary page URLs, prominent Order online in the header/mobile menu, no reservation/signup forms, no decorative illustrations/counters, no unsupported hours, and shorter hero on the menu page so a phone user reaches categories promptly. Add a restrained search/category aid only to handle the actual 432-item depth. Gallery can be manual (no autoplay) to avoid unnecessary motion; preserve smooth direct feedback and reduced motion. Story/Visit split the reference's informational layout into useful separate URLs.

Initial inspected asset fit: official waffle `9f30787d692c3aa8b6f8a0e42dcce22a234ce258fb8fc6874ab385ca402eea33` is 3662x2511, suitable for breakfast hero; burger `a087a3e63c31cf75fc4fe858a60f3a2a4dd11d843a59d38c31bd984358666b69` is 4000x3000, suitable for second food scene. Both were visually inspected. Accepted place/brand mapping follows. The 291px exterior is unsuitable for a large hero.

## Visual direction
Warm diner identity, restrained cream/red accents, original company photography and the reference's editorial structure. No generic card grid, ornamental badges or fabricated premium promises. Necessary copy only. Favor a consistent serif headline/wordmark plus one legible body/menu family.

## Accepted decisions and corrections
<!-- Dated feedback from Derek, Abdul or the client. Newer explicit corrections win. -->

October 18 menu-photo correction: Derek's preview should show a real business photo for every menu item where a usable matching photo can be found. The initial bounded shortlist is insufficient for this expanded request. Revisit partial source coverage and existing unmatched candidates. Exact item captions are not required: use confident visual/contextual associations as `likely`, documenting ingredients, preparation and other supporting clues. Leave genuinely ambiguous associations unmatched. Preserve all menu items and the accepted layout; production and Abdul retain their text-only menus.

## X Solutions standing design rules

- Thoughtful, distinctive, professional and clean: strong typography, authentic
  photography, smooth restrained motion, enjoyable interaction; necessary copy only.
- No decorative numbering: no section ordinals, numbered badges, photo prefixes or
  counters such as 01 / 02. Factual numbers (prices, phone, dates) are fine.
- Primary navigation uses separate page URLs unless explicitly requested otherwise.
  Prefer one font family, at most two complementary families unless established
  company branding requires more. Adapt the inspected reference closely and keep
  company-specific structural changes natural and justified by the visitor's task.
- Choose photos for composition, quality, real work shown, variety and recency across
  the whole history, not just the newest posts. Never present generated or competitor
  work as the client's.
- Check every form control against its containing card (including padding) on narrow
  phones, with enlarged text and focus states; page-level overflow checks are not enough.
- Native inputs, keyboard access, visible focus, reduced-motion support and a pause
  control for ongoing decorative movement.
- Consistent SVG arrows/icons (no text glyphs or emoji arrows). No visitor-facing demo,
  preview or "functionality" banners and no repeated disclaimers.
- Optimise without degrading the experience: right-sized media, lazy loading, no
  needless browser work.

## Accepted media placement
| Asset SHA prefix | Pages / role | Inspected fit |
|---|---|---|
| 9f30787d692c | Home primary food hero; menu header option | 3662x2511 official waffle; keep strawberries and cream in wide crop. |
| a087a3e63c31 | Home/menu gallery | 4000x3000 official burger/fries; generic food scene, no exact named burger assertion. |
| 225aa3dddd04 | Home atmosphere / About | 2048x1152 neon exterior; left-biased crop avoids lower-right pedestrian. |
| ca3e3ddaa72e | Visit hero | 2048x1358 official daylight facade; trim foreground, keep entrance/flag. |
| 4d1cbd658513 | About interior | 1024x771; retain chrome and booths, avoid top TV/patrons when practical. |
| af85a193d1f3 | Sitewide logo if crop remains clean | 640x480 official Toast mark; preserve full badge proportions; thin white edge fragments need conservative crop. Clean text identity is acceptable. |
All originals resolve through the private manifest; public media.md keeps provenance. Source history is partial, not exhaustive. 18 of 423 distinct products have defensible photo matches, 402 lack photos, three remain uncertain. Main/Abdul item menu remains text-only; final Derek-only variation uses confirmed associations only.


Owner correction, October 18, 2026: the current matched-photo amount is sufficient. Stop further research; integrate the existing selections, visually check the changed result and deploy Derek preview. Reuse completed checks.
