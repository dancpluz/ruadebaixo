'use client'

import useProgressLoader from '@/hooks/useProgressLoader'
import Image, { ImageProps } from 'next/image'

export default function AnimatedImage(props: ImageProps) {
  const { progress, isLoading, setIsLoading } = useProgressLoader({
    steps: [12, 25, 37, 50, 62, 75, 87, 100],
    interval: 500
  })

  // if (isLoading) {
  //   return (
      
  //   )
  // }

  return (
    <Image
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onLoad={() => setIsLoading(false)}
      style={{
        clipPath: `inset(0 0 ${100 - progress}% 0)`,
        //transition: 'clip-path 0.8s linear',
        ...props.style
      }}
    />
  )
}