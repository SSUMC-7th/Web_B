import React from 'react';
import styled from 'styled-components';
import useModalStore from '../zustand/modalStore';
import useCartStore from '../zustand/cartStore';

const Modal = () => {
  const { clearCart } = useCartStore();
  const { closeModal } = useModalStore();

  return (
    <ModalContainer>
      <ModalBox>
        <p>담아두신 모든 음반을 삭제하시겠습니까?</p>
        <ButtonContainer>
          <Button type="yes" onClick={() => {
            clearCart();
            closeModal();
          }}>
            네
          </Button>
          <Button type="no" onClick={() => closeModal()}>
            아니요
          </Button>
        </ButtonContainer>
      </ModalBox>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  gap: 50px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid ${({ type }) => (type === 'yes' ? '#6c5ce7;' : '#FF0000')};
  background-color: #fff;
  color: ${({ type }) => (type === 'yes' ? '#6c5ce7;' : '#FF0000')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ type }) => (type === 'yes' ? '#6c5ce7;' : '#FF0000')};
    color: #fff;
  }
`;
