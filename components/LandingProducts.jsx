import { Container, Flexbox, ButtonLink, Text, Arrow } from './LandingProducts.styled';
import Card from './Card';
import camisa1 from '../assets/overlay.png';
import camisa2 from '../assets/camisa.webp';
import arrowIcon from '../assets/arrow.svg';


export default function LandingProducts() {
  const product1 = {
    _id: 0,
    slug: 'test',
    images: [camisa1,camisa2],
    name: 'Camiseta Taguatinga-DF Poggers',
    price: 20,
    tags: ['internacional', 'vintage'],
    sold: false
  };

  const product2 = {
    _id: 1,
    slug: 'test2',
    images: [camisa2,camisa1],
    name: 'Noggers',
    price: 50,
    tags: ['vintage', 'poggers', 'customizado'],
    sold: false
  };

  const products = [product1,product2,product1,product1,product2,product2,product1]

  return (
    <Container>
      <Flexbox>
        {products.slice(-6).map((product) => <Card product={product} key={product.slug} />)}
      </Flexbox>
      <ButtonLink href={'/produtos'}>
        <Text>VEJA MAIS</Text>
        <Arrow src={arrowIcon}/>
      </ButtonLink>
    </Container>
  )
}
