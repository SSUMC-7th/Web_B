import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/cartSlice";

const MusicList = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <EmptyMessage>장바구니가 비어있습니다.</EmptyMessage>;
  }

  return (
    <MusicListContainer>
      {items.map((item) => (
        <MusicItem key={item.id}>
          <AlbumImage src={item.img} alt={item.title} />
          <Details>
            <MusicTitle>{item.title}</MusicTitle>
            <Singer>{item.singer}</Singer>
            <Price>₩ {Number(item.price).toLocaleString()}</Price>
          </Details>
          <QuantityControls>
            <QuantityButton onClick={() => dispatch(decrement(item.id))}>
              ⬇
            </QuantityButton>
            <Quantity>{item.amount}</Quantity>
            <QuantityButton onClick={() => dispatch(increment(item.id))}>
              ⬆
            </QuantityButton>
          </QuantityControls>
        </MusicItem>
      ))}
    </MusicListContainer>
  );
};

export default MusicList;

const MusicListContainer = styled.div`
  margin-top: 20px;
`;

const MusicItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const AlbumImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 20px;
`;

const Details = styled.div`
  flex-grow: 1;
`;

const MusicTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Singer = styled.div`
  color: gray;
  font-size: 14px;
`;

const Price = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  color: #6c63ff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    color: #5145cd;
  }
`;

const Quantity = styled.div`
  margin: 0 10px;
  font-size: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: gray;
`;
