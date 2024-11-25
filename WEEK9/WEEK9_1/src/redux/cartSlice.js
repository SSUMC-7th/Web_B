import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //증가
    increase: (state, { payload }) => {
      //내가 클릭한 음반의 ID 가져오기
      const itemId = payload;
      // 그 id를 통해서 전체 음반 중에, 내가 클릭한 id랑 비교해서 같은 음반을 찾아냄
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      // 내가 클릭한 아이템이 무엇인지 찾았으니, 수량 증가
      item.amount += 1;
    },
    //감소
    decrease: (state, { payload }) => {
      //내가 클릭한 음반의 ID 가져오기
      const itemId = payload;
      // 그 id를 통해서 전체 음반 중에, 내가 클릭한 id랑 비교해서 같은 음반을 찾아냄
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      // 내가 클릭한 아이템이 무엇인지 찾았으니, 수량 감소
      item.amount -= 1;
    },

    //아이템 제거
    removeItem: (state, { payload }) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // 모든 아이템 제거 (clear)
    clearCart: (state) => {
      state.cartItems = [];
    },

    //total 계산 SUM(모든 아이탬과 * 수량)
    calTotal: (state) => {
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

export const { increase, decrease, removeItem, clearCart, calTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
