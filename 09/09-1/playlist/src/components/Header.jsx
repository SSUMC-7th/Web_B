import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Header = () => {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.amount, 0)
  );

  return (
    <HeaderContainer>
      <Title>UMC PlayList</Title>
      <Cart>
        <CartIcon>🛍️</CartIcon>
        <CartCount>{totalItems}</CartCount>
      </Cart>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: #6c63ff;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const CartIcon = styled.div`
  font-size: 24px;
`;

const CartCount = styled.div`
  background: white;
  color: #6c63ff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10px;
  right: -10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;
