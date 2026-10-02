import type { Route } from './+types/terms';
import PageHero from '../components/PageHero';
import { Blocks } from '../components/Blocks';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Terms — Real Good Social' },
    { name: 'description', content: 'Terms of use for the Real Good Social website.' },
  ];
}

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" />
      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="meta">Last updated: October 2026</p>
          <Blocks
            blocks={[
              'This website is operated by Real Good Ventures Pty Ltd and describes the work of Real Good Social.',
              'Many Real Good initiatives are under development and may change as they are researched, tested and refined.',
              'Insights may include working hypotheses, design questions, conceptual models and research notes. Unless otherwise stated, they should not be interpreted as established academic findings or professional advice.',
              'Content belongs to Real Good Ventures Pty Ltd unless otherwise stated. Published material may be shared or cited with appropriate attribution.',
            ]}
          />
        </div>
      </section>
    </>
  );
}
