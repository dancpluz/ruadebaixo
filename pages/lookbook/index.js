import styled from 'styled-components';
import images from '../../assets/photos/index.js';
import Image from 'next/image';
import { useState } from 'react';

const BigImageDiv = styled.div`
  position: fixed;
  display: ${props => props.showOverlay ? 'none' : 'block'};
  background-color: black;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  cursor: pointer;
`;

const BigImage = styled(Image)`
  z-index: 3;
  max-height: 800px;
  height: auto;
  width: 800px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  object-fit: contain;
  opacity: 1;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 80px 10vw;
  gap: 20px;
`;

const PhotoDiv = styled.div`
  height: auto;
  flex-grow: 1;
  flex-basis: 0;
`;

const Photo = styled(Image)`
  width: auto;
  height: 240px;
  object-fit: contain;
  cursor: pointer;
  transition: all .20s ease;

  &:hover {
    filter: drop-shadow(0px 7px 29px rgba(100, 100, 111, 0.2));
    transform: scale(1.05);
  }
`;

export default function LookBook() {  

  const [bigImage, setBigImage] = useState('')

  function handleClick(image) {
    setBigImage(image);
  }

  return (
    <>
      <BigImageDiv onClick={() => handleClick('')} showOverlay={bigImage === ''}/>
      <BigImage src={bigImage} onClick={() => handleClick('')} />
        <Gallery>
          {images.map((image) => (
            <PhotoDiv key=''>
              <Photo key='' src={image} onClick={() => handleClick(image)} />
            </PhotoDiv>
          ))}
        </Gallery>
    </>
  )
}
