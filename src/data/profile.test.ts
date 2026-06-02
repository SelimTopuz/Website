import { describe, expect, it } from "vitest";
import { profile } from "./profile";

describe("profile data", () => {
  it("contains required identity fields", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.email).toContain("@");
    expect(profile.siteUrl).toMatch(/^https?:\/\//);
  });

  it("defines social links with icons", () => {
    expect(profile.socialLinks.length).toBeGreaterThan(0);
    for (const link of profile.socialLinks) {
      expect(link.label).toBeTruthy();
      expect(link.url).toBeTruthy();
      expect(link.icon).toBeTruthy();
    }
  });

  it("defines timeline rows with rich content structure", () => {
    expect(profile.timelineRows.length).toBeGreaterThan(0);

    for (const row of profile.timelineRows) {
      expect(row.period).toBeTruthy();

      for (const entry of [row.left, row.right].filter(Boolean)) {
        expect(entry!.title).toBeTruthy();
        expect(entry!.logo.alt).toBeTruthy();
        expect(entry!.paragraphs.length).toBeGreaterThan(0);

        for (const paragraph of entry!.paragraphs) {
          expect(paragraph.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("uses unique timeline row periods", () => {
    const periods = profile.timelineRows.map((row) => row.period);
    expect(new Set(periods).size).toBe(periods.length);
  });

  it("places study entries on the left and work entries on the right", () => {
    const masterRow = profile.timelineRows.find(
      (row) => row.period === "2023 –",
    );
    const evidenRow = profile.timelineRows.find(
      (row) => row.period === "2022 – 2024",
    );

    expect(masterRow?.left?.logo.alt).toBe("Universität Paderborn");
    expect(evidenRow?.right?.logo.alt).toBe("Eviden");
  });

  it("allows overlapping events on left and right sides", () => {
    const bachelorRow = profile.timelineRows.find(
      (row) => row.period === "2018 – 2023",
    );
    expect(bachelorRow?.left?.logo.alt).toBe("Universität Paderborn");
    expect(bachelorRow?.right?.period).toBe("2021 – 2022");

    const masterRow = profile.timelineRows.find(
      (row) => row.period === "2023 –",
    );
    expect(masterRow?.left?.period).toBe("2023 – Okt. 2026");
    expect(masterRow?.right?.period).toBe("2024 – jetzt");
  });
});
