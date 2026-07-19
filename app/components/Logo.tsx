import { Link } from 'react-router';
// Imported (not referenced from /public) so Vite emits a content-hashed URL —
// this guarantees the browser fetches the current, transparent artwork rather
// than any previously cached copy.
import LOGO_MARK from '../assets/logo-mark.png';

interface LogoProps {
  /** Rendered on a dark background — flips the wordmark to white. */
  onInk?: boolean;
  /** Height of the mark in pixels. */
  size?: number;
  withWordmark?: boolean;
  /** Fired when the logo is activated, e.g. to close an open mobile menu. */
  onNavigate?: () => void;
}

/**
 * The Real Good brand mark: the interlocking ribbon-heart artwork from the
 * business card, paired with the "Real Good" wordmark.
 */
export default function Logo({
  onInk = false,
  size = 34,
  withWordmark = true,
  onNavigate,
}: LogoProps) {
  return (
    <Link to="/" className="logo" aria-label="Real Good Social — home" onClick={onNavigate}>
      <img
        className="logo__mark"
        src={LOGO_MARK}
        alt=""
        width={Math.round((size * 648) / 630)}
        height={size}
        aria-hidden="true"
      />
      {withWordmark && (
        <span className="logo__wordmark" data-on-ink={onInk ? 'true' : 'false'}>
          Real Good
        </span>
      )}
    </Link>
  );
}
