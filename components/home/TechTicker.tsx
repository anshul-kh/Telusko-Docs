import { Marquee } from './Marquee';
import { TechTickerLink } from './TechTickerLink';
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
        <TechTickerLink
          key={`${topic.slug}-${i}`}
          href={topic.href}
          icon={TICKER_ICONS[topic.slug] ?? 'carbon:code'}
          label={topic.title}
        />
      ))}
    </Marquee>
  );
}
