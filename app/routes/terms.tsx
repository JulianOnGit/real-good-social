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
      <PageHero eyebrow="Legal" title="Terms of use" lead="The terms that apply when you use this website." />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: July 2026</p>

          <h2>About this site</h2>
          <p>
            This website represents Real Good Social and is operated by Real Good Ventures Pty Ltd.
            It describes the purpose, activities, programmes and initiatives of Real Good Social and
            is provided for general information.
          </p>

          <h2>Development-stage information</h2>
          <p>
            Real Good Social develops initiatives at different stages of maturity. We use
            development-stage labels — from Exploring to Operating — to distinguish early ideas,
            research, designs, prototypes, pilots and operating capabilities.
          </p>
          <p>
            Descriptions reflect our work and intentions at the time of publication and should not
            be taken as a guarantee that a programme, product or service exists in a particular
            form.
          </p>

          <h2>Use of content</h2>
          <p>
            Content on this site is owned by Real Good Ventures Pty Ltd unless stated otherwise. You
            may read, share and cite published content with attribution. You may not reproduce it
            in a way that misrepresents Real Good Social or implies endorsement that has not been
            given.
          </p>

          <h2>Enquiries and submissions</h2>
          <p>
            Information sent through the contact form should be accurate and lawful. Submitting an
            enquiry does not create a partnership, contract or obligation between you and Real Good
            Ventures Pty Ltd.
          </p>

          <h2>No warranty</h2>
          <p>
            The site is provided “as is”. Real Good Ventures Pty Ltd takes reasonable steps to keep
            information useful and current but does not guarantee that all information is complete
            or error-free.
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
