import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashReducer from "./dashSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dash: dashReducer
    // Add other reducers here if needed
  },
});

export default store;
