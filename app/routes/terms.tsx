import type { Route } from './+types/terms';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Terms — Real Good Social' },
    { name: 'description', content: 'Terms of use for the Real Good Social website.' },
  ];
}

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" lead="The terms on which we make this website available." />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: July 2026</p>

          <h2>About this site</h2>
          <p>
            This website is operated by Real Good Ventures Pty Ltd under the Real Good Social and
            Real Good™ brands. It describes the purpose, activities, programmes and initiatives of
            Real Good Social, and is provided for general information.
          </p>

          <h2>Development-stage information</h2>
          <p>
            Real Good Social is an early-stage organisation. Initiatives are labelled with a
            development stage — from Exploring to Operating — and descriptions reflect our intent and
            progress at the time of writing. Nothing on this site should be read as a promise that a
            programme, product, or service currently exists in a particular form.
          </p>

          <h2>Use of content</h2>
          <p>
            Content on this site is owned by Real Good Ventures Pty Ltd unless stated otherwise. You
            may read, share, and cite our published content with attribution. You may not
            reproduce it in a way that misrepresents Real Good Social or implies endorsement we have
            not given.
          </p>

          <h2>Enquiries and submissions</h2>
          <p>
            Information you send us through the contact form should be accurate and lawful. We may
            decline or not respond to enquiries at our discretion. Submitting an enquiry does not
            create a partnership, contract, or obligation between you and Real Good Ventures Pty
            Ltd.
          </p>

          <h2>No warranty</h2>
          <p>
            The site is provided “as is” without warranties of any kind. Real Good Ventures Pty Ltd
            makes reasonable efforts to keep information current but does not guarantee it is
            complete or error-free.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>.
          </p>
        </div>
      </section>
    </>
  );
}
