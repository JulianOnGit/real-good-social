import type { ReactNode } from 'react';
import type { GlyphName, SketchName } from '../data/content';

// Small drawings for use inside an article. They share the line style of the
// insight illustrations (`motif__*` in components.css) and take their colour
// from the article's accent. The caption beneath says what each one shows, so
// the drawings themselves are hidden from assistive technology.

/** A small arrowhead at a point, turned to face `angle` degrees (0 = right). */
function Chevron({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <path
      className="motif__line"
      d="M-3.5 -5 L3.5 0 L-3.5 5"
      transform={`translate(${x} ${y}) rotate(${angle})`}
    />
  );
}

/** A word or two naming part of a sketch. */
function Label({
  x,
  y,
  anchor = 'middle',
  children,
}: {
  x: number;
  y: number;
  anchor?: 'start' | 'middle' | 'end';
  children: string;
}) {
  return (
    <text className="sketch__label" x={x} y={y} textAnchor={anchor}>
      {children}
    </text>
  );
}

/** Straight lines between pairs of points, as one path. */
function segments(points: number[][], pairs: number[][]): string {
  return pairs
    .map(([a, b]) => `M${points[a][0]} ${points[a][1]} L${points[b][0]} ${points[b][1]}`)
    .join(' ');
}

// Each sketch shows one idea from its article, with the parts named in the
// article's own words: usually a "before" on the left and an "after" on the
// right, or two things and what lies between them.
const SKETCHES: Record<SketchName, () => ReactNode> = {
  /** An outcome goes round and comes back as an input. */
  loop: () => (
    <>
      <circle className="motif__shape" cx="140" cy="64" r="22" />
      <path className="motif__line" d="M60 64 C 60 20, 140 20, 140 64" />
      <path className="motif__line" d="M140 64 C 140 108, 60 108, 60 64" />
      <Chevron x={100} y={31} />
      <Chevron x={100} y={97} angle={180} />
      <circle className="motif__node" cx="60" cy="64" r="5" />
      <circle className="motif__dot" cx="140" cy="64" r="5" />
      <Label x={100} y={18}>An outcome</Label>
      <Label x={100} y={122}>becomes an input</Label>
    </>
  ),
  /** Five options on offer; two of them can actually be reached. */
  reach: () => (
    <>
      {[20, 87.5, 110].map((y) => (
        <path
          key={y}
          className="motif__faint"
          strokeDasharray="3 5"
          d={`M22 65 C 62 65, 72 ${y}, 112 ${y}`}
        />
      ))}
      <path className="motif__line" d="M22 65 C 62 65, 72 42.5, 112 42.5" />
      <path className="motif__line" d="M22 65 H112" />
      {[20, 87.5, 110].map((y) => (
        <circle key={y} className="motif__node motif__node--faint" cx="112" cy={y} r="5" />
      ))}
      <circle className="motif__dot" cx="112" cy="42.5" r="5" />
      <circle className="motif__dot" cx="112" cy="65" r="5" />
      <circle className="motif__node" cx="22" cy="65" r="5" />
      <Label x={125} y={23} anchor="start">Nominal</Label>
      <Label x={125} y={57} anchor="start">Reachable</Label>
      <Label x={125} y={102} anchor="start">Nominal</Label>
    </>
  ),
  /** Two separate groups, and the one in the middle who connects them. */
  bridge: () => (
    <>
      <circle className="motif__shape" cx="40" cy="62" r="34" />
      <circle className="motif__shape" cx="162" cy="62" r="34" />
      <path className="motif__faint" d="M32 34 L58 72 L26 88 Z" />
      <path className="motif__faint" d="M170 34 L144 72 L176 88 Z" />
      <path className="motif__line" d="M58 72 C 80 50, 122 50, 144 72" />
      {[
        [32, 34],
        [26, 88],
        [58, 72],
        [170, 34],
        [176, 88],
        [144, 72],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} className="motif__node" cx={cx} cy={cy} r="5" />
      ))}
      <circle className="motif__dot" cx="101" cy="55.5" r="6" />
      <Label x={101} y={40}>Intermediary</Label>
      <Label x={40} y={118}>One domain</Label>
      <Label x={162} y={118}>Another</Label>
    </>
  ),
  /** The same three pieces: lying apart, then joined into one arrangement. */
  combine: () => (
    <>
      <circle className="motif__node" cx="26" cy="30" r="11" />
      <rect className="motif__node" x="46" y="50" width="20" height="20" rx="2" transform="rotate(14 56 60)" />
      <path className="motif__node" strokeLinejoin="round" d="M22 76 L35 98 L9 98 Z" />

      <path className="motif__line" d="M84 60 H112" />
      <Chevron x={110} y={60} />

      <circle className="motif__shape" cx="151" cy="58" r="42" />
      <path className="motif__line" d="M150 30 L170 72 L132 76 Z" />
      <circle className="motif__node" cx="150" cy="30" r="11" />
      <rect className="motif__node" x="160" y="62" width="20" height="20" rx="2" />
      <path className="motif__node" strokeLinejoin="round" d="M132 64 L145 86 L119 86 Z" />

      <Label x={38} y={122}>The pieces</Label>
      <Label x={151} y={122}>A coherent activity</Label>
    </>
  ),
  /** Everything passing through one organiser, then people connected to each other. */
  mesh: () => {
    const hub = [
      [20, 28],
      [76, 28],
      [20, 82],
      [76, 82],
    ];
    const ring = [
      [152, 24],
      [182, 46],
      [171, 82],
      [133, 82],
      [122, 46],
    ];
    return (
      <>
        <path className="motif__line" d={hub.map(([x, y]) => `M48 55 L${x} ${y}`).join(' ')} />
        {hub.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="motif__node" cx={cx} cy={cy} r="5" />
        ))}
        <circle className="motif__dot" cx="48" cy="55" r="6" />

        <path className="motif__line" d="M90 55 H108" />
        <Chevron x={106} y={55} />

        <circle className="motif__shape" cx="152" cy="56" r="24" />
        <path className="motif__faint" d={segments(ring, [[0, 2], [0, 3], [1, 3], [1, 4], [2, 4]])} />
        <path className="motif__line" d={segments(ring, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]])} />
        {ring.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="motif__dot" cx={cx} cy={cy} r="5" />
        ))}

        <Label x={48} y={116}>Depends on a few</Label>
        <Label x={152} y={116}>More can initiate</Label>
      </>
    );
  },
  /** The range of things a person can do: narrow before, wider after. */
  widen: () => (
    <>
      <path className="motif__shape" d="M18 58 L55.6 44.3 A 40 40 0 0 1 55.6 71.7 Z" />
      <path className="motif__line" strokeLinejoin="round" d="M18 58 L55.6 44.3 A 40 40 0 0 1 55.6 71.7 Z" />
      <circle className="motif__node" cx="18" cy="58" r="5" />
      <circle className="motif__dot" cx="58" cy="58" r="4" />

      <path className="motif__shape" d="M96 58 L167.2 13.5 A 84 84 0 0 1 167.2 102.5 Z" />
      <path className="motif__line" strokeLinejoin="round" d="M96 58 L167.2 13.5 A 84 84 0 0 1 167.2 102.5 Z" />
      <circle className="motif__node" cx="96" cy="58" r="5" />
      {[
        [176.7, 34.8],
        [180, 58],
        [176.7, 81.2],
      ].map(([cx, cy]) => (
        <circle key={cy} className="motif__dot" cx={cx} cy={cy} r="4" />
      ))}

      <Label x={38} y={122}>Before</Label>
      <Label x={140} y={122}>After</Label>
    </>
  ),
  /** Something developed in one initiative, carried on to the next two. */
  share: () => (
    <>
      <rect className="motif__shape" x="22" y="50" width="44" height="44" rx="4" />
      {[22, 78, 134].map((x) => (
        <rect key={x} className="motif__line" x={x} y="50" width="44" height="44" rx="4" />
      ))}
      <path className="motif__line" d="M44 50 C 44 16, 100 16, 100 50" />
      <path className="motif__line" d="M100 50 C 100 16, 156 16, 156 50" />
      <Chevron x={72} y={25} />
      <Chevron x={128} y={25} />
      <circle className="motif__dot" cx="44" cy="72" r="6" />
      <circle className="motif__node" cx="100" cy="72" r="6" />
      <circle className="motif__node" cx="156" cy="72" r="6" />
      <Label x={44} y={112}>Developed</Label>
      <Label x={100} y={112}>Reused</Label>
      <Label x={156} y={112}>Reused</Label>
    </>
  ),
  /** A need on one side, the capability on the other, and no way across. */
  apart: () => (
    <>
      <circle className="motif__shape" cx="44" cy="58" r="30" />
      <circle className="motif__shape" cx="156" cy="58" r="30" />
      <path className="motif__faint" strokeDasharray="3 5" d="M54 58 H88 M112 58 H140" />
      <path className="motif__line" d="M92 49 V67 M108 49 V67" />
      <circle className="motif__node" cx="44" cy="58" r="5" />
      <circle className="motif__dot" cx="150" cy="46" r="5" />
      <circle className="motif__dot" cx="166" cy="61" r="5" />
      <circle className="motif__dot" cx="148" cy="73" r="5" />
      <Label x={100} y={38}>No route</Label>
      <Label x={44} y={110}>Needed here</Label>
      <Label x={156} y={110}>Exists here</Label>
    </>
  ),
  /** Separate observations brought together into one insight. */
  gather: () => {
    const from = [
      [30, 18],
      [70, 32],
      [42, 54],
      [26, 80],
      [62, 96],
    ];
    return (
      <>
        <circle className="motif__shape" cx="152" cy="56" r="26" />
        {from.map(([x, y]) => (
          <line key={y} className="motif__faint" x1={x} y1={y} x2="152" y2="56" />
        ))}
        {from.map(([x, y]) => (
          <circle key={y} className="motif__node" cx={x} cy={y} r="4" />
        ))}
        <circle className="motif__dot" cx="152" cy="56" r="6" />
        <Label x={46} y={122}>Observations</Label>
        <Label x={152} y={100}>Insight</Label>
      </>
    );
  },
  /** Five problems side by side, then the same five as two causes and three effects. */
  structure: () => {
    const ys = [14, 34, 54, 74, 94];
    return (
      <>
        {ys.map((y) => (
          <circle key={y} className="motif__node" cx="40" cy={y} r="5" />
        ))}

        <path className="motif__line" d="M70 54 H92" />
        <Chevron x={90} y={54} />

        <path className="motif__line" d="M124 34 L172 18 M124 34 L172 46 M124 74 L172 46 M124 74 L172 86" />
        {[18, 46, 86].map((y) => (
          <circle key={y} className="motif__node" cx="172" cy={y} r="5" />
        ))}
        <circle className="motif__dot" cx="124" cy="34" r="6" />
        <circle className="motif__dot" cx="124" cy="74" r="6" />

        <Label x={40} y={118}>Five deficits</Label>
        <Label x={148} y={112}>Two constraints,</Label>
        <Label x={148} y={124}>their effects</Label>
      </>
    );
  },
};

