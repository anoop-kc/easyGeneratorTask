import React, { useContext } from "react";
import spaceShuttle from "../assets/images/space-shuttle.svg";
import { UserContext } from "../components/AppContainer";
import { useNavigate } from "react-router-dom";

// this is the Footer section
export default function Dashboard() {
  const { user, logout }: any = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="w-full py-5 flex flex-col justify-center items-center">
      <h1 className="text-4xl">Welcome to the application</h1>
      <h3 className="text-2xl mt-4">{user.name}</h3>
      <h2>{user.email}</h2>

      {user.email != "" && (
        <button
          type="button"
          className="p-2 my-2 m-1  font-semibold cursor-pointer rounded-md hover:shadow-lg transition duration-150 ease-in-out bg-gradient-to-r from-orange-400 to-orange-500 text-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width="256"
        height="256"
        className="mt-16 fill-orange-400"
      >
        <path d="m8.45,21.33c2.218-1.512,4.647-3.552,6.996-5.901,4.581-4.581,5.896-7.002,5.893-7.011,2.17-3.167,3.524-6.294,2.033-7.784-1.603-1.605-5.035.13-7.808,2.025-1.106-.422-2.3-.664-3.552-.664C6.497,1.994,2.011,6.479,2.011,11.994c0,1.252.241,2.446.664,3.552-1.893,2.774-3.627,6.206-2.024,7.809.424.425.993.637,1.703.637,1.153,0,2.679-.559,4.562-1.674.261-.155,1.286-.818,1.533-.986ZM21.957,2.047c.318.318-.15,1.92-1.668,4.344-.717-1.055-1.629-1.967-2.685-2.683,3.01-1.894,4.228-1.785,4.353-1.661ZM5.897,20.595c-2.686,1.591-3.735,1.442-3.832,1.345-.124-.124-.232-1.344,1.661-4.353.716,1.057,1.629,1.971,2.686,2.688-.172.108-.347.221-.515.321Zm16.063-9.582c.033.323.052.649.052.981,0,5.514-4.486,10-10,10-.331,0-.657-.019-.979-.052,1.903-1.429,3.896-3.167,5.827-5.099.817-.816,3.053-3.122,5.1-5.83Z" />
      </svg>
    </div>
  );
}
