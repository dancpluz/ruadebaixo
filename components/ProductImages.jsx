'use client'

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ImagesDiv = styled.div`
  display: flex;
`;

const MainImage = styled(Image)`
  background-color: ${({ theme }) => theme.colors.grey};
  width: 400px;
  height: 400px;
  object-fit: contain;
`;

const PreviewImagesWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  height: 400px;
  flex-direction: column;
  gap: 11px;
  overflow: auto;
`;

const PreviewImage = styled(Image)`
  width: 92px;
  height: 92px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.grey};
  border: ${({ theme }) => theme.colors.dark} solid ${props => props.selected ? 1 : 0}px;
  box-sizing: border-box;
`;

  
export default function ProductImages({ images, name }) {
    const [imageIndex,setImageIndex] = useState(0);

    function selectImage(index) {
      setImageIndex(index);
    }

    return (
    <ImagesDiv>
        <MainImage src={images[imageIndex]} alt={`Imagem-Principal-${name}`} height={400} width={400} />
        <PreviewImagesWrapper>
          {images.map((image, n) => 
          <PreviewImage
            onClick={() => selectImage(n)}
            selected={imageIndex == n}
            alt={`Imagem-${name}-${n}`}
            key={`Imagem-${name}-${n}`}
            height={600}
            width={800}
            src={image}
          />
          )}
        </PreviewImagesWrapper>
      </ImagesDiv>
    );
    }
  
  