import { Link, data } from 'react-router';
import type { Route } from './+types/initiative';
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

export function meta({ data: loaded }: Route.MetaArgs) {
  if (!loaded?.initiative) return [{ title: 'Initiative — Real Good Social' }];
  return [
    { title: `${loaded.initiative.name} — Real Good Social` },
    { name: 'description', content: loaded.initiative.summary },
  ];
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
