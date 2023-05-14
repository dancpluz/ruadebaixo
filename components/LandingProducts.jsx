import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Card from './Card';
import camisa1 from '../assets/overlay.png';
import camisa2 from '../assets/camisa.webp';
import arrowIcon from '../assets/arrow.svg';

const Container = styled.div`
  margin: 0 350px;
  margin-bottom: 100px;
`;

const Flexbox = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 30px 90px;
`;

const ButtonLink = styled(Link)`
  margin-left: auto;
  margin-top: 50px;
  height: 60px;
  width: 250px;
  display: flex;
  background-color: white;
  color: black;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  gap: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all .10s ease;
  position: relative;

  img, p{
    position: relative;
    z-index: 2;
    transition: all .10s;
  }

  &:after{
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #000000;
    transition: all .20s;
  }

  &:hover{
    color: #fff;
    img{
      filter: invert(1);
    }
  }

  &:hover:after{
    width: 100%;
  }

`;

const Text = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const Arrow = styled(Image)`
  
`;

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
  const products = [product1,product1,product1,product1,product1,product1,product1]

  return (
    <Container>
      <Flexbox>
        {products.filter((product) => !product.sold).slice(-6).map((product) => <Card product={product} key={product.slug} />)}
      </Flexbox>
      <ButtonLink href={'/produtos'}>
        <Text>VEJA MAIS</Text>
        <Arrow src={arrowIcon}/>
      </ButtonLink>
    </Container>
  )
}
