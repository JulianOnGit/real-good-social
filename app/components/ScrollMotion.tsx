import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Progressive scroll-reveal.
 *
 * Nothing here is required for the page to be readable: the server renders all
 * content visible, and this only opts in once JS runs and the visitor hasn't
 * asked for reduced motion. Elements already well into the screen at mount are
 * revealed in the same frame they're hidden, so there is no flash of missing
 * content. Elements just peeking in at the bottom animate in straight after the
 * page opens, so the first screen never shows an empty band waiting for a
 * scroll.
 *
 * Two kinds of target:
 *   - Groups  — a list or grid. The *container* is observed, and when it comes
 *               into view its children cascade in sequence, so the set reads as
 *               one connected chain instead of each row animating individually
 *               as the scroll position happens to reach it.
 *   - Solos   — standalone blocks that reveal on their own.
 */

const GROUP_SELECTOR = ['.ruled-list', '.ruled-grid'].join(',');

const SOLO_SELECTOR = [
  '[data-reveal]',
  '.section-head',
  '.split__aside',
  '.split__body',
  '.teaser',
  '.statement',
  '.callout',
  '.filter-bar',
  '.contact-form',
  '.contact-aside',
  '.section-foot',
  '.prose > p',
].join(',');

/**
 * Long-form reading is left completely still. Animating an article's body as
 * you scroll fights with reading it.
 */
const NO_MOTION_WITHIN = '.article-body';

/**
 * Only self-contained statement blocks animate word by word — the standalone,
 * clearly delineated sections. Paragraphs that are part of a longer body of
 * text reveal as whole blocks; word-by-word there would be tiring to read.
 */
const WORD_SELECTOR = '.statement';

/**
 * Word cadence: the opening words arrive deliberately, as though the sentence
 * is being thought through, then the rest follow in quick succession once it
 * has "found" what it wants to say.
 */
const DELIBERATE_WORDS = 4;
const DELIBERATE_MS = 95;
const FLOWING_MS = 17;

function wordDelay(index: number): number {
  if (index < DELIBERATE_WORDS) return index * DELIBERATE_MS;
  return DELIBERATE_WORDS * DELIBERATE_MS + (index - DELIBERATE_WORDS) * FLOWING_MS;
}

/**
 * Wrap each word in a span so it can be animated individually.
 * Paragraphs containing markup (links, emphasis) are left alone — rebuilding
 * their contents would throw that markup away.
 */
function splitIntoWords(el: HTMLElement): boolean {
  if (el.dataset.words === 'split' || el.children.length > 0) return false;

  const text = el.textContent ?? '';
  if (!text.trim()) return false;

  const fragment = document.createDocumentFragment();
  let index = 0;

  for (const token of text.split(/(\s+)/)) {
    if (token === '') continue;
    if (/^\s+$/.test(token)) {
      fragment.appendChild(document.createTextNode(token));
      continue;
    }
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = token;
    span.style.setProperty('--word-delay', `${wordDelay(index)}ms`);
    fragment.appendChild(span);
    index += 1;
  }

  el.textContent = '';
  el.appendChild(fragment);
  el.dataset.words = 'split';
  el.classList.add('has-words');
  return true;
}

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 10;

/**
 * How far up the screen something must come before it reveals: soon after it
 * starts occupying screen area. Waiting until it is well up the viewport leaves
 * an awkward band of empty space below the fold while you scroll toward it.
 */
const ROOT_MARGIN = '0px 0px -12% 0px';
/** Above this line at mount: shown at once, without animating. */
const ALREADY_IN_VIEW = 0.85;
/** Anything else on screen before the first scroll animates in after this. */
const PEEK_REVEAL_MS = 450;

/** Longest reveal transition in motion.css, plus a little slack. */
const REVEAL_MS = 810;
/** Backstop: nothing stays un-settled beyond this, whatever else happens. */
const SETTLE_BACKSTOP_MS = 6000;

