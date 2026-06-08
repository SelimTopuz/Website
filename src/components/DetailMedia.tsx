import { useCallback, useEffect, useId, useState } from "react";
import { FastGateArbeitspaketeDiagram } from "./FastGateArbeitspaketeDiagram";
import { GenAI4PCFlowDiagram } from "./GenAI4PCFlowDiagram";

export interface DetailVideoMedia {
  type: "video";
  src: string;
  mimeType?: string;
  caption?: string;
  title: string;
  /** Portrait or padded recordings: size to content instead of stretching full width. */
  layout?: "full-width" | "intrinsic";
}

export interface DetailImageMedia {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  /** Use for wide diagrams (e.g. ibd) – slightly roomier lightbox (still capped at native resolution). */
  lightboxSize?: "default" | "large";
}

export interface DetailPdfMedia {
  type: "pdf";
  src: string;
  title: string;
  caption?: string;
}

export interface DetailArbeitspaketeDiagramMedia {
  type: "arbeitspakete-diagram";
  modelsPagePath?: string;
  caption?: string;
}

export interface DetailGenAI4PCFlowDiagramMedia {
  type: "genai4pc-flow-diagram";
  caption?: string;
}

export type DetailSectionMedia =
  | DetailVideoMedia
  | DetailImageMedia
  | DetailPdfMedia
  | DetailArbeitspaketeDiagramMedia
  | DetailGenAI4PCFlowDiagramMedia;

interface DetailMediaProps {
  media: DetailSectionMedia;
}

interface NaturalImageSize {
  width: number;
  height: number;
}

function capToNaturalPixels(
  natural: NaturalImageSize | null,
  viewportMaxWidth: number,
  viewportMaxHeight: number,
): { maxWidth: string; maxHeight: string } {
  if (!natural) {
    return {
      maxWidth: `${viewportMaxWidth}px`,
      maxHeight: `${viewportMaxHeight}px`,
    };
  }

  return {
    maxWidth: `${Math.min(viewportMaxWidth, natural.width)}px`,
    maxHeight: `${Math.min(viewportMaxHeight, natural.height)}px`,
  };
}

function DetailImageLightbox({
  src,
  alt,
  caption,
  lightboxSize = "default",
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  lightboxSize?: "default" | "large";
  onClose: () => void;
}) {
  const isLarge = lightboxSize === "large";
  const titleId = useId();
  const [naturalSize, setNaturalSize] = useState<NaturalImageSize | null>(null);

  const viewportMaxWidth = isLarge
    ? Math.min(window.innerWidth * 0.92, 1200)
    : Math.min(window.innerWidth * 0.9, 900);
  const viewportMaxHeight = isLarge
    ? Math.min(window.innerHeight * 0.82, 1000)
    : Math.min(window.innerHeight * 0.85, 900);

  const sizeCap = capToNaturalPixels(
    naturalSize,
    viewportMaxWidth,
    viewportMaxHeight,
  );

  useEffect(() => {
    setNaturalSize(null);
  }, [src]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 ${
        isLarge ? "p-4 sm:p-6" : "p-4 sm:p-8"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Schließen
      </button>

      <figure
        className="flex max-h-full max-w-full flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          id={titleId}
          src={src}
          alt={alt}
          decoding="async"
          onLoad={(event) => {
            const img = event.currentTarget;
            setNaturalSize({
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          }}
          style={sizeCap}
          className="h-auto w-auto max-w-full rounded-lg bg-white object-contain shadow-2xl"
        />
        {caption && (
          <figcaption className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-white/90">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

export function DetailMedia({ media }: DetailMediaProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  if (media.type === "arbeitspakete-diagram") {
    return (
      <FastGateArbeitspaketeDiagram
        modelsPagePath={media.modelsPagePath}
        caption={media.caption}
      />
    );
  }

  if (media.type === "genai4pc-flow-diagram") {
    return <GenAI4PCFlowDiagram caption={media.caption} />;
  }

  if (media.type === "pdf") {
    return (
      <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <iframe
          src={media.src}
          title={media.title}
          className="h-[min(70vh,720px)] w-full bg-white"
        />
        <figcaption className="space-y-1 px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {media.caption && <span className="block">{media.caption}</span>}
          <a
            href={media.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-0.5 font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
          >
            PDF in neuem Tab öffnen
            <span aria-hidden="true"> ↗</span>
          </a>
        </figcaption>
      </figure>
    );
  }

  if (media.type === "video") {
    const isIntrinsic = media.layout === "intrinsic";

    return (
      <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <video
          controls
          preload="metadata"
          playsInline
          className={
            isIntrinsic
              ? "mx-auto block h-auto w-auto max-w-full max-h-[min(70vh,560px)]"
              : "mx-auto block w-full max-w-full"
          }
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
    <>
      <figure className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="mx-auto block w-full max-w-full cursor-zoom-in bg-white transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-link)]"
          aria-label={`${media.alt} vergrößern`}
        >
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            className="mx-auto h-auto w-auto max-w-full object-contain"
          />
        </button>
        {media.caption && (
          <figcaption className="px-3 py-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {media.caption}
            <span className="mt-1 block text-xs text-[var(--color-text-muted)]/80">
              Zum Vergrößern auf das Bild klicken
            </span>
          </figcaption>
        )}
      </figure>

      {lightboxOpen && (
        <DetailImageLightbox
          src={media.src}
          alt={media.alt}
          caption={media.caption}
          lightboxSize={media.lightboxSize}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
