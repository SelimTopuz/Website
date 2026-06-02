import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichParagraph } from "./ContentBlocks";

describe("RichParagraph", () => {
  it("styles external and cross-reference links differently", () => {
    render(
      <RichParagraph
        segments={[
          { type: "text", value: "Extern " },
          {
            type: "link",
            label: "Eviden",
            url: "https://eviden.com/",
          },
          { type: "text", value: " und intern " },
          {
            type: "link",
            label: "Model-based Systems Engineering",
            url: "#timeline-module-example",
          },
        ]}
      />,
    );

    const externalLink = screen.getByRole("link", { name: "Eviden" });
    const crossRefLink = screen.getByRole("link", {
      name: "Model-based Systems Engineering",
    });

    expect(externalLink).toHaveClass("text-[var(--color-link)]");
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(crossRefLink).toHaveClass("underline");
    expect(crossRefLink).not.toHaveClass("text-[var(--color-link)]");
    expect(crossRefLink).toHaveClass("hover:text-[var(--color-link)]");
  });
});
