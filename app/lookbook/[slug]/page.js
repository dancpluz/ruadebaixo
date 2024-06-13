import { fetchLookBookInfo,fetchStaticParams,fetchLookbookImages,countLookBook,fetchLookBookMetadata } from '@/lib/api';
import { Container } from '@/components/styles/CatalogPage.styled';
import Lookbook from '@/components/Lookbook';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params: { slug } }) {
  const lookbook = await fetchLookBookMetadata(slug);
 
  if (!lookbook) {
    redirect('/404')
  }

  const { name,cover } = lookbook;

  return {
    title: `${name}`,
    description: `Veja o que a Rua de Baixo tem a oferecer com a coleção ${name}!`,
    keywords: [`${name}`, 'coleção', 'photoshoot', `fotos ${name}`, `lookbook ${name}`],
    openGraph: {
      title: `${name}`,
      description: `Veja o que a Rua de Baixo tem a oferecer com a coleção ${name}!`,
      images: cover,
    },
    alternates: {
      canonical: `/lookbook/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
      },
    },
  }
}

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
      <Lookbook collection={{...collection, images}} count={count} />
    </Container >
  )
}