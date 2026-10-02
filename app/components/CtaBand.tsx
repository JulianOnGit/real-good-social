import { Link } from 'react-router';

interface CtaAction {
  to: string;
  label: string;
}

interface CtaBandProps {
  title?: string;
  /** Pass `null` for no lead paragraph. */
  lead?: string | null;
  primary?: CtaAction;
  /** Outlined button beside the primary one. Pass `null` to omit. */
  secondary?: CtaAction | null;
}

/**
 * Closing engagement call, reused across pages. One centred thought: eyebrow,
 * headline, a single short sentence, then one primary action and a quieter
 * outlined one.
 */
export default function CtaBand({
  title = 'Build something good with us.',
  lead = 'Bring the change you want to see. We’ll bring the systems, tools and people to make it happen.',
  primary = { to: '/partner', label: 'Propose a partnership' },
  secondary = { to: '/contact', label: 'Contact us' },
}: CtaBandProps) {
  return (
    <section className="section--ink cta-band">
      <div className="container">
        <div className="cta-band__inner center">
          <p className="eyebrow">Work with Real Good Social</p>
          <h2>{title}</h2>
          {lead && <p className="lead">{lead}</p>}
          <div className="btn-row">
            <Link to={primary.to} className="btn btn--on-ink">
              {primary.label}
            </Link>
            {secondary && (
              <Link to={secondary.to} className="btn btn--on-ink btn--secondary">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
