# Handoff

## Current Our Story release - October 18, 2026

Derek's [Our Story preview](https://d-towsondiner.xsolutionsmd.com/about/) is live at application revision `5588348d0e3d2f7463d07d3e3d7d1db371c4e35c`. Application CI and Oracle release completed successfully. Claude incorporated the restaurant's published note naturally into the accepted centered editorial layout: Baltimore-area recognition and since-1957 staple; the 1994 father-and-son purchase by Sam and Nick Kourtsounis as a family-run, family-friendly place; finest ingredients and on-premises desserts; breakfast all day.

The exact original historical rooftop-sign photo (291x183 pixels, 17,724 bytes) appears as a modest framed inset, captioned "An earlier look at Towson Diner." It displays at 291x183 CSS pixels on desktop and 390px mobile, reducing to 250x157.21 at 320px. Its intrinsic softness reads naturally as a historical print; full composition is retained without distortion or enlargement. Neon hero, interior figure, visit block and the existing menu-photo update remain intact. Regenerated home/menu/visit HTML is byte-identical; all 432 menu rows, 102 photos, prices and Toast ordering are preserved.

Independent Sol review passed all six focused live cases with high confidence and no findings: exact revision; desktop 1440x900 story/photo composition; mobile 390x844 composition; actual story-to-menu/mobile-navigation return; 320x740 with 32px root text and container-level photo/control checks; and exact live photo hash. Astra accepted no-change fixes, same-revision recheck and deploy; no corrective product change or redeployment was warranted. See [validation](../docs/VALIDATION.md). Slack delivery remains blocked as recorded below; final-handoff delivery is not accepted.

## Current Derek preview - October 18, 2026

[Derek menu](https://d-towsondiner.xsolutionsmd.com/menu/) retains the accepted photo framing from `e652b2167c75f97e276d3a5daa0c1d15b3abe9de` within the current `5588348` application. Natural food subjects use consistent landscape 4:3 frames, photos left of names, and aligned price edges. Frames are 156x117 desktop, 104x78 mobile and 88x66 narrow mobile. Selected overhead plate rotations and targeted dessert/drink focal positions preserve recognizable subjects. Original photo bytes and all 102 placements remain unchanged.

The variation covers 99 matched products across 102 of 432 rendered rows (423 distinct products). The remaining 324 products / 330 rows have no selected photo. Derek accepted the amount and explicitly stopped research. This is bounded coverage, not proof no other photos exist. Public [photo provenance](menu-photo-provenance.json) retains source hashes/URLs, IDs, crops and confidence, including 36 likely matches. Confident contextual inference is authorized without exact captions; historical preparation, customization and portion aliases remain documented. Do not infer identical toppings, current stock or serving-size guarantees. Standing owner permission covers the gathered business assets.

## Prior accepted menu-photo release and review

Application CI and Oracle release succeeded for `e652b2167c75f97e276d3a5daa0c1d15b3abe9de`. Independent Sol passed all six focused live cases with no findings: exact version; desktop breakfast framing; mobile dessert framing; Quesadilla search; the prior F1 at 320x740 with 32px root text; and portrait strawberry-milkshake framing. F1's price wraps in three lines within the row; its 0.0000153px measured overhang is floating point noise. Document/client width is 305px within the 320px Chrome viewport with a 15px scrollbar: no horizontal overflow.

Coordinator accepted review, no-change fixes, same-revision recheck and deploy. The prior 99-product / 102-ID identity review was reused unchanged, as were completed menu/interaction/image/hash checks. No new research or repeat regression sweep was performed. Detailed review and deployment receipts remain private. Earlier `9700428` evidence is historical and superseded for visual framing by this release.

## Branch boundary

This Derek task did not write main or Abdul's branch. The earlier `b5cbe4abde152e4a820253e8630853f4c556d761` preservation receipt is historical, not a claim about their current live revisions. Separate authorized Abdul work is outside this task's scope. Preserve the deliberate Derek-only menu-photo variation; do not merge it into main or Abdul. Source: https://github.com/xsolutionsmd/towson-diner.

The accepted normal four-page build and full sourced menu remain the baseline, with existing Toast ordering, inquiry, phone and Maps destinations. No custom checkout/payment platform was added.

## Delivery pending and next action

The current updated 152-asset ZIP is unchanged by this story task, and its delivery and the final Slack URL message remain pending. Chrome browser-control attachment failed, and the Slack connector requires reauthentication. No upload URL was issued, no file bytes were sent, and no duplicate message was posted. No additional Slack/browser attempts were made during this finalization. The older normal delivery remains valid; it is not delivery of this updated package. Final-handoff delivery is not accepted.

Retry only when Chrome control attachment is restored or the Slack connector is reauthenticated. Then deliver the current package to the established thread, send the final Derek URL, reload/read back the persisted result and save real delivery links. The canonical directory's three Towson URLs were unchanged and visibly read back during this update; no directory write is required. Further research or production promotion requires a separate authorized task.

## Limits and retention

Exact dining hours conflict: retain seven-days/call-for-hours copy. Attribute restaurant-published history; do not infer current ownership or a sale. No Stitch; accepted browser/devtools evidence was used and REA did not run. Claude's actual rate limit led to the stopped-task Astra refinement fallback. Browser evidence uses Chromium viewport/root-font simulation, not physical phones, Safari or native-touch coverage. External checkout/payment/inquiry internals were not exercised.

Retain original media, provenance, required review/release evidence and the unchanged current pending ZIP for delivery. Source checkouts remain active. After the Our Story review, the coordinator recycled this photo checkout's reinstalled app/dist and app/node_modules: 27,567,139 bytes in 348 files, with recovery hashes verified. Recycling freed 0 bytes of disk space; the Recycle Bin was not emptied. No local services remain from this task. Recheck retained delivery resources after Slack delivery/acceptance. This documentation task started no local server/container and performed no deletion. Preserve persistent application data and designated environments under standing retention rules.

## Documentation publication

Only this handoff and docs/VALIDATION.md are published in a docs-only `[skip ci]` commit. The reviewed application/runtime and release inputs remain identical to the live `5588348d0e3d2f7463d07d3e3d7d1db371c4e35c` tree. The private final receipt distinguishes the documentation source revision from the live application revision. No additional release, app tests or live probes are initiated; Slack delivery remains pending as recorded above.
