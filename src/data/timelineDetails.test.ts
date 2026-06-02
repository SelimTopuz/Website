import { describe, expect, it } from "vitest";
import { getTimelineDetailBySlug } from "./timelineDetails";

describe("timelineDetails", () => {
  it("resolves FastGate by slug", () => {
    const detail = getTimelineDetailBySlug("fastgate");

    expect(detail?.title).toBe("FastGate");
    expect(detail?.sections.length).toBeGreaterThan(0);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getTimelineDetailBySlug("unbekannt")).toBeUndefined();
  });
});
