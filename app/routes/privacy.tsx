import type { Route } from './+types/privacy';
import PageHero from '../components/PageHero';
import { Blocks } from '../components/Blocks';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Privacy — Real Good Social' },
    { name: 'description', content: 'How Real Good Social handles personal information.' },
  ];
}

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" />
      <section className="section">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: October 2026</p>
          <Blocks
            blocks={[
              'Real Good Social is operated by Real Good Ventures Pty Ltd.',
              'When you contact us, we may collect the information you provide, including your name, email address, organisation and message.',
              'We use this information to respond to enquiries, manage collaborations and maintain appropriate operational records.',
              'We do not sell personal information.',
              'For access, correction or privacy enquiries, contact:',
              'julian@realgoodnetwork.org',
            ]}
          />
        </div>
      </section>
    </>
  );
}
