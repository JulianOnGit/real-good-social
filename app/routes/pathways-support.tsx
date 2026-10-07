import { useEffect, type MouseEvent, type ReactNode } from 'react';
import type { Route } from './+types/pathways-support';
import { pageMeta } from '../data/seo';
import EnquiryForm from '../components/EnquiryForm';
import ProcessSteps from '../components/ProcessSteps';
import { services } from '../data/services';
import { track, type AnalyticsEvent } from '../services/analytics';

const SERVICE = 'pathways-support';
const SERVICE_NAME = 'Pathways Support';
const PRIMARY_CTA = 'Talk to us about Pathways Support';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Pathways Support — Real Good Social',
    description:
      'Pathways Support offers personalised, practical help for working through challenges, exploring options, navigating services and finding a way forward.',
    pathname: location.pathname,
    // Interim: not listed in search for now — see `indexable` in data/services.ts.
    index: services.find((s) => s.slug === SERVICE)?.indexable ?? false,
  });
}

const HELP_WITH = [
  {
    title: 'Understand your situation',
    body: 'Clarify what is happening, what matters and what may be getting in the way.',
  },
  {
    title: 'Explore your options',
    body: 'Identify possible approaches, opportunities, services and next steps.',
  },
  {
    title: 'Plan a pathway forward',
    body: 'Turn larger goals or complicated situations into manageable actions.',
  },
  {
    title: 'Navigate services and systems',
    body: 'Find relevant services, programmes, resources and people and understand how they may fit together.',
  },
  {
    title: 'Get practical help',
    body: 'Work through research, applications, information, planning and other practical tasks.',
  },
  {
    title: 'Keep moving forward',
    body: 'Review progress, adapt plans and work through new barriers as they emerge.',
  },
];

const USEFUL_WHEN = [
  'know something needs to change but are not sure what to do next',
  'are dealing with several connected problems at once',
  'have a goal but are finding it difficult to turn it into action',
  'need help understanding or navigating services and opportunities',
  'are facing a decision and want to work through the possibilities',
  'would benefit from practical support and follow-through over time',
];

const STEPS = [
  {
    title: 'Start with a conversation',
    body: 'Tell us what is happening and what you would like some help with.',
  },
  {
    title: 'Work out what matters',
    body: 'Identify the goals, problems or opportunities worth focusing on.',
  },
  {
    title: 'Explore a pathway',
    body: 'Consider possibilities, useful services, practical approaches and next steps.',
  },
  {
    title: 'Work through it together',
    body: 'Use sessions for discussion, planning, research, practical assistance and follow-through.',
  },
  {
    title: 'Review and adapt',
    body: 'See what worked, respond to new circumstances and decide what comes next.',
  },
];

const SESSION_EXAMPLES = [
  'Talking through a particular problem',
  'Identifying goals and priorities',
  'Researching options together',
  'Planning next steps',
  'Finding relevant services or resources',
  'Working through an application or process',
  'Preparing information',
  'Solving a practical problem',
  'Reviewing what has happened since a previous session',
  'Adjusting an existing plan',
];

const CONNECTIONS = ['Services', 'Community', 'Resources', 'Opportunities'];

/**
 * A link to a section of this page. Scrolls there (smoothly, unless the visitor
 * prefers reduced motion) and moves focus with it, so keyboard and screen
 * reader users land in the section too. Without JS it is an ordinary anchor.
 */
