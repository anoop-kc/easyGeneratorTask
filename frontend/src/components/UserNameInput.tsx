import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/UserNameInput.module.css";
import useFormValidation from "../features/form-validation/hooks/use-form-validation";
import ErrorMessages from "./ErrorMessages";
import { UserContext } from "./AppContainer";

export default function UserNameInput() {
  const [email, setEmail] = useState("");
  const { errorMessages, SetTouched } = useFormValidation(email, "email");
  const { setUserProperty, clearUserProperty }: any = useContext(UserContext);

  useEffect(() => {
    if (!errorMessages.length) {
      setUserProperty("email", email);
    } else {
      clearUserProperty("email");
    }
  }, [errorMessages, email]);

  return (
    <div className="w-full m-1">
      <label htmlFor="email"></label>
      <input
        type="email"
        id="email"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${
          styles.user_name_input
        } ${errorMessages.length ? "border-red-300" : ""}`}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => SetTouched(true)}
      />
      {errorMessages && <ErrorMessages errors={errorMessages} />}
    </div>
  );
}
