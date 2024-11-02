import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserNameInput from "../../components/UserNameInput";
import { UserContext } from "../../components/AppContainer";
import useFormValidation from "../../features/form-validation/hooks/use-form-validation";

// Mock the useFormValidation hook
jest.mock("../../features/form-validation/hooks/use-form-validation");

describe("UserNameInput component", () => {
  const mockSetUserProperty = jest.fn();
  const mockClearUserProperty = jest.fn();
  const mockSetTouched = jest.fn();

  beforeEach(() => {
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: [],
      SetTouched: mockSetTouched,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderWithContext() {
    return render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <UserNameInput />
      </UserContext.Provider>
    );
  }

  it("renders without crashing", () => {
    renderWithContext();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("has an initial empty state for email", () => {
    renderWithContext();
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("updates email state on input change", () => {
    renderWithContext();
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(input.value).toBe("test@example.com");
  });

  it("calls SetTouched when input is focused", () => {
    renderWithContext();
    const input = screen.getByPlaceholderText("Email");
    fireEvent.focus(input);
    expect(mockSetTouched).toHaveBeenCalledWith(true);
  });

  it("applies correct CSS class when error messages are present", () => {
    (useFormValidation as jest.Mock).mockReturnValueOnce({
      errorMessages: [
        { isValid: false, errorMessage: "Invalid email address" },
      ],
      SetTouched: mockSetTouched,
    });
    renderWithContext();
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveClass("border-red-300");
  });

  it("displays error messages if there are errors", () => {
    (useFormValidation as jest.Mock).mockReturnValueOnce({
      errorMessages: [
        { isValid: false, errorMessage: "Invalid email address" },
      ],
      SetTouched: mockSetTouched,
    });
    renderWithContext();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("calls setUserProperty if there are no errors", () => {
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    expect(mockSetUserProperty).toHaveBeenCalledWith(
      "email",
      "test@example.com"
    );
  });

  it("calls clearUserProperty if there are errors", () => {
    (useFormValidation as jest.Mock).mockReturnValueOnce({
      errorMessages: [
        { isValid: false, errorMessage: "Invalid email address" },
      ],
      SetTouched: mockSetTouched,
    });
    renderWithContext();
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });
    expect(mockClearUserProperty).toHaveBeenCalledWith("email");
  });
});
