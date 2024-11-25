import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // 1. 모달을 여는 Action
    openModal: (state, action) => {
      state.isOpen = true;
    },
    // 2. 모달을 닫는 Action
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
