import { blockText, type Block } from './content';
import { isoDate } from './insights';
// The papers as their author wrote them. To publish a revision, replace the
// paper's file here and its PDF in `public/papers/`; nothing else needs editing.
import currentSource from '../content/nature-and-actualisation-of-good.md?raw';
import earlierSource from '../content/good-flourishing-and-the-systems-that-make-it-possible.md?raw';

/**
 * A working paper, published under {@link PUBLICATIONS_PATH}. The title,
 * author, version, date and text are read from the paper's own Markdown, so
 * the pages that cite it follow a new version without being edited.
 */
export interface Paper extends Publication {
  title: string;
  subtitle: string;
  publisher: string;
  author: string;
  version: string;
  /** Publication date as displayed, e.g. "October 2026". */
  date: string;
  sections: PaperSection[];
}

/** What the site adds to a paper's own text. */
interface Publication {
  slug: string;
  /** The paper as a typeset document, in `public/papers/`. */
  pdf: string;
  status: string;
  /** The slug of the paper that replaced this one. */
  supersededBy?: string;
  /** Search and link-preview text; the page heading stays the paper's title. */
  seo: { title: string; description: string };
}

/** A part of the paper listed in its table of contents. */
export interface PaperSection {
  /** The chapter number, for the numbered chapters. */
  number?: string;
  /** On the first chapter of a part, the part it opens. */
  part?: PaperPart;
  title: string;
  /** The anchor the section is linked by. */
  id: string;
  blocks: Block[];
  /** Numbered sections within a chapter or appendix, e.g. "1.1 Beyond good intentions". */
  subsections: PaperSubsection[];
}

/** A named group of chapters, e.g. Part I, "The Nature of Good". */
export interface PaperPart {
  numeral: string;
  title: string;
}

export interface PaperSubsection {
  number: string;
  title: string;
  id: string;
  blocks: Block[];
}

/** The short introduction to the philosophy the current paper sets out in full. */
export const INTRODUCTION_PATH = '/about/what-is-good';
export const PUBLICATIONS_PATH = '/publications';

export function paperPath(slug: string): string {
  return `${PUBLICATIONS_PATH}/${slug}`;
}

function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** A paragraph that is bold from start to finish is one of the paper's key statements. */
const KEY_STATEMENT = /^\*\*([^*]+)\*\*$/;

const SMALL_WORDS = new Set(['a', 'an', 'and', 'the', 'of', 'to', 'in', 'for', 'on']);

/** Part headings are written in capitals in the source and set in title case here. */
function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word, i) =>
      i > 0 && SMALL_WORDS.has(word)
        ? word
        : word.replace(/(^|-)([a-z])/g, (_, hyphen, letter) => hyphen + letter.toUpperCase()),
    )
    .join(' ');
}

/**
 * Reads a paper's Markdown: a cover (title, subtitle, then author, publisher,
 * version and date on a line each), headings and paragraphs. Headings are told
 * apart by their numbering, not their level, since papers differ in depth:
 * `1. Chapter` opens a chapter, `1.1 Section` (or `A.1` in an appendix) a
 * section within the part before it, and `PART I — NAME` names the part the
 * next chapter opens. Any other heading (the abstract, the references, an
 * appendix, the publication note) stands as a part of its own. A line ending
 * in two spaces breaks there. The author is the one named in the publication
 * note, which tells the cover's author line from its publisher line.
 */
