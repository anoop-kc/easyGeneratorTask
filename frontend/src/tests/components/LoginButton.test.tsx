import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import LoginButtonMock from "./mocks/LoginButtonMock";

// Mock dependencies
const mockNavigate = jest.fn();
const mockShowAlert = jest.fn();
const mockIsUserValid = jest.fn();
const mockLogin = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../features/alert/hooks/use-alert", () => ({
  useAlert: () => ({
    alert: { show: false, message: "", type: "info" },
    showAlert: mockShowAlert,
    closeAlert: jest.fn(),
  }),
}));

describe("MockedLoginButton", () => {
  beforeEach(() => {
    mockIsUserValid.mockReturnValue(true); // Assume user is valid by default
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Login button", () => {
    render(<LoginButtonMock />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).not.toBeDisabled();
  });
});
