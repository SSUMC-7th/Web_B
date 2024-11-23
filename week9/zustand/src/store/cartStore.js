import { create } from "zustand";
import cartItems from "../constants/cartItems";

const useCartStore = create((set) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,

  increase: (itemID) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === itemID ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updatedCartItems };
    });
  },

  decrease: (itemID) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === itemID ? { ...item, amount: item.amount - 1 } : item
      );
      return { cartItems: updatedCartItems };
    });
  },

  removeItem: (itemID) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== itemID
      );
      return { cartItems: updatedCartItems };
    });
  },

  clearItem: () => set(() => ({ cartItems: [] })),

  calculateTotals: () =>
    set((state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      return { amount, total };
    }),
}));

export default useCartStore;
