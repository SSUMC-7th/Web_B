import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. 증가
    increase: (state, action) => {
      const itemID = action.payload;
      const item = state.cartItems.find((cartItems) => cartItems.id === itemID);
      // .filter로 하면 배열 반환
      // .find는 참이 되는 첫번째 데이터 반환
      item.amount += 1;
    },
    // 2. 감소
    decrease: (state, action) => {
      const itemID = action.payload;
      const item = state.cartItems.find((cartItems) => cartItems.id === itemID);
      // .filter로 하면 배열 반환
      // .find는 참이 되는 첫번째 데이터 반환
      item.amount -= 1;
    },
    // 3. 제거
    removeItem: (state, { payload }) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // 4. 모든 아이템 제거
    clearItem: (state, action) => {
      state.cartItems = [];
    },
    // 5. Total을 계산 SUM( 각각의 아이템 * 수량 )
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearItem, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
