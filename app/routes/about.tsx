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

const PRINCIPLES = [
  { title: 'Expand agency', body: 'Increase people’s practical ability to understand, choose and act.' },
  { title: 'Create practical good', body: 'Turn worthwhile ideas into useful capability.' },
  { title: 'Look at the whole situation', body: 'Understand relationships and systems, not only isolated symptoms.' },
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
        lead="Real Good builds practical systems that strengthen our ability to create positive change."
      />

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <p className="eyebrow">Our purpose</p>
          <h2>We expand the capacity to do good.</h2>
          <p>
            Real Good builds the practical conditions that help people and organisations turn good
            intentions into effective action.
          </p>

          <hr className="divider" />

          <p className="eyebrow">Our approach</p>
          <h2>Start with the whole situation.</h2>
          <p>
            We look across the people, organisations and systems involved before deciding what kind
            of intervention is needed.
          </p>
          <p>
            The answer may be a venture, community, technology, programme, partnership or
            organisational system.
          </p>

          <hr className="divider" />

          <h2>Why Real Good works across different areas</h2>
          <p>
            Social problems rarely respect organisational boundaries. Real Good combines community,
            technology, research, ventures and partnerships where that combination creates a
            stronger response.
          </p>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <div className="section-head">
            <h2>Principles</h2>
          </div>
          <div className="grid grid-3">
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
          <p>
            Julian’s background spans technology strategy, enterprise architecture, software
            development and public-sector transformation.
          </p>
          <p>
            Real Good brings those disciplines into social-good work: understanding complex
            situations, designing practical systems and building the capabilities needed to make
            positive change possible.
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
