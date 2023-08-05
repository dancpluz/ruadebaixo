'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import { fetchLookBookData } from '@/lib/api.js';
import { extractImageDimensions,formatDate } from '@/lib/format.js';

const Container = styled.div`
  margin: 60px 10vw;
  min-height: 80vh;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-overflow: ellipsis;
  gap: 8px;
  h1, h2 {
    white-space: nowrap;
  }
`;

const Collection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigImageDiv = styled.div`
  position: fixed;
  display: ${(props) => props.showOverlay};
  background-color: ${({ theme }) => theme.colors.dark};
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
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PhotoDiv = styled.div`
  height: auto;
  flex-grow: 1;
  flex-basis: 0;
`;

const Photo = styled(Image)`
  object-fit: contain;
  width: auto;
  height: 240px;
  cursor: pointer;
  transition: all .20s ease;

  &:hover {
    filter: drop-shadow(0px 7px 29px rgba(100, 100, 111, 0.2));
    transform: scale(1.05);
  }
`;

export default function LookBook() {
  const [bigImage,setBigImage] = useState(null);
  const [isLoading,setIsLoading] = useState(true)
  const [collections,setCollections] = useState([]);

  useEffect(() => {
    const fetchFunction = async () => {
      setCollections(await fetchLookBookData());
      return;
    }
    fetchFunction();
    setIsLoading(false);
  },[]);

  function handleClick(image) {
    setBigImage(image);
  }

  function renderCollection(collection) {
    return (
      <Collection>
        <TitleDiv>
          <h2>{collection.name}</h2>
          <p>{formatDate(collection.date)}</p>
        </TitleDiv>
        <hr />
        <Gallery>
          {collection.images.map((image,n) => (
            <PhotoDiv key={collection.name + "-Imagem-" + n}>
              <Photo src={image} alt={collection.name + "-Imagem-" + n} width={extractImageDimensions(image).width} height={extractImageDimensions(image).height} onClick={() => handleClick(image)} />
            </PhotoDiv>
          ))}
        </Gallery>
      </Collection>
    )
  }

  if (isLoading) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    )
  }

  return (
    <Container>
      <BigImageDiv onClick={() => handleClick(null)} showOverlay={bigImage ? 'block' : 'none'} />
      {bigImage &&
        <BigImage src={bigImage} alt={"Fullscreen image"} onClick={() => handleClick(null)} width={extractImageDimensions(bigImage).width} height={extractImageDimensions(bigImage).height} />}
      {collections.length > 0 ? collections.map((collection) => renderCollection(collection)) : null}
    </Container>
  )
}