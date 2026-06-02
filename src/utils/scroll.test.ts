import { beforeEach, describe, expect, it, vi } from "vitest";
import { scrollToSection } from "./scroll";

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reducedMotion && query.includes("reduce"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe("scrollToSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("does nothing when section is missing", () => {
    mockMatchMedia(false);
    vi.spyOn(document, "getElementById").mockReturnValue(null);

    expect(() => scrollToSection("missing")).not.toThrow();
  });

  it("scrolls smoothly when reduced motion is off", () => {
    mockMatchMedia(false);
    const scrollIntoView = vi.fn();
    const focus = vi.fn();
    const element = { scrollIntoView, focus } as unknown as HTMLElement;

    vi.spyOn(document, "getElementById").mockReturnValue(element);

    scrollToSection("about");

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it("scrolls instantly when reduced motion is on", () => {
    mockMatchMedia(true);
    const scrollIntoView = vi.fn();
    const focus = vi.fn();
    const element = { scrollIntoView, focus } as unknown as HTMLElement;

    vi.spyOn(document, "getElementById").mockReturnValue(element);

    scrollToSection("about");

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
  });
});
