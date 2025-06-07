'use client'

import { useGeneratorContext } from '@/hooks/useGeneratorContext'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function GenerateButton() {
  const { selectRandomArtist } = useGeneratorContext()
  const [hover, setHover] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleClick = () => {
    if (isDisabled) return

    setIsLoading(true)
    setIsDisabled(true)

    // Trigger artist selection
    selectRandomArtist()

    // Show loading for at least 500ms
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    // Cooldown before re-enabling
    setTimeout(() => {
      setIsDisabled(false)
    }, 4000)
  }

  return (
    <div
      className='absolute-center z-20 cursor-pointer'
      onClick={handleClick}
      onMouseEnter={() => !isDisabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Main button image */}
      <div className="relative">
        <Image
          src='/generate-button.webp'
          alt='Botão de gerar arte'
          width={200}
          height={200}
          className={`transition-all duration-300 ${isDisabled ? 'brightness-80' : hover ? 'brightness-125 scale-105' : 'animate-pulse'
            }`}
        />
      </div>
    </div>
  )
}