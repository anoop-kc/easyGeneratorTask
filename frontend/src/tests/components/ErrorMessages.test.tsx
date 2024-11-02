import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessages from "../../components/ErrorMessages";
import { iErrorObject } from "../../interfaces";

describe("ErrorMessages Component", () => {
  const mockErrors: iErrorObject[] = [
    {
      isValid: false,
      errorMessage: "Password must contain at least 8 characters",
    },
    {
      isValid: false,
      errorMessage: "Password must include at least one special character",
    },
  ];

  const errorMessages: string[] = [
    "Password must contain at least 8 characters",
    "Password must include at least one special character",
  ];

  it("renders without crashing", () => {
    render(<ErrorMessages errors={[]} />);
    // Ensure no errors in initial render
    expect(screen.queryByText(/Password must/)).not.toBeInTheDocument();
  });

  it("renders the correct number of error messages", () => {
    render(<ErrorMessages errors={mockErrors} />);
    const errorElements = screen.getAllByText(/Password must/);
    expect(errorElements.length).toBe(mockErrors.length);
  });

  it("displays the correct error message text", () => {
    render(<ErrorMessages errors={mockErrors} />);
    errorMessages.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it("displays the SVG icon for each error", () => {
    render(<ErrorMessages errors={mockErrors} />);
    const svgIcons = screen.getAllByRole("img", { hidden: true });
    expect(svgIcons.length).toBe(mockErrors.length);
  });

  it("displays the correct structure for each error message", () => {
    render(<ErrorMessages errors={mockErrors} />);
    const errorMessages = screen.getAllByText(/Password must/);
    errorMessages.forEach((message) => {
      expect(message).toBeVisible();
      const icon = message.previousSibling;
      expect(icon).toHaveClass("h-auto w-3 mr-1 fill-red-500");
    });
  });

  it("does not render anything when there are no errors", () => {
    render(<ErrorMessages errors={[]} />);
    expect(screen.queryByText(/Password must/)).not.toBeInTheDocument();
  });
});
