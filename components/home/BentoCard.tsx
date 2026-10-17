import type { ReactNode } from 'react';
import { BentoCardHover } from './BentoCardHover';

const ACCENT_MASK = "url('/assets/home/bento-accent.svg')";

interface BentoCardProps {
  href: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  accent: string;
  className?: string;
  fullWidth?: boolean;
}

export function BentoCard({ href, title, description, icon, accent, className, fullWidth }: BentoCardProps) {
  return (
    <BentoCardHover
      href={href}
      className={`bento-card relative flex min-h-[220px] flex-col justify-end gap-3 overflow-hidden rounded-xl p-8 text-left opacity-0 ${className ?? ''}`}
      style={{ background: 'var(--home-surface)' }}
      icon={icon}
      iconClassName="absolute bottom-16 right-10 h-18 w-16 xl:bottom-12 xl:right-10 xl:h-24 xl:w-24 [&>svg]:h-full [&>svg]:w-full"
      accentSlot={
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-[109px] w-[187px]"
          style={{
            backgroundColor: accent,
            maskImage: ACCENT_MASK,
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            WebkitMaskImage: ACCENT_MASK,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
          }}
        />
      }
    >
      <h3 className="relative text-2xl font-medium xl:text-3xl" style={{ color: 'var(--home-foreground)' }}>
        {title}
      </h3>
      {description ? (
        <p
          className={`font-mono-home relative text-sm ${fullWidth ? 'max-w-100 xl:max-w-[40rem]' : 'max-w-50 xl:max-w-[20rem]'}`}
          style={{ color: 'var(--home-foreground-subtle)' }}
        >
          {description}
        </p>
      ) : null}
    </BentoCardHover>
  );
}
