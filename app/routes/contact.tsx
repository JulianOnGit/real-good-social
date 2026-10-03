import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { Route } from './+types/contact';
import { pageMeta } from '../data/seo';
import PageHero from '../components/PageHero';
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_CATEGORY_LABELS,
  CONTACT_EMAIL,
  purposeToCategory,
  validateContact,
  type ContactFields,
} from '../data/contact';
import { ABN, LEGAL_ENTITY } from '../data/legal';

export function meta({ location }: Route.MetaArgs) {
  return pageMeta({
    title: 'Contact — Real Good Social',
    description:
      'Contact Real Good Social about partnerships, initiatives, research, contribution, funding or other opportunities.',
    pathname: location.pathname,
  });
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

  // mailto: bodies use CRLF line breaks (RFC 6068).
  const body = [
    `Purpose: ${categoryLabel}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Organisation: ${fields.organisation || '—'}`,
    '',
    fields.message.replace(/\r?\n/g, '\r\n'),
  ].join('\r\n');
  const subject = `[${categoryLabel}] Enquiry from ${fields.name}`;

  // Percent-encode by hand. URLSearchParams writes spaces as "+", which is only
  // a space in web forms — mail clients show it as a literal plus sign.
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
        <section className="section">
          <div className="container container-narrow">
            <div className="callout callout--success" role="status">
              <h2>Finish sending it from your email application</h2>
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
        title="Start a conversation."
        lead="Tell us what you’re working on and where you think Real Good could contribute."
      />

      <section className="section">
        <div className="container contact-grid">
          <form className="card contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
              {errors?.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="message">Message</label>
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
            <p className="meta">
              Nothing is sent until you choose to send it from your email application. See our{' '}
              <Link to="/privacy">privacy notice</Link>.
            </p>
          </form>

          <aside className="contact-aside">
            <dl className="facts facts--stacked">
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="label">Based in</dt>
                <dd>Australia</dd>
              </div>
              {ABN && (
                <div>
                  <dt className="label">ABN</dt>
                  <dd>{ABN}</dd>
                </div>
              )}
            </dl>
            <p className="meta">Real Good Social is operated by {LEGAL_ENTITY}.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
