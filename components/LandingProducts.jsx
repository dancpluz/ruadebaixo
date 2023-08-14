import { Container, Flexbox, ButtonLink, Text, Arrow } from './styles/LandingProducts.styled';
import Card from './Card';
import arrowIcon from '@/public/assets/icons/arrow.svg';
import { fetchLandingProducts } from '@/lib/api.js';

export default async function LandingProducts() {
  const products = await fetchLandingProducts();

  return (
    <Container>
      <h1>Valendo uma Coca</h1>
        <Flexbox>
        {products.map((product) => <Card key={product.slug.current} product={product} />)}
        </Flexbox>
      <ButtonLink href={'/produtos'}>
        <Text>VEJA MAIS</Text>
        <Arrow src={arrowIcon} alt={'Ícone flecha'}/>
      </ButtonLink>
    </Container>
  )
}

