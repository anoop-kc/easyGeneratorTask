import React from "react";
import styles from "../assets/styles/UserNameInput.module.css";

export default function UserNameInput() {
  return (
    <div className="w-full m-1">
      <label htmlFor="userName"></label>
      <input
        type="email"
        id="userName"
        className={`p-2 py-4 border-solid border-2 rounded-md w-full outline-none text-lg ${styles.user_name_input}`}
        placeholder="Email"
      />
    </div>
  );
}
