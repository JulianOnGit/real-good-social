/**
 * Renders a 1200×630 link-preview card for every prerendered page, used as the
 * page's `og:image` (Discord, LinkedIn, Slack, iMessage…). Runs after
 * finalise-static, so new initiatives and insights get a card automatically.
 *
 * Each card is built from the page's own header — eyebrow, h1, and its lead or
 * byline — over a fixed brand background: the paper field and grid from the
 * site's hero, the hero's pathway diagram, and the blue brand bar.
 *
 * The card for `/x/y` is written to `share/x/y.png` (the home page to
 * `share/home.png`); `shareImagePath` in app/data/seo.ts must agree.
 *
 * Satori lays out the text and resvg rasterises it, so no browser is needed.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const CLIENT_DIR = path.resolve('build/client');
const OUT_DIR = path.join(CLIENT_DIR, 'share');
const WIDTH = 1200;
const HEIGHT = 630;
const BRAND = 'Real Good Social';

const COLOURS = {
  paper: '#f8f7f3',
  rule: '#e5e1d7',
  ink: '#14213d',
  blue: '#2457d6',
  muted: '#646c7e',
};

const fontFile = (weight) =>
  fs.readFile(require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`));
const fonts = await Promise.all(
  [500, 600, 700].map(async (weight) => ({ name: 'Inter', weight, data: await fontFile(weight) })),
);

// --- Reading the prerendered pages ------------------------------------------

const decode = (text) =>
  text
    .replace(/<!--.*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const first = (html, pattern) => {
  const match = html.match(pattern);
  return match ? decode(match[1]) : '';
};

/**
 * A supporting line short enough for the card. Prefer ending where the writing
 * does — the first sentence, then the first clause — before cutting mid-phrase.
 */
function shorten(text, max) {
  if (text.length <= max) return text;
  const sentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0];
  if (sentence && sentence.length <= max) return sentence;
  const clause = text.split(/\s[—–]\s|;\s|:\s/)[0];
  if (clause.length <= max && clause.length >= 40) return `${clause.replace(/[,.]$/, '')}.`;
  return `${text.slice(0, max).replace(/[\s,;:.—–-]+\S*$/, '')}…`;
}

/** The header the card is built from: eyebrow, title and one supporting line. */
function readHeader(html) {
  const hero = html.match(/<section class="(?:page-hero[^"]*|hero)">([\s\S]*?)<\/section>/)?.[1] ?? '';
  const eyebrow = first(hero, /<p class="eyebrow">([\s\S]*?)<\/p>/);
  const title = first(hero, /<h1[^>]*>([\s\S]*?)<\/h1>/);
  const lead = first(hero, /<p class="lead">([\s\S]*?)<\/p>/);
  // Articles: "Julian Knowles · Agency · 2 min read".
  const byline = hero.includes('class="byline"')
    ? [
        first(hero, /class="byline__name">([\s\S]*?)<\/span>/).replace(/ /g, '\u00a0'),
        ...[...hero.matchAll(/<div class="byline">[\s\S]*?<\/p><p>([\s\S]*?)<\/p>/g)].flatMap((m) =>
          decode(m[1].replace(/<span aria-hidden="true">[^<]*<\/span>/g, '|'))
            .split('|')
            // Non-breaking within each part, so "3 min read" never splits.
            .map((s) => s.trim().replace(/ /g, '\u00a0')),
        ),
      ]
        .filter(Boolean)
        .join('  ·  ')
    : '';
  return { eyebrow, title, support: byline || shorten(lead, 150) };
}

// --- Background --------------------------------------------------------------

/** The hero diagram, taken from the built home page so it always matches. */
async function heroMotif() {
  const home = await fs.readFile(path.join(CLIENT_DIR, 'index.html'), 'utf8');
  const svg = home.match(/<svg viewBox="0 0 420 360" class="hero-motif"[\s\S]*?<\/svg>/)?.[0];
  if (!svg) throw new Error('[share-images] hero diagram not found in index.html');
  return (
    svg
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>$/, '')
      // resvg has no CSS variables: use each var()'s fallback colour.
      .replace(/var\(--[\w-]+,\s*([^)]+)\)/g, '$1')
  );
}