export default function ScrollMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.dataset.motion = 'on';

    const viewportHeight = window.innerHeight;
    const observed: Element[] = [];
    const timers: number[] = [];

    const isInView = (el: Element) =>
      el.getBoundingClientRect().top < viewportHeight * ALREADY_IN_VIEW;

    /**
     * Reveal an item, then mark it "settled" once its entry animation has run.
     * Hover styling is suppressed until then, so a row sliding in under the
     * cursor doesn't flicker into its hover state mid-flight.
     */
    const reveal = (el: HTMLElement) => {
      if (el.classList.contains('is-revealed')) return;
      el.classList.add('is-revealed');
      const delay = Number.parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0;
      const settle = () => el.classList.add('is-settled');
      // Two independent paths to settled, so hover can never be left disabled.
      timers.push(window.setTimeout(settle, delay + REVEAL_MS));
      el.addEventListener('transitionend', settle, { once: true });
    };

    /** Already on screen at mount: no animation runs, so settle immediately. */
    const revealNow = (el: HTMLElement) => {
      el.classList.add('is-revealed', 'is-settled');
    };

    // --- Groups: prime the children, observe the container ---
    const groups = Array.from(document.querySelectorAll<HTMLElement>(GROUP_SELECTOR)).filter(
      (el) => !el.closest('.hero') && !el.closest(NO_MOTION_WITHIN),
    );

    // On desktop a group is short enough to read as one chain, so the container
    // triggers and its items cascade. On mobile the same group stacks into a
    // tall column — chaining it would run most of the animation off-screen — so
    // each item reveals on its own as you scroll to it.
    const chainGroups = window.matchMedia('(min-width: 900px)').matches;

    for (const group of groups) {
      const items = Array.from(group.children) as HTMLElement[];
      if (items.length === 0) continue;

      items.forEach((item, index) => {
        item.classList.add('will-reveal');
        if (chainGroups && index > 0) {
          item.style.setProperty(
            '--reveal-delay',
            `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS}ms`,
          );
        }
      });

      if (chainGroups) {
        if (isInView(group)) {
          for (const item of items) revealNow(item);
        } else {
          observed.push(group);
        }
        continue;
      }

      for (const item of items) {
        if (isInView(item)) revealNow(item);
        else observed.push(item);
      }
    }

    // --- Solos: standalone blocks, skipping anything already inside a group ---
    const solos = Array.from(document.querySelectorAll<HTMLElement>(SOLO_SELECTOR)).filter(
      (el) =>
        !el.closest('.hero') &&
        !el.closest(NO_MOTION_WITHIN) &&
        !el.parentElement?.closest(GROUP_SELECTOR),
    );

    for (const el of solos) {
      el.classList.add('will-reveal');
      if (el.matches(WORD_SELECTOR)) splitIntoWords(el);

      if (isInView(el)) {
        revealNow(el);
      } else {
        observed.push(el);
      }
    }

    // Threshold stays at 0 and the delay comes from the negative bottom margin.
    // A percentage threshold would be unsafe: for anything taller than the
    // viewport the required fraction can never be visible, leaving it hidden.
    const revealTarget = (target: HTMLElement) => {
      observer.unobserve(target);
      peekObserver.unobserve(target);
      if (target.matches(GROUP_SELECTOR)) {
        for (const item of Array.from(target.children)) reveal(item as HTMLElement);
      } else {
        reveal(target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) revealTarget(entry.target as HTMLElement);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    // Until the first scroll, anything on screen at all is revealed — including
    // the start of the next section peeking in at the bottom — so the first
    // screen never shows an empty band. This is an observer rather than a
    // one-off measurement because the layout shifts when the web font arrives.
    const mountedAt = performance.now();
    const peekObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          const wait = Math.max(0, PEEK_REVEAL_MS - (performance.now() - mountedAt));
          timers.push(window.setTimeout(() => revealTarget(target), wait));
        }
      },
      { threshold: 0 },
    );
    const stopPeeking = () => peekObserver.disconnect();
    window.addEventListener('scroll', stopPeeking, { once: true, passive: true });

    for (const el of observed) {
      observer.observe(el);
      peekObserver.observe(el);
    }

    // With a deep trigger line, anything sitting inside the bottom band at
    // maximum scroll would never cross it. Reveal whatever is left once the
    // page bottom is reached so nothing can be stranded.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 16;
      if (!atBottom) return;
      for (const el of document.querySelectorAll<HTMLElement>('.will-reveal:not(.is-revealed)')) {
        reveal(el);
      }
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Backstop for the *settled* flag only. It must never add `is-revealed`:
    // doing so fires every remaining animation on a timer, so content further
    // down the page has already animated by the time you scroll to it.
    timers.push(
      window.setTimeout(() => {
        for (const el of document.querySelectorAll('.is-revealed:not(.is-settled)')) {
          el.classList.add('is-settled');
        }
      }, SETTLE_BACKSTOP_MS),
    );

    return () => {
      observer.disconnect();
      peekObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', stopPeeking);
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
