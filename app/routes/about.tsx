import { Link } from 'react-router';
import type { Route } from './+types/about';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { paper, paperLabel, PAPER_PATH } from '../data/paper';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'About — Real Good Social',
    description:
      'Real Good Social builds practical systems that expand agency, strengthen collective capability and increase our capacity to create positive change.',
    pathname: location.pathname,
  });
}

const PRINCIPLES = [
  { title: 'Expand agency', body: 'Increase people’s practical ability to understand, choose and act.' },
  { title: 'Create practical good', body: 'Turn worthwhile ideas into useful capability.' },
  { title: 'Look at the whole situation', body: 'Understand the relationships and systems around each problem.' },
  { title: 'Learn through action', body: 'Use evidence and experience to improve what we build.' },
  { title: 'Strengthen collective capability', body: 'Help people and organisations achieve more together.' },
  { title: 'Build for continued value', body: 'Create capability that can support further positive action.' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Expanding our capacity to do good."
        lead="Real Good builds the practical conditions that help people and organisations turn good intentions into effective action."
      />

      <section className="section" id="what-we-mean-by-good">
        <div className="container">
          <div className="split">
            <div className="split__aside">
              <p className="eyebrow">Our philosophy</p>
              <h2>What we mean by good</h2>
            </div>
            <div className="split__body prose">
              <p>
                Good is a simple word for a profound question: what makes life, relationships,
                communities and societies better?
              </p>
              <p>
                At Real Good, we approach this through the idea of human flourishing. We believe
                people should have the opportunity not merely to get by, but to live meaningful and
                fulfilling lives, develop their capabilities, form worthwhile relationships and
                contribute to the world around them.
              </p>
              <p>
                People have different circumstances, values and aspirations. Creating good is not
                about imposing a single vision of an ideal life. It involves supporting dignity,
                freedom, wellbeing, opportunity and the conditions that enable people to pursue
                worthwhile lives of their own.
              </p>
              <p>
                We also recognise that people’s opportunities depend on more than individual choices.
                Relationships, communities, institutions, technologies and social conditions can
                expand or constrain what people are able to do and become.
              </p>
              <p>
                Good therefore concerns both the outcomes people experience and the conditions that
                make those outcomes possible.
              </p>
            </div>
          </div>

          <div className="split">
            <div className="split__aside">
              <p className="eyebrow">Why capacity matters</p>
              <h2>Making further good possible</h2>
            </div>
            <div className="split__body prose">
              <p>
                A useful service, supportive relationship or successful intervention can make an
                immediate difference. But lasting change often requires more than one good outcome.
              </p>
              <p>
                People need capabilities they can continue to exercise. Communities need
                relationships and ways to coordinate. Organisations need structures that make
                effective action possible. Institutions need to be capable of learning, responding
                and improving.
              </p>
              <p>
                This is why Real Good works across technology, communities, ventures and
                organisational systems.
              </p>
              <p>
                We aim not only to help create beneficial outcomes, but to strengthen the conditions
                through which people and organisations can continue creating them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <ul className="ruled-grid ruled-grid--2 ruled-grid--roomy">
            <li>
              <p className="label">Our approach</p>
              <h2>Start with the whole situation.</h2>
              <p className="muted">
                We look across the people, organisations and systems involved before deciding what
                kind of intervention is needed.
              </p>
              <p className="muted">
                The answer may be a venture, community, technology, programme, partnership or
                organisational system.
              </p>
            </li>
            <li>
              <p className="label">Why we work across areas</p>
              <h2>Social problems rarely respect organisational boundaries.</h2>
              <p className="muted">
                Real Good combines community, technology, research, ventures and partnerships where
                that combination creates a stronger response.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>What guides the work</h2>
            <p className="lead">
              These principles guide how we pursue good in practice. They are commitments to
              responsible action, not assumptions that every intervention will necessarily succeed.
              In following them we aim to respect dignity and difference: to recognise diverse
              values, circumstances and aspirations, and take seriously the people affected by what
              we build.
            </p>
          </div>
          <ul className="ruled-grid ruled-grid--3">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p className="muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Founder</p>
            <h2>Julian Knowles</h2>
            <p className="muted">Founder &amp; CEO</p>
          </div>
          <div className="split__body prose">
            <p>
              Julian’s background spans technology strategy, enterprise architecture, software
              development and public-sector transformation.
            </p>
            <p>
              Real Good brings those disciplines into social-good work: understanding complex
              situations, designing practical systems and building the capabilities needed to make
              positive change possible.
            </p>
            <p>
              <a href="mailto:julian@realgoodnetwork.org">julian@realgoodnetwork.org</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">Foundational working paper</p>
            <h2>Exploring the foundations of good</h2>
          </div>
          <div className="split__body">
            <p>
              Our work is informed by ongoing inquiry into human flourishing, agency, social
              capability, institutions and the systems that make beneficial outcomes possible.
            </p>
            <p>
              Our foundational working paper sets out how we understand good, how we approach
              difficult trade-offs, and how these ideas inform the organisations and systems we
              build.
            </p>
            <p className="label paper-cite__label">{paperLabel}</p>
            <h3 className="paper-cite__title">{paper.title}</h3>
            <Link to={PAPER_PATH} className="text-link">
              Read the foundational paper
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
