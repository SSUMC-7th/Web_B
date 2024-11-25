import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./store/cartSlice";
import { openModal } from "./store/modalSlice";
import styled from "styled-components";
import Header from "./components/Header";
import MusicList from "./components/MusicList";
import Modal from "./components/Modal";

const App = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

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
            <ClearButton onClick={() => dispatch(openModal())}>
              장바구니 초기화
            </ClearButton>
          </Summary>
        )}
      </Main>
      <Modal />
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