function parsePaper(markdown: string) {
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
  let part: PaperPart | undefined;

  // Two headings may share a name ("Political Virtuosity" is a chapter and an
  // appendix section); the later one's anchor takes its number as well.
  const ids = new Set<string>();
  const uniqueId = (name: string, number = '') => {
    const id = ids.has(headingId(name)) ? headingId(`${name} ${number}`) : headingId(name);
    ids.add(id);
    return id;
  };

  for (const chunk of chunks) {
    const heading = sections.length || title ? chunk.match(/^#{1,3} (.+)$/)?.[1] : undefined;
    const [, partNumeral, partName] = heading?.match(/^PART ([IVX]+) — (.+)$/) ?? [];
    const [, subNumber, subName] = heading?.match(/^((?:\d+|[A-Z])\.\d+)\s+(.*)$/) ?? [];
    const chapter = sections.at(-1);

    if (!title && chunk.startsWith('# ')) {
      title = chunk.slice(2);
    } else if (heading && chunk.startsWith('### ') && !sections.length) {
      cover.push(heading);
    } else if (partNumeral) {
      part = { numeral: partNumeral, title: titleCase(partName) };
    } else if (subNumber && chapter) {
      const subsection = {
        number: subNumber,
        title: subName,
        id: uniqueId(subName, subNumber),
        blocks: [],
      };
      chapter.subsections.push(subsection);
      blocks = subsection.blocks;
    } else if (heading) {
      const [, number, name = heading] = heading.match(/^(\d+)\.\s+(.*)$/) ?? [];
      const section: PaperSection = {
        number,
        part: number ? part : undefined,
        title: name,
        id: uniqueId(name, number),
        blocks: [],
        subsections: [],
      };
      part = undefined;
      sections.push(section);
      blocks = section.blocks;
    } else if (!blocks) {
      // Some papers set the subtitle, author or publisher in bold.
      cover.push(...chunk.split('\n').map((line) => line.replace(/\*\*/g, '').trim()));
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

  const [subtitle = '', ...lines] = cover;
  const author = markdown.match(/^\*\*Author:\*\*\s*(.+?)\s*$/m)?.[1] ?? '';
  const edition = lines.find((line) => /Version\s/.test(line)) ?? '';
  return {
    title,
    subtitle,
    publisher: lines.find((line) => line !== author && line !== edition) ?? '',
    author,
    version: edition.match(/Version\s+(\S+)/)?.[1] ?? '',
    date: lines.at(-1) ?? '',
    sections,
  };
}

const CURRENT = 'nature-and-actualisation-of-good';

/** Every paper, the current one first. */
export const papers: Paper[] = [
  {
    ...parsePaper(currentSource),
    slug: CURRENT,
    pdf: 'papers/nature-and-actualisation-of-good.pdf',
    status: 'Foundational working paper',
    seo: {
      title: 'On the Nature and Actualisation of Good — Real Good Social',
      description:
        'Real Good’s foundational working paper: a developing philosophy of human flourishing, moral responsibility, collective life and how good is made actual.',
    },
  },
  {
    ...parsePaper(earlierSource),
    slug: 'good-flourishing-and-the-systems-that-make-it-possible',
    pdf: 'papers/good-flourishing-and-the-systems-that-make-it-possible.pdf',
    status: 'Superseded working paper',
    supersededBy: CURRENT,
    seo: {
      title:
        'Good, Flourishing and the Systems That Make It Possible (superseded) — Real Good Social',
      description:
        'An earlier working paper on flourishing and generative good, kept as a record of how Real Good’s philosophy developed. It has since been superseded.',
    },
  },
];

export function getPaper(slug: string | undefined): Paper | undefined {
  return papers.find((paper) => paper.slug === slug);
}

/** One row of a paper's contents list: a part with its chapters, or a section standing alone. */
export type ContentsEntry = PaperSection | { part: PaperPart; chapters: PaperSection[] };

/** The paper's sections as its contents list sets them out, with the chapters of each part together. */
export function paperContents(paper: Paper): ContentsEntry[] {
  const entries: ContentsEntry[] = [];
  for (const section of paper.sections) {
    const last = entries.at(-1);
    if (section.part) {
      entries.push({ part: section.part, chapters: [section] });
    } else if (section.number && last && 'chapters' in last) {
      last.chapters.push(section);
    } else {
      entries.push(section);
    }
  }
  return entries;
}

/** The principal current account of Real Good's philosophy. */
export const currentPaper = papers[0];

/** "Working Paper · Version 0.2", the label shown wherever a paper is cited. */
export function paperLabel(paper: Paper): string {
  return `Working Paper · Version ${paper.version}`;
}

/** ISO month (YYYY-MM) of publication, for `<time>` and structured data. */
export function paperIsoDate(paper: Paper): string | undefined {
  return isoDate(`1 ${paper.date}`)?.slice(0, 7);
}

/** Estimated reading time in whole minutes, at roughly 230 words a minute. */
export function paperMinutes(paper: Paper): number {
  const text = paper.sections
    .flatMap((section) => [...section.blocks, ...section.subsections.flatMap((sub) => sub.blocks)])
    .map(blockText)
    .join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 230));
}
