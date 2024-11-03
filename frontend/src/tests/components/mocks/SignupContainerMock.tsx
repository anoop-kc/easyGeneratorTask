import React, { useState } from "react";
import { Alert } from "../../../components";
import { useAlert } from "../../../features";
import { iAlert } from "../../../interfaces";

interface MockedSignupContainerProps {
  mockSignup: (
    user: Object
  ) => Promise<{ statusCode: number; message?: string }>;
  passwordConfirmed: boolean;
  alert?: iAlert;
}

const MockedSignupContainer = ({
  mockSignup,
  passwordConfirmed,
  alert,
}: MockedSignupContainerProps) => {
  const [userValid, setUserValid] = useState(true);

  const [user, setUser] = useState({ username: "testuser" }); // Mock user
  const { showAlert, closeAlert } = useAlert();
  alert = { show: true, message: "", type: "info" };

  const handleSignup = async () => {
    const signupResponse = await mockSignup(user);
    if (signupResponse.statusCode === 201) {
      console.log("Navigating to /dashboard");
    } else {
      showAlert(signupResponse.message || "", "error");
    }
  };

  return (
    <div className="w-full">
      <span
        role="heading"
        className="text-2xl text-orange-500 font-semibold m-1 mb-"
      >
        Sign up
      </span>
      <button
        type="button"
        className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md"
        disabled={!userValid || !passwordConfirmed}
        onClick={handleSignup}
      >
        Sign up
      </button>
      <Alert alert={alert} onClose={closeAlert} />
    </div>
  );
};

export default MockedSignupContainer;
