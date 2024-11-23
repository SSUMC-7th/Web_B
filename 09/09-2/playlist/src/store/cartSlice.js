import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartItems,
  },
  reducers: {
    increment: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.amount += 1;
    },
    decrement: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
