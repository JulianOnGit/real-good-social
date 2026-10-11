import type { ReactNode } from 'react';
import { Link } from 'react-router';
import InsightIllustration from './InsightIllustration';
import {
  insightAccent,
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

interface InsightCardProps {
  insight: Insight;
  /** Heading level for the title, to fit the page outline. */
  level?: 2 | 3;
  /** The one insight given more room at the top of the listing. */
  featured?: boolean;
  /** Picture, category and title only, for lists that point onwards. */
  compact?: boolean;
}

/**
 * An insight in a grid: picture, category, title, summary, date and length.
 * The whole card is the link, through the title.
 */
export function InsightCard({ insight, level = 2, featured = false, compact = false }: InsightCardProps) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <article
      className={featured ? 'insight-card insight-card--featured' : 'insight-card'}
      data-accent={insightAccent(insight)}
    >
      <InsightIllustration insight={insight} className="insight-card__art" eager={featured} />
      <div className="insight-card__text">
        <p className="label">
          <Dotted parts={[featured && 'Latest', insight.category]} />
        </p>
        <Heading>
          <Link to={`/insights/${insight.slug}`} className="insight-card__link">
            {insight.title}
          </Link>
        </Heading>
        {!compact && (
          <p className="muted insight-card__summary">
            {(featured && insight.standfirst) || insightSummary(insight)}
          </p>
        )}
        <p className="meta">
          <Dotted parts={dateAndLength(insight)} />
        </p>
      </div>
    </article>
  );
}

/** Other insights to go on to, at the foot of an article. */
export function RelatedInsights({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;
  return (
    <section className="section section--alt" aria-labelledby="related-insights">
      <div className="container">
        <div className="section-head section-head--row related-head">
          <h2 id="related-insights">More insights</h2>
          <Link to="/insights" className="text-link">
            All insights
          </Link>
        </div>
        <ul className="insight-grid">
          {insights.map((i) => (
            <li key={i.slug}>
              <InsightCard insight={i} level={3} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
