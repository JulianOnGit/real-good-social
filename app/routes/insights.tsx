import { useState } from 'react';
import type { Route } from './+types/insights';
import PageHero from '../components/PageHero';
import { InsightTeaser } from '../components/InsightMeta';
import { insights, hasTopic, INSIGHT_TOPICS, PUBLICATION } from '../data/insights';

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
        eyebrow={PUBLICATION}
        title="Ideas for building a better world"
        lead="Real Good Insights develops ideas arising from the practical and conceptual work behind the organisation."
      />

      <section className="section">
        <div className="container container-narrow">
          <div className="filter-bar" role="group" aria-label="Filter insights by topic">
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

          <ul className="ruled-list">
            {visible.map((i) => (
              <li key={i.slug}>
                <InsightTeaser insight={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container-narrow prose">
          <p className="eyebrow">About {PUBLICATION}</p>
          <p>
            Some of these essays are about agency and capability. Others are about communities,
            institutions and the organisations people build together: how they coordinate, what
            holds them up, and how they can keep doing good over time.
          </p>
          <p>
            We’re most interested in the places where the usual words stop working. What’s the
            difference between a programme that gives someone a service and one that leaves them
            more able to act for themselves? Can a community have capabilities that none of its
            members have alone? What changes when you stop looking at a problem by itself and start
            looking at everything around it? What can communities know that organisations can’t
            work out from the inside?
          </p>
          <p>
            Real Good Social is still working through these questions, and writing is one of the
            ways we do it. Some of the ideas here are early. We share them anyway, because thinking
            in the open is how our ideas get sharper, and how they eventually get tested against
            what actually happens.
          </p>
        </div>
      </section>
    </>
  );
}
