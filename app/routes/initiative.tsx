import { Link, data } from 'react-router';
import type { Route } from './+types/initiative';
import StageBadge from '../components/StageBadge';
import CtaBand from '../components/CtaBand';
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
            <StageBadge stage={initiative.stage} />
          </div>
          <h1>{initiative.name}</h1>
          <p className="lead">{initiative.summary}</p>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container container-narrow prose">
          <h2>The problem or opportunity</h2>
          <p>{initiative.problem}</p>

          <h2>Our proposed response</h2>
          <p>{initiative.response}</p>

          <h2>Intended beneficiaries</h2>
          <p>{initiative.beneficiaries}</p>

          <h2>Current activities</h2>
          <ul className="ticked">
            {initiative.currentActivities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="callout callout--seeking">
            <h3 className="mt-0">Collaborators and support we are seeking</h3>
            <ul>
              {initiative.seeking.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Link to="/partner" className="btn btn--sm">
              Propose a partnership
            </Link>
          </div>

          <div className="callout callout--milestone">
            <p className="label mt-0">Next meaningful milestone</p>
            <p className="statement" style={{ fontSize: '1.25rem' }}>
              {initiative.nextMilestone}
            </p>
          </div>

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
