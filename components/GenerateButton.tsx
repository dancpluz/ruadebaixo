'use client'

import { useGeneratorContext } from '@/hooks/useGeneratorContext'
import React from 'react'

export default function GenerateButton() {
  const { selectRandomArtist } = useGeneratorContext()

  return (
    <button onClick={selectRandomArtist} className='absolute-center h-[70%] text-sx'>GERAR ARTE</button>
  )
}
