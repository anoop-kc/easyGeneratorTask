import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/PasswordInput.module.css";
import { useFormValidation } from "../features";
import ErrorMessages from "./ErrorMessages";
import { UserContext } from "./AppContainer";

export default function PasswordInput() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setPasswordConfirmed, passwordConfirmed }: any =
    useContext(UserContext);

  const { errorMessages, SetTouched, validateField, touched } =
    useFormValidation(confirmPassword, "confirmPassword", user.password);

  const handleChange = (confirmationPassword: string) => {
    if (confirmationPassword.replace(" ", "").length) {
      SetTouched(true);
    }
    setConfirmPassword(confirmationPassword);
  };

  useEffect(() => {
    function validateConfirmPassword() {
      if (touched) {
        validateField();
      }
    }
    validateConfirmPassword();
  }, [user.password, confirmPassword]);

  useEffect(() => {
    if (touched) {
      if (!errorMessages.length) {
        setPasswordConfirmed(true);
      } else {
        setPasswordConfirmed(false);
      }
    }
  }, [errorMessages]);

  return (
    <div className="w-full m-1">
      <label htmlFor="confirmPassword"></label>
      <input
        type="password"
        id="confirmPassword"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${styles.confirm_password_input}`}
        placeholder="Confirm Password"
        onChange={(e) => handleChange(e.target.value)}
      />
      {errorMessages && <ErrorMessages errors={errorMessages} />}
    </div>
  );
}
