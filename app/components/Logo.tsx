import { Link } from 'react-router';
// Imported (not referenced from /public) so Vite emits a content-hashed URL —
// this guarantees the browser fetches the current, transparent artwork rather
// than any previously cached copy.
// Pre-scaled WebP copies of `logo-mark.png` (the full-size source) for the default 34px
// height at 1x/2x/3x pixel density, so no screen downloads more than it shows.
import LOGO_MARK_1X from '../assets/logo-mark@1x.webp';
import LOGO_MARK_2X from '../assets/logo-mark@2x.webp';
import LOGO_MARK_3X from '../assets/logo-mark@3x.webp';

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
        src={LOGO_MARK_1X}
        srcSet={`${LOGO_MARK_1X} 1x, ${LOGO_MARK_2X} 2x, ${LOGO_MARK_3X} 3x`}
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
