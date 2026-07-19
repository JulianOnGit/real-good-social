// Contact constants and pure helpers. The site is static, so all of this runs
// in the browser: the form validates here and then hands the enquiry to the
// visitor's own email client.

/** Where enquiries are addressed. */
export const CONTACT_EMAIL = 'julian@realgoodnetwork.org';

// Enquiry categories mirror the design brief (section 3.7).
export const ENQUIRY_CATEGORIES = [
  { value: 'partnership', label: 'Partnership' },
  { value: 'project', label: 'Project or initiative' },
  { value: 'research', label: 'Research collaboration' },
  { value: 'contributing', label: 'Contributing expertise' },
  { value: 'funding', label: 'Funding or support' },
  { value: 'media', label: 'Media' },
  { value: 'general', label: 'General enquiry' },
] as const;

export type CategoryValue = (typeof ENQUIRY_CATEGORIES)[number]['value'];

export const CATEGORY_VALUES = ENQUIRY_CATEGORIES.map((c) => c.value) as readonly string[];

/** Human-readable label for each enquiry category, for the composed email. */
export const ENQUIRY_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  ENQUIRY_CATEGORIES.map((c) => [c.value, c.label]),
);

export interface ContactFields {
  name: string;
  email: string;
  organisation: string;
  category: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: ContactFields & { category: CategoryValue } }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(fields: ContactFields): ValidationResult {
  const errors: Record<string, string> = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const organisation = fields.organisation.trim();
  const category = fields.category.trim();
  const message = fields.message.trim();

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > 120) errors.name = 'Name is too long.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (organisation.length > 160) errors.organisation = 'Organisation name is too long.';
  if (!CATEGORY_VALUES.includes(category)) errors.category = 'Please choose the purpose of your enquiry.';
  if (message.length < 10) errors.message = 'Please include a little more detail (at least 10 characters).';
  else if (message.length > 5000) errors.message = 'Message is too long (5000 characters maximum).';

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: { name, email, organisation, category: category as CategoryValue, message },
  };
}

/** Maps a Partner-page audience label (?purpose=…) to a default category. */
export function purposeToCategory(purpose: string | null): CategoryValue {
  if (!purpose) return 'general';
  const p = purpose.toLowerCase();
  if (p.includes('community') || p.includes('institution')) return 'partnership';
  if (p.includes('research')) return 'research';
  if (p.includes('builder') || p.includes('contribut')) return 'contributing';
  if (p.includes('supporter') || p.includes('funder')) return 'funding';
  return 'general';
}
