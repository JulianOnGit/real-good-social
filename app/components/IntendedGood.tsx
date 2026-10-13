import { Link } from 'react-router';
import { Blocks } from './Blocks';
import type { IntendedGood as Good, Stage } from '../data/initiatives';

interface IntendedGoodProps {
  good: Good;
  stages: Stage[];
}

/**
 * "The good we seek to create": what an initiative is meant to achieve, who
 * for, what it strengthens and how that could be examined. Stated as aims,
 * with the initiative's stage, so they are not read as results.
 */
export default function IntendedGood({ good, stages }: IntendedGoodProps) {
  return (
    <>
      <h2>The good we seek to create</h2>
      <p className="meta">
        Stage: {stages.join(', ')}. These are aims, not results.
      </p>
      <Blocks
        blocks={[
          {
            items: [
              { title: 'Intended outcomes', text: good.outcomes },
              { title: 'Who it is for', text: good.beneficiaries },
              { title: 'What it aims to strengthen', text: good.strengthens },
              { title: 'How we could tell', text: good.evaluation },
              ...(good.limits ? [{ title: 'Limits and risks', text: good.limits }] : []),
            ],
          },
        ]}
      />
      <p>
        <Link to="/about#what-we-mean-by-good" className="text-link">
          What we mean by good
        </Link>
      </p>
    </>
  );
}
