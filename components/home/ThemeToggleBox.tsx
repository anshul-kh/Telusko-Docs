'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

const ACTIVE_FILL = '#B8A7D9';
const ACTIVE_ICON = '#181818';

export function ThemeToggleBox() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);
  const hoverRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLButtonElement>(null);
  const darkRef = useRef<HTMLButtonElement>(null);
  const firstRunRef = useRef(true);

  const isDark = mounted && resolvedTheme === 'dark';

  function moveTo(pill: HTMLSpanElement | null, target: HTMLElement | null, duration = 0.3) {
    if (!pill || !target) return;

    gsap.to(pill, {
      x: target.offsetLeft,
      y: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight,
      autoAlpha: 1,
      duration,
      ease: 'power3.out',
      overwrite: true,
    });
  }

  function showHover(e: MouseEvent<HTMLButtonElement>) {
    moveTo(hoverRef.current, e.currentTarget, 0.2);
  }

  function hideHover() {
    if (!hoverRef.current) return;
    gsap.to(hoverRef.current, { autoAlpha: 0, duration: 0.2, overwrite: true });
  }

  useGSAP(
    () => {
      if (!mounted) return;
      moveTo(activeRef.current, isDark ? darkRef.current : lightRef.current, firstRunRef.current ? 0 : 0.3);
      firstRunRef.current = false;
    },
    { dependencies: [isDark, mounted] },
  );

  useEffect(() => {
    if (!mounted || !lightRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]?.contentRect.width > 0) {
        moveTo(activeRef.current, isDark ? darkRef.current : lightRef.current, 0);
      }
    });
    observer.observe(lightRef.current);
    return () => observer.disconnect();
  }, [mounted, isDark]);

  return (
    <div
      role="group"
      aria-label="Color theme"
      onMouseLeave={hideHover}
      className="inline-flex h-10 items-center rounded-xl border p-1 md:border-2"
      style={{ borderColor: 'var(--home-border)' }}
    >
      <div ref={trackRef} className="relative isolate flex items-center gap-1">
        <span
          ref={hoverRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-0 rounded-lg opacity-0"
          style={{ background: 'var(--home-surface-strong)' }}
        />

        <span
          ref={activeRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[1] rounded-lg opacity-0"
          style={{ background: ACTIVE_FILL }}
        />

        <button
          ref={lightRef}
          type="button"
          aria-label="Use light theme"
          aria-pressed={!isDark}
          onClick={() => setTheme('light')}
          onMouseEnter={showHover}
          className="relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300"
          style={{ color: !isDark ? ACTIVE_ICON : 'var(--home-foreground-faint)' }}
        >
          <Sun className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        <button
          ref={darkRef}
          type="button"
          aria-label="Use dark theme"
          aria-pressed={isDark}
          onClick={() => setTheme('dark')}
          onMouseEnter={showHover}
          className="relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300"
          style={{ color: isDark ? ACTIVE_ICON : 'var(--home-foreground-faint)' }}
        >
          <Moon className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  );
}
