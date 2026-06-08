import { profile } from "../data/profile";
import {
  flattenTimelineRows,
  sortEventsForDisplay,
} from "../utils/timelineLayout";
import { SideEntryCard } from "./TimelineSideEntry";

export default function CareerTimeline() {
  const events = sortEventsForDisplay(
    flattenTimelineRows(profile.timelineRows),
  );

  return (
    <section
      id="timeline"
      aria-label="Werdegang"
      className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8"
    >
      <div className="relative">
        <div
          className="absolute top-2 bottom-0 left-3 w-px bg-[var(--color-border)]"
          aria-hidden="true"
        />

        <ol className="space-y-12 md:space-y-20">
          {events.map((event) => (
            <li key={event.id} className="relative pl-8 sm:pl-10">
              <div
                className="absolute top-3 left-3 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-border)]"
                aria-hidden="true"
              />

              <SideEntryCard entry={{ ...event.entry, period: event.period }} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
