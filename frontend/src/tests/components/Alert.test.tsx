import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "../../components";
import { iAlert } from "../../interfaces";

describe("Alert Component", () => {
  const mockOnClose = jest.fn();

  const renderAlert = (alertProps: iAlert) =>
    render(<Alert alert={alertProps} onClose={mockOnClose} />);

  it("renders the alert message", () => {
    const alertProps: iAlert = {
      show: true,
      message: "This is a test alert",
      type: "info",
    };
    renderAlert(alertProps);

    expect(screen.getByText("This is a test alert")).toBeInTheDocument();
  });

  it("applies the correct styles based on the type", () => {
    const alertTypes: { type: iAlert["type"]; style: string }[] = [
      {
        type: "success",
        style: "bg-green-100 text-green-700 border-green-500",
      },
      { type: "error", style: "bg-red-100 text-red-700 border-red-500" },
      {
        type: "warning",
        style: "bg-yellow-100 text-yellow-700 border-yellow-500",
      },
      { type: "info", style: "bg-blue-100 text-blue-700 border-blue-500" },
    ];

    alertTypes.forEach(({ type, style }) => {
      const alertProps: iAlert = {
        show: true,
        message: `Test ${type} alert`,
        type,
      };
      renderAlert(alertProps);

      const alertElement = screen.getByText(`Test ${type} alert`).parentElement
        ?.parentElement;
      expect(alertElement).toHaveClass(style);
    });
  });

  it("is hidden when show is false", () => {
    const alertProps: iAlert = {
      show: false,
      message: "This alert should be hidden",
      type: "info",
    };
    renderAlert(alertProps);

    const alertElement = screen.getByText("This alert should be hidden")
      .parentElement?.parentElement;
    expect(alertElement).toHaveClass("scale-125 opacity-0 hidden");
  });

  it("displays when show is true", () => {
    const alertProps: iAlert = {
      show: true,
      message: "This alert should be visible",
      type: "info",
    };
    renderAlert(alertProps);

    const alertElement = screen.getByText("This alert should be visible")
      .parentElement?.parentElement;
    expect(alertElement).toHaveClass("scale-100 opacity-100 block");
  });

  it("calls onClose when the close button is clicked", () => {
    const alertProps: iAlert = {
      show: true,
      message: "This alert can be closed",
      type: "info",
    };
    renderAlert(alertProps);

    const closeButton = screen.getByRole("button", { name: /×/ });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
