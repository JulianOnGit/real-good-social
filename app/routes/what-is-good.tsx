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
      'An introduction to Real Good’s philosophy: what goodness is, a well-lived human life, a good society, and how worthwhile possibilities are made real.',
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
            What does it mean for something to be good? It is a question that lies beneath many of
            the choices we make, the things we value and the lives we hope to lead. When we
            describe a person, an experience, an achievement or a society as good, we recognise
            something worthwhile about it. Yet goodness takes many forms, from the simple
            enjoyment of a beautiful moment to the richness of a well-lived life or the shared
            achievements of humanity.
          </p>
          <p>
            At its heart, the question of goodness concerns <strong>what is worthwhile, why it
            matters, and how we might bring more of it into the world</strong>.
          </p>
          <p>
            For Real Good, this is both a philosophical question and a practical purpose. We
            believe that human life and society hold extraordinary possibilities, and that through
            understanding, agency and cooperation, we can become increasingly capable of realising
            them.
          </p>
          <p>
            Our foundational publication, <Link to={paperHref}><em>{PAPER_SHORT_TITLE}</em></Link>, explores these questions in greater
            philosophical depth. Here, we introduce the ideas that guide our understanding and
            aspirations.
          </p>

          <h2>Understanding Goodness</h2>
          <p>
            Goodness can be found in many aspects of existence. Knowledge, wisdom, friendship,
            beauty, freedom, creativity and justice are all worthwhile, although not necessarily
            for the same reasons. Some things are good because of the experiences they offer, some
            because of the qualities they embody, and others because of what they make possible.
          </p>
          <p>
            These different forms of goodness cannot always be reduced to a single measure.
            Friendship is not valuable in quite the same way as scientific knowledge, nor is a
            beautiful landscape good in the same sense as a just institution. Nevertheless, each
            gives us a reason to appreciate, preserve, pursue or cultivate something.
          </p>
          <p>
            Understanding goodness therefore involves more than identifying desirable outcomes. It
            means developing a richer appreciation of what matters, how different values relate to
            one another, and how they find expression in the world. Our understanding can deepen
            through philosophical reflection, knowledge, practical experience and engagement with
            different perspectives.
          </p>
          <p>
            Goodness, in this sense, is not merely something we seek to achieve. It is also
            something we can discover, appreciate and understand more fully.
          </p>

          <h2>A Well-Lived Human Life</h2>
          <p>
            One of the most important expressions of goodness concerns what it means for a human
            being to live well.
          </p>
          <p>
            The philosophical concept of <em>eudaimonia</em>, commonly understood as human
            flourishing, offers one way of approaching this question. A flourishing life
            encompasses more than happiness, material prosperity or the satisfaction of immediate
            preferences. It involves the development of our capacities, meaningful relationships,
            worthwhile pursuits, the exercise of wisdom and the opportunity to participate in and
            contribute to the world around us.
          </p>
          <p>
            Human flourishing is closely connected to <strong>agency: our capacity to understand
            our circumstances, make meaningful choices and act effectively in shaping our
            lives</strong>. Through learning, experience and the development of our capabilities,
            we become better able to pursue our aspirations, navigate challenges and participate
            in the creation of worthwhile outcomes.
          </p>
          <p>
            There is no single prescribed form of a good life. People find fulfilment through
            different combinations of relationships, intellectual inquiry, creativity,
            achievement, service, exploration and appreciation. A richer understanding of
            flourishing recognises this diversity while asking how we can expand the opportunities
            and capabilities through which people live well.
          </p>
          <p>
            The aspiration is not simply to meet the necessities of life, important as they are,
            but to enable people to develop their potential, exercise greater freedom and pursue
            increasingly meaningful and fulfilling lives.
          </p>

          <h2>A Good Society</h2>
          <p>
            Human flourishing does not occur in isolation. The possibilities available to each of
            us are profoundly shaped by our relationships, communities, cultures, institutions and
            the wider society in which we live.
          </p>
          <p>
            A good society is therefore more than a collection of individuals pursuing their own
            wellbeing. It is a shared environment in which people can live with dignity, develop
            their capabilities, participate meaningfully in collective life and contribute to
            purposes beyond themselves.
          </p>
          <p>
            Justice, freedom, security and mutual care are essential qualities of such a society.
            So too are opportunities for education, creativity, cultural enrichment, cooperation
            and meaningful achievement. A good society creates conditions in which diverse people
            can flourish, while recognising that they may have different understandings of what
            makes their lives worthwhile.
          </p>
          <p>
            But what does it mean for a society to become <em>better</em>?
          </p>
          <p>
            Social improvement involves more than increasing prosperity, strengthening
            institutions or advancing technology, although these can be important achievements. It
            concerns how these developments contribute to the lives people are able to lead, the
            relationships they can form, the freedoms they can exercise and the opportunities they
            can pursue.
          </p>
          <p>
            A society becomes better as it grows more capable of supporting human flourishing,
            enabling meaningful participation, cultivating justice and care, and expanding the
            possibilities available to its members. This includes responding to suffering and
            disadvantage, but also advancing knowledge, enriching culture, strengthening
            communities and creating new opportunities for individual and collective achievement.
          </p>
          <p>
            We can therefore aspire beyond a society that merely functions adequately towards one
            that increasingly enables people to live well and realise their potential. <strong>The
            promise of social progress lies not only in overcoming existing problems, but in what
            humanity might become capable of achieving together.</strong>
          </p>

          <h2>Making Goodness Real</h2>
          <p>
            Understanding goodness, living well and developing a better society are closely
            connected. What we recognise as worthwhile informs what we aspire towards, while our
            agency and collective capabilities determine how effectively we can pursue those
            aspirations.
          </p>
          <p>
            This is the significance of <em>real</em> in Real Good. We are concerned not only with
            recognising goodness or forming good intentions, but with <strong>the actualisation of
            good: bringing worthwhile possibilities into meaningful existence</strong>.
          </p>
          <p>
            Doing good involves translating understanding and aspiration into action. It requires
            knowledge, practical wisdom, capable people, supportive relationships and effective
            organisations and systems. It also requires learning from experience, examining
            consequences and improving our approaches as our understanding develops.
          </p>
          <p>
            For individuals, this may involve gaining the skills, resources or confidence to
            pursue meaningful goals. For communities, it may mean creating stronger relationships
            and opportunities for cooperation. For societies, it may involve developing
            institutions, technologies and shared capabilities that enable people to participate
            more fully in shaping their collective future.
          </p>
          <p>
            Real Good seeks to contribute to these possibilities by developing practical
            technology, organisations, communities and social infrastructure that strengthen
            people’s agency and their capacity to achieve worthwhile outcomes.
          </p>
          <p>
            Our ambition is not simply to deliver particular benefits, but to help create the
            conditions through which people become increasingly capable of understanding, pursuing
            and realising what they value.
          </p>

          <h2>Our Pursuit of Good</h2>
          <p>
            The question of what is good ultimately asks us to consider what makes existence
            worthwhile and what kind of world we have reason to create. It invites us to look
            beyond immediate needs and familiar measures of success towards the fuller
            possibilities of human life: deeper understanding, meaningful relationships, freedom
            and self-determination, creativity, accomplishment, justice, beauty and the enjoyment
            of existence itself.
          </p>
          <p>
            These aspirations have both individual and collective dimensions. We want people to
            have the opportunities and capabilities to shape fulfilling lives according to their
            own values and ambitions. We also want societies whose institutions, cultures and
            shared achievements enrich human experience, support meaningful participation and make
            increasingly ambitious possibilities attainable.
          </p>
          <p>
            For Real Good, the practical challenge is to turn these aspirations into reality. This
            means developing the knowledge, agency, relationships, organisations and technologies
            through which people can exercise greater influence over their circumstances and
            contribute to the world around them. It also means examining whether our efforts
            genuinely improve the lives people can lead and the conditions we create together.
          </p>
          <p>
            Our philosophy remains an ongoing inquiry, drawing upon established traditions of
            thought, developing ideas and practical experience. Its foundations are explored more
            extensively in <Link to={paperHref}><em>{PAPER_SHORT_TITLE}</em></Link>.
          </p>
          <p>
            The pursuit of good is therefore both a matter of understanding what is worthwhile and
            of developing our capacity to realise it, in our own lives and in the societies we
            create together.
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
