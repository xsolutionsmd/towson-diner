# Decisions

| Date | Decision | Made by | Source |
|---|---|---|---|

## October 18, 2026 - Towson Diner REA exception
Derek explicitly selected "Continue with browser evidence" after the dedicated REA helper launch was rejected by automatic approval review. For this build only, Sol may reconstruct from actual inspected desktop/mobile browser evidence without REA. Do not retry or bypass the rejected launch, label browser evidence as REA, or claim unavailable analysis ran. All other ordered stages, fidelity checks, actual asset/content placement and independent live review remain required.

## October 18, 2026 - Standard nonblocking browser fallback
Derek subsequently clarified that failed REA must never be a required gate. The canonical XS workflow now permits ordinary browser/developer-tools reference inspection and continuation without a repair wait or waiver. This supersedes the narrower exception framing above. Do not repeat known failed/rejected helper attempts; report the actual method and retain desktop/mobile captures, observed flows and populated quality checks.
