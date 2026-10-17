'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function BentoRevealTrigger() {
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.bento-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });
  });

  return null;
}
