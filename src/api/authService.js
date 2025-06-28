//api/authService.js
import { fetchData } from "./config";

export const authLogin = async (data) => {
  try {
    const response = await fetchData("login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};

