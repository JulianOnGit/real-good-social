import { Fragment } from 'react';
import type { Block, Section } from '../data/content';

const EMAIL = /([^\s@]+@[^\s@]+\.[a-z]+)/i;

/** A line of text with any email address made a mailto link. */
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

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Linked text={line} />
        </Fragment>
      ))}
    </>
  );
}

/** Renders blocks of copy as paragraphs and lists. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (typeof block === 'string') {
          return (
            <p key={i}>
              <Lines text={block} />
            </p>
          );
        }
        if ('strong' in block) {
          return (
            <p key={i}>
              <strong>{block.strong}</strong>
            </p>
          );
        }
        return (
          <ul key={i}>
            {block.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

/** Renders sections, each with an optional `<h2>`. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <Fragment key={i}>
          {section.heading && <h2>{section.heading}</h2>}
          <Blocks blocks={section.blocks} />
        </Fragment>
      ))}
    </>
  );
}
