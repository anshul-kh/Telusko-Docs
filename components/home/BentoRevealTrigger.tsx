'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function BentoRevealTrigger() {
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.bento-card');
    gsap.set(cards, { y: 24 });
    ScrollTrigger.batch(cards, {
      start: 'top 85%',
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }),
    });
  });

  return null;
}
