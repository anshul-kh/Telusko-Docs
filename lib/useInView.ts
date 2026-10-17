'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the element with the given id currently intersects the
 * viewport. Starts `true` so callers that hide themselves "while in view"
 * (e.g. a nav search box that would duplicate a hero search box) default to
 * hidden until the observer proves otherwise — avoiding a flash on load.
 */
export function useInView(elementId: string, options?: IntersectionObserverInit): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById(elementId);
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [elementId, options]);

  return inView;
}
