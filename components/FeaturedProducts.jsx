import Product from "./Product";
import Center from "./Center";
import camisa1 from '../assets/overlay.png';
import camisa2 from '../assets/camisa.webp';
import styled, { keyframes } from 'styled-components';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
`;

const FeaturedWrapper = styled.div`
  margin-top: 120px;
`;

const marquee = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
`;

const FeaturedContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  overflow-x: hidden;
`;

const FeaturedProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: ${marquee} 15s linear infinite;
  animation-fill-mode: forwards;
  width: 180%;

  &:hover {
    animation-play-state: paused;
    transform: translateX(-50%);
    transition: all 0.5s ease-in-out;
  }

`;

export default function ProductList() {
  const product1 = {
    _id: 0,
    slug: 'test',
    image: camisa1,
    name: 'Camiseta Noggers',
    price: 20,
    sold: true
  };

  const product2 = {
    _id: 0,
    slug: 'test',
    image: camisa2,
    name: 'Camiseta Pog',
    price: 20,
    sold: false,
  };

  const products = [product1,product2,product1,product2]
  
  return (
    <FeaturedWrapper>
      <h2>OIEE</h2>
      <FeaturedContainer>
        <FeaturedProducts>
          {products.filter(product => product.sold).map((product) => <Product key={product._id} product={product} />)}
        </FeaturedProducts>
      </FeaturedContainer>
    </FeaturedWrapper>
  )
}
