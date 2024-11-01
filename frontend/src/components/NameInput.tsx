import React, { useState } from "react";
import styles from "../assets/styles/NameInput.module.css";
import useFormValidation from "../features/form-validation/hooks/use-form-validation";

export default function NameInput() {
  const [name, setName] = useState("");
  const { errorObj } = useFormValidation(name, "name");

  return (
    <div className="w-full m-1">
      <label htmlFor="name"></label>
      <input
        type="text"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${styles.name_input}`}
        placeholder="Full name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      {errorObj.errorMessage}
    </div>
  );
}
