import { FooterLink } from './FooterLink';
import type { FooterLink as FooterLinkData } from '@/lib/footerLinks';

interface FooterLinksColumnProps {
  heading: string;
  links: FooterLinkData[];
  align?: 'left' | 'right';
}

export function FooterLinksColumn({ heading, links, align = 'left' }: FooterLinksColumnProps) {
  return (
    <div
      className={`home-footer-reveal flex flex-col gap-5 opacity-0 ${align === 'right' ? 'lg:text-right' : ''}`}
    >
      <h3 className="text-xl font-semibold sm:text-2xl" style={{ color: 'var(--home-lime)' }}>
        {heading}
      </h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}
