import styled, { keyframes } from 'styled-components';
import { useStateContext } from '../context/StateContext';
import boxOpen from '../assets/boxopen.svg';
import CartItem from './CartItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fadeIn = keyframes`
  from {
    background: transparent;
  }
  to {
    background: rgba(0, 0, 0, 0.4);;
  }
`;

const fadeOut = keyframes`
  from {
    background: rgba(0, 0, 0, 0.4);;
  }
  to {
    background: transparent;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Background = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 3;
  animation: ${props => props.isVisible ? fadeIn : fadeOut } 300ms ease;
`;

const CartContainer = styled.div`
  z-index: 4;
  height: 100vh;
  width: 600px;
  background-color: white;
  float: right;
  display: flex;
  flex-direction: column;
  animation: ${props => (props.isVisible ? slideIn : slideOut)} 300ms ease;
`;

const BoxIcon = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
  cursor: pointer;
`;

const CartHeader = styled.div`
  background: black;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
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

const ItemsDiv = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-flow: column nowrap;
  gap: 32px;
  padding: 24px 24px;
`;

const CartFooter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  padding: 24px 24px;
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

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  height: 60px;
  width: 100%;
  background-color: ${props => props.primary ? "white" : "black"};
  color: ${props => props.primary ? "black" : "white"};
  font-size: 18px;
  border: 1px solid white;
  cursor: pointer;
  text-decoration: none;

  &:hover{
    // WIP
  }
`;

export default function Cart() {
  const [isVisible,setIsVisible] = useState(true);
  const { totalPrice,totalItems,cartItems,setShowCart,lastRemovedItem } = useStateContext();

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setShowCart(false);
      },300);
    }
    return
  },[isVisible,setShowCart]);

  return (
    <Background isVisible={isVisible}>
      <CartContainer isVisible={isVisible}>
        <CartHeader>
          <BoxIcon alt={'openbox'} src={boxOpen} onClick={() => setIsVisible(false)}/>
          <h1>Sua Caixa</h1>
          <p>({totalItems} itens)</p>
        </CartHeader>
        <ItemsDiv>
          {cartItems.map((item) => {
            if (item === lastRemovedItem) {
              return <CartItem key={item.name} lastRemoved={true} product={item} />
            } else {
              return <CartItem key={item.name} lastRemoved={false} product={item} />
            }
          })}
        </ItemsDiv>
        <CartFooter>
          <SubtotalDiv>
            <h1>Subtotal</h1>
            <PriceDiv>
              <p>R$20</p>
              <h2>R${totalPrice}</h2>
            </PriceDiv>
          </SubtotalDiv>
          <ButtonDiv>
            <Button primary={false} onClick={() => setIsVisible(false)}>
              CONTINUAR COMPRANDO
            </Button>
            <Button primary={true}>
              FINALIZAR COMPRAR
            </Button>
          </ButtonDiv>
        </CartFooter>
      </CartContainer>
    </Background>
  )
}
