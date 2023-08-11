'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/Cart';
import { useState } from 'react';
import { deliveryLocations,pickupLocations } from '@/sanity/schemas/options';

// async function sendObjectToZap() {
//     // WIP
//     const clienteRDB = {
//       name: 'Poggers',
//       id: "2023-03-02_1454",// biblioteca pra pegar data e hora
//       phone: "5561998118398",
//       email: "caioquinha123@gmail.com",
//       insta: "caiok",
//       delivery: {type: "Retirada", local: "Plano"},
//       payment: {type: "PIX", moment: "Ao confirmar pedido"},
//       order: {
//         totalPrice: '56',products: [{
//           name: 'Fear of God',
//           type: 'Camiseta',
//           size: 'm',
//           fullPrice: '40',
//           offerPrice: '40',
//         },{
//           name: 'Sea World',
//           type: 'Boné',
//           size: 'U',
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
  padding: 20px 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 64px;
  width: 100%;
`;

const Underlined = styled.span`
  text-decoration: underline;
  font-size: 1.125rem;
`;

const OrderDiv = styled.div`
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  justify-content: space-between;
`;

const OrderHeader = styled.div`
  background: ${({ theme }) => theme.colors.dark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  height: 40px;
  width: 100%;
  h2,h3 {
    color: ${({ theme }) => theme.colors.light};
  }
  h3 {
    font-weight: 400;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const TitleDiv = styled.div`
  text-align: center;
`;

const RadioDiv = styled.div`
  display: flex;
  align-items: center;
  h4 {
      font-weight: 400;
    }
  div {
    
    span {
      text-decoration: underline;
    }
  }
  
`;

const DeliveryDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
`;


export default function ComprarPage() {
  const { totalPrice,totalDiscount,cartItems,setShowCart,lastRemovedItem,router } = useStateContext();
  const [deliveryType, setDeliveryType] = useState(null);
  const [pixPayment,setPixPayment] = useState(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <Container>
      <h1>Finalizar Compra</h1>
      <p>No momento, <Underlined>somente</Underlined> aceitamos pagamento por <Underlined>PIX</Underlined> ou <Underlined>dinheiro</Underlined>.</p>
      <p>É <Underlined>necessário</Underlined> ter um número de celular com <Underlined>Whatsapp</Underlined> para concluir a compra.</p>
      <Wrapper>
        <OrderDiv>
          <OrderHeader>
            <h2>Seu Pedido</h2>
            <h3>({cartItems.length} {cartItems.length == 1 ? "item" : "itens"})</h3>
          </OrderHeader>
        </OrderDiv>
        <vl />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleDiv>
            <h2>Dados Pessoais</h2>
            <p>Nãosdfas</p>
          </TitleDiv>
          <InputBox title={'Nome*'} span={'Nome que usaremos ao contatar'}>
            <input
              type='text'
              placeholder='ex. Rua de Baixo'
              {...register('name',{
                required: '(Obrigatório)'
              })}
            />
          </InputBox>
          <InputBox title={'Número de Celular*'} span={'O pedido será concluído pelo Whatsapp'}>
            <input
              type='phone'
              placeholder='ex. 61987654321'
              {...register('phone',{
                required: '(Obrigatório)'
              })}
            />
          </InputBox>
          <InputBox title={'Email'} span={'Email para receber notícias e informações do pedido '}>
            <input
              type='email'
              placeholder='ex. ruadebaixoloja@gmail.com'
              {...register('email')}
            />
          </InputBox>
          <InputBox title={'Instagram'} span={'@'}>
            <input
              type='text'
              placeholder='ex. @ruadebaixoloja'
              {...register('insta')}
            />
          </InputBox>
          <hr/>
          <TitleDiv>
            <h2>Dados do Pedido</h2>
            <p>Nãosdfas</p>
          </TitleDiv>
          <InputBox title={'Forma de Recebimento*'} span={'//'}>
            <DeliveryDiv>
              <RadioDiv>
                <input
                  onClick={() => setDeliveryType('entrega')}
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
                  onClick={() => setDeliveryType('retirada')}
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
          <InputBox title={'Forma de Pagamento*'} span={'//'}>
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
          {!(pixPayment === null) && <InputBox title={'Quando Pagar?*'}>
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
          <Button>FINALIZAR COMPRA</Button>
        </Form>
      </Wrapper>
    </Container>
  )

  function renderDeliveryForms() {
    switch(deliveryType) {
      case 'entrega':
        return (
          <InputBox title={'Local de Entrega*'} span={'//'}>
            <select {...register('delivery.local')}>
              {deliveryLocations.sort().map((location) => {
                return <option key={location} value={location}>{location}</option>
              })}
            </select>
          </InputBox>
        )
      case 'retirada':
        return (
          <InputBox title={'Local de Retirada*'} span={'//'}>
            <select {...register('delivery.local')}>
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