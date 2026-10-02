import { Link } from 'react-router';
import type { Initiative } from '../data/initiatives';
import Stages from './Stages';

interface InitiativeCardProps {
  initiative: Initiative;
  /** Name, area and stage only — for lists where the initiative is a pointer, not the subject. */
  compact?: boolean;
}

/** One initiative in a ruled grid: area and stage, name, summary, link. */
export default function InitiativeCard({ initiative, compact = false }: InitiativeCardProps) {
  const href = `/initiatives/${initiative.slug}`;
  return (
    <article className="initiative-card">
      <div className="initiative-card__kicker">
        <span className="label">{initiative.area}</span>
        <Stages stages={initiative.stages} />
      </div>
      <h3>
        <Link to={href}>{initiative.name}</Link>
      </h3>
      {!compact && <p className="muted">{initiative.summary}</p>}
      <Link to={href} className="text-link">
        {initiative.cardLink}
      </Link>
    </article>
  );
}
