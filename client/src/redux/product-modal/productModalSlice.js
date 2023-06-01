import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productModalSlice = createSlice({
  name: "productModal",
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    // remove: (state) => {
    //   state.value = [];
    // },
  },
});

export const { set } = productModalSlice.actions;

export default productModalSlice.reducer;
