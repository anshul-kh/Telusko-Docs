'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

type HoverBehavior = 'pause' | 'slow';

interface UseMarqueeOptions {
  /** Scroll speed in pixels per second — the loop's duration is derived from
   * this plus the rendered track width, so it stays consistent regardless of
   * how many items are passed in. */
  speed: number;
  /** 'pause' eases the scroll to a full stop on hover (for content the user
   * needs to read or click); 'slow' just eases it down. Defaults to 'pause'. */
  onHover?: HoverBehavior;
  /** Re-measure and restart the loop when these change (e.g. data arriving
   * after the initial render). */
  dependencies?: unknown[];
}

/**
 * Drives an infinite horizontal marquee with GSAP.
 *
 * Render the item list twice back-to-back inside `trackRef`; looping the
 * first half's width (xPercent -50) makes the seam invisible. Spread
 * `onMouseEnter`/`onMouseLeave` onto `containerRef`'s element to ease the
 * speed down and back up smoothly instead of snapping.
 */
export function useMarquee<Container extends HTMLElement = HTMLDivElement>({
  speed,
  onHover = 'pause',
  dependencies = [],
}: UseMarqueeOptions) {
  const containerRef = useRef<Container>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const loopDistance = trackRef.current.scrollWidth / 2;
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        ease: 'none',
        duration: loopDistance / speed,
      });
    },
    { scope: containerRef, dependencies },
  );

  const hoverTimeScale = onHover === 'pause' ? 0 : 0.15;

  function onMouseEnter() {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: hoverTimeScale, duration: 0.5, ease: 'power2.out' });
  }

  function onMouseLeave() {
    if (!tweenRef.current) return;
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.inOut' });
  }

  return { containerRef, trackRef, onMouseEnter, onMouseLeave };
}
