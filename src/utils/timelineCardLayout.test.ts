import { describe, expect, it } from "vitest";
import { profile } from "../data/profile";
import {
  computeMinPxPerYear,
  computeTimelineLayout,
  estimateCardHeight,
  getCardHeightResolver,
} from "./timelineCardLayout";
import {
  eventsForSide,
  flattenTimelineRows,
  getTimelineBounds,
} from "./timelineLayout";

describe("timelineCardLayout", () => {
  const events = flattenTimelineRows(profile.timelineRows);
  const { minYear, maxYear } = getTimelineBounds(events);
  const leftEvents = eventsForSide(events, "left");
  const rightEvents = eventsForSide(events, "right");

  it("aligns cards with their bar positions on the timeline", () => {
    const layout = computeTimelineLayout(
      leftEvents,
      rightEvents,
      minYear,
      maxYear,
      getCardHeightResolver({}),
    );

    const sicp = layout.right.find(
      (entry) => entry.event.period === "2021 – 2022",
    );
    const eviden = layout.right.find(
      (entry) => entry.event.period === "2022 – 2024",
    );
    const hni = layout.right.find(
      (entry) => entry.event.period === "2024 – jetzt",
    );

    expect(sicp && eviden && hni).toBeTruthy();
    expect(hni!.barTop).toBeLessThan(eviden!.barTop);
    expect(eviden!.barTop).toBeLessThan(sicp!.barTop);
    expect(sicp!.connectorY).toBeGreaterThan(eviden!.connectorY);
  });

  it("expands the timeline when cards need more vertical space", () => {
    const layout = computeTimelineLayout(
      leftEvents,
      rightEvents,
      minYear,
      maxYear,
      () => 900,
    );

    expect(layout.scale.pxPerYear).toBeGreaterThan(72);
    expect(layout.height).toBeGreaterThan((maxYear - minYear) * 72);
  });

  it("keeps cards centered within their bar height for profile data", () => {
    const layout = computeTimelineLayout(
      leftEvents,
      rightEvents,
      minYear,
      maxYear,
      getCardHeightResolver({}),
    );

    for (const positioned of [...layout.left, ...layout.right]) {
      const idealTop =
        positioned.barTop +
        positioned.barHeight / 2 -
        positioned.cardHeight / 2;

      expect(positioned.cardTop).toBeCloseTo(idealTop, 0);
      expect(positioned.cardTop).toBeGreaterThanOrEqual(positioned.barTop - 2);
      expect(positioned.cardTop + positioned.cardHeight).toBeLessThanOrEqual(
        positioned.barTop + positioned.barHeight + 2,
      );
    }
  });

  it("derives pxPerYear from card height and event duration", () => {
    const tallMaster = leftEvents.find((event) =>
      event.period.includes("Okt. 2026"),
    );
    expect(tallMaster).toBeTruthy();

    const pxPerYear = computeMinPxPerYear(leftEvents, rightEvents, () => 900);
    expect(pxPerYear).toBeGreaterThanOrEqual(900 / 3);
  });

  it("estimates taller cards for module-heavy entries", () => {
    const master = events.find((event) => event.period.includes("Okt. 2026"));
    const sicp = events.find((event) => event.period === "2021 – 2022");

    expect(master && sicp).toBeTruthy();
    expect(estimateCardHeight(master!.entry)).toBeGreaterThan(
      estimateCardHeight(sicp!.entry),
    );
  });
});
