'use client';

import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useArcFillHover } from '@/lib/useArcFillHover';

export function AlienCoachCta() {
  const { fillRef, expandFill, collapseFill } = useArcFillHover();
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  function onEnter() {
    expandFill();
    gsap.to(arrowRef.current, { rotate: -45, duration: 0.4, ease: 'power2.out' });
    if (!textRef.current) return;
    const hoverColor = getComputedStyle(textRef.current).getPropertyValue('--home-bg');
    gsap.to(textRef.current, { color: hoverColor, duration: 0.5, ease: 'power2.out' });
  }

  function onLeave() {
    collapseFill();
    gsap.to(arrowRef.current, { rotate: 0, duration: 0.4, ease: 'power2.out' });
    gsap.to(textRef.current, { color: '#181818', duration: 0.45, ease: 'power2.inOut' });
  }

  return (
    <a
      href="https://aliencoach.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-lg px-6 py-4 text-lg font-semibold"
      style={{ background: '#B8D94E' }}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--home-foreground)', clipPath: 'circle(0% at 0% 0%)' }}
      />
      <span ref={textRef} className="relative inline-flex items-center gap-2" style={{ color: '#181818' }}>
        Try AlienCoach
        <ArrowRight ref={arrowRef} className="h-4 w-4" />
      </span>
    </a>
  );
}
