import { Link } from 'react-router';
import type { Route } from './+types/services';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import { services, servicePath, servicesIndexable } from '../data/services';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Services — Real Good Social',
    description:
      'Services Real Good offers directly to individuals, starting with Pathways Support: personalised, practical help to find a way forward.',
    pathname: location.pathname,
    index: servicesIndexable,
  });
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support for individuals."
        lead="Alongside our wider work, Real Good offers a small number of services directly to people."
      />

      <section className="section">
        <div className="container">
          <ul className="ruled-grid ruled-grid--2 ruled-grid--roomy">
            {services.map((s) => (
              <li key={s.slug} className="way">
                <h2>
                  <Link to={servicePath(s.slug)} className="plain-link">
                    {s.name}
                  </Link>
                </h2>
                <p className="muted">{s.summary}</p>
                <Link to={servicePath(s.slug)} className="text-link">
                  {s.cardLink}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
