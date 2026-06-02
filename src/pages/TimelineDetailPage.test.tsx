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
    expect(
      screen.getByText(/Logische Architektur \(BDD\)/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Apron Data Collector System → AP2/),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/SOI mit vier Subsystemen/)).toHaveAttribute(
      "src",
      "/media/fastgate-bdd-subsystems.png",
    );
    expect(
      screen.getByText(/Interne Schnittstellen \(ibd\)/),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/Datenflüsse zwischen Apron Data Collector/),
    ).toHaveAttribute("src", "/media/fastgate-ibd-soi.png");
    expect(
      screen.getByText(/State Machines, Smartwatch-App & Simulation/),
    ).toBeInTheDocument();
    const video = document.querySelector("video");
    expect(video).toBeTruthy();
    expect(video?.querySelector("source")).toHaveAttribute(
      "src",
      "/media/fastgate-statemachines.mp4",
    );
    expect(
      screen.getByRole("link", { name: /Projektwebsite FastGate/ }),
    ).toHaveAttribute(
      "href",
      "https://innovationsflughafen.de/projekte/fastgate/",
    );
    expect(
      screen.getByRole("link", { name: "offiziellen Projektwebsite" }),
    ).toHaveAttribute(
      "href",
      "https://innovationsflughafen.de/projekte/fastgate/",
    );
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
