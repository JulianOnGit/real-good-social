import { Link, data } from 'react-router';
import type { Route } from './+types/insight';
import CtaBand from '../components/CtaBand';
import { getInsight, formatDate } from '../data/insights';

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
    { name: 'description', content: loaded.insight.summary },
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
          <p className="meta">
            {insight.category} · {formatDate(insight.date)} · {insight.readingMinutes} min read
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <article className="container container-narrow prose article-body">
          <p className="lead">{insight.summary}</p>
          {insight.content.map((block, idx) => (
            <div key={idx}>
              {block.heading && <h2>{block.heading}</h2>}
              {block.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}

          <hr className="divider" />
          <p className="meta">
            Written by Real Good Social. This piece reflects our thinking at its current stage of
            development and may be revised as the work matures.
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
