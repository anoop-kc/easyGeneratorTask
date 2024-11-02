// Modal.test.tsx
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Modal } from "../../components";

describe("Modal Component", () => {
  const onClose = jest.fn();
  const childContent = <div>Modal Content</div>;

  const renderModal = (open: boolean) =>
    render(
      <Modal open={open} onClose={onClose}>
        {childContent}
      </Modal>
    );

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders child content when open", () => {
    renderModal(true);
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render child content when closed", () => {
    renderModal(false);
    expect(screen.queryByText("Modal Content")).toBeNull();
  });

  it("applies correct classes when open", () => {
    renderModal(true);
    const modalBackdrop = screen.getByRole("dialog").parentElement;
    const modalContent = screen.getByRole("dialog");

    expect(modalBackdrop).toHaveClass("visible bg-black/20");
    expect(modalContent).toHaveClass("scale-100 opacity-100");
  });

  it("applies correct classes when closed", () => {
    renderModal(false);
    const modalBackdrop = screen.getByRole("dialog").parentElement;
    const modalContent = screen.getByRole("dialog");

    expect(modalBackdrop).toHaveClass("invisible");
    expect(modalContent).toHaveClass("scale-125 opacity-0");
  });

  it("calls onClose when backdrop is clicked", () => {
    renderModal(true);
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when modal content is clicked", () => {
    renderModal(true);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when close icon is clicked", () => {
    renderModal(true);
    fireEvent.click(screen.getByAltText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
