import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./AppContainer";
import { useNavigate } from "react-router-dom";
import useAlert from "../features/alert/hooks/use-alert";
import Alert from "./Alert";

export default function LoginButton() {
  const [userValid, setUserValid] = useState(false);
  const { user, isUserValid, login }: any = useContext(UserContext);
  const navigate = useNavigate();
  const { alert, showAlert, closeAlert } = useAlert();

  useEffect(() => {
    function checkUserValid() {
      setUserValid(isUserValid(user, "login"));
    }
    checkUserValid();
  }, [user]);

  const handleLogin = async () => {
    const loginUserResponse = await login(user);
    if (loginUserResponse.statusCode == 302) {
      navigate("/dashboard");
    } else {
      showAlert(loginUserResponse.message, "error");
    }
  };

  return (
    <>
      <button
        type="button"
        className="w-full p-3 my-4 m-1 text-lg font-semibold cursor-pointer rounded-md hover:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        disabled={!userValid}
        onClick={handleLogin}
      >
        Login
      </button>
      <Alert alert={alert} onClose={closeAlert} />
    </>
  );
}
