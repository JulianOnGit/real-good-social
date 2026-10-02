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
        title="Ideas for building a better world"
        lead="Real Good Insights develops ideas arising from the practical and conceptual work behind the organisation. Some concern questions of agency and capability; others concern communities, institutions, coordination, social infrastructure and the design of organisations capable of producing sustained social value."
      >
        <p>
          I am interested particularly in places where familiar categories become insufficiently
          precise. What does it mean for a programme to increase agency rather than merely provide
          a service? What capabilities can exist at the level of a community rather than an
          individual? How does the representation of a problem change when we model the wider
          situation around it? What kinds of knowledge can communities produce that organisations
          struggle to generate internally?
        </p>
        <p>
          These articles are intended to develop those questions rather than prematurely resolve
          them. Where an idea is provisional, I treat it as such. Where a concept is useful only
          under certain conditions, those conditions matter. The aim is to make the reasoning
          behind Real Good more explicit and, over time, to subject more of it to practical and
          empirical scrutiny.
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
