// Services Real Good offers directly to individuals. Each has its own page
// under /services; the services index and the What We Do page list them from
// here, so a new entry appears in both.

export interface Service {
  slug: string;
  name: string;
  /** Card text wherever the service is listed. */
  summary: string;
  /** Card link label. */
  cardLink: string;
  /**
   * Whether search engines may list the service's page. `false` marks the page
   * `noindex` and leaves it out of sitemap.xml; it stays public, linked from
   * the site and shareable by direct link.
   */
  indexable: boolean;
}

export const services: Service[] = [
  {
    slug: 'pathways-support',
    name: 'Pathways Support',
    summary:
      'Personalised help to understand your situation, explore possibilities and find practical ways forward.',
    cardLink: 'Learn about Pathways Support',
    // INTERIM POLICY (set October 2026): Pathways Support is in its introductory
    // period and is shared by direct link and from within the site, not through
    // search. Set this to `true` when Real Good is ready for it to be found in
    // search engines — nothing else needs to change.
    indexable: false,
  },
];

/**
 * The services index is listed in search only once it has an indexable service
 * to show; until then it would just be another route to an unlisted page.
 */
export const servicesIndexable = services.some((s) => s.indexable);

export const servicePath = (slug: string) => `/services/${slug}`;
