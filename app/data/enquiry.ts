// Fields and validation for a service enquiry (the form on a service page).
// Pure helpers, like `contact.ts`: they run in the browser, and whatever
// receives the enquiry should apply the same rules again.

export const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'text', label: 'Text message' },
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number]['value'];

export const CONTACT_METHOD_LABELS: Record<string, string> = Object.fromEntries(
  CONTACT_METHODS.map((m) => [m.value, m.label]),
);

export interface ServiceEnquiryFields {
  name: string;
  email: string;
  phone: string;
  help: string;
  change: string;
  other: string;
  /** A contact method, or empty for no preference. */
  preferredContact: string;
}

export type ServiceEnquiryField = keyof ServiceEnquiryFields;

/** In page order, so the first field with an error can take focus. */
export const SERVICE_ENQUIRY_FIELD_ORDER: ServiceEnquiryField[] = [
  'name',
  'email',
  'phone',
  'help',
  'change',
  'other',
  'preferredContact',
];

export type ServiceEnquiryErrors = Partial<Record<ServiceEnquiryField, string>>;

export type ServiceEnquiryValidation =
  | { ok: true; data: ServiceEnquiryFields }
  | { ok: false; errors: ServiceEnquiryErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+() .-]+$/;
const OPTIONAL_MAX = 3000;

export function validateServiceEnquiry(fields: ServiceEnquiryFields): ServiceEnquiryValidation {
  const errors: ServiceEnquiryErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const help = fields.help.trim();
  const change = fields.change.trim();
  const other = fields.other.trim();
  const preferredContact = fields.preferredContact.trim();

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 120) errors.name = 'Name is too long.';

  if (!email && !phone) {
    errors.email = 'Please give us an email address or a phone number.';
  } else {
    if (email && !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
    if (phone && (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 8)) {
      errors.phone = 'Please enter a valid phone number.';
    }
  }

  if (help.length < 10) errors.help = 'Please tell us a little about what you would like help with.';
  else if (help.length > 5000) errors.help = 'This is too long (5000 characters maximum).';
  if (change.length > OPTIONAL_MAX) errors.change = `This is too long (${OPTIONAL_MAX} characters maximum).`;
  if (other.length > OPTIONAL_MAX) errors.other = `This is too long (${OPTIONAL_MAX} characters maximum).`;

  if (preferredContact && !(preferredContact in CONTACT_METHOD_LABELS)) {
    errors.preferredContact = 'Please choose one of the listed contact methods.';
  } else if (preferredContact === 'email' && !email) {
    errors.email ??= 'Please add an email address so we can email you.';
  } else if ((preferredContact === 'phone' || preferredContact === 'text') && !phone) {
    errors.phone ??= 'Please add a phone number so we can reach you that way.';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { name, email, phone, help, change, other, preferredContact } };
}
