import { Link } from 'react-router';
import type { Route } from './+types/what-is-good';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { currentPaper, paperLabel, paperPath, PUBLICATIONS_PATH } from '../data/paper';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'What Is Good? Our Philosophy — Real Good Social',
    description:
      'An introduction to how Real Good understands good: the many things worth valuing, a flourishing life, a good society, and the responsibilities that suffering and injustice create.',
    pathname: location.pathname,
    type: 'article',
  });
}

/** The short title the paper is cited by in running text. */
const PAPER_SHORT_TITLE = currentPaper.title.replace(/^Real Good:\s*/, '');

export default function WhatIsGood() {
  const paperHref = paperPath(currentPaper.slug);

  return (
    <>
      {/* The link-preview card is built from this header's eyebrow, h1 and lead. */}
      <PageHero
        eyebrow="Our philosophy"
        eyebrowTo="/about#what-we-mean-by-good"
        title="What is good?"
        lead="An introduction to how Real Good understands goodness, and to what it takes to make it actual."
      />

      <section className="section">
        <article className="container container-narrow prose article-body" data-accent="blue">
          <p>
            Most of us use the word good many times a day without stopping to ask what we mean by
            it. We speak of good intentions, good decisions, good institutions and good lives, and
            we expect to be understood. Yet these are different achievements, and an organisation
            that exists to help people do good owes some account of what it takes the word to mean.
          </p>
          <p>
            Real Good’s account begins with the first word of its name. Intentions can be good
            while their consequences are harmful, and benevolent language can sit comfortably
            beside indifference. By real good we mean goodness made actual: claims about what is
            worthwhile that stay answerable to the substance of people’s lives, and not to
            reputation, intention or the appearance of success. Making goodness actual is not the
            same as making it measurable. Friendship is valuable without producing a return, and
            beauty does not have to lead to anything further in order to matter.
          </p>
          <p>
            What follows is a short introduction to a philosophy that is still being developed.
            The argument is set out in full in our foundational whitepaper,{' '}
            <Link to={paperHref}>
              <em>{PAPER_SHORT_TITLE}</em>
            </Link>
            .
          </p>

          <h2>Many goods, and the claims of suffering</h2>
          <p>
            We do not think goodness can be reduced to a single measure. Truth, virtue,
            flourishing, care, beauty, freedom and justice each contribute something distinctive.
            Some matter chiefly for what they make possible, some because they are part of living
            well, and some deserve appreciation in themselves. This pluralism about value does not
            mean that every preference is equally defensible: an arrangement that violates dignity
            or imposes unjustified harm is not excused because it serves some other desirable end.
            It does mean that genuine goods sometimes compete, and that choosing between them
            calls for judgement, since no formula will do it for us. It also means that capability,
            whether knowledge, technology or organisation, is valuable for the worthwhile purposes
            it serves. A capable institution can pursue unjust ends more effectively than a clumsy
            one, and not everything worth having has to justify itself by what it produces next.
          </p>
          <p>
            A philosophy of good that spoke only of aspiration would be incomplete. Violence,
            persecution, exploitation and severe deprivation are not simply the absence of
            flourishing. Pain, humiliation and grief matter in their own right to the people who
            endure them, whatever improvements may follow later. The pursuit of good therefore
            carries responsibilities of protection, truth-seeking, accountability and repair, and
            these are owed for their own sake. Later prosperity does not cancel an earlier
            injustice, and some losses cannot be reversed at all. Relieving suffering and
            cultivating flourishing are both part of the work, and neither can stand in for the
            other.
          </p>

          <h2>A good life</h2>
          <p>
            What makes a human life go well is among the oldest questions in philosophy. The
            Aristotelian tradition of <em>eudaimonia</em> understands flourishing through the
            exercise of human capacities and the cultivation of virtue, and more recent work on
            human capability attends to the substantive freedoms people have to live in ways they
            value. Real Good’s own framework, A Better Life, belongs to this conversation. It is
            our developing contribution and not an established theory. It identifies five
            conditions of a flourishing life: virtue or self-governance, practical wisdom, social
            goods, material goods and moral courage. Character and judgement matter on this
            account, and so do the relationships, resources and opportunities through which a
            person’s choices become meaningful.
          </p>
          <p>
            The framework also distinguishes five orientations that the improvement of a life may
            take: establishing a baseline of safety, bringing order to practical circumstances,
            re-establishing a sense of identity, building a better life and, at the furthest
            horizon, what we provisionally call a makariotic life. These are not stages that
            everyone must pass through, and they do not rank human worth. A person may stand in
            different places in different parts of their life, and development can be interrupted
            or reversed. The makariotic ideal asks what a life might become when its principal
            conditions are secure enough that it is no longer dominated by managing deprivation
            or insecurity: a life rich in freedom, relationships, creativity and beauty, though
            never beyond vulnerability or loss. We use the idea to widen the imagination, and it
            prescribes no destination.
          </p>

          <h2>A good society</h2>
          <p>
            Nobody flourishes alone. Every life depends on relationships, institutions, knowledge
            and material arrangements that no individual creates. Care is central here, because
            vulnerability recurs throughout every life and is no exception to it, and so is
            culture, through which people come to understand themselves and find meaning and
            beauty together. A shared life does not require uniformity. A society can sustain
            common institutions without demanding that everyone share one identity.
          </p>
          <p>
            Political Virtuosity is the name we give to a developing account of excellence in
            collective organisation: how well a society provides for its members, governs itself
            legitimately, enables its citizens to take part, and recognises and remedies its own
            wrongs. A society does not become good by becoming more powerful. It becomes better
            when its capabilities are directed more wisely and more fairly. Two further ideas
            extend the inquiry. Makariopolis describes a society whose institutions make many
            different forms of flourishing broadly attainable. Apodictic beatitude is a more
            speculative question about how secure the conditions of a good collective life could
            ultimately become. Both are philosophical horizons. Neither is a prediction or an
            established stage of social development, and the framework that contains them has not
            been validated.
          </p>
          <p>
            How people should respond to conflict remains an open area of inquiry for us. We think
            reason, goodwill, grace and epistemic vigilance are valuable dispositions to bring to
            disagreement, and that fairness, protection and accountability all deserve weight. So
            does accommodation, by which we mean a willingness to revise our own understandings
            and arrangements when a conflict shows that they could not take in what the other
            party was saying. These are considerations for a theory still to be developed. They do
            not amount to a method of conflict resolution, and reconciliation is not always the
            right conclusion.
          </p>

          <h2>From philosophy to practice</h2>
          <p>
            Real Good organises its practical work through an architecture of nine domains:
            values, knowledge, alignment, social support, agency, a better life, culture, social
            justice and technology. The first of these concern orientation and understanding,
            what matters and what is true. The others concern how people cooperate and care for
            one another, how they act on their own judgement, how individual lives and shared
            culture are enriched, how wrongs are prevented and remedied, and the tools through
            which all of this is carried out. The domains influence one another in every
            direction, and they are a way of organising our activities, not a complete map of
            everything that is good.
          </p>
          <p>
            Each activity we undertake has to be justified by its own purposes and consequences,
            and we try to evaluate it honestly. A sincere intention is not a result, and the fact
            that something is easy to measure does not make it important.
          </p>
          <p>
            All of this is provisional. The frameworks described here are at different stages of
            development, and we expect experience and argument to revise them. For a fuller
            treatment of Real Good’s philosophy, read our foundational whitepaper,{' '}
            <Link to={paperHref}>
              <em>{PAPER_SHORT_TITLE}</em>
            </Link>
            .
          </p>

          <footer className="article-end paper-end">
            <div>
              <p className="label paper-cite__label">{paperLabel(currentPaper)}</p>
              <p className="paper-cite__title">{currentPaper.title}</p>
              <p className="meta">
                {currentPaper.author} · {currentPaper.publisher} · {currentPaper.date}
              </p>
            </div>
            <Link to={paperHref} className="text-link">
              Read the foundational whitepaper
            </Link>
            <Link to={PUBLICATIONS_PATH} className="text-link">
              All publications
            </Link>
          </footer>
        </article>
      </section>

      <CtaBand />
    </>
  );
}