async function renderBackground() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <pattern id="grid" width="88" height="88" patternUnits="userSpaceOnUse">
      <path d="M88 0H0V88" fill="none" stroke="${COLOURS.rule}" stroke-width="1"/>
    </pattern>
    <radialGradient id="fade" cx="0.8" cy="0.2" r="0.85">
      <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="field"><rect width="100%" height="100%" fill="url(#fade)"/></mask>
    <linearGradient id="bar" x1="0" x2="1">
      <stop offset="0" stop-color="${COLOURS.blue}"/><stop offset="1" stop-color="#5aa9f0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${COLOURS.paper}"/>
  <rect width="100%" height="100%" fill="url(#grid)" mask="url(#field)" opacity="0.8"/>
  <svg x="770" y="130" width="390" height="334" viewBox="0 0 420 360">${await heroMotif()}</svg>
  <rect y="${HEIGHT - 10}" width="100%" height="10" fill="url(#bar)"/>
</svg>`;
  return new Resvg(svg).render().asPng();
}

// --- Card --------------------------------------------------------------------

const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

function titleSize(title) {
  if (title.length <= 34) return 66;
  if (title.length <= 60) return 56;
  if (title.length <= 90) return 46;
  return 40;
}

function card({ eyebrow, title, support }, backgroundSrc, logoSrc) {
  const showEyebrow = eyebrow && eyebrow !== BRAND;
  return h(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      position: 'relative',
      fontFamily: 'Inter',
      color: COLOURS.ink,
    },
    { type: 'img', props: { src: backgroundSrc, width: WIDTH, height: HEIGHT, style: { position: 'absolute', top: 0, left: 0 } } },
    h(
      'div',
      {
        position: 'absolute',
        top: 64,
        left: 80,
        bottom: 66,
        width: 670,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 700, letterSpacing: -0.3 },
        { type: 'img', props: { src: logoSrc, width: 44, height: 43 } },
        BRAND,
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        ...(showEyebrow
          ? [
              h(
                'div',
                {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 22,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: 2.6,
                  textTransform: 'uppercase',
                  color: COLOURS.blue,
                },
                h('div', { width: 30, height: 2, background: COLOURS.blue }, ''),
                eyebrow,
              ),
            ]
          : []),
        h(
          'div',
          {
            fontSize: titleSize(title),
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: -0.035 * titleSize(title),
          },
          title,
        ),
        ...(support
          ? [h('div', { marginTop: 24, fontSize: 23, fontWeight: 500, lineHeight: 1.4, color: COLOURS.muted }, support)]
          : []),
      ),
      h('div', { display: 'flex', fontSize: 22, fontWeight: 600, color: COLOURS.blue }, 'realgoodsocial.org'),
    ),
  );
}

// --- Render every page -------------------------------------------------------

const toDataUri = (png) => `data:image/png;base64,${Buffer.from(png).toString('base64')}`;
const backgroundSrc = toDataUri(await renderBackground());
const logoSrc = toDataUri(await fs.readFile(path.join(CLIENT_DIR, 'logo.png')));

const pages = (await fs.readdir(CLIENT_DIR, { recursive: true })).filter(
  (file) => path.basename(file) === 'index.html' && !file.startsWith('share'),
);

for (const file of pages) {
  const html = await fs.readFile(path.join(CLIENT_DIR, file), 'utf8');
  const header = readHeader(html);
  if (!header.title) throw new Error(`[share-images] no <h1> in ${file}`);

  const dir = path.dirname(file).split(path.sep).join('/');
  const out = path.join(OUT_DIR, `${dir === '.' ? 'home' : dir}.png`);
  const svg = await satori(card(header, backgroundSrc, logoSrc), { width: WIDTH, height: HEIGHT, fonts });
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, new Resvg(svg).render().asPng());
}

console.log(`[share-images] rendered ${pages.length} link-preview cards`);
