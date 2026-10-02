export type Stage =
  | 'Exploring'
  | 'Researching'
  | 'Designing'
  | 'Prototyping'
  | 'Piloting'
  | 'Operating';

export interface Initiative {
  slug: string;
  name: string;
  stage: Stage;
  area: string;
  summary: string;
  problem: string;
  response: string;
  beneficiaries: string;
  currentActivities: string[];
  seeking: string[];
  nextMilestone: string;
}

export const stageOrder: Stage[] = [
  'Exploring',
  'Researching',
  'Designing',
  'Prototyping',
  'Piloting',
  'Operating',
];

export const initiatives: Initiative[] = [
  {
    slug: 'solutiongraph',
    name: 'SolutionGraph',
    stage: 'Prototyping',
    area: 'Technology for Good',
    summary:
      'A tool for turning a tangled situation into a practical path forward by mapping obstacles, dependencies, resources and possible next steps.',
    problem:
      'People navigating difficult life situations — such as re-establishing identity documents, housing or employment — often face several interdependent problems at once. Services may address each issue separately even when the order in which they are solved matters.',
    response:
      'SolutionGraph represents a situation as a network of obstacles, dependencies, resources and actions. It helps reveal which steps unlock others, where effort is blocked and what realistic routes exist towards a goal.',
    beneficiaries:
      'People rebuilding stability after disruption, together with the community workers, advocates and case managers supporting them.',
    currentActivities: [
      'Building an early working prototype focused on identity re-establishment.',
      'Testing the obstacle-mapping model against realistic support scenarios.',
      'Developing design principles for humane and non-judgemental decision-support tooling.',
    ],
    seeking: [
      'Community organisations willing to review the prototype against real service scenarios.',
      'Researchers in social work, service design or decision support.',
    ],
    nextMilestone:
      'Complete a usable prototype and run a small supervised review with two community partners.',
  },
  {
    slug: 'partnership-commons',
    name: 'Partnership Commons',
    stage: 'Designing',
    area: 'Partnerships for Good',
    summary:
      'A lightweight set of shared tools for helping community organisations, researchers and builders form useful collaborations without repeatedly starting from scratch.',
    problem:
      'Good collaborations often lose momentum to preventable friction: unclear expectations, mismatched capacity, uncertain roles and the repeated reinvention of basic partnership arrangements.',
    response:
      'Partnership Commons provides reusable templates, role definitions, conversation guides and readiness tools that help collaborators move from shared interest to a workable arrangement more quickly.',
    beneficiaries:
      'Community organisations, institutions, researchers and specialists forming practical cross-sector collaborations.',
    currentActivities: [
      'Designing the first partnership templates and readiness tools.',
      'Gathering examples of what helps early collaborations succeed or fail.',
    ],
    seeking: [
      'Organisations that have recently formed — or attempted to form — cross-sector partnerships.',
      'Practitioners working in social innovation, collaboration or programme design.',
    ],
    nextMilestone:
      'Publish the first template set and test it with three prospective partnerships.',
  },
  {
    slug: 'stage-signals',
    name: 'Stage Signals',
    stage: 'Researching',
    area: 'Strategy and Systems',
    summary:
      'A shared vocabulary for describing how developed an early initiative actually is, so people can support it with clearer expectations.',
    problem:
      'New ventures often have to describe themselves in binary terms: either an idea is “real” or it is not. That obscures the meaningful stages between first exploration and mature operation.',
    response:
      'Stage Signals explores a simple development vocabulary — Exploring, Researching, Designing, Prototyping, Piloting and Operating — together with evidence expectations appropriate to each stage.',
    beneficiaries:
      'Social ventures, funders, partners and supporters making decisions under uncertainty.',
    currentActivities: [
      'Reviewing maturity and readiness frameworks from adjacent fields.',
      'Drafting stage definitions and evidence expectations.',
    ],
    seeking: [
      'Funders and intermediaries interested in more useful descriptions of venture maturity.',
      'Researchers with experience in evaluation, maturity or readiness assessment.',
    ],
    nextMilestone:
      'Publish a foundational article proposing the framework for discussion and testing.',
  },
];

export function getInitiative(slug: string): Initiative | undefined {
  return initiatives.find((i) => i.slug === slug);
}
