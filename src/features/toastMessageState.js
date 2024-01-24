import { createSlice } from "@reduxjs/toolkit";

export const toastMessageSlice = createSlice({
  name: "toastMessage",
  initialState: {
    value: false,
    text: "",
  },
  reducers: {
    clickToast: (state, action) => {
      state.value = action.payload.value;
      state.text = action.payload.text;
    },
  },
});

export default toastMessageSlice.reducer;
export const { clickToast } = toastMessageSlice.actions;
