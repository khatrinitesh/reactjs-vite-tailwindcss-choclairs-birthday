import { createSlice } from "@reduxjs/toolkit";

export const howToPlayStateSlice = createSlice({
  name: "howToPlayState",
  initialState: false,
  reducers: {
    clickHowToPlayState: (state, action) => {
      return action.payload;
    },
  },
});

export default howToPlayStateSlice.reducer;
export const { clickHowToPlayState } = howToPlayStateSlice.actions;
