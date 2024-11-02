import { renderHook, act } from "@testing-library/react";
import { useFormValidation, useDebounce } from "../../features/";

import { waitFor } from "@testing-library/react";

// Mock the useDebounce hook to control debounce behavior and bypass delay
jest.mock("../../features/debounce/hooks/use-debounce");

describe("useFormValidation", () => {
  beforeEach(() => {
    // Mock useDebounce to return the value immediately for testing
    (useDebounce as jest.Mock).mockImplementation((value) => ({
      debouncedValue: value,
    }));
  });

  it("initializes with empty error messages and untouched state", () => {
    const { result } = renderHook(() => useFormValidation("", "name"));
    expect(result.current.errorMessages).toEqual([]);
    expect(result.current.touched).toBe(false);
  });

  it("validates name field: empty name", async () => {
    const { result } = renderHook(() => useFormValidation("", "name"));

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        { isValid: false, errorMessage: "Please enter a name" },
      ]);
    });
  });

  it("validates name field: name with special characters", async () => {
    const { result } = renderHook(() =>
      useFormValidation("Invalid@Name", "name")
    );

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        {
          isValid: false,
          errorMessage: "Your name should not contain special characters",
        },
      ]);
    });
  });

  it("validates email field: empty email", async () => {
    const { result } = renderHook(() => useFormValidation("", "email"));

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        { isValid: false, errorMessage: "Please enter your email" },
      ]);
    });
  });

  it("validates email field: invalid email format", async () => {
    const { result } = renderHook(() =>
      useFormValidation("invalid-email", "email")
    );

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        { isValid: false, errorMessage: "Please enter a valid email" },
      ]);
    });
  });

  it("validates password field: password with spaces", async () => {
    const { result } = renderHook(() =>
      useFormValidation("password with space", "password")
    );

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        {
          isValid: false,
          errorMessage: "your password should not contain any spaces",
        },
      ]);
    });
  });

  it("validates password field: password too short", async () => {
    const { result } = renderHook(() => useFormValidation("short", "password"));

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        {
          isValid: false,
          errorMessage: "your password should be at least 8 characters long",
        },
      ]);
    });
  });

  it("validates confirmPassword field: mismatched password", async () => {
    const { result } = renderHook(() =>
      useFormValidation("password", "confirmPassword", "referencePassword")
    );

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([
        {
          isValid: false,
          errorMessage:
            "The typed password does not match with the password provided",
        },
      ]);
    });
  });

  it("validates confirmPassword field: matched password", async () => {
    const { result } = renderHook(() =>
      useFormValidation(
        "referencePassword",
        "confirmPassword",
        "referencePassword"
      )
    );

    act(() => {
      result.current.SetTouched(true);
      result.current.validateField();
    });

    await waitFor(() => {
      expect(result.current.errorMessages).toEqual([]);
    });
  });

  it("sets touched state correctly", () => {
    const { result } = renderHook(() => useFormValidation("value", "email"));

    // Initially, touched should be false
    expect(result.current.touched).toBe(false);

    // Setting touched to true
    act(() => result.current.SetTouched(true));
    expect(result.current.touched).toBe(true);
  });
});
