import type { TimelineSideEntry } from "../data/profile";
import type { TimelineEvent, TimelineScale } from "./timelineLayout";
import {
  TIMELINE_PX_PER_YEAR,
  createTimelineScaleFromPxPerYear,
} from "./timelineLayout";

export const TIMELINE_CARD_GAP = 32;

export interface PositionedTimelineEvent {
  event: TimelineEvent;
  barTop: number;
  barHeight: number;
  cardTop: number;
  cardHeight: number;
  connectorY: number;
}

export interface TimelineLayoutResult {
  scale: TimelineScale;
  left: PositionedTimelineEvent[];
  right: PositionedTimelineEvent[];
  height: number;
}

export function estimateCardHeight(entry: TimelineSideEntry): number {
  let height = 96;

  for (const group of entry.groupedLists ?? []) {
    if (group.emphasis) {
      height += 36;
    } else if (group.title) {
      height += 20;
    }

    for (const module of group.modules ?? []) {
      height += 56;
      const text =
        module.description ??
        module.descriptionSegments
          ?.map((segment) =>
            segment.type === "text" ? segment.value : segment.label,
          )
          .join("") ??
        "";
      height += Math.min(260, Math.ceil(text.length / 44) * 20);
    }
  }

  return height;
}

function eventYearDuration(event: TimelineEvent): number {
  return Math.max(1, event.endYear - event.startYear);
}

function rangesOverlap(
  aTop: number,
  aBottom: number,
  bTop: number,
  bBottom: number,
  gap: number,
): boolean {
  return aTop < bBottom + gap && aBottom + gap > bTop;
}

function centeredCardTop(
  barTop: number,
  barHeight: number,
  cardHeight: number,
): number {
  return barTop + barHeight / 2 - cardHeight / 2;
}

export function computeMinPxPerYear(
  leftEvents: TimelineEvent[],
  rightEvents: TimelineEvent[],
  getCardHeight: (event: TimelineEvent) => number,
): number {
  let minPx = TIMELINE_PX_PER_YEAR;

  for (const sideEvents of [leftEvents, rightEvents]) {
    const sorted = [...sideEvents].sort((a, b) => b.endYear - a.endYear);

    for (const event of sorted) {
      minPx = Math.max(minPx, getCardHeight(event) / eventYearDuration(event));
    }

    for (let index = 0; index < sorted.length - 1; index += 1) {
      const upper = sorted[index];
      const lower = sorted[index + 1];
      const yearGap = upper.endYear - lower.endYear;

      if (yearGap <= 0) {
        continue;
      }

      minPx = Math.max(
        minPx,
        (getCardHeight(upper) + 2 * TIMELINE_CARD_GAP) / yearGap,
      );
    }
  }

  return minPx;
}

function layoutNeedsMoreScale(
  left: PositionedTimelineEvent[],
  right: PositionedTimelineEvent[],
): number | null {
  let requiredPx: number | null = null;

  const bump = (value: number) => {
    requiredPx = requiredPx === null ? value : Math.max(requiredPx, value);
  };

  for (const layout of [...left, ...right]) {
    const duration = eventYearDuration(layout.event);
    const barBottom = layout.barTop + layout.barHeight;
    const idealTop = centeredCardTop(
      layout.barTop,
      layout.barHeight,
      layout.cardHeight,
    );
    const cardBottom = layout.cardTop + layout.cardHeight;

    if (layout.cardHeight > layout.barHeight + 1) {
      bump(layout.cardHeight / duration);
    }

    if (layout.cardTop < layout.barTop - 1 || cardBottom > barBottom + 1) {
      bump(layout.cardHeight / duration);
    }

    if (layout.cardTop > idealTop + 1) {
      bump(
        (layout.cardHeight + (layout.cardTop - idealTop) + TIMELINE_CARD_GAP) /
          duration,
      );
    }
  }

  for (const sideLayouts of [left, right]) {
    const sorted = [...sideLayouts].sort((a, b) => a.barTop - b.barTop);

    for (let index = 0; index < sorted.length - 1; index += 1) {
      const upper = sorted[index];
      const lower = sorted[index + 1];
      const yearGap = upper.event.endYear - lower.event.endYear;

      if (yearGap <= 0) {
        continue;
      }

      const upperBottom = upper.cardTop + upper.cardHeight;
      if (upperBottom + TIMELINE_CARD_GAP > lower.cardTop + 1) {
        bump((upper.cardHeight + 2 * TIMELINE_CARD_GAP) / yearGap);
      }
    }
  }

  return requiredPx;
}

