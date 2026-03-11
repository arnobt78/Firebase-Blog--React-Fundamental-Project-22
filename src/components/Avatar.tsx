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
    <img
      src={url}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover flex-shrink-0 ${className}`}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== robohashUrl(seed, size)) {
          target.src = robohashUrl(seed, size);
        }
      }}
    />
  );
}
