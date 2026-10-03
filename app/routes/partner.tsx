import { Link } from 'react-router';
import type { Route } from './+types/partner';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import InitiativeCard from '../components/InitiativeCard';
import { initiatives } from '../data/initiatives';
import type { CategoryValue } from '../data/contact';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Work With Us — Real Good Social',
    description:
      'Work with Real Good Social: share a problem, propose a partnership, contribute expertise or support an initiative.',
    pathname: location.pathname,
  });
}

/**
 * The page is organised by what a visitor can do, not who they are. Each way
 * opens the contact form on its own enquiry topic; the audience names match
 * the home page's "Who we work with".
 */
const WAYS: {
  title: string;
  body: string;
  suitedTo: string[];
  cta: string;
  purpose: CategoryValue;
}[] = [
  {
    title: 'Share a problem or opportunity',
    body: 'Bring a situation you are close to — a gap in support, a community need, or an idea that hasn’t found a home. We’ll look at it with you and see whether there is a practical response we could build together.',
    suitedTo: ['Community organisations', 'Government & institutions', 'Contributors & community members'],
    cta: 'Share a problem',
    purpose: 'project',
  },
  {
    title: 'Propose a partnership',
    body: 'Collaborate on a pilot, programme, service or piece of shared infrastructure, with clear roles on both sides.',
    suitedTo: ['Community organisations', 'Government & institutions', 'Researchers & specialists'],
    cta: 'Propose a partnership',
    purpose: 'partnership',
  },
  {
    title: 'Contribute expertise',
    body: 'Lend knowledge or skills: research and evaluation, design, technology, operations, communications, or lived experience of the problem.',
    suitedTo: ['Researchers & specialists', 'Builders & practitioners', 'Contributors & community members'],
    cta: 'Offer expertise',
    purpose: 'contributing',
  },
  {
    title: 'Support an initiative',
    body: 'Back a specific piece of work through funding, sponsorship, resources, introductions or strategic advice.',
    suitedTo: ['Funders & supporters', 'Government & institutions'],
    cta: 'Support an initiative',
    purpose: 'funding',
  },
];

const NEXT_STEPS = [
  {
    n: '01',
    title: 'A first conversation',
    body: 'Tell us what you have in mind. We’ll reply personally and find a time to talk it through.',
  },
  {
    n: '02',
    title: 'Shaping it together',
    body: 'We work out whether there is a good fit, what each side brings, and what a sensible first step looks like.',
  },
  {
    n: '03',
    title: 'Building momentum',
    body: 'We move quickly to something concrete — a pilot, a piece of research, the right introduction — then build on what works until it becomes lasting capability.',
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ways to work together</p>
            <h2>Choose a starting point.</h2>
          </div>
          <ul className="ruled-grid ruled-grid--2 ruled-grid--roomy">
            {WAYS.map((w) => (
              <li key={w.title} className="way">
                <h3>{w.title}</h3>
                <p className="muted">{w.body}</p>
                <p className="meta">
                  <span className="way__suited">Suited to</span> {w.suitedTo.join(' · ')}
                </p>
                <Link to={`/contact?purpose=${w.purpose}`} className="text-link">
                  {w.cta}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <p className="eyebrow">Where help is needed</p>
              <h2>Initiatives open to partners</h2>
            </div>
            <Link to="/initiatives" className="text-link">
              View all initiatives
            </Link>
          </div>
          <ul className="ruled-grid ruled-grid--3">
            {initiatives.map((i) => (
              <li key={i.slug}>
                <InitiativeCard initiative={i} compact />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split__aside">
            <p className="eyebrow">What happens next</p>
            <h2>From a conversation to shared work</h2>
          </div>
          <ol className="ruled-list ruled-list--numbered">
            {NEXT_STEPS.map((step) => (
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

      <CtaBand
        title="Not sure which fits?"
        lead="Start with a conversation and we’ll work it out together."
        primary={{ to: '/contact', label: 'Start a conversation' }}
        secondary={null}
      />
    </>
  );
}
