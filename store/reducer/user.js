import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (state, action) => {
      return action.payload;
    },
    signout: (state) => {
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin, signout } = userSlice.actions;

export default userSlice.reducer;
