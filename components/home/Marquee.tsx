'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useMarquee } from '@/lib/useMarquee';

interface MarqueeProps {
  speed: number;
  onHover?: 'pause' | 'slow';
  dependencies?: unknown[];
  className: string;
  style?: CSSProperties;
  trackClassName: string;
  children: ReactNode;
}

export function Marquee({ speed, onHover, dependencies, className, style, trackClassName, children }: MarqueeProps) {
  const { containerRef, trackRef, onMouseEnter, onMouseLeave } = useMarquee<HTMLDivElement>({
    speed,
    onHover,
    dependencies,
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      style={style}
    >
      <div ref={trackRef} className={trackClassName}>
        {children}
      </div>
    </div>
  );
}
