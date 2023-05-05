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
  position: relative;
  background-color: #f6f6f6;
  width: 300px;
  height: 400px;
  display: flex;
`;

const CardImage = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 320px;
  width: 240px;
  object-fit: contain;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ fade }) => fade ? 0 : 1};
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
  transition: all .20s ease;


  &:hover{
    background-color: black;
    color: white;
  }
`;

const Caption = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  transition: all .10s ease;
  position: relative;

  h2, p{
    position: relative;
    z-index: 2;
    margin: 0 8px;
  }

  &:after{
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: #000000;
  transition: all .20s;
  }

  &:hover{
    color: #fff;
    h2, p{
      margin: 0 8px;
      transition: all .20s ease;
    }
  }

  &:hover:after{
    height: calc(100% + 8px);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Price = styled.p`
  font-size: 18px;
`;

export default function Card({ product: { _id,slug,images,name,price,tags,sold } }) {
  const [isHovering,setIsHovering] = useState(false);

  function onMouseEnter() {
    setIsHovering(true);  }

  function onMouseLeave() {
    setIsHovering(false);
  } 

  return (
    <StyledLink href={`/produto/${slug}`}>
      <ImageFrame>
        <TagDiv>
          {tags?.map((tag, n) => 
          <Link key={n} href={`/produtos/${tag}`}>
            <Tag key={n} label={tag} clickable />
          </Link>)}
        </TagDiv>
        <CardImage onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave} fade={!isHovering} alt={slug} src={images[1]}/>
        <CardImage onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave} fade={isHovering} alt={slug} src={images[0]} />
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
        <Price>R${price}</Price>
      </Caption>
    </StyledLink>
  )
}
