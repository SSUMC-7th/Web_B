import { useEffect } from "react";
import "./App.css";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import useCartStore from "./store/cartStore";
import useModalStore from "./store/modalStore";

function App() {
  const cartItems = useCartStore((state) => state.cartItems);
  const calculateTotals = useCartStore((state) => state.calculateTotals);
  const isOpen = useModalStore((state) => state.isOpen);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

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
