// Dashboard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";

describe("Dashboard component", () => {
  it("renders without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText("Welcome to the application")).toBeInTheDocument();
  });

  it("displays the heading with correct text", () => {
    render(<Dashboard />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Welcome to the application");
  });

  it("renders the SVG with the correct attributes", () => {
    render(<Dashboard />);
    const svg = screen.getByRole("img");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svg).toHaveAttribute("width", "256");
    expect(svg).toHaveAttribute("height", "256");
    expect(svg).toHaveClass("mt-28 fill-orange-400");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
