import { useState } from "react";
import { iUser, intialUser } from "../../../interfaces";
import { createUser, loginUser } from "../../../services/user.service";

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

  const signup = async (userData: iUser) => {
    setUser(userData);
    const createUserResponse = await createUser(userData);
    if (createUserResponse.statusCode == 201) {
      localStorage.setItem(
        "user",
        JSON.stringify(createUserResponse.userObj.user)
      );
      localStorage.setItem(
        "token",
        JSON.stringify(createUserResponse.userObj.token)
      );
    }

    return createUserResponse;
  };

  const login = async (userData: iUser) => {
    const loginUserResponse = await loginUser(
      userData.email,
      userData.password
    );
    if (loginUserResponse.statusCode == 302) {
      setUser(loginUserResponse.userObj.user);
      localStorage.setItem(
        "user",
        JSON.stringify(loginUserResponse.userObj.user)
      );
      localStorage.setItem(
        "token",
        JSON.stringify(loginUserResponse.userObj.token)
      );
    }
    return loginUserResponse;
  };

  const logout = () => {
    setUser(intialUser);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
    signup,
  };
};

export default useUser;
