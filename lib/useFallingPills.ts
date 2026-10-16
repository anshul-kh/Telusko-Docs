'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { DESKTOP_MEDIA_QUERY } from '@/lib/breakpoints';

const FALL_START_Y = -160;
const FALL_STAGGER_Y = 16;
const FALL_STAGGER_DELAY = 0.1;
const FALL_DURATION = 0.9;
const FALL_EASE = 'elastic.out(1, 0.5)';

function restRotationOf(pill: HTMLElement): number {
  return Number(pill.dataset.rotate ?? 0);
}

export function useFallingPills<T extends HTMLElement = HTMLDivElement>(dependencies: unknown[] = []) {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MEDIA_QUERY, () => {
        const pills = gsap.utils.toArray<HTMLElement>('.bento-pill', containerRef.current);
        gsap.set(pills, (i: number) => ({ y: FALL_START_Y - i * FALL_STAGGER_Y, rotation: 0, autoAlpha: 0 }));

        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            pills.forEach((pill, i) => {
              gsap.to(pill, {
                y: 0,
                rotation: restRotationOf(pill),
                autoAlpha: 1,
                duration: FALL_DURATION,
                delay: i * FALL_STAGGER_DELAY,
                ease: FALL_EASE,
              });
            });
          },
        });

        return () => {
          trigger.kill();
          gsap.set(pills, { clearProps: 'all' });
        };
      });

      mm.add('(max-width: 1023px)', () => {
        const pills = gsap.utils.toArray<HTMLElement>('.bento-pill', containerRef.current);
        gsap.set(pills, { autoAlpha: 1 });
      });
    },
    { scope: containerRef, dependencies },
  );

  return containerRef;
}
