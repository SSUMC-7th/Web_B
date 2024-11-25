import styled from "styled-components";
import cartItems from "./constants/cartItems";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux"
import { calTotal, clearCart, decrease, increase, removeItem } from "./redux/cartSlice";
import { useEffect } from "react";
import { openModal } from "./redux/modalSlice";
import Modal from "./components/Modal";

function App() {
  const { amount, cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal)

  useEffect(() => {
    dispatch(calTotal())
  }, [cartItems, dispatch])

  return (
    <Container>
      <Header />

      <Main>
        <Subtitle>당신이 선택한 음반</Subtitle>

        {cartItems.map((item, index) => (
          <AlbumItem key={index}>
            <AlbumImage src={item.img} alt={item.id} />
            <AlbumInfo>
              <AlbumTitle>{item.title}</AlbumTitle>
              <AlbumArtist>{item.singer}</AlbumArtist>
              <AlbumPrice>₩ {item.price}</AlbumPrice>
            </AlbumInfo>
            <QuantityControls>
              <FaChevronUp onClick={() => dispatch(increase(item.id))} />
              <QuantityText>{item.amount}</QuantityText>
              <FaChevronDown onClick={() => {
                if (item.amount === 1) {
                  dispatch(removeItem(item.id));
                  return;
                }
                dispatch(decrease(item.id));
              }} />
            </QuantityControls>
          </AlbumItem>
        ))}
        <Line />
        <TotalPrice>
          <Text> 총 가격 </Text>
          <Price>₩ {total}원 </Price>
        </TotalPrice>
        <ClearCart onClick={() => {
          dispatch(openModal())
        }}> 장바구니 초기화 </ClearCart>
      </Main>
      <Footer />

      {isOpen && <Modal />}
    </Container>

  );
}

export default App;

const Container = styled.div`
 background-color: #EBF5FF;
`;

const Main = styled.main`
  max-width: 600px;
  margin: 0 auto;
`;

const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  margin-top: 20px;
  font-weight: bold;
`;

const AlbumItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 5px;
`;

const AlbumImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 5px;
`;

const AlbumInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const AlbumTitle = styled.p`
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AlbumArtist = styled.p`
  margin: 0;
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
`;

const AlbumPrice = styled.p`
  margin: 0;
  color: #2d3436;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

const QuantityText = styled.p`
  margin: 0 10px;
  font-size: 15px;
`;

const Line = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
`

const TotalPrice = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
`

const Text = styled.p`
  font-size: 16px;
`

const Price = styled.p`
    font-size: 16px;
`

const ClearCart = styled.button`
  display: block;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding: 10px 0;
  text-align: center;
  color: red;
  font-weight: bold;
  border: 1px solid red;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 30px;
`;
