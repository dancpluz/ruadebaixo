import { fetchLook, fetchMetadata, fetchStaticParams } from '@/lib/api';
import { Container } from '@/components/styles/CatalogPage.styled';
import { TitleDiv } from '@/components/BuyForm';
import LookBook from '@/components/LookBook';

export async function generateStaticParams() {
  const slugs = await fetchStaticParams('lookbook');

  return slugs.map((slug) => ({ slug }))
}

export default async function PhotosPage({ params: { slug } }) {

  const collection = await fetchLook(slug)

  //const { name, images, type, quality, drop, tag, measures, price, size, discount, details } = product;

  return (
    <Container Container >
      <LookBook collection={collection} count={5} />
    </Container >
  )
}