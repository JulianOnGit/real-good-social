// Page metadata for search engines and link previews. Every route's `meta`
// goes through `pageMeta`, so each page gets the same set of tags.
import type { MetaDescriptor } from 'react-router';
import { SITE_URL } from '../../site.mjs';

export { SITE_URL };
export const SITE_NAME = 'Real Good Social';

/**
 * The page's link-preview card (Discord, LinkedIn, Slack, iMessage…), rendered
 * at build time by scripts/share-images.mjs from the page's own header: the
 * card for `/x/y` is `/share/x/y.png`, and the home page's is `/share/home.png`.
 */
export function shareImageUrl(pathname: string): string {
  const path = new URL(canonicalUrl(pathname)).pathname;
  return `${SITE_URL}/share${path === '/' ? '/home' : path}.png`;
}

/**
 * The one address each page should be indexed under: the domain plus the path,
 * without a trailing slash (`/about/` redirects to `/about`).
 */
export function canonicalUrl(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

interface PageMeta {
  title: string;
  description: string;
  /** `location.pathname` from the route's `meta` args. */
  pathname: string;
  type?: 'website' | 'article';
}

export function pageMeta({ title, description, pathname, type = 'website' }: PageMeta): MetaDescriptor[] {
  const url = canonicalUrl(pathname);
  return [
    { title },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'en_AU' },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: shareImageUrl(pathname) },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}
