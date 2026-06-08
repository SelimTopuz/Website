import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, Link } from "react-router-dom";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ScrollToTop } from "./ScrollToTop";

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Link to="/projekte/fastgate">Detail</Link>} />
        <Route path="/projekte/:slug" element={<div>Detail page</div>} />
      </Routes>
    </>
  );
}

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("scrolls to top when navigating to a new route", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: "Detail" }));

    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0 }),
    );
  });

  it("does not scroll to top when the route has a hash", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    const scrollIntoView = vi.fn();
    const focus = vi.fn();
    const element = {
      scrollIntoView,
      focus,
      querySelectorAll: vi.fn().mockReturnValue([]),
    } as unknown as HTMLElement;

    vi.spyOn(document, "getElementById").mockReturnValue(element);

    render(
      <MemoryRouter initialEntries={["/projekte/fastgate/models#ap3"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
