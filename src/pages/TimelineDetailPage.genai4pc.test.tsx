import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { getGenAI4PCPhaseDetailParagraphs } from "../data/genai4pcPhaseTexts";
import TimelineDetailPage from "./TimelineDetailPage";

function renderDetailAt(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/projekte/${slug}`]}>
      <Routes>
        <Route path="/projekte/:slug" element={<TimelineDetailPage />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("TimelineDetailPage – GenAI4PC", () => {
  it("renders tabs and switches panel content", async () => {
    const user = userEvent.setup();
    renderDetailAt("genai4pc");

    expect(
      screen.getByRole("heading", { level: 1, name: "GenAI4PC" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Anwendung & Projektdetails" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Implementierung" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByText("Ziel des Projekts")).toBeInTheDocument();
    expect(screen.getByText("Funktionsweise des Assistenten")).toBeInTheDocument();
    expect(screen.getByText(/Learning Spaces bzw. Workspaces/)).toBeInTheDocument();
    expect(
      document.querySelector(
        'video source[src="/media/genai4pc/part-1-upload-chunking.mp4"]',
      ),
    ).toBeTruthy();
    expect(
      document.querySelector(
        'video source[src="/media/genai4pc/part-2-concepts-tasks.mp4"]',
      ),
    ).toBeTruthy();
    expect(
      document.querySelector(
        'video source[src="/media/genai4pc/part-3-questions-tasks.mp4"]',
      ),
    ).toBeTruthy();
    expect(screen.getByText("Ergebnis")).toBeInTheDocument();
    expect(screen.queryByText("Mein Aufgabenbereich")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Implementierung" }));

    expect(screen.getByRole("tab", { name: "Implementierung" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Pipeline-Architektur")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "GenAI4PC Pipeline-Diagramm vergrößern",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mein Aufgabenbereich")).toBeInTheDocument();
    expect(screen.queryByText("Ziel des Projekts")).not.toBeInTheDocument();
    expect(screen.getByText(/LLM-Dienste/)).toBeInTheDocument();
    expect(
      screen.getByText(getGenAI4PCPhaseDetailParagraphs("ingestion")[0]),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Antwort" }));

    expect(
      screen.getByText(getGenAI4PCPhaseDetailParagraphs("answer")[0]),
    ).toBeInTheDocument();
  });
});
