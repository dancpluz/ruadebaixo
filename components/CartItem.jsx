import styled from 'styled-components';
import Image from 'next/image';
import plusIcon from '../public/assets/plus.svg';
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
  h2, h3, p {
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1rem;
    margin: 0;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
    margin: 0;
  }
  p {
    text-decoration: underline;
    cursor: pointer;
  }
  
`;

const PriceDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: end;
  h1 {
    font-weight: 500;
    font-size: 36px;
    margin: 0;
  }
  p {
    font-weight: 500;
    font-size: 20px;
    margin: 0;
    text-decoration: line-through;
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
        <RemoveIcon src={plusIcon} onClick={() => onRemove(product)} />
        <ProductImage src={images[0]} />
        <TextDiv>
          <h2>{type}</h2>
          <h1>{name}</h1>
          <h3>Veste {wears}</h3>
        </TextDiv>
        <PriceDiv>
          {(discount > 0) ?
            <>
              <p>R${price}</p>
              <h1>R${price - discount}</h1>
            </> :
            <h1>R${price - discount}</h1>
          }
        </PriceDiv>
      </ItemDiv>
    )
  } else {
    return (
      <ItemDiv>
        <RemoveIcon src={plusIcon} onClick={() => setLastRemovedItem(null)} />
        <DisabledImage src={images[0]} />
        <TextDiv>
          <h2>Item Removido</h2>
          <h1>Deseja desfazer?</h1>
          <p onClick={onUndo}>Sim</p>
        </TextDiv>
      </ItemDiv>
    )
  }
  
}
