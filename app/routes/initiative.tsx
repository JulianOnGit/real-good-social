import { Link, data } from 'react-router';
import type { Route } from './+types/initiative';
import StageBadge from '../components/StageBadge';
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
      <section className="page-hero">
        <div className="container container-narrow">
          <p className="breadcrumb">
            <Link to="/initiatives">Initiatives</Link>
            <span aria-hidden="true"> / </span>
            {initiative.name}
          </p>
          <div className="initiative-detail__head">
            <span className="label">{initiative.area}</span>
            <span className="initiative-detail__stages">
              {initiative.stages.map((s) => (
                <StageBadge key={s} stage={s} />
              ))}
            </span>
          </div>
          <h1>{initiative.name}</h1>
          <p className="lead">{initiative.tagline}</p>
        </div>
      </section>

      <section className="section section--surface">
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
