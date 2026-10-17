'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useArcFillHover } from '@/lib/useArcFillHover';

interface BentoPillLinkProps {
  href: string;
  icon: string;
  label: ReactNode;
  style: CSSProperties;
  rotate: number;
  className?: string;
}

export function BentoPillLink({ href, icon, label, style, rotate, className = '' }: BentoPillLinkProps) {
  const { fillRef, expandFill, collapseFill } = useArcFillHover();
  const textRef = useRef<HTMLSpanElement>(null);
  const linkIconRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    expandFill();
    gsap.to(linkIconRef.current, { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: true });
    if (!textRef.current) return;
    const hoverColor = getComputedStyle(textRef.current).getPropertyValue('--home-bg');
    gsap.to(textRef.current, { color: hoverColor, duration: 0.5, ease: 'power2.out', overwrite: true });
  }

  function onLeave() {
    collapseFill();
    gsap.to(linkIconRef.current, { scale: 0, duration: 0.25, ease: 'power2.in', overwrite: true });
    if (!textRef.current) return;
    const restColor = getComputedStyle(textRef.current).getPropertyValue('--home-pill-ink');
    gsap.to(textRef.current, {
      color: restColor,
      duration: 0.45,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => gsap.set(textRef.current, { clearProps: 'color' }),
    });
  }

  return (
    <Link
      href={href}
      data-rotate={rotate}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`bento-pill relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-semibold lg:absolute ${className}`}
      style={style}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--home-foreground)', clipPath: 'circle(0% at 0% 0%)' }}
      />
      <span ref={textRef} className="home-pill-text relative inline-flex items-center gap-2">
        <Icon icon={icon} className="h-4 w-4" />
        {label}
        <span ref={linkIconRef} aria-hidden="true" className="inline-flex origin-left scale-0">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}
