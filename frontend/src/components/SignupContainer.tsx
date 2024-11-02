import React, { useContext, useEffect, useState } from "react";
import UserNameInput from "./UserNameInput";
import PasswordInput from "./PasswordInput";
import NameInput from "./NameInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import { UserContext } from "./AppContainer";
import { useNavigate } from "react-router-dom";

export default function SignupContainer() {
  const [userValid, setUserValid] = useState(false);
  const { user, isUserValid, passwordConfirmed }: any = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    function checkUserValid() {
      setUserValid(isUserValid(user, "signup"));
    }
    checkUserValid();
  }, [user]);

  const handleSignup = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full">
      <span
        role="heading"
        className="text-2xl text-orange-500 font-semibold m-1 mb-"
      >
        Sign up
      </span>
      <NameInput />
      <UserNameInput />
      <PasswordInput />
      <ConfirmPasswordInput />
      <button
        type="button"
        className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md hover:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        disabled={!userValid || !passwordConfirmed}
        onClick={handleSignup}
      >
        Sign up
      </button>
    </div>
  );
}
