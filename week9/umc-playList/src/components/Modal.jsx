import { children } from "react";
import ModalButton from "./ModalButton";
import * as S from "../styles/modal.styles.js";

const Modal = ({ children }) => {
  return (
    <S.ModalWrapper>
      <S.ModalContent>{children}</S.ModalContent>
      <S.ButtonContainer>
        <ModalButton />
      </S.ButtonContainer>
    </S.ModalWrapper>
  );
};

export default Modal;
