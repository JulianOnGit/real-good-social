/**
 * Turns the React Router build output into a directory GitHub Pages can serve
 * verbatim at https://julianongit.github.io/real-good-social/.
 *
 *  1. Flatten. Vite's `base` already prefixes every asset URL with the base
 *     path, and the router's `basename` independently nests the prerendered
 *     HTML under a matching directory — so pages end up one level deeper than
 *     the assets they reference. Pages serves the repo at the base path
 *     already, so the nested copy is lifted back to the root.
 *  2. `404.html` — Pages serves this for any unmatched path. We give it the
 *     prerendered catch-all route, so a bad URL shows the site's own 404 page
 *     with a real 404 status.
 *  3. `.nojekyll` — without it Pages runs the output through Jekyll, which
 *     drops every file and directory whose name starts with an underscore.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { BASE_PATH } from '../base-path.mjs';

const CLIENT_DIR = path.resolve('build/client');
const NESTED_DIR = path.join(CLIENT_DIR, BASE_PATH.replace(/^\//, ''));

for (const entry of await fs.readdir(NESTED_DIR)) {
  await fs.rename(path.join(NESTED_DIR, entry), path.join(CLIENT_DIR, entry));
}
await fs.rm(NESTED_DIR, { recursive: true });

await fs.rename(path.join(CLIENT_DIR, '404', 'index.html'), path.join(CLIENT_DIR, '404.html'));
await fs.rm(path.join(CLIENT_DIR, '404'), { recursive: true });

// The SPA fallback duplicates 404.html's job and is never requested by name.
await fs.rm(path.join(CLIENT_DIR, '__spa-fallback.html'), { force: true });

await fs.writeFile(path.join(CLIENT_DIR, '.nojekyll'), '');

console.log('[finalise-static] flattened output, wrote 404.html and .nojekyll');
