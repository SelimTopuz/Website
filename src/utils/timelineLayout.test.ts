import { describe, expect, it } from "vitest";
import { profile } from "../data/profile";
import {
  createTimelineScale,
  eventBarHeight,
  eventBarTop,
  eventsForSide,
  flattenTimelineRows,
  getTimelineBounds,
  listYears,
  sortEventsByRecency,
  sortEventsForDisplay,
} from "./timelineLayout";

describe("timelineLayout", () => {
  const events = flattenTimelineRows(profile.timelineRows);

  it("flattens side entries from timeline rows", () => {
    expect(events.length).toBe(5);
  });

  it("keeps study entries on the left and other entries on the right", () => {
    const left = eventsForSide(events, "left");
    const right = eventsForSide(events, "right");

    expect(left).toHaveLength(2);
    expect(right).toHaveLength(3);
  });

  it("lists years descending for the axis", () => {
    expect(listYears(2018, 2020)).toEqual([2020, 2019, 2018]);
  });

  it("maps event bars from start year to end year", () => {
    const { maxYear } = getTimelineBounds(events);
    expect(eventBarTop(2023, maxYear)).toBeLessThan(eventBarTop(2022, maxYear));
    expect(eventBarHeight(2018, 2023)).toBe(5 * 72);
    expect(eventBarHeight(2021, 2022)).toBe(1 * 72);
  });

  it("scales the spine to content height while keeping even year spacing", () => {
    const scale = createTimelineScale(2018, 2026, 900);

    expect(scale.height).toBe(900);
    expect(scale.yearToTop(2026)).toBe(0);
    expect(scale.yearToTop(2018)).toBe(900);
    expect(scale.eventBarHeight(2018, 2023)).toBeCloseTo(900 * (5 / 8));
  });

  it("assigns distinct bar colors per entry", () => {
    const colors = new Set(events.map((event) => event.barColor));
    expect(colors.size).toBe(events.length);

    const master = events.find((event) => event.period.includes("Okt. 2026"));
    const sicp = events.find((event) => event.period === "2021 – 2022");

    expect(master?.barColor).toBe("var(--color-timeline-bar-master)");
    expect(sicp?.barColor).toBe("var(--color-timeline-bar-sicp)");
  });

  it("sorts cards by recency within a side", () => {
    const left = eventsForSide(events, "left");
    expect(left[0]?.endYear).toBeGreaterThanOrEqual(left[1]?.endYear ?? 0);
    expect(sortEventsByRecency(events)[0]?.endYear).toBe(2026);
  });

  it("shows SICP above the bachelor entry", () => {
    const ordered = sortEventsForDisplay(events);
    const sicpIndex = ordered.findIndex((event) =>
      event.entry.title.includes("SICP"),
    );
    const bachelorIndex = ordered.findIndex((event) =>
      event.entry.title.includes("Bachelor"),
    );

    expect(sicpIndex).toBeGreaterThan(-1);
    expect(bachelorIndex).toBeGreaterThan(-1);
    expect(sicpIndex).toBeLessThan(bachelorIndex);
  });
});
