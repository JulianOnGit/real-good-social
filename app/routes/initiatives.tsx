import { useState } from 'react';
import type { Route } from './+types/initiatives';
import PageHero from '../components/PageHero';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives, developmentLabels, stageOrder, type Stage } from '../data/initiatives';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Initiatives — Real Good Social' },
    {
      name: 'description',
      content:
        'Explore the communities, services, research and social infrastructure being developed through Real Good Social.',
    },
  ];
}

type Filter = 'All' | Stage;

export default function Initiatives() {
  const [filter, setFilter] = useState<Filter>('All');

  const presentStages = stageOrder.filter((s) => initiatives.some((i) => i.stages.includes(s)));
  const filters: Filter[] = ['All', ...presentStages];
  const visible =
    filter === 'All' ? initiatives : initiatives.filter((i) => i.stages.includes(filter));

  return (
    <>
      <PageHero
        eyebrow="Initiatives"
        title="What we are building"
        lead="Real Good develops practical initiatives across community, social infrastructure, support, technology and organisational capability."
      >
        <p className="lead">
          Each initiative is designed to learn from real use and develop as evidence, participation
          and opportunity grow.
        </p>
      </PageHero>

      <section className="section section--surface">
        <div className="container">
          <div className="development-labels">
            <p className="label mt-0">{developmentLabels.join(' · ')}</p>
            <p className="muted">
              These labels describe where the work currently sits. They are intended to make
              development visible without treating early ideas as finished products.
            </p>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter initiatives by stage">
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

          <div className="grid grid-3" style={{ marginTop: '1.75rem' }}>
            {visible.map((i) => (
              <InitiativeCard key={i.slug} initiative={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
