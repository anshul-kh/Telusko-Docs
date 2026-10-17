import { CoursePromoRow, type Course } from './CoursePromoRow';
import { PLATFORMS } from '@/lib/platforms';

interface ApiCourse {
  id: string;
  slug: string;
  title: string;
  thumbnail_url: string | null;
  course_index: number | null;
  is_published: boolean;
  is_listed: boolean;
}

interface ApiResponse {
  courses: ApiCourse[];
}

async function fetchFeaturedCourses(): Promise<Course[]> {
  try {
    const res = await fetch(PLATFORMS.teluskoCoursesApi, { next: { revalidate: 900 } });
    if (!res.ok) return [];

    const data = (await res.json()) as ApiResponse;
    return data.courses
      .filter((course) => course.is_published && course.is_listed)
      .sort((a, b) => (a.course_index ?? 0) - (b.course_index ?? 0))
      .slice(0, 5)
      .map((course) => ({
        id: course.id,
        slug: course.slug,
        title: course.title,
        thumbnailUrl: course.thumbnail_url,
      }));
  } catch {
    return [];
  }
}

export async function CoursePromoStrip() {
  const courses = await fetchFeaturedCourses();
  if (courses.length === 0) return null;

  return <CoursePromoRow courses={courses} />;
}
