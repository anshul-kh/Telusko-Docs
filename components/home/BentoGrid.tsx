import { Icon } from '@iconify/react';
import { BentoCard } from './BentoCard';
import { BentoRevealTrigger } from './BentoRevealTrigger';
import { PillCluster } from './PillCluster';
import type { TopicLink } from '@/lib/topics';

interface BentoGridProps {
  pillTopics: TopicLink[];
  nextFive: TopicLink[];
}

const BENTO_ICONS: Record<string, string> = {
  'claude-code': 'logos:claude-icon',
  'system-design': 'flat-color-icons:engineering',
  devops: 'fluent-emoji-flat:infinity',
  docker: 'catppuccin:docker',
  linux: 'logos:linux-tux',
};

const ACCENT_COLORS = [
  'rgba(138,173,244,0.1)',
  'rgba(184,217,78,0.04)',
  'rgba(151,71,255,0.06)',
  'rgba(138,173,244,0.06)',
];
const ACCENT_FULL = 'rgba(233,139,115,0.06)';

export function BentoGrid({ pillTopics, nextFive }: BentoGridProps) {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-20">
      <p
        className="mx-auto mb-14 max-w-4xl text-center text-2xl font-medium leading-snug sm:text-4xl"
        style={{ color: 'var(--home-foreground-muted)' }}
      >
        Whether you&apos;re picking up a{' '}
        <span style={{ color: 'var(--home-lime-text)' }}>new language</span> or going deep on{' '}
        <span style={{ color: 'var(--home-lime-text)' }}>system design</span> —{' '}
        <span className="font-semibold" style={{ color: 'var(--home-foreground)' }}>
          it&apos;s all documented here
        </span>
        <span className="font-semibold">, the same way,</span> clear, practical, code-first.
      </p>

      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div
          className="bento-card relative flex min-h-[240px] flex-col justify-end gap-3 overflow-hidden rounded-xl p-8 opacity-0"
          style={{ background: 'var(--home-surface)' }}
        >
          <h3 className="text-2xl font-medium sm:text-3xl" style={{ color: 'var(--home-foreground)' }}>
            Programming languages
          </h3>
          <p className="font-mono-home max-w-xs text-sm xl:max-w-xl" style={{ color: 'var(--home-foreground-subtle)' }}>
            Java, Python, JavaScript, Go, and more, with practical concepts and examples
          </p>
          <PillCluster pillTopics={pillTopics} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {nextFive.slice(0, 4).map((topic, i) => (
            <BentoCard
              key={topic.slug}
              href={topic.href}
              title={topic.title}
              description={topic.description}
              icon={<Icon icon={BENTO_ICONS[topic.slug] ?? 'carbon:code'} />}
              accent={ACCENT_COLORS[i]}
            />
          ))}
        </div>

        {nextFive[4] ? (
          <BentoCard
            href={nextFive[4].href}
            title={nextFive[4].title}
            description={nextFive[4].description}
            icon={<Icon icon={BENTO_ICONS[nextFive[4].slug] ?? 'carbon:code'} />}
            accent={ACCENT_FULL}
            fullWidth
          />
        ) : null}
      </div>

      <BentoRevealTrigger />
    </section>
  );
}
