import { Link } from 'react-router';
import type { Route } from './+types/not-found';

// Any unmatched URL renders this. The 404 *status* comes from the host serving
// the prerendered copy of this page as `404.html` — a static site has no
// server-side loader that could set it.

export function meta(_: Route.MetaArgs) {
  return [{ title: 'Page not found — Real Good Social' }];
}

export default function NotFound() {
  return (
    <section className="section section--surface">
      <div className="container container-narrow center" style={{ paddingBlock: '3rem' }}>
        <p className="eyebrow">404</p>
        <h1>We couldn’t find that page.</h1>
        <p className="lead mx-auto">
          It may have moved, changed or no longer exist.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/" className="btn">
            Return home
          </Link>
          <Link to="/initiatives" className="btn btn--secondary">
            Explore our initiatives
          </Link>
        </div>
      </div>
    </section>
  );
}
