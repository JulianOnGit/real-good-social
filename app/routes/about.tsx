import type { Route } from './+types/about';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'About — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social makes effective social action easier to initiate, coordinate, sustain, and scale — combining social ventures, technology, partnerships, and practical implementation.',
    },
  ];
}

const APPROACH = [
  'Social venture development',
  'Technology for good',
  'Partnerships and institutional collaboration',
  'Knowledge, strategy, and practical implementation',
];

const PRINCIPLES = [
  { title: 'Practical good over symbolic good', body: 'We favour work that changes outcomes over work that only signals intent.' },
  { title: 'Human agency and dignity', body: 'People are participants in their own progress, not passive recipients.' },
  { title: 'Evidence and continuous improvement', body: 'We treat reflection, testing, and learning as part of the work.' },
  { title: 'Responsible technology', body: 'Tools should widen access and accountability, not concentrate power.' },
  { title: 'Partnership over duplication', body: 'We strengthen existing efforts rather than competing with them.' },
  { title: 'Long-term social value', body: 'We build durable capability rather than chasing short-lived wins.' },
  { title: 'Honesty about stage', body: 'We are transparent about uncertainty and how developed our work is.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An organising institution for practical social action"
        lead="Real Good Social combines social ventures, technology, partnerships, and implementation to help turn concern into sustained, effective action."
      />

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <h2>Our purpose</h2>
          <p className="statement">
            To make effective social action easier to initiate, coordinate, sustain, and scale.
          </p>

          <hr className="divider" />

          <h2>Our approach</h2>
          <p>Real Good Social combines four kinds of work:</p>
          <ul className="ticked">
            {APPROACH.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <hr className="divider" />

          <h2>Why Real Good exists</h2>
          <p>
            Many people and organisations want to produce meaningful social good but lack the
            systems, tools, relationships, resources, or operating structures required to turn
            concern into sustained action.
          </p>
          <p>Real Good Social exists to help bridge this gap.</p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>How we hold ourselves to the work</h2>
          </div>
          <div className="grid grid-2">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card principle-card">
                <h3>{p.title}</h3>
                <p className="muted mt-0">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="eyebrow">Founder</p>
          <h2>Origin and direction</h2>
          <p>
            Real Good Social was founded by <strong>Julian Knowles</strong>, who leads its early
            development. The organisation grew from a simple observation: that the distance between
            wanting to do good and doing it well is usually a matter of systems, not sincerity.
          </p>
          <p>
            The founder’s role is to establish accountability and direction while the organisation,
            its portfolio, and its partnerships mature. Real Good Social is intended to become a
            durable institution rather than a personal profile — the work, not the founder, is the
            subject.
          </p>
          <p className="meta">
            Julian Knowles, Founder &amp; CEO ·{' '}
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
