/**
 * The single source of truth for where the site is served from.
 *
 * Shared by the Vite config (asset URLs), the React Router config (route
 * basename) and the post-build script (output layout), which must all agree —
 * a mismatch between any two of them produces a site that loads no CSS.
 *
 * For a GitHub Pages project site this is `/<repository-name>`. The deploy
 * workflow sets `BASE_PATH` from the repository name, so the same code deploys
 * to both the live and staging repositories; locally it defaults to the live path.
 */
export const BASE_PATH = process.env.BASE_PATH || '/real-good-social';
