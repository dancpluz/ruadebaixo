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
  @media ${({theme}) => theme.sizes.small} {
    gap: 16px;
    height: 100px;
    aspect-ratio: 1;
  }
`;

const ProductImage = styled(Image)`
  width: 150px;
  height: 150px;
  aspect-ratio: 1;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  align-self: right;
  @media ${({theme}) => theme.sizes.small} {
    width: 100px;
    height: 100px;
  }
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
  span {
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
  opacity: 0.7;
  @media ${({ theme }) => theme.sizes.small} {
    width: 100px;
    height: 100px;
  }
`;

export default function CartItem({lastRemoved, product, product: { images,type,name,size,discount,price }}) {
  const { setLastRemovedItem, onRemove, onUndo } = useStateContext();

  if (!lastRemoved) {
    return (
      <ItemDiv>
        {type != 'Adesivo' && <RemoveIcon src={plusIcon} alt={"X"} onClick={() => onRemove(product)} />}
        <ProductImage 
          src={images[0].url}
          alt={`Produto-${name}`}
          width={300}
          height={400}
          placeholder={'blur'}
          blurDataURL={images[0].blur}/>
        <TextDiv>
          <p>{type}</p>
          <h4>{name}</h4>
          <p>Tamanho {size}</p>
        </TextDiv>
        <PriceDiv>
          {(discount > 0) ?
            <>
              <span>R${price}</span>
              <h2>R${price - discount}</h2>
            </> :
            (price - discount) > 0 ? 
            <h2>R${price - discount}</h2> :
            <h2>Grátis</h2>
          }
        </PriceDiv>
      </ItemDiv>
    )
  } else {
    return (
      <ItemDiv>
        <RemoveIcon src={plusIcon} alt={"X"} onClick={() => setLastRemovedItem(null)} />
        <DisabledImage
          src={images[0].url}
          alt={`Produto-Removido-${name}`}
          width={300}
          height={400}
          placeholder={'blur'}
          blurDataURL={images[0].blur}/>
        <TextDiv>
          <p>Item Removido</p>
          <h4>Deseja desfazer?</h4>
          <span onClick={onUndo}>Sim</span>
        </TextDiv>
      </ItemDiv>
    )
  }
  
}
