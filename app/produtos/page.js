import FilterBar from '@/components/FilterBar'
import { Container } from '@/components/styles/CatalogPage.styled';

export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Encontre suas peças na Rua de Baixo',
  },
}

export default function Produtos() {
  return (
    <Container>
      <h1>Catálogo</h1>
      <FilterBar />
    </Container>
  )
}
