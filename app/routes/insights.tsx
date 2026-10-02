import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/insights';
import PageHero from '../components/PageHero';
import { insights, insightSummary, hasTopic, INSIGHT_TOPICS } from '../data/insights';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Insights — Real Good Social' },
    {
      name: 'description',
      content:
        'Ideas, research and design questions emerging from Real Good’s work on agency, capability, communities, social infrastructure and positive social action.',
    },
  ];
}

export default function Insights() {
  const [filter, setFilter] = useState('All');
  const present = INSIGHT_TOPICS.filter((t) => insights.some((i) => hasTopic(i, t)));
  const filters = ['All', ...present];
  const visible = filter === 'All' ? insights : insights.filter((i) => hasTopic(i, filter));

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Questions emerging from the work"
        lead="Real Good Insights explores observations, design questions and working ideas arising from the systems, communities and programmes we are building."
      >
        <p className="lead">The aim is not to present unfinished thinking as settled fact.</p>
        <p className="lead">
          It is to make useful questions and developing models available for discussion, testing
          and improvement.
        </p>
      </PageHero>

      <section className="section section--surface">
        <div className="container container-narrow">
          <div className="filter-bar" role="group" aria-label="Filter insights by topic">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-chip ${filter === f ? 'is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <ul className="insight-list">
            {visible.map((i) => (
              <li key={i.slug}>
                <article className="insight-row">
                  <p className="meta">
                    <span className="tag">{i.category}</span>
                  </p>
                  <h2>
                    <Link to={`/insights/${i.slug}`}>{i.title}</Link>
                  </h2>
                  <p className="muted">{insightSummary(i)}</p>
                  <Link to={`/insights/${i.slug}`} className="text-link">
                    Read the insight
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
