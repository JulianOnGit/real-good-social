import type { Route } from './+types/privacy';
import PageHero from '../components/PageHero';
import { Sections } from '../components/Blocks';
import type { Section } from '../data/content';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Privacy — Real Good Social' },
    { name: 'description', content: 'How Real Good Social handles personal information.' },
  ];
}

const SECTIONS: Section[] = [
  {
    heading: 'Who we are',
    blocks: [
      'Real Good Social is operated by Real Good Ventures Pty Ltd.',
      'For privacy enquiries, contact julian@realgoodnetwork.org.',
    ],
  },
  {
    heading: 'Information we collect',
    blocks: [
      'When you contact us, we may collect information including:',
      {
        list: [
          'your name;',
          'email address;',
          'organisation;',
          'enquiry category;',
          'information included in your message.',
        ],
      },
      'We may also retain ordinary operational records of correspondence and collaboration.',
    ],
  },
  {
    heading: 'How we use information',
    blocks: [
      'We use information you provide to:',
      {
        list: [
          'respond to enquiries;',
          'discuss partnerships or projects;',
          'manage collaborations;',
          'maintain appropriate operational records;',
          'improve our services and activities where appropriate.',
        ],
      },
    ],
  },
  {
    heading: 'Sharing',
    blocks: [
      'We do not sell personal information.',
      'Information may be shared with people or organisations where reasonably necessary to respond to an enquiry, deliver agreed work or comply with legal obligations.',
    ],
  },
  {
    heading: 'Access and correction',
    blocks: [
      'You may contact us to request access to or correction of personal information we hold about you.',
      'Applicable rights may arise under Australian privacy law.',
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        lead="How Real Good Social handles information you choose to share with us."
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
