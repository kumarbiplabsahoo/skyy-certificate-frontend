import { createSlice } from "@reduxjs/toolkit";

export const dashSlice = createSlice({
  name: "dash",
  initialState: {
    certificates: [],
    loading: false,
    error: null,
  },
  reducers: {
    startloading(state) {
      console.log('Reducer: startloading triggered');
      state.loading = true;
    },
    setCerificates(state, action) {
      state.certificates = action.payload;
    },
    stoploading(state) {
      console.log('Reducer: stop triggered');
      state.loading = false;
    },
  },
});

export const { startloading, stoploading, setCerificates } = dashSlice.actions;

export default dashSlice.reducer;
