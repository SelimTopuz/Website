import type { TimelineListGroup, TimelineSideEntry } from "../data/profile";
import {
  timelineEntryAnchorId,
  timelineModuleAnchorId,
} from "../utils/timelineAnchors";
import { RichParagraph, TimelineLogo } from "./ContentBlocks";
import { ModuleHighlightCard } from "./ModuleHighlightCard";

function groupHasContent(group: TimelineListGroup): boolean {
  return group.items.length > 0 || (group.modules?.length ?? 0) > 0;
}

interface SideEntryCardProps {
  entry: TimelineSideEntry;
  showPeriod?: boolean;
}

function SideEntryCard({ entry, showPeriod = true }: SideEntryCardProps) {
  return (
    <article
      id={timelineEntryAnchorId(entry.title)}
      tabIndex={-1}
      className="flex min-w-0 scroll-mt-8 gap-4 text-left text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] focus-visible:ring-offset-2"
    >
      <TimelineLogo
        alt={entry.logo.alt}
        imageUrl={entry.logo.imageUrl}
        initials={entry.logo.initials}
      />

      <div className="min-w-0 flex-1 space-y-3">
        <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-2xl">
          {entry.title}
        </h3>

        {showPeriod && entry.period && (
          <p className="text-xs font-medium text-[var(--color-text-muted)]">
            {entry.period}
          </p>
        )}

        {entry.paragraphs.map((paragraph, index) => (
          <RichParagraph key={index} segments={paragraph} />
        ))}

        {entry.numberedList && entry.numberedList.length > 0 && (
          <ol className="list-decimal space-y-1 pl-5 text-[var(--color-text)]">
            {entry.numberedList.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        )}

        {entry.groupedLists && entry.groupedLists.some(groupHasContent) && (
          <div className="space-y-5 pt-1">
            {entry.groupedLists.filter(groupHasContent).map((group) => (
              <div key={group.title || group.modules?.[0]?.title || "group"}>
                {group.title && (
                  <h4
                    className={`mb-2 font-semibold text-[var(--color-text)] ${
                      group.emphasis ? "text-base sm:text-lg" : "text-sm"
                    }`}
                  >
                    {group.title}
                  </h4>
                )}

                {group.items.length > 0 && (
                  <ul className="mb-3 list-disc space-y-0.5 pl-5 text-[var(--color-text-muted)]">
                    {group.items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {group.modules && group.modules.length > 0 && (
                  <div className="space-y-4">
                    {group.modules.map((module) => (
                      <ModuleHighlightCard
                        key={timelineModuleAnchorId(
                          entry.title,
                          module.title,
                          group.title,
                        )}
                        entryTitle={entry.title}
                        groupTitle={group.title}
                        module={module}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {entry.closingParagraphs && entry.closingParagraphs.length > 0 && (
          <div className="space-y-3 border-t border-[var(--color-border)] pt-4">
            {entry.closingParagraphs.map((paragraph, index) => (
              <RichParagraph key={`closing-${index}`} segments={paragraph} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export { SideEntryCard };
