'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { buildImgUrl, selectImageUrl } from "@/lib/utils"
import { Media } from "@/types/common/Media"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProductCarousel({ images, sold }: { images?: Media[], sold: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }
  
  if (!images) {
    return (
      <div className='w-full aspect-[32/40]' />
    )
  }

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent className='m-0'>
          {images.map((image) => {
            const { formats, width, height, alternativeText } = image.attributes
            const { imageUrl, sizes } = selectImageUrl(formats)

            return (
              <CarouselItem className='p-0' style={{ filter: sold ? 'grayscale(80%)' : 'grayscale(0)' , opacity: sold ? 0.4 : 1 }} key={image.id}>
                <Image
                  className="object-cover aspect-[32/40] h-full w-full object-top"
                  src={buildImgUrl(imageUrl)}
                  alt={alternativeText || `Produto ${image.id}`}
                  width={width}
                  height={height}
                  sizes={sizes}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={cn(
              "size-2 rounded-full p-0",
              currentIndex === index ? "bg-foreground" : ""
            )}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
}