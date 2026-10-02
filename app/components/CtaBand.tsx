import { Link } from 'react-router';

/** Closing engagement call, reused across pages (brief section 3.1.8). */
export default function CtaBand() {
  return (
    <section className="section section--ink cta-band">
      <div className="container container-narrow center">
        <p className="eyebrow">Work with Real Good</p>
        <h2>What could we build together?</h2>
        <p className="lead mx-auto">
          Bring an idea, opportunity, capability, question or area of shared interest.
        </p>
        <p className="lead mx-auto">
          We are interested in collaborations that can create useful new capacity for positive
          change.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/contact" className="btn btn--on-ink">
            Start a conversation
          </Link>
          <Link to="/what-we-do" className="btn btn--secondary btn--on-ink">
            Explore our work
          </Link>
        </div>
      </div>
    </section>
  );
}
