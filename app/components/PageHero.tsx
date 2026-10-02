import type { ReactNode } from 'react';
import { Link } from 'react-router';

interface PageHeroProps {
  eyebrow: string;
  /** Makes the eyebrow a link back to a parent page (used on detail pages). */
  eyebrowTo?: string;
  title: string;
  lead?: string;
  /** `article` sets a smaller headline, for long-form titles. */
  variant?: 'page' | 'article';
  children?: ReactNode;
}

/** The page header on every interior page. */
export default function PageHero({
  eyebrow,
  eyebrowTo,
  title,
  lead,
  variant = 'page',
  children,
}: PageHeroProps) {
  return (
    <section className={variant === 'article' ? 'page-hero page-hero--article' : 'page-hero'}>
      <div className="container container-narrow">
        <p className="eyebrow">{eyebrowTo ? <Link to={eyebrowTo}>{eyebrow}</Link> : eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
