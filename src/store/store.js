import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // Add other reducers here if needed
  },
});

export default store;