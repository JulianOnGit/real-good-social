// Where a service enquiry goes once the form has validated it.
//
// Pages build an `Enquiry` and call `sendEnquiry`; they do not know how it is
// delivered. Today the site has no backend, so the enquiry is handed to the
// visitor's own email client, as on the contact page. Setting
// `ENQUIRY_ENDPOINT` switches every service form to posting JSON instead — to
// a form service, a CRM webhook or an intake function — with no change to the
// pages. That endpoint is responsible for validating again and for filtering
// spam, and its origin must be allowed by `connect-src` in
// infra/response-headers-policy.json.
import { CONTACT_EMAIL } from '../data/contact';

/** Null until Real Good has an intake endpoint to post enquiries to. */
const ENQUIRY_ENDPOINT: string | null = null;

export interface Enquiry {
  /** Routing metadata, so a service enquiry is identifiable wherever it lands. */
  source: 'realgoodsocial.org';
  service: string;
  enquiry_type: 'service-enquiry';
  /** The service's name, for subject lines. */
  serviceName: string;
  /** The answers, in form order. Empty answers are left out. */
  answers: { field: string; label: string; value: string }[];
}

/**
 * `received`: the endpoint accepted the enquiry.
 * `composed`: a pre-filled email was opened; it is not sent until the visitor
 * sends it, so the page must not claim it has been received.
 */
export type EnquiryOutcome = 'received' | 'composed';

function mailtoHref(enquiry: Enquiry): string {
  const name = enquiry.answers.find((a) => a.field === 'name')?.value ?? '';
  // mailto: bodies use CRLF line breaks (RFC 6068).
  const body = [
    `Service: ${enquiry.serviceName}`,
    `Enquiry type: ${enquiry.enquiry_type} (${enquiry.service})`,
    `Source: ${enquiry.source}`,
    ...enquiry.answers.flatMap((a) => ['', `${a.label}:`, a.value.replace(/\r?\n/g, '\r\n')]),
  ].join('\r\n');
  const subject = `[${enquiry.serviceName}] Enquiry from ${name}`;

  // Percent-encode by hand: URLSearchParams writes spaces as "+", which mail
  // clients show as a literal plus sign.
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Delivers an enquiry. Rejects if an endpoint is configured and refuses it. */
export async function sendEnquiry(enquiry: Enquiry): Promise<EnquiryOutcome> {
  if (!ENQUIRY_ENDPOINT) {
    window.location.href = mailtoHref(enquiry);
    return 'composed';
  }

  const response = await fetch(ENQUIRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  });
  if (!response.ok) throw new Error(`Enquiry endpoint responded ${response.status}`);
  return 'received';
}
