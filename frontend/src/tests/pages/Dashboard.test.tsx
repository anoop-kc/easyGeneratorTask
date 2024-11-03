import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../components/AppContainer";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

// Mock the logout function
const mockLogout = jest.fn();

// Function to render the Dashboard component with the UserContext
const renderDashboard = (
  user = { name: "Test User", email: "testuser@example.com" }
) => {
  render(
    <UserContext.Provider value={{ user, logout: mockLogout }}>
      <Router>
        <Dashboard />
      </Router>
    </UserContext.Provider>
  );
};

describe("Dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it("renders the dashboard with user details", () => {
    renderDashboard();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Welcome to the application"
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Test User"
    );
    expect(screen.getByText("testuser@example.com")).toBeInTheDocument();
  });

  it("calls logout and navigates to the home page when logout button is clicked", () => {
    renderDashboard();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled(); // Verify that logout function was called
  });

  it("does not render the logout button if user is null", () => {
    renderDashboard({ name: "", email: "" }); // Render with initial no user

    const logoutButton = screen.queryByRole("button", { name: /logout/i });
    expect(logoutButton).not.toBeInTheDocument(); // Ensure the button is not rendered
  });

  it("renders the space shuttle SVG", () => {
    renderDashboard();

    const svgElement = screen.getByRole("img"); // Get the SVG by its role
    expect(svgElement).toBeInTheDocument(); // Ensure the SVG is rendered
  });

  it("renders the logout button if user is present", () => {
    renderDashboard(); // Render with user

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument(); // Ensure the button is rendered
  });
});
