import { Link } from 'react-router';

/** Closing engagement call, reused across pages (brief section 3.1.8). */
export default function CtaBand() {
  return (
    <section className="section section--ink cta-band">
      <div className="container container-narrow center">
        <p className="eyebrow">Work with Real Good Social</p>
        <h2>There is concrete work to do, and useful ways to help.</h2>
        <p className="lead mx-auto">
          Whether you carry a problem worth solving, evidence worth applying, or capability worth
          contributing, we would welcome the conversation.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/partner" className="btn btn--on-ink">
            Propose a partnership
          </Link>
          <Link to="/contact" className="btn btn--secondary btn--on-ink">
            Contact Real Good Social
          </Link>
        </div>
      </div>
    </section>
  );
}
