"use client";

import { useEffect,useState } from "react";
import { useInView } from "react-intersection-observer";
import CircularProgress from '@mui/material/CircularProgress';
//import { ProductsDiv } from "@/components/Catalog";
import styled from 'styled-components';
import { fetchLookbookImages } from '@/lib/api';
import { PhotoDiv, Photo } from '@/components/styles/LookBook.styled';

const Spinner = styled(CircularProgress)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 24px;
`;

export default function LoadMore({ slug, count, setBigImage }) {
  const [photos,setPhotos] = useState([]);
  const [interval,setInterval] = useState(1);

  const { ref,inView } = useInView();

  const loadMorePhotos = async () => {
    await delay(300);
    const nextInterval = interval + 1;
    const newPhotos = await fetchLookbookImages(slug,nextInterval) ?? [];
    setPhotos((prevPhotos) => [...prevPhotos,...newPhotos]);
    setInterval(nextInterval);
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve,delayInms));
  };

  useEffect(() => {
    setPhotos([]);
    setInterval(0);
  },[slug]);

  useEffect(() => {
    //console.log(photos);
    if (inView) {
      loadMorePhotos();
    }
  },[inView]);

  return (
    <>
      {
        photos.map((photo, n) => (
          <PhotoDiv key={`${n + count}-${slug}`} onClick={() => setBigImage(photo)}>
            <Photo 
              src={photo.url}
              sizes={'(max-width: 400px) 400px, 900px'}
              placeholder={'blur'}
              blurDataURL={photo.blur}
              fill
            />
          </PhotoDiv>
        ))
      }
      {count > photos.length + 10 && <Spinner color='inherit' ref={ref} />}
    </>
  )
}