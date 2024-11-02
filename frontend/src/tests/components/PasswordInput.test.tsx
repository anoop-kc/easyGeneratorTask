// PasswordInput.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordInput from "../../components/PasswordInput";
import { UserContext } from "../../components/AppContainer";
import { useFormValidation } from "../../features";
import { iErrorObject } from "../../interfaces";

// Mock the useFormValidation hook
jest.mock("../../features", () => ({
  useFormValidation: jest.fn().mockReturnValue({
    errorMessages: [],
    SetTouched: jest.fn(),
  }),
}));

const setUserProperty = jest.fn();
const clearUserProperty = jest.fn();

describe("PasswordInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (
    errorMessages: iErrorObject[] = [],
    hideValidationMessages = false
  ) => {
    // Mock implementation of useFormValidation
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages,
      SetTouched: jest.fn(),
    });

    return render(
      <UserContext.Provider
        value={{ user: {}, setUserProperty, clearUserProperty }}
      >
        <PasswordInput hideValidationMessages={hideValidationMessages} />
      </UserContext.Provider>
    );
  };

  test("renders password input with placeholder", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/password/i);
    expect(input).toBeInTheDocument();
  });

  it("has an initial empty state for password", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("updates password state on input change", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "TestPassword" } });
    expect(input.value).toBe("TestPassword");
  });

  test("calls setUserProperty when there are no validation errors", async () => {
    renderComponent([]);

    const input = screen.getByPlaceholderText(/password/i);
    await userEvent.type(input, "ValidPassword");

    await waitFor(() => {
      expect(setUserProperty).toHaveBeenCalledWith("password", "ValidPassword");
    });
    expect(clearUserProperty).not.toHaveBeenCalled();
  });

  test("calls clearUserProperty when there are validation errors", async () => {
    renderComponent([
      { isValid: false, errorMessage: "Password is too short" },
    ]);

    const input = screen.getByPlaceholderText(/password/i);
    await userEvent.type(input, "short");

    await waitFor(() => {
      expect(clearUserProperty).toHaveBeenCalledWith("password");
    });
    expect(setUserProperty).not.toHaveBeenCalled();
  });

  test("calls SetTouched when the input is focused", () => {
    const mockSetTouched = jest.fn();
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: [],
      SetTouched: mockSetTouched,
    });

    render(
      <UserContext.Provider
        value={{
          setUserProperty: setUserProperty,
          clearUserProperty: clearUserProperty,
        }}
      >
        <PasswordInput />
      </UserContext.Provider>
    );

    const input = screen.getByPlaceholderText(/password/i);
    fireEvent.focus(input);

    expect(mockSetTouched).toHaveBeenCalledWith(true);
  });

  test("does not render error messages if hideValidationMessages is true", () => {
    const errorMessages = [
      { isValid: false, errorMessage: "Password is too short" },
    ];
    renderComponent(errorMessages, true);

    errorMessages.forEach((error) => {
      expect(screen.queryByText(error.errorMessage)).not.toBeInTheDocument();
    });
  });

  test("renders error messages when there are validation errors and hideValidationMessages is false", () => {
    const errorMessages: iErrorObject[] = [
      { isValid: false, errorMessage: "Password is too short" },
    ];
    renderComponent(errorMessages);

    errorMessages.forEach((error) => {
      expect(screen.getByText(error.errorMessage || "")).toBeInTheDocument();
    });
  });
});
