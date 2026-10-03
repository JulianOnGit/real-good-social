/**
 * The single source of truth for where the site is served from.
 *
 * Shared by the Vite config (asset URLs), the React Router config (route
 * basename) and the post-build script (output layout), which must all agree —
 * a mismatch between any two of them produces a site that loads no CSS.
 *
 * The live site is served from the root of https://realgoodsocial.org, so this
 * is empty. Set `BASE_PATH=/some-path` to build for a subpath instead (e.g. a
 * GitHub Pages project site at `/<repository-name>`).
 */
export const BASE_PATH = process.env.BASE_PATH ?? '';
