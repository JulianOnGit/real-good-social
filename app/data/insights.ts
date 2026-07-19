export type InsightCategory = 'Ideas' | 'Projects' | 'Research' | 'Updates';

export interface InsightParagraph {
  heading?: string;
  body: string[];
}

export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  date: string; // ISO
  readingMinutes: number;
  summary: string;
  content: InsightParagraph[];
}

export const insights: Insight[] = [
  {
    slug: 'building-practical-systems-for-social-good',
    title: 'Building practical systems for social good',
    category: 'Ideas',
    date: '2026-06-30',
    readingMinutes: 6,
    summary:
      'Why the gap between good intentions and effective action is a systems problem — and what an organisation can usefully do about it without overstating its reach.',
    content: [
      {
        body: [
          'A great deal of social effort is sincere, well-informed, and still ineffective. Not because people lack commitment, but because the systems around them are fragmented. Coordination is weak, institutional pathways are unclear, and the practical support needed to turn concern into durable action is often missing.',
          'Real Good Social exists to work on that gap. Not by adding another campaign, but by developing the ventures, tools, and collaborations that make effective social action easier to initiate, coordinate, sustain, and scale.',
        ],
      },
      {
        heading: 'Good intentions are not the bottleneck',
        body: [
          'It is tempting to frame social problems as a shortage of care. In practice, the binding constraint is usually structural. A community organisation knows exactly what its members need but cannot spare the capacity to build the tool that would help. A researcher has evidence that never reaches the people who could act on it. A promising idea stalls because no one owns the unglamorous work of turning it into an operating model.',
          'These are not failures of goodwill. They are failures of systems — and systems can be designed, tested, and improved.',
        ],
      },
      {
        heading: 'What a practical response looks like',
        body: [
          'We think the useful unit of work is a durable capability, not a one-off intervention. A template that many partnerships can reuse. A piece of software that removes the same obstacle for thousands of people. A clear, honest way to describe how developed a venture actually is.',
          'This is deliberately unglamorous. It favours reusable infrastructure over visible heroics, and long-term value over symbolic wins.',
        ],
      },
      {
        heading: 'Honesty about stage is part of the work',
        body: [
          'Early organisations are often pushed to sound more established than they are. We would rather be precise. Across this site, every initiative carries a visible development stage — from Exploring to Operating — so that partners and supporters can calibrate their expectations and their involvement.',
          'Transparency about uncertainty is not a weakness to be managed. It is a feature of trustworthy institutions, and we intend to treat it as part of the Real Good Social brand.',
        ],
      },
      {
        heading: 'Where this goes',
        body: [
          'Real Good Social is early. The portfolio is small and deliberately so. What we are building first is the foundation: a coherent purpose, a handful of concrete initiatives, and clear pathways for the partners, researchers, builders, and supporters who want to help.',
          'If that describes you, we would welcome the conversation.',
        ],
      },
    ],
  },
  {
    slug: 'stages-not-slogans',
    title: 'Stages, not slogans: describing an early venture honestly',
    category: 'Research',
    date: '2026-07-10',
    readingMinutes: 4,
    summary:
      'A short note on the Exploring-to-Operating vocabulary we use to describe development stage, and why a shared language for maturity matters.',
    content: [
      {
        body: [
          'When someone asks “is this real?”, they are usually asking a more precise question: how developed is it, and what can I reasonably expect if I get involved? A slogan cannot answer that. A stage can.',
        ],
      },
      {
        heading: 'A small, consistent vocabulary',
        body: [
          'We label every initiative with one of six stages: Exploring, Researching, Designing, Prototyping, Piloting, and Operating. The point is not precision theatre. It is to give partners and supporters an honest signal of maturity and the kind of evidence that should accompany it.',
          'An Exploring concept should be described as a question, not a promise. An Operating capability should be able to show results. Most of what a young organisation does sits somewhere in between — and saying so plainly builds more trust than polish ever will.',
        ],
      },
      {
        heading: 'Why it is worth the discipline',
        body: [
          'Shared vocabulary reduces the cost of every conversation. Funders can compare like with like. Partners can match their involvement to the stage. And the organisation itself is held to describing progress in terms of movement between stages rather than volume of activity.',
          'This note accompanies our Stage Signals research, which is developing the framework in more depth.',
        ],
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
