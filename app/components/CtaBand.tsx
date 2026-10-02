import { Link } from 'react-router';

/** Closing engagement call, reused across pages (brief section 3.1.8). */
export default function CtaBand() {
  return (
    <section className="section section--ink cta-band">
      <div className="container container-narrow center">
        <p className="eyebrow">Build something worthwhile</p>
        <h2>Good things become possible when the right people, ideas and capabilities come together.</h2>
        <p className="lead mx-auto">
          Bring us a problem worth solving, an idea worth developing, evidence worth applying or
          capability worth contributing.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/partner" className="btn btn--on-ink">
            Work with us
          </Link>
          <Link to="/contact" className="btn btn--secondary btn--on-ink">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
