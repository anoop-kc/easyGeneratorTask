import { renderHook, act } from "@testing-library/react";
import { useAlert } from "../../features";
import { iAlert } from "../../interfaces";

describe("useAlert Hook", () => {
  it("should initialize with default alert values", () => {
    const { result } = renderHook(() => useAlert());
    const initialAlert: iAlert = { show: false, message: "", type: "info" };

    expect(result.current.alert).toEqual(initialAlert);
  });

  it("should show alert with given message and type", () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert("Test message", "success");
    });

    expect(result.current.alert).toEqual({
      show: true,
      message: "Test message",
      type: "success",
    });
  });

  it("should close alert after default 3 seconds if dismissAfter is not provided", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert("Auto dismiss test", "info");
    });

    expect(result.current.alert.show).toBe(true);

    // Fast-forward time to simulate auto-dismiss
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.alert.show).toBe(false);
    jest.useRealTimers();
  });

  it("should keep alert open if dontDissmiss is true", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert("Persistent alert", "warning", true);
    });

    expect(result.current.alert.show).toBe(true);

    // Fast-forward time to simulate waiting
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.alert.show).toBe(true); // Alert should still be visible
    jest.useRealTimers();
  });

  it("should close alert after custom duration if dismissAfter is provided", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert("Custom dismiss alert", "error", false, 5000);
    });

    expect(result.current.alert.show).toBe(true);

    // Fast-forward time by 3000
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.alert.show).toBe(true);

    // Fast-forward time by custom dismiss duration
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.alert.show).toBe(false);
    jest.useRealTimers();
  });

  it("should close alert immediately when closeAlert is called", () => {
    const { result } = renderHook(() => useAlert());

    act(() => {
      result.current.showAlert("Close manually", "info");
    });

    expect(result.current.alert.show).toBe(true);

    act(() => {
      result.current.closeAlert();
    });

    expect(result.current.alert.show).toBe(false);
  });
});
