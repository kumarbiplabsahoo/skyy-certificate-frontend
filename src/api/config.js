//api/api.js
const LOCAL = "http://localhost:5555/api";
const RENDER = "https://certificate-backend-0kxm.onrender.com/api";

// Set the environment: "local" | "render" | "server"
const ENV = "render";

const getBaseUrl = () => {
  switch (ENV) {
    case "local":
      return LOCAL;
    case "render":
      return RENDER;
    default:
      throw new Error("Invalid environment selected");
  }
};

export const fetchData = async (endpoint, options = {}) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/${endpoint}`, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }
  return response.json();
};
