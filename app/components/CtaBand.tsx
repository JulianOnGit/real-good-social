import { Link } from 'react-router';

interface CtaBandProps {
  title?: string;
  /** Pass `null` for no lead paragraph. */
  lead?: string | null;
}

/** Closing engagement call, reused across pages. */
export default function CtaBand({
  title = 'Build something good with us.',
  lead = 'Bring an idea, opportunity, capability or area of shared interest.',
}: CtaBandProps) {
  return (
    <section className="section section--ink cta-band">
      <div className="container container-narrow center">
        <h2>{title}</h2>
        {lead && <p className="lead mx-auto">{lead}</p>}
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/contact" className="btn btn--on-ink">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
