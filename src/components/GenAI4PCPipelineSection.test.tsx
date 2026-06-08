import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { getGenAI4PCPhaseDetailParagraphs } from "../data/genai4pcPhaseTexts";
import { GenAI4PCPipelineSection } from "./GenAI4PCPipelineSection";

describe("GenAI4PCPipelineSection", () => {
  it("updates detail text when diagram phase tab changes", async () => {
    const user = userEvent.setup();
    render(<GenAI4PCPipelineSection />);

    expect(
      screen.getByText(getGenAI4PCPhaseDetailParagraphs("ingestion")[0]),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Konzept & Aufgaben" }));

    expect(
      screen.getByText(getGenAI4PCPhaseDetailParagraphs("concepts")[0]),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Upload und Embedding/),
    ).not.toBeInTheDocument();
  });
});
