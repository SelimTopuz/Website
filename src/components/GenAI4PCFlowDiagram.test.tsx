import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { GenAI4PCFlowDiagram } from "./GenAI4PCFlowDiagram";

describe("GenAI4PCFlowDiagram", () => {
  it("renders architecture components and phase tabs", async () => {
    const user = userEvent.setup();
    render(<GenAI4PCFlowDiagram caption="Test caption" />);

    expect(
      screen.getByRole("img", {
        name: /GenAI4PC Backend-Architektur: FastAPI mit sechs Modulen/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Ingestion" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Konzept & Aufgaben" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Session" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Frage" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Antwort" })).toBeInTheDocument();
    expect(
      screen.getByRole("tabpanel", { name: "Ingestion" }),
    ).toHaveTextContent(/Text \+ Bild-Metadaten zurück/);
    expect(screen.getByText("LlamaParse")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Frage" }));
    expect(screen.getByRole("tab", { name: "Frage" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel", { name: "Frage" })).toHaveTextContent(
      /relevante Chunks aus ChromaDB/,
    );

    await user.click(screen.getByRole("tab", { name: "Antwort" }));
    expect(screen.getByRole("tab", { name: "Antwort" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel", { name: "Antwort" })).toHaveTextContent(
      /SSE Stream ans Frontend/,
    );

    await user.click(
      screen.getByRole("button", {
        name: "GenAI4PC Pipeline-Diagramm vergrößern",
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Schließen" })).toBeInTheDocument();
  });
});
