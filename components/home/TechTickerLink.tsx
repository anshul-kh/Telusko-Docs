'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface TechTickerLinkProps {
  href: string;
  icon: string;
  label: ReactNode;
}

export function TechTickerLink({ href, icon, label }: TechTickerLinkProps) {
  const textGroupRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
    gsap.to(arrowRef.current, { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: true });
    if (!textGroupRef.current) return;
    const hoverColor = getComputedStyle(textGroupRef.current).getPropertyValue('--home-foreground-strong');
    gsap.to(textGroupRef.current, { color: hoverColor, duration: 0.3, ease: 'power2.out', overwrite: true });
  }

  function onLeave() {
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: 'power2.in', overwrite: true });
    gsap.to(arrowRef.current, { scale: 0, duration: 0.25, ease: 'power2.in', overwrite: true });
    if (!textGroupRef.current) return;
    const restColor = getComputedStyle(textGroupRef.current).getPropertyValue('--home-foreground-faint');
    gsap.to(textGroupRef.current, {
      color: restColor,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => gsap.set(textGroupRef.current, { clearProps: 'color' }),
    });
  }

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex shrink-0 items-center gap-5 text-md font-semibold sm:text-xl"
    >
      <Icon icon={icon} className="h-8 w-8 sm:h-9 sm:w-9" />
      <span ref={textGroupRef} className="home-ticker-text inline-flex items-center gap-1.5">
        <span className="relative inline-block">
          {label}
          <span
            ref={underlineRef}
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0"
            style={{ background: 'currentColor' }}
          />
        </span>
        <span ref={arrowRef} aria-hidden="true" className="inline-flex origin-left scale-0">
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </span>
    </Link>
  );
}
