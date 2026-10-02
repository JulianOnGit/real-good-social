import type { Route } from './+types/terms';
import PageHero from '../components/PageHero';
import { Sections } from '../components/Blocks';
import type { Section } from '../data/content';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Terms — Real Good Social' },
    { name: 'description', content: 'Terms of use for the Real Good Social website.' },
  ];
}

const SECTIONS: Section[] = [
  {
    heading: 'About this site',
    blocks: [
      'This website represents Real Good Social and is operated by Real Good Ventures Pty Ltd.',
      'It describes Real Good’s current work, developing initiatives, ideas and intended directions.',
    ],
  },
  {
    heading: 'Developing work',
    blocks: [
      'Many Real Good initiatives are under active development.',
      'Development labels and descriptions are provided to indicate the current state of the work.',
      'Early-stage initiatives may change substantially as they are researched, tested and developed.',
    ],
  },
  {
    heading: 'Insights and research',
    blocks: [
      'Real Good Insights may include:',
      {
        list: [
          'project observations;',
          'working hypotheses;',
          'conceptual models;',
          'design questions;',
          'research notes;',
          'developing frameworks.',
        ],
      },
      'Unless clearly stated otherwise, these should not be interpreted as established academic findings or professional advice.',
    ],
  },
  {
    heading: 'Content',
    blocks: [
      'Content on this website is owned by Real Good Ventures Pty Ltd unless otherwise stated.',
      'You may share and cite published material with appropriate attribution.',
      'You may not reproduce material in a way that falsely implies endorsement or affiliation.',
    ],
  },
  {
    heading: 'No warranty',
    blocks: [
      'The website is provided for general information.',
      'We take reasonable care in preparing content but do not guarantee that all information is complete, current or suitable for a particular purpose.',
    ],
  },
];

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        lead="The terms applying to use of the Real Good Social website."
      />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: October 2026</p>
          <Sections sections={SECTIONS} />
        </div>
      </section>
    </>
  );
}
