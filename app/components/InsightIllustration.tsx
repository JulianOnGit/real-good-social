import type { ReactNode } from 'react';
import { insightAccent, insightMotif, type Insight, type InsightMotif } from '../data/insights';

type Point = [number, number];

/** Hollow rings, like the points on the home page's pathway; `solid` fills them. */
function Nodes({ at, solid = [] }: { at: Point[]; solid?: number[] }) {
  return (
    <>
      {at.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          className={solid.includes(i) ? 'motif__dot' : 'motif__node'}
          cx={cx}
          cy={cy}
          r="5"
        />
      ))}
    </>
  );
}

function Lines({ between, faint = false }: { between: [Point, Point][]; faint?: boolean }) {
  return (
    <>
      {between.map(([[x1, y1], [x2, y2]]) => (
        <line
          key={`${x1}-${y1}-${x2}-${y2}`}
          className={faint ? 'motif__faint' : 'motif__line'}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />
      ))}
    </>
  );
}

/**
 * The drawings, on a 320 × 180 field. Each keeps to the middle of the field so
 * it survives being cropped to a wider or squarer panel. They gesture at a
 * subject (connection, routes, overlap) and are not diagrams of anything.
 */
const MOTIFS: Record<InsightMotif, () => ReactNode> = {
  network() {
    const n: Point[] = [
      [92, 104],
      [138, 62],
      [176, 108],
      [226, 72],
      [214, 136],
      [126, 140],
      [264, 110],
    ];
    return (
      <>
        <circle className="motif__shape" cx="176" cy="108" r="46" />
        <Lines
          faint
          between={[
            [n[0], n[5]],
            [n[1], n[3]],
            [n[4], n[6]],
            [n[5], n[4]],
          ]}
        />
        <Lines
          between={[
            [n[0], n[1]],
            [n[0], n[2]],
            [n[1], n[2]],
            [n[2], n[3]],
            [n[2], n[4]],
            [n[2], n[5]],
            [n[3], n[6]],
          ]}
        />
        <Nodes at={n} solid={[2]} />
      </>
    );
  },
  pathways() {
    return (
      <>
        <circle className="motif__shape" cx="252" cy="92" r="30" />
        <path className="motif__faint" d="M66 92 C 124 92, 150 50, 248 46" />
        <path className="motif__line" d="M66 92 C 130 92, 176 92, 252 92" />
        <path className="motif__faint" d="M66 92 C 124 92, 150 136, 248 140" />
        <Nodes
          at={[
            [66, 92],
            [248, 46],
            [252, 92],
            [248, 140],
          ]}
          solid={[2]}
        />
      </>
    );
  },
  overlap() {
    const centres: Point[] = [
      [132, 76],
      [188, 76],
      [160, 120],
    ];
    return (
      <>
        {centres.map(([cx, cy]) => (
          <circle key={`s${cx}`} className="motif__shape" cx={cx} cy={cy} r="44" />
        ))}
        {centres.map(([cx, cy]) => (
          <circle key={`l${cx}`} className="motif__line" cx={cx} cy={cy} r="44" />
        ))}
        <Nodes at={[[160, 92]]} solid={[0]} />
      </>
    );
  },
  arches() {
    return (
      <>
        <path className="motif__shape" d="M140 138 A 54 54 0 0 1 248 138 Z" />
        <path className="motif__faint" d="M72 138 A 88 88 0 0 1 248 138" />
        <path className="motif__line" d="M72 138 A 34 34 0 0 1 140 138" />
        <path className="motif__line" d="M140 138 A 54 54 0 0 1 248 138" />
        <line className="motif__faint" x1="52" y1="138" x2="268" y2="138" />
        <Nodes
          at={[
            [72, 138],
            [140, 138],
            [248, 138],
          ]}
          solid={[1]}
        />
      </>
    );
  },
  steps() {
    const n: Point[] = [
      [78, 132],
      [122, 116],
      [166, 94],
      [210, 72],
      [252, 46],
    ];
    return (
      <>
        {n.map(([x, y]) => (
          <rect key={x} className="motif__shape" x={x - 11} y={y} width="22" height={146 - y} rx="3" />
        ))}
        <line className="motif__faint" x1="56" y1="146" x2="274" y2="146" />
        <polyline className="motif__line" points={n.map((p) => p.join(',')).join(' ')} />
        <Nodes at={n} solid={[4]} />
      </>
    );
  },
  weave() {
    return (
      <>
        {/* Three strands that start apart and are drawn into one. */}
        <circle className="motif__shape" cx="196" cy="90" r="34" />
        <path className="motif__line" d="M56 46 C 126 46, 132 90, 196 90" />
        <path className="motif__line" d="M56 134 C 126 134, 132 90, 196 90" />
        <path className="motif__line" d="M56 90 H264" />
        <Nodes
          at={[
            [56, 46],
            [56, 90],
            [56, 134],
            [196, 90],
            [264, 90],
          ]}
          solid={[4]}
        />
      </>
    );
  },
  /** People in a circle, each connected to the others, with nobody in the middle. */
  ring() {
    const n: Point[] = [
      [230, 90],
      [195, 46],
      [125, 46],
      [90, 90],
      [125, 134],
      [195, 134],
    ];
    const pair = (a: number, b: number): [Point, Point] => [n[a], n[b]];
    return (
      <>
        <circle className="motif__shape" cx="160" cy="90" r="38" />
        <Lines faint between={[pair(0, 2), pair(0, 4), pair(1, 3), pair(1, 5), pair(2, 4), pair(3, 5)]} />
        <Lines between={n.map((_, i) => pair(i, (i + 1) % n.length))} />
        <Nodes at={n} solid={[1, 3, 5]} />
      </>
    );
  },
  /** Three groups, each complete, with only broken lines between them. */
  separate() {
    const centres: Point[] = [
      [96, 66],
      [224, 66],
      [160, 120],
    ];
    return (
      <>
        {centres.map(([cx, cy]) => (
          <circle key={`s${cx}`} className="motif__shape" cx={cx} cy={cy} r="30" />
        ))}
        {centres.map(([cx, cy]) => (
          <circle key={`l${cx}`} className="motif__line" cx={cx} cy={cy} r="30" />
        ))}
        <path
          className="motif__faint"
          strokeDasharray="3 6"
          d="M130 66 H190 M119 85 L137 101 M201 85 L183 101"
        />
        <Nodes at={centres} solid={[2]} />
      </>
    );
  },
  /** Linked rings: each one leads into the next. */
  chain() {
    const xs = [104, 160, 216];
    return (
      <>
        {xs.map((x) => (
          <circle key={`s${x}`} className="motif__shape" cx={x} cy="90" r="36" />
        ))}
        {xs.map((x) => (
          <circle key={`l${x}`} className="motif__line" cx={x} cy="90" r="36" />
        ))}
        <Nodes
          at={[
            [68, 90],
            [132, 90],
            [188, 90],
            [252, 90],
          ]}
          solid={[1, 2]}
        />
      </>
    );
  },
  lens() {
    const xs = [84, 122, 160, 198, 236];
    const ys = [52, 90, 128];
    const inFocus = (x: number, y: number) => Math.hypot(x - 179, y - 90) < 40;
    return (
      <>
        <circle className="motif__shape" cx="179" cy="90" r="40" />
        <circle className="motif__line" cx="179" cy="90" r="40" />
        {xs.map((x) =>
          ys.map((y) => (
            <circle
              key={`${x}-${y}`}
              className={inFocus(x, y) ? 'motif__dot' : 'motif__dot motif__dot--faint'}
              cx={x}
              cy={y}
              r={inFocus(x, y) ? 5 : 3}
            />
          )),
        )}
      </>
    );
  },
};

/**
 * An insight's picture: a tinted panel with its abstract illustration, or its
 * own image where it has one. The illustration is decoration and is hidden
 * from assistive technology; an image is announced only if it has alt text.
 */
export default function InsightIllustration({
  insight,
  className = '',
  eager = false,
}: {
  insight: Insight;
  className?: string;
  /** Load an image straight away, for pictures at the top of a page. */
  eager?: boolean;
}) {
  const { image } = insight;
  return (
    <div className={`insight-art ${className}`.trim()} data-accent={insightAccent(insight)}>
      {image ? (
        <img
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width}
          height={image.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <svg
          viewBox="0 0 320 180"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          {MOTIFS[insightMotif(insight)]()}
        </svg>
      )}
    </div>
  );
}
