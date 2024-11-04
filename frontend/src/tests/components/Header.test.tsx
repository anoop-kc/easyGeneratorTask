import React from "react";
import { screen, render } from "@testing-library/react";
import Header from "../../components/Header";

jest.mock("../../components/Logo", () => () => <div data-testid="logo" />); // Mock the Logo component

describe("Header Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Header />);

    // Check if the header is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  it("contains the Logo component", () => {
    render(<Header />);

    // Check if the Logo component is rendered
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("has correct classes applied", () => {
    const { container } = render(<Header />);

    // Check if the header has the correct class applied
    expect(container.firstChild).toHaveClass(
      "w-full py-10 flex justify-center"
    );
  });
});
