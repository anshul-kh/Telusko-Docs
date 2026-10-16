'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';

export function HeroSearchTrigger() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="home-hero-reveal flex w-full max-w-xl items-center justify-between rounded-xl border px-4 py-3 text-left sm:px-5 sm:py-4"
      style={{ borderColor: 'var(--home-border)', background: 'var(--home-surface)' }}
    >
      <span className="text-base sm:text-lg" style={{ color: 'var(--home-foreground-faint)' }}>
        Search for topics...
      </span>
      <kbd
        className="rounded-md border px-2.5 py-1 text-sm"
        style={{ borderColor: 'var(--home-lime-text)', color: 'var(--home-lime-text)' }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
