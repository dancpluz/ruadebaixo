//import FilterBar from '@/components/FilterBar';
import Card from '@/components/Card';
import { Container,Wrapper,ProductsDiv } from '@/components/styles/CatalogPage.styled';
import { fetchCatalogProducts } from '@/lib/api';

export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Encontre suas peças na Rua de Baixo',
  },
}

export default async function ProdutosPage() {
  const products = await fetchCatalogProducts(1);

  return (
    <Container>
      <h1>Catálogo</h1>
      <Wrapper>
        {/* <FilterBar /> */}
        <ProductsDiv>
          {products ? (
            products.map((product) => (
              <Card key={product.slug.current} product={product} />
            ))
          ) : "POGGERS"}
        </ProductsDiv>
      </Wrapper>
    </Container>
  )
}
