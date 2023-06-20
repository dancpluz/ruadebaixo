import styled from 'styled-components';
import { useStateContext } from '../context/StateContext';
import { ArrowBack } from '@mui/icons-material';
import boxOpen from '../assets/boxopen.svg';
import Image from 'next/image';

const Background = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  transition: all 1s ease-in-out;
`;

const CartContainer = styled.div`
  z-index: 2;
  height: 100vh;
  width: 600px;
  background-color: white;
  float: right;
`;

const CartHeader = styled.div`
  background: black;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;

  h1, p {
    color: white;
  }

  h1 {
    font-size: 32px;
    font-weight: 600;
  }

  p {
   font-size: 24px;
  }
`;

const CartFooter = styled.div`
  padding: 0 24px;
  height: 180px;
  background: black;
  h1, h2, p {
    color: white;
  }
`;

const SubtotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 32px;
    font-weight: 500;
  }
  h2 {
    font-size: 36px;
    font-weight: 600;
  }
  p {
    font-size: 20px;
    text-decoration: line-through;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BoxIcon = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
`;

export default function Cart() {
  const { totalPrice,totalItems,cartItems,setShowCart,onRemove } = useStateContext();

  return (
    <Background onClick={() => setShowCart(false)}>
      <CartContainer>
        <CartHeader>
          <BoxIcon alt={'openbox'} src={boxOpen}/>
          <h1>Sua Caixa</h1>
          <p>({totalItems} itens)</p>
        </CartHeader>
        <CartFooter>
          <SubtotalDiv>
            <h1>Subtotal</h1>
            <PriceDiv>
              <p>R$20</p>
              <h2>R${totalPrice}</h2>
            </PriceDiv>
            
          </SubtotalDiv>
        </CartFooter>
      </CartContainer>
    </Background>
  )
}
