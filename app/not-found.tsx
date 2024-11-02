'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Custom404() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const totalFrames = 30
  const frameRate = 20 // Frames per second

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFrame((prevFrame) =>
        prevFrame === totalFrames ? 1 : prevFrame + 1
      )
    }, 1000 / frameRate)

    return () => clearInterval(intervalId)
  }, [])

  const padFrame = (frame: number) => frame.toString().padStart(4, '0')

  return (
    <main className="flex flex-col flex-1 justify-center items-center gap-2 px-5">
      <div className="size-48 lg:size-64 lg:mb-6 relative">
        {[...Array(totalFrames)].map((_, index) => (
          <Link href='/' key={index + 1}>
            <Image
              src={`/anim/anisite${padFrame(index + 1)}.webp`}
              alt={`Animation frame ${index + 1}`}
              fill
              priority={index === 0} // Prioritize loading for the first 5 frames
              className={`object-contain ${currentFrame === index + 1 ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </Link>
        ))}
      </div>
      <h1 className="text-4xl font-semibold clash">404 - PÁGINA NÃO ENCONTRADA</h1>
      <p className="text-xl text-muted-foreground mb-6 lg:mb-4">A página que você está procurando não existe.</p>
      <Button asChild>
        <Link href="/" className="inline-flex items-center">
          VOLTAR AO INÍCIO
        </Link>
      </Button>
    </main>
  )
}