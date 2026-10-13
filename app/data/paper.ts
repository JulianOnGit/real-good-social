import type { Block } from './content';
import { isoDate } from './insights';
// The paper as its author wrote it. To publish a revision, replace this file
// and the PDF in `public/papers/`; nothing else needs editing.
import source from '../content/what-is-good.md?raw';

/**
 * The foundational working paper, published at {@link PAPER_PATH}. Everything
 * here is read from the paper's own text, so the pages that cite it follow a
 * new version without being edited.
 */
export interface Paper {
  title: string;
  subtitle: string;
  publisher: string;
  author: string;
  version: string;
  /** Publication date as displayed, e.g. "October 2026". */
  date: string;
  sections: PaperSection[];
}

/** A part of the paper listed in its table of contents. */
export interface PaperSection {
  /** The chapter number, for the numbered chapters. */
  number?: string;
  title: string;
  /** The anchor the section is linked by. */
  id: string;
  blocks: Block[];
  /** Numbered parts within a chapter, e.g. "1.1 Beyond good intentions". */
  subsections: PaperSubsection[];
}

export interface PaperSubsection {
  number: string;
  title: string;
  id: string;
  blocks: Block[];
}

export const PAPER_PATH = '/about/what-is-good';
/** The paper as a typeset document, in `public/papers/`. */
export const PAPER_PDF = 'papers/good-flourishing-and-the-systems-that-make-it-possible.pdf';
export const PAPER_STATUS = 'Working paper';

/** Search and link-preview text; the page heading stays the paper's title. */
export const PAPER_SEO = {
  title: 'What Is Good? Our Philosophy | Real Good Social',
  description:
    'Explore Real Good’s understanding of human flourishing, social good and the capabilities and systems that make lasting positive change possible.',
};

function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** A paragraph that is bold from start to finish is one of the paper's key statements. */
const KEY_STATEMENT = /^\*\*([^*]+)\*\*$/;

/**
 * Reads the paper's Markdown: a cover (title, subtitle, then publisher,
 * author, version and date on a line each), `# 1. Chapter` and
 * `## 1.1 Section` headings, and paragraphs. A `##` heading without a number
 * (the abstract, the publication note) stands as a part of its own. A line
 * ending in two spaces breaks there.
 */
function parsePaper(markdown: string): Paper {
  // The source only uses straight quotes as apostrophes.
  const chunks = markdown
    .replace(/'/g, '’')
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk && chunk !== '---');

  const cover: string[] = [];
  const sections: PaperSection[] = [];
  let title = '';
  let blocks: Block[] | undefined;

  const startSection = (heading: string) => {
    const [, number, name] = heading.match(/^(\d+)\.\s+(.*)$/) ?? [];
    const section: PaperSection = {
      number,
      title: name ?? heading,
      id: headingId(name ?? heading),
      blocks: [],
      subsections: [],
    };
    sections.push(section);
    blocks = section.blocks;
  };

  for (const chunk of chunks) {
    const [, hashes, heading] = chunk.match(/^(#{1,2}) (.+)$/) ?? [];
    if (hashes === '#' && !title) {
      title = heading;
    } else if (hashes === '#') {
      startSection(heading);
    } else if (hashes === '##') {
      const [, number, name] = heading.match(/^(\d+\.\d+)\s+(.*)$/) ?? [];
      const chapter = sections.at(-1);
      if (number && chapter) {
        const subsection = { number, title: name, id: headingId(name), blocks: [] };
        chapter.subsections.push(subsection);
        blocks = subsection.blocks;
      } else {
        startSection(heading);
      }
    } else if (!blocks) {
      cover.push(...chunk.split('\n').map((line) => line.trim()));
    } else {
      const text = chunk
        .split('\n')
        .map((line, i, lines) =>
          i === lines.length - 1 ? line.trim() : line.trim() + (line.endsWith('  ') ? '\n' : ' '),
        )
        .join('');
      const statement = text.match(KEY_STATEMENT);
      blocks.push(statement ? { highlight: statement[1] } : text);
    }
  }

  const [subtitle = '', publisher = '', author = '', edition = '', date = ''] = cover;
  return {
    title,
    subtitle: subtitle.replace(/^\*\*|\*\*$/g, ''),
    publisher,
    author,
    version: edition.match(/Version\s+(\S+)/)?.[1] ?? '',
    date,
    sections,
  };
}

export const paper = parsePaper(source);

/** "Working Paper · Version 0.2", the label shown wherever the paper is cited. */
export const paperLabel = `Working Paper · Version ${paper.version}`;

/** ISO month (YYYY-MM) of publication, for `<time>` and structured data. */
export const paperIsoDate = isoDate(`1 ${paper.date}`)?.slice(0, 7);
