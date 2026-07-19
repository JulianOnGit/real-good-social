import type { Route } from './+types/accessibility';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Accessibility — Real Good Social' },
    {
      name: 'description',
      content: 'Real Good Social is committed to meeting WCAG 2.2 AA accessibility expectations.',
    },
  ];
}

export default function Accessibility() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility statement"
        lead="We want this site to be usable by as many people as possible, regardless of ability or technology."
      />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: July 2026</p>

          <h2>Our commitment</h2>
          <p>
            Real Good Social aims to meet the{' '}
            <a href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer">
              Web Content Accessibility Guidelines (WCAG) 2.2
            </a>{' '}
            at level AA. Accessibility is treated as part of the design, not an afterthought.
          </p>

          <h2>What we have done</h2>
          <ul className="ticked">
            <li>Strong colour contrast using the brand palette, checked against AA thresholds.</li>
            <li>A visible “skip to main content” link and clear keyboard focus indicators.</li>
            <li>Semantic headings, landmarks, and labelled form fields.</li>
            <li>Status and stage information conveyed with text, not colour alone.</li>
            <li>Reduced-motion support that respects your operating-system preference.</li>
            <li>Server-side rendering, so content is readable even before scripts load.</li>
            <li>Responsive layouts that work on small screens and at high zoom levels.</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            As an early-stage site, some areas are still being refined. If you encounter a barrier,
            we would genuinely like to hear about it so we can fix it.
          </p>

          <h2>Give us feedback</h2>
          <p>
            Email <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a> with the
            page, the problem, and the assistive technology you were using. We will respond and
            prioritise a fix.
          </p>
        </div>
      </section>
    </>
  );
}
