'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface BentoCardHoverProps {
  href: string;
  className: string;
  style?: CSSProperties;
  accentSlot: ReactNode;
  icon?: ReactNode;
  iconClassName: string;
  children: ReactNode;
}

export function BentoCardHover({
  href,
  className,
  style,
  accentSlot,
  icon,
  iconClassName,
  children,
}: BentoCardHoverProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const liftRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const linkIconRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(liftRef.current, { y: -6, duration: 0.35, ease: 'power2.out', overwrite: true });
    gsap.to(iconRef.current, { rotate: -6, scale: 1.08, duration: 0.35, ease: 'power2.out', overwrite: true });
    gsap.to(linkIconRef.current, { scale: 1, duration: 0.35, ease: 'back.out(2)', overwrite: true });
  }

  function onLeave() {
    gsap.to(liftRef.current, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
    gsap.to(iconRef.current, { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
    gsap.to(linkIconRef.current, { scale: 0, duration: 0.25, ease: 'power2.in', overwrite: true });
  }

  return (
    <Link ref={cardRef} href={href} onMouseEnter={onEnter} onMouseLeave={onLeave} className={className} style={style}>
      {accentSlot}
      {icon ? (
        <div ref={iconRef} className={iconClassName}>
          {icon}
        </div>
      ) : null}
      <span
        ref={linkIconRef}
        aria-hidden="true"
        className="absolute right-6 top-6 origin-top-right scale-0"
        style={{ color: 'var(--home-foreground)' }}
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div ref={liftRef} className="flex flex-col gap-3">
        {children}
      </div>
    </Link>
  );
}
