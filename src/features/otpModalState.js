import { createSlice } from "@reduxjs/toolkit";

export const otpModalStateSlice = createSlice({
  name: "otpModalState",
  initialState: false,
  reducers: {
    clickOtpModalState: (state, action) => {
      return action.payload;
    },
  },
});

export default otpModalStateSlice.reducer;
export const { clickOtpModalState } = otpModalStateSlice.actions;
