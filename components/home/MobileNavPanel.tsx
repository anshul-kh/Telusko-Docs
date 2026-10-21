'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { DESKTOP_MEDIA_QUERY } from '@/lib/breakpoints';
import { TeluskoLearnCta } from './TeluskoLearnCta';
import { ThemeToggleBox } from './ThemeToggleBox';
import { GithubIconButton } from './GithubIconButton';
import type { TopicLink } from '@/lib/topics';

interface MobileNavPanelProps {
  open: boolean;
  navTopics: TopicLink[];
  onClose: () => void;
}

export function MobileNavPanel({ open, navTopics, onClose }: MobileNavPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current || !backdropRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(panelRef.current.querySelectorAll('.home-mobile-link'));

      if (open) {
        gsap.set(panelRef.current, { display: 'flex' });
        gsap.set(backdropRef.current, { display: 'block' });
        gsap.fromTo(
          panelRef.current,
          { xPercent: 100, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' },
        );
        gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        gsap.fromTo(
          links,
          { x: 16, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.04, delay: 0.1, ease: 'power3.out' },
        );
      } else {
        gsap.to(panelRef.current, {
          xPercent: 100,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(panelRef.current, { display: 'none' }),
        });
        gsap.to(backdropRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => gsap.set(backdropRef.current, { display: 'none' }),
        });
      }
    },
    { dependencies: [open] },
  );

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function onViewportChange(e: MediaQueryListEvent) {
      if (e.matches) onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onViewportChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onViewportChange);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-black/40"
        style={{ display: 'none' }}
      />
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-40 flex w-[82%] max-w-sm flex-col border-l shadow-2xl"
        style={{ display: 'none', borderColor: 'var(--home-border)', background: 'var(--home-bg)' }}
      >
        <div className="flex shrink-0 items-center justify-end px-4 py-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{ borderColor: 'var(--home-border)', color: 'var(--home-foreground)' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4">
          <span
            className="home-mobile-link px-3 pb-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--home-foreground-faint)' }}
          >
            Menu
          </span>
          {navTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={topic.href}
              onClick={onClose}
              className="home-mobile-link border-b px-3 py-3 text-base font-semibold"
              style={{ color: 'var(--home-foreground)', borderColor: 'var(--home-border)' }}
            >
              {topic.title}
            </Link>
          ))}
        </div>

        <div
          className="shrink-0 border-t px-4 pt-4"
          style={{ borderColor: 'var(--home-border)', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <div className="home-mobile-link mb-3 flex items-center justify-between gap-3">
            <ThemeToggleBox />
            <GithubIconButton className="h-10 w-10 rounded-xl border" iconClassName="h-5 w-5" />
          </div>
          <TeluskoLearnCta className="home-mobile-link flex w-full justify-center" />
        </div>
      </div>
    </>
  );
}
