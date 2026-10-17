'use client';

import { useRef } from 'react';
import { Github } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const REPO_URL = 'https://github.com/telusko-aliens/Telusko-Docs';

interface GithubIconButtonProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Reused at the header's desktop size and again (smaller) inside the mobile
 * nav panel. `className` must supply its own `rounded-*` (as well as size and
 * border) — hardcoding one here would fight a caller-passed radius at equal
 * CSS specificity, with the winner decided by Tailwind's stylesheet order
 * rather than which one looks like it should take precedence. The hover fill
 * uses `rounded-[inherit]` so it always matches whatever radius that is.
 */
export function GithubIconButton({
  className = 'h-11 w-11 rounded-xl border',
  iconClassName = 'h-4 w-4',
}: GithubIconButtonProps) {
  const hoverRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    if (!hoverRef.current) return;
    gsap.to(hoverRef.current, { autoAlpha: 1, duration: 0.25, overwrite: true });
  }

  function onLeave() {
    if (!hoverRef.current) return;
    gsap.to(hoverRef.current, { autoAlpha: 0, duration: 0.2, overwrite: true });
  }

  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className} flex items-center justify-center`}
      style={{ borderColor: 'var(--home-border)', color: 'var(--home-foreground)' }}
    >
      <span
        ref={hoverRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 h-3/4 w-3/4 m-auto"
        style={{ background: 'var(--home-surface-strong)' }}
      />
      <Github className={iconClassName} />
    </a>
  );
}
