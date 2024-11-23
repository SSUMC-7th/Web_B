import { useDispatch } from "react-redux";
import { ChevronUp, ChevronDown } from "../constants/icons.jsx";
import { styled } from "styled-components";
import { decrease, increase, removeItem } from "../features/cart/cartSlice.js";

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <img src={img} alt={`${title} 이미지`} />
      <ContentContainer>
        <h4>
          {title} | {singer}
        </h4>
        <h4> $ {price}</h4>
      </ContentContainer>

      <BTNContainer>
        <BTN
          onClick={() => {
            dispatch(increase(id));
          }}
        >
          <ChevronUp />
        </BTN>
        <p>{amount}</p>
        <BTN
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown />
        </BTN>
      </BTNContainer>
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
  }

  h4 {
    margin: 5px 0;
    font-size: 16px;
    color: #333;
  }
`;

const BTNContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  margin-left: 20px;
`;

const BTN = styled.button`
  all: unset;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;
