//api/authService.js
import { fetchData } from "./config";
import Cookies from "js-cookie";

export const getAllCertificates = async (page = 1, limit = 10) => {
  try {
    const token = Cookies.get("token");

    const query = new URLSearchParams({ page, limit }).toString();
    const response = await fetchData(`view_all_certificates?${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fatch....", error);
  }
};