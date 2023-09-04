import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isNavOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setNavOpen(state, action) {
      state.isNavOpen = action.payload;
    },
  },
});

export const { setProfile, setNavOpen } = appSlice.actions;

export default appSlice.reducer;
