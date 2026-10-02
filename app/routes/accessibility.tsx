import type { Route } from './+types/accessibility';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Accessibility — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social aims to make its website accessible and usable across abilities, devices and technologies.',
    },
  ];
}

export default function Accessibility() {
  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement"
        lead="We want Real Good Social to be usable by as many people as possible."
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
            at level AA. Accessibility is treated as part of how we design and build.
          </p>

          <h2>What we have done</h2>
          <ul className="ticked">
            <li>Strong colour contrast checked against AA thresholds.</li>
            <li>A visible “skip to main content” link and clear keyboard focus indicators.</li>
            <li>Semantic headings, landmarks and labelled form fields.</li>
            <li>Status and stage information conveyed with text rather than colour alone.</li>
            <li>Reduced-motion support that respects operating-system preferences.</li>
            <li>Server-side rendering so core content is available before scripts load.</li>
            <li>Responsive layouts designed to work on small screens and at high zoom levels.</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Some parts of the site will continue to evolve as Real Good Social develops. If something
            prevents you from using the site effectively, we would like to know.
          </p>

          <h2>Give us feedback</h2>
          <p>
            Email <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a> with the
            page, the issue and any relevant assistive technology information. We will review the
            problem and prioritise an appropriate fix.
          </p>
        </div>
      </section>
    </>
  );
}
