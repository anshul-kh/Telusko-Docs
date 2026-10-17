'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { gsap } from '@/lib/gsap';

const SEARCH_PHRASES = ['Java', 'Python', 'System Design', 'Docker', 'Spring AI', 'DevOps', 'Linux'];

const TYPE_SPEED = 75;
const DELETE_SPEED = 35;
const HOLD_DURATION = 1800;
const SWAP_DELAY = 400;

export function HeroSearchTrigger() {
  const { setOpenSearch } = useSearchContext();
  const cursorRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(SEARCH_PHRASES[0]);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = SEARCH_PHRASES[0].length;
    let deleting = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const phrase = SEARCH_PHRASES[phraseIndex];

      if (deleting) {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % SEARCH_PHRASES.length;
          timeoutId = setTimeout(tick, SWAP_DELAY);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
        return;
      }

      charIndex += 1;
      setText(phrase.slice(0, charIndex));
      if (charIndex === phrase.length) {
        deleting = true;
        timeoutId = setTimeout(tick, HOLD_DURATION);
        return;
      }
      timeoutId = setTimeout(tick, TYPE_SPEED);
    }

    timeoutId = setTimeout(tick, HOLD_DURATION);
    return () => clearTimeout(timeoutId);
  }, []);

  useGSAP(() => {
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(glowRef.current, { opacity: 0.45, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  });

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search for topics"
      className="home-hero-reveal home-hero-search relative flex w-full max-w-xl items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-colors duration-300 hover:border-[var(--home-lime)] sm:px-5 sm:py-4"
      style={{ borderColor: 'var(--home-lime-text)', background: 'var(--home-surface)' }}
    >
      <span ref={glowRef} aria-hidden="true" className="home-hero-search-glow pointer-events-none absolute inset-0 rounded-xl" />

      <span className="relative flex min-w-0 items-center text-base sm:text-lg" aria-hidden="true">
        <span style={{ color: 'var(--home-foreground-faint)' }}>Search for&nbsp;</span>
        <span className="font-medium" style={{ color: 'var(--home-lime-text)' }}>
          {text}
        </span>
        <span
          ref={cursorRef}
          className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[1px]"
          style={{ background: 'var(--home-lime-text)' }}
        />
      </span>

      <kbd
        className="relative shrink-0 rounded-md border px-2.5 py-1 text-sm"
        style={{ borderColor: 'var(--home-lime-text)', color: 'var(--home-lime-text)' }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
