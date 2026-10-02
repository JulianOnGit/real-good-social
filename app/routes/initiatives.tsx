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
        'A small, honest portfolio of Real Good Social initiatives, each with a visible development stage from Exploring to Operating.',
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
        title="What we are currently developing"
        lead="We present only the projects that are developed enough to communicate publicly. Each carries a visible stage so you can see how mature it really is."
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
            An initial public portfolio of three to five initiatives is sufficient at this stage.
            The broader Real Good™ family of ventures remains deliberately simplified until its relationships
            can be explained clearly.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
