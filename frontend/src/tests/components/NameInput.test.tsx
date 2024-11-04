import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NameInput from "../../components/NameInput";
import { UserContext } from "../../components/AppContainer";
import { useFormValidation } from "../../features";
import userEvent from "@testing-library/user-event";

jest.mock("../../features", () => ({
  useFormValidation: jest.fn(),
}));
jest.mock(
  "../../components/ErrorMessages",
  () =>
    ({ errors }: { errors: string[] }) =>
      (
        <div>
          {errors &&
            errors.map((error, index) => <div key={index}>{error}</div>)}
        </div>
      )
);

describe("NameInput Component", () => {
  const mockSetUserProperty = jest.fn();
  const mockClearUserProperty = jest.fn();

  beforeEach(() => {
    // Mock the context values
    jest.clearAllMocks();
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: [],
      SetTouched: jest.fn(),
    });
  });

  it("renders input field with correct placeholder", () => {
    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );

    const input = screen.getByPlaceholderText(/full name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("has an initial empty state for name", () => {
    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );
    const input = screen.getByPlaceholderText("Full name") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("updates name state on input change", () => {
    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );
    const input = screen.getByPlaceholderText("Full name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Some Name" } });
    expect(input.value).toBe("Some Name");
  });

  it("sets user property when there are no validation errors", async () => {
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: [],
      SetTouched: jest.fn(),
    });

    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );

    const input = screen.getByPlaceholderText(/full name/i) as HTMLInputElement;
    await userEvent.type(input, "Some Name");

    await waitFor(() => {
      expect(mockSetUserProperty).toHaveBeenCalledWith("name", "Some Name");
      expect(mockClearUserProperty).not.toHaveBeenCalled();
    });
  });

  it("clears user property when there are validation errors", () => {
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: ["Name is required"],
      SetTouched: jest.fn(),
    });

    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: "" },
    });
    expect(mockClearUserProperty).toHaveBeenCalledWith("name");
    expect(mockSetUserProperty).not.toHaveBeenCalled();
  });

  it("displays error messages when validation errors are present", () => {
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: ["Name is required"],
      SetTouched: jest.fn(),
    });

    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("sets touched state on input focus", () => {
    const mockSetTouched = jest.fn();
    (useFormValidation as jest.Mock).mockReturnValue({
      errorMessages: [],
      SetTouched: mockSetTouched,
    });

    render(
      <UserContext.Provider
        value={{
          setUserProperty: mockSetUserProperty,
          clearUserProperty: mockClearUserProperty,
        }}
      >
        <NameInput />
      </UserContext.Provider>
    );

    fireEvent.focus(screen.getByPlaceholderText(/full name/i));
    expect(mockSetTouched).toHaveBeenCalledWith(true);
  });
});
