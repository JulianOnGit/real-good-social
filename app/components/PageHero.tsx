import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

/** Consistent page-header band used on interior pages. */
export default function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container container-narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
