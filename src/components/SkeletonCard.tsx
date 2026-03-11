/**
 * Skeleton placeholder for a post card (code walkthrough).
 * Same layout and min-heights as PostCard so the list doesn't shift when real data loads.
 */
import Skeleton from 'react-loading-skeleton';

export function SkeletonCard() {
  return (
    <div className="rounded-xl p-5 shadow-sm border border-stone-200 bg-white my-4 mx-1 min-h-[180px]">
      <div className="flex items-start justify-between gap-2 mb-2 min-h-[28px]">
        <Skeleton height={28} width="70%" />
        <Skeleton height={20} width={56} />
      </div>
      <div className="my-3 min-h-[72px]">
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} width="85%" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 my-3 min-h-[32px]">
        <div className="flex items-center gap-2">
          <span className="rounded-full overflow-hidden shrink-0 inline-block w-8 h-8">
            <Skeleton height={32} width={32} />
          </span>
          <Skeleton height={18} width={80} />
        </div>
        <Skeleton height={18} width={60} />
      </div>
    </div>
  );
}