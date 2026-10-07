// Privacy-conscious event tracking.
//
// The site ships no analytics script. `track` forwards an event name to a
// `dataLayer` if one is ever added to the page, and otherwise does nothing.
// It takes a name and nothing else, so form contents cannot be sent with it.

export type AnalyticsEvent =
  | 'pathways_page_view'
  | 'pathways_primary_cta_click'
  | 'pathways_process_cta_click'
  | 'pathways_enquiry_started'
  | 'pathways_enquiry_submitted';

declare global {
  interface Window {
    dataLayer?: { event: string }[];
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer?.push({ event });
}
