'use client'

import styled, { keyframes } from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import boxOpen from '@/public/assets/icons/boxopen.svg';
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
  background-color: ${({ theme }) => theme.colors.light};
  float: right;
  display: flex;
  flex-direction: column;
  animation: ${props => (props.isVisible ? slideIn : slideOut)} 300ms ease;
  color: ${({ theme }) => theme.colors.light};
`;

const BoxIcon = styled(Image)`
  height: 40px;
  width: 40px;
  filter: invert(100%);
  cursor: pointer;
`;

const CartHeader = styled.div`
  background: ${({ theme }) => theme.colors.dark};
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 0 24px;
  h3 {
    font-weight: 400;
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
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
`;

const SubtotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2, h4 {
    font-weight: 400;
  }
  h4 {
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
  background-color: ${props => props.primary ? ({ theme }) => theme.colors.light : ({ theme }) => theme.colors.dark};
  color: ${props => props.primary ? ({ theme }) => theme.colors.dark : ({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.light};

  &:hover{
    // WIP
  }
`;

export default function Cart() {
  const [isVisible,setIsVisible] = useState(true);
  const { totalPrice, totalDiscount, cartItems,setShowCart,lastRemovedItem } = useStateContext();

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
          <h3>({cartItems.length} {cartItems.length == 1 ? "item" : "itens"})</h3>
        </CartHeader>
        <ItemsDiv>
          {cartItems.map((item) => {
            return <CartItem key={item.name} product={item} />
          })}
          {lastRemovedItem && <CartItem lastRemoved={true} product={lastRemovedItem} />}
        </ItemsDiv>
        <CartFooter>
          <SubtotalDiv>
            <h2>Subtotal</h2>
            <PriceDiv>
              {(totalDiscount > 0) ?
                <>
                  <h4>R${totalPrice}</h4>
                  <h2>R${totalPrice - totalDiscount}</h2>
                </> :
                <h2>R${totalPrice - totalDiscount}</h2>
              }
            </PriceDiv>
          </SubtotalDiv>
          <ButtonDiv>
            <Button onClick={() => setIsVisible(false)}>
              CONTINUAR COMPRANDO
            </Button>
            <Button primary>
              FINALIZAR COMPRA
            </Button>
          </ButtonDiv>
        </CartFooter>
      </CartContainer>
    </Background>
  )
}
