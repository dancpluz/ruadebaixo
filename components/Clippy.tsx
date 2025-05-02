'use client'

import React from 'react'
import Image from 'next/image'
import { useGeneratorContext } from '@/hooks/useGeneratorContext'

export default function Clippy() {
  const { currentArtist } = useGeneratorContext()

  return (
    <div className='absolute bottom-10 right-32 z-10'>
      <div className='relative'>
        <div className='absolute -translate-y-[100%] z-12 origin-bottom'>
          <div className='relative font-pixelated bg-textbox border-black border-1 rounded-md max-w-[400px] p-2'>
            <h1 key={currentArtist?.id} className="clippy-text animate-typewriter">
              {currentArtist?.message || 'Clique para começar a gerar sua arte!'}
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
        <Image className='size-[150px]' alt='Animação Clippy' src='/clippy/clippy0.gif' width={100} height={100} />
      </div>
    </div>
  )
}
