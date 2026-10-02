import type { Route } from './+types/what-we-do';
import PageHero from '../components/PageHero';
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

interface Area {
  label: string;
  title: string;
  body: string[];
}

/** The four practical areas of work. */
const AREAS: Area[] = [
  {
    label: 'Social ventures',
    title: 'Creating new ways to deliver social good',
    body: [
      'We develop ventures around opportunities where a dedicated service, organisation or operating model can create lasting value.',
    ],
  },
  {
    label: 'Technology',
    title: 'Technology for practical capability',
    body: [
      'We build tools that make useful knowledge, services and opportunities easier to reach and act on.',
    ],
  },
  {
    label: 'Communities',
    title: 'Creating places to connect and participate',
    body: [
      'We build communities where people can meet, contribute, learn, find support and pursue things that matter to them.',
    ],
  },
  {
    label: 'Strategy & systems',
    title: 'Making complex work more coherent',
    body: [
      'We help organisations see how people, processes and technology fit together, then redesign the parts that are getting in the way.',
    ],
  },
];

/** The thinking that underpins the four areas, set apart beneath them. */
const FOUNDATION: Area = {
  label: 'Research & frameworks',
  title: 'Developing the thinking behind the work',
  body: [
    'We develop practical frameworks around agency, capability, community, social infrastructure, flourishing, power and organisational systems.',
    'They help us ask better questions, design better interventions and identify what needs to be tested.',
  ],
};

const anchor = (label: string) => label.toLowerCase().replace(/[^a-z]+/g, '-');

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="We expand the capacity to do good."
        lead="Our work spans technology, ventures, communities and organisational systems."
      />

      <section className="section">
        <div className="container">
          <ul className="ruled-grid ruled-grid--2 ruled-grid--roomy">
            {AREAS.map((a, i) => (
              <li key={a.label} id={anchor(a.label)}>
                <p className="label">
                  <span className="label__num">{String(i + 1).padStart(2, '0')}</span>
                  {a.label}
                </p>
                <h2>{a.title}</h2>
                {a.body.map((para) => (
                  <p key={para} className="muted">
                    {para}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--accent" id={anchor(FOUNDATION.label)}>
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Underpinning the work</p>
            <h2>{FOUNDATION.label}</h2>
          </div>
          <div className="split__body">
            <h3>{FOUNDATION.title}</h3>
            {FOUNDATION.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
