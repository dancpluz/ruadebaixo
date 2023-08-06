'use client'

import AddIcon from '@/public/assets/icons/addcart.svg';
import Image from 'next/image'
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { sendDataToServer } from '@/lib/api';

const BuyDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const BuyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  &:hover{
    color: ${({ theme }) => theme.colors.dark};
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

const AddButton = styled.button`
  aspect-ratio: 1;
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  align-items: center;
  transition: all .10s;

  &:hover{
    img{
      filter: invert(1);
    }
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
  }
`;

const Box = styled(Image)`
  width: 80%;
  height: 80%;
`;

export default function ProductBuy({ product }) {
  const { onAdd } = useStateContext();

  return (
    <BuyDiv>
      <BuyButton onClick={sendDataToServer}>Poggers</BuyButton>
      <BuyButton onClick={() => onAdd(product,true)}>
        COMPRAR
      </BuyButton>
      <AddButton onClick={() => onAdd(product,false)}>
        <Box alt={'Ícone Adicionar ao Carrinho'} src={AddIcon} />
      </AddButton>
    </BuyDiv>
  );
}
  
  