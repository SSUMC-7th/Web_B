import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./store/cartSlice";
import styled from "styled-components";
import Header from "./components/Header";
import MusicList from "./components/MusicList";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header />
      <Main>
        <Subtitle>당신이 선택한 음반</Subtitle>
        <MusicList />
        {items.length > 0 && (
          <Summary>
            <TotalRow>
              <Label>총 가격</Label>
              <Value>₩ {totalPrice.toLocaleString()}</Value>
            </TotalRow>
            <ClearButton onClick={() => setIsModalOpen(true)}>
              장바구니 초기화
            </ClearButton>
          </Summary>
        )}
      </Main>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalText>담아두신 모든 음반을 삭제하시겠습니까?</ModalText>
            <ModalActions>
              <ModalButton onClick={handleClearCart} confirm>
                네
              </ModalButton>
              <ModalButton onClick={() => setIsModalOpen(false)}>
                아니요
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  font-family: "Arial", sans-serif;
`;

const Main = styled.main`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Subtitle = styled.h2`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
`;

const Summary = styled.div`
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  font-size: 18px;
`;

const ClearButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ff5252;
  }
`;

const Modal = styled.div`
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
