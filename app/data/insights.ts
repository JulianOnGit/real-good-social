import { firstParagraph, type Block } from './content';

export interface Insight {
  slug: string;
  title: string;
  category: string;
  /** Listing text; defaults to the first paragraph of the body. */
  summary?: string;
  body: Block[];
}

/**
 * Filter topics on the Insights page. An insight appears under a topic when its
 * category mentions it (e.g. "Measurement & Agency" under both Measurement and
 * Agency); topics no insight mentions are hidden.
 */
export const INSIGHT_TOPICS = [
  'Community',
  'Agency',
  'Social Infrastructure',
  'Systems',
  'Measurement',
  'Organisations',
  'Research',
];

export function hasTopic(insight: Insight, topic: string): boolean {
  return insight.category.toLowerCase().includes(topic.toLowerCase());
}

export function insightSummary(insight: Insight): string {
  return insight.summary ?? firstParagraph(insight.body);
}

export const insights: Insight[] = [
  {
    slug: 'community-capabilities-through-participation',
    title: 'What capabilities does a community build through engagement and participation?',
    category: 'Community & Capability',
    summary:
      'Communities are often measured through attendance or membership. We are interested in another question: what practical capabilities begin to exist as people repeatedly meet, participate, contribute and work together?',
    body: [
      'Communities are often described through their membership, events or social connections.',
      'Real Good Communities raises another question: as people repeatedly engage and participate, what new capabilities begin to exist within the community itself?',
      'Relationships may form.',
      'People may learn who has particular knowledge or experience.',
      'Participants may begin contributing skills.',
      'Trusted organisers and facilitators may emerge.',
      'Groups may become able to coordinate activities without relying on a single central organiser.',
      'Connections may form with external organisations and institutions.',
      'The question matters because these are not merely experiences of community.',
      'They may change what the community is practically capable of doing.',
      'This article explores how Real Good Communities is beginning to identify, describe and eventually measure those emerging capabilities.',
    ],
  },
  {
    slug: 'more-capacity-for-good-than-institutions-can-use',
    title: 'There is more capacity for good than our institutions know how to use',
    category: 'Social Systems',
    body: [
      'Many communities and institutions already contain substantial knowledge, expertise, goodwill and practical ability.',
      'The problem is not always creating capability from nothing.',
      'It can also be discovering what is already present, making it visible and finding ways for complementary capabilities to connect.',
      'Canberra provides a particularly interesting environment for this question.',
      'Government, universities, technology, research, community services, advocacy, business and social enterprise all exist within a relatively compact city.',
      'Yet organisational boundaries and social networks influence which capabilities ever encounter one another.',
      'This article explores what it would mean to treat unused or disconnected capability as a social opportunity in its own right.',
    ],
  },
  {
    slug: 'social-good-orchestration-problem',
    title: 'Social good often has an orchestration problem',
    category: 'Coordination',
    body: [
      'Useful people, knowledge, resources and organisations frequently exist without automatically assembling into the combination required for a particular opportunity.',
      'A community organisation may understand a problem but lack technical capability.',
      'A technologist may want to contribute but have no route into the relevant community.',
      'Research may exist without an implementation partner.',
      'An institution may have resources but limited access to the people whose experience should shape their use.',
      'The challenge is therefore sometimes less about producing another isolated capability and more about making existing capabilities easier to discover and combine.',
      'This article examines orchestration as a capability in its own right and how Real Good is beginning to design for it.',
    ],
  },
  {
    slug: 'social-infrastructure-as-productive-infrastructure',
    title: 'Social infrastructure can be productive infrastructure',
    category: 'Social Infrastructure',
    body: [
      'Infrastructure is valuable because it enables activity.',
      'Transport infrastructure enables movement.',
      'Digital infrastructure enables communication and computation.',
      'Financial infrastructure enables exchange.',
      'Real Good’s social-infrastructure work asks a related question:',
      {
        strong:
          'What additional activity becomes possible when people have stronger ways to meet, build relationships, share knowledge, find support, organise and act together?',
      },
      'This article explores social infrastructure not simply as a source of belonging, but as an enabling layer through which new social capabilities may emerge.',
    ],
  },
  {
    slug: 'measuring-increased-human-agency',
    title: 'What changes when we measure increased human agency as an intended programme outcome?',
    category: 'Measurement & Agency',
    body: [
      'Many programmes measure whether an activity was delivered and whether an immediate outcome occurred.',
      'Real Good is also interested in whether participation changes what someone is subsequently able to do.',
      'That could mean:',
      {
        list: [
          'understanding their options more clearly;',
          'reaching useful support;',
          'having a new person they can collaborate with;',
          'gaining a relevant skill;',
          'navigating an institution more effectively;',
          'organising an activity;',
          'making progress on something that matters to them;',
          'contributing capabilities to others.',
        ],
      },
      'This article explores how agency might be treated as an intended and measurable programme outcome without reducing it to a vague feeling of empowerment.',
    ],
  },
  {
    slug: 'are-the-choices-enough-to-increase-agency',
    title: 'How do you determine whether the choices available are enough to increase agency?',
    category: 'Agency',
    body: [
      'Having several theoretical options does not necessarily mean they are equally usable.',
      'A choice may depend on knowledge, time, money, confidence, relationships, practical support, institutional access or other capabilities.',
      'This creates an important design problem.',
      'If a programme, service or system aims to increase agency, it is not enough simply to count the number of options it presents.',
      'We need to understand whether those options are realistically exercisable.',
      'This article explores what that distinction could mean for service design, community support and Real Good’s broader approach to agency.',
    ],
  },
  {
    slug: 'modelling-the-whole-situation',
    title: 'What becomes visible when you model the whole situation?',
    category: 'Systems',
    body: [
      'Problems are often encountered through separate domains.',
      'Work.',
      'Housing.',
      'Relationships.',
      'Money.',
      'Community.',
      'Health.',
      'Institutions.',
      'Support.',
      'But once those areas are modelled together, different patterns can become visible.',
      'Several apparent problems may depend on the same underlying constraint.',
      'One missing capability may affect multiple parts of the situation.',
      'An intervention in one area may unlock progress somewhere else.',
      'What appeared to be separate difficulties may form a reinforcing system.',
      'This article explores what whole-situation modelling can reveal that is harder to see when each issue is analysed independently.',
    ],
  },
  {
    slug: 'one-capability-value-across-an-ecosystem',
    title: 'How can one capability create value across an ecosystem?',
    category: 'Ecosystems',
    body: [
      'A capability created for one initiative may become useful somewhere else.',
      'A partnership formed around a community project may support future research.',
      'A facilitation method may become reusable across programmes.',
      'A digital tool may make several services easier to access.',
      'Knowledge gained through one initiative may improve another.',
      'A community may surface opportunities for new ventures or institutional partnerships.',
      'This article explores how Real Good can design capabilities so that useful learning, relationships and infrastructure are able to travel across the wider ecosystem.',
    ],
  },
  {
    slug: 'community-insight-organisational-blind-spots',
    title: 'Using community insight to uncover organisational blind spots',
    category: 'Community Insight',
    body: [
      'Every organisation sees the world through particular interfaces.',
      'A service sees the people who reach that service.',
      'A government programme sees what its administrative categories record.',
      'A business sees its customers.',
      'A research project sees what it has chosen to measure.',
      'Those perspectives can be valuable while still leaving important things outside the frame.',
      'Community environments generate another form of knowledge: observations distributed across people with different experiences, relationships and institutional vantage points.',
      'This article explores how those observations might be gathered, synthesised and used to identify patterns or opportunities that are difficult for individual organisations to see from inside their own boundaries.',
    ],
  },
  {
    slug: 'how-positive-social-change-compounds',
    title: 'How positive social change can compound',
    category: 'Systems & Growth',
    body: [
      'A useful intervention can produce more than its immediate result.',
      'It can also create knowledge.',
      'Relationships.',
      'Trust.',
      'Skills.',
      'Infrastructure.',
      'New contributors.',
      'Institutional connections.',
      'A clearer understanding of what to do next.',
      'Those outputs can become inputs into further activity.',
      'This article explores how Real Good can identify and deliberately strengthen these compounding effects, so that positive work contributes to the capacity for further positive work.',
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
