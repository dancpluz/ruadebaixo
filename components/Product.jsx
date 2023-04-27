import Link from 'next/link';
import urlFor from '../lib/urlFor';
import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';

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

export default function Product({ product: { _id,slug,images,name,price } }) {
  const [isHovering,setIsHovering] = useState(false);
  const [showImage, setShowImage] = useState(images[0])

  function onMouseEnter() {
    setIsHovering(true);
    setShowImage(images[1]);
  }

  function onMouseLeave() {
    setIsHovering(false);
    setShowImage(images[0]);
  } 

  return (
    <Card onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Image
        src={//urlFor(image && image[0]).url()
        showImage}
        alt={_id}
        width={300}
        height={300}
      />
      <Name>{name}</Name>
      <Price>R$ {price}</Price>
    </Card>
  );
}