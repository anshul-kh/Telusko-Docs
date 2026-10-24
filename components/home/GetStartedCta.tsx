import Link from 'next/link';

interface GetStartedCtaProps {
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'lg';
}

export function GetStartedCta({ className = '', onClick, size = 'default' }: GetStartedCtaProps) {
  return (
    <Link
      href="/docs"
      onClick={onClick}
      className={`home-get-started-cta relative inline-flex items-center gap-2 rounded-xl px-4 text-sm font-semibold ${size === 'lg' ? 'py-[10px]' : 'py-2'} ${className}`}
      style={{ background: 'var(--home-foreground-strong)', boxShadow: 'inset 0 0 0 1px var(--home-border)' }}
    >
      <span>Get Started</span>
    </Link>
  );
}
