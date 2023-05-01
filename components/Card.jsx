import Link from 'next/link';
import Image from 'next/image';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  z-index: 1;
  height: auto;
  width: 300px;
  text-decoration: none;
  color: black;
`;

const ImageFrame = styled.div`
  background-color: #f6f6f6;
  width: 300px;
  height: 400px;
  display: flex;
`;

const CardImage = styled(Image)`
  margin: auto;
  height: 320px;
  width: 240px;
  object-fit: contain;
`;

const TagDiv = styled.div`
  margin-top: 12px;
  margin-left: 12px;
  position: absolute;
  display: flex;
  gap: 5px;
`;

const Tag = styled(Chip)`
  z-index: 2;
  color: black;
  text-transform: capitalize;
  font-family: 'Clash Display', sans-serif;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
`;

const Caption = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 18px;
`;

export default function Card({ product: { _id,slug,images,name,price,tags } }) {
  const [isHovering,setIsHovering] = useState(false);
  const [showImage,setShowImage] = useState(images[0])

  function onMouseEnter() {
    setIsHovering(true);
    setShowImage(images[1]);
  }

  function onMouseLeave() {
    setIsHovering(false);
    setShowImage(images[0]);
  } 

  return (
    <StyledLink href={`/produtos/${slug}`}>
      <ImageFrame onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}>
        <TagDiv>
          {tags?.map((tag) => <Tag key='' label={tag} component='a' href={`/produtos/${tag}`} clickable />)}
        </TagDiv>
        <CardImage alt={slug} src={showImage}/>
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
        <Price>R${price}</Price>
      </Caption>
    </StyledLink>
  )
}
