import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to a container ref.
 * When the element enters the viewport, it adds the CSS class that triggers
 * the entrance animation. Works with .sr-hidden / .sr-visible classes in CSS.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible');
            // Only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );

    // Observe all .sr-hidden children inside the container
    const targets = el.querySelectorAll('.sr-hidden');
    targets.forEach((t) => observer.observe(t));

    // Also observe the root itself if it has the class
    if (el.classList.contains('sr-hidden')) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
