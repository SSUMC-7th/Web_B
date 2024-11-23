import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearItem } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  return (
    <CartContainerWrapper>
      <header>
        <h2>당신이 선택한 음반</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <button
          onClick={() => {
            dispatch(openModal());
          }}
        >
          장바구니 초기화
        </button>
        <PriceContainer>
          <h4>총 가격: {total}원</h4>
        </PriceContainer>
      </footer>
    </CartContainerWrapper>
  );
};

export default CartContainer;

const CartContainerWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  header {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      font-size: 24px;
      font-weight: bold;
      color: #222;
    }
  }

  footer {
    margin-top: 20px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;

    h4 {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
