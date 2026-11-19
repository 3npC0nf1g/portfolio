import Image from "next/image";

/** Photo in a soft rounded frame. `priority` for the one above the fold. */
export function Portrait({
  src,
  alt,
  sizes,
  priority = false,
  position = "50% 30%",
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  position?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-lilac ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}
