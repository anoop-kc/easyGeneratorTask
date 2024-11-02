import React from "react";
import { screen, render } from "@testing-library/react";
import Header from "../../components/Header"; // Adjust the import based on your file structure

jest.mock("../../components/Logo", () => () => <div data-testid="logo" />); // Mock the Logo component

describe("Header Component", () => {
  test("renders correctly", () => {
    const { container } = render(<Header />);

    // Check if the header is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  test("contains the Logo component", () => {
    render(<Header />);

    // Check if the Logo component is rendered
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  test("has correct classes applied", () => {
    const { container } = render(<Header />);

    // Check if the header has the correct class applied
    expect(container.firstChild).toHaveClass(
      "w-full py-10 flex justify-center"
    );
  });
});
