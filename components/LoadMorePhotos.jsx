"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CircularProgress from '@mui/material/CircularProgress';
import { formatDate } from '@/lib/format.js';
//import { ProductsDiv } from "@/components/Catalog";
import styled from 'styled-components';
import { fetchLookBook } from '@/lib/api';
import { Collection, Gallery, PhotoDiv, Photo, HeaderDiv } from '@/components/styles/LookBook.styled'


const Spinner = styled(CircularProgress)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
  margin: 24px;
`;

export default function LoadMore({ count, setBigImage }) {
  const [collections, setCollections] = useState([]);
  const [index, setIndex] = useState(1);

  const { ref, inView } = useInView();

  const loadMorePhotos = async () => {
    await delay(300);
    const nextIndex = index + 1;
    const newCollection = await fetchLookBook(nextIndex) ?? [];
    setCollections((prevCollections) => [...prevCollections, newCollection]);
    setIndex(nextIndex);
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve,delayInms));
  };

  // useEffect(() => {
  //   setCollections(null);
  // }, [collections]);

  useEffect(() => {
    console.log(collections);
    console.log('index',index)
    console.log('count',count)
    if (inView) {
      loadMorePhotos();
    }
  }, [inView]);

  return (
    <>
      {collections.map((collection) => 
      <Collection key={collection.name}>
        <HeaderDiv>
          <h2>{collection.name}</h2>
          <p>{formatDate(collection.date)}</p>
        </HeaderDiv>
        <hr />
        <Gallery>
          {collection.images.map((image,n) => (
            <PhotoDiv key={`${n}-${image.name}`} onClick={() => setBigImage(image)}>
              <Photo 
                src={image.url}
                sizes={'(max-width: 400px) 400px, 900px'}
                placeholder={'blur'}
                blurDataURL={image.blur}
                fill
                priority={n < 5 ? true : undefined}
              />
            </PhotoDiv>
          ))}
        </Gallery>
      </Collection>
        ) 
      }
      {count > index + 1 && <Spinner color='inherit' ref={ref}/>}
    </>
  )
}