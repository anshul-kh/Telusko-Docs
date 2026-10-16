'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SpineRevealTrigger() {
  useGSAP(() => {
    gsap.set('.home-spine', { y: 24, autoAlpha: 0 });
    ScrollTrigger.batch('.home-spine', {
      start: 'top 90%',
      onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out' }),
    });
  });

  return null;
}
