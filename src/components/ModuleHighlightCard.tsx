import { Link } from "react-router-dom";
import type { TimelineModuleHighlight } from "../data/profile";
import { timelineModuleAnchorId } from "../utils/timelineAnchors";
import { RichParagraph } from "./ContentBlocks";

interface ModuleHighlightCardProps {
  entryTitle: string;
  groupTitle?: string;
  module: TimelineModuleHighlight;
}

const moduleBadgeClass =
  "rounded-full bg-[var(--color-surface-muted)] px-1.5 py-px text-[11px] font-medium text-[var(--color-text-muted)] ring-1 ring-[var(--color-border)]";

const detailLinkClassName =
  "text-sm font-semibold text-[var(--color-text)] underline decoration-transparent underline-offset-2 transition-colors hover:text-[var(--color-link)] hover:decoration-[var(--color-link)] sm:text-[15px]";

export function ModuleHighlightCard({
  entryTitle,
  groupTitle,
  module,
}: ModuleHighlightCardProps) {
  const anchorId = timelineModuleAnchorId(entryTitle, module.title, groupTitle);

  return (
    <article
      id={anchorId}
      tabIndex={-1}
      className="scroll-mt-8 space-y-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] focus-visible:ring-offset-2"
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {module.detailSlug ? (
          <h5>
            <Link
              to={`/projekte/${module.detailSlug}`}
              className={detailLinkClassName}
            >
              {module.title}
            </Link>
          </h5>
        ) : (
          <h5 className="text-sm font-semibold text-[var(--color-text)] sm:text-[15px]">
            {module.title}
          </h5>
        )}
        {module.period && (
          <span className={`${moduleBadgeClass} tracking-wide tabular-nums`}>
            {module.period}
          </span>
        )}
        {module.grade && (
          <span className="text-sm text-[var(--color-text-muted)]">
            Note {module.grade}
          </span>
        )}
        {module.badge && (
          <span className={moduleBadgeClass}>{module.badge}</span>
        )}
      </div>

      {module.descriptionSegments ? (
        <RichParagraph segments={module.descriptionSegments} muted />
      ) : (
        module.description && (
          <p className="leading-relaxed text-[var(--color-text-muted)]">
            {module.description}
          </p>
        )
      )}

      {module.detailSlug && (
        <p>
          <Link
            to={`/projekte/${module.detailSlug}`}
            className="text-sm font-medium text-[var(--color-link)] underline decoration-[var(--color-link)]/30 underline-offset-2 hover:decoration-[var(--color-link)]"
          >
            Mehr erfahren →
          </Link>
        </p>
      )}
    </article>
  );
}
