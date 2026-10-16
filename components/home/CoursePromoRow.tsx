import Image from 'next/image';
import { Marquee } from './Marquee';

export interface Course {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string | null;
}

const BADGES = [
  { emoji: '🔥', label: 'Developers are exploring', color: '#E98B73' },
  { emoji: '✦', label: 'You Might Need This', color: '#B8A7D9' },
  { emoji: '⚡', label: 'Trending Now', color: '#8AADF4' },
  { emoji: '★', label: 'Highly Rated', color: '#FFD469' },
  { emoji: '◆', label: 'New on Telusko', color: '#B8D94E' },
];

const COURSE_BASE_URL = 'https://learn.telusko.com/courses';
const MARQUEE_SPEED = 24;

export function CoursePromoRow({ courses }: { courses: Course[] }) {
  const items = [...courses, ...courses];

  return (
    <Marquee
      speed={MARQUEE_SPEED}
      dependencies={[courses]}
      className="home-promo-mask w-full overflow-hidden"
      trackClassName="flex w-max items-center gap-10 sm:gap-20"
    >
      {items.map((course, i) => {
        const badge = BADGES[i % courses.length % BADGES.length];
        return (
          <a
            key={`${course.id}-${i}`}
            href={`${COURSE_BASE_URL}/${course.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="home-promo-card flex shrink-0 items-center gap-3.5"
          >
            <div className="home-course-media w-20 shrink-0 overflow-hidden rounded-xl sm:w-28">
              {course.thumbnailUrl ? (
                <Image src={course.thumbnailUrl} alt="" width={112} height={63} className="h-auto w-full" />
              ) : (
                <div className="aspect-video w-full" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <span
                className="inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                style={{ borderColor: `${badge.color}66`, color: badge.color }}
              >
                {badge.emoji} {badge.label}
              </span>
              <div className="flex items-center gap-3">
                <span
                  className="max-w-[160px] truncate text-sm font-medium sm:max-w-[220px]"
                  style={{ color: 'var(--home-foreground)' }}
                >
                  {course.title}
                </span>
                <span
                  className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold"
                  style={{ background: badge.color, color: '#0E0E0E' }}
                >
                  Explore Course
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </Marquee>
  );
}
