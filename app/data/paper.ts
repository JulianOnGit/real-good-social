import type { Block } from './content';
import { DEFAULT_AUTHOR, isoDate } from './insights';

/**
 * The foundational working paper, published at {@link PAPER_PATH}. A revision
 * is made here alone: the pages that point to the paper read its title and
 * version from this file.
 */
export interface Paper {
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  version: string;
  /** Publication date as displayed, e.g. "October 2026". */
  date: string;
  status: string;
  /** Search and link-preview text; the page heading stays the paper's title. */
  seoTitle: string;
  description: string;
  sections: PaperSection[];
}

/** A numbered part of the paper, listed in its table of contents. */
export interface PaperSection {
  heading: string;
  blocks: Block[];
  /** Parts within the section, each under an `<h3>`. */
  subsections?: { heading: string; blocks: Block[] }[];
}

export const PAPER_PATH = '/about/what-is-good';

export const paper: Paper = {
  title: 'Good, Flourishing and the Systems That Make It Possible',
  subtitle: 'A foundational working paper on the meaning, pursuit and cultivation of good.',
  author: DEFAULT_AUTHOR.name,
  publisher: 'Real Good Social',
  version: '0.1',
  date: 'October 2026',
  status: 'Working paper',
  seoTitle: 'What Is Good? Our Philosophy | Real Good Social',
  description:
    'Explore Real Good’s understanding of human flourishing, social good and the capabilities and systems that make lasting positive change possible.',
  sections: [],
};

/** "Working Paper · Version 0.1", the label shown wherever the paper is cited. */
export const paperLabel = `Working Paper · Version ${paper.version}`;

/** False until the paper's text is in place; the page is then kept out of search. */
export const paperHasText = paper.sections.length > 0;

/** ISO date (YYYY-MM or YYYY-MM-DD) of publication, for `<time>` and structured data. */
export const paperIsoDate = isoDate(`1 ${paper.date}`)?.slice(0, 7);

/** The anchor a heading is linked by, e.g. "what-we-mean-by-good". */
export function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
