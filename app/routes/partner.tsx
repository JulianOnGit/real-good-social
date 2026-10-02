import { Link } from 'react-router';
import type { Route } from './+types/partner';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

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
    body: 'Develop programmes, strengthen community capability or collaborate around shared opportunities.',
    cta: 'Explore collaboration',
  },
  {
    title: 'Government & institutions',
    body: 'Work with us on community participation, social infrastructure, programme design, technology and organisational capability.',
    cta: 'Explore institutional collaboration',
  },
  {
    title: 'Researchers & specialists',
    body: 'Contribute evidence, evaluation, specialist knowledge or research collaboration.',
    cta: 'Contribute expertise',
  },
  {
    title: 'Builders & contributors',
    body: 'Help create technology, programmes, communities and new initiatives.',
    cta: 'Get involved',
  },
  {
    title: 'Funders & supporters',
    body: 'Support the work through funding, sponsorship, resources, introductions or commissioned delivery.',
    cta: 'Support the work',
  },
];

export default function Partner() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Create more capacity for good."
        lead="We work with people and organisations that can contribute something useful — expertise, reach, resources, ideas or practical capability."
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

      <CtaBand title="What could we build together?" lead={null} />
    </>
  );
}
