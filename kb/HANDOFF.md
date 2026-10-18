# Handoff

## Photo framing correction

Derek requested natural image orientation/sizing and photos to the left of food names so prices align. The current correction uses consistent 4:3 frames (156x117 desktop,104x78 mobile,88x66 narrow mobile), fixed left photo placement, selected overhead plate rotations and targeted dessert/drink focal positions. Original photo bytes and all102 mappings remain unchanged. This correction supersedes the prior sizing; final runtime/review receipts identify the corrected live revision.

## Current state ? October 18, 2026

[Derek preview](https://d-towsondiner.xsolutionsmd.com/menu/) is published at `970042805ad3cea2c572bc220ec270ce4c0a81c8`. The accepted Derek-only variation shows real business photos for 99 matched products across 102 of the 432 rendered menu rows (423 distinct products). All menu entries remain available. Derek accepted the current collection and explicitly stopped research; 324 distinct products / 330 rendered rows remain without selected photos. This is a coverage limit, not evidence that no other photos exist.

Derek permits confident visual/contextual matches without exact captions. Public [photo provenance](menu-photo-provenance.json) preserves item IDs, source hashes/URLs, crops and confidence, including 36 likely matches. Historical preparation, customization and portion aliases illustrate the documented food; do not infer current stock, identical toppings or serving-size guarantees. Standing owner permission covers the gathered business assets without per-file approval.

## Accepted review and release

Application CI and Oracle release succeeded for `970042805ad3cea2c572bc220ec270ce4c0a81c8`. The independent compact live review passed all four scoped cases with no findings: exact live revision; desktop 1440x900 breakfast photo rows; mobile 390x844 Quesadilla search; and the prior F1 price-wrapping case at 320x740 with 32px root text. ?See online options? wraps across three lines with zero text overhang; document width stays 320px. The contact sheet and saved evidence were compared across all 99 product mappings / 102 IDs without a concrete wrong-dish finding.

Completed evidence was reused without repeating regression sweeps: all 432 source tuples and navigation/search/order checks; current 116-file application check; all 102 photo decodes and mobile crab search (seven rows / four photos); all 152 original hashes. The coordinator accepted review, no-change fixes, recheck and deployment at the same application revision. Detailed checks and receipts remain private. These subsequent documentation changes preserve the exact reviewed application, runtime and release inputs; no new application release is needed.

## Branch boundary

[Production](https://towsondiner.xsolutionsmd.com) and [Abdul preview](https://a-towsondiner.xsolutionsmd.com) retain text-only item menus at `b5cbe4abde152e4a820253e8630853f4c556d761`. Their prior scoped preservation receipt confirmed HTTP 200, exact revisions and unchanged menu bytes; no new sweep or change was made during final photo checking. Do not merge or synchronize the deliberate Derek-only photo variation into either branch. Source: https://github.com/xsolutionsmd/towson-diner.

The normal four-page build, infrastructure, independent review/corrections and delivery are complete and accepted. The complete sourced menu, authentic company imagery and existing Toast ordering, inquiry, phone and Maps destinations remain. No custom checkout/payment platform or customer transaction was added.

## Delivery and next action

The updated 152-asset media package and final Derek-preview message are being delivered to the established Slack thread; private delivery receipts retain the verified links. Final delivery acceptance belongs to the coordinator. The URL directory already has all three correct Towson URLs and was visibly read back during this update; preserve other businesses and existing links. Further collection or a production promotion requires its own authorized task. The retired batch-dispatcher/grant loop must not resume.

## Factual and tooling limits

Exact dining hours conflict: retain seven-days/call-for-hours copy. Attribute restaurant-published history; do not infer current ownership or a sale. No Stitch. REA did not run; accepted browser/devtools evidence was used. Claude's actual rate-limit failure led to the stopped-task Astra refinement fallback. Browser evidence uses Chromium viewport simulation and root-font enlargement, not physical-phone/Safari/native-touch coverage. External checkout/payment/inquiry internals were not exercised.

## Retention

Retain the original library, provenance, required review evidence and current media package as delivery/recovery resources. The canonical source and separate photo checkout remain active for final handoff; recheck disposable checkout/build output after coordinator acceptance. No local server or Docker environment was spawned by this final task; the coordinator stopped its Vite process. Preserve managed current/history server images under existing retention. No broad deletion or unrelated cleanup was performed.
