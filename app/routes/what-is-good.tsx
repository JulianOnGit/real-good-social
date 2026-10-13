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
      'An introduction to Real Good’s philosophy: the many forms of good, a well-lived human life, a good society, and how worthwhile possibilities are made real.',
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
        title="What Is Good?"
        lead="An introduction to how Real Good understands goodness, and to what it takes to make it actual."
      />

      <section className="section">
        <article className="container container-narrow prose article-body" data-accent="blue">
          <p>
            Goodness is one of the most fundamental ideas in human life. We recognise it in the
            things we appreciate, the people we admire, the relationships we cultivate and the
            futures we hope to create. We speak of good decisions, good lives, good communities
            and good societies, recognising that some things are worthwhile and that the world
            contains possibilities worth pursuing.
          </p>
          <p>
            But what makes something good? Is it happiness, virtue, knowledge, beauty, freedom,
            love or the flourishing of life? How do these different forms of goodness relate to
            one another, and how might understanding them help us create more of what is
            worthwhile?
          </p>
          <p>
            For Real Good, these questions are foundational. We believe that{' '}
            <strong>
              the world contains extraordinary possibilities for good, and that people can develop
              the understanding, agency and capabilities to realise them
            </strong>
            . Our philosophy explores both the nature of goodness and the ways it can be
            cultivated, shared and made real.
          </p>
          <p>
            This introduction presents the central ideas underlying our approach. They are
            developed more extensively in our foundational publication,{' '}
            <Link to={paperHref}>
              <em>{PAPER_SHORT_TITLE}</em>
            </Link>
            .
          </p>

          <h2>The Many Forms of Good</h2>
          <p>
            Goodness cannot be reduced to a single quality or measure. It can be found in truth
            and understanding, wisdom and virtue, friendship and care, freedom and justice, beauty
            and creativity, and the fulfilment of meaningful aspirations. These are distinct forms
            of value, yet they frequently enrich and enable one another.
          </p>
          <p>
            Knowledge expands our understanding of what is possible. Wisdom helps us discern what
            is worth pursuing. Freedom and agency allow us to act upon our understanding, while
            relationships and cooperation make possible achievements beyond our individual
            capacities. Culture enriches our experience of life and opens new avenues for meaning,
            expression and appreciation.
          </p>
          <p>
            Some things are valuable because of what they make possible; others are valuable in
            themselves. A friendship need not serve some further purpose to be worthwhile, nor
            does beauty require a practical justification. Understanding goodness means
            appreciating this diversity while developing the judgement to navigate the
            relationships and occasional tensions between different values.
          </p>

          <h2>A Well-Lived Human Life</h2>
          <p>
            One of the most important expressions of goodness concerns what it means to live well.
            The philosophical tradition of <em>eudaimonia</em>, commonly understood as human
            flourishing, considers the good life as something richer than pleasure, material
            prosperity or the satisfaction of immediate preferences. It encompasses the
            development of our capacities, the cultivation of character and wisdom, meaningful
            relationships, worthwhile pursuits and participation in the world around us.
          </p>
          <p>
            Central to flourishing is{' '}
            <strong>
              agency: our ability to understand our circumstances, form meaningful purposes, make
              choices and act effectively in shaping our lives
            </strong>
            . As people develop knowledge, confidence, skills, relationships and resources, they
            can become increasingly capable of pursuing their aspirations and contributing to the
            lives of others.
          </p>
          <p>
            There is no single prescribed form of a good life. People find fulfilment through
            different combinations of relationships, creativity, intellectual inquiry,
            achievement, service, exploration and appreciation. A richer understanding of
            flourishing recognises this diversity while asking how we might expand the
            opportunities and capabilities through which people can live well.
          </p>
          <p>
            A good life is therefore not merely one in which fundamental needs are met. It is also
            one in which people can discover new possibilities, cultivate their potential and
            pursue increasingly meaningful forms of fulfilment.
          </p>

          <h2>A Good Society</h2>
          <p>
            Human flourishing is inseparable from the world we create together. Our knowledge,
            cultures, institutions, communities and technologies are products of collective
            endeavour, developed and enriched across generations. They extend our individual
            capabilities and enable achievements that would otherwise remain beyond our reach.
          </p>
          <p>
            A good society provides the conditions for people to live with dignity, freedom and
            security while cultivating opportunities for learning, participation, cooperation,
            creativity and meaningful achievement. It supports a diversity of worthwhile ways of
            living and enables people to contribute to the improvement of their shared
            circumstances.
          </p>
          <p>
            The goodness of a society is not measured solely by its prosperity, power or
            technological sophistication, but by the quality of life and possibilities these
            capabilities help bring about. Scientific discoveries can enable further discoveries,
            education can expand the agency of future generations, and well-designed institutions
            can make worthwhile opportunities more widely accessible.
          </p>
          <p>
            <strong>Goodness can be generative:</strong> what we achieve today can expand what
            becomes possible tomorrow. This gives collective progress a positive purpose beyond
            addressing immediate problems: the continuing enrichment of human life and the
            development of societies in which more people can flourish.
          </p>

          <h2>Making Goodness Real</h2>
          <p>
            Understanding what is good and bringing it into existence are distinct but closely
            connected undertakings. Knowledge helps us recognise worthwhile possibilities, while
            practical wisdom, agency, cooperation and effective systems help us realise them.
          </p>
          <p>
            This is the significance of <em>real</em> in Real Good. We are concerned not only with
            good intentions or admirable ideals, but with{' '}
            <strong>
              the actualisation of good: turning worthwhile possibilities into meaningful realities
            </strong>
            . Doing so requires capable people, supportive relationships, sound institutions,
            useful technologies and a willingness to learn from experience.
          </p>
          <p>
            Actualisation takes many forms. It may mean helping someone develop greater
            independence, enabling a community to organise around shared aspirations, creating
            knowledge that advances understanding, or building systems that allow people to
            achieve more together. Each accomplishment can also develop further capabilities and
            create new opportunities for good.
          </p>
          <p>
            Real Good seeks to contribute to this process by developing practical technology,
            organisations, communities and social infrastructure that strengthen people’s
            capacities to understand, pursue and achieve worthwhile outcomes. Our ambition is not
            simply to provide benefits to people, but to help them become increasingly capable
            participants in creating good for themselves and others.
          </p>

          <h2>An Ongoing Pursuit</h2>
          <p>
            Our understanding of goodness continues to develop through philosophical inquiry,
            practical experience and engagement with different perspectives. Optimism does not
            require overlooking suffering, injustice or the difficulties of human life; addressing
            these realities is an essential part of doing good. But our aspirations extend beyond
            overcoming problems to the cultivation of richer lives, stronger communities and
            greater possibilities for collective flourishing.
          </p>
          <p>
            We see goodness not as a final destination, but as an enduring subject of discovery,
            appreciation and purposeful action. As our understanding and capabilities develop, so
            too can our ability to recognise and realise possibilities that were previously beyond
            our reach.
          </p>
          {/* A paragraph the author set wholly in bold: a key statement, as in the papers. */}
          <p className="highlight">
            Real Good exists to help people understand what is worthwhile, develop the agency and
            capabilities to pursue it, and create a world in which more good is possible.
          </p>
          <p>
            For a fuller exploration of the philosophical foundations, including the nature of
            value, human flourishing, collective life and the actualisation of good, read{' '}
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
