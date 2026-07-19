/**
 * The single source of truth for where the site is served from.
 *
 * Shared by the Vite config (asset URLs), the React Router config (route
 * basename) and the post-build script (output layout), which must all agree —
 * a mismatch between any two of them produces a site that loads no CSS.
 *
 * For a GitHub Pages project site this is `/<repository-name>`.
 */
export const BASE_PATH = '/real-good-social';
