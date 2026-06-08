import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
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

describe("TimelineDetailPage", () => {
  it("renders FastGate detail content", () => {
    renderDetailAt("fastgate");

    expect(
      screen.getByRole("heading", { level: 1, name: "FastGate" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ziel des Projekts")).toBeInTheDocument();
    expect(screen.getByText(/Mein Aufgabenbereich/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "AP2 – Robuste Sensorik" }),
    ).toHaveAttribute("href", "/projekte/fastgate/models#ap2");
    expect(
      screen.getByText(/Zusammenhänge der Arbeitspakete AP1–AP6/),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/SOI mit vier Subsystemen/)).toHaveAttribute(
      "src",
      "/media/fastgate-bdd-subsystems.jpg",
    );
    expect(
      screen.getByText(/AP2 Apron Data Collector System, AP3 Central Data Space System/),
    ).toBeInTheDocument();
    expect(screen.getByText("Ergebnis")).toBeInTheDocument();
    expect(
      screen.queryByText(/Modellierung & Methoden/),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/State Machines, Smartwatch-App & Simulation/),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "FastGate" }),
    ).toHaveAttribute(
      "href",
      "https://innovationsflughafen.de/projekte/fastgate/",
    );
    expect(
      screen.queryByRole("link", { name: /Projektwebsite FastGate/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "← Zurück zum Werdegang" }),
    ).toHaveAttribute(
      "href",
      "/#timeline-module-wissenschaftliche-hilfskraft-ase-fastgate",
    );
  });

  it("redirects unknown slugs to home", () => {
    renderDetailAt("unbekannt");

    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
