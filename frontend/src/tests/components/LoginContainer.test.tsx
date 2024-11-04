import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginContainer, Modal } from "../../components";

jest.mock("../../components/UserNameInput", () => () => (
  <input data-testid="username-input" />
));
jest.mock(
  "../../components/PasswordInput",
  () => (props: { hideValidationMessages: boolean }) =>
    (
      <input
        data-testid="password-input"
        data-hide-validation={props.hideValidationMessages}
      />
    )
);
jest.mock("../../components/LoginButton", () => () => <button>Login</button>);
jest.mock("../../components/SignupContainer", () => () => (
  <div>Signup Form</div>
));
jest.mock(
  "../../components/Modal",
  () =>
    ({ open, onClose, children }: any) =>
      open ? (
        <div role="dialog">
          <button onClick={onClose}>Close Modal</button>
          {children}
        </div>
      ) : null
);

describe("LoginContainer Component", () => {
  it("renders the Username, Password input fields, LoginButton, and Signup link", () => {
    render(<LoginContainer />);

    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toHaveAttribute(
      "data-hide-validation",
      "true"
    );
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Not a member\? Click here to signup/i)
    ).toBeInTheDocument();
  });

  it("opens the signup modal when the signup link is clicked", () => {
    render(<LoginContainer />);

    // Click on the signup link
    fireEvent.click(screen.getByText(/Not a member\? Click here to signup/i));

    // Modal should open with the Signup form
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Signup Form")).toBeInTheDocument();
  });

  it("closes the signup modal when the close button in the modal is clicked", () => {
    render(<LoginContainer />);

    // Open the modal
    fireEvent.click(screen.getByText(/Not a member\? Click here to signup/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText(/close modal/i));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("does not show the signup modal by default", () => {
    render(<LoginContainer />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
