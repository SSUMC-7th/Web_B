import { create } from "zustand";
import cartItems from "../constants/cartItems";

const useCartStore = create((set, get) => ({
  cartItems,
  amount: 0,
  total: 0,

  increase: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updatedItems };
    });
    get().calTotal();
  },

  decrease: (id) => {
    set((state) => {
      const updatedItems = state.cartItems.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      );
      return { cartItems: updatedItems.filter((item) => item.amount > 0) };
    });
    get().calTotal();
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
    get().calTotal();
  },

  clearCart: () => {
    set({ cartItems: [] });
    get().calTotal();
  },

  calTotal: () => {
    const { cartItems } = get();
    const amount = cartItems.reduce((acc, item) => acc + item.amount, 0);
    const total = cartItems.reduce(
      (acc, item) => acc + item.amount * item.price,
      0
    );
    set({ amount, total });
  },
}));

export default useCartStore;
