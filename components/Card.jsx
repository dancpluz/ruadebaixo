import Image from 'next/image';
import mainImage from '../assets/product1.png';
import styled from 'styled-components';

const StyledCard = styled.div`
  height: auto;
  width: 300px;
`;

const ImageFrame = styled.div`
  background-color: #f6f6f6;
  width: auto;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled(Image)`
  height: 320px;
  width: 240px;
  object-fit: cover;
`;

const Caption = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 18px;
`;

export default function Card({ product: { _id,slug,images,name,price } }) {
  return (
    <StyledCard>
      <ImageFrame>
        <CardImage alt='' src={mainImage}/>
      </ImageFrame>
      <Caption>
        <Title>Jacket, Stüssy and Salomon</Title>
        <Price>R$45</Price>
      </Caption>
      <hr />
    </StyledCard>
  )
}
