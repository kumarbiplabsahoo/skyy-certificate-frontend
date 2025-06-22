import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get('authToken') || null,
    isAuthenticated: !!Cookies.get('authToken'),
    loading: false,
    error: null
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      Cookies.set('authToken', action.payload, { 
        expires: 7, 
        secure: true, 
        sameSite: 'strict' 
      });
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('authToken');
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout 
} = authSlice.actions;