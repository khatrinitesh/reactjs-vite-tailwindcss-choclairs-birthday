import { createSlice } from "@reduxjs/toolkit";

export const loadingAnimStateSlice = createSlice({
  name: "loadingAnimState",
  initialState: false,
  reducers: {
    clickLoadingAnimState: (state, action) => {
      return action.payload;
    },
  },
});

export default loadingAnimStateSlice.reducer;
export const { clickLoadingAnimState } = loadingAnimStateSlice.actions;
