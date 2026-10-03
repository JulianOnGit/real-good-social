import type { Route } from './+types/not-found';
import StatusMessage from '../components/StatusMessage';

// Any unmatched URL renders this. The 404 *status* comes from the host serving
// the prerendered copy of this page as `404.html` — a static site has no
// server-side loader that could set it.

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Page not found — Real Good Social' },
    { name: 'robots', content: 'noindex' },
  ];
}

export default function NotFound() {
  return <StatusMessage notFound />;
}
