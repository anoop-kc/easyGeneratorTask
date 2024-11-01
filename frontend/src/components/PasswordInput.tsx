import React from "react";
import styles from "../assets/styles/PasswordInput.module.css";

interface PasswordInputProps {
  confirmMode?: boolean;
}

export default function PasswordInput({ confirmMode }: PasswordInputProps) {
  confirmMode = confirmMode ? confirmMode : false;

  return (
    <div className="w-full m-1">
      <label htmlFor="password"></label>
      <input
        type="password"
        id="password"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${
          confirmMode ? styles.confirm_password_input : styles.password_input
        }`}
        placeholder={confirmMode ? "Confirm Password" : "Password"}
      />
    </div>
  );
}
