import type { Route } from './+types/about';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'About — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social builds practical social infrastructure, ventures, technology and partnerships that help people create lasting public value.',
    },
  ];
}

const APPROACH = [
  'Social venture development',
  'Technology for good',
  'Partnerships and institutional collaboration',
  'Strategy, systems and practical implementation',
];

const PRINCIPLES = [
  { title: 'Make good practical', body: 'Good intentions matter most when they become useful action, capability and better outcomes.' },
  { title: 'Expand human agency', body: 'People should have greater capacity to understand, choose, participate and act in the systems that affect them.' },
  { title: 'Learn from reality', body: 'We test ideas, use evidence and treat changing our minds as part of building well.' },
  { title: 'Use technology responsibly', body: 'Technology should expand capability and access without unnecessarily concentrating power.' },
  { title: 'Build with, not around', body: 'Durable solutions are stronger when shaped with the people and organisations already closest to the problem.' },
  { title: 'Think beyond the intervention', body: 'We look for structures that can endure, compound and become useful beyond a single project.' },
  { title: 'Be clear about what is real', body: 'We distinguish ideas, experiments, prototypes and operating capabilities so people know what they are engaging with.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We build things that make good action easier"
        lead="Real Good Social is a social enterprise for developing the ventures, tools, partnerships and institutions that help people work together on worthwhile problems."
      />

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <h2>Our purpose</h2>
          <p className="statement">
            To expand people’s practical capacity to create good in the world around them.
          </p>

          <hr className="divider" />

          <h2>Our approach</h2>
          <p>Real Good Social brings together four kinds of work:</p>
          <ul className="ticked">
            {APPROACH.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <hr className="divider" />

          <h2>Why Real Good Social exists</h2>
          <p>
            Many worthwhile ideas fail for reasons that have little to do with their underlying
            value.
          </p>
          <p>
            The right people may not know each other. Useful knowledge may sit in the wrong
            institution. A community may lack the tool, structure or capacity needed to act. A
            promising idea may never become an organisation, service or system.
          </p>
          <p>Real Good Social works in that space between possibility and implementation.</p>
          <p>
            We build social infrastructure, ventures, programmes, technology and practical systems
            that help people connect, cooperate and create public value.
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>What guides the work</h2>
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
          <h2>Where Real Good began</h2>
          <p>
            Real Good Social was founded by <strong>Julian Knowles</strong> from a simple question:
            why is doing something genuinely useful for society often harder than wanting to?
          </p>
          <p>
            That question led to a broader interest in the systems behind social action — how
            people find one another, how ideas become organisations, how knowledge becomes action,
            and how better social infrastructure can expand what communities are capable of doing.
          </p>
          <p>
            Julian leads Real Good Social’s early development while building the partnerships,
            ventures and organisational foundations intended to let the work grow beyond any one
            person.
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
