import React, { useState } from "react";
import { Alert } from "../../../components";
import { iAlert } from "../../..//interfaces";

// Mocked functions and values for testing purposes
const mockNavigate = (path: string) => {
  console.log(`Navigating to ${path}`);
};

const mockShowAlert = (message: string, type: "success" | "error") => {
  console.log(`Showing alert - Type: ${type}, Message: ${message}`);
};

const mockIsUserValid = (user: any, action: string) => {
  // Assume the user is valid for demonstration
  return true;
};

const mockLogin = async (user: any) => {
  // Mock login response
  return { statusCode: 302, message: undefined }; // Change this value to test different scenarios
};

export default function MockedLoginButton() {
  const [userValid, setUserValid] = useState(mockIsUserValid({}, "login"));
  const [alert, setAlert] = useState<iAlert>({
    show: false,
    message: "",
    type: "info",
  });

  const handleLogin = async () => {
    const loginUserResponse = await mockLogin({});
    if (loginUserResponse.statusCode === 302) {
      mockNavigate("/dashboard");
    } else {
      setAlert({
        show: true,
        message: loginUserResponse.message || "An error occurred",
        type: "error",
      });
      mockShowAlert(loginUserResponse.message || "An error occurred", "error");
    }
  };

  const closeAlert = () => setAlert({ ...alert, show: false });

  return (
    <>
      <button
        type="button"
        className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md"
        disabled={!userValid}
        onClick={handleLogin}
      >
        Login
      </button>
      {alert.show && <Alert alert={alert} onClose={closeAlert} />}
    </>
  );
}
