'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/Cart';
import { useState,useEffect } from 'react';
import { deliveryLocations,pickupLocations } from '@/sanity/schemas/options';
import CartItem from '@/components/CartItem';
import { ItemsDiv,PriceDiv } from '@/components/Cart'
import { sendOrderToServer,updateOrderedProduct } from '@/lib/api';
import { storeFormData,getFormData } from '@/lib/localStorage';
import { formatFloat } from '@/lib/format'

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
      padding: 12px;
      p {
        display: none;
      }
      div {
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 10px;
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

export default function BuyForm() {
  const { totalPrice,totalDiscount,onBuy,cartItems,lastRemovedItem,router } = useStateContext();
  const [deliveryType,setDeliveryType] = useState('Taxa');
  const [tax,setTax] = useState(null);
  const [pixPayment,setPixPayment] = useState(null);
  //const [submitError,setSubmitError] = useState('');

  const { register,handleSubmit,setValue,formState: { errors } } = useForm();

  useEffect(() => {
    setValue('name', getFormData('name'))
    setValue('phone', getFormData('phone'))
    setValue('email', getFormData('email'))
    setValue('insta', getFormData('insta'))
  },[setValue]);

  const onSubmit = async (data) => {
    try {
      if (cartItems.length == 0) {
        throw new Error('Cart vazio');
      }
      
      storeFormData(data)
      
      const order = {
        subtotal: totalPrice - totalDiscount,
        tax: formatFloat(tax),
        total: formatFloat(totalPrice - totalDiscount + tax),
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
        delivery: {local: JSON.parse(data.delivery.local).local, type: data.delivery.type},
        phone: data.phone.length > 10 ? data.phone.replace('9','') : data.phone,
        order,
      }
      console.log(json);
      await sendOrderToServer(json);
      await cartItems.map((item) => updateOrderedProduct(item._id))
      onBuy();
      router.push('/comprar/sucesso');
    }
    catch (e) {
      console.log(e)
      router.push('/comprar/erro');
    }
  }

  return (
    <Container>
      <TitleDiv>
        <h1>Finalizar Compra</h1>
        <p>No momento, <u>somente</u> aceitamos pagamento por <u>PIX</u> ou <u>dinheiro</u></p>
        <p>É <u>necessário</u> ter um número de celular com <u>Whatsapp</u> para concluir a compra</p>
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
                {tax === null ? <h2>-</h2> : (tax === 0 ? <h2>Grátis</h2> : <h2>R${formatFloat(tax)}</h2>)}
              </PriceDiv>
            </OrderBody>
            <OrderBody>
              <h1>Total</h1>
              <PriceDiv>
                {(totalDiscount > 0) ?
                  <>
                    <h4>R${formatFloat(totalPrice + tax)}</h4>
                    <h2>R${formatFloat(totalPrice - totalDiscount + tax)}</h2>
                  </> :
                  <h2>R${formatFloat(totalPrice - totalDiscount + tax)}</h2>
                }
              </PriceDiv>
            </OrderBody>
          </OrderFooter>
        </OrderDiv>
        <vl />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleDiv>
            <h2>Dados Pessoais</h2>
            <p>Precisamos dessas informações para nos comunicarmos</p>
          </TitleDiv>
          <InputBox title={'Nome*'} span={'Como devemos te chamar?'} errorMessage={errors.name}>
            <input
              type='text'
              placeholder='ex. Rua de Baixo'
              {...register('name',{
                required: '(Obrigatório)',
                maxLength: { value: 40,message: '(Limite de caracteres excedido)' }
              })}
            />
          </InputBox>
          <InputBox title={'Número de Celular*'} span={'O pedido será concluído pelo Whatsapp'} errorMessage={errors.phone}>
            <input
              type='phone'
              placeholder='ex. 61987654321'
              {...register('phone',{
                required: '(Obrigatório)',
                minLength: { value: 10,message: '(Formato incorreto "61987654321")' },
                maxLength: { value: 11,message: '(Formato incorreto "61987654321")' }
              })}
            />
          </InputBox>
          <InputBox title={'Email'} span={'Email para receber notícias e informações do pedido '} errorMessage={errors.email}>
            <input
              type='email'
              placeholder='ex. ruadebaixoloja@gmail.com'
              {...register('email', {
                maxLength: { value: 30,message: '(Limite de caracteres excedido)' }
              })}
            />
          </InputBox>
          <InputBox title={'Instagram'} span={'Pra ficar por dentro da cultura da Rua de Baixo'} errorMessage={errors.insta}>
            <input
              type='text'
              placeholder='ex. @ruadebaixoloja'
              {...register('insta',{
                maxLength: { value: 20,message: '(Limite de caracteres excedido)' }
              })}
            />
          </InputBox>
          <TitleDiv>
            <h2>Dados do Pedido</h2>
            <p>Essas informações são importantes para agilizar a venda</p>
          </TitleDiv>
          <InputBox title={'Forma de Recebimento*'} span={'Vamos até você ou você vem até nós, você decide!'} errorMessage={errors.delivery && errors.delivery.type}>
            <DeliveryDiv>
              <RadioDiv>
                <input
                  onClick={() => { setDeliveryType('Entrega'); setTax(null) }}
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
                  onClick={() => { setDeliveryType('Retirada'); setTax(0) }}
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
          <InputBox title={'Forma de Pagamento*'} span={'No momento, somente aceitamos estas formas'} errorMessage={errors.payment && errors.payment.type}>
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
    switch (deliveryType) {
      case 'Entrega':
        return (
          <InputBox title={'Local de Entrega*'} span={'Fazemos entrega nesses locais:'} errorMessage={errors.delivery && errors.delivery.local}>
            <select defaultValue='' {...register('delivery.local',{
              required: 'Selecione uma opção',
              onChange: (e) => setTax(JSON.parse(e.target.value).tax)
            })}>
              <option value="" disabled>Selecione um local</option>
              {deliveryLocations.map((location) => {
                return <option key={location.local} value={JSON.stringify(location)}>{`${location.local} (R$ ${formatFloat(location.tax)})`}</option>
              })}
            </select>
          </InputBox>
        )
      case 'Retirada':
        return (
          <InputBox title={'Local de Retirada*'} span={'Nos encontramos com frete grátis nesses locais:'} errorMessage={errors.delivery && errors.delivery.local}>
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