import { Fragment } from 'react';
import type { Block, Section } from '../data/content';

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

/** Renders blocks of copy as paragraphs, lists and callouts. */
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
