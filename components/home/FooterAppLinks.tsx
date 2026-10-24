import { Apple } from 'lucide-react';
import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';
import { FooterStoreButton } from './FooterStoreButton';
import { FOOTER_STORE_LINKS } from '@/lib/footerLinks';

const STORE_ICONS: Record<string, ReactNode> = {
  'App Store': <Apple className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />,
  'Google Play': <Icon icon="simple-icons:googleplay" className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />,
};

interface FooterAppLinksProps {
  className?: string;
}

export function FooterAppLinks({ className = '' }: FooterAppLinksProps) {
  return (
    <div className={`flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      {FOOTER_STORE_LINKS.map((store) => (
        <FooterStoreButton
          key={store.href}
          icon={STORE_ICONS[store.label] ?? null}
          topLine={store.topLine}
          bottomLine={store.bottomLine}
          href={store.href}
        />
      ))}
    </div>
  );
}
