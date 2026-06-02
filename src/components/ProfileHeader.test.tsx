import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProfileHeader from "./ProfileHeader";

describe("ProfileHeader", () => {
  it("renders name, tagline and social links", () => {
    render(<ProfileHeader />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Selim Topuz" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bereit durchzustarten und meinen Platz zu finden/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Social Links" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
  });
});
