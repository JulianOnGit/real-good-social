// Long-form copy shared by initiatives, insights and the legal pages.

/**
 * One block of copy: a paragraph, an emphasised paragraph, or a bulleted list.
 * `\n` inside a paragraph is a line break.
 */
export type Block = string | { strong: string } | { list: string[] };

/** A run of blocks under an optional heading. */
export interface Section {
  heading?: string;
  blocks: Block[];
}

/** The first plain paragraph of some blocks — used where a summary is needed. */
export function firstParagraph(blocks: Block[]): string {
  const para = blocks.find((b): b is string => typeof b === 'string');
  return para ?? '';
}