export function layoutEventsForSide(
  events: TimelineEvent[],
  scale: TimelineScale,
  getCardHeight: (event: TimelineEvent) => number,
): PositionedTimelineEvent[] {
  const sorted = [...events].sort(
    (a, b) => scale.eventBarTop(a.endYear) - scale.eventBarTop(b.endYear),
  );
  const placed: { top: number; bottom: number }[] = [];
  const layouts: PositionedTimelineEvent[] = [];

  for (const event of sorted) {
    const barTop = scale.eventBarTop(event.endYear);
    const barHeight = scale.eventBarHeight(event.startYear, event.endYear);
    const cardHeight = getCardHeight(event);
    let cardTop = centeredCardTop(barTop, barHeight, cardHeight);

    let safety = 0;
    while (safety < 100) {
      const cardBottom = cardTop + cardHeight;
      const overlaps = placed.some((placedCard) =>
        rangesOverlap(
          cardTop,
          cardBottom,
          placedCard.top,
          placedCard.bottom,
          TIMELINE_CARD_GAP,
        ),
      );

      if (!overlaps) {
        break;
      }

      const blockers = placed.filter((placedCard) =>
        rangesOverlap(
          cardTop,
          cardTop + cardHeight,
          placedCard.top,
          placedCard.bottom,
          TIMELINE_CARD_GAP,
        ),
      );
      cardTop = Math.max(
        ...blockers.map((placedCard) => placedCard.bottom + TIMELINE_CARD_GAP),
        cardTop + 48,
      );
      safety += 1;
    }

    placed.push({ top: cardTop, bottom: cardTop + cardHeight });
    layouts.push({
      event,
      barTop,
      barHeight,
      cardTop,
      cardHeight,
      connectorY: barTop + barHeight / 2,
    });
  }

  return layouts;
}

export function computeTimelineLayout(
  leftEvents: TimelineEvent[],
  rightEvents: TimelineEvent[],
  minYear: number,
  maxYear: number,
  getCardHeight: (event: TimelineEvent) => number,
): TimelineLayoutResult {
  let pxPerYear = computeMinPxPerYear(leftEvents, rightEvents, getCardHeight);

  for (let iteration = 0; iteration < 24; iteration += 1) {
    const scale = createTimelineScaleFromPxPerYear(minYear, maxYear, pxPerYear);
    const left = layoutEventsForSide(leftEvents, scale, getCardHeight);
    const right = layoutEventsForSide(rightEvents, scale, getCardHeight);
    const requiredPx = layoutNeedsMoreScale(left, right);

    if (requiredPx === null) {
      return {
        scale,
        left,
        right,
        height: scale.height,
      };
    }

    if (Math.abs(requiredPx - pxPerYear) < 0.5) {
      const finalScale = createTimelineScaleFromPxPerYear(
        minYear,
        maxYear,
        requiredPx + 1,
      );
      return {
        scale: finalScale,
        left: layoutEventsForSide(leftEvents, finalScale, getCardHeight),
        right: layoutEventsForSide(rightEvents, finalScale, getCardHeight),
        height: finalScale.height,
      };
    }

    pxPerYear = requiredPx;
  }

  const scale = createTimelineScaleFromPxPerYear(minYear, maxYear, pxPerYear);
  return {
    scale,
    left: layoutEventsForSide(leftEvents, scale, getCardHeight),
    right: layoutEventsForSide(rightEvents, scale, getCardHeight),
    height: scale.height,
  };
}

export function getCardHeightResolver(
  measuredHeights: Record<string, number>,
): (event: TimelineEvent) => number {
  return (event) =>
    measuredHeights[event.id] ?? estimateCardHeight(event.entry);
}

export { TIMELINE_PX_PER_YEAR };
