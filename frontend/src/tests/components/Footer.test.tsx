import React from "react";
import { render } from "@testing-library/react";
import Footer from "../../components/Footer"; // Adjust the import based on your file structure

describe("Footer Component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<Footer />);

    // Check if the footer is rendered
    const footerElement = getByText(/All rights reserved/i);
    expect(footerElement).toBeInTheDocument();
  });

  test("displays the current year", () => {
    const { getByText } = render(<Footer />);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Check if the year is displayed in the footer
    const yearElement = getByText(
      new RegExp(`Easygenerator ${currentYear}`, "i")
    );
    expect(yearElement).toBeInTheDocument();
  });

  test("has correct classes applied", () => {
    const { container } = render(<Footer />);

    // Check if the footer has the correct class applied
    expect(container.firstChild).toHaveClass(
      "w-full py-5 flex justify-center absolute bottom-0"
    );
  });
});
