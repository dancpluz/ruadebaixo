'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/Cart';
import { useState } from 'react';
import { deliveryLocations,pickupLocations } from '@/sanity/schemas/options';
import CartItem from '@/components/CartItem';
import { ItemsDiv,PriceDiv }  from '@/components/Cart'
import { sendOrderToServer } from '@/lib/api';

// async function sendObjectToZap() {
//     // WIP
//     const clienteRDB = {
//       name: 'Poggers',
//       id: "2023-03-02_1454",// biblioteca pra pegar data e hora
//       phone: "556198118398",
//       email: "caioquinha123@gmail.com",
//       insta: "caiok",
//       delivery: {type: "Retirada", local: "Plano"},
//       payment: {type: "PIX", moment: "Ao confirmar pedido"},
//       order: {
//         subtotal: '51',
//         tax: '5',
//         total: '56',
//            products: [{
//           name: 'Fear of God',
//           type: 'Camiseta',
//           fullPrice: '40',
//           offerPrice: '40',
//         },{
//           name: 'Sea World',
//           type: 'Boné',
//           fullPrice: '40',
//           offerPrice: '30',
//         }]
//       }
//     };
//   }

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 24px;
  padding: 42px 200px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 42px 100px;
  }
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 42px 32px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 64px;
  width: 100%;
  @media ${({ theme }) => theme.sizes.medium} {
    flex-direction: column;
    gap: 32px;
  }
`;

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
      p {
        display: none;
      }
      div{
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 10px;
      }
      padding: 12px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 32px;
`;

const TitleDiv = styled.div`
  text-align: center;
`;

const DeliveryDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 24px;
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h4 {
      font-weight: 400;
    }
  div {
    span {
      text-decoration: underline;
    }
  }
