import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MailtoLink } from "./MailtoLink";

describe("MailtoLink", () => {
  it("copies email on click and shows feedback", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
    });

    render(
      <MailtoLink email="test@example.com" className="link">
        E-Mail
      </MailtoLink>,
    );

    const link = screen.getByRole("link", { name: /E-Mail an test@example.com/ });
    expect(link).toHaveAttribute("href", "mailto:test@example.com");

    await user.click(link);

    expect(writeText).toHaveBeenCalledWith("test@example.com");
    expect(
      await screen.findByText("E-Mail-Adresse in die Zwischenablage kopiert"),
    ).toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
