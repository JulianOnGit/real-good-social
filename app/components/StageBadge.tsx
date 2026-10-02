import type { Stage } from '../data/initiatives';

const modifier: Record<Stage, string> = {
  Exploring: 'exploring',
  Researching: 'researching',
  Designing: 'designing',
  Developing: 'developing',
  Prototyping: 'prototyping',
  Piloting: 'piloting',
  Operating: 'operating',
};

export default function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`badge badge--${modifier[stage]}`}>
      <span className="visually-hidden">Development stage: </span>
      {stage}
    </span>
  );
}
