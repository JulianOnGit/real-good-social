import { useEffect, useRef, useState } from 'react';
import { Link, data } from 'react-router';
import type { Route } from './+types/publication';
import { canonicalUrl, pageMeta, shareImageUrl, SITE_URL } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { Blocks } from '../components/Blocks';
import {
  getPaper,
  INTRODUCTION_PATH,
  paperIsoDate,
  paperContents,
  paperMinutes,
  paperPath,
  PUBLICATIONS_PATH,
  type Paper,
  type PaperSection,
} from '../data/paper';

// Only the slug is passed on: the paper's text is already in the page's code.
export async function loader({ params }: Route.LoaderArgs) {
  const paper = getPaper(params.slug);
  if (!paper) {
    throw data('Publication not found', { status: 404 });
  }
  return { slug: paper.slug };
}

export function meta({ data: loaded, location }: Route.MetaArgs) {
  const paper = getPaper(loaded?.slug);
  if (!paper) return [{ title: 'Publication — Real Good Social' }];
  const url = canonicalUrl(location.pathname);
  const published = paperIsoDate(paper);
  return [
    ...pageMeta({ ...paper.seo, pathname: location.pathname, type: 'article' }),
    { name: 'author', content: paper.author },
    ...(published ? [{ property: 'article:published_time', content: published }] : []),
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: paper.title,
        alternativeHeadline: paper.subtitle,
        url,
        mainEntityOfPage: url,
        image: shareImageUrl(location.pathname),
        description: paper.seo.description,
        version: paper.version,
        creativeWorkStatus: paper.status,
        inLanguage: 'en-AU',
        author: { '@type': 'Person', name: paper.author },
        publisher: { '@type': 'Organization', name: paper.publisher, url: `${SITE_URL}/` },
        ...(published && { datePublished: published }),
      },
    },
  ];
}

/** How far below the sticky header a part's heading must rise to count as being read. */
const READING_LINE = 80;

/**
 * Follows the reader through the paper: returns the part now being read (none
 * above the first), and keeps `--progress` on the article's section at the
 * fraction of the text already above the reading line.
 */
function useReadingPosition(paper: Paper) {
  const field = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = field.current?.querySelector('article');
      if (!field.current || !article) return;
      const header = document.querySelector<HTMLElement>('.site-header');
      const line = (header?.offsetHeight ?? 0) + READING_LINE;

      let reading: string | null = null;
      for (const section of paper.sections) {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        if (top === undefined || top > line) break;
        reading = section.id;
      }
      setCurrent(reading);

      const { top, height } = article.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (line - top) / height));
      field.current.style.setProperty('--progress', progress.toFixed(4));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [paper]);

  return { field, current };
}

/** The width from which the contents list is held beside the text (see `.split`). */
const BESIDE_TEXT = '(min-width: 900px)';

/**
 * The contents list. A paper divided into parts shows one part's chapters at a
 * time, the part being read, so the list stays short enough to sit beside the
 * text; any part can be opened or closed by hand.
 */
function Contents({
  paper,
  current,
  overlay = false,
  onNavigate,
}: {
  paper: Paper;
  current: string | null;
  /** The list lies over the page, in the panel beneath the reading strip. */
  overlay?: boolean;
  /** Called when the reader chooses a section. */
  onNavigate?: () => void;
}) {
  const entries = paperContents(paper);
  const reading = entries.findIndex(
    (entry) => 'chapters' in entry && entry.chapters.some((chapter) => chapter.id === current),
  );
  const [open, setOpen] = useState(-1);
  // Follow the reader into each new part, leaving a part opened by hand alone
  // until then. Only where the list takes no room in the page, over it or held
  // beside the text: on narrow screens the list in the page lies above the
  // text, and a change in its height there would move the page under the
  // reader, and with it the part being read, back and forth.
  useEffect(() => {
    if (reading >= 0 && (overlay || window.matchMedia(BESIDE_TEXT).matches)) setOpen(reading);
  }, [reading, overlay]);

  const link = (section: PaperSection) => (
    // A router link: a plain anchor makes a history entry the router doesn't
    // know, and it answers by restoring the old scroll position.
    <Link
      to={`#${section.id}`}
      aria-current={section.id === current || undefined}
      onClick={onNavigate}
    >
      <span className="paper-contents__num">{section.number}</span>
      {section.title}
    </Link>
  );

  return (
    <ol>
      {entries.map((entry, i) =>
        'chapters' in entry ? (
          <li key={entry.part.numeral}>
            <details open={open === i} data-reading={reading === i || undefined}>
              {/* Opened here, not by the browser: left to itself it shows the new
                  part a frame before the old one closes, and the list jumps. */}
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setOpen((was) => (was === i ? -1 : i));
                }}
              >
                <span className="paper-contents__num">{entry.part.numeral}</span>
                <span>
                  <span className="visually-hidden">Part {entry.part.numeral}: </span>
                  {entry.part.title}
                </span>
              </summary>
              <ol>
                {entry.chapters.map((chapter) => (
                  <li key={chapter.id}>{link(chapter)}</li>
                ))}
              </ol>
            </details>
          </li>
        ) : (
          <li key={entry.id}>{link(entry)}</li>
        ),
      )}
    </ol>
  );
}

