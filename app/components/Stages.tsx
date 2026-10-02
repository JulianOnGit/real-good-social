import type { Stage } from '../data/initiatives';

/**
 * Stages share three tones rather than a colour each: still forming, being
 * built, or running. The word always carries the meaning; the dot only groups.
 */
const tone: Record<Stage, 'forming' | 'building' | 'running'> = {
  Exploring: 'forming',
  Researching: 'forming',
  Designing: 'building',
  Prototyping: 'building',
  Piloting: 'running',
  'Early operation': 'running',
  Operating: 'running',
};

/** An initiative's development stages, as dot-and-word indicators. */
export default function Stages({ stages }: { stages: Stage[] }) {
  return (
    <span className="stages">
      <span className="visually-hidden">Development stage: </span>
      {stages.map((s) => (
        <span key={s} className="stage" data-tone={tone[s]}>
          {s}
        </span>
      ))}
    </span>
  );
}
