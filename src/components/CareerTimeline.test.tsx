import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CareerTimeline from "./CareerTimeline";

function renderTimeline() {
  return render(
    <MemoryRouter>
      <CareerTimeline />
    </MemoryRouter>,
  );
}

describe("CareerTimeline", () => {
  it("renders timeline entries with periods", () => {
    renderTimeline();

    expect(screen.getByLabelText("Werdegang")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wirtschaftsinformatik Master - UPB",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wissenschaftliche Hilfskraft - ASE",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Werkstudent Softwareentwickler - Eviden",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wirtschaftsinformatik Bachelor - UPB",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Förderprogram Digital Talents - SICP",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("2023 – Okt. 2026")).toBeInTheDocument();
    expect(screen.getByText("2024 – jetzt")).toBeInTheDocument();
    expect(screen.getByText("2022 – 2024")).toBeInTheDocument();
    expect(screen.getByText("2018 – 2023")).toBeInTheDocument();
    expect(screen.getByText("2021 – 2022")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", {
        name: "Fachgruppe Advanced Systems Engineering",
      }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: "FastGate" })).toHaveAttribute(
      "href",
      "/projekte/fastgate",
    );
    expect(screen.getByRole("link", { name: "GenAI4PC" })).toHaveAttribute(
      "href",
      "/projekte/genai4pc",
    );
    const mehrErfahrenLinks = screen.getAllByRole("link", {
      name: "Mehr erfahren →",
    });
    expect(
      mehrErfahrenLinks.map((link) => link.getAttribute("href")),
    ).toEqual(
      expect.arrayContaining(["/projekte/fastgate", "/projekte/genai4pc"]),
    );
    expect(screen.getByText("01.12.2024 – 31.09.2025")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Eviden" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("KIAM")).toBeInTheDocument();
    expect(screen.getByText(/Parallel zum Studium/)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /Wirtschaftsinformatik/i }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: "Model-based Systems Engineering" }),
    ).toHaveAttribute(
      "href",
      "#timeline-module-wirtschaftsinformatik-master-upb-systems-engineering-schwerpunkt-model-based-systems-engineering",
    );
    expect(
      document.getElementById(
        "timeline-module-wirtschaftsinformatik-master-upb-systems-engineering-schwerpunkt-model-based-systems-engineering",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 5,
        name: "Model-based Systems Engineering",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Grundlagen von Managementinformationsystemen"),
    ).toBeInTheDocument();
    expect(screen.getByText("Programmierung")).toBeInTheDocument();
    expect(screen.getByText("Software Engineering")).toBeInTheDocument();
  });

  it("lists SICP above the bachelor entry", () => {
    renderTimeline();

    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    const sicpIndex = headings.indexOf("Förderprogram Digital Talents - SICP");
    const bachelorIndex = headings.indexOf(
      "Wirtschaftsinformatik Bachelor - UPB",
    );

    expect(sicpIndex).toBeGreaterThan(-1);
    expect(bachelorIndex).toBeGreaterThan(-1);
    expect(sicpIndex).toBeLessThan(bachelorIndex);
  });

  it("renders a simple left timeline line without colored bars", () => {
    const { container } = renderTimeline();

    expect(
      container.querySelector("[data-testid^='timeline-bar-']"),
    ).toBeNull();
    expect(
      screen.getByLabelText("Werdegang").querySelector(".w-px"),
    ).toBeTruthy();
  });
});
