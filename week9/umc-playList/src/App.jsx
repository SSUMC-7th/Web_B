import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <>
      <Navbar />
      <CartContainer />
      {isOpen && (
        <ModalPortal>
          <Modal>
            <h4>담아주신 모든 음반을 삭제하시겠습니까?</h4>
          </Modal>
        </ModalPortal>
      )}
    </>
  );
}

export default App;
