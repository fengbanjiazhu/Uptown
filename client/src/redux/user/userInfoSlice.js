import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    removeUser: (state) => {
      state.value = [];
    },
  },
});

export const userAction = userInfoSlice.actions;

export default userInfoSlice.reducer;
