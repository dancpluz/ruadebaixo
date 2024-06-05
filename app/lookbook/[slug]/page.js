import { fetchLookBookInfo,fetchStaticParams,fetchLookbookImages,countLookBook } from '@/lib/api';
import { Container } from '@/components/styles/CatalogPage.styled';
import LookBook from '@/components/LookBook';

export async function generateStaticParams() {
  const slugs = await fetchStaticParams('lookbook');

  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export default async function PhotosPage({ params: { slug } }) {
  const collection = await fetchLookBookInfo(slug)
  const images = await fetchLookbookImages(slug,0)
  const count = await countLookBook(slug)

  return (
    <Container >
      <LookBook collection={{...collection, images}} count={count} />
    </Container >
  )
}