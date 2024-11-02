import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../features/";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("initializes debouncedValue with the initial value", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current.debouncedValue).toBe("initial");
  });

  it("updates debouncedValue after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Update the value
    rerender({ value: "updated", delay: 500 });
    expect(result.current.debouncedValue).toBe("initial"); // Value should not update immediately

    // Fast-forward time to just before the delay
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current.debouncedValue).toBe("initial"); // Still not updated

    // Fast-forward time to the delay
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.debouncedValue).toBe("updated"); // Now updated
  });

  it("resets the timeout if value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Update the value before the delay has passed
    rerender({ value: "intermediate", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(250); // Halfway through the first delay
    });
    expect(result.current.debouncedValue).toBe("initial"); // Still not updated

    // Update the value again before the previous delay completes
    rerender({ value: "final", delay: 500 });
    act(() => {
      jest.advanceTimersByTime(499); // Full delay after the last change
    });
    expect(result.current.debouncedValue).toBe("initial"); // Still not updated

    // Fast-forward time to the delay
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.debouncedValue).toBe("final"); // Updated to the latest value
  });

  it("handles delay changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    rerender({ value: "new-value", delay: 1000 }); // Increase delay
    act(() => {
      jest.advanceTimersByTime(501); // Halfway through new delay
    });
    expect(result.current.debouncedValue).toBe("initial"); // Should still be the initial value

    act(() => {
      jest.advanceTimersByTime(500); // Complete the new delay
    });
    expect(result.current.debouncedValue).toBe("new-value"); // Should now update
  });
});
