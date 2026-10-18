# Towson Diner

A sourced four-page restaurant website for Towson Diner at 718 York Road, Towson, Maryland. Built with Vite and plain JavaScript; served by unprivileged nginx. Ordering continues through the existing Toast restaurant page. The site accepts no customer transactions or form submissions.

## Develop and check

The standard Docker lifecycle is `python scripts/app.py start`, `python scripts/app.py check` and `python scripts/app.py stop`. See [WORKFLOW.md](WORKFLOW.md) for the full local contract. For a focused frontend session, run `npm ci` and `npm run dev` in `app`; `npm run check` generates and validates the four production HTML pages. Generated HTML comes from `app/scripts/generate.mjs`; edit that source rather than generated pages.

The public menu dataset in `app/data/menu.json` retains all 432 captured Toast identifiers. [Source evidence](kb/sources.md), the [full captured menu](kb/menu.json), [media provenance](kb/media.md), [reference blueprint](kb/template-blueprint.md) and [runtime contract](docs/API.md) explain the content and boundaries. Exact dining hours remain unresolved; the site invites visitors to call.

`main`, `derek-dev` and `abdul-dev` are the intended production and personal-preview branches. Current release progress is in [HANDOFF.md](kb/HANDOFF.md); planned hostnames are not proof of publication. [Validation](docs/VALIDATION.md) distinguishes actual checks from pending release work. All X Solutions demonstration environments retain noindex.
