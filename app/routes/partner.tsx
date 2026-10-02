import { Link } from 'react-router';
import type { Route } from './+types/partner';
import PageHero from '../components/PageHero';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Partner With Us — Real Good Social' },
    {
      name: 'description',
      content:
        'Work with Real Good Social to build communities, ventures, technology, partnerships and practical systems for positive change.',
    },
  ];
}

const AUDIENCES = [
  {
    title: 'Community organisations',
    body: 'Build programmes, strengthen community capability, connect participants with useful opportunities or work together on shared social priorities.',
    cta: 'Explore collaboration',
  },
  {
    title: 'Government & institutions',
    body: 'Work with Real Good on community participation, social infrastructure, programme design, organisational capability, technology, research or institutional learning.',
    cta: 'Explore institutional collaboration',
  },
  {
    title: 'Researchers & specialists',
    body: 'Contribute evidence, methodology, evaluation, specialist expertise or new ways of understanding the questions we are exploring.',
    cta: 'Contribute expertise',
  },
  {
    title: 'Builders & contributors',
    body: 'Help create technology, programmes, communities, research, communications, events and organisational capability.',
    cta: 'Get involved',
  },
  {
    title: 'Funders & supporters',
    body: 'Support useful work through funding, sponsorship, commissioned programmes, resources, introductions or institutional support.',
    cta: 'Support the work',
  },
];

export default function Partner() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Create more capacity for good."
        lead="Real Good works with people and organisations bringing knowledge, ideas, experience, resources, reach and practical capabilities that could become more useful together."
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
          <p className="eyebrow">Partnership approach</p>
          <h2>Start with what each side can contribute.</h2>
          <p className="lead mx-auto">
            Useful partnerships do not require every organisation to do the same thing.
          </p>
          <p className="lead mx-auto">They work when complementary capabilities are clear.</p>
          <p className="lead mx-auto">
            We are interested in collaborations that create practical value while also building
            knowledge, relationships and capability that can support future work.
          </p>
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
