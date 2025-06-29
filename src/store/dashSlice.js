import { createSlice } from "@reduxjs/toolkit";

export const dashSlice = createSlice({
  name: "dash",
  initialState: {
    certificates: [],
    error: null,
  },
  reducers: {
    setCerificates(state, action) {
      state.certificates = action.payload;
    },
  },
});

export const { setCerificates } = dashSlice.actions;

export default dashSlice.reducer;
