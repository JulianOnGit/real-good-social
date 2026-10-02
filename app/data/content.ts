// Long-form copy shared by initiatives, insights and the legal pages.

/**
 * One block of copy:
 * - a paragraph — `**bold**` and `*italic*` are honoured, `\n` is a line break;
 * - a bulleted list;
 * - a list of titled items (a title with a sentence beneath it);
 * - a callout, set apart from the text, with an optional label.
 */
export type Block =
  | string
  | { list: string[] }
  | { items: { title: string; text: string }[] }
  | { callout: string; label?: string };

/** A run of blocks under an optional heading. */
export interface Section {
  heading?: string;
  blocks: Block[];
}

/** The first plain paragraph of some blocks. */
export function firstParagraph(blocks: Block[]): string {
  const para = blocks.find((b): b is string => typeof b === 'string');
  return para ?? '';
}

/** The first sentence of some blocks, without inline markup — used for summaries. */
export function firstSentence(blocks: Block[]): string {
  const text = firstParagraph(blocks).replace(/\*\*?([^*]+)\*\*?/g, '$1');
  const match = text.match(/^.*?[.?!](?=\s|$)/);
  return match ? match[0] : text;
}
