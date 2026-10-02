import type { ReactNode } from 'react';
import { Link } from 'react-router';
import {
  insightAuthor,
  insightSummary,
  isoDate,
  readingMinutes,
  type Insight,
} from '../data/insights';

function Time({ date }: { date: string }) {
  return <time dateTime={isoDate(date)}>{date}</time>;
}

/** Parts joined by middle dots; empty parts are skipped. */
function Dotted({ parts }: { parts: ReactNode[] }) {
  return (
    <>
      {parts.filter(Boolean).map((part, i) => (
        <span key={i}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          {part}
        </span>
      ))}
    </>
  );
}

function dateAndLength(insight: Insight) {
  return [insight.date && <Time date={insight.date} />, `${readingMinutes(insight)} min read`];
}

/** Byline beneath an article headline: author and role, then category, date and length. */
export function InsightByline({ insight }: { insight: Insight }) {
  const author = insightAuthor(insight);
  return (
    <div className="byline">
      <p>
        By <span className="byline__name">{author.name}</span>, {author.role}
      </p>
      <p>
        <Dotted parts={[insight.category, ...dateAndLength(insight)]} />
      </p>
      {insight.updated && (
        <p>
          Last updated <Time date={insight.updated} />
        </p>
      )}
    </div>
  );
}

interface InsightTeaserProps {
  insight: Insight;
  /** Heading level for the title, to fit the page outline. */
  level?: 2 | 3;
  /** Use the standfirst, set as a lead, where the teaser is featured. */
  featured?: boolean;
}

/**
 * An insight in a listing: category, title, byline, summary, link. The same
 * order as an initiative card.
 */
export function InsightTeaser({ insight, level = 2, featured = false }: InsightTeaserProps) {
  const Heading = level === 2 ? 'h2' : 'h3';
  const href = `/insights/${insight.slug}`;
  return (
    <article className="teaser">
      <p className="label">{insight.category}</p>
      <Heading>
        <Link to={href}>{insight.title}</Link>
      </Heading>
      <p className="meta">
        <Dotted parts={[`By ${insightAuthor(insight).name}`, ...dateAndLength(insight)]} />
      </p>
      <p className={featured ? 'lead' : 'muted teaser__summary'}>
        {(featured && insight.standfirst) || insightSummary(insight)}
      </p>
      <Link to={href} className="text-link">
        Read the insight
      </Link>
    </article>
  );
}
