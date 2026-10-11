import { Link, data } from 'react-router';
import type { Route } from './+types/insight';
import { canonicalUrl, pageMeta, shareImageUrl, SITE_NAME, SITE_URL } from '../data/seo';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import InsightIllustration from '../components/InsightIllustration';
import { InsightByline, RelatedInsights } from '../components/InsightMeta';
import {
  getInsight,
  insightAccent,
  insightAuthor,
  insightSummary,
  isoDate,
  PUBLICATION,
  relatedInsights,
} from '../data/insights';

export async function loader({ params }: Route.LoaderArgs) {
  const insight = getInsight(params.slug);
  if (!insight) {
    throw data('Insight not found', { status: 404 });
  }
  return { insight };
}

export function meta({ data: loaded, location }: Route.MetaArgs) {
  if (!loaded?.insight) return [{ title: 'Insight — Real Good Social' }];
  const { insight } = loaded;
  const author = insightAuthor(insight);
  const published = insight.date && isoDate(insight.date);
  const modified = insight.updated && isoDate(insight.updated);
  const url = canonicalUrl(location.pathname);
  return [
    ...pageMeta({
      title: `${insight.title} — Real Good Social`,
      description: insightSummary(insight),
      pathname: location.pathname,
      type: 'article',
    }),
    { name: 'author', content: author.name },
    ...(published ? [{ property: 'article:published_time', content: published }] : []),
    ...(modified ? [{ property: 'article:modified_time', content: modified }] : []),
    { property: 'article:section', content: insight.category },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: insight.title,
        url,
        mainEntityOfPage: url,
        image: shareImageUrl(location.pathname),
        description: insightSummary(insight),
        articleSection: insight.category,
        author: { '@type': 'Person', name: author.name, jobTitle: author.role },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
        isPartOf: { '@type': 'Blog', name: PUBLICATION },
        ...(published && { datePublished: published }),
        ...(modified && { dateModified: modified }),
      },
    },
  ];
}

export default function InsightDetail({ loaderData }: Route.ComponentProps) {
  const { insight } = loaderData;

  return (
    <>
      {/* The link-preview cards are built from this header's eyebrow, h1 and byline. */}
      <section className="page-hero page-hero--article">
        <div className="container article-hero">
          <div className="article-hero__text">
            <p className="eyebrow">
              <Link to="/insights">{PUBLICATION}</Link>
            </p>
            <h1>{insight.title}</h1>
            <InsightByline insight={insight} />
          </div>
          <InsightIllustration insight={insight} className="article-hero__art" eager />
        </div>
      </section>

      <section className="section">
        <article
          className="container container-narrow prose article-body"
          data-accent={insightAccent(insight)}
        >
          <Blocks blocks={insight.body} />

          <footer className="article-end">
            <p className="meta">
              {PUBLICATION} explores questions, observations and working models that emerge from
              our projects and research. We use these ideas to sharpen how we understand problems,
              design interventions and learn from practice. Where the evidence is still developing,
              we present the thinking as provisional and open to refinement.
            </p>
            <p className="section-foot">
              <Link to="/insights" className="text-link">
                Back to all insights
              </Link>
            </p>
          </footer>
        </article>
      </section>

      <RelatedInsights insights={relatedInsights(insight.slug)} />

      <CtaBand />
    </>
  );
}
