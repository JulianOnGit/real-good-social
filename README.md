# Real Good Social — Website (static)

The public website for **Real Good Social**, an early-stage social enterprise based in
Australia. Built to the [design brief](./documentation/real-good-social-website-structure-and-design-brief.md)
and the Real Good brand (blue-gradient heart mark, navy wordmark).

- **Framework:** React Router 7 (framework mode), **prerendered to static HTML**.
- **Hosting:** S3 + CloudFront (AWS account `realgoodsocial-website`) — no server, no runtime, no environment variables.
- **Client:** React 18, hydrated. Per-route code splitting.
- **Design system:** brand colours, Inter throughout, WCAG 2.2 AA intent. See [Design system](#design-system).

Every page is rendered to HTML at build time, so content is visible before (or
without) client JS. Once JS loads, the client router takes over and navigation is
instant.

**Live:** <https://realgoodsocial.org>

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

1. **Flattens** the output, for subpath builds only. Vite's `base` prefixes asset URLs
   *and* the router's `basename` nests the prerendered HTML under a matching directory,
   so pages land one level deeper than the assets they reference; the nested copy is
   lifted back to the root. The live site is served from `/`, where nothing is nested.
2. Writes **`404.html`** from the prerendered catch-all route, so an unknown URL
   shows the site's own 404 page with a real 404 status.

## Project layout

```
website-2/
├── base-path.mjs             # single source of truth for the deploy path
├── site.mjs                  # the site's public address (canonical URLs, sitemap)
├── infra/
│   └── cloudfront-viewer-request.js  # redirects + index.html rewrite (deployed by hand)
├── react-router.config.ts    # ssr: false + the prerender URL list
├── vite.config.ts            # base + reactRouter() + tsconfig paths
├── scripts/
│   ├── finalise-static.mjs   # post-build: flatten, 404.html, sitemap.xml
│   └── share-images.mjs      # post-build: a link-preview card per page
├── .github/workflows/
│   └── deploy.yml            # build + publish to S3/CloudFront on push to main
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
│   ├── assets/logo-mark.png  # full-size source; @1x/@2x/@3x copies are hashed by Vite
│   └── styles/               # tokens + patterns (index.css), components.css, motion.css
└── public/                   # icons, logo.png, robots.txt
```

Route `loader`s still exist and still run — at **build time**, during prerendering —
so the detail pages keep reading from `app/data/` exactly as before.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173/
```

### Build and preview

```bash
npm run build          # → build/client, ready to serve as-is
npm run preview        # serves build/client locally
```

### Type checking

```bash
npm run typecheck      # react-router typegen && tsc
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which typechecks, builds, uploads `build/client` to S3 and invalidates CloudFront.

| Piece | Value |
|---|---|
| AWS account | `realgoodsocial-website` (426845667337), `non-profit` OU |
| Bucket | `realgoodsocial-website-426845667337` (ap-southeast-2, private, versioned) |
| CloudFront | `E8A6C6DIIQFS8` → `d36kx1rons9bii.cloudfront.net` |
| Deploy role | `github-deploy-realgoodsocial-website`, assumed via GitHub OIDC; trusts this repo's `main` only |
| DNS | Namecheap: `@` ALIAS and `www` CNAME → the CloudFront domain |

GitHub Actions holds no AWS keys. Hashed files in `assets/` are cached for a year; pages
and `.data` files are revalidated by browsers and cached at CloudFront until the
invalidation each deploy makes. Old asset files are left in place so open tabs keep
working; the bucket keeps previous object versions for 30 days, so a bad deploy can be
rolled back.

Files under `documents/` in the bucket are uploaded by hand, not built from this
repository: unlisted documents shared by direct link. The deploy leaves that prefix alone,
and CloudFront serves it with `X-Robots-Tag: noindex` so search engines don't list it. They
are not in the sitemap and nothing on the site links to them.

A CloudFront Function (`realgoodsocial-viewer-request`, source in
[`infra/cloudfront-viewer-request.js`](./infra/cloudfront-viewer-request.js)) redirects
`www` to the apex domain and `/about/` to `/about`, and maps `/about` to
`about/index.html`. Missing paths return `404.html` with a 404 status. CI does not deploy
the function; after editing it, update and publish it with the AWS CLI:

```sh
ETAG=$(aws cloudfront describe-function --name realgoodsocial-viewer-request --query ETag --output text)
ETAG=$(aws cloudfront update-function --name realgoodsocial-viewer-request --if-match "$ETAG" \
  --function-config '{"Comment":"www and trailing-slash redirects; index.html rewrite","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://infra/cloudfront-viewer-request.js --query ETag --output text)
aws cloudfront publish-function --name realgoodsocial-viewer-request --if-match "$ETAG"
```

## Search and link previews

- **Page metadata** — every route's `meta` goes through `pageMeta` in
  [`app/data/seo.ts`](./app/data/seo.ts): title, description, canonical URL (no trailing
  slash), and Open Graph tags for link previews.
- **Link-preview cards** — after each build,
  [`scripts/share-images.mjs`](./scripts/share-images.mjs) renders a 1200×630 card per page
  into `share/` (e.g. `share/insights/<slug>.png`, `share/home.png`) from the page's own
  eyebrow, heading and lead or byline, over the brand background and hero diagram. New
  pages get one automatically; to change the design, edit the script.
- **Structured data** — the home page describes the organisation and website (JSON-LD);
  each insight is an `Article`.
- **`sitemap.xml`** — generated after each build from the prerendered pages, so new
  initiatives and insights are listed automatically. `public/robots.txt` points to it.
- **Site address** — [`site.mjs`](./site.mjs) holds `https://realgoodsocial.org` for both.

### Staging

The [staging repository](https://github.com/JulianOnGit/real-good-social-staging) has no
AWS deployment: the deploy role only trusts this repository, so its workflow fails at the
AWS sign-in step.

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
