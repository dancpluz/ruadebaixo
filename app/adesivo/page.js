'use client'

import styled from 'styled-components';
import Image from 'next/image'
import Niver1 from '@/public/assets/Niver1.webp';
import Niver2 from '@/public/assets/Niver2.webp';
import Niver3 from '@/public/assets/Niver3.webp';
import Niver4 from '@/public/assets/Niver4.webp';
import Niver5 from '@/public/assets/Niver5.webp';
import InputBox from '@/components/InputBox';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/Cart';
import { useState,useEffect } from 'react';

// export const metadata = {
//   title: 'Aniversário Rua de Baixo',
//   description: 'Comemorando 1 ano de Rua de Baixo, trazemos uma competição de adesivos com prêmio para os 3 primeiros colocados. São 300 reais em prêmios, participe!',
//   openGraph: {
//     description: '1 Ano de Rua de Baixo',
//   },
//   alternates: {
//       canonical: '/adesivo',
//   },
// }

const Container = styled.div`
  display: flex;
  gap: 10px;
  min-height: 79vh;
  padding-top: 65px;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 700px;
  width: 100%;
  gap: 32px;
  padding: 32px;

  form {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
  }

  span {
    font-size: 24px;
  }
`;

const ImageDiv = styled.div`
  position: relative;
  aspect-ratio: 1;
`;

export default function Adesivo() {
  const { register,handleSubmit,formState: { errors } } = useForm();
  const [formResult,setFormResult] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://hub.ruadebaixo.com.br:3000/client/sendMessage/ruadebaixo/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ZAP_API_TOKEN
        },
        body: JSON.stringify({
          chatId: '120363303372334067@g.us',
          contentType: "string",
          content: data
        }),
      })

      const datat = await res.json();
      console.log(datat)
      setFormResult(`Obrigado ${data.name}! Vamos mandar mensagem quando começar.`)
    } catch (error) {
      setFormResult('Ocorreu um erro inesperado')
      console.log(error)
    }
    
  };

  return (
    <Container>
      <Wrapper>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Inscrições Não Começaram</h2>
            <p>Preencha suas informações para ficar sabendo quando vai começar</p>
          </div>
          <InputBox title={'Seu Nome'} span={'Como devemos te chamar?'} error={errors.name}>
              <input
                id='name'
                type='text'
                placeholder='ex. Guigão'
                {...register('name',{
                  required: '(Obrigatório)',
                  maxLength: { value: 40,message: '(Limite de caracteres excedido)' }
                })}
              />
            </InputBox>
          <InputBox title={'Seu Número de Celular'} span={'Enviaremos mensagem para você quando começarmos a competição'} error={errors.phone}>
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
          <Button>
            EU QUERO SABER
          </Button>
          <span>
            {formResult}
          </span>
        </form> */}
        <ImageDiv>
          <Image src={Niver1} fill />
        </ImageDiv>
        <ImageDiv>
          <Image src={Niver2} fill />
        </ImageDiv>
        <ImageDiv>
          <Image src={Niver3} fill />
        </ImageDiv>
        <ImageDiv>
          <Image src={Niver4} fill />
        </ImageDiv>
        <ImageDiv>
          <Image src={Niver5} fill />
        </ImageDiv>
        <div>
          <h2>Inscrições Abrem Dia 14/08</h2>
          <p>Fica ligado nas nossas redes sociais que vamos avisar em breve</p>
        </div>
      </Wrapper>
    </Container>
  )
}
