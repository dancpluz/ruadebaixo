'use client'

import Image from 'next/image';
import Tag from './Tag';
import Strip from './Strip';
import { StripDiv } from './styles/Strip.styled';
import { EyeIcon } from './styles/OrderedBadge.styled';
import OrderedBadge from '@/components/OrderedBadge';
import { useState } from 'react';
import styled from 'styled-components';
import { useStateContext } from '@/context/StateContext';

const CardDiv = styled.div`
  position: relative;
  cursor: pointer;
  z-index: 1;
  height: auto;
  width: 300px;
  color: ${({ theme }) => theme.colors.dark};
`;

const ImageFrame = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.grey};
  width: 300px;
  height: 400px;

  ${EyeIcon} {
    top: 50px;
    right: 20px;
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
  padding: 4px 0;
  height: 35px;
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
    height: 100%;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SoldDiv = styled.div`
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
  }
  
  ${Caption} {
    justify-content: center;
  }
`;

export default function Card({ product: { slug,images,name,price,type,drop,tag,ordered,sold } }) {
  const [isHovering,setIsHovering] = useState(false);
  const { router } = useStateContext();

  function onMouseEnter() {
    setIsHovering(true); 
  }

  function onMouseLeave() {
    setIsHovering(false);
  }

  if (sold) { return (
    <SoldDiv onClick={() => router.push(`/produtos/${slug.current}`)}>
      <Strip text={"VENDIDO - "} />
      <ImageFrame>
        <Tag tags={[type,drop]} type={'top'} />
        <Tag tags={tag} type={'bottom'} /> 
        <CardImage 
          alt={`${type}-${name}-Vendido`}
          src={images[0].url}
          height={800}
          width={600}
          placeholder={'blur'}
          blurDataURL={images[0].blur} />
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
      </Caption>
    </SoldDiv>
  )}

  return (
    <CardDiv onClick={() => router.push(`/produtos/${slug.current}`)} >
      <ImageFrame>
        <Tag tags={[type, drop]} type={'top'} />
        <Tag tags={tag} type={'bottom'} />
        {ordered && <OrderedBadge />}
        <CardImage
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fade={isHovering ? 1 : 0}
          src={images[1].url}
          alt={`${type}-${name}-Trás`}
          height={800}
          width={600}
          placeholder={'blur'}
          blurDataURL={images[1].blur}
        />
        <CardImage
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          fade={isHovering ? 0 : 1}
          src={images[0].url}
          alt={`${type}-${name}-Frente`}
          height={800}
          width={600}
          placeholder={'blur'}
          blurDataURL={images[0].blur}
        />
      </ImageFrame>
      <Caption>
        <Title>{name}</Title>
        <p>R${price}</p>
      </Caption>
    </CardDiv>
  )
}
