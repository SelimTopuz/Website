import { describe, expect, it } from "vitest";
import { parseTimelinePeriod } from "./timelinePeriod";

describe("parseTimelinePeriod", () => {
  it("parses closed year ranges", () => {
    const parsed = parseTimelinePeriod("2018 – 2023");

    expect(parsed.startYear).toBe(2018);
    expect(parsed.endYear).toBe(2023);
    expect(parsed.durationYears).toBe(6);
  });

  it("parses shorter overlapping ranges", () => {
    const parsed = parseTimelinePeriod("2021 – 2022");

    expect(parsed.startYear).toBe(2021);
    expect(parsed.endYear).toBe(2022);
    expect(parsed.durationYears).toBe(2);
  });

  it("parses open-ended periods", () => {
    const parsed = parseTimelinePeriod("2024 –");

    expect(parsed.startYear).toBe(2024);
    expect(parsed.endYear).toBeNull();
    expect(parsed.durationYears).toBeGreaterThanOrEqual(1);
  });

  it("parses month-qualified end years", () => {
    const parsed = parseTimelinePeriod("2023 – Okt. 2026");

    expect(parsed.startYear).toBe(2023);
    expect(parsed.endYear).toBe(2026);
    expect(parsed.durationYears).toBe(4);
  });
});
