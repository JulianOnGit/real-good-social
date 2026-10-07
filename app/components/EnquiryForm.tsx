import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { CONTACT_EMAIL } from '../data/contact';
import {
  CONTACT_METHODS,
  CONTACT_METHOD_LABELS,
  SERVICE_ENQUIRY_FIELD_ORDER,
  validateServiceEnquiry,
  type ServiceEnquiryErrors,
  type ServiceEnquiryFields,
} from '../data/enquiry';
import { sendEnquiry, type Enquiry, type EnquiryOutcome } from '../services/enquiries';

interface EnquiryFormProps {
  /** Routing identifier, e.g. `pathways-support`. */
  service: string;
  serviceName: string;
  /** Called once, when the visitor first puts focus in the form. */
  onStart?: () => void;
  /** Called when an enquiry has been handed over for delivery. */
  onSubmitted?: () => void;
}

function toEnquiry(service: string, serviceName: string, data: ServiceEnquiryFields): Enquiry {
  const answers = [
    { field: 'name', label: 'Name', value: data.name },
    { field: 'email', label: 'Email', value: data.email },
    { field: 'phone', label: 'Phone', value: data.phone },
    {
      field: 'preferredContact',
      label: 'Preferred contact method',
      value: CONTACT_METHOD_LABELS[data.preferredContact] ?? '',
    },
    { field: 'help', label: 'What would you like some help with?', value: data.help },
    { field: 'change', label: 'What would you most like to be different?', value: data.change },
    { field: 'other', label: 'Anything else that would be useful for us to know?', value: data.other },
  ];
  return {
    source: 'realgoodsocial.org',
    service,
    enquiry_type: 'service-enquiry',
    serviceName,
    answers: answers.filter((a) => a.value !== ''),
  };
}

/**
 * The short enquiry form on a service page. It validates in the browser, hands
 * the enquiry to `sendEnquiry`, and then replaces itself with a confirmation.
 */
export default function EnquiryForm({ service, serviceName, onStart, onSubmitted }: EnquiryFormProps) {
  const [errors, setErrors] = useState<ServiceEnquiryErrors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [outcome, setOutcome] = useState<EnquiryOutcome>();
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  // The confirmation replaces the form, so focus has to be moved to it.
  useEffect(() => {
    if (outcome) confirmationRef.current?.focus();
  }, [outcome]);

  function handleFocus() {
    if (started.current) return;
    started.current = true;
    onStart?.();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (name: string) => String(form.get(name) ?? '');

    // Honeypot: real users leave this hidden field empty.
    if (text('website').trim() !== '') {
      setOutcome('received');
      return;
    }

    const result = validateServiceEnquiry({
      name: text('name'),
      email: text('email'),
      phone: text('phone'),
      help: text('help'),
      change: text('change'),
      other: text('other'),
      preferredContact: text('preferredContact'),
    });

    if (!result.ok) {
      setErrors(result.errors);
      const firstInvalid = SERVICE_ENQUIRY_FIELD_ORDER.find((field) => result.errors[field]);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setFailed(false);
    setSending(true);
    try {
      setOutcome(await sendEnquiry(toEnquiry(service, serviceName, result.data)));
      onSubmitted?.();
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  if (outcome === 'received') {
    return (
      <div className="callout callout--success enquiry-confirmation" role="status" tabIndex={-1} ref={confirmationRef}>
        <h3>Thanks — we’ve received your message.</h3>
        <p>
          We’ll review what you’ve shared and get in touch to discuss what you are looking for and
          whether {serviceName} could be useful.
        </p>
        <Link to="/" className="text-link">
          Explore Real Good
        </Link>
      </div>
    );
  }

  if (outcome === 'composed') {
    return (
      <div className="callout callout--success enquiry-confirmation" role="status" tabIndex={-1} ref={confirmationRef}>
        <h3>Thanks — your message is ready to send.</h3>
        <p>
          We have opened it in your email application, addressed to <strong>{CONTACT_EMAIL}</strong>.
          Press send there and it will reach us. We’ll then get in touch to discuss what you are
          looking for and whether {serviceName} could be useful.
        </p>
        <p className="meta">
          Nothing happened? You can email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <div className="btn-row">
          <button className="btn btn--secondary" type="button" onClick={() => setOutcome(undefined)}>
            Write another message
          </button>
          <Link to="/" className="text-link">
            Explore Real Good
          </Link>
        </div>
      </div>
    );
  }

  const describedBy = (field: keyof ServiceEnquiryErrors, hint?: string) =>
    [errors[field] && `${field}-error`, hint].filter(Boolean).join(' ') || undefined;
  const error = (field: keyof ServiceEnquiryErrors) =>
    errors[field] && (
      <span className="field-error" id={`${field}-error`}>
        {errors[field]}
      </span>
    );

  return (
    <form
      className="card contact-form"
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      ref={formRef}
      noValidate
    >
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy('name')}
        />
        {error('name')}
      </div>

      <fieldset className="field-group">
        <legend>How should we contact you?</legend>
        <p className="meta" id="contact-hint">
          An email address or a phone number — either is fine.
        </p>
        <div className="field-group__fields">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email', 'contact-hint')}
            />
            {error('email')}
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone', 'contact-hint')}
            />
            {error('phone')}
          </div>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="help">What would you like some help with?</label>
        <textarea
          id="help"
          name="help"
          rows={5}
          required
          aria-invalid={errors.help ? true : undefined}
          aria-describedby={describedBy('help', 'help-hint')}
        />
        <span className="meta" id="help-hint">
          A few sentences is plenty. Please leave out detailed medical or other sensitive
          information — we can talk about what is relevant later.
        </span>
        {error('help')}
      </div>

      <div className="field">
        <label htmlFor="change">
          What would you most like to be different? <span className="muted">(optional)</span>
        </label>
        <textarea
          id="change"
          name="change"
          rows={3}
          aria-invalid={errors.change ? true : undefined}
          aria-describedby={describedBy('change')}
        />
        {error('change')}
      </div>

      <div className="field">
        <label htmlFor="other">
          Anything else that would be useful for us to know?{' '}
          <span className="muted">(optional)</span>
        </label>
        <textarea
          id="other"
          name="other"
          rows={3}
          aria-invalid={errors.other ? true : undefined}
          aria-describedby={describedBy('other')}
        />
        {error('other')}
      </div>

      <fieldset className="field-group">
        <legend>
          Preferred contact method <span className="muted">(optional)</span>
        </legend>
        <div className="choices">
          <label className="choice">
            <input type="radio" name="preferredContact" value="" defaultChecked />
            No preference
          </label>
          {CONTACT_METHODS.map((method) => (
            <label key={method.value} className="choice">
              <input
                type="radio"
                name="preferredContact"
                value={method.value}
                aria-describedby={describedBy('preferredContact')}
              />
              {method.label}
            </label>
          ))}
        </div>
        {error('preferredContact')}
      </fieldset>

      {/* Honeypot — hidden from real users. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {failed && (
        <p className="field-error" role="alert">
          Sorry — we couldn’t send your message just now. Please try again, or email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      )}

      <button className="btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Start a conversation'}
      </button>
      <p className="meta">
        There is no commitment in getting in touch. See our <Link to="/privacy">privacy notice</Link>.
      </p>
    </form>
  );
}
