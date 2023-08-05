import styled from 'styled-components';
import Image from 'next/image';
import plusIcon from '@/public/assets/icons/plus.svg';
import { useStateContext } from '../context/StateContext';

const ItemDiv = styled.div`
  position: relative;
  width: auto;
  display: flex;
  align-items: center;
  gap: 32px;
  color: ${({ theme }) => theme.colors.dark};
`;

const ProductImage = styled(Image)`
  width: 150px;
  height: 150px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  align-self: right;
`;

const TextDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  p {
    text-transform: capitalize;
  }
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
  p {
    text-decoration: line-through;
  }
  h2 {
    font-weight: 400;
  }
`;

const RemoveIcon = styled(Image)`
  position: absolute;
  height: 24px;
  width: 24px;
  rotate: 45deg;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const DisabledImage = styled(Image)`
  width: 150px;
  height: 150px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  align-self: right;
  filter: saturate(0);
`;

export default function CartItem({lastRemoved, product, product: { _id,images,type,name,wears,discount,price }}) {
  const { cartItems, setCartItems, setLastRemovedItem, onRemove, onUndo } = useStateContext();

  if (!lastRemoved) {
    return (
      <ItemDiv>
        <RemoveIcon src={plusIcon} alt={"Remove Icon"} onClick={() => onRemove(product)} />
        <ProductImage src={images[0]} alt={name} />
        <TextDiv>
          <p>{type}</p>
          <h4>{name}</h4>
          <p>Veste {wears}</p>
        </TextDiv>
        <PriceDiv>
          {(discount > 0) ?
            <>
              <p>R${price}</p>
              <h2>R${price - discount}</h2>
            </> :
            <h2>R${price - discount}</h2>
          }
        </PriceDiv>
      </ItemDiv>
    )
  } else {
    return (
      <ItemDiv>
        <RemoveIcon src={plusIcon} onClick={() => setLastRemovedItem(null)} />
        <DisabledImage src={images[0]} alt={'Removed'} />
        <TextDiv>
          <p>Item Removido</p>
          <h4>Deseja desfazer?</h4>
          <span onClick={onUndo}>Sim</span>
        </TextDiv>
      </ItemDiv>
    )
  }
  
}
