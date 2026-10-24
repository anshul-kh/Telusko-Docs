'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface FooterLinkProps {
  href: string;
  label: string;
  size?: 'default' | 'legal';
}

const RESTING_VAR = {
  default: '--home-footer-foreground-muted',
  legal: '--home-footer-foreground-faint',
} as const;

const RESTING_CLASS = {
  default: 'home-footer-link-text',
  legal: 'home-footer-legal-text',
} as const;

export function FooterLink({ href, label, size = 'default' }: FooterLinkProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const restVar = RESTING_VAR[size];

  function onEnter() {
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
    if (!textRef.current) return;
    const hoverColor = getComputedStyle(textRef.current).getPropertyValue('--home-footer-foreground');
    gsap.to(textRef.current, { color: hoverColor, duration: 0.3, ease: 'power2.out', overwrite: true });
  }

  function onLeave() {
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: 'power2.in', overwrite: true });
    if (!textRef.current) return;
    const restColor = getComputedStyle(textRef.current).getPropertyValue(restVar);
    gsap.to(textRef.current, {
      color: restColor,
      duration: 0.3,
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
      className={
        size === 'legal'
          ? 'relative inline-block text-sm font-semibold sm:text-base'
          : 'relative inline-block text-sm font-semibold sm:text-lg lg:text-xl'
      }
    >
      <span ref={textRef} className={`relative ${RESTING_CLASS[size]}`}>
        {label}
        <span
          ref={underlineRef}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0"
          style={{ background: 'currentColor' }}
        />
      </span>
    </a>
  );
}
