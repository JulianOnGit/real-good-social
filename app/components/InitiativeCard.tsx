import { Link } from 'react-router';
import type { Initiative } from '../data/initiatives';
import StageBadge from './StageBadge';

interface InitiativeCardProps {
  initiative: Initiative;
  /**
   * `feature` is the quieter editorial treatment used for the home page's
   * featured set: category and status as plain text, no divider or badges.
   */
  variant?: 'default' | 'feature';
}

export default function InitiativeCard({ initiative, variant = 'default' }: InitiativeCardProps) {
  const feature = variant === 'feature';

  return (
    <article
      className={`card card--interactive initiative-card ${feature ? 'initiative-card--feature' : ''}`}
    >
      {feature ? (
        <p className="initiative-card__meta">
          <span className="initiative-card__category">{initiative.area}</span>
          <span className="initiative-card__status">
            <span className="visually-hidden">Development stage: </span>
            {initiative.stages.join(' · ')}
          </span>
        </p>
      ) : (
        <div className="initiative-card__top">
          <span className="label">{initiative.area}</span>
          <span className="initiative-card__stages">
            {initiative.stages.map((s) => (
              <StageBadge key={s} stage={s} />
            ))}
          </span>
        </div>
      )}
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
