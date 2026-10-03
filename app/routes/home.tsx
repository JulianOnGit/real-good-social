import { Link } from 'react-router';
import type { Route } from './+types/home';
import { pageMeta, SITE_NAME, SITE_URL } from '../data/seo';
import { CONTACT_EMAIL } from '../data/contact';
import InitiativeCard from '../components/InitiativeCard';
import CtaBand from '../components/CtaBand';
import { initiatives } from '../data/initiatives';
import { InsightTeaser } from '../components/InsightMeta';
import { insights } from '../data/insights';

export function meta({ location }: Route.MetaArgs) {
  const description =
    'Real Good Social creates technology, ventures, communities and organisational systems that expand our collective capacity to create positive change.';
  return [
    ...pageMeta({
      title: 'Real Good Social — Building practical systems for social good',
      description,
      pathname: location.pathname,
    }),
    // Tells search engines who the site belongs to, for brand results and the
    // knowledge panel. `public/logo.png` keeps a stable, unhashed address.
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/logo.png`,
            description,
            email: CONTACT_EMAIL,
            areaServed: 'AU',
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            inLanguage: 'en-AU',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
        ],
      },
    },
  ];
}

const WORK_AREAS = [
  {
    title: 'Social ventures',
    body: 'Creating sustainable new ways to deliver social good.',
  },
  {
    title: 'Technology',
    body: 'Building tools that expand access, knowledge, agency and capability.',
  },
  {
    title: 'Communities',
    body: 'Creating spaces for connection, participation, support and contribution.',
  },
  {
    title: 'Strategy & systems',
    body: 'Designing the organisational systems that help worthwhile work grow.',
  },
];

const PROCESS = [
  { n: '01', title: 'Understand the problem', body: 'Start from the real situation and let the response follow from it.' },
  { n: '02', title: 'Develop a practical response', body: 'Design something concrete that can be built and tested.' },
  { n: '03', title: 'Build with relevant partners', body: 'Work with those closest to the problem and build on what already exists.' },
  { n: '04', title: 'Test, learn, and improve', body: 'Treat evidence and reflection as part of the work.' },
  { n: '05', title: 'Establish durable capability', body: 'Aim for reusable systems that keep creating value.' },
];

const PARTNERS = [
  'Venues & spaces',
  'AI & technology',
  'Skills & knowledge sharing',
  'Community organisations',
  'Researchers & specialists',
  'Government & institutions',
  'Funders & supporters',
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

      {/* Fields alternate paper / alt, with sky as the page's one accent. */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">What we do</p>
              <h2>We expand the capacity to do good.</h2>
            </div>
            <Link to="/what-we-do" className="text-link">
              Explore what we do
            </Link>
          </div>
          <ul className="ruled-grid ruled-grid--4">
            {WORK_AREAS.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p className="muted">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container container-narrow center">
          <p className="eyebrow">Why Real Good exists</p>
          <p className="statement">
            Many people and organisations want to produce meaningful social good but lack the
            systems, tools, relationships or operating structures required to turn concern into
            sustained action. Real Good exists to help bridge that gap.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">Featured initiatives</p>
              <h2>What we’re building</h2>
            </div>
            <Link to="/initiatives" className="text-link">
              View all initiatives
            </Link>
          </div>
          <ul className="ruled-grid ruled-grid--2">
            {featured.map((i) => (
              <li key={i.slug}>
                <InitiativeCard initiative={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">How we work</p>
            <h2>From understanding to durable capability</h2>
          </div>
          <ol className="ruled-list ruled-list--numbered">
            {PROCESS.map((step) => (
              <li key={step.n}>
                <span className="ruled-list__num">{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Who we work with</p>
            <h2>Good work is built in good company.</h2>
            <Link to="/partner" className="text-link">
              Explore ways to work with us
            </Link>
          </div>
          <div className="split__body">
            <p className="lead">
              We’re always glad to meet people and organisations who bring places, tools, know-how
              or time to the work.
            </p>
            <ul className="pills">
              {PARTNERS.map((p) => (
                <li key={p} className="pill">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container-narrow">
          <p className="eyebrow">Latest insight</p>
          <InsightTeaser insight={latest} featured />
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
