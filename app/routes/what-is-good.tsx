import { Link } from 'react-router';
import type { Route } from './+types/what-is-good';
import { canonicalUrl, pageMeta, shareImageUrl, SITE_URL } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import { headingId, paper, paperHasText, paperIsoDate } from '../data/paper';

export function meta({ location }: Route.MetaArgs) {
  const url = canonicalUrl(location.pathname);
  return [
    ...pageMeta({
      title: paper.seoTitle,
      description: paper.description,
      pathname: location.pathname,
      type: 'article',
      index: paperHasText,
    }),
    { name: 'author', content: paper.author },
    ...(paperIsoDate ? [{ property: 'article:published_time', content: paperIsoDate }] : []),
    ...(paperHasText
      ? [
          {
            'script:ld+json': {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: paper.title,
              alternativeHeadline: paper.subtitle,
              url,
              mainEntityOfPage: url,
              image: shareImageUrl(location.pathname),
              description: paper.description,
              version: paper.version,
              creativeWorkStatus: paper.status,
              inLanguage: 'en-AU',
              author: { '@type': 'Person', name: paper.author },
              publisher: { '@type': 'Organization', name: paper.publisher, url: `${SITE_URL}/` },
              ...(paperIsoDate && { datePublished: paperIsoDate }),
            },
          },
        ]
      : []),
  ];
}

export default function WhatIsGood() {
  return (
    <>
      {/* The link-preview card is built from this header's eyebrow, h1 and lead. */}
      <PageHero
        eyebrow="Foundational working paper"
        eyebrowTo="/about#what-we-mean-by-good"
        title={paper.title}
        lead={paper.subtitle}
        variant="article"
      >
        <dl className="facts">
          <div>
            <dt className="label">Author</dt>
            <dd>{paper.author}</dd>
          </div>
          <div>
            <dt className="label">Publisher</dt>
            <dd>{paper.publisher}</dd>
          </div>
          <div>
            <dt className="label">Version</dt>
            <dd>{paper.version}</dd>
          </div>
          <div>
            <dt className="label">Published</dt>
            <dd>
              <time dateTime={paperIsoDate}>{paper.date}</time>
            </dd>
          </div>
          <div>
            <dt className="label">Status</dt>
            <dd>{paper.status}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="section">
        <div className={paperHasText ? 'container split' : 'container container-narrow'}>
          {paperHasText && (
            <nav className="split__aside paper-contents" aria-labelledby="paper-contents">
              <h2 className="label" id="paper-contents">
                Contents
              </h2>
              <ol>
                {paper.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${headingId(section.heading)}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article className="split__body prose article-body" data-accent="blue">
            {!paperHasText && <p>The text of this working paper is being prepared for publication.</p>}

            {paper.sections.map((section) => (
              <section
                key={section.heading}
                id={headingId(section.heading)}
                aria-labelledby={`${headingId(section.heading)}-heading`}
              >
                <h2 id={`${headingId(section.heading)}-heading`}>{section.heading}</h2>
                <Blocks blocks={section.blocks} />
                {section.subsections?.map((sub) => (
                  <section
                    key={sub.heading}
                    id={headingId(sub.heading)}
                    aria-labelledby={`${headingId(sub.heading)}-heading`}
                  >
                    <h3 id={`${headingId(sub.heading)}-heading`}>{sub.heading}</h3>
                    <Blocks blocks={sub.blocks} />
                  </section>
                ))}
              </section>
            ))}

            <footer className="article-end">
              <p className="meta">
                This is a working paper. It sets out Real Good’s current thinking and is open to
                revision; its proposals are not operating policy unless separately adopted.
              </p>
              <p className="section-foot">
                <Link to="/about#what-we-mean-by-good" className="text-link">
                  What we mean by good
                </Link>
              </p>
            </footer>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
