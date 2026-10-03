/**
 * The site's public address, shared by the page metadata (canonical URLs, link
 * previews, structured data) and the post-build script (sitemap.xml).
 *
 * Kept apart from `base-path.mjs`, which reads `process.env` and so can only be
 * imported at build time; this file is also bundled into the browser code.
 */
export const SITE_URL = 'https://realgoodsocial.org';
