import React, { useState } from "react";
import UserNameInput from "./UserNameInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Modal from "./Modal";
import SignupContainer from "./SignupContainer";

export default function LoginContainer() {
  const [openSignupModal, setOpenSignupModal] = useState(false);
  return (
    <div className="sm:w-8/12 md:w-4/12 m-5 p-5">
      <UserNameInput />
      <PasswordInput hideValidationMessages={true} />
      <LoginButton />
      <span
        onClick={() => {
          setOpenSignupModal(true);
        }}
        className=" block w-full cursor-pointer text-center transition duration-500 ease-in-out hover:scale-110"
      >
        Not a member? Click here to signup
      </span>
      <Modal
        open={openSignupModal}
        onClose={() => {
          setOpenSignupModal(false);
        }}
      >
        <SignupContainer />
      </Modal>
    </div>
  );
}
