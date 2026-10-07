import { Link, data } from 'react-router';
import type { Route } from './+types/initiative';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import Stages from '../components/Stages';
import CtaBand from '../components/CtaBand';
import { Sections } from '../components/Blocks';
import { getInitiative } from '../data/initiatives';

export async function loader({ params }: Route.LoaderArgs) {
  const initiative = getInitiative(params.slug);
  if (!initiative) {
    throw data('Initiative not found', { status: 404 });
  }
  return { initiative };
}

export function meta({ data: loaded, location }: Route.MetaArgs) {
  if (!loaded?.initiative) return [{ title: 'Initiative — Real Good Social' }];
  return pageMeta({
    title: `${loaded.initiative.name} — Real Good Social`,
    description: loaded.initiative.summary,
    pathname: location.pathname,
  });
}

export default function InitiativeDetail({ loaderData }: Route.ComponentProps) {
  const { initiative } = loaderData;

  return (
    <>
      <PageHero
        eyebrow="Initiatives"
        eyebrowTo="/initiatives"
        title={initiative.name}
        lead={initiative.tagline}
      >
        <dl className="facts">
          <div>
            <dt className="label">Area</dt>
            <dd>{initiative.area}</dd>
          </div>
          <div>
            <dt className="label">Stage</dt>
            <dd>
              <Stages stages={initiative.stages} />
            </dd>
          </div>
          {initiative.location && (
            <div>
              <dt className="label">Founding location</dt>
              <dd>{initiative.location}</dd>
            </div>
          )}
        </dl>
      </PageHero>

      <section className="section">
        <div className="container container-narrow prose">
          <Sections sections={initiative.sections} />

          {initiative.related && (
            <aside className="callout callout--question">
              <p className="callout__text">{initiative.related.text}</p>
              <Link to={initiative.related.to} className="text-link">
                {initiative.related.label}
              </Link>
            </aside>
          )}

          <p className="section-foot">
            <Link to="/initiatives" className="text-link">
              Back to all initiatives
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
