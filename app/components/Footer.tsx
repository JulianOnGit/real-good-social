import { Link } from 'react-router';
import Logo from './Logo';
import { BUSINESS_NAME, LEGAL_ENTITY } from '../data/legal';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo onInk />
          <p className="site-footer__tagline">Building practical systems for social good.</p>
          <p className="site-footer__org">Real Good Social is an early-stage social enterprise.</p>
        </div>

        <nav className="site-footer__col" aria-label="Site">
          <h2 className="label">Explore</h2>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/what-we-do">What We Do</Link></li>
            <li><Link to="/initiatives">Initiatives</Link></li>
            <li><Link to="/insights">Insights</Link></li>
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Engage">
          <h2 className="label">Engage</h2>
          <ul>
            <li><Link to="/partner">Work With Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <a href="mailto:julian@realgoodnetwork.org">
                julian@realgoodnetwork.org
              </a>
            </li>
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Organisation">
          <h2 className="label">Organisation</h2>
          <ul>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/accessibility">Accessibility</Link></li>
          </ul>
        </nav>
      </div>

      <div className="container site-footer__legal">
        <p>© {year} {LEGAL_ENTITY}.</p>
        <p>
          {BUSINESS_NAME} · Operated by {LEGAL_ENTITY}
        </p>
      </div>
    </footer>
  );
}
