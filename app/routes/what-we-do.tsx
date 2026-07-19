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
        'Real Good Social works across four areas: social ventures, technology for good, partnerships for good, and strategy and systems.',
    },
  ];
}

const AREAS = [
  {
    icon: 'venture' as const,
    title: 'Social Ventures',
    body: 'Real Good Social develops and supports ventures addressing social, cultural, environmental, and human needs — from early concept through to durable operating models.',
  },
  {
    icon: 'tech' as const,
    title: 'Technology for Good',
    body: 'We design digital tools and infrastructure that improve agency, access, coordination, knowledge, accountability, and participation for the people and organisations who use them.',
  },
  {
    icon: 'partnership' as const,
    title: 'Partnerships for Good',
    body: 'We work with community organisations, researchers, institutions, and practitioners to develop and implement practical responses — strengthening existing work rather than duplicating it.',
  },
  {
    icon: 'strategy' as const,
    title: 'Strategy and Systems',
    body: 'We examine how promising ideas can become sustainable operating models, organisational capabilities, services, and ventures — the connective work that turns intent into capacity.',
  },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Four areas of work, one purpose"
        lead="Our work is grouped into a small number of public-facing areas — broad enough to stay useful as the portfolio evolves, clear enough to be understood at a glance."
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
            A venture may begin as research, take shape as technology, depend on partnership to
            reach the people it serves, and only endure through sound strategy and systems. The
            areas are not silos — they are the sequence by which an idea becomes durable capability.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">In practice</p>
              <h2>See the areas at work</h2>
              <p className="lead">Our current initiatives show how these areas take concrete form.</p>
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
