import { FooterAppLinks } from './FooterAppLinks';
import { FooterBrandColumn } from './FooterBrandColumn';
import { FooterLegalBar } from './FooterLegalBar';
import { FooterLinksColumn } from './FooterLinksColumn';
import { FooterRevealTrigger } from './FooterRevealTrigger';
import { FOOTER_COMPANY_LINKS, FOOTER_LEARN_LINKS } from '@/lib/footerLinks';

export function Footer() {
  return (
    <section className="home-footer">
      <div style={{ background: 'var(--home-footer-bg)' }}>
        <div className="mx-auto max-w-[1920px] px-6 py-16 sm:px-10 lg:px-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 [grid-template-areas:'learn_company'_'brand_brand'] sm:gap-x-10 sm:gap-y-12 lg:grid-cols-[1fr_1.3fr_1fr] lg:gap-10 lg:[grid-template-areas:'learn_brand_company']">
            <div className="[grid-area:learn]">
              <FooterLinksColumn heading="LEARN" links={FOOTER_LEARN_LINKS} />
            </div>
            <div className="[grid-area:brand]">
              <FooterBrandColumn />
            </div>
            <div className="[grid-area:company] flex flex-col gap-6">
              <FooterLinksColumn heading="COMPANY" links={FOOTER_COMPANY_LINKS} align="right" />
              <FooterAppLinks className="hidden justify-end lg:flex" />
            </div>
          </div>
          <FooterLegalBar />
        </div>
      </div>
      <FooterRevealTrigger />
    </section>
  );
}
