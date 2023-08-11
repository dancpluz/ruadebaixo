import { Container,Logo } from './Home.styled';
import logo from '@/public/assets/logonew.svg';
import { fetchLookBook } from '@/lib/api';

import Lookbook from './Lookbook';
import Navbar from './Navbar';

export const metadata = {
  title: {
    absolute: 'Rua de Baixo | 14/08/2023',
  },
  description: 'Lookbook lançamento Rua de Baixo | 14/08/2023',
  openGraph: {
    title: 'Rua de Baixo',
    description: 'Lookbook lançamento Rua de Baixo | 14/08/2023',
    siteName: 'Rua de Baixo',
    url: 'https://www.ruadebaixo.com.br/',
    type: 'website',
    locale: 'pt_BR',
    images: 'assets/og.png'
  },
}

export default async function Home() {
  const lookbookDate = '2023-08-11'
  const lookbook = await fetchLookBook(lookbookDate);

  return (
    <Container>
      <Navbar />
      <Logo priority src={logo} alt="RDB Logo" />
      <Lookbook date={lookbook.date} images={lookbook.images} />
    </Container>
  )
}
