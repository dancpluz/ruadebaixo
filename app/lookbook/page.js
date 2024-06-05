import { Container } from '@/components/styles/CatalogPage.styled';
import { TitleDiv } from '@/components/BuyForm';
import Magazine from '@/components/Magazine';
import { fetchLookBook } from '@/lib/api';

export const metadata = {
  title: 'LookBook',
  description: 'Fotos da Rua de Baixo',
  alternates: {
    canonical: '/lookbook',
  },
}

export default async function LookBookPage() {
  const lookbooks = await fetchLookBook();
  
  return (
    <Container>
      <TitleDiv>
        <h1>LookBook</h1>
        <p>Bem vindo à coleção de fotos da Rua de Baixo</p>
      </TitleDiv>
      <Magazine lookbooks={lookbooks} />
    </Container>
  )
}
