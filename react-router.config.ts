import type { Config } from '@react-router/dev/config';
import { initiatives } from './app/data/initiatives';
import { insights } from './app/data/insights';
import { services, servicePath } from './app/data/services';
import { BASE_PATH } from './base-path.mjs';

export default {
  // No server at runtime: every route is rendered to HTML at build time and
  // hydrates into a client-side app.
  ssr: false,
  // Trailing slash required: React Router insists the basename start with the
  // Vite `base`, which is itself slash-terminated.
  basename: `${BASE_PATH}/`,
  prerender() {
    return [
      '/',
      '/about',
      '/what-we-do',
      '/initiatives',
      ...initiatives.map((i) => `/initiatives/${i.slug}`),
      '/services',
      ...services.map((s) => servicePath(s.slug)),
      '/partner',
      '/insights',
      ...insights.map((i) => `/insights/${i.slug}`),
      '/contact',
      '/privacy',
      '/terms',
      '/accessibility',
      // Matches the catch-all route; the build copies it to `404.html`.
      '/404',
    ];
  },
} satisfies Config;
