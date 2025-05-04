'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useGeneratorContext } from '@/hooks/useGeneratorContext'
import { GIF_DURATIONS } from '@/lib/const'

export default function Clippy() {
  const { currentArtist } = useGeneratorContext()
  const gifsArray = Object.keys(GIF_DURATIONS)
  
  const [currentGif, setCurrentGif] = useState(gifsArray[0])
  const [lastIndex, setLastIndex] = useState(0)
  const [gifVersion, setGifVersion] = useState(0)

  useEffect(() => {
    if (currentArtist) {
      // Generate random GIF between 1-6
      let randomIndex = Math.floor(Math.random() * (gifsArray.length - 1)) + 1
      while (randomIndex === lastIndex) {
        randomIndex = Math.floor(Math.random() * (gifsArray.length - 1)) + 1
      }
      console.log('Random index:', randomIndex)
      const newGif = gifsArray[randomIndex]

      setCurrentGif(`${newGif}?v=${Date.now()}`)
      setGifVersion(prev => prev + 1)
      setLastIndex(randomIndex)

      // Set timeout to return to idle after animation
      const timeout = setTimeout(() => {
        setCurrentGif(gifsArray[0])
      }, GIF_DURATIONS[newGif]) // Adjust timeout based on your GIF duration

      return () => clearTimeout(timeout)
    }
  }, [currentArtist])

  return (
    <div className='absolute bottom-10 lg:right-32 right-4 z-10'>
      <div className='relative'>
        <div className='absolute -translate-y-[100%] z-12 origin-bottom'>
          <div className='relative font-pixelated bg-textbox border-black border-1 rounded-md p-2'>
            <h1 key={currentArtist?.id} className="clippy-text lg:max-w-[250px] max-w-[150px] animate-typewriter">
              {currentArtist?.message || 'Clique para começar a gerar sua arte! asg asgasgsd gsdgsdgdsg sdg'}
            </h1>
            <Image
              alt='Seta da caixa de texto'
              src='/text-arrow.webp'
              width={10}
              height={17}
              className='absolute bottom-0 translate-y-4 left-8'
            />
          </div>
        </div>
        <div className='clippy-float size-[150px]'>
          <Image
            key={`clippy-${gifVersion}`}
            className='size-[150px]'
            alt='Animação Clippy'
            src={currentGif}
            width={100}
            height={100}
            unoptimized // Recommended for GIFs
          />
        </div>
      </div>
    </div>
  )
}