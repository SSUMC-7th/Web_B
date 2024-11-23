import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { clearCart } from "../store/cartSlice";
import styled from "styled-components";

const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Overlay>
      <ModalContent>
        <ModalText>담아두신 모든 음반을 삭제하시겠습니까?</ModalText>
        <ModalActions>
          <ModalButton onClick={handleConfirm} confirm>
            네
          </ModalButton>
          <ModalButton onClick={handleCancel}>아니요</ModalButton>
        </ModalActions>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.confirm ? "#4CAF50" : "#ff6b6b")};
  color: white;

  &:hover {
    background-color: ${(props) => (props.confirm ? "#45a049" : "#ff5252")};
  }
`;
