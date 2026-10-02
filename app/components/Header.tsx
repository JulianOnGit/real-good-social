import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Logo from './Logo';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/initiatives', label: 'Initiatives' },
  { to: '/insights', label: 'Insights' },
  { to: '/partner', label: 'Partner With Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const handler = () => mq.matches && setOpen(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Close on navigation — covers the logo, browser back, and any future link.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Closes the menu even when already on the page being linked to,
            where the pathname effect above wouldn't fire. */}
        <Logo onNavigate={() => setOpen(false)} />

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`nav-toggle__bars ${open ? 'is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-nav"
          className={`site-nav ${open ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'is-active' : '')}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="site-nav__cta">
              <NavLink to="/partner" className="btn btn--sm" onClick={() => setOpen(false)}>
                Work with us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
