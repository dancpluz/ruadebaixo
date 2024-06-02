'use client'

import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { useForm } from 'react-hook-form';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/Cart';
import { useState,useEffect,useRef } from 'react';
import { deliveryLocations,pickupLocations,clothesWeight } from '@/sanity/options';
import OrderPreview from '@/components/OrderPreview';
import { sendOrderToServer,updateOrderedProduct, checkSoldProduct } from '@/lib/api';
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
import CircularProgress from '@mui/material/CircularProgress';
import DeliveryCard from './DeliveryCard';
import InputMask from "react-input-mask";
import { sendEmailToGroup, sendMessageToClient, sendMessageToGroup } from '@/lib/bot';

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

export const TitleDiv = styled.div`
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
    flex: 0;
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
  transform: ${props => props.reverse && 'rotate(180deg)'};
`;

export const StyledAlert = styled(Alert)`
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.light};
  font-family: 'Clash Display', sans-serif;
  border: solid 1px ${({ theme }) => theme.colors.dark};
  border-radius: 0;
  font-size: 1.2rem;
  font-weight: 400;
  .MuiAlert-icon {
    font-size: 1.7rem;
    align-items: center;
  }
`;

const Whatsapp = styled(Image)`
  color: black;
`;

const RowDiv = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ErrorText = styled.h4`
  //font-size: 1.25rem;
  color: #df1b41;
  text-align: center;
  width: 100%;
`;

const CalculateDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  input {
    flex-grow: 1;
  }
  
  button {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    border: 1px solid ${({ theme }) => theme.colors.dark};
    height: 42px;
    min-width: 180px;
    flex: 1;
  }
`;

const AddressDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  row-gap: 8px;
  column-gap: 8px;

  input:nth-child(1) {
    grid-column: 1/6;
  }
  input:nth-child(2) {
    grid-column: 6/8;
  }
  input:nth-child(3) {
    grid-column: 8/10;
  }
  input:nth-child(4) {
    grid-column: 1/5;
  }
  input:nth-child(5) {
    grid-column: 5/9;
  }
  input:nth-child(6) {

  }
  @media ${({ theme }) => theme.sizes.medium} {
    grid-template-rows: 1fr 1fr 1fr;
    input:nth-child(1) {
      grid-column: 1/7;
    }
    input:nth-child(2) {
      grid-column: 7/10;
    }
    input:nth-child(3) {
      grid-column: 1/6;
    }
    input:nth-child(4) {
      grid-column: 6/10;
    }
    input:nth-child(5) {
      grid-column: 1/8;
    }
    input:nth-child(6) {
      grid-column: 8/10;
    }
  }
`;

