import { useSelector } from "react-redux";
import { CartIcon } from "../constants/icons";
import styled from "styled-components";
import useCartStore from "../store/cartStore";

const Navbar = () => {
  const { amount } = useCartStore();

  return (
    <nav>
      <NavContainer>
        <h3>REAL DATA UMC PlayList</h3>
        <CartContainer>
          <CartIcon />
          <AmountContainer>
            <p>{amount}</p>
          </AmountContainer>
        </CartContainer>
      </NavContainer>
    </nav>
  );
};

export default Navbar;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 20px;
  background-color: #6254e7;
  color: #fff;
`;

const CartContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const AmountContainer = styled.div`
  position: absolute;
  background-color: #ff5733;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  top: -5px;
  right: -10px;
`;
