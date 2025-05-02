'use client'
import useProgressLoader from '@/hooks/useProgressLoader'
import { buildImgUrl, cn } from '@/lib/utils'
import { ArtistEntity } from '@/types/strapi'
import Image from 'next/image'
import { useState } from 'react'

interface RetroImageProps {
  image: ArtistEntity['image']
  className?: string
  style?: React.CSSProperties
}

export default function RetroImage({ image, className, style }: RetroImageProps) {
  const { progress, isLoading, setIsLoading } = useProgressLoader({
    steps: [12, 25, 37, 50, 62, 75, 87, 100],
    interval: 700
  })
  
  if (!image) {
    return null
  }

  // if (isLoading) {
  //   return (
      
  //   )
  // }

  return (
    <Image
      alt={image.alternativeText || 'Imagem gerada de artista real'}
      src={buildImgUrl(image.url)}
      width={image.width}
      height={image.height}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={cn(`border-2 border-border object-contain max-w-[${image.width}px] max-h-[${image.width}px] `, className)}
      onLoad={() => setIsLoading(false)}
      style={{
        clipPath: `inset(0 0 ${100 - progress}% 0)`,
        //transition: 'clip-path 0.8s linear',
        ...style
      }}
    />
  )
}