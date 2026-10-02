import { Link } from 'react-router';
import type { Route } from './+types/what-we-do';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import CtaBand from '../components/CtaBand';
import { initiatives } from '../data/initiatives';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'What We Do — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social works across social ventures, technology, partnerships and systems to build practical capability for social good.',
    },
  ];
}

const AREAS = [
  {
    icon: 'venture' as const,
    title: 'Social Ventures',
    body: 'We create and support ventures that respond to social, cultural, environmental and human needs, from first concept through to sustainable operation.',
  },
  {
    icon: 'tech' as const,
    title: 'Technology for Good',
    body: 'We design digital tools and infrastructure that improve agency, access, coordination, knowledge, accountability and participation.',
  },
  {
    icon: 'partnership' as const,
    title: 'Partnerships for Good',
    body: 'We bring community organisations, researchers, institutions, practitioners and builders together around problems where collaboration can create more than isolated effort.',
  },
  {
    icon: 'strategy' as const,
    title: 'Strategy and Systems',
    body: 'We design the operating models, structures and capabilities that allow promising ideas to become useful, sustainable and repeatable.',
  },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="From worthwhile ideas to working systems"
        lead="We work wherever a useful idea needs more than goodwill to become real — whether that means building a venture, a technology, a partnership or the system around it."
      />

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid-2">
            {AREAS.map((a, i) => (
              <article
                key={a.title}
                className="card area-card"
                id={a.title.toLowerCase().replace(/\s+/g, '-')}
              >
                <div className="area-card__head">
                  <div className="card__icon">
                    <Icon name={a.icon} />
                  </div>
                  <span className="area-card__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="muted">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container container-narrow center">
          <p className="eyebrow">How the areas connect</p>
          <p className="statement">
            A useful idea may begin with research, become a venture, require technology, depend on
            partnership and eventually need its own organisation or operating model. We work across
            those boundaries because real problems rarely respect them.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">In practice</p>
              <h2>See what we are building</h2>
              <p className="lead">
                Our initiatives show how these capabilities come together around real problems and
                opportunities.
              </p>
            </div>
            <Link to="/initiatives" className="btn btn--secondary">
              View all initiatives
            </Link>
          </div>
          <ul className="link-list">
            {initiatives.map((i) => (
              <li key={i.slug}>
                <Link to={`/initiatives/${i.slug}`} className="link-list__item">
                  <span>
                    <strong>{i.name}</strong>
                    <span className="muted"> — {i.area}</span>
                  </span>
                  <span className="text-link" aria-hidden="true">
                    View
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
