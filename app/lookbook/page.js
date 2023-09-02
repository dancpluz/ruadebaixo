//import Photoshoots from '@/components/Photoshoots';
import Lookbook from '@/components/Lookbook';
import { fetchLookBook } from '@/lib/api';
import { lookbookDate } from '@/lib/config';

export const metadata = {
  title: 'LookBook',
  description: 'Fotos da Rua de Baixo',
  openGraph: {
    description: 'Veja as fotos da Rua de Baixo',
  },
}

export const revalidate = 60;

export default async function LookBookPage() {
  const lookbook = await fetchLookBook(lookbookDate);
  // const collections = await fetchPhotos();

  return (
    // <Photoshoots collections={collections} />
    <Lookbook date={lookbook.date} images={lookbook.images} />
  )
};
