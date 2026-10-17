import { Suspense } from 'react';
import { getHomeTopics } from '@/lib/topics';
import { SiteHeader } from '@/components/home/SiteHeader';
import { Hero } from '@/components/home/Hero';
import { TechTicker } from '@/components/home/TechTicker';
import { CoursePromoStrip } from '@/components/home/CoursePromoStrip';
import { CoursePromoSkeleton } from '@/components/home/CoursePromoSkeleton';
import { BentoGrid } from '@/components/home/BentoGrid';
import { PersonalizedPathCta } from '@/components/home/PersonalizedPathCta';

export default function HomePage() {
  const { navTopics, tickerTopics, pillTopics, bentoNextFive, ctaSpines } = getHomeTopics();

  return (
    <main className="relative">
      <SiteHeader
        navTopics={navTopics}
        promoSlot={
          <Suspense fallback={<CoursePromoSkeleton />}>
            <CoursePromoStrip />
          </Suspense>
        }
      />
      <div className="relative mx-auto max-w-[1920px]">
        <Hero />
        <TechTicker topics={tickerTopics} />
        <BentoGrid pillTopics={pillTopics} nextFive={bentoNextFive} />
        <PersonalizedPathCta spines={ctaSpines} />
      </div>
    </main>
  );
}
