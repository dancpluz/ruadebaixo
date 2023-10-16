'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/Cart';
import { useState,useEffect } from 'react';
import { deliveryLocations,pickupLocations } from '@/sanity/schemas/options';
import OrderPreview from '@/components/OrderPreview';
import { sendOrderToServer,updateOrderedProduct } from '@/lib/api';
import { storeFormData,getFormData } from '@/lib/localStorage';
import { formatFloat } from '@/lib/format'
import { purchase, buyer } from '@/lib/fpixel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Image from 'next/image';
import Alert from '@mui/material/Alert';
import CardPayment from '@/components/CardPayment';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 24px;
  padding: 100px 200px 60px 200px;
  @media ${({ theme }) => theme.sizes.medium} {
    padding: 100px 100px 60px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    padding: 100px 32px 60px 32px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const StyledStepper = styled(Stepper)`
  display: flex;
  width: 100%;
  p {
    margin-left: 18px;
  }

  .MuiCollapse-wrapperInner {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .MuiStepConnector-root, .MuiStepContent-root {
    margin-left: 18px;
  }
  .MuiStepLabel-label, .MuiStepIcon-text {
    cursor: pointer;
    font-family: 'Clash Display', sans-serif;
    font-weight: 600;
    font-size: 2.25rem;
    line-height: 1.2;
  }
  .MuiStepIcon-root.Mui-active, .MuiStepIcon-root.Mui-completed {
    color: black;
  }
  .MuiStepIcon-text {
    font-size: 1rem;
  }
  .MuiStepIcon-root {
    font-size: 2.5rem;
  }
  .MuiStepLabel-iconContainer {
    padding-right: 16px;
  }
`;

const StepTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled(Image)`
  display: ${props => props.disabled && 'none'};
`;

const StyledAlert = styled(Alert)`
  color: ${({ theme }) => theme.colors.light};
  background: ${({ theme }) => theme.colors.dark};
  font-family: 'Clash Display', sans-serif;
  border-radius: 0;
  font-size: 1.2rem;
  .MuiAlert-icon {
    font-size: 1.7rem;
    align-items: center;
  }
`;

const Whatsapp = styled(Image)`
  color: black;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default function BuyForm() {
  const { totalPrice,totalDiscount, setTotalDiscount, onBuy,cartItems,lastRemovedItem,router } = useStateContext();
  const [deliveryType,setDeliveryType] = useState('Taxa');
  const [tax,setTax] = useState(null);
  const [paymentType,setPaymentType] = useState('card');
  const [activeStep,setActiveStep] = useState(0);
  //const [submitError,setSubmitError] = useState('');

  const handleNext = async () => {
    if (activeStep == 0) {
      if (await trigger(['name','phone'],{ shouldFocus: true })) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else if (activeStep == 1) {
      if (await trigger(['delivery','payment'],{ shouldFocus: true })) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { register,handleSubmit,trigger,formState: { errors } } = useForm();

  useEffect(() => {
    document.getElementById('name').focus();
    document.getElementById('name').value = getFormData('name');
    document.getElementById('phone').focus();
    document.getElementById('phone').value = getFormData('phone');
    document.getElementById('email').focus();
    document.getElementById('email').value = getFormData('email');
    document.getElementById('insta').focus();
    document.getElementById('insta').value = getFormData('insta');
    document.activeElement.blur();
  },[]);

  const onSubmit = async (data) => {
    try {
      if (cartItems.length == 0) {
        throw new Error('Cart vazio');
      }
      
      //storeFormData(data)
      
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
        delivery: {local: data.delivery.local, type: data.delivery.type},
        phone: data.phone.length > 10 ? data.phone.replace('9','') : data.phone,
        order,
      }
      console.log(data)
      //await sendOrderToServer(json);
      //await cartItems.map((item) => updateOrderedProduct(item._id))
      //onBuy();
      //buyer(json.name,json.email,json.phone) // Facebook Pixel Buyer Event for SEO
      //purchase(json.total, cartItems, json.delivery.type); // Facebook Pixel Purchase Event for SEO
      //router.push('/comprar/sucesso');
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
        <p>É <u>necessário</u> ter um número de celular com <u>Whatsapp</u> para concluir a compra por <u>PIX</u></p>
      </TitleDiv>
      <Wrapper>
        <OrderPreview cartItems={cartItems} lastRemovedItem={lastRemovedItem} totalDiscount={totalDiscount} totalPrice={totalPrice} tax={tax} deliveryType={deliveryType} paymentType={paymentType} />
        <vl />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledStepper activeStep={activeStep} orientation="vertical">
            
              <Step>
                <StepLabel onClick={activeStep === 1 ? handleBack : undefined}>
                  <h2>Dados Pessoais</h2>
                </StepLabel>
                <StepContent>
                  {renderPayment()}
                  <p>Precisamos dessas informações para nos comunicarmos</p>
                  <InputBox title={'Nome*'} span={'Como devemos te chamar?'} errorMessage={errors.name}>
                    <input
                      id='name'
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
                      id='phone'
                      type='tel'
                      placeholder='ex. 61987654321'
                      {...register('phone',{
                        required: '(Obrigatório)',
                        minLength: { value: 10,message: '(Formato incorreto: "61987654321")' },
                        maxLength: { value: 11, message: '(Formato incorreto: "61987654321")' },
                      })}
                    />
                  </InputBox>
                  <InputBox title={'Email'} span={'Email para receber notícias e informações do pedido '} errorMessage={errors.email}>
                    <input
                      id='email'
                      type='email'
                      placeholder='ex. ruadebaixoloja@gmail.com'
                      {...register('email', {
                        maxLength: { value: 30,message: '(Limite de caracteres excedido)' }
                      })}
                    />
                  </InputBox>
                  <InputBox title={'Instagram'} span={'Pra ficar por dentro da cultura da Rua de Baixo'} errorMessage={errors.insta}>
                    <input
                      id='insta'
                      type='text'
                      placeholder='ex. @ruadebaixoloja'
                      {...register('insta',{
                        maxLength: { value: 20,message: '(Limite de caracteres excedido)' }
                      })}
                    />
                  </InputBox>
                </StepContent>
              </Step>
              <Step>
                <StepLabel onClick={activeStep === 0 ? handleNext : activeStep === 2 ? handleBack : undefined}>
                  <StepTitle>
                    <h2>Dados do Pedido</h2>
                    <Arrow src={'assets/icons/arrow-up.svg'} width={36} height={36} alt={'Voltar'} disabled={activeStep !== 1} onClick={handleBack}/>
                  </StepTitle>
                </StepLabel>
                <StepContent>
                  <p>Essas informações são importantes para agilizar a venda</p>
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
                  <InputBox title={'Forma de Pagamento*'} span={'Escolha como deseja pagar'} errorMessage={errors.payment && errors.payment}>
                    <DeliveryDiv>
                      <RadioDiv>
                        <input
                          onClick={() => setPaymentType('card')}
                          type='radio'
                          value='Cartão de Crédito'
                          {...register('payment',{
                            required: '(Obrigatório)'
                          })}
                        />
                        <h4>Cartão de Crédito</h4>
                      </RadioDiv>
                      <RadioDiv>
                        <input
                          onClick={() => setPaymentType('pix')}
                          type='radio'
                          value='PIX'
                          {...register('payment',{
                            required: '(Obrigatório)'
                          })}
                        />
                        <h4>PIX (-R$5)</h4>
                      </RadioDiv>
                      <RadioDiv>
                        <input
                          onClick={() => setPaymentType('money')}
                          type='radio'
                          value='Dinheiro físico'
                          {...register('payment',{
                            required: '(Obrigatório)'
                          })}
                        />
                        <h4>Dinheiro físico</h4>
                      </RadioDiv>
                      {renderPaymentAlert()}
                    </DeliveryDiv>
                  </InputBox>
                </StepContent>
              </Step>
            <Step>
              <StepLabel onClick={activeStep === 1 ? handleNext : undefined}>
                <StepTitle>
                  <h2>Pagamento</h2>
                  <Arrow src={'assets/icons/arrow-up.svg'} width={36} height={36} alt={'Voltar'} disabled={activeStep !== 2} onClick={handleBack}/>
                </StepTitle>
              </StepLabel>
              <StepContent>
                {renderPayment()}
              </StepContent>
            </Step>
          </StyledStepper>
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
              required: 'Selecione uma opção',
              onChange: () => setTax(0)
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

  function renderPaymentAlert() {
    switch (paymentType) {
      case 'pix':
        return (
          <StyledAlert variant="filled">
            -R$5 de Desconto Ativado
          </StyledAlert>
        )
      case 'card':
        return (
          <StyledAlert variant="filled" severity="info">
            No momento não aceitamos parcelamento
          </StyledAlert>
        )
      case 'money':
        return (
          <StyledAlert variant="filled" severity="info">
            Pagamento no momento da entrega/retirada
          </StyledAlert>
        )
      default:
        return
    }
  }

  function renderPayment() {
    switch (paymentType) {
      case 'pix':
        return (
          <div>
            <h3>Pagamento por PIX</h3>
            <RowDiv>
              <Whatsapp src={'assets/icons/whatsapp-fill.svg'} alt={'Whatsapp Logo'} width={80} height={80} />
              <p>O pagamento será feito pelo Whatsapp, mandaremos uma mensagem confirmando o seu pedido! Decidiremos a entrega por lá também.</p>
            </RowDiv>
            <Button type="submit">
              CONCLUIR COMPRA
            </Button>
          </div>
        );
      case 'card':
        return (
          <div>
            <h3>Pagamento por Cartão Crédito</h3>
            <CardPayment />
          </div>
        );
      case 'money':
        return (
          <div>
            <h3>Pagamento por Dinheiro Físico</h3>
            <RowDiv>
              <Whatsapp src={'assets/icons/whatsapp-fill.svg'} alt={'Whatsapp Logo'} width={80} height={80} />
              <p>O pagamento será feito no momento da entrega/retirada, mandaremos uma mensagem confirmando o seu pedido! Decidiremos a entrega por lá também.</p>
            </RowDiv>
            <Button type="submit">
              CONCLUIR COMPRA
            </Button>
          </div>
        );
      default:
        return
    }
  }
}