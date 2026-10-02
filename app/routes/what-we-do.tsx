import type { Route } from './+types/what-we-do';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import CtaBand from '../components/CtaBand';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'What We Do — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social creates technology, ventures, communities and organisational systems that expand practical capacity for positive change.',
    },
  ];
}

const AREAS: {
  icon: 'venture' | 'tech' | 'partnership' | 'strategy' | 'research';
  label: string;
  title: string;
  body: string[];
}[] = [
  {
    icon: 'venture',
    label: 'Social ventures',
    title: 'Creating new ways to deliver social good',
    body: [
      'We develop ventures around opportunities where a dedicated service, organisation or operating model can create lasting value.',
    ],
  },
  {
    icon: 'tech',
    label: 'Technology',
    title: 'Technology for practical capability',
    body: [
      'We build tools that make useful knowledge, services and opportunities easier to reach and act on.',
    ],
  },
  {
    icon: 'partnership',
    label: 'Communities',
    title: 'Creating places to connect and participate',
    body: [
      'We build communities where people can meet, contribute, learn, find support and pursue things that matter to them.',
    ],
  },
  {
    icon: 'strategy',
    label: 'Strategy & systems',
    title: 'Making complex work more coherent',
    body: [
      'We help organisations see how people, processes and technology fit together, then redesign the parts that are getting in the way.',
    ],
  },
  {
    icon: 'research',
    label: 'Research & frameworks',
    title: 'Developing the thinking behind the work',
    body: [
      'We develop practical frameworks around agency, capability, community, social infrastructure, flourishing, power and organisational systems.',
      'They help us ask better questions, design better interventions and identify what needs to be tested.',
    ],
  },
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="We expand the capacity to do good."
        lead="Our work spans technology, ventures, communities and organisational systems."
      />

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid-2">
            {AREAS.map((a, i) => (
              <article
                key={a.label}
                className="card area-card"
                id={a.label.toLowerCase().replace(/[^a-z]+/g, '-')}
              >
                <div className="area-card__head">
                  <div className="card__icon">
                    <Icon name={a.icon} />
                  </div>
                  <span className="area-card__num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="eyebrow">{a.label}</p>
                <h3>{a.title}</h3>
                {a.body.map((para) => (
                  <p key={para} className="muted">
                    {para}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
