'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useArcFillHover() {
  const fillRef = useRef<HTMLSpanElement>(null);

  function expandFill(duration = 0.6) {
    gsap.to(fillRef.current, {
      clipPath: 'circle(150% at 0% 0%)',
      duration,
      ease: 'power3.out',
      overwrite: true,
    });
  }

  function collapseFill(duration = 0.5) {
    gsap.to(fillRef.current, {
      clipPath: 'circle(0% at 0% 0%)',
      duration,
      ease: 'power3.inOut',
      overwrite: true,
    });
  }

  return { fillRef, expandFill, collapseFill };
}
