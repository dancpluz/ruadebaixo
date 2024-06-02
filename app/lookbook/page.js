import { Container } from '@/components/styles/CatalogPage.styled';
import { TitleDiv } from '@/components/BuyForm';
import LookBook from '@/components/LookBook';
import { fetchLookBook, countLookBook } from '@/lib/api';

export const metadata = {
  title: 'LookBook',
  description: 'Fotos da Rua de Baixo',
  alternates: {
    canonical: '/lookbook',
  },
}

export default async function LookBookPage() {
  const collection = await fetchLookBook();
  const count = await countLookBook()

  return (
    <Container>
      <TitleDiv>
        <h1>LookBook</h1>
        <p>Bem vindo à coleção de fotos da Rua de Baixo</p>
      </TitleDiv>
      <LookBook collection={collection} count={count} />
    </Container>
  )
}
