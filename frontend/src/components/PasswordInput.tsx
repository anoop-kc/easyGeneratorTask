import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/PasswordInput.module.css";
import { useFormValidation } from "../features";
import ErrorMessages from "./ErrorMessages";
import { UserContext } from "./AppContainer";

interface iPasswordInputProps {
  hideValidationMessages?: boolean;
}

export default function PasswordInput({
  hideValidationMessages,
}: iPasswordInputProps) {
  const [password, setPassword] = useState("");
  const { user, setUserProperty, clearUserProperty }: any =
    useContext(UserContext);

  const { errorMessages, SetTouched } = useFormValidation(password, "password");

  useEffect(() => {
    function setUserPassword() {
      setUserProperty("password", password);
    }
    if (!errorMessages.length) {
      setUserPassword();
    } else {
      clearUserProperty("password");
    }
  }, [errorMessages]);

  return (
    <div className="w-full m-1">
      <label htmlFor="password"></label>
      <input
        type="password"
        id="password"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${styles.password_input}`}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => SetTouched(true)}
      />
      {errorMessages && !hideValidationMessages && (
        <ErrorMessages errors={errorMessages} />
      )}
    </div>
  );
}
