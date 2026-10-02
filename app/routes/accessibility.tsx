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
      <section className="section">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: October 2026</p>
          <p>
            The website aims to meet{' '}
            <a href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer">
              WCAG 2.2
            </a>{' '}
            Level AA and includes semantic structure, keyboard navigation, visible focus states,
            accessible forms, strong colour contrast, reduced-motion support and responsive
            layouts.
          </p>
          <p>If you encounter an accessibility problem, contact:</p>
          <p>
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>
          </p>
        </div>
      </section>
    </>
  );
}
