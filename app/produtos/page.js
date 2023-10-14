import { Container,Wrapper,ProductsDiv } from '@/components/styles/CatalogPage.styled';
import { fetchCatalogProducts } from '@/lib/api';
import Maintenance from '@/components/Maintenance';
import Catalog from '@/components/Catalog';
import { checkMaintenanceMode } from '@/lib/config';


export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Encontre suas peças na Rua de Baixo',
  },
}

export const revalidate = 60;

export const dynamic = 'force-dynamic';

export default async function ProdutosPage({ searchParams }) {
  if (await checkMaintenanceMode()) {
    return (<Maintenance />)
  }

  const products = await fetchCatalogProducts(searchParams);

  return (
    <Container>
      <h1>Catálogo</h1>
      <Catalog products={products} />
    </Container>
  )
}
