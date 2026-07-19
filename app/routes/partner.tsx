import { Link } from 'react-router';
import type { Route } from './+types/partner';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Partner With Us — Real Good Social' },
    {
      name: 'description',
      content:
        'Concrete ways for community organisations, institutions, researchers, builders, and supporters to work with Real Good Social.',
    },
  ];
}

const AUDIENCES = [
  {
    title: 'Community organisations',
    body: 'Collaborate on a problem, pilot a tool, strengthen an existing service, or develop a new response alongside us.',
    cta: 'Share a problem or opportunity',
  },
  {
    title: 'Institutions',
    body: 'Explore partnerships involving research, technology, programme design, social innovation, service development, or implementation.',
    cta: 'Explore institutional collaboration',
  },
  {
    title: 'Researchers and specialists',
    body: 'Contribute domain knowledge, evidence, evaluation, design expertise, or technical capability to a specific initiative.',
    cta: 'Contribute expertise',
  },
  {
    title: 'Builders and contributors',
    body: 'Participate in product development, design, operations, communications, research, or venture formation.',
    cta: 'Express interest in contributing',
  },
  {
    title: 'Supporters and funders',
    body: 'Provide introductions, sponsorship, philanthropic support, resources, strategic advice, or support for a specific initiative.',
    cta: 'Support an initiative',
  },
];

const ACTIONS = [
  'Propose a partnership',
  'Share a problem or opportunity',
  'Contribute expertise',
  'Support an initiative',
  'Arrange an introductory conversation',
];

export default function Partner() {
  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title="Concrete ways to work together"
        lead="Early-stage credibility comes from being clear about the kinds of engagement we are prepared to undertake. Here is how different partners can get involved."
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
          <h2>Choose a starting point</h2>
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
