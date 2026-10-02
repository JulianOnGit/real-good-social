import { useState } from 'react';
import type { Route } from './+types/initiatives';
import PageHero from '../components/PageHero';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives, stageOrder, type Stage } from '../data/initiatives';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Initiatives — Real Good Social' },
    {
      name: 'description',
      content:
        'Explore the ventures, tools, research and social infrastructure currently being developed through Real Good Social.',
    },
  ];
}

type Filter = 'All' | Stage;

export default function Initiatives() {
  const [filter, setFilter] = useState<Filter>('All');

  const presentStages = stageOrder.filter((s) => initiatives.some((i) => i.stage === s));
  const filters: Filter[] = ['All', ...presentStages];
  const visible = filter === 'All' ? initiatives : initiatives.filter((i) => i.stage === filter);

  return (
    <>
      <PageHero
        eyebrow="Initiatives"
        title="What we are building"
        lead="Some initiatives begin as questions. Others are prototypes, programmes or emerging ventures. Explore what they are trying to change, where they are now and what comes next."
      />

      <section className="section section--surface">
        <div className="container">
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

          <p className="muted" style={{ marginTop: '2rem', maxWidth: '60ch' }}>
            Development stages show where each initiative currently sits: {stageOrder.join(' · ')}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
