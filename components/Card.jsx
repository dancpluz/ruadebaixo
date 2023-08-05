'use client'
 
import Link from 'next/link';
import Image from 'next/image';
import Tag from './Tag';
import  { TagDiv } from './styles/Tag.styled'
import Strip from './Strip';
import { StripDiv } from './styles/Strip.styled';
import { useState } from 'react';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  position: relative;
  z-index: 1;
  height: auto;
  width: 300px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
`;

const ImageFrame = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.grey};
  width: 300px;
  height: 400px;

  ${TagDiv} {
    padding: 12px;
  }
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
  opacity: ${ props => props.fade};
`;

const Caption = styled.div`
  margin: 8px 0;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
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
  background: ${({ theme }) => theme.colors.dark};
  transition: all .20s;
  }

  &:hover{
    color: ${({ theme }) => theme.colors.light};
    justify-content: center;
    p {
      opacity: 0;
      width: 0;
      margin: 0;
    }
  }

  &:hover:after{
    height: calc(100% + 8px);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SoldStyledLink = styled.div`
  position: relative;
  z-index: 1;
  height: auto;
  width: 300px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.dark};
  overflow: hidden;

  ${StripDiv} {
    z-index: 2;
    position: absolute;
    top: 240px;
    left: -50px;
  }

  ${CardImage} {
    filter: saturate(0);
    opacity: 0.3;
    pointer-events: none;
  }
  
  ${Caption} {
    justify-content: center;
    pointer-events: none;
  }
`;

export default function Card({ product: { slug,images,name,price,type,tags,sold } }) {
  const [isHovering,setIsHovering] = useState(false);

  function onMouseEnter() {
    setIsHovering(true);  }

  function onMouseLeave() {
    setIsHovering(false);
  }

  if (sold) { return (
    <SoldStyledLink>
      <Strip text={"VENDIDO - "} />
      <ImageFrame>
        <Tag tags={tags} marginTop={12} marginLeft={12} />
        <Tag tags={[type]} marginTop={12} marginLeft={12} />
        <CardImage alt={slug} src={images[0]} height={800} width={600} />
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
      </Caption>
    </SoldStyledLink>
  )}

  return (
    <StyledLink href={`/produtos/`} >
      <ImageFrame>
        <Tag tags={tags} />
        <Tag tags={[type]} />
        <CardImage
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fade={isHovering ? 1 : 0}
          alt={slug + " - Trás"}
          src={images[1]}
          height={800}
          width={600}
        />
        <CardImage
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fade={isHovering ? 0: 1}
          alt={slug + " - Frente"}
          src={images[0]}
          height={800}
          width={600}
        />
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
        <p>R${price}</p>
      </Caption>
    </StyledLink>
  )
}
