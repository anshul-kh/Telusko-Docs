import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Marquee } from './Marquee';
import type { TopicLink } from '@/lib/topics';

const TICKER_ICONS: Record<string, string> = {
  javascript: 'logos:javascript',
  docker: 'catppuccin:docker',
  aws: 'skill-icons:aws-light',
  java: 'logos:java',
  'system-design': 'flat-color-icons:engineering',
  'spring-ai': 'logos:spring-icon',
  kubernetes: 'logos:kubernetes',
};

const TICKER_SPEED = 24;

export function TechTicker({ topics }: { topics: TopicLink[] }) {
  const items = [...topics, ...topics];

  return (
    <Marquee
      speed={TICKER_SPEED}
      dependencies={[topics]}
      className="home-marquee-mask overflow-hidden border-t py-15 pt-7"
      style={{ borderColor: 'var(--home-border)' }}
      trackClassName="flex w-max items-center gap-20 px-10"
    >
      {items.map((topic, i) => (
        <Link
          key={`${topic.slug}-${i}`}
          href={topic.href}
          className="home-tech-ticker-link flex shrink-0 items-center gap-5 text-md font-semibold transition-colors sm:text-xl"
          style={{ color: 'var(--home-foreground-faint)' }}
        >
          <Icon icon={TICKER_ICONS[topic.slug] ?? 'carbon:code'} className="h-8 w-8 sm:h-9 sm:w-9" />
          {topic.title}
        </Link>
      ))}
    </Marquee>
  );
}
