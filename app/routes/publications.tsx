import { Link } from 'react-router';
import type { Route } from './+types/publications';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import {
  getPaper,
  INTRODUCTION_PATH,
  paperIsoDate,
  paperMinutes,
  paperPath,
  papers,
} from '../data/paper';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Publications — Real Good Social',
    description:
      'Working papers setting out the philosophy behind Real Good Social’s work, including earlier papers kept as a record of its development.',
    pathname: location.pathname,
  });
}

export default function Publications() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Working papers"
        lead="The philosophy behind Real Good’s work, set out in full. Earlier papers stay here as a record of how the thinking has developed."
      />

      <section className="section">
        <div className="container">
          <ul className="ruled-list ruled-list--keyed">
            {papers.map((paper) => {
              const successor = getPaper(paper.supersededBy);
              return (
                <li key={paper.slug}>
                  <div>
                    <p className="label">{successor ? 'Superseded' : 'Current'}</p>
                    <h2>
                      <Link to={paperPath(paper.slug)}>{paper.title}</Link>
                    </h2>
                  </div>
                  <div>
                    <p>{paper.subtitle}</p>
                    <p className="meta">
                      {paper.author} · Version {paper.version} ·{' '}
                      <time dateTime={paperIsoDate(paper)}>{paper.date}</time> ·{' '}
                      {paperMinutes(paper)} min read
                    </p>
                    {successor && (
                      <p className="meta">
                        Superseded by{' '}
                        <Link to={paperPath(successor.slug)}>
                          <em>{successor.title}</em>
                        </Link>
                        .
                      </p>
                    )}
                    <Link to={paperPath(paper.slug)} className="text-link">
                      {successor ? 'Read the earlier paper' : 'Read the paper'}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="publications-foot">
            <Link to={INTRODUCTION_PATH} className="text-link">
              What is good? An introduction
            </Link>
            <Link to="/insights" className="text-link">
              Insights from our projects and research
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
