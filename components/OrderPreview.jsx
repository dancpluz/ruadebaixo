'use client'

import styled from 'styled-components';
import CartItem from '@/components/CartItem';
import { ItemsDiv,PriceDiv } from '@/components/Cart';
import { formatFloat } from '@/lib/format';

const OrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //min-height: 800px;
  //justify-content: space-between;
  h5 {
    font-size: 2rem;
    text-align: center;
    height: 100%;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 400;
  }
  ${ItemsDiv} {
    flex-grow: 0;
    min-height: 160px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    ${ItemsDiv} {
      padding: 12px;
      p {
        display: none;
      }
      div {
        /* flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 10px; */
      }
    }
  }
`;

const OrderHeader = styled.div`
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  height: 40px;
  h2,h3 {
    color: ${({ theme }) => theme.colors.light};
  }
  h3 {
    font-weight: 400;
  }
`;

const OrderBody = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2, h4 {
    font-weight: 400;
  }
  h4 {
    text-decoration: line-through;
  }

  &:last-child {
    h1 {
      font-weight: 600;
      font-size: 2rem;
    }
    background: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
  }
`;

const OrderFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function OrderPreview({ cartItems,lastRemovedItem,totalDiscount,totalPrice,fee,paymentType,deliveryType }) {
  
  const cardTax = paymentType == 'card' ? (totalPrice - totalDiscount + fee)*0.04 + 0.4 : 0 

  return (
    <OrderDiv>
      <OrderHeader>
        <h2>Seu Pedido</h2>
        <h3>({cartItems.length} {cartItems.length == 1 ? "item" : "itens"})</h3>
      </OrderHeader>
      <ItemsDiv>
        {(cartItems.length != 0) || lastRemovedItem ?
          (<>
            {cartItems.map((item) => {
              return <CartItem key={item.name} product={item} />
            })}
            {lastRemovedItem && <CartItem lastRemoved={true} product={lastRemovedItem} />}
          </>) :
          <h5>Sua caixa está vazia</h5>}
        <CartItem product={{ name: 'Rua de Baixo', type: 'Adesivo', size: '7x4cm', price: 0, discount: 0, images: [{url: '/assets/adesivo.png', blur: 'LE8EGEt74TNGofj[axay00Rj_4t7'}]}} />
      </ItemsDiv>
      <hr />
      <OrderFooter>
        <OrderBody>
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
        </OrderBody>
        <OrderBody>
          <h2>{deliveryType}</h2>
          <PriceDiv>
            {fee === null ? <h2>-</h2> : (fee === 0 ? <h2>Grátis</h2> : <h2>R${formatFloat(fee)}</h2>)}
          </PriceDiv>
        </OrderBody>
        <OrderBody>
          <div>
            <h1>Total</h1>
            {cardTax != 0 && <u>+ R${formatFloat(cardTax)}</u>}
          </div>
          <PriceDiv>
            {(totalDiscount > 0 && cardTax == 0) ?
              <>
                <h4>R${formatFloat(totalPrice + fee)}</h4>
                <h2>R${formatFloat(totalPrice - totalDiscount + fee + cardTax)}</h2>
              </> :
              <h2>R${formatFloat(totalPrice - totalDiscount + fee + cardTax)}</h2>
            }
          </PriceDiv>
        </OrderBody>
      </OrderFooter>
    </OrderDiv>
  )
}
