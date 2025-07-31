import { createSlice } from "@reduxjs/toolkit";

export const dashSlice = createSlice({
  name: "dash",
  initialState: {
    allcertificates: [],
    certificates: [],
    single_cert: null,
  },
  reducers: {
    setAllCerificates(state, action) {
      state.allcertificates = action.payload;
    },
    setCerificates(state, action) {
      state.certificates = action.payload;
    },
    setSingleCertificate(state, action) {
      state.single_cert = action.payload;
    },
  },
});

export const { setAllCerificates, setCerificates, setSingleCertificate } =
  dashSlice.actions;

export default dashSlice.reducer;
