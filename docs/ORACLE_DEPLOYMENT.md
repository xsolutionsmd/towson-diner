# Oracle deployment

This generated contract is for one **stateless** HTTP image listening on `0.0.0.0:8080`, with Docker HEALTHCHECK and an uncached `/version.json` returning the exact build `revision`. Dockerfile accepts `REVISION` (or `APP_REVISION`) and `APP_SOURCE_URL`; labels must identify `https://github.com/xsolutionsmd/towson-diner` and that revision. The runtime uses a read-only root and disposable `/tmp`, `/data`, `/config`; persistent user data requires an adapted stateful deployment, not this template.

This is demonstration infrastructure; no current client sale is established. Work on `derek-dev` or `abdul-dev`; each push checks and deploys only its own preview. PRs check without publication. An authorized reviewed PR into `main` publishes production through `oracle-release.yml`. The other two publishers are `oracle-derek-dev.yml` and `oracle-abdul-dev.yml`; each has its own package, environment and updater. `app.yml` supplies the separate required application check.

## Existing first-release transition

Production was first published at application revision `558c8e9d74a6b963e3419376754fc3e220f8e966`. Its `/opt/towson-diner/compose.yaml`, root-only `image.env` and `first-release.json` precede managed releases. Keep that container running during installation. After the paused installer, run `sudo python3 server/bootstrap-first-release.py` exactly once. It verifies the original container, image, source, health and public HTTPS revision, backs up its configuration under `/var/lib/towson-diner-deploy/first-release-bootstrap`, and creates root-only `release.env` for updater rollback. It does **not** manufacture `current.json` or successful GHCR history. The updater writes its first managed receipt only after the real package passes candidate, Compose and HTTPS checks. The first image remains a concrete recovery reference in `previous.env` until a subsequent verified release replaces that reference.

The canonical route fragments are the three `deploy/oracle*.caddy` files in this repository. The shared gateway is installed at `/opt/xsolutions-gateway/config/Caddyfile`. Acquire `/var/lock/xsolutions-gateway.lock`, read fresh bytes, add only missing owned routes, validate a unique staged file with installed Caddy, compare original bytes before atomic replacement, and reload. Rollback is permitted only while current bytes equal this update. Preserve the existing main route, all other host blocks and certificate volumes. No client DNS changes are required.

## First installation

1. Verify existing `towson-diner` project/network alias and `towsondiner.xsolutionsmd.com` belong to this exact first release; inspect server capacity and gateway first. Set `ORACLE_HOST` to the verified Oracle IPv4. This repository and its three GHCR packages are authorized public. Configure main protection with strict required `Check deployable app` and `Check application container`, a required PR, no force push/deletion, and environments limited respectively to `main`, `derek-dev`, and `abdul-dev`. Observe actual push and PR runs.
2. Review generated files, including `server/retention/app.json`. Upload a focused copy to the server and run `sudo bash server/install.sh`. This leaves a new **application updater** timer paused and preserves an existing app timer's running state. It also registers the app with the shared automatic image-retention service and enables that service's hourly timer. Installer changes are separate administrator deployments; source-image releases never install root-owned scripts.
3. Back up gateway config; add only `deploy/oracle.caddy` to canonical and installed gateway source. Validate and gracefully reload the current gateway. DNS must point to Oracle. For an unused hostname this can precede the first image so final HTTPS verification can succeed. For occupied traffic, stage a healthy replacement before switching it.
4. Wait for the exact main release asset and validate an anonymous pull of its immutable package. Start `sudo systemctl start towson-diner-update.service`, verify its managed receipt and HTTPS revision, then enable `sudo systemctl enable --now towson-diner-update.timer`. Subsequent authorized PR merges deploy automatically. Observe the actual main-push Actions run and independently verify HTTPS plus existing apps. The server uses outbound public downloads; no GitHub SSH credential is needed.

## One-command operations

- Manual publication/deployment of current main: `gh workflow run oracle-release.yml --ref main --repo xsolutionsmd/towson-diner`. Rebuilding the same commit may produce the same image; an identical applied digest is an intentional no-op. Manual dev deployment needs its own isolated environment, never this production timer.
- Check/apply the currently approved release now: `sudo systemctl start towson-diner-update.service`.
- Status: `sudo systemctl status towson-diner-update.timer`; logs: `sudo journalctl -u towson-diner-update.service -n 60 --no-pager`.
- Current image/revision: `sudo cat /var/lib/towson-diner-deploy/current.json`.
- Persistently pause/resume: `sudo systemctl disable --now towson-diner-update.timer` / `sudo systemctl enable --now towson-diner-update.timer`.

## Automatic image retention

