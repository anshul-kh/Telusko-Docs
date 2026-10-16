'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function HeroGlow() {
  const glowRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.set(glowRef.current, { scale: 0, transformOrigin: 'center center' });
    gsap.to(glowRef.current, {
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.2,
      onComplete: () => {
        gsap.to(glowRef.current, {
          scale: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      },
    });
  });

  return (
    <Image
      ref={glowRef}
      src="/assets/home/arc.svg"
      alt=""
      width={791}
      height={804}
      priority
      className="pointer-events-none absolute -left-6 top-16 h-auto w-[420px] sm:w-[500px] lg:left-48 lg:top-16 lg:w-[620px]"
    />
  );
}
