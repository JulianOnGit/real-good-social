import { Link } from 'react-router';
import type { Route } from './+types/what-is-good';
import { canonicalUrl, pageMeta, shareImageUrl, SITE_URL } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import { paper, paperIsoDate, PAPER_PDF, PAPER_SEO, PAPER_STATUS } from '../data/paper';

export function meta({ location }: Route.MetaArgs) {
  const url = canonicalUrl(location.pathname);
  return [
    ...pageMeta({ ...PAPER_SEO, pathname: location.pathname, type: 'article' }),
    { name: 'author', content: paper.author },
    ...(paperIsoDate ? [{ property: 'article:published_time', content: paperIsoDate }] : []),
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: paper.title,
        alternativeHeadline: paper.subtitle,
        url,
        mainEntityOfPage: url,
        image: shareImageUrl(location.pathname),
        description: PAPER_SEO.description,
        version: paper.version,
        creativeWorkStatus: PAPER_STATUS,
        inLanguage: 'en-AU',
        author: { '@type': 'Person', name: paper.author },
        publisher: { '@type': 'Organization', name: paper.publisher, url: `${SITE_URL}/` },
        ...(paperIsoDate && { datePublished: paperIsoDate }),
      },
    },
  ];
}

export default function WhatIsGood() {
  const pdfHref = `${import.meta.env.BASE_URL}${PAPER_PDF}`;

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
            <dd>{PAPER_STATUS}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="section">
        <div className="container split">
          <nav className="split__aside paper-contents" aria-labelledby="paper-contents">
            <h2 className="label" id="paper-contents">
              Contents
            </h2>
            <ol>
              {paper.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="paper-contents__num">{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <a href={pdfHref} className="text-link paper-contents__pdf">
              Download the PDF
            </a>
          </nav>

          <article className="split__body prose article-body paper-body" data-accent="blue">
            {paper.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`}>
                  {section.number && <span className="paper-body__num">{section.number}</span>}
                  {section.title}
                </h2>
                <Blocks blocks={section.blocks} />
                {section.subsections.map((sub) => (
                  <section key={sub.id} id={sub.id} aria-labelledby={`${sub.id}-heading`}>
                    <h3 id={`${sub.id}-heading`}>
                      <span className="paper-body__num">{sub.number}</span>
                      {sub.title}
                    </h3>
                    <Blocks blocks={sub.blocks} />
                  </section>
                ))}
              </section>
            ))}

            <footer className="article-end">
              <p className="section-foot">
                <a href={pdfHref} className="text-link">
                  Download the PDF
                </a>
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
