import { describe, expect, it } from "vitest";
import { getTimelineDetailBySlug } from "./timelineDetails";

describe("timelineDetails", () => {
  it("resolves FastGate by slug", () => {
    const detail = getTimelineDetailBySlug("fastgate");

    expect(detail?.title).toBe("FastGate");
    expect(detail?.sections?.length).toBeGreaterThan(0);
  });

  it("resolves GenAI4PC by slug with tabs", () => {
    const detail = getTimelineDetailBySlug("genai4pc");

    expect(detail?.title).toBe("GenAI4PC");
    expect(detail?.tabs?.map((tab) => tab.label)).toEqual([
      "Anwendung & Projektdetails",
      "Implementierung",
    ]);
    expect(detail?.tabs?.[0].sections.map((section) => section.title)).toEqual([
      "Ziel des Projekts",
      "Funktionsweise des Assistenten",
      "Ergebnis",
    ]);
    expect(detail?.tabs?.[1].sections.map((section) => section.title)).toEqual([
      "Mein Aufgabenbereich",
      "Pipeline-Architektur",
    ]);
  });

  it("returns undefined for unknown slugs", () => {
    expect(getTimelineDetailBySlug("unbekannt")).toBeUndefined();
  });
});
