'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function HeroReveal() {
  useGSAP(() => {
    gsap.fromTo(
      '.home-hero-reveal',
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power4.out', delay: 0.2 },
    );
  });

  return null;
}
