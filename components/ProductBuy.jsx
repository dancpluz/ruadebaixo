'use client'

import Image from 'next/image'
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';
import { addcart } from '@/lib/fpixel';

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

const NegotiateButton = styled.button`
  aspect-ratio: 1;
  height: 60px;
  width: 60px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  align-items: center;
  transition: all .10s;

  &:hover{
    img{
      filter: invert(1);
    }
    background-color: ${({ theme }) => theme.colors.dark};
  }
`;

const Icon = styled(Image)`
  width: 80%;
  height: 80%;
`;

export default function ProductBuy({ product }) {
  const { onAdd } = useStateContext();

  function handleButton(product,type) {
    switch (type) {
      case 'buy':
        onAdd(product,true);
        addcart(product);
        break;
      case 'add':
        onAdd(product,false);
        addcart(product);
        break;
      case 'negotiate':
        // WIP
      default:
        return null;
    }
  }

  return (
    <BuyDiv>
      { product.sold ? 
      <BuyButton>
        VENDIDO
      </BuyButton>
       :
      <BuyButton onClick={() => handleButton(product,'buy')}>
        COMPRAR
      </BuyButton>
      }
      {/* <NegotiateButton onClick={() => ''}>
        <Icon alt={'Ícone Negociar Preço'} src={'/assets/icons/moneyspeech.svg'} width={60} height={60} />
      </NegotiateButton> */}
      {!product.sold && <AddButton onClick={() => handleButton(product,'add')}>
        <Icon alt={'Ícone Adicionar ao Carrinho'} src={'/assets/icons/addcart.svg'} width={60} height={60} />
      </AddButton>}
    </BuyDiv>
  );
}
  
  