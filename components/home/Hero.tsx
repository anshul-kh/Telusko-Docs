import Image from 'next/image';
import { HeroGlow } from './HeroGlow';
import { HeroReveal } from './HeroReveal';
import { HeroSearchTrigger } from './HeroSearchTrigger';

export function Hero() {
  return (
    <section
      id="home-hero"
      className="relative flex min-h-[560px] items-start justify-center overflow-hidden px-6 pb-16 pt-14 sm:min-h-[720px] sm:items-center sm:py-24"
    >
      <HeroGlow />

      <div className="relative z-10 mx-auto mt-10 flex w-full flex-col items-center gap-7 text-center sm:mt-0 sm:max-w-4xl">
        <p
          className="home-hero-reveal font-mono-home text-sm uppercase tracking-[0.3em]"
          style={{ color: 'var(--home-foreground)' }}
        >
          Welcome to Telusko Docs
        </p>

        <h1 className="home-hero-reveal text-[34px] font-medium leading-[1.3] max-[380px]:text-[28px] sm:text-6xl sm:leading-[1.12] lg:text-7xl">
          Your Comprehensive Guide to{' '}
          <Image
            src="/assets/home/hero-floating.png"
            alt=""
            width={401}
            height={313}
            className="inline-block h-11 w-auto align-middle -mx-2 max-[380px]:h-9 max-[380px]:-mx-1.5 sm:-mx-4 sm:h-20 lg:h-24"
          />{' '}
          <span style={{ color: 'var(--home-lime-text)' }}>Learning Technology</span>
        </h1>

        <p
          className="home-hero-reveal font-mono-home max-w-2xl text-base sm:text-lg lg:text-xl"
          style={{ color: 'var(--home-foreground-subtle)' }}
        >
          Clear explanations, practical examples, and real code, for beginners and experienced developers alike.
        </p>

        <HeroSearchTrigger />
      </div>

      <HeroReveal />
    </section>
  );
}
