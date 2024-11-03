import React, { createContext } from "react";
import Header from "./Header";
import MiddleContainer from "./MiddleContainer";
import Footer from "./Footer";
import { useUser } from "../features";

// creating a context to share the user details (data & functionsa) across all child components
export const UserContext = createContext({});

// this is the outermost container for the app
export default function AppContainer() {
  const {
    user,
    setUserProperty,
    clearUserProperty,
    passwordConfirmed,
    setPasswordConfirmed,
    isUserValid,
    login,
    logout,
    signup,
  } = useUser();
  return (
    <UserContext.Provider
      value={{
        user,
        setUserProperty,
        clearUserProperty,
        passwordConfirmed,
        setPasswordConfirmed,
        isUserValid,
        login,
        logout,
        signup,
      }}
    >
      <div className="w-full h-screen flex items-start flex-col">
        <Header />
        <MiddleContainer />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}
