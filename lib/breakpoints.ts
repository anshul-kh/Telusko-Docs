export const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';

export function isDesktopViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}
