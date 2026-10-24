import { FooterLink } from './FooterLink';
import { FOOTER_LEGAL_LINKS } from '@/lib/footerLinks';

export function FooterLegalBar() {
  const year = new Date().getFullYear();

  return (
    <div
      className="home-footer-reveal mt-12 flex flex-col items-center gap-4 border-t pt-6 opacity-0 sm:flex-row sm:items-center sm:justify-between lg:mt-16"
      style={{ borderColor: 'var(--home-footer-border)' }}
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {FOOTER_LEGAL_LINKS.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href} label={link.label} size="legal" />
          </li>
        ))}
      </ul>
      <p className="home-footer-legal-text text-sm font-semibold">© {year} Telusko</p>
    </div>
  );
}
