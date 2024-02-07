import { Container, Flexbox, ButtonLink, Text, Arrow } from './styles/LandingProducts.styled';
import Card from './Card';
import { fetchLandingProducts } from '@/lib/api.js';

export default async function LandingProducts({ title }) {
  const products = await fetchLandingProducts();

  return (
    <Container>
      <h1>{title}</h1>
      <Flexbox>
      {products.map((product) => <Card key={`${product.slug.current}`} product={product} />)}
      </Flexbox>
      <ButtonLink href={'/produtos'}>
        <Text>MAIS PRODUTOS</Text>
        <Arrow src={'/assets/icons/arrow.svg'} width={36} height={36} alt={'Ícone de Seta para direita'}/>
      </ButtonLink>
    </Container>
  )
}

