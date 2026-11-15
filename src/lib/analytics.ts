/**
 * Google Tag Manager bridge — SCR Central Hub
 * ===========================================
 * The GTM container (GTM-WQ6JL96J) is loaded in index.html. This module pushes
 * SPA page views and custom business events into window.dataLayer, where your
 * GTM tags consume them. Configure the GA4 Measurement ID and the GA4 Event
 * tags/triggers inside GTM — not in this code.
 *
 * Event names pushed from the app (build GTM triggers on these):
 *   spa_page_view, role_switch, place_order, order_status, card_capture,
 *   substitution, receive_stock, join_stars, post_announcement
 */
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function push(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

let started = false;

/** Wire SPA page views. The GTM container itself is loaded from index.html. */
export function initAnalytics(): void {
  if (started || typeof window === 'undefined') return;
  started = true;
  trackPageView();
  window.addEventListener('hashchange', trackPageView);
}

export function trackPageView(): void {
  push({
    event: 'spa_page_view',
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.hash,
  });
}

/** Push a custom business event into the dataLayer for GTM to pick up. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  push({ event, ...params });
}