The installer copies the self-contained files in `server/retention/` to a shared root-owned image-retention installation and attaches a successful-update observer to `towson-diner-update.service`. The shared hourly timer starts automatically; it needs no Codex task or further prompt. Configuration keeps the running release and two previous successfully observed, distinct image sets. It waits until three successful image sets are known before deleting anything for this app; simply finding an old downloaded image does not prove a successful release.

Deletion is limited to this registration's exact image repository, with a 24-hour grace period from the cleanup system's first observation of each local image. Running and stopped containers, retained successful images, recovery references and fresh candidates remain protected. Pending deployment/recovery evidence pauses deletion. Volumes, networks and unrelated images are outside this cleanup. Retained application images are not database backups, and automatic image cleanup is not a total disk-space quota; logs, user data and protected images may still grow.

A failed release observer creates `/var/lib/app-launchpad/image-retention/towson-diner.uncertain` and blocks cleanup for this app until its successful history is reconciled. Preserve this marker while investigating. The installer refuses to downgrade or silently replace a different shared cleanup policy at the same version; update the reviewed shared policy version deliberately when changing it.

Status: `sudo systemctl status app-launchpad-image-retention.timer`; logs: `sudo journalctl -u app-launchpad-image-retention.service -n 60 --no-pager`; inspect a deletion plan without deleting images: `sudo app-image-retention plan`. The app's registration and update observer are installed separately from its release image, so app code cannot replace the root-owned cleanup engine.

## Recovery and maintenance

State is `/var/lib/towson-diner-deploy`; runtime is `/opt/towson-diner`; reviewed templates are `/usr/local/share/towson-diner`. Replacements can briefly interrupt this app. Candidate failures preserve the running app; handled replacement/TLS/state failures restore prior Compose/image/state. A failed first deployment removes only its own unsuccessful service. Failed recovery keeps evidence. A `transaction` file after an unhandled kill/reboot blocks later updates; inspect its named `check.*` directory, prior Compose/env/current metadata, and actual container before a deliberate recovery. Do not simply delete the guard and retry. Automatic recovery from power loss is not promised.

Code rollback normally reverts the change on dev and publishes a checked corrective main commit. Back up app config/release state and gateway certificates to independent storage; the existing same-disk server backup does not automatically cover this app. Never use global prune or `down -v` for app repair.

For approved disposal of this app only: disable its timer, stop its service, remove its Caddy block from canonical/installed source and validate/reload, stop/remove only Compose project `towson-diner`, and remove precisely its root-owned updater/unit/template/runtime/state files after verifying their paths and retaining any needed evidence. Unregister this app's retention configuration and observer when removing its updater; preserve the shared retention timer/engine for other registrations. Remove only its explicitly identified image tags, package and scratch repository when authorized. Preserve the shared gateway/network/certificates and all unrelated apps.

## Personal preview environments

This repository uses `main` for production plus long-lived personal preview branches; there is no shared `dev` branch, so the production workflow checks main pushes and PRs into main. Each preview is a fully separate stack: its own branch-scoped workflow, GHCR package, prerelease tags (`<branch>-<sha>`), Compose project, `/opt`, `/var/lib/...-deploy` and `/usr/local/share` paths, updater timer, retention registration and Caddy route. A preview publication never becomes the latest GitHub release and never changes production.

| Branch | Hostname | Slug / alias | Image | Workflow |
|---|---|---|---|---|
| `derek-dev` | `d-towsondiner.xsolutionsmd.com` | `towson-diner-derek-dev` | `ghcr.io/xsolutionsmd/towson-diner-derek-dev` | `.github/workflows/oracle-derek-dev.yml` |
| `abdul-dev` | `a-towsondiner.xsolutionsmd.com` | `towson-diner-abdul-dev` | `ghcr.io/xsolutionsmd/towson-diner-abdul-dev` | `.github/workflows/oracle-abdul-dev.yml` |

Work on your own preview branch (directly or through feature-branch PRs into it); each push to it publishes and deploys only that preview. Promote with a reviewed PR from a preview branch into `main`. After each production release, merge `main` back into every preview branch so they do not drift.

Setup per preview, following production's first-installation steps: create the branch from main, create a GitHub environment with the same name restricted to that branch, make its GHCR package anonymously pullable under the same visibility rule as production, run `sudo bash server/<branch>/install.sh`, add `deploy/oracle-<branch>.caddy` to the gateway under its lock, validate and reload. Enable `sudo systemctl enable --now <slug>-update.timer` only after a valid package/release exists. Compose exports `APP_ENVIRONMENT`; all three demo environments serve `noindex`. There is no datastore, custom submission endpoint or server-side transaction. Ordering and inquiry retain existing external providers.

Application/runtime source is shared at initial infrastructure delivery. Preserve any future intentional Derek-only menu-photo variation; do not propagate it during routine branch synchronization. Installer/updater code is reviewed root-owned configuration and requires a separate focused administrator install when changed.
