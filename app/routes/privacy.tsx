import type { Route } from './+types/privacy';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Privacy — Real Good Social' },
    { name: 'description', content: 'How Real Good Social handles personal information.' },
  ];
}

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" lead="How we handle information you choose to share with Real Good Social." />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: July 2026</p>

          <h2>Who we are</h2>
          <p>
            Real Good Social is operated by Real Good Ventures Pty Ltd, an Australian company. Real
            Good Ventures Pty Ltd is responsible for personal information collected through this
            website. For privacy enquiries, contact{' '}
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>.
          </p>

          <h2>What we collect</h2>
          <p>
            When you use our contact form, we collect the name, email address, optional
            organisation, enquiry category and message you provide. We do not use advertising trackers or
            third-party analytics profiling on this site.
          </p>

          <h2>How we use it</h2>
          <ul className="ticked">
            <li>To respond to your enquiry.</li>
            <li>To follow up on a partnership, project or contribution you have raised.</li>
            <li>To maintain basic operational records of correspondence where appropriate.</li>
          </ul>

          <h2>Legal basis and retention</h2>
          <p>
            We process information you provide so that we can respond to you and manage legitimate
            operational correspondence. We retain enquiry records only for as long as they remain
            reasonably necessary for those purposes.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell your personal information. We share it only where necessary to respond to
            your enquiry or where required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us to access, correct or delete personal information we hold about you.
            Contact us and we will respond within a reasonable period. Australian privacy rights may
            apply under the Privacy Act 1988 and Australian Privacy Principles.
          </p>

          <h2>Changes</h2>
          <p>
            Real Good Ventures Pty Ltd may update this notice if the way we handle information
            changes. The current version will remain available on this page.
          </p>
        </div>
      </section>
    </>
  );
}
