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
  },
});

export const { set } = productModalSlice.actions;

export default productModalSlice.reducer;

export const getAllProduct = (state) => state.productModal.value;
