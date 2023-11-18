import { Container } from '@/components/styles/CatalogPage.styled';
import { fetchCatalogProducts,countProducts, fetchFilterOptions } from '@/lib/api';
import Maintenance from '@/components/Maintenance';
import Catalog from '@/components/Catalog';
import { checkMaintenanceMode } from '@/lib/config';


export const metadata = {
  title: 'Produtos',
  description: 'Bem-vindo à nossa galeria de estilo na Rua de Baixo! Cada peça aqui conta uma história, uma jornada pela moda urbana autêntica e inovadora. Navegue por nossa seleção cuidadosamente curada de roupas vintage e streetwear contemporâneo. Cada item é escolhido a dedo, refletindo nossa paixão pelo estilo das ruas. Desde roupas clássicas até os lançamentos mais recentes, nossa coleção oferece uma gama diversificada para todos os gostos. Encontre sua próxima peça favorita e faça parte do movimento urbano com Rua de Baixo. Vista-se com personalidade, vista-se com história.',
  openGraph: {
    description: 'Se liga nas peças mais F**** do Brasil',
  },
  alternates: {
    canonical: '/produtos',
  },
  robots: {
    index: true,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: false,
    },
  },
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

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
