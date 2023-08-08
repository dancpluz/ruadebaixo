'use client'

import styled from 'styled-components';
import FilterBar from '@/components/FilterBar'

// export const metadata = {
//   title: 'Produtos',
//   description: 'Produtos da Rua de Baixo',
//   openGraph: {
//     description: 'Encontre suas peças ideias na Rua de Baixo',
//   },
// }

const Container = styled.div`
  padding: 20px 70px;
  h1 {
    text-align: center;
  }
`;

export default function Produtos() {
  return (
    <Container>
      <h1>Catálogo</h1>
      <></>
      <FilterBar />
    </Container>

  )
}
