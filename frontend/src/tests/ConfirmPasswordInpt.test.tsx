import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";
import { UserContext } from "../components/AppContainer";
import { useFormValidation } from "../features";
import { iErrorObject } from "../interfaces";

// Mock the `useFormValidation` hook
jest.mock("../features", () => ({
  useFormValidation: jest.fn(),
}));

// Define types for `useFormValidation`'s return type based on your actual hook definition
interface ValidationHookReturn {
  errorMessages: iErrorObject[];
  SetTouched: (value: boolean) => void;
  validateField: () => void;
  touched: boolean;
}

describe("PasswordInput Component", () => {
  const mockSetPasswordConfirmed = jest.fn();

  const mockUserContext = {
    user: { password: "password123" },
    setPasswordConfirmed: mockSetPasswordConfirmed,
    setUserProperty: jest.fn(),
    passwordConfirmed: false,
  };

  const mockValidationHook: ValidationHookReturn = {
    errorMessages: [],
    SetTouched: jest.fn(),
    validateField: jest.fn(),
    touched: false,
  };

  beforeEach(() => {
    (useFormValidation as jest.Mock).mockReturnValue(mockValidationHook);
    render(
      <UserContext.Provider value={mockUserContext}>
        <ConfirmPasswordInput />
      </UserContext.Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders password input field", () => {
    const input = screen.getByPlaceholderText("Confirm Password");
    expect(input).toBeInTheDocument();
  });

  it("calls SetTouched and updates confirmPassword on input change", () => {
    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password123" } });

    expect(mockValidationHook.SetTouched).toHaveBeenCalledWith(true);
    expect(input).toHaveValue("password123");
  });

  it("does not validate password confirmation on confirmPassword change  when the touched variable is false", () => {
    mockValidationHook.touched = false;
    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password123" } });

    expect(mockValidationHook.validateField).not.toHaveBeenCalled();
  });

  it("validates password confirmation on confirmPassword change only when the touched variable is true", () => {
    mockValidationHook.touched = true;
    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password123" } });

    expect(mockValidationHook.validateField).toHaveBeenCalled();
  });

  it("calls setPasswordConfirmed(true) when no errors are present", () => {
    // Set up no error messages to simulate successful confirmation
    mockValidationHook.errorMessages = [];
    mockValidationHook.touched = true;

    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password123" } });

    expect(mockSetPasswordConfirmed).toHaveBeenCalledWith(true);
  });

  it("calls setPasswordConfirmed(false) when errors are present", () => {
    // Set up error messages to simulate a failed confirmation
    mockValidationHook.errorMessages = [
      { isValid: false, errorMessage: "Passwords do not match" },
    ];
    mockValidationHook.touched = true;

    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password321" } });

    expect(mockSetPasswordConfirmed).toHaveBeenCalledWith(false);
  });

  it("displays error messages if present", () => {
    // Set up error messages for validation
    mockValidationHook.errorMessages = [
      { isValid: false, errorMessage: "Passwords do not match" },
    ];

    const input = screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(input, { target: { value: "password321" } });

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });
});
