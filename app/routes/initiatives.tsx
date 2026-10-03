import { useState } from 'react';
import type { Route } from './+types/initiatives';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives, stageOrder, type Stage } from '../data/initiatives';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Initiatives — Real Good Social',
    description:
      'Explore the communities, services, research and social infrastructure being developed through Real Good Social.',
    pathname: location.pathname,
  });
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
      />

      <section className="section">
        <div className="container">
          <p className="muted">
            Initiatives are at different stages of development. Some are already taking practical
            form; others are still being designed, tested and refined.
          </p>
          <div className="filter-bar" role="group" aria-label="Filter initiatives by stage">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className="filter-chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <ul className="ruled-grid ruled-grid--3">
            {visible.map((i) => (
              <li key={i.slug}>
                <InitiativeCard initiative={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
