'use client'

import styled from 'styled-components';
import FilterBar from '@/components/FilterBar'

export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Encontre suas peças ideias na Rua de Baixo',
  },
}

const Container = styled.div`
  margin: 0 70px;
`;

const Title = styled.h1`
  padding: 40px 0;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`;

export default function Produtos() {
  return (
    <Container>
      <Title>Catálogo</Title>
      <></>
      <FilterBar />
    </Container>

  )
}
