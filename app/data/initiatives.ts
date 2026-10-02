import type { Section } from './content';

export type Stage =
  | 'Exploring'
  | 'Researching'
  | 'Designing'
  | 'Developing'
  | 'Prototyping'
  | 'Piloting'
  | 'Operating';

export interface Initiative {
  slug: string;
  name: string;
  /** Usually one stage; work spanning stages lists each. */
  stages: Stage[];
  area: string;
  /** Card text on the home and initiatives pages. */
  summary: string;
  /** Card link label. */
  cardLink: string;
  /** Shown in "Featured initiatives" on the home page. */
  featured: boolean;
  /** Lead line under the name on the initiative's own page. */
  tagline: string;
  sections: Section[];
}

/** The public development labels, in order. */
export const developmentLabels: Stage[] = [
  'Exploring',
  'Researching',
  'Designing',
  'Prototyping',
  'Piloting',
  'Operating',
];

/** Every stage, in order — used to order the stage filter. */
export const stageOrder: Stage[] = [
  'Exploring',
  'Researching',
  'Designing',
  'Developing',
  'Prototyping',
  'Piloting',
  'Operating',
];

export const initiatives: Initiative[] = [
  {
    slug: 'real-good-communities',
    name: 'Real Good Communities',
    stages: ['Developing'],
    area: 'Communities & Social Infrastructure',
    summary:
      'A growing network of communities, programmes and shared spaces where people can connect, participate, pursue things that matter to them, support one another and contribute to practical social good.',
    cardLink: 'Explore Real Good Communities',
    featured: true,
    tagline: 'A community for connection, participation, support and practical good',
    sections: [
      {
        blocks: [
          'Real Good Communities is a growing network of communities and programmes designed to make it easier for people to connect, pursue things that matter to them, find useful support, contribute what they can and create things together.',
          'Canberra is the founding local community.',
        ],
      },
      {
        heading: 'Real Good Canberra',
        blocks: [
          'Real Good Canberra is the local operating base for Real Good Communities.',
          'It will bring together:',
          {
            list: [
              'social gatherings;',
              'thoughtful discussion;',
              'learning and workshops;',
              'cultural activities;',
              'practical-good projects;',
              'peer connection;',
              'opportunities to contribute;',
              'community-led activities;',
              'connections into relevant organisations and services.',
            ],
          },
          'The aim is to build a community that becomes increasingly capable through the relationships, knowledge and participation of the people within it.',
        ],
      },
      {
        heading: 'What we are testing',
        blocks: [
          'The first year will help us understand:',
          {
            list: [
              'what draws people into meaningful participation;',
              'which activities people return to;',
              'how useful relationships form;',
              'what kinds of opportunities people want to contribute to;',
              'how participants access support and practical pathways;',
              'what capabilities the community develops over time;',
              'which operating and revenue models can sustain the work.',
            ],
          },
        ],
      },
      {
        heading: 'Current work',
        blocks: [
          {
            list: [
              'Establishing the Real Good Canberra identity and community infrastructure.',
              'Developing the initial programme portfolio.',
              'Building member onboarding and communications.',
              'Designing participation and contribution pathways.',
              'Developing the Care Collective and Pathways Support.',
              'Establishing partner relationships.',
              'Developing outcome and learning measures.',
              'Building the digital participant experience.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'social-infrastructure-collaborative',
    name: 'Real Good Social Infrastructure Collaborative',
    stages: ['Designing'],
    area: 'Social Infrastructure & Organisational Systems',
    summary:
      'A platform for designing, testing and strengthening the social infrastructure through which connection, agency, collective capability and institutional learning can develop.',
    cardLink: 'Explore the Collaborative',
    featured: true,
    tagline: 'Building and learning from social infrastructure',
    sections: [
      {
        blocks: [
          'The Real Good Social Infrastructure Collaborative develops the models, methods and operating capabilities behind Real Good’s community and social-infrastructure work.',
          'Its current architecture explores a progression through:',
          { strong: 'Connect → Relate → Effectuate → Uplift → Mobilise → Achieve → Reform → Elevate' },
          'These stages correspond to different capabilities including:',
          {
            list: [
              'creating social connection;',
              'fostering mutual support;',
              'developing agency and capability;',
              'building collective capability;',
              'facilitating beneficial action;',
              'synthesising social insight;',
              'contributing to institutional change;',
              'strengthening social infrastructure.',
            ],
          },
          'The model is a working architecture to be tested and refined through practice.',
        ],
      },
      {
        heading: 'What the Collaborative does',
        blocks: [
          'The Collaborative supports:',
          {
            list: [
              'social-infrastructure design;',
              'programme architecture;',
              'community capability modelling;',
              'partnership development;',
              'outcome and measurement design;',
              'synthesis of community insight;',
              'organisational learning;',
              'research and framework development;',
              'replication and adaptation of useful practices.',
            ],
          },
          'Real Good Communities provides an initial environment in which this work can be applied and tested.',
        ],
      },
    ],
  },
  {
    slug: 'pathways-support',
    name: 'Pathways Support',
    stages: ['Designing'],
    area: 'Practical Support & Agency',
    summary:
      'A practical approach to helping people make sense of complex situations, identify useful options and move towards clearer next steps.',
    cardLink: 'Explore Pathways Support',
    featured: true,
    tagline: 'Making complex situations easier to understand and act on',
    sections: [
      {
        blocks: [
          'Pathways Support is being developed for situations where several parts of life, work or support have become difficult to navigate at once.',
          'It focuses on sense-making, practical options, next steps, coordination and continuity.',
          'The aim is not to replace specialist services.',
          'It is to make it easier to understand the wider situation, identify useful pathways and connect the different forms of support or action that may be relevant.',
        ],
      },
      {
        heading: 'What Pathways Support may include',
        blocks: [
          {
            list: [
              'clarifying goals, needs or priorities;',
              'understanding available options;',
              'identifying useful services and resources;',
              'planning practical next steps;',
              'connecting different areas of support;',
              'documenting decisions or important information;',
              'maintaining continuity while several organisations are involved.',
            ],
          },
          'The initial service model will be tested before broader development.',
        ],
      },
    ],
  },
  {
    slug: 'care-collective',
    name: 'Real Good Care Collective',
    stages: ['Designing'],
    area: 'Community Care & Support',
    summary:
      'A developing network of contributors, associates and partner organisations supporting connection, community care, practical guidance and pathways into specialist help.',
    cardLink: 'Explore the Care Collective',
    featured: true,
    tagline: 'Building a stronger community layer of care',
    sections: [
      {
        blocks: [
          'The Real Good Care Collective brings together contributors, associates and partner organisations that help Real Good Communities welcome people, facilitate participation, provide practical support and connect specialist help when appropriate.',
          'The Collective is designed around complementary roles rather than trying to turn one organisation into every kind of service.',
        ],
      },
      {
        heading: 'Areas of contribution',
        blocks: [
          {
            list: [
              'welcoming and community connection;',
              'peer and social support;',
              'facilitation;',
              'practical guidance;',
              'community activities;',
              'resource and service navigation;',
              'specialist partnerships;',
              'contributor development and training.',
            ],
          },
          'The work will develop with clear role boundaries, safeguarding practices and referral pathways.',
        ],
      },
    ],
  },
  {
    slug: 'digital-spaces',
    name: 'Real Good Digital Spaces',
    stages: ['Exploring', 'Designing'],
    area: 'Technology & Community',
    summary: 'Real Good Digital Spaces will support participation across Real Good Communities.',
    cardLink: 'Explore Digital Spaces',
    featured: false,
    tagline: 'Extending participation beyond physical events',
    sections: [
      {
        blocks: [
          'Real Good Digital Spaces will support participation across Real Good Communities.',
          'The digital layer is intended to help people:',
          {
            list: [
              'stay connected;',
              'discover activities and opportunities;',
              'find relevant groups;',
              'access useful information;',
              'share knowledge and resources;',
              'coordinate activities;',
              'contribute across geography;',
              'continue relationships and work begun elsewhere.',
            ],
          },
          'Early development will use existing community platforms where appropriate while longer-term requirements are explored.',
        ],
      },
    ],
  },
];

export function getInitiative(slug: string): Initiative | undefined {
  return initiatives.find((i) => i.slug === slug);
}
