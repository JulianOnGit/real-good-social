import type { Route } from './+types/what-we-do';
import PageHero from '../components/PageHero';
import Icon from '../components/Icon';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import type { Block } from '../data/content';

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
  body: Block[];
}[] = [
  {
    icon: 'venture',
    label: 'Social ventures',
    title: 'Building new capacity through enterprise',
    body: [
      'We create and develop ventures around social opportunities where a dedicated operating model, service or organisation can create lasting value.',
      'This includes testing customer needs, designing services, establishing delivery capability, developing partnerships and finding sustainable ways for useful work to continue.',
    ],
  },
  {
    icon: 'tech',
    label: 'Technology',
    title: 'Technology as practical capability',
    body: [
      'We build digital tools and infrastructure where technology can make knowledge, coordination, services or opportunities easier to access and use.',
      'Our interest is not technology for its own sake.',
      'It is what technology enables people and organisations to understand, reach, create and do.',
    ],
  },
  {
    icon: 'partnership',
    label: 'Communities',
    title: 'Creating environments for connection, participation and contribution',
    body: [
      'Communities can create relationships, knowledge, support, opportunities and forms of cooperation that formal services alone cannot provide.',
      'Real Good develops community environments in which people can participate in different ways: meeting others, joining activities, learning, contributing capabilities, receiving support, initiating projects and taking part in practical social good.',
    ],
  },
  {
    icon: 'strategy',
    label: 'Strategy, organisations & systems',
    title: 'Designing capability around the whole situation',
    body: [
      'Some opportunities require changes to how people, processes, technology, information and institutions fit together.',
      'We use systems thinking, enterprise architecture, programme design and organisational development to understand those relationships and build more effective ways of working.',
    ],
  },
  {
    icon: 'research',
    label: 'Research & frameworks',
    title: 'Developing better ways to understand what we are building',
    body: [
      'Real Good develops conceptual and practical frameworks around areas including:',
      {
        list: [
          'agency and capability;',
          'community and social infrastructure;',
          'collective capability;',
          'human flourishing;',
          'institutional capability;',
          'social knowledge;',
          'power and anti-domination;',
          'systems of positive social action.',
        ],
      },
      'These frameworks are used to generate questions, structure design work and identify things worth testing in practice.',
      'They are working models rather than claims of final knowledge.',
    ],
  },
];

const CONNECTIONS = [
  'A community can reveal an opportunity.',
  'An opportunity can become a programme or venture.',
  'A programme can generate knowledge.',
  'Knowledge can improve another service.',
  'A partnership can introduce a capability that was previously unavailable.',
  'Technology can make that capability easier to access.',
];

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="We expand the capacity to do good."
        lead="Our work builds and strengthens the practical capabilities through which people, communities and organisations can create positive change."
      />

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid-2">
            {AREAS.map((a, i) => (
              <article
                key={a.label}
                className="card area-card prose"
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
                <div className="muted">
                  <Blocks blocks={a.body} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container container-narrow center">
          <p className="eyebrow">Across the portfolio</p>
          <h2>Different capabilities can reinforce one another.</h2>
          {CONNECTIONS.map((c) => (
            <p key={c} className="lead mx-auto">
              {c}
            </p>
          ))}
          <p className="lead mx-auto">Real Good is designed to work across those connections.</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
