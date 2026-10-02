# Real Good Social — Website (static)

The public website for **Real Good Social**, an early-stage social enterprise based in
Australia. Built to the [design brief](./documentation/real-good-social-website-structure-and-design-brief.md)
and the Real Good brand (blue-gradient heart mark, navy wordmark).

- **Framework:** React Router 7 (framework mode), **prerendered to static HTML**.
- **Hosting:** GitHub Pages — no server, no runtime, no environment variables.
- **Client:** React 18, hydrated. Per-route code splitting.
- **Design system:** brand colours, Inter throughout, WCAG 2.2 AA intent. See [Design system](#design-system).

Every page is rendered to HTML at build time, so content is visible before (or
without) client JS. Once JS loads, the client router takes over and navigation is
instant.

**Live:** <https://julianongit.github.io/real-good-social/>

## How the static build works

Three settings must agree on where the site lives, so the path is defined once in
[`base-path.mjs`](./base-path.mjs) and imported by each of them:

| File | Uses it for |
|---|---|
| `vite.config.ts` | `base` — the prefix on every asset URL |
| `react-router.config.ts` | `basename` — the prefix the router strips from routes |
| `scripts/finalise-static.mjs` | Un-nesting the prerendered HTML |

`react-router.config.ts` also lists every URL to prerender, deriving the initiative
and insight detail pages from the same data the pages render — so a new entry in
`app/data/` is published automatically, with no separate list to update.

After the build, `scripts/finalise-static.mjs`:

1. **Flattens** the output. Vite's `base` prefixes asset URLs *and* the router's
   `basename` nests the prerendered HTML under a matching directory, so pages land
   one level deeper than the assets they reference. Pages already serves the repo at
   the base path, so the nested copy is lifted back to the root.
2. Writes **`404.html`** from the prerendered catch-all route, so an unknown URL
   shows the site's own 404 page with a real 404 status.
3. Writes **`.nojekyll`**, without which Pages drops files starting with `_`.

## Project layout

```
website-2/
├── base-path.mjs             # single source of truth for the deploy path
├── react-router.config.ts    # ssr: false + the prerender URL list
├── vite.config.ts            # base + reactRouter() + tsconfig paths
├── scripts/
│   └── finalise-static.mjs   # post-build: flatten, 404.html, .nojekyll
├── .github/workflows/
│   └── deploy.yml            # build + publish to Pages on push to main
├── app/
│   ├── root.tsx              # document shell, chrome, ErrorBoundary
│   ├── routes.ts             # route table
│   ├── routes/               # one module per page (meta + loader + component)
│   │   ├── home.tsx  about.tsx  what-we-do.tsx
│   │   ├── initiatives.tsx  initiative.tsx      # list + detail
│   │   ├── insights.tsx  insight.tsx
│   │   ├── partner.tsx  contact.tsx
│   │   ├── privacy.tsx  terms.tsx  accessibility.tsx
│   │   └── not-found.tsx                        # catch-all → 404.html
│   ├── components/           # Header, Footer, Logo, PageHero, CtaBand, InitiativeCard, Stages, InsightMeta, StatusMessage
│   ├── data/                 # initiatives, insights, contact constants + validation
│   ├── assets/logo-mark.png  # hashed by Vite
│   └── styles/               # tokens + patterns (index.css), components.css, motion.css
└── public/                   # favicon.png, apple-touch-icon.png
```

Route `loader`s still exist and still run — at **build time**, during prerendering —
so the detail pages keep reading from `app/data/` exactly as before.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173/real-good-social/
```

Note the base path in the dev URL: the dev server mounts the site there too, so
development matches production.

### Build and preview

```bash
npm run build          # → build/client, ready to serve as-is
npm run preview        # serves build/client at the base path
```

### Type checking

```bash
npm run typecheck      # react-router typegen && tsc
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which typechecks, builds, and publishes `build/client` to GitHub Pages. The repository's
**Settings → Pages → Source** must be set to **GitHub Actions**.

The base path is the repository name: the workflow passes it to the build as `BASE_PATH`,
and `base-path.mjs` falls back to `/real-good-social` locally.

### Staging

The [staging repository](https://github.com/JulianOnGit/real-good-social-staging) runs the
same workflow, but its Pages site is currently switched off. To preview a branch there,
re-enable Pages (**Settings → Pages → Source: GitHub Actions**), add it as a remote and
push the branch to its `main`:

```sh
git remote add staging https://github.com/JulianOnGit/real-good-social-staging.git
git push staging <branch>:main --force
```

## The contact form

A static site has no backend, so the form does not post anywhere. It validates in the
browser and then hands the enquiry to the visitor's own email client as a pre-filled
`mailto:` message to `julian@realgoodnetwork.org`.

This means **delivery cannot be confirmed** — the page says the message was *opened for
sending*, never that it was received, and offers the plain email address as a fallback
for visitors with no mail client configured. Validation rules live in
`app/data/contact.ts` and are unchanged from the server version.

If enquiries need to arrive reliably, point the form at a form-handling service or
restore a server-side action.

## Pages

Home · About · What We Do · Initiatives (+ a page per initiative) · Partner With Us ·
Insights (+ a page per article) · Contact · Privacy · Terms · Accessibility.

## Design system

`app/styles/index.css` holds the tokens and the few patterns every page is built from.
Reach for these before adding page-specific styles:

| Decision | Rule |
|---|---|
| Fields | Paper by default; `section--alt` alternates; `section--accent` (sky) at most once a page; ink for the closing CTA and footer. |
| Content | `ruled-grid` (items hang from a hairline, 2–4 columns) and `ruled-list` (rows between hairlines, optionally `--numbered` or `--keyed`). |
| Layout | `split`: heading column left, content right. `container-narrow` for reading. |
| Boxes | `card` only for things you interact with (the contact form). |
| Labels | One small-caps style: `.label`, and `.eyebrow` for section markers. |
| Headings | h1 page, h2 section, h3 item. No per-heading `ch` caps; `text-wrap: balance` handles line length. |
| Stages | `<Stages>`: dot + word, three tones (forming / building / running). |
| Text colour | `--text-muted` is the lightest text colour; it passes AA on paper and paper-alt. |

## Accessibility

Prerendered content, skip link, keyboard focus styles, semantic landmarks, labelled
fields, text-plus-colour status indicators, and `prefers-reduced-motion` support. Aiming
at WCAG 2.2 AA.
