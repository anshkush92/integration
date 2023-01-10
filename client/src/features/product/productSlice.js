import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    /**
     * @function setProducts - To set the products from the fake store api
     * @param state - Current state of the products
     * @param action - The data being passed to the setProducts function
     */
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

/**
 * @description - Exporting the action creators
 */
export const { setProducts } = productSlice.actions;

/**
 * @description - Exporting the reducer
 */
export default productSlice.reducer;
