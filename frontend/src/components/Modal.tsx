import React, { Children, MouseEventHandler, ReactElement } from "react";
import closeIcon from "../assets/images/close.svg";

interface ModalProps {
  open: boolean;
  onClose: MouseEventHandler;
  children: ReactElement;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto sm:w-9/12 md:w-6/12 bg-white rounded-md p-10 relative transition-all duration-500 ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <img
          src={closeIcon}
          onClick={onClose}
          alt="Close"
          className="cursor-pointer h-auto w-5 absolute top-3 right-3"
        />
        {children}
      </div>
    </div>
  );
}
