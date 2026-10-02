import { Link } from 'react-router';
import type { Route } from './+types/partner';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Partner With Us — Real Good Social' },
    {
      name: 'description',
      content:
        'Work with Real Good Social on ventures, technology, research, programmes, partnerships and social infrastructure.',
    },
  ];
}

const AUDIENCES = [
  {
    title: 'Community organisations',
    body: 'Bring us a recurring problem, unmet need, programme idea or opportunity to strengthen something already working.',
    cta: 'Share a problem or opportunity',
  },
  {
    title: 'Institutions',
    body: 'Explore work involving research, technology, programme design, social infrastructure, service development or implementation.',
    cta: 'Explore institutional collaboration',
  },
  {
    title: 'Researchers and specialists',
    body: 'Apply domain knowledge, evidence, evaluation, design or technical expertise to a specific initiative.',
    cta: 'Contribute expertise',
  },
  {
    title: 'Builders and contributors',
    body: 'Help design, build and operate products, programmes, communities, research and new ventures.',
    cta: 'Get involved',
  },
  {
    title: 'Supporters and funders',
    body: 'Help useful work become possible through funding, sponsorship, introductions, resources, advice or institutional support.',
    cta: 'Support an initiative',
  },
];

const ACTIONS = ['A problem', 'An idea', 'Evidence', 'Expertise', 'Resources', 'A possible partnership'];

export default function Partner() {
  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title="Bring something worth building"
        lead="Real Good Social works with people and organisations who have problems worth solving, knowledge worth applying, capabilities worth sharing or ideas worth developing."
      />

      <section className="section section--surface">
        <div className="container">
          <div className="grid grid-2">
            {AUDIENCES.map((a) => (
              <article key={a.title} className="card partner-card">
                <h3>{a.title}</h3>
                <p className="muted">{a.body}</p>
                <Link to={`/contact?purpose=${encodeURIComponent(a.title)}`} className="text-link">
                  {a.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container container-narrow center">
          <p className="eyebrow">Ways to begin</p>
          <h2>Start with what you have</h2>
          <ul className="chip-list" style={{ justifyContent: 'center' }}>
            {ACTIONS.map((a) => (
              <li key={a} className="chip chip--action">
                {a}
              </li>
            ))}
          </ul>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.75rem' }}>
            <Link to="/contact" className="btn">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
