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
      'A structured way to map a person’s obstacles, resources, and viable next steps so that support workers and individuals can see a path forward rather than a wall of problems.',
    problem:
      'People navigating hardship — re-establishing identity documents, housing, or employment — often face a tangle of interdependent obstacles. Support systems tend to treat each problem in isolation, so effort is duplicated and the practical order of operations is lost.',
    response:
      'SolutionGraph represents a situation as a graph of obstacles and the concrete steps that unblock them. It surfaces the shortest realistic path to a goal, makes dependencies explicit, and produces plain-language briefs that a person and a support worker can act on together.',
    beneficiaries:
      'People re-establishing stability after disruption, and the community workers and case managers who support them.',
    currentActivities: [
      'Building an early working prototype focused on identity re-establishment.',
      'Testing the obstacle-mapping model against real support scenarios.',
      'Documenting design principles for humane, non-judgemental tooling.',
    ],
    seeking: [
      'Community organisations willing to review the prototype against real cases.',
      'Researchers in social work, service design, or decision support.',
    ],
    nextMilestone:
      'Complete a usable prototype and run a small, supervised review with two community partners.',
  },
  {
    slug: 'partnership-commons',
    name: 'Partnership Commons',
    stage: 'Designing',
    area: 'Partnerships for Good',
    summary:
      'A shared, lightweight framework for setting up collaborations between community organisations, researchers, and builders without heavy overhead or duplicated groundwork.',
    problem:
      'Promising collaborations stall on avoidable friction: unclear expectations, mismatched capacity, and each partnership re-inventing agreements, roles, and reporting from scratch.',
    response:
      'Partnership Commons provides reusable templates, role definitions, and a simple readiness checklist so that aligned organisations can move from a shared problem to a working arrangement quickly and transparently.',
    beneficiaries:
      'Community organisations and institutions seeking practical collaboration, and the specialists who contribute to it.',
    currentActivities: [
      'Designing the core partnership templates and readiness checklist.',
      'Gathering input on what makes early collaborations succeed or fail.',
    ],
    seeking: [
      'Organisations that have recently formed — or attempted — a cross-sector partnership.',
      'Practitioners in social innovation and programme design.',
    ],
    nextMilestone:
      'Publish a first template set and validate it with three prospective partnerships.',
  },
  {
    slug: 'stage-signals',
    name: 'Stage Signals',
    stage: 'Researching',
    area: 'Strategy and Systems',
    summary:
      'A small research effort into how early-stage social ventures can communicate their maturity honestly — helping funders, partners, and the public calibrate expectations.',
    problem:
      'Early ventures are pushed to overstate their maturity to attract support, which erodes trust and misallocates resources. There is no shared, honest vocabulary for “how developed is this, really?”',
    response:
      'Stage Signals studies existing maturity models and proposes a simple, consistent way to label development stage — the same Exploring-to-Operating vocabulary used across this site — with guidance on evidence appropriate to each stage.',
    beneficiaries:
      'Social ventures, funders, and partners who need to make sound decisions under uncertainty.',
    currentActivities: [
      'Reviewing maturity and readiness frameworks from adjacent fields.',
      'Drafting stage definitions and the evidence appropriate to each.',
    ],
    seeking: [
      'Funders and intermediaries willing to comment on the draft framework.',
      'Researchers with experience in evaluation or readiness assessment.',
    ],
    nextMilestone:
      'Produce a short foundational article proposing the stage framework for public comment.',
  },
];

export function getInitiative(slug: string): Initiative | undefined {
  return initiatives.find((i) => i.slug === slug);
}
