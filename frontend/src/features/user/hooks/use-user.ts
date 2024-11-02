import { useState } from "react";
import { iUser, intialUser } from "../../../interfaces";

const useUser = () => {
  const [user, setUser] = useState<iUser>(
    JSON.parse(localStorage.getItem("user") ?? JSON.stringify(intialUser))
  );

  let [passwordConfirmed, setPasswordConfirmed] = useState(false);

  type propertyName = "name" | "email" | "password";

  const setUserProperty = (
    propertyName: propertyName,
    propertyValue: string
  ) => {
    const newUser: iUser = { ...user };
    newUser[propertyName] = propertyValue;
    setUser(newUser);
  };

  const clearUserProperty = (propertyName: propertyName) => {
    const newUser: iUser = { ...user };
    newUser[propertyName] = "";
    setUser(newUser);
  };

  const login = (userData: iUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(intialUser);
    localStorage.removeItem("user");
  };

  const isUserValid = (user: iUser, action: string): boolean => {
    const properties: propertyName[] = ["email", "password"];
    if (action === "signup") {
      properties.push("name");
    }
    let valid = true;
    properties.forEach((property) => {
      if (!user[property] || user[property].replace(" ", "") == "") {
        valid = false;
      }
    });
    return valid;
  };

  return {
    user,
    setUserProperty,
    clearUserProperty,
    passwordConfirmed,
    setPasswordConfirmed,
    isUserValid,
    login,
    logout,
  };
};

export default useUser;
