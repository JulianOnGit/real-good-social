import { Link } from 'react-router';
import type { Initiative } from '../data/initiatives';
import StageBadge from './StageBadge';

export default function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <article className="card card--interactive initiative-card">
      <div className="initiative-card__top">
        <span className="label">{initiative.area}</span>
        <span className="initiative-card__stages">
          {initiative.stages.map((s) => (
            <StageBadge key={s} stage={s} />
          ))}
        </span>
      </div>
      <h3>
        <Link to={`/initiatives/${initiative.slug}`} className="initiative-card__title-link">
          {initiative.name}
        </Link>
      </h3>
      <p className="muted">{initiative.summary}</p>
      <Link to={`/initiatives/${initiative.slug}`} className="text-link">
        {initiative.cardLink}
      </Link>
    </article>
  );
}
