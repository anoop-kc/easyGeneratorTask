import React, { MouseEventHandler } from "react";
import useAlert from "../features/alert/hooks/use-alert";
import { iAlert } from "../interfaces";

interface iAlertProps {
  alert: iAlert;
  onClose: MouseEventHandler;
}

export default function Alert({ alert, onClose }: iAlertProps) {
  const { show, message, type } = alert;

  const typeStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div
      role="alert"
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md p-4 border-l-4 rounded-md shadow-lg z-50 transition-all duration-500 ${
        typeStyles[type] || typeStyles.info
      } ${
        alert.show
          ? "scale-100 opacity-100 block"
          : "scale-125 opacity-0 hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          data-testid="closeButton"
          onClick={onClose}
          className="text-lg font-bold ml-4 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
