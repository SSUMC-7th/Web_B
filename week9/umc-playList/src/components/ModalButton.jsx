import { useDispatch, useSelector } from "react-redux";
import { clearItem } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice";
import * as S from "../styles/modal.styles.js";

const ModalButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <S.ConfirmButton
        onClick={() => {
          dispatch(clearItem());
          dispatch(closeModal());
        }}
      >
        네
      </S.ConfirmButton>
      <S.CancelButton
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        아니요
      </S.CancelButton>
    </>
  );
};

export default ModalButton;
