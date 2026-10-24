'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface FooterSocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export function FooterSocialLink({ href, label, icon }: FooterSocialLinkProps) {
  const hoverRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.to(hoverRef.current, { autoAlpha: 1, duration: 0.25, overwrite: true });
  }

  function onLeave() {
    gsap.to(hoverRef.current, { autoAlpha: 0, duration: 0.2, overwrite: true });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
      style={{ color: 'var(--home-footer-foreground)' }}
    >
      <span
        ref={hoverRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 m-auto h-3/4 w-3/4 rounded-[inherit] opacity-0"
        style={{ background: 'var(--home-footer-border)' }}
      />
      {icon}
    </a>
  );
}
