import { Link, Navigate, useParams } from "react-router-dom";
import { RichParagraph } from "../components/ContentBlocks";
import { DetailMedia } from "../components/DetailMedia";
import { getTimelineDetailBySlug } from "../data/timelineDetails";

const moduleBadgeClass =
  "rounded-full bg-[var(--color-surface-muted)] px-1.5 py-px text-[11px] font-medium tracking-wide text-[var(--color-text-muted)] tabular-nums ring-1 ring-[var(--color-border)]";

export default function TimelineDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const detail = getTimelineDetailBySlug(slug);

  if (!detail) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to={`/#${detail.backAnchorId}`}
        className="text-sm font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
      >
        ← Zurück zum Werdegang
      </Link>

      <header className="mt-6 space-y-2 border-b border-[var(--color-border)] pb-6">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">
          {detail.contextLabel}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            {detail.title}
          </h1>
          {detail.period && (
            <span className={moduleBadgeClass}>{detail.period}</span>
          )}
        </div>
        {detail.projectUrl && (
          <p className="pt-1">
            <a
              href={detail.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-0.5 text-sm font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
            >
              {detail.projectLinkLabel ?? "Projektwebsite"}
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        )}
      </header>

      <div className="space-y-8 pt-8 text-[15px]">
        {detail.intro.map((paragraph, index) => (
          <RichParagraph key={`intro-${index}`} segments={paragraph} />
        ))}

        {detail.sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-[var(--color-text)] sm:text-xl">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <RichParagraph
                key={`${section.title}-${index}`}
                segments={paragraph}
                muted
              />
            ))}
            {section.listItems && section.listItems.length > 0 && (
              <ul className="list-disc space-y-1.5 pl-5 text-[var(--color-text-muted)]">
                {section.listItems.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.media && <DetailMedia media={section.media} />}
          </section>
        ))}
      </div>
    </article>
  );
}
