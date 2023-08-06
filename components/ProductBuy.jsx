'use client'
import AddIcon from '@/public/assets/icons/addcart.svg';
import Image from 'next/image'
import styled from 'styled-components';

const BuyDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const BuyButton = styled.button`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  text-decoration: none;

  &:hover{
    color: ${({ theme }) => theme.colors.dark};
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

const AddButton = styled.button`
  aspect-ratio: 1;
  height: 60px;
  background-color: white;
  color: black;
  font-size: 18px;
  border: 1px solid black;
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  transition: all .10s;

  &:hover{
    img{
      filter: invert(1);
    }
    background-color: black;
    color: white;
  }
`;

const Box = styled(Image)`
  width: 80%;
  height: 80%;
`;

export default function ProductBuy() {
  return (
    <BuyDiv>
      <BuyButton onClick={() => ''}>Poggers</BuyButton>
      <BuyButton onClick={() => '() => onAdd(product,true)'}>
        COMPRAR
      </BuyButton>
      <AddButton onClick={() => '() => onAdd(product,false)'}>
        <Box alt={'Ícone Adicionar ao Carrinho'} src={AddIcon} />
      </AddButton>
    </BuyDiv>
  );
}
  
  