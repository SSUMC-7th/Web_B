import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Header = () => {
  const { amount } = useSelector((state) => state.cart);
  return (
    <HeaderConatiner>
      <Title>UMC PlayList</Title>
      <CartContainer>
        <FaShoppingCart />
        <Badge>{amount}</Badge>
      </CartContainer>
    </HeaderConatiner>
  )
}

export default Header;

const HeaderConatiner = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #6c5ce7;
  color: white;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const CartContainer = styled.div`
  position: relative;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: white;
  color: #6c5ce7;
  font-size: 11px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 4px;
  border: 2px solid #6c5ce7;
`;