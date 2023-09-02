//import FilterBar from '@/components/FilterBar';
import Card from '@/components/Card';
import { Container,Wrapper,ProductsDiv } from '@/components/styles/CatalogPage.styled';
import { fetchCatalogProducts } from '@/lib/api';
import Maintenance from '@/components/Maintenance';
import { maintenanceMode } from '@/lib/config';

export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Encontre suas peças na Rua de Baixo',
  },
}

export const revalidate = 60;

export default async function ProdutosPage() {
  const products = await fetchCatalogProducts();

  if (maintenanceMode) {
    return (<Maintenance />)
  }

  return (
    <Container>
      <h1>Catálogo</h1>
      <Wrapper>
        {/* <FilterBar /> */}
        <ProductsDiv>
          {products ? (
            products.map((product) => (
              <Card key={`${product.slug.current}`} product={product} />
            ))
          ) : <p>Sem Produtos</p>}
        </ProductsDiv>
      </Wrapper>
    </Container>
  )
}
