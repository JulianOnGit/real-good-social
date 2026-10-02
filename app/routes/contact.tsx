import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Route } from './+types/contact';
import PageHero from '../components/PageHero';
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_CATEGORY_LABELS,
  CONTACT_EMAIL,
  purposeToCategory,
  validateContact,
  type ContactFields,
} from '../data/contact';
import { ABN, BUSINESS_NAME, LEGAL_ENTITY } from '../data/legal';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Contact — Real Good Social' },
    {
      name: 'description',
      content:
        'Contact Real Good Social about partnerships, initiatives, research, contributing, funding or other opportunities to work together.',
    },
  ];
}

/**
 * Composes the enquiry as a `mailto:` message.
 *
 * This is a static site with no backend, so the visitor's own mail client is
 * the delivery path. Sending therefore cannot be confirmed from here — the page
 * says the message was *opened for sending*, never that it was received.
 */
function mailtoHref(fields: ContactFields): string {
  const categoryLabel = ENQUIRY_CATEGORY_LABELS[fields.category] ?? fields.category;

  const body = [
    `Purpose:      ${categoryLabel}`,
    `Name:         ${fields.name}`,
    `Email:        ${fields.email}`,
    `Organisation: ${fields.organisation || '—'}`,
    '',
    fields.message,
  ].join('\n');

  const params = new URLSearchParams({
    subject: `[${categoryLabel}] Enquiry from ${fields.name}`,
    body,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialCategory = purposeToCategory(searchParams.get('purpose'));

  const [errors, setErrors] = useState<Record<string, string>>();
  const [composed, setComposed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: real users leave this hidden field empty.
    if (String(form.get('website') ?? '').trim() !== '') {
      setComposed(true);
      return;
    }

    const fields: ContactFields = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      organisation: String(form.get('organisation') ?? ''),
      category: String(form.get('category') ?? ''),
      message: String(form.get('message') ?? ''),
    };

    const result = validateContact(fields);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors(undefined);
    window.location.href = mailtoHref(result.data);
    setComposed(true);
  }

  if (composed) {
    return (
      <>
        <PageHero eyebrow="Contact" title="Your message is ready" />
        <section className="section section--surface">
          <div className="container container-narrow">
            <div className="callout callout--success" role="status">
              <h2 className="mt-0">Finish sending it from your email application</h2>
              <p>
                We have opened a pre-filled message to <strong>{CONTACT_EMAIL}</strong>. Nothing
                has been sent until you press send in your email application.
              </p>
              <p className="meta">
                Nothing happened? You can email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
              <button className="btn btn--secondary" type="button" onClick={() => setComposed(false)}>
                Write another message
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation"
        lead="Tell us what you are working on, what problem you are trying to solve or where you think our work might connect."
      />

      <section className="section section--surface">
        <div className="container contact-grid">
          <form className="contact-form card" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
              {errors?.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
              {errors?.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="organisation">
                Organisation <span className="muted">(optional)</span>
              </label>
              <input id="organisation" name="organisation" type="text" autoComplete="organization" />
              {errors?.organisation && <span className="field-error">{errors.organisation}</span>}
            </div>

            <div className="field">
              <label htmlFor="category">What would you like to talk about?</label>
              <select id="category" name="category" defaultValue={initialCategory} required>
                {ENQUIRY_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors?.category && <span className="field-error">{errors.category}</span>}
            </div>

            <div className="field">
              <label htmlFor="message">Your message</label>
              <textarea id="message" name="message" rows={6} required />
              {errors?.message && <span className="field-error">{errors.message}</span>}
            </div>

            {/* Honeypot — hidden from real users. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button className="btn" type="submit">
              Compose message
            </button>
            <p className="meta form-privacy">
              This opens a message in your email application. Your details stay on your device until
              you choose to send it. See our <Link to="/privacy">privacy notice</Link>.
            </p>
          </form>

          <aside className="contact-aside">
            <h2>Other ways to reach us</h2>
            <dl className="contact-details">
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
              <dt>Based in</dt>
              <dd>Australia · working with people and organisations anywhere</dd>
            </dl>
            <hr className="divider" />
            <p className="muted">
              Real Good Social is operated by {LEGAL_ENTITY}.
            </p>
            <dl className="contact-details">
              <dt>Legal entity</dt>
              <dd>{LEGAL_ENTITY}</dd>
              <dt>Operating brand</dt>
              <dd>{BUSINESS_NAME}</dd>
              {ABN && (
                <>
                  <dt>ABN</dt>
                  <dd>{ABN}</dd>
                </>
              )}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
