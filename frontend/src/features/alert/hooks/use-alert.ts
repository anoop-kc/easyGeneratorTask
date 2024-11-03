import { useState } from "react";
import { iAlert } from "../../../interfaces";

const useAlert = () => {
  const [alert, setAlert] = useState<iAlert>({
    show: false,
    message: "",
    type: "info",
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info",
    dontDissmiss?: boolean,
    dismissAfter?: number
  ) => {
    setAlert({
      show: true,
      message,
      type,
    });

    const duration: number = dismissAfter ? dismissAfter : 3000;

    if (!dontDissmiss) {
      setTimeout(() => {
        closeAlert();
      }, duration); // Alert will auto-dismiss after dismissAfter || 3 seconds
    }
  };

  const closeAlert = () => {
    setAlert({ show: false, message: "", type: "info" });
  };

  return {
    alert,
    showAlert,
    closeAlert,
  };
};

export default useAlert;
