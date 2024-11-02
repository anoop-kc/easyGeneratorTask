import React from "react";
import { render, screen } from "@testing-library/react";
import AppContainer, { UserContext } from "../../components/AppContainer";
import { useUser } from "../../features";

// Mock the components
jest.mock("../../components/Header", () => () => <div>Mock Header</div>);
jest.mock("../../components/MiddleContainer", () => () => (
  <div>Mock MiddleContainer</div>
));
jest.mock("../../components/Footer", () => () => <div>Mock Footer</div>);

// Mock the useUser hook
jest.mock("../../features", () => ({
  useUser: jest.fn(),
}));

describe("AppContainer", () => {
  const mockUseUserData = {
    user: {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    },
    setUserProperty: jest.fn(),
    clearUserProperty: jest.fn(),
    passwordConfirmed: false,
    setPasswordConfirmed: jest.fn(),
    isUserValid: jest.fn().mockReturnValue(true),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(() => {
    // Set up mock return values for the useUser hook
    (useUser as jest.Mock).mockReturnValue(mockUseUserData);
  });

  it("renders without crashing", () => {
    render(<AppContainer />);
    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Mock MiddleContainer")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  it("provides correct context values", () => {
    render(<AppContainer />);

    // Verify that the values from the context are used in components.
    // This test assumes that `Header`, `MiddleContainer`, or `Footer` use the context in some way.
    expect(mockUseUserData.setUserProperty).not.toHaveBeenCalled();
    expect(mockUseUserData.clearUserProperty).not.toHaveBeenCalled();
    expect(mockUseUserData.isUserValid).toBeDefined();
    expect(mockUseUserData.user.name).toBe("Test User");
    expect(mockUseUserData.user.email).toBe("test@example.com");
  });

  it("renders header, middle container, and footer components", () => {
    render(<AppContainer />);
    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Mock MiddleContainer")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });
});
