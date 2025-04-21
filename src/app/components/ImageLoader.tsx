interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps): string {
  // Bypass loader for local fallback image
  if (src.startsWith("/book-placeholder")) return src;

  return `https://covers.openlibrary.org${src}?w=${width}&q=${quality}`;
}
