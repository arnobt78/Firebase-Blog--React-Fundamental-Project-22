/**
 * Formats post createdAt for display (code walkthrough).
 * Handles Firestore Timestamp ({ seconds }) and ISO date strings; returns locale date string or ''.
 */
export function formatPostDate(createdAt: { seconds: number } | string | null | undefined): string {
  if (!createdAt) return '';
  if (typeof createdAt === 'string') {
    const d = new Date(createdAt);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
  }
  if (typeof createdAt === 'object' && createdAt !== null && 'seconds' in createdAt) {
    return new Date(createdAt.seconds * 1000).toLocaleDateString(undefined, { dateStyle: 'medium' });
  }
  return '';
}