export default function BuyForm() {
  const { totalPrice,totalDiscount, onBuy,cartItems,lastRemovedItem,router } = useStateContext();
  const [deliveryType,setDeliveryType] = useState('Taxa');
  const [fee,setFee] = useState(null);
  const [paymentType,setPaymentType] = useState(null);
  const [activeStep,setActiveStep] = useState(0);
  const [formError,setFormError] = useState('');
  const [renderShipping, setRenderShipping] = useState(true);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingError, setShippingError] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { register,handleSubmit,getValues,setValue,trigger,resetField,formState: { errors } } = useForm();

  const handleNext = async () => {
    if (activeStep == 0) {
      if (await trigger(['name','phone','email'],{ shouldFocus: true })) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else if (activeStep == 1) {
      if (await trigger(['shipping','cpf','payment'],{ shouldFocus: true })) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const simulateShipping = async () => {
    if (await trigger(['shipping.cep'],{ shouldFocus: true })) {
      resetField('shipping.price', { defaultValue: '' });
      setFee(null);
      setShippingError('');
      setRenderShipping(false);
      
      const inputCep = await getValues('shipping.cep').replace('-','');
      fillCepFields(inputCep);

      const simulateInfo = {
        cepOrigem: "71010959",
        cepDestino: inputCep,
        vlrMerc: totalPrice - totalDiscount,
        pesoMerc: cartItems.reduce((peso, item) => {return peso += clothesWeight[item.type]}, 0),
        produtos: cartItems.map((item) => {
          return {
            peso: clothesWeight[item.type],
            altura: 7,
            largura: 30,
            comprimento: 24,
            valor: item.price - item.discount,
            quantidade: 1
          }
        }),
        servicos: ['E','X'],
      }
      
      const simulateKangu = await fetch('/api/simulate', {
        method: 'POST',
        body: JSON.stringify(simulateInfo)
      })

      const options = await simulateKangu.json()

      if (options.error) {
        setShippingError(options.error.mensagem);
        setShippingOptions([]);
        setRenderShipping(true);
        resetField('shipping.cep', { defaultValue: '' });
        resetField('shipping.price', { defaultValue: '' });
      } else {
        setShippingOptions(options.filter((option) => option.nf_obrig == "N"));
        setRenderShipping(true);
      }
    }
  }

  const fillCepFields = async (inputCep) => {
    console.log(inputCep)
    const res = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`,{
        method: 'GET',
    });
    
    const cepInfo = await res.json();
    console.log(cepInfo)
    if (cepInfo.erro) {
      resetField('shipping.address', { defaultValue: '' })
      resetField('shipping.complement', { defaultValue: '' })
      resetField('shipping.district', { defaultValue: '' })
      resetField('shipping.city', { defaultValue: '' })
      resetField('shipping.uf', { defaultValue: '' })
    } else {
      const { logradouro, complemento, bairro, localidade, uf } = cepInfo;
      
      setValue('shipping.address', logradouro, { shouldValidate: true });
      setValue('shipping.complement', complemento, { shouldValidate: true });
      setValue('shipping.district', bairro, { shouldValidate: true });
      setValue('shipping.city', localidade, { shouldValidate: true });
      setValue('shipping.uf',uf,{ shouldValidate: true });
    }
  }

  const sendShipping = async (json) => {
    const shippingInfo = {
      pedido: {
        tipo: "D",
        vlrMerc: totalPrice - totalDiscount,
        pesoMerc: cartItems.reduce((peso, item) => {return peso += clothesWeight[item.type]}, 0),
      },
      remetente: {
        nome: "Daniel da Cunha Pereira Luz",
        endereco: {
          cnpjCpf: "05749091171",
          logradouro: "QE 2 Bloco P Área Especial SRIA",
          numero: "2",
          complemento: "",
          bairro: "Guará I",
          cep: "71010970",
          cidade: "Brasília",
          uf: "DF"
        },
        email: "contato@ruadebaixo.com.br",
        celular: "6196492791"
      },
      destinatario: {
        nome: json.name,
        cnpjCpf: json.cpf.replace(/\D/g,''),
        endereco: {
          logradouro: json.shipping.address,
          numero: json.shipping.number,
          complemento: json.shipping.complement,
          bairro: json.shipping.district,
          cep: json.shipping.cep.replace(/\D/g,''),
          cidade: json.shipping.city,
          uf: json.shipping.uf,
        },
        email: json.email,
        celular: json.phone,
      },
      produtos: cartItems.map((item) => {
        return {
          peso: clothesWeight[item.type],
          altura: 7,
          largura: 30,
          comprimento: 24,
          produto: cartItems.reduce((string, item, i) => {
            return cartItems.length != i + 1 ? string += `${item.type} ${item.name}, ` : string += `${item.type} ${item.name}`
          }, ''),
          valor: item.price - item.discount,
          quantidade: 1
        }
      }),
      servicos: ["P"]
    }

    const postShipping = await fetch('/api/shipping', {
      method: 'POST',
      body: JSON.stringify(shippingInfo)
    })

    const response = await postShipping.json()
    
    if (response.error.mensagem) {
      throw new Error(response.error.mensagem);
    }
  }

  useEffect(() => {
    setValue('name', getFormData('name'));
    setValue('phone', getFormData('phone'));
    setValue('email', getFormData('email'));
    setValue('insta', getFormData('insta'));
  },[setValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormError('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [formError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubmiting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSubmiting]);


  const onSubmitInfo = async (data) => {
    setIsSubmiting(true) 
    try {
      if (cartItems.length == 0) {
        throw new Error('Sua caixa está vazia!');
      }

      cartItems.forEach(async (product) => {
        if (await checkSoldProduct(product._id)) {
          throw new Error(`Este produto já foi vendido (${product.name})`);
        }
      })

      if (totalPrice - totalDiscount < 0) {
        throw new Error('Não é possível concluir essa compra');
      }
      
      storeFormData(data);

      const total = paymentType == 'card' ? formatFloat((totalPrice - totalDiscount + fee)*1.04 + 0.4): formatFloat(totalPrice - totalDiscount + fee);
      
      const order = {
        subtotal: totalPrice - totalDiscount,
        fee: formatFloat(fee),
        total,
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
        phone: data.phone.replace(/\D/g,'').replace('9',''),
        order,
      }

      await sendEmailToGroup(json);
      await sendMessageToGroup(json);
      await sendMessageToClient(json);

      if (deliveryType == 'Entrega') {
        await sendShipping(json);
      }

      await cartItems.map((item) => updateOrderedProduct(item._id))
      onBuy();
      buyer(json.name,json.email,json.phone) // Facebook Pixel Buyer Event for SEO
      purchase(json.total, cartItems, json.shipping.type); // Facebook Pixel Purchase Event for SEO
      router.push('/comprar/sucesso');
      
    }
    catch (e) {
      console.log(e)
      setFormError(e.message)
    }
  }
  const sendEmail = async () => {
    const send = await fetch('/api/emailgroup', {
      method: 'POST',
      body: JSON.stringify({ message: 'Teste' })
    })

    console.log(send)
    // if (send.ok) {
    //   send.json().then((data) => {
    //     if (!data.success) {
    //       throw new Error(`Ocorreu um erro: ${data.error}`)
    //     } else {console.log(data)}
    //   })
    // } else {
    //   throw new Error(send.statusText);
    // }
  }

  return (
    <Container>
      <button onClick={sendEmail}>TESTE</button>
      <TitleDiv>
        <h1>Finalizar Compra</h1>
        <p>É <u>necessário</u> ter um número de celular com <u>Whatsapp</u> para concluir a compra</p>
      </TitleDiv>
      <Wrapper>
        <OrderPreview cartItems={cartItems} lastRemovedItem={lastRemovedItem} totalDiscount={totalDiscount} totalPrice={totalPrice} fee={fee} deliveryType={deliveryType} paymentType={paymentType} />
        <StyledStepper activeStep={activeStep} orientation="vertical">
            <Step>
              <br/>
              <StepLabel onClick={activeStep === 1 ? handleBack : undefined}>
                <h2>Dados Pessoais</h2>
              </StepLabel>
              <StepContent>
                  <p>Precisamos dessas informações para nos comunicarmos</p>
                  <InputBox title={'Nome*'} span={'Como devemos te chamar? (Nome completo se optar por entrega)'} error={errors.name}>
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
                  <InputBox title={'Número de Celular*'} span={'O pedido será concluído pelo Whatsapp'} error={errors.phone}>
                    <InputMask
                      id='phone'
                      type='tel'
                      mask="(99)99999-9999"
                      placeholder='ex. (61)98765-4321'
                      {...register('phone',{
                        required: '(Obrigatório)',
                        pattern: { value: /^[^_]*$/,message: '(Formato incorreto)' },
                      })}
                    />
                    
                  </InputBox>
                  <InputBox title={'Email*'} span={'Email para receber notícias e informações do pedido '} error={errors.email}>
                    <input
                      id='email'
                      type='email'
                      placeholder='ex. ruadebaixoloja@gmail.com'
                      {...register('email', {
                        required: '(Obrigatório)',
                        maxLength: { value: 30,message: '(Limite de caracteres excedido)' }
                      })}
                    />
                  </InputBox>
                  <InputBox title={'Instagram'} span={'Pra ficar por dentro da cultura da Rua de Baixo'} error={errors.insta}>
                    <input
                      id='insta'
                      type='text'
                      placeholder='ex. @ruadebaixoloja'
                      {...register('insta',{
                        maxLength: { value: 20,message: '(Limite de caracteres excedido)' }
                      })}
                    />
                  </InputBox>
                {/* </ Form> */}
              </StepContent>
            </Step>
            <Step>
              <StepLabel onClick={activeStep === 0 ? handleNext : activeStep === 2 ? handleBack : undefined}>
                <StepTitle>
                  <h2>Dados do Pedido</h2>
                  <Arrow src={'assets/icons/arrow.svg'} width={36} height={36} alt={'Voltar'} disabled={activeStep !== 1} onClick={handleBack}/>
                  <Arrow src={'assets/icons/arrow.svg'} width={36} height={36} alt={'Próxima'} disabled={activeStep !== 0} reverse/>
                </StepTitle>
              </StepLabel>
              <StepContent>
                <p>Essas informações são importantes para completar a venda</p>
                <InputBox title={'Forma de Recebimento*'} span={'Enviamos até você ou você vem até nós, você decide!'} error={errors.shipping && errors.shipping.type}>
                  <DeliveryDiv>
                    <RadioDiv>
                      <input
                        onClick={() => { setDeliveryType('Entrega'); setFee(null);}}
                        value='Entrega'
                        type='radio'
                        {...register('shipping.type',{
                          required: '(Obrigatório)'
                        })}
                      />
                      <div>
                        <h4>Entrega</h4>
                        <span>Sujeito a Taxa</span>
                      </div>
                    </RadioDiv>
                    <RadioDiv>
                      <input
                        onClick={() => { setDeliveryType('Retirada'); setFee(0); resetField('shipping.price', { defaultValue: '' }); }}
                        value='Retirada'
                        type='radio'
                        {...register('shipping.type',{
                          required: '(Obrigatório)'
                        })}
                      />
                      <div>
                        <h4>Retirada</h4>
                        <span>Frete Grátis</span>
                      </div>
                    </RadioDiv>
                  </DeliveryDiv>
                </InputBox>
                {renderDeliveryForms()}
                <InputBox title={'Forma de Pagamento*'} span={'Escolha como deseja pagar'} error={errors.payment && errors.payment}>
                  <DeliveryDiv>
                    <RadioDiv>
                      <input
                        onClick={() => setPaymentType('pix')}
                        type='radio'
                        value='PIX'
                        {...register('payment',{
                          required: '(Obrigatório)'
                        })}
                      />
                      <h4>PIX</h4>
                    </RadioDiv>
                    <RadioDiv>
                      <input
                        onClick={() => setPaymentType('card')}
                        type='radio'
                        value='Cartão de Crédito'
                        {...register('payment',{
                          required: '(Obrigatório)'
                        })}
                      />
                      <div>
                        <h4>Cartão de Crédito</h4>
                        <span>+ R${formatFloat((totalPrice - totalDiscount + fee)*0.04 + 0.4)} de taxa</span>
                      </div>
                    </RadioDiv>
                    {paymentType == 'card' && <StyledAlert variant="filled" severity="warning">
                      No momento não aceitamos parcelamento
                    </StyledAlert>}
                  </DeliveryDiv>
                </InputBox>
              </StepContent>
            </Step>
          <Step>
            <StepLabel onClick={activeStep === 1 ? handleNext : undefined}>
              <StepTitle>
                <h2>Pagamento</h2>
                <Arrow src={'assets/icons/arrow.svg'} width={36} height={36} alt={'Voltar'} disabled={activeStep !== 2} onClick={handleBack}/>
                <Arrow src={'assets/icons/arrow.svg'} width={36} height={36} alt={'Próxima'} disabled={activeStep !== 1} reverse/>
              </StepTitle>
            </StepLabel>
            <StepContent>
              {renderPayment()}
              <ErrorText>{formError}</ErrorText>
            </StepContent>
          </Step>
        </StyledStepper>
      </Wrapper>
    </Container>
  )
  
  function renderDeliveryForms() {
    switch (deliveryType) {
      case 'Entrega':
        return (
          <>
            <InputBox title={'Frete*'} span={'Insira o seu CEP para calcularmos o frete'} error={errors.shipping && [errors.shipping.cep, errors.shipping.price].filter((e) => e != undefined)[0]}>
              <CalculateDiv>
                <InputMask
                  id='cep'
                  mask="99999-999"
                  placeholder='ex. 12345-678'
                  {...register('shipping.cep',{
                    required: '(Obrigatório)',
                    pattern: { value: /^[^_]*$/, message: '(Formato incorreto)'},
                  })}
                />
                <button onClick={simulateShipping}>
                  CALCULAR
                </button>
              </CalculateDiv>
              {renderShipping ? shippingOptions.map((option) => {
              return (
                <DeliveryCard key={option.transp_nome} delivery={option}>
                  <input onClick={() => {setFee(option.vlrFrete);}} type='radio' {...register('shipping.price',{
                    required: '(Escolha uma opção de frete)'
                  })}  />
                </DeliveryCard>)
              }) : <CircularProgress color='inherit' />
              }
              {renderShipping && <ErrorText>{shippingError}</ErrorText>}
            </InputBox>
            <InputBox title={'Informações de Entrega*'} span={'Precisamos desses dados para enviarmos sua entrega'} error={errors.shipping && [errors.shipping.address,errors.shipping.district,errors.shipping.number,errors.shipping.city,errors.shipping.uf].filter((e) => e != undefined)[0]}>
              <AddressDiv>
                <input
                  id='address'
                  type='text'
                  placeholder='Endereço*'
                  {...register('shipping.address',{
                    required: '(Preencha o Endereço)',
                  })}
                />
                <input
                  id='district'
                  type='text'
                  placeholder='Bairro*'
                  {...register('shipping.district',{
                    required: '(Preencha o Bairro)',
                  })}
                />
                <input
                  id='number'
                  type='text'
                  placeholder='Número*'
                  {...register('shipping.number',{
                    required: '(Preencha o Número)',
                  })}
                />
                <input
                  id='complement'
                  type='text'
                  placeholder='Complemento'
                  {...register('shipping.complement')}
                />
                <input
                  id='city'
                  type='text'
                  placeholder='Cidade*'
                  {...register('shipping.city',{
                    required: '(Preencha a Cidade)',
                  })}
                />
                <input
                  id='uf'
                  type='text'
                  placeholder='UF*'
                  {...register('shipping.uf',{
                    required: '(Preencha a UF)',
                  })}
                />
              </AddressDiv>
            </InputBox>
            <InputBox title={'CPF*'} span={'Coloque seu CPF para mandarmos sua entrega'} error={errors.cpf}>
              <InputMask
                mask="999.999.999-99"
                placeholder='ex. 000.111.222-33'
                {...register('cpf',{
                  required: '(Obrigatório)',
                  pattern: { value: /^[^_]*$/,message: '(Formato incorreto)' }
                })}
              />
            </InputBox>
          </>
        )
      case 'Retirada':
        return (
          <InputBox title={'Local de Retirada*'} span={'Nos encontramos com frete grátis nesses locais:'} error={errors.shipping && errors.shipping.local}>
            <select defaultValue='' {...register('shipping.local',{
              required: 'Selecione uma opção',
              onChange: () => setFee(0)
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

  function renderPayment() {
    switch (paymentType) {
      case 'pix':
        return (
          <Form onSubmit={handleSubmit(onSubmitInfo)}>
            <h3>PIX</h3>
            <RowDiv>
              <Whatsapp src={'assets/icons/whatsapp-fill.svg'} alt={'Whatsapp Logo'} width={80} height={80} />
              <p>O pagamento será feito pelo Whatsapp, mandaremos uma mensagem confirmando o seu pedido! Decidiremos a entrega por lá também. Muito obrigado!</p>
            </RowDiv>
            <Button type="submit" disabled={isSubmiting}>
              {!isSubmiting ? 'CONCLUIR COMPRA' : <CircularProgress color='inherit' />}
            </Button>
          </Form>
        );
      case 'card':
        const shippingValues = getValues('shipping');
        const address = (deliveryType == 'Entrega') ? {
              city: shippingValues.city,
              country: 'BR',
              line1: shippingValues.address,
              line2: shippingValues.complement + shippingValues.number,
              postal_code: shippingValues.cep,
              state: shippingValues.uf,
            } : {
              city: 'Brasília',
              country: 'BR',
              line1: shippingValues.local,
              state: 'DF',
            }
        const cardOrder = {
          amount:  Math.round(((totalPrice - totalDiscount + fee) * 1.04 + 0.4) * 100),
          description: cartItems.map((product) => {
            return `R$${product.price - product.discount} - ${product.type} ${product.name}`;
          }).join(', '),
          shipping: {
            name: getValues('name'),
            phone: getValues('phone'),
            address
          },
          receipt_email: getValues('email'),
          statement_descriptor: `${cartItems.length} ${cartItems.length > 1 ? 'ITENS' : 'ITEM'}`,
          metadata: { order: JSON.stringify(cartItems.map((product) => {
            return {id: product.id, type: product.type, name: product.name, size: product.size, price: product.price, discount: product.discount}
          }))
         }
        }
        return (
          <div>
            {cardOrder ? 
            <>
              <h3>Cartão de Crédito</h3>
                <CardPayment order={cardOrder} onSubmitInfo={handleSubmit(onSubmitInfo)} />
            </> : <CircularProgress color='inherit' /> }
          </div>
        );
      default:
        return
    }
  }
}