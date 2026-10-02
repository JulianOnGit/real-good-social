import type { Section } from './content';

export type Stage =
  | 'Exploring'
  | 'Researching'
  | 'Designing'
  | 'Prototyping'
  | 'Piloting'
  | 'Early operation'
  | 'Operating';

export interface Initiative {
  slug: string;
  name: string;
  /** Usually one stage; work spanning stages lists each. */
  stages: Stage[];
  area: string;
  /** Where the initiative was founded, if it is place-based. */
  location?: string;
  /** Card text on the home and initiatives pages. */
  summary: string;
  /** Card link label. */
  cardLink: string;
  /** Shown in "What we’re building" on the home page. */
  featured: boolean;
  /** Lead line under the name on the initiative's own page. */
  tagline: string;
  sections: Section[];
}

/** Every stage, in order — used to order the stage filter. */
export const stageOrder: Stage[] = [
  'Exploring',
  'Researching',
  'Designing',
  'Prototyping',
  'Piloting',
  'Early operation',
  'Operating',
];

export const initiatives: Initiative[] = [
  {
    slug: 'real-good-communities',
    name: 'Real Good Communities',
    stages: ['Designing', 'Early operation'],
    area: 'Communities & Social Infrastructure',
    location: 'Canberra',
    summary:
      'A growing community for connection, participation, practical support and contribution.',
    cardLink: 'Explore Real Good Communities',
    featured: true,
    tagline: 'Building a community that becomes more capable through participation',
    sections: [
      {
        blocks: [
          'Real Good Communities is being developed as a network of local and digital communities where people can connect, participate, pursue things that matter to them, contribute what they know or can do, and find useful support when they need it.',
          'The starting point is that communities can create capabilities that are difficult to reproduce through isolated services or one-off activities. When people meet repeatedly, they begin to learn who knows what, who is interested in which problems, who is willing to help and who can be relied upon to follow something through. Relationships form, but so does practical knowledge about the network itself. Over time, that can make it easier to find expertise, organise activity, identify collaborators, access support or initiate something new.',
          'Real Good Communities is being designed around that cumulative effect.',
        ],
      },
      {
        heading: 'Real Good Canberra',
        blocks: [
          'Canberra is the first local community and the initial environment in which the model will be developed.',
          'The city contains a dense concentration of public servants, researchers, technologists, community organisations, social enterprises, advocates, cultural institutions and people with specialist knowledge across a wide range of social issues. Real Good Canberra creates opportunities for those capabilities to encounter one another outside their usual organisational boundaries.',
          'The programme will include a mix of social gatherings, discussions, learning activities, cultural experiences, practical projects and opportunities to contribute. The intention is to create enough variety that different forms of involvement can emerge naturally, so each person can find the kind of participation that suits them.',
          'For one person, useful participation may mean meeting people they enjoy spending time with. For another, it may mean finding collaborators around a project. Someone else may contribute specialist knowledge, facilitate an activity, help another participant navigate a problem, or form a relationship with an organisation they would not otherwise have encountered.',
          {
            label: 'Working question',
            callout: 'What capabilities does a community build through engagement and participation?',
          },
          'Attendance is one signal of whether the community is becoming more capable. We also want to understand whether people are forming useful relationships, whether knowledge is becoming easier to find, whether participants are initiating activities themselves, whether contribution becomes more accessible, and whether the network is developing durable connections with organisations outside it.',
        ],
      },
      {
        heading: 'What we’re building',
        blocks: [
          {
            items: [
              {
                title: 'A recurring community programme',
                text: 'Social, cultural, learning and practical activities that create multiple entry points into participation.',
              },
              {
                title: 'Contribution pathways',
                text: 'Clearer ways for participants to move from attending into contributing, organising, facilitating or initiating.',
              },
              {
                title: 'Pathways Support',
                text: 'A practical layer for helping people make sense of situations, identify options and move towards useful next steps.',
              },
              {
                title: 'Real Good Care Collective',
                text: 'A community-based capability for welcome, practical support, peer connection and appropriate referral.',
              },
              {
                title: 'Digital Spaces',
                text: 'Online infrastructure that supports continuity, discovery, coordination and participation across geography.',
              },
              {
                title: 'Partnerships',
                text: 'Relationships with organisations that can extend what the community knows, offers and can connect people with.',
              },
            ],
          },
        ],
      },
      {
        heading: 'What we want to learn',
        blocks: [
          'The first year of Real Good Communities will help us examine what makes people want to return, which forms of participation produce durable relationships, what makes contribution accessible rather than burdensome, which capabilities emerge naturally, and which require deliberate facilitation.',
          'We also want to understand how a community becomes less dependent on central organisers, which forms of support are useful before specialist intervention is needed, and how community-generated knowledge can become useful beyond the community itself.',
          'The aim is to build enough real activity that future decisions can be based on what people actually use, value and contribute to.',
        ],
      },
    ],
  },
  {
    slug: 'social-infrastructure-collaborative',
    name: 'Real Good Social Infrastructure Collaborative',
    stages: ['Designing'],
    area: 'Social Infrastructure · Systems · Research',
    summary:
      'Developing and testing better ways to build social capability and infrastructure.',
    cardLink: 'Explore the Collaborative',
    featured: true,
    tagline: 'Developing the systems that make social capability easier to build',
    sections: [
      {
        blocks: [
          'The Real Good Social Infrastructure Collaborative is being developed as the part of Real Good that works explicitly on the design of social infrastructure.',
          'Its purpose is to understand and improve the structures through which connection, agency, collective capability, coordination and institutional learning become possible.',
          'Broad concepts such as *community*, *engagement* and *impact* can become too imprecise once you try to design around them. A person attending an event, developing a trusted relationship, gaining greater practical agency, joining a collaborative project, or contributing insight that changes an institution may all be described as forms of engagement, yet each represents a different kind of change.',
          'The Collaborative develops more precise models for those differences and tests whether they are useful in practice.',
        ],
      },
      {
        heading: 'Current capability architecture',
        blocks: [
          '**Connect → Relate → Effectuate → Uplift → Mobilise → Achieve → Reform → Elevate**',
          '**Connect** concerns the creation of meaningful social contact.',
          '**Relate** concerns the development of relationships through which trust, mutual understanding and support can grow.',
          '**Effectuate** concerns practical agency: whether people are better able to understand possibilities and act on them.',
          '**Uplift** concerns the development of capability itself.',
          '**Mobilise** concerns bringing multiple people and capabilities into useful coordination.',
          '**Achieve** concerns translating coordinated capability into beneficial action.',
          '**Reform** concerns the point at which accumulated insight and capability contribute to organisational or institutional change.',
          '**Elevate** concerns strengthening the wider social infrastructure from which further capability can emerge.',
          {
            callout:
              'The model is a working architecture: a map of distinct capabilities that can develop in many orders, and often alongside one another.',
          },
          'Its purpose is analytical: to make different kinds of capability visible enough to design for, compare and evaluate.',
        ],
      },
      {
        heading: 'What the Collaborative works on',
        blocks: [
          {
            items: [
              {
                title: 'Programme architecture',
                text: 'How different activities contribute to different forms of capability.',
              },
              {
                title: 'Measurement',
                text: 'How connection, participation, agency and collective capability can be examined in ways that capture the full depth of what they produce.',
              },
              {
                title: 'Community insight',
                text: 'How distributed experience can be synthesised into useful social knowledge.',
              },
              {
                title: 'Institutional connection',
                text: 'How community-derived insight can become useful to organisations with the ability to respond.',
              },
              {
                title: 'Operating models',
                text: 'How social infrastructure can be stewarded sustainably over time.',
              },
              {
                title: 'Replication',
                text: 'What should remain locally specific and what can become reusable across different contexts.',
              },
            ],
          },
          'Real Good Communities provides the first practical environment in which this work can be tested. The Collaborative develops models and methods; the community provides the conditions in which those models can be challenged by real participation.',
          'The value of the architecture depends on whether it helps us notice something useful, design something better, or understand more clearly what our work is actually producing.',
        ],
      },
    ],
  },
  {
    slug: 'pathways-support',
    name: 'Pathways Support',
    stages: ['Designing'],
    area: 'Practical Support · Agency',
    summary:
      'Helping people understand complex situations and find practical ways forward.',
    cardLink: 'Explore Pathways Support',
    featured: true,
    tagline: 'Understanding the whole situation before deciding what kind of help is needed',
    sections: [
      {
        blocks: [
          'Many support systems begin with a category. A person has a housing problem, a work problem, a financial problem, a legal problem, a health problem or some other defined need. Once the category is clear, the task is to find the relevant service.',
          'That model works well when the problem fits the service architecture. It becomes less useful when several parts of a situation are interacting at once.',
          'A work problem may depend on housing instability. Financial pressure may be downstream of reduced capacity elsewhere. Someone may technically have access to several services while lacking the time, knowledge or administrative capacity to navigate them. Resolving one issue in isolation may produce little improvement because another part of the situation continues to constrain what can happen.',
          'Pathways Support is being developed for that space.',
          'Its starting point is a wider question:',
          '**What is happening across the situation as a whole, and what would make progress more achievable?**',
          'That means developing a coherent view of the relevant parts of the situation, how they interact, what matters most, what is urgent, what depends on what, and where an additional capability or intervention could make the greatest difference.',
          {
            label: 'Working question',
            callout: 'What becomes visible when you model the whole situation?',
          },
          'Whole-situation modelling can reveal dependencies that are difficult to see when each issue is treated separately. Several apparent problems may share one underlying constraint. One intervention may need to happen before several others become useful. Two issues may be reinforcing one another. A relatively small change may unlock progress across several domains.',
          'The objective is to widen the frame just enough to identify the relationships that materially affect the next decision.',
        ],
      },
      {
        heading: 'What Pathways Support may involve',
        blocks: [
          {
            list: [
              'clarifying the overall situation;',
              'identifying priorities and dependencies;',
              'understanding available options;',
              'locating relevant services or resources;',
              'planning practical next steps;',
              'coordinating actions across several areas;',
              'documenting important information;',
              'maintaining continuity while multiple organisations are involved.',
            ],
          },
          'Pathways Support works alongside specialist professional services, helping make the wider situation more intelligible and helping people move through it with greater coherence.',
        ],
      },
    ],
  },
  {
    slug: 'care-collective',
    name: 'Real Good Care Collective',
    stages: ['Designing'],
    area: 'Community Care · Practical Support',
    summary:
      'Building stronger community capacity for care, guidance and practical support.',
    cardLink: 'Explore the Care Collective',
    featured: true,
    tagline: 'Building more capability for care around a community',
    sections: [
      {
        blocks: [
          'There is a substantial range of useful support that sits between handling something entirely alone and entering a formal specialist service.',
          'People help one another in that space constantly. They listen, explain something unfamiliar, make an introduction, help organise a task, share relevant experience, accompany someone through a difficult process, or notice that another person could use support.',
          'Communities already produce many of these forms of care informally. The Real Good Care Collective asks what becomes possible when a community develops that capability more deliberately.',
          'The objective is to strengthen the everyday forms of support that sit around specialist practice, while keeping the distinction between community care and specialist practice clear.',
          'That means developing people who are good at welcoming participants, facilitating conversations, providing practical guidance, helping organise next steps, recognising when a person may need something more specialised, and making an appropriate connection when they do.',
          'It also means maintaining relationships with people and organisations that hold specialist capabilities the community can draw on.',
          'Over time, the Care Collective could become a connective layer around Real Good Communities: people who know how to help within their role, understand where that role ends, and know how to bring in additional capability when it is needed.',
        ],
      },
      {
        heading: 'Current areas of development',
        blocks: [
          {
            items: [
              {
                title: 'Contributor roles',
                text: 'Defining the different ways people can contribute care, guidance, facilitation and practical support.',
              },
              {
                title: 'Boundaries',
                text: 'Clarifying what belongs within community support and what should move into specialist practice.',
              },
              {
                title: 'Safeguarding',
                text: 'Developing practices appropriate to the kinds of interactions the community enables.',
              },
              {
                title: 'Training',
                text: 'Identifying the knowledge and skills that help contributors perform their roles well.',
              },
              {
                title: 'Referral relationships',
                text: 'Building connections with specialist organisations and practitioners.',
              },
              {
                title: 'Peer and group formats',
                text: 'Exploring where support is best provided through one-to-one interaction, peer connection or structured group activity.',
              },
            ],
          },
          'The aim is to strengthen the community’s capacity to care, as one valued part of a wider network of support.',
        ],
      },
    ],
  },
  {
    slug: 'digital-spaces',
    name: 'Real Good Digital Spaces',
    stages: ['Exploring', 'Designing'],
    area: 'Technology · Community Infrastructure',
    summary: 'Designing the digital layer around the community that actually develops.',
    cardLink: 'Explore Digital Spaces',
    featured: false,
    tagline: 'Designing the digital layer around the community that actually develops',
    sections: [
      {
        blocks: [
          'Real Good Digital Spaces begins with a practical question: what useful functions should a digital layer perform for the community that is actually developing?',
          'Some interactions begin in person but need somewhere to continue. People meet someone useful and later struggle to find them again. A conversation produces knowledge that disappears into chat history. Someone would contribute to a project if the opportunity were visible. A person cannot attend locally but could participate in work that is naturally digital.',
          'These are different requirements, and each may be best served by a different technological solution.',
          'The immediate approach is to use existing platforms where they already work well and allow the community’s needs to become clearer before committing to purpose-built technology.',
        ],
      },
      {
        heading: 'Functions we are exploring',
        blocks: [
          {
            items: [
              {
                title: 'Continuity',
                text: 'Helping relationships and activity persist between physical events.',
              },
              {
                title: 'Discovery',
                text: 'Making groups, activities, resources and contribution opportunities easier to find.',
              },
              {
                title: 'Coordination',
                text: 'Helping people organise work, projects and community activity.',
              },
              {
                title: 'Knowledge',
                text: 'Retaining useful information that would otherwise disappear across conversations and platforms.',
              },
              {
                title: 'Contribution',
                text: 'Making it easier for people to see where their skills, knowledge or time could be useful.',
              },
              {
                title: 'Distributed participation',
                text: 'Creating meaningful ways to participate across geography, with digital involvement valued as fully as local participation.',
              },
            ],
          },
          'The long-term digital architecture will be shaped by demonstrated community requirements, growing from what people actually use and value.',
          'Real Good Digital Spaces is therefore part of a wider social question: how digital infrastructure can support a functioning social system by strengthening the relationships and practices that make the system valuable.',
        ],
      },
    ],
  },
];

export function getInitiative(slug: string): Initiative | undefined {
  return initiatives.find((i) => i.slug === slug);
}
