/**
 * Turns the React Router build output into a directory that can be uploaded
 * verbatim to the S3 bucket behind https://realgoodsocial.org.
 *
 *  1. Flatten (subpath builds only). Vite's `base` already prefixes every
 *     asset URL with the base path, and the router's `basename` independently
 *     nests the prerendered HTML under a matching directory — so pages end up
 *     one level deeper than the assets they reference. A host serving the
 *     output at the base path needs the nested copy lifted back to the root.
 *     At the domain root nothing is nested, so there is nothing to lift.
 *  2. `404.html` — CloudFront serves this for any unmatched path. We give it
 *     the prerendered catch-all route, so a bad URL shows the site's own 404
 *     page with a real 404 status.
 *  3. Strip NUL bytes from the HTML. React 18's streaming renderer can emit one
 *     when a multi-byte character (e.g. "→") straddles its internal 2 KB write
 *     buffer; browsers show it as "�". NUL is never valid in HTML text.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { BASE_PATH } from '../base-path.mjs';

const CLIENT_DIR = path.resolve('build/client');
const NESTED_DIR = path.join(CLIENT_DIR, BASE_PATH.replace(/^\//, ''));

// Without this check a root build would treat CLIENT_DIR as the nested
// directory and delete the whole build.
if (NESTED_DIR !== CLIENT_DIR) {
  for (const entry of await fs.readdir(NESTED_DIR)) {
    await fs.rename(path.join(NESTED_DIR, entry), path.join(CLIENT_DIR, entry));
  }
  await fs.rm(NESTED_DIR, { recursive: true });
}

await fs.rename(path.join(CLIENT_DIR, '404', 'index.html'), path.join(CLIENT_DIR, '404.html'));
await fs.rm(path.join(CLIENT_DIR, '404'), { recursive: true });

// The SPA fallback duplicates 404.html's job and is never requested by name.
await fs.rm(path.join(CLIENT_DIR, '__spa-fallback.html'), { force: true });

let strippedPages = 0;
for (const file of await fs.readdir(CLIENT_DIR, { recursive: true })) {
  if (!file.endsWith('.html')) continue;
  const filePath = path.join(CLIENT_DIR, file);
  const html = await fs.readFile(filePath, 'utf8');
  if (html.includes('\0')) {
    await fs.writeFile(filePath, html.replaceAll('\0', ''));
    strippedPages += 1;
  }
}

console.log(
  `[finalise-static] wrote 404.html, stripped NUL bytes from ${strippedPages} page(s)`,
);
