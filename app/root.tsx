import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';
import type { Route } from './+types/root';

import './styles/index.css';
import './styles/components.css';
import './styles/motion.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollMotion from './components/ScrollMotion';
import StatusMessage from './components/StatusMessage';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: `${import.meta.env.BASE_URL}favicon.png`, type: 'image/png' },
  { rel: 'apple-touch-icon', href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

export const meta: Route.MetaFunction = () => [
  { title: 'Real Good Social — Building practical systems for social good' },
  {
    name: 'description',
    content:
      'Real Good Social creates technology, ventures, communities and organisational systems that expand our collective capacity to create positive change.',
  },
];

/** The HTML document shell. Wraps every route — and the error boundary. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#14213D" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollMotion />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <StatusMessage notFound={isNotFound} />
      </main>
      <Footer />
    </>
  );
}
