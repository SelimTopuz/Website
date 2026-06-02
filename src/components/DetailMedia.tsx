export interface DetailVideoMedia {
  type: "video";
  src: string;
  mimeType?: string;
  caption?: string;
  title: string;
}

export interface DetailImageMedia {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export type DetailSectionMedia = DetailVideoMedia | DetailImageMedia;

interface DetailMediaProps {
  media: DetailSectionMedia;
}

export function DetailMedia({ media }: DetailMediaProps) {
  if (media.type === "video") {
    return (
      <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <video
          controls
          preload="metadata"
          playsInline
          className="w-full bg-black"
          aria-label={media.title}
        >
          <source src={media.src} type={media.mimeType ?? "video/mp4"} />
          Dein Browser unterstützt keine eingebetteten Videos.
        </video>
        {media.caption && (
          <figcaption className="px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        className="w-full bg-white object-contain"
      />
      {media.caption && (
        <figcaption className="px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
