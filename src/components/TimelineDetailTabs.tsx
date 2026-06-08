import { useId, useState } from "react";
import { RichParagraph } from "./ContentBlocks";
import { DetailMedia } from "./DetailMedia";
import { GenAI4PCPipelineSection } from "./GenAI4PCPipelineSection";
import type { TimelineDetailSection, TimelineDetailTab } from "../data/timelineDetails";

interface TimelineDetailTabsProps {
  tabs: TimelineDetailTab[];
  defaultTabId?: string;
  tablistLabel?: string;
}

export function TimelineDetailSections({
  sections,
}: {
  sections: TimelineDetailSection[];
}) {
  return (
    <>
      {sections.map((section) => (
        <TimelineDetailSectionBlock
          key={section.title}
          section={section}
        />
      ))}
    </>
  );
}

function TimelineDetailSectionBlock({
  section,
}: {
  section: TimelineDetailSection;
}) {
  return (
    <section className="space-y-3">
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
      {section.media?.type === "genai4pc-flow-diagram" ? (
        <GenAI4PCPipelineSection caption={section.media.caption} />
      ) : (
        section.media && <DetailMedia media={section.media} />
      )}
      {section.mediaItems && section.mediaItems.length > 0 && (
        <div className="space-y-6">
          {section.mediaItems.map((item, index) => (
            <DetailMedia
              key={`${section.title}-media-${index}`}
              media={item}
            />
          ))}
        </div>
      )}
      {section.media?.type !== "genai4pc-flow-diagram" &&
        section.paragraphsAfterMedia?.map((paragraph, index) => (
          <RichParagraph
            key={`${section.title}-after-${index}`}
            segments={paragraph}
            muted
          />
        ))}
      {section.mediaAfterParagraphs &&
        section.mediaAfterParagraphs.length > 0 && (
          <div className="space-y-6">
            {section.mediaAfterParagraphs.map((item, index) => (
              <DetailMedia
                key={`${section.title}-after-media-${index}`}
                media={item}
              />
            ))}
          </div>
        )}
      {section.paragraphsAfterMediaItems?.map((paragraph, index) => (
        <RichParagraph
          key={`${section.title}-after-media-items-${index}`}
          segments={paragraph}
          muted
        />
      ))}
      {section.mediaAfterMediaItems &&
        section.mediaAfterMediaItems.length > 0 && (
          <div className="space-y-6">
            {section.mediaAfterMediaItems.map((item, index) => (
              <DetailMedia
                key={`${section.title}-after-media-items-media-${index}`}
                media={item}
              />
            ))}
          </div>
        )}
    </section>
  );
}

export function TimelineDetailTabs({
  tabs,
  defaultTabId,
  tablistLabel = "Projektinhalt",
}: TimelineDetailTabsProps) {
  const tablistId = useId();
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId ?? tabs[0]?.id ?? "",
  );
  const activeTab =
    tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label={tablistLabel}
        id={tablistId}
        className="flex flex-wrap gap-2 border-b border-[var(--color-border)]"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${tablistId}-${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${tablistId}-${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              className={[
                "-mb-px rounded-t-md px-3 py-2.5 text-sm font-medium transition-colors sm:px-4 sm:text-[15px]",
                isActive
                  ? "border border-b-0 border-[var(--color-border)] bg-white text-[var(--color-text)]"
                  : "border border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-${activeTab.id}-panel`}
        aria-labelledby={`${tablistId}-${activeTab.id}-tab`}
        className="space-y-8"
      >
        {activeTab.sections.map((section) => (
          <TimelineDetailSectionBlock
            key={`${activeTab.id}-${section.title}`}
            section={section}
          />
        ))}
      </div>
    </div>
  );
}
