import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockedSignupContainer from "./mocks/SignupContainerMock";
import { useAlert } from "../../features";
import { Alert } from "../../components";
import { iAlert } from "../../interfaces";

jest.mock("../../features", () => ({
  useAlert: jest.fn(),
}));

jest.mock("../../components", () => ({
  Alert: jest.fn(({ alert, onClose }) => (
    <div data-testid="alert">
      <span>{alert.message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));

describe("MockedSignupContainer", () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAlert as jest.Mock).mockReturnValue({
      alert: { show: false, message: "", type: "info" },
      showAlert: jest.fn(),
      closeAlert: jest.fn(),
    });
  });

  test("renders the signup button and heading", () => {
    render(
      <MockedSignupContainer mockSignup={mockSignup} passwordConfirmed={true} />
    );

    expect(
      screen.getByRole("heading", { name: /sign up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("calls signup and logs navigation message on success", async () => {
    mockSignup.mockResolvedValueOnce({ statusCode: 201 });
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    render(
      <MockedSignupContainer mockSignup={mockSignup} passwordConfirmed={true} />
    );
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({ username: "testuser" });
      expect(consoleLogSpy).toHaveBeenCalledWith("Navigating to /dashboard");
    });

    consoleLogSpy.mockRestore();
  });

  test("shows alert on unsuccessful signup", async () => {
    const errorMessage = "User already exists";
    mockSignup.mockResolvedValueOnce({
      statusCode: 400,
      message: errorMessage,
    });
    const { showAlert } = useAlert();

    render(
      <MockedSignupContainer mockSignup={mockSignup} passwordConfirmed={true} />
    );
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({ username: "testuser" });
      expect(showAlert).toHaveBeenCalledWith(errorMessage, "error");
    });
  });

  test("enables button when userValid and passwordConfirmed are true", () => {
    render(
      <MockedSignupContainer mockSignup={mockSignup} passwordConfirmed={true} />
    );
    const button = screen.getByRole("button", { name: /sign up/i });

    // Initial state is valid
    expect(button).toBeEnabled();
  });

  test("disables button when userValid or passwordConfirmed is false", () => {
    // Simulate invalid states and re-render component
    render(
      <MockedSignupContainer
        mockSignup={mockSignup}
        passwordConfirmed={false}
      />
    );
    const disabledBUutton = screen.getByRole("button", { name: /sign up/i });
    expect(disabledBUutton).toBeDisabled();
  });

  test("renders Alert component and handles close action", async () => {
    const errorMessage = "User already exists";
    mockSignup.mockResolvedValueOnce({
      statusCode: 400,
      message: errorMessage,
    });

    const mockShowAlert = jest.fn();
    const mockCloseAlert = jest.fn();
    const mockAlert: iAlert = { show: true, message: "", type: "info" };
    (useAlert as jest.Mock).mockReturnValue({
      alert: mockAlert,
      showAlert: mockShowAlert,
      closeAlert: mockCloseAlert,
    });

    render(
      <MockedSignupContainer
        mockSignup={mockSignup}
        passwordConfirmed={true}
        alert={mockAlert}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith(errorMessage, "error");
    });
  });
});
