'use client'

import styled from 'styled-components';
import FilterBar from '@/components/FilterBar';
import Card from '@/components/Card';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 130px 100px;
  h1 {
    text-align: center;
  }
  gap: 32px;
  @media ${({ theme }) => theme.sizes.medium} {
    //padding: 100px 100px;
  }
  @media ${({ theme }) => theme.sizes.small} {
    //padding: 100px 32px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const ProductsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  //justify-content: ${props => props.qty > 4 ?  'space-between' : 'center'};
  gap: 32px;
  flex-grow: 1;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: -32px;
`;

export default function Catalog({ products, options }) {
  const qty = products.length;

  return (
    <Wrapper>
      <FilterBar options={options} />
      <ProductsDiv qty={qty}>
        <TopDiv>
          <span>{`${qty !== 0 ? qty : 'Nenhum'} ${qty > 1 ? 'encontrados' : 'encontrado'}`}</span>
          {/* Select Order */}
        </TopDiv>
        {products.map((product) => (
            <Card key={`${product.slug.current}`} product={product} />
          ))
        }
      </ProductsDiv>
    </Wrapper>
  )
}
