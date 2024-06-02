'use client'

import { useState } from 'react';
import { formatDate } from '@/lib/format.js';
import { Collection, Gallery, PhotoDiv, Photo, BigImageDiv, BigImage, HeaderDiv } from '@/components/styles/LookBook.styled';
import LoadMore from '@/components/LoadMorePhotos';

export default function LookBook({ collection, count }) {
  const [bigImage,setBigImage] = useState(null);

  return (
    <>
      <BigImageDiv onClick={() => setBigImage(null)} showOverlay={bigImage ? 'block' : 'none'}>
      {bigImage &&
        <BigImage 
          src={bigImage.url}
          sizes={'(max-width: 400px) 400px, 900px'}
          placeholder={'blur'}
          blurDataURL={bigImage.blur}
          fill
        />}
      </BigImageDiv>
      <Gallery>
        <Collection>
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
        <LoadMore count={count} setBigImage={setBigImage} />
      </Gallery>
    </>
  )
}