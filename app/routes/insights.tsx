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
        'Ideas, research, project notes and lessons from building ventures, systems and social infrastructure for public good.',
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
        title="Ideas from the work"
        lead="Notes, research and working ideas about how people build useful things together — and how better systems can expand what becomes possible."
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
