import { createSlice } from "@reduxjs/toolkit";

export const userDetailsStateSlice = createSlice({
  name: "userDetailsState",
  initialState: {
    uid: "",
    shareRefCode: "",
  },
  reducers: {
    clickUserDetailsState: (state, action) => {
      state.uid = action.payload.uid;
      state.shareRefCode = action.payload.shareRefCode;
    },
  },
});

export default userDetailsStateSlice.reducer;
export const { clickUserDetailsState } = userDetailsStateSlice.actions;
