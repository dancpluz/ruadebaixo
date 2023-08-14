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
  }
`;

const Underlined = styled.span`
  text-decoration: underline;
  font-size: 1.125rem;
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
  const [submitError,setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <Container>
      <div>
        <h1>Finalizar Compra</h1>
        <p>No momento, <Underlined>somente</Underlined> aceitamos pagamento por <Underlined>PIX</Underlined> ou <Underlined>dinheiro</Underlined>.</p>
        <p>É <Underlined>necessário</Underlined> ter um número de celular com <Underlined>Whatsapp</Underlined> para concluir a compra.</p>
      </div>
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
              <h2>Entrega</h2>
              <PriceDiv>
                {}
              </PriceDiv>
            </OrderBody>
            <OrderBody>
              <h1>Total</h1>
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
          <hr/>
          <TitleDiv>
            <h2>Dados do Pedido</h2>
            <p>Nãosdfas</p>
          </TitleDiv>
          <InputBox title={'Forma de Recebimento*'} span={'//'} errorMessage={errors.delivery && errors.delivery.type}>
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
          <Button>FINALIZAR COMPRA</Button>
        </Form>
      </Wrapper>
    </Container>
  )

  function renderDeliveryForms() {
    switch(deliveryType) {
      case 'entrega':
        return (
          <InputBox title={'Local de Entrega*'} span={'//'} errorMessage={errors.delivery && errors.delivery.local}>
            <select defaultValue='' {...register('delivery.local',{
              required: 'Selecione uma opção'
            })}>
              <option value="" disabled>Selecione um local</option>
              {deliveryLocations.sort().map((location) => {
                return <option key={location} value={location}>{location}</option>
              })}
            </select>
          </InputBox>
        )
      case 'retirada':
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