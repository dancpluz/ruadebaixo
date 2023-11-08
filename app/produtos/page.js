import { Container } from '@/components/styles/CatalogPage.styled';
import { fetchCatalogProducts,countProducts, fetchFilterOptions } from '@/lib/api';
import Maintenance from '@/components/Maintenance';
import Catalog from '@/components/Catalog';
import { checkMaintenanceMode } from '@/lib/config';


export const metadata = {
  title: 'Produtos',
  description: 'Produtos da Rua de Baixo',
  openGraph: {
    description: 'Se liga nas peças mais F**** do Brasil',
  },
  alternates: {
    canonical: '/produtos',
  }
}

export const revalidate = 60;

export default async function ProdutosPage({ searchParams }) {
  if (await checkMaintenanceMode()) {
    return (<Maintenance />)
  }

  const products = await fetchCatalogProducts(searchParams, 0);
  const count = await countProducts(searchParams);
  const options = {
    productTypes: await fetchFilterOptions('type'),
    productSizes: await fetchFilterOptions('size'),
    productCategory: await fetchFilterOptions('tag'),
    productQualities: ['Usado','Novo'],
    productDrops: await fetchFilterOptions('drop')
  }

  return (
    <Container>
      <h1>Catálogo</h1>
      <Catalog products={products} count={count} options={options} searchParams={searchParams} />
    </Container>
  )
}
