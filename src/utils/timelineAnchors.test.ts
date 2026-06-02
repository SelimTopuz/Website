import { describe, expect, it } from "vitest";
import {
  isTimelineAnchorLink,
  timelineAnchorIdFromUrl,
  timelineEntryAnchorId,
  timelineModuleAnchorId,
  timelineModuleAnchorUrl,
} from "./timelineAnchors";

describe("timelineAnchors", () => {
  it("builds stable module anchor ids", () => {
    expect(
      timelineModuleAnchorId(
        "Wirtschaftsinformatik Master - UPB",
        "Model-based Systems Engineering",
      ),
    ).toBe(
      "timeline-module-wirtschaftsinformatik-master-upb-model-based-systems-engineering",
    );
  });

  it("disambiguates duplicate module titles with group context", () => {
    const systems = timelineModuleAnchorId(
      "Wirtschaftsinformatik Master - UPB",
      "Data-driven Engineering",
      "Systems Engineering Schwerpunkt",
    );
    const agents = timelineModuleAnchorId(
      "Wirtschaftsinformatik Master - UPB",
      "Data-driven Engineering",
      "AI Agents Schwerpunkt",
    );

    expect(systems).not.toBe(agents);
  });

  it("builds module anchor urls", () => {
    expect(
      timelineModuleAnchorUrl(
        "Wirtschaftsinformatik Master - UPB",
        "Model-based Systems Engineering",
      ),
    ).toBe(
      "#timeline-module-wirtschaftsinformatik-master-upb-model-based-systems-engineering",
    );
  });

  it("detects timeline anchor links", () => {
    expect(
      isTimelineAnchorLink(
        "#timeline-module-wirtschaftsinformatik-master-upb-model-based-systems-engineering",
      ),
    ).toBe(true);
    expect(isTimelineAnchorLink("https://example.com")).toBe(false);
    expect(timelineAnchorIdFromUrl("#timeline-entry-foo")).toBe(
      "timeline-entry-foo",
    );
  });

  it("builds entry anchor ids", () => {
    expect(timelineEntryAnchorId("Wissenschaftliche Hilfskraft - ASE")).toBe(
      "timeline-entry-wissenschaftliche-hilfskraft-ase",
    );
  });
});
