import { renderHook, act, waitFor } from "@testing-library/react";
import { useUser } from "../../features";
import { iUser, intialUser } from "../../interfaces";

describe("useUser hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with user data from localStorage if available", () => {
    const mockUser: iUser = {
      name: "Some Name",
      email: "somename@example.com",
      password: "password123",
    };
    localStorage.setItem("user", JSON.stringify(mockUser));

    const { result } = renderHook(() => useUser());
    expect(result.current.user).toEqual(mockUser);
  });

  it("initializes with initial user data if no localStorage data is available", () => {
    const { result } = renderHook(() => useUser());
    expect(result.current.user).toEqual(intialUser);
  });

  it("sets user property correctly", () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.setUserProperty("name", "Some Name");
    });

    expect(result.current.user.name).toBe("Some Name");
  });

  it("clears user property correctly", () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.setUserProperty("name", "Some Name");
      result.current.clearUserProperty("name");
    });

    expect(result.current.user.name).toBe("");
  });

  it("logs out the user and clears user data from localStorage", async () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.login({
        name: "Some Name",
        email: "somename@example.com",
        password: "password123",
      });
      result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(intialUser);
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  it("validates user correctly for login action", () => {
    const { result } = renderHook(() => useUser());
    const invalidUser: iUser = { name: "", email: "", password: "" };
    const validUser: iUser = {
      name: "Some Name",
      email: "somename@example.com",
      password: "password123",
    };

    expect(result.current.isUserValid(invalidUser, "login")).toBe(false);
    expect(result.current.isUserValid(validUser, "login")).toBe(true);
  });

  it("validates user correctly for signup action", () => {
    const { result } = renderHook(() => useUser());
    const invalidUser: iUser = { name: "", email: "", password: "" };
    const validUser: iUser = {
      name: "Some Name",
      email: "somename@example.com",
      password: "password123",
    };

    expect(result.current.isUserValid(invalidUser, "signup")).toBe(false);
    expect(result.current.isUserValid(validUser, "signup")).toBe(true);
  });

  it("sets passwordConfirmed correctly", () => {
    const { result } = renderHook(() => useUser());

    act(() => {
      result.current.setPasswordConfirmed(true);
    });

    expect(result.current.passwordConfirmed).toBe(true);

    act(() => {
      result.current.setPasswordConfirmed(false);
    });

    expect(result.current.passwordConfirmed).toBe(false);
  });
});
