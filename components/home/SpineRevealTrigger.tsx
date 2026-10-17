'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function SpineRevealTrigger() {
  useGSAP(() => {
    const spines = gsap.utils.toArray<HTMLElement>('.home-spine');
    spines.forEach((spine, i) => {
      gsap.fromTo(
        spine,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: spine,
            start: 'top 90%',
            once: true,
          },
        },
      );
    });
  });

  return null;
}
