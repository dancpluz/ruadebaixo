'use client'

import { useState } from 'react';
import styled from 'styled-components';

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

  
  export default function ProductImages({ images, params }) {
    const [imageIndex,setImageIndex] = useState(0);

    function selectImage(index) {
      setImageIndex(index);
    }

      return (
      <ImagesDiv>
          <MainImage src={images[imageIndex]} alt={'MainImage'} />
          <PreviewImagesWrapper>
            {images.map((image, i) => <PreviewImage onClick={() => selectImage(i)} selected={imageIndex === i} alt={params.slug} key={i} src={image} />)}
          </PreviewImagesWrapper>
        </ImagesDiv>
      );
    }
  
  