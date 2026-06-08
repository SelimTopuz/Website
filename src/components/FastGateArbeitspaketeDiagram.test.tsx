import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { FastGateArbeitspaketeDiagram } from "./FastGateArbeitspaketeDiagram";

function renderDiagram() {
  return render(
    <MemoryRouter>
      <FastGateArbeitspaketeDiagram />
    </MemoryRouter>,
  );
}

describe("FastGateArbeitspaketeDiagram", () => {
  it("links each Arbeitspaket to the models page anchor", () => {
    renderDiagram();

    expect(
      screen.getByRole("link", { name: "AP2 – Robuste Sensorik" }),
    ).toHaveAttribute("href", "/projekte/fastgate/models#ap2");
    expect(
      screen.getByRole("link", { name: "AP4 – High-Driving Automation" }),
    ).toHaveAttribute("href", "/projekte/fastgate/models#ap4");
    expect(
      screen.getByRole("link", { name: "AP3 – HD-Mapping / Zentrale Datenplattform" }),
    ).toHaveAttribute("href", "/projekte/fastgate/models#ap3");
    expect(
      screen.getByRole("link", { name: "AP5 – Digitaler Zwilling" }),
    ).toHaveAttribute("href", "/projekte/fastgate/models#ap5");
    expect(
      screen.queryByRole("link", { name: "AP1 – Autonome Airport Operation Systeme" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "AP6 – Technologieakzeptanz und Transfer" }),
    ).not.toBeInTheDocument();
  });
});
