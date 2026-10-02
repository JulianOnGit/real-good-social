import type { Route } from './+types/about';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'About — Real Good Social' },
    {
      name: 'description',
      content:
        'Real Good Social builds practical systems that expand agency, strengthen collective capability and increase our capacity to create positive change.',
    },
  ];
}

const CONNECTED = [
  'Communities can surface knowledge, opportunities and needs.',
  'Technology can make information and capability easier to access.',
  'Services can help people navigate difficult or complex situations.',
  'Research can improve how problems are understood.',
  'Ventures can establish sustainable new forms of delivery.',
  'Partnerships can connect expertise, resources and institutional reach.',
  'Organisational systems can make useful work more durable.',
];

const PRINCIPLES = [
  { title: 'Expand agency', body: 'Create conditions in which people have greater practical power to understand their options, make meaningful choices and act on them.' },
  { title: 'Create practical good', body: 'Turn values and worthwhile ideas into capabilities that make a real difference in the world.' },
  { title: 'Build from possibility', body: 'Look for what can be created, strengthened, connected or made more accessible.' },
  { title: 'Understand the whole situation', body: 'Consider relationships, dependencies and wider systems rather than assuming the presenting issue is the whole problem.' },
  { title: 'Learn through action', body: 'Use implementation, participation and evidence to improve both the work and the thinking behind it.' },
  { title: 'Strengthen collective capability', body: 'Build relationships and systems through which different people and organisations can combine what they know and can do.' },
  { title: 'Create continued value', body: 'Where possible, leave behind useful capability that can support further action, learning and opportunity.' },
  { title: 'Use technology responsibly', body: 'Develop technology in ways that strengthen human capability, agency, access and accountability.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Expanding our capacity to do good."
        lead="Real Good Social develops technology, ventures, communities and organisational systems that strengthen our ability to create positive change."
      />

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="eyebrow">Our purpose</p>
          <h2>We expand the capacity to do good.</h2>
          <p>Real Good is built around a practical question:</p>
          <p className="statement">What would increase our ability to create good in the world?</p>
          <p>The answer is rarely one thing.</p>
          <p>
            It can involve knowledge, technology, relationships, confidence, resources,
            organisations, communities, institutions or new ways of coordinating what already
            exists.
          </p>
          <p>
            Real Good works across these dimensions to create and strengthen practical capability.
          </p>

          <hr className="divider" />

          <p className="eyebrow">Our approach</p>
          <h2>Start with capability, not category.</h2>
          <p>
            Real-world opportunities do not necessarily arrive neatly labelled as technology
            problems, community problems, organisational problems or policy problems.
          </p>
          <p>We look at the wider situation.</p>
          <p>
            That means understanding what already exists, what people are trying to achieve, what
            capabilities are available, where important connections are missing and what
            additional capability could change what becomes possible.
          </p>
          <p>The result may be technology.</p>
          <p>
            It may be a venture, programme, community, partnership, service, operating model or new
            organisational capability.
          </p>
          <p>The category follows the work.</p>

          <hr className="divider" />

          <h2>A connected organisation</h2>
          <p>Real Good is being developed as a family of complementary capabilities.</p>
          {CONNECTED.map((c) => (
            <p key={c}>{c}</p>
          ))}
          <p>Real Good provides a place where these capabilities can develop together.</p>
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
          <h2>Julian Knowles</h2>
          <p>Real Good Social was founded by Julian Knowles.</p>
          <p>
            His background spans technology strategy, enterprise architecture, software
            development, public-sector transformation and systems thinking.
          </p>
          <p>
            Real Good brings those disciplines into social-good work: analysing complex situations,
            modelling capabilities and systems, designing practical interventions and building the
            organisational and technological infrastructure needed to make them real.
          </p>
          <p>
            Real Good is also the product of a longer programme of work exploring human agency,
            flourishing, knowledge, power, collective capability, social infrastructure and the
            conditions through which individuals and societies become better able to act.
          </p>
          <p className="meta">
            <strong>Julian Knowles</strong>
            <br />
            Founder &amp; CEO
            <br />
            <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