/** A sketch on a 200 × 130 field. */
export function Sketch({ name }: { name: SketchName }) {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
      {SKETCHES[name]()}
    </svg>
  );
}

const GLYPHS: Record<GlyphName, () => ReactNode> = {
  /** One thing first, then another. */
  dependency: () => (
    <>
      <path className="motif__line" d="M8 16 H40" />
      <Chevron x={24} y={16} />
      <circle className="motif__node" cx="8" cy="16" r="4" />
      <circle className="motif__dot" cx="40" cy="16" r="4" />
    </>
  ),
  /** Round and back again. */
  loop: () => (
    <>
      <circle className="motif__line" cx="24" cy="16" r="11" />
      <Chevron x={24} y={5} />
      <circle className="motif__dot" cx="24" cy="27" r="4" />
    </>
  ),
  /** Several resting on one. */
  shared: () => (
    <>
      <path className="motif__line" d="M8 6 L24 26 L40 6 M24 6 V26" />
      {[8, 24, 40].map((x) => (
        <circle key={x} className="motif__node" cx={x} cy="6" r="4" />
      ))}
      <circle className="motif__dot" cx="24" cy="26" r="4" />
    </>
  ),
  /** One reaching several. */
  leverage: () => (
    <>
      <path className="motif__line" d="M8 16 L40 5 M8 16 H40 M8 16 L40 27" />
      {[5, 16, 27].map((y) => (
        <circle key={y} className="motif__node" cx="40" cy={y} r="4" />
      ))}
      <circle className="motif__dot" cx="8" cy="16" r="4" />
    </>
  ),
};

/** A pictogram on a 48 × 32 field, for a part of a diagram. */
export function Glyph({ name }: { name: GlyphName }) {
  return (
    <svg className="diagram__glyph" viewBox="0 0 48 32" aria-hidden="true" focusable="false">
      {GLYPHS[name]()}
    </svg>
  );
}
