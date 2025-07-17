import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("token") || null,
    isAuthenticated: !!Cookies.get("token"),
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginStop(state) {
      state.loading = false;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      Cookies.set("token", action.payload.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error =
        typeof action.payload === "string" ? action.payload : "Login failed";
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      Cookies.remove("token");
    },
  },
});

export const { loginStart, loginStop, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
