'use client'

import styled from 'styled-components';
import FilterBar from '@/components/FilterBar';
import Card from '@/components/Card';
import { useState } from 'react';
import { HamburgerIcon} from '@/components/Header';

// export const Container = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   padding: 130px 200px;
//   h1 {
//     text-align: center;
//   }
//   gap: 32px;
// `;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const ProductsDiv = styled.div`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: -32px;
`;

const HamburgerContainer = styled.div`
  position: absolute;
  top: 130px;
  width: 48px;
  height: 48px;
`;

export default function Catalog({ products, options }) {
  const qty = products.length;
  const [showFilterBar,setShowFilterBar] = useState(true);

  return (
    <Wrapper>
      <HamburgerContainer>
        <HamburgerIcon onClick={() => setShowFilterBar((current) => !current)} src={'assets/icons/filter.svg'} width={48} height={48} alt='Mostrar filtros' />
      </HamburgerContainer>
      <FilterBar show={showFilterBar} options={options} />
      <ProductsDiv show={showFilterBar} qty={qty}>
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
