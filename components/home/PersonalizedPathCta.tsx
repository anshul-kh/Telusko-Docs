import Image from 'next/image';
import { AlienCoachCta } from './AlienCoachCta';
import { SpineRevealTrigger } from './SpineRevealTrigger';
import { SpineStrip } from './SpineStrip';
import type { SpineLink } from '@/lib/topics';

export function PersonalizedPathCta({ spines }: { spines: SpineLink[] }) {
  return (
    <section className="flex flex-col items-stretch gap-10 overflow-hidden px-6 pt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:px-0 lg:pl-20">
      <div className="relative flex max-w-3xl flex-col gap-8 py-20 lg:min-w-[320px]">
        <Image
          src="/assets/home/arc.svg"
          alt=""
          width={791}
          height={804}
          className="pointer-events-none absolute -left-10 -top-16 h-auto w-[480px] sm:w-[560px] lg:w-[640px]"
        />
        <h2
          className="relative text-4xl font-medium leading-[1.12] sm:text-6xl lg:text-5xl xl:text-6xl"
          style={{ color: 'var(--home-foreground-muted)' }}
        >
          <span style={{ color: 'var(--home-lime-text)' }}>Not sure where to begin?</span> For a personalized path
          based on your goals.
        </h2>
        <AlienCoachCta />
      </div>

      <div className="-mx-6 flex flex-col lg:mx-0 lg:h-[440px] lg:w-[530px] lg:min-w-[340px] lg:flex-row">
        {spines.map((spine) => (
          <SpineStrip key={spine.slug} spine={spine} />
        ))}
      </div>

      <SpineRevealTrigger />
    </section>
  );
}
