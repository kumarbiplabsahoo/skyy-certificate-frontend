import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../store/authSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

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
