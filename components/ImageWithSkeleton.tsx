'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from './../lib/utils';

interface ImageWithSkeletonProps extends React.ComponentProps<typeof Image> { }

export default function ImageWithSkeleton({ src, alt, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div className="relative transition-[filter]" style={{
      width: props.fill ? '100%' : props.width,
      height: props.fill ? '100%' : props.height
    }}>
      {!isLoaded && (
        <Skeleton
          className="absolute rounded-none bg-foreground/20 inset-0"
          style={{
            width: props.fill ? '100%' : props.width,
            height: props.fill ? '100%' : props.height,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        {...props}
        onLoad={handleLoad}
        style={{
          ...props.style,
          opacity: isLoaded ? 1 : 0,
        }}
        className={cn(props.className, 'transition duration-500')}
      />
    </div>
  )
}