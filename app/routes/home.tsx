import { Link } from 'react-router';
import type { Route } from './+types/home';
import Icon from '../components/Icon';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives } from '../data/initiatives';
import { insights, insightSummary } from '../data/insights';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Real Good Social — Building practical systems for social good' },
    {
      name: 'description',
      content:
        'Real Good Social creates technology, ventures, communities and organisational systems that expand our collective capacity to create positive change.',
    },
  ];
}

const WORK_AREAS = [
  {
    icon: 'venture' as const,
    title: 'Social ventures',
    body: 'We create and develop ventures that establish useful new services, capabilities and opportunities for social good.',
  },
  {
    icon: 'tech' as const,
    title: 'Technology',
    body: 'We build technology that expands access to knowledge, opportunity, coordination and practical capability.',
  },
  {
    icon: 'partnership' as const,
    title: 'Communities',
    body: 'We create environments where people can connect, participate, contribute, find support and build things together.',
  },
  {
    icon: 'strategy' as const,
    title: 'Organisations & systems',
    body: 'We develop the structures, operating models and institutional capabilities through which worthwhile work can grow and endure.',
  },
];

const PROCESS = [
  { n: '01', title: 'Understand the situation', body: 'Start with the people, context, capabilities, constraints, opportunities and systems already present.' },
  { n: '02', title: 'See what could become possible', body: 'Look for capabilities that could be created, strengthened, connected or made easier to access.' },
  { n: '03', title: 'Build in practice', body: 'Develop real tools, programmes, communities, ventures, partnerships and organisational systems.' },
  { n: '04', title: 'Learn from what happens', body: 'Use evidence, participation and experience to understand what is creating value, what is changing and what needs further development.' },
  { n: '05', title: 'Strengthen what can continue', body: 'Build knowledge, relationships, infrastructure and organisational capability that support further positive action.' },
];

const AUDIENCES = [
  'Communities',
  'Social enterprises',
  'Researchers',
  'Government',
  'Universities',
  'Builders',
  'Practitioners',
  'Funders',
  'Institutions',
  'Contributors',
];

export default function Home() {
  const latest = insights[0];
  const featured = initiatives.filter((i) => i.featured);

  return (
    <>
      <section className="hero">
        <div className="hero__grid container">
          <div className="hero__content">
            <p className="eyebrow">Real Good Social</p>
            <h1 className="hero__title">Building practical systems for social good.</h1>
            <p className="lead">
              We create technology, ventures, communities and organisational systems that expand
              our collective capacity to create positive change.
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
            <h2>We expand the capacity to do good.</h2>
            <p className="lead">
              Real Good develops practical capabilities for positive action — connecting people,
              knowledge, resources, technology and organisations in ways that increase what
              becomes possible.
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
              Explore what we do
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container container-narrow center">
          <p className="eyebrow">Why Real Good exists</p>
          <h2>There is already enormous capacity for good in the world.</h2>
          <p className="lead mx-auto">
            People hold knowledge, experience, creativity, care, resources, relationships and
            practical abilities that can contribute to positive change.
          </p>
          <p className="lead mx-auto">
            Organisations and institutions hold further capabilities: expertise, infrastructure,
            authority, reach and resources.
          </p>
          <p className="lead mx-auto">
            Real Good is interested in what becomes possible when these capabilities are made more
            accessible, developed further and connected in useful ways.
          </p>
          <p className="lead mx-auto">
            Our work creates practical systems through which more of that capacity can become
            action.
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">Featured initiatives</p>
              <h2>What we are building</h2>
              <p className="lead">
                Our initiatives put the Real Good approach into practice across community, social
                infrastructure, support, technology and organisational development.
              </p>
            </div>
            <Link to="/initiatives" className="btn btn--secondary">
              View all initiatives
            </Link>
          </div>
          <div className="grid grid-2">
            {featured.map((i) => (
              <InitiativeCard key={i.slug} initiative={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2>Build capability. Learn from practice. Create what becomes useful.</h2>
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
            <h2>Good work grows through useful connections.</h2>
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
              Find a way to work with us
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container container-narrow">
          <p className="eyebrow">Latest insight</p>
          <article className="latest-insight">
            <p className="meta">{latest.category}</p>
            <h2>
              <Link to={`/insights/${latest.slug}`}>{latest.title}</Link>
            </h2>
            <p className="lead">{insightSummary(latest)}</p>
            <Link to={`/insights/${latest.slug}`} className="text-link">
              Read the insight
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