`;


export default function ComprarPage() {
  const { totalPrice,totalDiscount,cartItems,lastRemovedItem,totalTax, setTotalTax, router } = useStateContext();
  const [deliveryType, setDeliveryType] = useState('Taxa');
  const [pixPayment,setPixPayment] = useState(null);
  const [submitError,setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const order = {
      subtotal: totalPrice - totalDiscount,
      tax: totalTax,
      total: totalPrice - totalDiscount + totalTax,
      products: cartItems.map((item) => {
        return {
          name: item.name,
          type: item.type,
          fullPrice: item.price,
          offerPrice: item.price - item.discount
        }
      })
    }

    const json = {
      ...data,
      phone: data.phone.length > 10 ? data.phone.replace('9', '') : data.phone,
      order,
    }

    console.log(json)
    sendOrderToServer(json);
  }

  return (
    <Container>
      <TitleDiv>
        <h1>Finalizar Compra</h1>
        <p>No momento, <u>somente</u> aceitamos pagamento por <u>PIX</u> ou <u>dinheiro</u>.</p>
        <p>É <u>necessário</u> ter um número de celular com <u>Whatsapp</u> para concluir a compra.</p>
      </TitleDiv>
      <Wrapper>
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
                {totalTax === null ? <h2>-</h2> : (totalTax === 0 ? <h2>Grátis</h2> : <h2>R${totalTax}</h2>)}
              </PriceDiv>
            </OrderBody>
            <OrderBody>
              <h1>Total</h1>
              <PriceDiv>
                {(totalDiscount > 0) ?
                  <>
                    <h4>R${totalPrice + totalTax}</h4>
                    <h2>R${totalPrice - totalDiscount + totalTax}</h2>
                  </> :
                  <h2>R${totalPrice - totalDiscount + totalTax}</h2>
                }
              </PriceDiv>
            </OrderBody>
          </OrderFooter>
        </OrderDiv>
        <vl />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleDiv>
            <h2>Dados Pessoais</h2>
            <p>Nãosdfas</p>
          </TitleDiv>
          <InputBox title={'Nome*'} span={'Nome que usaremos ao contatar'} errorMessage={errors.name}>
            <input
              type='text'
              placeholder='ex. Rua de Baixo'
              {...register('name',{
                required: '(Obrigatório)'
              })}
            />
          </InputBox>
          <InputBox title={'Número de Celular*'} span={'O pedido será concluído pelo Whatsapp'} errorMessage={errors.phone}>
            <input
              type='phone'
              placeholder='ex. 61987654321'
              {...register('phone',{
                required: '(Obrigatório)'
              })}
            />
          </InputBox>
          <InputBox title={'Email'} span={'Email para receber notícias e informações do pedido '} errorMessage={errors.email}>
            <input
              type='email'
              placeholder='ex. ruadebaixoloja@gmail.com'
              {...register('email')}
            />
          </InputBox>
          <InputBox title={'Instagram'} span={'@'} errorMessage={errors.insta}>
            <input
              type='text'
              placeholder='ex. @ruadebaixoloja'
              {...register('insta')}
            />
          </InputBox>
          <TitleDiv>
            <h2>Dados do Pedido</h2>
            <p>Nãosdfas</p>
          </TitleDiv>
          <InputBox title={'Forma de Recebimento*'} span={'//'} errorMessage={errors.delivery && errors.delivery.type}>
            <DeliveryDiv>
              <RadioDiv>
                <input
                  onClick={() => {setDeliveryType('Entrega'); setTotalTax(null)}}
                  value='Entrega'
                  type='radio'
                  {...register('delivery.type',{
                    required: '(Obrigatório)'
                  })}
                />
                <div>
                  <h4>Entrega</h4>
                  <span>Sujeito a taxa</span>
                </div>
                <span>(2-7 dias)</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  onClick={() => {setDeliveryType('Retirada'); setTotalTax(0)}}
                  value='Retirada'
                  type='radio'
                  {...register('delivery.type',{
                    required: '(Obrigatório)'
                  })}
                />
                <div>
                  <h4>Retirada</h4>
                  <span>Frete Grátis</span>
                </div>
                <span>(4-10 dias)</span>
              </RadioDiv>
            </DeliveryDiv>
          </InputBox>
          {renderDeliveryForms()}
          <InputBox title={'Forma de Pagamento*'} span={'//'} errorMessage={errors.payment && errors.payment.type}>
            <DeliveryDiv>
              <RadioDiv>
                <input
                  onClick={() => setPixPayment(true)}
                  type='radio'
                  value='PIX'
                  {...register('payment.type',{
                    required: '(Obrigatório)'
                  })}
                />
                <h4>PIX</h4>
              </RadioDiv>
              <RadioDiv>
                <input
                  onClick={() => setPixPayment(false)}
                  type='radio'
                  value='Dinheiro físico'
                  {...register('payment.type',{
                    required: '(Obrigatório)'
                  })}
                />
                <h4>Dinheiro físico</h4>
              </RadioDiv>
            </DeliveryDiv>
          </InputBox>
          {!(pixPayment === null) && <InputBox title={'Quando Pagar?*'} errorMessage={errors.payment && errors.payment.moment}>
            <DeliveryDiv>
              <RadioDiv>
                <input
                  value='Ao confirmar pedido'
                  type='radio'
                  {...register('payment.moment',{
                    required: '(Obrigatório)'
                  })}
                  disabled={!pixPayment}
                />
                <h4>Ao confirmar pedido</h4>
              </RadioDiv>
              <RadioDiv>
                <input
                  value='No recebimento'
                  type='radio'
                  {...register('payment.moment',{
                    required: '(Obrigatório)'
                  })}
                />
                <h4>No recebimento</h4>
              </RadioDiv>
            </DeliveryDiv>
          </InputBox>}
          <p>Após fazer o pedido, você pode entrar em uma fila e não podemos garantir que conseguirá a peça, mas não se preocupe, não cobraremos nada sem completar o pedido.</p>
          <Button>FINALIZAR COMPRA</Button>
        </Form>
      </Wrapper>
    </Container>
  )

  function renderDeliveryForms() {
    switch(deliveryType) {
      case 'Entrega':
        return (
          <InputBox title={'Local de Entrega*'} span={'//'} errorMessage={errors.delivery && errors.delivery.local}>
            <select defaultValue='' {...register('delivery.local',{
              required: 'Selecione uma opção'
            })}>
              <option value="" disabled>Selecione um local</option>
              {deliveryLocations.map((location) => {
                return <option key={location.local} onClick={() =>  setTotalTax(location.tax)} value={location.local}>{`${location.local} (R$${location.tax})`}</option>
              })}
            </select>
          </InputBox>
        )
      case 'Retirada':
        return (
          <InputBox title={'Local de Retirada*'} span={'//'} errorMessage={errors.delivery && errors.delivery.local}>
            <select defaultValue='' {...register('delivery.local',{
              required: 'Selecione uma opção'
            })}>
              <option value='' disabled>Selecione um local</option>
              {pickupLocations.sort().map((location) => {
                return <option key={location} value={location}>{location}</option>
              })}
            </select>
          </InputBox>
        )
      default:
        return
    }
  }
}