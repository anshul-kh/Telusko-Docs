'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { CSSProperties } from 'react';
import { useFallingPills } from '@/lib/useFallingPills';
import type { TopicLink } from '@/lib/topics';

type PillItem =
  | { kind: 'link'; slug: string; icon: string; bg: string; border?: boolean; x: number; y: number; rotate: number }
  | { kind: 'chip'; bg: string; x: number; y: number; rotate: number };

const PILL_ITEMS: PillItem[] = [
  { kind: 'link', slug: 'java', icon: 'ant-design:coffee-outlined', bg: '#E98B73', x: 86, y: 27, rotate: -7 },
  { kind: 'link', slug: 'python', icon: 'ant-design:python-outlined', bg: '#F4C95D', x: 186, y: -2, rotate: 5 },
  { kind: 'link', slug: 'spring-ai', icon: 'bxl:spring-boot', bg: '#B8D94E', x: 0, y: 61, rotate: -4 },
  { kind: 'link', slug: 'javascript', icon: 'tabler:brand-javascript', bg: '#4A90E2', x: 267, y: 61, rotate: 3 },
  { kind: 'link', slug: 'go', icon: 'gravity-ui:nodes-left', bg: '#FFFFFF', border: true, x: 172, y: 59, rotate: 0 },
  { kind: 'chip', bg: '#4A90E2', x: 180, y: 30, rotate: -10 },
  { kind: 'chip', bg: '#B8A7D9', x: 29, y: 32, rotate: 9 },
];

export function PillCluster({ pillTopics }: { pillTopics: TopicLink[] }) {
  const pillClusterRef = useFallingPills<HTMLDivElement>([pillTopics]);

  return (
    <div
      ref={pillClusterRef}
      className="relative mt-6 flex flex-wrap items-center gap-2.5 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:h-[110px] lg:w-[400px]"
    >
      {PILL_ITEMS.map((item, i) => {
        const style: CSSProperties = {
          background: item.bg,
          color: '#181818',
          left: item.x,
          top: item.y,
          border: item.kind === 'link' && item.border ? '1.5px solid #181818' : undefined,
        };

        if (item.kind === 'chip') {
          return (
            <span
              key={`chip-${i}`}
              data-rotate={item.rotate}
              className="bento-pill flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold lg:absolute"
              style={style}
            >
              {'</>'}
            </span>
          );
        }

        const topic = pillTopics.find((t) => t.slug === item.slug);
        return (
          <Link
            key={item.slug}
            href={topic?.href ?? '/docs'}
            data-rotate={item.rotate}
            className="bento-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold lg:absolute"
            style={style}
          >
            <Icon icon={item.icon} className="h-4 w-4" />
            {topic?.title ?? item.slug}
          </Link>
        );
      })}
    </div>
  );
}
