import Image from "next/image";
import { Todo } from "@/components/ui/Todo";
import type { ProjectMedia } from "@/content/site";

/**
 * Screenshot or short video for a project, in a 16:10 frame.
 * With no media yet, shows a clearly marked empty slot (unless `hideEmpty`).
 */
export function ProjectMediaFrame({
  media,
  slug,
  todoLabel,
  sizes,
  hideEmpty = false,
  className = "",
}: {
  media: ProjectMedia | null;
  slug: string;
  todoLabel: string;
  sizes: string;
  hideEmpty?: boolean;
  className?: string;
}) {
  if (!media && hideEmpty) return null;

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-lilac ${className}`}>
      {!media ? (
        <div className="absolute inset-3 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink/30 p-4 text-center text-ink">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="M21 16l-5-5-7 7" />
          </svg>
          <Todo>{todoLabel}</Todo>
          <code className="text-xs opacity-70">public/projects/{slug}.png / .mp4</code>
        </div>
      ) : media.kind === "image" ? (
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <video
          className="absolute inset-0 size-full object-cover"
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          controls
          muted
          playsInline
          preload="none"
        />
      )}
    </div>
  );
}
