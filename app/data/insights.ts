export type InsightCategory = 'Ideas' | 'Projects' | 'Research' | 'Updates';

export interface InsightParagraph {
  heading?: string;
  /** One string per paragraph; `\n` inside a string is a line break. */
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
    title: 'Building better ways to do good',
    category: 'Ideas',
    date: '2026-06-30',
    readingMinutes: 6,
    summary:
      'Why worthwhile ideas so often stall between intention and implementation — and why building the missing systems can matter as much as the idea itself.',
    content: [
      {
        body: [
          'A remarkable amount of social effort begins with people who already care deeply and understand the problems around them.',
          'What is often missing is not concern. It is practical capacity.',
          'A community organisation may know exactly what would help but lack the time or technical capability to build it. A researcher may have useful evidence that never reaches the people positioned to act on it. Two organisations may be trying to solve the same problem without a good mechanism for finding one another.',
          'Real Good Social works on those missing pieces.',
        ],
      },
      {
        heading: 'Good intentions are only the beginning',
        body: [
          'A worthwhile idea still needs somewhere to live.',
          'It may need a team, a tool, a partnership, funding, a process, an operating model or an institution capable of carrying it forward.',
          'Those things are sometimes treated as administrative details surrounding the “real” work.',
          'We think they are part of the real work.',
        ],
      },
      {
        heading: 'Build capability, not just activity',
        body: [
          'The most useful intervention is often something that makes future action easier.',
          'A reusable partnership model. A piece of software that removes a recurring obstacle. A new organisation capable of carrying work forward. A common vocabulary that improves decisions across many projects.',
          'These things may be less visible than a one-off campaign, but they can change what becomes possible afterwards.',
        ],
      },
      {
        heading: 'Ideas should become more real over time',
        body: [
          'We describe initiatives using six development stages: Exploring, Researching, Designing, Prototyping, Piloting and Operating.',
          'The purpose is simple: an early question and an established service are both real, but they are real in different ways.',
          'Clear stages make it easier to understand what exists now, what is still uncertain and where someone else might usefully contribute.',
        ],
      },
      {
        heading: 'Where this leads',
        body: [
          'Real Good Social is being built around a broad proposition:',
          'society gets better not only when people care more, but when people have better ways to turn care, knowledge and collective effort into action.',
          'That creates a large design space.',
          'New ventures. Better tools. Stronger communities. More effective partnerships. New forms of social infrastructure.',
          'There is a great deal worth building.',
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
      'Why a simple vocabulary for development stage can make early projects easier to understand, support and improve.',
    content: [
      {
        body: [
          'When someone asks whether a new initiative is “real”, they are usually asking several different questions.',
          'Has anyone researched it?\nHas anything been designed?\nDoes a prototype exist?\nHas someone used it?\nIs it operating reliably?',
          'Those distinctions matter.',
        ],
      },
      {
        heading: 'A simple development vocabulary',
        body: [
          'We currently use six stages:',
          'Exploring. Researching. Designing. Prototyping. Piloting. Operating.',
          'An Exploring initiative may still be a question.',
          'A Prototyping initiative should have something tangible enough to test.',
          'An Operating initiative should be able to demonstrate that a functioning capability actually exists.',
          'The stages are not intended to reduce development to a rigid process. They provide a common language for describing where something stands.',
        ],
      },
      {
        heading: 'Why the distinction helps',
        body: [
          'Different stages need different kinds of support.',
          'A research-stage initiative may need evidence or specialist critique. A prototype may need testers. A pilot may need implementation partners. An operating venture may need resources to grow.',
          'Clearer language therefore does more than improve communication.',
          'It helps connect the right kind of participation to the right moment in the life of an idea.',
          'Stage Signals is our attempt to develop that vocabulary further.',
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
