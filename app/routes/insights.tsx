import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/insights';
import PageHero from '../components/PageHero';
import { insights, formatDate, type InsightCategory } from '../data/insights';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Insights — Real Good Social' },
    {
      name: 'description',
      content:
        'A restrained publication area from Real Good Social: project notes, research summaries, design principles, and progress updates.',
    },
  ];
}

type Filter = 'All' | InsightCategory;
const CATEGORIES: InsightCategory[] = ['Ideas', 'Projects', 'Research', 'Updates'];

export default function Insights() {
  const [filter, setFilter] = useState<Filter>('All');
  const present = CATEGORIES.filter((c) => insights.some((i) => i.category === c));
  const filters: Filter[] = ['All', ...present];
  const visible = filter === 'All' ? insights : insights.filter((i) => i.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on building for social good"
        lead="A restrained publication area rather than a high-frequency blog. We prefer a small number of substantial pieces to frequent, low-value posts."
      />

      <section className="section section--surface">
        <div className="container container-narrow">
          <div className="filter-bar" role="group" aria-label="Filter insights by category">
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
                    <span className="tag">{i.category}</span> · {formatDate(i.date)} ·{' '}
                    {i.readingMinutes} min read
                  </p>
                  <h2>
                    <Link to={`/insights/${i.slug}`}>{i.title}</Link>
                  </h2>
                  <p className="muted">{i.summary}</p>
                  <Link to={`/insights/${i.slug}`} className="text-link">
                    Read the piece
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
