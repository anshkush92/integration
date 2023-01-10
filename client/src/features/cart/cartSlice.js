import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  /**
   * @argument id - id of the product
   * @argument title  - title of the product
   * @argument price - price of the product
   * @argument quantity - quantity of the product
   */
  items: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseItem: (state, action) => {
      const { id, title, price, image } = action.payload;
      const existingItem = state.items.findIndex((item) => item.id === id);

      /**
       * @description - If items doesn't exsist then enter the item, otherwise only increase the quantity
       */
      if (existingItem === -1) {
        state.items.push({ id, title, price, quantity: 1, image });
      } else {
        state.items[existingItem].quantity++;
      }

      state.totalQuantity = state.items.length;
    },
    decreaseItem: (state, action) => {
      const { id } = action.payload;

      const existingItem = state.items.findIndex((item) => item.id === id);

      /**
       * @description - If items doesn't exsist then do nothing, otherwise if quantity is 1 then remove the item, otherwise only decrease the quantity
       * @tutorial {shorturl.at/bdkxY} - Learn how to use splice
       */
      if (existingItem === -1) {
        return;
      } else if (state.items[existingItem].quantity === 1) {
        state.items.splice(existingItem, 1);
      } else {
        state.items[existingItem].quantity--;
      }

      state.totalQuantity = state.items.length;
    },
  },
});

export const { increaseItem, decreaseItem } = cartSlice.actions;

export default cartSlice.reducer;
