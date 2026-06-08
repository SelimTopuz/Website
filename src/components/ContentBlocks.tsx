import type { ReactNode } from "react";
import type { TextSegment } from "../data/profile";
import {
  isTimelineAnchorLink,
  timelineAnchorIdFromUrl,
} from "../utils/timelineAnchors";
import { scrollToSection } from "../utils/scroll";
import { emailFromMailto, MailtoLink } from "./MailtoLink";

interface RichParagraphProps {
  segments: TextSegment[];
  muted?: boolean;
}

const externalLinkClassName =
  "inline-flex items-baseline gap-0.5 text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]";

const plainLinkClassName =
  "font-medium text-[var(--color-link)] no-underline hover:underline hover:decoration-[var(--color-link)]/30 hover:underline-offset-2";

const crossRefLinkClassName =
  "underline decoration-current/40 underline-offset-2 transition-colors hover:text-[var(--color-link)] hover:decoration-[var(--color-link)]";

function ExternalLinkIcon() {
  return (
    <svg
      className="relative top-px h-3 w-3 shrink-0 opacity-70"
      viewBox="0 0 12 12"
      aria-hidden="true"
    >
      <path
        d="M4.5 2.5H9.5V7.5M9.5 2.5L2.5 9.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function RichParagraph({ segments, muted = false }: RichParagraphProps) {
  return (
    <p
      className={`leading-relaxed ${muted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]"}`}
    >
      {segments.map((segment, index) => {
        if (segment.type === "link") {
          if (isTimelineAnchorLink(segment.url)) {
            const anchorId = timelineAnchorIdFromUrl(segment.url);

            return (
              <a
                key={`${segment.url}-${index}`}
                href={segment.url}
                title="Zum Abschnitt springen"
                onClick={(event) => {
                  event.preventDefault();
                  if (anchorId) scrollToSection(anchorId);
                }}
                className={crossRefLinkClassName}
              >
                {segment.label}
              </a>
            );
          }

          const linkClassName = segment.plain
            ? plainLinkClassName
            : externalLinkClassName;

          const mailtoEmail = emailFromMailto(segment.url);
          if (mailtoEmail) {
            return (
              <MailtoLink
                key={`${segment.url}-${index}`}
                email={mailtoEmail}
                className={linkClassName}
              >
                {segment.label}
              </MailtoLink>
            );
          }

          return (
            <a
              key={`${segment.url}-${index}`}
              href={segment.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Externer Link"
              className={linkClassName}
            >
              {segment.label}
              {!segment.plain && <ExternalLinkIcon />}
            </a>
          );
        }

        return <span key={index}>{segment.value}</span>;
      })}
    </p>
  );
}

interface TimelineLogoProps {
  alt: string;
  imageUrl?: string;
  initials?: string;
}

const LOGO_SLOT_CLASS =
  "flex h-8 w-[3.75rem] shrink-0 items-center sm:h-8 sm:w-[3.75rem]";

export function TimelineLogo({ alt, imageUrl, initials }: TimelineLogoProps) {
  if (imageUrl) {
    return (
      <div className={LOGO_SLOT_CLASS}>
        <img
          src={imageUrl}
          alt={alt}
          className="max-h-full max-w-full object-contain object-left"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden={!!initials}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm font-semibold text-[var(--color-text-muted)]"
      title={alt}
    >
      {initials ?? "?"}
    </div>
  );
}

interface SocialIconProps {
  icon: "github" | "linkedin" | "email" | "x" | "website";
}

export function SocialIcon({ icon }: SocialIconProps) {
  const icons: Record<SocialIconProps["icon"], ReactNode> = {
    github: (
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    ),
    linkedin: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22 0H2C.895 0 0 .894 0 2v20c0 1.106.895 2 2 2h20c1.105 0 2-.894 2-2V2c0-1.106-.895-2-2-2z" />
    ),
    email: (
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
    x: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
    website: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    ),
  };

  return (
    <svg
      className="h-4 w-4 fill-current"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {icons[icon]}
    </svg>
  );
}