function SectionLink({
  to,
  event,
  className,
  children,
}: {
  to: string;
  event: AnalyticsEvent;
  className: string;
  children: ReactNode;
}) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track(event);
    const target = document.getElementById(to);
    if (!target) return;
    e.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  }

  return (
    <a href={`#${to}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

export default function PathwaysSupport() {
  useEffect(() => {
    track('pathways_page_view');
  }, []);

  return (
    <>
      <section className="page-hero service-hero">
        <div className="container service-hero__grid">
          <div className="service-hero__content">
            <p className="eyebrow">{SERVICE_NAME}</p>
            <h1>Find a practical way forward.</h1>
            <p className="lead">
              Personalised support for understanding your situation, working through challenges,
              exploring options and turning next steps into a practical pathway.
            </p>
            <div className="btn-row service-hero__actions">
              <SectionLink to="enquire" event="pathways_primary_cta_click" className="btn">
                {PRIMARY_CTA}
              </SectionLink>
              <SectionLink
                to="how-it-works"
                event="pathways_process_cta_click"
                className="btn btn--secondary"
              >
                See how it works
              </SectionLink>
            </div>
            <p className="meta service-hero__note">
              Currently available at no cost during its introductory period.
            </p>
          </div>
          <div className="service-hero__motif" aria-hidden="true">
            <PathwayMotif />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">What it is</p>
            <h2>Support for working out what comes next</h2>
          </div>
          <div className="split__body">
            <p className="lead">
              Sometimes the difficulty is not simply knowing that help exists. It is working out
              what the actual problem is, what matters most, what options are available and how to
              turn them into action.
            </p>
            <p className="lead">
              <strong>Pathways Support gives you someone to work through this with.</strong>
            </p>
            <p>
              It combines conversation, practical problem-solving, planning, research, navigation
              and follow-through around the things you want to work on.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">What we can help with</p>
            <h2>Practical help, shaped around you</h2>
          </div>
          <ul className="ruled-grid ruled-grid--3">
            {HELP_WITH.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Is it for me?</p>
            <h2>Could Pathways Support help?</h2>
          </div>
          <div className="split__body">
            <p id="useful-when">Pathways Support may be useful when you:</p>
            <ul className="dash-list" aria-labelledby="useful-when">
              {USEFUL_WHEN.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>
                You do not need to know exactly what kind of support you need before getting in
                touch.
              </strong>
            </p>
            <SectionLink to="enquire" event="pathways_primary_cta_click" className="text-link">
              Discuss your situation
            </SectionLink>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="how-it-works" tabIndex={-1}>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>How Pathways Support works</h2>
          </div>
          <ProcessSteps steps={STEPS} />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Sessions</p>
            <h2>What a session can involve</h2>
            <p className="lead">
              There is no fixed script. Sessions are shaped around what you want to work on.
            </p>
          </div>
          <div className="split__body">
            <ul className="dash-list dash-list--2">
              {SESSION_EXAMPLES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">
              Some sessions may be mostly conversational. Others may involve actively working
              through practical tasks together.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--accent section--compact">
        <div className="container container-narrow" data-reveal>
          <p className="eyebrow">Your call</p>
          <h2>You decide what we work on</h2>
          <p className="lead">Pathways Support is collaborative rather than prescriptive.</p>
          <p>
            You can bring a particular problem, decision or goal, or we can work together to
            identify what would be most useful to focus on.
          </p>
          <p>
            You remain in control of your decisions and can decide what support you do or do not
            want.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Cost</p>
            <h2>Current introductory offer</h2>
            <p className="price">
              <span className="price__amount">$0</span>
              <span className="label">per session</span>
            </p>
          </div>
          <div className="split__body">
            <p className="lead">
              Pathways Support is currently being offered free of charge during its introductory
              development period.
            </p>
            <p>
              There is no commitment to continue using the service, and sessions agreed to be
              provided free of charge will not later be retrospectively charged.
            </p>
            <p>
              Future pricing arrangements have not yet been finalised. Any future pricing would be
              discussed before it applied.
            </p>
            <div className="btn-row split__actions">
              <SectionLink to="enquire" event="pathways_primary_cta_click" className="btn">
                {PRIMARY_CTA}
              </SectionLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Other support</p>
            <h2>Part of a broader pathway</h2>
          </div>
          <div className="split__body">
            <p className="lead">Pathways Support does not need to be the only source of help.</p>
            <p>
              Where useful, support may involve identifying and connecting with other services,
              specialists, communities, programmes or people that can contribute to what you are
              trying to achieve.
            </p>
            <div
              className="branch"
              role="img"
              aria-label="Pathways Support connecting out to services, community, resources and opportunities."
            >
              <span className="pill branch__root">{SERVICE_NAME}</span>
              <ul>
                {CONNECTIONS.map((c) => (
                  <li key={c}>
                    <span className="pill">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="ruled-grid ruled-grid--2 ruled-grid--roomy">
            <li>
              <h2>A few things to know</h2>
              <p className="muted">
                Pathways Support provides practical, personalised support but is not intended to
                replace specialist professional services where those are required.
              </p>
              <p className="muted">
                Where appropriate, this may include health, legal, financial, disability, housing,
                employment, education or other specialist services.
              </p>
              <p className="muted">Pathways Support is not an emergency or crisis service.</p>
            </li>
            <li>
              <h2>An evolving Real Good service</h2>
              <p className="muted">
                Pathways Support is being developed and refined through early delivery and
                participant feedback.
              </p>
              <p className="muted">
                Its structure and activities may continue to evolve as Real Good learns what is
                most useful.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--alt" id="enquire" tabIndex={-1}>
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Get in touch</p>
            <h2>Start a conversation</h2>
            <p className="lead">
              Tell us a little about what you would like help with. You do not need to have
              everything worked out before getting in touch.
            </p>
          </div>
          <EnquiryForm
            service={SERVICE}
            serviceName={SERVICE_NAME}
            onStart={() => track('pathways_enquiry_started')}
            onSubmitted={() => track('pathways_enquiry_submitted')}
          />
        </div>
      </section>
    </>
  );
}

/**
 * The page's motif: one starting point, several possible routes, one of them
 * taken. Drawn in the same fine-line style as the home page's diagram.
 */
function PathwayMotif() {
  // Routes not taken, from the fork to their end points.
  const others = [
    'M150 178 C 205 176, 250 170, 300 160 S 362 150, 388 150',
    'M150 178 C 196 196, 236 232, 292 246 S 356 258, 380 262',
    'M246 96 C 282 96, 318 108, 366 104',
  ];
  const ends: [number, number][] = [
    [388, 150],
    [380, 262],
    [366, 104],
  ];

  return (
    <svg viewBox="0 0 420 300" className="pathway-motif" role="img" aria-label="">
      <defs>
        <linearGradient id="pathway-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#38BDF0" />
          <stop offset="0.55" stopColor="#2457D6" />
          <stop offset="1" stopColor="#14213D" />
        </linearGradient>
      </defs>

      {[70, 130, 190].map((r, i) => (
        <circle
          key={r}
          cx="150"
          cy="178"
          r={r}
          fill="none"
          stroke="#2457D6"
          strokeOpacity={0.12 - i * 0.03}
          strokeWidth="1"
        />
      ))}

      <g className="pathway-motif__others" fill="none" stroke="#2457D6" strokeOpacity="0.32" strokeWidth="1.25" strokeLinecap="round">
        {others.map((d) => (
          <path key={d} d={d} pathLength={1} />
        ))}
      </g>

      {/* The route taken */}
      <path
        className="pathway-motif__path"
        d="M32 236 C 76 226, 112 200, 150 178 C 190 154, 208 110, 246 96 C 296 78, 340 70, 390 38"
        pathLength={1}
        fill="none"
        stroke="url(#pathway-line)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <g className="pathway-motif__nodes">
        {ends.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="var(--paper, #F8F7F3)" stroke="#2457D6" strokeOpacity="0.55" strokeWidth="1.25" />
        ))}
        {(
          [
            [32, 236],
            [150, 178],
            [246, 96],
            [390, 38],
          ] as const
        ).map(([cx, cy], i) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="6.5" fill="var(--paper, #F8F7F3)" stroke="#2457D6" strokeWidth="1.5" />
            {i === 3 && <circle cx={cx} cy={cy} r="2.75" fill="#2457D6" />}
          </g>
        ))}
      </g>
    </svg>
  );
}
