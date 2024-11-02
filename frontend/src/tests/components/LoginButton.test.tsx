// LoginButton.test.tsx
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LoginButton } from "../../components/";
import { UserContext } from "../../components/AppContainer";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginButton Component", () => {
  let mockIsUserValid: jest.Mock;
  let mockLogin: jest.Mock;
  let mockUser: object;

  beforeEach(() => {
    mockIsUserValid = jest.fn();
    mockLogin = jest.fn();
    mockUser = { username: "testuser", password: "testpass" };
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render the Login button", () => {
    render(
      <UserContext.Provider
        value={{
          user: mockUser,
          isUserValid: mockIsUserValid,
          login: mockLogin,
        }}
      >
        <BrowserRouter>
          <LoginButton />
        </BrowserRouter>
      </UserContext.Provider>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("should enable the button if user is valid", () => {
    mockIsUserValid.mockReturnValue(true);
    render(
      <UserContext.Provider
        value={{
          user: mockUser,
          isUserValid: mockIsUserValid,
          login: mockLogin,
        }}
      >
        <BrowserRouter>
          <LoginButton />
        </BrowserRouter>
      </UserContext.Provider>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).not.toBeDisabled();
  });

  it("should disable the button if user is not valid", () => {
    render(
      <UserContext.Provider
        value={{
          user: mockUser,
          isUserValid: mockIsUserValid,
          login: mockLogin,
        }}
      >
        <BrowserRouter>
          <LoginButton />
        </BrowserRouter>
      </UserContext.Provider>
    );
    mockIsUserValid.mockReturnValue(false);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it("should call login and navigate on successful login", () => {
    mockIsUserValid.mockReturnValue(true);
    mockLogin.mockReturnValue(true);

    render(
      <UserContext.Provider
        value={{
          user: mockUser,
          isUserValid: mockIsUserValid,
          login: mockLogin,
        }}
      >
        <BrowserRouter>
          <LoginButton />
        </BrowserRouter>
      </UserContext.Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith(mockUser);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("should not navigate on unsuccessful login", () => {
    mockIsUserValid.mockReturnValue(true);
    mockLogin.mockReturnValue(false);

    render(
      <UserContext.Provider
        value={{
          user: mockUser,
          isUserValid: mockIsUserValid,
          login: mockLogin,
        }}
      >
        <BrowserRouter>
          <LoginButton />
        </BrowserRouter>
      </UserContext.Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith(mockUser);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
