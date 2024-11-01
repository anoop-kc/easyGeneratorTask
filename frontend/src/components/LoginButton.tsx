import React from "react";

export default function LoginButton() {
  return (
    <button
      type="button"
      className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md hover:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Login
    </button>
  );
}
