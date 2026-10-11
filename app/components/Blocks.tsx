import { Fragment } from 'react';
import type { Block, Diagram, Section } from '../data/content';
import { Glyph, Sketch } from './ArticleSketch';

const EMAIL = /([^\s@]+@[^\s@]+\.[a-z]+)/i;
const EMPHASIS = /(\*\*[^*]+\*\*|\*[^*]+\*)/;

/** Plain text with any email address made a mailto link. */
function Linked({ text }: { text: string }) {
  return (
    <>
      {text.split(EMAIL).map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={`mailto:${part}`}>
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** A line of text with `**bold**` and `*italic*` applied. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(EMPHASIS).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Linked key={i} text={part} />;
      })}
    </>
  );
}

/** Text with line breaks and inline emphasis. */
export function Text({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Inline text={line} />
        </Fragment>
      ))}
    </>
  );
}

/**
 * A simple figure: numbered points along a line, or parts side by side. Drawn
 * with lists and CSS, so it reads in order without any image.
 */
function DiagramFigure({ diagram, parts, caption }: Diagram) {
  return (
    <figure className={`diagram diagram--${diagram}`}>
      {diagram === 'sequence' ? (
        <ol className="diagram__parts">
          {parts.map((part, i) => (
            <li key={part.title}>
              <span className="diagram__num" aria-hidden="true">
                {i + 1}
              </span>
              <span className="diagram__title">{part.title}</span>
              {part.text && <span className="diagram__text">{part.text}</span>}
            </li>
          ))}
        </ol>
      ) : (
        <dl className="diagram__parts">
          {parts.map((part) => (
            <div key={part.title}>
              {part.glyph && <Glyph name={part.glyph} />}
              <dt className="diagram__title">{part.title}</dt>
              {part.text && <dd className="diagram__text">{part.text}</dd>}
            </div>
          ))}
        </dl>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Renders blocks of copy as paragraphs, lists, callouts, highlights, diagrams and sketches. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (typeof block === 'string') {
          return (
            <p key={i}>
              <Text text={block} />
            </p>
          );
        }
        if ('list' in block) {
          return (
            <ul key={i}>
              {block.list.map((item) => (
                <li key={item}>
                  <Text text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if ('items' in block) {
          return (
            <dl key={i} className="titled-items">
              {block.items.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>
                    <Text text={item.text} />
                  </dd>
                </div>
              ))}
            </dl>
          );
        }
        if ('highlight' in block) {
          return (
            <p key={i} className="highlight">
              <Text text={block.highlight} />
            </p>
          );
        }
        if ('sketch' in block) {
          return (
            <figure key={i} className="sketch">
              <div className="sketch__art">
                <Sketch name={block.sketch} />
              </div>
              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }
        if ('diagram' in block) {
          return <DiagramFigure key={i} {...block} />;
        }
        return (
          <aside key={i} className="callout callout--question">
            {block.label && <p className="label">{block.label}</p>}
            <p className="callout__text">
              <Text text={block.callout} />
            </p>
          </aside>
        );
      })}
    </>
  );
}

/** Renders sections, each with an optional heading (`<h2>` by default). */
export function Sections({ sections, level = 2 }: { sections: Section[]; level?: 2 | 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <>
      {sections.map((section, i) => (
        <Fragment key={i}>
          {section.heading && <Heading>{section.heading}</Heading>}
          <Blocks blocks={section.blocks} />
        </Fragment>
      ))}
    </>
  );
}
