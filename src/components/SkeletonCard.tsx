import Skeleton from 'react-loading-skeleton';

export function SkeletonCard() {
  return (
    <div className="rounded-lg p-4 shadow-sm border border-stone-200 bg-white my-4 mx-1">
      <p className="my-4 mx-1">
        <Skeleton />
      </p>
      <p className="my-4 mx-1">
        <Skeleton count={3} />
      </p>
      <p className="my-4 mx-1">
        <Skeleton width={70} />
      </p>
    </div>
  );
}