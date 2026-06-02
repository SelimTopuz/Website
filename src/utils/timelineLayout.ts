import type { TimelineRow, TimelineSideEntry } from "../data/profile";
import { parseTimelinePeriod } from "./timelinePeriod";

export const TIMELINE_PX_PER_YEAR = 72;
export const TIMELINE_AXIS_WIDTH_REM = 4.5;

export interface TimelineEvent {
  id: string;
  period: string;
  startYear: number;
  endYear: number;
  side: "left" | "right";
  barColor: string;
  entry: TimelineSideEntry;
}

export interface TimelineScale {
  height: number;
  pxPerYear: number;
  minYear: number;
  maxYear: number;
  yearToTop: (year: number) => number;
  eventBarTop: (endYear: number) => number;
  eventBarHeight: (startYear: number, endYear: number) => number;
}

function resolveEntryPeriod(
  entryPeriod: string | undefined,
  rowPeriod: string,
): string {
  return entryPeriod ?? rowPeriod;
}

function effectiveEndYear(endYear: number | null): number {
  return endYear ?? new Date().getFullYear();
}

function resolveBarColor(entry: TimelineSideEntry, period: string): string {
  if (period.includes("Okt. 2026")) {
    return "var(--color-timeline-bar-master)";
  }

  if (entry.logo.alt === "Universität Paderborn") {
    return "var(--color-timeline-bar-bachelor)";
  }

  if (entry.logo.alt === "Heinz Nixdorf Institut") {
    return "var(--color-timeline-bar-hni)";
  }

  if (entry.logo.alt === "Eviden") {
    return "var(--color-timeline-bar-eviden)";
  }

  if (entry.logo.alt === "SICP Digital Talents") {
    return "var(--color-timeline-bar-sicp)";
  }

  return "var(--color-timeline-bar)";
}

export function flattenTimelineRows(rows: TimelineRow[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const row of rows) {
    if (row.left) {
      const period = resolveEntryPeriod(row.left.period, row.period);
      const parsed = parseTimelinePeriod(period);
      events.push({
        id: `left-${parsed.label}-${row.left.logo.alt}`,
        period: parsed.label,
        startYear: parsed.startYear,
        endYear: effectiveEndYear(parsed.endYear),
        side: "left",
        barColor: resolveBarColor(row.left, parsed.label),
        entry: row.left,
      });
    }

    if (row.right) {
      const period = resolveEntryPeriod(row.right.period, row.period);
      const parsed = parseTimelinePeriod(period);
      events.push({
        id: `right-${parsed.label}-${row.right.logo.alt}`,
        period: parsed.label,
        startYear: parsed.startYear,
        endYear: effectiveEndYear(parsed.endYear),
        side: "right",
        barColor: resolveBarColor(row.right, parsed.label),
        entry: row.right,
      });
    }
  }

  return events;
}

export function getTimelineBounds(events: TimelineEvent[]): {
  minYear: number;
  maxYear: number;
} {
  const minYear = Math.min(...events.map((event) => event.startYear));
  const maxYear = Math.max(...events.map((event) => event.endYear));

  return { minYear, maxYear };
}

export function listYears(minYear: number, maxYear: number): number[] {
  return Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index,
  );
}

export function createTimelineScale(
  minYear: number,
  maxYear: number,
  contentHeight: number,
): TimelineScale {
  const yearSpan = Math.max(maxYear - minYear, 1);
  const minHeight = yearSpan * TIMELINE_PX_PER_YEAR;
  const height = Math.max(contentHeight, minHeight);
  const pxPerYear = height / yearSpan;

  return buildTimelineScale(minYear, maxYear, pxPerYear);
}

export function createTimelineScaleFromPxPerYear(
  minYear: number,
  maxYear: number,
  pxPerYear: number,
): TimelineScale {
  return buildTimelineScale(
    minYear,
    maxYear,
    Math.max(pxPerYear, TIMELINE_PX_PER_YEAR),
  );
}

function buildTimelineScale(
  minYear: number,
  maxYear: number,
  pxPerYear: number,
): TimelineScale {
  const yearSpan = Math.max(maxYear - minYear, 1);
  const height = pxPerYear * yearSpan;
  const yearToTop = (year: number) => (maxYear - year) * pxPerYear;

  return {
    height,
    pxPerYear,
    minYear,
    maxYear,
    yearToTop,
    eventBarTop: (endYear: number) => yearToTop(endYear),
    eventBarHeight: (startYear: number, endYear: number) =>
      Math.max(1, endYear - startYear) * pxPerYear,
  };
}

export function yearToTop(year: number, maxYear: number): number {
  return (maxYear - year) * TIMELINE_PX_PER_YEAR;
}

export function eventBarTop(endYear: number, maxYear: number): number {
  return yearToTop(endYear, maxYear);
}

export function eventBarHeight(startYear: number, endYear: number): number {
  return Math.max(1, endYear - startYear) * TIMELINE_PX_PER_YEAR;
}

export function spineHeight(minYear: number, maxYear: number): number {
  return (maxYear - minYear + 1) * TIMELINE_PX_PER_YEAR;
}

export function sortEventsByRecency(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort(
    (a, b) => b.endYear - a.endYear || b.startYear - a.startYear,
  );
}

export function sortEventsForDisplay(events: TimelineEvent[]): TimelineEvent[] {
  const sorted = sortEventsByRecency(events);
  const sicpIndex = sorted.findIndex((event) =>
    event.entry.title.includes("SICP"),
  );
  const bachelorIndex = sorted.findIndex((event) =>
    event.entry.title.includes("Bachelor"),
  );

  if (sicpIndex === -1 || bachelorIndex === -1 || sicpIndex < bachelorIndex) {
    return sorted;
  }

  const reordered = [...sorted];
  const [sicp] = reordered.splice(sicpIndex, 1);
  reordered.splice(bachelorIndex, 0, sicp);
  return reordered;
}

export function eventsForSide(
  events: TimelineEvent[],
  side: TimelineEvent["side"],
): TimelineEvent[] {
  return sortEventsByRecency(events.filter((event) => event.side === side));
}
