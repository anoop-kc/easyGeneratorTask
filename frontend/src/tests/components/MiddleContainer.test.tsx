import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MiddleContainer, LoginContainer } from "../../components";
import Dashboard from "../../pages/Dashboard";

jest.mock("../../components/LoginContainer", () => () => (
  <div>Login Container</div>
));
jest.mock("../../pages/Dashboard", () => () => <div>Dashboard</div>);

describe("MiddleContainer Component", () => {
  const renderWithRouter = (initialRoute: string) => {
    window.history.pushState({}, "Test page", initialRoute);
    return render(<MiddleContainer />);
  };

  it('renders LoginContainer on default route "/"', () => {
    renderWithRouter("/");
    expect(screen.getByText("Login Container")).toBeInTheDocument();
  });

  it('renders Dashboard on route "/dashboard"', () => {
    renderWithRouter("/dashboard");
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("has the expected container styling", () => {
    renderWithRouter("/");
    const container = screen.getByTestId("wrapper");
    expect(container).toHaveClass("w-full p-5 flex justify-center");
  });
});
