import type { Route } from './+types/privacy';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Privacy — Real Good Social' },
    { name: 'description', content: 'How Real Good Social collects, uses, and protects personal information.' },
  ];
}

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" lead="How we handle the information you share with Real Good Social." />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: July 2026</p>

          <h2>Who we are</h2>
          <p>
            Real Good Social is a social enterprise operated by Real Good Ventures Pty Ltd, an
            Australian company. Real Good Ventures Pty Ltd is responsible for the personal
            information collected through this website. For any privacy question, contact{' '}
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>.
          </p>

          <h2>What we collect</h2>
          <p>
            When you use our contact form we collect the name, email address, optional organisation,
            enquiry category, and message you provide. We do not use advertising trackers or
            third-party analytics profiling on this site.
          </p>

          <h2>How we use it</h2>
          <ul className="ticked">
            <li>To respond to your enquiry.</li>
            <li>To follow up about a partnership, project, or contribution you have raised.</li>
            <li>To keep a basic record of correspondence for legitimate operational purposes.</li>
          </ul>

          <h2>Legal basis and retention</h2>
          <p>
            We process your information on the basis of your consent and our legitimate interest in
            responding to you. We keep enquiry records only for as long as needed for the purpose
            above, and then delete them.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell your personal information. We share it only where necessary to respond to
            you, or where required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us to access, correct, or delete the information we hold about you. Email us
            and we will respond within a reasonable period. Australian users are protected under the
            Privacy Act 1988 and the Australian Privacy Principles.
          </p>

          <h2>Changes</h2>
          <p>
            Real Good Ventures Pty Ltd may update this notice to reflect any change in how we handle
            information. The current version is always published on this page.
          </p>
        </div>
      </section>
    </>
  );
}
