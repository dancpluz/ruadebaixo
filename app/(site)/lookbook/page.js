import Photoshoots from '@/components/Photoshoots';
import { fetchPhotos } from '@/lib/api';

export const metadata = {
  title: 'LookBook',
  description: 'Fotos da Rua de Baixo',
  openGraph: {
    description: 'Veja as fotos da Rua de Baixo',
  },
}

export default async function LookBookPage() {
  // const lookbookDate = '2023-08-11'
  // const photos = await fetchLookBook(lookbookDate);
  const collections = await fetchPhotos();

  return (
    <Photoshoots collections={collections} />
  )
};
