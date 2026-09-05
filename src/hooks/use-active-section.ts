import { useEffect, useState } from 'react';

/**
 * useActiveSection — tracks which section id is currently visible
 * in the viewport using IntersectionObserver. Returns the id string.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          // Trigger when section is at least 25% in view; top offset accounts for fixed header
          rootMargin: '-74px 0px -55% 0px',
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds.join(',')]);

  return active;
}
