import { iUser } from "../interfaces";

const api_url = process.env.REACT_APP_API_URL;

async function createUser(userData: iUser) {
  try {
    const createUserResponse = await fetch(`${api_url}/user/createUser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await createUserResponse.json();
  } catch (error) {
    throw error;
  }
}

async function loginUser(email: string, password: string) {
  try {
    const loginUserResponse = await fetch(`${api_url}/user/loginUser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await loginUserResponse.json();
  } catch (error) {
    throw error;
  }
}

export { createUser, loginUser };