/**
 * Where a reader of this paper might go next: its successor or the
 * introduction, then the other papers. `brief` leaves the last out, beside the
 * contents, where room is short.
 */
function RelatedLinks({ paper, brief = false }: { paper: Paper; brief?: boolean }) {
  const successor = getPaper(paper.supersededBy);
  return (
    <>
      {successor ? (
        <Link to={paperPath(successor.slug)} className="text-link">
          Read the current paper
        </Link>
      ) : (
        <Link to={INTRODUCTION_PATH} className="text-link">
          What is good? An introduction
        </Link>
      )}
      {!brief && (
        <Link to={PUBLICATIONS_PATH} className="text-link">
          All publications
        </Link>
      )}
    </>
  );
}

export default function Publication({ loaderData }: Route.ComponentProps) {
  // The loader has already turned away any slug without a paper.
  const paper = getPaper(loaderData.slug)!;
  const successor = getPaper(paper.supersededBy);
  const pdfHref = `${import.meta.env.BASE_URL}${paper.pdf}`;
  const { field, current } = useReadingPosition(paper);
  const reading = paper.sections.find((section) => section.id === current);

  // The contents panel beneath the reading strip. It closes with the strip, at
  // the top of the paper, and on Escape.
  const [panelOpen, setPanelOpen] = useState(false);
  const stripShown = Boolean(reading);
  useEffect(() => {
    if (!stripShown) setPanelOpen(false);
  }, [stripShown]);
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelOpen]);

  return (
    <>
      {/* The link-preview card is built from this header's eyebrow, h1 and lead. */}
      <PageHero
        eyebrow={paper.status}
        eyebrowTo={PUBLICATIONS_PATH}
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
              <time dateTime={paperIsoDate(paper)}>{paper.date}</time>
            </dd>
          </div>
          <div>
            <dt className="label">Status</dt>
            <dd>{paper.status}</dd>
          </div>
          <div>
            <dt className="label">Reading time</dt>
            <dd>{paperMinutes(paper)} min</dd>
          </div>
        </dl>

        {successor && (
          <aside className="callout callout--question paper-notice" aria-labelledby="paper-notice">
            <p className="label" id="paper-notice">
              Editorial notice
            </p>
            <p>
              This paper represents an earlier development of Real Good’s philosophy of good. Its
              treatment of flourishing and generative good has since been incorporated into a
              broader philosophical framework. Readers are encouraged to consult{' '}
              <Link to={paperPath(successor.slug)}>
                <em>{successor.title}</em> (Version {successor.version})
              </Link>{' '}
              for the current foundational account.
            </p>
          </aside>
        )}
      </PageHero>

      <section className="section paper" ref={field}>
        {/* On narrow screens the contents list scrolls away, so the part being
            read is named in a strip beneath the header instead. */}
        <div className="paper-position" data-shown={reading ? '' : undefined}>
          <div className="container paper-position__bar">
            <p className="paper-position__part">
              {reading?.number && <span className="paper-contents__num">{reading.number}</span>}
              <span className="paper-position__title">{reading?.title}</span>
            </p>
            <button
              type="button"
              className="paper-position__toggle"
              aria-expanded={panelOpen}
              aria-controls="paper-position-contents"
              onClick={() => setPanelOpen((was) => !was)}
            >
              {panelOpen ? 'Close' : 'Contents'}
            </button>
          </div>
          {/* The contents open beneath the strip, over the text, so the reader
              keeps their place; choosing a section or touching the page closes them. */}
          {panelOpen && (
            <>
              <div className="paper-position__scrim" onClick={() => setPanelOpen(false)} />
              <nav
                className="paper-position__panel paper-contents"
                id="paper-position-contents"
                aria-label="Contents"
              >
                <div className="container">
                  <Contents
                    paper={paper}
                    current={current}
                    overlay
                    onNavigate={() => setPanelOpen(false)}
                  />
                </div>
              </nav>
            </>
          )}
        </div>

        <div className="container split">
          <nav
            className="split__aside paper-contents"
            id="contents"
            aria-labelledby="paper-contents"
          >
            <h2 className="label" id="paper-contents">
              Contents
            </h2>
            <Contents paper={paper} current={current} />
            <div className="paper-contents__links">
              <a href={pdfHref} className="text-link">
                Download the PDF
              </a>
              <RelatedLinks paper={paper} brief />
            </div>
          </nav>

          <article className="split__body prose article-body paper-body" data-accent="blue">
            {paper.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                {section.part && (
                  <p className="label paper-body__part">
                    Part {section.part.numeral} · {section.part.title}
                  </p>
                )}
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

            <footer className="article-end paper-end">
              <a href={pdfHref} className="text-link">
                Download the PDF
              </a>
              <RelatedLinks paper={paper} />
            </footer>
          </article>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
