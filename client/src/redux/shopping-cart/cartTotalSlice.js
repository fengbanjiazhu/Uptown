import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartTotalSlice = createSlice({
  name: "cartTotal",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTotalCart } = cartTotalSlice.actions;

export default cartTotalSlice.reducer;
