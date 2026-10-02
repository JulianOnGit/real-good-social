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
        title="What we’re building"
        lead="Real Good develops initiatives where there is an opportunity to create useful new capability — by building something that is missing, connecting capabilities that already exist, or strengthening the infrastructure through which people and organisations can act."
      >
        <p className="lead">
          The initiatives below are at different stages of development. Some are already taking
          practical form; others are still being designed, tested and refined.
        </p>
      </PageHero>

      <section className="section section--surface">
        <div className="container">
          <div className="development-labels">
            <p className="label mt-0">{developmentLabels.join(' · ')}</p>
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
