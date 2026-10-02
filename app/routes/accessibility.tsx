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

const MEASURES = [
  'semantic headings and page structure;',
  'keyboard-accessible navigation;',
  'visible focus indicators;',
  'strong colour contrast;',
  'labelled forms;',
  'information not conveyed through colour alone;',
  'support for reduced-motion preferences;',
  'responsive layouts;',
  'compatibility with high zoom levels.',
];

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
          <p className="meta">Last updated: October 2026</p>

          <h2>Our approach</h2>
          <p>
            Real Good aims to build accessibility into the design and development of its digital
            services.
          </p>
          <p>
            The website aims to conform with{' '}
            <a href="https://www.w3.org/TR/WCAG22/" rel="noopener noreferrer">
              WCAG 2.2
            </a>{' '}
            Level AA where practical.
          </p>

          <h2>Current measures</h2>
          <ul>
            {MEASURES.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <h2>Feedback</h2>
          <p>If something prevents you from using the site effectively, contact:</p>
          <p>
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>
          </p>
          <p>
            Please include the page, the problem you encountered and any relevant assistive
            technology information.
          </p>
        </div>
      </section>
    </>
  );
}
