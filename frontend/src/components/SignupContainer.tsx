import React, { useState } from "react";
import UserNameInput from "./UserNameInput";
import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";

export default function SignupContainer() {
  return (
    <div className="w-full">
      <span className="text-2xl text-orange-500 font-semibold m-1 mb-">
        Sign up
      </span>
      <NameInput />
      <UserNameInput />
      <PasswordInput />
      <PasswordInput confirmMode={true} />
      <button
        type="button"
        className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md hover:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Sign up
      </button>
    </div>
  );
}
