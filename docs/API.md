# Runtime and integration contract

Accepted October 18, 2026 against populated source revision `9e6b3e4b14e7ffa9340f8d2a79c799b77ebf3a67`. See the local runtime acceptance in `VALIDATION.md`; remote verification follows first publication.

The website is a static Vite build served by unprivileged nginx on port 8080. It stores no customer records and accepts no transactions or form submissions. Home, Menu, About and Visit are separate direct URLs. Navigation and menu filtering run locally in the visitor's browser.

| Interface | Expected behavior | Boundary |
|---|---|---|
| `GET /`, `/menu/`, `/about/`, `/visit/` | Authored page, direct load and refresh work | Static same-origin content |
| `GET /health` | HTTP 200, `ok` | Runtime readiness |
| `GET /version.json` | HTTP 200 JSON with exact source revision; no-store | Release identity; no secrets |
| Unknown path or missing asset | HTTP 404 | Authored fallback may render; status remains 404 |
| Menu categories/search | Local navigation/filtering with clear empty state | Observed source data; no customer input sent to a server |
| Order online | Navigate to the existing Toast location | Toast owns current availability, checkout, payment and ordering state |
| Phone/email/directions | Open the verified public destination | Device dialer/mail client or Maps |
| Existing inquiries | Navigate to the original hosted contact page | Existing provider owns delivery; no duplicated form |

## Verified public destinations

- Ordering: https://order.toasttab.com/online/towson-diner-718-york-rd
- Phone: `tel:+14103210407`
- Email: `mailto:towsondiner@gmail.com`
- Directions: https://www.google.com/maps/dir/?api=1&destination=718%20York%20Rd%2C%20Towson%2C%20MD%2021204
- Original inquiries: https://www.towsondiner.net/locate
- Instagram: https://www.instagram.com/towson_diner/
- Facebook: https://www.facebook.com/TowsonDiner/

Evidence and observation limits are in `kb/contact-and-hours.md`, `kb/sources.md` and the full item-level `kb/menu.json`. Source menu data contains 432 unique identifiers across six menus. Names and observed prices are usable; contradictory ingredient descriptions are omitted. No exact dining-hours schedule, availability promise or allergen guarantee is inferred.

## Release constraints

Runtime health, exact revision, valid HTTPS and noindex are required on each X Solutions environment. Assets are local optimized copies with retained provenance. External resources require explicit allowance in the app check. Production and both previews use independent scoped resources; there is no database or persistent customer volume required by this application.

## Acceptance boundary

Check rendered link destinations and external landing identity without placing an order, submitting an inquiry, opening a draft email or making a call. Check direct routes, reload/back, mobile navigation, search/category states and missing-route status. Runtime checks and live evidence are recorded separately; this contract is not a claim that unpublished code has already passed them.
