// SignupContainer.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupContainer from "../../components/SignupContainer";
import { UserContext } from "../../components/AppContainer";

// Mock UserContext and required components
const mockIsUserValid = jest.fn();
const mockPasswordConfirmed = jest.fn();
const mockSetUserProperty = jest.fn();
// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUserContext = {
  user: {},
  isUserValid: mockIsUserValid,
  passwordConfirmed: mockPasswordConfirmed,
  setUserProperty: mockSetUserProperty,
};

const MockedSignupContainer = () => (
  <UserContext.Provider value={mockUserContext}>
    <BrowserRouter>
      <SignupContainer />
    </BrowserRouter>
  </UserContext.Provider>
);

describe("SignupContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls before each test
  });

  test("renders SignupContainer with input fields and signup button", () => {
    render(<MockedSignupContainer />);

    // Check if the signup header is present
    expect(
      screen.getByRole("heading", { name: /sign up/i })
    ).toBeInTheDocument();

    // Check if the required input components are rendered
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm password/i)
    ).toBeInTheDocument();

    // Check if the signup button is present
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("disables signup button when user is invalid", () => {
    mockIsUserValid.mockReturnValue(false); // Simulate user being invalid
    mockPasswordConfirmed.mockReturnValue(true); // Simulate password being confirmed

    render(<MockedSignupContainer />);

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeDisabled(); // Check if button is disabled
  });

  test("disables signup button when password is not confirmed", () => {
    mockPasswordConfirmed.mockReturnValue(false); // Simulate password not confirmed

    render(<MockedSignupContainer />);

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeDisabled(); // Check if button is disabled
  });

  test("enables signup button when user is valid and password is confirmed", () => {
    mockIsUserValid.mockReturnValue(true); // Simulate user being valid
    mockPasswordConfirmed.mockReturnValue(true); // Simulate password being confirmed

    render(<MockedSignupContainer />);

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeEnabled(); // Check if button is enabled
  });

  test("navigates to dashboard on signup", async () => {
    mockIsUserValid.mockReturnValue(true); // Simulate user being valid
    mockPasswordConfirmed.mockReturnValue(true); // Simulate password being confirmed

    render(<MockedSignupContainer />);

    const button = screen.getByRole("button", { name: /sign up/i });

    fireEvent.click(button); // Click the signup button

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });
});
