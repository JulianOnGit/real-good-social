import { Link, data } from 'react-router';
import type { Route } from './+types/insight';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import { getInsight, insightSummary } from '../data/insights';

export async function loader({ params }: Route.LoaderArgs) {
  const insight = getInsight(params.slug);
  if (!insight) {
    throw data('Insight not found', { status: 404 });
  }
  return { insight };
}

export function meta({ data: loaded }: Route.MetaArgs) {
  if (!loaded?.insight) return [{ title: 'Insight — Real Good Social' }];
  return [
    { title: `${loaded.insight.title} — Real Good Social` },
    { name: 'description', content: insightSummary(loaded.insight) },
  ];
}

export default function InsightDetail({ loaderData }: Route.ComponentProps) {
  const { insight } = loaderData;

  return (
    <>
      <section className="page-hero">
        <div className="container container-narrow">
          <p className="breadcrumb">
            <Link to="/insights">Insights</Link>
            <span aria-hidden="true"> / </span>
            {insight.category}
          </p>
          <h1>{insight.title}</h1>
        </div>
      </section>

      <section className="section section--surface">
        <article className="container container-narrow prose article-body">
          <Blocks blocks={insight.body} />

          <hr className="divider" />
          <p className="meta">
            Real Good Insights explores questions, observations and working models that emerge from
            our projects and research. We use these ideas to sharpen how we understand problems,
            design interventions and learn from practice. Where the evidence is still developing,
            we present the thinking as provisional and open to refinement.
          </p>
          <p className="section-foot">
            <Link to="/insights" className="text-link">
              Back to all insights
            </Link>
          </p>
        </article>
      </section>

      <CtaBand />
    </>
  );
}
