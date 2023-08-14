'use client'

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Tag from './Tag';

const ImagesDiv = styled.div`
  display: flex;
  position: relative;
  min-height: 400px;
  height: 100%;
  justify-content: space-between;
  @media ${({ theme }) => theme.sizes.small} {
    flex-direction: column;
  }
`;

const MainImage = styled(Image)`
  background-color: ${({ theme }) => theme.colors.grey};
  object-fit: contain;
  @media ${({ theme }) => theme.sizes.medium} {
    height: 100%;
    aspect-ratio: 1;
    max-height: 400px;
    flex-grow: 1;
  }

  @media ${({ theme }) => theme.sizes.small} {
    width: 100%
  }
`;

const PreviewImagesWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  height: 400px;
  flex-direction: column;
  gap: 11px;
  overflow: auto;
  @media ${({ theme }) => theme.sizes.small} {
    flex-direction: row;
    max-height: 100px;
    margin-left: 0;
    margin-top: 10px;
    flex-grow: 1;
    max-width: 85vw;
  }
`;

const PreviewImage = styled(Image)`
  width: 90px;
  height: 90px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.colors.grey};
  box-shadow: inset 0 0 0 ${props => props.selected ? '1px' : '0'} ${({ theme }) => theme.colors.dark};
  box-sizing: border-box;
`;

  
export default function ProductImages({ tags,images,name }) {
    const [imageIndex,setImageIndex] = useState(0);

    function selectImage(index) {
      setImageIndex(index);
    }

    return (
    <ImagesDiv>
        <MainImage
          src={images[imageIndex].url}
          alt={`Imagem-Principal-${name}`}
          height={400}
          width={400}
          placeholder={'blur'}
          blurDataURL={images[imageIndex].blur} />
        <Tag tags={tags} type={'top'} />
        <PreviewImagesWrapper>
          {images.map((image, n) => 
          <PreviewImage
            onClick={() => selectImage(n)}
            selected={imageIndex == n}
            alt={`Imagem-${name}-${n}`}
            key={`Imagem-${name}-${n}`}
            height={92}
            width={92}
            src={image.url}
            placeholder={'blur'}
            blurDataURL={image.blur}
          />
          )}
        </PreviewImagesWrapper>
      </ImagesDiv>
    );
    }
  
  