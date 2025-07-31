import { createSlice } from "@reduxjs/toolkit";

export const tempSlice = createSlice({
  name: "template",
  initialState: {
    tempName: "",
    placeholders: [],
    defaultText: null,
    css: null,
    loading: false,
    error: null,
  },
  reducers: {
    setTemplate: (state, action) => {
      const { tempName, placeholders, textFormat, styleFormat } =
        action.payload;
      state.tempName = tempName;
      state.placeholders = placeholders;
      state.defaultText = textFormat;
      state.css = styleFormat;
    },
  },
});
export const { setTemplate } = tempSlice.actions;

export default tempSlice.reducer;
