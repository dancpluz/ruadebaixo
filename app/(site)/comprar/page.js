'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';

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

export default function ComprarPage() {
  const { totalPrice,totalDiscount,cartItems,setShowCart,lastRemovedItem,router } = useStateContext();
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
        <Form onSubmit={handleSubmit()}>
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
            <div>
              <input
                type='radio'
                {...register('delivery',{
                  required: '(Obrigatório)'
                })}
              />
              <input
                type='radio'
                {...register('delivery')}
              />
            </div>
          </InputBox>
          {/* <InputBox title={'Forma de Recebimento*'} span={'//'}>
            <select {...register('')}/>
          </InputBox> */}
        </Form>
      </Wrapper>

    </Container>
  )
}
