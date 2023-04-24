import Link from 'next/link';
import urlFor from '../lib/urlFor';
import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  text-decoration: none;
`;

const Card = styled.div`
  cursor: pointer;
`;

const Name = styled.p`
  font-weight: 800;
  color: black;
`;

const Price = styled.p`
  font-weight: 500;
  margin-top: 6px;
  color: black;
`;

export default function Product({ product: { _id,slug,image,name,price } }) {
  const [isHovering,setIsHovering] = useState(false);

  function onMouseEnter() {
    //console.log('in');
    setIsHovering(true);
  }

  function onMouseLeave() {
    //console.log('out');
    setIsHovering(false);
  } 

  return (
    <Container href={`/produto/${slug}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Card>
        <Image
          src={//urlFor(image && image[0]).url()
          image}
          alt={_id}
          width={300}
          height={300}
        />
        <Name>{name}</Name>
        <Price>R$ {price}</Price>
      </Card>
    </Container>
  );
}