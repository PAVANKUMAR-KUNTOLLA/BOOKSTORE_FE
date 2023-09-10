import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    id: "",
    name: "",
    email: "",
    phone_no: "",
    address: "",
    college: "",
    orderHistory: [],
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const info = action.payload;
      state.userInfo.id = info.id;
      state.userInfo.name = info.name;
      state.userInfo.email = info.email;
      state.userInfo.phone_no = info.phone_no;
      state.userInfo.address = info.address;
      state.userInfo.college = info.college;
      state.userInfo.orderHistory = info.orderHistory;
    },
  },
});

export const { setUserInfo } = appSlice.actions;

export default appSlice.reducer;
