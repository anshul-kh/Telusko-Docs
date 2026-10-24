import { Youtube, Instagram, Linkedin } from 'lucide-react';
import { Icon } from '@iconify/react';
import type { ReactNode } from 'react';
import { FooterAppLinks } from './FooterAppLinks';
import { FooterSocialLink } from './FooterSocialLink';
import { FOOTER_SOCIAL_LINKS } from '@/lib/footerLinks';

const SOCIAL_ICONS: Record<string, ReactNode> = {
  YouTube: <Youtube className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Discord: <Icon icon="simple-icons:discord" className="h-5 w-5" />,
};

export function FooterBrandColumn() {
  return (
    <div className="home-footer-reveal flex flex-col items-center gap-6 text-center opacity-0">
      <div
        className="rounded-lg border px-6 py-3 text-2xl font-bold tracking-wide sm:text-3xl"
        style={{ borderColor: 'var(--home-lime)', color: 'var(--home-footer-foreground)' }}
      >
        TELUSKO
      </div>
      <p className="max-w-sm text-base leading-relaxed sm:text-lg" style={{ color: 'var(--home-footer-foreground-muted)' }}>
        Master programming with clarity and confidence,{' '}
        <span style={{ color: 'var(--home-lime)' }}>
          Guided by industry focused learning at Telusko
        </span>
      </p>
      <FooterAppLinks className="flex justify-center lg:hidden" />
      <div className="flex items-center gap-2">
        {FOOTER_SOCIAL_LINKS.map((social) => (
          <FooterSocialLink
            key={social.href}
            href={social.href}
            label={social.label}
            icon={SOCIAL_ICONS[social.label] ?? null}
          />
        ))}
      </div>
    </div>
  );
}
