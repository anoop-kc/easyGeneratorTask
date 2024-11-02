import React, { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/NameInput.module.css";
import { useFormValidation } from "../features";
import ErrorMessages from "./ErrorMessages";
import { UserContext } from "./AppContainer";

export default function NameInput() {
  const [name, setName] = useState("");
  const { errorMessages, SetTouched } = useFormValidation(name, "name");
  const { setUserProperty, clearUserProperty }: any = useContext(UserContext);

  useEffect(() => {
    if (!errorMessages.length) {
      setUserProperty("name", name);
    } else {
      clearUserProperty("name");
    }
  }, [errorMessages]);

  return (
    <div className="w-full m-1">
      <label htmlFor="name"></label>
      <input
        type="text"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${
          styles.name_input
        } ${errorMessages.length ? "border-red-300" : ""}`}
        placeholder="Full name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        onFocus={() => SetTouched(true)}
      />
      {errorMessages && <ErrorMessages errors={errorMessages} />}
    </div>
  );
}
