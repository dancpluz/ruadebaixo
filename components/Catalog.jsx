'use client'

import { useSearchParams } from 'next/navigation';
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

export const Wrapper = styled.div`
  display: flex;
  
  gap: 32px;
`;

export const ProductsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  flex-grow: 1;
`


export default function Catalog() {
  const params = useSearchParams();

  return (
    <Wrapper>
      <FilterBar />
      <ProductsDiv>
        {params}
        {/* {products ? (
          products.map((product) => (
            <Card key={`${product.slug.current}`} product={product} />
          ))
        ) : <p>Sem Produtos</p>} */}
      </ProductsDiv>
    </Wrapper>
  )
}
