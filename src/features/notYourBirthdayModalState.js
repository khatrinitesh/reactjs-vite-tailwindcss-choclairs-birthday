import { createSlice } from "@reduxjs/toolkit";

export const notYourBirthdayModalStateSlice = createSlice({
  name: "notYourBirthdayModalState",
  initialState: false,
  reducers: {
    clickNotYourBirthdayModalState: (state, action) => {
      return action.payload;
    },
  },
});

export default notYourBirthdayModalStateSlice.reducer;
export const { clickNotYourBirthdayModalState } =
  notYourBirthdayModalStateSlice.actions;
