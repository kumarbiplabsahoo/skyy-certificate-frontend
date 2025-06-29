import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { authLogin } from "../api/authService";
import { useDispatch } from "react-redux";
import { loginStart, loginStop, loginFailure } from "../store/authSlice";

export const UseAuth = () => {
  const dispatch = useDispatch();
  const { setlogin, setlogout } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginAdmin = async () => {
    dispatch(loginStart());
    try {
      const loginresponse = await authLogin(loginData);
      console.log(loginresponse, "loginresponse");
      if (loginresponse?.success) {
        dispatch(setlogin(loginresponse?.data));
      } else {
        throw new Error(loginresponse?.message || "Authentication failed");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    } finally {
      dispatch(loginStop());
    }
  };

  return { loginData, setLoginData, loginAdmin, setlogout };
};
