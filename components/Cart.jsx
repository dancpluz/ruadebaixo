import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { ArrowBack } from '@mui/icons-material';

const CartWrapper = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  transition: all 1s ease-in-out;
`;

const CartContainer = styled.div`
  height: 100vh;
  width: 600px;
  background-color: white;
  float: right;
  padding: 40px 10px;
  position: relative;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  gap: 2px;
  margin-left: 10px;
  border: none;
  background-color: transparent;
  span {
    margin-left: 10px;
  }
`;

const Quantity = styled.span`
  color: red;
`;

export default function Cart() {
  const { totalPrice,totalQuantities,cartItems,setShowCart,toggleCartItemQuantity,onRemove } = useStateContext();

  return (
    <CartWrapper>
      <CartContainer>
        <BackButton type='button' onClick={() => setShowCart(false)}>
          <ArrowBack />
          <span>Sua Sacola</span>
          <Quantity>2</Quantity>
        </BackButton>
      </CartContainer>
    </CartWrapper>
  )
}
