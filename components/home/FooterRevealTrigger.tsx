'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function FooterRevealTrigger() {
  useGSAP(() => {
    const blocks = gsap.utils.toArray<HTMLElement>('.home-footer-reveal');
    blocks.forEach((block, i) => {
      gsap.fromTo(
        block,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 90%',
            once: true,
          },
        },
      );
    });
  });

  return null;
}
