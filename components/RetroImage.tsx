'use client'
import { buildImgUrl, cn } from '@/lib/utils'
import { ArtistEntity } from '@/types/strapi'
import AnimatedImage from './AnimatedImage'

interface RetroImageProps {
  image: ArtistEntity['image']
  className?: string
  style?: React.CSSProperties
}

export default function RetroImage({ image, className, style }: RetroImageProps) {

  if (!image) {
    return null
  }

  return (
    <AnimatedImage
      alt={image.alternativeText || 'Imagem gerada de artista real'}
      src={buildImgUrl(image.url)}
      width={image.width}
      height={image.height}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={cn(`border-2 border-border object-contain max-w-[${image.width}px] max-h-[${image.width}px] `, className)}
    />
  )
}