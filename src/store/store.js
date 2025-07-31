import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dashReducer from "./dashSlice";
import tempReducer from "./tempSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dash: dashReducer,
    temp: tempReducer,
    // Add other reducers here if needed
  },
});

export default store;
