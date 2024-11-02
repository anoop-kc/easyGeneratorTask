// Logo.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "../../components/Logo";

describe("Logo Component", () => {
  it("renders the logo image with the correct attributes", () => {
    render(<Logo />);

    const logoImg = screen.getByAltText(
      /EasyGenerator | #1 E-learning Software/i
    );
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", expect.stringContaining("logo.png"));
    expect(logoImg).toHaveClass("h-auto max-w-xs");
  });

  it("has an accessible role as an image", () => {
    render(<Logo />);

    const logoImg = screen.getByRole("img", {
      name: /EasyGenerator | #1 E-learning Software/i,
    });
    expect(logoImg).toBeInTheDocument();
  });
});
