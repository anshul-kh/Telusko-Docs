export function CoursePromoSkeleton() {
  return (
    <div className="home-promo-mask flex items-center gap-10 overflow-hidden sm:gap-14">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex shrink-0 animate-pulse items-center gap-3.5">
          <div
            className="aspect-video w-20 shrink-0 rounded-xl sm:w-28"
            style={{ background: 'var(--home-surface-strong)' }}
          />
          <div className="flex flex-col gap-2">
            <div className="h-2.5 w-28 rounded-full" style={{ background: 'var(--home-surface-strong)' }} />
            <div className="h-3 w-36 rounded-lg" style={{ background: 'var(--home-surface-strong)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
