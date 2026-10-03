import type { Route } from './+types/about';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

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

      <section className="section">
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

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Principles</p>
            <h2>What guides the work</h2>
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

      <section className="section">
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

      <CtaBand />
    </>
  );
}
