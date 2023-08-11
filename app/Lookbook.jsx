'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

const StyledImage = styled(Image)`
  position: ${({ show }) => show ? 'relative' : 'absolute'};
  width: ${({ show }) => show ? '100%' : '0'};
  height: auto;
  object-fit: contain;
  max-width: 800px;
  max-height: 600px;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ show }) => show ? 1 : 0};
`;

const ImagesDiv = styled.div`
  position: relative;
  flex-grow: 1;
`;

const HeaderDiv = styled.div`
  display: grid;
  grid-template-columns: .5fr 1fr .5fr;
  border-bottom: 1px black solid;
  padding-bottom: 8px;
  margin-bottom: 16px;
  p {
    width: auto;
    text-align: center;
    &:first-child {
      text-align: start;
    }
    &:last-child {
      text-align: end;
    }
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    p {
      &:first-child {
        grid-row: 1 / 2;
      }
      &:nth-child(2) {
        grid-row: 2 / 3;
        text-align: start;
      }
      &:last-child {
        grid-row: 1 / 3;
        text-align: center;
        align-self: center;
      }
    }
  }
`;

const ChevronDiv = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: end;
  gap: 180px;
`;

const ChevronLeft = styled(Image)`
  cursor: pointer;
`;

const ChevronRight = styled(Image)`
  cursor: pointer;
  transform: rotate(180deg);
`;

export default function Lookbook({ images, date }) {
  const [imageIndex, setImageIndex] = useState(0);
  const length = images.length;

  function nextIndex() {
    return imageIndex === length - 1 ? 0 : imageIndex + 1;
  }

  function prevIndex() {
    return imageIndex === 0 ? length - 1 : imageIndex - 1;
  }

  const NextImage = () => {
    setImageIndex(nextIndex());
  };

  const PrevImage = () => {
    setImageIndex(prevIndex());
  };

  

  return (
    <Container>
      <div>
        <HeaderDiv>
          <p>DROP</p>
          <p>Valendo uma Coca</p>
          <p>{formatDate(date)}</p>
        </HeaderDiv>
        <ImagesDiv>
          {images.map((image, i) => (
            
              <StyledImage
                key={i}
                src={image.url}
                alt={`Lookbook-IMG-${i}`}
                width={image.width}
                height={image.height}
                placeholder={'blur'}
                blurDataURL={image.blur}
                show={i === imageIndex}
              />
          ))  
          }
        </ImagesDiv>
        {/* <StyledImage
          key={imageIndex}
          src={images[imageIndex].url}
          alt={`Lookbook-IMG-${imageIndex}`}
          width={images[imageIndex].width}
          height={images[imageIndex].height}
          placeholder={'blur'}
          blurDataURL={images[imageIndex].blur}
        />
        <StyledImage
          key={imageIndex}
          src={images[imageIndex].url}
          alt={`Lookbook-IMG-${imageIndex}`}
          width={images[imageIndex].width}
          height={images[imageIndex].height}
          placeholder={'blur'}
          blurDataURL={images[imageIndex].blur}
         />
        <StyledImage
          key={imageIndex}
          src={images[imageIndex].url}
          alt={`Lookbook-IMG-${imageIndex}`}
          width={images[imageIndex].width}
          height={images[imageIndex].height}
          placeholder={'blur'}
          blurDataURL={images[imageIndex].blur}
        /> */}
      </div>

      <span>Produtos disponíveis dia 14/08/2023</span>
      <ChevronDiv>
        
        <ChevronLeft onClick={PrevImage} src={'/assets/chevron.svg'} alt={'Anterior'} width={42} height={42} />
        <ChevronRight onClick={NextImage} src={'/assets/chevron.svg'} alt={'Próximo'} width={42} height={42} />
      </ChevronDiv>
    </Container>
  )
}
