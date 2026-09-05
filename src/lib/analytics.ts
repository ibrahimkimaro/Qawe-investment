type AnalyticsData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsData }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Provider-neutral analytics bridge.
 *
 * It stays a safe no-op until a third-party provider is enabled. This keeps
 * analytics from ever blocking the enquiry experience or breaking previews.
 */
export function trackEvent(name: string, data?: AnalyticsData): void {
  if (typeof window === 'undefined') return;

  try {
    window.plausible?.(name, data ? { props: data } : undefined);
    window.gtag?.('event', name, data);
  } catch {
    // Analytics must never break the website.
  }
}