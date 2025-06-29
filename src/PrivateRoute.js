import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  // Check if the auth token exists in cookies
  const token = Cookies.get("token"); 
  // Replace "authToken" with your cookie name

  // If token exists, allow access to child routes (Outlet)
  // If not, redirect to /login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;