'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useArcFillHover } from '@/lib/useArcFillHover';
import { PLATFORMS } from '@/lib/platforms';

export function TeluskoLearnCta({ className = '' }: { className?: string }) {
  const { fillRef, expandFill, collapseFill } = useArcFillHover();
  const textRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    expandFill();
    if (!textRef.current) return;
    const hoverColor = getComputedStyle(textRef.current).getPropertyValue('--home-bg');
    gsap.to(textRef.current, { color: hoverColor, duration: 0.5, ease: 'power2.out' });
  }

  function onLeave() {
    collapseFill();
    if (!textRef.current) return;
    const restingColor = getComputedStyle(textRef.current).getPropertyValue('--home-lime-text');
    gsap.to(textRef.current, {
      color: restingColor,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => gsap.set(textRef.current, { clearProps: 'color' }),
    });
  }

  return (
    <a
      href={PLATFORMS.teluskoLearn}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative items-center gap-2 overflow-hidden rounded-xl border-2 px-4 py-2 text-sm font-semibold ${className}`}
      style={{ borderColor: 'var(--home-lime-text)' }}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--home-lime-text)', clipPath: 'circle(0% at 0% 0%)' }}
      />
      <span ref={textRef} className="home-telusko-cta-label relative inline-flex items-center justify-center gap-2">
        Telusko Learn
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
