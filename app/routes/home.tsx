import { Link } from 'react-router';
import type { Route } from './+types/home';
import Icon from '../components/Icon';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives } from '../data/initiatives';
import { insights, formatDate } from '../data/insights';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Real Good Social — Building better ways to do good' },
    {
      name: 'description',
      content:
        'Real Good Social builds ventures, technology, partnerships and social infrastructure that help people turn good ideas into practical, lasting change.',
    },
  ];
}

const WORK_AREAS = [
  {
    icon: 'venture' as const,
    title: 'Social Ventures',
    body: 'Creating and growing ventures that respond to real social, cultural, environmental and human needs.',
  },
  {
    icon: 'tech' as const,
    title: 'Technology for Good',
    body: 'Building digital tools and infrastructure that give people more agency, access, knowledge and capacity to act.',
  },
  {
    icon: 'partnership' as const,
    title: 'Partnerships for Good',
    body: 'Bringing people and organisations together around problems that are easier to solve collectively.',
  },
  {
    icon: 'strategy' as const,
    title: 'Strategy and Systems',
    body: 'Designing the structures, models and capabilities that help good ideas become durable institutions and services.',
  },
];

const PROCESS = [
  { n: '01', title: 'Understand the real problem', body: 'Begin with the situation as it is, including the people, systems and constraints already involved.' },
  { n: '02', title: 'Find the useful intervention', body: 'Identify what would genuinely make the situation easier, better or more possible.' },
  { n: '03', title: 'Build with the right people', body: 'Bring together the people closest to the problem and the capabilities needed to address it.' },
  { n: '04', title: 'Test and learn', body: 'Put ideas into contact with reality, gather evidence and improve what does not work.' },
  { n: '05', title: 'Make it durable', body: 'Turn useful interventions into reusable capabilities, services, ventures or institutions.' },
];

const AUDIENCES = [
  'Community organisations',
  'Institutions',
  'Researchers',
  'Builders and specialists',
  'Supporters',
];

export default function Home() {
  const latest = insights[0];

  return (
    <>
      <section className="hero">
        <div className="hero__grid container">
          <div className="hero__content">
            <p className="eyebrow">Real Good Social</p>
            <h1 className="hero__title">Building better ways to do good.</h1>
            <p className="lead">
              We build ventures, technology, partnerships and social infrastructure that help people
              solve worthwhile problems and create lasting public value.
            </p>
            <div className="btn-row hero__actions">
              <Link to="/what-we-do" className="btn">
                Explore our work
              </Link>
              <Link to="/partner" className="btn btn--secondary">
                Work with us
              </Link>
            </div>
          </div>
          <div className="hero__motif" aria-hidden="true">
            <HeroMotif />
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we do</p>
            <h2>We build the missing pieces</h2>
            <p className="lead">
              Sometimes the answer is a venture. Sometimes it is a tool, a partnership, a programme
              or a better way of organising people and resources.
            </p>
          </div>
          <div className="grid grid-4">
            {WORK_AREAS.map((a) => (
              <article key={a.title} className="card">
                <div className="card__icon">
                  <Icon name={a.icon} />
                </div>
                <h3>{a.title}</h3>
                <p className="muted">{a.body}</p>
              </article>
            ))}
          </div>
          <p className="section-foot">
            <Link to="/what-we-do" className="text-link">
              See how our work fits together
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container container-narrow center">
          <p className="eyebrow">Why Real Good exists</p>
          <p className="statement">
            Good ideas are everywhere. What is often missing are the systems, relationships, tools
            and institutions that help them become real. Real Good Social exists to build them.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">Featured initiatives</p>
              <h2>Things we are building</h2>
              <p className="lead">
                Our initiatives range from early ideas to working prototypes and operating
                programmes. Each one is explicit about where it stands and what comes next.
              </p>
            </div>
            <Link to="/initiatives" className="btn btn--secondary">
              View all initiatives
            </Link>
          </div>
          <div className="grid grid-3">
            {initiatives.map((i) => (
              <InitiativeCard key={i.slug} initiative={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2>Understand. Build. Learn. Strengthen.</h2>
          </div>
          <ol className="process">
            {PROCESS.map((step) => (
              <li key={step.n} className="process__step">
                <span className="process__num">{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="muted mt-0">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Who we work with</p>
            <h2>Better systems are built together</h2>
          </div>
          <ul className="chip-list">
            {AUDIENCES.map((a) => (
              <li key={a} className="chip">
                {a}
              </li>
            ))}
          </ul>
          <p className="section-foot">
            <Link to="/partner" className="text-link">
              Find a way to get involved
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container container-narrow">
          <p className="eyebrow">Latest insight</p>
          <article className="latest-insight">
            <p className="meta">
              {latest.category} · {formatDate(latest.date)} · {latest.readingMinutes} min read
            </p>
            <h2>
              <Link to={`/insights/${latest.slug}`}>{latest.title}</Link>
            </h2>
            <p className="lead">{latest.summary}</p>
            <Link to={`/insights/${latest.slug}`} className="text-link">
              Read the piece
            </Link>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/**
 * Abstract hero motif (brief §6.3): connected points and pathways rising above a
 * horizon, drawn as fine engraved lines. Deliberately restrained — structure and
 * gradual upward movement, no literal illustration.
 */
function HeroMotif() {
  const nodes: [number, number][] = [
    [42, 268],
    [128, 214],
    [210, 168],
    [296, 138],
    [378, 84],
  ];

  return (
    <svg viewBox="0 0 420 360" className="hero-motif" role="img" aria-label="">
      <defs>
        <linearGradient id="hero-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#38BDF0" />
          <stop offset="0.55" stopColor="#2457D6" />
          <stop offset="1" stopColor="#14213D" />
        </linearGradient>
      </defs>

      {/* Expanding fields of influence */}
      {[64, 116, 168, 220].map((r, i) => (
        <circle
          key={r}
          className="hero-motif__ring"
          cx="210"
          cy="196"
          r={r}
          fill="none"
          stroke="#2457D6"
          strokeOpacity={0.13 - i * 0.025}
          strokeWidth="1"
        />
      ))}

      {/* Fine connective grid between the nodes */}
      <g stroke="#2457D6" strokeOpacity="0.16" strokeWidth="1">
        {nodes.map(([x, y], i) =>
          nodes.slice(i + 2).map(([x2, y2]) => (
            <line key={`${x}-${y}-${x2}-${y2}`} x1={x} y1={y} x2={x2} y2={y2} />
          )),
        )}
      </g>

      {/* The pathway */}
      <path
        className="hero-motif__path"
        d="M42 268 C 96 236, 150 196, 210 168 C 268 141, 320 130, 378 84"
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Nodes: hollow rings with a solid centre */}
      {nodes.map(([cx, cy], i) => (
        <g className="hero-motif__node" key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="6.5" fill="var(--paper, #F8F7F3)" stroke="#2457D6" strokeWidth="1.5" />
          {i === nodes.length - 1 && <circle cx={cx} cy={cy} r="2.75" fill="#2457D6" />}
        </g>
      ))}

      {/* Horizon */}
      <line x1="24" y1="308" x2="396" y2="308" stroke="#D3CEC1" strokeWidth="1" />
      <line x1="24" y1="308" x2="150" y2="308" stroke="#2457D6" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}
