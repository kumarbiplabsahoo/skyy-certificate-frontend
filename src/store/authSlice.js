import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("token") || null,
    isAuthenticated: !!Cookies.get("token"),
    innerloading: false,
    mainloading: false,
    error: null,
  },
  reducers: {
    //loading part start
    startInnerLoad(state) {
      state.innerloading = true;
    },
    stopInnerLoad(state) {
      state.innerloading = false;
    },
    //loading part start
    startMainLoad(state) {
      state.mainloading = true;
    },
    stopMainLoad(state) {
      state.mainloading = false;
    },
    //loading part end
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

export const {
  startInnerLoad,
  stopInnerLoad,
  startMainLoad,
  stopMainLoad,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
