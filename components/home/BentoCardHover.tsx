'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
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
  const iconRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    gsap.to(cardRef.current, { y: -6, duration: 0.35, ease: 'power2.out' });
    gsap.to(iconRef.current, { rotate: -6, scale: 1.08, duration: 0.35, ease: 'power2.out' });
  }

  function onLeave() {
    gsap.to(cardRef.current, { y: 0, duration: 0.35, ease: 'power2.out' });
    gsap.to(iconRef.current, { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
  }

  return (
    <Link ref={cardRef} href={href} onMouseEnter={onEnter} onMouseLeave={onLeave} className={className} style={style}>
      {accentSlot}
      {icon ? (
        <div ref={iconRef} className={iconClassName}>
          {icon}
        </div>
      ) : null}
      {children}
    </Link>
  );
}
