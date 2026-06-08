import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DetailMedia } from "./DetailMedia";

describe("DetailMedia", () => {
  it("opens a lightbox when clicking an image", async () => {
    const user = userEvent.setup();

    render(
      <DetailMedia
        media={{
          type: "image",
          src: "/media/fastgate-bdd-subsystems.jpg",
          alt: "BDD Diagramm",
          caption: "Test caption",
        }}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /BDD Diagramm vergrößern/ }),
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog.querySelector("img")).toHaveAttribute(
      "src",
      "/media/fastgate-bdd-subsystems.jpg",
    );

    await user.click(screen.getByRole("button", { name: "Schließen" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the lightbox on Escape", async () => {
    const user = userEvent.setup();

    render(
      <DetailMedia
        media={{
          type: "image",
          src: "/media/test.png",
          alt: "Test",
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /Test vergrößern/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("uses a larger lightbox layout when lightboxSize is large", async () => {
    const user = userEvent.setup();

    render(
      <DetailMedia
        media={{
          type: "image",
          src: "/media/fastgate-ibd-soi.png",
          alt: "IBD",
          lightboxSize: "large",
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /IBD vergrößern/ }));

    const img = screen.getByRole("dialog").querySelector("img");
    expect(img?.className).toMatch(/\bw-auto\b/);
    expect(img?.className).toMatch(/\bh-auto\b/);
  });

  it("embeds a PDF with a link to open in a new tab", () => {
    render(
      <DetailMedia
        media={{
          type: "pdf",
          src: "/media/fastgate-arbeitspakete-zusammenhang.pdf",
          title: "Arbeitspakete",
          caption: "AP-Übersicht",
        }}
      />,
    );

    expect(screen.getByTitle("Arbeitspakete")).toHaveAttribute(
      "src",
      "/media/fastgate-arbeitspakete-zusammenhang.pdf",
    );
    expect(
      screen.getByRole("link", { name: /PDF in neuem Tab öffnen/ }),
    ).toHaveAttribute("href", "/media/fastgate-arbeitspakete-zusammenhang.pdf");
    expect(screen.getByText("AP-Übersicht")).toBeInTheDocument();
  });
});
