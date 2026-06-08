import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProjectModelsPage from "./ProjectModelsPage";

describe("ProjectModelsPage", () => {
  it("renders FastGate subsystem models", () => {
    render(
      <MemoryRouter initialEntries={["/projekte/fastgate/models"]}>
        <Routes>
          <Route
            path="/projekte/:slug/models"
            element={<ProjectModelsPage />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /FastGate – Subsystem-Modelle/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Apron Data Collector System" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Autonome Airport Operation Systeme",
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByAltText(/AP2 Sensor-Konzept/)).toHaveAttribute(
      "src",
      "/media/fastgate/models/ap2-sensor-konzept.png",
    );
    expect(screen.getByAltText(/AP3 Infrastruktur und Schnittstellen/)).toHaveAttribute(
      "src",
      "/media/fastgate/models/ap3-infrastruktur-schnittstellen.png",
    );
    expect(screen.getByAltText(/AP4 Steuerungsarchitektur/)).toHaveAttribute(
      "src",
      "/media/fastgate/models/ap4-steuerungsarchitektur.png",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Central Data Space System" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Zurück zur FastGate-Übersicht/ }),
    ).toHaveAttribute("href", "/projekte/fastgate");
    const videos = document.querySelectorAll("video source");
    expect(videos).toHaveLength(3);
    expect(videos[0]).toHaveAttribute("src", "/media/fastgate-statemachines.mp4");
    expect(videos[1]).toHaveAttribute(
      "src",
      "/media/fastgate/models/ap5-uhr-demo.mp4",
    );
    expect(videos[2]).toHaveAttribute(
      "src",
      "/media/fastgate/models/ap5-ipad-demo.mp4",
    );
    expect(screen.getByAltText(/ibd HMI System Architecture/)).toHaveAttribute(
      "src",
      "/media/fastgate/models/ibd-ap5.png",
    );
  });
});
