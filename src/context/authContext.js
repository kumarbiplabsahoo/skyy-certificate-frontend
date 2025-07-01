import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../store/authSlice";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Add this useEffect to handle browser/tab close
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleBeforeUnload = () => {
      // Clear all auth cookies
      Cookies.remove("token");
      Cookies.remove("session");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAuthenticated]);

  const setlogin = (data) => {
    dispatch(loginSuccess(data));
    navigate("/");
  };

  const setlogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        setlogin,
        setlogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
