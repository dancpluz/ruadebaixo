'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import { useState } from 'react';

const Container = styled.div`
  padding-top: 95px;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
  min-height: 80vh;
  margin: 0 32px;
`;

const StyledImage = styled(Image)`
  position: ${({ show }) => show == 'true' ? 'relative' : 'absolute'};
  width: ${({ show }) => show == 'true' ? '100%' : '0'};
  height: auto;
  object-fit: contain;
  max-width: 800px;
  max-height: 600px;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ show }) => show == 'true' ? 1 : 0};
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
                show={i === imageIndex ? 'true' : 'false'}
              />
          ))  
          }
        </ImagesDiv>
      </div>
      <ChevronDiv>
        <ChevronLeft onClick={PrevImage} src={'/assets/icons/chevron.svg'} alt={'Anterior'} width={42} height={42} />
        <ChevronRight onClick={NextImage} src={'/assets/icons/chevron.svg'} alt={'Próximo'} width={42} height={42} />
      </ChevronDiv>
    </Container>
  )
}
