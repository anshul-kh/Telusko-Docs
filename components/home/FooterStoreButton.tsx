'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { useArcFillHover } from '@/lib/useArcFillHover';

interface FooterStoreButtonProps {
  icon: ReactNode;
  topLine: string;
  bottomLine: string;
  href: string;
}

export function FooterStoreButton({ icon, topLine, bottomLine, href }: FooterStoreButtonProps) {
  const { fillRef, expandFill, collapseFill } = useArcFillHover();
  const textRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    expandFill();
    if (!textRef.current) return;
    const hoverColor = getComputedStyle(textRef.current).getPropertyValue('--home-footer-pill-ink');
    gsap.to(textRef.current, { color: hoverColor, duration: 0.5, ease: 'power2.out', overwrite: true });
  }

  function onLeave() {
    collapseFill();
    if (!textRef.current) return;
    const restingColor = getComputedStyle(textRef.current).getPropertyValue('--home-footer-pill-fill');
    gsap.to(textRef.current, {
      color: restingColor,
      duration: 0.45,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => gsap.set(textRef.current, { clearProps: 'color' }),
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-2.5 py-1.5 sm:gap-2 sm:px-3.5 sm:py-2"
      style={{ background: 'var(--home-footer-pill-ink)', border: '1px solid #242424' }}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--home-footer-pill-fill)', clipPath: 'circle(0% at 0% 0%)' }}
      />
      <span ref={textRef} className="home-footer-pill-text relative flex items-center gap-1.5 sm:gap-2">
        {icon}
        <span className="flex flex-col leading-tight">
          <span className="text-[8px] font-semibold opacity-80 sm:text-[10px]">{topLine}</span>
          <span className="text-[11px] font-semibold sm:text-[13px]">{bottomLine}</span>
        </span>
      </span>
    </a>
  );
}
