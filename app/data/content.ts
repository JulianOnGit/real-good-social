// Long-form copy shared by initiatives, insights and the legal pages.

/**
 * One block of copy:
 * - a paragraph — `**bold**` and `*italic*` are honoured, `\n` is a line break;
 * - a bulleted list;
 * - a list of titled items (a title with a sentence beneath it);
 * - a callout, set apart from the text, with an optional label;
 * - a highlight: a sentence of the text itself given emphasis, in place;
 * - a diagram: a few short parts set out as a sequence or side by side;
 * - a sketch: a small abstract drawing with a caption, set in the margin
 *   where there is room.
 */
export type Block =
  | string
  | { list: string[] }
  | { items: { title: string; text: string }[] }
  | { callout: string; label?: string }
  | { highlight: string }
  | Diagram
  | { sketch: SketchName; caption?: string };

/** The drawings in `ArticleSketch`. */
export type SketchName =
  | 'loop'
  | 'reach'
  | 'bridge'
  | 'combine'
  | 'mesh'
  | 'widen'
  | 'share'
  | 'apart'
  | 'gather'
  | 'structure';
export type GlyphName = 'dependency' | 'loop' | 'shared' | 'leverage';

/**
 * A simple figure built from short parts: `sequence` numbers them in order,
 * `comparison` sets them side by side. For restating something the text
 * already says; it is not a place for new material.
 */
export interface Diagram {
  diagram: 'sequence' | 'comparison';
  /** `glyph` puts a small pictogram above a part. */
  parts: { title: string; text?: string; glyph?: GlyphName }[];
  caption?: string;
}

/** The words in a block, for counting and searching. */
export function blockText(block: Block): string {
  if (typeof block === 'string') return block;
  if ('list' in block) return block.list.join(' ');
  if ('items' in block) return block.items.map((i) => `${i.title} ${i.text}`).join(' ');
  if ('highlight' in block) return block.highlight;
  if ('sketch' in block) return block.caption ?? '';
  if ('diagram' in block) {
    return [...block.parts.map((p) => `${p.title} ${p.text ?? ''}`), block.caption ?? ''].join(' ');
  }
  return block.callout;
}

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
