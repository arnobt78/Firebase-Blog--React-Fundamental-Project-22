/**
 * Avatar: user image or RoboHash fallback (code walkthrough).
 * If src is missing/invalid, uses robohash.org with seed (e.g. user id). onError falls back to RoboHash. Fixed size avoids layout shift.
 */
interface AvatarProps {
  src?: string | null;
  alt: string;
  seed: string;
  size?: number;
  className?: string;
}

function robohashUrl(seed: string, size: number): string {
  return `https://robohash.org/${encodeURIComponent(seed)}.png?size=${size}x${size}&set=set1`;
}

export function Avatar({ src, alt, seed, size = 40, className = '' }: AvatarProps) {
  const url = src && src.trim() ? src : robohashUrl(seed, size);
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 bg-stone-200 overflow-hidden ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <img
        src={url}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover block"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== robohashUrl(seed, size)) {
            target.src = robohashUrl(seed, size);
          }
        }}
      />
    </span>
  );
}
